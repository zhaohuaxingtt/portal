<!-- 配附件供货率 -->
<template>
  <div class="delivery-container">
    <div class="rate-container flex-between-center-center">
      <div>
        <div class="title">{{`${ this.$i18n.locale === 'zh' ? '个人' : 'Personal' }`}}</div>
        <div class="rate">
          {{ rate.personal }} <span v-if="rate.personal">%</span>
        </div>
      </div>
      <div>
        <div class="title">CS</div>
        <div class="rate">{{ rate.CS }} <span v-if="rate.CS">%</span></div>
      </div>
    </div>
    <div class="line-container" ref="line" style="height: 240px"></div>
  </div>
  <!-- <div class="center">
    <span style="font-size: 16px; color: rgba(107, 121, 149, 0.56)">{{
      language('JINGQINGQIDAI', '敬请期待')
    }}</span>
  </div> -->
</template>

<script>
import echarts from '@/utils/echarts'
import { getRate } from '@/api/home'
export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      rate: {
        personal: null,
        CS: null
      },
      perData: [],
      stocksData: [],
      departmentData_1: [],
      departmentData_2: [],
      month: []
    }
  },
  async mounted() {
    const res = await getRate()
    let lindData_2 = []
    if (res.code == '200' && res) {
      let lindData = _.cloneDeep(res.data)
      lindData_2 = lindData.slice(lindData.length - 2)
      for (let i = 0; i < lindData.length - 2; i += 1) {
        this.departmentData_1.push(lindData[i].supplyRateDept)
        this.stocksData.push(lindData[i].supplyRateDeptG)
        this.departmentData_2.push(lindData[i].supplyRateDeptK)
        this.perData.push(lindData[i].supplyRatePerson)
        this.month.push(lindData[i].month.split('.')[0] + '月')
      }
      this.rate.personal =
        lindData_2 && lindData_2.length && lindData_2[0].person
      this.rate.CS = lindData_2 && lindData_2.length > 1 && lindData_2[1].cs
      this.initLine()
    }
  },

  methods: {
    initLine() {
      // var geren = `${ this.$i18n.locale === 'zh' ? '个人' : 'Personal' }`
      // var geren = `${ this.$i18n.locale === 'zh' ? '股' : 'Dept.' }`
      // var geren = `${ this.$i18n.locale === 'zh' ? '科室' : 'Department' }`
      // var geren = `${ this.$i18n.locale === 'zh' ? '部门' : 'Department' }`
      const chart = echarts().init(this.$refs.line)
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        color: ['#FCB04D', '#6192F0', '#21D59B', '#77CBFF'],
        legend: {
          data: ['个人', '股', '科室', '部门']
        },
        grid: {
          left: '8.2%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.month,
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          name: '  供货率(%)',
          axisLine: {
            show: true
          }
        },
        series: [
          {
            name: '个人',
            type: 'line',
            smooth: true,
            lineStyle: {
              color: '#FCB04D'
            },
            data: this.perData
          },
          {
            name: '股',
            smooth: true,
            type: 'line',
            lineStyle: {
              color: '#6192F0'
            },
            data: this.stocksData
          },
          {
            name: '科室',
            smooth: true,
            type: 'line',
            lineStyle: {
              color: '#21D59B'
            },
            data: this.departmentData_2
          },
          {
            name: '部门',
            smooth: true,
            type: 'line',
            lineStyle: {
              color: '#77CBFF'
            },
            data: this.departmentData_1
          }
        ]
      }
      option && chart.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
.delivery-container {
  > .rate-container {
    margin-bottom: 60px;
    > div {
      font-weight: bold;
      &:first-child {
        margin-left: 35px;
      }
      &:last-child {
        margin-right: 35px;
      }
      > .title {
        font-size: 16px;
        color: #333;
        margin-bottom: 10px;
      }
      > .rate {
        font-size: 36px;
        color: #1763f7;
        height: 100%;
        > span {
          font-size: 32px;
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.delivery-container {
  .tooltip_fs {
    color: #1763f7 !important;
  }
}

.center {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
