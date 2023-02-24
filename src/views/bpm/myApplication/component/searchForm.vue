<template>
  <div>
    <template v-if="isSourceFindingPoint">
      <el-row :gutter="2">
<!--        <el-col :span="5" style="height: 40px;line-height: 40px;">-->
<!--          <iSelect-->
<!--            :placeholder="language('请选择')"-->
<!--            v-model="form.modelTemplate"-->
<!--            :multiple="false"-->
<!--            collapse-tags-->
<!--            filterable-->
<!--            @change="onItemTypeListChange"-->
<!--          >-->
<!--            <el-option-->
<!--              v-for="(item, index) in dOptions"-->
<!--              :key="index"-->
<!--              :value="item.value"-->
<!--              :label="item.label"-->
<!--            >-->
<!--            </el-option>-->
<!--          </iSelect>-->
<!--        </el-col>-->
        <el-col :span="24">
          <taskPanelCategory
            ref="taskPanelCategory"
            :curTypeName="curTypeName"
            :subTypeName="curSubTypeName"
            @toggle-active="toggleActive"
            @item-type-list-change="onItemTypeListChange"
            @toggle-active-click="onToggleActiveClick"
            @item-type-list-Click="onItemTypeListClick"
            :active-index="curActiveIndex"
            :isFinished="isFinished"
            :myApplication="true"
          />
        </el-col>
      </el-row>
    </template>
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
            <iFormItem :label="language('单据编号')">
              <iInput
                :placeholder="language('请输入')"
                v-model="form.businessId"
              />
            </iFormItem>
          </el-col>
          <template v-if="!isSourceFindingPoint">
            <el-col :span="6">
              <iFormItem :label="language('业务模块')">
                <iSelect
                  :placeholder="language('请选择')"
                  multiple
                  collapse-tags
                  v-model="form.itemType"
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
            <el-col :span="!isSourceFindingPoint ? 12 : 9">
              <iFormItem :label="language('任务名称')" style="width: 90%">
                <iSelect
                  :placeholder="language('请选择')"
                  v-model="form.categoryList"
                  :multiple="multipleCategoryList"
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
          </template>
          <el-col :span="12">
            <iFormItem :label="language('任务起止日期')" class="form-item-date">
              <iDatePicker
                v-model="date"
                type="daterange"
                :range-separator="language('至')"
                :start-placeholder="language('开始日期')"
                :end-placeholder="language('结束日期')"
                style="width: 100%"
              >
              </iDatePicker>
            </iFormItem>
          </el-col>
          <el-col :span="6">
            <iFormItem :label="language('审批进度')">
              <iSelect
                :placeholder="language('请选择')"
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
  </div>
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
import {
  AEKO_CATEGORY_LIST,
  BPM_APPROVAL_TYPE_OPTIONS,
  BPM_APPLY_SINGLE_CATEGORY_LIST
} from '@/constants'
import taskPanelCategory from '@/views/bpm/task/components/taskPanelCategory'
export default {
  name: 'searchForm',
  props: {
    isFinished: {
      type: Boolean,
      default: false
    },
    isSourceFindingPoint: {
      type: Boolean,
      default: false
    }
  },
  components: {
    iSearch,
    iInput,
    iSelect,
    iFormItem,
    iDatePicker,
    taskPanelCategory
  },
  data() {
    return {
      form: { ...searchForm },
      approvalTypes,
      templates: [],
      date: '',
      dOptions: BPM_APPROVAL_TYPE_OPTIONS,
      curSubTypeName: null, // 对应的url里面的modelTemplate, 用来过滤出activeData
      curTypeName: null, // 这个用来记录对应selectSubTypeName，目前还没有其他用处
      curActiveIndex: -1,
      multipleCategoryList: true // 任务名称是否可多选
    }
  },
  created() {
    if (this.$route.query.modelTemplate) {
      const categoryList = JSON.parse(this.$route.query.modelTemplate)
      if (!this.finished) {
        if (
          categoryList.length === 1 &&
          BPM_APPLY_SINGLE_CATEGORY_LIST.includes(categoryList[0])
        ) {
          this.form.categoryList = categoryList[0]
          this.multipleCategoryList = false
        } else {
          this.form.categoryList = categoryList
        }
      } else {
        this.form.categoryList = categoryList
      }
      if(categoryList?.length > 0) {
        this.curSubTypeName = categoryList[0]
      }
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
    onToggleActiveClick(index, items) {
      this.curActiveIndex = index
      if(index !== -1 && items && items[index] && items[index].categoryList?.length > 0) {
        this.form.categoryList = items[index].categoryList
      } else {
        if(index === -1) {
          let categoryList = []
          if(items) {
            items.forEach(categoryItem => {
              if(categoryItem.categoryList && categoryItem.categoryList.length > 0) {
                categoryList = categoryList.concat(categoryItem.categoryList)
              }
            })
          }
          this.form.categoryList = categoryList
        } else {
          this.form.categoryList = ''
        }
      }
      this.search()
    },
    onItemTypeListClick(newValue) {
      const newItem = this.dOptions.find(item => {
        return newValue == item.value
      })
      let activeData = []
      if(newItem) {
        this.curTypeName = newItem.typeName
        this.curActiveIndex = -1
        activeData = this.$refs.taskPanelCategory.updateActiveDataByTypeName(newItem.typeName)
      } else {
        this.curTypeName = null
        this.curActiveIndex = -1
        activeData = this.$refs.taskPanelCategory.updateActiveDataByTypeName(newItem.typeName)
      }
      let categoryList = []
      activeData.forEach(categoryItem => {
        if(categoryItem.categoryList && categoryItem.categoryList.length > 0) {
          categoryList = categoryList.concat(categoryItem.categoryList)
        }
      })
      this.form.categoryList = categoryList
      this.search()
    },
    onItemTypeListChange(newValue, update = true) {
      this.updateCurTypeName(newValue, update)
      if(update) {
        this.search()
      }
    },
    updateCurTypeName(newValue) {
      const newItem = this.dOptions.find(item => {
        return newValue == item.value
      })
      console.log("newItem, newValue", newItem, newValue)
      if(newItem) {
        this.curTypeName = newItem.typeName
        this.curActiveIndex = -1
      } else {
        this.curTypeName = null
        this.curActiveIndex = -1
      }
    },
    toggleActive(index, items, update = true) {
      this.curActiveIndex = index
      if(index !== -1 && items && items[index] && items[index].categoryList?.length > 0) {
        this.form.categoryList = items[index].categoryList
      } else {
        if(index === -1) {
          let categoryList = []
          if(items) {
            items.forEach(categoryItem => {
              if(categoryItem.categoryList && categoryItem.categoryList.length > 0) {
                categoryList = categoryList.concat(categoryItem.categoryList)
              }
            })
          }
          this.form.categoryList = categoryList
        } else {
          this.form.categoryList = ''
        }
      }
      if(update) {
        this.search()
      }
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
    },
    sure() {
      // const searchData = { ...this.form }
      // if (this.date) {
      //   searchData.startTime = this.date[0]
      //   searchData.endTime = this.date[1]
      // }
      // this.$emit('search', searchData, this.templates)
      this.search()
    },
    reset() {
      // this.updateCurTypeName(null)
      this.date = ''
      this.form = { ...searchForm }
      // this.$emit('search', this.form, this.templates)
      // this.search()
      this.$refs.taskPanelCategory.reset("-1")
    },
    search() {
      const searchData = { ...this.form }
      if (this.date) {
        searchData.startTime = moment(this.date[0]).format('YYYY-MM-DD') + ' 00:00:00'
        searchData.endTime = moment(this.date[1]).format('YYYY-MM-DD') + ' 23:59:59'
      }
      this.$emit('search', { ...searchData, itemTypeList: this.form.itemTypeList ? [this.form.itemTypeList] : []}, this.templates)
      // this.$emit('search', this.form, this.templates)
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
