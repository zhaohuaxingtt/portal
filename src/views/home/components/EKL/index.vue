<template>
  <div class="ekl-container">
    <div class="unit">单位：百万元</div>
    <!-- tabs -->
    <el-tabs v-model="activeName" @tab-click="handleClick" id="el-tabs-box">
      <el-tab-pane
        :label="item.name"
        v-for="item in tabList"
        :key="item.id"
        :name="item.name"
      >
        <div class="ekl-content">
          <div class="target flex-between-center-center margin-top20">
            <div class="left">
              <div
                style="
                  font-family: Arial;
                  font-weight: bold;
                  color: #333;
                  font-size: 16px;
                  margin-bottom: 12px;
                "
              >
                业绩目标
              </div>
              <el-select v-model="query.year" @change="handleCheckYear">
                <el-option
                  v-for="item in options"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </div>
            <div
              class="middle middle-m"
              v-if="parseFloat(tabsData.totalTarget) != 0 && tabsData.totalTarget"
            >
              {{
                parseFloat(tabsData.totalTarget)
                  ? parseFloat(tabsData.totalTarget)
                  : '0.00'
              }}<span style="color: #1763f7; font-size: 24px">%</span>
            </div>
            <div class="right">
              <div
                style="font-family: Arial; font-weight: bold; color: #343434"
              >
                目标值/承诺值
              </div>
              <div
                v-if="tabsData.totalTarget && tabsData.totalCommitment"
                style="color: #000000; margin-top: 18px"
              >
                {{ tabsData.totalTarget }}/{{ tabsData.totalCommitment }}
              </div>
            </div>
          </div>
          <div class="base flex-between-center-center">
            <div class="left">
              <div
                class="title"
                style="
                  font-family: Arial;
                  font-weight: bold;
                  color: #333;
                  font-size: 16px;
                "
              >
                业绩基础
              </div>
            </div>
            <div class="middle">
              {{
                (tabsData.sumAll + '').replace(
                  /(\d{1,3})(?=(\d{3})+(?:$|\.))/g,
                  '$1,'
                )
              }}
            </div>
            <div class="right">
              <div
                style="font-family: Arial; font-weight: bold; color: #343434"
              >
                中期改款
              </div>
              <!-- <div>{{tabsData.subtract}}</div> -->
            </div>
          </div>
          <div class="ekl-pie" ref="pie" style="height: 240px"></div>
          <div class="tips">
            <div class="title" style="color: #333333">当前完成率</div>
            <div v-show="tabsData.sumAll && parseFloat(tabsData.sumAll) == 0">
              {{ !isNaN((tabsData.valEklType / parseFloat(tabsData.sumAll)).toFixed(2))?
              (tabsData.valEklType / parseFloat(tabsData.sumAll)).toFixed(2)+`%`:`0.00%` }}
              <!-- <span>%</span> -->
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import echarts from '@/utils/echarts'
import { Icon } from 'rise'
import { getEkl } from '@/api/home'
import { mapState } from 'vuex'
export default {
  components: { Icon },
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
      activeName: 'EKL-CS',
      num: 2400,
      options: [],
      tabsData: {},
      value: '',
      query: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        type: undefined,
        dptCode: ''
      },
      tabList: [],
      listData: []
    }
  },
  computed: {
    ...mapState({
      code: (code) => code.permission.code,
      eklTabList: (eklTabList) => eklTabList.permission.eklTabList,
      leadTabList: (leadTabList) => leadTabList.permission.leadTabList
    })
  },
  mounted() {
    this.options = [this.query.year, this.query.year + 1]
    if (this.leadTabList.length > 0) {
      this.tabList = this.leadTabList
    } else {
      this.tabList = this.eklTabList
      this.query.type = this.eklTabList[0].type
      this.activeName = this.eklTabList[0].name
    }
    this.getEkl(this.query)
    // log.js
  },
  methods: {
    handleClick({ name }) {
      this.activeName = name
      this.eklTabList.forEach((item) => {
        if (item.name == name) {
          this.query.type = item.type
          this.activeName = item.name
          this.getEkl(this.query)
        }
      })
    },
    initPie() {
      const index = _.findIndex(this.tabList, (item) => {
        return item.name === this.activeName
      })
      const chart = echarts().init(this.$refs.pie[index])
      let dataValue = this.tabsData.sumAll * 1
      let totalTarget = parseInt(this.tabsData.totalTarget) / 100
      const option = {
        title: {
          text: '当前完成(持续)',
          left: '-4',
          fontSize: '10'
        },
        tooltip: {
          trigger: 'item',
          formatter: function (data) {
            return `${data.data.name}金额<br/>${data.data.value}`
          }
        },
        legend: {
          color: ['#1AB5C7', '#B9EBF2'],
          right: '10',
          icon: 'circle',
          top: '0%'
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '70%'],
            right: '40%',
            top: '10%',
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
              textStyle: {
                fontSize: 16,
                color: '#1763f7'
              },
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '32',
                fontWeight: 'bold',
                color:'#45639B',
                align:'center',
                formatter: (value) => {
                  return `${value.data.value}`
                }
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {
                value: (dataValue * totalTarget).toFixed(2),
                itemStyle: {
                  color: '#1AB5C7'
                },
                name: '完成'
              },
              {
                value: (this.tabsData.valEklType),
                itemStyle: {
                  color: '#B9EBF2'
                },
                name: '待完成'
              }
            ]
          }
        ]
      }
      option && chart.setOption(option)

    },
    handleCheckYear(year) {
      this.query.year = year
      this.getEkl(this.query)
    },
    async getEkl(data) {
      const res = await getEkl(data)
      if (res && res.code == '200') {
        this.tabsData = res.data
        this.tabsData.sumAll =
          ((res.data.sumAll * 1) / 1000000).toFixed(2) + ''
        this.tabsData.valEklType =
          ((res.data.valEklType * 1) / 1000000).toFixed(2) + ''
          this.$nextTick(() => {
          this.initPie()
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.ekl-container {
  position: absolute;
  top: 20px;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 8px 16px 16px 16px;
  .center-bar {
    position: absolute;
    bottom: 22%;
    left: 80px;
    color: #45639b;
    font-family: Arial;
    font-weight: bold;
    font-size: 32px;
  }
  .el-input__inner {
    font-family: Arial !important;
    font-weight: 700 !important;
  }
  .tips {
    position: absolute;
    bottom: 20%;
    // right: 20px;
    right: 6%;
    > 
    // .title {
    //   font-size: 18px;
    //   color: #1763f7;
    // }
    div:last-child {
      font-size: 48px;
      color: #1ab5c7;
      font-weight: bold;
      > span {
        font-size: 32px;
      }
    }
  }
  > .unit {
    color: #6d7b96;
    font-size: 12px;
    position: absolute;
    right: 32px;
    top:22px;
  }
  .target,
  .base {
    font-weight: bold;
    margin-bottom: 30px;
    > .left {
      margin-right: 16px;
      min-width: 96px;
    }
    > .right {
      min-width: 120px;
    }
    > .left,
    > .right {
      font-size: 16px;
      > .title {
        color: #333;
        margin-bottom: 10px;
      }
    }
    > .middle {
      color: #1763f7;
      font-size: 48px;
      min-width: 120px;
    }
    > .middle-m {
      margin-top: -36px;
    }
  }
}
</style>
<style lang="scss">
.ekl-container {
  .el-tabs__nav-scroll {
    width: 250px;
  }
  .is-active {
    color: #222222 !important;
  }
  .el-tabs__nav-wrap::after {
    height: 0;
  }
  .el-tabs__item {
    font-size: 20px;
    font-weight: bold;
    color: #000;
  }
  .target,
  .base {
    > .left,
    > .right {
      > .el-select {
        width: 80px;
      }
    }
  }
}
</style>
