<template>
  <iCard>
    <div class="btnList">
      <iButton @click="del" :disabled="this.selectedItems.length == 0">
        {{ language('删除') }}
      </iButton>
      <iButton @click="edit" :disabled="this.selectedItems.length != 1">
        {{ language('编辑') }}
      </iButton>
      <buttonDownload :download-method="exportExcel">
        {{ language('导出') }}
      </buttonDownload>
    </div>
    <div class="tabelList">
      <iTabelCustom
        ref="N-IterList"
        :loading="loading"
        :data="tabelListData"
        :columns="NTierColumns"
        @go-detail="goDetail"
        @handle-selection-change="handleSelectionChange"
      />
      <iPagination
        v-update
        @size-change="handleSizeChange($event, getPage)"
        @current-change="handleCurrentChange($event, getPage)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount"
      />
    </div>
  </iCard>
</template>

<script>
import { iCard, iButton, iPagination } from 'rise'
import iTabelCustom from '@/components/iTableCustom'
import { pageMixins } from '@/utils/pageMixins'
import { N_ITER_COLUMNS } from './data'
import buttonDownload from '@/components/buttonDownload'
import {
  getTablePage,
  delNTierItems,
  exportNTExcel
} from '@/api/mainDataSupplier/N-Tier'
export default {
  name: 'tabelList',
  components: { iCard, iButton, iPagination, iTabelCustom, buttonDownload },
  mixins: [pageMixins],
  props: {},
  data() {
    return {
      NTierColumns: N_ITER_COLUMNS,
      tabelListData: [],
      selectedItems: [],
      loading: false,
      searchData: {}
    }
  },
  created() {
    this.search()
  },
  methods: {
    edit() {
      window.open(
        `/portal/#/mainDataSupplier/N-Tier/detail?id=${this.selectedItems[0].supplierId}`
      )
    },
    del() {
      this.$confirm('是否删除已选中选项', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let supplierIds = this.selectedItems.map((item) => {
            return item.supplierId
          })
          supplierIds = supplierIds.join(',')
          delNTierItems(supplierIds)
            .then((val) => {
              if (val.code == 200) {
                this.$message.success('删除成功')
              } else if (val.code == 2) {
                this.$message.error(val.desZh)
              }
            })
            .finally(() => {
              this.search()
            })
        })
        .catch(() => {
          this.$refs['N-IterList'].clearSelection()
        })
    },
    exportExcel() {
      return exportNTExcel(this.searchData)
    },
    goDetail(val) {
      window.open(
        `/portal/#/mainDataSupplier/N-Tier/detail?id=${val.supplierId}`
      )
    },
    handleSelectionChange(val) {
      this.selectedItems = val
    },
    search(val) {
      this.loading = true
      this.page.currPage = 1
      this.page.totalCount = 0
      this.searchData = {
        ...val
      }
      this.getPage()
    },
    async getPage() {
      const data = {
        ...this.searchData,
        current: this.page.currPage,
        size: this.page.pageSize
      }
      this.loading = true
      getTablePage(data)
        .then((result) => {
          if (result.code == 200) {
            this.tabelListData = result.data.records
            this.page.totalCount = result.data.total
          } else if (result.code == 1) {
            this.$message.error(result.desZh)
          }
        })
        .catch((err) => {
          this.$message.error(err)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.tabelList {
  margin-top: 20px;
}
.btnList {
  display: flex;
  justify-content: flex-end;
}
</style>
