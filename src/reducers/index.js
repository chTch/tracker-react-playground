import { combineReducers } from '../utils/redux'
import { routerReducer as routing } from 'react-router-redux'

let combined = combineReducers({
  routing  
})

export default combined