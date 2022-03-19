<!--
 * @Author: caopeng
 * @Date: 2021-010-12 
-->
<template>
  <div class="box">
    <div>
      <div class="dilogHeader">
        <el-form label-width="80" inline label-position="top">
          <el-form-item :label="language('SHIFOUCAIQUCUOSHI', '是否采取措施')">
            <iSelect
              style="width: 220px"
              :placeholder="language('请选择')"
              v-model="form.isTakeSteps"
            >
              <el-option
                v-for="item in measureList"
                :key="item.key"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </iSelect>
          </el-form-item>
          <el-form-item :label="language('GENJINREN', '跟进人')">
            <iSelect
              style="width: 220px"
              multiple
              collapse-tags
              filterable
              :placeholder="language('请选择')"
              v-model="form.followUserIds"
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
          <el-form-item :label="language('JIARUYUANYIN', '加入原因')">
            <iSelect
              multiple
              style="width: 220px"
              collapse-tags
              v-model="form.categoryCodes"
              :placeholder="language('请选择')"
            >
              <el-option
                v-for="item in categorydate"
                :key="item.categoryCode"
                :label="item.categoryName"
                :value="item.categoryCode"
              >
              </el-option>
            </iSelect>
          </el-form-item>
        </el-form>
        <div>
          <iButton @click="sure">{{ language('CHAXUN', '查询') }}</iButton>
          <iButton @click="clickReset">{{
            language('CHONGZHI', '重置')
          }}</iButton>
        </div>
      </div>
      <div class="tableBox">
        <div class="table-title">
          <p>{{ language('XIANGQINGLIEBIAO', '详情列表') }}</p>
          <iButton @click="handleExportCurrent" v-permission="SUPPLIER_WORKBENCH_JIXIAO_BANNIANBAOHUIGU_DAOCHUQUANBU">{{
            language('DAOCHUQUANBU', '导出全部')
          }}</iButton>
        </div>
        <table-list
          :tableData="tableData"
          :tableTitle="KeyNoteTableTitle"
          :index="true"
          :selection="false"
          :tableLoading="loading"
        >
        </table-list>
        <iPagination
          style="margin-top: 20px"
          v-update
          @size-change="handleSizeChange($event, fetchReportDetail)"
          @current-change="handleCurrentChange($event, fetchReportDetail)"
          background
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :current-page="page.currPage"
          :total="page.totalCount"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { iMessage, iSelect, iPagination, iButton } from 'rise'
import { KeyNoteTableTitle } from './data'
import { pageMixins } from '@/utils/pageMixins'
import tableList from '@/components/commonTable'
import {
  listSupplierKeyTrackFollowUser,
  categoryList,
  keyTrackRecordExport,
  keyTrackRecordPage
} from '@/api/kpiChart/spi.js'
export default {
  mixins: [pageMixins],
  components: {
    tableList,
    iSelect,
    iPagination,
    iButton
  },
  props: {
    supplierId: { type: Number },
    tabVal: { type: String },
    nameZh: { type: String }
  },
  data() {
    return {
      reportData: null,
      tableData: [],
      KeyNoteTableTitle: KeyNoteTableTitle,
      reasonData: [],
      followUsers: [],
      categorydate: [],
      loading: true,
      form: {
        isTakeSteps: ''
      },
      measureList: [
        { label: this.language('QUANBU', '全部'), value: null },
        { label: this.language('KONG', '空'), value: 2 },
        { label: this.language('YES', '是'), value: 1 },
        { label: this.language('NO', '否'), value: 0 }
      ]
    }
  },
  created() {
    console.log(this.supplierId)
    this.fetchReportDetail()
    this.getUser()
    this.getCategoryList()
  },
  computed: {},
  methods: {
    //获取跟进人
    getUser() {
      let params = {
        supplierId: this.supplierId
      }
      listSupplierKeyTrackFollowUser(params).then((res) => {
        if (res && res.code == 200) {
          this.followUsers = res.data
        }
      })
    },
    getCategoryList() {
      let params = {
        supplierType: this.tabVal
      }
      categoryList(params).then((res) => {
        if (res && res.code == 200) {
          this.categorydate = res.data
        }
      })
    },
    handleClosed() {
      this.$router.go(-1)
    },
    fetchReportDetail() {
      this.loading = true
      const params = {
        supplierId: this.supplierId,
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        ...this.form
      }
      keyTrackRecordPage(params).then((res) => {
        this.loading = false
        if (res && res.code == 200) {
          this.page.totalCount = res.total
          this.tableData = res.data
        } else iMessage.error(res.desZh)
      })
    },
    //导出页面
    handleExportCurrent() {
      const params = {
        supplierName: this.nameZh,
        supplierId: this.supplierId
      }
      keyTrackRecordExport(params)
    },
    // 点击重置
    clickReset() {
      this.form = {
        isTakeSteps: '',
        followUserIds: [],
        categoryCodes: []
      }
      this.fetchReportDetail()
    },
    clear() {
      this.form = {
        isTakeSteps: '',
        followUserIds: [],
        categoryCodes: []
      }
    },
    //点击查询
    sure() {
      this.page.currPage = 1
      this.page.pageSize = 10
      this.fetchReportDetail()
    }
  }
}
</script>

<style lang="scss" scoped>
// ::v-deep .el-tooltip__popper {
//     max-width: 100px!important;  //宽度可根据自己需要进行设置
//   }
.box {
  padding-bottom: 20px;
}
.dilogHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e3e3e3;
  padding-bottom: 10px;
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
::v-deep .el-form--inline .el-form-item {
  margin-right: 30px;
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
