import React from 'react'

const GrandChild = ({ text }) => {
  return <h4>{text}</h4>
}

const Child = ({ title = 'ok' }) => {
  return (
    <div>
      <h3>{title}</h3>
      <GrandChild text='hi' />
      <GrandChild text='hi' />
      <GrandChild text='hi' />
    </div>
  )
}

const App = () => {
  return <Child />
}

export default App
