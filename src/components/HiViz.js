import React, { useState } from 'react'
import styled from 'styled-components'
import useComponentTree from '../hooks/useComponentTree'
import Tree from './Tree'

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  overflow: auto;
`

const TreeContainer = styled.ul`
  text-align: center;
  list-style: none;
  position: relative;
  margin: 0 auto;

  & > li:before,
  & > li > div:before {
    outline: none;
  }
`

const Button = styled.button`
  position: fixed;
  top: 10px;
  right: 10px;
`

function HiViz({ on = true, children }) {
  const [show, setShow] = useState(on)
  const componentTree = useComponentTree(show)

  if (!on) return children

  return (
    <React.Fragment>
      {show && (
        <Wrapper>
          <TreeContainer>
            <Tree nodes={componentTree} />
          </TreeContainer>
        </Wrapper>
      )}
      <Button onClick={() => setShow((show) => !show)}>🌲</Button>
      {children}
    </React.Fragment>
  )
}

export default HiViz
