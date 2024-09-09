export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const EDIT_TODO = 'EDIT_TODO';


export interface AddTodoAction {
  type: typeof ADD_TODO;
  payload: Todo;
}

export interface RemoveTodoAction {
  type: typeof REMOVE_TODO;
  payload: number;
}

export interface ToggleTodoAction {
  type: typeof TOGGLE_TODO;
  payload: number;
}

export interface EditTodoAction {
  type: typeof EDIT_TODO;
  payload: {
    id: number;
    updatedTodo: Partial<Todo>;
  };
}

export type TodoActionTypes =
  | AddTodoAction
  | RemoveTodoAction
  | ToggleTodoAction
  | EditTodoAction;




// ************************* User Types *************************
export interface User {
  id: number; // Ensure id is a number
  name: string;
  email: string;
}

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

// Action types
export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';
export const ADD_USER = 'ADD_USER';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_ERROR = 'ADD_USER_ERROR';
export const DELETE_USER = 'DELETE_USER';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_ERROR = 'DELETE_USER_ERROR';

// ************************* Action creators *************************
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
