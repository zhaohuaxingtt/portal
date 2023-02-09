<template>
  <div class="page">
    <iCard>
      <div class="title">
        <span class="blod">2022下半年绩效打分</span>
        <span>统计周期: 2022.07.01~2022.12.31</span>
        <span>截止时间: 2023.01.23 23:59:59(距离截止日期还有5天）</span>
        <span class="link">2022年度供应商绩效打分指南_V1.0.pptx</span>
      </div>
    </iCard>
    <iCard style="margin-top: 20px">
      <el-steps finish-status="success" align-center :active="active">
        <el-step title="绩效模型确认"></el-step>
        <el-step title="上传手工指标结果"></el-step>
        <el-step title="评分调整"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <supplierIndexManage :isShow="false" v-if="active == 0"></supplierIndexManage>
      <supplierVersionTable :isShow="false" v-if="active ==1||active ==2" :active="active"></supplierVersionTable>
      <Completed v-if="active == 3"> </Completed>
    </iCard>
  </div>
</template>

<script>
import Completed from './Completed'

import { pageMixins } from '@/utils/pageMixins'
import supplierIndexManage from '../supplierIndexManage'
import supplierVersionTable from './supplierVersionTable'
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
    supplierVersionTable,
    Completed,
    supplierIndexManage,
    iCard,
    iPagination,
    iSearch,
    iButton,
    iInput,
    iSelect,
    iDatePicker,
    iDialog
  },
  props: {
    col: {
      type: Object
    }
  },
  data() {
    return {
      active: 3
    }
  }
}
</script>
<style lang="scss" scoped>
.page {
  padding: 20px;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      font-size: 16px;
      font-weight: 400;
    }
    .blod {
      font-weight: bold;
    }
    .link {
      color: #1763f7;
      cursor: pointer;
    }
  }
}
</style>
