<template>
<div class="outFrame">
  <el-row :gutter="10">
    <el-col :span="12" class="total">
      <iSelect :placeholder="$t('LK_QINGXUANZE')" class="selectsize">
        <el-option value="" :label="$t('all') | capitalizeFilter"></el-option>
        <el-option
          v-for="(item, index) in getcontractsendsapstatusList2"
          :key="index"
          :value="item.code"
          :label="item.name"
        />
      </iSelect>
      <span>{{language('LK_DANWEIBAIWANRENMINGBI', '单位:百万人名币')}}</span>
      <totalAmountComponent />
    </el-col>
    <el-col :span="12" class="totalTwo"
      ><div class="dataList">
        <span class="lastYearData">{{language('LK_SHANGYINIANSHUJUDUIBI', '上一年数据对比')}}</span
        ><span class="unit">{{language('LK_DANWEIBAIWANRENMINGBI', '单位:百万人名币')}}</span>
      </div>
      <dataComparisonLastYear />
    </el-col>
  </el-row>
</div>
</template>

<script>
import { iPage, iSelect } from 'rise'
import totalAmountComponent from './components/totalAmountComponent'
import dataComparisonLastYear from './components/dataComparisonLastYear'

export default {
  name: 'index',
  components: {
    iPage,
    iSelect,
    totalAmountComponent,
    dataComparisonLastYear
  },
  data() {
    return {
      getcontractsendsapstatusList2: [1, 23, 2]
    }
  }
}
</script>

<style lang="scss" scoped>

.total {
  position: relative;
  background-color: white;
  height: 100%;
  .selectsize {
    width: 220px;
    margin-top: 30px;
    margin-left: 20px;
  }
  span {
    position: absolute;
    right: 30px;
    top: 30px;
  }
}

.el-row{
  ::v-deep .el-col-12{
    border-right:20px solid rgb(248, 249, 250) ;
    border-radius: 8px;
  }
}

.totalTwo {
  position: relative;
  background-color: white;
  height: 100%;
  .dataList {
    height: 68px;
  }

  .lastYearData {
    position: absolute;
    left: 30px;
    top: 30px;
    font-size: 20px;
    color: black;
  }

  .unit{
    position: absolute;
    right: 30px;
    top: 30px;
  }
}
</style>