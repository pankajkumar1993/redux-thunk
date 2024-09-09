import { UserActionTypes, UserState } from "./types";
import {
  ADD_USER,
  ADD_USER_ERROR,
  ADD_USER_SUCCESS,
  DELETE_USER_ERROR,
  DELETE_USER_SUCCESS,
  EDIT_USER,
  EDIT_USER_ERROR,
  EDIT_USER_SUCCESS,
  FETCH_USER,
  FETCH_USER_ERROR,
  FETCH_USER_SUCCESS,
  FETCH_USERS,
  FETCH_USERS_ERROR,
  FETCH_USERS_SUCCESS,
} from "./userActions";

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};


const userReducer = (state = initialState, action: UserActionTypes): UserState => {
  switch (action.type) {
    // --------- Fetch Users ---------
    case FETCH_USERS:
      return {
        ...state,
        loading: true,
      };

    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case FETCH_USERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // --------- Add User ---------
    case ADD_USER:
      return {
        ...state,
        loading: true,
      };

    case ADD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: [...state.users, action.payload],
      };

    case ADD_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // --------- Edit User ---------
    case EDIT_USER:
      return {
        ...state,
        loading: true,
      };

    case EDIT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };

    case EDIT_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // --------- Delete User ---------
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };

    case DELETE_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FETCH_USER:
    case EDIT_USER:
      return { ...state, loading: true, error: null };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case EDIT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case FETCH_USER_ERROR:
    case EDIT_USER_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};



export default userReducer;


// const userReducer = (state = initialState, action: UserActionTypes): UserState => {
//   switch (action.type) {
//     case FETCH_USERS:
//     case ADD_USER:
//       return {
//         ...state,
//         loading: true,
//       };

//     case FETCH_USERS_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         users: action.payload,
//       };

//     case ADD_USER_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         users: [...state.users, action.payload],
//       };

//     case FETCH_USERS_ERROR:
//     case ADD_USER_ERROR:
//     case DELETE_USER_ERROR:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };

//     case DELETE_USER_SUCCESS:
//       return {
//         ...state,
//         users: state.users.filter((user) => user.id !== action.payload),
//       };

//     // --------- Edit User Action ---------
//     case GET_USER:
//     case EDIT_USER:
//       return { ...state, loading: true, error: null };
//     case GET_USER_SUCCESS:
//     case EDIT_USER_SUCCESS:
//       return { ...state, loading: false, user: action.payload };
//     case GET_USER_ERROR:
//     case EDIT_USER_ERROR:
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };
