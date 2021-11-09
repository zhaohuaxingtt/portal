<template>
  <iCard style="height:14rem">
    <div class="title">
      <p>{{language('GONGYINGSHANGDEFEN', '供应商得分')}}</p>
      <span class="el-dropdown-link">
        <i class="el-icon-more"></i>
      </span>
    </div>
    <div class="box">
      <icon class="early"
            symbol
            name="iconcaiwuyujing-icon"></icon>
      <div class="boxText">
        <div class="boxTitle"> 90 <div>
            <icon symbol
                  name="iconcaiwuyujing-icon"> </icon>
            <span>2% </span>
          </div>
        </div>
        <p>{{language('KEZAISHENGNENGYUANQIANSHU', '可再生能源签署')}} <span>2</span></p>
        <p>{{language('WURANWEIGUI', '污染违规')}} <span>2</span></p>
      </div>
      <div ref="chart"
           class="chartStyle"> </div>
    </div>
  </iCard>
</template>
<script>
import echarts from '@/utils/echarts'
import { iCard, icon } from 'rise'
import { performCard360 } from '@/api/supplierManagement/supplierCard/index'
export default {
  props: {},
  components: {
    iCard,
    icon
  },
  data() {
    return {
      chart: 'oneChart',
      option: {},
      
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
      performCard360().then((res) => {
          this.getChart()
      })
    },
    getChart() {
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
          },
          max: 200,
          min: 0,
          splitNumber: 5
        },
        series: [
          {
            showSymbol: false,
            data: [25, 64, 35, 48],
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
    }
  },
  mounted() {
    this.getData()
    const myChart = echarts().init(this.$refs.chart)

    myChart.setOption(this.option)
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
      align-items: center;
      position: absolute;
      top: 4px;
      right: -80px;
      span {
        margin-left: 6px;
        font-size: 18px;
        font-family: Arial;
        font-weight: bold;
        color: #21d59b;
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
      position: absolute;
      top: 6px;
      right: -30px;
      margin-left: 6px;
      font-size: 16px;
      font-family: Arial;
      font-weight: bold;
      color: #21d59b;
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
  .chartStyle {
    width: 55%;
    height: 100%;
  }
}
.box:nth-child(1) div {
  margin: 6px;
}
</style>