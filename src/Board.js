import React, {Component} from 'react'
import {gridSize, gridX, gridY} from './App.js'

class Board extends Component {
  constructor(props){
    super(props)
  }
  render(){
    var cellGrid = []
    for (var i = 0; i < gridX; i++){
      var col = []
      for (var j = 0; j < gridY; j++){
        col.push(<Cell key={i.toString() + j.toString() + this.props.cellArr[i][j]} age={this.props.cellArr[i][j]}/>)
      }
      cellGrid.push(<div className="myrow">{col}</div>)
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
