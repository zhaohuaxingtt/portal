<template>
  <iCard class="margin-top20">
    <div class="margin-bottom20 clearFloat">
      <div class="floatright">
        <iButton @click="handleAddKV">{{language('NEWS_XINJIANKVTU', '新建KV图')}}</iButton>
        <iButton :disabled="selectRow.length === 0" @click="handleDelete">{{
          language('LK_SHANCHU', '删除')
          }}
        </iButton>
      </div>
    </div>
    <iTableML
        tooltip-effect="light"
        :data="tableList"
        @selectionChange="handleChoose"
    >
      <el-table-column
          type="selection"
          min-width="60"
          align="center"
      ></el-table-column>
      <el-table-column
          type="index"
          min-width="60"
          align="center"
      ></el-table-column>
      <el-table-column align="center" :label="language('NEWS_TUPIANYULAN','图片预览')">
        <template slot-scope="scope">
          <span class="content">
            <el-image v-if="scope.row.picUrl!== undefined" :src="scope.row.picUrl" class="image"></el-image>
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="language('NEWS_SHANGCHUANRIQI','上传日期')">
        <template slot-scope="scope">
          <span>{{ scope.row.publishDate.substring(0, 10) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="language('NEWS_BOFANGSHUNXU','播放顺序')">
        <template slot-scope="scope">
          <div class="sortBox">
            <p class="number">
              <!-- {{ scope.row.sort > 9 ? scope.row.sort : "0" + scope.row.sort }} -->
              {{
              scope.$index + 1 + page.pageSize * (page.currPage - 1) > 9
                  ? scope.$index + 1 + page.pageSize * (page.currPage - 1)
                  : "0" +
                  (scope.$index + 1 + page.pageSize * (page.currPage - 1))
              }}
            </p>
            <p @click="upwardItem(scope.row)">
              <img class="upward" :src="upWard" alt="" srcset=""/>
            </p>
            <p @click="downItem(scope.row)">
              <img class="down" :src="down" alt="" srcset=""/>
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="language('NEWS_ZHUANGTAI', '状态')"
      >
        <template slot-scope="scope">
          <el-switch
              v-model="scope.row.status"
              :active-text="language('NEWS_SHANGJIA', '上架')"
              :inactive-text="language('NEWS_XIAJIA', '下架')"
              :active-value="1"
              :inactive-value="0"
              @change="changeState(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
    </iTableML>
    <iPagination
        v-update
        @current-change="handleCurrentChange($event, query)"
        @size-change="handleSizeChange($event, query)"
        background
        :current-page="page.currPage"
        :page-size="page.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="page.total"
        :prev-text="language('NEWS_SHANGYIYE', '上一页')"
        :next-text="language('NEWS_XIAYIYE', '下一页')"
        layout="sizes, prev, pager, next, jumper"
    />
  </iCard>
</template>

<script>
import {iButton, iCard, iPagination} from "rise";
import {deleteKV, findKVPage, moveKVPosition, updateKVStatus,} from "@/api/news/KV";
import rise from "@/assets/images/rise.png";
import down from "@/assets/images/news/down.svg";
import upWard from "@/assets/images/news/upward.svg";
import iTableML from "@/components/newsComponents/iTableML";
import {pageMixins} from "@/utils/pageMixins";

export default {
  mixins: [pageMixins],
  components: {iCard, iButton, iTableML, iPagination},
  props: {},
  async mounted() {
    this.query();
  },
  data() {
    return {
      rise,
      down,
      upWard,
      // form: {},
      selectRow: [],
      tableList: [],
      selectStatus: [],
    };
  },

  methods: {
    // 查询
    query() {
      const data = {
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize,
      };
      findKVPage(data).then((res) => {
        console.log("res", res);
        const {data, pageNum, pageSize, total, pages} = res;
        this.page.currPage = pageNum;
        this.page.pageSize = pageSize;
        this.page.total = total;
        this.page.pages = pages;
        this.tableList = data;
      });
    },
    handleSizeChange(e, q) {
      this.page.currPage = 1;
      this.page.pageSize = e;
      this.query();
    },
    handleUpload() {
    },
    // 新建KV图
    handleAddKV() {
      // let routeUrl = this.$router.resolve({
      //   path: "/news/addKV",
      // });
      // window.open(routeUrl.href, "_blank");
      this.$router.push({
        path: "/news/addKV",
      });
    },
    // 删除KV图
    handleDelete() {
      // if (this.selectRow.length == 0) {
      //   this.$message.error("请选择需要删除的KV图!");
      // } else {
      this.selectStatus = this.selectRow.map((item) => {
        return item.status;
      });
      if (this.selectStatus.includes(1)) {
        this.$message.warning(this.language('NEWS_KVTZTWSJSBKSC', "KV图状态为上架时，不可删除！"));
      } else {
        this.$confirm(this.language('NEWS_SFSCKVT', "是否删除该KV图？"), this.language('NEWS_TISHI', "提示"), {
          confirmButtonText: this.language('TERMS_SHI', '是'),
          cancelButtonText: this.language('TERMS_FOU', '否'),
          type: "warning",
        }).then(() => {
          deleteKV(this.selectRow)
              .then(() => {
                this.$message.success(this.language('NEWS_SHANCHUCHENGGONG', '删除成功'));
                this.query();
              })
              .catch((err) => {
                this.$message.error(this.language('NEWS_SHANCHUSHIBAI', '删除失败'));
              });
        });
      }
      // }
    },
    // 选择框
    handleChoose(e) {
      this.selectRow = e;
    },
    // 状态改变
    changeState(row) {
      updateKVStatus(row)
          .then((res) => {
            if (res) {
              if (row.status == 1) {
                this.$message.success(this.language('NEWS_SHANGJIACHENGGONG', "上架成功！"));
              } else {
                this.$message.success(this.language('NEWS_XIAJIACHENGGONG', "下架成功！"));
              }
            }
            this.query();
          })
          .catch((err) => {
            console.log(err);
            this.query();
          });
    },
    // 顺序向上
    upwardItem(row) {
      // let temp = this.tableList[index - 1];
      // this.$set(this.tableList, index - 1, this.tableList[index]);
      // this.$set(this.tableList, index, temp);
      moveKVPosition({id: row.id, status: 1}).then((res) => {
        if (res.code == 200) {
          this.$message.success(this.language('NEWS_TIAOZHENGCHENGGONG', "调整成功！"));
          this.query();
        }
      });
    },
    // 顺序向下
    downItem(row) {
      // let i = this.tableList[index + 1];
      // this.$set(this.tableList, index + 1, this.tableList[index]);
      // this.$set(this.tableList, index, i);
      moveKVPosition({id: row.id, status: 0}).then((res) => {
        if (res.code == 200) {
          this.$message.success(this.language('NEWS_TIAOZHENGCHENGGONG', "调整成功！"));
          this.query();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 142px;
  // height: 80px;
  .image {
    // width: 190px;
    width: 52%;
    height: 107px;
    border-radius: 10px;
    // ::v-deep .el-image__inner {
    //   // height: 38px;
    //   height: 80px;
    // }
  }
}

.sortBox {
  display: flex;
  justify-content: center;

  > p {
    display: flex;
    cursor: pointer;
  }

  .number {
    margin-right: 20px;
  }

  .upward {
    margin-right: 10px;
  }
}
</style>
