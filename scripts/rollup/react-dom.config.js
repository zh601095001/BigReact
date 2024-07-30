import { getBaseRollupPlugins, getPackageJSON, resolvePkgPath } from './utils';
import generatePackageJson from 'rollup-plugin-generate-package-json';

import alias from '@rollup/plugin-alias';

const { name, module, peerDependencies } = getPackageJSON('react-dom');
const pkgPath = resolvePkgPath(name);
const pkgDistPath = resolvePkgPath(name, true);

export default [
	// react-dom
	{
		input: `${pkgPath}/${module}`,
		output: [
			{
				file: `${pkgDistPath}/index.js`,
				format: 'umd',
				name: 'ReactDom'
			},
			{
				file: `${pkgDistPath}/client.js`,
				format: 'umd',
				name: 'client'
			}
		],
		external: [...Object.keys(peerDependencies)],
		plugins: [
			...getBaseRollupPlugins({}),
			alias({
				hostConfig: `${pkgPath}/src/hostConfig.ts`
			}),
			generatePackageJson({
				inputFolder: pkgPath,
				outputFolder: pkgDistPath,
				baseContents: ({ name, description, version }) => ({
					name,
					description,
					version,
					peerDependencies: {
						react: version
					},
					main: 'index.js'
				})
			})
		]
	},
	{
		input: `${pkgPath}/test-utils.ts`,
		output: [
			{
				file: `${pkgDistPath}/test-utils.js`,
				format: 'umd',
				name: 'testUtils'
			}
		],
		external: ['react-dom', 'react'],
		plugins: [...getBaseRollupPlugins({})]
	}
];
