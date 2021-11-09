<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-27 14:47:25
 * @LastEditors: zbin
 * @Descripttion: 供应商询价定点情况
-->
<template>
  <iCard :title="$t('SPR_FRM_XGYSPJ_GYSXJDDQK')">
    <!-- <div class="center1 height">
      <img :src="soon" width="70%" height="70%" alt="">
    </div> -->
    <!-- <div class="flex-align-center" style="justify-content: center;height: 100%;">
		<img style="width: 60%;" src="./soon.png" >
	</div> -->
    <div ref="chart"
         class="chartStyle"> </div>
             <iDialog @close="closeDiolog()"
             :visible.sync="visible"
             v-if="visible"
             width="85%">
      <el-tabs class="tabsHeader"
               type="card"
               style="margin-left:20px;"
               v-model="tabVal"
               @tab-click="changeTab">
        <el-tab-pane name="1"
                     :label="
            language('SHISHICRATINGGONGYINGSHANGQINGDAN', '实时C-Rating供应商清单')
          ">
        </el-tab-pane>
        <el-tab-pane name="2"
                     :label="language('CRATINGGONGYINGSHANGXUNJIADINGDIANQINGKUANG', 'C-Rating供应商询价定点情况')">
        </el-tab-pane>
      </el-tabs>
      <div class="header">
        <el-form inline
                 label-position="top">
          <el-form-item :label="language('SAPHAO', 'SAP号')">
            <iSelect collapse-tags
                     filterable
                     :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                     v-model.trim="form.purchaserIds">
              <el-option v-for="item in purchaseList"
                         :key="item.purchaserId"
                         :label="item.purchaserName"
                         :value="item.purchaserId">
              </el-option>
            </iSelect>

          </el-form-item>
        </el-form>
        <div>
          <iButton @click="sure">{{
          language('CHAXUN', '查询')
        }}</iButton>
          <iButton @click="clickReset">{{
          language('CHONGZHI', '重置')
        }}</iButton>
        </div>
      </div>

      <div class="sectionTitle">
        <span class="ptext">
          {{
              language(
                'XIANGQINGLIEBIAO',
                '详情列表'
              )
            }}
        </span>
        <iButton @click="clickBtn">{{
          language('BAOCUN', '保存')
        }}</iButton>
      </div>
      <table-list v-if="tabVal == 1"
                  style="margin-top:20px"
                  :tableData="tableListData"
                  :tableTitle="tableTitleMonitor"
                  :tableLoading="tableLoading"
                  :index="true"
                  :selection="false">
      </table-list>
      <table-list v-if="tabVal == 2"
                  style="margin-top:20px"
                  :tableData="tableListData"
                  :tableTitle="tableTitleMonitorRecord"
                  :tableLoading="tableLoading"
                  :index="true"
                  :selection="false">
      </table-list>
    </iDialog>
  </iCard>
</template>

<script>
import echarts from '@/utils/echarts'
import { iCard } from 'rise'
import { supplierRatingCard } from '@/api/frmRating/supplierOverview/index'
// import soon from "./soon.png";

export default {
  components: { iCard },
  data() {
    return {
      chart: 'vertexSituationChati',
      option: ''
      //   soon: soon
    }
  },
  mounted() {
    this.getChart()
    const myChart = echarts().init(this.$refs.chart)
    myChart.setOption(this.option)
    this.getData()
  },
  methods: {
    getData() {
      supplierRatingCard().then((res) => {
          
        this.getChart()
      })
    },
    getChart() {
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
          data: ['Mon', 'Tue'],
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
            name: 'C-Rating中正在报价供应商',
            data: [64, 47],
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
            name: 'C-Rating未在报价中供应商',
            data: [14, 23],
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
    }
  }
}
</script>

<style scoped lang="scss">
.center1 {
  display: flex;
  justify-content: center;
  align-items: center;
}
.chartStyle {
  width: 100%;
  height: 320px;
}
</style>