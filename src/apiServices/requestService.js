import axios from 'axios';
import { get as _get } from 'lodash';
import {TIMEOUT} from '../../src/config/apiConstants';

axios.interceptors.request.use(request => {
    console.log('Starting Request', request)
    return request
})

axios.interceptors.response.use(response => {
    console.log('Response:', response)
    return response
})

/**
* GET request
* @param endPoint : string
*/
export const getRequest = (
    endPoint,
    params,
    qParams,
) => {
    return new Promise(async (resolve, reject) => {
        axios
            .get(endPoint, {
                headers: null,
                params: qParams,
                timeout: TIMEOUT,
            })
            .then(response => {
                resolve(response.data)
            })
            .catch(err => reject(err));
    });
};


