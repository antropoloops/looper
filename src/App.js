import React, { Component } from "react";
import classNames from "classnames"
import KeyHandler from "./KeyHandler"
import "./App.css";

const LETTERS = "QWEASDZXC".split("")
const Pad = ({ letter, pressed }) => (
  <div className={classNames("Pad", { pressed })}>{letter} {pressed}</div>
)

const Pads = ({ letters, pressed }) => (
  <div className="Pads">
    {letters.map(letter => (
      <Pad key={letter} letter={letter} pressed={pressed.indexOf(letter) !== -1} />
    ))}
  </div>
)

class App extends Component {
  constructor (props) {
    super(props)
    this.state = { pressed: [] }
    this.keyDown = this.keyDown.bind(this)
    this.keyUp = this.keyUp.bind(this)
  }
  keyDown (key) {
    const pressed = this.state.pressed
    pressed.push(key)
    this.setState({ pressed })
  }
  keyUp (key) {
    const pressed = this.state.pressed.filter(e => e !== key)
    this.setState({ pressed })
  }

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
