import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';    // 默认主题

import "babel-polyfill";
import './mock/index.js';

Vue.use(ElementUI);
axios.defaults.withCredentials=true;
Vue.prototype.$axios = axios;
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');

// http request 拦截器
axios.interceptors.request.use(
    config => {
        return config;
    },
    err => {
        return Promise.reject(err);
    });

axios.interceptors.response.use(
    response => {
        switch(response.data.code){
            case '401':
                ElementUI.Message.warning("请登录")
                router.push("/login");
                break;
            case '500':
                ElementUI.Message.warning(response.data.msg)
                break;
        }
        return response;
    },
    error => {
        if (error.response) {

        }
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    });
