<template>
  <!--转派-->
  <iDialog
      :title="language('NEWS_XINWENXUANZE', '新闻选择')"
      :visible.sync="openDialog"
      append-to-body="true"
      width="95%"
      top="5vh"
      @close="clearDiolog"
      :close-on-click-modal="false"
  >
    <div class="card">
      <div class="card__body">
        <div class="search-input">
          <iInput
              :placeholder="language('NEWS_SOSUOXINWENBIAOTI', '搜索新闻标题')"
              v-model="title"
          >
            <i
                slot="prefix"
                class="el-input__icon el-icon-search"
            ></i>
          </iInput>
          <iButton @click="getTableList">{{ language('LK_INQUIRE', '查询') }}</iButton>
        </div>
        <el-divider></el-divider>
        <div class="tag-box">
          <div class="tag-button">
            <el-tag
                class="tag-item"
                v-for="o in tags"
                :key="o.id"
                closable
                :disable-transitions="true"
                @close="handleDel(o.id)"
            >
              {{ o.title }}
            </el-tag>
          </div>
          <div>
            <iButton @click="handleChecked">{{ language('NEWS_QUEDING', '确定') }}</iButton>
          </div>
        </div>
        <iTableCustom
            height="32.312rem"
            ref="multipleTable"
            :data="tableListData"
            :loading="tableLoading"
            :columns="supplierTableListColumns"
            @handle-selection-change="handleSelectionChange"
            @handle-select="handleSelectTable"
            @handle-select-all="handleSelectAll"
        />
        <iPagination
            v-update
            @current-change="handleChangePage($event)"
            @size-change="handleChangeSize"
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
    </div>
  </iDialog>
</template>

<script>
import {iButton, iDialog, iInput, iPagination} from "rise";
import iTableCustom from "@/components/newsComponents/iTableCustom";
import {findTopicNewsPage} from "@/api/news/news";
import {pageMixins} from "@/utils/pageMixins";
import {supplierTableListColumns} from "./data";

export default {
  mixins: [pageMixins],
  components: {
    iDialog,
    iInput,
    iPagination,
    iTableCustom,
    iButton,
  },
  props: {
    openDialog: {type: Boolean, default: false},
    category: {type: Number},
    newsCheckList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      tableListData: [],
      tableLoading: false,
      typeObject: {},
      supplierTableListColumns,
      approvalProcessName: "",
      title: '',
      selectedTableData: [],
      tags: [],
    };
  },
  computed: {},
  mounted() {
    this.tags = this.newsCheckList;
    this.getTableList();
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        this.$refs.multipleTable.$children[0].clearSelection();
        this.$nextTick(() => {
          this.tableListData.forEach((item, index) => {
            rows.forEach((row) => {
              if (row.id === item.id) {
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
    getTableList() {
      this.page.currPage = 1;
      this.page.pageSize = 10;
      let param = {
        category: this.category,
        title: this.title,
        pageNum: 1,
        pageSize: 10,
      };
      this.query(param);
    },
    clearDiolog() {
      this.$emit("closeDialog", false);
    },
    handleChangePage(e) {
      this.page.currPage = e;
      let param = {
        category: this.category,
        title: this.title,
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize,
      };
      this.query(param);
    },
    handleChangeSize(e) {
      this.page.currPage = 1;
      this.page.pageSize = e;
      let param = {
        ...this.form,
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize,
      };
      this.query(param);
    },
    query(e) {
      this.tableLoading = true;
      findTopicNewsPage(e).then((res) => {
        this.tableListData = res.data;
        this.page.total = res.total;
        this.toggleSelection(this.tags);
        this.tableLoading = false;
      });
    },
    // 表格选中值集
    handleSelectionChange(val) {
      this.selectedTableData = val;
    },
    handleSelectTable(selection, row) {
      if (selection.includes(row)) {
        this.tags.push(row);
      } else {
        this.tags.forEach((e, index) => {
          if (e.id === row.id) {
            this.tags.splice(index, 1);
          }
        });
      }
    },
    handleSelectAll(val) {
      let indexs = this.tableListData.map((e) => {
        return e.id;
      });
      this.tags = this.tags.filter((e) => {
        return !indexs.includes(e.id);
      });
      if (val.length > 0) {
        this.tags = this.tags.concat(val);
      }
    },
    handleChecked() {
      this.$emit("saveChecked", this.tags);
      this.$emit("closeDialog", false);
    },
    handleDel(id) {
      this.tags.forEach((e, index) => {
        if (e.id === id) {
          this.tags.splice(index, 1);
        }
      });
      this.toggleSelection(this.tags);
    },
  },
};
</script>

<style scoped lang="scss">
.card {
  padding-bottom: 20px;
  // min-height: 778px;
  color: $color-black;

  .card__header {
    display: flex;
    justify-content: space-between;

    .button__list {
      position: absolute;
      top: 25px;
      right: 80px;
    }

    .card__header__item {
      font-size: 18px;
      font-weight: bold;
    }
  }

  .card__body {
    margin-top: 10px;
    height: auto;
    overflow: hidden;
    min-height: 765px;

    .search-input ::v-deep {
      display: flex;
      flex-direction: row;

      .el-input {
        width: 550px;

        .el-input__inner {
          padding-left: 50px;
          background-color: #f8f8fa;
          border-radius: 10px;
        }

        .el-input__prefix {
          padding-left: 10px;
          font-size: 28px;
          top: 5px;

          .el-input__icon {
            font-weight: 500;

          }
        }
      }

      .el-button {
        margin-left: 10px;
      }
    }

    .tag-box {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 20px;

      .tag-button {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        border-color: transparent;
        border-radius: 0.25rem;
        border: 1px solid #e0e6ed;
        margin-right: 20px;
        min-height: 72px;
        overflow-y: auto;

        .tag-item ::v-deep {
          padding-right: 23px;
          position: relative;
          background-color: #f7f7f7;
          color: #ccc;
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
}

::v-deep .has-gutter tr {
  background-color: #eaf1fd;
}

::v-deep .el-table th {
  background-color: #eaf1fd;
}

::v-deep td {
  min-width: 0;

  .cell {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
