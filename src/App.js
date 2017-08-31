import React, { Component } from 'react';
import {Button} from 'react-bootstrap'
import Board from './Board.js'

const gridSize = 40

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
  }
  return arr
}

export default App;
