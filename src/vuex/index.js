import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

var state = {
    nav: [{title: '首页', link: '/'}],
    isLoading: false, //加载遮罩层
    menu: '-1',
    chinaArea: [],
    worldArea: [],
    //request: 'http://192.168.1.35:8080', //图片请求地址
    request: 'http://39.108.60.12:8080',
    templates: {
        modify: [{
                id: 1,
                link: '/frame/product/modify/freedom/baseinfo'
            },
            {
                id: 2,
                link: '/frame/product/modify/start/baseinfo'
            },
            {
                id: 3,
                link: '/frame/product/modify/end/baseinfo'
            },
            {
                id: 4,
                link: '/frame/product/modify/oneday/baseinfo'
            },
        ],
        check: [{
                id: 1,
                link: '/frame/product/check/freedom/baseinfo'
            },
            {
                id: 2,
                link: '/frame/product/check/start/baseinfo'
            },
            {
                id: 3,
                link: '/frame/product/check/end/baseinfo'
            },
            {
                id: 4,
                link: '/frame/product/check/oneday/baseinfo'
            },
        ],
        add: [{
                id: 1,
                link: '/frame/product/add/freedom/baseinfo'
            },
            {
                id: 2,
                link: '/frame/product/add/start/baseinfo'
            },
            {
                id: 3,
                link: '/frame/product/add/end/baseinfo'
            },
            {
                id: 4,
                link: '/frame/product/add/oneday/baseinfo'
            },
        ]
    },
    router: []
}

var mutations = {
    updatenav(state, arr) {
        state.nav = arr;
    },
    setLoading(state, str) {
        state.isLoading = str;
    },
    setMenu(state, str) {
        state.menu = str;
    },
    setChinaArea(state, str) {
        state.chinaArea = str
    },
    setWorldArea(state, str) {
        state.worldArea = str
    },
}

var actions = {
    updatenav({ commit }, arr) {
        commit('updatenav', arr)
    },
    setLoading({ commit }, str) {
        commit('setLoading', str)
    },
    setMenu({ commit }, str) {
        commit('setMenu', str)
    },
    setChinaArea({ commit }, data) {
        commit('setChinaArea', data);
    },
    setWorldArea({ commit }, data) {
        commit('setWorldArea', data);
    },
}

var getters = {
    getNav(state) {
        return state.nav;
    },
    getLoading(state) {
        return state.isLoading
    },
    getMenu(state) {
        return state.menu
    },
    getChinaArea(state) {
        return state.chinaArea;
    },
    getWorldArea(state) {
        return state.worldArea;
    },
    getRequest(state) {
        return state.request;
    },
    getTemplates(state) {
        return state.templates;
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})