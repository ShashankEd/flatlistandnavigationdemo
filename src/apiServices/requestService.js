import axios from 'axios';
import { get as _get } from 'lodash';
import apiConstants from '../../src/config/apiConstants';

axios.interceptors.request.use(request => {
    console.log('Starting Request', request)
    return request
})

axios.interceptors.response.use(response => {
    console.log('Response:', response)
    return response
})

/**
* Function to get complete URL
* @param endPoint : string
*/
const getCompleteUrl = (endPoint) => {
    /*
    TODO : conditions to be added based on the current environment
    */
    // const hostUrl = url.localApiUrl;
    // return `${hostUrl}${apiConstants.API_END_POINT_PREFIX}${apiConstants.API_VERSION}${endPoint}`;
    return 'https://jsonplaceholder.typicode.com/posts'
};


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
            .get(getCompleteUrl(endPoint), {
                headers: null,
                params: qParams,
                timeout: apiConstants.TIMEOUT,
            })
            .then(response => {
                resolve(response.data)
            })
            .catch(err => reject(err));
    });
};


