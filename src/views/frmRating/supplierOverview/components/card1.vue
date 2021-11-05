<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-21 10:18:28
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <iCard :title="title">
    <div class="height">
      <div v-if="title==='新供应商评级' || title=='New Supplier Rating'" ref="chart" class="piebox">
      </div>
      <div v-else class="flex-align-center" style="justify-content: center;height: 100%;"><img style="width: 60%;" src="./soon.png"></div>
      <div v-if="title==='新供应商评级'|| title=='New Supplier Rating'" class="newSupplierText">
        <iText class="textheight">
          <div class="flex">
            <icon class="icon" symbol name="icongongyingshangshenqingzhong"></icon>
            <div class="flex-between-center-center" v-if="newSupplierAssessVOList.length">
              <span class="underway">{{newSupplierAssessVOList[0].value}}</span>
              <span class="text">{{$t('SPR_FRM_XGYSPJ_JSQZ')}}</span>
            </div>
            <span @click="handleView" class="view cursor">{{$t('LK_CHAKAN')}}</span>
          </div>
        </iText>
        <iText class="textheight">
          <div class="flex">
            <icon class="icon" symbol name="icongongyingshangshenhewancheng"></icon>
            <div class="flex-between-center-center" v-if="newSupplierAssessVOList.length">
              <span class="accomplish">{{newSupplierAssessVOList[1].value}}</span>
              <span class="text">{{$t('SPR_FRM_XGYSPJ_JSHWC')}}</span>
            </div>
            <span @click="handleView" class="view cursor">{{$t('LK_CHAKAN')}}</span>
          </div>
        </iText>
      </div>
    </div>
  </iCard>
</template>

<script>
import { iCard, iText, icon } from 'rise'
import echarts from "@/utils/echarts";

export default {
  components: {
    iCard, iText, icon
  },
  props: {
    chartsId: {
      type: String,
      default: () => {
        return ''
      }
    },
    title: {
      type: String,
      default: () => {
        return ''
      }
    },
    newSupplierAssessVOList: {
      type: Array, default: () => {
        return []
      }
    }
  },
  data() {
    return {
    }
  },
  watch: {
    newSupplierAssessVOList(data) {
      if (this.$refs.chart && this.data.length > 0) {
        this.handlePie();
      }
    },
    '$i18n.locale'(newValue) {
      this.handlePie();
    }
  },
  mounted() {
    this.handlePie()
  },
  methods: {
    handleView() {
      this.$router.push({ path: '/supplier/frmrating/newsupplierrating' })
    },
    handlePie() {
      var max
      max = Math.max.apply(Math, this.newSupplierAssessVOList.map(item => { return item.value }))
      const myChart = echarts().init(this.$refs.chart);
      var option = {}
      option = {
        tooltip: {
          trigger: 'item',
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',//设置图例的方向
          top: 'center',
          right: '50',
          y: "center",
          itemGap: 10,//设置图例的间距
          icon: 'circle',
        },
        color: ['#1863F5', '#5C90F7', '#8BB1FB', '#A2C0FC', '#D0E0FE', '#E8F1FF', '#F3F7FF'],
        series: [
          {
            name: '',
            type: 'pie',
            minAngle: 5,
            radius: ['30%', '50%'],
            center: ['15%', '50%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'center',
              formatter: function() {
                return '{a|' + max + '}';
              },
              rich: {
                a: {
                  fontSize: 28,
                  color: '#ACB8CF',
                  align: 'center',
                  verticalAlign:"top",
                  lineHeight: 20
                }
              },
              textStyle: {
                fontSize: 28,
                color: '#ACB8CF',
                lineHeight: 28
              },
            },
            data: [{
              value: this.newSupplierAssessVOList[0].value,
              name: this.$t('SPR_FRM_XGYSPJ_SQZ')
            }, {
              value: this.newSupplierAssessVOList[1].value,
              name: this.$t('SPR_FRM_XGYSPJ_SHWC')
            }]
          }
        ]
      }
      myChart.setOption(option);
    }
  }
}
</script>

<style lang='scss' scoped>
.center1 {
  display: flex;
  justify-content: center;
  align-items: center;
}
.height {
  .flex-between-center-center {
    width: 180px;
    display: flex;
    align-items: center;
    margin-left: 5px;
    justify-content: flex-start;
  }
  .piebox {
    width: 100%;
    height: 200px;
  }
  .newSupplierText {
    .textheight {
      .flex {
        justify-content: space-between;
        align-items: center;
        height: 100%;
        padding: 20px;
        .text {
          margin-left: 10px;
        }
        .view {
          color: #1763f7;
          font-size: 14px;
          font-weight: bold;
        }
        .icon {
          font-size: 40px;
        }
        .underway {
          color: #1863f5;
          font-size: 32px;
          font-family: Arial;
          font-weight: Bold;
        }
        .accomplish {
          color: #1863f5;
          font-size: 32px;
          font-family: Arial;
          font-weight: Bold;
        }
      }
      height: 50px;
      margin-top: 10px;
    }
  }
}
</style>
