<template>
    <div class="timeline-modal">
        <div class="timeline-title">项目时间轴</div>
        <div class="block">
            <el-timeline>
                <el-timeline-item v-for="(activity, index) in timedata" :key="index" :icon="activity.icon"
                    :type="activity.type" :color="activity.color" :size="activity.size" :timestamp="activity.timestamp"
                    reverse="false"  :class= "activity.important == 1? 'important' :''  " >
                    <div class= "activity-content">
                    {{activity.content}}
                     </div>
                </el-timeline-item>
 
            </el-timeline>
        </div>
    </div>

</template>

<script>
    import {
        getProjectMessage
    } from '../service/http';


    export default {
        name: 'timeline',
        props: ["projectId"],
        data() {
            return {
                timedata: []
            }
        },
        methods: {
            normalizeData(tabledata) {
                var _status = tabledata.type
                var _content = ""
                var _type = ""
                var _icon = ""
                var _color = ""
                var _important = 0
                if (_status == 1) {
                    _content = "申请人提交项目申请"
                    _type = "primary"
                    _icon = "el-icon-tickets"
                    _color = "#135bc7"
                    _important = 1
                } else if (_status == 10) {
                    _content = "规划处退回项目申请"
                    _type = "danger"
                    _icon = "el-icon-circle-close"
                    _color = "#c5152c"
                     _important = 0
                } else if (_status == 2) {
                    _content = "规划处通过申请，项目进入概算阶段"
                    _type = "success"
                    _icon = "el-icon-check"
                    _color = "#08c293"
                     _important = 1
                } else if (_status == 20) {
                    _content = "概算被退回，项目重新进入概算阶段"
                    _type = "danger"
                    _icon = "el-icon-circle-close"
                    _color = "#ad1650"
                     _important = 0
                } else if (_status == 3) {
                    _content = "概算结束，规划处正在审核"
                    _type = "warning"
                    _icon = "el-icon-refresh"
                    _color = "#0f4a72"
                     _important = 1
                } else if (_status == 4) {
                    _content = "规划处通过概算，项目正在进行审计"
                    _type = "success"
                    _icon = "el-icon-check"
                    _color = "#409b16"
                     _important = 1
                } else if (_status == 5) {
                    _content = "审计完成，规划处正在审核"
                    _type = "warning"
                    _icon = "el-icon-refresh"
                    _color = "#b2be40"
                     _important = 1
                }else if (_status == 51) {
                    _content = "规划处审核结束，校长室填写意见中"
                    _type = "warning"
                    _icon = "el-icon-refresh"
                    _color = "#27270a"
                     _important = 1
                } 
                else if (_status == 6) {
                    _content = "立项完成"
                    _type = "success"
                    _icon = "el-icon-star-on"
                    _color = "#40be83"
                     _important = 1
                }
                var _tabledata = {
                    timestamp: tabledata.createTime,
                    content: _content,
                    type: _type,
                    icon: _icon,
                    size: 'large',
                    color: _color,
                    important:_important
                };
                return _tabledata
            }
        },
        mounted: async function () {
            try {
                var res = await getProjectMessage(
                    this.projectId
                )
            } catch (e) {
                console.log(e)
                this.$message.error('出错啦');
            }
            var _tabledatas = _.map(res.data, table => this.normalizeData(table));
            console.log(this.projectId)
            this.timedata = _tabledatas
        },
    };

</script>
<style>
    .timeline {
        z-index: 5;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }

    .common-content {
        margin-top: 40px;
    }

    .timeline-modal {
        /* position: relative; */
        margin-left: 20px;
    }

    .download-btn {
        position: absolute;
        bottom: 10px;
        right: 20px;
    }

    .timeline-title {
        width: 100%;
        height: 100%;
        align-content: center;
        /* position: absolute; */
        top: 17px;
        left: 17px;
        font-size: 20px;
        /* transform: translate3d(65%, 0%, 0); */
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

    .submit-button {
        width: 20%;
        height: 100%;
        align-content: center;
        position: absolute;
        top: 17px;
        left: 300px;
        font-weight: bold
    }

    .block {
        margin-top: 20px;
        margin-left: 10px;
    }
.el-timeline-item__content{
    /* margin-top:30px */
}
.important{
    background-color:#adcfcf
}
.activity-content{
    position: relative;
    top:5px;
}
</style>
