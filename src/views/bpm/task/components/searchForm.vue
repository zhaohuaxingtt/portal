<template>
  <div>
    <template v-if="isSourceFindingPoint">
      <el-row :gutter="2">
<!--        <el-col :span="5" style="height: 40px;line-height: 40px;">-->
<!--          <iSelect-->
<!--            :placeholder="language('请选择')"-->
<!--            v-model="form.itemTypeList"-->
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
          />
        </el-col>
      </el-row>
    </template>
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
          <template v-if="!isSourceFindingPoint">
            <el-col :span="5">
              <iFormItem :label="language('业务模块')">
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
          </template>
          <el-col :span="5">
            <iFormItem :label="language('申请人')">
              <userSearch
                v-model="form.applyUserId"
                :default-options="userDefaultOptions"
              />
            </iFormItem>
          </el-col>
          <el-col :span="5">
            <iFormItem :label="language('申请部门')">
              <orgSearch
                v-model="form.applyUserDeptId"
                :default-options="deptDefaultOptions"
              />
            </iFormItem>
          </el-col>
          <el-col :span="!isSourceFindingPoint ? 14 : 9">
            <iFormItem :label="language('任务起止日期')" style="width: 90%">
              <div class="flex-between-center-center">
                <iDatePicker
                  v-model="date"
                  type="daterange"
                  :range-separator="language('至')"
                  :start-placeholder="language('开始日期')"
                  :end-placeholder="language('结束日期')"
                  :style="{ width: isTodoPage ? 'auto' : '100%' }"
                  value-format="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                >
                </iDatePicker>
                <el-checkbox v-model="form.reApprove" style="margin-left: 10px;" v-if="isTodoPage">
                  {{ language('复核中单据') }}
                  <el-tooltip
                    effect="light"
                    :content="
                      language(
                        '显示全部仍在复核期内的单据，包括已经完成复核操作的单据。'
                      )
                    "
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
  </div>
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
import { fetchUser } from '@/api/approval/agent'
import { searchOrganizationByID } from '@/api/organization'
import taskPanelCategory from './taskPanelCategory'
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
    iFormItem,
    iSelect,
    iDatePicker,
    userSearch,
    orgSearch,
    taskPanelCategory,
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
        itemTypeList: '-1',
        reApprove: false
      },
      templates: [{ name: '', value: '全部' }],
      nameOptions: [],
      loading: false,
      dOptions: BPM_APPROVAL_TYPE_OPTIONS,
      curSubTypeName: null, // 对应的url里面的modelTemplate, 用来过滤出activeData
      curTypeName: null, // 这个用来记录对应selectSubTypeName，目前还没有其他用处
      curActiveIndex: -1,
      multipleCategoryList: true,
      bpmSinglCategoryList: BPM_SINGL_CATEGORY_LIST,
      userDefaultOptions: [],
      deptDefaultOptions: [],
      dataList:[],
    }
  },
  created() {
    this.refresh();
  },
  methods: {
    getOverview(onlyUpdateActiveData = false) {
      this.$refs.taskPanelCategory.getOverview(onlyUpdateActiveData)
    },
    refresh() {
      console.log("this.isFinished...", this.isFinished, this.$route.query.modelTemplate)
      if (this.$route.query.modelTemplate) {
        const moduleTemplate = JSON.parse(this.$route.query.modelTemplate)
        console.log('module-template', moduleTemplate)
        if (
          moduleTemplate.length === 1 &&
          BPM_SINGL_CATEGORY_LIST.includes(moduleTemplate[0])
        ) {
          this.multipleCategoryList = false
          this.form.categoryList = moduleTemplate[0]
        } else {
          // this.form.categoryList = JSON.parse(this.$route.query.modelTemplate)
          this.form.categoryList = moduleTemplate[0]
        }
        this.curSubTypeName = moduleTemplate[0]
        // console.log(this.form);
        // this.queryModelTemplate()
      }
      // CRW-8311
      // 【CF】审批人界面从[已审批]切换到[待审批]查不到待审批单据
      if (this.isFinished) {//已审批
        console.log(this.$route.query)
        if (this.$route.query.doneQueryStr) {
          try {
            const queryForm = JSON.parse(
              decodeURIComponent(this.$route.query.doneQueryStr)
            )
            console.log(queryForm)
            if (queryForm.startTime && queryForm.endTime) {
              this.date = [
                moment(queryForm.startTime).format('YYYY-MM-DD'),
                moment(queryForm.endTime).format('YYYY-MM-DD')
              ]
            }
            this.form = queryForm
            if (this.form.applyUserId) {
              this.queryUserOptions()
            }
            if (this.form.applyUserDeptId) {
              this.queryDeptOptions()
            }
            this.form = {
              ...queryForm,
              itemTypeList: !queryForm.itemTypeList || queryForm.itemTypeList.length === 0 ? '-1' : queryForm.itemTypeList[0]
            }
          } catch (err) {
            console.log(err)
          }
          console.log('this.form2...', this.form)
          if (this.form.applyUserId) {
            this.queryUserOptions()
          }
        } else if (this.$route.query.todoQueryStr) {
          try {
            const queryForm = JSON.parse(
              decodeURIComponent(this.$route.query.todoQueryStr)
            )
            this.dataList = _.cloneDeep(queryForm)

            console.log(this.dataList)
            // return;
            this.$set(this, "form", _.cloneDeep(queryForm))
            this.form.categoryList = [this.dataList.categoryList]
            console.log(this.form)
            console.log(this.form.categoryList)
            console.log(JSON.stringify(this.form))

            if (this.form.startTime && this.form.endTime) {
              this.date = [
                moment(this.form.startTime).format('YYYY-MM-DD'),
                moment(this.form.endTime).format('YYYY-MM-DD')
              ]
            }
            if (this.form.applyUserId) {
              this.queryUserOptions()
            }
            if (this.form.applyUserDeptId) {
              this.queryDeptOptions()
            }
          } catch (err) {
            console.log(err)
          }
        } else {//待审批
          console.log(1111)
          if (this.$route.query.todoQueryStr) {
            try {
              const queryForm = JSON.parse(
                decodeURIComponent(this.$route.query.todoQueryStr)
              )

              console.log(queryForm);
              if (queryForm.startTime && queryForm.endTime) {
                this.date = [
                  moment(queryForm.startTime).format('YYYY-MM-DD'),
                  moment(queryForm.endTime).format('YYYY-MM-DD')
                ]
              }
              this.form = queryForm
              if (this.form.applyUserId) {
                this.queryUserOptions()
              }
              if (this.form.applyUserDeptId) {
                this.queryDeptOptions()
              }
            } catch (err) {
              console.log(err)
            }
            if (this.form.itemTypeList != '-1') {
              this.updateCurTypeName(this.form.itemTypeList)
            }
          }
          this.queryModelTemplate()
        }
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
    updateCurTypeName(newValue, update) {
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
      this.queryModelTemplate(update)
    },
    search() {
      const searchData = { ...this.form }
      if (this.date && this.date.length === 2) {
        searchData.startTime =
          moment(this.date[0]).format('YYYY-MM-DD') + ' 00:00:00'
        searchData.endTime =
          moment(this.date[1]).format('YYYY-MM-DD') + ' 23:59:59'
      }
      if (!this.isTodoPage) {
        delete searchData.reApprove
      }
      this.$emit('search', { ...searchData, itemTypeList: searchData.itemTypeList ? [searchData.itemTypeList] : []}, this.templates)
    },
    reset() {
      // this.updateCurTypeName(null)
      this.form = {
        businessId: '',
        applyUserId: '',
        categoryList: '',
        endTime: '',
        itemName: '',
        startTime: '',
        applyUserDeptId: '',
        itemTypeList: '-1',
        reApprove: false
      }
      this.date = ''
      // this.$emit('search', { ...this.form, itemTypeList: searchData.itemTypeList ? [searchData.itemTypeList] : []}, this.templates)
      // this.search()
      this.$refs.taskPanelCategory.reset("-1")
    },
    async queryModelTemplate(update = true) {
      console.log(this.form);
      const data = {
        pageNo: 1,
        pageSize: 100,
        type: 'modelTemplate',
        userId: this.$store.state.permission.userInfo.id
      }
      const res = await queryModelTemplate(data, update)
      const list = res?.data?.records || []
      list.unshift({ name: '', value: '全部' })
      this.templates = list.filter((e) => !AEKO_CATEGORY_LIST.includes(e.name))
      if(update) {
        this.search()
      }
    },
    async queryUserOptions() {
      const queryData = {
        userId: this.form.applyUserId
      }
      const { data } = await fetchUser(queryData)
      this.userDefaultOptions = data
    },
    async queryDeptOptions() {
      const queryData = {
        id: this.form.applyUserDeptId
      }
      const { data } = await searchOrganizationByID(queryData)
      if (data) {
        this.deptDefaultOptions = [data]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form-item-date {
  width: 490px !important;
}
</style>
