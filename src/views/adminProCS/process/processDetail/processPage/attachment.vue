<template>
    <iDialog
        title="附件"
        :visible.sync="show" 
        width="700px" 
        @close='close' 
        @open="open"
        append-to-body
        class="process-dialog"
        v-loading="loading"
    >
        <div class="content" >
            <div class="flex margin-bottom20">
                <iInput style="width:220px" :placeholder="language('请输入')" v-model="keyword" />
                <iButton style="margin-left:10px" @click="search('rest')">搜索</iButton>
            </div>
            <ITable ref="table" :tableSetting='tableSetting' :selected="info.sampleIds || []" @selectChange="selectChange" :queryMethod="queryMethod"></ITable>
        </div>
        <div class="flex felx-row mt20 pb20 justify-end ">
            <iButton @click="close">{{ language('关闭') }}</iButton>
            <iButton @click="confirm">{{ language('确认') }}</iButton>
        </div>
    </iDialog>
</template>

<script>
import {iDialog,iButton,iInput} from 'rise';
import {ATTACH_SETTING} from './tables';
import ITable from './../../components/ITable.vue';
import {queryProcessFileList,addPageSample} from '@/api/adminProCS';

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
            tableSetting:ATTACH_SETTING,
            queryMethod: this.query,
            processId:this.$route.query.id,
            selectList:[],
            loading:false
        }
    },
    methods: {
        open(){
            this.$nextTick(() => {
                this.search()
            })
        },
        search(t){
            this.$refs.table.query(t)
        },
        query(page){
            return new Promise(async (reslove,reject) => {
                let data = {
                    page: page.currPage - 1,
                    size: page.pageSize,
                    keyword: this.keyword,
                    fileType:"PRO_SAMPLE"
                }
                try {
                    let res = await queryProcessFileList(this.processId,data)
                    reslove(res)
                } catch(err) {
                    reject(err)
                }
            })
        },
        selectChange(v){
            this.selectList = v
        },
        async confirm(){
            try {
                this.loading = true
                let formdata = new FormData()
                 if(this.selectList.length == 0){
                    formdata.append('samples',"")
                }else{
                    this.selectList.forEach(e => {
                        formdata.append('samples',e.id)
                    })
                }
                await addPageSample(this.info.id,formdata)
                this.$emit("refresh")
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