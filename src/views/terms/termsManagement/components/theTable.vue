<template>
  <div>
    <iCard class="margin-top20">
      <div class="margin-bottom20 clearFloat">
        <div class="floatright">
          <div class="">
            <!-- 新建 -->
            <iButton @click="handleAdd">新建</iButton>
            <iButton @click="handleExport">导出当前</iButton>
            <iButton @click="handleExportAll">导出全部</iButton>
            <!-- 失效 -->
            <!-- <iButton
              @click="handleFailure"
              :disabled="
                this.selectedTableData.length === 0 ||
                this.selectState.includes('01') ||
                this.selectState.includes('02') ||
                this.selectState.includes('04')
              "
              >{{ $t("TERMS_SHIXIAO") }}</iButton
            > -->
          </div>
        </div>
      </div>
      <iTableML
        tooltip-effect="light"
        :data="tableListData"
        :tableLoading="tableLoading"
        :border="true"
        class="customer-table"
        @selectionChange="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="50"
          align="center"
        ></el-table-column>
        <el-table-column
          label="序号"
          type="index"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column align="center" label="条款编码"
          ><template slot-scope="scope">
            <span>{{ scope.row["termsCode"] }}</span>
          </template></el-table-column
        >
        <el-table-column
          show-overflow-tooltip
          align="center"
          label="条款名称"
          min-width="160"
          ><template slot-scope="scope">
            <span class="open-link-text" @click="handleGoDetail(scope.row)">{{
              scope.row["name"]
            }}</span>
          </template></el-table-column
        >
        <el-table-column align="center" label="版本号">
          <template slot-scope="scope">
            <span>{{ scope.row["termsVersion"] }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="条款状态"
          ><template slot-scope="scope">
            {{
              scope.row.state === "01"
                ? "草稿"
                : scope.row.state === "02"
                ? "待生效"
                : scope.row.state === "03"
                ? "有效"
                : scope.row.state === "04"
                ? "失效"
                : ""
            }}
          </template></el-table-column
        >
        <el-table-column align="center" min-width="100" label="条款生效时间"
          ><template slot-scope="scope">
            <span>{{ scope.row["inDate"] }}</span>
          </template></el-table-column
        >
        <el-table-column align="center" min-width="100" label="发布日期"
          ><template slot-scope="scope">
            <span>{{ scope.row["publishDate"] }}</span>
          </template></el-table-column
        >
        <el-table-column align="center" min-width="80" label="签署节点">
          <template slot-scope="scope">
            <span>{{ signNodeListObj[scope.row["signNode"]] }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="100" label="签署情况">
          <template slot-scope="scope">
            <span
              class="open-link-text"
              v-if="scope.row.state == '03' || scope.row.state == '04'"
              @click="handleSignDetail(scope.row)"
              >{{ scope.row["signResult"] }}</span
            >
            <span v-else>{{ scope.row["signResult"] }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="是否个人条款" min-width="100">
          <template slot-scope="scope">
            <span>{{
              scope.row.isPersonalTerms == true
                ? "是"
                : scope.row.isPersonalTerms == false
                ? "否"
                : ""
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          min-width="140"
          label="供应商范围"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <!-- <span>{{
              scope.row.supplierRange == "PP"
                ? "生产供应商"
                : scope.row.supplierRange == "GP"
                ? "一般供应商"
                : scope.row.supplierRange == "NT"
                ? "Ntier"
                : scope.row.supplierRange == "CM"
                ? "自定义"
                : ""
            }}</span> -->
            <span>{{ scope.row.supplierRange | supplierRangeFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          min-width="140"
          label="供应商身份"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <!-- <span>{{
              scope.row.supplierIdentity == "0"
                ? "临时"
                : scope.row.supplierIdentity == "1"
                ? "正式"
                : scope.row.supplierIdentity == "2"
                ? "储蓄池"
                : ""
            }}</span> -->
            <span>{{
              scope.row.supplierIdentity | supplierIdentityFilter
            }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="100" label="供应商用户">
          <template slot-scope="scope">
            <span>{{
              scope.row["supplierContacts"] == "01"
                ? "全部"
                : scope.row["supplierContacts"] == "02"
                ? "主联系人"
                : ""
            }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="100" label="条款负责人">
          <template slot-scope="scope">
            <span>{{ scope.row["chargeName"] }}</span>
          </template>
        </el-table-column>
      </iTableML>
      <iPagination
        v-update
        @current-change="handleCurrentChange($event)"
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
    </iCard>
    <signDetailDialog
      v-if="openSignDetailDialog"
      :openDialog="openSignDetailDialog"
      :id="id"
      @flushTable="flushTable"
      @closeDialog="closeSignDetailDialog"
      :approvalProcess="approvalProcess"
      :signTitle="signTitle"
    />
  </div>
</template>

<script>
import { iCard, iButton, iPagination } from "rise";
// import iTableCustom from "@/components/iTableCustom";
import iTableML from "@/components/iTableML";
import { excelExport } from "@/utils/filedowLoad";
// import { tableListColumns } from "./data";
import { getDictByCode } from "@/api/dictionary/index";
import signDetailDialog from "./signDetailDialog.vue";
import {
  tableTitle,
  isPersonalTermsObj,
  stateObj,
  supplierRangeObj,
  supplierContactsObj,
  supplierIdentityObj,
} from "./data";
// import { invalidateTerms } from "@/api/terms/terms";

export default {
  components: {
    iCard,
    iButton,
    // iTableCustom,
    iPagination,
    iTableML,
    signDetailDialog,
  },
  props: {
    tableListData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    typeObject: {
      type: Object,
      default: () => {
        return {};
      },
    },
    page: {
      type: Object,
      default: () => {
        return {};
      },
    },
    tableLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tableTitle,
      isPersonalTermsObj,
      stateObj,
      supplierRangeObj,
      supplierContactsObj,
      supplierIdentityObj,
      selectedTableData: [],
      selectState: [],
      signNodeList: [],
      signNodeListObj: {},
      openSignDetailDialog: false,
      id: -1,
      state: "",
      approvalProcess: [],
      signTitle: {},
    };
  },
  watch: {
    selectedTableData: {
      immediate: true,
      handler(val) {
        this.selectState = val.map((item) => {
          return item.state;
        });
      },
    },
  },
  mounted() {
    getDictByCode("SIGN_NODE").then((res) => {
      if (res && res.data !== null && res.data.length > 0) {
        this.signNodeList = res.data[0].subDictResultVo;
        this.signNodeList.map((item) => {
          this.signNodeListObj[item.id] = item.name;
        });
      }
    });
    // this.signNodeListObj = {
    //   "01": "注册",
    //   "02": "询价",
    //   "03": "定点",
    // };
  },
  filters: {
    supplierRangeFilter: function (value) {
      let supplierRangeList = [];
      value?.split(",").map((i) => {
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
      return supplierRangeList;
    },
    supplierIdentityFilter: function (value) {
      let supplierIdentityList = [];
      value?.split(",").map((i) => {
        i == "0"
          ? (supplierIdentityList += "临时，")
          : i == "1"
          ? (supplierIdentityList += "正式，")
          : i == "2"
          ? (supplierIdentityList += "储蓄池，")
          : (supplierIdentityList += "");
      });
      supplierIdentityList.length == 0 ? supplierIdentityList = '' : supplierIdentityList = supplierIdentityList.slice(
        0,
        supplierIdentityList.length - 1
      );
      return supplierIdentityList;
    },
  },
  methods: {
    // 导出当前
    handleExport() {
      const tableArr = window._.cloneDeep(this.tableListData);
      tableArr.map((item) => {
        item.signNode = this.signNodeListObj[item.signNode];
        item.isPersonalTerms = this.isPersonalTermsObj[item.isPersonalTerms];
        item.state = this.stateObj[item.state];
        item.supplierContacts = this.supplierContactsObj[item.supplierContacts];
        // item.supplierRange = this.supplierRangeObj[item.supplierRange];
        // item.supplierIdentity = this.supplierIdentityObj[item.supplierIdentity];
        let supplierRangeList = [];
        item.supplierRange.split(",").map((i) => {
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
        item.supplierRange = supplierRangeList;
        let supplierIdentityList = [];
        item.supplierIdentity.split(",").map((i) => {
          i == "0"
            ? (supplierIdentityList += "临时，")
            : i == "1"
            ? (supplierIdentityList += "正式，")
            : i == "2"
            ? (supplierIdentityList += "储蓄池，")
            : (supplierIdentityList += "");
        });
        supplierIdentityList = supplierIdentityList.slice(
          0,
          supplierIdentityList.length - 1
        );
        item.supplierIdentity = supplierIdentityList;
      });
      // const titleArr = window._.cloneDeep(this.tableTitle)
      // const index = titleArr.findIndex(item => item.props == 'option')
      // titleArr.splice(index, index + 1)
      excelExport(tableArr, this.tableTitle, "条款管理");
    },
    // 导出全部
    handleExportAll() {
      this.$emit("handleExportAll");
    },
    handleCurrentChange(e) {
      this.$emit("handleChangePage", e);
    },
    handleSizeChange(e) {
      this.$emit("handleSizeChange", e);
    },
    flushTable() {
      this.$emit("refTabList");
    },
    // 失效
    // handleFailure() {
    //   const ids = [];
    //   this.selectedTableData.forEach((e) => ids.push(e.id));
    //   this.$confirm("是否将选择的条款设为失效？", "提示", {
    //     confirmButtonText: "是",
    //     cancelButtonText: "否",
    //     type: "warning",
    //   }).then(() => {
    //     invalidateTerms({ ids: ids.join(",") })
    //       .then(() => {
    //         this.$message.success("设置成功！");
    //         this.$emit("refTabList");
    //       })
    //       .catch((err) => {
    //         // this.$message.error("删除失败!");
    //       });
    //   });
    // },
    handleAdd() {
      // let routeUrl = this.$router.resolve({
      //   path: "/terms/management/addClause",
      // });
      // window.open(routeUrl.href, "_blank");
      this.$router.push({
        path: "/terms/management/addClause",
      });
    },
    // handleEdit() {
    //   this.editOrAdd = "edit";
    //   this.openAddClauseDialog = true;
    // },

    // handleDelete() {
    //   if (this.selectedTableData.length === 0) {
    //     iMessage.error("请选择条款模板数据！");
    //     return;
    //   }
    //   this.$confirm("是否将该条款设为失效？", "提示", {
    //     confirmButtonText: "是",
    //     cancelButtonText: "否",
    //     type: "warning",
    //   }).then(
    //     () => {
    //       // 删除
    //       //  let ids= this.selectedTableData.map((e) => {
    //       //     return e.id
    //       //   })
    //       //   let param = {ids:ids};
    //       let param = { id: this.selectedTableData[0].id };
    //       deleteClauseById(param).then((res) => {
    //         iMessage.success("更新成功");
    //         this.flushTable();
    //       });
    //     },
    //     (err) => {
    //       iMessage.error(err);
    //     }
    //   );
    // },
    // 表格选中值集
    handleSelectionChange(val) {
      this.selectedTableData = val;
    },
    handleGoDetail(e) {
      if (e.state == "01" || e.state == "02") {
        this.$router.push({
          path: "/terms/management/addClause",
          query: {
            id: e.id,
          },
        });
      } else {
        this.$router.push({
          path: "/terms/management/clauseDetail",
          query: {
            id: e.id,
          },
        });
      }
    },
    handleSignDetail(e) {
      this.signTitle = {
        name: e.name,
        termsVersion: e.termsVersion,
      };
      this.id = e.id;
      this.openSignDetailDialog = true;
    },
    // closeDetailDialog(bol) {
    //   this.openDetailDialog = bol;
    // },
    closeSignDetailDialog(bol) {
      this.openSignDetailDialog = bol;
    },
    // closeAddClauseDialog(bol) {
    //   this.openAddClauseDialog = bol;
    // },
  },
};
</script>

<style scoped lang="scss">
::v-deep .customer-table th {
  border: none;
}
::v-deep .customer-table td,
.customer-table th.is-leaf {
  border: none;
}
::v-deep .el-table--border,
.el-table--group {
  border: none;
}
::v-deep .customer-table thead tr th.is-leaf {
  border: 1px solid #ebeef5;
  border-right: none;
}
::v-deep .customer-table thead tr th:nth-last-of-type(2) {
  border-right: 1px solid #ebeef5;
}
::v-deep .el-table--border::after,
.el-table--group::after {
  width: 0;
}
::v-deep .customer-table::before {
  width: 0;
}
::v-deep .customer-table .el-table__fixed-right::before,
.el-table__fixed::before {
  width: 0;
}
::v-deep .el-table--border th.gutter:last-of-type {
  border: 1px solid #ebeef5;
  border-left: none;
}

// ::v-deep .el-form-item {
//   margin-top: 0;
//   margin-bottom: 0;
// }

// .tab_top{
//   display: flex;
//   justify-content: space-between;
// }

// ::v-deep .circle:before {
//   content: "";
//   display: inline-block;
//   border-radius: 50%;
//   width: 15px;
//   height: 15px;
//   background: red;
//   position: relative;
//   top: 2px;
//   margin-right: 10px;
// }

// ::v-deep .has-gutter tr {
//   background-color: #eaf1fd;
// }
// ::v-deep .el-table th {
//   background-color: #eaf1fd;
// }
</style>
