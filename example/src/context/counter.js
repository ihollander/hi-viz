import React, { useEffect, useState } from 'react'

const CounterContext = React.createContext()

function CounterProvider({ children }) {
  const [paused, setPaused] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!paused) {
      const interval = setInterval(() => {
        setCount((count) => count + 1)
      }, 1000)

      return function cleanup() {
        clearInterval(interval)
      }
    }
  }, [paused])

  function togglePaused() {
    setPaused((paused) => {
      return !paused
    })
  }

  function increment() {
    setCount((count) => count + 1)
  }

  function decrement() {
    setCount((count) => count - 1)
  }

  return (
    <CounterContext.Provider
      value={{ paused, togglePaused, count, increment, decrement }}
    >
      {children}
    </CounterContext.Provider>
  )
}

export { CounterContext, CounterProvider }
