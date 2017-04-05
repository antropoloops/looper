import React, { Component } from "react";
import KeyHandler from "./KeyHandler"
import Pads from "./Pads"
import "./App.css";

const LETTERS = "QWEASDZXC".split("")

// ## Poor's man redux: reducer + dispatch + logger middleware

// Reduce: given a state and an action, return a new state
const reduce = (state, action = {}) => {
  switch (action.type) {
    case "KEYUP":
      const pressed = state.pressed.filter(k => k !== action.key)
      return { pressed }
    case "KEYDOWN":
      state.pressed.push(action.key)
      return state
    default:
      return state
  }
}

// Poor's man logger middleware
const log = (fn, enabled) => (state, action) => {
  if (enabled) console.log("ACTION", state, action)
  state = fn(state, action)
  if (enabled) console.log("STATE", state)
  return state
}

// The reducer after applying the middleware
const reducer = log(reduce, false)

const initialState = { pressed: [] }
class App extends Component {
  // set the initial state
  state = reducer(initialState)

  dispatch (action) {
    this.setState(prevState => reducer(prevState, action))
  }
  keyDown = (key) => this.dispatch({ type: "KEYDOWN", key })
  keyUp = (key) => this.dispatch({ type: "KEYUP", key })

  render() {
    return (
      <div className="App">
        <KeyHandler detect={LETTERS} onKeyDown={this.keyDown} onKeyUp={this.keyUp} />
        <div className="pads">
          <Pads letters={LETTERS} pressed={this.state.pressed} />
        </div>
      </div>
    );
  }
}

export default App;
