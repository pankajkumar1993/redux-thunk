import axios from "axios";
import {
    ADD_USER,
    ADD_USER_ERROR,
    ADD_USER_SUCCESS,
    DELETE_USER,
    DELETE_USER_ERROR,
    DELETE_USER_SUCCESS,
    EDIT_USER,
    EDIT_USER_ERROR,
    EDIT_USER_SUCCESS,
    FETCH_USER,
    FETCH_USER_ERROR,
    FETCH_USERS, FETCH_USERS_ERROR,
    FETCH_USERS_SUCCESS,
} from "../store/users/userActions";
import { Dispatch } from "redux";
import { User, UserActionTypes } from "../store/users/types";
import { RootState } from "../store/rootReducer";

// ************************ Thunk Fetch Action Creator ************************
export const fetchUsers = () => async (dispatch: Dispatch<UserActionTypes>, getState: () => RootState) => {
    let a = getState().todos
    let b = getState().users
    console.log(a.todos[0]);
    console.log(b.users[0]);

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

// ************************ Thunk Add Action Creator ************************
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

// ************************ Thunk Delete Action Creator ************************
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

// ************************ Thunk Edit Action Creator ************************
export const editUser = (user: User) => async (dispatch: Dispatch<UserActionTypes>) => {
    dispatch({ type: EDIT_USER });

    try {
        await axios.put(`https://dummyjson.com/users/${user.id}`, user);
        dispatch({
            type: EDIT_USER_SUCCESS,
            payload: user,
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            dispatch({
                type: EDIT_USER_ERROR,
                payload: error.message,
            });
        } else {
            dispatch({
                type: EDIT_USER_ERROR,
                payload: 'An unknown error occurred.',
            });
        }
    }
};

// ************************ Thunk Get Single Item Action Creator ************************
export const getUser = (userId: number) => async (dispatch: Dispatch<UserActionTypes>) => {
    dispatch({ type: FETCH_USERS });

    try {
        const response = await axios.get(`https://dummyjson.com/users/${userId}`);
        dispatch({
            type: FETCH_USER,
            payload: response.data,
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            dispatch({
                type: FETCH_USER_ERROR,
                payload: error.message,
            });
        } else {
            dispatch({
                type: FETCH_USER_ERROR,
                payload: 'An unknown error occurred.',
            });
        }
    }
};