<template>
  <div class="container">
    <div class="content">
      <div class="header">
        <div class="unfinish" @click="handleUnFinish">未完成</div>
        <div class="finished" @click="handleFinished">已完成</div>
      </div>
      <div class="box-big">
        <div v-if="tableList.length === 0" class="no-data">暂无数据</div>
        <ul class="box" v-else>
          <li class="card" v-for="(item, index) of tableList" :key="index">
            <card :info="item" />
          </li>
        </ul>
        <iPagination
          v-update
          @current-change="handleCurrentChange($event)"
          @size-change="handleSizeChange($event)"
          background
          :page-sizes="page.pageSizes"
          page-size="8"
          prev-text="上一页"
          next-text="下一页"
          layout="prev, pager, next, jumper"
          :current-page="page.currPage"
          :total="page.total"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { iPagination, iPage } from "rise";
import card from "./components/card.vue";
import { listUserSurvey } from "@/api/survey/answer.js";
import { pageMixins } from "@/utils/pageMixins";
export default {
  mixins: [pageMixins],
  components: {
    card,
    iPagination,
    // iPage,
    // iButton,
  },
  data() {
    return {
      curStatus: 1,
      tableList: [],
    };
  },
  mounted() {
    this.handleUnFinish();
  },
  methods: {
    async query(e) {
      let data = {
        pageNum: e.pageNum,
        pageSize: e.pageSize,
        status: e.status,
      };
      const res = await listUserSurvey(data);
      this.tableList = res.data;
      this.page.total = Number(res.total);
    },
    handleCurrentChange(e) {
      this.page.currPage = e;
      this.query({
        pageNum: e,
        pageSize: 8,
        status: this.curStatus,
      });

      this.$emit("handleChangePage", e);
    },
    handleSizeChange(e) {
      this.handleFinished();
      this.$emit("handleSizeChange", e);
    },
    handleUnFinish() {
      document.querySelector(".unfinish").classList.add("active");
      document.querySelector(".finished").classList.remove("active");
      this.curStatus = 1;
      this.query({
        pageNum: this.page.currPage,
        pageSize: 8,
        status: 1,
      });
    },
    handleFinished() {
      document.querySelector(".finished").classList.add("active");
      document.querySelector(".unfinish").classList.remove("active");
      this.curStatus = 2;
      this.query({
        pageNum: this.page.currPage,
        pageSize: 8,
        status: 2,
      }).then(() => {
        this.tableList = this.tableList.map((item) => {
          return {
            ...item,
            state: 5,
          };
        });
        console.log(this.tableList);
      });
    },
  },
};
</script>
<style scoped lang="scss">
.no-data {
  height: 50px;
  line-height: 50px;
  text-align: center;
}
::v-deep.container {
  margin-top: 20px;
  // padding: 50px;
  .content {
    .header {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      height: 35px;
      .unfinish {
        margin-right: 5px;
        color: #000000;
        width: 135px;
        height: 35px;
        border-radius: 5px;
        cursor: pointer;
        text-align: center;
        line-height: 35px;
        font-size: 16px;
        font-weight: 600;
        border-radius: 5px;
        opacity: 0.7;
        background: #ffffff;
        box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.14);
      }
      .finished {
        width: 135px;
        height: 35px;
        border-radius: 5px;
        cursor: pointer;
        text-align: center;
        line-height: 35px;
        font-size: 16px;
        font-weight: 600;
        border-radius: 5px;
        opacity: 0.7;
        color: #000000;
        background: #ffffff;
        box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.14);
      }
      .active {
        background: #1660f1;
        /* box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.14); */
        border-radius: 5px;
        color: #fff;
        opacity: 1;
      }
    }
    .box-big {
      width: 1740px;
      padding: 40px;
      background-color: #fff;
      .pagination {
        margin-top: 0;
      }
    }
    .box {
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;

      .card {
        /* background-color: khaki; */
        margin-bottom: 40px;
        margin-right: 40px;
        width: 385px;
        height: 300px;
        box-shadow: 0px 0px 20px 0px rgba(27, 29, 33, 0.08);
        border-radius: 10px;
        overflow: hidden;
      }
      .card:nth-of-type(4n) {
        margin-right: 0;
      }
    }
  }
}
</style>
