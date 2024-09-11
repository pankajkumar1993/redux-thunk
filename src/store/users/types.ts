import {
    ADD_USER,
    ADD_USER_ERROR,
    ADD_USER_SUCCESS,
    DELETE_USER,
    DELETE_USER_ERROR,
    DELETE_USER_SUCCESS,
    EDIT_USER, EDIT_USER_ERROR,
    EDIT_USER_SUCCESS,
    FETCH_USER,
    FETCH_USER_ERROR,
    FETCH_USER_SUCCESS,
    FETCH_USERS,
    FETCH_USERS_ERROR,
    FETCH_USERS_SUCCESS
} from "./actions";

// ************************* User Types *************************
export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

export interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
}

// --------- Fetch User Action Type ---------
interface FetchUsersAction {
    type: typeof FETCH_USERS;
}

interface FetchUsersSuccessAction {
    type: typeof FETCH_USERS_SUCCESS;
    payload: User[];
}

interface FetchUsersErrorAction {
    type: typeof FETCH_USERS_ERROR;
    payload: string;
}

// --------- Add User Action Type ---------
interface AddUserAction {
    type: typeof ADD_USER;
}

interface AddUserSuccessAction {
    type: typeof ADD_USER_SUCCESS;
    payload: User;
}

interface AddUserErrorAction {
    type: typeof ADD_USER_ERROR;
    payload: string;
}

// --------- Delete User Action Type ---------
interface DeleteUserAction {
    type: typeof DELETE_USER;
}

interface DeleteUserSuccessAction {
    type: typeof DELETE_USER_SUCCESS;
    payload: number;
}

interface DeleteUserErrorAction {
    type: typeof DELETE_USER_ERROR;
    payload: string;
}

// --------- Edit User Action Type ---------
interface EditUserAction {
    type: typeof EDIT_USER;
}

interface EditUserSuccessAction {
    type: typeof EDIT_USER_SUCCESS;
    payload: User;
}

interface EditUserErrorAction {
    type: typeof EDIT_USER_ERROR;
    payload: string;
}



// --------- Edit User Action Type ---------
interface FetchUserAction {
    type: typeof FETCH_USER;
}

interface FetchUserSuccessAction {
    type: typeof FETCH_USER_SUCCESS;
    payload: User;
}

interface FetchUserErrorAction {
    type: typeof FETCH_USER_ERROR;
    payload: string;
}

export type UserActionTypes =
    | FetchUsersAction
    | FetchUsersSuccessAction
    | FetchUsersErrorAction
    | AddUserAction
    | AddUserSuccessAction
    | AddUserErrorAction
    | DeleteUserAction
    | DeleteUserSuccessAction
    | DeleteUserErrorAction
    | EditUserAction
    | EditUserSuccessAction
    | EditUserErrorAction
    | FetchUserAction
    | FetchUserSuccessAction
    | FetchUserErrorAction;