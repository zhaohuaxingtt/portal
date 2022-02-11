<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-27 14:47:25
 * @LastEditors: Please set LastEditors
 * @Descripttion: 舆情监测
-->
<template>
  <iCard :title="$t('SPR_FRM_XGYSPJ_YQQK')">

    <!-- <div class="center1 height">
      <img :src="soon" width="70%" height="70%" alt="">
    </div> -->
    <div class="flex-align-center"
         style="justify-content: center;height: 100%;">
      <img style="width: 60%;"
           src="./soon.png">
    </div>
    <!-- <div ref="chart"
         class="chartStyle"
         @click='openPBI()'> </div> -->
  </iCard>
</template>

<script>
import echarts from '@/utils/echarts'
import { iCard } from 'rise'
// import soon from "./soon.png";

export default {
  components: { iCard },
  data () {
    return {
      chart: 'monitorChart'
      //   soon: soon
    }
  },
  mounted () {
    const myChart = echarts().init(this.$refs.chart)
    var option = {
      title: {
        top: 0,
        itemGap: 4,
        text: '近一个月去重后舆情新闻数量统计（2021年11月第n周）',
        subtext: '数目（条）',
        textStyle: {
          color: '#909091',
          fontSize: 10
        },
        subtextStyle: {
          color: '#909091',
          fontSize: 10
        }
      },
      legend: {
        icon: 'circle',
        right: 0,
        top: 14,
        textStyle: {
          fontSize: 10,
          color: '#909091',
        },
        itemWidth: 8,
        itemHeight: 8,
      },
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        top: '18%',
        bottom: '10%%',
        right: '0%',
        left: '10%'
      },
      xAxis: {
        type: 'category',
        // data: ['Mon', 'Tue', 'Wed', 'Thu'],
        data: [{
          value: '2021年\n第N-4周',
        }, {
          value: '2022年\n第N-3周',
        }, {
          value: '2023年\n第N-2周',
        }, {
          value: '2024年\n第N-1周',
        }],
        axisLabel: {
          show: true,
          textStyle: {
            color: '#7E84A3',
            fontSize: '10px'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#7E84A3'
          }
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          show: true,
          textStyle: {
            color: '#7E84A3',
            fontSize: '10px'
          }
        }
      },
      series: [
        {
          name: '敏感',
          data: [67, 69, 52, 68],
          type: 'bar',
          barGap: '-100%',
          barWidth: 30,
          label: {
            show: true,
            position: 'top',
            color: '#333'
          },
          itemStyle: {
            normal: {
              fontSize: 12,
              barBorderRadius: [5, 5, 0, 0],
              color: '#A2C0FC' //改变折线点的颜色
            }
          }
        },
        {
          name: '非敏感',
          data: [43, 25, 35, 35],
          type: 'bar',
          barWidth: 30,
          label: {
            show: true,
            position: 'inside',
            color: '#fff'
          },
          itemStyle: {
            normal: {
              fontSize: 12,
              barBorderRadius: [5, 5, 0, 0],
              color: '#5B91FA' //改变折线点的颜色
            }
          }
        }
      ]
    }
    myChart.setOption(option)
  },
  methods: {
    openPBI () {
      console.log('.......打开报表')
    }
  }
}
</script>

<style scoped lang="scss">
.center1 {
  display: flex;
  justify-content: center;
  align-items: center;
}
.chartStyle {
  width: 100%;
  height: 320px;
}
.card .cardHeader {
  padding: 0;
}
</style>