<template>
    <el-container id="app">
        <el-header style="background-color:#29A0DF;" class="flex-x flex-align-center">
            <top-bar>
            </top-bar>
        </el-header>
        <el-container>
            <el-aside style="background-color:#464d5b;" width="234px">
                <side-bar></side-bar>
            </el-aside>
            <el-container>
                <router-view/>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
import SideBar from './components/SideBar.vue';
import TopBar from './components/TopBar.vue';

import { validatelogin, logout } from './service/http';

export default {
    name: 'App',
    components: {
        SideBar,
        TopBar
    },
    // beforeCreate: async function() {
    //     let account = (await validatelogin()).account;
    //     this.$store.dispatch('logIn', account);
    // }
};
</script>

<style>
#app {
    position: absolute;
    height: 100%;
    width: 100%;
}

.sidebar {
    width: 234px;
    height: 100%;
    background-color: #464d5b;
}

.ft-pagination {
    bottom: 10px;
    width: 100%;
    left: 0;
    position: absolute;
}

.pagination-box {
    height: 60px;
    width: 100%;
}

.patient-info span {
    display: inline-block;
    margin-right: 10px;
}

.patient-info span:last-child {
    margin-right: 0;
}
</style>
