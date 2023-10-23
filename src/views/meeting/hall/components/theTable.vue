<template>
  <iCard class="margin-top20 table-hall-box">
    <ul class="meeting-list" v-if="tableData.length>0">
      <!-- <li
        v-for="item in tableData"
        :key="item.id"
        class="meeting-item"
        @click="goNearFuture(item)"
      >
        <p class="meeting-state">
          {{
            item.arr[0].state == "04"
              ? "LIVE!"
              : item.arr[0].state == "03"
              ? "Next Meeting"
              : ""
          }}
        </p>
        <p class="meeting-time">{{item.arr[0].state == "04" ? '' : 'On ' + item.arr[0].startDate}}</p>
        <div class="meeting-img">
          <img :src="item.arr[0].coverImage" alt="" srcset="" />
        </div>
        <p class="meeting-type-name">
          {{ typeListObj[item.arr[0].meetingTypeId].name }}
        </p>
      </li> -->
      <li
        v-for="item in tableData"
        :key="item.id"
        class="meeting-item"
        @click="goNearFuture(item)"
      >
        <p class="meeting-state">
          {{
            item.state == "04"
              ? "LIVE!"
              : item.state == "03"
              ? "Next Meeting"
              : ""
          }}
        </p>
        <p class="meeting-time">{{item.state == "03" ? 'On ' + item.startDate : ''}}</p>
        <div class="meeting-img">
          <img :src="item.coverImage" alt="" srcset="" />
        </div>
        <p class="meeting-type-name">
          {{ item.name }}
        </p>
      </li>
    </ul>
    <p v-else class="no-data">{{$t('MT_ZANWUHUIYI')}}</p>
    <!-- <div class="load-more" @click="loadMore">{{loading ? '加载中' : "加载更多"}}</div> -->
  </iCard>
</template>

<script>
import { iCard } from "rise";
import { getMyMettingList, findByMeetingAll } from "@/api/meeting/home";
import { getMettingType } from "@/api/meeting/type";

export default {
  components: {
    iCard,
  },
  data() {
    return {
      tableData: [],
      typeListObj: {}, // 会议类型对象
      pageNum: 1,
      pageSize: 6,
      loading: false,
    };
  },
  mounted() {
    // this.getAllSelectList();
    this.query2();
  },
  methods: {
    // 获取会议类型列表
    getAllSelectList() {
      let param = {
        pageSize: 1000,
        pageNum: 1,
      };
      getMettingType(param).then((res) => {
        this.meetingTypeList = res.data;
        let typeListObj = {};
        res.data &&
          res.data.forEach((item) => {
            typeListObj[item.id.toString()] = {
              name: item.name,
              arr: [],
            };
          });
        this.typeListObj = typeListObj;
        this.query();
      });
    },

    // 获取用户会议
    query() {
      let param = {
        pageNum: 1,
        pageSize: 9999,
      };
      getMyMettingList(param).then((res) => {
        let dataAll = res.data.filter((item) => {
          if (item.state == "03" || item.state == "04") {
            return item;
          }
        });
        // let typeObj = JSON.parse(JSON.stringify(this.typeObj));
        let tableData = [];
        dataAll = dataAll.sort(this.sort());
        dataAll.forEach((item) => {
          let aaa = tableData.filter((item2) => {
            return item2.id == item.meetingTypeId;
          });
          if (aaa.length == 0) {
            tableData.push({
              id: item.meetingTypeId,
              arr: [item],
            });
          } else {
            tableData.forEach((tableItem) => {
              if (tableItem.id == item.meetingTypeId) {
                tableItem.arr.push(item);
              }
            });
          }
        });
        this.tableData = tableData;
      });
    },

    query2() {
      let param = {
        pageSize: 999,
        pageNum: 1,
      };
      findByMeetingAll(param).then((res) => {
        let dataUnuse = [];
        res.forEach(item => {
          let hasItem = dataUnuse.filter((item2) => {
            return item2.id == item.id;
          })
          if (hasItem.length == 0) {
            dataUnuse.push(item);
          }
        });
        this.tableData = dataUnuse;
      })
    },

    // 排序
    sort() {
      return (a, b) => {
        let start1 = new Date(a.startDate + " " + a.startTime).valueOf();
        let start2 = new Date(b.startDate + " " + b.startTime).valueOf();
        return start1 - start2;
      };
    },

    goNearFuture(e) {
      this.$router.push({
        path: "/meeting/live",
        query: {
          id: e.id,
          meetingInfoId: e.meetingId ? e.meetingId : -1,
        },
      });
    },

    // loadMore() {
    //   this.pageNum = this.pageNum + 1;
    //   let param = {
    //     pageNum: this.pageNum,
    //     pageSize: 6,
    //   }
    //   this.loading = true;
    //   getMyMettingList(param).then((res) => {
    //     let data = JSON.parse(JSON.stringify(this.tableData));
    //     this.tableData = data.concat(res.data);
    //     this.loading = false;
    //   })
    // }
  },
};
</script>

<style scoped lang="scss">
.table-hall-box {
  margin-top: 36px;

  .meeting-list {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    margin-bottom: -20px;

    .meeting-item {
      width: 456px;
      height: 400px;
      cursor: pointer;
      border: 1px solid #67C23A;
      margin-right: 20px;
      margin-bottom: 20px;
      padding: 20px;
      border-radius: 10px;
      text-align: center;

      .meeting-state {
        padding-bottom: 10px;
        line-height: 40px;
        height: 50px;
        font-size: 36px;
        font-weight: 700;
        color: #67C23A;
        letter-spacing: 0;
      }
      .meeting-time {
        margin-bottom: 10px;
        line-height: 17px;
        height: 17px;
        font-size: 16px;
        color: #000000;
      }
      .meeting-img {
        width: 416px;
        height: 234px;
        max-height: 234px;
        overflow: hidden;
        display: table-cell;
        vertical-align: middle;

        img {
          object-fit: scale-down;
          width: 416px;
          height: 234px;
        }
      }
      .meeting-type-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
        padding: 0 40px;
        line-height: 28px;
        margin-top: 17px;
        font-size: 20px;
        color: #424242;
        letter-spacing: 0;
      }
    }
  }

  .no-data {
    text-align: center;
    font-size: 16px;
    color: #424242;
  }

  /* .load-more {
    width: 1412px;
    line-height: 60px;
    text-align: center;
    margin-top: 20px;
    font-size: 16px;
    border-radius: 6px;
    box-shadow: 0 0 20px 0 rgba(27, 29, 33, 0.08);
  } */
}
</style>
