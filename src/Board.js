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
        col.push(<Cell key={i.toString() + j.toString() + this.props.cellArr[i][j]} age={this.props.cellArr[i][j]} clickToAdd={this.props.clickToAdd} x={i} y={j}/>)
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
      return <div className="dead cell" onClick={()=>{this.props.clickToAdd(this.props.x, this.props.y)}}></div>
    }
    return <div className={"age" + this.props.age + " cell"} onClick={()=>{this.props.clickToAdd(this.props.x, this.props.y)}}></div>
  }
}


export default Board
