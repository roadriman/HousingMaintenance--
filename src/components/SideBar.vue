<template>
    <el-row class="tac">
        <el-col :span="24">
            <el-menu default-active="1" background-color="#464D5B" text-color="#fff" active-text-color="#42B1EC"
                :router="router" :defaultActive="$route.name">
                <el-menu-item index="searchProject" v-if="authority == '管理员'|| authority == '规划处'">
                    <i class="el-icon-menu" route="searchProject"></i>
                    <span slot="title">搜索项目</span>
                </el-menu-item>
                <el-menu-item index="addProject" v-if="authority == '管理员'||authority =='规划处'">
                    <i class="el-icon-document" route="addProject"></i>
                    <span slot="title">添加项目</span>
                </el-menu-item>
                <el-menu-item index="CountData" v-if="authority == '管理员'||authority =='规划处'">
                    <i class="el-icon-d-caret" route="CountData"></i>
                    <span slot="title">数据统计</span>
                </el-menu-item>
                <el-menu-item index="SearchProjectApply" v-if="authority == '管理员'||authority =='申请部门'">
                    <i class="el-icon-star-on" route="SearchProjectApply"></i>
                    <span slot="title">我的项目</span>
                </el-menu-item>
                <el-menu-item index="ApplyProject" v-if="authority == '管理员'||authority =='申请部门'">
                    <i class="el-icon-news" route="ApplyProject"></i>
                    <span slot="title">申请新项目</span>
                </el-menu-item>
                <el-menu-item index="SearchProjectEstimate"
                    v-if="authority == '管理员'||authority =='后勤部门'||authority =='基建部门'">
                    <i class="el-icon-date" route="SearchProjectEstimate"></i>
                    <span slot="title">待概算项目</span>
                </el-menu-item>
                <el-menu-item index="SearchProjectApproval" v-if="authority == '管理员'||authority =='审计部门'">
                    <i class="el-icon-printer" route="SearchProjectApproval"></i>
                    <span slot="title">待审计项目</span>
                </el-menu-item>
                <el-menu-item index="SearchProjectPrincipal" v-if="authority == '管理员'||authority =='校长室'">
                    <i class="el-icon-setting" route="SearchProjectPrincipal"></i>
                    <span slot="title">待填写意见项目</span>
                </el-menu-item>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script>
    import {
        getCurrentAuthority,
        logout
    } from '../service/http';
    export default {
        name: 'side-bar',
        data: function () {
            return {
                router: true,
                activeItem: '1',
                searchText: '',
                username: '',
                authority: '',
            };
        },
        methods: {},
        beforeCreate() {},
        created: async function () {
            try {
                var res = await getCurrentAuthority();
                var _authority = res[0].authority
                this.$store.dispatch('setUserName', res[0].name);
                this.$store.dispatch('setAuthority', _authority);
                this.$store.dispatch('setName', res[0].personName);
                if (_authority == "申请部门")
                    this.$router.push("SearchProjectApply")
                if (_authority == "后勤部门")
                    this.$router.push("SearchProjectEstimate")
                if (_authority == "基建部门")
                    this.$router.push("SearchProjectEstimate")
                if (_authority == "审计部门")
                    this.$router.push("SearchProjectApproval")
                 if (_authority == "校长室")
                    this.$router.push("SearchProjectPrincipal")
            } catch (e) {
                console.log(e)
                this.$message.error('出错啦');
            }
            this.username = this.$store.getters.userName;
            this.authority = this.$store.getters.authority;
        },
    };

</script>

<style>
    .is-active::before {
        position: absolute;
        content: '';
        height: 100%;
        width: 4px;
        background-color: #0086cd;
        left: 0;
    }

    .icon {
        display: inline-block;
        width: 13px;
        height: 14px;
        margin-right: 20px;
        background-size: cover;
        background-position: center;
    }

    .icon-case-toclaim {
        background-image: url('../images/icon-case-toclaim.png');
    }

    .is-active .icon-case-toclaim {
        background-image: url('../images/icon-case-toclaim-active.png');
    }

    .icon-case-todo {
        background-image: url('../images/icon-case-todo.png');
    }

    .is-active .icon-case-todo {
        background-image: url('../images/icon-case-todo-active.png');
    }

    .icon-case-finished {
        background-image: url('../images/icon-case-finished.png');
    }

    .is-active .icon-case-finished {
        background-image: url('../images/icon-case-finished-active.png');
    }

    .icon-case-unqualify {
        background-image: url('../images/icon-case-unqualify.png');
    }

    .is-active .icon-case-unqualify {
        background-image: url('../images/icon-case-unqualify-active.png');
    }

</style>
