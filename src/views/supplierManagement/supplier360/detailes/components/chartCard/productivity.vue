<template>
  <iCard style="height:16rem">
    <div class="title">
      <p>{{language('CHANNENGYUJING', '产能预警')}}</p>
      <el-dropdown>

        <span class="el-dropdown-link">
          <i class="el-icon-more"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="center">
      <img :src="img"
           class="imgIcon" />
      <div class="float">
        <icon class="alert"
              symbol
              name="iconcaiwuyujing-hongdeng"></icon>
        <!-- <icon class="alert"
                      symbol
                      name="iconlvdeng"></icon> -->
        <p class="fontsize">You have capacity alert,You have capacity alert</p>
      </div>

    </div>
    <iDialog @close="closeDiolog()"
             :visible.sync="visible"
             width="85%">
      <el-tabs class="tabsHeader"
               type="card"
               style="margin-left:20px;"
               v-model="tabVal"
               @tab-click="changeTab">
        <el-tab-pane name="1"
                     :label="
            language('SHISHICRATINGGONGYINGSHANGQINGDAN', '实时C-Rating供应商清单')
          ">
        </el-tab-pane>
        <el-tab-pane name="2"
                     :label="language('CRATINGGONGYINGSHANGXUNJIADINGDIANQINGKUANG', 'C-Rating供应商询价定点情况')">
        </el-tab-pane>
      </el-tabs>
      <iSearch @reset="clickReset"
               tabCard
               @sure="sure"
               :icon="true">
        <el-form inline
                 label-position="top">
          <el-form-item :label="language('SAPHAO', 'SAP号')">
            <iSelect collapse-tags
                     filterable
                     :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                     v-model.trim="form.purchaserIds">
              <el-option v-for="item in purchaseList"
                         :key="item.purchaserId"
                         :label="item.purchaserName"
                         :value="item.purchaserId">
              </el-option>
            </iSelect>

          </el-form-item>
        </el-form>
      </iSearch>
      <p class="tableTitle">
        详情列表
      </p>
      <table-list v-if="tabVal == 1"
                  style="margin-top:20px"
                  :tableData="tableListData"
                  :tableTitle="tableTitleMonitor"
                  :tableLoading="tableLoading"
                  :index="true"
                  :selection="false">
      </table-list>
      <table-list v-if="tabVal == 2"
                  style="margin-top:20px"
                  :tableData="tableListData"
                  :tableTitle="tableTitleMonitorRecord"
                  :tableLoading="tableLoading"
                  :index="true"
                  :selection="false">
      </table-list>
    </iDialog>
  </iCard>
</template>
<script>
import { iCard, icon, iDialog, iSearch, iSelect } from 'rise'
import img from '@/assets/images/productivity.svg'
import { tableTitleMonitor, tableTitleMonitorRecord } from './data'
import tableList from '@/components/commonTable'
export default {
  props: {},
  components: {
    iCard,
    icon,
    iDialog,
    iSearch,
    iSelect,
    tableList
  },
  data () {
    return {
      visible: false,
      form: {},
      tabVal: '1',
      tableTitleMonitor: tableTitleMonitor,
      img: img,
      tableTitleMonitorRecord: tableTitleMonitorRecord
    }
  },
  computed: {
    style () {
      return {}
    }
  },
  watch: {},
  methods: {
    sure () { },
    clickReset () { },
    changeTab () { }
  },
  mounted () { }
}
</script>

<style lang="scss" scoped>
.imgIcon {
  width: 60px;
  height: 60px;
}
.title {
  display: flex;
  justify-content: space-between;
  padding-top: 15px;
  p {
    font-size: 20px;
    font-family: Arial;
    font-weight: bold;
    color: #131523;
  }
  i {
    font-size: 20px;
    cursor: pointer;
    color: #4d4d4d;
  }
}

.center {
  height: 160px;
  display: flex;
  align-items: center;
  .float {
    margin-left: 30px;
    text-align: left;
  }

  .fontsize {
    color: #798489;
    margin-top: 10px;
  }
  p {
    font-family: Arial;
    font-size: 16px;
    color: #798489;
  }
}
.early {
  font-size: 60px;
}
.tableTitle {
  font-size: 18px;
  font-family: Arial;
  font-weight: bold;
  color: #000000;
  padding: 20px 0 30px;
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
    width: 250px;
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