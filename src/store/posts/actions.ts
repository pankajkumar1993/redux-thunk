import { Dispatch } from 'redux';
import { Post } from './types';

// Action Types
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';

export const UPDATE_POST_REQUEST = 'UPDATE_POST_REQUEST';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAILURE = 'UPDATE_POST_FAILURE';

export const CLEAR_ERROR = 'CLEAR_ERROR';
export const CLEAR_SUCCESS = 'CLEAR_SUCCESS';

const time = 5000;

// Action Creators
export const addPost = (post: Post) => async (dispatch: Dispatch) => {
  dispatch({ type: ADD_POST_REQUEST });

  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
    dispatch({ type: ADD_POST_SUCCESS, payload: post });

    setTimeout(() => {
      dispatch({ type: CLEAR_SUCCESS });
    }, time);
  } catch (error) {
    dispatch({ type: ADD_POST_FAILURE, payload: 'Failed to add post' });

    setTimeout(() => {
      dispatch({ type: CLEAR_ERROR });
    }, time);
  }
};

export const deletePost = (postId: number) => async (dispatch: Dispatch) => {
  dispatch({ type: DELETE_POST_REQUEST });

  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
    dispatch({ type: DELETE_POST_SUCCESS, payload: postId });

    setTimeout(() => {
      dispatch({ type: CLEAR_SUCCESS });
    }, time);
  } catch (error) {
    dispatch({ type: DELETE_POST_FAILURE, payload: 'Failed to delete post' });

    setTimeout(() => {
      dispatch({ type: CLEAR_ERROR });
    }, time);
  }
};

export const updatePost = (post: Post) => async (dispatch: Dispatch) => {
  dispatch({ type: UPDATE_POST_REQUEST });

  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
    dispatch({ type: UPDATE_POST_SUCCESS, payload: post });
    setTimeout(() => {
      dispatch({ type: CLEAR_SUCCESS });
    }, time);
  } catch (error) {
    dispatch({ type: UPDATE_POST_FAILURE, payload: 'Failed to update post' });

    setTimeout(() => {
      dispatch({ type: CLEAR_ERROR });
    }, time);
  }
};

export const clearError = () => ({ type: CLEAR_ERROR });
export const clearSuccess = () => ({ type: CLEAR_SUCCESS });
