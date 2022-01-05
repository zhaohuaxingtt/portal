<template>
  <div id="left-echart" class="left-echart"></div>
</template>
<script>
import echarts from '@/utils/echarts'
export default {
  created() {
    this.showLeftEcharts()
  },
  methods: {
    showLeftEcharts() {
      this.$nextTick(() => {
        const chart = echarts().init(document.getElementById('left-echart'))
        let option = {
          tooltip: {
            formatter: (params) => {
              let price = 0
              price = params.value * 1000000
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
            bottom: '10%',
            itemGap: 30,
            icon: 'circle',
            tooltip: {
              show: true,
              formatter: (data) => {
                console.log('11111111111111111111',data)
                return '11www'
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
            text: '总金额:340.40',
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
              data: [
                { value: 1048, name: 'CSM' },
                { value: 735, name: 'CSP' },
                { value: 580, name: 'CSI' },
                { value: 484, name: 'CSX' },
                { value: 300, name: 'CSE' },
                { value: 300, name: 'BU-B' }
              ]
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
