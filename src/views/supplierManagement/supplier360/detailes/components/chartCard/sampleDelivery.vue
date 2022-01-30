<template>
  <iCard  style="height:14rem">
    <div class="title">
      <p>{{language('SONGYANG', '送样')}}</p>
      <span class="el-dropdown-link">
        <i class="el-icon-more"></i>
      </span>
    </div>
    <div class="box">
      <span style="font-size:16px;color:rgba(107, 121, 149, 0.56);">{{language('JINGQINGQIDAI', '敬请期待')}}</span>
<!--       <img :src="img"-->
<!--           class="imgIcon" />-->
<!--      <div ref="chart"-->
<!--           class="chartStyle">-->

<!--      </div>-->
<!--      <div class="chartText chartLeft">-->
<!--        <p>History</p>-->
<!--        <p>30%</p>-->
<!--        <div>-->
<!--          <span>On-Time</span>-->
<!--          <span>70%</span>-->
<!--        </div>-->
<!--        <div>-->
<!--          <span>Delay</span>-->
<!--          <span>30%</span>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="chartText chartRight">-->
<!--        <p>On-going</p>-->
<!--        <p>30%</p>-->
<!--        <div>-->
<!--          <span>On-Time</span>-->
<!--          <span>70%</span>-->
<!--        </div>-->
<!--        <div>-->
<!--          <span>Delay</span>-->
<!--          <span>30%</span>-->
<!--        </div>-->
<!--      </div>-->
    </div>
  </iCard>
</template>
<script>
import echarts from '@/utils/echarts'
import { iCard, } from 'rise'
import img from '@/assets/images/sampleDelivery.svg'
export default {
  props: {},
  components: {
    iCard,
  },
  data() {
    return {
      chart: 'oneChart',
      img:img
    }
  },
  computed: {
    style() {
      return {}
    }
  },
  watch: {},
  methods: {},
  mounted() {
    const myChart = echarts().init(this.$refs.chart)
    var option = {
      grid: {
        right: '10%',
        left: '20%'
      },
      tooltip: {
        trigger: 'item'
      },

      series: [
        {
          center: ['40%', '50%'],
          label: {
            show: false,
            position: 'center'
          },
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' }
          ]
        }
      ]
    }
    myChart.setOption(option)
  }
}
</script>

<style lang="scss" scoped>
.imgIcon{
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
  position: relative;

  align-items: center;
  justify-content: space-between;
  .chartStyle {
    width: 80%;
    height: 100%;
  }

  .chartText {
      text-align: center;
    width: 100px;
    position: absolute;
    top: 30px;
    p:nth-child(1) {
      font-size: 12px;
      font-family: Arial;
      font-weight: bold;
      color: #41434a;
    }
    p:nth-child(2) {
        margin: 8px auto 0;
      width: 40px;
      font-size: 18px;
      font-family: Arial;
      font-weight: bold;
      padding-bottom: 6px;
    }
    div {
      margin-top: 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        margin: 4px 0;
        font-family: Arial;
        font-weight: 400;
        color: #41434a;
      }
    }
  }
  .chartLeft {
    p:nth-child(2) {
      color: #1660f1;
      border-bottom: 2px solid #1660f1;
    }

    left: 100px;
  }
  .chartRight {
    p:nth-child(2) {
      color: #00bf87;
      border-bottom: 2px solid #00bf87;
    }

    right: 80px;
  }
}
.box:nth-child(1) div {
  margin: 6px;
}
</style>