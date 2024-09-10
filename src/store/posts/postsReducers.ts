import { DELETE_POST_REQUEST, PostState, UPDATE_POST_REQUEST } from "./types";
import {
    ADD_POST_SUCCESS, ADD_POST_FAILURE,
    DELETE_POST_SUCCESS, DELETE_POST_FAILURE,
    UPDATE_POST_SUCCESS, UPDATE_POST_FAILURE,
    CLEAR_ERROR, CLEAR_SUCCESS,
    ADD_POST_REQUEST
} from './postsAction';



const initialState: PostState = {
    posts: [
        {
            id: 1,
            title: "First posts",
            content: "post starts here..."
        },
        {
            id: 2,
            title: "Second posts",
            content: "post starts here..."
        }
    ],
    loading: false,
    error: null,
    success: null,
};



const postsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_POST_REQUEST:
        case UPDATE_POST_REQUEST:
        case DELETE_POST_REQUEST:
            return { ...state, loading: true }
        case ADD_POST_SUCCESS:
            return { ...state, posts: [...state.posts, action.payload], loading: false, success: 'Post added successfully!' };
        case DELETE_POST_SUCCESS:
            return { ...state, posts: state.posts.filter(post => post.id !== action.payload), loading: false, success: 'Post deleted successfully!' };
        case UPDATE_POST_SUCCESS:
            return {
                ...state,
                posts: state.posts.map(post =>
                    post.id === action.payload.id ? action.payload : post
                ),
                success: 'Post updated successfully!',
                loading: false
            };
        case ADD_POST_FAILURE:
        case DELETE_POST_FAILURE:
        case UPDATE_POST_FAILURE:
            return { ...state, error: action.payload };
        case CLEAR_ERROR:
            return { ...state, error: null };
        case CLEAR_SUCCESS:
            return { ...state, success: null };
        default:
            return state;
    }
};

export default postsReducer