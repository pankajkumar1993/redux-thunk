import { combineReducers } from 'redux';
import todoReducer from './todos/todoReducer';
import userReducer from './users/userReducer';

const rootReducer = combineReducers({
  todos: todoReducer,
  users: userReducer,
});


export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;