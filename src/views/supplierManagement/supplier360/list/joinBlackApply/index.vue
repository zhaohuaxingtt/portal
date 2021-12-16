<!--
 * @Author: caopeng
 * @Date: 2021-010-22
-->
<template>
  <div>
    <div :class="ifSelf?'page':''">
      <div v-if="ifSelf" class="headerTitle">
        <p>{{ language('JIARUHEIMINGDANSHENQINGSHENGCHANCAIGOU', '加入黑名单申请 - 生产采购') }}</p>
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
 <div :class="ifSelf?'cardBox':''" :style="ifSelf?'margin-top:20px':''">

      <iCard >
        <el-form inline label-position="left" label-width="120px">
          <div class="formTitle">
            <el-form-item
              :label="language('GONGYINGSHANGMINGCHENG', '供应商名称')"
            >
              <iText style="min-width:240px">{{data.nameZh}}</iText>
            </el-form-item>
            <el-form-item :label="language('SHOUKONGCUOSHI', '受控措施')">
              <iText style="width:240px">{{data.measures}}</iText>
            </el-form-item>
            <el-form-item
              :label="language('SHOUKONGQIZHISHIJIAN', '受控起止时间')"
            >
              <iText style="width:240px"
                >{{data.startTime.replace(/-/g, '/')
                }}-{{data.endTime.replace(/-/g, '/')}}</iText
              >
            </el-form-item>
          </div>

          <div>
            <p>   {{ language('JIARUHEIMINGDANYUANYIN', '加入黑名单原因') }}</p>
            <div class="remark">
              {{data.reason}}
            </div>
          </div>
        </el-form>
      </iCard>
      <iCard style="margin-top:20px">
        <p class="tableTitle">   {{ language('XIANGQINGLIEBIAO', '详情列表') }}</p>
        <table-list
          style="margin-top:20px"
          :tableData="tableListData"
          :selection="false"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          @handleSelectionChange="handleSelectionChange"
          :index="true"
        >
          <template #stuffNameEnDe="scope">
            <span>{{scope.row.stuffName}}-{{scope.row.stuffNameDe}}</span>
          </template>
        </table-list>
        <iPagination
          v-update
          @size-change="handleSizeChange($event, getListArr)"
          @current-change="handleCurrentChange($event, getListArr)"
          background
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :current-page="page.currPage"
          :total="page.totalCount"
        />
      </iCard>
 </div>

    </div>
  </div>
</template>

<script>
import { pageMixins } from '@/utils/pageMixins'
import tableList from '@/components/commonTable'
import { tableTitle } from './data'
import {  iCard, iButton, iText, iPagination, iMessage } from 'rise'
import {
  supplierBlackListAudit,
  supplierBlackListAuditPage,
  blackApprove
} from '@/api/supplier360/blackList'
export default {
  mixins: [pageMixins],
  components: {
    iCard,
    iButton,
    iText,
    iPagination,
    tableList
  },
  data() {
    return {
      tableLoading: true,
      tableTitle: tableTitle,
      data: {},
      tableListData: [],
      ifSelf: true
    }
  },
   updated() {
       var tbody = window.document.getElementById('appRouterView')
        var height = tbody.clientHeight
        console.log(height)
        window.parent.postMessage({ key: 'setFormHeight', value: height+'px'},'*')
   },
  created() {
    if (window.top === window.self) {
      this.ifSelf = true
    } else {
      this.ifSelf = false
    }
    console.log(window.top === window.self)
    this.getListData()
    this.getListArr()
  },

  methods: {
    getListData() {
      let params = {
        id: this.$route.query.id
      }
      supplierBlackListAudit(params).then((res) => {
        if (res && res.code == 200) {
          this.data = res.data || {
            nameZh: '',
            measures: '',
            startTime: '',

            endTime: ''
          }
        } else iMessage.error(res.desZh)
      })
    },
    getListArr() {
      this.tableLoading = true
      let params = {
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        id: this.$route.query.id,
        supplierId: this.$route.query.supplierId,
        auditType: 1
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
        auditType: 1
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
::v-deep .el-form--inline .el-form-item {
  // margin-right: 50px;
}
.cardBox{
  height: 88vh;
  overflow-y: auto;
  padding-bottom: 20px;
}
.page {
  padding: 30px 40px 30px 40px;

}
.remark {
  word-wrap: break-word;
  word-break: break-all;
  background: #f8f8fa;
  border-radius: 6px;
  width: 100%;
  height: 90px;
  margin-top: 20px;
  text-align: left;
  padding: 4px 10px;
}
.tableTitle {
  font-size: 18px;
  font-family: Arial;
  font-weight: bold;
  color: #000000;
}
.formTitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
