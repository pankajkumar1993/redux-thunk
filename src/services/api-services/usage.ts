import { getRequest, postRequest, putRequest, deleteRequest } from '../../utils/services';

// Action types
export const FETCH_ITEMS_REQUEST = 'FETCH_ITEMS_REQUEST';
export const FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS';
export const FETCH_ITEMS_FAILURE = 'FETCH_ITEMS_FAILURE';

export const FETCH_ITEM_BY_ID_REQUEST = 'FETCH_ITEM_BY_ID_REQUEST';
export const FETCH_ITEM_BY_ID_SUCCESS = 'FETCH_ITEM_BY_ID_SUCCESS';
export const FETCH_ITEM_BY_ID_FAILURE = 'FETCH_ITEM_BY_ID_FAILURE';

export const ADD_ITEM_REQUEST = 'ADD_ITEM_REQUEST';
export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS';
export const ADD_ITEM_FAILURE = 'ADD_ITEM_FAILURE';

export const UPDATE_ITEM_REQUEST = 'UPDATE_ITEM_REQUEST';
export const UPDATE_ITEM_SUCCESS = 'UPDATE_ITEM_SUCCESS';
export const UPDATE_ITEM_FAILURE = 'UPDATE_ITEM_FAILURE';

export const DELETE_ITEM_REQUEST = 'DELETE_ITEM_REQUEST';
export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS';
export const DELETE_ITEM_FAILURE = 'DELETE_ITEM_FAILURE';

// Fetch all items
export const fetchItems = () => async (dispatch: any) => {
    dispatch({ type: FETCH_ITEMS_REQUEST });

    try {
        const response = await getRequest('/items');
        dispatch({ type: FETCH_ITEMS_SUCCESS, payload: response });
    } catch (error: any) {
        dispatch({ type: FETCH_ITEMS_FAILURE, payload: error.response?.data || 'Error' });
    }
};

// Fetch single item by ID
export const fetchItemById = (id: string) => async (dispatch: any) => {
    dispatch({ type: FETCH_ITEM_BY_ID_REQUEST });

    try {
        const response = await getRequest(`/items/${id}`);
        dispatch({ type: FETCH_ITEM_BY_ID_SUCCESS, payload: response });
    } catch (error: any) {
        dispatch({ type: FETCH_ITEM_BY_ID_FAILURE, payload: error.response?.data || 'Error' });
    }
};

// Add a new item
export const addItem = (itemData: any) => async (dispatch: any) => {
    dispatch({ type: ADD_ITEM_REQUEST });

    try {
        const response = await postRequest('/items', itemData);
        dispatch({ type: ADD_ITEM_SUCCESS, payload: response });
    } catch (error: any) {
        dispatch({ type: ADD_ITEM_FAILURE, payload: error.response?.data || 'Error' });
    }
};

// Update an item
export const updateItem = (id: string, data: any) => async (dispatch: any) => {
    dispatch({ type: UPDATE_ITEM_REQUEST });

    try {
        const response = await putRequest(`/items/${id}`, data);
        dispatch({ type: UPDATE_ITEM_SUCCESS, payload: response });
    } catch (error: any) {
        dispatch({ type: UPDATE_ITEM_FAILURE, payload: error.response?.data || 'Error' });
    }
};

// Delete an item
export const deleteItem = (id: string) => async (dispatch: any) => {
    dispatch({ type: DELETE_ITEM_REQUEST });

    try {
        const response = await deleteRequest('/items', id);
        dispatch({ type: DELETE_ITEM_SUCCESS, payload: response });
    } catch (error: any) {
        dispatch({ type: DELETE_ITEM_FAILURE, payload: error.response?.data || 'Error' });
    }
};
