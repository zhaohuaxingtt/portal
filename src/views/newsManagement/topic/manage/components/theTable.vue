<template>
  <iCard class="margin-top20 card">
    <div class="card--header">
      <div class="card--header--item card--header--item--btn">
        <iButton v-if="newsClassifyCode.length>0" @click="addTopicNews">{{ language('NEWS_XJZTXW', '新建专题新闻') }}
        </iButton>
        <iButton v-if="newsClassifyCode.length>0" @click="deleteTopicNews" :disabled="selectTableList.length === 0">
          {{ language('LK_SHANCHU', '删除') }}
        </iButton>
      </div>
    </div>
    <div class="card--body">
      <iTableML
          tooltip-effect="light"
          :data="tableListData"
          :tableLoading="tableLoading"
          @selectionChange="handleSelectionChange"
      >
        <el-table-column
            type="selection"
            width="50"
            align="center"
        ></el-table-column>
        <el-table-column width="40" class="table--column--index" align="center">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column align="left" :label="language('NEWS_ZHUANTIMINGCHENG', '专题名称')"
        >
          <template slot-scope="scope">
            <div>
              <img
                  style="min-width: 1rem"
                  :src="scope.row['isTop'] === 1 ? top : ''"
                  class="margin-right10"
              />
              <span
                  :class="'open-link-text cursor'"
                  @click="handleGoDetail(scope.row)"
                  :title="scope.row['name']"
              >{{
                scope.row["name"].length > 7
                    ? scope.row["name"].substring(0, 7) + "..."
                    : scope.row["name"]
                }}</span
              >
            </div>
          </template>
        </el-table-column
        >
        <el-table-column align="center" :label="language('NEWS_LAIYUAN', '来源')">
          <template slot-scope="scope">
            <span>{{ scope.row["source"] }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="language('NEWS_FABURIQI', '发布日期')">
          <template slot-scope="scope">
            <span>{{ scope.row["publishDate"].substring(0, 10) }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="language('NEWS_ZHUANTIFENLEI', '专题分类')"
        >
          <template slot-scope="scope">
            <span>{{ category[scope.row["category"]] }}</span>
          </template>
        </el-table-column
        >
        <el-table-column align="center" :label="language('NEWS_ZHUANTIGAIYAO', '专题概要')"
        >
          <template slot-scope="scope">
            <span>{{ scope.row["summary"] }}</span>
          </template>
        </el-table-column
        >
        <el-table-column align="center" :label="language('NEWS_ZTWZSL', '专题文章数量')"
        >
          <template slot-scope="scope">
            <span>{{ scope.row["amount"] }}</span>
          </template>
        </el-table-column
        >
        <el-table-column align="center" :label="language('NEWS_ZHUANGTAI', '状态')"
        >
          <template slot-scope="scope">
            <el-switch
                v-model="scope.row['status']"
                :active-text="language('NEWS_SHANGJIA', '上架')"
                :inactive-text="language('NEWS_XIAJIA', '下架')"
                :active-value='1'
                :inactive-value='0'
                @change="handleChange($event, scope.row)"
            >
            </el-switch>
          </template
          >
        </el-table-column>
      </iTableML>
      <iPagination
          v-update
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          background
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
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
import {newsClassify, newsTypes} from "./data";
import {deleteTopic, updateTopicStatus} from "@/api/news/news";
import top from "@/assets/images/news/topicTop.svg";

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
    newsClassifyCode: {
      type: Array,
      default: () => {
        return [];
      },
    },
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
      newsClassify,
      newsTypes,
      flag: false,
      tooltip: true,
      form: {},
      selectTableList: [],
    };
  },
  computed: {
    category() {
      let obj = this.newsClassify?.reduce((obj, item) => {
        return {...obj, [item.value]: item.label};
      }, {});
      return obj;
    },
    newsType() {
      return this.newsTypes?.reduce((obj, item) => {
        return {...obj, [item.value]: item.label};
      }, {});
    },
  },
  watch: {},
  created() {
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit("handleChangePage", val);
    },
    handleSizeChange(val) {
      this.$emit("handleChangeSize", val);
    },
    handleChange(val, row) {
      if (
          this.newsClassifyCode.length === 0 ||
          !this.newsClassifyCode.includes(row.category)
      ) {
        this.$set(row, "status", val ^ 1);
        this.$message.error("该新闻分类无权限操作！");
        return;
      }
      let param = {id: row.id, status: val};
      if (val === 1) {
        this.$confirm("是否确认上架此专题新闻 ？", "提示", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          type: "warning",
        })
            .then(() => {
              updateTopicStatus(param)
                  .then((res) => {
                    if (res.code === 200) {
                      this.$message.success("上架成功！");
                      this.$emit("flushTable");
                    }
                  })
                  .catch((err) => {
                    this.$set(row, "status", val ^ 1);
                  });
            })
            .catch(() => {
              this.$set(row, "status", val ^ 1);
            });
      } else {
        updateTopicStatus(param)
            .then((res) => {
              if (res.code === 200) {
                this.$message.success("下架成功！");
                this.$emit("flushTable");
              }
            })
            .catch((err) => {
              this.$set(row, "status", val ^ 1);
            });
      }
    },
    handleGoDetail(row) {
      // this.$router.push({
      //   name: "newsTopicBrowse",
      //   params: {
      //     id: row.id,
      //     type: "",
      //   },
      // });
      let {href} = this.$router.resolve({
        name: "newsTopicBrowse",
        params: {
          id: row.id,
        },
      });
      window.open(href, "_blank");
    },
    // 表格选中值集
    handleSelectionChange(val) {
      this.selectTableList = val;
      this.$emit("selectionChange", val);
    },
    // 删除
    deleteTopicNews() {
      let indexs = [];
      try {
        this.selectTableList.forEach((item) => {
          if (item.status === 1) {
            throw new Error();
          } else {
            indexs.push({id: item.id});
          }
        });
      } catch (e) {
        this.$message.error(this.language('NEWS_SJDZTBKSC', "上架的专题不可删除！"));
        return;
      }
      this.$confirm(this.language('NEWS_SFQDSCZTXW', "是否确定删除 专题新闻 ？"), this.language('NEWS_TISHI', "提示"), {
        confirmButtonText: this.language('TERMS_SHI', '是'),
        cancelButtonText: this.language('TERMS_FOU', '否'),
        type: "warning",
      }).then(() => {
        deleteTopic(indexs)
            .then(() => {
              this.$message.success(this.language('NEWS_SHANCHUCHENGGONG', '删除成功'));
              this.$emit("flushTable");
            })
            .catch((e) => {
              console.log(e);
            });
      });
    },
    addTopicNews() {
      this.$router.push({
        name: "newsTopicAdd",
        params: {
          type: "add",
          id: "",
        },
      });
    },
  },
  mounted() {
  },
};
</script>
<style lang="scss" scoped>
.header {
  font-size: 18px;
  font-weight: bold;
}

.card {
  margin-bottom: 30px;

  .card--header {
    display: flex;
    justify-content: flex-end;

    .card--header--item {
      font-size: 18px;
      font-weight: bold;
    }

    .card--header--item--btn {
    }
  }

  .card--body {
    margin-top: 20px;

    ::v-deep tr {
      height: 60px;
    }
  }
}

::v-deep th {
  text-align: center;
}

::v-deep .el-table-column--selection .cell {
  padding-left: 0;
  padding-right: 0;
}

::v-deep .el-table__body-wrapper {
  min-height: 600px;
}
</style>
