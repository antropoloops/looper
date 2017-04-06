// # Actions
export const initialState = {
  bpm: 115,
  pads: {}
}

// Actions are functions that receives a state, a action params and
// effects object and returns the new state
export const actions = {
  // A key is pressed
  keydown: (state, { key }, { sampler }) => {
    if (!state.pads[key]) {
      state.pads[key] = "pressed"
      sampler.start(key)
    }
    return state
  },
  // A key is released
  keyup: (state, { key }, { sampler }) => {
    if (state.pads[key] === "pressed") {
      state.pads[key] = false
      sampler.stop(key)
    }
    return state
  },
  // A pad is clicked
  padclicked: (state, { letter }, { sampler }) => {
    if (!state.pads[letter]) {
      state.pads[letter] = "clicked"
      sampler.start(letter)
    } else if (state.pads[letter] === "clicked") {
      state.pads[letter] = false
      sampler.stop(letter)
    }
  }
}
