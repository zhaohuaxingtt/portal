<template>
  <iDialog :visible="visible" width="80%" @close="close">
    <div class="choose-org">
      <pageHeader class="margin-bottom20">
        {{ $t('APPROVAL.TRANSFER_PERSON') }}
      </pageHeader>
      <div class="search-panel">
        <el-form inline @submit.native.prevent @keyup.enter.native="search">
          <iFormItem :label="$t('APPROVAL.STAFF_NO')">
            <iInput
              :placeholder="$t('APPROVAL.PLEASE_INPUT')"
              v-model="formData.userNum"
            />
          </iFormItem>
          <iFormItem :label="$t('APPROVAL.STAFF_NAME')">
            <iInput
              :placeholder="$t('APPROVAL.PLEASE_INPUT')"
              v-model="formData.nameZh"
            />
          </iFormItem>
          <iFormItem :label="$t('APPROVAL.STAFF_DEPARTMENT')">
            <iSelect
              :placeholder="$t('APPROVAL.PLEASE_INPUT')"
              :filter-method="deptId"
              filterable
              :loading="loading"
              v-model="formData.deptId"
            >
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.nameZh"
                :value="item.id"
              >
              </el-option>
            </iSelect>
          </iFormItem>
        </el-form>
        <el-form>
          <iFormItem>
            <iButton @click="search">查询</iButton>
            <iButton @click="reset">重置</iButton>
          </iFormItem>
        </el-form>
      </div>
      <div class="divider"></div>
      <div class="seleted-box">
        <div class="selected-tags">
          <div class="tag" v-for="(item, index) in selectedRows" :key="item.id">
            {{ item.userNum }} {{ item.nameZh }}
            <span
              class="el-icon-close btn-close"
              @click="removeTag(item, index)"
            >
            </span>
          </div>
        </div>
        <iButton
          :disabled="selectedRows.length !== 1"
          :loading="tansferLoading"
          @click="save"
        >
          {{ $t('APPROVAL.OK') }}
        </iButton>
      </div>
      <i-table-custom
        :loading="tableLoading"
        ref="transferTable"
        :data="tableData"
        :columns="tableColumns"
        @handle-selection-change="handleSelectionChange"
      />
      <iPagination
        v-update
        @size-change="handleSizeChange($event, query)"
        @current-change="handleCurrentChange($event, query)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount"
      />
    </div>
  </iDialog>
</template>

<script>
import {
  iDialog,
  iInput,
  iSelect,
  iFormItem,
  iButton,
  iMessage,
  iPagination
} from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import pageHeader from '@/components/pageHeader'
import iTableCustom from '@/components/iTableCustom'
import { getDeptDropDownList } from '@/api/usercenter'
import { transferTask } from '@/api/duty'
import { TRANSFER_TABLE_COLUMNS } from './data'
import { getPageListByParams } from '@/api/authorityMgmt'
export default {
  components: {
    iDialog,
    iInput,
    iSelect,
    iFormItem,
    iButton,
    iPagination,
    pageHeader,
    iTableCustom
  },
  props: {
    visible: {
      type: Boolean
    },
    taskId: {
      type: String
    }
  },
  mixins: [pageMixins],
  data() {
    return {
      loading: false,
      options: [],
      formData: {
        userNum: '',
        nameZh: '',
        deptId: ''
      },
      tableLoading: false,
      tableColumns: [...TRANSFER_TABLE_COLUMNS],
      tableData: [],
      selectedRows: [],
      tansferLoading: false
    }
  },
  methods: {
    init() {
      this.getDeptDropDownList()
      this.query()
    },
    getDeptDropDownList() {
      getDeptDropDownList({}).then(res => {
        if (res.code === '200') {
          this.options = res.data
        }
      })
    },
    async query() {
      this.tableLoading = true
      let params = Object.assign(
        {
          current: this.page.currPage,
          size: this.page.pageSize
        },
        this.formData
      )
      const res = await getPageListByParams(params).finally(() => {
        this.tableLoading = false
      })
      this.tableData = res.data
      this.page.totalCount = res.total
    },
    async save() {
      this.tansferLoading = true
      let res = await transferTask(this.targetUserId, this.taskId).finally(
        () => (this.tansferLoading = false)
      )
      if (res.data) {
        iMessage.success('转派成功')
        this.close()
      }
    },
    filterMethod() {},
    close() {
      this.formData = {
        userNum: '',
        userName: '',
        deptId: ''
      }
      this.tableData = []
      // this.$emit('update:visible', false)
      this.$emit('success')
    },
    search() {
      this.page.currPage = 1
      this.query()
    },
    reset() {
      this.formData = {
        userNum: '',
        userName: '',
        deptId: ''
      }
      this.query()
    },
    handleSelectionChange(val) {
      this.selectedRows = val
      if (val.length) this.targetUserId = val[0].id
    },
    removeTag(item, index) {
      this.selectedRows.splice(index, 1)
      this.$refs.transferTable.toggleRowSelection(item, false)
    }
  }
}
</script>

<style lang="scss" scoped>
.choose-org {
  padding-bottom: 20px;
  min-height: 500px;
  .search-panel,
  .search-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .divider {
    border: 1px solid #e3e3e3;
    margin-bottom: 20px;
  }
  .seleted-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 20px 0px;
  }
  .selected-tags {
    flex: 1;
    border: solid 1px #e3e3e3;
    padding: 5px;
    border-radius: 5px;
    margin-right: 20px;
    min-height: 36px;
    box-sizing: border-box;
    .tag {
      height: 24px;
      line-height: 24px;
      padding: 0px 10px;
      border-radius: 15px;
      background: #f7f7f7;
      display: inline-block;
      margin-right: 20px;
      font-size: 12px;
      color: #41434a;
      .btn-close {
        color: #acacac;
        font-size: 10px;
        border-radius: 50%;
        cursor: pointer;
        &:hover {
          color: #fff;
          background: $color-blue;
        }
      }
    }
  }
}
</style>
