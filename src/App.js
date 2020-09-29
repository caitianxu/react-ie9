import React, { Component } from 'react';
import store from './script/store';
import './App.scss';

import LoginModal from './components/login';
import FlexMenu from './components/flexmenu';
import { __vsLogin, __getSystemData } from './script/action';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      base: store.getState(),
    };
    store.subscribe(() => {
      this.setState({
        base: store.getState(),
      });
    });
  }
  componentDidMount() {
    __getSystemData().then((param) => {
      console.log('param==>', param);
      if (param.userInfo) {
      } else {
        // __vsLogin(true);
      }
    });
  }
  render() {
    const { base } = this.state;
    return (
      <div className='croom_body_root'>
        <button className='btn bb1' onClick={__vsLogin}>按钮</button>
        {/* <p><button className='btn bb1'>按钮</button></p>
        <p><button className='btn bb2'>按钮</button></p>
        <p><button className='btn bb3'>按钮</button></p>
        <p><button className='btn rr1'>按钮</button></p>
        <p><button className='btn rr2'>按钮</button></p>
        <p><button className='btn rr3'>按钮</button></p>
        <p><button className='btn zz1'>按钮</button></p>
        <p><button className='btn zz2'>按钮</button></p> */}
        <div className='main-content-html'>
          <div className='ht'></div>
          <div className='ht'></div>
          <div className='ht'></div>
          <div className='ht'></div>
          <div className='ht'></div>
          <div className='ht'></div>
          <div className='ht'></div>
          <div className='ht'></div>
          <div className='ht'></div>
          <div className='ht'></div>
        </div>
        <FlexMenu base={base} />
        <LoginModal base={base} />
      </div>
    );
  }
}
