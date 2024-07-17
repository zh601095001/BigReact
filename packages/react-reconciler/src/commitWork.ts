import { FiberNode, FiberRootNode } from './fiber';
import { MutationMask, NoFlags, Placement } from './FiberFlags';
import { HostComponent, HostRoot, HostText } from './workTags';
import { appendChildToContainer, Container } from 'hostConfig';

let nextEffect: FiberNode | null = null;
export const commitMutationEffects = (finishedWork: FiberNode) => {
	nextEffect = finishedWork;
	while (nextEffect !== null) {
		const child: FiberNode | null = nextEffect.child;
		if (
			(nextEffect.subtreeFlags & MutationMask) !== NoFlags &&
			child !== null
		) {
			// 如果孩子有副作用，则向下找
			nextEffect = child;
		} else {
			while (nextEffect !== null) {
				// 对底下没有副作用的但自身有副作用的节点执行
				commitMutationEffectsOnFiber(nextEffect);
				// 查看其是否有兄弟节点
				const sibling: FiberNode | null = nextEffect.sibling;
				if (sibling !== null) {
					// 如果有兄弟节点，则开始遍历兄弟节点
					nextEffect = sibling;
					break;
				}
				// 往上遍历
				nextEffect = nextEffect.return;
			}
		}
	}
};

const commitMutationEffectsOnFiber = (finishedWork: FiberNode) => {
	const flags = finishedWork.flags;
	if ((flags & Placement) !== NoFlags) {
		commitPlacement(finishedWork);
		finishedWork.flags &= ~Placement;
	}
	// flags Update
	// flags ChildDeletion
};

const commitPlacement = (finishedWork: FiberNode) => {
	if (__DEV__) {
		console.warn('执行Placement操作', finishedWork);
	}
	const hostParent = getHostParent(finishedWork);
	if (hostParent !== null) {
		appendPlacementNodeIntoContainer(finishedWork, hostParent);
	}
};

/**
 * 获取父级的真实dom节点，如果父级是HostRoot,则找container
 * @param fiber
 */
function getHostParent(fiber: FiberNode): Container | null {
	let parent = fiber.return;
	while (parent) {
		const parentTag = parent.tag;
		if (parentTag === HostComponent) {
			return parent.stateNode as Container;
		}
		if (parentTag === HostRoot) {
			return (parent.stateNode as FiberRootNode).container;
		}
		parent = parent.return;
	}
	if (__DEV__) {
		console.warn('未找到host parent');
	}
	return null;
}

function appendPlacementNodeIntoContainer(
	finishedWork: FiberNode,
	hostParent: Container
) {
	if (finishedWork.tag === HostComponent || finishedWork.tag === HostText) {
		appendChildToContainer(hostParent, finishedWork.stateNode);
		return;
	}
	const child = finishedWork.child;
	if (child !== null) {
		appendPlacementNodeIntoContainer(child, hostParent);
		let sibling = child.sibling;
		while (sibling !== null) {
			appendPlacementNodeIntoContainer(sibling, hostParent);
			sibling = sibling.sibling;
		}
	}
}
