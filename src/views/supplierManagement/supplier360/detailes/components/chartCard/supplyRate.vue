<template>
  <iCard style="height:16rem">
    <div class="title">
      <p>{{language('PEIFUJIANGONGHUOLV', '配附件供货率')}}</p>
    </div>

    <div class="box">
      <img :src="img"
           class="imgIcon" />

      <div ref="chart"
           class="chartStyle"></div>
    </div>
  </iCard>
</template>
<script>
import echarts from '@/utils/echarts'
import { iCard, } from 'rise'
import { getSapSupplierRate } from '@/api/supplierManagement/supplierCard/index'
import img from '@/assets/images/supplyRate.svg'
export default {
  props: {
    infodata: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  components: {
    iCard,
  },
  data () {
    return {
      img: img,
      chart: 'oneChart',
      option: {},
      info: {}
    }
  },
  computed: {
    style () {
      return {}
    }
  },
  watch: {
    infodata (data) {
      this.getData(data.sapCode)
    },
    '$i18n.locale' () {
      this.getChart();
    }
  },

  mounted () {

  },
  methods: {
    getData () {
      getSapSupplierRate(this.infodata.sapCode).then((res) => {
        this.info = res.data
        this.getChart()
      })
    },
    getChart () {
      let data1 = []
      let data2 = []
      let data3 = []
      this.info.forEach((e) => {
        data1.push(e.average)
        data2.push(e.supplyRate)
        data3.push(e.month)
      })
      data3 = data3.map(res => {
        return res = parseInt(res) + this.language('SPR_FRM_DEP_MONTH', '月')
      })
      let max = Math.max(...data2) === 0 ? Math.max(...data1) : Math.max(...data2)

      const myChart = echarts().init(this.$refs.chart)
      this.option = {
        title: {
          top: 0,
          text: this.language('PEIFUJIANGONGHUOLV', '配附件供货率'),
          textStyle: {
            color: '#909091',
            fontSize: 10
          }
        },
        legend: {
          icon: 'circle',

          textStyle: {
            fontSize: 10,
            color: '#909091'
          },
          itemWidth: 8,
          itemHeight: 8
        },

        tooltip: {
          trigger: 'axis',
          formatter: function (data) {

            let str = ''
            let val = ''
            data.forEach(res => {
              val = (Number(res.data) * 100).toFixed(2) + "%"
              str += res.marker + res.seriesName + ':' + val + '<br>'
            })
            return str

          }
        },
        grid: {
          top: '18%',
          bottom: '16%%',
          right: '0%',
          left: '10%'
        },
        xAxis: {
          type: 'category',
          data: data3,
          axisLabel: {
            interval: 0,
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
          },
          max: max,
          min: 0,
          splitNumber: 2
        },
        series: [
          {
            showSymbol: false,
            name: this.language('GONGYINGSHANG', '供应商'),
            data: data2,
            type: 'line',
            smooth: true,
            itemStyle: {
              normal: {
                color: '#6192F0', //改变折线点的颜色
                lineStyle: {
                  color: '#6192F0' //改变折线颜色
                }
              }
            }
          },
          {
            showSymbol: false,
            name: this.language('PINGJUNCANKAO', '平均参考'),
            data: data1,
            type: 'line',
            smooth: true,
            itemStyle: {
              normal: {
                color: '#B4C9F2', //改变折线点的颜色
                lineStyle: {
                  color: '#B4C9F2', //改变折线颜色
                  type: 'dotted' //'dotted'虚线 'solid'实线
                }
              }
            }
          }
        ]
      }
      myChart.setOption(this.option)
    }
  }
}
</script>

<style lang="scss" scoped>
.imgIcon {
  width: 60px;
  height: 60px;
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
  i {
    font-size: 20px;
    cursor: pointer;
    color: #4d4d4d;
  }
}
.early {
  font-size: 70px;
  padding-right: 10px;
}

::v-deep .card ::v-deep.cardHeader {
  padding: 0;
}
.box {
  height: 100%;
  display: flex;
  height: 160px;
  align-items: center;
  justify-content: space-between;
  .chartStyle {
    width: 80%;
    height: 100%;
  }
}
.box:nth-child(1) div {
  margin: 6px;
}
</style>
