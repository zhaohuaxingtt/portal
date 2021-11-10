<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-27 14:47:25
 * @LastEditors: zbin
 * @Descripttion: 舆情监测
-->
<template>
  <iCard :title="$t('SUPPLIER_CHUBUPINGJI')">

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
import { initRatingCard } from '@/api/frmRating/supplierOverview/index'
export default {
  components: { iCard },
  data() {
    return {
      chart: 'monitorChart',
      info: {}
      //   soon: soon
    }
  },

  mounted() {
    initRatingCard().then((res) => {
      this.info = res.data
      this.getChart()
    })
  },
  methods: {
    getChart() {
      let data1 = []
      let data2 = []
      for (var i in this.info.rateNumber) {
        data1.push(i)
        data2.push(this.info.rateNumber[i])
      }
      const myChart = echarts().init(this.$refs.chart)
      var option = {
        title: {
          top: 0,
          itemGap: 4,
          text:
            'CCC及以下供应商数量/比例：' +
            this.info.cccNumber +
            '/' +
            this.info.percent +
            '%）',
          subtext: '数量（家）',
          textStyle: {
            color: '#E30B0D',
            fontSize: 10
          },
          subtextStyle: {
            color: '#909091',
            fontSize: 10
          }
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
          data: data1,
          axisLabel: {
            interval: 0,
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
            name: 'Tue',
            data: data2,
            type: 'bar',
            barWidth: 15,
            itemStyle: {
              normal: {
                color: function (params) {
                  let colorList = [
                    '#A2C0FC',
                    '#A2C0FC',
                    '#A2C0FC',
                    '#5B91FA',
                    '#5B91FA',
                    '#5B91FA',
                    '#3764BA',
                    '#3764BA',
                    '#3764BA'
                  ]
                  return colorList[params.dataIndex]
                }
              }
            }
          }
        ]
      }
      myChart.setOption(option)
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
