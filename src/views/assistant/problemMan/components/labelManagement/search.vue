<template>
  <el-card>
    <div class="search-box flex-between-center-center margin-bottom2">
      <div class="input-box flex-align-center margin-right30">
        <el-form label-position="top" :model="searchForm" ref="searchForm">
          <el-row :gutter="20">
            <el-col :span="8">
              <iFormItem :label="language('问题模块')">
                <iSelect v-model="searchForm.moduleId" filterable clearable placeholder="请选择">
                  <el-option v-for="item in moduleList" :key="item.id" :label="item.menuName" :value="item.id"></el-option>
                </iSelect>
              </iFormItem>
            </el-col>
            <el-col :span="8">
              <iFormItem :label="language('标签')">
                <iInput v-model="searchForm.lableName" clearable placeholder="请输入" />
              </iFormItem>
            </el-col>
            <el-col :span="8">
              <iFormItem :label="language('创建人')">
                <iInput v-model="searchForm.createBy" clearable placeholder="请输入" />
              </iFormItem>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="btn-box margin-top25">
        <iButton @click="handleConfirm">{{ language('确定') }}</iButton>
        <iButton @click="handleReset">{{ language('重置') }}</iButton>
      </div>
    </div>
  </el-card>
</template>

<script>
import { iInput, iButton, iFormItem, iSelect } from 'rise'

export default {
  components: { iInput, iButton, iFormItem, iSelect },
  props: {
    moduleList: {
      type: Array,
      default: () => []
    },
    query: {
      type: Array
    }
  },
  data () {
    return {
      searchForm: {
        moduleId: '',
        lableName:'',
        createBy:''
      },
      options: [],
      startTimeOptions: {
        disabledDate (time) {
          return (
            new Date(time).getTime() <
            new Date().getTime() - 24 * 60 * 60 * 1000
          )
        }
      }
    }
  },
  methods: {
    changeDatePicker (val) {
      if (val.length < 1) {
        this.searchForm.nominateStartDate = "";
        this.searchForm.nominateEndDate = "";
        return false;
      }
      this.searchForm.nominateStartDate = val[0];
      this.searchForm.nominateEndDate = val[1];
    },
    handleConfirm () {
      this.$emit('confirmSearch', this.searchForm);
    },
    handleReset () {
      this.searchForm = {
        code: '',
        tyep:'',
        name:''
      }
      this.handleConfirm()
    }
  }
}
</script>
<style lang="scss" scoped>
.labelfont {
  font-size: 14px;
  margin-bottom: 6px;
}
</style>
