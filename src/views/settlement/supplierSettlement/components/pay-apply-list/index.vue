<template>
  <div>
    <iSearch @reset="handleSearchReset" @sure="handleSearch">
      <el-form :model="searchForm">
        <el-form-item v-for="(item, index) in searchData" :label="item.key ? language(item.key, item.name) : item.name" :key="index">
          <iInput v-if="item.type == 'input'" v-model="searchForm[item.props]" :placeholder="language('QINGSHURU', '请输入')"></iInput>
          <iSelect v-if="item.type == 'select' && 'statusMsg' == item.props" v-model="searchForm[item.props]">
            <el-option value="" :label="$t('all') | capitalizeFilter"></el-option>
            <el-option v-for="(v, k) in statusMap" :key="k" :value="k" :label="v" />
          </iSelect>
          <iSelect v-if="item.type == 'select' && 'payerCompanyCode' == item.props" v-model="searchForm[item.props]">
            <el-option value="" :label="$t('all') | capitalizeFilter"></el-option>
            <el-option v-for="(v, k) in payerCompanyCodeMap" :key="k" :value="k" :label="v" />
          </iSelect>
          <iMultiLineInput v-if="item.type == 'multiLineInput'" v-model="searchForm[item.props]" :title="item.key ? language(item.key, item.name) : item.name"></iMultiLineInput>
          <iDatePicker v-if="item.type == 'dateRangeYMD'" v-model="searchForm[item.props]" valueFormat="yyyy-MM-dd" type="daterange"></iDatePicker>
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard class="margin-top20">
      <!-- 数据列表 -->
      <iTableList :tableTitle="tableTitle" :tableData="tableListData" @handleSelectionChange="handleSelectionChange" :tableLoading="tableLoading">
        <template #payApplyCode="scope">
          <div class="link" @click="$event => jumpDetails(scope.row)">{{ scope.row.payApplyCode }}</div>
        </template>
        <!-- 状态 -->
        <template #statusMsg="scope">{{ statusMap[scope.row.statusMsg] }}</template>
        <template #payerCompanyCode="scope">{{ payerCompanyCodeMap[scope.row.payerCompanyCode] }}</template>
      </iTableList>

      <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes" :page-size="page.pageSize" :layout="page.layout" :current-page="page.currPage" :total="page.totalCount" />
    </iCard>
  </div>
</template>

<script>
import { iCard, iPagination, iDatePicker, iSearch, iInput, iSelect, iMessage, iMultiLineInput } from 'rise';
import { tableTitle, search, searchForm } from './data';
import { pageMixins } from '@/utils/pageMixins';
import resultMessageMixin from '@/utils/resultMessageMixin';
import iTableList from '@/components/iTableList';

import { pagePayApplyList, getDicResource } from '@/api/settlement/pay-apply';

export default {
  mixins: [pageMixins, resultMessageMixin],
  components: {
    iCard,
    iPagination,
    iDatePicker,
    iSearch,
    iInput,
    iSelect,
    iMultiLineInput,
    iTableList
  },
  data() {
    return {
      tableListData: [],
      tableTitle,
      tableLoading: false,
      selectData: [],
      searchForm: window._.cloneDeep(searchForm),
      searchData: search,
      listDetailShow: false,
      detailData: [],
      btnLoading: false,
      getPayApplyStatusList: [
        { code: '01', name: '暂存' },
        { code: '02', name: '等待审批' },
        { code: '03', name: '已审批' },
        { code: '04', name: '删除' },
        { code: '05', name: '拒绝' },
        { code: '06', name: '补充材料' },
        { code: '07', name: '已取消' },
      ], //申请状态字典
      statusMap: {
        draft: this.$t("settlement.status.draft"),
        approving: this.$t("settlement.status.approving"),
        'return-material': this.$t("settlement.status.return-material"),
        'return-rejected': this.$t("settlement.status.return-rejected"),
        'pending-sending': this.$t("settlement.status.pending-sending"),
        comparing: this.$t("settlement.status.comparing"),
        received: this.$t("settlement.status.received"),
        'comparing-email': this.$t("settlement.status.comparing-email"),
        'comparing-rejected': this.$t("settlement.status.comparing-rejected"),
        'audit-passed': this.$t("settlement.status.audit-passed"),
        'audit-invoice': this.$t("settlement.status.audit-invoice"),
        'written-off': this.$t("settlement.status.written-off"),
        cancelled: this.$t("settlement.status.cancelled"),
        'audit-rescan': this.$t("settlement.status.audit-rescan"),
        'audit-norescan': this.$t("settlement.status.audit-norescan"),
        'audit-reject': this.$t("settlement.status.audit-reject"),
        cancel: this.$t("settlement.status.cancel"),
        delete: this.$t("settlement.status.delete"),
        cancellation: this.$t("settlement.status.cancellation")
      },
      payerCompanyCodeMap: {
        '8000': '上汽大众汽车有限公司',
        '9000': '上海上汽大众汽车销售有限公司',
      }
    };
  },
  created() {
    const { status } = this.$route.query || {}
    this.searchForm.statusMsg = status
    this.getTableList();
  },
  methods: {
    handleSelectionChange(list) {
      this.selectData = list;
    },
    getTableList() {
      let keys = ['payApplyCode', 'orderCode', 'statusMsg', 'payerCompanyCode'];
      let searchForm = window._.pick(this.searchForm, keys);
      if (this.searchForm.createDate != null) {
        searchForm.createDateStart = this.searchForm.createDate[0];
        searchForm.createDateEnd = this.searchForm.createDate[1];
      }
      let params = {
        ...searchForm,
        supplierId: this.$store.state.permission.userInfo.supplierId,
        current: this.page.currPage,
        size: this.page.pageSize
      };
      this.tableLoading = true;
      pagePayApplyList(params).then(res => {
        if (res.data) {
          this.page.currPage = res.pageNum;
          this.page.totalCount = res.total;
          this.tableListData = res.data;
        }
        this.tableLoading = false;
      }).catch(e => {
        console.log(e);
        this.tableLoading = false;
      });
    },
    // 搜索
    handleSearch() {
      this.getTableList();
    },
    // 重置搜索框
    handleSearchReset() {
      this.searchForm = window._.cloneDeep(searchForm);
      this.page.currPage = 1;
      this.getTableList();
    },
    // 创建申请
    createPayApply() {
      let routeData = this.$router.resolve({
        path: `/settlement/supplierSettlement/returnOrderManagementDetails/0/-1`
      });
      window.open(routeData.href, '_blank');
    },
    // 获取支付申请状态字典
    getPayApplyStatus() {
      getDicResource('PayApplyStatus')
        .then(res => {
          if (+res.code == 200) {
            this.getPayApplyStatusList = res?.data[0]?.subDictResultVo;
          } else {
            iMessage.error(res?.desZh);
          }
        }).catch(() => (this.tableLoading = false));
    },
    // 跳转详情
    jumpDetails(r) {
      let routeData = this.$router.resolve({
        path: '/supplier/settlement/payApplyDetail',
        query: {
          id: r.id,
          code: r.payApplyCode
        }
      });
      window.open(routeData.href, '_blank');
    }
  }
};
</script>

<style lang="scss" scoped>
.openPage {
  color: $color-blue;
  font-size: 14px;
  text-decoration: underline;
  width: 100px;
  @include text_;
}

.link {
  font-size: 14px;
  color: #1763f7;
  text-decoration: underline;
  cursor: pointer;
}
</style>
