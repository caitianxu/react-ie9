const defaultState = {
  uid: null,
  token: null,
  userInfo: null,
  accid: null, //渠道
  client: 'web', //客户端
  login_visible: false, //登录
};

export default (state = defaultState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case '__setUserInfo':
      newState.uid = action.data.uid;
      newState.token = action.data.token;
      newState.userInfo = action.data;
      break;
    default:
      newState = { ...state, ...action.data };
      break;
  }
  return newState;
};
