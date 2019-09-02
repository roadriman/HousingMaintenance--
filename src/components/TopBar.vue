<template>
    <div class="flex-x flex-align-center top-nav flex-justify-between">
        <div class="system-name">
            <span @click="showMessage">上海理工大学房屋维修管理系统</span>
        </div>
        <div class="flex-x">
                        <span class="name">欢迎您！{{$store.getters.authority}} 的 {{$store.getters.userName}}</span>
            <el-popover placement="top-start" title="标题" width="200" trigger="hover" content="如果您想退出此系统，可以点击此处">
                <el-button slot="reference"  @click="logout">登出</el-button>
            </el-popover>
        </div>
    </div>
</template>

<script>
    import {
        getCurrentAuthority,
        logout
    } from '../service/http';
    export default {
        name: 'top-bar',
        data() {
            return {
                count: 0,
            }
        },
        methods: {
            logout: async function () {
                this.$confirm('请确认是否退出？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    try {
                        var res = await logout();
                    } catch (e) {
                        console.log(e)
                        this.$message.error('出错啦');
                    }
                    window.location.href = "../index.html";
                }).catch(() => {});
            },
            async showMessage() {
                this.count = this.count + 1
                const h = this.$createElement;
                if (this.count == 20) {
                    this.$notify({
                        title: 'Congratulations！',
                        message: h('i', {
                            style: 'color: teal'
                        }, '恭喜你找到彩蛋！告诉你个秘密，作者的手机号是13611970950哦'),
                        duration: 0,
                        type: 'error'
                    });
                } else {
                    this.$notify({
                        title: '关于系统',
                        message: h('i', {
                            style: 'color: teal'
                        }, '此系统用于上海理工大学规划处进行房屋维修管理,如有疑问请联系邮箱 519312441@qq.com'),
                        duration: 5000,
                        type: 'info'
                    });
                }

            },
        },
        mounted: async function () {
        },
    };

</script>

<style scoped>
    .system-name {
        width: 400px;
        height: 28px;
        font-size: 20px;
        font-family: PingFangSC-Regular;
        color: rgba(255, 255, 255, 1);
        line-height: 28px;
    }

    .top-nav {
        width: 100%;
    }

    .search {
        width: 500px;
        margin-right: 80px;
    }

    .avator {
        width: 28px;
        height: 28px;
        margin-right: 20px;
    }

    .name {
        width: 300px;
        height: 22px;
        font-size: 16px;
        font-family: PingFangSC-Regular;
        color: rgba(255, 255, 255, 1);
        line-height: 22px;
        z-index: 5;
    }

    .info {
        user-select: none;
        cursor: pointer;
        min-height: 20px;
        max-width: 200px;
        float: right;
        margin-right: 20px;
    }

</style>
