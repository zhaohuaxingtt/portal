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
                  <i-select>
                    <el-option></el-option>
                  </i-select>
                </i-form-item>
              </el-col>
              <el-col :span="6">
                <i-form-item :label="language('MTZ材料组')">
                  <i-select>
                    <el-option></el-option>
                  </i-select>
                </i-form-item>
              </el-col>
              <el-col :span="6">
                <i-form-item :label="language('材料中类')">
                  <i-select>
                    <el-option></el-option>
                  </i-select>
                </i-form-item>
              </el-col>
              <el-col :span="6">
                <i-form-item :label="language('年份月份')">
                  <i-datePicker> </i-datePicker>
                </i-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="btn-list">
          <span style="margin-right: 20px"
            >{{ language('只看自己 ')
            }}<el-switch v-model="onlySelf"></el-switch
          ></span>
          <i-button>{{ language('确认') }}</i-button>
          <i-button>{{ language('重置') }}</i-button>
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
      showDifference:true,
      calculate:[
        1,3,4,-6,2,8,-4,-2,-4,2,9,-3
      ]
    }
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
            selectedMode:false
          }
        ],
        tooltip: {
          show: true
        },
        //数据集
        dataset: {
          source: [
            ['product', '应付（补差凭证⾦额）', '已支付', '差值'],
            ['2021-01', '20', '10'],
            ['2021-02', '26', '21'],
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
            itemStyle: {
              normal: {
                color: 'RGB(2,96,241)',
                label: {
                  show: true,
                  position: 'top',
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
            itemStyle: {
              normal: {
                color: 'rgb(119,203,255)',
                label: {
                  show: true,
                  position: 'top',
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

      }),
      // window.addEventListener('resize',function(){chart.resize()})
      chart.on('legendselectchanged',(params)=>{
        const {name,selected} = params
        if(name == '差值'){
          selected['差值'] ? this.showDifference = true : this.showDifference = false
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
  bottom: 50px;
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



</style>
