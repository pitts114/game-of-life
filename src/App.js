import React, { Component } from 'react';
import {Button} from 'react-bootstrap'
import Board from './Board.js'

const gridSize = 40
const probability = 5

const lowSpeed = 1000 //sim step time, ms
const medSpeed = 500
const highSpeed = 200


class App extends Component {
  constructor(){
    super()

    var arr = createCellArr()

    this.state={
      cellArr: arr,
      simSpeed: medSpeed,
      intervalId: undefined
    }
    this.startSim = this.startSim.bind(this)
    this.pauseSim = this.pauseSim.bind(this)
    this.clearSim = this.clearSim.bind(this)
    this.processCells = this.processCells.bind(this)
    this.setSimSpeed = this.setSimSpeed.bind(this)
    this.numberOfNeighbors = this.numberOfNeighbors.bind(this)
  }

  startSim() {
    if (!this.state.intervalId) {
      var intervalId = setInterval(this.processCells, this.state.simSpeed)
      const state = this.state
      state.intervalId = intervalId
      this.setState(state)
    }
  }

  pauseSim() {
    clearInterval(this.state.intervalId)
    const state = this.state
    state.intervalId = undefined
    this.setState(state)
  }

  clearSim() {
    const state = this.state
    state.cellArr = createCellArr()
    if (state.intervalId){
      clearInterval(state.intervalId)
      state.intervalId = undefined
    }
    this.setState(state)
  }

  processCells() {
    //numberOfNeighbors looks at "previous" state,
    //so we can update cellArr whenever
    var cellArr = this.state.cellArr
    for (var i = 0; i < gridSize; i++){
      for (var j = 0; j < gridSize; j++){
        var neighbors = this.numberOfNeighbors(i,j)
        if (neighbors === 3){
          cellArr[i][j] = true
        }
        else if (neighbors < 2 || neighbors > 3) {
          cellArr[i][j] = false
        }
      }
    }
    const state = this.state
    state.cellArr = cellArr
    this.setState(state)
  }

  numberOfNeighbors(x, y) {
    //check left side from x, y coordinates
    var total = 0
    for (var i = x-1; i <= x+1; i++){
      for (var j = y-1; j <= y+1; j++){
        if (IsInsideGrid(i,j)){
          if (this.state.cellArr[i,j]) //if cell here is alive
          total++
        }
      }
    }
    return total
  }

  setSimSpeed(timems) {
    var state = this.state
    state.simSpeed = timems
    this.setState(state)
  }

  render() {
    return (
      <div className="container">
        <Button>Run</Button><Button>Pause</Button><Button>Clear</Button>
        <Board cellArr={this.state.cellArr} />
      </div>
    );
  }
}

function createCellArr() {
  var arr = new Array(gridSize)
  for (var i = 0; i < gridSize; i++){
    arr[i] = new Array(gridSize)
    for (var j = 0; j < gridSize; j++){
      arr[i][j] = deadOrAlive()
    }
  }
  return arr
}

//returns true for alive, false for dead
function deadOrAlive() {
  var num = Math.ceil(Math.random() * probability)
  if (num === probability){
    return true
  }
  return false
}

function IsInsideGrid(x,y) {
  if (x >=0 && x < gridSize && y >= 0 && y < gridSize){
    return true
  }
  return false
}

export default App;
