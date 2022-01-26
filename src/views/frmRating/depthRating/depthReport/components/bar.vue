<template>
  <div style="height: 360px" ref="chart"></div>
</template>
<script >
import echarts from '@/utils/echarts'
export default {
  props: {
    chartData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      chartArray: [],
      labelArray: [],
      lineArray: [],
      lineDataArray: [],
      legendArray: [],
      dataArray: [],
      sum: window._.sum
    }
  },
  methods: {
    initCharts() {
      const myChart = echarts().init(this.$refs.chart)
      // 绘制图表
      const option = {
        legend: {
          top: 'top',
          left: 'right',
          icon: 'circle',
          fontSize: '10',
          data: this.legendArray
        },
        grid: {
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.labelArray,
            axisTick: {
              show: false,
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'Unit: Mio RMB',
            axisTick: {
              show: false
            }
          }
        ],
        emphasis: {
          focus: 'series'
        },
        color: [
          '#005CFA',
          '#94C8FC',
          '#8BB1FB',
          '#A2C0FC',
          '#D0E0FE',
          '#E8F1FF',
          '#F3F7FF'
        ],
        series: this.dataArray
      }
      myChart.setOption(option)
    }
  },
  mounted() {
    this.initCharts()
  },
  watch: {
    chartData: {
      handler(newVal) {
        if (newVal) {
          this.chartArray = newVal
          const tempArr = []
          newVal.forEach((row, i) => {
            if (i === 0) {
              this.labelArray = row.list.map((v) => v.key)
            }

            console.log(row)
            this.legendArray.push(row.name)
            this.dataArray.push({
              name: row.name,
              type: 'bar',
              stack: 'all',
              emphasis: {
                focus: 'series'
              },
              label: {
                show: true
              },
              labelLine: {
                show: false
              },
              itemStyle: {
                barBorderRadius: [5, 5, 0, 0]
              },
              barWidth: '30%',
              data: row.list.map((v) => {
                if (!tempArr[v.key]) {
                  tempArr[v.key] = []
                }
                tempArr[v.key].push(v.value)
                return v.value
              })
            })
            /* this.dataArray.push({
                    name: row.name,
                    type: 'bar',
                    stack:'all',
                    emphasis: {
                        focus: 'series'
                    },
                    label:{
                      show: true,
                    },
                    labelLine: {
                        show: false
                    },
                    barWidth:'40%',
                    data: this.chartData.map((i)=>i.value),
                    markLine: {
                        lineStyle: {
                            type: 'dashed',
                            color: "#bbb"
                        },
                        label:{
                          show:true,
                          position:'middle',
                          formatter:(params)=>{
                            console.log(params.dataIndex)
                            return 'aa'
                          }
                        },
                        data: [
                          [
                          {
                                coord: ['2018', 1111]
                            },
                            {
                                coord: ['2019', 987]
                            }
                          ],
                          [
                          
                            {
                                coord: ['2019', 987]
                            },
                            {
                                coord: ['2020', 1200]
                            },
                          ]
                        ],
                    }
                  }) */
          })
          console.log(tempArr)
          console.log(newVal)
          let n = 0
          tempArr.forEach((item, i) => {
            n++
            // console.log(item,i)
            if (newVal[0].list[n]) {
              let oldIndex = newVal[0].list[n - 1].key
              let index = newVal[0].list[n].key
              console.log(oldIndex, index)
              this.lineDataArray.push([
                {
                  coord: ['' + i, this.sum(tempArr[oldIndex])]
                },
                {
                  coord: ['' + index, this.sum(tempArr[index])]
                }
              ])
              const Num =
                Number(
                  (this.sum(tempArr[index]) - this.sum(tempArr[oldIndex])) /
                    this.sum(tempArr[index])
                ) * 100
              const icon = Num > 0 ? '+' : ''
              this.lineArray.push(icon + Num.toFixed(1) + '%')
            }
          })
          console.log(this.lineArray)
          this.dataArray.push({
            name: 'sum',
            type: 'bar',
            stack: 'all',
            emphasis: {
              focus: 'series'
            },
            label: {
              show: true,
              position: 'top',
              color: '#333',
              formatter: (params) => {
                return this.sum([parseFloat(tempArr[params.name][0]),parseFloat(tempArr[params.name][1])]).toFixed(2)
              }
            },
            labelLine: {
              show: false
            },
            itemStyle: {
              barBorderRadius: [5, 5, 0, 0]
            },
            barWidth: '30%',
            data: this.labelArray.map((i) => 0),
            markLine: {
              lineStyle: {
                type: 'dashed',
                color: '#bbb'
              },
              label: {
                show: true,
                position: 'middle',
                formatter: (params) => {
                  return this.lineArray[params.dataIndex]
                }
              },
              data: this.lineDataArray
            }
          })

          this.dataArray.forEach((item) => {})
          this.chartArray = newVal
          if (this.$refs.chart && this.chartArray.length > 0) {
            this.initCharts()
          }
        }
      },
      immediate: true
    }
  }
}
</script>
