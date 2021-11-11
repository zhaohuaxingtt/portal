<template>
  <iSearch @sure="sure" @reset="reset">
    <el-form class="search-form" label-position="top">
      <el-row :gutter="20">
        <el-col :span="10">
          <div class="flex  date-durtion">
            <iFormItem :label="$t('时间筛选')" style="margin-right: 0px">
              <iDatePicker
                v-model="form.createDate_gt"
                :placeholder="$t('APPROVAL.PLEASE_CHOOSE')"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                class="input-l"
              />
            </iFormItem>
            <div class="speator">至</div>
            <iFormItem :label="$t('时间筛选')">
              <iDatePicker
                v-model="form.createDate_le"
                :placeholder="$t('APPROVAL.PLEASE_CHOOSE')"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                class="input-r"
                :picker-options="endPickerOptions"
              />
            </iFormItem>
          </div>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="$t('操作类型')">
            <iSelect v-model="form.type_obj_ae" filterable>
              <el-option
                v-for="(item, index) in typeOptions"
                :label="item.label"
                :value="item.value"
                :key="index"
              />
            </iSelect>
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="$t('操作内容')">
            <iInput v-model="form.content_like" :placeholder="$t('请输入')" />
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="$t('用户名')">
            <iInput
              v-model="form.userNum$creator_or"
              :placeholder="$t('请输入')"
            />
          </iFormItem>
        </el-col>
      </el-row>
    </el-form>
  </iSearch>
</template>

<script>
import { iSearch, iInput, iFormItem, iDatePicker, iSelect } from 'rise'
import { FILTER_FORM, FILTER_TYPES } from './data'
import { fetchBizLogCategories } from '@/api/biz/log'
export default {
  name: 'FilterPanel',
  components: { iSearch, iInput, iDatePicker, iFormItem, iSelect },
  data() {
    return {
      form: { ...FILTER_FORM },
      typeOptions: FILTER_TYPES,
      endPickerOptions: {
        disabledDate: time => {
          if (this.form.createDate_gt) {
            return (
              time.getTime() <
              new Date(this.form.createDate_gt).getTime() - 24 * 60 * 60 * 1000
            )
          }
          return false
        }
      }
    }
  },
  created() {
    this.queryCategories()
  },
  methods: {
    reset() {
      this.form = { ...FILTER_FORM }
      this.sure()
    },
    sure() {
      const searchData = { ...this.form }
      if (searchData.createDate_gt) {
        searchData.createDate_gt += ' 00:00:00'
      }
      if (searchData.createDate_le) {
        searchData.createDate_le += ' 23:59:59'
      }
      this.$emit('search', searchData)
    },
    queryCategories() {
      fetchBizLogCategories().then(res => {
        if (res.result) {
          this.typeOptions = res.data || []
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.date-durtion {
  align-items: flex-end;
  .input-l {
    ::v-deep .el-input__inner {
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
    }
  }
  .input-r {
    ::v-deep .el-input__inner {
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
    }
  }
}
.speator {
  padding: 0px 15px;
  height: 35px;
  background: #f8f8fa;
  margin-bottom: 7px;
  line-height: 34px;
  box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
}
</style>
