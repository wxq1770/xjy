import SDK from 'sdk';
// import cookie from 'react-cookie';

import config from '../../config';

import app from './app';

const apis = {
  ...app,
};

export default class RestAPI {

  constructor(conf) {
    const hasSlash = conf && conf.api && conf.api.split('').slice(-1)[0] === '/';

    this.HOST = hasSlash ? config.api.host : `${config.api.host}/`;

    return new SDK(
      this.HOST,
      apis,
      {
        all: {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Accept-Language': (localStorage.getItem('locale') || 'zh-CN'),
            // 'X-Request-Domain': window.origin,
          },
          // withCredentials: true,
        },
        // post: {
        //   headers: {
        //     'X-CSRF-Token': (cookie.load('csrf') || ''),
        //   },
        // },
        // put: {
        //   headers: {
        //     'X-CSRF-Token': (cookie.load('csrf') || ''),
        //   },
        // },
      },
    );
  }

}

