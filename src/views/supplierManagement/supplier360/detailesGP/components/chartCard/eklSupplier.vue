<template>
  <iCard class="section"
         style="height:16rem">
    <div class="title">
      <p v-if="!isTitle">{{ language('EKLPEIFUJIAN', 'EKL-配附件') }}</p>
      <p v-if="isTitle">{{ language('EKLPILIANGJIAN', 'EKL-批量件') }}</p>
      <!-- <span v-permission="PORTAL_SUPPLIER_CARD_EKL_MORE"
            class="el-dropdown-link">
        <i class="el-icon-more"></i>
      </span> -->
      <el-dropdown>
        <span class="el-dropdown-link">
          <i class="el-icon-more"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-permission="PORTAL_SUPPLIER_CARD_EKL_MORE"
                            @click.native="openDilog">{{language('CHAKAN', '查看')}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <p class="tagMoney">{{ language('JINEWANAYUAN', '金额(万元)') }}</p>
    <div class="box">
      <span v-if="!isTitle"
            class="text"
            @click="changeTab">{{
        language('EKLPILIANGJIAN', 'EKL-批量件')
      }}</span>
      <span v-if="isTitle"
            class="text"
            @click="changeTab">{{
        language('EKLPEIFUJIAN', 'EKL-配附件')
      }}</span>
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
import { getSupplierCard } from '@/api/supplierManagement/supplierCard/index'
import img from '@/assets/images/eklSupplier.svg'
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
      chart: 'oneChart',
      isTitle: true,
      img: img
    }
  },
  computed: {
    style () {
      return {}
    }
  },
  watch: {
    infodata (data) {
      console.log(data)
      this.getData(data.sapCode)
    },
    '$i18n.locale' () {
      this.getChart();
    }
  },
  mounted () { },
  methods: {
    getData () {
      let req = {
        supplierSapCode: this.infodata.sapCode
      }
      getSupplierCard(req).then(res => {
        this.info = res.data
        // this.info = {
        //   batchParts: [
        //     {
        //       increaseAmount: 10,
        //       reductionAmount: 20,
        //       increaseRtio: 4,
        //       reductionRtio: 0.03,
        //       year: 2019
        //     },
        //     {
        //       increaseAmount: 20,
        //       reductionAmount: 10,
        //       increaseRtio: 5,
        //       reductionRtio: 0.01,
        //       year: 2020
        //     },
        //     {
        //       increaseAmount: 15,
        //       reductionAmount: 15,
        //       increaseRtio: 4,
        //       reductionRtio: 0.05,
        //       year: 2021
        //     }
        //   ],
        //   parts: [
        //     {
        //       increaseAmount: 30,
        //       reductionAmount: 30,
        //       increaseRtio: 10,
        //       reductionRtio: 10,
        //       year: 2019
        //     },
        //     {
        //       increaseAmount: 40,
        //       reductionAmount: 40,
        //       increaseRtio: 0,
        //       reductionRtio: 0,
        //       year: 2020
        //     },
        //     {
        //       increaseAmount: 0,
        //       reductionAmount: 0,
        //       increaseRtio: 0,
        //       reductionRtio: 0,
        //       year: 2021
        //     }
        //   ],
        //   supplierSapCode: null
        // }
        this.getChart()
      })
    },
    changeTab () {
      this.isTitle = !this.isTitle
      this.getChart()
    },
    openDilog () {
      let router = this.$router.resolve({
        path: '/achievement/baseData/mymerit',
        query: {
          supplier_code_name: `${this.infodata.sapCode}-${this.infodata.nameZh}`
        }
      })
      window.open(router.href, '_blank')
    },
    getChart () {
      arr = []
      var data1 = []
      var data2 = []
      var data3 = []
      var data4 = []
      var data5 = []
      let arr = []
      if (this.isTitle) {
        arr = this.info.batchParts
      } else {
        arr = this.info.parts
      }
      arr.forEach(e => {
        data1.push(e.reductionAmount)
        if (e.increaseAmount != 0) {
          data2.push(e.increaseAmount * -1)
        } else {
          data2.push(e.increaseAmount)
        }
        data3.push(e.reductionRtio)
        data4.push(e.increaseRtio * -1)
        data5.push(e.year)
      })
      console.log(data3, "data3")
      // data3=this.sumItem(data3,data1)
      // console.log(data1)
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
          trigger: 'axis',
          //   formatter:'{a}{b}{c}',
          formatter: function (params) {
            console.log(params)
            let str = ''
            params.forEach((item, idx) => {
              item.data = Math.abs(item.data)
              // if (idx == 2) {
              //   item.data = item.data - params[0].data
              // }
              str += `${item.marker}\n${item.seriesName}: ${parseFloat(item.data).toFixed(2)}`
              switch (idx) {
                case 0:
                  str += ''
                  break
                case 1:
                  str += ''
                  break
                case 2:
                  str += ''
                  break
                case 3:
                  str += '%'
                  break
                default:
                  str += 'w(ﾟДﾟ)w'
              }
              str += idx === params.length - 1 ? '' : '<br/>'
            })
            return str
          }
        },
        grid: {
          top: '20%',
          bottom: '16%%',
          right: '0%',
          left: '10%'
        },
        xAxis: {
          type: 'category',
          data: data5,
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
        yAxis: [
          {
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
          {
            show: false,
            name: this.language('ZHANGJIAJIEJIANGBI', '涨价节降比'),
            type: 'value',
            axisLabel: {
              show: true,
              textStyle: {
                color: '#7E84A3',
                fontSize: '10px'
              }
            }
          }
        ],
        series: [
          {
            name: this.language('ZHANGJIA', '涨价'),
            data: data2,
            type: 'bar',
            barWidth: 40,
            yAxisIndex: 0,  // 配置多个y轴
            itemStyle: {
              normal: {
                fontSize: 12,
                barBorderRadius: [0, 0, 5, 5],
                color: '#73A1FA' //改变折线点的颜色
              }
            },
            label: {
              show: true,
              position: 'inside',
              color: '#fff',
              formatter: function (params) {
                console.log(params)
                return parseFloat(params.data).toFixed(2)
              }
            }
          },
          {
            name: this.language('JIANGJIA', '降价'),
            data: data1,
            type: 'bar',
            barGap: '-100%',
            yAxisIndex: 0,  // 配置多个y轴
            barWidth: 40,
            label: {
              show: true,
              position: 'inside',
              color: '#fff',
              formatter: function (params) {
                console.log(params)
                return parseFloat(params.data).toFixed(2)
              }
            },
            itemStyle: {
              normal: {
                fontSize: 12,
                barBorderRadius: [5, 5, 0, 0],
                color: '#67C23A' //改变折线点的颜色
              }
            }
          },
          {
            name: this.language('ZHANGJIAJIEJIANGBI', '涨价节降比'),
            data: data4,
            type: 'line',
            yAxisIndex: 1,  // 配置多个y轴
            label: {
              show: false,
              position: 'top',
              fontSize: 10,
              color: '#727272',
              formatter: function (params) {
                let num = params.data
                // console.log(num-data1[0])
                // data1.forEach((res) => {
                //   console.log(res)
                //   num = num - res
                // })

                return num + '%'
              }
            },
            itemStyle: {
              normal: {
                color: '#FFB04D', //改变折线点的颜色
                lineStyle: {
                  color: '#FFB04D' //改变折线颜色
                }
              }
            }
          },
          {
            name: this.language('JIANGJIAJIEJIANGBI', '降价节降比'),
            data: data3,
            type: 'line',
            yAxisIndex: 1,  // 配置多个y轴
            label: {
              show: false,
              position: 'top',
              fontSize: 10,
              color: '#727272',
              formatter: function (params) {
                let num = params.data
                // console.log(num-data1[0])
                // data1.forEach((res) => {
                //   console.log(res)
                //   num = num - res
                // })

                return num + '%'
              }
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
    },
    sumItem: function (arr1, arr2) {
      if (arr2.length == 0) {
        return arr1
      } else {
        arr1.map(function (value, index) {
          arr2[index] += value + 1
        })
      }
      return arr2
    }
  }
}
</script>

<style lang="scss" scoped>
.section {
  position: relative;
}
.tagMoney {
  position: absolute;
  top: 35px;
  left: 160px;
  color: #5f6f8f;
  font-size: 14px;
}
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
  position: relative;
  height: 100%;
  display: flex;
  height: 160px;
  align-items: center;
  // justify-content: space-between;
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
