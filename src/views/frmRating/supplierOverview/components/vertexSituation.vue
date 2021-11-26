<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-27 14:47:25
 * @LastEditors: zbin
 * @Descripttion: 供应商询价定点情况
-->
<template>
  <iCard v-loading="loading" :title="$t('SPR_FRM_XGYSPJ_GYSXJDDQK')">
    <!-- @click="handleDialog" -->

    <div ref="chart" @click="handlecRating" class="chartStyle"></div>
  </iCard>
</template>

<script>
import echarts from '@/utils/echarts'
import { iCard } from 'rise'
import { supplierRatingCard } from '@/api/frmRating/supplierOverview/index'

export default {
  components: { iCard },

  data() {
    return {
      chart: 'vertexSituationChati',
      option: {},
      info: {},
      visible: false,
      loading:false
    }
  },
  created() {
    this.tabVal = '1'
    this.getData()
  },
  methods: {
    async getData() {
      this.loading=true
      supplierRatingCard().then((res) => {
        if (res && res.data) {
            this.loading=false
          this.info = res.data
          this.getChart()
        }else  this.loading=false
      })
    },
    handlecRating(){
            this.$emit('show',true)
    },
    handleDialog() {
      this.visible = true
    },
    closeDiolog() {
      this.visible = false
    },
    getChart() {
      const myChart = echarts().init(this.$refs.chart)
      const data1 = [
        this.info.ppSupplierTotal-this.info.ppSupplierQuoteTotal || 0,
        this.info.gpSupplierTotal-this.info.gpSupplierQuoteTotal  || 0
      ]
      const data2 = [
        this.info.ppSupplierQuoteTotal || 0,
        this.info.gpSupplierQuoteTotal || 0
      ]

      this.option = {
        title: {
          text: '供应商数量（家）',
          textStyle: {
            color: '#909091',
            fontSize: 10
          }
        },
        legend: {
          icon: 'circle',
          orient: 'vertical',
          right: 0,
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
          top: '18%',
          bottom: '10%%',
          right: '0%',
          left: '10%'
          // containLabel: true
        },
        xAxis: {
          type: 'category',
          data: [
            this.language('SHENGCAHNGONGYINGSHANG', '生产供应商'),
            this.language('YIBANGONGYINGSHANG', '一般供应商')
          ],
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
            name: this.language(
              'CRatingZHENGZAIBAOJIAGONGYINGSHANG',
              'C-Rating中正在报价供应商'
            ),
            data: data1,
            type: 'bar',
            barGap: '-100%',
            barWidth: 50,
            label: {
              show: true,
              position: 'top',
              color: '#333'
            },
            itemStyle: {
              normal: {
                fontSize: 12,
                barBorderRadius: [5, 5, 0, 0],
                color: '#A2C0FC', //改变折线点的颜色
                textStyle: {
                  fontSize: '12px'
                }
              }
            }
          },
          {
            name: this.language(
              'CRatingWEIZAIBAOJIAGONGYINGSHANG',
              'C-Rating未在报价中供应商'
            ),
            data: data2,
            type: 'bar',
            barWidth: 50,
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
      myChart.setOption(this.option)
    }
  }
}
</script>

<style scoped lang="scss">
.early {
  display: inline-block;
  font-size: 20px;
}
.center1 {
  display: flex;
  justify-content: center;
  align-items: center;
}
.chartStyle {
  width: 100%;
  height: 320px;
}
::v-deep .el-textarea {
  height: 580px;
}
::v-deep .el-textarea .el-textarea__inner {
  height: 100%;
}
</style>
