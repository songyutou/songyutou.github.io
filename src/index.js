import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import {Provider} from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import './public/css/normalize.css'
import './public/font/iconfont.css'
import intl from 'react-intl-universal';
import zh from './i18n/zh.js'
import en from './i18n/en.js'
let lang = (navigator.languages && navigator.languages[0]) || navigator.language
intl.init({
    currentLocale: lang.split('-')[0],
    locales: {
        zh,
        en
    }
})

import RootRouter from './router/index'
import reducers from './reducers/index'

const store = createStore(reducers,composeWithDevTools())
ReactDOM.render(
    <Provider store={store}>
        <RootRouter />
    </Provider>
    ,
    document.getElementById('root')
);
