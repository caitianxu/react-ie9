import fetchJsonp from 'fetch-jsonp';
import service from './request';

export default {
  //房间资料
  _getRoomInfo: (param) => {
    return service.get('/live/api/room/detail', {
      params: param,
    });
  },
};
