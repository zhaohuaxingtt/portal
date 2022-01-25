<template>
  <iCard class="margin-top20">
    <div class="flex-end-center margin-bottom20">
      <iButton
        @click="add"
        v-permission="'BUTTON_MATERIEL_DATA_MTZ_GROUP_RAW_ADD'"
      >
        {{ language('新建') }}
      </iButton>
      <iButton
        :loading="updateLoading"
        :disabled="activeSta"
        @click="changeStatus(1)"
        v-permission="'BUTTON_MATERIEL_DATA_MTZ_GROUP_RAW_ACTIVE'"
      >
        {{ language('生效') }}
      </iButton>
      <iButton
        :loading="updateLoading"
        :disabled="loseAcSta"
        @click="changeStatus(0)"
        v-permission="'BUTTON_MATERIEL_DATA_MTZ_GROUP_RAW_DISACTIVE'"
      >
        {{ language('失效') }}
      </iButton>
      <iButton
        :disabled="selectedRows.length !== 1"
        @click="viewRelation"
        v-permission="'BUTTON_MATERIEL_DATA_MTZ_GROUP_RAW_VIEW_RELATION'"
      >
        {{ language('查看关联关系') }}
      </iButton>
      <button-download
        :download-method="exportExcel"
        v-permission="'BUTTON_MATERIEL_DATA_MTZ_GROUP_RAW_EXPORT'"
      />
    </div>
    <i-table-custom
      :loading="tableLoading"
      :data="tableData"
      :columns="tableColumns"
      min-height="328px"
      @go-detail="handleGoDetail"
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
  </iCard>
</template>

<script>
import iTableCustom from '@/components/iTableCustom'
import { iCard, iPagination, iButton, iMessage } from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import {
  fetchGroupList,
  batchUpdateStatus,
  exportGroup
} from '@/api/materiel/mtzMaterielGroup'
import { GROUP_TABLE_COLUMNS } from './data'
export default {
  name: 'theGroupTable',
  components: { iTableCustom, iCard, iPagination, iButton },
  mixins: [pageMixins],
  data() {
    return {
      searchData: {},
      tableLoading: false,
      activeSta: true,
      loseAcSta: true,
      tableData: [],
      tableColumns: GROUP_TABLE_COLUMNS,
      selectedRows: [],
      detailUrl: '/portal/#/materielData/MTZ-materiel-group/detail',
      updateLoading: false,
      exportLoading: false
    }
  },
  created() {
    this.query()
  },
  methods: {
    add() {
      window.open(this.detailUrl)
    },
    changeStatus(val) {
      const data = this.selectedRows.map((e) => {
        return { [e.id]: val }
      })
      this.updateLoading = true
      batchUpdateStatus(data)
        .then((res) => {
          if (res.result) {
            iMessage.success(res.desZh || '更新成功')
            this.query()
          } else {
            iMessage.error(res.desZh || '更新失败')
          }
        })
        .catch((err) => {
          iMessage.error(err.desZh || '更新失败')
        })
        .finally(() => {
          this.updateLoading = false
        })
    },
    viewRelation() {
      const { id, materialGroupCode } = this.selectedRows[0]
      window.open(
        `/portal/#/materielData/MTZ-materiel-group/relation?id=${id}&code=${materialGroupCode}`
      )
    },
    exportExcel() {
      return exportGroup(this.searchData)
    },
    handleGoDetail(row) {
      window.open(
        `${this.detailUrl}?id=${row.id}&code=${row.materialGroupCode}`
      )
    },
    handleSelectionChange(val) {
      this.selectedRows = val
      let activeLength = ''
      let loseAcLength = ''
      if (val) {
        activeLength = val.filter((item) => {
          return item.statusDesc == '有效'
        }).length
        loseAcLength = val.filter((item) => {
          return item.statusDesc == '无效'
        }).length
      }
      if (activeLength == val.length) {
        this.loseAcSta = false
      } else {
        this.loseAcSta = true
      }
      if (loseAcLength == val.length) {
        this.activeSta = false
      } else {
        this.activeSta = true
      }
    },
    search(val) {
      this.page.currPage = 1
      this.page.totalCount = 0
      this.searchData = { ...val }
      this.query()
    },
    async query() {
      const requestData = {
        ...this.searchData,
        current: this.page.currPage,
        size: this.page.pageSize
      }
      this.tableLoading = true
      const res = await fetchGroupList(requestData).finally(
        () => (this.tableLoading = false)
      )
      this.tableData = res.data || []
      this.page.totalCount = res.total
      this.page.pageSize = res.pageSize
    }
  }
}
</script>

<style lang="scss" scoped></style>
