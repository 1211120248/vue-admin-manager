import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: resolve => require(['page/admin/Login.vue'], resolve)
        },
        {
            path: '/admin',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/index',
                    component: resolve => require(['../components/page/Readme.vue'], resolve)
                },
                {

                    path: '/user',
                    component: resolve => require(['page/admin/user/User.vue'], resolve)
                },
                {

                    path: '/role',
                    component: resolve => require(['page/admin/role/Role.vue'], resolve)
                },
                {

                    path: '/permission',
                    component: resolve => require(['page/admin/permission/Permission.vue'], resolve)
                },
                {

                    path: '/dict',
                    component: resolve => require(['page/admin/dict/Dict.vue'], resolve)
                }
            ]
        },
        {
            path: '/blog',
            component: resolve => require(['../components/blog/Index.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/blog/Home.vue'], resolve)
                }
            ]
        }
    ]
})
