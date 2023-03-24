<!--
 * @Date: 2022-08-18 11:10:25
 * @LastEditors: caopeng
 * @LastEditTime: 2022-09-29 10:01:07
 * @FilePath: \front-order\src\views\ws2\productionCapacity\Bom\page\detail\contrast\index.vue
-->
<template>
  <div class="page">
    <div class="topBar">
      <div
        v-for="(item, i) in tabList"
        :key="item"
        v-permission="`${item.permissionKey}`"
        :class="i == activeName ? 'active' : 'dis'"
        :style="
          i == 0
            ? 'border-radius: 6px 0 0 6px'
            : '' + i == tabList.length - 1 && tabList.length > 1
            ? 'border-radius: 0px 6px 06px 0px'
            : ''
        "
        @click="changeTab(i)"
      >
        {{ $t(item.key) }}
      </div>
    </div>
    <div v-if="activeName==0">
      <p class="title">
      {{ $t('LK_KESHI') }}：{{
        $store.state.permission.userInfo.deptDTO.deptNum.split('-')[0]
      }}
    </p>
    <div class="cardbox">
      <p v-if="infoList.length==0"  class="noInfo" >
          <span>暂无数据~~~</span>
      </p>
      <div class="card" v-for="(item, index) in infoList">
        <div class="div1">
          <span class="cardtitle">{{ item.nameZh }}</span>
          <span :class="item.executeStatus == 0 ? 'orgin' : item.executeStatus == 1 ? 'link' : ''" class="cardstate">{{
            statusList.find((val) => val.code == item.executeStatus).name
          }}</span>
          <span class="cardstause">进行中</span>
        </div>
        <div class="div2">
          <span class="label">统计周期</span>
          <div>
            <p>{{ item.statisticsStartDate }}</p>
            <p>{{ item.statisticsEndDate }}</p>
          </div>
        </div>
        <div class="div3">
          <span class="label">截至时间</span>
          <div>
            <p>{{ item.endDate }}</p>
            <p v-if="item.endDate&&DateDiffer(item.endDate)<0">(已截止)</p>
            <p v-else>(距离截止日期还有{{ DateDiffer(item.endDate) }}天）</p>
          </div>
        </div>
        <div class="div4">
        
          <el-button  @click="goDetail(item, 'edit')" icon="el-icon-edit-outline"
            type="text">{{ $t('LK_BIANJI') }}</el-button>
        </div>
      </div>
    </div>
    <el-divider class="line">
      <span>已结束任务</span>
      <el-button type="text" @click="isPage = !isPage">{{ isPage?'展开': '收起' }}</el-button></el-divider>
    <transition name="el-zoom-in-top">
      <div v-show="!isPage" class="cardbox">
        <div v-if="infoList2.length==0"  class="noInfo" >
          <span>暂无数据~~~</span>
        </div>
        <div class="card" v-for="(item, index) in infoList2">
          <div class="div1">
            <span class="cardtitle">{{ item.nameZh }}</span>
            <!-- <span class="cardstate">{{ statusList.find((val) => val.code == item.executeStatus).name }}</span> -->
            <span class="cardstause gread">已结束</span>
          </div>
          <div class="div2">
            <span class="label">统计周期</span>
            <div>
              <p>{{ item.statisticsStartDate }}</p>
              <p>{{ item.statisticsEndDate }}</p>
            </div>
          </div>
          <div class="div3">
            <span class="label">截至时间</span>
            <div>
              <p>{{ item.endDate }}</p>
              <p v-if="item.endDate&&DateDiffer(item.endDate)<0">(已截止)</p>
            <p v-else>(距离截止日期还有{{ DateDiffer(item.endDate) }}天）</p>
            </div>
          </div>
          <div class="div4">
            <el-button type="text" icon="el-icon-view" @click="goDetail(item, 'see')">{{ $t('LK_CHAKAN') }}</el-button>
            <el-button type="text" iocn="el-icon-download" @click="exportFile(item)">{{ '导出明细' }}</el-button>

          </div>
        </div>
      </div>
    </transition>
    </div>
    <deptPbi v-if="activeName==1"></deptPbi>
    <historyPbi v-if="activeName==2"></historyPbi>

  </div>
</template>

<script>
import {
  getSupplierPerforManceScorePage,
  getSupplierPerforManceTaskList,
  exportSupplierPerforManceScoreExcel
} from '@/api/supplierManagement/supplierIndexManage/index'
import { pageMixins } from '@/utils/pageMixins'
import tableList from '@/components/commonTable'
import historyPbi from './historyPbi'
import deptPbi from './deptPbi'
import { cloneDeep } from 'lodash'
import { getDictByCode } from '@/api/dictionary'
import { getPerformanceEdition } from '@/api/supplierManagement/supplierIndexManage/index'

import {
  iTabsList,
  iMessage,
  iMessageBox,
  iPagination,
  iCard,
  iSearch,
  iButton,
  iInput,
  iSelect,
  iDatePicker,
  iDialog
} from 'rise'
export default {
  mixins: [pageMixins],

  components: {
    iTabsList,
    deptPbi,
  historyPbi,
    iCard,
    iPagination,
    iSearch,
    iButton,
    iInput,
    iSelect,
    iDatePicker,
    tableList,
    iDialog
  },
  data() {
    return {
    activeName:'task',
      isPage: true,
      statusList: [],
      infoList: [],
      infoList2: [],
      tabList: [
        {
          name: '打分任务',
          key: '打分任务',
          permissionKey: 'SUPPLIER_WORKBENCH_JIXIAO_KPI_DFRW'
        },
        {
          name: '历史绩效评分',
          key: '历史绩效评分',
          permissionKey: 'SUPPLIER_WORKBENCH_JIXIAO_KPI_LSJXPF'
        },
        {
          name: '部门综合评分',
          key: '部门综合评分',
          permissionKey: 'SUPPLIER_WORKBENCH_JIXIAO_KPI_BMZHPF'
        },
      ],
    }
    
  },
  computed: {
    whiteBtnList() {
      return this.$store.state.permission.whiteBtnList
    }
  },
  created() {
    this.activeName = this.tabList.findIndex((val) => {
      if (this.whiteBtnList[val.permissionKey]) {
        return (
          this.whiteBtnList[val.permissionKey].permissionKey ==
          val.permissionKey
        )
      }
    })
    getDictByCode('SUPPLIER_PERFORMANCE_TASK_EXECUTE_STATUS')
      .then((res) => {
        if (res.data) {
          this.statusList = res?.data[0]?.subDictResultVo
        }
      })
      .catch(() => { })
      getDictByCode('SUPPLIER_PERFORMANCE_TASK_STATUS')
      .then((res) => {
        if (res.data) {
          // this.statusList = res?.data[0]?.subDictResultVo
        }
      })
      .catch(() => { })
    this.init()
  },
  methods: {
    changeTab(i) {
      this.activeName = i
    },
    init() {
      const req = {
        // deptCode:'CSS',
        deptCode: this.$store.state.permission.userInfo.deptDTO.deptNum.split('-')[0]
      }
      getSupplierPerforManceTaskList(req).then((res) => {
        this.infoList = res.data.filter(val => {
          return val.status ==0
        })
        this.infoList2 = res.data.filter(val => {
          return val.status ==1
        })
        console.log( this.infoList2)
      })
    },
    DateDiffer(Date_end) {
      //date1结束时间
      let date1 = new Date(Date_end);
      //date2当前时间
      let date2 = new Date();
      date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
      date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
      const diff = date1.getTime() - date2.getTime(); //目标时间减去当前时间
      const diffDate = diff / (24 * 60 * 60 * 1000);  //计算当前时间与结束时间之间相差天数
      return diffDate
    },
    exportFile(item){
      exportSupplierPerforManceScoreExcel({ editionId:item.editionId })
    },
    goDetail(item,type) {
      let routeUrl = this.$router.resolve({
        path: '/supplier/spiIndex/supplierVersionUp',
        query: {
          id:item.id,
          modelId: item.modelId,
          editionId: item.editionId,
          type
        }
      })
      window.open(routeUrl.href, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
.cardbox {
  margin: 20px 0;
  >div{
    display: inline-block;
    margin-top: 20px;
  }
.noInfo{
  text-align: center;
  margin: 40px 0;
  font-size: 16px;
  width: 100%;
  span{
    display: inline-block;
  }
  text-align: center;
  font-size: 16px;
}
  .card {
    margin-right: 1%;
    // display: flex;
    box-shadow: 0 0 1.25rem rgb(27 29 33 / 8%);
    border-radius: 12px;
    padding: 20px 20px 10px 20px;
    width: 22%;

    >div {
      display: flex;
    }

    .div1 {
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;

      .cardtitle {
        font-size: 14px;
        font-weight: 600;
        color: #333;
      }

      .cardstate {
        font-size: 16px;
      }

      .cardstause {
        color: white;
        background: #1763f7;
        padding: 5px 10px;
        border-radius: 20px;
      }

      .gread {
        background: #999;
      }
    }

    .div2,
    .div3 {
      .label {
        width: 40%;
      }

      margin-bottom: 20px;
      align-items: center;

      span {
        font-size: 16px;
      }

      p {
        font-size: 16px;
      }
    }

    .div4 {
      border-top: 1px solid #999;
      justify-content: center;
    }
  }
}

.line {
  span {
    display: inline-block;
    font-size: 16px;
    margin-right: 20px;
  }

  ::v-deep .el-divider__text {
    background: #f8f9fa;
  }
}
.topBar {
  display: flex;
  padding: 10px 0 20px;

  > div {
    padding: 8px 20px;
    box-shadow: 0 0 1.25rem rgb(0 0 0 / 8%);
    cursor: pointer;
    border: none;
    font-weight: bold;
    text-align: center;
  }
  .active {
    border-right: 1px solid #f5f6f7;
    color: #1660f1;
    background: #fff;
  }
  .dis {
    color: #727272;
    background-color: #f5f6f7;
  }
  .borderleft {
    border-radius: 6px 0 0 6px;
  }
  .borderright {
    border-radius: 0px 6px 06px 0px;
  }
}
.title {
  font-size: 18px;
  font-weight: 600;
  margin-top: 40px;
  color: #555;
}

.link {
  color: #1763f7;
  cursor: pointer;
}



.orgin {
  color: #E6A23C;
}
</style>
