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
          legend: {
            bottom: '10%',
            itemGap: 30
          },
          color: [
            '#3E6CB7',
            '#5982C4',
            '#698FCB',
            '#85A5D6',
            '#A1B9DE',
            '#B9CBE8'
          ],
          title: {
            text: '总金额：340.40',
            x: 'center',
            y: '10%'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: ['35%', '50%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'left'
              },
              emphasis: {
                label: {
                  show: true,
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

.left-echart{
    width: 750px;
    height: 630px;
}
</style>
