<template>
    <div class="flex-1 flex-y relative">
        <div class="search">
            <el-row>
                <span :style="{'font-size':'14px','margin-left':'60px'}">搜索条件</span>
                <el-input placeholder="请输入关键字" prefix-icon="el-icon-search" v-model="key" :style="{'width':'190px'}"
                    @keyup.enter.native="countProject()">
                </el-input>
                <el-date-picker size="medium" placeholder="选择开始时间" v-model="startTime" value-format="yyyy-MM-dd"
                    type="date" :style="{'width':'190px'}" @keyup.enter.native="countProject()">
                </el-date-picker>

                <el-date-picker size="medium" placeholder="选择结束时间" v-model="endTime" value-format="yyyy-MM-dd"
                    type="date" :style="{'width':'190px'}" @keyup.enter.native="countProject()" style="width: 100%;">
                </el-date-picker>
                <el-radio-group v-model="type">
                    <el-radio-button label="1">申请日期</el-radio-button>
                    <el-radio-button label="2">申请部门</el-radio-button>
                </el-radio-group>
                <el-button type="primary" @click="countProject()" :style="{'width':'70px'}">统计
                </el-button>
                <el-button type="primary" @click="generateExcel()" :style="{'width':'70px'}">生成报表
                </el-button>
            </el-row>
        </div>
        <div id="myChart" class="chart"></div>
        <div id="myChart2" class="chart"></div>
    </div>
</template>


<script>
    import {
        countProject,
        countProjectExcel
    } from '../service/http';
    export default {
        name: 'count-data',
        components: {

        },
        data: function () {
            return {
                loading: true,
                key: '',
                startTime: '',
                endTime: '',
                type: 1,

            };
        },
        methods: {
            countProject: async function () {
                var colors = ['#5793f3', '#d14a61', '#675bba'];
                try {
                    var res = await countProject(
                        this.key,
                        this.status,
                        this.startTime,
                        this.endTime,
                        this.type
                    );
                } catch (e) {
                    console.log(e)
                    this.$message.error('出错啦');
                }
                if (res.status == 1) {

                    this.$message.success(res.msg);
                    var _tabledatas = res.data
                    console.log(_tabledatas)
                    let myChart = this.$echarts.init(document.getElementById("myChart"));
                    let myChart2 = this.$echarts.init(document.getElementById("myChart2"));
                    if (this.type == 1) {
                        myChart.setOption({
                            xAxis: {
                                name: "时间",
                                data: _tabledatas.map(v => v.applyTime)
                            },
                            series: [{
                                name: "申请数量",
                                data: _tabledatas.map(v => v.count),
                                smooth: true
                            }]
                        });
                        myChart2.setOption({
                            xAxis: {
                                name: "时间",
                                data: _tabledatas.map(v => v.applyTime)
                            },
                            series: [{
                                name: "申请数量",
                                data: _tabledatas.map(v => v.count),
                                smooth: true,

                            }]
                        });
                    } else {
                        myChart.setOption({
                            xAxis: {
                                name: "部门",
                                data: _tabledatas.map(v => v.department),
                            },
                            series: [{
                                name: "申请数量",
                                data: _tabledatas.map(v => v.count),
                                smooth: true
                            }]
                        })
                        myChart2.setOption({
                            xAxis: {
                                name: "部门",
                                data: _tabledatas.map(v => v.department)
                            },
                            series: [{
                                name: "申请数量",
                                data: _tabledatas.map(v => v.count),
                                smooth: true,
                            }]
                        })
                    }
                } else
                    this.$message.error(res.msg);
            },
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById("myChart"));
                let myChart2 = this.$echarts.init(document.getElementById("myChart2"));
                // 绘制图表
                myChart.setOption({
                    title: {
                        text: "统计图"
                    },
                    tooltip: {
                        trigger: "axis"
                    },
                    legend: {
                        data: [
                            "申请日期",
                        ]
                    },
                    grid: {
                        left: "3%",
                        right: "4%",
                        bottom: "3%",
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: [{
                        type: "category",
                        boundaryGap: false,
                        data: []
                    }],
                    yAxis: {
                        type: "value"
                    },
                    series: [{
                        name: "申请数量",
                        type: "line",
                        data: []
                    }]
                });
                myChart2.setOption({
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: 'cross'
                        }
                    },
                    legend: {
                        data: [
                            "申请日期",
                        ]
                    },
                    grid: {
                        left: "3%",
                        right: "4%",
                        bottom: "3%",
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: [{
                        type: "category",
                        data: []
                    }],
                    yAxis: {
                        type: "value",

                    },
                    series: [{
                        name: "申请数量",
                        type: "line",
                        data: [],
                        type: 'bar',
                        barWidth: 30
                    }]
                });
            },
            generateExcel: async function () {
                var colors = ['#5793f3', '#d14a61', '#675bba'];
                try {
                    var res = await countProjectExcel(
                        this.key,
                        this.status,
                        this.startTime,
                        this.endTime,
                        this.type
                    );
                } catch (e) {
                    console.log(e)
                    this.$message.error('出错啦');
                }
                if (res.status == 1) {
                    this.$message.success(res.msg);
                    this.downloadAttachment("../download/" + res.data)
                } else
                    this.$message.error(res.msg);
            },
            downloadAttachment(url) {
                window.open(url);
            },
        },
        created: async function () {},
        mounted() {
            this.drawLine();
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

    .chart {
        width: 1200px;
        height: 450px;
    }
</style>