import React, {Component} from 'react'
import {gridSize} from './App.js'

class Board extends Component {
  constructor(props){
    super(props)
  }
  render(){
    var cellGrid = []
    for (var i = 0; i < gridSize; i++){
      var row = []
      for (var j = 0; j < gridSize; j++){
        row.push(<Cell key={i.toString() + j.toString() + this.props.cellArr[i][j]} age={this.props.cellArr[i][j]}/>)
      }
      cellGrid.push(<div className="myrow">{row}</div>)
    }
    return (
      <div>
        {cellGrid}
      </div>
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
