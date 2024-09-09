import { combineReducers } from 'redux';
import todoReducer from './todoReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  todos: todoReducer,
  users: userReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
