import { useState, useEffect, useRef } from 'react'

// traverse the DOM to get the root element of the React Fiber tree
// should return the same element as was passed as the second arg to ReactDOM.render()
function getStartingRootNode() {
  const elements = [document.body]
  while (elements.length) {
    const el = elements.shift()
    if ('_reactRootContainer' in el) return el
    elements.push(...el.children)
  }
}

// push hooks into arrays for easier rendering
function parseHooks(node) {
  const stateHooks = []
  const effectHooks = []
  if (node.memoizedState) {
    let hook = node.memoizedState
    while (hook) {
      if ('baseState' in hook) {
        stateHooks.push(hook.baseState)
      } else if (hook.memoizedState) {
        if (hook.memoizedState.create) {
          effectHooks.push(hook.memoizedState.create.toString())
        }
      }
      hook = hook.next
    }
  }
  return { stateHooks, effectHooks }
}

// traverse the React fiber tree to get components
function getChildren(node) {
  const nodes = [node.child]
  const children = []
  while (nodes.length > 0) {
    const node = nodes.shift()
    if (node) {
      if (node?.type?.name === 'HiViz' || node?.type?.name === 'Tree') {
        nodes.push(node.child)
        nodes.push(node.sibling)
      } else {
        // 0: Function Component
        // 1: Class Component
        if (node.tag === 0 || node.tag === 1) {
          children.push({
            node,
            hooks: parseHooks(node),
            children: getChildren(node)
          })
        } else {
          // go down
          nodes.push(node.child)
        }
        // go right
        nodes.push(node.sibling)
      }
    }
  }
  return children
}

function findByKey(root, key) {
  const nodes = [root.child]
  while (nodes.length > 0) {
    const node = nodes.shift()
    if (node) {
      if (node.key === key) return node
      nodes.push(node.child)
      nodes.push(node.sibling)
    }
  }
}

const POLL_INTERVAL = 1000

// hook
function useComponentTree(childRootKey, showTree) {
  const [componentTree, setComponentTree] = useState([])
  const rootRef = useRef(getStartingRootNode())

  useEffect(() => {
    if (rootRef.current && showTree) {
      const root = rootRef.current._reactRootContainer._internalRoot.current
      const childRoot = findByKey(root, childRootKey)

      const poll = () => {
        const componentTree = getChildren(childRoot)
        setComponentTree(componentTree)
      }

      const interval = setInterval(poll, POLL_INTERVAL)

      return () => {
        clearInterval(interval)
      }
    }
  }, [rootRef, childRootKey, showTree])

  return componentTree
}

export default useComponentTree
