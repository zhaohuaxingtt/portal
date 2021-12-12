<template>
  <div class="handel-top">
    <el-form
      class="form"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-position="left"
      :hideRequiredAsterisk="true"
      :validate-on-rule-change="false"
    >
      <iCard style="margin-top: 1rem">
        <div class="item">
          <div class="form-item-button">
            <iButton @click="handleUserNews" :disabled="!newDisabled">{{language('NEWS_XINZENG','新增')}}</iButton>
          </div>

          <commonTable
            ref="tableDataForm"
            :tableData="tableListData"
            :tableTitle="userTableTitle"
            :tableLoading="tableLoading"
            :selection="false"
            align="right"
          >
            <template slot="index" slot-scope="scope">
              <div>
                {{ scope.row.index + 1 }}
              </div>
            </template>
            <template slot="categoryName" slot-scope="scope">
              <div>
                {{ scope.row["categoryName"].toString() }}
              </div>
            </template>
            <template slot="operation" slot-scope="scope">
              <div class="form-item">
                <!-- 编辑 -->
                <img
                  class="form-item-icon"
                  src="@/assets/images/news/edit.svg"
                  @click="handleEdit(scope)"
                />
                <!-- 删除 -->
                <img
                  class="form-item-icon"
                  src="@/assets/images/news/delete.svg"
                  @click="handleDelete(scope)"
                />
                <!-- 导出 -->
                <img
                  class="form-item-icon"
                  src="@/assets/images/news/export.svg"
                  @click="handleExport(scope)"
                />
              </div>
            </template>
          </commonTable>
          <iPagination
            v-update
            @current-change="handleCurrentChange($event, query)"
            @size-change="handleSizeChange"
            background
            :page-sizes="page.pageSizes"
            :page-size="page.pageSize"
            :prev-text="language('NEWS_SHANGYIYE', '上一页')"
            :next-text="language('NEWS_XIAYIYE', '下一页')"
            :layout="page.layout"
            :current-page="page.currPage"
            :total="page.total"
          />
        </div>
      </iCard>
      <!-- <userNews /> -->
    </el-form>
  </div>
</template>
<script>
import {iCard, iButton, iPagination } from "rise";
import { pageMixins } from "@/utils/pageMixins";
import commonTable from "@/components/commonTable";
import { downloadAll } from "@/utils/downloadAll";
import { userTableTitle } from "./data";
import { findGroupPage, deleteGroup,findAdminPermission } from "@/api/news/news";
import store from '@/store';
export default {
  mixins: [pageMixins],
  components: {
    iCard,
    iButton,
    iPagination,
    commonTable,
  },
  data() {
    return {
      ruleForm: {},
      rules: {},
      selectedTableData: [],
      tableLoading: false,
      tableListData: [],
      userTableTitle,
      userNewsCode: [],
    };
  },
  computed:{
    newDisabled(){
      return this.userNewsCode.length > 0
    }
  },
  created() {},
  mounted() {
    this.getTableList();
  },
  methods: {
    getTableList() {
      this.page.currPage = 1;
      this.query();
    },
    handleSizeChange(val) {
      this.page.currPage = 1;
      this.page.pageSize = val;
      this.query();
    },
    handleDelete(scope) {
      this.$confirm(this.language('SFQDSCNR',"是否确定删除 内容 ？"), this.language('NEWS_TISHI',"提示"), {
        confirmButtonText: this.language('TERMS_SHI', '是'),
        cancelButtonText: this.language('TERMS_FOU', '否'),
        type: "warning",
      })
        .then(() => {
          const id = scope.row.id;
          deleteGroup({ id })
            .then(() => {
              this.$message.success(this.language('NEWS_SHANCHUCHENGGONG', '删除成功'));
              this.getTableList();
            })
            .catch(() => {
               this.$message.error(this.language('NEWS_SHANCHUSHIBAI', '删除失败'));
            });
        })
        .catch(() => {});
    },
    handleExport(scope) {
      const data = scope.row;
      downloadAll({
        url: process.env.VUE_APP_NEWS+`/groupService/exportExcel?userId=`+store.state.permission.userInfo.id,
        filename: "用户组设置",
        type: "application/vnd.ms-excel",
        data,
        callback: (e) => {
          if (e) {
            this.$message.success(this.language('NEWS_DAOCHUCHENGGONG',"导出成功"));
          } else {
            this.$message.error(this.language('NEWS_DAOCHUSHIBAI',"导出失败"));
          }
        },
      });
    },
    handleEdit(scope) {
      console.log(scope.row)
      this.$router.push({
        path: `/news/newsMent/index?id=${scope.row.id}`,
      });
    },
    // 表格选中值集
    handleSelectionChange(val) {
      console.log(val);
      this.selectedTableData = val;
    },
    handleUserNews() {
      this.$router.push({
        path: `/news/newsMent/index?news=${'news'}`,
      });
    },
    query() {
      this.tableLoading = true;
      let param = {
        ...this.ruleForm,
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize,
      };
      findGroupPage(param).then((res) => {
        this.tableLoading = false;
        this.tableListData = res.data;
        this.page.total = res.total;
      });
      findAdminPermission()
        .then((res) => {
          this.userNewsCode = res.map((item) => item.code);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.handel-top {
  width: 100%;
  .form-item-row1-clo2 ::v-deep {
    display: flex;
    margin-right: -4rem;
    .el-form-item {
      display: flex;
      width: 100%;
      margin-right: 6rem;
    }
    .el-form-item__label {
      width: 15rem;
    }
    .el-form-item__content {
      width: 100%;
    }
  }
  .form-item-button {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
  }
}
.form-item {
  display: flex;
  width: 25px;
  margin: auto;
  justify-content: center;
  .form-item-icon {
    width: 100%;
    height: 100%;
    margin: 0 25px;
    cursor: pointer;
  }
}
::v-deep .el-table {
  .el-form-item {
    margin-top: 0;
    margin-bottom: 0;
  }
}
</style>
