<template>
  <iDialog
    title="选择代理人"
    :visible.sync="dialogFormVisible"
    width="80%"
    @close="onClose"
  >
    <div class="choose-position">
      <div class="form-panel">
        <el-form inline label-position="top">
          <iFormItem :label="language('员工编号')">
            <iInput :placeholder="language('请输入')" v-model="form.staffNo" />
          </iFormItem>
          <iFormItem :label="language('姓名')">
            <iInput :placeholder="language('请输入')" v-model="form.name" />
          </iFormItem>
          <iFormItem :label="language('所属部门')">
            <iInput :placeholder="language('请输入')" v-model="form.dept" />
          </iFormItem>
        </el-form>
        <div class="form-button">
          <iButton @click="search">{{ $t('POSITION.QUERY') }}</iButton>
          <iButton @click="reset">{{ $t('POSITION.RESET') }}</iButton>
        </div>
      </div>
      <div class="divider"></div>

      <div class="selecteds">
        <div class="selected-tags">
          <div
            class="tag"
            v-for="(item, index) in selectedTableData"
            :key="item.id"
          >
            {{ item.fullNameZh }}
            <span
              class="el-icon-close btn-close"
              @click="removeTag(item, index)"
            >
            </span>
          </div>
        </div>
        <div class="confirm-button">
          <iButton @click="save">{{ language('确定') }}</iButton>
        </div>
      </div>

      <div class="table-data">
        <iTableCustom
          :loading="loading"
          :data="tableData"
          :columns="tableColumns"
          ref="positionTable"
          @handle-selection-change="handleSelectionChange"
          @select="handleSelectedRow"
        />
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
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
import { iDialog, iButton, iInput, iFormItem, iPagination } from 'rise'
import {
  CHOOSE_STAFF_COLUMNS,
  TEST_STAFF_DATA,
  CHOOSE_STAFF_SEARCH_FORM
} from './data'
import iTableCustom from '@/components/iTableCustom'
import { pageMixins } from '@/utils/pageMixins'
export default {
  name: 'chooseStaff',
  mixins: [pageMixins],
  components: {
    iDialog,
    iButton,
    iInput,
    iFormItem,
    iTableCustom,
    iPagination
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      form: { ...CHOOSE_STAFF_SEARCH_FORM },
      tableColumns: CHOOSE_STAFF_COLUMNS,
      selectedTableData: [],
      loading: false,
      tableData: TEST_STAFF_DATA
    }
  },
  watch: {
    visible() {
      this.dialogFormVisible = this.visible
    }
  },
  created() {
    this.dialogFormVisible = this.visible
    this.query()
  },
  methods: {
    onClose() {
      this.$emit('close')
    },
    reset() {
      this.form = { ...CHOOSE_STAFF_SEARCH_FORM }
      this.page.currPage = 1
      this.query()
    },
    search() {
      this.page.currPage = 1
      this.query()
    },
    handleSelectedRow(row) {
      this.selectedTableData = [row]
      this.$emit('success', this.selectedTableData)
    },
    handleSelectionChange(val) {
      this.selectedTableData = val
    },
    save() {
      this.$emit('success', this.selectedTableData)
    },
    removeTag(item, index) {
      this.$refs.positionTable.toggleRowSelection(item, false)
      this.selectedTableData.splice(index, 1)
    },
    async query() {}
  }
}
</script>

<style lang="scss" scoped>
.choose-position {
  overflow: hidden;
  padding-left: 5px;
  ::v-deep .el-form-item {
    margin-bottom: 0px;
    width: 220px;
    margin-right: 68px;
  }
  ::v-deep .el-form-item__label {
    line-height: inherit;
    padding-bottom: 6px;
    font-size: 14px;
  }
  ::v-deep .el-form-item__content {
    font-size: 14px;
    line-height: inherit;
  }
  .form-panel {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 20px;
  }
  .divider {
    border: 1px solid #e3e3e3;
    margin-bottom: 20px;
  }
  .table-data {
    margin-bottom: 30px;
  }
  .selected-tags {
    margin: 0 0 20px 0px;
    .tag {
      height: 30px;
      line-height: 30px;
      padding: 0px 10px;
      border-radius: 15px;
      background: #f7f7f7;
      display: inline-block;
      margin-right: 20px;
      font-size: 14px;
      color: #41434a;
      .btn-close {
        color: #acacac;
        font-size: 10px;
        &:hover {
          color: #000;
        }
      }
    }
  }

  .selecteds {
    display: flex;
    justify-content: space-between;

    .selected-tags {
      width: calc(100% - 160px);
      border: solid 1px rgba(0, 38, 98, 0.15);
      padding: 5px;
      border-radius: 5px;
      height: 40px;
    }
    margin-bottom: 20px;
  }
}
</style>
