<template>
  <div ref="chart" class="bar-chart"></div>
</template>

<script>
import echarts from '@/utils/echarts'
export default {
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.chart = echarts().init(this.$refs.chart)
    let option = {
      title: { text: 'BAR-TEST' },
      xAxis: {
        type: 'category',
        data: ['series1', 'series2', 'series3','data4']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          type: 'bar',
          name: 'series1',
          data: [123, 223, 442, 121]
        },
        {
          type: 'bar',
          name: 'series2',
          data: [123, 523, 442, 121]
        },
        {
          type: 'line',
          name: 'series3',
          data: [123, 223, 642, 121]
        }
      ]
    }
    this.chart.setOption(option)
  }
}
</script>

<style lang="scss" scoped>
.bar-chart {
  width: 100%;
  height: 300px;
}
</style>