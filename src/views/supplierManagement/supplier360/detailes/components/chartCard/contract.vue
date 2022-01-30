<template>
  <iCard style="height:20rem">
    <div class="title">
      <p>{{ language('HETONGDINGDAN', '合同订单') }}</p>
    </div>
    <div class="center" v-if="!isShow">
      <div v-loading="loading1"
           class=" chartStyleBox chartStyle">
        <div ref="chart1"
             class="chartStyle1"></div>
        <div class="chartText ">
          <p v-if="chooseEquipment.data != ''">
            {{ chooseEquipment.data||'' }}%
          </p>
          <p>{{ chooseEquipment.value||'' }}</p>
        </div>
      </div>
      <img :src="img"
           class="imgIcon" />
      <div v-loading="loading2"
           ref="chart2"
           class="chartStyle2"></div>
    </div>
    <div v-if="isShow">
      <span style="font-size:18px;color:rgba(107, 121, 149, 0.56);margin-bottom: 5px;
    display: flex;
    height: 10rem;
    position: relative;
    align-items: center;
    justify-content: space-between;">{{language('GONGYINGSHANGZHANWUYEWUSHUJU', '供应商暂无该业务数据')}}</span>
    </div>
  </iCard>
</template>
<script>
import echarts from '@/utils/echarts'
import { iCard } from 'rise'
import { cloneDeep } from 'lodash'
import {
  getCatogeryCollect,
  getCatogeryCollectYear,
  queryMaterialGroupByCondition
} from '@/api/supplierManagement/supplierCard/index'
import img from '@/assets/images/contract.svg'
export default {
  props: {},
  components: {
    iCard
  },
  data () {
    return {
      info: {},
      option1: {},
      option2: {},
      chooseEquipment: {
        data: '',
        value: ''
      },
      infoBar: [],
      img: img,
      ifBarchart: false,
      loading1: false,
      loading2: false,
      topcarogery: [],
      isShow:false
    }
  },
  computed: {
    style () {
      return {}
    }
  },
  watch: {},
  mounted () {
    this.getData()
  },
  created () { },
  methods: {
    getData () {
      this.loading1 = true
      this.loading2 = true
      getCatogeryCollect(this.$route.query.subSupplierId).then((res) => {
        this.isShow = true;
        if (res && res.code == 200) {
          this.loading1 = false
          this.info = res.data
          if (this.info.length > 0) {
            this.isShow = false;
            this.getLeftChart()
          }
        } else this.loading1 = false
      })
      let req = {
        catogeryCode: '',
        tmSupplierId: this.$route.query.subSupplierId
      }
      getCatogeryCollectYear(req).then((res) => {
        if (res && res.code == 200) {
          this.loading2 = false
          this.infoBar = res.data
          if (this.infoBar.length > 0) {
            this.getRightChart()
          }
        } else this.loading2 = false
      })
    },
    // 排序
    compare (property, desc) {
      return function (a, b) {
        var value1 = a[property]
        var value2 = b[property]
        if (desc == true) {
          // 升序排列
          return value1 - value2
        } else {
          // 降序排列
          return value2 - value1
        }
      }
    },
    async getLeftChart () {
      var data1 = []
      this.info.forEach((e) => {
        data1.push({ value: Math.abs(e.receiveAmount), name: e.catogeryCode })
      })
      let total = 0
      data1 = data1.sort(this.compare('value', false))
      if (data1.length > 4) {
        data1.splice(//数据源自带other，但在这不适用，需要自己取出前五材料组其余算为其他，并删除自带其他
          data1.findIndex((res) => res.name == 'other'),
          data1.findIndex((res) => res.name == 'other')
        )
      }
      data1.forEach((res, i) => {
        if (i > 4) {
          total += res.value
        }
      })

      data1 = data1.splice(0, 5)
      this.topcarogery = data1.map((res) => res.name)

      const data = await queryMaterialGroupByCondition({
        codes: this.topcarogery
      })
      data.data.forEach((res) => {
        data1.forEach((v) => {
          if (v.name == res.categoryCode) {
            v.name = res.categoryNameZh
          }
        })
      })
      data1.push({ name: this.language('QITA', '其他'), value: total })
      //   data1 = data1.sort(this.compare('value', false))
      let obj = this
      console.log(data1)
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
          right: '10%'
        },
        tooltip: {
          trigger: 'item',
          formatter: function (data) {
            return (
              data.seriesName +
              '  ' +
              data.marker +
              data.name +
              '<br>' +
              data.value / 1000000
            )
          }
        },
        legend: {
          type: 'scroll',
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
            percent = (obj.value / total) * 100
            if (percent.length > 2) {
              percent = percent.substr(0, 2) + '...'
            } else {
              percent
            }
            if (obj.name !== '') {
              return obj.name + '\n' + percent.toFixed(2) + '%'
            } else {
              return ''
            }
          }
        },
        series: [
          {
            center: ['50%', '36%'],
            label: {
              show: false,
              position: 'center'
            },
            name: this.language('CAILIAOZUMINGCHENG', '材料组名称'),
            type: 'pie',
            radius: ['45%', '70%'],
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 3
            },
            data: data1
          }
        ]
      }
      myChart.setOption(this.option1)
      myChart.on('click', (params) => {
        this.ifBarchart = !this.ifBarchart
        if (this.ifBarchart) {
          var cotegory = ''
          if (params.name != '其他') {
            cotegory = data.data.find(
              (res) => res.categoryNameZh == params.name
            ).categoryCode
          } else {
            cotegory = params.name
          }

          this.getRightChart(cotegory)
        } else {
          this.getRightChart()
        }
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
    getRightChart (val) {
      //其他为前五之后的累计
      var data1 = []
      var data2 = []
      var data3 = []
      const newDataBar = {}
      const newDataSum = {}
      const sumData = []
      const otherSumData = []
      const OthernewDataSum = {}
      var barData = []
      var otherData = cloneDeep(this.infoBar)
      // 点击为其他时------------------------------
      if (val == this.language('QITA', '其他')) {
        otherData.forEach((v, i) => {//'其他'需要过滤出排名前五的材料组集合和为自带other的集合
          this.topcarogery.forEach((res) => {
            if (v.catogeryCode == res || v.catogeryCode == 'other') {
              otherData[i] = []
            }
          })
        })
        otherData.forEach((e) => {
          //新建属性名按年份累计
          if (Object.keys(OthernewDataSum).indexOf('' + e.year) === -1) {
            OthernewDataSum[e.year] = []
          }
          //对应插入属性值获取按年累计
          OthernewDataSum[e.year].push(e)
        })
        let otherTotal = 0
        //循环生成每一年份累计得总值
        for (var i in OthernewDataSum) {
          otherTotal = 0
          OthernewDataSum[i].forEach((res) => {
            if (i == res.year) {
              otherTotal += Math.abs(parseFloat(res.receiveAmount))
            }
          })
          otherSumData.push({ year: i, receiveAmount: otherTotal })
        }
      }
      // 当不为其他时-------------------------------------------
      this.infoBar.forEach((e) => {
        //新建属性名获取按材料id累计
        if (Object.keys(newDataBar).indexOf('' + e.catogeryCode) === -1) {
          newDataBar[e.catogeryCode] = []
        }
        //对应插入属性值
        newDataBar[e.catogeryCode].push(e)
        //新建属性名按年份累计
        if (Object.keys(newDataSum).indexOf('' + e.year) === -1) {
          newDataSum[e.year] = []
        }
        //对应插入属性值获取按年累计
        newDataSum[e.year].push(e)
      })
      newDataBar.other = otherSumData//第二种方法，将'其他'加入材料组集合，点击时 newDataBar[val]  val为other即可，需修改点击饼图传参
      let total = 0
      //循环生成每一年分累计得总值
      for (var j in newDataSum) {
        total = 0
        newDataSum[j].forEach((res) => {
          if (j == res.year) {
            total += Math.abs(parseFloat(res.receiveAmount))
          }
        })
        sumData.push({ year: j, receiveAmountAll: total })
      }
      //   计算好后赋值-------------------------------------
      //给当前材料idpush进当前年总值
      if (val) {
        if (val != this.language('QITA', '其他')) {
          barData = newDataBar[val]
          sumData.forEach((v) => {
            barData.forEach((j) => {
              if (v.year == j.year) {
                j.receiveAmountAll = v.receiveAmountAll
              }
            })
          })
        } else {
          sumData.forEach((v) => {
            otherSumData.forEach((j) => {
              if (v.year == j.year) {
                j.receiveAmountAll = v.receiveAmountAll
              }
            })
          })
        }
      }
      //val有值代表被点击的值与综合对比
      if (val) {
        //细分为点击其他和材料ID，其他为前五之后所有的累计
        if (val == this.language('QITA', '其他')) {
          barData = otherSumData
          barData.forEach((v) => {
            data2.push(Math.abs(parseInt(v.receiveAmount / 1000000)))
            data3.push(v.year)
            data1.push(parseInt(v.receiveAmountAll / 1000000))
          })
          data3.pop()
        } else {
          barData = newDataBar[val]
          console.log(barData)
          barData.forEach((v) => {
            data1.push(parseInt(v.receiveAmountAll / 1000000))
            data2.push(Math.abs(parseInt(v.receiveAmount / 1000000)))
            data3.push(v.year)
          })
        }
        //综合所有柱状图
      } else {
        sumData.forEach((v) => {
          data1 = []
          data2.push(Math.abs(parseInt(v.receiveAmountAll / 1000000)))
          data3.push(v.year)
        })
      }
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

        tooltip: {
          trigger: 'axis',
          textStyle: {
            align: 'left'
          }
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
    format (n) {
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
.imgIcon {
  width: 60px;
  height: 50px;
}
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
