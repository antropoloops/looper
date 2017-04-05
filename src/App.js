import React, { Component } from "react";
import KeyHandler from "./KeyHandler"
import Pads from "./Pads"
import "./App.css";
import reducer from "./reducer"

const LETTERS = "QWEASDZXC".split("")

class App extends Component {
  constructor (props) {
    super(props)
    this.reduce = props.reduce
    // set the initial state
    this.state = this.reduce()
  }

  dispatch (action) {
    this.setState(prevState => this.reduce(prevState, action))
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
