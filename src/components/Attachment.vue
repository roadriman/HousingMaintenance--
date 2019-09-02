<template>
    <div class="download flex-y flex-center">
        <div class="attachment-modal">
            <div class="establishment-title">附件列表</div>
            <i class="common-close el-icon-close" @click="close"></i>
            <div class="common-content flex-y">
                <el-table :data="tableData" v-loading="loading" class="attachment-table" style="width: 100%;"
                    height="100%" header-cell-class-name="is-center" cell-class-name="is-center">
                    <el-table-column label="文件名称">
                        <template slot-scope="scope">
                            <span>{{scope.row.key}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="left">
                        <template slot-scope="scope">
                            <div>
                                <el-button type="success" icon="el-icon-download"
                                    @click="downloadAttachment(scope.row.url)">下载</el-button>
                                <el-button type="danger" class="attachment-button" icon="el-icon-delete"
                                    @click="deleteAttachment(scope.row.id)" :style="{'margin-left':'20px'}">删除</el-button>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="上传时间">
                        <template slot-scope="scope">
                            <span>{{scope.row.createTime}}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="bottom-button">
                <el-button type="info" icon="el-icon-upload2" @click="upload()">上传</el-button>
                <input id="file" name="file" type="file" @change="uploadChange">
            </div>
        </div>
    </div>
</template>

<script>
    import {
        uploadAttachment,
        deleteAttachment,
        getAttachmentList
    } from '../service/http';
    export default {
        name: 'attachment',
        props: ['projectId'],
        data() {
            return {
                tableData: [],
                loading: true,
            }
        },
        methods: {
            close() {
                this.$emit('close');
            },
            deleteAttachment(id) {
                this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    try {
                        var res = await deleteAttachment(
                            id
                        );
                    } catch (e) {
                        console.log(e)
                        this.$message.error('出错啦');
                    }
                    if (res.status == 1) {
                        this.$message.success(res.msg);
                    } else
                        this.$message.error(res.msg);
                    this.getAttachmentList();
                }).catch(() => {});

            },
            downloadAttachment(url) {
                window.open(url);
            },
            upload() {
                document.getElementById("file").click();
            },
            getAttachmentList: async function () {
                try {
                    var res = await getAttachmentList(
                        this.projectId
                    );
                    this.tableData = res.attachmentList;
                } catch (e) {
                    console.log(e)
                    this.$message.error('出错啦');
                }
                this.loading = false;
            },
            uploadChange: async function (event) {
                this.loading = true;
                if (event.target.files.length > 0) {
                    var files = event.target.files[0];
                    var key = event.target.files[0].name;
                }
                if (files != null) {
                    try {
                        var res = await uploadAttachment(
                            this.projectId,
                            key,
                            4,
                            files
                        );
                    } catch (e) {
                        console.log(e)
                        this.$message.error('出错啦');
                    }
                    if (res.status == 1) {
                        this.$message.success(res.msg);
                        this.close()
                    } else
                        this.$message.error(res.msg);
                    this.getAttachmentList();
                }
                this.loading = false;
            },
        },
        created: async function () {
            this.getAttachmentList();
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

    .attachment-modal {
        position: relative;
        width: 400px;
        min-height: 600px;
        background-color: white;
        border-radius: 4px;
        box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.5);
        padding: 20px 20px;
    }

    .attachment-table {
        min-height: 500px;
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

    #file {
        display: none;
    }

    .bottom-button {
        transform: translate3d(40%, 50%, 0);
    }

    .attachment-button {
        transform: translate3d(-12%, 0%, 0);
    }
</style>