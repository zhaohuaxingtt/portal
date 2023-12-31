<template>
  <div class="role-selector">
    <i-dialog
      :title="language(title)"
      :visible.sync="isShow"
      width="80%"
      @open="handleOpen"
      @close="handleClose"
    >
      <iSearch
        class="margin-bottom20"
        style="margin-top: 20px"
        icon
        resetKey="ROLE_SEARCH_RESET"
        searchKey="ROLE_SEARCH_CONFIRM"
        @sure="sure"
        @reset="reset"
        v-if="filter && filter.length"
      >
        <el-form ref="searchForm">
          <iFormItem
            :label="language(item.label)"
            v-for="(item, index) in filter"
            :key="index"
          >
            <iInput
              :placeholder="language('请输入')"
              v-model="query[item.value]"
              v-if="item.type === 'input'"
            />
            <i-select
              v-model="query.selectValue"
              :placeholder="$t('LK_QINGXUANZE')"
              v-if="item.type === 'select'"
            >
              <el-option
                v-for="option in item.options"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              >
              </el-option>
            </i-select>
          </iFormItem>
        </el-form>
      </iSearch>
      <el-form
        :model="form"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="selector-form"
      >
        <el-row :gutter="20" class="margin-bottom20">
          <el-col :span="22">
            <div class="listSelected-wrapper">
              <div class="tag-wrapper">
                <el-tag
                  v-for="tag in listSelected"
                  :key="tag.id"
                  closable
                  :type="'info'"
                  @close="handleTagClose(tag)"
                  class="margin-right10 margin-bottom5 margin-top5"
                >
                  {{ tag.id + tag.fullNameZh }}
                </el-tag>
              </div>
              <el-form-item prop="listSelected" label-width="0px">
                <i-input
                  v-model="form.listSelected"
                  :readonly="true"
                  class="selector-input"
                />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="2">
            <el-form-item label-width="0px"
              ><iButton @click="handleConfirm">{{
                $t('LK_QUEDING')
              }}</iButton></el-form-item
            >
          </el-col>
        </el-row>
      </el-form>
      <iTableCustom
        :ref="'multipleTable'"
        :loading="tableLoading"
        :data="tableData"
        :columns="tableSetting"
        @handle-selection-change="handleSelectionChange"
      >
      </iTableCustom>
      <iPagination
        v-update
        @size-change="handleSizeChange($event, getList)"
        @current-change="handleCurrentChange($event, getList)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount"
      />
    </i-dialog>
  </div>
</template>

<script>
import iTableCustom from '@/components/iTableCustom'
import {
  iDialog,
  iButton,
  iPagination,
  iSearch,
  iFormItem,
  iInput,
  iSelect
} from 'rise'
import { pageMixins } from '@/utils/pageMixins'
let listSelectedByPage = new Map()
export default {
  components: {
    iTableCustom,
    iDialog,
    iButton,
    iPagination,
    iSearch,
    iFormItem,
    iInput,
    iSelect
  },
  mixins: [pageMixins],
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    searchMethod: Function,
    title: {
      type: String,
      default: function () {
        return '选择器'
      },
      required: true
    },
    filter: {
      type: Array,
      default: function () {
        return []
      },
      required: true
    },
    tableSetting: {
      type: Array,
      default: function () {
        return []
      },
      required: true
    },
    value: {
      type: Array,
      default: function () {
        return []
      },
      required: true
    },
    show: {
      type: Boolean
    }
  },
  data() {
    return {
      form: {
        listSelected: null
      },
      rules: {
        listSelected: [
          { required: true, message: '请至少选择一项', trigger: 'change' }
        ]
      },
      query: {
        current: 1,
        size: 10
      },
      tableLoading: false,
      tableData: [],
      listSelected: []
    }
  },
  computed: {
    isShow: {
      get() {
        return this.show
      },
      set(val) {
        this.$emit('update:show', val)
      }
    }
  },
  methods: {
    handleClose() {
      listSelectedByPage = new Map()
    },
    handleConfirm() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.$emit('change', this.listSelected)
          this.isShow = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetStyle() {
      const el = document.getElementsByClassName('tag-wrapper')[1]
      const inputWrapEl = document.getElementsByClassName('selector-input')[0]
      const inputEl = document
        .getElementsByClassName('selector-input')[0]
        .getElementsByClassName('el-input__inner')[0]
      this.$nextTick(() => {
        const height = el.offsetHeight
        inputEl.style.height = `${height}px`
        inputWrapEl.style.height = `${height}px`
      })
    },
    handleTagClose(tag) {
      let listSelected = _.cloneDeep(this.listSelected)
      listSelected = listSelected.filter((item) => {
        return item.id !== tag.id
      })
      for (let [key, value] of listSelectedByPage.entries()) {
        const arr = value.filter((v) => {
          return v.id !== tag.id
        })
        listSelectedByPage.set(key, arr)
      }
      this.listSelected = _.cloneDeep(listSelected)
      this.form.listSelected = this.listSelected?.join(',')
      this.resetStyle()
      this.toggleSelection()
    },
    toggleSelection() {
      const ids = listSelectedByPage.get(this.page.currPage)?.map((item) => {
        return item.id
      })
      const arr = []
      const arrUn = []
      const rows = arr
      const rowSUn = arrUn
      this.tableData.forEach((data) => {
        if (ids?.includes(data.id)) {
          arr.push(data)
        } else {
          arrUn.push(data)
        }
      })

      if (rows && rows.length) {
        rows.forEach((row) => {
          this.$nextTick(() => {
            this.$refs.multipleTable.toggleRowSelection(row, true)
          })
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }

      if (rowSUn && rowSUn.length) {
        rowSUn.forEach((row) => {
          this.$nextTick(() => {
            this.$refs.multipleTable.toggleRowSelection(row, false)
          })
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      if (val && val.length) {
        const listSelected = _.cloneDeep(this.listSelected)
        listSelectedByPage.set(this.page.currPage, val)
        let arr = []
        for (let value of listSelectedByPage.values()) {
          arr = arr.concat(value)
        }
        const arrIds = arr.map((li) => {
          return li.id
        })
        listSelected.forEach((item) => {
          if (!arrIds.includes(item.id)) {
            arr.push(item)
          }
        })
        this.listSelected = _.cloneDeep(arr)
        this.form.listSelected = this.listSelected?.join(',')
        this.resetStyle()
      }
    },
    handleOpen() {
      this.listSelected = _.cloneDeep(this.value)
      const query = _.cloneDeep(this.query)
      this.filter.forEach((item) => {
        query[item.value] = item.initVal
      })
      this.query = _.cloneDeep(query)
      this.page.currPage = 1
      this.getList()
    },
    sure() {
      this.page.currPage = 1

      this.getList()
    },
    reset() {
      this.filter.forEach((item) => {
        this.query[item.value] = item.initVal
      })
      this.page.currPage = 1
      this.getList()
    },
    getListSelectedByPage() {
      const ids = this.listSelected.map((li) => {
        return li.id
      })
      const arr = []
      this.tableData.find((t) => {
        if (ids.includes(t.id)) {
          arr.push(t)
        }
      })
      listSelectedByPage.set(this.page.currPage, arr)
    },
    async getList() {
      this.tableLoading = true
      this.query.current = this.page.pageNo
      const res =
        typeof this.searchMethod === 'function'
          ? await this.searchMethod(this.query)
          : ''
      this.tableLoading = false
      if (res.code === '200' && res?.data) {
        this.tableData = res.data
        this.page.totalCount = res.total
        this.page.pageSize = res.pageSize
        this.getListSelectedByPage()
        this.toggleSelection()
      }
    }
  }
}
</script>

<style lang="scss">
.role-selector {
  .el-dialog__body {
    padding-bottom: 35px !important;
    .selector-form {
      .el-form-item {
        margin-bottom: 0;
      }
    }
    .listSelected-wrapper {
      position: relative;
      .tag-wrapper {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        overflow: auto;
        max-height: 130px;
      }
      .el-input .el-input__inner {
        color: transparent;
        z-index: 0;
      }
    }
  }
  .el-table__body-wrapper {
    height: 250px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .card {
    box-shadow: none;
    .cardBody {
      padding: 0;
    }
  }
}
</style>
