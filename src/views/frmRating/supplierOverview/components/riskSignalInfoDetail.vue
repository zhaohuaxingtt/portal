<template>
  <div>
    <el-form :inline="isInline" :model="searchFrom" class="demo-form-inline" :label-position="labelPosition" style="marginLeft: 10px;width: 100%">
      <el-form-item label="年份">
        <iDatePicker v-model="searchFrom.year" type="year" value-format="yyyy" placeholder="请选择" @change="searchChange"/>
      </el-form-item>
      <el-form-item label="季度" style="margin-left: 20px;">
        <iSelect collapse-tags v-model="searchFrom.quarter" :disabled="yearStatus" multiple placeholder="请选择" @change="searchChange" @remove-tag="searchChange">
          <el-option label="所有" value="all"></el-option>
          <el-option v-for="item in quarterData" :key="item.val" :label="item.label" :value="item.val"></el-option>
        </iSelect>
      </el-form-item>
      <el-form-item label="月份" style="margin-left: 20px;">
        <iSelect collapse-tags style="width: 330px;" :disabled="yearStatus" v-model="searchFrom.month" multiple placeholder="请选择" @change="searchChange" @remove-tag="searchChange">
          <el-option label="所有" value="all"></el-option>
          <el-option v-for="item in monthData" :key="item.val" :label="item.label" :value="item.val"></el-option>
        </iSelect>
      </el-form-item>
    </el-form>

    <el-divider></el-divider>

    <div class="bar-title">
      {{tabLabel}}
    </div>
    <div class="char-div">
      <bar :chartData="chartData" :colors="setBarColors"/>
    </div>

    <el-divider></el-divider>

    <div class="table-div">
      <el-table :data="signalData" :tableLoading="tableLoading">
        <el-table-column
          width="30">
        </el-table-column>
        <el-table-column
          v-for="item,i in signalColumn"
          :key="i"
          :label="item.name"
          :width="item.width"
          header-align="center"
          align="center">
          <template slot-scope="scope">
            <!-- <div style="position:relative">
              <p style="fontWeight: bold">{{scope.row[item.riskBigType]}}</p>
              <div style="position:absolute;right:0px;top:0px">
                <p v-if="scope.row[item.riskBigType + 'Num'] == 0" class="noValNum">{{scope.row[item.riskBigType + 'Num']}}</p>
                <p v-else class="havaValNum">{{scope.row[item.riskBigType + 'Num']}}</p>
              </div>
            </div> -->
            <el-row :gutter="2">
              <el-col :span="20">
                <p style="fontWeight: bold">{{scope.row[item.riskBigType]}}</p>
              </el-col>
              <el-col :span="4">
                <p v-if="scope.row[item.riskBigType + 'Num'] == 0" class="noValNum">{{scope.row[item.riskBigType + 'Num']}}</p>
                <p v-else class="havaValNum">{{scope.row[item.riskBigType + 'Num']}}</p>
              </el-col>
            </el-row>
            <span>  </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {iDatePicker, iSelect} from 'rise'
import bar from './bar.vue'
export default {
  name: 'riskSignalInfoDetail',
  components: {bar,  iDatePicker, iSelect},
  props: {
    tabVal: {
      type: String,
      default: 'gp'
    }
  },
  data () {
    return {
      isInline: true,       
      labelPosition: 'top',                           
      tabNameData: [
        {name: 'gp', label: '一般采购风险信号'},
        {name: 'pp', label: '生产采购风险信号'},
      ],
      tableData: [],
      //柱状图数据
      chartData: {},
      //柱状图颜色
      colors: [],
      //风险表格数据                                
      signalData: [],
      //风险表头数据
      signalColumn: [],
      tableLoading: false,
      //检索表单
      searchFrom: {},
      //季度数据
      quarterData: [
        {val: '1', label: '一季度'},
        {val: '2', label: '二季度'},
        {val: '3', label: '三季度'},
        {val: '4', label: '四季度'},
      ],
      //月份数据
      monthData: [
        {val: '01', label: '一月'},
        {val: '02', label: '二月'},
        {val: '03', label: '三月'},
        {val: '04', label: '四月'},
        {val: '05', label: '五月'},
        {val: '06', label: '六月'},
        {val: '07', label: '七月'},
        {val: '08', label: '八月'},
        {val: '09', label: '九月'},
        {val: '10', label: '十月'},
        {val: '11', label: '十一月'},
        {val: '12', label: '十二月'},
      ],
      //禁用状态
      yearStatus: true
    }
  },
  created() {
    this.initData()
  },
  computed: {
    tabLabel() {
      return this.tabNameData.find(item => item.name == this.tabVal).label
    },
     // 设置颜色
    setBarColors() {
      const colors = []
      if(this.tabVal == 'gp')  {
        colors.push('#9DB1CF')
      }
      else if(this.tabVal == 'pp'){
        colors.push('#DFE5EF')
      }
      return colors
    }
  },
  methods: {
    // 初始化数据
    initData() {
      this.$emit('initData', res => {
        this.tableData = res
        this.initChartData()
        this.initTableColumns()
        this.initTableData()
      })
    },
    //初始化echart数据
    initChartData() {
      const label = []
      const data = []
      this.tableData.forEach(item => {
        label.push(item.riskBigTypeName)
        data.push(item.riskNum)
        this.chartData = {
          label,
          data
        }
      });
    },
    //初始化表头数据
    initTableColumns() {
      this.signalColumn = []
      this.tableData.map(item => {
        // item['width'] = '200'
        item['props'] = item.riskBigType
        item['name'] = item.riskBigTypeName
        this.signalColumn.push(item)
      })
    },
    //初始化表格数据
    initTableData() {
      this.tableData.forEach(item => {
        item.smallTypeList.forEach((childItem, index) => {
          if(!this.signalData[index]) this.signalData[index] = {}
          const data = window._.cloneDeep(this.signalData[index])
          data[item.riskBigType] = childItem.riskSmallTypeName
          data[item.riskBigType + 'Num'] = childItem.riskNum
          this.$set(this.signalData, index, data)
        })
      })
    },
    //改变search值
    searchChange() {
      const allArr = ['all']
      const monthAll = this.searchFrom.month.find(item => item == 'all') 
      if(monthAll) this.$set(this.searchFrom, 'month', allArr)
      const quarterAll = this.searchFrom.quarter.find(item => item == 'all')
      if(quarterAll) this.$set(this.searchFrom, 'quarter', allArr)

      if(this.searchFrom.year) this.yearStatus = false
      else this.yearStatus = true

      this.$emit('searchChange', this.searchFrom, res => {
        this.tableData = res
        this.initChartData()
        this.initTableColumns()
        this.initTableData()
      })
    },
  }
}
</script>

<style lang='scss' scoped>
.bar-title {
  font-weight: 600;
}
.char-div {
  width: 100%;
}
.table-div {
  width: 100%;
}
.noValNum {
  color: #ACB8CF;
  font-weight: bold;
}
.havaValNum {
  color: #ED7D31;
  font-weight: bold;
}
</style>
