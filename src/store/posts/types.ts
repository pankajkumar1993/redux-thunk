// types.ts
export interface Post {
    id: number;
    title: string;
    content: string;
}

export interface PostState {
    posts: Post[];
    loading: boolean;
    error: string | null;
    success: string | null;
}


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

interface AddPostRequest {
    type: typeof ADD_POST_REQUEST;
}

interface AddPostSuccess {
    type: typeof ADD_POST_SUCCESS;
    payload: Post;
}

interface AddPostError {
    type: typeof ADD_POST_FAILURE;
    payload: string;
}

interface DeletePostRequest {
    type: typeof DELETE_POST_REQUEST;
}

interface DeletePostSuccess {
    type: typeof DELETE_POST_SUCCESS;
    payload: number; // postId
}

interface DeletePostError {
    type: typeof DELETE_POST_FAILURE;
    payload: string;
}

interface UpdatePostRequest {
    type: typeof UPDATE_POST_REQUEST;
}

interface UpdatePostSuccess {
    type: typeof UPDATE_POST_SUCCESS;
    payload: Post;
}

interface UpdatePostError {
    type: typeof UPDATE_POST_FAILURE;
    payload: string;
}

interface ClearError {
    type: typeof CLEAR_ERROR;
}

interface ClearSuccess {
    type: typeof CLEAR_SUCCESS;
}

export type PostActionTypes =
    | AddPostRequest
    | AddPostSuccess
    | AddPostError
    | DeletePostRequest
    | DeletePostSuccess
    | DeletePostError
    | UpdatePostRequest
    | UpdatePostSuccess
    | UpdatePostError
    | ClearError
    | ClearSuccess;
