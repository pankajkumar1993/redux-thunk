# What is Redux Thunk and why to use?

Redux has become the go-to state management library for many JavaScript applications due to its predictable state container and unidirectional data flow.
However, handling asynchronous actions in Redux can be a bit tricky. That's where Redux middleware like Redux-Thunk comes to the rescue.

In essence, Redux-Thunk enhances the capabilities of Redux by providing a straightforward and efficient mechanism for managing asynchronous actions. It enables developers to write clean, predictable, and maintainable code while ensuring the integrity of the application's state management.

## 1. Introduction to Redux-Thunk

- Redux-Thunk is a middleware for Redux that allows you to write action creators that return a function instead of an action object.
- This function receives the store's dispatch method and getState function as arguments, allowing it to dispatch multiple actions, perform asynchronous operations, and access the current state if needed before dispatching an action.

## 1.1. Understanding Middleware in Redux

Middleware provides a way to interact with actions dispatched to the Redux store before they reach the reducer. It sits between the action dispatch and the reducer, allowing you to intercept, modify, or delay actions as needed.

It provides a way to extend Redux's functionality by intercepting and potentially modifying actions before they reach the reducers.

## 1.2. The Role of Redux-Thunk

The primary purpose of Redux-Thunk is to handle asynchronous actions in Redux. Asynchronous actions, such as fetching data from an API or performing asynchronous computations, are common in web applications.

Redux-Thunk enables you to dispatch actions asynchronously, making it easier to manage side effects in your Redux applications.

## 2. Installation and Setup

1. Firstly create react app and install
   npm create vite@latest
   npm install redux react-redux

(Optional) Install Redux Toolkit: If you're using the Redux Toolkit (recommended for easier setup and development), you can install it with:
npm install @reduxjs/toolkit

2. Setting up Redux-Thunk in your Redux project is straightforward. First, you need to install the redux-thunk package using npm or yarn:

npm install redux-thunk

## or

yarn add redux-thunk

Once installed, you can integrate Redux-Thunk into your Redux store by applying it as middleware when creating the store:

<script>
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);
</script>

By applying Redux-Thunk middleware using applyMiddleware, you enable Redux to recognize and process thunk functions when they are dispatched.

## 3. Working with Redux-Thunk

### 3.1. Writing Thunk Functions

- Writing thunk functions in Redux involves defining asynchronous action creators that return a function instead of a plain action object.
- These functions have access to the dispatch and getState methods of the Redux store, allowing you to perform asynchronous operations and dispatch actions based on the results.

<script>
  // actions.js
import axios from 'axios';

// Action types
export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

// Action creators
export const fetchDataRequest = () => ({
  type: FETCH_DATA_REQUEST
});

export const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data
});

export const fetchDataFailure = (error) => ({
  type: FETCH_DATA_FAILURE,
  payload: error
});

// Thunk action creator
export const fetchData = () => {
  return async (dispatch, getState) => {
    dispatch(fetchDataRequest());
    try {
      const response = await axios.get('https://api.example.com/data');
      dispatch(fetchDataSuccess(response.data));
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  };
};
</script>

In this example:

1. We defined action types for different stages of the data fetching process: request, success, and failure.
2. We defined action creators for each action type, which return plain action objects with the appropriate type and payload.
3. We defined a thunk action creator called fetchData, which returns a function instead of a plain action object. This function receives dispatch and getState as arguments, allowing us to dispatch actions and access the current Redux state.
4. Inside the thunk function, we dispatch the FETCH_DATA_REQUEST action to indicate that the data fetching process has started.
5. We used axios (you can use any other HTTP client) to make an asynchronous GET request to fetch data from an API endpoint.
6. If the request is successful, we dispatch the FETCH_DATA_SUCCESS action with the fetched data as the payload.
7. If the request fails, we dispatch the FETCH_DATA_FAILURE action with the error message as the payload.

Thunk functions provide a flexible and powerful way to handle asynchronous actions in Redux, allowing you to encapsulate complex asynchronous logic and manage side effects effectively.

### 3.2. Dispatching Thunk Actions

You can dispatch thunk actions just like regular actions using the dispatch method provided by the Redux store:

`store.dispatch(fetchUser());`

When you dispatch a thunk action, Redux-Thunk intercepts it and invokes the thunk function with the dispatch method and getState function as arguments.

This allows the thunk function to perform asynchronous operations and dispatch additional actions if needed.

## 4. Handling Asynchronous Operations

One of the main benefits of Redux-Thunk is its ability to handle asynchronous operations seamlessly. Let's explore some common scenarios where Redux-Thunk shines:

### 4.1. Making Asynchronous API Calls

Making asynchronous API calls in Redux thunks is a common use case for handling data fetching and updating in React applications.

### A. Import Necessary Dependencies

First, make sure you have the necessary dependencies installed. You'll typically need Redux, Redux Thunk middleware, and a library for making HTTP requests, such as Axios or Fetch.
`npm install redux redux-thunk axios`

### B. Create Thunk Action Creators

Define thunk action creators that will dispatch actions for handling API requests. Thunks are functions that return another function, allowing you to perform asynchronous operations before dispatching actions.

<script>
  // actions.js
import axios from 'axios';

export const fetchDataRequest = () => ({ type: 'FETCH_DATA_REQUEST' });
export const fetchDataSuccess = (data) => ({ type: 'FETCH_DATA_SUCCESS', payload: data });
export const fetchDataFailure = (error) => ({ type: 'FETCH_DATA_FAILURE', payload: error });

export const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      const response = await axios.get('https://api.example.com/data');
      dispatch(fetchDataSuccess(response.data));
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  };
};
</script>

### C. Dispatch Thunk Actions

Dispatch the thunk action creator from your component when you need to fetch data. This will trigger the asynchronous API call and update the Redux store accordingly.

<script>
  // SomeComponent.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from './actions';

const SomeComponent = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector(state => state.someReducer);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {/* Display fetched data */}
    </div>
  );
};

export default SomeComponent;
</script>

### D. Update Reducer

Update the reducer to handle the dispatched actions and update the state accordingly.

<script>
  // reducers.js
const initialState = {
  data: null,
  isLoading: false,
  error: null
};

const someReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_DATA_REQUEST':
      return { ...state, isLoading: true, error: null };
    case 'FETCH_DATA_SUCCESS':
      return { ...state, data: action.payload, isLoading: false };
    case 'FETCH_DATA_FAILURE':
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
};

export default someReducer
</script>

### E. Set Up Redux Store

Finally, set up your Redux store with Redux Thunk middleware.

<script>
// store.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
</script>

Now your Redux application is set up to make asynchronous API calls using Redux thunks. Thunks provide a convenient way to handle asynchronous operations in Redux and integrate seamlessly with the Redux workflow.

## 4.2. Managing Side Effects with Thunks

Managing side effects, such as asynchronous operations, in Redux applications can be effectively done using thunks.

Thunks allow you to encapsulate complex logic, including side effects, within action creators, providing a centralized and organized way to handle such operations.

### A. Define Thunk Action Creators

Create thunk action creators that encapsulate the asynchronous logic or side effects you want to manage.

Thunks are functions that return another function, giving you access to the dispatch function and the Redux store's getState method.

<script>
  // actions.js
import axios from 'axios';

export const fetchDataRequest = () => ({ type: 'FETCH_DATA_REQUEST' });
export const fetchDataSuccess = (data) => ({ type: 'FETCH_DATA_SUCCESS', payload: data });
export const fetchDataFailure = (error) => ({ type: 'FETCH_DATA_FAILURE', payload: error });

export const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      const response = await axios.get('https://api.example.com/data');
      dispatch(fetchDataSuccess(response.data));
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  };
};
</script>

## B. Dispatch Thunk Actions

Dispatch the thunk action creator from your components when you need to trigger the side effect. This will execute the asynchronous logic encapsulated within the thunk.

<script>
  // SomeComponent.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from './actions';

const SomeComponent = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector(state => state.someReducer);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  // Render UI based on the fetched data, loading state, or error status
};

export default SomeComponent;
</script>

# C. Update Reducer

Update the reducer to handle the dispatched actions and update the Redux store state accordingly. This typically involves updating the state to reflect the loading state, success, or failure of the asynchronous operation.

<script>
  // reducers.js
const initialState = {
  data: null,
  isLoading: false,
  error: null
};

const someReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_DATA_REQUEST':
      return { ...state, isLoading: true, error: null };
    case 'FETCH_DATA_SUCCESS':
      return { ...state, data: action.payload, isLoading: false };
    case 'FETCH_DATA_FAILURE':
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
};

export default someReducer;
</script>

## D. Set Up Redux Store with Thunk Middleware

Ensure that you have set up your Redux store with Redux Thunk middleware to enable thunk action creators.

<script>
  // store.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
</script>

With thunks, you can manage side effects such as data fetching, API calls, or any asynchronous operations in a structured and centralized manner within your Redux application.

Thunks promote separation of concerns and make it easier to test and maintain asynchronous logic within your Redux codebase.

## 5. Advanced Techniques

Redux-Thunk offers several advanced techniques for handling complex scenarios. Let's explore some of them:

### 5.1. Error Handling in Thunks

Error handling in thunks is essential to ensure that your Redux application behaves predictably and gracefully handles errors that occur during asynchronous operations, such as API requests.

Here's how you can handle errors effectively in thunks:

### A. Catch Errors in Thunks

<script>
export const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      const response = await fetch('https://api.example.com/data');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      dispatch(fetchDataSuccess(data));
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  };
};
</script>

In this example:

We used a try...catch block to catch any errors that occur during the asynchronous operation (in this case, fetching data from an API).
If an error occurs, we dispatch an action to handle the error (fetchDataFailure), passing the error message as payload.

### B. Handle Errors Appropriately

Dispatch specific error actions based on the type of error encountered.
Include meaningful error messages or error codes in error actions to provide context for debugging and user feedback.
Consider whether certain errors should trigger additional actions or side effects, such as logging errors or displaying error notifications.

## C. Centralize Error Handling Logic

// sharedThunks.js

<script>
export const handleApiError = (error) => {
  return (dispatch) => {
    dispatch(showErrorNotification(error.message));
    dispatch(logError(error));
  };
};
</script>

In this example:

We defined a shared thunk (handleApiError) responsible for handling errors from API requests.
This thunk dispatches actions to display error notifications and log errors.
Centralizing error handling logic in shared thunks promotes consistency and reusability across different parts of your application.

### D. Test Error Scenarios

Write unit tests to cover error handling scenarios in your thunks.
Mock API requests to simulate different error conditions, such as network errors or server errors.
Verify that the thunk dispatches the correct error actions and handles errors appropriately.

### E. Consider Retry Strategies

Implement retry strategies for handling transient errors, such as temporary network issues or rate-limiting errors.
Thunks can include retry logic to attempt the operation again after a delay or a certain number of retries.
By effectively handling errors in thunks, you can improve the robustness and reliability of your Redux application, providing users with a better experience and simplifying debugging and maintenance efforts.

## 5.2. Chaining Multiple Thunks

Thunks can be chained together to perform complex sequences of asynchronous operations. This is useful when you need to perform multiple asynchronous tasks sequentially:

<script>
const fetchUserAndPosts = () => {
  return async (dispatch, getState) => {
    try {
      // Fetch user
      dispatch({ type: 'FETCH_USER_REQUEST' });
      const userResponse = await fetch('https://api.example.com/user');
      const user = await userResponse.json();
      dispatch({ type: 'FETCH_USER_SUCCESS', payload: user });

      // Fetch posts
      dispatch({ type: 'FETCH_POSTS_REQUEST' });


 const postsResponse = await fetch('https://api.example.com/posts');
      const posts = await postsResponse.json();
      dispatch({ type: 'FETCH_POSTS_SUCCESS', payload: posts });
    } catch (error) {
      dispatch({ type: 'FETCH_FAILURE', error: error.message });
    }
  };
};
</script>

By chaining multiple thunk functions together, you can orchestrate complex asynchronous workflows with ease.

## 6. Best Practices

While Redux-Thunk provides powerful capabilities for handling asynchronous actions, it's essential to follow best practices to ensure your code remains maintainable and efficient.

Here are some best practices to consider:

### 6.1. Structuring Thunks for Maintainability

Structuring thunks for maintainability is crucial to ensure that your Redux code remains organized, scalable, and easy to maintain as your application grows.

Here's a recommended approach for structuring thunks:

#### Separate Concerns

1. Action Types and Action Creators
   Define action types and action creators separately to promote reusability and maintainability.
   Group related action types and creators in logical modules or files.

2. b. Thunk Functions
   Define thunk functions separately from action creators to keep the concerns of asynchronous operations distinct from synchronous actions.

### Modularize Thunks

1. Module-Level Thunks

- Group related thunk functions within modules or feature slices of your application.
- Each module can contain its own set of thunks responsible for handling asynchronous operations related to that module.

2. Reusable Thunks

- Extract reusable thunks into separate files or utility modules that can be shared across different parts of your application.
- Common asynchronous operations, such as data fetching or authentication, can be encapsulated as reusable thunks.

## Encapsulate Complex Logic

1. Action Composition
   Encapsulate complex logic related to action composition within thunks.
   Thunks can orchestrate multiple synchronous actions to perform a higher-level operation.

2. Error Handling:
   Centralize error handling logic within thunks to ensure consistent error reporting and recovery strategies.
   Thunks can catch and handle errors from asynchronous operations before dispatching appropriate error actions.

## Use Async/Await for Readability

1. Async/Await Syntax

- Use async/await syntax within thunks for cleaner and more readable asynchronous code.
- Async functions make it easier to manage asynchronous control flow when compared to using raw Promises.

### Example Structure

Here's an example of how you can structure thunks for maintainability:

src/
├── actions/
│ ├── actionTypes.js
│ ├── feature1Actions.js
│ ├── feature2Actions.js
│ └── ...
├── thunks/
│ ├── feature1Thunks.js
│ ├── feature2Thunks.js
│ ├── sharedThunks.js
│ └── index.js
├── reducers/
│ ├── feature1Reducer.js
│ ├── feature2Reducer.js
│ └── ...
└── store.js
In this structure:

feature1Thunks.js and feature2Thunks.js contain thunks specific to different features/modules of your application.
sharedThunks.js contains reusable thunks shared across multiple features.
index.js exports all thunks to be imported into the Redux store setup.
Action types and action creators are defined in separate files within the actions directory.
By structuring thunks in a modular and organized manner, you can improve the maintainability of your Redux codebase.

Separating concerns, encapsulating complex logic, and promoting reusability will make it easier to manage and extend your application's asynchronous behavior over time.

## 6.2. Avoiding Common Pitfalls

Avoiding common pitfalls when working with Redux-Thunk can help maintain a smoother development process and ensure the reliability of your Redux applications.

Here are some common pitfalls to watch out for and how to avoid them:

1. Overusing Thunks for Synchronous Actions
   Thunks are primarily meant for handling asynchronous actions. Overusing them for synchronous actions can lead to unnecessary complexity in your code.
   Solution: Reserve thunks for asynchronous actions like data fetching or API calls. For synchronous actions, define regular action creators that directly return action objects.

2. Excessive Logic in Thunks
   Putting too much logic inside thunks can make them hard to understand, test, and maintain.
   Solution: Keep thunks focused on dispatching actions and handling asynchronous operations. Extract complex logic into separate functions or utilities that can be tested independently.

3. Lack of Error Handling
   Failing to handle errors properly in thunks can result in unexpected behavior or application crashes.
   Solution: Ensure that your thunks handle errors gracefully by catching exceptions and dispatching appropriate error actions. This includes handling errors from asynchronous operations like API requests.

4. Inefficient Data Fetching
   Inefficient data fetching practices, such as fetching the same data repeatedly or fetching unnecessary data, can impact performance.
   Solution: Implement caching mechanisms to store fetched data locally and avoid redundant API requests. Use memoization techniques or selectors to optimize data fetching and avoid unnecessary re-rendering.

5. Poor Testing Practices
   Inadequate testing of thunks can result in undetected bugs and regressions.
   Solution: Write comprehensive unit tests for your thunks to cover different scenarios, including successful and failed asynchronous operations. Mock external dependencies like API requests to isolate the behavior of thunks.

6. Uncontrolled Side Effects
   Thunks that trigger unintended side effects or have unpredictable behavior can lead to bugs and unexpected application states.
   Solution: Be mindful of the side effects introduced by your thunks, such as modifying global state or interacting with external systems. Keep side effects under control and clearly document the behavior of your thunks.

7. Complex Middleware Composition
   Adding multiple middleware layers, such as logging or analytics, without proper organization and coordination can make the middleware pipeline hard to manage.
   Solution: Keep the middleware composition simple and well-organized. Use middleware libraries like Redux DevTools Extension to debug and monitor middleware behavior during development.
   By avoiding these common pitfalls and following best practices when working with Redux-Thunk, you can improve the reliability, performance, and maintainability of your Redux applications.

## 6.3. Testing Thunk Functions

Testing thunk functions in Redux applications is crucial to ensure that asynchronous actions behave as expected.

When testing thunk functions, you want to verify that the correct actions are dispatched under various conditions, such as successful API requests, failed requests, or edge cases.

Here's how you can test thunk functions using popular testing frameworks like Jest and testing utilities like Redux Mock Store:

### Example Test Setup

Let's assume we have a thunk function called fetchData that fetches data from an API and dispatches corresponding actions based on the result:

<script>
// actions.js
export const fetchDataRequest = () => ({ type: 'FETCH_DATA_REQUEST' });
export const fetchDataSuccess = (data) => ({ type: 'FETCH_DATA_SUCCESS', payload: data });
export const fetchDataFailure = (error) => ({ type: 'FETCH_DATA_FAILURE', payload: error });

// thunks.js
import { fetchDataRequest, fetchDataSuccess, fetchDataFailure } from './actions';

export const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      const response = await fetch('https://api.example.com/data');
      const data = await response.json();
      dispatch(fetchDataSuccess(data));
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  };
};
</script>

### Writing Tests

Here's how you can write tests for the fetchData thunk function:

<script>
// thunks.test.js
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'jest-fetch-mock';
import { fetchData } from './thunks';
import { fetchDataRequest, fetchDataSuccess, fetchDataFailure } from './actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

fetchMock.enableMocks();

describe('fetchData thunk', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('dispatches fetchDataSuccess action after successful API request', async () => {
    const mockData = { id: 1, name: 'Example Data' };
    fetchMock.mockResponse(JSON.stringify(mockData));
    const expectedActions = [
      fetchDataRequest(),
      fetchDataSuccess(mockData)
    ];
    const store = mockStore();

    await store.dispatch(fetchData());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatches fetchDataFailure action after failed API request', async () => {
    const errorMessage = 'Failed to fetch data';
    fetchMock.mockReject(new Error(errorMessage));
    const expectedActions = [
      fetchDataRequest(),
      fetchDataFailure(errorMessage)
    ];
    const store = mockStore();

    await store.dispatch(fetchData());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
</script>

Here's what happens in the code above:

1. Mocking Fetch API:
   We used Jest's fetchMock to mock the fetch function, allowing us to control its behavior during testing.

2. Configuring Redux Mock Store:
   We configured a mock Redux store using redux-mock-store, enabling us to simulate Redux store behavior in our tests.

3. Dispatching Thunk Function:
   We dispatched the fetchData thunk function using the mock store and then await its completion.

4. Expectations:
   We assert that the expected actions are dispatched based on different scenarios (successful or failed API requests).

5. Resetting Mocks:
   We reset the mocks before each test to ensure that they start in a clean state.
   By writing tests for thunk functions in this manner, you can verify their behavior under various conditions, ensuring the reliability and correctness of your Redux application's asynchronous actions.

## 7. Real-World Examples

To demonstrate the practical use of Redux-Thunk, let's look at some real-world examples of how it can be used in a Redux application.

### 7.1. Integration with React Applications

Redux-Thunk integrates seamlessly with React applications, allowing you to manage asynchronous data fetching, state updates, and side effects efficiently.

Here's a simple example of using Redux-Thunk with React:

<script>
// Component.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './redux/userThunks';

const Component = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div>
      {user ? <div>{user.name}</div> : <div>Loading...</div>}
    </div>
  );
};

export default Component;
</script>

## 7.2. Use Cases in Large-Scale Projects

In large-scale React projects, Redux-Thunk can be a valuable tool for managing asynchronous actions and handling complex logic.

Here are some common use cases for Redux-Thunk in large-scale projects:

1. Data Fetching
   Large-scale applications often need to fetch data from multiple APIs or endpoints. Redux-Thunk allows you to encapsulate these asynchronous operations in action creators.
   You can handle scenarios like fetching initial data when a component mounts, paginating through large datasets, or refreshing data periodically.

2. Authentication
   Implementing authentication flows, such as logging in, logging out, or refreshing tokens, often involves asynchronous operations like making API requests and updating the user's authentication state.
   Redux-Thunk can manage these operations, dispatching actions to update the authentication state based on the API responses and handling any errors that occur during the process.

3. Form Submission
   Large-scale forms with complex validation requirements and submission processes may require asynchronous actions to handle form submissions.
   Redux-Thunk can dispatch actions to submit form data, handle server responses (success or error), and update the application state accordingly.

4. Optimistic Updates
   In applications where user interactions trigger asynchronous actions with optimistic UI updates, Redux-Thunk can help manage the flow of actions.
   You can dispatch optimistic actions to update the UI immediately and then dispatch additional actions based on the success or failure of the asynchronous operation.

5. WebSocket Integration
   Large-scale applications often use WebSocket connections for real-time communication with servers.
   Redux-Thunk can be used to manage WebSocket connections and dispatch actions in response to incoming messages or events, such as updating UI components or triggering additional actions.

6. Complex Business Logic
   As applications grow in complexity, they may require more sophisticated business logic to handle various scenarios and edge cases.
   Redux-Thunk allows you to encapsulate complex logic within action creators, making it easier to manage and test.

7. Middleware Composition
   In large-scale projects, you may have multiple middleware layers in your Redux setup for tasks like logging, error handling, or analytics.
   Redux-Thunk can be seamlessly integrated into the middleware pipeline, allowing you to compose multiple middleware functions to handle different aspects of your application's behavior.
   By leveraging Redux-Thunk in these use cases, you can effectively manage asynchronous actions, handle complex application logic, and maintain a scalable and maintainable codebase in large-scale React projects.

## 8. Performance Considerations

While Redux-Thunk provides powerful capabilities for handling asynchronous actions, it's essential to consider its impact on the performance of your application.

Here are some performance considerations to keep in mind:

1. Asynchronous Operations
   Redux-Thunk enables handling asynchronous operations, such as making API requests or performing computations that take time to complete.

These operations can introduce latency into your application, impacting overall performance.

2. Blocking the Event Loop
   Long-running synchronous tasks within thunks can potentially block the JavaScript event loop, leading to unresponsive user interfaces.

Avoid blocking the event loop by offloading heavy computations to worker threads or breaking them into smaller asynchronous tasks.

3. Middleware Overhead
   Adding middleware to the Redux middleware pipeline incurs a slight performance overhead, as each middleware function needs to process dispatched actions sequentially.

While this overhead is generally minimal, it's essential to keep middleware composition efficient.

4. Thunk Composition
   The composition of multiple thunks can impact performance, especially if thunks trigger additional asynchronous operations sequentially.

Carefully consider thunk composition to minimize unnecessary delays and optimize performance.

5. Redux DevTools Integration
   Enabling Redux DevTools for debugging purposes can impact performance, especially when recording or replaying actions.

Use Redux DevTools judiciously, especially in production environments, to minimize performance overhead.

6. Memoization and Caching
   Implement memoization techniques or caching for fetched data to reduce redundant computations and API requests.

Memoization ensures that expensive computations are performed only when necessary, improving application responsiveness.

7. Code Splitting and Dynamic Imports
   Consider code-splitting your Redux-related code and dynamically importing thunks or reducers only when needed. This approach can reduce the initial bundle size of your application and improve load times, especially for large-scale applications.

8. Testing and Profiling
   Regularly test and profile your application to identify performance bottlenecks and areas for optimization. Use performance profiling tools to measure the impact of Redux-Thunk on application responsiveness and identify opportunities for improvement.

By considering these performance considerations and following best practices, you can ensure that your Redux-Thunk-based application remains responsive and efficient, providing a smooth user experience. Balancing the power of Redux-Thunk with performance optimizations is essential for building high-performing Redux applications.

# 9. Alternatives to Redux-Thunk

While Redux-Thunk is a popular choice for handling asynchronous actions in Redux, there are alternative middleware solutions available that offer similar or additional capabilities.

Some popular alternatives to Redux-Thunk include Redux-Saga, Redux-Observable.

# 9.1. Comparison with Other Middleware

Each middleware solution has its own strengths and weaknesses, depending on the specific requirements of your application.

Here's a brief comparison of Redux-Thunk with other middleware solutions:

# Redux-Saga

Redux-Saga is a library for managing side effects in Redux applications. It uses ES6 Generators to make asynchronous code easier to read, write, and test.
Sagas are defined as separate functions that listen for specific Redux actions and can then perform asynchronous operations in a more declarative and testable way.
Redux-Saga is great for handling complex asynchronous logic, such as race conditions, cancellations, and retries.
Here's an example of a Redux-Saga:

<script>
function* fetchData() {
  try {
    const data = yield call(api.fetchData);
    yield put({ type: 'FETCH_DATA_SUCCESS', payload: data });
  } catch (error) {
    yield put({ type: 'FETCH_DATA_FAILURE', payload: error });
  }
}

function* watchFetchData() {
  yield takeEvery('FETCH_DATA_REQUEST', fetchData);
}
</script>

# Redux-Thunk-Extra

Redux-Thunk-Extra is an enhanced version of Redux-Thunk with additional features like promise support and action creators for starting, succeeding, and failing async operations.
It provides a simpler API when compared to Redux-Saga and can be a good choice if you prefer the familiar thunk-style syntax but need more features.
Here's an example of using Redux-Thunk-Extra with promises:

<script>
const fetchData = () => {
  return (dispatch) => {
    dispatch({ type: 'FETCH_DATA_START' });

    api.fetchData()
      .then(data => dispatch({ type: 'FETCH_DATA_SUCCESS', payload: data }))
      .catch(error => dispatch({ type: 'FETCH_DATA_FAILURE', payload: error }));
  };
};
</script>

# Redux-Observable

Redux-Observable is a middleware for Redux based on RxJS, a powerful library for reactive programming.
It allows you to express complex asynchronous workflows using observable streams, making it suitable for handling events over time, such as user inputs or WebSocket connections.
Redux-Observable is a good choice for applications with a heavy focus on reactive programming or where you need fine-grained control over asynchronous behavior.
Here's an example of using Redux-Observable:

<script>
const fetchDataEpic = action$ => action$.pipe(
  ofType('FETCH_DATA_REQUEST'),
  mergeMap(() =>
    ajax.getJSON('https://api.example.com/data').pipe(
      map(response => ({ type: 'FETCH_DATA_SUCCESS', payload: response })),
      catchError(error => of({ type: 'FETCH_DATA_FAILURE', payload: error }))
    )
  )
);

</script>

## Fetch API with Async/Await

If your asynchronous operations are relatively simple and you prefer to keep your dependencies minimal, you can use the Fetch API combined with async/await syntax directly in your action creators without any middleware.
This approach works well for simple data fetching scenarios but may become unwieldy for more complex async logic.
Each of these alternatives has its own strengths and use cases, so choose the one that best fits your project requirements and coding preferences.

# 9.2. When to Choose Redux-Thunk

Redux-Thunk is an excellent choice for handling simple to moderately complex asynchronous actions in Redux applications. It's lightweight, easy to understand, and integrates seamlessly with existing Redux codebases.

Consider using Redux-Thunk for:

1. Asynchronous Operations
Use Redux-Thunk when you need to perform asynchronous operations like fetching data from an API, handling timers, or any operation that doesn't immediately return a value.
Here's an example of how Redux-Thunk handles an asynchronous action, like fetching data:
<script>
// Action creator with Redux-Thunk
const fetchData = () => {
  return (dispatch) => {
    dispatch({ type: 'FETCH_DATA_REQUEST' });

    fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(data => dispatch({ type: 'FETCH_DATA_SUCCESS', payload: data }))
      .catch(error => dispatch({ type: 'FETCH_DATA_FAILURE', payload: error }));
  };
};
</script>

2. Middleware Functionality
   Redux-Thunk is a middleware, meaning it sits between an action being dispatched and the moment it reaches the reducer. This allows for additional functionality like logging, modifying actions, or handling side effects.
   If you need to perform actions before or after an action is dispatched, Redux-Thunk is a good choice.

## Simple Setup

Redux-Thunk integrates seamlessly with Redux, requiring minimal setup. It's easy to add to an existing Redux project.
Here's how you can add Redux-Thunk to your Redux store:

<script>
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));
</script>

3. Handling Complex Logic
   If your application involves complex asynchronous logic, such as multiple API calls or conditional dispatching, Redux-Thunk provides a straightforward way to manage such complexity.
   You can encapsulate complex logic within thunk action creators, keeping your components clean and focused on presentation.

4. Community Support and Resources
   Redux-Thunk is a widely used middleware for Redux, which means there are plenty of resources, tutorials, and community support available.
   If you're new to Redux or asynchronous data fetching in Redux, choosing Redux-Thunk can provide you with a wealth of learning materials and examples.
   Choose Redux-Thunk when you need to handle asynchronous operations in your Redux application, want to keep your setup simple, require middleware functionality, need to manage complex logic, or benefit from community support and resources.

# 10. Conclusion

Redux-Thunk is a powerful middleware for handling asynchronous actions in Redux applications. By allowing you to write thunk functions that encapsulate asynchronous logic, Redux-Thunk simplifies the process of managing side effects and coordinating complex workflows.

Whether you're fetching data from an API, performing background computations, or synchronizing state across different parts of your application, Redux-Thunk provides a flexible and intuitive solution for managing asynchronous actions in Redux.

In this comprehensive guide, we've covered everything you need to know about Redux-Thunk, from installation and setup to advanced techniques and best practices.

By following the principles outlined in this guide and applying them to your Redux projects, you'll be well-equipped to handle asynchronous actions effectively and build robust, maintainable Redux applications.

# How to use

1. Install Axios.
2. Create Action Types for User CRUD.
3. Thunk Action Creators for CRUD Operations.
4. Reducer to Handle User State.
5. Dispatch Thunk Actions in the Component.

# What is a "thunk"?

The word "thunk" is a programming term that means "a piece of code that does some delayed work". Rather than execute some logic now, we can write a function body or code that can be used to perform the work later.

For Redux specifically, "thunks" are a pattern of writing functions with logic inside that can interact with a Redux store's dispatch and getState methods.

Using thunks requires the redux-thunk middleware to be added to the Redux store as part of its configuration.

Thunks are a standard approach for writing async logic in Redux apps, and are commonly used for data fetching. However, they can be used for a variety of tasks, and can contain both synchronous and asynchronous logic.

# Writing Thunks

A thunk function is a function that accepts two arguments: the Redux store dispatch method, and the Redux store getState method. Thunk functions are not directly called by application code. Instead, they are passed to store.dispatch():

const thunkFunction = (dispatch, getState) => {
// logic here that can dispatch actions or read state
}

store.dispatch(thunkFunction)

A thunk function may contain any arbitrary logic, sync or async, and can call dispatch or getState at any time.

In the same way that Redux code normally uses action creators to generate action objects for dispatching instead of writing action objects by hand, we normally use thunk action creators to generate the thunk functions that are dispatched. A thunk action creator is a function that may have some arguments, and returns a new thunk function. The thunk typically closes over any arguments passed to the action creator, so they can be used in the logic:

<script>
// fetchTodoById is the "thunk action creator"
export function fetchTodoById(todoId) {
  // fetchTodoByIdThunk is the "thunk function"
  return async function fetchTodoByIdThunk(dispatch, getState) {
    const response = await client.get(`/fakeApi/todo/${todoId}`)
    dispatch(todosLoaded(response.todos))
  }
}
</script>

Thunk functions and action creators can be written using either the function keyword or arrow functions - there's no meaningful difference here. The same fetchTodoById thunk could also be written using arrow functions, like this:

<script>
export const fetchTodoById = todoId => async dispatch => {
  const response = await client.get(`/fakeApi/todo/${todoId}`)
  dispatch(todosLoaded(response.todos))
}
</script>

In either case, the thunk is dispatched by calling the action creator, in the same way as you'd dispatch any other Redux action:

<script>
function TodoComponent({ todoId }) {
  const dispatch = useDispatch()

  const onFetchClicked = () => {
    // Calls the thunk action creator, and passes the thunk function to dispatch
    dispatch(fetchTodoById(todoId))
  }
}
</script>

# Why Use Thunks?

Thunks allow us to write additional Redux-related logic separate from a UI layer. This logic can include side effects, such as async requests or generating random values, as well as logic that requires dispatching multiple actions or access to the Redux store state.

Redux reducers must not contain side effects, but real applications require logic that has side effects. Some of that may live inside components, but some may need to live outside the UI layer. Thunks (and other Redux middleware) give us a place to put those side effects.

It's common to have logic directly in components, such as making an async request in a click handler or a useEffect hook and then processing the results. However, it's often necessary to move as much of that logic as possible outside the UI layer. This may be done to improve testability of the logic, to keep the UI layer as thin and "presentational" as possible, or to improve code reuse and sharing.

In a sense, a thunk is a loophole where you can write any code that needs to interact with the Redux store, ahead of time, without needing to know which Redux store will be used. This keeps the logic from being bound to any specific Redux store instance and keeps it reusable.

# Detailed Explanation: Thunks, Connect, and "Container Components"

Historically, another reason to use thunks was to help keep React components "unaware of Redux". The connect API allowed passing action creators and "binding" them to automatically dispatch actions when called. Since components typically did not have access to dispatch internally, passing thunks to connect made it possible for components to just call this.props.doSomething(), without needing to know if it was a callback from a parent, dispatching a plain Redux action, dispatching a thunk performing sync or async logic, or a mock function in a test.

With the arrival of the React-Redux hooks API, that situation has changed. The community has switched away from the "container/presentational" pattern in general, and components now have access to dispatch directly via the useDispatch hook. This does mean that it's possible to have more logic directly inside of a component, such as an async fetch + dispatch of the results. However, thunks have access to getState, which components do not, and there's still value in moving that logic outside of components.

# Thunk Use Cases

Because thunks are a general-purpose tool that can contain arbitrary logic, they can be used for a wide variety of purposes. The most common use cases are:

1. Moving complex logic out of components
2. Making async requests or other async logic
3. Writing logic that needs to dispatch multiple actions in a row or over time
4. Writing logic that needs access to getState to make decisions or include other state values in an action
5. Thunks are "one-shot" functions, with no sense of a lifecycle. They also cannot see other dispatched actions. So, they should not generally be used for initializing persistent connections like websockets, and you can't use them to respond to other actions.

Thunks are best used for complex synchronous logic, and simple to moderate async logic such as making a standard AJAX request and dispatching actions based on the request results.

# Redux Thunk Middleware

Dispatching thunk functions requires that the redux-thunk middleware has been added to the Redux store as part of its configuration.

# Adding the Middleware

The Redux Toolkit configureStore API automatically adds the thunk middleware during store creation, so it should typically be available with no extra configuration needed.

If you need to add the thunk middleware to a store manually, that can be done by passing the thunk middleware to applyMiddleware() as part of the setup process.

# How Does the Middleware Work?

To start, let's review how Redux middleware work in general.

Redux middleware are all written as a series of 3 nested functions:

The outer function receives a "store API" object with {dispatch, getState}
The middle function receives the next middleware in the chain (or the actual store.dispatch method)
The inner function will be called with each action as it's passed through the middleware chain
It's important to note that middleware can be used to allow passing values that are not action objects into store.dispatch(), as long as the middleware intercepts those values and does not let them reach the reducers.

With that in mind, we can look at the specifics of the thunk middleware.

The actual implementation of the thunk middleware is very short - only about 10 lines. Here's the source, with additional added comments:

Redux thunk middleware implementation, annotated

<script>
// standard middleware definition, with 3 nested functions:
// 1) Accepts `{dispatch, getState}`
// 2) Accepts `next`
// 3) Accepts `action`
const thunkMiddleware =
  ({ dispatch, getState }) =>
  next =>
  action => {
    // If the "action" is actually a function instead...
    if (typeof action === 'function') {
      // then call the function and pass `dispatch` and `getState` as arguments
      return action(dispatch, getState)
    }

    // Otherwise, it's a normal action - send it onwards
    return next(action)
  }
</script>

In other words:

If you pass a function into dispatch, the thunk middleware sees that it's a function instead of an action object, intercepts it, and calls that function with (dispatch, getState) as its arguments
If it's a normal action object (or anything else), it's forwarded to the next middleware in the chain

# Folder Structure for Redux Store

store/  
 user/
index.ts
actions.ts
reducer.ts
types.ts (All types defined and used in this user store module)
todo/
index.ts
actions.ts
reducer.ts
types.ts
utils/
api.ts
