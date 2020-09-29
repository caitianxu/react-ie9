import HTTP from './service';
import config from './config';
import store from './store';
import Util from './util';

//开启登录
export const __vsLogin = function (bool) {
  return new Promise(function (resolve, reject) {
    const action = {
      type: '__showLogin',
      data: { login_visible: bool },
    };
    store.dispatch(action);
    resolve();
  });
};
//获取用户信息
export const __getUserInfo = function (param) {
  return new Promise(function (resolve, reject) {
    const action = {
      type: '__getUserInfo',
      data: { ...param },
    };
    store.dispatch(action);
    resolve({});
  });
};
//获取系统参数
export const __getSystemData = function () {
  return new Promise(function (resolve, reject) {
    Util.getUrlSearch(null, function (param) {
      let uid = Util.readCookie('uid');
      let token = Util.readCookie('token');
      store.dispatch({
        type: '__setSystemData',
        data: param,
      });
      if (uid && token) {
        __getUserInfo({
          uid: uid,
          token: token,
        }).then(function (res) {
          if (res.code == 200 && res.data) {
            param.userInfo = res.data;
            store.dispatch({
              type: '__setUserInfo',
              data: res.data,
            });
            resolve(param);
          } else {
            resolve(param);
          }
        });
      } else {
        resolve(param);
      }
    });
  });
};
