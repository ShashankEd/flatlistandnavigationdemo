// import apiConstants from '../../config/apiConstants';
import {getRequest} from '../requestService';

const endPoint = 'https://jsonplaceholder.typicode.com/posts';
/**
 * Get the user list
 * @param body : object : payload for GET api call
 */

export default function getListUseridsApi(body,qParam) {
  return getRequest(endPoint, body, qParam);
}
