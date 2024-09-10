import { combineReducers } from 'redux';
import todoReducer from './todos/todoReducer';
import userReducer from './users/userReducer';
import postsReducer from './posts/postsReducers';

const rootReducer = combineReducers({
  todos: todoReducer,
  users: userReducer,
  posts: postsReducer,
});


export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;