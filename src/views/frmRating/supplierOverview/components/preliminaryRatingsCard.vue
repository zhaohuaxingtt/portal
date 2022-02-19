<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-27 14:47:25
 * @LastEditors: Please set LastEditors
 * @Descripttion: 初步评级
-->
<template>
  <iCard :title="$t('SUPPLIER_CHUBUPINGJI1')">
    <div @click="handleTo"
         class="height">
      <!-- <div class="center1 height">
      <img :src="soon" width="70%" height="70%" alt="">
    </div> -->
      <!-- <div class="flex-align-center" style="justify-content: center;height: 100%;">
		<img style="width: 60%;" src="./soon.png" >
	</div> -->
      <div ref="chart"
           class="chartStyle"></div>
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
  data () {
    return {
      chart: 'monitorChart',
      info: {}
      //   soon: soon
    }
  },
  watch: {
    '$i18n.locale' () {
      this.getChart();
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      initRatingCard().then(res => {
        this.info = res.data
        this.getChart()
      })
    },
    handleTo () {
      this.$router.push({
        path: '/supplier/frmrating/preliminaryrating/preliminaryrating'
      })
    },

    getChart () {
      let data1 = []
      let data2 = []
      let totalCount = 0
      for (var i in this.info.rateNumber) {
        data1.push(i)
        data2.push(this.info.rateNumber[i])
        totalCount += this.info.rateNumber[i]
      }
      //    totalCount=totalCount-data2[data2.length-1]
      const myChart = echarts().init(this.$refs.chart)
      var option = {
        title: {
          top: 0,
          itemGap: 4,
          text:
            this.language('CCCJIYIXIAGONGYINGSHANGSHULIANGBILI', 'CCC及以下供应商数量/比例') +
            this.info.cccNumber +
            '/' +
            this.info.percent +
            '%）',
          subtext: this.language('SHULIANGJIA', '数量/家'),
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
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (data) {
            console.log(data)
            const type = data[0].axisValue
            return `${type}-${this.language('RATINGSHULIANG', 'Rating数量')}：${data[0].value}<br/>${type}-${this.language('RATINGBILI', 'Rating比例')}：${(
              data[0].value / totalCount
            ).toFixed(2) * 100}%`
          }
          //    formatter: function(data) {
          //     let total = 0
          //     for (let i in data) {
          //       total += data[i].data.value
          //     }
          //     const type = data[0].axisValue
          //     return `${type}-Rating数量：${total}<br/>${type}-Rating比例：${(
          //       total / totalCount
          //     ).toFixed(2) * 100}%`
          //   }
        },
        grid: {
          top: '18%',
          bottom: '10%%',
          right: '0%',
          left: '10%'
        },
        xAxis: {
          type: 'category',
          //   data: ['A', 'B', 'C'],
          data: data1,
          axisLabel: {
            color: '#727272',
            interval: 0,
            fontSize: 9
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
            data: data2,
            barWidth: 15,

            label: {
              show: false,
              position: 'bottom',
              align: 'center',
            },
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
          //   {
          //     type: 'bar',
          //     data: [
          //       { value: data2[0], name: data1[0] },
          //       { value: data2[3], name: data1[3] },
          //       { value: data2[6], name: data1[6] }
          //     ],
          //     barWidth: 15,

          //     label: {
          //       show: true,
          //       position: 'bottom',
          //       align: 'center',
          //       distance: 10,
          //       color: '#727272',
          //       formatter: function (data) {
          //         return data.data.name
          //       },
          //       fontSize: 9
          //     },
          //     itemStyle: {
          //       normal: {
          //         color: function (params) {
          //           let colorList = ['#A2C0FC', '#5B91FA', '#3764BA']
          //           return colorList[params.dataIndex]
          //         }
          //       }
          //     }
          //   },
          //   {
          //     type: 'bar',
          //     barWidth: 15,
          //     label: {
          //       show: true,
          //       position: 'bottom',
          //       align: 'center',
          //       distance: 10,
          //       color: '#727272',
          //       formatter: function (data) {
          //         return data.data.name
          //       },
          //       fontSize: 9
          //     },
          //     data: [
          //       { value: data2[1], name: data1[1] },
          //       { value: data2[4], name: data1[4] },
          //       { value: data2[7], name: data1[7] }
          //     ],
          //     itemStyle: {
          //       normal: {
          //         color: function (params) {
          //           let colorList = ['#A2C0FC', '#5B91FA', '#3764BA']
          //           return colorList[params.dataIndex]
          //         }
          //       }
          //     }
          //   },
          //   {
          //     type: 'bar',
          //     barWidth: 15,
          //     label: {
          //       show: true,
          //       position: 'bottom',
          //       align: 'center',
          //       distance: 10,
          //       color: '#727272',
          //       formatter: function (data) {
          //         return data.data.name
          //       },
          //       fontSize: 9
          //     },
          //     itemStyle: {
          //       normal: {
          //         color: function (params) {
          //           let colorList = ['#A2C0FC', '#5B91FA', '#3764BA']
          //           return colorList[params.dataIndex]
          //         }
          //       }
          //     },
          //     data: [
          //       { value: data2[2], name: data1[2] },
          //       { value: data2[5], name: data1[5] },
          //       { value: data2[8], name: data1[8] }
          //     ]
          //   }
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
