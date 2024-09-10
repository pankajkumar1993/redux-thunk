redux-persist is a library that helps with persisting and rehydrating your Redux state across page reloads and sessions. Here’s a summary of its use and benefits:
Persist and rehydrate a redux store.


# Purpose of redux-persist:
1. State Persistence:
It saves your Redux state to a storage solution (like localStorage or sessionStorage) so that the state can be restored when the user reloads the page or revisits the site.

2. User Experience Improvement:
By preserving state across sessions, it allows users to continue where they left off. For example, in a shopping cart application, the items in the cart can be saved and restored even after the page is reloaded.

3. Handling Complex State:
It can handle complex state structures, making it easier to manage large or deeply nested states without losing information.



# How redux-persist Works:

1. Configuration:
You configure redux-persist by specifying a persistConfig that includes information about the storage type and any state transformations you want to apply.

2. Creating a Persisted Store:
Wrap your Redux store with persistStore and pass it to PersistGate in your component tree to ensure that the state is rehydrated before rendering your app.

3. Storage Options:
It supports various storage options, such as localStorage (for persistence across browser sessions) and sessionStorage (for persistence only during the browser session).


# Usage Examples:
1. Basic Usage
2. Nested Persists
3. Hot Module Replacement
4. Code Splitting [coming soon

# Usage
1. Install redux-persist:
`npm install redux-persist`
`npm i --save-dev @types/redux-persist`

2. Configure redux-persist:
<script>
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default storage (localStorage)
import rootReducer from './reducers'; // Your root reducer

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };

</script>

3. Wrap Your App with PersistGate:

<script>
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store'; // Your configured store
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

</script>


# Why Use redux-persist:
1. Enhanced User Experience:
- It provides a seamless experience by keeping user data and preferences across sessions.

2. Automatic State Restoration: 
- It automates the process of saving and loading state, reducing manual effort.

3. Flexibility: 
- It offers flexibility in terms of which parts of the state to persist and how to handle state migrations.
However, redux-persist can add complexity and overhead, so it's essential to evaluate whether you need state persistence and if it aligns with your app's requirements.


# API

## persistReducer(config, reducer):

`const persistedReducer = persistReducer(persistConfig, rootReducer);`
1. config object
required config: key, storage
notable other config: whitelist, blacklist, version, stateReconciler, debug

2. reducer function
any reducer will work, typically this would be the top level reducer returned by combineReducers



## persistStore(store, [config, callback])
`const persistor = persistStore(store);`

1. store redux store The store to be persisted.
2. config object (typically null)
If you want to avoid that the persistence starts immediately after calling persistStore, set the option manualPersist. Example: { manualPersist: true } Persistence can then be started at any point with peristor.persist(). You usually want to do this if your storage is not ready when the persistStore call is made.
3. callback function will be called after rehydration is finished.



# persistor object
the persistor object is returned by persistStore with the following methods:
1. .purge()
purges state from disk and returns a promise

2. .flush()
immediately writes all pending state to disk and returns a promise

3. .pause()
pauses persistence

4. .persist()
resumes persistence


# State Reconciler
State reconcilers define how incoming state is merged in with initial state. It is critical to choose the right state reconciler for your state. There are three options that ship out of the box, let's look at how each operates:


1. hardSet (import hardSet from 'redux-persist/lib/stateReconciler/hardSet') This will hard set incoming state. This can be desirable in some cases where persistReducer is nested deeper in your reducer tree, or if you do not rely on initialState in your reducer.
incoming state: { foo: incomingFoo }
initial state: { foo: initialFoo, bar: initialBar }
reconciled state: { foo: incomingFoo } // note bar has been dropped

2. autoMergeLevel1 (default) This will auto merge one level deep. Auto merge means if the some piece of substate was modified by your reducer during the REHYDRATE action, it will skip this piece of state. Level 1 means it will shallow merge 1 level deep.
incoming state: { foo: incomingFoo }
initial state: { foo: initialFoo, bar: initialBar }
reconciled state: { foo: incomingFoo, bar: initialBar } // note incomingFoo overwrites initialFoo

3. autoMergeLevel2 (import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2') This acts just like autoMergeLevel1, except it shallow merges two levels
incoming state: { foo: incomingFoo }
initial state: { foo: initialFoo, bar: initialBar }
reconciled state: { foo: mergedFoo, bar: initialBar } // note: initialFoo and incomingFoo are shallow merged

<script>
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
 
const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: hardSet,
}
</script>


# React Integration
Redux persist ships with react integration as a convenience. The PersistGate component is the recommended way to delay rendering until persistence is complete. It works in one of two modes:

1. loading prop: The provided loading value will be rendered until persistence is complete at which point children will be rendered.
2. function children: The function will be invoked with a single bootstrapped argument. When bootstrapped is true, persistence is complete and it is safe to render the full app. This can be useful for adding transition animations.


# Blacklist & Whitelist
By Example:
<script>
// BLACKLIST
const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['navigation'] // navigation will not be persisted
};
 
// WHITELIST
const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['navigation'] // only navigation will be persisted
};
</script>


# Nested Persists
Nested persist can be useful for including different storage adapters, code splitting, or deep filtering. For example while blacklist and whitelist only work one level deep, but we can use a nested persist to blacklist a deeper value:


<script>
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
 
import { authReducer, otherReducer } from './reducers'
 
const rootPersistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['auth']
}
 
const authPersistConfig = {
  key: 'auth',
  storage: storage,
  blacklist: ['somethingTemporary']
}
 
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  other: otherReducer,
})
 
export default persistReducer(rootPersistConfig, rootReducer)
</script>

# Storage Engines

- localStorage import storage from 'redux-persist/lib/storage'
- sessionStorage import storageSession from 'redux-persist/lib/storage/session'
- AsyncStorage react-native import AsyncStorage from '@react-native-community/async-storage'

- localForage recommended for web
- electron storage Electron support via electron store
- redux-persist-filesystem-storage react-native, to mitigate storage size limitations in android (#199, #284)