<template>
  <div class="handel-top">
    <iDialog
        :visible.sync="open"
        @close="handleCancel"
        :title="language('NEWS_YUANGONGXUANZE', '员工选择')"
        width="95%"
        top="5vh"
        :close-on-click-modal="false"
        @open="handleOpen"
    >
      <el-form
          class="form"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-position="left"
          :hideRequiredAsterisk="true"
          :validate-on-rule-change="false"
      >
        <div class="item">
          <div class="form-item-row1-clo2">
            <iFormItem :label="language('NEWS_GONGHAO', '工号')" prop="userNum">
              <iLabel :label="language('NEWS_GONGHAO', '工号')" slot="label"></iLabel>
              <iInput v-model="ruleForm.userNum" :placeholder="language('LK_QINGSHURU', '请输入')"></iInput>
            </iFormItem>
            <iFormItem :label="language('NEWS_XINGMING', '姓名')" prop="nameZh">
              <iLabel :label="language('NEWS_XINGMING', '姓名')" slot="label"></iLabel>
              <iInput v-model="ruleForm.nameZh" :placeholder="language('LK_QINGSHURU', '请输入')">
              </iInput>
            </iFormItem>
            <iFormItem :label="language('NEWS_SUOSHUBUMEN', '所属部门')" prop="deptNameZh">
              <iLabel :label="language('NEWS_SUOSHUBUMEN', '所属部门')" slot="label"></iLabel>
              <iInput v-model="ruleForm.deptNameZh" :placeholder="language('LK_QINGSHURU', '请输入')">
              </iInput>
            </iFormItem>
          </div>
          <div class="form-item-button">
            <iButton @click="handleSearchReset">{{language('LK_ZHONGZHI', '重置')}}</iButton>
            <iButton @click="getTableList">{{ language('LK_INQUIRE', '查询') }}</iButton>
          </div>
        </div>
        <!-- 横线 -->
        <div class="link-gray"></div>

        <div class="item2">
          <div class="item2-clo1-cow1">
            <el-tag
                class="tag-item"
                v-for="item in tags"
                :key="item.id"
                closable
                :disable-transitions="true"
                @close="handleDel(item.userId)"
            >
              {{ item.nameZh }}
            </el-tag>
          </div>
          <div>
            <iButton @click="handleOk">{{language('NEWS_QUEREN', '确认')}}</iButton>
          </div>
        </div>
        <!-- <commonTable
          ref="multipleTable"
          :tableTitle="userTableTitle"
          :tableLoading="tableLoading"
          :tableData="tableListData"
          @handleSelectionChange="handleSelectionChange"
          height="518px"
        >
          <template slot="index" slot-scope="scope">
            <div>
              {{ scope.row.index + 1 }}
            </div>
          </template>
        </commonTable> -->
        <iTableCustom
            ref="multipleTable"
            :columns="userTableTitle"
            :loading="tableLoading"
            :data="tableListData"
            @handle-selection-change="handleSelectionChange"
            @handle-select="handleSelectTable"
            @handle-select-all="handleSelectAll"
            height="32rem"
        />

        <iPagination
            class="form-item-ipag"
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
      </el-form>
    </iDialog>
  </div>
</template>
<script>
import {iButton, iDialog, iFormItem, iInput, iLabel, iPagination} from "rise";
import iTableCustom from "@/components/newsComponents/iTableCustom";
import {pageMixins} from "@/utils/pageMixins";
import {userTableTitle} from "./data";
import {pageList} from "@/api/news/userCenter";

export default {
  mixins: [pageMixins],
  components: {
    iInput,
    iFormItem,
    iDialog,
    iButton,
    iLabel,
    iTableCustom,
    iPagination,
  },
  props: {
    open: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    userListData: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      ruleForm: {
        userNum: null,
        nameZh: null,
        deptNameZh: null,
      },
      rules: {},
      tableLoading: false,
      tableListData: [],
      selectedTableData: [],
      userTableTitle,
      tags: [],
    };
  },
  created() {
  },
  mounted() {
    this.tags = this.userListData.map(i => {
      return {
        ...i,
        nameZh: i.userName,
        userId: i.userId,
        deptList: i.dept,
      }
    })
    // console.log(156,this.userListData)
    this.getTableList();
  },
  methods: {
    getTableList() {
      this.page.currPage = 1;
      this.query();
    },
    // 重置
    handleSearchReset() {
      this.$refs["ruleForm"].resetFields();
      this.getTableList();
    },
    handleSizeChange(val) {
      this.page.currPage = 1;
      this.page.pageSize = val;
      this.query();
    },
    handleOk() {
      this.$emit('handleEmployeesOk', this.tags)
    },
    toggleSelection(rows) {
      if (rows) {
        this.$refs.multipleTable?.$children[0].clearSelection();
        this.$nextTick(() => {
          this.tableListData.forEach((item, index) => {
            rows.forEach((row) => {
              if (row.userId === item.userId) {
                this.$refs.multipleTable.$children[0].toggleRowSelection(
                    this.tableListData[index],
                    true
                );
              }
            });
          });
        });
      } else {
        this.$refs.multipleTable.$children[0].clearSelection();
      }
    },
    // 表格选中值集
    handleSelectionChange(val) {
      // console.log(val);
      this.selectedTableData = val;
    },
    //关闭
    handleCancel() {
      this.$emit("handleCancel");
    },
    handleOpen() {
      // console.log('object')
    },
    handleDel(id) {
      this.tags.forEach((e, index) => {
        if (e.userId === id) {
          this.tags.splice(index, 1);
        }
      });
      this.toggleSelection(this.tags);
    },
    handleSelectTable(selection, row) {
      if (selection.includes(row)) {
        this.tags.unshift(row);
      } else {
        this.tags.forEach((e, index) => {
          if (e.userId === row.userId) {
            this.tags.splice(index, 1);
          }
        });
      }
    },
    handleSelectAll(val) {
      let indexs = this.tableListData.map((e) => {
        return e.userId;
      });
      this.tags = this.tags.filter((e) => {
        return !indexs.includes(e.userId);
      });
      if (val.length > 0) {
        this.tags = this.tags.concat(val);
      }
    },
    query(e) {
      this.tableLoading = true;
      let param = {
        ...this.ruleForm,
        current: this.page.currPage,
        size: this.page.pageSize,
        accountType: 1,
      };
      pageList(param).then((res) => {
        this.tableLoading = false;
        this.tableListData = res.data;
        this.page.total = res.total;
        this.toggleSelection(this.tags)
      });
    },
  },
};
</script>
<style lang="scss" scoped>
/* 横线 */
.link-gray {
  width: 100%;
  height: 2px;
  background: #e1e4ed;
  margin-top: 20px;
  margin-bottom: 25px;
  margin-left: 0.5rem;
}

.form {
  margin-top: 10px;
  height: auto;
  overflow: hidden;
  min-height: 778px;
  padding-bottom: 3rem;
}

.handel-top {
  width: 100%;

  .item {
    display: flex;
    justify-content: space-between;

    .form-item-row1-clo2 ::v-deep {
      display: flex;
      /* margin-right: 10rem; */
      margin-left: 0.5rem;

      .el-form-item {
        /* display: flex; */
        width: 100%;
        margin-right: 2rem;
      }

      .el-form-item__label {
        /* width: 10rem; */
      }

      .el-form-item__content {
        width: 100%;
      }

      .el-input {
        width: 16rem;
      }
    }

    .form-item-button {
      margin-top: auto;
      margin-bottom: 1.5rem;
    }
  }

  .item2 {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;

    .item2-clo1-cow1 {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      border-color: transparent;
      border-radius: 0.25rem;
      border: 1px solid #e0e6ed;
      margin-right: 20px;
      min-height: 40px;
      overflow-y: auto;

      .tag-item ::v-deep {
        padding-right: 23px;
        position: relative;
        background-color: #f7f7f7;
        color: #615d5d;
        border-color: #f7f7f7;
        // width: 10%;
        border-radius: 20px;
        // text-overflow: ellipsis;
        // overflow: hidden;
        margin: 0.1% 0.3% 0.1% 0.1%;

        .el-icon-close {
          position: absolute;
          right: 4px;
          top: 7px;
          color: #ccc;
        }
      }
    }
  }
}

::v-deep .el-table {
  .el-form-item {
    margin-top: 0;
    margin-bottom: 0;
  }
}
</style>
