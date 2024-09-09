import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import { thunk, ThunkMiddleware } from 'redux-thunk';
import rootReducer, { RootState } from './rootReducer';
import { useDispatch } from 'react-redux';

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunk as unknown as ThunkMiddleware<RootState>];

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch as unknown as () => AppDispatch;

export default store;






// import { legacy_createStore as createStore, applyMiddleware } from 'redux'
// import { thunk, ThunkMiddleware } from 'redux-thunk';
// import rootReducer, { RootState } from './reducers';
// import { useDispatch } from 'react-redux';

// // @ts-expect-error: Suppressing deprecated warning
// const store = createStore(
//   rootReducer,
//   applyMiddleware(thunk as ThunkMiddleware<RootState>),
// );

// export type AppDispatch = typeof store.dispatch
// export const useAppDispatch = useDispatch.withTypes<AppDispatch>()


// export default store;
