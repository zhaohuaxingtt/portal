<!--
 * @Author: caopeng
 * @Date: 2021-010-13 
-->
<template>
  <div>
    <!-- <iDialog width="80%" title="测试" :visible.sync="dialogVisible"></iDialog> -->

    <el-tabs
      class="tabsHeader"
      type="card"
      style="margin-left: 20px"
      v-model="tabVal"
      @tab-click="changeTab"
    >
      <el-tab-pane
        name="PP"
        :label="language('SHENGCHANGONGYINGSHANG', '生产供应商')"
      >
      </el-tab-pane>
      <el-tab-pane
        name="GP"
        :label="language('YIBANGONGYINGSHANG', '一般供应商')"
      >
      </el-tab-pane>
    </el-tabs>
    <iSearch @reset="clickReset" @sure="sure" :icon="true">
      <el-form label-width="120" inline label-position="top">
        <el-form-item
          style="width: 300px"
          :label="language('SAPORGONGYINGSHANGMINGCHENG', 'SAP号/供应商名称')"
        >
          <iSelect
            remote
            :remote-method="remoteGetSupplierList"
            collapse-tags
            multiple
            :value-key="supplierId"
            filterable
            v-model.trim="form.supplierIds"
            :placeholder="language('请选择')"
          >
            <el-option
              v-for="item in supplierList"
              :key="item.supplierId"
              :label="item.sapCode + '-' + item.nameZh"
              :value="item.supplierId"
            >
            </el-option>
          </iSelect>
        </el-form-item>
        <el-form-item
          style="width: 220px"
          :label="language('SHIFOUCAIQUCUOSHU', '是否采取措施')"
        >
          <iSelect :placeholder="language('请选择')" v-model="form.isTakeSteps">
            <el-option
              v-for="item in measureList"
              :key="item.key"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </iSelect>
        </el-form-item>
        <el-form-item
          style="width: 220px"
          :label="language('GENJINREN', '跟进人')"
        >
          <iSelect
            multiple
            collapse-tags
            filterable
            :placeholder="language('请选择')"
            v-model="form.followUserIds"
          >
            <el-option
              v-for="item in followUsers"
              :key="item.followUserId"
              :label="item.followUserName"
              :value="item.followUserId"
            >
            </el-option>
          </iSelect>
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard style="margin-top: 20px">
      <!-- <div class="supplier-table-tittle">重点追踪供应商名单</div> -->
      <div class="table-title">
        <div>
          <span class="ptext">
            {{
              language(
                'ZHONGDIANZHUIZONGGONGYINGSHANGMINGDAN',
                '重点追踪供应商名单'
              )
            }}
          </span>
          <span
            style="margin-left: 10px"
            class="spanText"
            v-if="tabledata.length == 0"
          >
            (
            {{
              language(
                'NINGFUZEDEGONGYINGSHANGWUYIBEILIERUZHONGDAINZHUIZONGMINGDAN',
                '您负责的供应商无一被列入重点追踪名单'
              )
            }})
          </span>
        </div>

        <div>
          <iButton @click="handleExportCurrent" v-permission="SUPPLIER_WORKBENCH_JIXIAO_NDZDZZ_DAOCHUQUANBU">{{
            language('DAOCHUQUANBU', '导出全部')
          }}</iButton>
          <buttonTableSetting @click="$refs.tableListRef.openSetting()"></buttonTableSetting>
        </div>
      </div>
      <!-- <tableList
        style="margin-top: 30px"
        :tableData="tabledata"
        :tableTitle="PointCloum"
        :selection="false"
        :tableLoading="tableLoading"
        :index="true"
      >
        <template #halfYear="scope">
          <i-button @click="handleTakeNotes(scope.row)" type="text">{{
            language('CHAKAN', '查看')
          }}</i-button>
        </template>
      </tableList> -->

      <iTableCustom
        ref="tableListRef"
        style="margin-top: 30px"
        :data="tabledata"
        :columns="PointCloum"
        :loading="tableLoading"
        @go-detail="handleTakeNotes"
      >
      </iTableCustom>

      <iPagination
        style="margin-top: 20px"
        v-update
        @size-change="handleSizeChange($event, getTableData)"
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
      :title="nameZh"
      :visible.sync="isShowTake"
      width="85%"
      @close="handleCloseTake"
      @open="handleOpenTake"
    >
      <supplierTakeDilog
        v-if="isShowTake"
        ref="childTake"
        :supplierId="supplierId"
      ></supplierTakeDilog>
    </iDialog>
  </div>
</template>

<script>
import tableList from '@/components/commonTable'
import buttonTableSetting from '@/components/buttonTableSetting'
import iTableCustom from '@/components/iTableCustom'
import supplierTakeDilog from './components/supplierTakeDilog'
import { pageMixins } from '@/utils/pageMixins'
import {
  iSearch,
  iButton,
  iDialog,
  iCard,
  iSelect,
  iPagination,
  iMessage
} from 'rise'
import { PointCloum } from './components/data'
import {
  KeyTrackFollowUserList,
  keyTrackPage,
  keyTrackExport,
  keyTrackSupplierList
} from '@/api/kpiChart/spi.js'
export default {
  mixins: [pageMixins],
  components: {
    tableList,
    iTableCustom,
    iDialog,
    iButton,
    iSearch,
    iCard,
    supplierTakeDilog,
    iSelect,
    iPagination,
    buttonTableSetting
  },
  data() {
    return {
      supplierListLoading: true,
      form: {},
      PointCloum: PointCloum,
      tabledata: [],
      tabVal: 'PP',
      tableLoading: true,
      isShowTake: false,
      supplierId: '',
      followUsers: [],
      supplierList: [],
      nameZh: '',
      measureList: [
        { label: this.language('QUANBU', '全部'), value: null },
        { label: this.language('KONG', '空'), value: 2 },
        { label: this.language('YES', '是'), value: 1 },
        { label: this.language('NO', '否'), value: 0 }
      ]
    }
  },
  created() {
    this.getUser()
    this.getTableData()
  },
  methods: {
    //半年报详情
    handleTakeNotes(row) {
      this.nameZh = row.nameZh
      this.supplierId = row.supplierId
      this.isShowTake = true
    },
    //获取跟进人
    getUser() {
      let params = {
        supplierType: this.tabVal
      }
      KeyTrackFollowUserList(params).then((res) => {
        if (res && res.code == 200) {
          this.followUsers = res.data
        }
      })
    },
    // 远程搜索供应商列表
    remoteGetSupplierList(query) {
      if (!query.match(/^[ ]*$/)) {
        this.supplierListLoading = true
        const params = {
          supplierType: this.tabVal,
          supplierName: query
        }
        keyTrackSupplierList(params).then((res) => {
          this.supplierListLoading = false
          if (res && res.code == 200) {
            this.supplierList = res.data
          } else iMessage.error(res.desZh)
        })
      }
    },
    //获取列表接口
    getTableData() {
      this.tableLoading = true
      const params = {
        supplierType: this.tabVal,
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        ...this.form
      }
      keyTrackPage(params).then((res) => {
        this.tableLoading = false
        if (res && res.code == 200) {
          this.tabledata = res.data
          this.initHandleData()
          this.page.totalCount = res.total
        } else iMessage.error(res.desZh)
      })
    },
    initHandleData() {
      this.tabledata.forEach((item, index) => {
        item['index'] = index + 1
      })
    },
    // 导出当前页
    handleExportCurrent() {
      const params = {
        supplierDTO: this.tabVal,
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        ...this.form
      }
      keyTrackExport(params)
    },
    // 点击确定
    clickSure() {
      this.page.currPage = 1
      this.page.pageSize = 10
      this.getTableData()
    },
    // 点击重置
    clickReset() {
      this.form = {
        isTakeSteps: '',
        followUserIds: [],
        supplierIds: []
      }
      this.page.currPage = 1
      this.page.pageSize = 10
      this.supplierList = []
      this.remoteGetSupplierList('')
      this.getTableData()
    },

    //改变Tab事件
    changeTab() {
      this.getTableData()
      this.getUser()
      this.getSupplier()
    },
    sure() {
      this.page.currPage = 1
      this.page.pageSize = 10
      this.getTableData()
    },
    handleCloseTake() {
      this.isShowTake = false
    },
    handleOpenTake() {
      //   this.$refs.childTake.fetchInfo()
    }
  }
}
</script>

<style lang="scss" scoped>
// ::v-deep .el-tooltip__popper {
// width: 100px!important;  //宽度可根据自己需要进行设置
//   }
.imgkpi-head {
  display: flex;
  justify-content: space-between;
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
    color: #67C23A !important;
  }
}
.supplier-table-tittle {
  font-size: 18px;
  color: #000;
  font-weight: bold;
  margin-bottom: 20px;
}
.table-title {
  display: flex;
  margin-top: 10px;
  align-items: center;
  justify-content: space-between;
  .ptext {
    font-size: 18px;
    font-family: Arial;
    font-weight: bold;
    color: #000000;
  }
  .spanText {
    font-size: 14px;
    font-family: Arial;
    font-weight: 400;
    color: #e30b0d;
    opacity: 1;
  }
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
    min-width: 120px;
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
