<!--
 * @Date: 2022-08-18 11:10:25
 * @LastEditors: caopeng
 * @LastEditTime: 2022-09-29 10:01:07
 * @FilePath: \front-order\src\views\ws2\productionCapacity\Bom\page\detail\contrast\index.vue
-->
<template>
  <div class="page">
    <p class="title">
      {{ $t('LK_KESHI') }}：{{
      $store.state.permission.userInfo.parentDeptList[0].deptNum
      }}
    </p>
    <div class="cardbox">
      <div class="card" v-for="(item, index) in infoList">
        <div class="div1">
          <span class="cardtitle">{{item.nameZh}}</span>
          <span :class="item.executeStatus==0?'orgin':item.executeStatus==1?'link':''" class="cardstate">{{statusList.find((val) => val.code == item.executeStatus).name}}</span>
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
            <p>{{ item.statisticsEndDate }}</p>
            <p>(距离截止日期还有13天）</p>
          </div>
        </div>
        <div class="div4">
          <el-button v-if="item.executeStatus==0" @click="goDetail(item,'add')" type="text">{{ $t('LK_CHAKAN') }}</el-button>
          <el-button v-if="item.executeStatus==1" type="text">{{ $t('LK_BIANJI') }}</el-button>
        </div>
      </div>
    </div>
    <el-divider class="line">
      <span>已结束任务</span>
      <el-button type="text">展开</el-button></el-divider
    >

    <div class="cardbox">
      <div class="card" v-for="(item, index) in infoList2">
        <div class="div1">
          <span class="cardtitle">{{item.nameZh}}</span>
          <span class="cardstate">{{statusList.find((val) => val.code == item.executeStatus).name}}</span>
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
            <p>{{ item.statisticsEndDate }}</p>
            <p>(距离截止日期还有13天）</p>
          </div>
        </div>
        <div class="div4">
          <el-button type="text">{{ $t('LK_CHAKAN') }}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getSupplierPerforManceScorePage,
  getSupplierPerforManceTaskList
} from '@/api/supplierManagement/supplierIndexManage/index'
import { pageMixins } from '@/utils/pageMixins'
import tableList from '@/components/commonTable'
import { cloneDeep } from 'lodash'
import { getDictByCode } from '@/api/dictionary'
import {getPerformanceEdition} from '@/api/supplierManagement/supplierIndexManage/index'

import {
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
      statusList:[],
      infoList: [],
      infoList2:[]
    }
  },
  created() {
    getDictByCode('SUPPLIER_PERFORMANCE_TASK_EXECUTE_STATUS')
        .then((res) => {
          if (res.data) {
            this.statusList = res?.data[0]?.subDictResultVo
          }
        })
        .catch(() => {})
    this.init()
  },
  methods: {
    init() {
      const req = {
          // deptCode:'CSS',
          deptCode: this.$store.state.permission.userInfo.parentDeptList[0].deptNum,
      }
      getSupplierPerforManceTaskList(req).then((res) => {
        this.infoList=res.data.filter(val=>{
          return val.status==0
        })
        this.infoList2=res.data.filter(val=>{
          return val.status==1
        })
      })
    },
    goDetail(item){
      let routeUrl = this.$router.resolve({
        path: '/supplier/spiIndex/supplierVersionUp',
        query: {
          modelId:item.modelId,
          editionId:item.editionId,
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
  display: flex;
  justify-content: flex-start;
  .card {
    margin-right: 1%;
    // display: flex;
    box-shadow: 0 0 1.25rem rgb(27 29 33 / 8%);
    border-radius: 12px;
    padding: 20px 20px 10px 20px;
    width: 22%;
    > div {
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
.title {
  font-size: 18px;
  font-weight: 600;
  color: #555;
}
.link {
  color: #1763f7;
  cursor: pointer;
}
.gread{
  background: #f8f9fa;
}
.orgin{
  color: #E6A23C;
}
</style>
