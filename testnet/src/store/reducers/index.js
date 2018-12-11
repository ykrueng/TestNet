import { combineReducers } from 'redux';
import { loginReducer } from './loginReducer';
import { quizzReducer } from './quizzReducer';
import { postReducer } from './postReducer';

export default combineReducers({
  loginReducer,
  quizzReducer,
  postReducer,
});
