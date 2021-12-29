<template>
  <!-- 签署情况 -->
  <iDialog
    :title="'签署情况：' + signTitle.name + signTitle.termsVersion"
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
            <el-form-item :label="$t('供应商名称')">
              <iInput
                :placeholder="$t('LK_QINGSHURU')"
                v-model="form.shortNameZh"
              ></iInput>
            </el-form-item>
          </el-col>
          <!-- 签署状态 -->
          <el-col :span="4">
            <el-form-item :label="'签署状态'">
              <iSelect
                :placeholder="$t('LK_QINGXUANZE')"
                v-model="form.signStatus"
                clearable
              >
                <el-option
                  :value="item.value"
                  :label="item.label"
                  v-for="item of signStatusList"
                  :key="item.value"
                ></el-option>
              </iSelect>
            </el-form-item>
          </el-col>
          <!-- 供应商身份 -->
          <el-col :span="4">
            <el-form-item :label="$t('供应商身份')">
              <iSelect
                :placeholder="$t('LK_QINGXUANZE')"
                v-model="form.supplierIdentity"
                clearable
              >
                <el-option
                  :value="item.value"
                  :label="item.label"
                  v-for="item of supplierIdentityList"
                  :key="item.value"
                ></el-option>
              </iSelect>
            </el-form-item>
          </el-col>
          <!-- 供应商类型 -->
          <el-col :span="4">
            <el-form-item :label="$t('供应商类型')">
              <iSelect
                :placeholder="$t('LK_QINGXUANZE')"
                v-model="form.supplierType"
                clearable
              >
                <el-option
                  :value="item.value"
                  :label="item.label"
                  v-for="item of supplierRangeList"
                  :key="item.value"
                ></el-option>
              </iSelect>
            </el-form-item>
          </el-col>
          <!-- 地区 -->
          <el-col :span="4">
            <el-form-item :label="$t('地区')">
              <el-cascader
                v-model="form.area"
                :options="formGoup.areaList"
                :props="{ multiple: true }"
                :clearable="true"
                popper-class="area-select"
                collapse-tags
                filterable
              ></el-cascader>
            </el-form-item>
          </el-col>

          <div class="search">
            <iButton @click="getTableList(form)">{{ "查询" }}</iButton>
            <iButton @click="handleSearchReset">{{ "重置" }}</iButton>
          </div>
        </el-row>

        <!-- 第二行 -->
        <el-row :gutter="24">
          <!-- 业务编号 -->
          <el-col :span="4">
            <el-form-item :label="$t('业务编号')">
              <iInput
                :placeholder="$t('LK_QINGSHURU')"
                v-model="form.serviceCode"
              ></iInput>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-divider></el-divider>

      <div class="export">
        <iButton @click="handleExport">{{ "导出当前" }}</iButton>
        <iButton @click="handleExportAll">{{ "导出全部" }}</iButton>
      </div>

      <iTableML
        style="height: 34rem; overflow: scroll"
        tooltip-effect="light"
        :data="tableListData"
        :tableLoading="tableLoading"
      >
        <el-table-column
          label="序号"
          type="index"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          min-width="160px"
          label="供应商名称"
          ><template slot-scope="scope">
            <span>{{ scope.row["shortNameZh"] }}</span>
          </template></el-table-column
        >
        <el-table-column align="center" label="业务编码"
          ><template slot-scope="scope">
            <span>{{ scope.row["serviceCode"] }}</span>
          </template></el-table-column
        >
        <el-table-column align="center" label="临时号">
          <template slot-scope="scope">
            <span>{{ scope.row["svwTempCode"] }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="SVW号"
          ><template slot-scope="scope">
            <span>{{ scope.row["svwCode"] }}</span>
          </template></el-table-column
        >
        <el-table-column align="center" label="SAP号"
          ><template slot-scope="scope">
            <span>{{ scope.row["sapCode"] }}</span>
          </template></el-table-column
        >
        <el-table-column align="center" label="供应商身份"
          ><template slot-scope="scope">
            <span>{{
              scope.row.formalStatus == "0"
                ? "临时"
                : scope.row.formalStatus == "1"
                ? "正式"
                : scope.row.formalStatus == "2"
                ? "储蓄池"
                : ""
            }}</span>
          </template></el-table-column
        >
        <el-table-column align="center" label="供应商类型"
          ><template slot-scope="scope">
            <span>{{
              scope.row.supplierType == "PP"
                ? "生产供应商"
                : scope.row.supplierType == "GP"
                ? "一般供应商"
                : scope.row.supplierType == "NT"
                ? "Ntier"
                : scope.row.supplierType == "CM"
                ? "自定义"
                : ""
            }}</span>
          </template></el-table-column
        >
        <el-table-column align="center" label="签署人"
          ><template slot-scope="scope">
            <span>{{ scope.row["signName"] }}</span>
          </template></el-table-column
        >
        <el-table-column align="center" label="签署状态"
          ><template slot-scope="scope">
            <span v-if="scope.row.signStatus == '01'" style="color: #1663f6">
              未签署
            </span>
            <span v-if="scope.row.signStatus == '02'"> 已签署标准 </span>
            <span v-if="scope.row.signStatus == '03'"> 已签署非标 </span>
            <span v-if="scope.row.signStatus == '04'" style="color: #1663f6">
              例外
            </span>
            <span v-else></span> </template
        ></el-table-column>
        <el-table-column align="center" label="签署日期">
          <template slot-scope="scope">
            <span>{{
              scope.row["signDate"] && scope.row["signDate"].substring(0, 10)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" width="240px" label="操作">
          <template slot-scope="scope">
            <div v-if="scope.row.signStatus == '02'">—</div>
            <div v-else>
              <div v-if="scope.row.signStatus == '03'">
                <span
                  class="open-link-text"
                  @click="handleDownloadFile(scope.row)"
                  style="margin-right: 8px"
                  >{{ "非标条款下载" }}</span
                >
                <a
                  class="el-icon-paperclip open-link-text"
                  style="font-size: 16px; margin-right: 2.5rem"
                ></a>
                <span style="color: #5d5d5d; opacity: 0.2">{{
                  "例外操作"
                }}</span>
              </div>
              <div v-else>
                <span style="margin-right: 8px; color: #5d5d5d; opacity: 0.2">{{
                  "非标条款下载"
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
                  >{{ "例外操作" }}</span
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
        prev-text="上一页"
        next-text="下一页"
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
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iInput, iButton, iPagination, iSelect, iMessage } from "rise";
// import iTableCustom from "@/components/iTableCustom";
import iTableML from "@/components/iTableML";
import { getSignatureResult, getCity, markExclude } from "@/api/terms/terms";
import { pageMixins } from "@/utils/pageMixins";
import {
  supplierIdentityList,
  signStatusList,
  supplierRangeList,
  supplierIdentityObj,
  supplierTypeObj,
  signStatusObj,
} from "./data";
import uploadFileDialog from "./uploadFileDialog.vue";
import clauseDownloadDialog from "./clauseDownloadDialog.vue";
import { excelExport } from "@/utils/filedowLoad";
import { exportFile } from "@/utils/exportFileUtil";
import { signTableTitle } from "./data";
import store from '@/store'
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
  },
  props: {
    openDialog: { type: Boolean, default: false },
    id: { type: Number, default: -1 },
    approvalProcess: { type: Array },
    signTitle: { type: Object },
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
      // tableListDataSub: [],
      typeObject: {},
      approvalProcessName: "",
      form: {
        termsId: this.id,
        area: [],
      },
      formGoup: {
        areaList: [],
      },
      openUploadFileDialog: false,
      openClauseDownloadDialog: false,
      signStatus: "",
      supplierId: -1,
      userId: "",
      // attachmentId: "",
      // attachmentName: "",
    };
  },
  created() {
    this.getCityInfo();
  },
  mounted() {
    let param = { termsId: this.id };
    this.getTableList(param);
  },
  methods: {
    async getCityInfo() {
      const res = await getCity();
      this.formGoup.areaList = res;
    },
    handleExport() {
      const tableArr = window._.cloneDeep(this.tableListData);
      tableArr.map((item) => {
        item.signStatus = this.signStatusObj[item.signStatus];
        let supplierRangeList = [];
        item.supplierType.split(",").map((i) => {
          i == "PP"
            ? (supplierRangeList += "生产供应商，")
            : i == "GP"
            ? (supplierRangeList += "一般供应商，")
            : i == "NT"
            ? (supplierRangeList += "Ntier，")
            : i == "CM"
            ? (supplierRangeList += "自定义，")
            : (supplierRangeList += "");
        });
        supplierRangeList = supplierRangeList.slice(
          0,
          supplierRangeList.length - 1
        );
        item.supplierType = supplierRangeList;
        let supplierIdentityList = [];
        item.formalStatus.split(",").map((i) => {
          i == "0"
            ? (supplierIdentityList += "临时，")
            : i == "1"
            ? (supplierIdentityList += "正式，")
            : i == "2"
            ? (supplierIdentityList += "储蓄池，")
            : (supplierIdentityList += "");
        });
        item.signDate = item.signDate.substring(0, 10);
        supplierIdentityList = supplierIdentityList.slice(
          0,
          supplierIdentityList.length - 1
        );
        item.formalStatus = supplierIdentityList;
      });
      excelExport(tableArr, this.signTableTitle, "签署情况");
    },
    handleExportAll() {
      exportFile({
        url: process.env.VUE_APP_NEWS +`/termsQueryService/exportSignatureResult?userId=`+store.state.permission.userInfo.id,
        data: {
          ...this.form,
          pageNum: this.page.currPage,
          pageSize: this.page.pageSize,
        },
        callback: (e) => {
          if (e) {
            iMessage.success("导出成功");
          } else {
            iMessage.error("导出失败");
          }
        },
      });
    },
    handleUploadFile(row) {
      this.signStatus = row.signStatus;
      this.userId = row.userId;
      this.supplierId = row.supplierId;
      this.openUploadFileDialog = true;
    },
    closeUploadFileDialog(bol) {
      if (bol.isExclude == false) {
        this.openUploadFileDialog = false;
        this.$confirm("请确认是否取消例外?", "提示", {
          confirmButtonText: "确认",
          cancelButtonText: "返回",
          type: "warning",
        })
          .then(() => {
            const submitFile = bol;
            markExclude(submitFile)
              .then((res) => {
                if (res.code == 200) {
                  iMessage.success(this.$t("操作成功！"));
                  this.getTableList({ termsId: submitFile.termsId });
                }
              })
              .catch(() => {});
          })
          .catch(() => {
            this.openUploadFileDialog = true;
          });
      } else this.openUploadFileDialog = false;
    },
    getTableList(e) {
      this.form = e;
      if (this.form.area && this.form.area.length != 0) {
        this.form.countryId = this.form.area
          .map((item) => {
            return item[0];
          })
          .join(",");
        this.form.provinceId = this.form.area
          .map((item) => {
            return item[1];
          })
          .join(",");
        this.form.cityId = this.form.area
          .map((item) => {
            return item[2];
          })
          .join(",");
      }
      // delete this.form.area;
      this.page.currPage = 1;
      let param = {
        ...e,
        pageNum: 1,
        pageSize: this.page.pageSize,
      };
      this.query(param);
    },
    handleChangePage(e) {
      this.page.currPage = e;
      let param = {
        ...this.form,
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize,
      };
      this.query(param);
    },
    clearDiolog() {
      this.$emit("closeDialog", false);
      this.$emit("flushTable");
    },
    handleSizeChange(e) {
      this.page.pageSize = e;
      let param = {
        ...this.form,
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize,
      };
      this.query(param);
    },
    // handleChangePage(e) {
    //   this.page.currPage = e;
    //   this.tableListDataSub = this.tableListData.slice(
    //     (this.page.currPage - 1) * 10,
    //     (this.page.currPage - 1) * 10 + 10
    //   );
    // },
    query(e) {
      getSignatureResult(e)
        .then((res) => {
          // this.tableListData = res?.termsSupplierList;
          // this.tableListDataSub = this.tableListData.slice(0, 10);
          // this.page.total = res?.termsSupplierList.length;
          this.tableListData = res.data;
          this.page.total = res.total;
          this.tableLoading = false;
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    handleDownloadFile(row) {
      this.userId = row.userId;
      this.supplierId = row.supplierId;
      this.openClauseDownloadDialog = true;
    },
    closeClauseDownloadDialog(bol) {
      this.openClauseDownloadDialog = bol;
    },
    handleSearchReset() {
      this.form = { termsId: this.id };
      this.getTableList(this.form);
    },
  },
};
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
.form__first {
  position: relative;
  .search {
    position: absolute;
    right: 1rem;
    bottom: 1.5rem;
  }
}
.export {
  display: flex;
  justify-content: flex-end;
  // float: right;
  margin-bottom: 2rem;
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
