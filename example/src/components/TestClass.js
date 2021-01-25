import React from 'react'

class TestClass extends React.Component {
  state = {
    count: 1
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState((state) => ({ count: state.count + 1 }))
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return <span>TestClass</span>
  }
}

export default TestClass
