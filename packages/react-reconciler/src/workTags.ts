export const FunctionComponent = 0;
export const HostRoot = 3; // Fiber树的根节点（HostRootFiber）
export const HostComponent = 5; // 浏览器原生可以识别的节点类型
export const HostText = 6;

export type WorkTag =
	| typeof FunctionComponent
	| typeof HostComponent
	| typeof HostRoot
	| typeof HostText;
