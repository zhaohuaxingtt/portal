<!--
 * @Author: caopeng
 * @Date: 2021-010-18 
-->
<template>
  <iDialog @close="closeDiolog()"
           :visible.sync="value"
           :title="'供应商⿊名单记录 - ⼀般采购  -'+ clickTableList.nameZh"
           width="85%">
    <div class="box">
      <el-tabs class="tabsHeader"
               type="card"
               style="margin-left:20px;"
               v-model="tabVal"
               @tab-click="changeTab">
        <el-tab-pane name="1"
                     :label="
            language('GONGYINGSHANGHEIMINGDANZHUANGTAI', '供应商⿊名单状态')
          ">
        </el-tab-pane>
        <el-tab-pane name="2"
                     :label="language('GONGYINGSHANGHEIMINGDANJILU', '供应商⿊名单记录')">
        </el-tab-pane>
      </el-tabs>
      <div class="dilogHeader"
           v-if="tabVal == 2">
        <el-form inline
                 label-position="top">
          <el-form-item style="width:240px"
                        :label="language('SHOUKONGYEWULEIXING', '受控业务类型')">
            <iSelect :placeholder="$t('APPROVAL.PLEASE_CHOOSE')"
                     v-model="form.type">
              <el-option v-for="item in typeList"
                         :key="item.code"
                         :label="item.message"
                         :value="item.code">
              </el-option>
            </iSelect>
          </el-form-item>
          <el-form-item style="width:240px"
                        :label="language('SHOUKONGQIZHISHIJIAN', '受控起止时间')">

            <iDatePicker type="daterange"
                         :range-separator="$t('SUPPLIER_ZHI')"
                         :placeholder="''"
                         v-model="daterange"
                         value-format="yyyy-MM-dd"
                         clearable />
          </el-form-item>
        </el-form>
        <div style="margin-bottom:10px">
          <iButton @click="sure">{{ language('CHAXUN', '查询') }}</iButton>
          <iButton @click="clickReset">{{
            language('CHONGZHI', '重置')
          }}</iButton>
        </div>
      </div>
      <p class="tableTitle">
        详情列表
      </p>
      <table-list v-if="tabVal == 1"
                  style="margin-top:20px"
                  :tableData="tableListData"
                  :tableTitle="tableTitleGpBlackList"
                  :tableLoading="tableLoading"
                  :index="true"
                  :selection="false">
      </table-list>
      <table-list v-if="tabVal == 2"
                  style="margin-top:20px"
                  :tableData="tableListDataRecord"
                  :tableTitle="tableTitleGpBlackListRecord"
                  :tableLoading="tableLoadingRecord"
                  :index="true"
                  :selection="false">
      </table-list>
      <iPagination style="margin-top:20px"
                   v-if="tabVal == 2"
                   v-update
                   @size-change="handleSizeChange($event, sure)"
                   @current-change="handleCurrentChange($event, getListRecord)"
                   background
                   :page-sizes="page.pageSizes"
                   :page-size="page.pageSize"
                   :layout="page.layout"
                   :current-page="page.currPage"
                   :total="page.totalCount" />
    </div>
  </iDialog>
</template>

<script>
import {
  measuresTypeList,
  gpSupplerBlackListHistoryPage,
  gpSupplerBlackListStatus,
} from '@/api/supplier360/blackList'
import { pageMixins } from '@/utils/pageMixins'
import { tableTitleGpBlackList, tableTitleGpBlackListRecord } from './data'
import tableList from '@/components/commonTable'
import {
  iButton,
  iDatePicker,
  iSelect,
  iMessage,
  iPagination,
  iDialog
} from 'rise'
export default {
  mixins: [pageMixins],
  props: {
    clickTableList: { type: Object },
    value: {
      type: Boolean,
      default: false
    }
  },
  components: {
    iButton,
    tableList,
    iDatePicker,
    iSelect,
    iPagination,
    iDialog
  },
  data() {
    return {
      tableLoading: false,
      tableLoadingRecord: false,
      form: {},
      processingList: [],
      tableTitleGpBlackList: tableTitleGpBlackList,
      tableTitleGpBlackListRecord: tableTitleGpBlackListRecord,
      tableListData: [],
      tableListDataRecord: [],
      selectTableData: [],
      typeList: [],
      daterange: [],
      tabVal: '1'
    }
  },
  created() {
    // this.$nextTick(() => {
    this.getList()
    this.getTypeList()
    // })
  },
  computed: {},
  methods: {
    //状态
    getTypeList() {
      let params = {
        supplierType: this.tabVal
      }
      measuresTypeList(params).then((res) => {
        if (res && res.code == 200) {
          this.typeList = res.data
        }
      })
    },
    getList() {
      this.tableLoading = true
      const params = {
        supplierId: this.clickTableList.subSupplierId
      }
      gpSupplerBlackListStatus(params).then((res) => {
        if (res && res.code == 200) {
          this.tableLoading = false
          this.tableListData = res.data
        } else iMessage.error(res.desZh)
      })
    },
    getListRecord() {
      this.tableLoadingRecord = true
      const params = {
        supplierId: this.clickTableList.subSupplierId,
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        endTime: this.daterange[1],
        startTime: this.daterange[0],
        ...this.form
      }
      gpSupplerBlackListHistoryPage(params).then((res) => {
        if (res && res.code == 200) {
          this.page.totalCount = res.total
          this.tableLoadingRecord = false
          this.tableListDataRecord = res.data
        } else iMessage.error(res.desZh)
      })
    },
    changeTab() {
      if (this.tabVal == 1) {
        this.getList()
      } else {
        this.getListRecord()
      }
    },
    sure() {
      this.page.currPage = 1
       this.page.pageSize = 10
      this.getListRecord()
    },
    clickReset() {
      this.page.currPage = 1
       this.page.pageSize = 10
      this.form.type = ''
      this.daterange = []
      this.getListRecord()
    },
    // 关闭弹窗
    closeDiolog() {
      this.$emit('closeDiolog')
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  padding-bottom: 20px;
}
.header {
  display: flex;
  justify-content: flex-end;
}
.tableTitle {
  font-size: 18px;
  font-family: Arial;
  font-weight: bold;
  color: #000000;
  padding: 20px 0 30px;
}
.dilogHeader {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  border-bottom: 1px solid #e3e3e3;
  padding-bottom: 30px;
  margin-bottom: 10px;
}
::v-deep .el-form--inline .el-form-item {
  margin-right: 30px;
}
.tabsHeader {
  margin-left: 0 !important;
  ::v-deep .el-tabs__item.is-active {
    font-weight: bold;
    background: #ffffff;
    opacity: 1;
  }
  ::v-deep .el-tabs__item {
    border: none;
    font-weight: 500;
    background: #f5f6f7;
    border-radius: 0px 10px 10px 0px;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.08);
    font-size: 16px;
    width: 200px;
    height: 35px;
    line-height: 35px;
  }
  ::v-deep .el-tabs__nav {
    border: none !important;
  }
  ::v-deep .el-tabs__nav {
    background: transparent;
    border: none;
    padding: 10px 0;
  }
  ::v-deep .el-tabs__item:focus.is-active.is-focus:not(:active) {
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  ::v-deep .el-tabs__header {
    border: none;
  }
  ::v-deep .el-tabs__item:first-child {
    border-radius: 10px 0px 0px 10px;
  }
}
v::v-deep .el-tabs__nav-wrap::after {
  height: 0 !important;
}
v::v-deep .el-tabs__nav-wrap:hover {
  font-weight: bold;
}
</style>
