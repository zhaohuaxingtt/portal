<template>
  <iCard style="height:14rem">
    <div class="title">
      <p>{{ language('GONGYINGSHANGDEFEN', '供应商得分') }}</p>
      <span class="el-dropdown-link" v-permission="Card_SPI_More">
        <i class="el-icon-more"></i>
      </span>
    </div>
    <div class="box">
      <img :src="img" class="imgIcon" />
      <div class="boxText">
        <div>
          {{ info.currentScore }}
          <div>
            <icon
              v-if="info.upDown > 0"
              symbol
              class="green"
              name="iconpaixu-xiangshang"
            >
            </icon>
            <icon
              v-if="info.upDown < 0"
              symbol
              class="orgin"
              name="iconpaixu-xiangxia"
            >
            </icon>
            <span v-if="info.upDown > 0" class="green"
              >{{ info.percent ? parseInt(info.percent).toString() : '' }}%
            </span>
          </div>
        </div>
        <p>
          {{ language('KEZAISHENGNENGYUANQIANSHU', '可再生能源签署') }}
          <span
            v-if="info.developScore != 0"
            :class="parseInt(info.developScore) >= 0 ? 'green' : 'orgin'"
          >
            + {{ info.developScore ? info.developScore.toString() : '' }}</span
          >
          <span class="green" v-if="info.developScore == 0"> 0</span>
        </p>
        <p>{{ language('WURANWEIGUI', '污染违规') }} <span></span></p>
      </div>
      <div class="chartbox">
        <div ref="chart" class="chartStyle"></div>
        <div class="line">
          <p>{{ fristYear }}</p>
          <p>{{ language('ZHIJIN', '至今') }}</p>
        </div>
      </div>
    </div>
  </iCard>
</template>
<script>
import echarts from '@/utils/echarts'
import { iCard, icon } from 'rise'
import { performCard360 } from '@/api/supplierManagement/supplierCard/index'
import img from '@/assets/images/supplierKpi.svg'
export default {
  props: {},
  components: {
    iCard,
    icon
  },
  data() {
    return {
      img: img,
      chart: 'oneChart',
      option: {},
      info: {},
      fristYear: ''
    }
  },
  computed: {
    style() {
      return {}
    }
  },
  watch: {},
  methods: {
    getData() {
      performCard360({ supplierId: this.$route.query.subSupplierId }).then(
        res => {
          this.info = res.data
          this.getChart()
        }
      )
    },
    getChart() {
      const myChart = echarts().init(this.$refs.chart)
      let data1 = []
      let data2 = []

      for (let item in this.info.mapMonth) {
        data1.push(item) // 将属性名放入list数组中
        data2.push(this.info.mapMonth[item])
      }
      this.fristYear = data1[0]
      this.option = {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          top: '6%',
          bottom: '20%%',
          right: '-6%',
          left: '24%'
          // containLabel: true
        },
        xAxis: {
          type: 'category',
          data: data1,

          axisLabel: {
            interval: data1.length / 2,
            show: false,
            textStyle: {
              color: '#7E84A3',
              fontSize: '10px'
            }
          },
          axisLine: {
            show: false,
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

          splitNumber: 3
        },
        series: [
          {
            showSymbol: false,
            data: data2,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#77CBFF', //改变折线点的颜色
                lineStyle: {
                  color: '#77CBFF' //改变折线颜色
                }
              }
            }
          }
        ]
      }
      myChart.setOption(this.option)
    }
  },
  mounted() {
    this.getData()
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
.green {
  color: #21d59b;
}
.orgin {
  color: #ffb04d;
}
.boxText {
  width: 120px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  div {
    font-size: 30px;
    font-weight: bold;
    color: #41434a;
    margin: 10px;
    position: relative;
    letter-spacing: 4px;
    div {
      display: flex;
      width: 100px;
      align-items: center;
      position: absolute;
      top: 4px;
      right: -110px;
      span {
        margin-left: 4px;
        font-size: 16px;
        font-family: Arial;
        font-weight: bold;
      }
    }
  }
  p {
    width: 120px;
    text-align: center;
    font-size: 10px;
    margin: 6px 0;
    border-radius: 30px;
    font-family: PingFangSC-Regular;
    color: #5f6f8f;
    padding: 4px 6px;
    border: 1px solid #d9dee5;
    position: relative;
    span {
        width: 50px;
        display: inline-block;
      position: absolute;
      top: 6px;
      right: -50px;
      margin-left: 6px;
      font-size: 16px;
      font-family: Arial;
      font-weight: bold;
    }
  }
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
  .chartbox {
    width: 55%;
    height: 100%;
    position: relative;
    > .chartStyle {
      width: 100%;
      height: 100%;
    }
    .line {
      padding-right: 20%;
      position: absolute;
      width: 100%;
      bottom: 4%;
      left: 20%;
      font-size: 10px;
      font-family: Arial;
      font-weight: 400;
      color: #7e84a3;
      display: flex;
      justify-content: space-between;
    }
  }
}
.box:nth-child(1) div {
  margin: 6px;
}
</style>
