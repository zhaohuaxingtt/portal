<template>
  <iSearch
    class="margin-bottom20"
    style="margin-top: 20px"
    :icon="true"
    @sure="search"
    @reset="reset"
  >
    <el-form label-position="top">
      <el-row :gutter="2">
        <el-col :span="6">
          <iFormItem :label="$t('单据编号')">
            <iInput :placeholder="$t('请输入')" v-model="form.businessId" />
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="$t('单据类型')">
            <iSelect
              :placeholder="$t('请选择')"
              v-model="form.itemTypeList"
              multiple
              collapse-tags
              filterable
            >
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
              :multiple="multipleCategoryList"
              collapse-tags
              filterable
            >
              <el-option
                v-for="(item, index) in templates"
                :key="index"
                :value="item.name"
                :label="item.value"
                :disabled="
                  multipleCategoryList &&
                    bpmSinglCategoryList.includes(item.name)
                "
              >
              </el-option>
            </iSelect>
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="$t('申请人')">
            <userSearch v-model="form.applyUserId" />
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="$t('申请部门')">
            <orgSearch v-model="form.applyUserDeptId" />
          </iFormItem>
        </el-col>
        <el-col :span="12">
          <!-- <iFormItem :label="$t('任务名称')">
        <iInput :placeholder="$t('请输入')" v-model="form.itemName" />
      </iFormItem> -->
          <iFormItem :label="$t('任务起止日期')" style="width: 80%">
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
      </el-row>
    </el-form>
  </iSearch>
</template>

<script>
import { iFormItem, iInput, iSearch, iSelect, iDatePicker } from 'rise'

import { queryModelTemplate } from '@/api/approval/myApproval'
import {
  userSelect as userSearch,
  orgSelect as orgSearch
} from '@/components/remoteSelect'
import { AEKO_CATEGORY_LIST, BPM_SINGL_CATEGORY_LIST } from '@/constants'
export default {
  name: 'searchForm',
  components: {
    iSearch,
    iInput,
    iFormItem,
    iSelect,
    iDatePicker,
    userSearch,
    orgSearch
  },
  data() {
    return {
      date: '',
      form: {
        businessId: '',
        applyUserId: '',
        categoryList: '',
        endTime: '',
        itemName: '',
        startTime: '',
        applyUserDeptId: '',
        itemTypeList: ''
      },
      templates: [{ name: '', value: '全部' }],
      nameOptions: [],
      loading: false,
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
      ],
      multipleCategoryList: true,
      bpmSinglCategoryList: BPM_SINGL_CATEGORY_LIST
    }
  },
  created() {
    if (this.$route.query.modelTemplate) {
      const moduleTemplate = JSON.parse(this.$route.query.modelTemplate)
      if (
        moduleTemplate.length === 1 &&
        BPM_SINGL_CATEGORY_LIST.includes(moduleTemplate[0])
      ) {
        this.multipleCategoryList = false
        this.form.categoryList = moduleTemplate[0]
      } else {
        this.form.categoryList = JSON.parse(this.$route.query.modelTemplate)
      }
    }
    this.queryModelTemplate()
  },
  methods: {
    search() {
      const searchData = { ...this.form }
      if (this.date) {
        if (this.date[0] === this.date[1]) {
          this.date[1] = this.date[1].split(' ')[0] + ' 23:59:59'
        }
        searchData.startTime = this.date[0]
        searchData.endTime = this.date[1]
      }
      this.$emit('search', searchData, this.templates)
    },
    reset() {
      this.form = {}
      this.$emit('search', this.form)
    },
    async queryModelTemplate() {
      const data = {
        pageNo: 1,
        pageSize: 100,
        type: 'modelTemplate'
      }
      const res = await queryModelTemplate(data)
      const list = res?.data?.records || []
      list.unshift({ name: '', value: '全部' })
      this.templates = list.filter(e => !AEKO_CATEGORY_LIST.includes(e.name))
      this.search()
    }
  }
}
</script>

<style lang="scss" scoped>
.form-item-date {
  width: 490px !important;
}
</style>
