<!--预算月度跟踪--->
<template>
  <div v-permission='MTZ_REPORT_MONTHLY_TRACKING_MONTHLY_BUDGET_TRACKING_PAGE'>
    <i-card class='search'>
      <div class="search-content">
        <div class="form-condition">
          <el-form>
            <el-row gutter="24">
              <el-col :span="6">
                <i-form-item :label='language("科室")'>
                  <i-select v-model="searchForm.department" :placeholder='language("请选择")'>
                    <el-option
                      v-for="item in deptOption"
                      :key="item.code"
                      :label="item.message"
                      :value='item.code'
                    ></el-option>
                  </i-select>
                </i-form-item>
              </el-col>
              <el-col :span="6">
                <i-form-item :label='language("MTZ材料组")'>
                  <i-select v-model="searchForm.mtzMaterialNumber" :placeholder='language("请选择")'>
                    <el-option
                      v-for="item in mtzOption"
                      :key="item.materialGroupCode"
                      :label="item.materialGroupNameZh"
                      :value='item.materialGroupCode'
                    ></el-option>
                  </i-select>
                </i-form-item>
              </el-col>
              <el-col :span="6">
                <i-form-item :label='language("材料中类")'>
                  <i-select v-model="searchForm.materialMediumNum" :placeholder='language("请选择")'>
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
                <i-form-item :label='language("年份月份")'>
                  <i-datePicker v-model="searchForm.yearMonth" :placeholder='language("请选择")' format='yyyy-MM' value-format='yyyyMM' type='month'>
                  </i-datePicker>
                </i-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="btn-list">
          <span class="only-myself" v-permission="BUYER_FIXEDASSETS_ASSETSLIST_BTN_JUST_LOOK_YOURSELF">{{language('只看自己 ')}}
            <el-switch 
              v-model="searchForm.onlySeeMySelf" 
              active-color="#1660F1"
              inactive-color="#cccccc"  
            ></el-switch>
          </span>
          <i-button @click="sure">{{language('搜索')}}</i-button>
          <i-button @click="reset">{{language('重置')}}</i-button>
        </div>
      </div>
    </i-card>
    <i-card class="report">
      <div v-loading='loading'>
        <div class="report-box">
          <div id="report-charts"></div>
          <div class="contrast-box">
            <div class='report-contrast' v-show="showContrast">
              <contrast 
                v-for="(item,index) in contrastData"
                :key="index"
                :item='item'
              />
            </div>
          </div>
        </div>
      </div>
    </i-card>
  </div>
</template>

<script>
import {
  iCard,
  iSelect,
  iDatePicker,
  iFormItem,
  iButton,
} from 'rise'
import echarts from '@/utils/echarts'
import contrast from './components/contrast'
import {searchTrackingReport,getDept} from '@/api/mtz/reportsShow/monthlytrackingpayment'
import {queryMtzMaterial,queryMaterialMedium} from '@/api/mtz/reportsShow'
// import { math } from '@/utils'
export default {
  name: 'paymentTracking',
  components:{
    iCard,
    iSelect,
    iDatePicker,
    iFormItem,
    iButton,
    contrast
  },
  data(){
    return{
      showContrast:false,
      onlySelf:false,
      loading:false,
      time:'',
      //最大刻度
      maximumScale:0,
      //科室选择
      deptOption:[],
      //MTZ材料组选择
      mtzOption:[],
      //材料中类选择
      materialMiddleOption:[],
      //月度数据
      dataMonth:[],
      //年度数据
      yearData:[],
      //差异数据
      contrastData:[],
      //x轴年月
      xAxisData:[],
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
  mounted(){
    // this.iniChart()
  },
  methods:{
    iniChart(){
      // const date = new Date
      // const month = this.currentYearMonth
      const el = document.getElementById('report-charts')
      const chart = echarts().init(el)
      const _this = this
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
          left:'3%',
          right:'2%'
        },
        xAxis: {
          type: 'category',
          axisTick: { show: false },
          axisLine:{
            lineStyle:{
              color:'#6D6E7E'
            }
          },
          axisLabel:{
            fontWeight:'bold',
            formatter:(params)=>{
              const year = params.slice(0,4)
              const month = params.slice(4)
              return year+"-"+month
            },
            margin:20
          },
          data:this.xAxisData
        },
        yAxis: [
          {
            //设置间距，需要计算
            max: _this.maximumScale,
            splitNumber: 10,
          }
        ],
        legend: {
          x: 'left',
          icon: 'circle',
          selectedMode:false,
          data:['实际应付','月度预测','年度预测','机会','风险'],
          itemGap:20,
          itemHeight:'12'
        },
        tooltip: {
          show: true,
          // triggerOn:'click',
          formatter:(params)=>{
            let price = 0
            price =  params.value * 1000000 + ''
            const splitPrice = price.split('.')
            let leftPrice = splitPrice[0] //整数
            // let rightPrice = splitPrice.length > 1 ? '.'+splitPrice[1] : ''//小数
            let rightPrice = splitPrice.length > 1 ? '.'+ Number("." + splitPrice[1]).toFixed(2).toString().split('.')[1]  : ''

            const rgx = /(\d+)(\d{3})/
            while(rgx.test(leftPrice)){
              leftPrice = leftPrice.replace(rgx, '$1' + ',' + '$2')
            }
            // price = String(price)
            // const tempt = price.split('').reverse().join('').match(/(\d{1,3})/g)
            // let currency = tempt.join(',').split('').reverse().join('')
            
            return leftPrice + rightPrice
          }
        },
        series:[
          {
            name:'实际应付',
            type: 'bar',
            barWidth:'40',
            data:this.dataMonth,
            itemStyle: {
              normal: {
                color: function(params){
                  if(params.name < _this.searchForm.yearMonth){
                    return 'rgb(2,96,241)'
                  }else{
                    return 'rgb(119,203,255)'
                  }
                },
                
                borderRadius:[4,4,0,0],
              },
            },
            label: {
              normal:{
                show: true,
                position: 'top',
                formatter:(params)=>{
                  return Number(params.value).toFixed(2)
                },
                textStyle: {
                  color: 'inherit',
                }
              }
            },
          },
          {
            name:'月度预测',
            type:'line',
            data:[],
            itemStyle:{
              normal:{
                color:'rgb(119,203,255)'
              }
            }
          },
          {
            name:'年度预测',
            type: 'line',
            data:this.yearData,
            symbol:'circle',
            symbolSize:6,
            itemStyle: {
              normal: {
                color: 'rgb(255,176,77)',
                label:{
                  show:'true',
                  textStyle:{
                    color:'rgb(255,176,77)'
                  }
                }
              }
            },
            label:{
              normal:{
                show:true,
                formatter:(params)=>{
                  return Number(params.value).toFixed(2)
                }
              }
              
            }
          },
          {
            type:'line',
            name:'机会',
            itemStyle: {
              color:'rgb(33,213,155)'
            }
          },
          {
            type:'line',
            name:'风险',
            itemStyle:{
              color:'rgb(221,41,42)'
            }
          }
        ]
      })
    },
    sure(){
      const data = {
        ...this.searchForm
      }
      this.loading = true
      this.showContrast = false
      searchTrackingReport(data).then(res => {
        
        if(res.code ==200){
          // console.log(res.data,'====')
          const data = res.data 
          this.contrastData = []
          this.xAxisData = []
          this.yearData = []
          this.dataMonth = []
          const allPrice = []
          data?.forEach((item)=>{
            this.contrastData.push({price:item.diffPrice,priceType:item.priceType})
            this.xAxisData.push(item.yearMonth)
            allPrice.push(Math.abs(Number(item.yearForecastPrice)))
            this.yearData.push(Math.abs(Number(item.yearForecastPrice))/1000000)
            // console.log(this.currentYearMonth ,  item.yearMonth, this.currentYearMonth > item.yearMonth,'=======');
            if(item.dataType == 1){
              this.dataMonth.push(Math.abs(Number(item.actualPrice))/1000000 )
              allPrice.push(Math.abs(Number(item.actualPrice)))
            }else{
              this.dataMonth.push(Math.abs(Number(item.monthForecastPrice))/1000000)
              allPrice.push(Math.abs(Number(item.monthForecastPrice)))
            }
          })
          this.maximumScale = Number(Math.ceil((Math.max(...allPrice)/1000000).toFixed()/10)*10)
          //  +  Number(Math.ceil((Math.max(...allPrice)/1000000)))
          // console.log(this.maximumScale,Math.ceil((Math.max(...allPrice)/1000000).toFixed()/10), Number(Math.ceil((Math.max(...allPrice)/1000000))),'=======');
          this.iniChart()
        }else{
          this.$message.error(res.desZh || '获取数据失败')
        }
      }).finally(()=>{
        this.loading = false
        this.showContrast = true
      })
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
        if(res.code == 200){
          this.deptOption = res?.data
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
          const data = res.data
          this.materialMiddleOption = data.map((item)=>{
            return {
              label:`${item.materialCategoryCode}-${item.materialNameZh}`,
              value:item.materialCategoryCode
            }
          })
          // this.materialMiddleOption = res.data
        }else{
          this.$message.error(res.desZh || '获取材料组中类失败')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .search-content{
    display:flex;
    justify-content: space-between;
    align-items: center;
  }
  .report{
    margin-top: 20px;
    position: relative;
  }
  #report-charts{
    width: 100%;
    height: 420px;
  }
  ::v-deep .el-date-editor--date{
    width: 100%;
  }
  .report-box{
    width: 100%;
    height: 420px;
    position: relative;
    .contrast-box{
      position: absolute;
      width: 100%;
      top: 40px;
      .report-contrast{
        margin-left: 3%;
        margin-right: 2%;
        width: 95%;
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    }
  }
  
  .btn-list{
    display: flex;
    align-items: center;
    .only-myself{
      font-size: 20px;
      margin-right: 20px;
      display: flex;
      align-items: center;
      ::v-deep .el-switch{
        margin-left: 10px;
      }
    }
  }
  
</style>