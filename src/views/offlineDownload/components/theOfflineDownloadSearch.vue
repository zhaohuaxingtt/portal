<template>
  <i-search @sure='search' @reset="reset" style="margin-top:20px">
      <el-form>
          <el-row :gutter="24">
              <el-col span='6'>
                <i-form-item  :label='language("任务编号")'>
                    <i-select :placeholder='language("请选择")'>
                        <el-option 
                            v-for="item in taskCodeOptions"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value"
                        >
                        </el-option>
                    </i-select>
                </i-form-item>
              </el-col>
              <el-col span='6'>
                <i-form-item  :label='language("任务名称")'>
                    <i-input :placeholder='language("请输入")'></i-input>
                </i-form-item>
              </el-col>
              <el-col span="12" class="move-time">
                  <i-form-item :label='language("执行时间")'> 
                      <i-date-picker
                        type="datetimerange"
                        range-separator="-"
                        :start-placeholder="language('请选择')"
                        :end-placeholder="language('请选择')">
                    </i-date-picker>
                  </i-form-item>
              </el-col>
          </el-row>
          <el-row :gutter="24">
              <el-col span="6">
                  <i-form-item :label='language("状态")'>
                    <i-select :placeholder='language("请选择")'>
                        <el-option 
                            v-for="item in statusOptions"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value"
                        >
                        </el-option>
                    </i-select>
                  </i-form-item>
              </el-col>
              <el-col span="6">
                  <i-form-item :label='language("操作人")'>
                    <i-input :placeholder='language("请输入")'></i-input>
                  </i-form-item>
              </el-col>
          </el-row>
      </el-form>
  </i-search>
</template>

<script>
import {
    iSearch,
    iFormItem,
    iSelect,
    iInput,
    iDatePicker
} from 'rise'
import {SEARCH_FORM_CONTENT} from './index.js'
export default {
    name:'OfflineDownloadSearch',
    components:{
        iSearch,
        iFormItem,
        iSelect,
        iInput,
        iDatePicker
    },
    data(){
        return{
            searchContent:SEARCH_FORM_CONTENT
        }
    },
    methods:{
        search(){
            this.$emit('search',this.searchContent)
        },
        reset(){
            this.searchContent = _.cloneDeep(SEARCH_FORM_CONTENT)
            this.search()
        }
    }
}
</script>

<style lang="scss" scoped>
.move-time{
    ::v-deep .el-form-item{
        width: 100% !important;
        .el-form-item__content{
            width: 60%;
        }
    }
}
</style>