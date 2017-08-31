import React, {Component} from 'react'

class Board extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <h1>Hello World!</h1>
    )
  }
}

class Cell extends Component {
  constructor() {
    super()
    this.state= {
      age: 0
    }
    this.getOlder = this.getOlder.bind(this)
  }

  getOlder() {
    var state = this.state
    state.age = state.age + 1
    this.setState(state)
  }

  render() {
      var cell = <div className={'age' + this.state.age}></div>
      this.getOlder()
      return( {cell} )
  }
}

export default Board
