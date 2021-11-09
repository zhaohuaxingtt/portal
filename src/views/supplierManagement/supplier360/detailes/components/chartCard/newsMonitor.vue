<template>
  <iCard style="height:14rem">
    <div class="title">
      <p>{{language('CAIWUYUJING', '财务预警')}}</p>
      <el-dropdown>

        <span class="el-dropdown-link">
          <i class="el-icon-more"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="handleDialog">查看</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="center">
      <icon class="early"
            symbol
            name="iconcaiwuyujing-icon"></icon>
      <div class="float">
        <div>
          <icon v-if="info.isAlert"
                class="alert"
                symbol
                name="iconcaiwuyujing-hongdeng"></icon>
          <icon v-if="!info.isAlert"
                class="alert"
                symbol
                name="iconlvdeng"></icon>
          <p v-if="info.isAlert"
             class="fontsize">C-Rating</p>
          <p v-if="!info.isAlert"
             class="fontsize">{{language('ZHUANGKUANGLIANGHAO', '状况良好')}}</p>
        </div>
        <div class="bjText">
          <p> <span v-if="info.isAlert"> {{language('CRATINGLAIYUAN', 'C-Rating来源')}}:</span> {{ratingSource}}</p>

          <p> {{language('GENXINSHIJIAN', '更新时间')}}:{{updateDate}}</p>

        </div>
      </div>

    </div>

  </iCard>
</template>
<script>
import { iCard, icon, iDialog, iSearch, iSelect, iButton } from 'rise'
import { tableTitleMonitor, tableTitleMonitorRecord } from './data'
import tableList from '@/components/commonTable'
import {
  supplierRatingCard,
  currentList
} from '@/api/supplierManagement/supplierCard/index'
export default {
  props: {},
  components: {
    iCard,
    icon,
    iDialog,
    iSearch,
    iSelect,
    tableList,
    iButton
  },
  data() {
    return {
      visible: false,
      form: {},
      tabVal: '1',
      tableTitleMonitor: tableTitleMonitor,
      tableTitleMonitorRecord: tableTitleMonitorRecord,
      info: {}
    }
  },
  computed: {
    style() {
      return {}
    }
  },
  watch: {},
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      supplierRatingCard(this.$route.query.subSupplierId).then((res) => {
        this.info = res.data
      })
    },
    handleDialog() {
      this.visible = true
      currentList().then((res) => {})
    },
    sure() {},
    clickReset() {},
    changeTab() {},
    closeDiolog() {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
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
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px solid #e3e3e3;
}
.sectionTitle {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.center {
  height: 160px;
  display: flex;
  align-items: center;
  .float {
    margin-left: 60px;
    display: flex;
    align-items: center;
  }
  .bjText {
    margin-left: 40px;
    text-align: left;
    p {
      margin: 8px 0;
    }
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