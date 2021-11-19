<template>
  <el-card>
    <div class="search-box flex-between-center-center margin-bottom2">
      <div class="input-box flex-align-center margin-right30">
        <el-form label-position="top" :model="searchForm" ref="searchForm">
          <el-row :gutter="20">
            <el-col :span="8">
              <iFormItem :label="$t('标签内容')">
                <iInput v-model="searchForm.code" placeholder="请输入"></iInput>
              </iFormItem>
            </el-col>
            <el-col :span="8">
              <iFormItem :label="$t('问题模块')">
                <iSelect v-model="searchForm.type" filterable placeholder="请选择">
                  <el-option v-for="item in options" :key="item.code" :label="item.value" :value="item.code"></el-option>
                </iSelect>
              </iFormItem>
            </el-col>
            <el-col :span="8">
              <iFormItem :label="$t('通知人')">
                <iInput v-model="searchForm.name" placeholder="请输入" />
              </iFormItem>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="btn-box margin-top25">
        <iButton @click="handleConfirm">{{ $t('LK_INQUIRE') }}</iButton>
        <iButton @click="handleReset">{{ $t('LK_ZHONGZHI') }}</iButton>
      </div>
    </div>
  </el-card>
</template>

<script>
import { iInput, iButton, iFormItem, iSelect } from 'rise'
export default {
  components: { iInput, iButton, iFormItem, iSelect },
  props: {
    type: {
      type: String
    },
    query: {
      type: Array
    }
  },
  data () {
    return {
      searchForm: {
        code: '',
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
