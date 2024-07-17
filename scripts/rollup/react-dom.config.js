import { getBaseRollupPlugins, getPackageJSON, resolvePkgPath } from './utils';
import generatePackageJson from 'rollup-plugin-generate-package-json';

import alias from "@rollup/plugin-alias";
const { name, module } = getPackageJSON('react-dom');
const pkgPath = resolvePkgPath(name);
const pkgDistPath = resolvePkgPath(name, true);

export default [
	// react
	{
		input: `${pkgPath}/${module}`,
		output: [
			{
				file: `${pkgDistPath}/index.js`,
				format: 'umd',
				name: 'index.js'
			},
			{
				file: `${pkgDistPath}/client.js`,
				format: 'umd',
				name: 'client.js'
			}
		],
		plugins: [
			...getBaseRollupPlugins({}),
			alias({
				hostConfig:`${pkgPath}/src/hostConfig.ts`
			}),
			generatePackageJson({
				inputFolder: pkgPath,
				outputFolder: pkgDistPath,
				baseContents: ({ name, description, version }) => ({
					name,
					description,
					version,
					peerDependencies:{
						react: version
					},
					main: 'index.js'
				})
			})
		]
	},
];
