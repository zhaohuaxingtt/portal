<template>
  <iDialog
    :title="'供应商列表'"
    :visible.sync="openDialog"
    width="95%"
    top="5vh"
    @close="clearDiolog"
    :close-on-click-modal="false"
  >
    <div class="search_title">
      <div class="search">
        <el-form>
          <el-row>
            <!-- 供应商身份  -->
            <el-form-item :label="'供应商身份'">
              <iSelect
                :placeholder="$t('LK_QINGXUANZE')"
                v-model="form.formalStatus"
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
            <!-- 供应商类型 -->
            <el-form-item :label="'供应商类型'">
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
            <el-form-item :label="'供应商名称'">
              <iInput
                :placeholder="$t('LK_QINGSHURU')"
                v-model="form.shortNameZh"
              ></iInput>
            </el-form-item>
            <el-form-item :label="'供应商SAP号'">
              <iInput
                :placeholder="$t('LK_QINGSHURU')"
                v-model="form.sapCode"
              ></iInput>
            </el-form-item>
            <el-form-item :label="'供应商临时号'">
              <iInput
                :placeholder="$t('LK_QINGSHURU')"
                v-model="form.svwTempCode"
              ></iInput>
            </el-form-item>
            <el-form-item :label="'供应商SVW号'">
              <iInput
                :placeholder="$t('LK_QINGSHURU')"
                v-model="form.svwCode"
              ></iInput>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <div class="button__list">
        <iButton @click="getTableList" class="cancel">{{ "查询" }}</iButton>
        <iButton @click="handleSearchReset">{{ "重置" }}</iButton>
      </div>
    </div>
    <div class="divider"></div>
    <div class="table_title">
      <div class="choose">可选项</div>
      <iButton @click="addTableData">{{ "添加" }}</iButton>
    </div>
    <iTableML
      style="height: 30rem; overflow-y: scroll"
      tooltip-effect="light"
      :data="tableListOptional"
      :tableLoading="tableLoading"
      :border="true"
      class="customer-table"
      @selectionChange="handleOptionalChange"
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
      <el-table-column align="center" label="供应商中文名"
        ><template slot-scope="scope">
          <span>{{ scope.row["shortNameZh"] }}</span>
        </template></el-table-column
      >
      <el-table-column align="center" label="供应商英文名">
        <template slot-scope="scope">
          <span>{{ scope.row["shortNameEn"] }}</span>
        </template>
      </el-table-column>
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
      <el-table-column align="center" label="SAP号">
        <template slot-scope="scope">
          <span>{{ scope.row["sapCode"] }}</span>
        </template>
      </el-table-column>
    </iTableML>
    <iPagination
      style="padding-bottom: 20px"
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
    <div class="divider"></div>
    <div class="table_title">
      <div class="choose">已选项</div>
      <iButton @click="deleteTableData">{{ "删除" }}</iButton>
    </div>
    <div style="padding-bottom: 2rem">
      <iTableML
        style="height: 30rem; overflow-y: scroll"
        tooltip-effect="light"
        :data="tableListDataSelected"
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
          width="50"
          align="center"
        ></el-table-column>
        <el-table-column align="center" label="供应商中文名"
          ><template slot-scope="scope">
            <span>{{ scope.row["shortNameZh"] }}</span>
          </template></el-table-column
        >
        <el-table-column align="center" label="供应商英文名">
          <template slot-scope="scope">
            <span>{{ scope.row["shortNameEn"] }}</span>
          </template>
        </el-table-column>
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
        <el-table-column align="center" label="SAP号">
          <template slot-scope="scope">
            <span>{{ scope.row["sapCode"] }}</span>
          </template>
        </el-table-column>
      </iTableML>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iInput, iButton, iPagination, iSelect } from "rise";
import iTableML from "@/components/iTableML";
import { pageMixins } from "@/utils/pageMixins";
import { findSupplierPage } from "@/api/terms/terms";
import { supplierIdentityList, supplierRangeList } from "./data";
export default {
  mixins: [pageMixins],
  components: {
    iDialog,
    iTableML,
    iSelect,
    iButton,
    iPagination,
    iInput,
  },
  props: {
    openDialog: { type: Boolean, default: false },
    supplierList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      form: {},
      supplierIdentityList,
      supplierRangeList,
      tableListOptional: [],
      tableListDataSelected: [],
      optionalTableData: [], // 可选项列表的数据-勾选
      selectedTableData: [], // 已选项列表的数据-勾选
      // typeObject: {},
      // supplierId: -1,
    };
  },
  mounted() {
    // let param = { termsId: this.id };
    this.getTableList();
    this.tableListDataSelected = this.supplierList;
  },
  methods: {
    clearDiolog() {
      this.$emit("closeDialog", false);
      this.$emit("selectedTableData", this.tableListDataSelected);
    },
    handleSearchReset() {
      this.form = {};
      this.getTableList();
    },
    getTableList() {
      this.page.currPage = 1;
      let param = {
        ...this.form,
        pageNum: 1,
        pageSize: this.page.pageSize,
      };
      this.query(param);
    },
    query(e) {
      this.tableLoading = true;
      findSupplierPage(e).then((res) => {
        this.tableListOptional = res.data;
        this.page.total = res.total;
        this.tableLoading = false;
      });
    },
    handleCurrentChange(e) {
      this.page.currPage = e;
      let param = {
        ...this.formData,
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize,
      };
      this.query(param);
    },
    handleSizeChange(e) {
      this.page.pageSize = e;
      let param = {
        ...this.formData,
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize,
      };
      this.query(param);
    },
    // 表格选中值集-可选
    handleOptionalChange(val) {
      this.optionalTableData = val;
    },
    addTableData() {
      if (this.tableListDataSelected!=null) {
        let supplierIdList = this.tableListDataSelected.map((item) => {
          return item.supplierId;
        });
        for (let i = 0; i < this.optionalTableData.length; i++) {
          if (!supplierIdList.includes(this.optionalTableData[i].supplierId)) {
            this.tableListDataSelected?.push(this.optionalTableData[i]);
          }
        }
      } else {
        this.tableListDataSelected = [];
        let supplierIdList = [];
        for (let i = 0; i < this.optionalTableData.length; i++) {
          if (!supplierIdList.includes(this.optionalTableData[i].supplierId)) {
            this.tableListDataSelected?.push(this.optionalTableData[i]);
          }
        }
      }
    },
    // 表格选中值集-已选
    handleSelectionChange(val) {
      this.selectedTableData = val;
    },
    deleteTableData() {
      this.selectedTableData.map((i) => {
        this.tableListDataSelected.map((item) => {
          if (item.supplierId == i.supplierId) {
            let index = this.tableListDataSelected.indexOf(item);
            this.tableListDataSelected.splice(index, 1);
          }
        });
      });
    },
  },
};
</script>
<style scoped lang="scss">
.search_title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  .search {
    ::v-deep .el-form {
      .el-form-item {
        float: left;
        margin-right: 30px;
      }
    }
  }
  .button__list {
    display: flex;
    align-items: center;
  }
}
.table_title {
  display: flex;
  justify-content: space-between;
  margin: 33px 0 19px 0;
  .choose {
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 25px;
    color: #000000;
    opacity: 1;
  }
}

.divider {
  border-bottom: 1px dashed #ebeef5;
}
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
</style>