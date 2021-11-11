<!--
 * @Author: xuxin
 * @Date: 2021-06-17 11:25:51
 * @LastEditTime: 2021-07-30 16:45:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\frmRating\supplierOverview\components\bar.vue
-->

<template>
    <div style="height: 360px;" ref="chart"></div>
</template>
<script >
import echarts from '@/utils/echarts'
export default {
    props:{
      chartData:{
          type:Array,
          default:()=>[]
      },
      colors: {
        type: Array,
        default: () => ['#1863F5','#5C90F7','#8BB1FB','#A2C0FC','#D0E0FE','#E8F1FF','#F3F7FF']
      } 
    },
    data(){
        return {
            chartArray:[],
            labelArray:[],
            lineArray:[],
            lineDataArray:[],
            legendArray:[],
            dataArray:[],
            sum:window._.sum
        }
    },
    methods: {
    initCharts() {
      const myChart = echarts().init(this.$refs.chart);
      // 绘制图表
      const option = {
        xAxis: {
            type: 'category',
            axisTick:{
                show:false
            },
            data: this.chartData.label,
        },
        yAxis: {
            type: 'value',
            axisLine: {
              show:false
            }
        },
        grid: {
          left: '30',
          width: '98%'
        },
        color: this.colors,
        series: [{
          data: this.chartData.data,
          type: 'bar',
          barWidth:50,
          // barCategoryGap:'200',/*多个并排柱子设置柱子之间的间距*/
          itemStyle:{
            barBorderRadius: [15,15,0,0]
          },
          label:{
            show:true,
            position:'top',
            fontWeight:'bold',
            color: 'black',
            formatter: function (params) {
              if (params.value > 0) {
                  return params.value;
              } else {
                  return '';
              }
            }  
          }
        }]
      };
      myChart.setOption(option);
    }
  },
  mounted() {
    this.initCharts();
  },
  watch:{
      chartData:{
          handler(newVal){
            if(newVal){
                if(this.$refs.chart&&newVal.data.length>0){
                    this.initCharts();
                }
            }
                
            },
            immediate:true,
      }
  }
};
</script>
