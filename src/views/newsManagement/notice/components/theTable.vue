<template>
  <iCard class="margin-top20">
    <div class="margin-bottom20 clearFloat">
      <div class="floatright">
        <iButton @click="handleFabuNotice" :disabled="btnStatue || selectedRow.length === 0 || selectedRow.length >1">
          {{language('NEWS_FABU', '发布')}}
        </iButton>
        <iButton @click="handleAddNotice">{{language('NEWS_XINJIANGONGGAO', '新建公告')}}</iButton>
        <iButton @click="handleDelete" :disabled="selectedRow.length === 0">{{
          language('LK_SHANCHU', '删除')
          }}
        </iButton>
      </div>
    </div>
    <div class="card--body">
      <iTableML
          tooltip-effect="light"
          :data="tableListData"
          :tableLoading="tableLoading"
          @selectionChange="handleChoose"
      >
        <el-table-column
            type="selection"
            width="40"
            align="center"
        ></el-table-column>
        <el-table-column width="40" class="table--column--index" align="center">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column align="left" min-width="100" :label="language('NEWS_GONGGAOBIAOTI', '公告标题')"
        >
          <template slot-scope="scope">
            <div>
              <img
                  style="min-width: 2.5rem"
                  :src="scope.row['isTop'] === 1 ? top : ''"
                  class="margin-right10"
              />
              <span
                  :title="scope.row['title']"
                  :class="'open-link-text cursor'"
                  @click="handleGoDetail(scope.row)"
              >{{ scope.row["title"].length > 15 ? scope.row["title"].substring(0, 15) + '...' : scope.row["title"]
                }}</span
              >
            </div>
          </template>
        </el-table-column
        >
        <el-table-column align="center" min-width="80" :label="language('NEWS_GONGGAOLEIXING', '公告类型')"
        >
          <template slot-scope="scope">
            <span>{{ noticeTypesObj[scope.row.type] }}</span>
          </template>
        </el-table-column
        >
        <el-table-column align="center" min-width="50" :label="language('NEWS_GONGGAOZHUANGTAI', '公告状态')"
        >
          <template slot-scope="scope">
            <span>{{ noticeStatusObj[scope.row.status] }}</span>
          </template>
        </el-table-column
        >
        <el-table-column align="center" min-width="80" :label="language('NEWS_FABUSHIJIAN', '发布时间')">
          <template slot-scope="scope">
            <span>{{ scope.row["status"] > 0 ? scope.row["publishDate"] : ''}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="80" :label="language('NEWS_FABUREN', '发布人')"
        >
          <template slot-scope="scope">
            <span>{{ scope.row["publisher"] }}</span>
          </template>
        </el-table-column
        >
        <el-table-column align="center" min-width="50" :label="language('NEWS_DIANJILIANG', '点击量')"
        >
          <template scope="scope">
            <span>{{ scope.row["clicks"] }}</span>
          </template>
        </el-table-column
        >
      </iTableML>
      <iPagination
          v-update
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          background
          :current-page="page.currPage"
          :page-size="page.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="sizes, prev, pager, next, jumper"
          :prev-text="language('NEWS_SHANGYIYE', '上一页')"
          :next-text="language('NEWS_XIAYIYE', '下一页')"
          :total="page.total"
      />
    </div>
  </iCard>
</template>
<script>
import {iButton, iCard, iPagination} from "rise";
import iTableML from "@/components/newsComponents/iTableML";
import {noticeStatusObj, noticeTypesObj} from "./data";
import {deleteNotice, updateNotice,} from "@/api/news/notice.js";
import top from "@/assets/images/news/top.svg";

export default {
  components: {
    iCard,
    iPagination,
    iTableML,
    iButton,
  },
  props: {
    tableListData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    tableLoading: {type: Boolean, default: false},
    page: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      top,
      noticeStatusObj,
      noticeTypesObj,
      form: {},
      selectedRow: [],
      btnStatue: true,
    };
  },
  computed: {
    // category() {
    //   let obj = this.newsClassify?.reduce((obj, item) => {
    //     return { ...obj, [item.value]: item.label };
    //   }, {});
    //   return obj;
    // },
    // newsType() {
    //   return this.newsTypes?.reduce((obj, item) => {
    //     return { ...obj, [item.value]: item.label };
    //   }, {});
    // },
    fabuStatue() {
      return this.selectedRow;
    }
  },
  watch: {
    fabuStatue: {
      handler(val, oldVal) {
        val?.filter(item => {
          if (item.status === 0) {
            this.btnStatue = false;
          } else {
            this.btnStatue = true;
          }
        })
      },
      deep: true, //true 深度监听
    }
  },
  created() {
  },
  methods: {
    handleFabuNotice() {
      let formDate = {...this.selectedRow[0]};
      formDate.status = 1;
      updateNotice(formDate).then((res) => {
        if (res) {
          this.$message.success(this.language('NEWS_FABUCHENGGONG', "发布成功"));
          this.$emit('getTableList');
        }
      });
    },
    handleSizeChange(val) {
      this.$emit("handleChangeSize", val);
    },
    handleCurrentChange(val) {
      this.$emit("handleChangePage", val);
    },
    // 详情
    handleGoDetail(row) {
      this.$router.push({
        path: "/news/notice/toView",
        query: {
          id: row.id,
        },
      });
    },
    // 新建公告
    handleAddNotice() {
      this.$router.push({
        path: "/news/notice/addNotice",
      });
    },
    handleChoose(e) {
      this.selectedRow = e;
    },
    handleDelete() {
      // const ids = [];
      // this.selectedRow.forEach((e) => ids.push(e.id));
      this.$confirm(this.language('NEWS_QQRSFSCXZGG', "请确认是否删除选中公告？"), this.language('NEWS_TISHI', "提示"), {
        confirmButtonText: this.language('TERMS_SHI', '是'),
        cancelButtonText: this.language('TERMS_FOU', '否'),
        type: "warning",
      }).then(() => {
        deleteNotice(this.selectedRow)
            .then((res) => {
              if (res.code == 200) {
                this.$message.success(this.language('NEWS_SHANCHUCHENGGONG', '删除成功'));
                this.$emit("getTableList");
              }
            })
            .catch((err) => {
              this.$message.error(this.language('NEWS_SHANCHUSHIBAI', '删除失败'));
            });
      });
    },
    // // 表格选中值集
    // handleSelectionChange(val) {
    //   this.selectTableList = val;
    //   this.$emit("selectionChange", val);
    // },
  },
  mounted() {
  },
};
</script>
<style lang="scss" scoped>
.card--header {
  display: flex;
  justify-content: flex-end;

  .card--header--item {
    font-size: 18px;
    font-weight: bold;
  }
}

.card--body {
  margin-top: 20px;

  ::v-deep tr {
    height: 60px;
  }
}

::v-deep th {
  text-align: center;
}

::v-deep .el-table-column--selection .cell {
  padding-left: 0;
  padding-right: 0;
}

// ::v-deep .el-table__body-wrapper {
//   // min-height: 600px;
// }
.border-bottom {
  border-bottom: #1763F7 solid 1px;
}
</style>
