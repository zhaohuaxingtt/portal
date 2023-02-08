<!--
 * @Date: 2022-08-18 11:10:25
 * @LastEditors: caopeng
 * @LastEditTime: 2022-09-29 10:01:07
 * @FilePath: \front-order\src\views\ws2\productionCapacity\Bom\page\detail\contrast\index.vue
-->
<template>
  <div class="page">
    <p class="title">{{ $t('LK_KESHI') }}：{{}}</p>
    <div class="cardbox">
      <div class="card">
        <div class="div1">
          <span class="cardtitle">2022下半年绩效打分</span>
          <span class="cardstate">待处理</span>
          <span class="cardstause">进行中</span>
        </div>
        <div class="div2">
          <span class="label">统计周期</span>
          <span>2022.07.01~2022.12.31</span>
        </div>
        <div class="div3">
          <span class="label">截至时间</span>
          <div>
            <p>2023.01.23 23:59:59</p>
            <p>(距离截止日期还有13天）</p>
          </div>
        </div>
        <div class="div4">
          <el-button type="text">{{ $t('LK_CHAKAN') }}</el-button>
          <el-button type="text">{{ $t('LK_BIANJI') }}</el-button>
        </div>
      </div>
    </div>
    <el-divider class="line ">
      <span>已结束任务</span>
      <el-button type="text">展开</el-button></el-divider
    >

    <div class="cardbox">
      <div class="card">
        <div class="div1">
          <span class="cardtitle">2022下半年绩效打分</span>
          <span class="cardstate">待处理</span>
          <span class="cardstause">进行中</span>
        </div>
        <div class="div2">
          <span class="label">统计周期</span>
          <span>2022.07.01~2022.12.31</span>
        </div>
        <div class="div3">
          <span class="label">截至时间</span>
          <div>
            <p>2023.01.23 23:59:59</p>
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
import {} from '@/api/supplierManagement/supplierIndexManage/index'
import { pageMixins } from '@/utils/pageMixins'
import tableList from '@/components/commonTable'
import { cloneDeep } from 'lodash'
import { getDictByCode } from '@/api/dictionary'

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
    return {}
  },
  created() {
    this.init()
  },
  methods: {
    init() {}
  }
}
</script>

<style lang="scss" scoped>
.cardbox {
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  .card {
    // display: flex;
    box-shadow: 0 0 1.25rem rgb(27 29 33 / 8%);
    border-radius: 12px;
    padding: 20px 20px 10px 20px;
    width: 20%;
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
        padding: 10px;
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
  ::v-deep .el-divider__text{
    background: #F8F9FA;
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
</style>
