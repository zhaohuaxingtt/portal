<template>
  <iSearch
    class="margin-bottom20"
    style="margin-top: 20px"
    @sure="sure"
    @reset="reset"
    :search-key="PARTSPROCURE_CONFIRM"
  >
    <el-form>
      <el-row :gutter="20">
        <el-col :span="6">
          <iFormItem :label="$t('单据编号')">
            <iInput :placeholder="$t('请输入')" v-model="form.businessId" />
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="$t('单据类型')">
            <!-- <iInput :placeholder="$t('请输入')" v-model="form.itemType" /> -->
            <iSelect :placeholder="$t('请选择')" v-model="form.itemType">
              <el-option
                v-for="(item, index) in dOptions"
                :key="index"
                :value="item.label"
                :label="item.label"
              >
              </el-option>
            </iSelect>
          </iFormItem>
        </el-col>
        <el-col :span="12">
          <iFormItem :label="$t('任务名称')" style="width: 80%">
            <iSelect
              :placeholder="$t('请选择')"
              v-model="form.categoryList"
              multiple
              collapse-tags
            >
              <el-option
                v-for="(item, index) in templates"
                :key="index"
                :value="item.name"
                :label="item.value"
              >
              </el-option>
            </iSelect>
          </iFormItem>
        </el-col>

        <el-col :span="12">
          <!-- <iFormItem :label="$t('任务名称')">
        <iInput :placeholder="$t('请输入')" v-model="form.itemName" />
      </iFormItem> -->

          <iFormItem :label="$t('任务起止日期')" class="form-item-date">
            <iDatePicker
              v-model="date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 100%"
            >
            </iDatePicker>
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="$t('APPROVAL.APPROVAL_PROGRESS')">
            <iSelect
              :placeholder="$t('APPROVAL.PLEASE_CHOOSE')"
              v-model="form.procProgress"
              multiple
              collapse-tags
              @change="handleProcProgressChange"
            >
              <el-option
                v-for="(item, index) in approvalStatus"
                :key="index"
                :value="item.value"
                :label="item.label"
              />
            </iSelect>
          </iFormItem>
        </el-col>
      </el-row>
    </el-form>
  </iSearch>
</template>

<script>
import { iSearch, iInput, iSelect, iFormItem, iDatePicker } from 'rise'
import {
  searchForm,
  approvalToDoStatus,
  approvalFinishedStatus,
  approvalTypes
} from './data'
import { queryModelTemplate } from '@/api/approval/myApproval'
import { AEKO_CATEGORY_LIST } from '@/constants'
export default {
  name: 'searchForm',
  props: {
    finished: {
      type: Boolean,
      default: false
    }
  },
  components: {
    iSearch,
    iInput,
    iSelect,
    iFormItem,
    iDatePicker
  },
  data() {
    return {
      form: { ...searchForm },
      approvalTypes,
      templates: [],
      date: '',
      dOptions: [
        {
          value: -1,
          label: '未知类型'
        },
        {
          value: 0,
          label: '项目管理'
        },
        {
          value: 2,
          label: '寻源定点'
        },
        {
          value: 4,
          label: '谈判'
        },
        {
          value: 6,
          label: '零件价格与订单'
        },
        {
          value: 7,
          label: '模具采购'
        },
        {
          value: 8,
          label: '供应商管理'
        },
        {
          value: 9,
          label: '总成散件管理'
        },
        {
          value: 10,
          label: '需求产能管理'
        },
        {
          value: 11,
          label: '财务风险管理'
        },
        {
          value: 12,
          label: '采购业绩'
        },
        {
          value: 13,
          label: '原材料价格补差'
        },
        {
          value: 14,
          label: '0公里索赔'
        },
        {
          value: 15,
          label: '零件对外销售'
        },
        {
          value: 16,
          label: '定价管理'
        }
      ]
    }
  },
  created() {
    if (this.$route.query.modelTemplate) {
      this.form.categoryList = JSON.parse(this.$route.query.modelTemplate)
    }
    this.queryModelTemplate()
  },
  computed: {
    approvalStatus() {
      return this.finished ? approvalFinishedStatus : approvalToDoStatus
    }
  },
  watch: {
    finished() {
      Vue.set(this.form, 'procProgress', '')
    }
  },
  methods: {
    async queryModelTemplate() {
      const data = {
        pageNo: 1,
        pageSize: 100,
        type: 'modelTemplate'
      }
      const res = await queryModelTemplate(data)
      const list = res?.data?.records || []
      list.unshift({ name: '', value: '全部' })
      this.templates = list.filter((e) => !AEKO_CATEGORY_LIST.includes(e.name))
    },
    sure() {
      const searchData = { ...this.form }
      if (this.date) {
        searchData.startTime = this.date[0]
        searchData.endTime = this.date[1]
      }
      this.$emit('search', searchData)
    },
    reset() {
      this.form = { ...searchForm }
      this.$emit('search', this.form)
    },
    handleProcProgressChange(val) {
      if (val.length > 0) {
        if (val[val.length - 1] === 0) {
          Vue.set(this.form, 'procProgress', [0])
        } else {
          if (val.indexOf(0) > -1) {
            Vue.set(
              this.form,
              'procProgress',
              val.filter((e) => e !== 0)
            )
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form-item-date {
  width: 586px !important;
}
</style>
