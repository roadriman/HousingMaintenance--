// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// polyfills
import 'babel-polyfill';
import 'whatwg-fetch';

import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';

// 第三方库
import router from './router';
import ElementUI from 'element-ui';

import echarts from 'echarts'
// 第三方库声明
Vue.use(ElementUI);

import store from './store';

// 本地设置

// 全局样式
import './style/reset.css';
import './style/layout.scss';
import './style/global.scss';

Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts
/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    components: { App },
    template: '<App/>'
});
