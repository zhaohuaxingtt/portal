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
        <el-col :span="5">
          <iFormItem :label="language('单据编号')">
            <iInput
              :placeholder="language('请输入')"
              v-model="form.businessId"
            />
          </iFormItem>
        </el-col>
        <el-col :span="5">
          <iFormItem :label="language('单据类型')">
            <iSelect
              :placeholder="language('请选择')"
              v-model="form.itemTypeList"
              multiple
              collapse-tags
              filterable
            >
              <el-option
                v-for="(item, index) in dOptions"
                :key="index"
                :value="item.value"
                :label="item.label"
              >
              </el-option>
            </iSelect>
          </iFormItem>
        </el-col>
        <el-col :span="14">
          <iFormItem :label="language('任务名称')" style="width: 80%">
            <iSelect
              :placeholder="language('请选择')"
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
                  !isFinished &&
                  multipleCategoryList &&
                  bpmSinglCategoryList.includes(item.name)
                "
              >
              </el-option>
            </iSelect>
          </iFormItem>
        </el-col>
        <el-col :span="5">
          <iFormItem :label="language('申请人')">
            <userSearch v-model="form.applyUserId" />
          </iFormItem>
        </el-col>
        <el-col :span="5">
          <iFormItem :label="language('申请部门')">
            <orgSearch v-model="form.applyUserDeptId" />
          </iFormItem>
        </el-col>
        <el-col :span="14">
          <iFormItem :label="language('任务起止日期')" style="width: 80%">
            <div class="flex-between-center-center">
              <iDatePicker
                v-model="date"
                type="daterange"
                :range-separator="language('至')"
                :start-placeholder="language('开始日期')"
                :end-placeholder="language('结束日期')"
                :style="{ width: isTodoPage ? 'auto' : '100%' }"
              >
              </iDatePicker>
              <el-checkbox v-model="form.reApprove" v-if="isTodoPage">
                复核中单据
                <el-tooltip
                  effect="light"
                  content="显示全部仍在复核期内的单据，包括已经完成复核操作的单据。"
                >
                  <icon name="iconzengjiacailiaochengben_lan" symbol />
                </el-tooltip>
              </el-checkbox>
            </div>
          </iFormItem>
        </el-col>
      </el-row>
    </el-form>
  </iSearch>
</template>

<script>
import { iFormItem, iInput, iSearch, iSelect, iDatePicker, Icon } from 'rise'
import { BPM_APPROVAL_TYPE_OPTIONS } from '@/constants'
import { queryModelTemplate } from '@/api/approval/myApproval'
import {
  userSelect as userSearch,
  orgSelect as orgSearch
} from '@/components/remoteSelect'
import { AEKO_CATEGORY_LIST, BPM_SINGL_CATEGORY_LIST } from '@/constants'
export default {
  name: 'searchForm',
  props: {
    isFinished: {
      type: Boolean,
      default: false
    }
  },
  components: {
    iSearch,
    iInput,
    iFormItem,
    iSelect,
    iDatePicker,
    userSearch,
    orgSearch,
    Icon
  },
  computed: {
    isTodoPage() {
      return this.$route.path === '/bpm/todoList'
    }
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
        itemTypeList: '',
        reApprove: false
      },
      templates: [{ name: '', value: '全部' }],
      nameOptions: [],
      loading: false,
      dOptions: BPM_APPROVAL_TYPE_OPTIONS,
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
        if (this.date[1]) {
          this.date[1] = this.date[1].split(' ')[0] + ' 23:59:59'
        }
        searchData.startTime = this.date[0]
        searchData.endTime = this.date[1]
      }
      if (!this.isTodoPage) {
        delete searchData.reApprove
      }
      this.$emit('search', searchData, this.templates)
    },
    reset() {
      this.form = {
        businessId: '',
        applyUserId: '',
        categoryList: '',
        endTime: '',
        itemName: '',
        startTime: '',
        applyUserDeptId: '',
        itemTypeList: '',
        reApprove: false
      }
      this.date = ''
      this.$emit('search', this.form, this.templates)
    },
    async queryModelTemplate() {
      const data = {
        pageNo: 1,
        pageSize: 100,
        type: 'modelTemplate',
        userId: this.$store.state.permission.userInfo.id
      }
      const res = await queryModelTemplate(data)
      const list = res?.data?.records || []
      list.unshift({ name: '', value: '全部' })
      this.templates = list.filter((e) => !AEKO_CATEGORY_LIST.includes(e.name))
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
