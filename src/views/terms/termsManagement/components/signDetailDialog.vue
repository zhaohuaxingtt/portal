<template>
  <!-- 签署情况 -->
  <iDialog
    :title="getDialogTitle(signTitle.name, signTitle.termsVersion)"
    :visible.sync="openDialog"
    append-to-body="true"
    width="95%"
    top="5vh"
    @close="clearDiolog"
    :close-on-click-modal="false"
  >
    <div class="card">
      <el-form style="margin-bottom: 2rem">
        <!--第一行-->
        <el-row :gutter="24" class="form__first">
          <!-- 供应商 -->
          <el-col :span="4">
            <el-form-item :label="$t('TM_GONGYINGSHANGMINGCHENG')">
              <iInput v-model="form.shortNameZh"></iInput>
            </el-form-item>
          </el-col>
          <!-- 签署状态 -->
          <el-col :span="4">
            <el-form-item :label="$t('TM_QIANSHUZHUANGTAI')">
              <iSelect
                :placeholder="$t('TM_QUANBU')"
                v-model="form.signStatus"
                clearable
                multiple
                collapse-tags
              >
                <el-option
                  :value="item.value"
                  :label="$t(item.i18n)"
                  v-for="item of signStatusList"
                  :key="item.value"
                ></el-option>
              </iSelect>
            </el-form-item>
          </el-col>
          <!-- 供应商身份 -->
          <el-col :span="4">
            <el-form-item :label="$t('TM_GONGYINGSHANGSHENFEN')">
              <iSelect
                :placeholder="$t('TM_QUANBU')"
                v-model="form.supplierIdentity"
                clearable
                multiple
                collapse-tags
              >
                <el-option
                  :value="item.value"
                  :label="$t(item.i18n)"
                  v-for="item of supplierIdentityList"
                  :key="item.value"
                ></el-option>
              </iSelect>
            </el-form-item>
          </el-col>
          <!-- 供应商类型 -->
          <el-col :span="4">
            <el-form-item :label="$t('TM_GONGYINGSHANGLEIXING')">
              <iSelect
                :placeholder="$t('TM_QUANBU')"
                v-model="form.supplierType"
                clearable
                multiple
                collapse-tags
              >
                <el-option
                  :value="item.value"
                  :label="$t(item.i18n)"
                  v-for="item of supplierRangeList"
                  :key="item.value"
                ></el-option>
              </iSelect>
            </el-form-item>
          </el-col>
          <!-- 地区 -->
          <el-col :span="4">
            <el-tooltip
              class="item"
              effect="light"
              :content="$t('TM_QINGSHURUGUOJIAHUOCHENGSHIMINGCHENG')"
              placement="top"
            >
              <el-form-item :label="$t('TM_DIQU')">
                <el-cascader
                  v-model="form.area"
                  :options="formGoup.areaList"
                  :props="{ multiple: true }"
                  :clearable="true"
                  popper-class="area-select"
                  :placeholder="$t('TM_QUANBU')"
                  collapse-tags
                  filterable
                ></el-cascader>
              </el-form-item>
            </el-tooltip>
          </el-col>

          <div class="search">
            <iButton @click="getTableList(form)">{{ $t('TM_CHAXUN') }}</iButton>
            <iButton @click="handleSearchReset">{{
              $t('TM_CHONGZHI')
            }}</iButton>
          </div>
        </el-row>

        <!-- 第二行 -->
        <el-row :gutter="24">
          <!-- 业务编号 -->
          <el-col :span="4">
            <el-form-item :label="$t('TM_YEWUBIANHAO')">
              <iInput v-model="form.serviceCode"></iInput>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-divider></el-divider>

      <div class="export">
        <iButton
          @click="handleException"
          v-show="this.extendFields !== false"
          :disabled="signTitle.state == '04'"
          >{{ $t('TM_BIAOJILIWAI') }}</iButton
        >
        <!-- <iButton @click="handleExport">{{ '导出当前' }}</iButton> -->
        <iButton
          @click="handleExportKZSorXJ"
          v-show="termsCode == KZSorXJCode && buttonShow == true"
          >{{ KZSorXJ }}</iButton
        >
        <iButton @click="handleExportAll">{{ $t('TM_DAOCHUQUANBU') }}</iButton>
      </div>
      <div v-show="this.extendFields !== false" class="tips">
        {{ $t('TM_RUSHIJIBUYIZHIKENENGSHITONGJIWUCHA') }}
      </div>

      <iTableML
        style="height: 30rem; overflow-y: scroll"
        tooltip-effect="light"
        :data="tableListData"
        :tableLoading="tableLoading"
      >
        <el-table-column
          :label="$t('TM_XUHAO')"
          type="index"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          min-width="160px"
          :label="$t('TM_GONGYINGSHANGMINGCHENG')"
          ><template slot-scope="scope">
            <span>{{ scope.row['shortNameZh'] }}</span>
          </template></el-table-column
        >
        <el-table-column align="center" :label="$t('TM_YEWUBIANHAO')"
          ><template slot-scope="scope">
            <span>{{ scope.row['serviceCode'] }}</span>
          </template></el-table-column
        >
        <el-table-column align="center" :label="$t('TM_LINSHIHAO')">
          <template slot-scope="scope">
            <span>{{ scope.row['svwTempCode'] }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('TM_SVWHAO')"
          ><template slot-scope="scope">
            <span>{{ scope.row['svwCode'] }}</span>
          </template></el-table-column
        >
        <el-table-column align="center" :label="$t('TM_SAPHAO')"
          ><template slot-scope="scope">
            <span>{{ scope.row['sapCode'] }}</span>
          </template></el-table-column
        >
        <el-table-column align="center" :label="$t('TM_GONGYINGSHANGSHENFEN')"
          ><template slot-scope="scope">
            <span>{{
              scope.row.formalStatus == '0'
                ? $t('TM_LINSHI')
                : scope.row.formalStatus == '1'
                ? $t('TM_ZHENGSHI')
                : scope.row.formalStatus == '2'
                ? $t('TM_CHUXUCHI')
                : ''
            }}</span>
          </template></el-table-column
        >
        <el-table-column align="center" :label="$t('TM_GONGYINGSHANGLEIXING')"
          ><template slot-scope="scope">
            <span>{{
              scope.row.supplierType == 'PP'
                ? $t('TM_SHENGCHANGONGYINGSHANG')
                : scope.row.supplierType == 'GP'
                ? $t('TM_YIBANGONGYINGSHANG')
                : scope.row.supplierType == 'NT'
                ? 'N-Tier'
                : scope.row.supplierType == 'CM'
                ? $t('TM_ZIDINGYI')
                : ''
            }}</span>
          </template></el-table-column
        >
        <el-table-column align="center" :label="$t('TM_QIANSHUREN')"
          ><template slot-scope="scope">
            <span>{{ scope.row['signName'] }}</span>
          </template></el-table-column
        >
        <el-table-column align="center" :label="$t('TM_QIANSHUZHUANGTAI')"
          ><template slot-scope="scope">
            <span v-if="scope.row.signStatus == '01'">
              {{ $t('TM_WEIQIANSHU') }}
            </span>
            <span v-if="scope.row.signStatus == '02'">
              {{ $t('TM_YIQIANSHUBIAOZHUN') }}
            </span>
            <span v-if="scope.row.signStatus == '03'" style="color: #f75526">
              {{ $t('TM_YIQIANSHUFEIBIAO') }}
            </span>
            <span v-if="scope.row.signStatus == '04'" style="color: #f75526">
              {{ $t('TM_LIWAI') }}
            </span>
            <span v-else></span> </template
        ></el-table-column>
        <el-table-column align="center" :label="$t('TM_QIANSHURIQI')">
          <template slot-scope="scope">
            <span>{{
              scope.row['signDate'] && scope.row['signDate'].substring(0, 10)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" width="240px" :label="$t('TM_CAOZUO')">
          <template slot-scope="scope">
            <div v-if="scope.row.signStatus == '02'">—</div>
            <div v-else>
              <div v-if="scope.row.signStatus == '03'">
                <span
                  class="open-link-text"
                  @click="handleDownloadFile(scope.row)"
                  style="margin-right: 8px"
                  >{{ $t('TM_FEITIAOKUANXIAZAI') }}</span
                >
                <a
                  class="el-icon-paperclip open-link-text"
                  style="font-size: 16px; margin-right: 2.5rem"
                ></a>
                <span style="color: #5d5d5d; opacity: 0.2">{{
                  $t(' TM_LIWAICAOZUO')
                }}</span>
              </div>
              <div v-else>
                <span style="margin-right: 8px; color: #5d5d5d; opacity: 0.2">{{
                  $t('TM_FEITIAOKUANXIAZAI')
                }}</span>
                <a
                  class="el-icon-paperclip"
                  style="
                    font-size: 16px;
                    margin-right: 2.5rem;
                    color: #5d5d5d;
                    opacity: 0.2;
                  "
                ></a>
                <span
                  class="open-link-text"
                  @click="handleUploadFile(scope.row)"
                  >{{ $t('TM_LIWAICAOZUO') }}</span
                >
              </div>
            </div>
          </template>
        </el-table-column>
      </iTableML>
      <iPagination
        style="padding-bottom: 2rem"
        v-update
        @current-change="handleChangePage($event)"
        @size-change="handleSizeChange($event)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :prev-text="$t('TM_SHANGYIYE')"
        :next-text="$t('TM_XIAYIYE')"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.total"
      />
      <uploadFileDialog
        v-if="openUploadFileDialog"
        :openDialog="openUploadFileDialog"
        :id="id"
        :supplierId="supplierId"
        :userId="userId"
        :signStatus="signStatus"
        :clauseState="signTitle.state"
        @closeDialog="closeUploadFileDialog"
        @getTableList="getTableList"
      />
      <clauseDownloadDialog
        v-if="openClauseDownloadDialog"
        :openDialog="openClauseDownloadDialog"
        :id="id"
        :supplierId="supplierId"
        @closeDialog="closeClauseDownloadDialog"
        @getTableList="getTableList"
      />
      <exceptionTagDialog
        v-if="openExceptionTagDialog"
        :openDialog="openExceptionTagDialog"
        :id="form.termsId"
        @closeDialog="closeExceptionTagDialog"
        @getTableList="getTableList"
      />
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iInput, iButton, iPagination, iSelect, iMessage } from 'rise'
// import iTableCustom from "@/components/iTableCustom";
import iTableML from '@/components/iTableML'
import { getSignatureResult, getCity, markExclude } from '@/api/terms/terms'
import { pageMixins } from '@/utils/pageMixins'
import {
  supplierIdentityList,
  signStatusList,
  supplierRangeList,
  supplierIdentityObj,
  supplierTypeObj,
  signStatusObj
} from './data'
import exceptionTagDialog from './exceptionTagDialog.vue'
import uploadFileDialog from './uploadFileDialog.vue'
import clauseDownloadDialog from './clauseDownloadDialog.vue'
import { excelExport } from '@/utils/filedowLoad'
import { exportFile } from '@/utils/exportFileUtil'
import { signTableTitle } from './data'
import store from '@/store'
import { getDictByCode } from '@/api/dictionary'
import { downloadAll } from '@/utils/downloadAll'
// import { createAnchorLink } from "@/utils/downloadUtil";

export default {
  mixins: [pageMixins],
  components: {
    iDialog,
    iSelect,
    iInput,
    iPagination,
    iTableML,
    iButton,
    uploadFileDialog,
    clauseDownloadDialog,
    exceptionTagDialog
  },
  props: {
    openDialog: { type: Boolean, default: false },
    id: { type: Number, default: -1 },
    termsCode: { type: Number, default: -1 },
    approvalProcess: { type: Array },
    signTitle: { type: Object }
  },
  data() {
    return {
      signTableTitle,
      supplierIdentityList,
      signStatusList,
      supplierRangeList,
      supplierIdentityObj,
      supplierTypeObj,
      signStatusObj,
      tableListData: [],
      extendFields: false,
      // tableListDataSub: [],
      typeObject: {},
      approvalProcessName: '',
      form: {
        termsId: this.id,
        area: []
      },
      formGoup: {
        areaList: []
      },
      openUploadFileDialog: false,
      openClauseDownloadDialog: false,
      openExceptionTagDialog: false,
      signStatus: '',
      supplierId: -1,
      userId: '',
      KZSorXJ: '',
      KZSorXJCode: -1,
      buttonShow: false
      // attachmentId: "",
      // attachmentName: "",
    }
  },
  created() {
    this.getCityInfo()
  },
  mounted() {
    let param = { termsId: this.id }
    this.getTableList(param)
    this.getTermsCode()
  },
  methods: {
    getDialogTitle(name, version) {
      return `${this.$t('TM_QIANSHUQINGKUANG')}: ${name}${version}`
    },
    async getCityInfo() {
      const res = await getCity()
      this.formGoup.areaList = res
    },
    getTermsCode() {
      getDictByCode('SIGN_NO_TYPE').then((res) => {
        if (res?.data[0]?.subDictResultVo?.length > 0) {
          res.data[0].subDictResultVo.forEach((item) => {
            if (item.code == 'Terms_KZS') {
              this.KZSorXJ = this.$t(
                'TM_KEZAISHENGNENGYUANQIANSHUQINGKUANGDAOCHU'
              )
              this.KZSorXJCode = item.name
              return
            } else if (item.code == 'Terms_XJ') {
              this.KZSorXJ = this.$t('TM_XUNJIAQIANSHUQINGKUANGDAOCHU')
              this.KZSorXJCode = item.name
              return
            }
          })
        }
      })
    },
    handleExport() {
      const tableArr = window._.cloneDeep(this.tableListData)
      tableArr.map((item) => {
        item.signStatus = this.signStatusObj[item.signStatus]
        let supplierRangeList = []
        item.supplierType.split(',').map((i) => {
          i == 'PP'
            ? (supplierRangeList += this.$t('TM_SHENGCHANGONGYINGSHANG'))
            : i == 'GP'
            ? (supplierRangeList += this.$t('TM_YIBANGONGYINGSHANG'))
            : i == 'NT'
            ? (supplierRangeList += 'Ntier，')
            : i == 'CM'
            ? (supplierRangeList += this.$t('TM_ZIDINGYI'))
            : (supplierRangeList += '')
        })
        supplierRangeList = supplierRangeList.slice(
          0,
          supplierRangeList.length - 1
        )
        item.supplierType = supplierRangeList
        let supplierIdentityList = []
        item.formalStatus.split(',').map((i) => {
          i == '0'
            ? (supplierIdentityList += this.$t('TM_LINSHI'))
            : i == '1'
            ? (supplierIdentityList += this.$t('TM_ZHENGSHI'))
            : i == '2'
            ? (supplierIdentityList += this.$t('TM_CHUXUCHI'))
            : (supplierIdentityList += '')
        })
        item.signDate = item.signDate?.substring(0, 10)
        supplierIdentityList = supplierIdentityList.slice(
          0,
          supplierIdentityList.length - 1
        )
        item.formalStatus = supplierIdentityList
      })
      excelExport(tableArr, this.signTableTitle, this.$t('TM_QIANSHUQINGKUANG'))
    },
    handleExportAll() {
      if (this.form.supplierIdentity) {
        this.form.supplierIdentity = this.form.supplierIdentity
          .sort()
          .map((i) => {
            return i
          })
          .join(',')
      }
      if (this.form.signStatus) {
        this.form.signStatus = this.form.signStatus
          .map((i) => {
            return i
          })
          .join(',')
      }
      if (this.form.supplierType) {
        this.form.supplierType = this.form.supplierType
          .map((i) => {
            return i
          })
          .join(',')
      }
      exportFile({
        url:
          process.env.VUE_APP_NEWS +
          `/termsQueryService/exportSignatureResult?userId=` +
          store.state.permission.userInfo.id,
        data: {
          ...this.form,
          pageNum: this.page.currPage,
          pageSize: this.page.pageSize
        },
        callback: () => {
          // if (e) {
          //   iMessage.success('导出成功')
          // } else {
          //   iMessage.error("导出失败");
          // }
          if (this.form?.signStatus) {
            this.form.signStatus = this.form?.signStatus?.split(',')
          }
          if (this.form?.supplierIdentity) {
            this.form.supplierIdentity = this.form?.supplierIdentity?.split(',')
          }
          if (this.form?.supplierType) {
            this.form.supplierType = this.form?.supplierType?.split(',')
          }
        }
      })
    },
    handleExportKZSorXJ() {
      const date = new Date()
      const y = date.getFullYear()
      const M = date.getMonth() + 1
      const d = date.getDate()
      downloadAll({
        url:
          process.env.VUE_APP_NEWS +
          `/termsQueryService/exportTermsLog?userId=` +
          store.state.permission.userInfo.id,
        filename:
          (this.KZSorXJ ==
          this.$t('TM_KEZAISHENGNENGYUANQIANSHUQINGKUANGDAOCHU')
            ? this.$t('TM_KEZAISHENGNENGYUANSHIYONGCHENGNUOSHUQIANSHUQINGKUANG')
            : this.$t('TM_XUNJIACHENGNUOSHUQIANSHUQINGKUANG')) +
          `_` +
          `${y}.${M}.${d}` +
          `.xlsx`,
        data: {
          termsId: this.id,
          status:
            this.KZSorXJ ==
            this.$t('TM_KEZAISHENGNENGYUANQIANSHUQINGKUANGDAOCHU')
              ? 0
              : this.KZSorXJ == this.$t('TM_XUNJIAQIANSHUQINGKUANGDAOCHU')
              ? 1
              : ''
        },
        type: 'application/vnd.ms-excel',
        callback: () => {
          // if (e) {
          //   iMessage.success(this.$t('MT_DAOCHUCHENGGONG'))
          // } else {
          //   iMessage.error(this.$t('MT_DAOCHUSHIBAI'))
          // }
        }
      })
    },
    handleUploadFile(row) {
      this.signStatus = row.signStatus
      this.userId = row.userId
      this.supplierId = row.supplierId
      this.openUploadFileDialog = true
    },
    handleException() {
      this.openExceptionTagDialog = true
    },
    closeExceptionTagDialog(bol) {
      this.openExceptionTagDialog = bol
    },
    closeUploadFileDialog(bol) {
      if (bol.isExclude == false) {
        this.openUploadFileDialog = false
        this.$confirm(
          this.$t('TM_QINGQUERENSHIFOUQUXIAOLIWAI'),
          this.$t('TM_TISHI'),
          {
            confirmButtonText: this.$t('TM_QUEREN'),
            cancelButtonText: this.$t('TM_FANHUI'),
            type: 'warning'
          }
        )
          .then(() => {
            const submitFile = bol
            markExclude(submitFile)
              .then((res) => {
                if (res.code == 200) {
                  iMessage.success(this.$t('TM_CAOZUOCHENGGONG'))
                  this.getTableList({ termsId: submitFile.termsId })
                }
              })
              .catch(() => {})
          })
          .catch(() => {
            this.openUploadFileDialog = true
          })
      } else this.openUploadFileDialog = false
    },
    getTableList(e) {
      this.form.countryId = ''
      this.form.provinceId = ''
      this.form.cityId = ''
      this.form = e
      if (this.form.area && this.form.area.length != 0) {
        this.form.countryId = this.form.area
          .map((item) => {
            return item[0]
          })
          .join(',')
        this.form.provinceId = this.form.area
          .map((item) => {
            return item[1]
          })
          .join(',')
        this.form.cityId = this.form.area
          .map((item) => {
            return item[2]
          })
          .join(',')
      }
      // delete this.form.area;
      this.page.currPage = 1
      let param = {
        ...e,
        pageNum: 1,
        pageSize: this.page.pageSize
      }
      this.query(param)
    },
    handleChangePage(e) {
      this.page.currPage = e
      let param = {
        ...this.form,
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize
      }
      this.query(param)
    },
    clearDiolog() {
      this.$emit('closeDialog', false)
      this.$emit('flushTable')
    },
    handleSizeChange(e) {
      this.page.currPage = 1
      this.page.pageSize = e
      let param = {
        ...this.form,
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize
      }
      this.query(param)
    },
    // handleChangePage(e) {
    //   this.page.currPage = e;
    //   this.tableListDataSub = this.tableListData.slice(
    //     (this.page.currPage - 1) * 10,
    //     (this.page.currPage - 1) * 10 + 10
    //   );
    // },
    query(e) {
      if (
        e.supplierIdentity == '' ||
        e.supplierIdentity == null ||
        e.supplierIdentity == undefined
      ) {
        delete e.supplierIdentity
      } else {
        e.supplierIdentity = e.supplierIdentity
          .sort()
          .map((i) => {
            return i
          })
          .join(',')
      }
      if (
        e.signStatus == '' ||
        e.signStatus == null ||
        e.signStatus == undefined
      ) {
        delete e.signStatus
      } else {
        e.signStatus = e.signStatus
          .map((i) => {
            return i
          })
          .join(',')
      }
      if (
        e.supplierType == '' ||
        e.supplierType == null ||
        e.supplierType == undefined
      ) {
        delete e.supplierType
      } else {
        e.supplierType = e.supplierType
          .map((i) => {
            return i
          })
          .join(',')
      }
      // if (
      //   e.supplierType == '' ||
      //   e.supplierType == null ||
      //   e.supplierType == undefined
      // ) {
      //   delete e.supplierType
      // } else {
      //   let temp = []
      //   e.supplierType.includes('PP') ? temp.push('PP') : ''
      //   e.supplierType.includes('GP') ? temp.push('GP') : ''
      //   e.supplierType.includes('NT') ? temp.push('NT') : ''
      //   e.supplierType = temp
      //     .map((i) => {
      //       return i
      //     })
      //     .join(',')
      // }
      this.tableLoading = true
      getSignatureResult(e)
        .then((res) => {
          // this.tableListData = res?.termsSupplierList;
          // this.tableListDataSub = this.tableListData.slice(0, 10);
          // this.page.total = res?.termsSupplierList.length;
          this.tableListData = res.data
          this.extendFields = res.extendFields.isRound
          this.page.total = res.total
          this.tableLoading = false
        })
        .catch(() => {
          this.tableLoading = false
        })
    },
    handleDownloadFile(row) {
      this.userId = row.userId
      this.supplierId = row.supplierId
      this.openClauseDownloadDialog = true
    },
    closeClauseDownloadDialog(bol) {
      this.openClauseDownloadDialog = bol
    },
    handleSearchReset() {
      this.form = { termsId: this.id }
      this.getTableList(this.form)
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-cascader {
  display: block;
}
.area-select {
  .el-cascader-menu__wrap {
    height: 360px;
  }
  .el-cascader-panel {
    height: 360px !important;
  }
}
::v-deep .el-cascader__tags {
  position: absolute;
  left: 0;
  right: 30px;
  top: 90%;
  -webkit-transform: translateY(-90%);
  transform: translateY(-90%);
}
::v-deep .el-form-item {
  margin-bottom: 1rem;
  width: 220px;
  float: left;
  margin-right: 50px;
  padding-left: 2px;
  padding-top: 5px;
  padding-bottom: 5px;

  .el-form-item__label {
    font-size: 14px;
    color: $color-black;
    font-weight: 400;
    line-height: 14px;
    margin-bottom: 8px;
  }

  .el-form-item__content {
    line-height: inherit;
  }
}
.form__first {
  position: relative;
  .search {
    position: absolute;
    right: 1rem;
    bottom: 1.5rem;
  }
}
.tips {
  margin-bottom: 0.5rem;
  font-family: Arial;
  font-weight: 400;
  color: #000000;
}
.export {
  display: flex;
  justify-content: end;
  margin-bottom: 1rem;
}
// .card {
//   padding-bottom: 20px;
//   min-height: 700px;
//   .card__body {
//     height: auto;
//     overflow: hidden;
//     min-height: 700px;
//     ::v-deep .el-form {
//       margin-bottom: 20px;
//       margin-right: -5.6%;
//       .el-form-item {
//         margin-bottom: 2px;
//         width: 28%;
//         float: left;
//         margin-right: 5.3%;
//         padding-left: 2px;
//         padding-top: 5px;
//         padding-bottom: 5px;
//         display: flex;
//         align-items: center;
//         .el-form-item__label {
//           width: 25%;
//           font-size: 14px;
//           color: $color-black;
//           font-weight: 400;
//           line-height: 14px;
//           margin-bottom: 8px;
//           text-align: left;
//         }
//         .el-form-item__content {
//           width: 100%;
//         }
//       }
//     }
//   }
// }
// ::v-deep .has-gutter tr {
//   background-color: #eaf1fd;
// }
// ::v-deep .el-table th {
//   background-color: #eaf1fd;
// }
// ::v-deep .custom-render button {
//   height: 35px;
//   background-color: #fff;
//   font-size: 1rem;
//   color: #1763f7;
//   min-width: 6.25rem;
//   border-radius: 0.3125rem;
//   border: #1763f7 solid 1px;
// }
</style>
