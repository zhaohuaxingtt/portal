<template>
  <iSearch @sure='sure' @reset="reset">
      <el-form>
          <el-row :gutter="24">
              <el-col span="8">
                  <i-form-item :label='language("中文名称")'>
                      <i-input :placeholder='language("请输入")'></i-input>
                  </i-form-item>
              </el-col>
              <el-col span="8">
                  <i-form-item :label='language("英文名称")'>
                      <i-input :placeholder='language("请输入")'></i-input>
                  </i-form-item>
              </el-col>
          </el-row>
      </el-form>
  </iSearch>
</template>

<script>
import {
    iSearch,
    iFormItem,
    iInput
} from 'rise'
import {SEARCH_CONTENT} from './index.js'
export default {
    name:'SystemManagementSearch',
    components:{
        iSearch,
        iFormItem,
        iInput
    },
    data(){
        return{
            searchContent:SEARCH_CONTENT
        }
    },
    methods:{
        sure(){
            this.$emit('search-table-list',this.searchContent)
        },
        reset(){
            this.searchContent = _.cloneDeep(SEARCH_CONTENT)
            this.sure()
        }
    }
}
</script>

<style>

</style>