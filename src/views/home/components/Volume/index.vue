<template>
  <div class="volume-container">
    <div class="table-container">
      <iTableCustom
        ref="volumeTable"
        :loading="tableLoading"
        :data="partList"
        :isNavMenu="true"
        :columns="tableSetting"
        @handle-current-change="handleTableCurrentChange"
        highlight-current-row
      />
    </div>
    <div id="volumePriceChart">
      <curveChart
        chartHeight="260px"
        :newestScatterData="curveChartData.newestScatterData"
        :targetScatterData="curveChartData.targetScatterData"
        :cpLineData="curveChartData.cpLineData"
        :lineData="curveChartData.lineData"
        :dataInfo="dataInfo"
      />
    </div>
  </div>
</template>

<script>
import iTableCustom from '@/components/iTableCustom'
import { getVpAnalysisDataList, getAnalysisProcessing } from '@/api/home'
import curveChart from './curveChart.vue'
export default {
  components: { iTableCustom, curveChart },
  data() {
    return {
      tableLoading: false,
      tableSetting: [
        {
          prop: 'partsId',
          label: '零件号',
          i18n:"LK_LINGJIANHAO",
          width: 120
        },
        {
          prop: 'partsNameZh',
          label: '零件名称',
          i18n:"LK_LINGJIANMINGCHENG",
          customRender: (h, scope, column, e) => {
            if (scope.row.partsNameZh) {
              return (
                <span class="#303133">
                  {scope.row.partsNameZh.length > 5
                    ? scope.row.partsNameZh.slice(0, 4) + `...`
                    : scope.row.partsNameZh}
                </span>
              )
            }
            return scope.row.partsNameZh
          }
        },
        {
          prop: 'reductionPotential',
          i18n:"LK_ZHANGFU",
          label: '增幅%'
        }
      ],
      partList: [],
      curveChartData: {
        newestScatterData: [],
        targetScatterData: [],
        lineData: [],
        cpLineData: []
      },
      itemSelected: null,
      dataInfo: {}
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      const params = {
        pageNo: 1,
        pageSize: 5,
        rfqNo: ''
      }
      const result = await getVpAnalysisDataList(params)
      if (result && result.code === '200' && result.data) {
        this.partList = result.data.sort(
          (a, b) => b.reductionPotential - a.reductionPotential
        )
        if (this.partList.length) {
          this.itemSelected = this.partList[0]
          this.$refs.volumeTable.$refs.theCustomTable.setCurrentRow(
            this.partList[0]
          )
          this.getDetail()
        }
      }
    },
    handleCurveData(data) {
      this.curveChartData.newestScatterData = []
      this.curveChartData.targetScatterData = []
      this.curveChartData.lineData = []
      this.curveChartData.cpLineData = []
      data.map((item) => {
        if (item.priceFlag === 'LP') {
          this.curveChartData.newestScatterData.push([
            item.production,
            item.price
          ])
          this.curveChartData.lineData.push([item.production, item.price])
        } else if (item.priceFlag === 'TP') {
          this.curveChartData.targetScatterData.push([
            item.production,
            item.price
          ])
          this.curveChartData.lineData.push([item.production, item.price])
        } else if (item.priceFlag === 'CP') {
          this.curveChartData.cpLineData = [item.production, item.price]
        } else {
          this.curveChartData.lineData.push([item.production, item.price])
        }
      })
    },
    handleTableCurrentChange(val) {
      this.itemSelected = val
      this.getDetail()
    },
    async getDetail() {
      const result = await getAnalysisProcessing({
        id: this.itemSelected.id,
        inMode: 1
      })
      if (result.code === '200' && result.data) {
        this.dataInfo = result.data
        const analysisCurveData = Array.isArray(this.dataInfo.analysisCurve)
          ? this.dataInfo.analysisCurve
          : []
        this.handleCurveData(analysisCurveData)
      }
    }
  }
}
</script>

<style lang="scss">
#volumePriceChart {
  height: 250px;
  position: relative;
}
.x-title {
  position: absolute;
  z-index: 10000000;
  bottom: 3%;
  right: 2%;
  color: #7e84a3;
}
.volume-container {
  > .table-container {
    .el-table .el-table__header {
      background: transparent;
    }
    .el-table tr:nth-child(even) {
      background: transparent;
    }
    .el-table::before {
      height: 0;
    }
  }
}
</style>
