<template>
  <div class="sponser-container">
    <div class="checkbox-container">
      <el-select
        v-model="checkList"
        multiple
        collapse-tags
        style="width: 55.5%"
        placeholder="请选择科室"
        @change="handleChange"
      >
        <el-option
          v-for="item in options"
          :key="item.existShareId"
          :label="item.existShareName"
          :value="item.existShareId"
        >
        </el-option>
      </el-select>
    </div>
    <div class="pie-container" ref="pie" style="height: 190px"></div>
    <div class="bar-container" ref="bar" style="height: 230px"></div>
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
      chart: null
    }
  },
  mounted() {
    this.getKpiCates()
    this.getSponserList()
  },
  methods: {
    async getKpiCates() {
      const result = await getKpiCates()
      if (result.code === '200' && result.data) {
        this.options = result.data
      }
    },
    async getSponserList() {
      this.totalCount = 0
      const result = await getSponserData(this.query)
      if (result.code === '200' && result.data) {
        let data = result.data.slice(0, 9)
        const dataGrade = data.map((item) => {
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
        }
        for (let i = 0; i < data.length; i++) {
          data[i].value = data[i].num
          data[i].name = data[i].grade
          if (i < 3) {
            data[i].type = 'A'
          } else if (i < 6 && i > 2) {
            data[i].type = 'B'
          } else {
            data[i].type = 'C'
          }
          this.totalCount += data[i].num
        }
        this.data = data
        this.data.forEach((item) => {
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
        this.newCrr.forEach((item) => (this.total += item.value))
      }
      this.initPie()
      this.initBar()
    },
    handleChange(val) {
      this.query.departmentIds = val
      this.getSponserList()
    },
    handleArr(arr, str) {
      arr.sort((a, b) => b.num - a.num)
      if (str == 'C') {
        arr.forEach((item, index) => {
          if (index == 0) {
            item.grade = str + str + str
            item.name = str + str + str

            item.itemStyle = {
              color: 'rgba(98, 157, 290, 1)'
            }
          } else if (index == 1) {
            item.grade = str + str
            item.name = str + str
            item.itemStyle = {
              color: 'rgba(98, 157, 290, 1)'
            }
          } else {
            item.grade = str
            item.name = str
            item.itemStyle = {
              color: 'rgba(98, 157, 290, 1)'
            }
          }
        })
      } else if (str == 'B') {
        arr.forEach((item, index) => {
          if (index == 0) {
            item.grade = str
            item.name = str
          } else if (index == 1) {
            item.grade = str + str
            item.name = str + str
          } else {
            item.grade = str + str + str
            item.name = str + str + str
          }
        })
      } else {
        arr.forEach((item, index) => {
          if (index == 0) {
            item.grade = str
            item.name = str
          } else if (index == 1) {
            item.grade = str + str
            item.name = str + str
          } else {
            item.grade = str + str + str
            item.name = str + str + str
          }
        })
      }
      return arr
    },
    initPie() {
      const data = _.cloneDeep(this.data)
      let totalSum = 0
      data.forEach((item) => (totalSum += item.num))
      data.forEach((item) => {
        if (item.name.length == 3) {
          item.name =
            item.name +
            '    ' +
            `${String((item.num / totalSum)) == 'NaN' ? '0.00' : ((item.num / totalSum).toFixed(2) * 100).toFixed(2) }%` +
            '   '
        } else if (item.name.length == 2) {
          item.name =
            item.name +
            '      ' +
            `${String((item.num / totalSum)) == 'NaN' ? '0.00' : ((item.num / totalSum).toFixed(2) * 100).toFixed(2) }%` +
            '   '
        } else {
          item.name =
            item.name +
            '        ' +
            `${String((item.num / totalSum)) == 'NaN' ? '0.00' : ((item.num / totalSum).toFixed(2) * 100).toFixed(2) }%` +
            '    '
        }
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
      // let sortA = data.sort().slice(0,3).reverse()
      // let arr = [...sortA, ...data.slice(3, data.length)]
      this.legendData = data
      const chart = echarts().init(this.$refs.pie)
      this.chart = chart
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: function (data) {
            let name = data.data.name.split(/\s+/)[0]
            return `${name}:<br/>
            ${total}家<br/>
            ${String((data.data.num / total)) === 'NaN' ? '0.00' : ((data.data.num / total).toFixed(2) * 100).toFixed(2)}%
            `
          }
        },
        legend: [
          {
            left: '60%',
            orient: 'vertical',
            icon: 'circle',
            itemHeight: 8,
            type: 'plain',
            data: this.legendData,
            tooltip: {
              show: true,
              formatter: function (data) {
                let name = data.name.split( /\s+/)[0]
                let num = (parseInt(data.name.split( /\s+/)[1])/100) * total
                return `${name}:<br/>
                ${total}家<br/>
                ${String((num / total)) === 'NaN' ? '0.00' : ((num / total).toFixed(2) * 100).toFixed(2)}%
                `
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
        ]
      }
      option && chart.setOption(option)

      // 监听饼状图鼠标移入事件
      chart.on('mouseover', (param) => {
        const newLegends = this.legendData.map((e) => {
          if (e.name === param.name) {
            e.textStyle.fontWeight = 'bold'
          } else {
            e.textStyle.fontWeight = 'normal'
          }
          return e
        })
        this.mergeOptions(newLegends)
      })

      // 监听饼状图鼠标移出事件
      chart.on('mouseout', () => {
        const newLegends = this.legendData.map((e) => {
          e.textStyle.fontWeight = 'normal'
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
            tooltip: {
              show: true,
              formatter: function (data) {
                let name = data.name.split( /\s+/)[0]
                let num = (parseInt(data.name.split( /\s+/)[1])/100) * _that.total
                return `${name}:<br/>
                ${_that.total}家<br/>
                ${String((num / _that.total)) === 'NaN' ? '0.00' : ((num / _that.total).toFixed(2) * 100).toFixed(2)}%
                `
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
        ]
      }
      option && this.chart.setOption(option)
    },
    initBar() {
      const totalCount = _.cloneDeep(this.totalCount)
      const chart = echarts().init(this.$refs.bar)
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
            const type = data[0].data.type
            return `${type}-Rating数量：${total}<br/>${type}-Rating比例：${
              String((total / totalCount)) === 'NaN' ? '0.00' : ((total / totalCount).toFixed(2) * 100).toFixed(2)
            }%`
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
            right: 38,
            bottom: 188,
            // children: [
            //   {
            //     type: 'text',
            //     left: 'center',
            //     top: 'center',
            //     z: 100,
            //     style: {
            //       fill: '#7E84A3',
            //       text: 'C-Rating数量:' + 36 + '\nC-Rating比例:60%',
            //       font: '7px sans-serif'
            //     }
            //   }
            // ]
            style: {
                  fill: '#7E84A3',
                  text: 'C-Rating数量:36\n'+'\nC-Rating比例:60%',
                  font: '7px sans-serif'
                }
          }
        ],
        series: [
          {
            type: 'bar',
            data: [this.newArr[2], this.newBrr[2], this.newCrr[0]],
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
            data: [this.newArr[0], this.newBrr[0], this.newCrr[2]],
            color: 'rgba(119, 203, 255, 1)'
          }
        ]
      }
      option && chart.setOption(option)
    }
  }
}
</script>

<style lang="scss">
.sponser-container {
  position: relative;
  .checkbox-container {
    .el-select {
      width: 100%;
    }
  }
  .pie-container {
    margin-top: 15px;
    z-index: 2;
  }
  .bar-container {
    z-index: 1;
    margin-top: -20px;
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
