// import {  createStore, applyMiddleware } from 'redux';
import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import { thunk, ThunkMiddleware } from 'redux-thunk';
import rootReducer, { RootState } from './reducers';
import { useDispatch } from 'react-redux';


// interface Window {
//   __REDUX_DEVTOOLS_EXTENSION__?: () => any;
// }

// // Use Redux DevTools Extension if available
// const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f: any) => f;

// @ts-expect-error: Suppressing deprecated warning
const store = createStore(
  rootReducer,
  applyMiddleware(thunk as ThunkMiddleware<RootState>),
  //  compose(applyMiddleware(thunk as ThunkMiddleware<RootState>), devTools)
);



export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()


export default store;
