<template>
  <el-card>
    <div class="search-box flex-between-center-center margin-bottom2">
      <div class="input-box flex-align-center margin-right30 flex-1">
        <el-form label-position="top" :model="searchForm" ref="searchForm">
          <el-row :gutter="20">
            <el-col :span="6">
              <iFormItem :label="language('用户类型')">
                <!--  inner:内部用户 supplier:供应商用户 -->
                <iSelect v-model="searchForm.source" filterable placeholder="请选择" clearable="true"  @clear="clearable('source')"  @change="sourceHandle">
                  <el-option label="内部用户" value="inner"></el-option>
                  <el-option label="供应商用户" value="supplier"></el-option>
                </iSelect>
              </iFormItem>
            </el-col>
            <el-col :span="6">
              <iFormItem :label="language('问题模块')">
                <iSelect v-model="searchForm.questionModuleId" filterable :placeholder="language('问题模块')" :disabled="!searchForm.source"  clearable="true" @change="questionModuleHandle" @clear="clearable('questionModuleId')">
                  <el-option v-for="item in problemModuleList" :key="item.id" :label="item.menuName" :value="item.id"></el-option>
                </iSelect>
              </iFormItem>
            </el-col>
            <el-col :span="6">
              <iFormItem :label="language('标签')">
                <iSelect v-model="searchForm.questionLableId" filterable :disabled="!searchForm.questionModuleId"  clearable="true" @clear="clearable('questionLableId')">
                  <el-option v-for="item in labelList" :key="item.id" :label="item.lableName" :value="item.id"></el-option>
                </iSelect>
              </iFormItem>
            </el-col>
            <el-col :span="6">
              <iFormItem :label="userType === 'supplier' ? language('管理员') : language('创建人')">
                <iInput v-model="searchForm.createBy" :placeholder="language('请输入')" />
              </iFormItem>
            </el-col>
            <el-col :span="12" v-if="userType === 'supplier'">
              <iFormItem :label="language('完结时间')">
                <el-date-picker style="width:100%;" value-format="yyyy-MM-dd HH:mm:ss" v-model="finishDate" clearable @change="changeDatePickerFinish" type="daterange" :range-separator="language('至')" :start-placeholder="language('开始日期')" :end-placeholder="language('结束日期')">
                </el-date-picker>
              </iFormItem>
            </el-col>
            <el-col :span="12" >
              <iFormItem :label="userType === 'supplier' ? language('提问时间') : language('创建时间')">
                <el-date-picker style="width:100%;" value-format="yyyy-MM-dd HH:mm:ss" clearable v-model="createDate" @change="changeDatePickerCreate" type="daterange" :range-separator="language('至')" :start-placeholder="language('开始日期')" :end-placeholder="language('结束日期')">
                </el-date-picker>
              </iFormItem>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="btn-box margin-top140">
        <iButton @click="handleConfirm">{{ language('查询') }}</iButton>
        <iButton @click="handleReset">{{ language('重置') }}</iButton>
      </div>
    </div>
  </el-card>
</template>

<script>
import { iInput, iButton, iFormItem, iSelect } from 'rise';
import { queryModuleBySource,  getCurrLabelList,  } from '@/api/assistant';

export default {
  components: { iInput, iButton, iFormItem, iSelect },
  props: {
    type: {
      type: String
    },
    query: {
      type: Array
    },
    userType: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      searchForm: {
        questionModuleId: '',
        questionLableId: '',
        createBy: '',
        source: '',
        finishedDateStart:"",
        finishedDateEnd:"",
        createDateStart:"",
        createDateEnd:"",
      },
      finishDate:null,
      createDate:null,
      problemModuleList: [],
      labelList: [],
      startTimeOptions: {
        disabledDate (time) {
          return (
            new Date(time).getTime() <
            new Date().getTime() - 24 * 60 * 60 * 1000
          )
        }
      },
    }
  },
  methods: {
    // 根据用户类型获取模块下拉框
    async getModuleListByUserType (userType) {
      const response = await queryModuleBySource(userType);
      if (response?.code === '200') {
        this.problemModuleList = response.data;
      } else {
        console.error('获取模块接口失败');
      }
    },
    sourceHandle(val) {
      if (!val) return;
      this.getModuleListByUserType(val);
      this.searchForm = Object.assign(this.searchForm, {
        questionModuleId: '',
        questionLableId: '',
      });
    },
    async questionModuleHandle (val) {
      if (!val) return;
      const response = await getCurrLabelList(val);
      if (response?.code === '200') {
        console.log(response.data);
        this.labelList = response.data;
      } else {
        console.error('根据模块id查询标签失败');
      }
    },
    clearable(type) {
      if (type == 'source'|| type == 'questionModuleId') {
        this.searchForm = Object.assign(this.searchForm, {
          questionModuleId: '',
          questionLableId: '',
        });
      } else {
        this.searchForm = Object.assign(this.searchForm, {[type]:''});
      }
    },
    changeDatePickerCreate (val) {
      this.searchForm.createDateStart = val ? val[0] : "";
      this.searchForm.createDateEnd = val ? val[1] : "";
    },
    changeDatePickerFinish (val) {
      this.searchForm.finishedDateStart = val ? val[0] : "";
      this.searchForm.finishedDateEnd = val ? val[1] : "";
    },
    handleConfirm () {
      delete this.searchForm.date;
      this.$emit('confirmSearch', this.searchForm);
    },
    handleReset () {
      this.searchForm =  {
        questionModuleId: '',
        questionLableId: '',
        createBy: '',
        source: '',
        finishedDateStart:"",
        finishedDateEnd:"",
        createDateStart:"",
        createDateEnd:"",
      };
      this.finishDate = ""
      this.createDate = ""
      this.$emit('confirmSearch', this.searchForm);
    }
  },
  mounted() {
  }
}
</script>
<style lang="scss" scoped>
@import "./../../../comon.scss";
.labelfont {
  font-size: 14px;
  margin-bottom: 6px;
}
.margin-top140 {
  margin-top: 146px;
}
</style>
