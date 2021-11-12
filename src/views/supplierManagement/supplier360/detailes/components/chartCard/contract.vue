<template>
  <iCard style="height:20rem">
    <div class="title">
      <p>{{language('HETONGDINGDAN', '合同订单')}}</p>

    </div>
    <div class="center">
      <div class=" chartStyleBox chartStyle">
        <div ref="chart1"
             class="chartStyle1">

        </div>
        <div class="chartText ">
          <p v-if="chooseEquipment.data!=''">{{chooseEquipment.data}}%</p>
          <p>{{chooseEquipment.value}}</p>
        </div>
      </div>
      <icon class="alert"
            symbol
            name="icona-zhankailan"></icon>

      <div ref="chart2"
           class="chartStyle2"> </div>

    </div>
  </iCard>
</template>
<script>
import echarts from '@/utils/echarts'
import { iCard, icon } from 'rise'
import {
  getCatogeryCollect,
  getCatogeryCollectYear
} from '@/api/supplierManagement/supplierCard/index'
export default {
  props: {},
  components: {
    iCard,
    icon
  },
  data() {
    return {
      info: {},
      option1: {},
      option2: {},
      chooseEquipment: {
        data: '',
        value: ''
      },
      infoBar: []
    }
  },
  computed: {
    style() {
      return {}
    }
  },
  watch: {},
  mounted() {
    this.getData()
  },
  created() {},
  methods: {
    getData() {
      getCatogeryCollect(this.$route.query.subSupplierId).then((res) => {
        this.info = res.data
        this.getLeftChart()
      })
      let req = {
        catogeryCode: '',
        tmSupplierId: this.$route.query.subSupplierId
      }
      getCatogeryCollectYear(req).then((res) => {
        this.infoBar = res.data
        this.getRightChart()
      })
    },
    getLeftChart() {
      let data1 = []
      this.info.forEach((e) => {
        data1.push({ value: Math.abs(e.receiveAmount), name: e.catogeryCode })
      })
      let obj = this

      const myChart = echarts().init(this.$refs.chart1)
      this.option1 = {
        title: {
          text: '单位：百万  ',
          right: 50,
          textStyle: {
            color: '#909091',
            fontSize: 10
          }
        },
        grid: {
          top: 0,
          right: '10%'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          bottom: 0,
          icon: 'circle',
          textStyle: {
            fontSize: 10,
            color: '#909091'
          },
          formatter: function (params) {
            let obj = data1.find((res) => {
              return res.name == params
            })
            var percent = 0
            var total = 0
            for (var i = 0; i < data1.length; i++) {
              total += data1[i].value
            }
            percent = ((obj.value / total) * 100).toFixed(0)
            if (obj.name !== '') {
              return obj.name + '\n' + percent + '%'
            } else {
              return ''
            }
          }
        },
        series: [
          {
            center: ['50%', '34%'],
            label: {
              show: false,
              position: 'center'
            },
            name: '材料组编号',
            type: 'pie',
            radius: ['45%', '70%'],
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 5
            },
            data: data1
          }
        ]
      }
      myChart.setOption(this.option1)
      myChart.on('click', (params) => {
        this.getRightChart(params.name)
      })
      myChart.on('mouseover', function (params) {
        /*添加鼠标事件*/ obj.chooseEquipment.value = params.value
        obj.chooseEquipment.value = parseInt(
          obj.chooseEquipment.value / 1000000
        ).toLocaleString()

        if (params.percent === 0) obj.chooseEquipment.data = '0.00'
        else obj.chooseEquipment.data = params.percent
      })
    },
    getRightChart(val) {
      var data1 = []
      var data2 = []
      var data3 = []
      let newDataBar = {}
      let newDataSum = {}
      let barData = []
      let sumData = []
      this.infoBar.forEach((e) => {
        //新建属性名获取按材料id累计
        if (Object.keys(newDataBar).indexOf('' + e.catogeryCode) === -1) {
          newDataBar[e.catogeryCode] = []
        }
        //对应插入属性值
        newDataBar[e.catogeryCode].push(e)
        //新建属性名
        if (Object.keys(newDataSum).indexOf('' + e.year) === -1) {
          newDataSum[e.year] = []
        }
        //对应插入属性值获取按年累计
        newDataSum[e.year].push(e)
      })
      let total = 0
      //循环生成每一年分累计得总值
      for (var i in newDataSum) {
        total = 0
        newDataSum[i].forEach((res, j) => {
          if (i == res.year) {
            total += Math.abs(parseInt(res.receiveAmount))
          }
        })
        sumData.push({ year: i, receiveAmountAll: total })
      }
      //给当前材料idpush进当前年总值
      if (val) {
        barData = newDataBar[val]
        sumData.forEach((v) => {
          barData.forEach((j) => {
            if (v.year == j.year) {
              j.receiveAmountAll = v.receiveAmountAll
            }
          })
        })
      }
      if (val) {
        barData.forEach((v) => {
          data1.push(parseInt(v.receiveAmountAll / 1000000))
          data2.push(Math.abs(parseInt(v.receiveAmount / 1000000)))
          data3.push(v.year)
        })
      } else {
        sumData.forEach((v) => {
          data1 = []
          data2.push(Math.abs(parseInt(v.receiveAmountAll / 1000000)))
          data3.push(v.year)
        })
      }
      //   console.log(data1)
      //   console.log(data2)
      //   console.log(data3)
      //   console.log(barData)
      //   console.log(sumData)
      let title = 'Turnover' || val
      const myChart = echarts().init(this.$refs.chart2)
      this.option2 = {
        title: {
          top: 0,
          itemGap: 4,
          text: title,
          subtext: '（Million RMB）',
          textStyle: {
            color: '#909091',
            fontSize: 10
          },
          subtextStyle: {
            color: '#909091',
            fontSize: 10
          }
        },
        // legend: {
        //   icon: 'circle',
        //   right: '10%',

        //   top: 14,
        //   textStyle: {
        //     fontSize: 10,
        //     color: '#909091'
        //   },
        //   itemWidth: 8,
        //   itemHeight: 8
        // },

        tooltip: {
          trigger: 'axis',
          textStyle: {
            align: 'left'
          },
        },
        grid: {
          top: '18%',
          bottom: '10%%',
          right: '10%',
          left: '10%'
        },
        xAxis: {
          type: 'category',
          data: data3,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#7E84A3',
              fontSize: '10px'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#7E84A3'
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            show: true,
            textStyle: {
              color: '#7E84A3',
              fontSize: '10px'
            }
          }
        },
        series: [
          {
            // name: val?'综合':val,
            data: data1,
            type: 'bar',
            barGap: '-100%',
            // label: {
            //   show: true,
            //   position: 'top',
            //   color: '#333'
            // },
            itemStyle: {
              normal: {
                fontSize: 12,
                barBorderRadius: [5, 5, 0, 0],
                color: '#A2C0FC' //改变折线点的颜色
              }
            }
          },
          {
            // name: val?val:'综合',
            data: data2,
            type: 'bar',
            // label: {
            //   show: true,
            //   position: 'inside',
            //   color: '#fff'
            // },
            itemStyle: {
              normal: {
                fontSize: 12,
                barBorderRadius: [5, 5, 0, 0],
                color: '#5B91FA' //改变折线点的颜色
              }
            }
          }
        ]
      }
      myChart.setOption(this.option2)
    },
    //千分位格式化
    format(n) {
      let num = n.toString()
      let decimals = ''
      // 判断是否有小数
      num.indexOf('.') > -1 ? (decimals = num.split('.')[1]) : decimals
      let len = num.length
      if (len <= 3) {
        return num
      } else {
        let temp = ''
        let remainder = len % 3
        decimals ? (temp = '.' + decimals) : temp
        if (remainder > 0) {
          // 不是3的整数倍
          return (
            num.slice(0, remainder) +
            ',' +
            num.slice(remainder, len).match(/\d{3}/g).join(',') +
            temp
          )
        } else {
          // 是3的整数倍
          return num.slice(0, len).match(/\d{3}/g).join(',') + temp
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: space-between;
  padding-top: 15px;
  p {
    font-size: 20px;
    font-family: Arial;
    font-weight: bold;
    color: #131523;
  }
}
.chartText {
  width: 300px;
  text-align: center;
  position: absolute;
  top: 24%;
  left: 25%;
  p:nth-child(1) {
    font-size: 22px;
    font-family: Arial;
    font-weight: bold;
    color: #41434a;
  }
  p:nth-child(2) {
    font-size: 30px;
    font-family: Arial;
    font-weight: bold;
    color: #0059ff;
  }
}
.alert {
  font-size: 28px;
}
.chartStyleBox {
  width: 100%;
  height: 100%;
}

.center {
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div {
    height: 260px;
  }
  .chartStyle1 {
    width: 100%;
    height: 260px;
  }
  .chartStyle {
    position: relative;
    width: 35%;
  }
  .chartStyle2 {
    width: 45%;
  }
}
</style>