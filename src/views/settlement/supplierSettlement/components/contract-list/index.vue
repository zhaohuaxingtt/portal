<template>
  <div>
    <iSearch @reset="handleSearchReset" @sure="handleSearch">
      <el-form>
        <el-form-item v-for="(item, index) in searchData" :label="item.key ? language(item.key, item.name) : item.name" :key="index">
          <template v-if='item.type == "select"'>
            <template v-if="item.props == 'payerCompanyCode'">
              <iSelect v-model="searchForm[item.props]">
                <el-option v-for="item in payerCompanyCodeList" :key="item.code" :label="item.name" :value="item.code">
                </el-option>
              </iSelect>
            </template>
            <template v-if="item.props == 'isComplete'">
              <iSelect v-model="searchForm[item.props]">
                <el-option v-for="item in isCompleteList" :key="item.code" :label="item.name" :value="item.code"> </el-option>
              </iSelect>
            </template>
            <template v-if="item.props == 'type'">
              <iSelect v-model="searchForm[item.props]">
                <el-option v-for="item in typeList" :key="item.code" :label="item.name" :value="item.code"> </el-option>
              </iSelect>
            </template>
          </template>
          <template v-else-if='item.type == "date" || item.type == "dateRange"'>
            <iDatePicker v-model="searchForm[item.props]" valueFormat="yyyy-MM-dd" type="daterange"></iDatePicker>
          </template>
          <template v-else>
            <iInput v-if="item.type == 'input'" v-model="searchForm[item.props]" :placeholder="language('QINGSHURU', '请输入')"></iInput>
          </template>
        </el-form-item>
      </el-form>
    </iSearch>

    <iCard class="margin-top20">
      <template slot="header-control">
        <i-button @click="billingAssistant()">开票助手</i-button>
        <iButton @click="createApply()" :loading="btnLoading">{{ language('CHUANGJIANSHENQING', '创建支付申请') }}</iButton>
      </template>
      <tableList :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="tableLoading" index @handleSelectionChange="handleSelectionChange">
        <!-- 甲方 -->
        <template #payerCompanyCode="scope">
          <pre class="text" v-if="scope.row.payerCompanyCode == 8000">上汽大众汽车有限公司</pre>
          <pre class="text" v-else-if="scope.row.payerCompanyCode == 9000">上海上汽大众汽车销售有限公司</pre>
        </template>
        <!-- 结算状态 -->
        <template #isComplete="scope">
          <pre class="text" v-if="scope.row.isComplete == 'Y'">结算完成</pre>
          <pre class="text" v-else-if="scope.row.isComplete == 'N'">结算未完成</pre>
        </template>
      </tableList>
      <iPagination @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes" :page-size="page.pageSize" :layout="page.layout" :current-page="page.currPage" :total="page.totalCount" />
    </iCard>

    <!-- 开票助手弹出框 -->
    <el-dialog title="开票助手" :visible.sync="dialogVisible" width="30%">
      <div style="padding: 10px; text-align: center">
        <el-row :gutter="24">
          <el-col :span="12">
            <span class="spanLeft">{{ language('公司名', '公司名') }}</span>
            <span class="spanRight">{{ company.companyNameZh }}</span>
          </el-col>
          <el-col :span="12">
            <span class="spanLeft">{{ language('统一社会信用代码', '统一社会信用代码') }}</span>
            <span class="spanRight">{{ company.taxCode }}</span>
          </el-col>
          <el-col :span="12">
            <span class="spanLeft">{{ language('开户行', '开户行') }}</span>
            <span class="spanRight">{{ company.bank }}</span>
          </el-col>
          <el-col :span="12">
            <span class="spanLeft">{{ language('账号', '账号') }}</span>
            <span class="spanRight">{{ company.bankAccount }}</span>
          </el-col>
          <el-col :span="12">
            <span class="spanLeft">{{ language('地址', '地址') }}</span>
            <span class="spanRight">{{ company.address }}</span>
          </el-col>
          <el-col :span="12">
            <span class="spanLeft">{{ language('电话', '电话') }}</span>
            <span class="spanRight">{{  }}</span>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { iCard, iPagination, iButton, iSearch, iInput, iSelect, iDatePicker, iMessage } from 'rise';
import tableList from '@/views/settlement/components/tableList';
import { tableTitle, search, searchForm } from './data';
import { pageMixins } from '@/utils/pageMixins';
import resultMessageMixin from '@/utils/resultMessageMixin';
// 引入要调用的后端方法
import { createPayApply } from '@/api/settlement/pay-apply';
import { getUnpaidContractList } from '@/api/settlement/contract';
import { getPayApplyTmCompanyByCode } from '@/api/settlement/pay-invoice';

export default {
  mixins: [pageMixins, resultMessageMixin],
  components: {
    iCard,
    tableList,
    iPagination,
    iButton,
    iSearch,
    iInput,
    iSelect,
    iDatePicker
  },
  data() {
    return {
      dialogVisible: false,
      tableListData: [],
      tableTitle,
      tableLoading: false,
      selectData: [],
      searchForm: window._.cloneDeep(searchForm),
      searchData: search,
      listDetailShow: false,
      detailData: [],
      btnLoading: false,
      statusList: [],
      selectTableData: [],
      payerCompanyCodeList: [
        { code: '8000', name: '上汽大众有限公司' },
        { code: '9000', name: '上海上汽大众销售有限公司' }
      ],
      isCompleteList: [
        { code: 'N', name: '未完成' },
        { code: 'Y', name: '已完成' }
      ],
      typeList: [
        { code: 'GP', name: 'GP'},
        { code: 'PP', name: 'PP'},
      ],
      payApplyCode: '',
      company: {
        companyNameZh: null,
        taxCode: null,
        bankAccount: null,
        bank: null,
        address: null
      }
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    getTableList() {
      let keys = ['orderCode', 'contractName', 'payerCompanyCode', 'isComplete'];
      let searchForm = window._.pick(this.searchForm, keys);
      if (this.searchForm.contractDate != null) {
        searchForm.beginCreateDate = this.searchForm.contractDate[0];
        searchForm.endCreateDate = this.searchForm.contractDate[1];
      }
      let params = {
        ...searchForm,
        current: this.page.currPage,
        size: this.page.pageSize
      };
      getUnpaidContractList(params).then(res => {
        if (res.data) {
          this.page.currPage = res.pageNum;
          this.page.totalCount = res.total;
          this.tableLoading = false;
          this.tableListData = res.data;
        }
      });
    },
    // 创建支付申请
    createApply() {
      if (0 == this.selectTableData.length) {
        return iMessage.warn("请选择一条合同进行创建");
      } else if (1 == this.selectTableData.length) {
        this.getContractInfo(this.selectTableData[0]);
      } else if (1 < this.selectTableData.length) {
        return iMessage.warn("只能选择一条");
      }
    },
    // 重置搜索框
    handleSearchReset() {
      this.searchForm = window._.cloneDeep(searchForm);
      this.page.currPage = 1;
      this.getTableList();
    },
    // 搜索
    handleSearch() {
      this.getTableList();
    },
    handleSizeChange(val) {
      //每页 ${val} 条
      this.loading = true;
      this.page.pageSize = val;
      this.page.currPage = 1;
      this.getTableList();
    },
    handleCurrentChange(val) {
      this.loading = true;
      this.page.currPage = val;
      this.getTableList();
    },
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    // 创建时根据合同号获取合同信息
    getContractInfo(r) {
      let params = {
        suppId: r.suppId,
        contractCode: r.contractCode,
        payerCompanyCode: r.payerCompanyCode,
        suppCode: "20008"
      };
      this.tableLoading = true;
      createPayApply(params).then(res => {
        if (res.code == 200) {
          if (res.data.responseMsg == null || res.data.responseMsg == '') {
            // 创建成功，跳转到详情页面
            let routeUrl = this.$router.resolve({
              path: '/supplier/settlement/payApplyDetail',
              query: {
                payApplyCode: res.data.payApplyCode,
                id: res.data.id,
                payApplyStatus: res.data.payApplyStatus
              }
            });
            window.open(routeUrl.href, '_blank');
            this.payApplyDetail = res.data;
            this.payApplyCode = res.data.payApplyCode;
            this.tableData = res.data.payApplyLineDtoList;
          } else {
            // 创建失败，弹出错误信息
            iMessage.error(res.data.responseMsg);
          }
        } else {
          iMessage.error(res.desZh);
        }
        this.tableLoading = false;
      }).catch(e => {
        console.log(e);
        this.tableLoading = false;
      });
    },
    //开票助手
    billingAssistant() {
      getPayApplyTmCompanyByCode({ companyCodes: ['9000']}).then(res => {
        console.log(res);
        if (res.result) {
          let v = res.data[0];
          this.company.companyNameZh = v.companyNameZh;
          this.company.taxCode = v.taxCode;
          this.company.bankAccount = v.bankAccount;
          this.company.bank = v.bank;
          this.company.address = v.addressInfo.address;
        }
        this.dialogVisible = true;
      });
    }
  }
};
</script>

<style scoped>
.el-dialog__title {
  font-weight: bold;
}

.el-col-12 {
  width: 95%;
  margin-bottom: 5px;
  display: flex;
}

.el-row span {
  width: 100%;
  line-height: 2;
}

.el-row .spanLeft {
  text-align: right;
  margin-right: 15px;
}

.el-row .spanRight {
  text-align: left;
  margin-right: 15px;
}
</style>
