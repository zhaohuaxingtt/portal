<template>
  <iCard style="height:14rem">
    <div class="title">
      <p>{{language('SONGYANG', '送样')}}</p>
      <span class="el-dropdown-link">
        <i class="el-icon-more"></i>
      </span>
    </div>
    <div class="box">
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
import { iCard, icon } from 'rise'
export default {
  props: {},
  components: {
    iCard,
    icon
  },
  data() {
    return {
      chart: 'oneChart'
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
        right: '10%'
      },
      tooltip: {
        trigger: 'item'
      },

      series: [
        {
          labelLine: {
            normal: {
              length: 5, // 改变标示线的长度
              lineStyle: {
                color: '#8C98AC' // 改变标示线的颜色
              }
            }
          },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 5
          },
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' }
          ]
        }
      ]
    }
    myChart.setOption(option)
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