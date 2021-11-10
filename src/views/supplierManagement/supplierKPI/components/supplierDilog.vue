<!--
 * @Author: caopeng
 * @Date: 2021-010-12 
-->
<template>
  <div class="box">
    <div>
      <div class="top">
        <div class="searchOptions">
          <el-form>
            <el-row>
              <el-col>
                <iSelect v-model="reportData" @change="selectChange">
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
          :tableData="tableData.list"
          :tableTitle="TakeNoteTableTitle"
          :tableLoading="loading"
          :index="true"
          :selection="false"
        >
        </tableList>
      </div>
    </div>
  </div>
</template>

<script>
import { iSelect, iMessage } from 'rise'
import { TakeNoteTableTitle } from './data'
import tableList from '@/components/commonTable'
import { getInfo, spiDetailQuery } from '@/api/kpiChart/spi.js'
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
      TakeNoteTableTitle: TakeNoteTableTitle,
      columns: [],
      reasonData: [],
      visible: true
    }
  },
  created() {
    this.fetchInfo().then(() => {
      this.fetchReportDetail()
    })
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
    handleClosed() {
      this.$router.go(-1)
    },
    fetchReportDetail() {
      this.loading = true
      const params = {
        id: this.reportData
      }
      spiDetailQuery(params).then(res => {
        this.loading = false

        if (res && res.code == 200) {
          this.tableData = res.data
        } else iMessage.error(res.desZh)
      })
    },
    fetchInfo() {
      return new Promise(resolve => {
        const params = {
          supplierId: this.supplierId
        }
        getInfo(params).then(res => {
          if (res && res.code == 200) {
            this.reportList = res.data
            this.reportData = res.data[res.data.length - 1].id
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
