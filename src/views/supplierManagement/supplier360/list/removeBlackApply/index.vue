<!--
 * @Author: caopeng
 * @Date: 2021-010-22 
-->
<template>
  <div>
    <div :class="ifSelf?'page':''">
      <div class="headerTitle"  v-if="ifSelf">
        <p>移除黑名单申请 - 生产采购</p>
        <div>
          <iButton @click="handleBtn(2)">{{
            language('PIZHUN', '批准')
          }}</iButton>
          <iButton @click="handleBtn(3)">{{
            language('JUJUE', '拒绝')
          }}</iButton>
          <!-- <iButton @click="handleExportCurrent">{{
            language('BUCHONGCAILIAO', '补充材料')
          }}</iButton> -->
        </div>
      </div>

      <iCard :style="ifSelf?'margin-top:20px':''">
        <p class="tableTitle">{{supplierName}}</p>
        <table-list style="margin-top:20px"
                    :tableData="tableListData"
                    :tableTitle="tableTitle"
                    :tableLoading="tableLoading"
                    :selection="false"
                    @handleSelectionChange="handleSelectionChange"
                    :index="true">
                      <template #stuffNameEnDe='scope'>
                        <span>{{scope.row.stuffName}}-{{scope.row.stuffNameDe}}</span>
                    </template>
        </table-list>
        <iPagination v-update
                     @size-change="handleSizeChange($event, getTableList)"
                     @current-change="handleCurrentChange($event, getTableList)"
                     background
                     :page-sizes="page.pageSizes"
                     :page-size="page.pageSize"
                     :layout="page.layout"
                     :current-page="page.currPage"
                     :total="page.totalCount" />
      </iCard>
    </div>
  </div>
</template>

<script>
import { pageMixins } from '@/utils/pageMixins'
import tableList from '@/components/commonTable'
import { tableTitle } from './data'
import { iCard, iButton, iPagination, iMessage } from 'rise'
import {
  supplierBlackListAuditPage,
  blackApprove,
  getSupplerInfo
} from '@/api/supplier360/blackList'
export default {
  mixins: [pageMixins],
  components: {
    iCard,
    iButton,
    iPagination,
    tableList,
  },
  data() {
    return {
      tableLoading: true,
      tableTitle: tableTitle,
      supplierName: '',
      tableListData: [],
      ifSelf: true

    }
  },
  created() {
        if (window.top === window.self) {
      this.ifSelf = true
    } else {
      this.ifSelf = false
    }
    this.getListArr()
    this.getSupplierName()
  },

  methods: {
    getSupplierName() {
      getSupplerInfo({ supplierId: this.$route.query.supplierId }).then(
        (res) => {
          this.supplierName = res.data.nameZh
        }
      )
    },

    getListArr() {
      this.tableLoading = true
      let params = {
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        id: this.$route.query.id,
        supplierId: this.$route.query.supplierId,
        auditType: 2
      }
      supplierBlackListAuditPage(params).then((res) => {
        if (res && res.code == 200) {
          this.tableListData = res.data
          this.page.totalCount = res.total
          this.tableLoading = false
        } else iMessage.error(res.desZh)
      })
    },
    handleBtn(val) {
      let params = {
        auditStatus: val,
        id: this.$route.query.id,
        supplierId: this.$route.query.supplierId,
        auditType: 2
      }
      blackApprove(params).then((res) => {
        if (res && res.code == 200) {
          this.data = res.data
          iMessage.success(res.desZh)
        } else iMessage.error(res.desZh)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page{
     padding: 30px 40px 30px 40px;
}
.tableTitle {
  font-size: 18px;
  font-family: Arial;
  font-weight: bold;
  color: #000000;
}

.headerTitle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    font-size: 20px;
    font-family: Arial;
    font-weight: bold;
    color: #000000;
  }
}
</style>
