<template>
    <iDialog append-to-body :title="$t('查看进度')" :visible.sync="value" width="40%" @close="clearDiolog">

        <el-timeline >
            <el-timeline-item v-for="(activity, index) in activities" :key="index" :icon="activity.icon"
                :type="activity.type " :color="activity.color || '#409EFF'" :size="activity.size || 'large'"
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
import { getDictByCode } from '@/api/dictionary'

import {
    getSupplierPerforManceProcess
} from '@/api/supplierManagement/supplierIndexManage/index'
export default {
    components: {
        iDialog
    },
    props: {
        value: { type: Boolean, default: false },
    },
    data() {
        return {
            activities: []
        }
    },
    created() {
        this.init()
    },
    methods: {
        init(){
            getDictByCode('SUPPLIER_PERFORMANCE_TASK_EXECUTE_STATUS')
            .then((res) => {
                if (res.data) {
                this.statusList = res?.data[0]?.subDictResultVo
                getSupplierPerforManceProcess({editionId:this.$route.query.editionId}).then(res=>{
                if(res.data){
                    res.data.forEach(val=>{
                        this.activities.push({
                            content:`<div>${val.deptCode} &nbsp;&nbsp;&nbsp;&nbsp; <span style="color: #000000">${val.executeStatus?this.statusList.find(item=>item.code==val.executeStatus).name:''}</span></div>`,
                            timestamp:val.updateDate,
                            color: val.executeStatus==1?'#0bbd87':"#666"
                        })
                    })
                }
            })
                }
            })
            .catch(() => { })
         
        
        },
        clearDiolog() {
            this.$emit('closeDiolog')
        },
        handleClick(val){
            console.log(val)
        }
    },

}
</script>
