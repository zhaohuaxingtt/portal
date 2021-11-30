<template>
  <iDialog :visible="visible" width="80%" @close="$emit('close')">
    <div class="choose-org">
      <div class="search-box">
        <el-form inline>
          <iFormItem :label="language('组织机构编码')">
            <iInput
              :placeholder="language('请输入')"
              v-model="formData.deptNum"
            />
          </iFormItem>
          <iFormItem :label="language('组织机构名称')">
            <iInput
              :placeholder="language('请输入')"
              v-model="formData.nameZh"
            />
          </iFormItem>
          <iFormItem :label="language('负责人')">
            <iInput
              :placeholder="language('请输入')"
              v-model="formData.leaderName"
            />
          </iFormItem>
        </el-form>
        <div class="form-button">
          <iButton @click="search">{{ language('查询') }}</iButton>
          <iButton @click="reset">{{ language('重置') }}</iButton>
        </div>
      </div>
      <div class="divider"></div>
      <div class="seleted-box">
        <div class="selected-tags">
          <div class="tag" v-for="(item, index) in selectedRows" :key="item.id">
            {{ item.fullCode }} {{ item.nameZh }}
            <span
              class="el-icon-close btn-close"
              @click="removeTag(item, index)"
            >
            </span>
          </div>
        </div>
        <iButton :disabled="!selectButtonAble" @click="save">
          {{ $t('APPROVAL.OK') }}
        </iButton>
      </div>

      <iTableCustom
        ref="orgTable"
        max-height="400"
        row-key="id"
        child-num-visible
        :loading="loading"
        :data="tableData"
        :columns="columns"
        :tree-expand="treeExpand"
        :single-choice="singleChoice"
        min-height="300"
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
import iTableCustom from '@/components/iTableCustom'
import { organizationMenu } from '@/api/organization'
import { pageMixins } from '@/utils/pageMixins'
import { iInput, iFormItem, iDialog, iButton, iPagination } from 'rise'
export default {
  name: 'ChooseOrg',
  mixins: [pageMixins],
  components: {
    iInput,
    iFormItem,
    iTableCustom,
    iDialog,
    iButton,
    iPagination
  },
  props: {
    singleChoice: {
      type: Boolean,
      default: false
    },
    defaultSelectedId: {
      type: Number
    }
  },
  data() {
    return {
      formData: {
        deptNum: '',
        nameZh: '',
        leaderName: ''
      },
      tableData: [],
      loading: false,
      selectedRows: [],
      columns: [
        {
          type: 'selection',
          width: 50
        },
        {
          type: 'index',
          width: 50,
          label: '编号',
          i18n: 'APPROVAL.NO'
        },
        {
          prop: 'fullCode',
          label: '编码',
          i18n: 'ORGANIZATION_MANAGERMENT.ORG_LIST.TABLE_ORG_CODE',
          minWidth: '240',
          align: 'left',
          headerAlign: 'left'
        },
        {
          prop: 'nameZh',
          label: '名称',
          i18n: 'ORGANIZATION_MANAGERMENT.ORG_LIST.ORG_NAME',
          type: 'expanded',
          align: 'left',
          headerAlign: 'left',
          minWidth: '240'
        },
        {
          prop: 'shortCode',
          label: '简码',
          i18n: 'ORGANIZATION_MANAGERMENT.ORG_LIST.TABLE_ORG_SHORT_CODE'
        },
        {
          prop: 'shortName',
          label: '简称',
          i18n: 'ORGANIZATION_MANAGERMENT.ORG_LIST.TABLE_ORG_SHORT_NAME'
        },
        {
          prop: 'leadUserName',
          label: '负责人',
          i18n: 'ORGANIZATION_MANAGERMENT.ORG_LIST.TABLE_ORG_OWNER'
        }
      ],
      treeExpand: { expandKey: 'nameZh', childrenKey: 'supDeptList' },
      visible: true
    }
  },
  computed: {
    selectButtonAble() {
      if (this.singleChoice) {
        return this.selectedRows.length === 1
      }
      return this.selectedRows.length > 0
    }
  },
  created() {
    this.query(true)
  },
  methods: {
    async query(isFirst) {
      const requestData = {
        ...this.formData,
        current: this.page.currPage,
        size: this.page.pageSize
      }
      this.loading = true
      const { data, total, pageSize } = await organizationMenu(
        {},
        requestData
      ).finally(() => {
        this.loading = false
      })
      this.tableData = data
      this.page.totalCount = total
      this.page.pageSize = pageSize
      if (isFirst) {
        this.setDefaultChecked()
      }
    },
    setDefaultChecked() {
      if (this.defaultSelectedId) {
        const rows = this.tableData.filter(
          (e) => e.id === this.defaultSelectedId
        )
        // console.log('setDefaultChecked', this.defaultSelectedId, rows)
        if (rows.length > 0) {
          // console.log('selectedRows', this.selectedRows)
          // this.$refs.orgTable.toggleRowSelection(rows[0], true)
          this.selectedRows = rows
        }
      }
    },
    search() {
      this.page.currPage = 1
      this.page.totalCount = 0
      this.query()
    },

    reset() {
      this.formData = {
        orCode: '',
        name: '',
        orName: ''
      }
    },
    handleSelectionChange(val) {
      this.selectedRows = val
    },
    removeTag(item, index) {
      this.selectedRows.splice(index, 1)
      this.$refs.orgTable.toggleRowSelection(item, false)
    },
    save() {
      this.$emit('select', this.selectedRows)
    }
  }
}
</script>

<style lang="scss" scoped>
.choose-org {
  padding-bottom: 40px;
  min-height: 500px;
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
