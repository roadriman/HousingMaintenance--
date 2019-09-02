<template>
    <div class="download flex-y flex-center">
        <div class="establishment-modal">
            <div class="establishment-title">项目立项审批表</div>
            <div class="left-box">
                <timeline :projectId=this.projectId></timeline>
            </div>
            <div class="right-box">
                <i class="common-close el-icon-close" @click="close"></i>
                <div class="common-content flex-y">
                    <el-row>
                        <el-col :span="3">
                            <div class="grid-content"><span>项目名称</span></div>
                        </el-col>
                        <el-col :span="8">
                            <el-input placeholder="项目名称" v-model="projectName" :style="{'width':'190px'}"
                                :disabled="true">
                            </el-input>
                        </el-col>
                        <el-col :span="3">
                            <div class="grid-content"><span>申请部门</span></div>
                        </el-col>
                        <el-col :span="8">
                            <el-input placeholder="申请部门" v-model="department" :style="{'width':'190px'}"
                                :disabled="true">
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3">
                            <div class="grid-content"><span>建设周期</span></div>
                        </el-col>
                        <el-col :span="4">
                            <el-input placeholder="" v-model="constructionStartTime" :style="{'width':'95px'}"
                                :disabled="true"></el-input>
                        </el-col>
                        <el-col :span="4">
                            <el-input placeholder="" v-model="constructionEndTime" :style="{'width':'95px'}"
                                :disabled="true"></el-input>
                        </el-col>
                        <el-col :span="3">
                            <div class="grid-content"><span>申请时间</span></div>
                        </el-col>
                        <el-col :span="8">
                            <el-input placeholder="" v-model="applyTime" :style="{'width':'190px'}" :disabled="true">
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3">
                            <div class="grid-content"><span>项目建设初审金额</span></div>
                        </el-col>
                        <el-col :span="6">
                            <el-input placeholder="项目概算资金" v-model="fund" :disabled="true"></el-input>
                        </el-col>
                        <el-col :span="2">
                            <div class="grid-content"><span>（万元）</span></div>
                        </el-col>
                        <el-col :span="3">
                            <div class="grid-content"><span>项目场地</span></div>
                        </el-col>
                        <el-col :span="6">
                            <el-input placeholder="项目场地" v-model="field" :disabled="true"></el-input>
                        </el-col>
                        <el-col :span="2">
                            <div class="grid-content"><span>（M²）</span></div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3">
                            <div class="grid-content"><span>资金来源</span></div>
                        </el-col>
                        <el-col :span="21">
                            <el-radio-group v-model="fundSource" class="grid-content">
                                <el-radio :label="1">财政专项</el-radio>
                                <el-radio :label="2">学校预算</el-radio>
                                <el-radio :label="3">部门预算</el-radio>
                                <el-radio :label="4">其他渠道</el-radio>
                            </el-radio-group>
                        </el-col>
                    </el-row>
                    <el-row :style="{'margin-top':'-10px'}">
                        <el-col :span="4">
                            <div class="grid-content"><span>立项（变更）依据及项目建设目标及必要性</span></div>
                        </el-col>
                        <el-col :span="20">
                            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}"
                                placeholder="审计处立项（变更）依据及项目建设目标及必要性初审意见" v-model="necessity" :disabled="true">
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row class="interval">
                        <el-col :span="4">
                            <div class="grid-content"><span>项目申请部门负责人</span></div>
                        </el-col>
                        <el-col :span="8">
                            <el-input placeholder="项目申请部门负责人" v-model="applyLeader" :style="{'width':'160px'}"
                                :disabled="true"></el-input>
                        </el-col>
                        <el-col :span="4">
                            <div class="grid-content"><span>项目建设部门负责人</span></div>
                        </el-col>
                        <el-col :span="5">
                            <el-input placeholder="项目建设部门负责人" v-model="departmentLeader" :style="{'width':'180px'}"
                                :disabled="true"></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="interval" :style="{'margin-top':'-10px'}">
                        <el-col :span="20">
                            <div class="grid-content"
                                :style="{'width':'100%','height':'100%' ,'transform': 'translate3d(30%, 0%, 0)'}">
                                <span>项目实施内容</span></div>
                        </el-col>
                        <el-col :span="3">
                            <div class="grid-content"><span>估算(万元)</span></div>
                        </el-col>
                    </el-row>
                    <el-row class="interval" :style="{'margin-top':'-10px'}">
                        <el-col :span="19">
                            <el-input placeholder="项目建设内容1" v-model="content1" :disabled="true"></el-input>
                        </el-col>
                        <el-col :span="5">
                            <el-input placeholder="估算1" v-model="estimate1" :disabled="true"></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="interval">
                        <el-col :span="19">
                            <el-input placeholder="项目建设内容2" v-model="content2" :disabled="true"></el-input>
                        </el-col>
                        <el-col :span="5">
                            <el-input placeholder="估算2" v-model="estimate2" :disabled="true"></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="interval">
                        <el-col :span="19">
                            <el-input placeholder="项目建设内容3" v-model="content3" :disabled="true"></el-input>
                        </el-col>
                        <el-col :span="5">
                            <el-input placeholder="估算3" v-model="estimate3" :disabled="true"></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="interval">
                        <el-col :span="19">
                            <el-input placeholder="项目建设内容4" v-model="content4" :disabled="true"></el-input>
                        </el-col>
                        <el-col :span="5">
                            <el-input placeholder="估算4" v-model="estimate4" :disabled="true"></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="interval">
                        <el-col :span="19">
                            <el-input placeholder="项目建设内容5" v-model="content5" :disabled="true"></el-input>
                        </el-col>
                        <el-col :span="5">
                            <el-input placeholder="估算5" v-model="estimate5" :disabled="true"></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="interval">
                        <el-col :span="19">
                            <el-input placeholder="项目建设内容6" v-model="content6" :disabled="true"></el-input>
                        </el-col>
                        <el-col :span="5">
                            <el-input placeholder="估算6" v-model="estimate6" :disabled="true"></el-input>
                        </el-col>
                    </el-row>

                    <el-row class="interval">
                        <el-col :span="4">
                            <div class="grid-content"><span>总 计</span></div>
                        </el-col>
                        <el-col :span="15">
                            <div class="grid-content bg-purple-dark">
                                <!-- <el-button type="primary" icon="el-icon-tickets" @click="getTotal()" class="submit-button"
                                :style="{'height':'30px','width':'80px','margin-top':'-10px','margin-left':'-170px'}">计算</el-button> -->
                            </div>
                        </el-col>
                        <el-col :span="5">
                            <el-input placeholder="总      计" v-model="total" :disabled="true"></el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3">
                            <div class="grid-content"><span>审核意见规划发展处</span></div>
                        </el-col>
                        <el-col :span="8">
                            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="审核意见规划发展处"
                                v-model="departmentAdvise" :style="{'width':'230px'}" :disabled="true">
                            </el-input>
                        </el-col>
                        <el-col :span="3">
                            <div class="grid-content"><span>学校意见</span></div>
                        </el-col>
                        <el-col :span="10">
                            <!-- <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="学校意见"
                            v-model="schoolAdvise" :disabled="true">
                        </el-input> -->
                            <el-autocomplete v-model="schoolAdvise" :fetch-suggestions="querySearch" placeholder="请输入内容"
                                :autosize="{ minRows: 4, maxRows: 4}" class="autocomplete" ref="inputRef" :disabled="true">
                            </el-autocomplete>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple-dark">
                                <el-button type="primary" icon="el-icon-edit" @click="openAddApproval()"
                                    :style="{'width':'150px','font-size':'18px','height':'50px'}" class="submit-button"
                                    :disabled="isupdate">更新</el-button>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple-dark">
                                <el-button type="warning" icon="el-icon-edit" @click="generateDoc()"
                                    :style="{'margin-left':'320px','width':'150px','font-size':'18px','height':'50px'}"
                                    class="submit-button">生成报表</el-button>
                            </div>
                        </el-col>
                    </el-row>
                    <add-approval @close="closeAddApproval" v-if="AddApproval" :id="id" :addOrUpdate="2" :name=$store.getters.name></add-approval>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        queryApproval,
        approvalGenerateDoc
    } from '../service/http';
    import AddApproval from '../components/AddApproval.vue';
    import BigNumber from "bignumber.js"
    import Timeline from '../components/Timeline.vue';

    export default {
        name: 'check-approval',
        props: ['id', 'isupdate', 'source', 'projectId',"name"],
        components: {
            AddApproval,
            Timeline
        },
        data() {
            return {
                projectName: '',
                department: '',
                applyTime: '',
                constructionStartTime: '',
                constructionEndTime: '',
                field: '',
                fund: '',
                fundSource: '',
                necessity: '',
                applyLeader: '',
                content1: '',
                content2: '',
                content3: '',
                content4: '',
                content5: '',
                content6: '',
                estimate1: '',
                estimate2: '',
                estimate3: '',
                estimate4: '',
                estimate5: '',
                estimate6: '',
                total: '',
                departmentLeader: '',
                departmentAdvise: '',
                schoolAdvise: '经XXXX年XX月XX日,XXXX会议批准本建设项目立项（调整）。',
                AddApproval: false,
                restaurants: [],
            }
        },
        methods: {
            close() {
                this.$emit('close');
            },
            openAddApproval: function () {
                this.AddApproval = true;
            },
            closeAddApproval: async function () {
                this.AddApproval = false;
                if (this.id != null && this.id != 0 && typeof this.id != 'undefined') {
                    try {
                        var res = await queryApproval(
                            this.id
                        );
                        this.projectName = res.data.projectName
                        this.department = res.data.department
                        this.applyTime = res.data.applyTime
                        this.constructionStartTime = res.data.constructionStartTime
                        this.constructionEndTime = res.data.constructionEndTime
                        this.field = res.data.field
                        this.fund = res.data.fund
                        this.fundSource = res.data.fundSource
                        this.necessity = res.data.necessity
                        this.applyLeader = res.data.applyLeader
                        this.content1 = res.data.content1
                        this.content2 = res.data.content2
                        this.content3 = res.data.content3
                        this.content4 = res.data.content4
                        this.content5 = res.data.content5
                        this.content6 = res.data.content6
                        this.estimate1 = res.data.estimate1
                        this.estimate2 = res.data.estimate2
                        this.estimate3 = res.data.estimate3
                        this.estimate4 = res.data.estimate4
                        this.estimate5 = res.data.estimate5
                        this.estimate6 = res.data.estimate6
                        this.total = res.data.total
                        this.departmentLeader = res.data.departmentLeader
                        this.departmentAdvise = res.data.departmentAdvise
                        this.schoolAdvise = res.data.schoolAdvise
                    } catch (e) {
                        console.log(e)
                        this.$message.error('出错啦');
                    }
                }
            },
            getTotal() {
                var _total = new BigNumber(0.0)
                var _estimate1 = this.estimate1;
                var _estimate2 = this.estimate2;
                var _estimate3 = this.estimate3;
                var _estimate4 = this.estimate4;
                var _estimate5 = this.estimate5;
                var _estimate6 = this.estimate6;
                var flag = 1;
                if (_estimate1 != "" && _estimate1 != null) {
                    flag = this.floatFormat(_estimate1) && flag
                    _total = _total.plus(new BigNumber(_estimate1))
                }
                if (_estimate2 != "" && _estimate2 != null) {
                    flag = this.floatFormat(_estimate2) && flag
                    _total = _total.plus(new BigNumber(_estimate2))
                }
                if (_estimate3 != "" && _estimate3 != null) {
                    flag = this.floatFormat(_estimate3) && flag
                    _total = _total.plus(new BigNumber(_estimate3))
                }
                if (_estimate4 != "" && _estimate4 != null) {
                    flag = this.floatFormat(_estimate4) && flag
                    _total = _total.plus(new BigNumber(_estimate4))
                }
                if (_estimate5 != "" && _estimate5 != null) {
                    flag = this.floatFormat(_estimate5) && flag
                    _total = _total.plus(new BigNumber(_estimate5))
                }
                if (_estimate6 != "" && _estimate6 != null) {
                    flag = this.floatFormat(_estimate6) && flag
                    _total = _total.plus(new BigNumber(_estimate6))
                }
                if (!flag)
                    this.$alert('请确认您输入的估算为正确的数字', '数字验证', {
                        confirmButtonText: '确定',
                        callback: action => {
                            return
                        }
                    });
                else {
                    this.total = _total
                }
            },
            querySearch(queryString, cb) {
                console.log(1)
                var restaurants = [{
                    "value": "同意。" + this.name
                }, {
                    "value": "不同意。" + this.name
                }];
                cb(restaurants);
            },
            generateDoc: async function () {
                this.AddApproval = false;
                if (this.id != null && this.id != 0 && typeof this.id != 'undefined') {
                    try {
                        var res = await approvalGenerateDoc(
                            this.id
                        );

                    } catch (e) {
                        console.log(e)
                        this.$message.error('出错啦');
                    }
                    if (res.status == 1) {
                        this.$message.success(res.msg);
                        this.downloadAttachment("../ftl/" + res.data)
                    } else
                        this.$message.error(res.msg);
                }
            },

            downloadAttachment(url) {
                window.open(url);
            },
        },
        created: async function () {
            if (this.id != null && this.id != 0 && typeof this.id != 'undefined') {
                try {
                    var res = await queryApproval(
                        this.id
                    );
                    this.projectName = res.data.projectName
                    this.department = res.data.department
                    this.applyTime = res.data.applyTime
                    this.constructionStartTime = res.data.constructionStartTime
                    this.constructionEndTime = res.data.constructionEndTime
                    this.field = res.data.field
                    this.fund = res.data.fund
                    this.fundSource = res.data.fundSource
                    this.necessity = res.data.necessity
                    this.applyLeader = res.data.applyLeader
                    this.content1 = res.data.content1
                    this.content2 = res.data.content2
                    this.content3 = res.data.content3
                    this.content4 = res.data.content4
                    this.content5 = res.data.content5
                    this.content6 = res.data.content6
                    this.estimate1 = res.data.estimate1
                    this.estimate2 = res.data.estimate2
                    this.estimate3 = res.data.estimate3
                    this.estimate4 = res.data.estimate4
                    this.estimate5 = res.data.estimate5
                    this.estimate6 = res.data.estimate6
                    this.total = res.data.total
                    this.departmentLeader = res.data.departmentLeader
                    this.departmentAdvise = res.data.departmentAdvise
                    this.schoolAdvise = res.data.schoolAdvise
                } catch (e) {
                    console.log(e)
                    this.$message.error('出错啦');
                }
            }
            const h = this.$createElement;
            if (this.isupdate == true && this.source == 'Apply') {
                this.$notify({
                    title: '只能查看',
                    message: h('i', {
                        style: 'color: teal'
                    }, '由于您是项目申请者，所以这个表格对于您来说只能查看内容而不能更新'),
                    duration: 5000,
                    type: 'warning'
                });
            }
        },
        mounted: function () {}
    };
</script>
<style>
    .download {
        z-index: 10;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.17);
    }

    .common-content {
        margin-top: 40px;
    }

    .establishment-modal {
        position: relative;
        width: 1200px;
        height: 900px;
        background-color: white;
        border-radius: 4px;
        box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.5);
        padding: 20px 20px;
    }

    .download-btn {
        position: absolute;
        bottom: 10px;
        right: 20px;
    }

    .iframe {
        position: absolute;
        bottom: 10px;
        right: 130px;
        width: 150px !important;
    }

    .establishment-title {
        width: 100%;
        height: 100%;
        align-content: center;
        position: absolute;
        top: 17px;
        left: 17px;
        font-size: 20px;
        transform: translate3d(35%, 0%, 0);
        font-weight: bold
    }

    .common-close {
        position: absolute;
        top: 17px;
        right: 17px;
        font-size: 20px;
        cursor: pointer;
    }

    .grid-content {
        margin-top: 10px;
        font-size: 15px;
    }

    .interval {
        margin-top: 5px;
    }

    .submit-button {
        width: 20%;
        height: 100%;
        align-content: center;
        position: absolute;
        top: 17px;
        left: 300px;
        font-size: 18px;
        font-weight: bold
    }

    .left-box {

        margin-top: 20px;
        width: 25%;
        height: 800px;
        float: left;
        display: inline-block;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    element::-webkit-scrollbar {
        width: 0 !important
    }

    .right-box {
        margin-left: 20px;
        width: 70%;
        display: inline-block;
        float: left;
    }
</style>