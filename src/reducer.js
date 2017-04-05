// ## Poor's man redux: reducer + dispatch + logger middleware

const defaults = { pressed: [] }

/**
 * Create a reducer. A reducer is a function that, given a state
 * and an action, returns a new state
 *
 * The function to create the reduccer accepts:
 * @param {Object} effects - a collection of side-effects
 * @param {Object} [state] - optional state
 */
export default function reducer ({ sampler }, state) {
  const initialState = Object.assign({}, defaults, state)
  // Reduce: given a state and an action, return a new state
  return log(false, (state = initialState, action = {}) => {
    const { type, key } = action
    switch (type) {
      case "KEYDOWN":
      state.pressed.push(key)
      sampler.play(key)
      return state
      case "KEYUP":
      const pressed = state.pressed.filter(k => k !== key)
      sampler.stop(key)
      return { pressed }
      default:
      return state
    }
  })
}

// Poor's man logger middleware
export const log = (enabled, fn) => (state, action) => {
  if (enabled) console.log("ACTION", state, action)
  state = fn(state, action)
  if (enabled) console.log("STATE", state)
  return state
}
