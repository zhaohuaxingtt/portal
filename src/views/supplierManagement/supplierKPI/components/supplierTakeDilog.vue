<!--
 * @Author: caopeng
 * @Date: 2021-010-13
-->
<template>
  <div class="box">
    <div>
      <div class="top">
        <div class="searchOptions">
          <el-form>
            <el-row>
              <el-col>
                <iSelect
                  style="width:250px"
                  v-model="reportData"
                  @change="selectChange"
                >
                  <el-option
                    v-for="(item, index) in reportList"
                    :key="index"
                    :value="item.id"
                    :label="item.title"
                    >{{ item.title }}</el-option
                  >
                </iSelect>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="table-box">
        <tableList
          :tableData="tableData"
          :tableTitle="TakeNoteTableTitleDialog"
          :tableLoading="loading"
          :index="true"
          :selection="false"
        >
          <template #categoryName="scope">
            <el-tooltip
              :content="scope.row.tips"
              placement="top"
              effect="light"
            >
              <span>{{ scope.row.categoryName }}</span>
            </el-tooltip>
          </template>
        </tableList>
      </div>
    </div>
  </div>
</template>

<script>
import { iSelect, iMessage } from 'rise'
import { TakeNoteTableTitleDialog } from './data'
import tableList from '@/components/commonTable'
import { getInfo, spiDetailList } from '@/api/kpiChart/spi.js'
export default {
  props: {
    supplierId: { type: Number }
  },
  components: {
    iSelect,
    tableList
  },

  data() {
    return {
      reportData: null,
      loading: true,
      reportList: [],
      tableData: [],
      TakeNoteTableTitleDialog: TakeNoteTableTitleDialog,
      columns: [],
      reasonData: []
    }
  },
  created() {
    this.fetchInfo().then(() => {
      this.fetchReportDetail()
    })
    // this.fetchInfo()
    // this.fetchReportDetail()
  },
  computed: {
    checkShowReason() {
      return function(row) {
        let flag = true
        let temp = null
        this.columns.map(item => {
          const data = eval(window._.cloneDeep(row[item.name]))
          if (!data || (temp && temp >= data)) {
            flag = false
          }
          temp = data
        })
        return flag
      }
    }
  },
  methods: {
    fetchReportDetail() {
      this.loading = true
      const params = {
        supplierId: this.supplierId,
        spiReportId: this.reportData
      }
      spiDetailList(params).then(res => {
        if (res && res.code == 200) {
          this.loading = false

          this.tableData = res.data
        } else iMessage.error(res.desZh)
      })
    },
    fetchInfo() {
      return new Promise(resolve => {
        const params = {
          supplierId: this.supplierId
        }
        console.log(params)

        getInfo(params).then(res => {
          if (res && res.code == 200) {
            this.reportList = res.data
            this.reportData = res.data[0].id
            resolve()
          } else iMessage.error(res.desZh)
        })
      })
    },

    selectChange() {
      this.fetchReportDetail()
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  padding-bottom: 20px;
}

.top {
  display: flex;
  justify-content: space-between;
  .searchOptions {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
}

.table-box {
  margin-top: 20px;
}
</style>
