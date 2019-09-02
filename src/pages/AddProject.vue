<template>
    <div class="flex-1 flex-y">
        <!-- <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <el-button  class="project-button" type="primary" icon="el-icon-edit" :style="{'width':'200px','height':'50px'}" :disabled="buttonEstablishment" @click="openAddEstablishment()"
                        >项目立项申请表</el-button>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <el-button  class="project-button" type="primary" icon="el-icon-edit"  :style="{'width':'200px','height':'50px'}" :disabled="buttonEstimate" @click="openAddEstimate()">项目概算审定表</el-button>
                </div>
            </el-col>
        </el-row> -->
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <el-button class="project-button" type="primary" icon="el-icon-edit"
                        :style="{'width':'200px','height':'50px'}" :disabled="buttonApproval"
                        @click="openAddApproval()">项目立项审批表</el-button>
                </div>
            </el-col>
        </el-row>
        <add-establishment @close="closeAddEstablishment" v-if="AddEstablishment" :addOrUpdate="1"
            :projectId=this.projectId></add-establishment>
        <add-estimate @close="closeAddEstimate" v-if="AddEstimate" :addOrUpdate="1" :projectId=this.projectId>
        </add-estimate>
        <add-approval @close="closeAddApproval" v-if="AddApproval" :addOrUpdate="1" :projectId=this.projectId :name=$store.getters.name :isadmin=1>
        </add-approval>
    </div>
</template>

<script>
    import AddEstablishment from '../components/AddEstablishment.vue';
    import AddEstimate from '../components/AddEstimate.vue';
    import AddApproval from '../components/AddApproval.vue';

    import {
        addProject,
        queryProject
    } from '../service/http';

    export default {
        name: 'add-project',
        components: {
            AddEstablishment,
            AddEstimate,
            AddApproval
        },
        data() {
            return {
                AddEstablishment: false,
                AddEstimate: false,
                AddApproval: false,
                projectId: 0,
                establishmentId: '',
                estimateId: '',
                approvalId: '',
                isdone: 0,
                buttonEstablishment: false,
                buttonEstimate: true,
                buttonApproval: true,
            };
        },
        methods: {
            openAddEstablishment: function () {
                if (this.isdone == 0)
                    this.$alert('项目未创建成功，请重新进入', '项目创建', {
                        confirmButtonText: '确定',
                        callback: action => {
                            return
                        }
                    });
                else
                    this.AddEstablishment = true;
            },
            closeAddEstablishment: function () {
                this.selected = {};
                this.AddEstablishment = false;
                this.verification();
            },
            openAddEstimate: function () {
                this.AddEstimate = true;
            },
            closeAddEstimate: function () {
                this.selected = {};
                this.AddEstimate = false;
                this.verification();
            },
            openAddApproval: function () {
                this.AddApproval = true;
            },
            closeAddApproval: function () {
                this.selected = {};
                this.AddApproval = false;
                this.verification();
            },
            verification: async function () {
                if (this.isdone == 1)
                    try {
                        var res = await queryProject(
                            this.projectId
                        );
                    } catch (e) {
                        console.log(e)
                        this.$message.error('出错啦');
                    }
                if (res.status == 1) {
                         console.log(res.data)
                    this.establishmentId = res.data.establishment
                    this.estimateId = res.data.estimate
                    this.approvalId = res.data.approval
                    this.isdone = 1
                    console.log(this.approvalId)
                    if (this.approvalId == 0) {
                        this.buttonApproval = false
                    } else {
                        this.buttonApproval = true
                    }
                } else
                    this.$message.error(res.msg);
            }
        },
        created: async function () {
            this.$prompt('项目名称', '新建项目', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /\S/,
                inputErrorMessage: '项目名称不能为空'
            }).then(async ({
                value
            }) => {
                try {
                    var res = await addProject(
                        value,
                        6
                    );
                } catch (e) {
                    console.log(e)
                    this.$message.error('出错啦');
                }
                if (res.status == 1) {
                    {
                        this.$message.success(res.msg);
                        this.projectId = res.id
                        this.isdone = 1
                        this.verification();
                    }
                } else {
                    this.$message.error(res.msg);
                }

            }).catch(async (e) => {

                this.$message({
                    type: 'info',
                    message: '未创建项目'
                });
            });

        },

        beforeRouteLeave: function (to, from, next) {
            if (this.approvalId == 0&&this.isdone == 1) {
                next(false)
                this.$confirm('您还未提交所有表格数据，确定需要提出吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 选择确定
                    next()
                })
            } else {
                next()
            }
        }
    };
</script>

<style>
    .project-button {
        left: 100px;
        margin-top: 60px;
        position: relative;
        width: 200px;
        height: 50px;

    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
</style>