<template>
  <div class="curve" ref="curve" :style="{ height: chartHeight }"></div>
</template>

<script>
import echarts from '@/utils/echarts'
import { toFixedNumber } from '@/utils'

export default {
  props: {
    chartHeight: {
      type: String,
      default: '330px'
    },
    newestScatterData: {
      type: Array,
      default: () => {
        return [[200, 2000]]
      }
    },
    targetScatterData: {
      type: Array,
      default: () => {
        return [[250, 1912]]
      }
    },
    lineData: {
      type: Array,
      default: () => {
        return [
          [10, 2500],
          [280, 1500],
          [380, 10]
        ]
      }
    },
    cpLineData: {
      type: Array,
      default: () => {
        return []
      }
    },
    dataInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    lang() {
      return this.$i18n.locale
    }
  },
  watch: {
    lang(val) {
      console.log('lang', val)
      this.initEcharts()
    },
    newestScatterData() {
      this.initEcharts()
    }
  },
  mounted() {
    this.initEcharts()
  },
  data() {
    return {}
  },
  methods: {
    setBg(data) {
      return {
        color: '#fff',
        padding: [4, 8],
        align: 'center',
        backgroundColor: data > 0 ? '#C00000' : '#70AD47',
        borderRadius: 5,
        width: 100,
        lineHeight: 20,
        height: 20
      }
    },
    initEcharts() {
      const chart = echarts().init(this.$refs.curve)
      const newestScatterDataX = this.newestScatterData[0]
        ? this.newestScatterData[0][0]
        : 0
      const targetScatterDataX = this.targetScatterData[0]
        ? this.targetScatterData[0][0]
        : 0
      const newestScatterDataY = this.newestScatterData[0]
        ? this.newestScatterData[0][1]
        : 0
      const targetScatterDataY = this.targetScatterData[0]
        ? this.targetScatterData[0][1]
        : 0
      const reductionPotential = this.dataInfo.reductionPotential
      const proGrowthRate = this.dataInfo.proGrowthRate
      // const xMax = this.cpLineData[0]
      const option = {
        // ['最新定点单价', '目标单价']
        legend: {
          data: [this.language('最新定点单价'), this.language('目标单价')],
          right: 10,
          itemWidth: 10,
          selectedMode: false
        },
        xAxis: {
          // 产量（辆）
          // max: xMax,
          type: 'value',
          name: this.language('产量(件)'),
          // name:'666666',
          splitLine: {
            lineStyle: {
              type: 'dashed'
            },
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            formatter: function (value) {
              return value + 'k'
            },
            show: false,
            rotate: -30
          },
          axisLine: {
            lineStyle: {
              color: '#7E84A3'
            }
          }
        },
        yAxis: {
          type: 'value',
          // 单价\n' + '（元/件）
          name: this.language('单价') + '\n' + this.language('(元/件)'),
          nameTextStyle: {
            align: 'center',
            padding: [0, 0, 0, -50]
          },
          splitLine: {
            lineStyle: {
              type: 'dashed'
            },
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#7E84A3'
            }
          },
          axisLabel: {
            show: false,
            rotate: -30
          }
        },
        /* visualMap: {
           type: 'piecewise',
           show: false,
           dimension: 0,
           seriesIndex: 0,
           pieces: [
             {
               gt: newestScatterDataX,
               lt: targetScatterDataX,
               color: '#E8EFFE',
               opacity: 0.5
             },
           ],
         },*/
        series: [
          {
            type: 'line',
            smooth: true,
            data: this.lineData,
            symbol: 'none',
            lineStyle: {
              color: '#0059FF'
            },
            symbolSize: 20,
            /*areaStyle: {},*/
            markArea: {
              data: [
                [
                  { xAxis: newestScatterDataX, yAxis: newestScatterDataY },
                  { xAxis: targetScatterDataX, yAxis: targetScatterDataY }
                ]
              ],
              itemStyle: {
                color: '#E8EFFE',
                opacity: 0.5
              }
            }
          },
          {
            //最新定点单价
            name: this.language('最新定点单价'),
            type: 'scatter',
            data: this.newestScatterData,
            color: '#0059FF',
            symbolSize: 16,
            label: {
              offset: [30, 0],
              rich: {
                bg: this.setBg(proGrowthRate)
              },
              // distance: 12,
              show: false,
              position: 'top',
              formatter: () => {
                if (proGrowthRate > 0) {
                  return `{bg|${this.language('产量', '产量')}+${toFixedNumber(
                    proGrowthRate,
                    2
                  )}%}`
                } else {
                  return `bg|${this.language('产量', '产量')}${toFixedNumber(
                    proGrowthRate,
                    2
                  )}%`
                }
              }
            }
          },
          {
            //目标单价
            name: this.language('目标单价'),
            type: 'scatter',
            data: this.targetScatterData,
            color: '#70AD47',
            symbolSize: 16,
            label: {
              rich: {
                bgGrowth: this.setBg(proGrowthRate),
                bgReduction: this.setBg(reductionPotential)
              },
              //distance: 20,
              show: true,
              position: 'top',
              offset: [50, -8],
              formatter: () => {
                const bgGrowthPlus = proGrowthRate > 0 ? '+' : ''
                const bgReductionPlus = reductionPotential > 0 ? '+' : ''
                return `{bgGrowth|${this.language(
                  '产量',
                  '产量'
                )}${bgGrowthPlus}${toFixedNumber(
                  proGrowthRate,
                  2
                )}%}\n\n{bgReduction|${this.language(
                  '单价',
                  '单价'
                )}${bgReductionPlus}${toFixedNumber(reductionPotential, 2)}%} `
              }
            }
          },
          this.createXline(this.newestScatterData[0], newestScatterDataX),
          this.createXline(this.targetScatterData[0], targetScatterDataX),
          this.createYline(this.newestScatterData[0], newestScatterDataY),
          this.createYline(this.targetScatterData[0], targetScatterDataY),
          this.createYline(this.cpLineData, this.cpLineData[1])
        ],
        grid: {
          top: 94,
          left: 60,
          right: 66
        }
      }
      chart.setOption(option)
    },
    createXline(dataArray, zeroData) {
      return {
        type: 'line',
        data: [
          {
            value: dataArray
          },
          {
            value: [zeroData, 0],
            label: {
              show: true,
              position: 'bottom',
              color: '#7E84A3',
              formatter() {
                return zeroData + 'K'
              },
              rotate: 35,
              fontSize: 10
            }
          }
        ],
        lineStyle: {
          type: 'dashed',
          color: '#b6b6b6'
        }
      }
    },
    createYline(dataArray, zeroData) {
      return {
        type: 'line',
        data: [
          {
            value: dataArray
          },
          {
            value: [0, zeroData],
            label: {
              show: true,
              position: 'left',
              color: '#7E84A3',
              formatter() {
                return zeroData
              },
              rotate: 35,
              fontSize: 10
            }
          }
        ],
        lineStyle: {
          type: 'dashed',
          color: '#b6b6b6'
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.Volume_box {
  position: relative;
  .curve {
    width: 100%;
  }
}
</style>
