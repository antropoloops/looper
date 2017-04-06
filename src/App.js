import React, { Component } from "react";
import KeyHandler from "./KeyHandler"
import Pads from "./Pads"
import "./App.css";

const LETTERS = "QWEASDZXC".split("")

const Metronome = ({ bpm }) => (
  <div className="Metronome">
    <label>{bpm}bpm</label>
  </div>
)

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
  keyDown = (key) => this.dispatch({ type: "keydown", key })
  keyUp = (key) => this.dispatch({ type: "keyup", key })
  padClicked = (letter) => this.dispatch({ type: "padclicked", letter })

  render() {
    return (
      <div className="App">
        <KeyHandler detect={LETTERS} onKeyDown={this.keyDown} onKeyUp={this.keyUp} />
        <Metronome bpm={this.state.bpm} />
        <div className="pads">
          <Pads letters={LETTERS} padsState={this.state.pads} onClick={this.padClicked}/>
        </div>
      </div>
    );
  }
}

export default App;
