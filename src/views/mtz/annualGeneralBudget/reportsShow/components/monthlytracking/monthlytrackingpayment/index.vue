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
                  <i-select v-model="searchForm.department" :placeholder='language("请选择")'>
                    <el-option 
                      v-for="item in deptOption"
                      :key="item.code"
                      :label="item.message"
                      :value='item.code'
                      >
                      </el-option>
                  </i-select>
                </i-form-item>
              </el-col>
              <el-col :span="6">
                <i-form-item :label="language('MTZ材料组')">
                  <i-select v-model="searchForm.mtzMaterialNumber" :placeholder='language("请选择")'>
                    <el-option
                      v-for="item in mtzOption"
                      :key="item.materialGroupCode"
                      :label="item.materialGroupNameZh"
                      :value='item.materialGroupCode'
                    >
                    </el-option>
                  </i-select>
                </i-form-item>
              </el-col>
              <el-col :span="6">
                <i-form-item :label="language('材料中类')">
                  <i-select v-model="searchForm.materialMediumNum" :placeholder='language("请选择")'>
                    <el-option
                      v-for="item in materialMiddleOption"
                      :key="item.materialCategoryCode"
                      :label="item.materialNameZh"
                      :value='item.materialCategoryCode'
                    ></el-option>
                  </i-select>
                </i-form-item>
              </el-col>
              <el-col :span="6">
                <i-form-item :label="language('版本月份')">
                  <i-datePicker v-model="searchForm.yearMonth" :placeholder='language("请选择")' format='yyyy-MM' value-format='yyyyMM' type='month'></i-datePicker>
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
      <div v-loading='loading'>
        <div id="report-charts" ></div>
        <div class="difference-box">
          <div v-if="showDifference" class="display-difference" >
          <difference 
            v-for='(item,index) in calculate'
            :key='index'
            :item='item'
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
import {queryMtzMaterial,queryMaterialMedium} from '@/api/mtz/reportsShow'
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
      loading:false,
      time:'',
      showDifference:true,
      //科室选择
      deptOption:[],
      //MTZ材料组选择
      mtzOption:[],
      //材料中类选择
      materialMiddleOption:[],
      //差额
      calculate:[],
      //数据集 sourceData
      sourceData:[],
      searchForm:{
        department:'',//科室简称
        materialMediumNum:'',//mtz材料组中类编号
        mtzMaterialNumber:'',//MTZ材料组编号
        onlySeeMySelf:false,//是否只查看自己
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
    this.getMtzMaterial()
    this.getMaterialMedium()
    this.sure()
  },
  mounted() {
    // this.iniReport()
  },
  methods: {
    iniReport() {
      const el = document.getElementById('report-charts')
      let chart = echarts().init(el)
      // chart.showLoading({
      //   text:'loading',
      //   color: '#c23531',
      //   textColor: '#fff',
      //   maskColor: 'rgba(255, 255, 255, 0.2)',
      //   zlevel: 0,
      // })
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
            max: 18,
            splitNumber: '9'
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
          // triggerOn:'click',
          formatter:(params)=>{
            let price = 0
            params.seriesName == '已支付' ? price = params.value[2] * 1000000 : price =  params.value[1] * 1000000
            const splitPrice = (price + '').split('.')
            let leftPrice = splitPrice[0]
            let rightPrice = splitPrice.length > 1 ? '.'+ splitPrice[1]  : ''
            const rgx = /(\d+)(\d{3})/
            while(rgx.test(leftPrice)){
              leftPrice =  leftPrice.replace(rgx, '$1' + ',' + '$2')
            }
            //  price = String(price)
            // const tempt = price.split('').reverse().join('').match(/(\d{1,3})/g)
            // let currency = tempt.join(',').split('').reverse().join('')
            return leftPrice + rightPrice
          }
        },
        //数据集
        dataset: {
          source:
          this.sourceData
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
                    return Number((params.value[1])).toFixed(2)
                    // return Number(params.value[1].toString().match(/^\d+(?:\.\d{0,2})?/))
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
                    // return Number(params.value[2].toString().match(/^\d+(?:\.\d{0,2})?/))
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
      // chart.hideLoading()
    },
    sure(){
      const data = {
        ...this.searchForm
      }
      this.loading = true
      searchReport(data).then(res => {
        if(res?.code == 200){
          this.sourceData = []
          this.calculate = []
          const data = res.data
          if(data.length == 0){
            const el = document.getElementById('report-charts')
            el.innerHTML = '<div style="text-align: center">暂无数据</div>'
            el.removeAttribute('_echarts_instance_')
          }else{
            const sourceData = []
            //yearMonth年月 //actualPrice 应付 //payPrice 已支付 //差额 diffPrice
            data.forEach((item)=>{
              const year = item.yearMonth.slice(0,4)
              const month = item.yearMonth.slice(4)
              const yearMonth = year+'-'+month
              sourceData.push([yearMonth,Math.abs(Number(item.actualPrice))/1000000,Math.abs(Number(item.payPrice))/1000000])
              this.calculate.push({price:Number(item.diffPrice)/1000000,priceType:item.priceType})
            })
            this.sourceData = [['product', '应付（补差凭证⾦额）', '已支付', '差值'],...sourceData]
            this.iniReport()
          }
        }else{
          this.$message.error(res?.desZh || '获取失败')
        }
      }).finally(()=>this.loading = false)
    },
    reset(){
      this.searchForm = {
        department:'',//科室简称
        materialMediumNum:'',//mtz材料组中类编号
        mtzMaterialNumber:'',//MTZ材料组编号
        onlySeeMySelf:false,//是否只查看自己
        yearMonth:this.currentYearMonth//年月
      }
    },
    //获取当前科室
    getDepartment(){
      getDept().then(res => {
        if(res?.code == 200){
         this.deptOption = res.data
        }else{
          this.$message.error(res.desZh || '获取科室失败')
        }
      })
    },
    //mtz下拉
    getMtzMaterial(){
      queryMtzMaterial().then(res =>{
        if(res.code == 200){
          const data = res.data
          this.mtzOption = data
        }else{
          this.$message.error(res.desZh || '获取mtz材料组失败')
        }
      })
    },
    //材料组下拉
    getMaterialMedium(){
      queryMaterialMedium().then(res => {
        if(res.code == 200){
          this.materialMiddleOption = res.data
        }else{
          this.$message.error(res.desZh || '获取材料组中类失败')
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
