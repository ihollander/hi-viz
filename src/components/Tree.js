import React from 'react'
import styled from 'styled-components'
import stringify from 'json-stringify-safe'

const Node = styled.li`
  margin: 0;
  padding: 0;
  position: relative;
  padding: 1rem;
  display: table-cell;
  vertical-align: top;

  &:before {
    content: '';
    outline: 1px solid black;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
  }

  &:first-child:before {
    left: 50%;
  }

  &:last-child:before {
    right: 50%;
  }
`

const Content = styled.div`
  display: inline-block;
`

const Box = styled.div`
  border: 2px solid black;
  background-color: white;
  margin: 0 0.2rem 1rem;
  padding: 0.2rem 0.5rem;
  position: relative;

  &::before {
    content: '';
    outline: 1px solid black;
    top: calc(-1rem - 2px);
    height: 1rem;
    left: 50%;
    position: absolute;
  }

  pre {
    text-align: left;
    font-size: 0.75rem;
  }
`

const List = styled.ul`
  list-style: none;
  position: relative;
  margin: 0 auto;
  padding: 0;
  display: table;

  &::before {
    content: '';
    outline: 1px solid black;
    top: -1rem;
    height: calc(1rem - 1px);
    left: 50%;
    position: absolute;
  }
`

function Tree({
  nodes = [],
  showProps = true,
  showHooks = true,
  showState = true
}) {
  const queue = [...nodes]
  const components = []
  while (queue.length) {
    const next = queue.shift()
    const { node, hooks, children } = next
    const id = node.type.name + node.index
    components.push(
      <Node key={id}>
        <Content>
          {showProps ? (
            <Box>
              <pre>
                <code>Props: {stringify(node.pendingProps, null, 2)}</code>
              </pre>
            </Box>
          ) : null}
          <Box>
            <h3>{node.type.name}</h3>
            {showHooks ? (
              <React.Fragment>
                {hooks.stateHooks.map((hook, i) => (
                  <pre key={i}>
                    <code>useState: {stringify(hook, null, 2)}</code>
                  </pre>
                ))}
                {hooks.effectHooks.map((hook, i) => (
                  <pre key={i}>
                    <code>useEffect: {hook}</code>
                  </pre>
                ))}
              </React.Fragment>
            ) : null}
            {showState && node.stateNode ? (
              <React.Fragment>
                <pre>
                  <code>State: {stringify(node.stateNode.state, null, 2)}</code>
                </pre>
                {hooks.effectHooks.map((hook, i) => (
                  <pre key={i}>
                    <code>Effect: {hook}</code>
                  </pre>
                ))}
              </React.Fragment>
            ) : null}
          </Box>
        </Content>
        {children.length > 0 ? (
          <List>
            <Tree
              nodes={children}
              showProps={showProps}
              showHooks={showHooks}
              showState={showState}
            />
          </List>
        ) : null}
      </Node>
    )
  }

  return components
}

export default Tree
