import { combineReducers } from 'redux';
import todoReducer from './todos/reducer';
import userReducer from './users/reducer';
import postsReducer from './posts/reducers';

const rootReducer = combineReducers({
  todos: todoReducer,
  users: userReducer,
  posts: postsReducer,
});


export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;