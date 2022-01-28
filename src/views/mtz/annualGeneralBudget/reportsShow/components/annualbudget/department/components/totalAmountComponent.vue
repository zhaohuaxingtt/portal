<template>
  <div class="left-echart" :id="chartId"></div>
</template>
<script>
import echarts from '@/utils/echarts'
export default {
  props: {
    deptData: { type: Array },
    showEchart: { type: Boolean, default: false },
    chartId: String
  },
  created() {
    // this.showLeftEcharts()
  },
  watch: {
    showEchart: {
      handler: function (val) {
        if (val) {
          this.showLeftEcharts()
        }
      },
      immediate: true
    }
  },
  methods: {
    showLeftEcharts() {
      this.$nextTick(() => {
        const element = document.getElementById(this.chartId)
        const chart = echarts().init(
          element || document.querySelector('.left-echart')
        )
        let arr = []
        const lastDeptDataList = this.deptData.lastDeptDataList || []
        const curYearPrice = this.deptData.curYearPrice || 0
        lastDeptDataList.forEach((element) => {
          arr.push({
            value: element.curPrice,
            name: element.dept
          })
        })
        let option = {
          tooltip: {
            // formatter: (params) => {
            //   let price = 0
            //   price = params.value * 1000000
            //   price = String(price)
            //   const tempt = price
            //     .split('')
            //     .reverse()
            //     .join('')
            //     .match(/(\d{1,3})/g)
            //   let currency = tempt.join(',').split('').reverse().join('')
            //   return currency
            // }
          },
          legend: {
            bottom: '10%',
            itemGap: 30,
            icon: 'circle',
            tooltip: {
              show: true,
              formatter: (data) => {
                const curPriceData = lastDeptDataList.find(
                  (item) => item.dept == data.name
                ).curPrice
                return `${curPriceData} (${
                  curYearPrice
                    ? (
                        (curPriceData / this.deptData.curYearPrice).toFixed(2) *
                        100
                      ).toFixed(2)
                    : 0
                }%)`
              }
            }
          },
          color: [
            'rgb(22, 96, 241)',
            'rgb(62, 123, 244)',
            'rgb(102, 149, 246)',
            'rgb(138, 176, 248)',
            'rgb(178, 202, 251)',
            'rgb(216, 229, 253)'
          ],
          title: {
            text: `总金额:${Math.floor((curYearPrice / 1000000) * 100) / 100}`,
            x: 'center',
            y: '3%'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: ['35%', '50%'],
              avoidLabelOverlap: false,
              center: ['50%', '45%'],
              label: {
                show: false,
                position: 'left'
              },
              emphasis: {
                label: {
                  show: false,
                  fontSize: '40',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: arr
            }
          ]
        }
        chart.setOption(option)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
// .aa{
//     width: 3000px;
//     height: 300px;
//     background-color: violet;
// }

.left-echart {
  width: 750px;
  height: 590px;
}
</style>
