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
         @click="handleDialog"
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
                     v-model.trim="form.partNum">
              <el-option v-for="item in sapList"
                         :key="item.kvalue"
                         :label="item.vvalue"
                         :value="item.kvalue">
              </el-option>
            </iSelect>

          </el-form-item>
          <el-form-item :label="language('GONGYINGSHANGMINGCHENG', '供应商名称')">
            <iSelect collapse-tags
                     filterable
                     :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                     v-model.trim="form.supplierId">
              <el-option v-for="item in supplierList"
                         :key="item.kvalue"
                         :label="item.vvalue"
                         :value="item.kvalue">
              </el-option>
            </iSelect>

          </el-form-item>
          <el-form-item :label="language('XIANGGUANKESHI', '相关科室')">
            <iSelect collapse-tags
                     filterable
                     @change="deptChange"
                     :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                     v-model.trim="form.deptId">
              <el-option v-for="item in deptList"
                         :key="item.id"
                         :label="item.deptNum"
                         :value="item.id">
              </el-option>
            </iSelect>
          </el-form-item>
          <el-form-item :label="language('FUZECAIGOUYUAN', '负责采购员')">
            <iSelect collapse-tags
                     filterable
                     :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                     v-model.trim="form.userId">
              <el-option v-for="item in userList"
                         :key="item.id"
                         :label="item.nameZh"
                         :value="item.id">
              </el-option>
            </iSelect>
          </el-form-item>
          <el-form-item :label="language('JIARUCRATINGYUANYIN', '加入C-Rating原因')">
            <iSelect collapse-tags
                     filterable
                     :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                     v-model.trim="form.ratingSource">
              <el-option v-for="item in cratingLsit"
                         :key="item.code"
                         :label="item.name"
                         :value="item.code">
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
          language('YICHUCRATING', '移除C-Rating')
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
import { iCard, iSelect, iButton, iDialog } from 'rise'
import { tableTitleMonitor, tableTitleMonitorRecord, dictByCode } from './data'
import tableList from '@/components/commonTable'
import {
  supplierRatingCard,
  currentList,
  sapDropDown
} from '@/api/frmRating/supplierOverview/index'
import { getDeptDropDownList } from '@/api/authorityMgmt/index'
// import soon from "./soon.png";

export default {
  components: { iCard, iSelect, iButton, iDialog, tableList },
  data() {
    return {
      chart: 'vertexSituationChati',
      option: {},
      tabVal: '1',
      info: {},
      visible: false,
      tableListData: [],
      tableTitleMonitor: tableTitleMonitor,
      tableTitleMonitorRecord: tableTitleMonitorRecord,
      form: {},
      cratingLsit: [],
      sapList: [],
      deptList: [],
      userList: [],
      supplierList: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      supplierRatingCard().then((res) => {
        this.info = res.data
        this.getChart()
      })
    },

    handleDialog() {
      this.visible = true
      this.getInit()
    },
    getDeptList() {
      const req = {
        level: 'K2'
      }
      getDeptDropDownList(req).then((res) => {
        this.deptList = res.data
      })
    },
    deptChange(v) {
      this.userList = this.deptList.find((res) => {
        return v == res.id
      }).userDTOList
    },
    getTaleList() {
        const req={
            ...this.form
        }
      currentList(req).then((res) => {
        this.tableListData = res.data
      })
    },
    async getInit() {
      this.getDeptList()
      this.getTaleList()
      const res = await dictByCode('C_RATING')
      const res2 = await sapDropDown({ type: 'sap' })
       const res3 = await sapDropDown({type:'supplier'})
      this.cratingLsit = res
      this.sapList = res2.data
      this.userList = []
      this.supplierList = res3.data
    },
    getChart() {
      const myChart = echarts().init(this.$refs.chart)
      const data1 = [this.info.ppSupplierTotal, this.info.gpSupplierTotal]
      const data2 = [
        this.info.ppSupplierQuoteTotal,
        this.info.gpSupplierQuoteTotal
      ]

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
          data: [
            this.language('SHENGCAHNGONGYINGSHANG', '生产供应商'),
            this.language('YIBANGONGYINGSHANG', '一般供应商')
          ],
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
            name: this.language(
              'CRatingZHENGZAIBAOJIAGONGYINGSHANG',
              'C-Rating中正在报价供应商'
            ),
            data: data1,
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
            name: this.language(
              'CRatingWEIZAIBAOJIAGONGYINGSHANG',
              'C-Rating未在报价中供应商'
            ),
            data: data2,
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
      myChart.setOption(this.option)
    },
    sure() {
      this.getTaleList()
    },

    clickReset() {},
    changeTab() {},
    closeDiolog() {
      this.visible = false
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
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px solid #e3e3e3;
}
.sectionTitle {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tabsHeader {
  margin-left: 0 !important;
  ::v-deep .el-tabs__item.is-active {
    font-weight: bold;
    background: #ffffff;
    opacity: 1;
  }
  ::v-deep .el-tabs__item {
    border: none;
    font-weight: 500;
    background: #f5f6f7;
    border-radius: 0px 10px 10px 0px;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.08);
    font-size: 16px;
    width: 250px;
    height: 35px;
    line-height: 35px;
  }
  ::v-deep .el-tabs__nav {
    border: none !important;
  }
  ::v-deep .el-tabs__nav {
    background: transparent;
    border: none;
    padding: 10px 0;
  }
  ::v-deep .el-tabs__item:focus.is-active.is-focus:not(:active) {
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  ::v-deep .el-tabs__header {
    border: none;
  }
  ::v-deep .el-tabs__item:first-child {
    border-radius: 10px 0px 0px 10px;
  }
}
v::v-deep .el-tabs__nav-wrap::after {
  height: 0 !important;
}
v::v-deep .el-tabs__nav-wrap:hover {
  font-weight: bold;
}
</style>