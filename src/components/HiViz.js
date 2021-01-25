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
  z-index: 9998;
`

const TreeContainer = styled.ul`
  text-align: center;
  list-style: none;
  position: relative;
  padding: 0;
  margin: 0 auto;
  display: table;

  & > li:before,
  & > li > div:before {
    outline: none;
  }
`

const ButtonContainer = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 9999;

  button {
    margin-right: 1rem;
  }
`

function HiViz({ on = true, children }) {
  const [show, setShow] = useState(on)
  const [showProps, setShowProps] = useState(false)
  const [showState, setShowState] = useState(false)
  const [showHooks, setShowHooks] = useState(false)
  const componentTree = useComponentTree('hi-viz', show)

  if (!on) return children

  return (
    <React.Fragment>
      <ButtonContainer>
        {show ? (
          <React.Fragment>
            <button onClick={() => setShowProps((show) => !show)}>
              {showProps ? 'Hide' : 'Show'} props
            </button>
            <button onClick={() => setShowHooks((show) => !show)}>
              {showHooks ? 'Hide' : 'Show'} hooks
            </button>
            <button onClick={() => setShowState((show) => !show)}>
              {showState ? 'Hide' : 'Show'} state
            </button>
          </React.Fragment>
        ) : null}
        <button onClick={() => setShow((show) => !show)}>🌲</button>
      </ButtonContainer>
      {show && (
        <Wrapper>
          <TreeContainer>
            <Tree
              nodes={componentTree}
              showProps={showProps}
              showHooks={showHooks}
              showState={showState}
            />
          </TreeContainer>
        </Wrapper>
      )}
      {/* use this key to identify the starting point */}
      <div key='hi-viz'>{children}</div>
    </React.Fragment>
  )
}

export default HiViz
