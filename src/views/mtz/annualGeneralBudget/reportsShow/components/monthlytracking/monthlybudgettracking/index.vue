<!--预算月度跟踪--->
<template>
  <div>
    <i-card class='search'>
      <div class="search-content">
        <div class="form-condition">
          <el-form>
            <el-row gutter="24">
              <el-col :span="6">
                <i-form-item :label='language("科室")'>
                  <i-select>
                    <el-option></el-option>
                  </i-select>
                </i-form-item>
              </el-col>
              <el-col :span="6">
                <i-form-item :label='language("MTZ材料组")'>
                  <i-select>
                    <el-option></el-option>
                  </i-select>
                </i-form-item>
              </el-col>
              <el-col :span="6">
                <i-form-item :label='language("材料中类")'>
                  <i-select>
                    <el-option></el-option>
                  </i-select>
                </i-form-item>
              </el-col>
              <el-col :span="6">
                <i-form-item :label='language("版本月份")'>
                  <i-datePicker>
                  </i-datePicker>
                </i-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="btn-list">
          <span style="margin-right:20px" >{{language('只看自己 ')}}<el-switch v-model="onlySelf" ></el-switch></span>
          <i-button>{{language('确认')}}</i-button>
          <i-button>{{language('重置')}}</i-button>
        </div>
      </div>
    </i-card>
    <i-card class="report">
      <div>
        <div id="report-charts"></div>
        <div class="contrast-box">
          <div class='report-contrast'>
            <contrast 
              v-for="(item,index) in contrastData"
              :key="index"
              :price='item'
            />
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
      onlySelf:false,
      dataMonth:[
        2,
        5,
        7,
        8,
        5,
        3,
        7,
        8,
        6,
        2,
        5,
        9
      ],
      contrastData:[1,-2,3,-4,5,-3,6,7,-2,8,0,2]
    }
  },
  mounted(){
    this.iniChart()
  },
  methods:{
    iniChart(){
      const date = new Date
      const month = date.getMonth()
      // const monthColor = this.dataMonth.map((item,index) => {
      //   if(index < month){
      //     return {
      //       value:item,
      //       itemStyle:{
      //         normal:{
      //           color:'RGB(2,96,241)',
      //         label:{
      //           show: true,
      //           position: 'top',
      //           textStyle:{
      //             color:'RGB(2,96,241)'
      //           }
      //         },
      //         borderRadius:[4,4,0,0],
      //         },
      //       }
      //     }
      //   }else{
      //     return {
      //       value:item,
      //       itemStyle:{
      //         normal:{
      //           color:"rgb(119,203,255)",
      //           label:{
      //             show: true,
      //             position: 'top',
      //             textStyle:{
      //               color:'rgb(119,203,255)'
      //             }
      //           },
      //           borderRadius:[4,4,0,0],
      //         }
                  
      //       }
      //     }
      //   }
      // })
      // console.log(monthColor,'=====-----');
      const el = document.getElementById('report-charts')
      const chart = echarts().init(el)
      chart.setOption({
        title: {
          text: '单位：⼈⺠币/百万',
          top: 0,
          right:10,
          textStyle:{
            color:'#9092A5',
            fontSize:'12',
            width:'400',
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
          data:[
            '2021-01',
            '2021-02',
            '2021-03',
            '2021-04',
            '2021-05',
            '2021-06',
            '2021-07',
            '2021-08',
            '2021-09',
            '2021-10',
            '2021-11',
            '2021-12',
          ]
        },
        yAxis: [
          {
            //设置间距，需要计算
            max: 10,
            splitNumber: '10'
          }
        ],
        legend: {
          x: 'left',
          icon: 'circle',
          selectedMode:false,
          data:['实际应付','月度预测','年度预测','机会','风险'],
          itemGap:20
        },
        tooltip: {
          show: true
        },
        // dataset:{
        //   source:[
        //     ['product','实际应付','月度预测','年度预测'],
        //     ['2021-01', '3' ,'3'],
        //     ['2021-02', '5' ,'4'],
        //     ['2021-03', '7' ,'6'],
        //     ['2021-04', '6' ,'9'],
        //     ['2021-05', '9' ,'6'],
        //     ['2021-06'  ,'3','2'],
        //     ['2021-07'  ,'3','7'],
        //     ['2021-08','2','5'],
        //     ['2021-09'  ,'1','8'],
        //     ['2021-10'  ,'7','4'],
        //     ['2021-11' , '3','2'],
        //     ['2021-12', '5','6']
        //   ]
        // },
        series:[
          {
            name:'实际应付',
            type: 'bar',
            data:this.dataMonth,
            itemStyle: {
              normal: {
                color: function(params){
                  if(params.dataIndex < month){
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
            data:[3,7,4,6,7,4,6,3,7,8,2,5],
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
  .contrast-box{
    position: absolute;
    width: 100%;
    top: 70px;
    .report-contrast{
      margin-left: 2%;
      margin-right: 2%;
      width: 92%;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
  
</style>