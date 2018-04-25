import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/pages/Login'
import NotFound from '@/pages/NotFound'
import CatList from '@/pages/cat/List'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/cat/list',
            name: 'CatList',
            component: CatList
        },
        {
            path: '*',
            name: 'NotFound',
            component: NotFound
        }
    ]
})