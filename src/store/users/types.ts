import { ADD_USER, ADD_USER_ERROR, ADD_USER_SUCCESS, DELETE_USER, DELETE_USER_ERROR, DELETE_USER_SUCCESS, FETCH_USERS, FETCH_USERS_ERROR, FETCH_USERS_SUCCESS } from "./userActions";

// ************************* User Types *************************
export interface User {
    id: number;
    name: string;
    email: string;
}

export interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
}

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

export type UserActionTypes =
    | FetchUsersAction
    | FetchUsersSuccessAction
    | FetchUsersErrorAction
    | AddUserAction
    | AddUserSuccessAction
    | AddUserErrorAction
    | DeleteUserAction
    | DeleteUserSuccessAction
    | DeleteUserErrorAction;
