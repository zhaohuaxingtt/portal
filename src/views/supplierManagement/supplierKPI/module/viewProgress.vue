<template>
    <iDialog append-to-body :title="$t('查看进度')" :visible.sync="value" width="60%" @close="clearDiolog">

        <el-timeline >
            <el-timeline-item v-for="(activity, index) in activities" :key="index" :icon="activity.icon"
                :type="activity.type || 'primary'" :color="activity.color || '#409EFF'" :size="activity.size || 'large'"
                :timestamp="activity.timestamp" @click.native="handleClick(activity)">
                <!--  对象  -->
                <div v-if="typeof activity.content === 'object'">
                    <div v-for="(value, i) in activity.content" :key="i" v-html="value"></div>
                </div>
                <!--  html字符串  -->
                <div v-else>
                    <div v-html="activity.content"></div>
                </div>
            </el-timeline-item>
        </el-timeline>
    </iDialog>
</template>

<script>
import {
    iDialog
} from 'rise'

export default {
    components: {
        iDialog
    },
    props: {
        value: { type: Boolean, default: false },
    },
    data() {
        return {
            activities: [{
                content: {
                    user: 'admin',
                    descInfo: '支持使用图标',
                    state: '草稿',
                },
                timestamp: '2018-04-12 20:46',
            }, {
                content: '<div>admin &nbsp;&nbsp;&nbsp;&nbsp; <span style="color: #000000">申请发布</span></div><div>拒绝发布</div>',
                timestamp: '2018-04-03 20:46'
            }, {
                content: '<div>admin &nbsp;&nbsp;&nbsp;&nbsp; <span style="color: #000000">审核未通过</span></div><div>拒绝发布</div>',
                timestamp: '2018-04-03 20:46'
            }]
        }
    },
    created() {

    },
    methods: {
        clearDiolog() {
            this.value = false
        },
        handleClick(val){
            console.log(val)
        }
    },

}
</script>
