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
} from "../store/users/actions";
import { Dispatch } from "redux";
import { User, UserActionTypes } from "../store/users/types";
import { RootState } from "../store/rootReducer";
import { BASE_PATH } from "../constants";
console.log(BASE_PATH);


// ************************ Thunk Fetch Action Creator ************************
export const fetchUsers = () => async (dispatch: Dispatch<UserActionTypes>, getState: () => RootState) => {
    let a = getState().todos
    // let b = getState().users
    console.log(a.todos[0]);
    // console.log(b.users[0]);

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




// ----------------------------------------------------------------------------------------------
// export const postRequest = (endpoint: string, body: any) => {
//     const { dispatch } = store;

//     const stateValues = store.getState()
//     const alertsInfo: AlertsInterface = stateValues.alerts;
//     const currentLanguage = alertsInfo ? alertsInfo.currentLanguage : "en"
//     body['x_language'] = currentLanguage

//     return Axios.post(getApiPath(endpoint), JSON.stringify(body), getConfigSetting())
//         .then(response => {
//             dispatch(HideProgressBar());
//             if (isApiCodeSucess(response)) {
//                 return response.data;
//             }
//         }).catch(function (error: any) {
//             dispatch(HideProgressBar());
//             handleErrorResponse(error);
//         });
// };

// export const patchRequest = (endpoint: string, body: any) => {
//     const { dispatch } = store;


//     const stateValues = store.getState()
//     const alertsInfo: AlertsInterface = stateValues.alerts;
//     const currentLanguage = alertsInfo ? alertsInfo.currentLanguage : "en"

//     body['x_language'] = currentLanguage


//     return Axios.patch(getApiPath(endpoint), JSON.stringify(body), getConfigSetting()).then(response => {
//         dispatch(HideProgressBar());
//         if (isApiCodeSucess(response)) {
//             return response.data;
//         }
//     }).catch(function (error: any) {
//         handleErrorResponse(error);
//     });
// };

// export const getRequest = (endpoint: string) => {
//     const { dispatch } = store;

//     return Axios.get(getApiPath(endpoint), getConfigSetting()).then(response => {
//         dispatch(HideProgressBar());
//         if (isApiCodeSucess(response)) {
//             return response.data;
//         }
//     })
//         .catch(function (error: any) {
//             dispatch(HideProgressBar());
//             handleErrorResponse(error);
//         });
// };

// const getApiPath = (endpoint: string) => BASE_PATH + '/api/admin/' + endpoint;

// const getConfigSetting = () => {
//     const stateValues = store.getState()
//     const adminInfo: adminInfoInterface = stateValues.adminInfo;
//     const token = adminInfo ? adminInfo.accessToken : ""

//     const alertsInfo: AlertsInterface = stateValues.alerts;
//     const currentLanguage = alertsInfo ? alertsInfo.currentLanguage : "en"
//     let headers: any = {
//         'content-type': 'application/json',
//     };
//     if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//         // headers['Accept-Language'] = currentLanguage
//     }

//     return {
//         headers: headers,
//     };
// };

// const handleErrorResponse = (error: any) => {
//     const { dispatch } = store;

//     if (error.code === "ERR_NETWORK") {
//         dispatch(ShowErrorAlert({ visible: true, message: translateLanguage("NO_INTERNET") }));
//     }
//     else if (error.response.status === 401) {
//         dispatch(ShowErrorAlert({ visible: true, message: translateLanguage("SESSION_EXPIRED") }));
//         dispatch(ResetAdminStore())
//         window.location.reload();
//     }
//     else if (error.response.status === 403) {
//         dispatch(ShowErrorAlert({ visible: true, message: translateLanguage("WENT_WRONG_ERROR") }));
//     }
//     else if (error.response.data.code === 400 && error.response.data.message !== '') {
//         dispatch(ShowErrorAlert({ visible: true, message: error.response.data.message }));
//     } else {
//         dispatch(ShowErrorAlert({ visible: true, message: error.message }));
//     }

// };

// export const isApiCodeSucess = (resp: AxiosResponse) => {
//     const { dispatch } = store;
//     if (resp.data.code === 400) {
//         dispatch(ShowErrorAlert({ visible: true, message: resp.data.message }));
//         return false

//     } else if (resp?.data?.code === 500) {
//         dispatch(ShowErrorAlert({ visible: true, message: "Backend : " + resp.data.message }));
//         return false
//     }

//     return true;
// };