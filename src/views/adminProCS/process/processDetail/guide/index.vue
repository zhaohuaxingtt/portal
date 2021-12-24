<template>
    <iCard>
        <div class="flex justify-between margin-bottom20">
            <div class="flex">
                <iInput style="width:220px" :placeholder="language('请输入')" v-model="keyWord" />
                <iButton style="margin-left:10px">搜索</iButton>
            </div>
            <div>
                <iButton @click="dialog.show = true">添加流程指导书</iButton>
            </div>
        </div>
        <ITable :tableSetting='tableSetting' :extraData="extraData"></ITable>

        <addGuide :show.sync="dialog.show"></addGuide>        
    </iCard>
</template>

<script>
import {iInput, iCard, iButton } from 'rise';
import ITable from './../../components/ITable';
import {DOC} from '../tables';
import addGuide from './addGuide.vue';
export default {
    components:{
        iInput,
        iCard,
        iButton,
        ITable,
        addGuide
    },
    data() {
        return {
            keyWord:"",
            tableSetting: DOC,
            docSetting:[
                 {
                    type:'index',
                    label:'序号',
                    width: 100
                },
                {
                    prop:'title',
                    label:'文档名称'
                },
                {
                    prop:'publishTime',
                    label:'发布日期'
                }
            ],
            extraData:{
                del:this.del
            },
            dialog:{
                show: false,
                keyWord:""
            }
        }
    },
    methods: {
        confirm(){

        },
        del(row){
            this.$confirm('确定删除此流程指导书吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            })
        },
        close(){
            this.dialog.show = false
        }
    },
    
}
</script>

<style lang="scss" scoped>
@import "./../../../comon";
</style>