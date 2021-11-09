<template>
  <iCard style="height:14rem">
    <div class="title">
      <p v-if="isTitle" >{{language('EKLPEIFUJIAN', 'EKL-配附件')}}</p>
      <p v-if="!isTitle" >{{language('EKLPILIANGJIAN', 'EKL-批量件')}}</p>
      <span class="el-dropdown-link">
        <i class="el-icon-more"></i>
      </span>
    </div>
    <div class="box">
      <span v-if="isTitle" class="text" @click="isTitle=false">{{language('EKLPILIANGJIAN', 'EKL-批量件')}}</span>
      <span v-if="!isTitle" class="text" @click="isTitle=true">{{language('EKLPEIFUJIAN', 'EKL-配附件')}}</span>
      <icon class="early"
            symbol
            name="iconcaiwuyujing-icon"></icon>
      <div ref="chart"
           class="chartStyle"> </div>
    </div>
  </iCard>
</template>
<script>
import echarts from '@/utils/echarts'
import { iCard, icon, iMessage } from 'rise'
import { getSupplierCard } from '@/api/supplierManagement/supplierCard/index'
export default {
  props: {},
  components: {
    iCard,
    icon
  },
  data() {
    return {
      chart: 'oneChart',
      isTitle:false
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
  methods: {
    getData() {
    //   let req = {
    //     supplierSapCode: this.$route.query.subSupplierId
    //   }
    //   getSupplierCard(req).then((res) => {
    //     if (res && res.code == 200) {
    //       iMessage.success(res.desZh)
    //       this.getChart()
    //     } else iMessage.error(res.desZh)
    //   })
    },
    getChart() {
      const data1 = [40, 50, 45]
      const data2 = [-20, -25, -30]
      const data3 = [40, 50, 45]
      const myChart = echarts().init(this.$refs.chart)
      var option = {
        legend: {
          icon: 'circle',

          right: 50,
          top: 0,
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
          top: '8%',
          bottom: '12%%',
          right: '0%',
          left: '10%'
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed'],
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
          show: false,
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
            name: '降价',
            data:data1,
            type: 'bar',
            barGap: '-100%',
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
                color: '#1660F1' //改变折线点的颜色
              }
            }
          },
          {
            name: '涨价',
            data: data2,
            type: 'bar',
            barWidth: 30,
            itemStyle: {
              normal: {
                fontSize: 12,
                barBorderRadius: [0, 0, 5, 5],
                color: '#73A1FA' //改变折线点的颜色
              }
            }
          },
          {
            name: '节降比',
            showSymbol: false,
            data: data3,
            type: 'line',
            label: {
              show: true,
              position: 'bottom',
              color: '#727272'
            },
            itemStyle: {
              normal: {
                color: '#FFB04D', //改变折线点的颜色
                lineStyle: {
                  color: '#FFB04D' //改变折线颜色
                }
              }
            }
          }
        ]
      }
      myChart.setOption(option)
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
  position: relative;
  height: 100%;
  display: flex;
  height: 160px;
  align-items: center;
  justify-content: space-between;
  .chartStyle {
    width: 80%;
    height: 100%;
  }
  .text {
    position: absolute;
    top: 20px;
    font-size: 16px;
    font-family: Arial;
    font-weight: 400;
    color: #777777;
  }
}
.box:nth-child(1) div {
  margin: 6px;
}
</style>