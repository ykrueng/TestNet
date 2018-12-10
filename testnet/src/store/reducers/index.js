import { combineReducers } from 'redux';
import { loginReducer } from './loginReducer';
import { quizzReducer } from './quizzReducer';

export default combineReducers({
  loginReducer,
  quizzReducer,
});
