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

// hook
function useComponentTree(showTree) {
  const [componentTree, setComponentTree] = useState([])
  const rootRef = useRef(getStartingRootNode())

  useEffect(() => {
    if (rootRef.current && showTree) {
      const root = rootRef.current._reactRootContainer._internalRoot.current
      const componentTree = getChildren(root)
      setComponentTree(componentTree)
    }
  }, [rootRef, showTree])

  return componentTree
}

export default useComponentTree
