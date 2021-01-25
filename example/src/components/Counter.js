import React, { useContext, useEffect, useState } from 'react'
import { CounterContext } from '../context/counter'
import Controls from './Controls'
import Likes from './Likes'

function Counter() {
  const [likedNumbers, setLikedNumbers] = useState({})
  const { count } = useContext(CounterContext)

  useEffect(() => {
    // console.log(count)
  }, [count])

  function like() {
    setLikedNumbers((likedNumbers) => {
      const likes = (likedNumbers[count] || 0) + 1
      return {
        ...likedNumbers,
        [count]: likes
      }
    })
  }

  return (
    <div>
      <h2>Counter: {count}</h2>
      <Controls like={like} />
      <Likes likedNumbers={likedNumbers} />
    </div>
  )
}

export default Counter
