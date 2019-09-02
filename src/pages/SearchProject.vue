<template>
    <div class="flex-1 flex-y relative">
        <div class="search">
            <el-row>
                <span :style="{'font-size':'14px','margin-left':'60px'}">搜索条件</span>
                <el-input placeholder="请输入关键字" prefix-icon="el-icon-search" v-model="key" :style="{'width':'190px'}"
                    @keyup.enter.native="queryProjectList(1)">
                </el-input>
                <el-date-picker size="medium" placeholder="选择开始时间" v-model="startTime" value-format="yyyy-MM-dd"
                    type="date" :style="{'width':'190px'}" @keyup.enter.native="queryProjectList(1)">
                </el-date-picker>

                <el-date-picker size="medium" placeholder="选择结束时间" v-model="endTime" value-format="yyyy-MM-dd"
                    type="date" :style="{'width':'190px'}" @keyup.enter.native="queryProjectList(1)"
                    style="width: 100%;">
                </el-date-picker>

                <el-button type="primary" @click="queryProjectList(1)" :style="{'width':'50px'}">搜索
                </el-button>
                <el-tooltip class="item" effect="dark" content="这里的开始和结束时间的范围是指立项审批表的生成时间" placement="right-start">
                    <i class="el-icon-question" :style="{'color':'#2a2294'}"></i>
                </el-tooltip>
                <el-checkbox v-model="checked">查看项目详情</el-checkbox>
                <!-- <el-popover
                    placement="right"
                    width="400"
                    trigger="click">
                    <el-table :data="gridData">
                        <el-table-column width="150" property="date" label="日期"></el-table-column>
                        <el-table-column width="100" property="name" label="姓名"></el-table-column>
                        <el-table-column width="300" property="address" label="地址"></el-table-column>
                    </el-table>
                    <el-button slot="reference" id = "file" class = "">click 激活</el-button>
                    </el-popover>
                     <el-badge value="hot" class="item">
                       <i class="el-icon-bell" size="large" ></i>
                     </el-badge> -->
            </el-row>
        </div>
        <el-table :data="tableData" v-loading="loading" class="ft-table" style="width: 100%;" height="100%"
            header-cell-class-name="is-center" cell-class-name="is-center">
            <!-- <el-table-column prop="id" label="ID"> -->
            <!-- </el-table-column> -->
            <el-table-column label="项目名称">
                <template slot-scope="scope">
                    <span>{{scope.row.projectName}}</span>
                </template>
            </el-table-column>
            <el-table-column label="立项申请表" align="left" v-if="checked">
                <template slot-scope="scope">
                    <span>
                        <el-button type="primary" icon="el-icon-zoom-in" v-if="scope.row.establishment!=0"
                            @click="openCheckEstablishment(scope.row.establishment,scope.row.id)">查看</el-button>
                        <el-button type="primary" icon="el-icon-edit" v-if="scope.row.establishment==0"
                            @click="openAddEstablishment(scope.row.id)">添加</el-button>
                    </span>

                </template>
            </el-table-column>
            <el-table-column label="概算审定表" align="left" v-if="checked">
                <template slot-scope="scope">
                    <div>
                        <el-button type="primary" icon="el-icon-zoom-in" v-if="scope.row.estimate!=0"
                            @click="openCheckEstimate(scope.row.estimate,scope.row.id)">查看</el-button>
                        <el-button type="primary" icon="el-icon-edit" v-if="scope.row.estimate==0"
                            @click="openAddEstimate(scope.row.id,scope.row.establishment)">添加</el-button>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="立项审批表" align="left">
                <template slot-scope="scope">
                    <div>
                        <el-button type="primary" icon="el-icon-zoom-in" v-if="scope.row.approval!=0"
                            @click="openCheckApproval(scope.row.approval,scope.row.id)">查看</el-button>
                        <el-button type="primary" icon="el-icon-edit" v-if="scope.row.approval==0"
                            @click="openAddApproval(scope.row.id,scope.row.estimate)">添加</el-button>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="附件数量/查看" align="left">
                <template slot-scope="scope">
                    <div>
                        {{scope.row.attachmentNum}}个附件
                        <el-button type="success" icon="el-icon-zoom-in" @click="openAttachment(scope.row.id)">查看
                        </el-button>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="状态" align="left">
                <template slot-scope="scope">
                    <operation-btns :row="scope.row"></operation-btns>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="left">
                <template slot-scope="scope">
                    <div>
                        <el-button type="success" icon="el-icon-check" @click="approveApply(scope.row.id)"
                            v-if="scope.row.status==1" :style="{'width':'90px','  margin-left':'0px'}">批准申请
                        </el-button>
                        <el-button type="warning" icon="el-icon-close" @click="rejectApprove(scope.row.id)"
                            v-if="scope.row.status==1" :style="{'width':'90px','  margin-left':'0px'}">退回申请
                        </el-button>
                        <el-button type="success" icon="el-icon-check" @click="approveEstimate(scope.row.id)"
                            v-if="scope.row.status==3" :style="{'width':'90px','  margin-left':'0px'}">批准概算
                        </el-button>
                        <el-button type="warning" icon="el-icon-close" @click="rejectEstimate(scope.row.id)"
                            v-if="scope.row.status==3" :style="{'width':'90px','  margin-left':'0px'}">退回概算
                        </el-button>
                        <el-button type="success" icon="el-icon-check" @click="remind(scope.row.id)"
                            v-if="scope.row.status==5" :style="{'width':'90px','  margin-left':'0px'}">审批通过
                        </el-button>
                        <el-button type="danger" icon="el-icon-delete" @click="deleteProject(scope.row.id)"
                            :style="{'width':'90px','margin-left':'0px'}">删除
                        </el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="flex-x flex-justify-center ft-pagination" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <div class="pagination-box"></div>
        <check-establishment @close="closeCheckEstablishment" :id="id" v-if="CheckEstablishment"
            :projectId=this.projectId></check-establishment>
        <!-- <timeline :id="id" v-if="CheckEstablishment" :style="{'margin-left':'500px'}"></timeline> -->
        <check-estimate @close="closeCheckEstimate" :id="id" v-if="CheckEstimate" :projectId=this.projectId>
        </check-estimate>
        <check-approval @close="closeCheckApproval" :id="id" v-if="CheckApproval" :projectId=this.projectId :name=$store.getters.name>
        </check-approval >
        <add-establishment @close="closeAddEstablishment" v-if="AddEstablishment" :projectId=this.projectId
            :addOrUpdate="1"></add-establishment>
        <add-estimate @close="closeAddEstimate" v-if="AddEstimate" :projectId=this.projectId :addOrUpdate="1"
            :establishmentId=this.establishmentId>
        </add-estimate>
        <add-approval @close="closeAddApproval" v-if="AddApproval" :projectId=this.projectId :addOrUpdate="1"
            :estimateId=this.estimateId>
        </add-approval>
        <attachment @close="closeAttachment" v-if="Attachment" :projectId="projectId"></attachment>
    </div>

</template>


<script>
    import CheckEstablishment from '../components/CheckEstablishment.vue';
    import CheckEstimate from '../components/CheckEstimate.vue';
    import CheckApproval from '../components/CheckApproval.vue';
    import AddEstimate from '../components/AddEstimate.vue';
    import AddEstablishment from '../components/AddEstablishment.vue';
    import AddApproval from '../components/AddApproval.vue';
    import Attachment from '../components/Attachment.vue';
    import OperationBtns from '../components/operationBtns.vue';
    import Timeline from '../components/Timeline.vue';
    import Notice from '../components/notice.vue';
    import {
        queryProjectList,
        deleteProject,
        updateProjectStatus,
        addReason
    } from '../service/http';
    export default {
        name: 'search-project',
        components: {
            CheckEstablishment,
            CheckEstimate,
            CheckApproval,
            AddEstimate,
            AddEstablishment,
            AddApproval,
            Attachment,
            OperationBtns,
            Timeline,
            Notice
        },
        data: function () {
            return {
                tableData: [],
                pageSize: 10,
                currentPage: 1,
                loading: true,
                total: 0,
                key: '',
                timeofLevel: {
                    0: 35,
                    1: 30,
                    2: 35,
                    3: 40
                },
                id: '',
                projectId: '',
                establishmentId: '',
                estimateId: '',
                startTime: '',
                endTime: '',
                CheckEstablishment: false,
                CheckEstimate: false,
                CheckApproval: false,
                AddEstablishment: false,
                AddEstimate: false,
                AddApproval: false,
                Attachment: false,
                projectId: '',
                checked: false,
                pageFlat: ''
            };
        },
        methods: {
            handleCurrentChange: async function (currentPage) {
                this.loading = true;
                try {

                    var res = await queryProjectList(
                        this.key,
                        null,
                        currentPage,
                        this.pageSize,
                        this.startTime,
                        this.endTime
                    );
                    this.currentPage = currentPage;
                    this.tableData = res.projectList;
                    this.total = res.caseCount;
                } catch (e) {
                    console.log(e)
                    this.$message.error('出错啦');
                }
                this.loading = false;
                return currentPage;
            },
            handleSizeChange: async function (pageSize) {
                this.loading = true;
                try {
                    var res = await queryProjectList(
                        this.key,
                        null,
                        this.currentPage,
                        pageSize,
                        this.startTime,
                        this.endTime
                    );
                    this.pageSize = pageSize;
                    this.tableData = res.projectList;
                    this.total = res.caseCount;
                } catch (e) {
                    console.log(e)
                    this.$message.error('出错啦');
                }
                this.loading = false;
                return this.pageSize;
            },
            deleteProject: async function (id) {
                this.$confirm('此操作将删除该项目, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    console.log(id)
                    try {
                        var res = await deleteProject(
                            id
                        );
                    } catch (e) {
                        console.log(e)
                        this.$message.error('出错啦');
                    }
                    if (res.status == 1) {
                        this.$message.success(res.msg);
                        this.queryProjectList(this.currentPage)
                    } else
                        this.$message.error(res.msg);
                }).catch(() => {});
            },
            approveApply: async function (id) {
                this.$confirm('此操作会将项目送至概算部门进行概算 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    console.log(id)
                    try {
                        var res = await updateProjectStatus(
                            id,
                            2
                        );
                    } catch (e) {
                        console.log(e)
                        this.$message.error('出错啦');
                    }
                    if (res.status == 1) {
                        this.$message.success("操作成功！");
                        this.queryProjectList(this.currentPage)
                    } else
                        this.$message.error("操作失败！");
                }).catch(() => {});
            },
            rejectApprove: async function (id) {
                this.$prompt('此操作会将项目退回给申请部门, 退回时可以填写原因', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(async ({value}) => {
                    try {
                        var res = await addReason(
                            value,
                            id,
                            10
                        );
                    } catch (e) {
                        console.log(e)
                        this.$message.error('出错啦');
                    }
                    try {
                        var res = await updateProjectStatus(
                            id,
                            10
                        );
                    } catch (e) {
                        console.log(e)
                        this.$message.error('出错啦');
                    }
                    if (res.status == 1) {
                        this.$message.success("操作成功！");
                        this.queryProjectList(this.currentPage)
                    } else
                        this.$message.error("操作失败！");
                }).catch(() => {});
            },
            approveEstimate: async function (id) {
                this.$confirm('此操作会将项目送至审计部门进行审计 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    console.log(id)
                    try {
                        var res = await updateProjectStatus(
                            id,
                            4
                        );
                    } catch (e) {
                        console.log(e)
                        this.$message.error('出错啦');
                    }
                    if (res.status == 1) {
                        this.$message.success("操作成功！");
                        this.queryProjectList(this.currentPage)
                    } else
                        this.$message.error("操作失败！");
                }).catch(() => {});
            },
            rejectEstimate: async function (id) {
                this.$prompt('此操作会将项目退回给概算部门重新概算,  退回时可以填写原因', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(async ({value}) => {
                    try {
                        var res = await addReason(
                            value,
                            id,
                            20
                        );
                    } catch (e) {
                        console.log(e)
                        this.$message.error('出错啦');
                    }
                    try {
                        var res = await updateProjectStatus(
                            id,
                            20
                        );
                    } catch (e) {
                        console.log(e)
                        this.$message.error('出错啦');
                    }
                    if (res.status == 1) {
                        this.$message.success("操作成功！");
                        this.queryProjectList(this.currentPage)
                    } else
                        this.$message.error("操作失败！");
                }).catch(() => {});
            },
            remind: async function (id) {
                this.$confirm('此操作将结束项目，选择直接结束项目还是将其送至校长室填写学校意见?', '提示', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '直接结束',
                    cancelButtonText: '送至校长室',
                    type: 'warning'
                }).then(async () => {
                    try {
                        var res = await updateProjectStatus(
                            id,
                            6
                        );
                    } catch (e) {
                        console.log(e)
                        this.$message.error('出错啦');
                    }
                    if (res.status == 1) {
                        this.$message.success("操作成功！");
                        this.queryProjectList(this.currentPage)
                    } else
                        this.$message.error("操作失败！");
                }).catch(async (action) => {
                    if(action == 'cancel'){
                    try {
                        var res = await updateProjectStatus(
                            id,
                            51
                        );
                    } catch (e) {
                        console.log(e)
                        this.$message.error('出错啦');
                    }
                    if (res.status == 1) {
                        this.$message.success("操作成功！");
                        this.queryProjectList(this.currentPage)
                    } else
                        this.$message.error("操作失败！");}
                });
            },
            openCheckEstablishment: function (id, projectId) {
                this.projectId = projectId
                this.id = id;
                this.CheckEstablishment = true;
            },
            closeCheckEstablishment: function () {

                this.CheckEstablishment = false;
                this.queryProjectList(this.currentPage);
            },
            openCheckEstimate: function (id, projectId) {
                this.projectId = projectId
                this.id = id;
                this.CheckEstimate = true;
            },
            closeCheckEstimate: function () {

                this.CheckEstimate = false;
                this.queryProjectList(this.currentPage);
            },
            openCheckApproval: function (id, projectId) {
                this.projectId = projectId
                this.id = id;
                this.CheckApproval = true;
            },
            closeCheckApproval: function () {
                this.CheckApproval = false;
                this.queryProjectList(this.currentPage);
            },
            openAddEstablishment: function (id) {
                this.projectId = id
                this.AddEstablishment = true;
            },
            closeAddEstablishment: function () {
                this.selected = {};
                this.AddEstablishment = false;
                this.queryProjectList(this.currentPage);
            },
            openAddEstimate: function (id, establishmentId) {
                console.log(id + " " + establishmentId)
                this.establishmentId = establishmentId
                this.projectId = id
                this.AddEstimate = true;
            },
            closeAddEstimate: function () {
                this.selected = {};
                this.AddEstimate = false;
                this.queryProjectList(this.currentPage);
            },
            openAddApproval: function (id, estimateId) {
                this.estimateId = estimateId
                this.projectId = id
                this.AddApproval = true;
            },
            closeAddApproval: function () {
                this.selected = {};
                this.AddApproval = false;
                this.queryProjectList(this.currentPage);
            },
            openAttachment: function (id) {
                this.projectId = id
                this.Attachment = true;
            },
            closeAttachment: function () {
                this.selected = {};
                this.Attachment = false;
                this.queryProjectList(this.currentPage);
            },
            queryProjectList: async function (currentPage) {
                try {
                    var res = await queryProjectList(
                        this.key,
                        null,
                        currentPage,
                        this.pageSize,
                        this.startTime,
                        this.endTime
                    );
                    this.tableData = res.projectList;
                    this.total = res.caseCount;

                } catch (e) {
                    console.log(e)
                    this.$message.error('出错啦');
                }
                this.loading = false;
            }
        },
        created: async function () {
            try {
                var res = await queryProjectList(
                    this.key,
                    null,
                    this.currentPage,
                    this.pageSize,
                    this.startTime,
                    this.endTime
                );
                this.tableData = res.projectList;
                this.total = res.caseCount;
            } catch (e) {
                console.log(e)
                this.$message.error('出错啦');
            }
            this.loading = false;
        },
    };

</script>

<style>
    .processing {
        color: #46a442;
        display: inline-block;
        padding: 0 31px;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }

    .iprTooth {
        float: left;
        width: 48%;
    }

    .extractionTooth {
        float: right;
        width: 48%;
    }

    .cRequirement {
        background: #eaf7fe;
        border-radius: .02rem;
        padding: 2px;
    }

    .remaining {
        background: #FAAD14;
    }

    .timeout {
        background: #F5222D;
    }

    .remainingTime {
        border-radius: 4px;
        font-size: 12px;
        color: #FFFFFF;
        padding: 3px 8px;
        margin-left: 10px;
    }

    .search {
        font-size: '20px';
    }

    .el-button+.el-button {
        margin-left: 0px;
    }

    #file {
        display: none;
    }

</style>
