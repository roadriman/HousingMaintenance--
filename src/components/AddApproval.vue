<template>
    <div class="download flex-y flex-center">
        <div class="add-approval-modal">
            <div class="establishment-title">项目立项审批表</div>
            <i class="common-close el-icon-close" @click="close"></i>
            <div class="common-content flex-y">
                <el-row>
                    <el-col :span="3">
                        <div class="grid-content"><span>项目名称</span></div>
                    </el-col>
                    <el-col :span="8">
                        <el-input placeholder="项目名称" v-model="projectName" :style="{'width':'190px'}"></el-input>
                    </el-col>
                    <el-col :span="3">
                        <div class="grid-content"><span>申请部门</span></div>
                    </el-col>
                    <el-col :span="8">
                        <el-input placeholder="申请部门" v-model="department" :style="{'width':'190px'}"></el-input>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">
                        <div class="grid-content"><span>建设周期</span></div>
                    </el-col>
                    <el-col :span="4">
                        <el-date-picker size="medium" placeholder="开始时间" v-model="constructionStartTime"
                            value-format="yyyy-MM" type="month" :style="{'width':'120px'}">
                        </el-date-picker>
                    </el-col>
                    <el-col :span="4">
                        <el-date-picker size="medium" placeholder="结束时间" v-model="constructionEndTime"
                            value-format="yyyy-MM" type="month" :style="{'width':'120px'}">
                        </el-date-picker>
                    </el-col>
                    <el-col :span="3">
                        <div class="grid-content"><span>申请时间</span></div>
                    </el-col>
                    <el-col :span="8">
                        <el-date-picker size="medium" placeholder="建设时间" v-model="applyTime" value-format="yyyy-MM-dd"
                            type="date" :style="{'width':'190px'}" :disabled="ATflag">
                        </el-date-picker>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">
                        <div class="grid-content"><span>项目建设初审金额</span></div>
                    </el-col>
                    <el-col :span="6">
                        <el-input placeholder="项目概算资金" v-model="fund"></el-input>
                    </el-col>
                    <el-col :span="2">
                        <div class="grid-content"><span>（万元）</span></div>
                    </el-col>
                    <el-col :span="3">
                        <div class="grid-content"><span>项目场地</span></div>
                    </el-col>
                    <el-col :span="6">
                        <el-input placeholder="项目场地" v-model="field"></el-input>
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
                            placeholder="审计处立项（变更）依据及项目建设目标及必要性初审意见" v-model="necessity">
                        </el-input>
                    </el-col>
                </el-row>
                <el-row class="interval">
                    <el-col :span="4">
                        <div class="grid-content"><span>项目申请部门负责人</span></div>
                    </el-col>
                    <el-col :span="8">
                        <el-input placeholder="项目申请部门负责人" v-model="applyLeader" :style="{'width':'160px'}"></el-input>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content"><span>项目建设部门负责人</span></div>
                    </el-col>
                    <el-col :span="5">
                        <el-input placeholder="项目建设部门负责人" v-model="departmentLeader" :style="{'width':'180px'}">
                        </el-input>
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
                        <el-input placeholder="项目建设内容1" v-model="content1"></el-input>
                    </el-col>
                    <el-col :span="5">
                        <el-input placeholder="估算1" v-model="estimate1"></el-input>
                    </el-col>
                </el-row>
                <el-row class="interval">
                    <el-col :span="19">
                        <el-input placeholder="项目建设内容2" v-model="content2"></el-input>
                    </el-col>
                    <el-col :span="5">
                        <el-input placeholder="估算2" v-model="estimate2"></el-input>
                    </el-col>
                </el-row>
                <el-row class="interval">
                    <el-col :span="19">
                        <el-input placeholder="项目建设内容3" v-model="content3"></el-input>
                    </el-col>
                    <el-col :span="5">
                        <el-input placeholder="估算3" v-model="estimate3"></el-input>
                    </el-col>
                </el-row>
                <el-row class="interval">
                    <el-col :span="19">
                        <el-input placeholder="项目建设内容4" v-model="content4"></el-input>
                    </el-col>
                    <el-col :span="5">
                        <el-input placeholder="估算4" v-model="estimate4"></el-input>
                    </el-col>
                </el-row>
                <el-row class="interval">
                    <el-col :span="19">
                        <el-input placeholder="项目建设内容5" v-model="content5"></el-input>
                    </el-col>
                    <el-col :span="5">
                        <el-input placeholder="估算5" v-model="estimate5"></el-input>
                    </el-col>
                </el-row>
                <el-row class="interval">
                    <el-col :span="19">
                        <el-input placeholder="项目建设内容6" v-model="content6"></el-input>
                    </el-col>
                    <el-col :span="5">
                        <el-input placeholder="估算6" v-model="estimate6"></el-input>
                    </el-col>
                </el-row>

                <el-row class="interval">
                    <el-col :span="4">
                        <div class="grid-content"><span>总 计</span></div>
                    </el-col>
                    <el-col :span="15">
                        <div class="grid-content bg-purple-dark">
                            <el-button type="primary" icon="el-icon-tickets" @click="getTotal()" class="submit-button"
                                :style="{'height':'30px','width':'80px','margin-top':'-10px','margin-left':'-170px'}">计算
                            </el-button>
                        </div>
                    </el-col>
                    <el-col :span="5">
                        <el-input placeholder="总      计" v-model="total"></el-input>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">
                        <div class="grid-content"><span>审核意见规划发展处</span></div>
                    </el-col>
                    <el-col :span="8">
                        <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="审核意见规划发展处"
                            v-model="departmentAdvise" :style="{'width':'230px'}">
                        </el-input>

                    </el-col>
                    <el-col :span="3">
                        <div class="grid-content"><span>学校意见</span></div>
                    </el-col>
                    <el-col :span="10">
                        <!-- <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="学校意见"
                            v-model="schoolAdvise">
                        </el-input> -->
                                           <el-autocomplete v-model="schoolAdvise" :fetch-suggestions="querySearch" placeholder="请输入内容"
                            :autosize="{ minRows: 4, maxRows: 4}" class="autocomplete" ref="inputRef"></el-autocomplete>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content bg-purple-dark">
                            <el-button type="primary" icon="el-icon-edit" @click="submit()"
                                :style="{'width':'150px','font-size':'18px','height':'50px'}" class="submit-button">提交
                            </el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        floatFormat
    } from '../service/common';
    import {
        submitApproval,
        queryApproval,
        updateApproval,
        updateProject,
        queryEstimate
    } from '../service/http';
    import BigNumber from "bignumber.js"

    export default {
        name: 'add-approval',
        props: ['id', 'addOrUpdate', "projectId", "estimateId","name","isadmin"],
        data() {
            return {
                projectName: '',
                department: '',
                applyTime: '',
                constructionStartTime: '',
                constructionEndTime: '',
                field: '',
                fund: '',
                fundSource: 1,
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
                total: 0,
                departmentLeader: '',
                departmentAdvise: '',
                schoolAdvise: '',
                restaurants: [],
ATflag:true
            }
        },
        methods: {
            close() {
                this.$emit('close');
            },
            async submit() {
                if (this.fundSource == null || this.fundSource == "") {
                    this.$alert('请勾选资金来源', '必填校验', {
                        confirmButtonText: '确定',
                        callback: action => {
                            return
                        }
                    });
                }
                if (this.fund == null || this.fund == "")
                    this.fund = 0.0
                else {
                    if (!floatFormat(this.fund)) {
                        this.$alert('请确认您输入的项目建设资金为正确的数字', '数字验证', {
                            confirmButtonText: '确定',
                            callback: action => {
                                return
                            }
                        });
                    }
                }

                if (this.field == null || this.field == '')
                    this.field = 0.0
                else {
                    if (!floatFormat(this.field)) {
                        this.$alert('请确认您输入的项目场地为正确的数字', '数字验证', {
                            confirmButtonText: '确定',
                            callback: action => {
                                return
                            }
                        });
                    }
                }
                var _total = new BigNumber(0.0)
                var number = [this.estimate1, this.estimate2, this.estimate3, this.estimate4, this.estimate5, this
                    .estimate6
                ]
                var flag = 1;
                _.map(number, (v) => {
                    if (v != "" && v != null)
                        flag = flag = floatFormat(v) && flag
                });
                if (!flag) {
                    this.$alert('请确认您输入的估算为正确的数字', '数字验证', {
                        confirmButtonText: '确定',
                        callback: action => {
                            return
                        }
                    });
                    return
                }
                _.map(number, (v) => {
                    if (v != "" && v != null)
                        _total = _total.plus(new BigNumber(v))
                });
                if (!_total.isEqualTo(this.total)) {
                    this.$alert('请确认总计和所有估算之和是否相等！', '总计验证', {
                        confirmButtonText: '确定',
                        callback: action => {
                            return
                        }
                    });
                    return
                }
                if (this.addOrUpdate == 1) {
                    var res = await submitApproval(
                        this.projectName,
                        this.department,
                        this.applyTime,
                        this.constructionStartTime,
                        this.constructionEndTime,
                        this.field,
                        this.fund,
                        this.fundSource,
                        this.necessity,
                        this.applyLeader,
                        this.content1,
                        this.content2,
                        this.content3,
                        this.content4,
                        this.content5,
                        this.content6,
                        this.estimate1,
                        this.estimate2,
                        this.estimate3,
                        this.estimate4,
                        this.estimate5,
                        this.estimate6,
                        this.total,
                        this.departmentLeader,
                        this.departmentAdvise,
                        this.schoolAdvise,
                    )
                } else if (this.addOrUpdate == 2) {
                    var res = await updateApproval(
                        this.id,
                        this.projectName,
                        this.department,
                        this.applyTime,
                        this.constructionStartTime,
                        this.constructionEndTime,
                        this.field,
                        this.fund,
                        this.fundSource,
                        this.necessity,
                        this.applyLeader,
                        this.content1,
                        this.content2,
                        this.content3,
                        this.content4,
                        this.content5,
                        this.content6,
                        this.estimate1,
                        this.estimate2,
                        this.estimate3,
                        this.estimate4,
                        this.estimate5,
                        this.estimate6,
                        this.total,
                        this.departmentLeader,
                        this.departmentAdvise,
                        this.schoolAdvise,
                    )
                }
                if (res.status == 1) {
                    var res2
                    this.$message.success(res.msg);
                    if (this.projectId != null && this.projectId != '') {
                        res2 = await updateProject(
                            this.projectId,
                            null,
                            0,
                            0,
                            res.id
                        )
                        if (res2.status != 1)
                            this.$message.error('反更新项目对应表失败');
                    }
                    this.close()
                } else
                    this.$message.error(res.msg);

            },
            getTotal() {
                var _total = new BigNumber(0.0)
                var number = [this.estimate1, this.estimate2, this.estimate3, this.estimate4, this.estimate5, this
                    .estimate6
                ]
                var flag = 1;
                _.map(number, (v) => {
                    if (v != "" && v != null)
                        flag = flag = floatFormat(v) && flag
                });
                if (!flag) {
                    this.$alert('请确认您输入的估算为正确的数字', '数字验证', {
                        confirmButtonText: '确定',
                        callback: action => {
                            return
                        }
                    });
                    return
                }
                _.map(number, (v) => {
                    if (v != "" && v != null)
                        _total = _total.plus(new BigNumber(v))
                });
                this.total = _total
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
        },
        created: async function () {
            if(this.isadmin==1)
                this.ATflag = false
            if (this.estimateId != null && this.estimateId != 0 && typeof this.estimateId != 'undefined') {
                try {
                    var res = await queryEstimate(
                        this.estimateId
                    )
                    this.projectName = res.data.projectName
                    this.department = res.data.department
                    this.applyTime = res.data.applyTime
                    this.constructionStartTime = res.data.constructionStartTime
                    this.constructionEndTime = res.data.constructionEndTime
                    this.field = res.data.field
                    this.fund = res.data.fund
                    this.fundSource = res.data.fundSource
                    this.content1 = res.data.content1
                    this.content2 = res.data.content2
                    this.content3 = res.data.content3
                    this.content4 = res.data.content4
                    this.content5 = res.data.content5
                    this.content6 = res.data.content6
                    this.content7 = res.data.content7
                    this.content8 = res.data.content8
                    this.estimate1 = res.data.estimate1
                    this.estimate2 = res.data.estimate2
                    this.estimate3 = res.data.estimate3
                    this.estimate4 = res.data.estimate4
                    this.estimate5 = res.data.estimate5
                    this.estimate6 = res.data.estimate6
                    this.estimate7 = res.data.estimate7
                    this.estimate8 = res.data.estimate8
                    this.total = res.data.total
                    this.departmentLeader = res.data.departmentLeader
                } catch (e) {
                    console.log(e)
                    this.$message.error('出错啦');
                }
                this.loading = false;
            }
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
                this.loading = false;
            }
        },
        mounted: function () {
            var ntime = new Date(); // 获取当前时间
            var day = ntime.getDate();
            var month = ntime.getMonth() + 1;
            if (month < 10) // 月份格式  + 1
                month = "0" + month;
            if (ntime.getDate() < 10)
                day = "0" + ntime.getDate(); // 月份小于10 前面 + 0
            var datew = ntime.getFullYear() + "-" + month + "-" + day; // 格式化日期
            var datew = datew.toString();
            this.applyTime = datew
        },
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

    .add-approval-modal {
        position: relative;
        width: 800px;
        min-height: 900px;
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
        font-weight: bold
    }

</style>
