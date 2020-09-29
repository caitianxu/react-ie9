import React, { Component } from 'react';
import './index.scss';
import { Modal } from 'antd';
import Util from '../../script/util';
import qs from 'qs';

import { __vsLogin } from '../../script/action';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  showModal = () => {
    var browser = Util.getBrowserInfo();
    const param = {
      display: '',
      callbackURI: window.location.protocol + '//' + window.location.host + '/loginCallback.html?v=' + +new Date(),
      companyId: '281b1d4876684904b48eb4ad6378401d',
      appKey: 'bfb641c7356c4a9885bdfab766952dcc',
      appSecret: '',
      appType: 1,
      appChannel: '',
    };
    if (browser && browser.name == 'chrome' && parseInt(browser.version) >= 80) {
      var l = (window.screen.availWidth - 780) / 2;
      var t = (window.screen.availHeight - 549) / 2;
      window.open(
        'https://web.jiezhansifang.com/v2/thirdparty/qq/login.do?' + qs.stringify(param),
        '第三方登录',
        'height=549,innerHeight=549,width=780,innerWidth=780,top=' +
          t +
          ',left=' +
          l +
          ',status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=0,titlebar=no'
      );
    } else {
      this.setState({ visible: true, url: 'https://web.jiezhansifang.com/v2/thirdparty/qq/login.do?' + qs.stringify(param) });
    }
    window.loginSuccess = (token) => {
      console.log('=========>', token);
      this.hideModal();
    };
    if (window.addEventListener) {
      window.addEventListener('message', window.loginSuccess);
    } else {
      window.attachEvent('onmessage', window.loginSuccess);
    }
  };
  hideModal = () => {
    this.setState({ visible: false, url: null });
  };
  render() {
    const { base } = this.props;
    return (
      <span>
        {base.login_visible ? (
          <div className='filex-login-bg animated fadeIn'>
            <div className='center animated fast bounceInDown delay-0-5s'>
              <span className='close' onClick={__vsLogin.bind(this, false)}></span>
              <span className='btn' onClick={this.showModal}></span>
            </div>
          </div>
        ) : null}
        <Modal
          visible={this.state.visible}
          wrapClassName='reset-modal-style qq-login-modal'
          centered={true}
          title='&nbsp;'
          footer={null}
          keyboard={false}
          maskClosable={false}
          zIndex='1000'
          width='780px'
          onCancel={this.hideModal}
        >
          <div style={{ height: '549px' }}>
            {this.state.url ? <iframe src={this.state.url} title='QQ登录' scrolling='no' width='780px' height='549px' /> : null}
          </div>
        </Modal>
      </span>
    );
  }
}
