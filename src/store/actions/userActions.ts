import { Dispatch } from 'redux';
import axios from 'axios';
import {
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  ADD_USER,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  User,
  UserActionTypes,
} from '../../types';

// ************************ Fetch Action ************************
export const fetchUsers = () => async (dispatch: Dispatch<UserActionTypes>) => {
  dispatch({ type: FETCH_USERS });

  try {
    const response = await axios.get('https://dummyjson.com/users');
    dispatch({
      type: FETCH_USERS_SUCCESS,
      payload: response.data.users,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      dispatch({
        type: FETCH_USERS_ERROR,
        payload: error.message,
      });
    } else {
      dispatch({
        type: FETCH_USERS_ERROR,
        payload: 'An unknown error occurred.',
      });
    }
  }
};

// ************************ Add Action ************************
export const addUser = (newUser: User) => async (dispatch: Dispatch<UserActionTypes>) => {
  dispatch({ type: ADD_USER });

  try {
    const response = await axios.post('https://dummyjson.com/users/add', newUser);
    dispatch({
      type: ADD_USER_SUCCESS,
      payload: response.data,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      dispatch({
        type: ADD_USER_ERROR,
        payload: error.message,
      });
    } else {
      dispatch({
        type: ADD_USER_ERROR,
        payload: 'An unknown error occurred.',
      });
    }
  }
};

// ************************ Delete Action ************************
export const deleteUser = (id: number) => async (dispatch: Dispatch<UserActionTypes>) => {
  dispatch({ type: DELETE_USER });

  try {
    await axios.delete(`https://dummyjson.com/users/${id}`);
    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: id,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      dispatch({
        type: DELETE_USER_ERROR,
        payload: error.message,
      });
    } else {
      dispatch({
        type: DELETE_USER_ERROR,
        payload: 'An unknown error occurred.',
      });
    }
  }
};
