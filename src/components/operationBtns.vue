<template>
    <div class="operationBtns" :style="{'margin-left':'-15px'}">
        <div v-if="row.status == 1">
            <span class="project-approval finished-ml-15">申请待审批</span>
        </div>
        <div v-if="row.status == 10">
            <span class="project-failed-text finished-ml-15">审批未通过</span>
        </div>
        <div v-if="row.status == 2">
            <span class="project-estimate finished-ml-15">概算中</span>
        </div>
        <div v-if="row.status == 20">
            <span class="project-failed-text finished-ml-15">概算未通过</span>
        </div>
        <div v-if="row.status == 3">
            <span class="project-estimated finished-ml-15">已概算</span>
        </div>
        <div v-if="row.status == 4">
            <span class="project-audit finished-ml-15">审计中</span>
        </div>
        <div v-if="row.status == 5">
            <span class="project-audited finished-ml-15">审计已完成</span>
        </div>
        <div v-if="row.status == 51">
            <span class="project-principal finished-ml-15">校长填写意见中</span>
        </div>
        <div v-if="row.status == 6">
            <span class="project-finished finished-ml-15">立项完成</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'operation-btns',
        components: {},
        data() {
            return {};
        },
        props: {
            row: Object
        },
        methods: {},

    };
</script>

<style>
    .ddm-file {
        display: none;
        z-index: -100;
    }

    .project-finished {
        color: #46a442;
    }

    .project-failed-text {
        color: #ea6219;
    }

    .project-approval {
        color: #7e7100;
    }

    .project-estimate {
        color: #135bc7;
    }

    .project-estimated {
        color: #530885;
    }

    .project-audit {
        color: #ce5a8a;
    }

    .project-audited {
        color: #5c5c51;
    }
        .project-principal {
        color: #27270a;
    }
    .test {
        color: #adcfcf;
    }

    .unqualified {
        color: #EA6219;
        background: url(../images/unqualified.svg) left center no-repeat;
        display: inline-block;
        width: 75px;
        cursor: pointer;
        padding-left: 15px;
    }

    .finished-ml-15 {
        margin-left: 15px;
    }

    .operationBtns .button-openWeb {
        padding: 2px 2px !important;
        height: 18px;
        width: 50px;
        font-size: 12px;
    }
</style>