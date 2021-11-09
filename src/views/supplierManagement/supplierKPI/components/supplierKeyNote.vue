<!--
 * @Author: caopeng
 * @Date: 2021-010-12 
-->
<template>
  <div>
    <iPage>
      <iCard style="margin-top:20px">
        <div class="headerTitle">
          <div class="supplier-table-tittle">
            {{ $route.query.supplierName }}
          </div>
          <div class="el-icon-error closed" @click="handleClosed"></div>
        </div>
        <iSearch @sure="sure" :icon="true">
          <el-form>
            <el-form-item label="是否采取措施">
              <iSelect
                :placeholder="$t('APPROVAL.PLEASE_CHOOSE')"
                v-model="form.isTakeSteps"
              >
                <el-option
                  v-for="item in measureList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </iSelect>
            </el-form-item>
            <el-form-item label="跟进人">
              <iSelect
                :placeholder="$t('APPROVAL.PLEASE_CHOOSE')"
                v-model="form.followUserId"
              >
                <el-option
                  v-for="item in followUsers"
                  :key="item.followUserId"
                  :label="item.followUserName"
                  :value="item.followUserId"
                >
                </el-option>
              </iSelect>
            </el-form-item>
            <el-form-item label="加入原因">
              <iSelect
                :placeholder="$t('APPROVAL.PLEASE_CHOOSE')"
                v-model="form.followUserId"
              >
              </iSelect>
            </el-form-item>
          </el-form>
        </iSearch>
        <div class="tableBox">
            <div class="table-title">
        <p>{{ language('XIANGQINGLIEBIAO', '详情列表') }}</p>
        <iButton @click="handleExportCurrent">{{
          language('DAOCHUQUANBU', '导出全部')
        }}</iButton>
      </div>
          <table-list
            :tableData="tableData"
            :tableTitle="KeyNoteTableTitle"
            @openPage="openPage"
            :index="true"
          />
          <iPagination
            v-update
            @size-change="handleSizeChange($event, sure)"
            @current-change="handleCurrentChange($event, fetchReportDetail)"
            background
            :page-sizes="page.pageSizes"
            :page-size="page.pageSize"
            :layout="page.layout"
            :current-page="page.currPage"
            :total="page.totalCount"
          />
        </div>
      </iCard>
    </iPage>
  </div>
</template>

<script>
import { iPage, iCard, iSelect, iMessage, iSearch, iPagination,iButton } from 'rise'
import { KeyNoteTableTitle } from './data'
import { pageMixins } from '@/utils/pageMixins'
import tableList from '@/components/commonTable'
import { spiDetailList, KeyTrackFollowUserList } from '@/api/kpiChart/spi.js'
export default {
  mixins: [pageMixins],
  components: {
    tableList,
    iPage,
    iCard,
    iSearch,
    iSelect,
    iPagination,
    iButton
  },
  data() {
    return {
      reportData: null,
      supplierId: this.$route.query.supplierId,
      tableData: [],
      KeyNoteTableTitle: KeyNoteTableTitle,
      reasonData: [],
      followUsers: [],
      form: {},
      measureList: [
        { label: '是', value: 1 },
        { label: '否', value: 0 }
      ]
    }
  },
  created() {
    this.fetchReportDetail()
    this.getUser()
  },
  computed: {},
  methods: {
    // getUser() {
    //   let params = {
    //     supplierType: this.tabVal
    //   }
    //   KeyTrackFollowUserList(params).then(res => {
    //     if (res && res.code == 200) {
    //       this.followUsers = res.data
    //     }
    //   })
    // },
    handleClosed() {
      this.$router.go(-1)
    },
    fetchReportDetail() {
      this.loading = true
      const params = {
        spiReportId: this.supplierId
      }
      spiDetailList(params).then(res => {
        this.loading = false

        if (res && res.code == 200) {
          this.page.totalCount = res.total
          this.tableData = res.data
        } else iMessage.error(res.desZh)
      })
    },

    selectChange(val) {
      this.fetchReportDetail()
    },
    sure() {
      this.page.currPage = 1
       this.page.pageSize = 10
      this.fetchReportDetail()
    }
  }
}
</script>

<style lang="scss" scoped>
.imgkpi-head {
  display: flex;
  justify-content: space-between;
}
.headerTitle {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.closed {
  font-size: 24px;
  color: #a0bffc;
  cursor: pointer;
}
.table-title {
    padding: 30px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    font-size: 18px;
    font-family: Arial;
    font-weight: bold;
    color: #000000;
  }
}
.top {
  display: flex;
  justify-content: space-between;
  .searchOptions {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .rotate {
    transform: rotate(180deg);
    color: #a0bffc;
    margin-left: 10px;
    font-size: 16px;
  }
}
.supplier-table-tittle {
  font-size: 18px;
  color: #000;
  font-weight: bold;
  margin-bottom: 20px;
}
.tableBox {
  margin-top: 20px;
  .rotate {
    color: #e30d0d;
    font-size: 16px;
  }
}
</style>
