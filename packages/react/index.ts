import { jsxDEV, jsx, isValidElement as isValidElementFn } from './src/jsx';
import { Dispatcher, resolveDispatcher } from './src/currentDispatcher';
import currentDispatcher from './src/currentDispatcher';

export const useState: Dispatcher['useState'] = (initialState) => {
	const dispatcher = resolveDispatcher();
	return dispatcher.useState(initialState);
};

export const __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = {
	currentDispatcher
};

export const version = '0.0.1';

// todo 根据环境区分使用jsx和jsxDEV
export const createElement = jsxDEV;

export const isValidElement = isValidElementFn;
