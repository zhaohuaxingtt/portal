<template>
  <div id="right-echart" class="right-echart"></div>
</template>
<script>
import echarts from '@/utils/echarts'
export default {
  created() {
    this.showRightEcharts()
  },
  methods: {
    showRightEcharts() {
      this.$nextTick(() => {
        const chart = echarts().init(document.getElementById('right-echart'))
        let option = {
          title: {
            text: '总金额:300.40',
            x: 'center',
            y: '1%'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },

          legend: {
            top: '6%',
            itemGap: 30
          },
          grid: {
            left: '3%',
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
            data: ['BU-B', 'CSE', 'CSX', 'CSI', 'CSP', 'CSM'],
            axisTick: {
              show: false
            }
          },
          series: [
            {
              name: '2011',
              type: 'bar',
              data: [18203, 23489, 29034, 104970, 131744, 530230],
              barWidth: 15,
              barCategoryGap: 1,
              label: {
                show: true,
                position: 'right',
                textStyle: {
                  fontSize: '12'
                }
              }
            },
            {
              name: '2012',
              type: 'bar',
              data: [19325, 23438, 31000, 121594, 134141, 581807],
              barWidth: 15,
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
  height: 630px;
}
</style>
