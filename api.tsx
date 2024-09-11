import Axios, { AxiosResponse } from 'axios';
import { BASE_PATH } from '../constants';
import { store } from '../store';
// import { AlertsInterface, HideProgressBar, ShowErrorAlert } from '../store/alerts';
// import { adminInfoInterface } from '../services/dataType/reduxActionsInterfaces/adminStoreInterfaces';

export const postRequest = (endpoint: string, body: any) => {
    // const { dispatch } = store;

    // const stateValues = store.getState()
    // const alertsInfo: AlertsInterface = stateValues.alerts;
    // const currentLanguage = alertsInfo ? alertsInfo.currentLanguage : "en"
    // body['x_language'] = currentLanguage

    return Axios.post(getApiPath(endpoint), JSON.stringify(body), getConfigSetting())
        .then(response => {
            // dispatch(HideProgressBar());
            if (isApiCodeSucess(response)) {
                return response.data;
            }
        }).catch(function (error: any) {
            // dispatch(HideProgressBar());
            handleErrorResponse(error);
        });
};

export const patchRequest = (endpoint: string, body: any) => {
    // const { dispatch } = store;


    // const stateValues = store.getState()
    // const alertsInfo: AlertsInterface = stateValues.alerts;
    // const currentLanguage = alertsInfo ? alertsInfo.currentLanguage : "en"

    // body['x_language'] = currentLanguage


    return Axios.patch(getApiPath(endpoint), JSON.stringify(body), getConfigSetting()).then(response => {
        // dispatch(HideProgressBar());
        if (isApiCodeSucess(response)) {
            return response.data;
        }
    }).catch(function (error: any) {
        handleErrorResponse(error);
    });
};

export const getRequest = (endpoint: string) => {
    // const { dispatch } = store;

    return Axios.get(getApiPath(endpoint), getConfigSetting()).then(response => {
        // dispatch(HideProgressBar());
        if (isApiCodeSucess(response)) {
            return response.data;
        }
    })
        .catch(function (error: any) {
            // dispatch(HideProgressBar());
            handleErrorResponse(error);
        });
};

const getApiPath = (endpoint: string) => BASE_PATH + '/api/admin/' + endpoint;

const getConfigSetting = () => {
    // const stateValues = store.getState()
    // const adminInfo: adminInfoInterface = stateValues.adminInfo;
    // const token = adminInfo ? adminInfo.accessToken : ""

    // const alertsInfo: AlertsInterface = stateValues.alerts;
    // const currentLanguage = alertsInfo ? alertsInfo.currentLanguage : "en"
    let headers: any = {
        'content-type': 'application/json',
    };
    // if (token) {
    //     headers['Authorization'] = `Bearer ${token}`;
    //     // headers['Accept-Language'] = currentLanguage
    // }

    return {
        headers: headers,
    };
};

const handleErrorResponse = (error: any) => {
    const { dispatch } = store;

    if (error.code === "ERR_NETWORK") {
        // dispatch(ShowErrorAlert({ visible: true, message: translateLanguage("NO_INTERNET") }));
    }
    else if (error.response.status === 401) {
        // dispatch(ShowErrorAlert({ visible: true, message: translateLanguage("SESSION_EXPIRED") }));
        // dispatch(ResetAdminStore())
        window.location.reload();
    }
    else if (error.response.status === 403) {
        // dispatch(ShowErrorAlert({ visible: true, message: translateLanguage("WENT_WRONG_ERROR") }));
    }
    else if (error.response.data.code === 400 && error.response.data.message !== '') {
        // dispatch(ShowErrorAlert({ visible: true, message: error.response.data.message }));
    } else {
        // dispatch(ShowErrorAlert({ visible: true, message: error.message }));
    }

};

export const isApiCodeSucess = (resp: AxiosResponse) => {
    const { dispatch } = store;
    if (resp.data.code === 400) {
        // dispatch(ShowErrorAlert({ visible: true, message: resp.data.message }));
        return false

    } else if (resp?.data?.code === 500) {
        // dispatch(ShowErrorAlert({ visible: true, message: "Backend : " + resp.data.message }));
        return false
    }

    return true;
};