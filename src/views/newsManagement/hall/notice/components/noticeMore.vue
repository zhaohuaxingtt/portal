<template>
  <iCard class="margin-top20">
    <div class="margin-bottom20 card-top">
      <div class="search-input">
        <div class="title">{{ noticeTypesObj[this.noticeType] }}</div>
        <div class="search">
          <iInput
              :placeholder="language('NEWS_SOUSUOBIAOTI', '搜索标题')"
              v-model="searchInput"
              @keydown.enter.native="change"
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </iInput>
        </div>
      </div>
      <div>
        <iButton @click="handleClickBack">{{ language('NEWS_FANHUI', '返回')}}</iButton>
      </div>
    </div>
    <div class="card--body">
      <iTableML
          tooltip-effect="light"
          :data="tableListData"
          @selectionChange="handleChoose"
      >
        <!-- <el-table-column
          type="selection"
          width="40"
          align="center"
        ></el-table-column> -->
        <el-table-column width="40" type="index" align="center">
        </el-table-column>
        <el-table-column :label="language('NEWS_GONGGAOBIAOTI', '公告标题')"
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
                  :class="'open-link-text cursor data-title'"
                  @click="handleGoDetail(scope.row.id)"

              >{{

                scope.row["title"]
                }}</span
              >
            </div>
          </template>
        </el-table-column
        >
        <el-table-column align="center" :label="language('NEWS_GONGGAONEIRONG', '公告内容')">
          <template slot-scope="scope">
            <span :title="superTrim(scope.row['content'])">
              {{
              superTrim(scope.row['content'])
              }}
            </span>
          </template>
        </el-table-column
        >
        <el-table-column align="center" width="200px" :label="language('NEWS_FUJIAN', '附件')"
        >
          <template slot-scope="scope">
            <span
                class="el-icon-paperclip"
                v-if="
                scope.row['attachments'] && scope.row['attachments'].length > 0
              "
            ></span></template
          >
        </el-table-column>
        <el-table-column align="center" width="200px" :label="language('NEWS_FABUREN', '发布人')"
        >
          <template slot-scope="scope">
            <span>{{ scope.row["publisher"] }}</span>
          </template>
        </el-table-column
        >
        <el-table-column align="center" width="300px" :label="language('NEWS_FABUSHIJIAN', '发布时间')">
          <template slot-scope="scope">
            <span>{{ scope.row["publishDate"].substring(0, 10) }}</span>
          </template>
        </el-table-column>
      </iTableML>
      <iPagination
          v-update
          @current-change="handleCurrentChange($event, getTableData)"
          @size-change="handleSizeChange($event, getTableData)"
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
</template>
<script>
import {iButton, iCard, iInput, iPagination} from "rise";
import iTableML from "@/components/newsComponents/iTableML";
import {pageMixins} from "@/utils/pageMixins";
import {getNoticeListByType} from "@/api/news/notice.js";
import top from "@/assets/images/news/top.svg";
import {noticeTypesObj} from "./data";

export default {
  mixins: [pageMixins],
  components: {
    iCard,
    iPagination,
    iTableML,
    iButton,
    iInput,
  },
  props: {},
  data() {
    return {
      top,
      tableListData: [],
      noticeType: "",
      searchInput: "",
      noticeTypesObj,
      selectTableList: [],
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.getTableData();
  },
  methods: {
    superTrim(str) {
      // 匹配标签之间的文本
      let text = str
          .replace(/(\n)/g, "")
          .replace(/(\t)/g, "")
          .replace(/(\r)/g, "")
          .replace(/<\/?[^>]*>/g, "")
          .replace(/\s*/g, "")
          .replace(/ /gi, " ")
          .replace(/(&nbsp;)/g, "");
      return text;
    },
    handleClickBack() {
      this.$router.go(-1);
    },
    // handleCurrentChange(val) {
    //   // this.$emit("handleChangePage", val);
    // },
    // 表格选中值集
    handleSelectionChange(val) {
      this.selectTableList = val;
      // this.$emit("selectionChange", val);
    },
    // 查询数据
    getTableData() {
      const type = this.$route.query.type;
      this.getNoticeList(type);
    },
    getNoticeList(type) {
      let data = {
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize,
        type: type,
        title: this.searchInput,
      };
      getNoticeListByType(data).then((res) => {
        const {data, pageNum, pageSize, total, pages} = res;
        // this.page.currPage = pageNum;
        // this.page.pageSize = pageSize;
        this.page.total = total;
        // this.page.pages = pages;
        this.tableListData = data.notices;
        this.noticeType = data.type;
      });
    },
    // handleSizeChange(e) {
    //   this.page.currPage = 1;
    //   this.page.pageSize = e;
    //   this.getTableData();
    // },
    handleGoDetail(id) {
      this.$router.push({
        path: "/news/notice/previewNotice",
        query: {
          id: id,
        },
      });
    },
    change() {
      this.getTableData();
    },
  },
};
</script>
<style lang="scss" scoped>
.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .search-input {
    display: flex;
    flex-direction: row;
    align-items: center;

    .title {
      font-size: 20px;
      font-family: Arial;
      font-weight: bold;
      line-height: 23px;
      min-width: 84px;
    }

    .search ::v-deep {
      margin-left: 50px;

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
          top: 3px;

          .el-input__icon {
            font-weight: 500;
            color: #1763f7;
          }
        }
      }
    }
  }
}

::v-deep th {
  text-align: center;
}

.data-title {
  width: 75%;
  text-align: center;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
