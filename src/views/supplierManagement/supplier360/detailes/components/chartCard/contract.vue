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
import { getCatogeryCollect } from '@/api/supplierManagement/supplierCard/index'
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
      }
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
      //   getCatogeryCollect(50003037).then((res) => {
      this.info = [
        {
          catogeryCode: '162',
          receiveAmount: '0.00',
          receiveAmountW: '0.00'
        },
        {
          catogeryCode: '097',
          receiveAmount: '-998658.15',
          receiveAmountW: '0.00'
        },
        {
          catogeryCode: '120',
          receiveAmount: '-3500.00',
          receiveAmountW: '0.00'
        },
        {
          catogeryCode: '221',
          receiveAmount: '-3654869.60',
          receiveAmountW: '0.00'
        },
        {
          catogeryCode: '222',
          receiveAmount: '-135707586.40',
          receiveAmountW: '0.00'
        },
        {
          catogeryCode: '059',
          receiveAmount: '-25475.15',
          receiveAmountW: '0.00'
        },
        {
          catogeryCode: '224',
          receiveAmount: '-2170878709.50',
          receiveAmountW: '0.00'
        },
        {
          catogeryCode: '225',
          receiveAmount: '-457009832.10',
          receiveAmountW: '0.00'
        },
        {
          catogeryCode: '039',
          receiveAmount: '0.00',
          receiveAmountW: '0.00'
        },
        {
          catogeryCode: '216',
          receiveAmount: '-7066615.24',
          receiveAmountW: '0.00'
        },
        {
          catogeryCode: '107',
          receiveAmount: '-3840.00',
          receiveAmountW: '0.00'
        },
        {
          catogeryCode: '113A',
          receiveAmount: '0.00',
          receiveAmountW: '0.00'
        },
        {
          catogeryCode: '208',
          receiveAmount: '0.00',
          receiveAmountW: '0.00'
        },
        {
          catogeryCode: '224A',
          receiveAmount: '-8110.50',
          receiveAmountW: '0.00'
        }
      ]
      this.getLeftChart()
      this.getRightChart()
      //   })
    },
    getLeftChart() {
      let data1 = []
      this.info.forEach((e) => {
        data1.push({ value: Math.abs(e.receiveAmount), name: e.catogeryCode })
      })
      let obj = this

      const myChart = echarts().init(this.$refs.chart1)
      this.option1 = {
          title:{
                text:'单位：百万  ',
                right:50,
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
      myChart.on('mouseover', function (params) {
        /*添加鼠标事件*/ obj.chooseEquipment.value = params.value
        obj.chooseEquipment.value = parseInt(
          obj.chooseEquipment.value / 1000000
        )
        if (params.percent === 0) obj.chooseEquipment.data = '0.00'
        else obj.chooseEquipment.data = params.percent
      })
    },
    getRightChart() {
      const myChart = echarts().init(this.$refs.chart2)
      this.option2 = {
        title: {
          top: 0,
          itemGap: 4,
          text: 'Turnover',
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
        legend: {
          icon: 'circle',
          right: '10%',

          top: 14,
          textStyle: {
            fontSize: 10,
            color: '#909091'
          },
          itemWidth: 8,
          itemHeight: 8
        },

        tooltip: {
          trigger: 'axis'
        },
        grid: {
          top: '18%',
          bottom: '10%%',
          right: '10%',
          left: '10%'
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu'],
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
            name: 'Tue',
            data: [64, 47, 54, 57],
            type: 'bar',
            barGap: '-100%',
            barWidth: 30,
            label: {
              show: true,
              position: 'top',
              color: '#333'
            },
            itemStyle: {
              normal: {
                fontSize: 12,
                barBorderRadius: [5, 5, 0, 0],
                color: '#A2C0FC' //改变折线点的颜色
              }
            }
          },
          {
            name: 'Mon',
            data: [14, 23, 11, 6],
            type: 'bar',
            barWidth: 30,
            label: {
              show: true,
              position: 'inside',
              color: '#fff'
            },
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