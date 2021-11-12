<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-27 14:47:25
 * @LastEditors: zbin
 * @Descripttion: 初步评级
-->
<template>
  <iCard :title="$t('SUPPLIER_CHUBUPINGJI')">
    <div @click="handleTo"
         class="height">
      <!-- <div class="center1 height">
      <img :src="soon" width="70%" height="70%" alt="">
    </div> -->
      <!-- <div class="flex-align-center" style="justify-content: center;height: 100%;">
		<img style="width: 60%;" src="./soon.png" >
	</div> -->
      <div ref="chart"
           class="chartStyle"> </div>
    </div>
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
    handleTo() {
      this.$router.push({
        path: '/supplier/frmrating/preliminaryrating/preliminaryrating'
      })
    },

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
          data: ['A', 'B', 'C'],
          axisLabel: {
            color: '#fff',
            interval: 0
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
            type: 'bar',
            data: [
              { value: data2[0], name: data1[0] },
              { value: data2[3], name: data1[3] },
              { value: data2[6], name: data1[6] }
            ],
            barWidth: 15,

            label: {
              show: true,
              position: 'bottom',
              align: 'center',
              distance: 10,
              color: '#727272',
              formatter: function (data) {
                return data.data.name
              },
              fontSize: 9
            },
            itemStyle: {
              normal: {
                color: function (params) {
                  let colorList = ['#A2C0FC', '#5B91FA', '#3764BA']
                  return colorList[params.dataIndex]
                }
              }
            }
          },
          {
            type: 'bar',
            barWidth: 15,
            label: {
              show: true,
              position: 'bottom',
              align: 'center',
              distance: 10,
              color: '#727272',
              formatter: function (data) {
                return data.data.name
              },
              fontSize: 9
            },
            data: [
              { value: data2[1], name: data1[1] },
              { value: data2[4], name: data1[4] },
              { value: data2[7], name: data1[7] }
            ],
            itemStyle: {
              normal: {
                color: function (params) {
                  let colorList = ['#A2C0FC', '#5B91FA', '#3764BA']
                  return colorList[params.dataIndex]
                }
              }
            }
          },
          {
            type: 'bar',
            barWidth: 15,
            label: {
              show: true,
              position: 'bottom',
              align: 'center',
              distance: 10,
              color: '#727272',
              formatter: function (data) {
                return data.data.name
              },
              fontSize: 9
            },
            itemStyle: {
              normal: {
                color: function (params) {
                  let colorList = ['#A2C0FC', '#5B91FA', '#3764BA']
                  return colorList[params.dataIndex]
                }
              }
            },
            data: [
              { value: data2[2], name: data1[2] },
              { value: data2[5], name: data1[5] },
              { value: data2[8], name: data1[8] }
            ]
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
