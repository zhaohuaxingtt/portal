<template>
  <iSearch @reset="reset" @sure='sure'>
      <el-form >
          <el-row :gutter='24'>
              <el-col span="8">
                  <iFormItem :label='language("供应商中文名称")'>
                      <iInput :placeholder='language("请输入")' v-model="searchContent.nameZh"></iInput>
                  </iFormItem>
              </el-col>
              <el-col span="8">
                  <iFormItem :label='language("供应商英文名称")'>
                      <iInput :placeholder='language("请输入")' v-model="searchContent.nameEn"></iInput>
                  </iFormItem>
              </el-col>
              <el-col span="8">
                  <iFormItem :label='language("DUNS")'>
                      <iInput :placeholder='language("请输入")' v-model="searchContent.dunsCode"></iInput>
                  </iFormItem>
              </el-col>
          </el-row>
          <el-row :gutter="24">
              <el-col span="8">
                  <iFormItem :label='language("统一社会信用代码")'>
                      <iInput :placeholder='language("请输入")' v-model="searchContent.socialcreditNo">
                      </iInput>
                  </iFormItem>
              </el-col>
          </el-row>
      </el-form>
  </iSearch>
</template>

<script>
import {iSearch,iFormItem,iInput,iSelect} from 'rise'
export default {
    name:"filter-panel",
    components:{iSearch,iFormItem,iInput,iSelect},
    data(){
        return{
            labelContent:{
                supplierNameZh:'供应商中文名称',
                supplierNameEn:'供应商英文名称',
                DUNS:'DUNS',
                socialcreditNo:'统一社会信用代码'
            },
            searchContent:{
                nameZh:'',
                nameEn:'',
                dunsCode:'',
                socialcreditNo:''
            },
            socialcreditNoOption:[]
        }
    },
    created(){
        this.$nextTick(()=>{
            this.sure()
        })
    },
    methods:{
        reset(){
            this.searchContent={
                nameZh:'',
                nameEn:'',
                dunsCode:'',
                socialcreditNo:''
            }
            this.sure()
        },
        sure(){
            this.$emit('search',{...this.searchContent})
        }
    }
}
</script>

<style>

</style>