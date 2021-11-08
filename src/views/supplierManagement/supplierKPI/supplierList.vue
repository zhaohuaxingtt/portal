<!--
 * @Author: youyuan
 * @Date: 2021-08-06 14:46:27
 * @LastEditTime: 2021-08-18 10:59:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\kpiChart\supplierList.vue
-->
<template>
  <div>
    <el-tabs
      class="tabsHeader"
      type="card"
      style="margin-left:20px;"
      v-model="tabVal"
      @tab-click="changeTab"
    >
      <el-tab-pane name="PP" label="生产供应商"> </el-tab-pane>
      <el-tab-pane name="GP" label="一般供应商"> </el-tab-pane>
    </el-tabs>
    <!-- <div class="tab">
        <div class="current radius-left">生产供应商</div>
        <div class="radius-right">一般供应商</div>
      </div> -->
    <iCard>
      <div class="imgkpi-head">
        <el-form :model="formData">
          <el-form-item class="SearchOption">
            <iInput
              style="width:280px"
              v-model="formData.supplierName"
              suffix-icon="el-icon-search"
              :placeholder="
                language(
                  'SHURUCHAXUNGONGYINGSHANGMINGCHENGHUOSAPHAO',
                  '输⼊查询供应商名称或SAP号'
                )
              "
            ></iInput>
          </el-form-item>
        </el-form>
        <div>
          <iButton @click="clickSure">{{ language('CHAXUN', '查询') }}</iButton>
          <iButton @click="clickReset">{{
            language('CHONGZHI', '重置')
          }}</iButton>
        </div>
      </div>
    </iCard>
    <iCard @sure="sure" style="margin-top:20px">
      <tableList
        :tableData="tabledata"
        :tableTitle="listCloum"
        :tableLoading="tableLoading"
        :index="true"
        :selection="false"
      >
        <template #takeRecord="scope">
          <i-button
            v-if="scope.row.isKeyTrack"
            @click="handleKeyNotes(scope.row)"
            type="text"
          >
            {{ language('CHAKAN', '查看') }}</i-button
          >
        </template>
        <template #halfYear="scope">
          <i-button @click="handleTakeNotes(scope.row)" type="text">
            {{ language('CHAKAN', '查看') }}</i-button
          >
        </template>
      </tableList>
      <iPagination
        style="margin-top:20px"
        v-update
        @size-change="handleSizeChange($event, sure)"
        @current-change="handleCurrentChange($event, getTableData)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.totalCount"
      />
    </iCard>
    <iDialog
      @close="handleCloseTake"
      @open="handleOpenTake"
      :title="nameZh"
      v-if="isShowTake"
      :visible.sync="isShowTake"
      width="85%"
    >
      <supplierTakeDilog
        ref="childTake"
        :supplierId="supplierId"
      ></supplierTakeDilog>
    </iDialog>
    <iDialog
      @close="handleCloseKey"
      :title="nameZh"
      v-if="isShowKey"
      :visible.sync="isShowKey"
      width="85%"
    >
      <supplierKeyDilog
        ref="childKey"
        :tabVal="tabVal"
        :supplierId="supplierId"
        :nameZh="nameZh"
      ></supplierKeyDilog>
    </iDialog>
  </div>
</template>

<script>
import tableList from '@/components/commonTable'
import supplierTakeDilog from './components/supplierTakeDilog'
import supplierKeyDilog from './components/supplierKeyDilog'
import {
  tabRouterList,
  categoryManagementAssistantList
} from './commonHeardNav/navData'
import { pageMixins } from '@/utils/pageMixins'
import { iButton, iCard, iInput, iPagination, iDialog, iMessage } from 'rise'
import { listCloum } from './components/data'
import { focusSupplierPage } from '@/api/kpiChart/spi.js'
export default {
  mixins: [pageMixins],
  components: {
    tableList,
    iButton,
    iCard,
    iInput,
    iPagination,
    supplierTakeDilog,
    supplierKeyDilog,
    iDialog
  },
  data() {
    return {
      //   dialogVisible: true,
      activeName: '/supplier/kpiIndex',
      activeRightName: '/supplier/supplierList',
      tabRouterList: tabRouterList,
      categoryManagementAssistantList: categoryManagementAssistantList,
      formData: {},
      listCloum: listCloum,
      tabledata: [],
      tabVal: 'PP',
      tableLoading: true,
      isShowTake: false,
      isShowKey: false,
      supplierId: '',
      nameZh: ''
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    //打开半年报详情
    handleTakeNotes(row) {
      console.log(row)
      this.nameZh = row.nameZh
      this.supplierId = row.supplierId
      this.isShowTake = true
    },
    //打开重点追踪详情
    handleKeyNotes(row) {
      console.log(this.isShowKey)
      this.nameZh = row.nameZh
      this.supplierId = row.supplierId
      this.isShowKey = true
    },
    //获取列表数据
    getTableData() {
      this.tableLoading = true
      const params = {
        keyWord: this.formData.supplierName,
        supplierType: this.tabVal,
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize
      }
      focusSupplierPage(params).then(res => {
        this.tableLoading = false
        if (res && res.code == 200) {
          this.tabledata = res.data
          this.page.totalCount = res.total
          this.initHandleData()
        } else iMessage.error(res.desZh)
      })
    },
    initHandleData() {
      this.tabledata.forEach((item, index) => {
        item['index'] = index + 1
      })
    },
    // 点击确定
    clickSure() {
      this.page.currPage = 1
       this.page.pageSize = 10
      this.getTableData()
    },
    // 点击重置
    clickReset() {
      this.formData = {
        ...this.formData,
        supplierName: null
      }
      this.getTableData()
    },
    //改变Tab事件
    changeTab() {
      this.getTableData()
    },
    sure() {
      this.page.currPage = 1
       this.page.pageSize = 10
      this.getTableData()
    },
    handleCloseKey() {
      this.$refs.childKey.clear()
      this.isShowKey = false
    },
    handleCloseTake() {
      this.isShowTake = false
    },
    handleOpenTake() {}
  }
}
</script>

<style lang="scss" scoped>
.imgkpi-head {
  display: flex;
  justify-content: space-between;
  ::v-deep .el-form-item {
    margin-bottom: 0;
  }
}
.tab {
  width: 240px;
  display: flex;
  justify-content: flex-start;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.08);
  margin-bottom: 20px;

  div {
    width: 120px;
    height: 35px;
    color: #000;
    text-align: center;
    line-height: 35px;
    cursor: pointer;
    font-weight: bold;
  }
  .radius-left {
    border-radius: 10px 0 0 10px;
  }
  .radius-right {
    border-radius: 0 10px 10px 0;
  }
  .current {
    background-color: #fff !important;
    color: #1660f1 !important;
  }
}
.supplier-table-tittle {
  font-size: 18px;
  color: #000;
  font-weight: bold;
  margin-bottom: 20px;
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
    width: 120px;
    height: 35px;
    line-height: 35px;
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
::v-deep.navBox {
  .logButton .icon + span {
    vertical-align: top;
  }
  position: relative;
  // border-bottom: 1px solid #E3E3E3;
  margin-bottom: 20px;
  div {
    font-size: 20px;
  }
  .el-tabs__nav-wrap::after {
    width: 0;
  }
  .el-tabs__item {
    line-height: 24px;
  }
  .el-tabs__item.is-active {
    font-weight: Bold;
  }
  .leftNav {
    float: left;
  }
  .rightNav {
    float: right;
    margin-right: 110px;
    .el-tabs__active-bar {
      background-color: transparent !important;
    }
  }

  .logButton {
    position: absolute;
    top: 5px;
    right: 0;
  }
}
.clearfix:after {
  content: '020';
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

.clearfix {
  /* 触发 hasLayout */
  zoom: 1;
}
</style>
