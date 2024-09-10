import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import { thunk, ThunkMiddleware } from 'redux-thunk';
import rootReducer, { RootState } from './rootReducer';
import { useDispatch } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

// Setup for Redux DevTools
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Configure middleware
const middleware = [thunk as unknown as ThunkMiddleware<RootState>];

// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['']
};

const persistedReducer = persistReducer(persistConfig, rootReducer as any);

// Create the store with persisted reducer and middleware
const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

// Create the persistor
const persistor = persistStore(store);

// Export store and persistor
export { store, persistor };

// Custom hook for dispatch
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Optionally export store directly if needed
// export default store;







// import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
// import { thunk, ThunkMiddleware } from 'redux-thunk';
// import rootReducer, { RootState } from './rootReducer';
// import { useDispatch } from 'react-redux';

// const composeEnhancers =
//   (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const middleware = [thunk as unknown as ThunkMiddleware<RootState>];


// const store = createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(...middleware))
// );

// export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch: () => AppDispatch = useDispatch as unknown as () => AppDispatch;

// export default store;






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
