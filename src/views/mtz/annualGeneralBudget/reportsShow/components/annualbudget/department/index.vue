<template>
  <div v-permission.auto='MTZ_REPORT_DISPLAY_ANNUAL_BUDGET_DEPARTMENT_PAGE|年度预算科室页面' class="outFrame">
    <iButton @click="exportData" class="exportData">{{ $t('LK_DAOCHU') }}</iButton>
    <el-row :gutter="10">
      <el-col :span="12" class="total">
        <iSelect
          class="selectsize"
          v-model="form['yearDropList']"
          @change="selectYear"
        >
          <el-option
            v-for="(item, index) in yearList"
            :key="index"
            :value="item.code"
            :label="`${item.message} 年`"
          />
        </iSelect>
        <span>{{
          language('LK_DANWEIBAIWANRENMINGBI', '单位:百万人民币')
        }}</span>
        <totalAmountComponent :key='keyString' :deptData="deptData" :showEchart="showEchart"/>
      </el-col>
      <el-col :span="12" class="totalTwo"
        ><div class="dataList">
          <span class="lastYearData">{{
            language('LK_SHANGYINIANSHUJUDUIBI', '上一年数据对比')
          }}</span
          ><span class="unit">{{
            language('LK_DANWEIBAIWANRENMINGBI', '单位:百万人民币')
          }}</span>
        </div>
        <dataComparisonLastYear :key='keyString' :deptData="deptData" :showEchart="showEchart"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { iPage, iSelect, iButton } from 'rise'
import totalAmountComponent from './components/totalAmountComponent'
import dataComparisonLastYear from './components/dataComparisonLastYear'
import { yearBudgetDept, yearDropDown } from '@/api/mtz/reportsShow'
import { form } from './components/data'
export default {
  name: 'index',
  components: {
    iPage,
    iSelect,
    totalAmountComponent,
    dataComparisonLastYear,
    iButton
  },
  data() {
    return {
      form: form,
      yearList: [], //年份数据
      deptData:'',//金额数据
      keyString:0,
      showEchart: false
    }
  },
  created() {
    this.queryYearBudgetDept()
    this.getYearDropDown()
  },
  methods: {
    //数据查询
    queryYearBudgetDept() {
      this.form.onlySeeMySelf = false
      yearBudgetDept(this.form)
        .then((res) => {
          if (+res.code == 200) {
            this.deptData=res.data
            this.showEchart = true
            this.keyString+=1
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    //获取年数据
    getYearDropDown() {
      yearDropDown(false)
        .then((res) => {
          this.yearList = res.data
          this.form['yearDropList']=this.yearList[0].message
        })
        .catch((err) => {
          console.log(err)
        })
    },
    //选择年
    selectYear(val) {
      this.form.year = val
      this.queryYearBudgetDept()
    }
  }
}
</script>

<style lang="scss" scoped>
.outFrame {
  position: relative;
  .exportData {
    position: absolute;
    top: -58px;
    right: 10px;
  }
}
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

.el-row {
  ::v-deep .el-col-12 {
    border-right: 20px solid rgb(248, 249, 250);
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

  .unit {
    position: absolute;
    right: 30px;
    top: 30px;
  }
}
</style>