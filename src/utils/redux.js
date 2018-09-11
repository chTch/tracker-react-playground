export function createActions(actions, defaults) {
  return actions.reduce(function(actions, action) {
    if (typeof action === 'string') action = { type: action }
    action = Object.assign({}, defaults, action)
    if (!action.act) {
      action.act = function(data) {
        return { type: this.type, data }
      }
    }
    let act = function(data) {
      return action.act(data)
    }
    Object.assign(act, action)
    actions[action.type] = act
    return actions
  }, {})
}

export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action, ...rest) {
    const handler = handlers[action.type]
    return handler ? handler(state, action, ...rest) : state
  }
}

export function combineReducers(reducers) {
  function getUndefinedStateErrorMessage(key, action) {
    let actionType = action && action.type
    // eslint-disable-next-line
    let actionName = actionType && `"${actionType.toString()}"` || 'an action'
    return (
        `Reducer "${key}" returned undefined handling ${actionName}. ` +
        `To ignore an action, you must explicitly return the previous state.`
    )
  }
  return function combination(state = {}, action) {
    let finalState = Object.assign({}, state)
    let hasChanged = false
    Object.keys(reducers).forEach((key) => {
      let reducer = reducers[key]
      let previousStateForKey = state[key]
      let nextStateForKey = reducer(previousStateForKey, action, finalState)
      if (nextStateForKey === undefined) {
        let errorMessage = getUndefinedStateErrorMessage(key, action)
        throw new Error(errorMessage)
      }
      if (nextStateForKey !== previousStateForKey) {
        finalState[key] = nextStateForKey
        hasChanged = true
      }
    })
    return hasChanged ? finalState : state
  }
}

export function reduceReducers(...reducers) {
  return function(state, action){
    return Object.keys(reducers).reduce(function(state, key){
      let reducer = reducers[key]
      return reducer(state, action)
    }, state)
  }
}