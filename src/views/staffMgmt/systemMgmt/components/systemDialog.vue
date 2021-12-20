<template>
  <iDialog
    :visible.sync="show"
    :title="title"
    @close="closeDialog"
  >
    <el-form label-position="left" label-width="100px">
        <el-row :gutter="24">
            <el-col span="12">
                <i-form-item :label='language("中文名称")'>
                    <i-input :disabled='edit' v-model="detail.nameZh"></i-input>
                </i-form-item>
            </el-col>
            <el-col span="12">
                <i-form-item :label='language("英文名称")'>
                    <i-input :disabled='edit'></i-input>
                </i-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col span="12">
                <i-form-item :label='language("系统URL")'>
                    <i-input :disabled='edit'></i-input>
                </i-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col span="24">
                <i-form-item :label='language("系统功能说明")'>
                    <i-input :disabled='edit'></i-input>
                </i-form-item>
            </el-col>
        </el-row>
    </el-form>
    <div class="btn" slot="footer">
        <div v-if="edit">
            <i-button @click="edit = false">{{language("编辑")}}</i-button>
        </div>
        <div v-else >
            <i-button @click="sure">{{language("确认")}}</i-button>
            <i-button @click="reset">{{language("重置")}}</i-button>
        </div>
    </div>
  </iDialog>

</template>

<script>
import {
    iDialog,
    iFormItem,
    iInput,
    iButton
} from 'rise'
export default {
    name:'systemDetailDialog',
    components:{
        iDialog,
        iFormItem,
        iInput,
        iButton
    },
    props:{
        show:{
            type:Boolean,
            default:false
        },
        detailMessage:{
            type:Object,
            default:function(){
                return{
                    nameZh:''
                }
            }
        }
    },
    computed:{
        title(){
            if(this.detail.nameZh){
                return '编辑'
            }else{
                return '新建'
            }
        },
    },
    data(){
        return{
            edit:false,
            detail:this.detailMessage
        }
    },
    created(){
        if(this.title == '新建'){
            this.edit = false
        }else{
            this.edit =  true
        }
        
    },
    methods:{
        closeDialog(){
            this.$emit('update:show',false)
        },
        editForm(){
            console.log('ssssss');
            this.edit = false
        },
        sure(){

        },
        reset(){

        }
    }
}
</script>

<style>

</style>