<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-27 14:47:25
 * @LastEditors: zbin
 * @Descripttion: 舆情监测
-->
<template>
  <iCard :title="$t('SPR_FRM_XGYSPJ_YQQK')">

    <!-- <div class="center1 height">
      <img :src="soon" width="70%" height="70%" alt="">
    </div> -->
    <!-- <div class="flex-align-center" style="justify-content: center;height: 100%;">
		<img style="width: 60%;" src="./soon.png" >
	</div> -->
    <div ref="chart"
         class="chartStyle"> </div>
  </iCard>
</template>

<script>
import echarts from '@/utils/echarts'
import { iCard } from 'rise'
// import soon from "./soon.png";

export default {
  components: { iCard },
  data() {
    return {
      chart: 'monitorChart'
      //   soon: soon
    }
  },
  mounted() {
    const myChart = echarts().init(this.$refs.chart)
    var option = {
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        top: '6%',
        bottom: '10%%',
        right: '0%',
        left: '10%'
        // containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu'],
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
          data: [64, 47, 54, 57],
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
              fontSize: 14,
              barBorderRadius: [5, 5, 0, 0],
              color: '#A2C0FC', //改变折线点的颜色
              textStyle: {
                fontSize: '14px'
              }
            }
          }
        },
        {
          data: [14, 23, 11, 6],
          type: 'bar',
          barWidth: 30,
          label: {
            show: true,
            position: 'inside',
            color: '#fff'
          },
          itemStyle: {
            normal: {
              textStyle: {
                fontSize: '14px'
              },
              barBorderRadius: [5, 5, 0, 0],
              color: '#5B91FA' //改变折线点的颜色
            }
          }
        }
      ]
    }
    myChart.setOption(option)
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
</style>