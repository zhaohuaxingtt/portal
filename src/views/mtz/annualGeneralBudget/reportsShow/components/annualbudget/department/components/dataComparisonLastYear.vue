<template>
  <div id="right-echart" class="right-echart"></div>
</template>
<script>
import echarts from '@/utils/echarts'
export default {
  props: {
    deptData: { type: Array },
    showEchart: { type: Boolean, default: false }
  },
  created() {},
  watch: {
    showEchart: {
      handler: function (val) {
        if (val) {
          this.showRightEcharts()
        }
      },
      immediate: true
    }
  },
  methods: {
    showRightEcharts() {
      this.$nextTick(() => {
        const chart = echarts().init(document.getElementById('right-echart'))
        let arrCurrent = []
        arrCurrent = this.deptData.lastDeptDataList.map((i) => {
          return  Math.floor((i.lastPrice / 1000000) * 100) / 100
        })
        arrCurrent.reverse()
        let prearrCurrent = []
        prearrCurrent = this.deptData.lastDeptDataList.map((i) => {
          return  i.lastPrice
        })
       prearrCurrent.reverse()
        let arrLast = []
        arrLast = this.deptData.lastDeptDataList.map((i) => {
          return  Math.floor((i.curPrice / 1000000) * 100) / 100
        })
       arrLast.reverse()
        let prearrLast = []
        prearrLast = this.deptData.lastDeptDataList.map((i) => {
          return  i.curPrice
        })
        prearrLast.reverse()
        let arrDept = []
        arrDept = this.deptData.lastDeptDataList.map((i) => {
          return  i.dept
        })
       arrDept.reverse()
        let option = {
          title: {
            text: `总金额:${
              Math.floor((this.deptData.lastYearPrice / 1000000) * 100) / 100
            }`,
            x: 'center',
            y: '1%'
          },

          tooltip: {
            show: true,
            formatter: (params) => {
              let price = 0
              console.log(params)
              params.seriesName == `${this.deptData.lastYear}`
                ? (price = prearrCurrent[params.dataIndex])
                : (price = prearrLast[params.dataIndex])
              price = String(price)
              const tempt = price
                .split('')
                .reverse()
                .join('')
                .match(/(\d{1,3})/g)
              let currency = tempt.join(',').split('').reverse().join('')

              return currency
            }
          },

          legend: {
            top: '6%',
            itemGap: 30,
            icon: 'circle'
          },
          grid: {
            left: '5%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            show: false,
            type: 'value',
            boundaryGap: [0, 0.01],
            splitLine: {
              show: false
            }
          },
          yAxis: {
            type: 'category',
            data: arrDept,
            axisTick: {
              show: false
            }
          },
          series: [
            {
              name: `${this.deptData.lastYear}`,
              type: 'bar',
              data: arrCurrent,
              barWidth: 15,
              barCategoryGap: 1,
              center: ['50%', '45%'],
              color: 'rgb(119, 203, 255)',
              label: {
                show: true,
                position: 'right',
                textStyle: {
                  fontSize: '12'
                }
              }
            },
            {
              name: `${this.deptData.curYear}`,
              type: 'bar',
              data: arrLast,
              barWidth: 15,
              color: 'rgb(22, 96, 241)',
              center: ['50%', '45%'],
              label: {
                show: true,
                position: 'right',
                textStyle: {
                  fontSize: '12'
                }
              }
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

.right-echart {
  width: 750px;
  height: 590px;
}
</style>
