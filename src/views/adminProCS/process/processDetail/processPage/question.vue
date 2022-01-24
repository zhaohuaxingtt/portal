<template>
    <iDialog
        title="常见问题"
        :visible.sync="show" 
        width="600px" 
        @close='close' 
        @open="open"
        append-to-body
        class="process-dialog"
        v-loading="loading"
    >
        <div class="content">
            <div class="flex margin-bottom20">
                <iInput style="width:220px" :placeholder="language('请输入')" v-model="keyword" />
                <iButton style="margin-left:10px" @click="search('rest')">搜索</iButton>
            </div>
            <ITable ref="table" :tableSetting='tableSetting' @selectChange="selectChange" :queryMethod="queryMethod"></ITable>
        </div>
        <div class="flex felx-row mt20 pb20 justify-end ">
            <iButton @click="close">{{ language('取消') }}</iButton>
            <iButton @click="confirm">{{ language('确认') }}</iButton>
        </div>
    </iDialog>
</template>

<script>
import {iDialog,iButton,iInput} from 'rise';
import {QS_SETTING} from './tables';
import ITable from './../../components/ITable.vue';
import {queryProcessFAQList,addPageIssue} from '@/api/adminProCS';
export default {
    components: {
        iDialog,
        iButton,
        iInput,
        ITable
    },
    props:{
        show:{
            type:Boolean,
            default:false
        },
        info:{
            type:Object,
            default:() => {}
        }
    },
    data() {
        return {
            keyword:"",
            tableSetting:QS_SETTING,
            selectList:[],
            processId:this.$route.query.id,
            loading:false,
            queryMethod: this.query
        }
    },
    methods: {
        open(){
            this.search()
            // 选中已有的
            
        },
        search(t){
            this.$refs.table.query(t)
        },
        query(page){
            return new Promise(async (reslove,reject) => {
                let data = {
                    page: page.currPage - 1,
                    size: page.pageSize,
                    keyword: this.keyword
                }
                try {
                    let res = await queryProcessFAQList(this.processId,data)
                    reslove(res)
                } catch(err) {
                    reject(err)
                }
            })
        },
        selectChange(v){
            console.log(v);
            this.selectList = v
        },
        async confirm(){
            try {
                this.loading = true
                let formdata = new FormData()
                this.selectList.forEach(e => {
                    formdata.append('issues',e.id)
                })
                await addPageIssue(this.info.id,formdata)
                this.close()
            } finally {
                this.loading = false
            }
        },
        close(){
            
            this.$emit("update:show",false)
        }
    },
}
</script>

<style lang="scss" scoped>
@import "./../../../comon";

</style>