<template>
  <iCard style="height: 16rem">
    <div class="title">
      <p>{{ language('XUNYUAN', '寻源') }}</p>
      <span class="el-dropdown-link" @click="gotoUrl">
        <i class="el-icon-more"></i>
      </span>
    </div>
    <div class="center">
      <!-- <span style="font-size:16px;color:rgba(107, 121, 149, 0.56);">{{language('JINGQINGQIDAI', '敬请期待')}}</span> -->
      <img :src="img" class="imgIcon" />
      <div class="float">
        <el-table style="width: 100%"  max-height="120" :data="tablelist">
          <el-table-column
          show-overflow-tooltip
            prop="linieDeptName"
            :label="'linie科室'"
            align="center"
          >
          </el-table-column>
          <el-table-column
          width="60"
            prop="totalNum"
            :label="language('RFQSHU', 'RFQ数')"
            align="center"
          >
          </el-table-column>
          <el-table-column
          width="60"
            prop="nominatedNum"
            :label="language('DINGDIANSHU', '定点数')"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="onGoingNum"
            :label="language('ONGOINGXUNJIASHU', 'Ongoing询价数')"
            align="center"
          >
          </el-table-column>
        </el-table>
        <!-- <table cellpadding="10">
          <tr class="cardtableTitle">
            <th>linie科室</th>
            <th>{{ language('RFQSHU', 'RFQ数') }}</th>
            <th>{{ language('DINGDIANSHU', '定点数') }}</th>
            <th>{{ language('ONGOINGXUNJIASHU', 'Ongoing询价数') }}</th>
          </tr>
          <tr class="bgtr" v-for="item in tablelist" :key="item">
            <td>{{item.linieDeptName}}</td>
            <td>{{item.totalNum}}</td>
            <td>{{item.nominatedNum}}</td>
            <td>{{item.onGoingNum}}</td>
          </tr>
         
        </table> -->
      </div>
    </div>
  </iCard>
</template>
<script>
import { iCard, iDialog, iSearch, iSelect } from 'rise'
import { tableTitleMonitor, tableTitleMonitorRecord } from './data'
import tableList from '@/components/commonTable'
import img from '@/assets/images/sourcing.svg'
import { getSupplierRfqLineDeptDis } from '@/api/supplierManagement/supplierCard/index'

export default {
  props: {},
  components: {
    iCard,

    iDialog,
    iSearch,
    iSelect,
    tableList
  },
  props: {
    infodata: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      tablelist: [],
      img: img
    }
  },
  computed: {},
  watch: {},

  mounted() {
    this.init()
  },
  methods: {
    gotoUrl(){
      let url =
        process.env.VUE_APP_HOST +
        `/sourcing/#/sourceinquirypoint/sourcing/partsrfq?supplierName=${this.infodata.shortNameZh}`
       window.open(url)
    },
    init() {
      getSupplierRfqLineDeptDis(this.$route.query.subSupplierId).then((res) => {
        if (res.data) {
          this.tablelist = res.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
th {
  font-size: 12px;
  font-family: Arial;
  font-weight: 400;
  color: #333;
}
td {
  font-size: 10px;
  font-family: Arial;
  color: #41434a;
}
.bgtr {
  background: #f8f9fa;
  margin: 10px 0;
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
.imgIcon {
  width: 60px;
  height: 60px;
}
.center {
  height: 160px;
  display: flex;
  align-items: center;
  .float {
    margin-left: 30px;
    width: 80%;
    text-align: left;
    table {
      border-collapse: collapse;
      border-spacing: 10px 10px;
      > tr {
        text-align: center;
      }
      .bgtr {
        margin: 10px 0;

        td {
          //   background: rgba(206, 212, 214, .1);
          padding: 8px 30px;
        }
        //   padding: 10px 40px;
      }
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
