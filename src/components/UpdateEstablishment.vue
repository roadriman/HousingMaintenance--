<template>
    <div class="download flex-y flex-center">
        <div class="establishment-modal">
            <div class="establishment-title">项目立项申请表</div>

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
                        <div class="grid-content"><span>申请时间</span></div>
                    </el-col>
                    <el-col :span="8">
                        <el-date-picker size="medium" placeholder="建设时间" v-model="applyTime" value-format="yyyy-MM-dd"
                            type="date" :style="{'width':'190px'}">
                        </el-date-picker>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">
                        <div class="grid-content"><span>建设时间</span></div>
                    </el-col>
                    <el-col :span="8">
                        <el-date-picker size="medium" placeholder="建设时间" v-model="constructionTime" value-format="yyyy-MM"
                            type="month" :style="{'width':'190px'}">
                        </el-date-picker>
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
                        <div class="grid-content"><span>项目建设资金</span></div>
                    </el-col>
                    <el-col :span="6">
                        <el-input placeholder="项目建设资金" v-model="fund"></el-input>
                    </el-col>
                    <el-col :span="2">
                        <div class="grid-content"><span>（万元）</span></div>
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
                <el-row>
                    <el-col :span="3">
                        <div class="grid-content"><span>项目建设必要性</span></div>
                    </el-col>
                    <el-col :span="21">
                        <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="项目建设必要性" v-model="necessity">
                        </el-input>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content" :style="{'width':'100%','height':'100%' ,'transform': 'translate3d(40%, 0%, 0)'}"><span>项目建设目标</span></div>
                    </el-col>
                </el-row>
                <el-row class="interval" :style="{'margin-top':'-10px'}">
                    <el-col :span="24">
                        <el-input placeholder="项目建设目标1" v-model="goal1"></el-input>
                    </el-col>
                </el-row>
                <el-row class="interval">
                    <el-col :span="24">
                        <el-input placeholder="项目建设目标2" v-model="goal2"></el-input>
                    </el-col>
                </el-row>
                <el-row class="interval">
                    <el-col :span="24">
                        <el-input placeholder="项目建设目标3" v-model="goal3"></el-input>
                    </el-col>
                </el-row>
                <el-row class="interval">
                    <el-col :span="24">
                        <el-input placeholder="项目建设目标4" v-model="goal4"></el-input>
                    </el-col>
                </el-row>
                <el-row class="interval">
                    <el-col :span="24">
                        <el-input placeholder="项目建设目标5" v-model="goal5"></el-input>
                    </el-col>
                </el-row>
                <el-row class="interval">
                    <el-col :span="24">
                        <el-input placeholder="项目建设目标6" v-model="goal6"></el-input>
                    </el-col>
                </el-row>
                <el-row class="interval">
                    <el-col :span="4">
                        <div class="grid-content"><span>申请部门负责人</span></div>
                    </el-col>
                    <el-col :span="5">
                        <el-input placeholder="申请部门负责人" v-model="departmentLeader" :style="{'width':'130px'}"></el-input>
                    </el-col>
                    <el-col :span="5">
                        <div class="grid-content"><span> 申请部门联系人及电话</span></div>
                    </el-col>
                    <el-col :span="4">
                        <el-input placeholder="申请部门联系人" v-model="contact"></el-input>
                    </el-col>
                    <el-col :span="6">
                        <el-input placeholder="电话" v-model="phone"></el-input>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">
                        <div class="grid-content"><span>项目建设部门估算及意见</span></div>
                    </el-col>
                    <el-col :span="8">
                        <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="项目建设部门估算及意见"
                            v-model="constructionAdvise" :style="{'width':'230px'}">
                        </el-input>
                    </el-col>
                    <el-col :span="3">
                        <div class="grid-content"><span>规划发展处意见</span></div>
                    </el-col>
                    <el-col :span="10">
                        <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="规划发展处意见" v-model="developmentAdvise">
                        </el-input>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content bg-purple-dark">
                            <el-button type="primary" icon="el-icon-edit" @click="openAddEstablishment()" class="submit-button">提交</el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    import queryEstablishment from '../service/http';
    export default {
        name: 'check-establishment',

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
                developmentAdvise: ''
            }
        },
        methods: {
            close() {
                this.$emit('close');
            },
            submit() {
                downloadSTLs.call(this, this.$refs.stlTable.selection, 0);
            },

        },
        mounted: function (id) {
            try {
                var res = await queryEstablishment(
                    id
                );
                if (res.status = 1) {
                    this.$message.success(res.msg);
                } else
                    this.$message.error(res.msg);
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
            this.loading = false;
        }
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
        font-size: 18px;
        font-weight: bold
    }

</style>
