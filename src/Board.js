import React, {Component} from 'react'
import {gridSize} from './App.js'

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
  render() {
    if (this.props.age === undefined) {
      return <div className="dead cell"></div>
    }
    return <div className={"age" + this.props.age + " cell"}></div>
  }
}


export default Board
