<!--支付金额月度跟踪--->
<template>
  <div
    v-permission="
      MTZ_REPORT_MONTHLY_TRACKING_MONTHLY_PAYMENT_AMOUNT_TRACKING_PAGE
    "
  >
    <i-card class="search">
      <div class="search-content">
        <div class="form-condition">
          <el-form>
            <el-row gutter="24">
              <el-col :span="6">
                <i-form-item :label="language('科室')">
                  <i-select
                    v-model="searchForm.department"
                    :placeholder="language('请选择')"
                  >
                    <el-option
                      v-for="item in deptOption"
                      :key="item.code"
                      :label="item.message"
                      :value="item.code"
                    >
                    </el-option>
                  </i-select>
                </i-form-item>
              </el-col>
              <el-col :span="6">
                <i-form-item :label="language('MTZ材料组')">
                  <i-select
                    v-model="searchForm.mtzMaterialNumber"
                    :placeholder="language('请选择')"
                  >
                    <el-option
                      v-for="item in mtzOption"
                      :key="item.materialGroupCode"
                      :label="item.materialGroupNameZh"
                      :value="item.materialGroupCode"
                    >
                    </el-option>
                  </i-select>
                </i-form-item>
              </el-col>
              <el-col :span="6">
                <i-form-item :label="language('材料中类')">
                  <i-select
                    v-model="searchForm.materialMediumNum"
                    :placeholder="language('请选择')"
                  >
                    <el-option
                      v-for="item in materialMiddleOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </i-select>
                </i-form-item>
              </el-col>
              <el-col :span="6">
                <i-form-item :label="language('版本月份')">
                  <i-datePicker
                    v-model="searchForm.yearMonth"
                    :placeholder="language('请选择')"
                    format="yyyy-MM"
                    value-format="yyyyMM"
                    type="month"
                  ></i-datePicker>
                </i-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="btn-list">
          <span class="only-myself"
            >{{ language('只看自己 ') }}
            <el-switch
              v-model="searchForm.onlySeeMySelf"
              active-color="#67C23A"
              inactive-color="#cccccc"
            ></el-switch>
          </span>
          <i-button @click="sure">{{ language('搜索') }}</i-button>
          <i-button @click="reset">{{ language('重置') }}</i-button>
        </div>
      </div>
    </i-card>
    <i-card class="report">
      <div v-loading="loading">
        <div class="report-box">
          <div id="report-charts"></div>
          <div class="difference-box">
            <div class="fix-flex">
              <div v-show="showDifference" class="display-difference">
                <difference
                  v-for="(item, index) in calculate"
                  :key="index"
                  :item="item"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </i-card>
  </div>
</template>

<script>
import { iCard, iSelect, iDatePicker, iFormItem, iButton } from 'rise'
import difference from './components/difference'
import echarts from '@/utils/echarts'
import {
  searchReport,
  getDept
} from '@/api/mtz/reportsShow/monthlytrackingpayment'
import { queryMtzMaterial, queryMaterialMedium } from '@/api/mtz/reportsShow'
export default {
  name: 'paymentTracking',
  components: {
    iCard,
    iSelect,
    iDatePicker,
    iFormItem,
    iButton,
    difference
  },
  data() {
    return {
      ini: false,
      onlySelf: false,
      loading: false,
      time: '',
      //最大刻度
      maximumScale: 0,
      showDifference: true,
      //科室选择
      deptOption: [],
      //MTZ材料组选择
      mtzOption: [],
      //材料中类选择
      materialMiddleOption: [],
      //差额
      calculate: [],
      //数据集 sourceData
      sourceData: [],
      //x轴数据
      xAxisData: [],
      searchForm: {
        department: '', //科室简称
        materialMediumNum: '', //mtz材料组中类编号
        mtzMaterialNumber: '', //MTZ材料组编号
        onlySeeMySelf: false, //是否只查看自己
        yearMonth: '' //年月
      },
      currentYearMonth: '' //当前年月
    }
  },
  created() {
    const currentTime = new Date()
    this.currentYearMonth =
      currentTime.getFullYear() +
      (currentTime.getMonth() + 1).toString().padStart(2, 0)
    this.searchForm.yearMonth = this.currentYearMonth
    this.getDepartment()
    this.getMtzMaterial()
    this.getMaterialMedium()
    this.sure()
  },
  mounted() {
    // this.iniReport()
  },
  methods: {
    iniReport() {
      const el = document.getElementById('report-charts')
      let chart = echarts().init(el)
      // let _this = this
      chart.setOption({
        color: ['rgb(2,96,241)', 'rgb(119,203,255)'],
        title: {
          text: '单位：⼈⺠币/百万',
          top: 0,
          right: 10,
          textStyle: {
            color: '#9092A5',
            fontSize: '12',
            fontWeight: 'normal'
          }
        },
        grid: {
          left: '3%',
          right: '2%'
        },
        xAxis: {
          type: 'category',
          axisTick: { show: false },
          axisLine: {
            lineStyle: {
              color: '#6D6E7E'
            }
          },
          axisLabel: {
            fontWeight: 'bold',
            margin: 20
          },
          data: this.xAxisData,
          nameTextStyle: {
            width: '80px'
          }
        },
        yAxis: [
          {
            type: 'value'
            //设置间距，需要计算
            // max: _this.maximumScale,
            // splitNumber: '10'
          }
        ],
        legend: [
          {
            x: 'left',
            icon: 'circle',
            itemHeight: '12',
            selectedMode: false,
            data: [
              '应付（补差凭证⾦额）',
              '已支付',
              '差值（应付大于已支付金额）',
              '差异（应付小于等于已支付金额）'
            ],
            itemGap: 20
          }
        ],
        tooltip: {
          show: true,
          formatter: (params) => {
            let price = 0
            params.seriesName == '已支付'
              ? (price = params.value * 1000000)
              : (price = params.value * 1000000)
            const splitPrice = (price + '').split('.')
            let leftPrice = splitPrice[0]
            // let rightPrice = splitPrice.length > 1 ? '.'+ splitPrice[1]  : ''
            let rightPrice =
              splitPrice.length > 1
                ? '.' +
                  Number('.' + splitPrice[1])
                    .toFixed(2)
                    .toString()
                    .split('.')[1]
                : ''

            // rightPrice = (Number(rightPrice).toFixed(2).split('.')[1] )
            const rgx = /(\d+)(\d{3})/
            while (rgx.test(leftPrice)) {
              leftPrice = leftPrice.replace(rgx, '$1' + ',' + '$2')
            }
            //  price = String(price)
            // const tempt = price.split('').reverse().join('').match(/(\d{1,3})/g)
            // let currency = tempt.join(',').split('').reverse().join('')
            return leftPrice + rightPrice
          }
        },
        series: [
          {
            type: 'bar',
            name: '应付（补差凭证⾦额）',
            barWidth: '30',
            data: this.sourceData.map((item) => {
              return {
                value: item[0],
                itemStyle: {
                  normal: {
                    color: 'rgb(2,96,241)',
                    borderRadius: item[0] > 0 ? [4, 4, 0, 0] : [0, 0, 4, 4]
                  }
                },
                label: {
                  show: true,
                  position: item[0] > 0 ? 'top' : 'bottom',
                  formatter: (params) => {
                    return Number(params.value).toFixed(2)
                  },
                  textStyle: {
                    color: 'rgb(2,96,241)'
                  }
                }
              }
            })
          },
          {
            name: '已支付',
            type: 'bar',
            barWidth: '30',
            data: this.sourceData.map((item) => {
              return {
                value: item[1],
                itemStyle: {
                  normal: {
                    color: 'rgb(119,203,255)',
                    borderRadius: item[1] > 0 ? [4, 4, 0, 0] : [0, 0, 4, 4]
                  }
                },
                label: {
                  show: true,
                  position: item[1] > 0 ? 'top' : 'bottom',
                  formatter: (params) => {
                    return Number(params.value).toFixed(2)
                  },
                  textStyle: {
                    color: 'rgb(119,203,255)'
                  }
                }
              }
            })
          },
          {
            name: '差值（应付大于已支付金额）',
            type: 'line',
            data: [],
            itemStyle: {
              normal: {
                color: 'rgb(255,176,77)'
              }
            }
          },
          {
            name: '差异（应付小于等于已支付金额）',
            type: 'line',
            data: [],
            itemStyle: {
              normal: {
                color: 'rgb(5,187,181)'
              }
            }
          }
        ]
      })
      // chart.hideLoading()
    },
    sure() {
      const data = {
        ...this.searchForm
      }
      this.ini = false
      this.loading = true
      this.showDifference = false
      this.xAxisData = []
      // debugger
      searchReport(data)
        .then((res) => {
          if (res?.code == 200) {
            this.sourceData = []
            this.calculate = []
            const data = res.data
            if (data.length == 0) {
              const el = document.getElementById('report-charts')
              el.innerHTML = '<div style="text-align: center">暂无数据</div>'
              el.removeAttribute('_echarts_instance_')
            } else {
              const sourceData = []
              const allPrice = []
              //yearMonth年月 //actualPrice 应付 //payPrice 已支付 //差额 diffPrice
              data.forEach((item) => {
                const year = item.yearMonth.slice(0, 4)
                const month = item.yearMonth.slice(4)
                const yearMonth = year + '-' + month
                this.xAxisData.push(yearMonth)
                sourceData.push([
                  Number(item.actualPrice) / 1000000,
                  Number(item.payPrice) / 1000000
                ])
                allPrice.push(
                  Number(item.actualPrice) / 1000000,
                  Number(item.payPrice) / 1000000
                )
                this.calculate.push({
                  price: item.diffPrice,
                  priceType: item.priceType
                })
              })
              this.maximumScale = Number(
                Math.ceil(Math.max(...allPrice).toFixed() / 10) * 10
              )
              this.sourceData = [...sourceData]
              this.iniReport()
            }
          } else {
            this.$message.error(res?.desZh || '获取失败')
          }
        })
        .finally(() => {
          this.loading = false
          this.showDifference = true
          this.ini = true
        })
    },
    reset() {
      this.searchForm = {
        department: '', //科室简称
        materialMediumNum: '', //mtz材料组中类编号
        mtzMaterialNumber: '', //MTZ材料组编号
        onlySeeMySelf: false, //是否只查看自己
        yearMonth: this.currentYearMonth //年月
      }
    },
    //获取当前科室
    getDepartment() {
      getDept().then((res) => {
        if (res?.code == 200) {
          this.deptOption = res.data
        } else {
          this.$message.error(res.desZh || '获取科室失败')
        }
      })
    },
    //mtz下拉
    getMtzMaterial() {
      queryMtzMaterial().then((res) => {
        if (res.code == 200) {
          const data = res.data
          this.mtzOption = data
        } else {
          this.$message.error(res.desZh || '获取mtz材料组失败')
        }
      })
    },
    //材料组下拉
    getMaterialMedium() {
      queryMaterialMedium().then((res) => {
        if (res.code == 200) {
          const data = res.data
          this.materialMiddleOption = data.map((item) => {
            return {
              label: `${item.materialCategoryCode}-${item.materialNameZh}`,
              value: item.materialCategoryCode
            }
          })
          // this.materialMiddleOption = res.data
        } else {
          this.$message.error(res.desZh || '获取材料组中类失败')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.search-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.report {
  margin-top: 20px;
}
#report-charts {
  width: 100%;
  height: 420px;
  // position: relative;
}
::v-deep .el-date-editor--date {
  width: 100%;
}
.report-box {
  width: 100%;
  height: 420px;
  position: relative;
}
.difference-box {
  width: 95.5%;
  position: absolute;
  bottom: 0px;
  .fix-flex {
    .display-difference {
      // margin-top: -30px;
      width: 100%;
      margin-left: 3%;
      margin-right: 2%;
      display: flex !important;
      justify-content: space-around;
      align-items: center;
    }
  }
}
.btn-list {
  display: flex;
  align-items: center;
  .only-myself {
    margin-right: 20px;
    font-size: 20px;
    display: flex;
    align-items: center;
    ::v-deep .el-switch {
      margin-left: 10px;
    }
  }
}
</style>
