import axios from 'axios';
import qs from 'qs';
import config from './config';
import store from './store';
/********创建实例********/
const service = axios.create({
  baseURL: config.ctxPath,
  timeout: 10000,
});

/********请求参数处理********/
service.interceptors.request.use((request) => {
  const store_state = { ...store.getState() };
  let df_param = {
    latitude: 0,
    longitude: 0,
    register: 1,
    source: 1,
    channelId: 0,
    city_code: 0,
    companyCode: 'PP_001',
  };
  if (request.method === 'post') {
    if (!request.data) {
      request.data = {};
    }
    if (request.data.application === 'json') {
      request.data = { ...df_param, ...request.data };
      request.headers['Content-Type'] = 'application/json; charset=UTF-8';
    } else {
      request.data = qs.stringify({ ...df_param, ...request.data });
      request.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    }
  } else {
    if (!request.params) {
      request.params = {};
    }
    request.params = { ...df_param, ...request.params };
    request.headers['Content-Type'] = 'application/json; charset=UTF-8';
  }
  request.headers['authorization'] = store_state.token || '';
  request.headers['uid'] = store_state.uid || '';
  if (request.params && request.params.token) {
    request.headers['authorization'] = request.params.token;
    request.headers['uid'] = request.params.uid;
  }
  return request;
});
/********服务响应处理********/
service.interceptors.response.use(
  (response) => {
    //当前用户登录信息已失效, 需要重新登录
    if (response.data.code === 401) {
      console.log('需要登录');
    }
    //服务器时间差异
    if (!window.ServiceTimeStamp) {
      if (response.headers.date) {
        window.ServiceTimeStamp = +new Date(response.headers.date) - +new Date();
      } else {
        window.ServiceTimeStamp = 0;
      }
    }
    return response.data;
  },
  (error) => {
    return {
      code: 500,
      data: null,
      message: error.message || '服务异常，请稍后再试~',
    };
  }
);
export default service;
