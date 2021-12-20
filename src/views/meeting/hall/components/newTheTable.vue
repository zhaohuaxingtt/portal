<template>
  <div class="container">
    <div class="header">
      <div class="img-box">
        <img :src="meetingHall" />
      </div>
    </div>
    <div v-loading="loading" style="min-height: 200px">
      <ul class="content-list" v-if="tableData.length > 0">
        <li
          class="content"
          v-for="item in tableData"
          :key="item.id"
          @click="goNearFuture(item)"
        >
          <div
            class="mantle"
            v-if="
              item.state == '02' || item.state == '03' || item.state == '04'
            "
          ></div>
          <div class="meeting-img-box">
            <div class="title">
              <p
                class="meeting-time"
                v-if="item.state == '03' || item.state == '02'"
              >
                {{ 'Next Meeting On ' + item.startDate }}
              </p>
              <div class="meeting-state" v-else>
                <div v-if="item.state == '04'" class="live">
                  <div class="big"></div>
                  <div class="middle"></div>
                  <div class="small"></div>
                </div>
                <div v-if="item.state == '04'">LIVE!</div>
              </div>
            </div>
            <div class="meeting-img-mini-box">
              <img :src="item.coverImage" />
            </div>
          </div>
          <div class="footer">{{ item.name }}</div>
        </li>
      </ul>
      <p v-else class="no-data">{{$t('您尚无该类型会议的查看权限')}}</p>
    </div>
  </div>
</template>
<script>
import { getMyMettingList, findByMeetingAll } from '@/api/meeting/home'
import { getMettingType } from '@/api/meeting/type'
import meetingHall from '@/assets/images/meeting-hall.jpg'
export default {
  props: {
    value: {
      type: Number,
      default: () => {
        return 1
      }
    }
  },
  components: {},
  data() {
    return {
      totalData: [],
      tableData: [],
      typeListObj: {}, // 会议类型对象
      pageNum: 1,
      pageSize: 6,
      loading: false,
      meetingHall
    }
  },
  computed: {
    handleData() {
      return {
        value: this.value,
        totalData: this.totalData
      }
    }
  },
  watch: {
    tableData: {
      handler(table) {
        console.log(table)
      }
    },
    handleData: {
      handler(data) {
        switch (data.value) {
          case 1:
            this.tableData = this.getTableDate('01')
            break
          case 2:
            this.tableData = this.getTableDate('02')
            break
          case 3:
            this.tableData = this.getTableDate('03')
        }
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    // this.getAllSelectList();
    this.query2()
  },
  methods: {
    getTableDate(category) {
      console.log(this.totalData)
      return this.totalData.filter((item) => {
        return item.category === category
      })
    },
    // 获取会议类型列表
    getAllSelectList() {
      let param = {
        pageSize: 1000,
        pageNum: 1
      }
      getMettingType(param).then((res) => {
        this.meetingTypeList = res.data
        let typeListObj = {}
        res.data &&
          res.data.forEach((item) => {
            typeListObj[item.id.toString()] = {
              name: item.name,
              arr: []
            }
          })
        this.typeListObj = typeListObj
        this.query()
      })
    },

    // 获取用户会议
    query() {
      let param = {
        pageNum: 1,
        pageSize: 9999
      }
      this.loading = true
      getMyMettingList(param)
        .then((res) => {
          let dataAll = res.data.filter((item) => {
            if (
              item.state == '03' ||
              item.state == '04' ||
              item.state == '05' ||
              item.state == '06'
            ) {
              return item
            }
          })
          // let typeObj = JSON.parse(JSON.stringify(this.typeObj));
          let tableData = []
          dataAll = dataAll.sort(this.sort())
          dataAll.forEach((item) => {
            let aaa = tableData.filter((item2) => {
              return item2.id == item.meetingTypeId
            })
            if (aaa.length == 0) {
              tableData.push({
                id: item.meetingTypeId,
                arr: [item]
              })
            } else {
              tableData.forEach((tableItem) => {
                if (tableItem.id == item.meetingTypeId) {
                  tableItem.arr.push(item)
                }
              })
            }
          })
          this.tableData = tableData
        })
        .finally(() => (this.loading = false))
    },
    query2() {
      let param = {
        pageSize: 999,
        pageNum: 1
      }
      this.loading = true
      findByMeetingAll(param)
        .then((res) => {
          let dataUnuse = []
          res.forEach((item) => {
            let hasItem = dataUnuse.filter((item2) => {
              return item2.id == item.id
            })
            if (hasItem.length == 0) {
              dataUnuse.push(item)
            } else {
              // if (
              //   (hasItem[0].state === "05" || hasItem[0].state === "06") &&
              //   (item.state === "03" || item.state === "04")
              // ) {
              //   dataUnuse = dataUnuse.filter((it) => {
              //     return it.id !== hasItem[0].id;
              //   });
              //   dataUnuse.push(item);
              // }
              // if (item.state === "04" && hasItem[0].state !== "04") {
              //   dataUnuse = dataUnuse.filter((it) => {
              //     return it.id !== hasItem[0].id;
              //   });
              //   dataUnuse.push(item);
              // }
              if (item.state === '04' && hasItem[0].state !== '04') {
                dataUnuse = dataUnuse.filter((it) => {
                  return it.id !== hasItem[0].id
                })
                dataUnuse.push(item)
              }
            }
          })
          // this.tableData = dataUnuse;
          this.totalData = dataUnuse
        })
        .finally(() => (this.loading = false))
    },

    // 排序
    sort() {
      return (a, b) => {
        let start1 = new Date(a.startDate + ' ' + a.startTime).valueOf()
        let start2 = new Date(b.startDate + ' ' + b.startTime).valueOf()
        return start1 - start2
      }
    },

    goNearFuture(e) {
      // console.log(e,'这里是一般采购里卡片的点击事件');
      let url = '/meeting/near-meeting'
      if (e.state == '04') {
        url = '/meeting/live'
      }
      //gp管理大厅
      // if (e.state == '04') {
      //   url = '/meeting/managementHall'
      // }
      this.$router.push({
        path: url,
        query: {
          id: e.id,
          meetingInfoId: e.meetingId ? e.meetingId : -1
        }
      })
    }

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
  }
}
</script>
<style scoped lang="scss">
.container {
  width: 1740px;
  .header {
    /* background-color: pink; */
    width: 100%;
    /* border: 1px solid rgba(112, 112, 112, 1); */
    .img-box {
      width: 100%;
      height: 400px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .content-list {
    width: 100%;
    height: 300px;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    .content {
      position: relative;
      cursor: pointer;
      width: 420px;
      border-radius: 10px;
      box-shadow: 0px 0px 20px rgba(27, 29, 33, 0.08);
      overflow: hidden;
      margin-top: 20px;
      margin-left: 20px;
      .mantle {
        z-index: 1;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 50px;
        background: linear-gradient(
          180deg,
          #000000 0%,
          rgba(84, 84, 84, 0) 100%
        );
        box-shadow: 0px 0px 20px rgba(27, 29, 33, 0.08);
        opacity: 1;
        border-radius: 10px 10px 0px 0px;
      }
      .meeting-img-box {
        width: 100%;
        height: 236px;
        position: relative;
        .meeting-img-mini-box {
          /* background-color: blueviolet; */
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          img {
            width: 420px;
            height: 236px;
            object-fit: scale-down;
          }
        }
        .title {
          /* background-color: brown; */
          position: absolute;
          top: 10px;
          left: 20px;
          z-index: 10;
          width: 100%;
          height: 22px;
          .meeting-state {
            display: flex;
            height: 22px;
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 500;
            line-height: 22px;
            color: #ffffff;
            align-items: center;
            .live {
              display: flex;
              align-items: flex-end;
              .big {
                width: 2px;
                height: 12px;
                background: #ffffff;
                border-radius: 1px;
                margin-right: 2px;
              }
              .middle {
                width: 2px;
                height: 6px;
                background: #ffffff;
                border-radius: 1px;
                margin-right: 2px;
              }
              .small {
                width: 2px;
                height: 3px;
                background: #ffffff;
                border-radius: 1px;
                margin-right: 5px;
              }
            }
          }
          .meeting-time {
            height: 22px;
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 500;
            line-height: 22px;
            color: #ffffff;
          }
        }
      }
      .footer {
        height: 64px;
        text-align: center;
        line-height: 64px;
        color: rgba(27, 29, 33, 1);
        font-size: 18px;
      }
    }
    .content:nth-of-type(4n-3) {
      margin-left: 0px;
    }
  }
}
</style>
