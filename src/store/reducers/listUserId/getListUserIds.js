import getListUseridsApi from '../../../apiServices/listUserId/getListUseridsApi'
import {StoreFetchableData} from '../base';

class getListUseridsData extends StoreFetchableData {
  constructor() {
    super('getListUserids', getListUseridsApi);
  }
  fetchCall(data, moreData) {
    return dispatch =>
      dispatch(this.actions.fetch()) &&
      this.fetchData(data, moreData)
        .then((res) => {
          dispatch(this.actions.response(res));
        })
        .catch((err) => {
          dispatch(this.actions.error(err));
          console.log(err)
        });
  }
}
export var getListUserids = new getListUseridsData();
