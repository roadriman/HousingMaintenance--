<template>
    <div class="notice-modal">
        <div class="block">
            <el-popover placement="right" width="400" trigger="click">
                <el-table :data="gridData">
                    <el-table-column width="150" property="content" label="信息"></el-table-column>
                    <el-table-column width="100" property="name" label="姓名"></el-table-column>
                </el-table>
                <el-badge value="hot" class="item">
                    <!-- <i class="el-icon-bell"></i> -->
                      <el-button slot="reference">click 激活</el-button>
                </el-badge>
            </el-popover>
        </div>
    </div>
</template>

<script>
    import {
        queryProjectCountByStatus
    } from '../service/http';


    export default {
        name: 'notice',
        props: [""],
        data() {
            return {
                gridData: []
            }
        },
        methods: {
            normalizeData(count, status) {
                var _content
                if (status == 1) {
                    _content = "您还有 " + count + " 个项目待审批"
                }
                var _tabledata = {
                    content: _content,
                };
                return _tabledata
            },
            mounted: async function () {
                try {
                    var res = await queryProjectCountByStatus(
                        1
                    )
                } catch (e) {
                    console.log(e)
                    this.$message.error('出错啦');
                }
                var _tabledatas = _.map(res.data, table => this.normalizeData(table, 2));
                console.log(this.projectId)
                this.gridData = _tabledatas
            }
        }
    }

</script>
<style>
    .common-content {
        margin-top: 40px;
    }

    .notice-modal {
        margin-left: 20px;
    }

    .download-btn {
        position: absolute;
        bottom: 10px;
        right: 20px;
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

</style>
