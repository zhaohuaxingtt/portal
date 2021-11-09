<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-27 14:47:25
 * @LastEditors: zbin
 * @Descripttion: 供应商询价定点情况
-->
<template>
  <iCard :title="$t('SPR_FRM_XGYSPJ_GYSXJDDQK')">
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
import { supplierRatingCard } from '@/api/frmRating/supplierOverview/index'
// import soon from "./soon.png";

export default {
  components: { iCard },
  data() {
    return {
      chart: 'vertexSituationChati',
      option: ''
      //   soon: soon
    }
  },
  mounted() {
    this.getChart()
    const myChart = echarts().init(this.$refs.chart)
    myChart.setOption(this.option)
    this.getData()
  },
  methods: {
    getData() {
      supplierRatingCard().then((res) => {
          
        this.getChart()
      })
    },
    getChart() {
      this.option = {
        title: {
          text: '供应商数量（家）',
          textStyle: {
            color: '#909091',
            fontSize: 10
          }
        },
        legend: {
          icon: 'circle',

          right: 0,
          top: 0,
          textStyle: {
            fontSize: 10,
            color: '#909091'
          },
          itemWidth: 8,
          itemHeight: 8
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          top: '18%',
          bottom: '10%%',
          right: '0%',
          left: '10%'
          // containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue'],
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
            name: 'C-Rating中正在报价供应商',
            data: [64, 47],
            type: 'bar',
            barGap: '-100%',
            barWidth: 50,
            label: {
              show: true,
              position: 'top',
              color: '#333'
            },
            itemStyle: {
              normal: {
                fontSize: 12,
                barBorderRadius: [5, 5, 0, 0],
                color: '#A2C0FC', //改变折线点的颜色
                textStyle: {
                  fontSize: '12px'
                }
              }
            }
          },
          {
            name: 'C-Rating未在报价中供应商',
            data: [14, 23],
            type: 'bar',
            barWidth: 50,
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
</style>