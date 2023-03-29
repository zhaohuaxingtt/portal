<!--
 * @Author: youyuan
 * @Date: 2021-09-24 11:31:29
 * @LastEditTime: 2023-03-29 14:30:59
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\dataBase\marketPriceEnquiry\components\chartMaterialCode.vue
-->
<template>
  <div>
    <div class="chart" style="height: 660px; margin-top: 50px" ref="chart"></div>
  </div>
</template>

<script>
import echarts from '@/utils/echarts'
export default {
  props: {
    chartData: {
      type: Array,
      default: () => []
    },
    timeData: {
      type: Array,
      default: () => []
    },
    selectedChartData: {
      type: Array,
      default: () => []
    },
    TFlag: {
      type: Boolean,
      default: false
    },
    ounceFlag: {
      type: Boolean,
      default: false
    },
    colors: {
      type: Array,
      default: () => [
        '#D782BA',
        '#E18AD4',
        '#EEB1D5',
        '#EFC7E5',
        '#F7C6EA',
        '#BCD4DE',
        '#A5CCD1',
        '#A0B9BF',
        '#9DACB2',
        '#949BA0',
        '#78586F',
        '#999AC6',
        '#B8BACF',
        '#D2D5DD',
        '#CFE6B0',
        '#0A765C',
        '#3BCDB5',
        '#66CD78',
        '#9ACD66',
        '#C6D13B',
        '#5524A5',
        '#01019D',
        '#0277B6',
        '#02B4D8',
        '#90E0EF',
        '#CAF0F8'
      ]
    }
  },
  data() {
    return {
      myChart: null,
      splitNumber: 5
    }
  },
  created() {
    this.$nextTick(() => {
      this.initCharts()
    })
  },
  methods: {
    // 初始化图表
    initCharts() {
      this.handleColor(this.chartData)
      this.myChart = echarts().init(this.$refs.chart)
      const option = {
        color: this.chartData.map((item) => item.colorCode),
        legend: {
          type: 'scroll',
          icon: 'circle',
          data: [],
          selected: {},
          orient: 'vertical',
          right: 0,
          top: 10,
          itemWidth: 12,
          itemGap: 20,
          textStyle:{
            width:'350',
            overflow:'break',
          },
        },
        grid: {
          right: 400
        },
        xAxis: {
          type: 'category',
          data: [],
          axisTick: {
            show: false
          }
        },
        yAxis: [],
        series: [],
        tooltip: {
          trigger: 'item',
          show: true
        }
      }
      // 所有图例
      const legendArray = this.getLegendData(this.chartData)
      // 隐藏的图例数据
      const hideLegendObj = this.getHideLegendData(
        this.chartData,
        this.selectedChartData
      )
      // x轴
      const xAxisArray = this.getxAxis(this.timeData)
      // y轴
      const yAxisArray = this.getyAxis(this.chartData)
      // 数据
      const seriesArray = this.getSeries(this.chartData)

      this.$set(option.legend, 'data', legendArray)
      this.$set(option.legend, 'selected', hideLegendObj)
      this.$set(option.xAxis, 'data', xAxisArray)
      this.$set(option, 'yAxis', yAxisArray)
      this.$set(option, 'series', seriesArray)
      this.myChart.setOption(option, true)

      // 绑定切换图例状态事件
      this.myChart.on('legendselectchanged', (e) => {
        this.$emit('handleChangeLegend', e.selected)
      })

      // 鼠标移入事件
      this.myChart.on('mousemove', (params) => {
        // 没有市场价类型
        if(!params.data[2]){
          let option = this.myChart.getOption();
          option.series.forEach(item=>{
            if(item.name == params.seriesName){
              item.label.show = true
            }
          })
          this.myChart.setOption(option)
        }
      })
      // 增加监听，mouseout事件（鼠标离开）
      this.myChart.on('mouseout', (params)=>{
        console.log(params);
        // 没有市场价类型
        if(!params.data[2]){
          let option = this.myChart.getOption();
          option.series.forEach(item=>{
            if(item.name==params.seriesName){
              item.label.show = false
            }
          })
          this.myChart.setOption(option)
        }
      })
    },
    // 获取图例
    getLegendData(data) {
      return data.map((item) => item.title) || []
    },
    // 获取被隐藏的图例数据
    getHideLegendData(data, selectedData) {
      const res = {}
      data.map((item) => {
        if (selectedData.indexOf(item.ruleNo) === -1) {
          res[item.title] = false
        }
      })
      return res
    },
    // 获取当前年月，格式YYYY/MM
    getCurrentDate() {
      const date = new Date()
      let year = date.getFullYear()
      let month =
        date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1
      const currDate = year + '/' + month
      return currDate
    },
    // 获取x轴
    getxAxis() {
      const currDate = this.getCurrentDate()
      const currStyle = {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 12
      }
      const normalStyle = {
        color: '#1660F1',
        fontSize: 12
      }
      const forecastStyle = {
        color: '#7E84A3',
        fontSize: 12
      }
      return this.timeData.map((item) => {
        return {
          value: item,
          textStyle:
            item == currDate
              ? currStyle
              : item > currDate
              ? forecastStyle
              : normalStyle
        }
      })
    },
    // 获取最大价格
    getMaxRareMetals(data) {
      let max_RareMetals = 0
      let maxArr = []
      data.forEach((item) => {
        if (item && item.monthPriceList.length > 0) {
          maxArr.push(
            window._.max(
              item.monthPriceList.map((childItem) => Number(childItem.price))
            )
          )
        }
      })
      max_RareMetals = window._.max(maxArr)
      const maxValue = Math.ceil(max_RareMetals) //向上取整
      const interval = Math.ceil(maxValue / this.splitNumber) //向上取整
      const max = this.splitNumber * interval //重设最大值刻度值
      return { max, interval }
    },
    // 获取最大非贵金属
    getMaxNotRareMetals(data) {
      let max_notRareMetals = 0
      let maxArr = []
      data.forEach((item) => {
        if (item && item.data.length > 0) {
          if (!item.isRareMetals) {
            maxArr.push(
              window._.max(
                item.data.map((childItem) => Number(childItem.value[1]))
              )
            )
          }
        }
      })
      max_notRareMetals = window._.max(maxArr)
      const maxValue = Math.ceil(max_notRareMetals) //向上取整
      const interval = Math.ceil(maxValue / this.splitNumber) //向上取整
      const max = this.splitNumber * interval //重设最大值刻度值
      return { max, interval }
    },
    // 获取y轴
    getyAxis(data) {
      const yAxisArray = []
      const yAxis_T = {
        name: 'RMB/T',
        type: 'value',
        textStyle: {
          color: '#7E84A3'
        },
        show: true
      }
      const yAxis_ounce = {
        name: 'RMB/T',
        type: 'value',
        textStyle: {
          color: '#7E84A3'
        },
        show: true
      }
      // if(this.TFlag && this.ounceFlag) {
      const maxRareMetals = this.getMaxRareMetals(data)
      // const maxNotRareMetals = this.getMaxNotRareMetals(data)
      // const clone_yAxis_T = window._.cloneDeep(yAxis_T)
      const clone_yAxis_ounce = window._.cloneDeep(yAxis_ounce)
      // clone_yAxis_T['max'] = maxNotRareMetals.max
      // clone_yAxis_T['interval'] = maxNotRareMetals.interval
      // clone_yAxis_T['splitLine'] = {show: true}
      // clone_yAxis_T['splitNumber'] = this.splitNumber
      clone_yAxis_ounce['max'] = maxRareMetals.max
      clone_yAxis_ounce['interval'] = maxRareMetals.interval
      clone_yAxis_ounce['splitLine'] = { show: true }
      clone_yAxis_ounce['splitNumber'] = this.splitNumber
      // yAxisArray.push(clone_yAxis_T)
      yAxisArray.push(clone_yAxis_ounce)
      // } else if(this.TFlag) {
      //   yAxisArray.push(yAxis_T)
      // } else if(this.ounceFlag) {
      //   yAxisArray.push(yAxis_ounce)
      // }
      return yAxisArray
    },
    // 随机抽取一个颜色
    getRandomColor(data) {
      return data[Math.floor(Math.random() * data.length)]
    },
    // 处理数据的颜色
    handleColor(data) {
      let colorArray = window._.cloneDeep(this.colors)
      data.forEach((item, i) => {
        let colorCode = ''
        switch (item.materialName) {
          case '铜':
            colorCode = '#C6D13B'
            break
          case '铂':
            colorCode = '#02B4D8'
            break
          case '钯':
            colorCode = '#90E0EF'
            break
          case '铑':
            colorCode = '#CAF0F8'
            break
          case '铅':
            colorCode = '#949BA0'
            break
          case '铝':
            colorCode = '#D2D5DD'
            break
          default:
            let len = colorArray.length
            let index = (i < len) ? i : i % len
            colorCode = colorArray[index]
            break
        }
        item['colorCode'] = colorCode
      })
    },
    // 获取series
    getSeries(data) {
      return data.map((item, i) => {
        console.log(item);
        return {
          type: 'line',
          name: item.title,
          data: item.monthPriceList.length
            ? item.monthPriceList.map((child) => [
                child.month.slice(0, 4) + '/' + child.month.slice(4),
                child.price,
                item.marketPriceType
              ])
            : [0],
          step: item.marketPriceType ? false : 'end',
          z: 99,
          symbol: 'circle',
          symbolSize: 4,
          yAxisIndex: item.yAxisIndex,
          labelLayout: {
            moveOverlap: 'shiftY'
          },
          label: {
            show: item.marketPriceType ? true : false,
            formatter:(params)=>{
              return VueUtil.formatNumber(params.value[1])
            }
          },
          triggerLineEvent:false,
          emphasis: {
            focus: 'series',
            label: {
              show: true
            }
          },
          markLine: {
            symbol: 'none',
            label: { show: false },
            lineStyle: { type: 'solid', color: '#ACB8CF', width: 2 },
            data: [{ xAxis: this.getCurrentDate(), tooltip: { show: false } }]
          },
          lineStyle: {
            normal: {
              color: item.colorCode
            }
          },
        }
      })
    }
  },
  computed: {
    params() {
      const { chartData, timeData, selectedChartData } = this
      return { chartData, timeData, selectedChartData }
    }
  },
  watch: {
    params: {
      handler(newVal) {
        if (newVal) {
          if (this.$refs.chart) {
            this.myChart.dispose()
            this.initCharts()
          }
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang='scss' scoped>
.chart{
  letter-spacing: 0;
}
.tooltipInfo {
  font-weight: bold;
}
</style>
