import { combineReducers } from 'redux';

import { loginReducer } from './loginReducer';
import { toolReducer } from './toolReducer';
import { quizzReducer } from './quizzReducer';
import { postReducer } from './postReducer';

export default combineReducers({
  loginReducer,
  toolReducer,
  quizzReducer,
  postReducer,
});
