<template>
  <div class="partMaterialList">
    <iCard class="margin-top20">
      <div class="button-end">
        <iButton @click="newMateriel">{{language('新建')}}</iButton>
        <iButton @click="deleteMateriel" :disabled='selectTableData.length==0'>{{language('删除')}}</iButton>
        <buttonDownload :download-method="exportMateriel">{{language('导出')}}</buttonDownload>
      </div>
      <div class="tableList margin-top20">
        <iTableCustom
          :loading="loading"
          :data="tableData"
          :columns="tableColumns"
          min-height="328px"
          @goDetail="goDetail"
          @handle-selection-change="handleSelectionChange"
        >
        </iTableCustom>
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
        >
        </iPagination>
      </div>
    </iCard>
  </div>
</template>
<script>
import { iCard, iButton, iPagination, iMessage } from 'rise'
import iTableCustom from '@/components/iTableCustom'
import { PART_MATERIAL_COLUMNS } from './data'
import { pageMixins } from '@/utils/pageMixins'
import { openUrl } from '@/utils'
import {partMaterialTableList, deleteMaterial, exportMaterial} from '@/api/materiel/partsMaterialGroup'
import buttonDownload from '@/components/buttonDownload'
export default {
  name:"partMaterialList",
  components:{iCard, iButton, iTableCustom, iPagination,buttonDownload},
  mixins: [pageMixins],
  props: {
    materialForm: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  watch: {
    materialForm() {
      this.initQuery()
    }
  },
  data() {
    return {
      tableData: [],
      tableColumns: PART_MATERIAL_COLUMNS,
      selectTableData: []
    }
  },
  created() {
    this.query()
  },
  methods: {
    newMateriel() {
      openUrl('/materielData/material-group/detail')
    },
    goDetail(row) {
      openUrl(`/materielData/material-group/detail?id=${row.id}`)
    },
    initQuery() {
      this.page.currPage = 1
      this.page.totalCount = 0
      this.query()
    },
    query() {
      this.loading = true
      const data = {
        ...this.materialForm,
        current: this.page.currPage,
        size: this.page.pageSize
      }
      partMaterialTableList(data)
        .then(res => {
          if (res.code == 200) {
            this.loading = false
            this.tableData = [...res.data]
            res.data.forEach((val, index) => {
              if (val.userInfos !== null) {
                this.tableData[index].Linie = val.userInfos[0].userName
              }
            })
            this.page.totalCount = res.total
            this.page.pageSize = res.pageSize
          }
          if (res.code == 1) {
            iMessage.error(res.desZh)
            this.loading = false
          }
        })
        .catch(err => {
          iMessage.error(err)
        })
        .finally(() => {
          this.loading = false
        })
    },
    handleSelectionChange(val) {
      this.selectTableData = val
    },
    deleteMateriel() {
      this.$confirm('是否删除已选中数据', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let ids = []
          this.selectTableData.forEach(val => {
            ids.push(val.id)
          })

          deleteMaterial(ids).then(res => {
            if (res.code == 200) {
              this.query()
              iMessage.success('删除成功')
            }
            if (res.code == 1) {
              iMessage.error(res.desZh)
            }
          })
        })
        .catch(() => {})
    },
    exportMateriel() {
      let data = this.materialForm
      for (let item in data) {
        if (data[item] == null) {
          data[item] = ''
        }
      }
      return exportMaterial(data)
    }
  }
}
</script>
<style lang="scss" scoped>
.button-end {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
