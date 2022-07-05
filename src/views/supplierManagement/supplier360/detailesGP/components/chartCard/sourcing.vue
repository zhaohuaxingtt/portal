<template>
  <iCard style="height:25rem">
    <div class="title">
      <p>{{language('XUNYUAN', '寻源')}}</p>
      <el-dropdown v-if="!isShow">
        <span class="el-dropdown-link">
          <i class="el-icon-more"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="openNav">{{language('CHAKAN', '查看')}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="center" v-if="!isShow">
      <img :src="img"
           class="imgIcon" />
      <div class="float">
        <table cellpadding='10'>
          <tr class="cardtableTitle">
            <th>Group</th>
            <th>{{language('DINGDIANSHU', '定点数')}}</th>
            <th>{{language('ONGOINGXUNJIASHU', 'Ongoing询价数')}}</th>
            <th>{{language('RFQSHU', 'RFQ数')}}</th>
          </tr>
          <tr class="bgtr" v-for="(item,index) in dataList" :key="index">
            <td>{{item.deptNum}}</td>
            <td>{{item.fixPointNum}}</td>
            <td>{{item.inquiryTimes}}</td>
            <td>{{item.rfqNum}}</td>
          </tr>
        </table>
      </div>
    </div>


    <div v-if="isShow" style="height:90%">
      <span style="font-size:18px;color:rgba(107, 121, 149, 0.56);margin-bottom: 5px;
        display: flex;
        height: 100%;
        position: relative;
        align-items: center;
        justify-content: center;">{{language('GONGYINGSHANGZHANWUYEWUSHUJU', '供应商暂无该业务数据')}}
      </span>
    </div>
  </iCard>
</template>
<script>
import { iCard, iDialog, iSearch, iSelect } from 'rise'
import { tableTitleMonitor, tableTitleMonitorRecord } from './data'
import tableList from '@/components/commonTable'
import img from '@/assets/images/sourcing.svg'
export default {
  props: {},
  components: {
    iCard,
    iDialog,
    iSearch,
    iSelect,
    tableList
  },
  props:{
    gpSourceingDataVos:{
      type: Array,
      default: () => {
        return []
      }
    },
    supplier360ViewVO:{
      type:Object,
      default:()=>{
        return {}
      }
    }
  },
  data () {
    return {
      visible: false,
      form: {},
      tabVal: '1',
      tableTitleMonitor: tableTitleMonitor,
      tableTitleMonitorRecord: tableTitleMonitorRecord,
      img: img,
      dataList:[],
      isShow:false,
    }
  },
  created(){
    console.log(this.gpSourceingDataVos);
  },
  computed: {
    style () {
      return {}
    }
  },
  watch: {
    gpSourceingDataVos(val){
      if(val.length<1){
        this.isShow = true;
        return false;
      }
      this.dataList = val;
    }
  },
  methods: {
    openNav(){
      // window.open(`${process.env.VUE_APP_HOST}/gp-portal/#/csc/myCsc?supplierId=${this.supplier360ViewVO.subSupplierId}`)
      window.open(`${process.env.VUE_APP_HOST}/gp-portal/#/rfq/strandTaskRfq?supplierId=${this.supplier360ViewVO.subSupplierId}`)
    },
    sure () { },
    clickReset () { },
    changeTab () { }
  },
  mounted () { }
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
.imgIcon {
  width: 60px;
  height: 60px;
  margin-top:10px;
}
.center {
  display: flex;
  height:calc(100% - 40px);
  margin-top:10px;

  .float{
    margin-left: 30px;
    width: 80%;
    text-align: left;
    table {
      border-collapse: separate;
      border-spacing: 0 10px;
      
      > tr {
        text-align: center;
      }
      .bgtr {
        margin: 10px 0;
        background:#f7f7f7;

        td {
          //   background: rgba(206, 212, 214, .1);
          padding: 8px 30px;
        }
        //   padding: 10px 40px;
      }
      .tableTitle {
        th {
          font-size: 12px;
          font-family: Arial;
          font-weight: 400;
          color: #000000;
        }
      }
      td {
        font-size: 12px;
        font-family: Arial;
        font-weight: 400;
        color: #41434a;
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

::v-deep .cardBody{
  height:25rem!important;
}

.cardtableTitle{
  background:#f8f8fa;
}
</style>