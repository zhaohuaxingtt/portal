<template>
  <div class="sponser-container">
    <div class="checkbox-container">
      <el-select
        v-model="checkList"
        multiple
        collapse-tags
        style="width: 100%"
        placeholder="请选择科室"
        @change="handleChange"
      >
        <el-option
          v-for="item in options"
          :key="item.departId"
          :label="item.departNameEn"
          :value="item.departId"
        >
        </el-option>
      </el-select>
    </div>
    <div class="pie-container" ref="pie"></div>
    <div class="bar-container" ref="bar"></div>
  </div>
</template>
<script>
import echarts from '@/utils/echarts'
import { getSponserData, getKpiCates } from '@/api/home'
export default {
  data() {
    return {
      checkList: [],
      options: [],
      gradeList: ['AAA', 'AA', 'A', 'BBB', 'BB', 'B', 'CCC', 'CC', 'C'],
      colorList: [
        {
          name: 'AAA',
          color: '#4a66ac'
        },
        {
          name: 'AA',
          color: '#629dd1'
        },
        {
          name: 'A',
          color: '#297fd5'
        },
        {
          name: 'BBB',
          color: '#7f8fa9'
        },
        {
          name: 'BB',
          color: '#5aa2ae'
        },
        {
          name: 'B',
          color: '#9d90a0'
        },
        {
          name: 'CCC',
          color: '#2c3d67'
        },
        {
          name: 'CC',
          color: '#2a5f8e'
        },
        {
          name: 'C',
          color: '#194c80'
        }
      ],
      list: [],
      data: [],
      newArr: [],
      newBrr: [],
      newCrr: [],
      totalCount: 0,
      total: 0,
      query: {
        beginTime: '',
        endTime: '',
        departmentIds: []
      },
      legendData: [],
      pieChart: null,
      barChart: null
    }
  },
  created() {
    const year = new Date().getFullYear() - 1
    this.query.beginTime = `${year}-01-01`
    this.query.endTime = `${year}-12-31`
  },
  mounted() {
    this.getKpiCates()
    this.getSponserList()
  },
  methods: {
    async getKpiCates() {
      const result = await getKpiCates({})
      if (result.code === '200' && result.data) {
        const data = result?.data || []
        data.unshift({
          departNameEn: 'ALL',
          supplierId: null,
          departNameZh: '全部'
        })
        this.options = result.data
      }
    },
    async getSponserList() {
      this.totalCount = 0
      const result = await getSponserData(this.query)

      if (result?.code === '200' && result?.data) {
        const responseData = result?.data?.slice(0, 9) || []
        const data = []
        this.gradeList.forEach((grade) => {
          const gradeItem = responseData.find((item) => {
            return item.grade === grade
          })
          if (gradeItem) {
            data.push(gradeItem)
          } else {
            data.push({
              grade: grade,
              num: 0,
              ratio: 0
            })
          }
        })
        // let data = result.data.slice(0, 9)
        /* const dataGrade = data.map((item) => {
          return item.grade
        })
        const diffArr = []
        for (let i = 0; i < this.gradeList.length; i++) {
          const isExist = dataGrade.includes(this.gradeList[i])
          if (!isExist) {
            diffArr.push({ val: this.gradeList[i], idx: i })
          }
        }
        for (let i = 0; i < diffArr.length; i++) {
          data.splice(diffArr[i].idx, 0, {
            grade: diffArr[i].val,
            num: 0,
            ratio: 0
          })
        } */

        for (let i = 0; i < data.length; i++) {
          const item = data[i]
          item.value = item.num
          item.name = item.grade
          if (item.grade.includes('A')) {
            item.type = 'A'
          } else if (item.grade.includes('B')) {
            item.type = 'B'
          } else {
            item.type = 'C'
          }
          this.totalCount += item.num
        }
        console.log('format data:', _.cloneDeep(data))
        this.data = _.cloneDeep(data)
        this.newArr = []
        this.newBrr = []
        this.newCrr = []
        data.forEach((item) => {
          if (item.type == 'A') {
            this.newArr.push(item)
          } else if (item.type == 'B') {
            this.newBrr.push(item)
          } else {
            this.newCrr.push(item)
          }
        })

        this.newArr = this.handleArr(this.newArr, 'A')
        this.newBrr = this.handleArr(this.newBrr, 'B')
        this.newCrr = this.handleArr(this.newCrr, 'C')
        this.total = 0
        this.newCrr.forEach((item) => (this.total += item.value))

        this.initPie()
        this.initBar()
      }
    },
    handleChange(val) {
      const last = !val.length ? '' : val[val.length - 1]
      if (last === 'ALL') {
        this.checkList = ['ALL']
        this.query.departmentIds = []
      } else {
        this.checkList = val.filter((e) => e !== 'ALL')
        this.query.departmentIds = this.checkList
      }

      this.getSponserList()
    },
    handleArr(arr, str) {
      arr.sort((a, b) => a.grade.length - b.grade.length)
      const colorMap = {
        A: '#77CBFF',
        B: '#77CBFF',
        C: '#629DD1'
      }
      return arr.map((e) => {
        return {
          itemStyle: {
            color: colorMap[str]
          },
          ...e
        }
      })
    },
    initPie() {
      let data = _.cloneDeep(this.data)
      let totalSum = 0
      data.forEach((item) => (totalSum += item.num))
      data.forEach((item) => {
        const { num = 0, name } = item
        const rate = !totalSum ? 0 : ((item.num / totalSum) * 100).toFixed(2)
        item.name = `${name}@@${num}@@${rate}`

        /* if (item.name.length == 3) {
          const {num=0,name} = item
          const rate = String(item.num / totalSum) == 'NaN'
                ? '0.00'
                : ((item.num / totalSum).toFixed(2) * 100).toFixed(2)
          item.name = `${name}@@${num}@@${rate}`
          item.name =
            item.name +
            '@@' +
            `${
              String(item.num / totalSum) == 'NaN'
                ? '0.00'
                : ((item.num / totalSum).toFixed(2) * 100).toFixed(2)
            }%` +
            '   '
        } else if (item.name.length == 2) {
          item.name =
            item.name +
            '      ' +
            `${
              String(item.num / totalSum) == 'NaN'
                ? '0.00'
                : ((item.num / totalSum).toFixed(2) * 100).toFixed(2)
            }%` +
            '   '
        } else {
          item.name =
            item.name +
            '        ' +
            `${
              String(item.num / totalSum) == 'NaN'
                ? '0.00'
                : ((item.num / totalSum).toFixed(2) * 100).toFixed(2)
            }%` +
            '    '
        } */
      })

      for (let i = 0; i < data.length; i++) {
        data[i].itemStyle = { normal: { color: this.colorList[i]?.color } }
        data[i].textStyle = { fontSize: 10, fontWeight: 'normal' }
      }
      let total = 0
      for (let i in data) {
        total += data[i].value
      }
      this.total = total
      let A = data.filter((e) => e.grade.includes('A'))
      let B = data.filter((e) => e.grade.includes('B'))
      let C = data.filter((e) => e.grade.includes('C'))
      this.legendData = [
        ...this.arrSort(A),
        ...this.arrSort(B),
        ...this.arrSort(C)
      ]
      this.setPieChart(data, total)
    },
    arrSort(arr) {
      arr.forEach((e) => {
        /* e.formatter = function (name) {
          const values = name.split('@@')
          let nameStr = ''
          for (let i = values[0].length; i < 3; i++) {
            nameStr += 'A'
          }
          nameStr += 'AAA'
          let rateStr = ''
          for (let i = values[2].length; i < 5; i++) {
            rateStr += '5'
          }
          return (
            '{a|' +
            values[0] +
            '}{b|' +
            nameStr +
            '}{c|' +
            rateStr +
            '}{d|' +
            values[2] +
            '%}'
          )
        } */
        e.ellipsis = {
          fontWeight: 'bold'
        }
        e.textStyle = {
          rich: {
            a: {
              fontSize: 10,
              fontWeight: 'normal'
            },
            b: {
              fontSize: 10,
              color: '#fff',
              fontWeight: 'normal'
            },
            c: {
              fontSize: 10,
              color: '#fff',
              fontWeight: 'normal'
            },
            d: {
              fontSize: 10,
              fontWeight: 'normal',
              align: 'right'
            }
          }
        }
      })
      // 倒序
      return arr.sort((a, b) => b.grade.length - a.grade.length)
    },
    // init pieecharts
    setPieChart(data, total) {
      if (!this.pieChart) {
        this.pieChart = echarts().init(this.$refs.pie)
      }
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: function ({ data }) {
            /* const name = data.data.name
            const values = name.split('@@')
            return `${values[0]}:<br/>
            ${values[1]}家<br/>
            ${values[2]}%` */
            let name = data.name.split('@@')[0]
            return `${name}:<br/>
            ${data.value}家<br/>
            ${
              String(data.num / total) === 'NaN'
                ? '0.00'
                : ((data.num / total).toFixed(2) * 100).toFixed(2)
            }%
            `
          }
        },
        legend: [
          {
            right: '0%',
            orient: 'vertical',
            icon: 'circle',
            itemHeight: 8,
            type: 'plain',
            data: this.legendData,
            formatter: function (name) {
              const values = name.split('@@')
              let nameStr = ''
              for (let i = values[0].length; i < 3; i++) {
                nameStr += 'A'
              }
              nameStr += 'AAA'
              let rateStr = ''
              for (let i = values[2].length; i < 5; i++) {
                rateStr += '5'
              }
              return (
                '{a|' +
                values[0] +
                '}{b|' +
                nameStr +
                '}{c|' +
                rateStr +
                '}{d|' +
                values[2] +
                '%}'
              )
            },
            /* textStyle: {
              rich: {
                a: {
                  fontSize: 10
                },
                b: {
                  fontSize: 10,
                  color: '#fff'
                },
                c: {
                  fontSize: 10,
                  color: '#fff'
                },
                d: {
                  fontSize: 10
                }
              }
            }, */
            tooltip: {
              show: true,
              formatter: function (data) {
                const name = data.name
                const values = name.split('@@')
                return `${values[0]}:<br/>
                        ${values[1]}家<br/>
                        ${values[2]}%`
              }
            }
          }
        ],
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
            right: '40%',
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            labelLine: {
              show: false
            },
            data: data
          }
        ],
        grid: {
          containLabel: true,
          left: 0,
          top: 10,
          right: 0,
          bottom: 0
        }
      }
      this.$nextTick(() => {
        this.pieChart && this.pieChart.setOption(option)
      })
      // 监听饼状图鼠标移入事件
      this.pieChart.on('mouseover', (param) => {
        const newLegends = this.legendData.map((e) => {
          if (e.name === param.name) {
            for (const key in e.textStyle) {
              if (Object.hasOwnProperty.call(e.textStyle, key)) {
                const element = e.textStyle[key]
                for (const k in element) {
                  if (Object.hasOwnProperty.call(element, k)) {
                    const sub = element[k]
                    sub['fontWeight'] = 'bold'
                  }
                }
              }
            }
          } else {
            for (const key in e.textStyle) {
              if (Object.hasOwnProperty.call(e.textStyle, key)) {
                const element = e.textStyle[key]
                for (const k in element) {
                  if (Object.hasOwnProperty.call(element, k)) {
                    const sub = element[k]
                    sub['fontWeight'] = 'normal'
                  }
                }
              }
            }
          }
          /* if (e.name === param.name) {
            e.textStyle.fontWeight = 'bold'
          } else {
            e.textStyle.fontWeight = 'normal'
          } */
          return e
        })
        this.mergeOptions(newLegends)
      })

      // 监听饼状图鼠标移出事件
      this.pieChart.on('mouseout', () => {
        const newLegends = this.legendData.map((e) => {
          // e.textStyle.fontWeight = 'normal'
          for (const key in e.textStyle) {
            if (Object.hasOwnProperty.call(e.textStyle, key)) {
              const element = e.textStyle[key]
              for (const k in element) {
                if (Object.hasOwnProperty.call(element, k)) {
                  const sub = element[k]
                  sub['fontWeight'] = 'normal'
                }
              }
            }
          }
          return e
        })
        this.mergeOptions(newLegends)
      })
    },

    mergeOptions(newLegends) {
      let _that = this
      const option = {
        // tooltip: {
        //   trigger: 'item',
        //   formatter: function (data) {
        //     let name = data.data.name.split( /\s+/)[0]
        //     return `${name}:<br/>
        //     ${_that.total}家<br/>
        //     ${String((data.data.num / _that.total)) === 'NaN' ? '0.00' : ((data.data.num / _that.total).toFixed(2) * 100).toFixed(2)}%
        //     `
        //   }
        // },
        legend: [
          {
            left: '60%',
            orient: 'vertical',
            icon: 'circle',
            itemHeight: 8,
            type: 'plain',
            // textStyle: {
            //   fontSize: 10
            // },
            data: newLegends,
            formatter: function (name) {
              const values = name.split('@@')
              let nameStr = ''
              for (let i = values[0].length; i < 3; i++) {
                nameStr += 'A'
              }
              nameStr += 'AAA'
              let rateStr = ''
              for (let i = values[2].length; i < 5; i++) {
                rateStr += '5'
              }
              return (
                '{a|' +
                values[0] +
                '}{b|' +
                nameStr +
                '}{c|' +
                rateStr +
                '}{d|' +
                values[2] +
                '%}'
              )
            },
            tooltip: {
              show: true,
              formatter: function (data) {
                const name = data.name
                const values = name.split('@@')
                return `${values[0]}:<br/>
                        ${values[1]}家<br/>
                        ${values[2]}%`
              }
            }
          }
        ],
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
            right: '40%',
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            labelLine: {
              show: false
            },
            data: _that.legendData
          }
        ],
        grid: {
          containLabel: true,
          left: 0,
          top: 10,
          right: 0,
          bottom: 0
        }
      }
      this.$nextTick(() => {
        option && this.pieChart.setOption(option)
      })
    },
    // init bar echarts
    initBar() {
      const totalCount = this.totalCount || 0
      if (!this.barChart) {
        this.barChart = echarts().init(this.$refs.bar)
      }

      const cTotal = this.newCrr.reduce((total, cur) => {
        total += cur.num || 0
        return total
      }, 0)
      const bTotal = this.newBrr.reduce((total, cur) => {
        total += cur.num || 0
        return total
      }, 0)
      const aTotal = this.newArr.reduce((total, cur) => {
        total += cur.num || 0
        return total
      }, 0)
      const cRating =
        parseFloat((cTotal / (cTotal + bTotal + aTotal)).toFixed(4)) * 100

      // let total = this.data.reduce((prev, val) => prev + val, 0)
      // let str = `C-Rating数量:${total}\nC-Rating比例:60%`
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (data) {
            let total = 0
            for (let i in data) {
              total += data[i].data.value
            }
            const percent = !totalCount
              ? 0
              : ((total / totalCount) * 100).toFixed(2)
            const type = data[0].data.type
            return `${type}-Rating数量：${total}家<br/>${type}-Rating比例：${percent}%`
          }
        },
        xAxis: {
          type: 'category',
          data: _.uniq(
            this.data.map((d) => {
              return d.type
            })
          ),
          axisLabel: {
            color: '#fff',
            interval: 0
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            interval: 0,
            rotate: 0
          }
        },
        graphic: [
          {
            type: 'text',
            right: 0,
            top: 10,
            style: {
              fill: '#7E84A3',
              text: `C-Rating数量:${cTotal}家\n \nC-Rating比例:${
                isNaN(cRating) ? 0 : cRating.toFixed(2)
              }%`,
              font: '9px sans-serif'
            }
          }
        ],
        series: [
          {
            type: 'bar',
            data: [this.newArr[2], this.newBrr[2], this.newCrr[2]],
            label: {
              show: true,
              position: 'bottom',
              align: 'center',
              distance: 10,
              color: '#000',
              formatter: function (data) {
                return data.data.name
              },
              fontSize: 9
            },
            color: 'rgba(119, 203, 255, 1)'
          },
          {
            type: 'bar',
            label: {
              show: true,
              position: 'bottom',
              align: 'center',
              distance: 10,
              // offset: [-8, 0],
              color: '#000',
              formatter: function (data) {
                return data.data.name
              },
              fontSize: 9
            },
            data: [this.newArr[1], this.newBrr[1], this.newCrr[1]],
            color: 'rgba(119, 203, 255, 1)'
          },
          {
            type: 'bar',
            label: {
              show: true,
              position: 'bottom',
              align: 'center',
              color: '#000',
              distance: 10,
              // offset: [-12, 0],
              itemStyle: {
                normal: { color: 'red' }
              },
              formatter: function (data) {
                return data.data.name
              },
              fontSize: 9
            },
            data: [this.newArr[0], this.newBrr[0], this.newCrr[0]],
            color: 'rgba(119, 203, 255, 1)'
          }
        ],
        grid: {
          containLabel: true,
          left: 0,
          top: 50,
          right: 0,
          bottom: 0
        }
      }
      this.$nextTick(() => {
        this.barChart && this.barChart.setOption(option)
      })
    },
    mergeBarOptions() {}
  }
}
</script>

<style lang="scss">
.sponser-container {
  position: relative;
  height: 100%;
  .checkbox-container {
    .el-select {
      width: 100%;
    }
  }
  .pie-container {
    /* margin-top: 15px; */
    z-index: 2;
    height: calc(50% - 30px);
    margin-top: 15px;
  }
  .bar-container {
    z-index: 1;
    height: calc(50% - 30px);
  }
  .Rating {
    position: absolute;
    right: 4px;
    bottom: 42%;
    z-index: 999;
    background: #e8effe;
    font-weight: 500;
  }
}
</style>
