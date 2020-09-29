import React, { Component } from 'react';
import './index.scss';

export default class index extends Component {
  componentDidMount() {
    window.onscroll = (e) => {
      let t = 0;
      if (document.documentElement && document.documentElement.scrollTop) {
        t = document.documentElement.scrollTop;
      } else if (document.body) {
        t = document.body.scrollTop;
      }
      if (this.menuDom) {
        this.menuDom.style.marginTop = `${t}px`;
      }
    };
  }
  render() {
    return <div className='flex-menu' ref={(el) => (this.menuDom = el)}></div>;
  }
}
