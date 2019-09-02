import Vue from 'vue';
import Router from 'vue-router';
import SearchProject from '../pages/searchProject';
import SearchProjectApply from '../pages/SearchProjectApply';
import SearchProjectApproval from '../pages/SearchProjectApproval';
import SearchProjectEstimate from '../pages/SearchProjectEstimate';
import SearchProjectPrincipal from '../pages/SearchProjectPrincipal';
import AddProject from '../pages/addProject';
import ApplyProject from '../pages/ApplyProject';
import test from '../pages/test';
import CountData from '../pages/CountData';


import { validatelogin, logout } from '../service/http';

Vue.use(Router);

var router = new Router({
    routes: [
        {
            path: '/searchProject',
            name: 'searchProject',
            component: SearchProject
        },
        {
            path: '/addProject',
            name: 'addProject',
            component: AddProject
        },
        {
            path: '/CountData',
            name: 'CountData',
            component: CountData
        },
        {
            path: '/SearchProjectApply',
            name: 'SearchProjectApply',
            component: SearchProjectApply
        },
        {
            path: '/SearchProjectEstimate',
            name: 'SearchProjectEstimate',
            component: SearchProjectEstimate
        },
        {
            path: '/SearchProjectApproval',
            name: 'SearchProjectApproval',
            component: SearchProjectApproval
        },
        {
            path: '/SearchProjectPrincipal',
            name: 'SearchProjectPrincipal',
            component: SearchProjectPrincipal
        },
        {
            path: '/ApplyProject',
            name: 'ApplyProject',
            component: ApplyProject
        },
        {
            path: '/test',
            name: 'test',
            component: test
        },
        {
            path: '/',
            redirect: { name: 'searchProject' }
        }
    ]
});

// router.beforeResolve(async (to,from,next)=>{
//     try {
//         let res = await validatelogin() || "";
//         if(!res || !res.status){
//             redirectToLogin.apply(this)
//         }else{
//             next();
//         }
//         sessionStorage.setItem('userName',res.account)

//     } catch (e) {
//         redirectToLogin.apply(this)
//     }

//     function redirectToLogin(){
//         alert('此帐号无登录快速目标位生产系统的权限，请联系管理员')

//         logout()
//         next(false)
//     }
// })

export default router;
