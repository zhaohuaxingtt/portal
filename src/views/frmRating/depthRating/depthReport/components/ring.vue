
<template>
    <div style="height:360px" ref="chart"></div>
</template>
<script >
import echarts from '@/utils/echarts'
export default {
    props:{
        chartData:{
            type:Array,
            default:()=>[]
        },
    },
    data(){
        return {
            chartArray1:[],
            chartArray2:[],
            legendArray:[],
        }
    },
    methods: {
    initCharts() {
      const myChart = echarts().init(this.$refs.chart);
      // 绘制图表
      const option = {
          legend: {
            top:'bottom',
            icon:'circle',
          },
          color:['#1863F5','#5C90F7','#8BB1FB','#A2C0FC','#D0E0FE','#E8F1FF','#F3F7FF'],
          series: [
              {
                  type: 'pie',
                  radius: ['50%', '70%'],
                  emphasis: {
                      label: {
                          show: true,
                          fontSize: '12',
                          fontWeight: 'bold',
                          formatter: function (params) {
                          return params.data.key+params.data.value
                        },
                      }
                  },
                  label:{
                    show: true,
                    formatter: function (params) {
                      console.log(params)
                      return params.data.value
                    },
                  },
                  labelLine: {
                      show: false
                  },
                  data: this.chartData.map((item) =>{
                    return {
                      ...item,
                      name:item.key
                    }
                  })
              }
          ]
        };
      myChart.setOption(option);
    },
  },
  mounted() {
    this.initCharts();
  },
  watch:{
      chartData:{
          handler(newVal){
            if(newVal){
                newVal.forEach((row)=>{
                    this.legendArray.push(row.name);                    
                })
                this.chartArray1=newVal;
                if(this.$refs.chart&&this.chartArray1.length>0){
                    this.initCharts();
                }
            }
                
            },
            immediate:true,
      }
  }
};
</script>
