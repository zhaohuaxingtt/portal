<template>
  <iDialog
    title="添加默认处理岗位"
    :visible.sync="dialogFormVisible"
    width="80%"
    @close="onClose"
  >
    <div class="choose-position">
      <div class="form-panel">
        <el-form inline label-position="top">
          <iFormItem :label="language('岗位名称')">
            <iInput :placeholder="language('请输入')" v-model="form.postCode" />
          </iFormItem>
          <iFormItem :label="language('岗位编码')">
            <iInput :placeholder="language('请输入')" v-model="form.postName" />
          </iFormItem>
          <iFormItem :label="language('岗位人员')">
            <iInput :placeholder="language('请输入')" v-model="form.postUser" />
          </iFormItem>
        </el-form>
        <div class="form-button">
          <iButton @click="search">{{ language('查询') }}</iButton>
          <iButton @click="reset">{{ language('重置') }}</iButton>
        </div>
      </div>
      <div class="divider"></div>
      <div class="form-panel">
        <el-form inline label-position="top">
          <iFormItem :label="language('相关岗位')">
            <iSelect
              :placeholder="language('请选择')"
              v-model="form.relationPost"
            />
          </iFormItem>
          <iFormItem :label="language('组织级别')">
            <iSelect
              :placeholder="language('请选择')"
              v-model="form.choosePositionRelation"
            />
          </iFormItem>
        </el-form>
        <div class="form-button">
          <iButton @click="save">{{ language('确定') }}</iButton>
        </div>
      </div>
      <div class="selected-tags">
        <div
          class="tag"
          v-for="(item, index) in selectedTableData"
          :key="item.id"
        >
          {{ item.positionCode }} {{ item.positionName }}
          <span class="el-icon-close btn-close" @click="removeTag(item, index)">
          </span>
        </div>
      </div>

      <div class="table-data">
        <iTableCustom
          :data="choosePositionTable"
          :columns="choosePositionColumns"
          ref="positionTable"
          @handle-selection-change="handleSelectionChange"
        />
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <iPagination
        v-update
        @size-change="handleSizeChange($event, getTableList)"
        @current-change="handleCurrentChange($event, getTableList)"
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
import { iDialog, iSelect, iButton, iInput, iFormItem, iPagination } from 'rise'
import {
  choosePositionForm,
  choosePositionRelation,
  choosePositionColumns,
  choosePositionTable
} from './data'
import iTableCustom from '@/components/iTableCustom'
import { pageMixins } from '@/utils/pageMixins'
export default {
  name: 'choosePosition',
  mixins: [pageMixins],
  components: {
    iDialog,
    iButton,
    iInput,
    iFormItem,
    iSelect,
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
      form: { ...choosePositionForm },
      formRelation: { ...choosePositionRelation },
      choosePositionColumns,
      choosePositionTable,
      selectedTableData: []
    }
  },
  watch: {
    visible() {
      this.dialogFormVisible = this.visible
    }
  },
  created() {
    this.dialogFormVisible = this.visible
  },
  methods: {
    onClose() {
      this.$emit('close')
    },
    reset() {
      this.form = { ...choosePositionForm }
    },
    search() {},
    handleSelectionChange(val) {
      this.selectedTableData = val
    },
    save() {
      const childWindow = document.getElementById('flowDesign').contentWindow
      const xml = childWindow.xmlToParent()
      console.log('xml', xml)
      childWindow.positionToChild(this.selectedTableData)
      this.$emit('success')
    },
    removeTag(item, index) {
      this.selectedTableData.splice(index, 1)
      this.$refs.positionTable.toggleRowSelection(item, false)
    }
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
}
</style>
