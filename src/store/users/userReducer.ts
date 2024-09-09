import { UserActionTypes, UserState } from "./types";
import { ADD_USER, ADD_USER_ERROR, ADD_USER_SUCCESS, DELETE_USER_ERROR, DELETE_USER_SUCCESS, FETCH_USERS, FETCH_USERS_ERROR, FETCH_USERS_SUCCESS } from "./userActions";

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action: UserActionTypes): UserState => {
  switch (action.type) {
    case FETCH_USERS:
    case ADD_USER:
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

    case ADD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: [...state.users, action.payload],
      };

    case FETCH_USERS_ERROR:
    case ADD_USER_ERROR:
    case DELETE_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };

    default:
      return state;
  }
};

export default userReducer;
