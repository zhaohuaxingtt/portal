<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-16 14:10:10
 * @LastEditors: 水痕
 * @Descripttion: your project
-->
<template>
  <!--风险供应商-->
  <iDialog :visible.sync="value" width="1140px" height="1000px" @close="clearDiolog">
    <div slot="title" class="adjust">
      <span class="title">{{$t('SPR_FRM_FXXH_FXGYS')}}</span>
      <el-popover trigger="hover" placement="top-start">
        <div class="tip-title">{{$t('SPR_FRM_FXXH_RWSSJGQGBTCBYQGYSZC')}}</div>
        <icon slot="reference" symbol name="iconxinxitishi" class="font-size16 marin-left5" />
      </el-popover>
    </div>
    <el-form>
      <el-row type="flex" align='bottom' justify="start">
        <el-col :span="5">
          <el-form-item :label="$t('LK_GONGYINGSHANGMINGCHENG')">
            <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.supplierName"></iInput>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item :label="$t('SUPPLIER_SAPHAO')">
            <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.sapCode"></iInput>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item :label="$t('SUPPLIER_TONGYISHEHUIXINGYONGDAIMA')">
            <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.socialcreditNo"></iInput>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item>
            <iButton @click="getTableList">{{$t('LK_QUEREN')}}</iButton>
            <iButton @click="handleSearchReset">{{$t('LK_ZHONGZHI')}}</iButton>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <el-divider></el-divider>
    <div class="margin-bottom20 clearFloat">
      <div class="floatright">
        <!-- 确认添加-->
        <iButton @click="handleAdd">{{ $t('SPR_FRM_FXXH_QRTJ') }}</iButton>
      </div>
    </div>
    <tableList :openPageGetRowData="true" :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="tableLoading" :index="true" @handleSelectionChange="handleSelectionChange">
    </tableList>
    <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes" :page-size="page.pageSize" :layout="page.layout" :current-page='page.currPage' :total="page.totalCount" />
    <div slot="footer" class="dialog-footer"></div>
  </iDialog>
</template>

<script>
import { iDialog, iSelect, iButton, iInput, iSearch, iCard, iPagination, iMessage, icon } from 'rise';
import { riskTableTitle } from "./data";
import tableList from '@/components/commonTable';
import { pageMixins } from '@/utils/pageMixins';
import resultMessageMixin from '@/mixins/resultMessageMixin';
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'
import { getPageRiskSupplier } from "@/api/frmRating/riskSignal/riskSignal.js";

export default {
  mixins: [resultMessageMixin, pageMixins, generalPageMixins],
  components: {
    iDialog,
    iSelect,
    iButton,
    iInput,
    iSearch, tableList, iCard, iPagination, icon
  },
  props: {
    value: { type: Boolean },
    loading: { type: Boolean, default: false },
    tsPpSupplierName: { type: String, default: '' }
  },
  watch: {
    tsPpSupplierName: {
      handler(data) {
        this.form.supplierName = data
      },
      deep: true
    }
  },
  data() {
    return {
      form: {
        supplierName: '',
        sapCode: '',
        socialcreditNo: '',
      },
      tableListData: [],
      selectTableData: [],
      tableTitle: riskTableTitle,
      tableLoading: false,
    };
  },
  created() {
    this.getTableList()
  },
  methods: {
    handleSearchReset() {
      this.form = {
        supplierName: '',
        sapCode: '',
        socialcreditNo: '',
      }
      this.getTableList();
    },
    clearDiolog() {
      this.$emit('input', false);
    },
    async getTableList() {
      this.tableLoading = true;
      try {
        const req = {
          pageNo: this.page.currPage,
          pageSize: this.page.pageSize,
          ...this.form,
        };
        const res = await getPageRiskSupplier(req);
        if (res.result) {
          // SPR_FRM_FXXH_WZDGYSXX_QSRZQDTYSHXYDMHCS
          if (res.total === 0 && this.form.supplierName === '' && this.form.sapCode === '' && this.form.socialcreditNo !== '') {
            iMessage.warn(this.$t('SPR_FRM_FXXH_WZDGYSXX_QSRZQDTYSHXYDMHCS'))
          }
          this.tableListData = res.data;
          this.page.currPage = res.pageNum;
          this.page.pageSize = res.pageSize;
          this.page.totalCount = res.total || 0;
        }
        this.tableLoading = false;
      } catch {
        this.tableListData = [];
        this.tableLoading = false;
      }
    },
    handleSelectionChange(e) {
      this.selectTableData = e
    },
    handleAdd() {
      if (this.selectTableData.length === 1) {
        this.$emit('selectTableData', this.selectTableData)
        this.clearDiolog()
      } else if (this.selectTableData.length < 1) {
        iMessage.warn(this.$t('SPR_FRM_XGYSPJ_QXZYTSJTJ'))
      } else {
        iMessage.warn(this.$t('SPR_FRM_ZNXZYTSJ'))
      }
    },
  },
};
</script>

<style scoped lang="scss">
.adjust {
  font-size: 1.125rem;
  font-weight: bold;
  line-height: 1.5625rem;
}
.title {
  margin-right: 10px;
}
::v-deep .el-form-item__content {
  width: 220px;
}
::v-deep .el-col-9 .el-form-item {
  display: flex;
  justify-content: flex-end;
}
</style>
