<template>
    <div class="download flex-y flex-center">
        <div class="establishment-modal">
            <div class="establishment-title">项目立项申请表</div>
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
                            <el-input placeholder="" v-model="projectName" :style="{'width':'190px'}" :disabled="true">
                            </el-input>
                        </el-col>
                        <el-col :span="3">
                            <div class="grid-content"><span>申请部门</span></div>
                        </el-col>
                        <el-col :span="8">
                            <el-input placeholder="" v-model="department" :style="{'width':'190px'}" :disabled="true">
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3">
                            <div class="grid-content"><span>建设时间</span></div>
                        </el-col>
                        <el-col :span="8">
                            <el-input placeholder="" v-model="constructionTime" :style="{'width':'190px'}"
                                :disabled="true">
                            </el-input>
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
                            <div class="grid-content"><span>项目建设资金</span></div>
                        </el-col>
                        <el-col :span="6">
                            <el-input placeholder="" v-model="fund" :disabled="true"></el-input>
                        </el-col>
                        <el-col :span="2">
                            <div class="grid-content"><span>（万元）</span></div>
                        </el-col>
                        <el-col :span="3">
                            <div class="grid-content"><span>项目场地</span></div>
                        </el-col>
                        <el-col :span="6">
                            <el-input placeholder="" v-model="field" :disabled="true"></el-input>
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
                            <el-radio-group v-model="fundSource" class="grid-content" :disabled="true">
                                <el-radio :label="1">财政专项</el-radio>
                                <el-radio :label="2">学校预算</el-radio>
                                <el-radio :label="3">部门预算</el-radio>
                                <el-radio :label="4">其他渠道</el-radio>
                            </el-radio-group>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3">
                            <div class="grid-content"><span>项目建设必要性</span></div>
                        </el-col>
                        <el-col :span="21">
                            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder=""
                                v-model="necessity" :disabled="true">
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <div class="grid-content"
                                :style="{'width':'100%','height':'100%' ,'transform': 'translate3d(40%, 0%, 0)'}">
                                <span>项目建设目标</span></div>
                        </el-col>
                    </el-row>
                    <el-row class="interval" :style="{'margin-top':'-10px'}">
                        <el-col :span="24">
                            <el-input placeholder="" v-model="goal1" :disabled="true"></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="interval">
                        <el-col :span="24">
                            <el-input placeholder="" v-model="goal2" :disabled="true"></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="interval">
                        <el-col :span="24">
                            <el-input placeholder="" v-model="goal3" :disabled="true"></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="interval">
                        <el-col :span="24">
                            <el-input placeholder="" v-model="goal4" :disabled="true"></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="interval">
                        <el-col :span="24">
                            <el-input placeholder="" v-model="goal5" :disabled="true"></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="interval">
                        <el-col :span="24">
                            <el-input placeholder="" v-model="goal6" :disabled="true"></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="interval">
                        <el-col :span="4">
                            <div class="grid-content"><span>申请部门负责人</span></div>
                        </el-col>
                        <el-col :span="5">
                            <el-input placeholder="" v-model="departmentLeader" :style="{'width':'130px'}"
                                :disabled="true">
                            </el-input>
                        </el-col>
                        <el-col :span="5">
                            <div class="grid-content"><span> 申请部门联系人及电话</span></div>
                        </el-col>
                        <el-col :span="4">
                            <el-input placeholder="" v-model="contact" :disabled="true"></el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-input placeholder="" v-model="phone" :disabled="true"></el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3">
                            <div class="grid-content"><span>项目建设部门估算及意见</span></div>
                        </el-col>
                        <el-col :span="8">
                            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder=""
                                v-model="constructionAdvise" :style="{'width':'230px'}" :disabled="true">
                            </el-input>
                        </el-col>
                        <el-col :span="3">
                            <div class="grid-content"><span>规划发展处意见</span></div>
                        </el-col>
                        <el-col :span="10">
                            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder=""
                                v-model="developmentAdvise" :disabled="true">
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple-dark">
                                <el-button type="primary" icon="el-icon-edit" @click="openAddEstablishment()"
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
                    <add-establishment @close="closeAddEstablishment" v-if="AddEstablishment" :id="id" :addOrUpdate="2">
                    </add-establishment>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        queryEstablishment,
        establishmentGenerateDoc,
        queryReason
    } from '../service/http';
    import AddEstablishment from '../components/AddEstablishment.vue';
    import Timeline from '../components/Timeline.vue';

    export default {
        name: 'check-establishment',
        props: ['id', 'isupdate', 'source', 'projectId'],
        components: {
            AddEstablishment,
            Timeline
        },
        data() {
            return {
                projectName: '',
                department: '',
                applyTime: '',
                constructionTime: '',
                field: '',
                fund: '',
                fundSource: '',
                necessity: '',
                goal1: '',
                goal2: '',
                goal3: '',
                goal4: '',
                goal5: '',
                goal6: '',
                departmentLeader: '',
                contact: '',
                phone: '',
                constructionAdvise: '',
                developmentAdvise: '',
                AddEstablishment: false,
                reason: '',
            }
        },
        methods: {
            close() {
                this.$emit('close');
            },
            openAddEstablishment: function () {
                this.AddEstablishment = true;
            },
            closeAddEstablishment: async function () {
                this.AddEstablishment = false;
                try {
                    var res = await queryEstablishment(
                        this.id
                    );
                    this.projectName = res.data.projectName
                    this.department = res.data.department
                    this.applyTime = res.data.applyTime
                    this.constructionTime = res.data.constructionTime
                    this.field = res.data.field
                    this.fund = res.data.fund
                    this.fundSource = res.data.fundSource
                    this.necessity = res.data.necessity
                    this.goal1 = res.data.goal1
                    this.goal2 = res.data.goal2
                    this.goal3 = res.data.goal3
                    this.goal4 = res.data.goal4
                    this.goal5 = res.data.goal5
                    this.goal6 = res.data.goal6
                    this.departmentLeader = res.data.departmentLeader
                    this.contact = res.data.contact
                    this.phone = res.data.phone
                    this.constructionAdvise = res.data.constructionAdvise
                    this.developmentAdvise = res.data.developmentAdvise
                } catch (e) {
                    console.log(e)
                    this.$message.error('出错啦');
                }
            },
            generateDoc: async function () {
                this.AddApproval = false;
                if (this.id != null && this.id != 0 && typeof this.id != 'undefined') {
                    try {
                        var res = await establishmentGenerateDoc(
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
            try {
                var res = await queryEstablishment(
                    this.id
                );
                this.projectName = res.data.projectName
                this.department = res.data.department
                this.applyTime = res.data.applyTime
                this.constructionTime = res.data.constructionTime
                this.field = res.data.field
                this.fund = res.data.fund
                this.fundSource = res.data.fundSource
                this.necessity = res.data.necessity
                this.goal1 = res.data.goal1
                this.goal2 = res.data.goal2
                this.goal3 = res.data.goal3
                this.goal4 = res.data.goal4
                this.goal5 = res.data.goal5
                this.goal6 = res.data.goal6
                this.departmentLeader = res.data.departmentLeader
                this.contact = res.data.contact
                this.phone = res.data.phone
                this.constructionAdvise = res.data.constructionAdvise
                this.developmentAdvise = res.data.developmentAdvise
            } catch (e) {
                console.log(e)
                this.$message.error('出错啦');
            }
            const h = this.$createElement;
            if (this.isupdate == true && this.source == 'Apply') {
                this.$notify({
                    title: '只能查看',
                    message: h('i', {
                        style: 'color: teal'
                    }, '由于您是项目申请者，所以这个表格只有在规划处将您的申请退回后，您才能做更新修改'),
                    duration: 5000,
                    type: 'warning',
                       position: 'bottom-right'
                });
            } else if (this.isupdate == false && this.source == 'Apply') {
                try {
                    var res = await queryReason(
                        this.projectId
                    );
                } catch (e) {
                    console.log(e)
                    this.$message.error('出错啦');
                }
                this.$notify({
                    title: '可以修改',
                    message: h('i', {
                        style: 'color: teal'
                    }, '因为规划处将申请退回，所以您现在可以更新修改表中的内容用以重新发送申请！'),
                    duration: 5000,
                    type: 'success',
                        position: 'bottom-right'
                });
                this.$notify({
                    title: '来自规划处的回信',
                    message: h('i', {
                        style: 'color: teal'
                    }, res.data.details),
                    duration: 5000,
                    type: 'success'
                });
            }
        },
        mounted() {}
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