// # State management (poor's man redux)

// Poor's man logger middleware
export const log = (enabled, fn) => (state, action) => {
  if (enabled) console.log("ACTION", state, action)
  state = fn(state, action)
  if (enabled) console.log("STATE", state)
  return state
}

/**
 * Create a reducer. A reducer is a function that, given a state
 * and an action, returns a new state. It uses effects object to
 * create side-effects (like playing sounds)
 */
export function reducer (state, actions, effects) {
  const initialState = Object.assign({}, state)
  // Reduce: given a state and an action, return a new state
  return function reduce (state = initialState, action = {}) {
    const fn = actions[action.type]
    if (fn) return fn(state, action, effects)
    else return state
  }
}
