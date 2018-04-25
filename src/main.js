// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import { Loading } from 'element-ui'
import axios from 'axios'
import store from './vuex/index'

router.beforeEach((to, from, next) => {
    //   console.log(to, from), 
    next();
})

Vue.config.productionTip = false
Vue.use(ElementUI)


//网络请求
var instance = axios.create({
    // headers: {Authorization: ''},
    baseURL: "http://127.0.0.1:8080/imiao-admin",
});

// 请求拦截
instance.interceptors.request.use(function(config) {
    // 在发送请求之前做些什么
    return config;
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

//响应拦截
instance.interceptors.response.use(
    function(res) {
        // 对响应数据做点什么
        store.dispatch('setLoading', false)
        if (res.data.code == 400 || res.data.code == 500) {
            ElementUI.Message({
                message: res.data.info,
                type: 'error'
            })
            return Promise.reject(res.data.info);
        }
        return res.data;
    },
    function(error) {
        // 对响应错误做点什么
        ElementUI.Message({
            message: '网络请求出错，请联系技术人员',
            type: 'error'
        })
        return Promise.reject(error);
    }
);

//设置网络请求
Vue.prototype.$http = instance;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})