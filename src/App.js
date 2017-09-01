import React, { Component } from 'react';
import {Button} from 'react-bootstrap'
import Board from './Board.js'

export const gridSize = 50
export const gridX = 30
export const gridY = 50
const probability = 5 // each cell has a 1 in $probability chance to start alive
const maxAge = 5

const lowSpeed = 600 //sim step time, ms
const medSpeed = 200
const highSpeed = 50

var generation = 0


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
    var cellArr = this.state.cellArr.slice()

    for (var i = 0; i < gridX; i++){
      for (var j = 0; j < gridY; j++){
        var neighbors = this.numberOfNeighbors(i,j)
        //Any dead cell with exactly three live neighbours becomes a live cell.
        if (this.state.cellArr[i][j] === undefined){
          if (neighbors === 3) {
            cellArr[i][j] = 0
          }
        }
        else { //if alive
          //Any live cell with fewer than two live neighbours dies.
          //Any live cell with more than three live neighbours dies.
          //Any live cell with two or three live neighbours lives on.
          if (neighbors === 2 || neighbors === 3){
            if (cellArr[i][j] < maxAge){
              cellArr[i][j]++
            }
          }
          else {
            cellArr[i][j] = undefined
          }
        }
      }
    }
    const state = this.state
    state.cellArr = cellArr
    this.setState(state)
    generation++
  }

  numberOfNeighbors(x, y) {
    //check left side from x, y coordinates
    var total = 0
    for (var i = x-1; i <= x+1; i++){
      for (var j = y-1; j <= y+1; j++){
        if (i===x && j===y){ //you arent your own neighbor
          continue
        }
        if (!IsInsideGrid(i,j)){ //not in the grid?
          continue
        }
        if (this.state.cellArr[i][j] !== undefined) //if cell here is alive
          total++
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
        <Button onClick={this.startSim}>Run</Button>
        <Button onClick={this.pauseSim}>Pause</Button>
        <Button onClick={this.clearSim}>Clear</Button>
        <Button onClick={this.processCells}>Step</Button>
        <h3>{"Generation:" + generation}</h3>
        <Board cellArr={this.state.cellArr} />
      </div>
    );
  }
}

function createCellArr() {
  var arr = new Array(gridX)
  for (var i = 0; i < gridX; i++){
    arr[i] = new Array(gridY)
    for (var j = 0; j < gridY; j++){
      arr[i][j] = deadOrAlive()
    }
  }
  return arr
}

//returns true for alive, false for dead
function deadOrAlive() {
  var num = Math.ceil(Math.random() * probability)
  if (num === probability){
    return maxAge
  }
  return undefined
}

function IsInsideGrid(x,y) {
  if (x >=0 && x < gridX && y >= 0 && y < gridY){
    return true
  }
  return false
}

export default App;
