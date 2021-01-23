import React from 'react'
import styled from 'styled-components'

const Node = styled.li`
  margin: 0;
  padding: 0;
  position: relative;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

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

const Props = styled.div`
  border: 2px solid gray;
  margin: 0 0.2rem 1rem;
  padding: 0.2rem 0.5rem;
  position: relative;
  background-color: white;

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

const Content = styled.div`
  border: 2px solid black;
  margin: 0 0.2rem 1rem;
  padding: 0.2rem 0.5rem;
  position: relative;
  background-color: white;

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
  display: flex;
  justify-content: center;
  list-style: none;
  position: relative;
  margin: 0;
  padding: 0;

  &::before {
    content: '';
    outline: 1px solid black;
    top: -1rem;
    height: calc(1rem - 1px);
    left: 50%;
    position: absolute;
  }
`

function formatProps(key, value) {
  if (Array.isArray(value)) return 'array'
  if (typeof value === 'object') return value
  return typeof value
}

function Tree({ nodes = [] }) {
  const queue = [...nodes]
  const components = []
  while (queue.length) {
    const next = queue.shift()
    const { node, children } = next
    const id = node.type.name + node.index
    console.log(node)
    components.push(
      <Node key={id}>
        <Props>
          <pre>
            <code>{JSON.stringify(node.pendingProps, formatProps, 2)}</code>
          </pre>
        </Props>
        <Content>
          <h3>{node.type.name}</h3>
        </Content>
        {children.length > 0 ? (
          <List>
            <Tree nodes={children} />
          </List>
        ) : null}
      </Node>
    )
  }

  return components
}

export default Tree
