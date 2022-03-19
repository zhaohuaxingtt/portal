<!--
 * @Author: caopeng
 * @Date: 2021-010-18 
-->
<template>
  <iDialog
    @close="closeDiolog()"
    :visible.sync="value"
    top="2%"
    :title="'供应商⿊名单记录 - ⼀般采购  -' + clickTableList.nameZh"
    width="85%"
  >
    <div slot="title" class="headerTitle">
      <span>{{
        '供应商黑名单记录 - ⼀般采购  -' + clickTableList.nameZh
      }}</span>
    </div>
    <div class="box">
      <el-tabs
        class="tabsHeader"
        type="card"
        style="margin-left: 20px"
        v-model="tabVal"
        @tab-click="changeTab"
      >
        <el-tab-pane
          name="1"
          :label="
            language('GONGYINGSHANGHEIMINGDANZHUANGTAI', '供应商黑名单状态')
          "
        >
        </el-tab-pane>
        <el-tab-pane
          name="2"
          :label="language('GONGYINGSHANGHEIMINGDANJILU', '供应商黑名单记录')"
        >
        </el-tab-pane>
      </el-tabs>
      <div class="dilogHeader" v-if="tabVal == 2">
        <el-form inline label-position="top">
          <el-form-item
            style="width: 240px"
            :label="language('SHOUKONGYEWULEIXING', '受控业务类型')"
          >
            <iSelect :placeholder="language('请选择')" v-model="form.type">
              <el-option
                v-for="item in typeList"
                :key="item.code"
                :label="item.message"
                :value="item.code"
              >
              </el-option>
            </iSelect>
          </el-form-item>
          <el-form-item
            :label="language('SHOUKONGKAISHISHIJIAN', '受控开始时间')"
          >
            <iDatePicker
              style="width: 220px"
              type="daterange"
              :range-separator="$t('SUPPLIER_ZHI')"
              :placeholder="''"
              v-model="daterange"
              value-format="yyyy-MM-dd"
              clearable
            />
          </el-form-item>
          <el-form-item :label="language('SHOUKONGJIESHUJIAN', '受控结束时间')">
            <iDatePicker
              style="width: 220px"
              type="daterange"
              :range-separator="$t('SUPPLIER_ZHI')"
              :placeholder="''"
              v-model="daterange2"
              value-format="yyyy-MM-dd"
              clearable
            />
          </el-form-item>
        </el-form>
        <div style="margin-bottom: 10px">
          <iButton @click="sure">{{ language('CHAXUN', '查询') }}</iButton>
          <iButton @click="clickReset">{{
            language('CHONGZHI', '重置')
          }}</iButton>
        </div>
      </div>
      
      <div class="header">
        <p class="tableTitle">{{ language('XIANGQINGLIEBIAO', '详情列表') }}</p>
        <div>
          <!-- <buttonTableSetting @click="$refs.tableListRef1.openSetting()" v-if="tabVal == 1"></buttonTableSetting> -->
          <!-- <buttonTableSetting @click="$refs.tableListRef2.openSetting()" v-else></buttonTableSetting> -->
        </div>
      </div>
      <div class="tableBox">
        <!-- <table-list
          v-if="tabVal == 1"
          style="margin-top: 20px"
          :tableData="tableListData"
          :tableTitle="tableTitleGpBlackList"
          :tableLoading="tableLoading"
          :index="true"
          :selection="false"
        >
        </table-list> -->

        <iTableCustom
          ref="tableListRef1"
          v-if="tabVal == 1"
          :data="tableListData"
          :columns="tableTitleGpBlackList"
          :loading="tableLoading"
        >
        </iTableCustom>

        <iTableCustom
          v-if="tabVal == 2"
          ref="tableListRef2"
          :data="tableListDataRecord"
          :columns="tableTitleGpBlackListRecord"
          :loading="tableLoadingRecord"
        >
        </iTableCustom>

        <!-- <table-list
          v-if="tabVal == 2"
          style="margin-top: 20px"
          :tableData="tableListDataRecord"
          :tableTitle="tableTitleGpBlackListRecord"
          :tableLoading="tableLoadingRecord"
          :index="true"
          :selection="false"
        >
        </table-list> -->
      </div>
      <iPagination
        style="margin-top: 20px"
        v-if="tabVal == 2"
        v-update
        @size-change="handleSizeChange($event, sure)"
        @current-change="handleCurrentChange($event, getListRecord)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.totalCount"
      />
    </div>
  </iDialog>
</template>

<script>
import {
  measuresTypeList,
  gpSupplerBlackListHistoryPage,
  gpSupplerBlackListStatus
} from '@/api/supplier360/blackList'
import { pageMixins } from '@/utils/pageMixins'
import { tableTitleGpBlackList, tableTitleGpBlackListRecord } from './data'
import tableList from '@/components/commonTable'
import buttonTableSetting from '@/components/buttonTableSetting'
import iTableCustom from '@/components/iTableCustom'
import {
  iButton,
  iDatePicker,
  iSelect,
  iMessage,
  iPagination,
  iDialog,
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
    iDialog,
    iTableCustom,
    buttonTableSetting
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
      daterange2: [],
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
        stopEndTime: this.daterange2[1],
        stopStartTime: this.daterange2[0],
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
      this.daterange2 = []
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
.headerTitle {
  font-size: 20px;
  font-family: Arial;
  font-weight: bold;
  color: #000000;
}
.tableBox {
  //   max-height: 600px;
  //   overflow-y: scroll;
}
.box {
  padding-bottom: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
    min-width: 200px;
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
