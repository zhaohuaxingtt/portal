<!--支付金额月度跟踪--->
<template>
  <div>
    <i-card class="search">
      <div class="search-content">
        <div class="form-condition">
          <el-form>
            <el-row gutter="24">
              <el-col :span="6">
                <i-form-item :label="language('科室')">
                  <i-select v-model="searchForm.department">
                    <el-option 
                      v-for="item in deptOption"
                      :key="item.value"
                      :label="item.label"
                      :value='item.value'
                      >
                      </el-option>
                  </i-select>
                </i-form-item>
              </el-col>
              <el-col :span="6">
                <i-form-item :label="language('MTZ材料组')">
                  <i-select v-model="searchForm.mtzMaterialNumber">
                    <el-option
                      v-for="item in mtzOption"
                      :key="item.value"
                      :label="item.label"
                      :value='item.value'
                    >
                    </el-option>
                  </i-select>
                </i-form-item>
              </el-col>
              <el-col :span="6">
                <i-form-item :label="language('材料中类')">
                  <i-select v-model="searchForm.materialMediumNum">
                    <el-option
                      v-for="item in materialMiddleOption"
                      :key="item.value"
                      :label="item.label"
                      :value='item.value'
                    ></el-option>
                  </i-select>
                </i-form-item>
              </el-col>
              <el-col :span="6">
                <i-form-item :label="language('年份月份')">
                  <i-datePicker v-model="searchForm.yearMonth" :placeholder='language("请选择")' format='yyyyMM' value-format='yyyyMM' type='month'></i-datePicker>
                </i-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="btn-list">
          <span  class="only-myself">{{ language('只看自己 ')}}
            <el-switch v-model="searchForm.onlySeeMySelf"></el-switch>
          </span>
          <i-button @click="sure">{{ language('确认') }}</i-button>
          <i-button @click="reset">{{ language('重置') }}</i-button>
        </div>
      </div>
    </i-card>
    <i-card class="report">
      <div>
        <div id="report-charts"></div>
        <div class="difference-box">
          <div v-if="showDifference" class="display-difference" >
          <!-- {{showDifference}} -->
          <difference 
            v-for='(item,index) in calculate'
            :key='index'
            :price='item'
          />
          </div>
        </div>
    </div>
    </i-card>
  </div>
</template>

<script>
import { iCard, iSelect, iDatePicker, iFormItem, iButton } from 'rise'
import difference from './components/difference'
import echarts from '@/utils/echarts'
import {searchReport,getDept} from '@/api/mtz/reportsShow/monthlytrackingpayment'
export default {
  name: 'paymentTracking',
  components: {
    iCard,
    iSelect,
    iDatePicker,
    iFormItem,
    iButton,
    difference
  },
  data() {
    return {
      onlySelf: false,
      time:'',
      showDifference:true,
      //科室选择
      deptOption:[],
      //MTZ材料组选择
      mtzOption:[],
      //材料中类选择
      materialMiddleOption:[],
      calculate:[
        1,3,4,-6,2,8,-4,-2,-4,2,9,-3.2
      ],
      searchForm:{
        department:'',//科室简称
        materialMediumNum:'',//mtz材料组中类编号
        mtzMaterialNumber:'',//MTZ材料组编号
        onlySeeMySelf:true,//是否只查看自己
        yearMonth:''//年月
      },
      currentYearMonth:''//当前年月
    }
  },
  created(){
    const currentTime = new Date()
    this.currentYearMonth = currentTime.getFullYear() + (currentTime.getMonth()+1).toString().padStart(2,0)
    this.searchForm.yearMonth = this.currentYearMonth
    this.getDepartment()
    this.sure()
  },
  mounted() {
    this.iniReport()
  },
  methods: {
    iniReport() {
      const el = document.getElementById('report-charts')
      let chart = echarts().init(el)
      chart.setOption({
        title: {
          text: '单位：⼈⺠币/百万',
          top: 0,
          right:10,
          textStyle:{
            color:'#9092A5',
            fontSize:'12',
            fontWeight:'normal'
          }
        },
        grid:{
          left:'2%',
          right:'2%'
        },
        xAxis: {
          type: 'category',
          axisTick: { show: false },
          axisLine:{
            lineStyle:{
              color:'#6D6E7E',
            }
          },
          axisLabel:{
            fontWeight:'bold',
            margin:20
          }
        },
        yAxis: [
          {
            //设置间距，需要计算
            max: 40,
            splitNumber: '10'
          }
        ],
        legend: [
          {
            x: 'left',
            icon: 'circle',
            itemHeight:'12',
            selectedMode:false,
            itemGap:20
          }
        ],
        tooltip: {
          show: true,
          // showContent:false
          formatter:(params)=>{
            // return `${Number(params.value[2]) * 1000000}`
            let price = 0
            params.seriesName == '已支付' ? price = params.value[2] * 1000000 : price =  params.value[1] * 1000000
            price = String(price)
            const tempt = price.split('').reverse().join('').match(/(\d{1,3})/g)
            let currency = tempt.join(',').split('').reverse().join('')
            
            return currency
          }
        },
        //数据集
        dataset: {
          source: [
            ['product', '应付（补差凭证⾦额）', '已支付', '差值'],
            ['2021-01', '21.5', '10'],
            ['2021-02', '20.6', '21'],
            ['2021-03', '20', '5'],
            ['2021-04', '23', '11'],
            ['2021-05', '20', '12'],
            ['2021-06', '3', '10'],
            ['2021-07', '20', '32'],
            ['2021-08', '23', '10'],
            ['2021-09', '20', '10'],
            ['2021-10', '22', '32'],
            ['2021-11', '4', '10'],
            ['2021-12', '20', '6']
          ]
        },
        series: [
          {
            type: 'bar',
            barWidth:'30',
            itemStyle: {
              normal: {
                color: 'RGB(2,96,241)',
                label: {
                  show: true,
                  position: 'top',
                  formatter:(params)=>{
                    return Number(params.value[1]).toFixed(2)
                  },
                  textStyle: {
                    color: 'RGB(2,96,241)'
                  }
                },
                borderRadius:[4,4,0,0],
              }
            },
          },
          {
            type: 'bar',
            barWidth:'30',
            itemStyle: {
              normal: {
                color: 'rgb(119,203,255)',
                label: {
                  show: true,
                  position: 'top',
                  formatter:(params)=>{
                    return Number(params.value[2]).toFixed(2)
                  },
                  textStyle: {
                    color: 'rgb(119,203,255)'
                  }
                },
                borderRadius:[4,4,0,0],
              }
            }
          },
          {
            type: 'line',
            itemStyle: {
              normal: {
                color: 'rgb(255,176,77)'
              }
            }
          }
        ],
      })
      // chart.on('legendselectchanged',(params)=>{
      //   const {name,selected} = params
      //   if(name == '差值'){
      //     selected['差值'] ? this.showDifference = true : this.showDifference = false
      //   }
      // })
    },
    sure(){
      const data = {
        ...this.searchForm
      }
      searchReport(data).then(res => {
        if(res.code == 200){
          console.log(res.data)
        }else{
          this.$message.error(res.desZh || '获取失败')
        }
      })
    },
    reset(){
      this.searchForm = {
        department:'',//科室简称
        materialMediumNum:'',//mtz材料组中类编号
        mtzMaterialNumber:'',//MTZ材料组编号
        onlySeeMySelf:true,//是否只查看自己
        yearMonth:this.currentYearMonth//年月
      }
    },
    getDepartment(){
      // const data = {}
      getDept().then(res => {
        if(res.code == 200){
          console.log(res.data);
        }else{
          this.$message.error(res.desZh || '获取科室失败')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.search-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.report {
  margin-top: 20px;
}
#report-charts {
  width: 100%;
  height: 420px;
  position: relative;
}
::v-deep .el-date-editor--date {
  width: 100%;
}

.difference-box{
  width: 92%;
  position: absolute;
  bottom: 30px;
  .display-difference{
    // margin-top: -30px;
     width: 100%;
    margin-left: 2%;
    margin-right: 2%;
    display: flex !important;
    justify-content: space-around;
    align-items: center;
  }
}

.btn-list{
  display: flex;
  align-items: center;
  .only-myself{
    margin-right: 20px;
    font-size:20px;
    display: flex;
    align-items: center;
    ::v-deep .el-switch{
      margin-left: 10px;
    }
  }
}

</style>
