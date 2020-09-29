import config from './config';
import qs from 'qs';

const Util = {
  setCookie: (name, value) => {
    let days = 365;
    let exp = new Date();
    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + escape(value) + ';path=/;expires=' + exp.toGMTString();
  },
  readCookie: (name) => {
    let arr,
      reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    if ((arr = document.cookie.match(reg))) {
      return unescape(arr[2]);
    } else {
      return null;
    }
  },
  delCookie: (name) => {
    let cval = Util.readCookie(name);
    if (cval != null) {
      document.cookie = name + '=;path=/;expires=' + new Date(0).toGMTString();
    }
  },
  //解析url参数
  getUrlSearch: (url, callback) => {
    if (!url) url = window.location.search;
    let search = url.replace('?', '');
    let params = {};
    if (search && search !== '') {
      params = qs.parse(search);
    }
    callback && callback(params);
  },
  //浏览器
  getBrowserInfo: () => {
    var agent = navigator.userAgent.toLowerCase();
    var regStr_ie = /msie [\d.]+;/gi;
    var regStr_ff = /firefox\/[\d.]+/gi;
    var regStr_chrome = /chrome\/[\d.]+/gi;
    var regStr_saf = /safari\/[\d.]+/gi;
    //IE
    if (agent.indexOf('msie') > 0) {
      return {
        name: 'ie',
        version: agent
          .match(regStr_ie)
          .toString()
          .replace(/[^0-9.]/gi, ''),
      };
    }
    //firefox
    if (agent.indexOf('firefox') > 0) {
      return {
        name: 'firefox',
        version: agent
          .match(regStr_ff)
          .toString()
          .replace(/[^0-9.]/gi, ''),
      };
    }
    //Chrome
    if (agent.indexOf('chrome') > 0) {
      return {
        name: 'chrome',
        version: agent
          .match(regStr_chrome)
          .toString()
          .replace(/[^0-9.]/gi, ''),
      };
    }
    //Safari
    if (agent.indexOf('safari') > 0 && agent.indexOf('chrome') < 0) {
      return {
        name: 'safari',
        version: agent
          .match(regStr_saf)
          .toString()
          .replace(/[^0-9.]/gi, ''),
      };
    }
  },
};

export default Util;
