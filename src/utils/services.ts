import Axios, { AxiosResponse } from 'axios';
import { BASE_PATH } from '../constants';
// import { store } from '../store';

// ************************************* Get API Path *************************************
const getApiPath = (endpoint: string) => BASE_PATH + endpoint;

// ************************************* Handle Response Errors *************************************
const handleErrorResponse = (error: any) => {
    if (error.code === "ERR_NETWORK") {
        console.log("NO_INTERNET");
    }
    else if (error.response.status === 401) {
        console.log("SESSION_EXPIRED");
        window.location.reload();
    }
    else if (error.response.status === 403) {
        console.log("WENT_WRONG_ERROR");
    }
    else if (error.response.data.code === 400 && error.response.data.message !== '') {
        console.log(error.response.data.message);
    } else {
        console.log(error.message);
    }
};

// ************************************* Handle Success Response  *************************************
const isApiCodeSuccess = (resp: AxiosResponse) => {
    if (resp.data.code === 400) {
        console.log(resp.data.message);
        return false;
    } else if (resp?.data?.code === 500) {
        console.log("Backend: " + resp.data.message);
        return false;
    }

    return true;
};

// ************************************* Set Headers  *************************************
const getConfigSetting = () => {
    // const state = store.getState();
    // const token = state.auth?.token || ''; // Assuming auth slice contains the token
    let headers: any = {
        'content-type': 'application/json',
    };

    // if (token) {
    //     headers['Authorization'] = `Bearer ${token}`;
    // }

    return { headers };
};

// ************************************* Get Request *************************************
export const getRequest = async (endpoint: string) => {
    try {
        const response = await Axios.get(getApiPath(endpoint), getConfigSetting());
        if (isApiCodeSuccess(response)) {
            return response.data;
        }
    } catch (error: any) {
        handleErrorResponse(error);
    }
};

// ************************************* Get by ID Request *************************************
export const getByIdRequest = async (endpoint: string, id: any) => {
    try {
        const response = await Axios.get(getApiPath(`${endpoint}/${id}`), getConfigSetting());
        if (isApiCodeSuccess(response)) {
            return response.data;
        }
    } catch (error: any) {
        handleErrorResponse(error);
    }
};

// ************************************* Post Request *************************************
export const postRequest = async (endpoint: string, body: any) => {
    try {
        const response = await Axios.post(getApiPath(endpoint), JSON.stringify(body), getConfigSetting());
        if (isApiCodeSuccess(response)) {
            return response.data;
        }
    } catch (error: any) {
        handleErrorResponse(error);
    }
};

// ************************************* Put Request *************************************
export const putRequest = async (endpoint: string, body: any) => {
    try {
        const response = await Axios.put(getApiPath(endpoint), JSON.stringify(body), getConfigSetting());
        if (isApiCodeSuccess(response)) {
            return response.data;
        }
    } catch (error: any) {
        handleErrorResponse(error);
    }
};

// ************************************* Delete Request *************************************
export const deleteRequest = async (endpoint: string, id: any) => {
    try {
        const response = await Axios.delete(getApiPath(`${endpoint}/${id}`), getConfigSetting());
        if (isApiCodeSuccess(response)) {
            return response.data;
        }
    } catch (error: any) {
        handleErrorResponse(error);
    }
};





// import Axios, { AxiosResponse } from 'axios';
// import { BASE_PATH } from '../constants';
// // import { store } from '../store';


// // ************************************* Get Api Path *************************************
// const getApiPath = (endpoint: string) => BASE_PATH + endpoint;


// // ************************************* Handle Response Errors *************************************
// const handleErrorResponse = (error: any) => {
//     if (error.code === "ERR_NETWORK") {
//         console.log("NO_INTERNET");
//     }
//     else if (error.response.status === 401) {
//         console.log("SESSION_EXPIRED");
//         window.location.reload();
//     }
//     else if (error.response.status === 403) {
//         console.log("WENT_WRONG_ERROR");
//     }
//     else if (error.response.data.code === 400 && error.response.data.message !== '') {
//         console.log(error.response.data.message);
//     } else {
//         console.log(error.message);
//     }

// };

// // ************************************* Handle Success Response  *************************************
// export const isApiCodeSucess = (resp: AxiosResponse) => {
//     if (resp.data.code === 400) {
//         console.log(resp.data.message);
//         return false

//     } else if (resp?.data?.code === 500) {
//         console.log("Backend : " + resp.data.message);
//         return false
//     }

//     return true;
// };

// // ************************************* Set Headers  *************************************
// const getConfigSetting = () => {
//     // const stateValues = store.getState()
//     // const adminInfo: adminInfoInterface = stateValues.adminInfo;
//     // const token = adminInfo ? adminInfo.accessToken : ""

//     // const alertsInfo: AlertsInterface = stateValues.alerts;
//     // const currentLanguage = alertsInfo ? alertsInfo.currentLanguage : "en"
//     let headers: any = {
//         'content-type': 'application/json',
//     };
//     // if (token) {
//     //     headers['Authorization'] = `Bearer ${token}`;
//     //     // headers['Accept-Language'] = currentLanguage
//     // }

//     return {
//         headers: headers,
//     };
// };



// // ************************************* Get Request *************************************
// export const getRequest = (endpoint: string) => {

//     return Axios.get(getApiPath(endpoint), getConfigSetting()).then(response => {
//         if (isApiCodeSucess(response)) {
//             return response.data;
//         }
//     })
//         .catch(function (error: any) {
//             handleErrorResponse(error);
//         });
// };


// // ************************************* Post Request *************************************
// export const postRequest = (endpoint: string, body: any) => {
//     // const { dispatch } = store;
//     // const stateValues = store.getState()
//     // const alertsInfo: AlertsInterface = stateValues.alerts;
//     // const currentLanguage = alertsInfo ? alertsInfo.currentLanguage : "en"
//     // body['x_language'] = currentLanguage

//     return Axios.post(getApiPath(endpoint), JSON.stringify(body), getConfigSetting())
//         .then(response => {
//             if (isApiCodeSucess(response)) {
//                 return response.data;
//             }
//         }).catch(function (error: any) {
//             handleErrorResponse(error);
//         });
// };


// // ************************************* Patch Request *************************************
// export const patchRequest = (endpoint: string, body: any) => {
//     return Axios.patch(getApiPath(endpoint), JSON.stringify(body), getConfigSetting()).then(response => {
//         if (isApiCodeSucess(response)) {
//             return response.data;
//         }
//     }).catch(function (error: any) {
//         handleErrorResponse(error);
//     });
// };


// // ************************************* Put Request *************************************
// export const putRequest = (endpoint: string, body: any) => {
//     return Axios.put(getApiPath(endpoint), JSON.stringify(body), getConfigSetting()).then(response => {
//         if (isApiCodeSucess(response)) {
//             return response.data;
//         }
//     }).catch(function (error: any) {
//         handleErrorResponse(error);
//     });
// };
// // ************************************* Delete Request *************************************
// export const deleteRequest = (endpoint: string, id: any) => {
//     return Axios.delete(getApiPath(endpoint + id), getConfigSetting()).then(response => {
//         if (isApiCodeSucess(response)) {
//             return response.data;
//         }
//     }).catch(function (error: any) {
//         handleErrorResponse(error);
//     });
// };








