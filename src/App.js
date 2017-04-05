import React, { Component } from 'react';
import classNames from 'classnames'
import './App.css';

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

class KeyHandler extends Component {
  constructor (props) {
    super(props)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    const detect = props.detect || []
    this.selection = detect.reduce((keys, k) => {
      keys[k] = false
      return keys
    }, {})
  }
  render () {
    return null
  }
  componentDidMount () {
    window.document.addEventListener("keydown", this.handleKeyDown)
    window.document.addEventListener("keyup", this.handleKeyUp)
  }
  componentWillUnmount () {
    window.document.removeEventListener("keydown", this.handleKeyDown)
    window.document.removeEventListener("keyup", this.handleKeyUp)
  }
  handleKeyDown(e) {
    const sel = this.selection
    const k = e.key.toUpperCase()
    if (sel[k] === false) {
      sel[k] = true
      this.props.onKeyDown(k)
    }
  }
  handleKeyUp(e) {
    const sel = this.selection
    const k = e.key.toUpperCase()
    if (sel[k] === true) {
      sel[k] = false
      this.props.onKeyUp(k)
    }
  }
}

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
