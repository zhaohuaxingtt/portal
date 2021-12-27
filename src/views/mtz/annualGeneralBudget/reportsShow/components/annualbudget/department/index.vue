<template>

    <el-row :gutter="30">
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
        <span>单位:百万人名币</span>
        <totalAmountComponent/>
      </el-col>
      <el-col :span="12" class="totalTwo"> <dataComparisonLastYear/> </el-col>
    </el-row>

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
    dataComparisonLastYear,
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
}

.totalTwo {
  position: relative;
  background-color: white;
  height: 100%;
}

.selectsize{
  width: 220px;
  margin-top: 30px;
  margin-left: 20px;
}

span{
  position: absolute;
  right: 30px;
  top: 30px;
}
</style>