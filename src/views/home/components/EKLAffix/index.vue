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
    <div class="ekl-content">
      <div class="target flex-between-center-center">
        <div class="left">
          <div class="panel-title margin-bottom12"><a :href="`${turnUrl}/portal/#/achievement/baseData/mymerit`" target="_blank" class="a-title">{{$t("YEJIMUBIAO")}}</a></div>
          <el-select
            class="left-select"
            v-model="query.type"
            @change="handleCheckYear"
          >
            <el-option
              v-for="item in options"
              :key="item"
              :label="$getLabel(item.name,item.nameEn)"
              :value="item.value"
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
              ? parseFloat(tabsData.totalTarget).toFixed(2)
              : '0.00'
          }}
          <span class="mid-num" style="color: #1763f7;">%</span>
        </div>
        <div class="right">
          <div class="right-lab">{{$t("MUBIAOZHIANDCHENGNUOZHI")}}</div>
          <div
            v-if="tabsData.totalTarget && tabsData.totalCommitment"
            class="target-val"
            style="font-size: 14px"
          >
            {{ tabsData.totalTarget }}/{{ tabsData.totalCommitment }}
          </div>
        </div>
      </div>
      <div class="base flex-between-center-center">
        <div class="left">
          <div class="title right-lab panel-title">{{$t("LK_YJJC")}}</div>
        </div>
        <div class="middle">
          {{
            tabsData.sumAll
              ? (tabsData.sumAll + '').replace(
                  /(\d{1,3})(?=(\d{3})+(?:$|\.))/g,
                  '$1,'
                )
              : ''
          }}
        </div>
        <div class="right"></div>
      </div>
      <div class="echart">
        <div class="ekl-pie" ref="pie" style="height: 240px"></div>
        <div class="tips" style="max-width:42%;">
          <div class="title" style="color: #333333">{{$t("DANGQIANWANCHENGLV")}}</div>
          <div>
            {{
              String(Number(tabsData.valEklType) / Number(tabsData.sumAll)) !=
              'NaN'
                ? (
                    (Number(tabsData.valEklType) / Number(tabsData.sumAll)) *
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
import { getEklAffix } from '@/api/home'
import { mapState } from 'vuex'
export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    eklAffixTabItem: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data() {
    return {
      activeName: 'CS(Spare)',
      num: 2400,
      options: [
        { name: '配件',nameEn:"Parts", value: 1 },
        { name: '附件',nameEn:"Attachment", value: 2 }
      ],
      tabsData: {},
      value: '',
      query: {
        year: new Date().getFullYear(),
        type: 1,
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
      eklPfjTabList: (eklPfjTabList) => eklPfjTabList.permission.eklPfjTabList,
      leadTabList: (leadTabList) => leadTabList.permission.leadTabList
    }),
    turnUrl() {
      return window.location.origin
    }
  },
  watch: {
    eklAffixTabItem() {
      this.tabChange()
    }
  },
  mounted() {
    // if (this.leadTabList.length > 0) {
    //   this.tabList = this.leadTabList
    // } else {
    //   // this.tabList = JSON.parse(JSON.stringify(this.eklPfjTabList))
    //   this.tabList = this.unique(JSON.parse(JSON.stringify(this.eklPfjTabList)) || [], 'name')
    // }
    this.tabList = this.unique(JSON.parse(JSON.stringify(this.eklPfjTabList)) || [], 'name')
    if (this.leadTabList.length > 0) {
      this.tabList = [...this.tabList, ...this.leadTabList]
    }
    if(this.tabList.length > 0){
      this.query.dptCode = this.tabList[0].type || ""
      this.activeName = this.tabList[0].name || ""
    }
    this.getEklAffix(this.query)
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
      if (this.eklAffixTabItem) {
        this.handleClick(this.eklAffixTabItem)
      }
    },
    handleClick({ name }) {
      this.activeName = name
      this.eklPfjTabList.forEach((item) => {
        if (item.name == name) {
          this.query.dptCode = item.type
          this.activeName = item.name
          this.getEklAffix(this.query)
        }
      })
    },
    async getEklAffix(data) {
      const res = await getEklAffix(data)
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
          text: this.$t("DANGQIANWANCHENGCHIXU"),
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
          top: '6%',
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
                name: this.$t("LK_YWC")
              },
              {
                value: this.tabsData.subtract,
                itemStyle: {
                  color: '#B9EBF2'
                },
                name: this.$t("LK_WWC")
              }
            ]
          }
        ]
      }
      this.chart && this.chart.setOption(option)
    },
    handleCheckYear() {
      this.getEklAffix(this.query)
    }
  },
  beforeDestroy() {
    this.chart = null
  }
}
</script>

<style lang="scss" scoped>
.a-title {
  color: #1763F7;
  cursor: pointer;
  text-decoration: underline;
}
.panel-title {
  font-family: Arial;
  font-weight: bold;
  color: #333;
  font-size: 20px;
}
.ekl-container {
  /* position: absolute;
  top: 20px;
  left: 0; */
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
    bottom: 30%;
    right: 3%;
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
    > .left {
      margin-right: 10px;
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
      font-size: 26px;
      min-width: 120px;
    }
    > .middle-m {
      margin-top: -36px;
      font-size: 24px;
    }
  }

  .echart {
    position: relative;
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
