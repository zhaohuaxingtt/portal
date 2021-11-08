<!--
 * @Author: caopeng
 * @Date: 2021-010-14
-->
<template>
  <iPage class="box">
    <div class="page-title">
      <p>{{ language('RENWUGUANLI', '任务管理') }}</p>
    </div>
    <iSearch @reset="clickReset" @sure="sure" :icon="true" class="dilogHeader">
      <el-form label-width="80" inline label-position="top">
        <el-form-item :label="language('RENWUMINGCHENG', '任务名称')">
          <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.name">
          </iInput>
        </el-form-item>
        <el-form-item :label="language('RENWUZHUANGTAI', '任务状态')">
          <iSelect
            :placeholder="$t('APPROVAL.PLEASE_CHOOSE')"
            v-model="form.processingStatus"
          >
            <el-option
              v-for="item in processingList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('RENWUQIZHISHIJIAN', '任务起止时间')">
          <iDatePicker
            style="width: 300px"
            type="datetimerange"
            :range-separator="$t('SUPPLIER_ZHI')"
            :placeholder="''"
            v-model="daterange"
            value-format="yyyy-MM-dd"
            clearable
          />
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard style="margin-top:20px" class="tableBox">
      <div class="table-title">
        <iButton @click="handleExportCurrent">{{
          language('DAOCHU', '导出')
        }}</iButton>
      </div>
      <table-list
        :tableData="tableData"
        :tableTitle="supplierTableTitle"
        :index="true"
        :selection="false"
        :tableLoading="loading"
      >
        <template #manipulate="scope">
          <el-button
            v-if="scope.row.url != '' || scope.row.url != null"
            @click="handleRouter(scope.row)"
            type="text"
          >
            {{ language('CHAKAN', '查看') }}</el-button
          >
        </template>
      </table-list>
      <iPagination
        style="margin-top:20px"
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
    </iCard>
  </iPage>
</template>

<script>
import {
  iMessage,
  iSelect,
  iPagination,
  iButton,
  iInput,
  iDatePicker,
  iPage,
  iCard,
  iSearch
} from 'rise'
import { excelExport } from '@/utils/filedowLoad'
import { supplierTableTitle } from './components/data'
import { pageMixins } from '@/utils/pageMixins'
import tableList from '@/components/commonTable'
import {
  listSupplierKeyTrackFollowUser,
  categoryList,
  taskPage
} from '@/api/kpiChart/spi.js'
export default {
  mixins: [pageMixins],
  components: {
    tableList,
    iSelect,
    iPagination,
    iButton,
    iInput,
    iDatePicker,
    iPage,
    iCard,
    iSearch
  },
  props: {},
  data() {
    return {
      supplierId: '',
      reportData: null,
      tabVal: '',
      tableData: [],
      supplierTableTitle: supplierTableTitle,
      reasonData: [],
      followUsers: [],
      categorydate: [],

      daterange: [],

      processingList: [
        { value: '1', label: '待处理' },
        { value: '2', label: '处理完成' },
        // { value: '3', label: '取消' },
        { value: '4', label: '超时' }
      ],
      loading: true,
      form: {
        processingStatus: ''
      },
      measureList: [
        { label: '是', value: 1 },
        { label: '否', value: 0 }
      ]
    }
  },
  created() {
    console.log(this.supplierId)
      this.form.processingStatus = this.$route.query.status

    this.fetchReportDetail()
  },
  computed: {},
  methods: {
    //获取跟进人
    getUser() {
      let params = {
        supplierId: this.supplierId
      }
      listSupplierKeyTrackFollowUser(params).then(res => {
        if (res && res.code == 200) {
          this.followUsers = res.data
        }
      })
    },
    getCategoryList() {
      let params = {
        supplierType: this.tabVal
      }
      categoryList(params).then(res => {
        if (res && res.code == 200) {
          this.categorydate = res.data
        }
      })
    },
    handleClosed() {
      this.$router.go(-1)
    },
    //查询列表
    fetchReportDetail() {
      console.log(this.form.processingStatus)

      this.loading = true
      const params = {
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        startDateTime: this.daterange[0],
        endDateTime: this.daterange[1],
        // keyTrackTask
        type: this.$route.query.type,
        ...this.form
      }
      taskPage(params).then(res => {
        this.loading = false
        if (res && res.code == 200) {
          this.page.totalCount = res.total
          this.tableData = res.data
        } else iMessage.error(res.desZh)
      })
    },
    handleRouter(row) {
      window.open(row.url, '_blank')
    },
    //导出页面
    handleExportCurrent() {
      excelExport(this.tableData, supplierTableTitle)
    },
    // 点击重置
    clickReset() {
      this.form = {
        name: '',
        processingStatus: ''
      }
      this.daterange = []

      this.fetchReportDetail()
    },
    //点击查询
    sure() {
      this.page.currPage = 1
      this.fetchReportDetail()
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  padding-bottom: 20px;
}
.dilogHeader {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ::v-deep > div {
    width: 100%;
  }
}

.table-title {
  padding: 30px 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  p {
    font-size: 18px;
    font-family: Arial;
    font-weight: bold;
    color: #000000;
  }
}
.page-title {
  padding: 30px 0;
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
}
</style>
