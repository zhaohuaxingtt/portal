<template>
  <div class="ekl-container">
    <!-- tabs -->
    <!-- <div class="flex-between">
      <el-tabs
        v-model="activeName"
        class="ekl-tabs"
        @tab-click="handleClick"
        id="el-tabs-box"
      >
        <el-tab-pane
          :label="item.name"
          v-for="item in tabList"
          :key="item.id"
          :name="item.name"
        >
        </el-tab-pane>
      </el-tabs>
      <div class="unit">单位：百万元</div>
    </div> -->
    <!-- <eklHeader @tab-switch="handleClick" /> -->
    <div class="ekl-content">
      <div class="target flex-between-center-center flex-wrap">
        <div class="left">
          <div class="panel-title margin-bottom12 margin-bottom2"><a :href="`${turnUrl}/portal/#/achievement/baseData/mymerit`" target="_blank" class="a-title">业绩目标</a></div>
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
        <div style="display: flex;justify-content: space-between;flex:1">
          <div
            class="middle middle-m"
            v-if="parseFloat(tabsData.totalTarget) != 0 && tabsData.totalTarget"
          >
            <div class="center-flex">
              <span class="center-number">{{
                  parseFloat(tabsData.totalTarget)
                    ? parseFloat(tabsData.totalTarget).toFixed(2)
                    : '0.00'
                }}</span>  
              <span style="color: #1763f7;">%</span>
            </div>
          </div>
          <div></div>
          <div class="right">
            <div style="font-family: Arial; font-weight: bold; color: #343434">
              目标值/承诺值
            </div>
            <div
              v-if="tabsData.totalTarget && tabsData.totalCommitment"
              style="color: #000000; margin-top: 2px"
            >
              {{ tabsData.totalTarget }}/{{ tabsData.totalCommitment }}
            </div>
          </div>
        </div>
      </div>
      <div class="base flex-between-center-center flex-wrap">
        <div class="left">
          <div class="title panel-title">业绩基础</div>
        </div>
        <div style="display: flex;justify-content: space-between;flex:1">
          <div class="middle center-number number_margin">
            {{
              tabsData.sumAll
                ? (tabsData.sumAll + '').replace(
                    /(\d{1,3})(?=(\d{3})+(?:$|\.))/g,
                    '$1,'
                  )
                : ''
            }}
          </div>
          <div class="right width_auto">
            <div style="font-family: Arial; font-weight: bold; color: #aaa;margin-top:6px;">
              中期改款
            </div>
            <!-- <div>{{tabsData.subtract}}</div> -->
          </div>
        </div>
      </div>
      <div class="echart">
        <div class="ekl-pie" ref="pie" style="height: 240px"></div>
        <div class="tips">
          <div class="title" style="color: #333333">当前完成率</div>
          <div class="font-echarts">
            {{
              String(Number(tabsData.valEklType) / Number(tabsData.sumAll)) !=
              'NaN'
                ? (
                    ((tabsData.valEklType * 1) / tabsData.sumAll) *
                    1 *
                    100
                  ).toFixed(2) + '%'
                : '0.00%'
            }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from '@/utils/echarts'
import { getEkl } from '@/api/home'
import { mapState } from 'vuex'
export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    eklTabItem: {
      type: Object,
      default: function () {
        return {}
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
      listData: [],
      chart: null
    }
  },
  computed: {
    ...mapState({
      code: (code) => code.permission.code,
      eklTabList: (eklTabList) => eklTabList.permission.eklTabList,
      leadTabList: (leadTabList) => leadTabList.permission.leadTabList
    }),
    turnUrl() {
      return window.location.origin
    }
  },
  watch: {
    eklTabItem() {
      this.tabChange()
    }
  },
  mounted() {
    this.options = [this.query.year, this.query.year + 1]
    // if (this.leadTabList.length > 0) {
    //   // 由于在store全部加了(Spare) 需在ekl去掉(Spare) 只在配附件ekl种展示
    //   // this.tabList = this.leadTabList
    //   this.leadTabList.map(item => {
    //     item.name = item.name.replace('(Spare)', '') || ''
    //   })
    //   this.tabList = this.leadTabList
    // } else {
    //   this.tabList = this.unique(this.eklTabList || [], 'name')
    //   // this.tabList = this.eklTabList
    // }
    this.tabList = this.unique(this.eklTabList || [], 'name')
    if (this.leadTabList.length > 0) {
      // this.leadTabList.map(item => {
      //   item.name = item.name.replace('(Spare)', '') || ''
      // })
      let leadTabList = JSON.parse(JSON.stringify(this.leadTabList))
        leadTabList.map(item => {
          item.name = item.name.replace('(Spare)', '') || ''
        })
      this.tabList = [...this.tabList, ...leadTabList]
    }
    if(this.tabList.length > 0){
      this.query.type = this.tabList[0].type || ""
      this.activeName = this.tabList[0].name || ""
    }
    this.getEkl(this.query)
    // log.js
    this.tabChange()
  },
  methods: {
    // 数组去重
    unique(arr, attrName) {
      const res = new Map();
      return arr.filter((a) => !res.has(a[attrName]) && res.set(a[attrName], 1));
    }, 
    tabChange() {
      if (this.eklTabItem) {
        this.handleClick(this.eklTabItem)
      }
    },
    handleClick({ name }) {
      console.log(name, '2222')
      this.activeName = name
      console.log(this.tabList, '3333')
      this.tabList.forEach((item) => {
        console.log(item, '333')
        if (item.name == name) {
          this.query.type = item.type
          this.activeName = item.name
          this.getEkl(this.query)
        }
      })
    },
    async getEkl(data) {
      console.log(data, '1234')
      const res = await getEkl(data)
      if (res && res.code == '200') {
        this.tabsData = res.data
        let totalTarget =
          (parseFloat(
            this.tabsData.totalTarget ? this.tabsData.totalTarget : '0.00'
          ) /
            100) *
          1
        this.tabsData.sumAll = (+this.tabsData.sumAll / 1000000).toFixed(2)
        this.tabsData.subtract = (+this.tabsData.subtract / 1000000).toFixed(2)
        this.tabsData.valEklType = (
          +this.tabsData.valEklType / 1000000
        ).toFixed(2)
        // 业绩目标*业绩基础
        this.tabsData.curSum =
          (this.tabsData.sumAll * 1 * totalTarget).toFixed(2) + ''

        this.$nextTick(() => {
          this.initPie()
        })
      }
    },
    initPie() {
      if (!this.chart) {
        this.chart = echarts().init(this.$refs.pie)
      }
      this.setEcharts()
    },
    setEcharts() {
      const option = {
        title: {
          text: '当前完成(持续)',
          left: '-4',
          textStyle: {
            fontSize: '12px'
          }
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
          top: '0%',
          tooltip: {
            show: true,
            formatter: (data) => {
              return `${data.name}金额：${
                data.name == '完成'
                  ? this.tabsData.valEklType
                  : this.tabsData.subtract
              }`
            }
          }
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '70%'],
            right: '40%',
            top: '10%',
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'center',
              textStyle: {
                fontSize: 16,
                color: '#000'
                // color:"transparent"
              },
              normal: {
                show: true,
                position: 'center',
                color: '#000',
                formatter: this.tabsData.curSum,
                fontSize: 24,
                fontWeight: 'bold'
              }
            },
            emphasis: {
              show: true
            },
            labelLine: {
              show: false
            },
            data: [
              {
                value: this.tabsData.valEklType,
                itemStyle: {
                  color: '#1AB5C7'
                },
                name: '完成'
              },
              {
                value: this.tabsData.subtract,
                itemStyle: {
                  color: '#B9EBF2'
                },
                name: '待完成'
              }
            ]
          }
        ]
      }
      console.log('set echarts', option)
      this.chart && this.chart.setOption(option)
    },
    handleCheckYear(year) {
      this.query.year = year
      this.getEkl(this.query)
    }
  },
  beforeDestroy() {
    this.chart = null
  }
}
</script>

<style lang="scss" scoped>
.font-echarts{
  font-size: 28px!important;
}
.a-title {
  color: #1763F7;
  cursor: pointer;
  text-decoration: underline;
  font-size: 19px;
}
.panel-title {
  font-family: Arial;
  font-weight: bold;
  color: #333;
  font-size: 19px;
}
.ekl-container {
  /* position: absolute;
  top: 20px;
  left: 0; */
  padding-top: 10px;
  width: 100%;
  height: 100%;
  /* padding: 8px 16px 16px 16px; */
  /* .ekl-content {
    padding-top: 20px;
  } */
  .ekl-content {
    overflow: hidden;
  }
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
    bottom: 35%;
    left: 60%;
    
    // .title {
    //   font-size: 18px;
    //   color: #1763f7;
    // }
    div:last-child {
      font-size: 48px;
      color: #1ab5c7;
      font-weight: bold;
       span {
        font-size: 32px;
      }
    }
  }
  .unit {
    padding-top: 10px;
    color: #6d7b96;
    font-size: 12px;

    // position: absolute;
    // right: 32px;
    // top: 20px;
  }
  .target,
  .base {
    font-weight: bold;
    margin-bottom: 30px;
    .left {
      margin-right: 10px;
      min-width: 96px;
    }
    .right {
      min-width: 120px;
    }
     .left,
     .right {
      font-size: 16px;
       .title {
        color: #333;
        margin-bottom: 10px;
      }
    }
     .middle {
      color: #1763f7;
      font-size: 26px;
      min-width: 120px;
    }
     .middle-m {
      font-size: 24px;
    }
  }

  .echart {
    position: relative;
  }
}
.flex-wrap{
  margin-top: 10px;
  align-items: unset!important;
}
.center-number{
  font-size: 26px!important;
  margin-left:12px;
}
.margin-bottom2{
  margin-bottom:2px!important;
}
.width_auto{
  width:auto!important;
  min-width: auto!important;
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
     .left,
     .right {
       .el-select {
        width: 80px;
      }
    }
  }
}
</style>
