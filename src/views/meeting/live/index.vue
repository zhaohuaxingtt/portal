<template>
  <div>
    <div class="card" v-if="isLiving">
      <div class="box-title-content">
        <div class="box-title">
          <div class="header-bg"></div>
          <div class="box-title-really">
            <div class="up">
              <span class="common">
                {{ meetingInfo.name }}
              </span>
              <span class="meeting">
                {{ typeObject[meetingInfo.meetingTypeId] }}</span
              >
            </div>
            <div class="bottom">
              <div class="time">
                <div class="img-box">
                  <img src="@/assets/images/time.svg" class="img" />
                </div>
                <!-- <span class="time"> {{ `${begin}~${end}` }}</span> -->
                <span class="time">{{
                  `${meetingInfo.startDate} ${meetingInfo.startTime.substring(
                    0,
                    5
                  )}
                ~
                ${
                  Number(
                    meetingInfo.themens[meetingInfo.themens.length - 1]
                      .plusDayEndTime
                  ) > 0
                    ? meetingInfo.endTime.substring(0, 5) +
                      ` +${
                        Number(meetingInfo.themens[meetingInfo.themens.length - 1]
                          .plusDayEndTime)
                      }`
                    : meetingInfo.endTime.substring(0, 5)
                }`
                }}</span>
              </div>
              <div class="address">
                <!-- <i class="el-icon-location"></i> -->
                <div class="img-box">
                  <img :src="positionMark" class="img" />
                </div>
                <span class="location">{{ meetingInfo.meetingPlace }}</span>
              </div>
            </div>

            <!-- <el-switch
          v-model="value"
          :active-text="switchStatus"
          class="switch-block"
          active-color="#1666ef"
          inactive-color="#1666ef"
        >
        </el-switch> -->
            <div class="turn-button">
              <div class="img-box-list" @click="handleTurnMode" v-if="!value">
                <img src="@/assets/images/list.svg" class="img" />
              </div>
              <div class="img-box-card" @click="handleTurnMode" v-else>
                <img src="@/assets/images/card.svg" class="img" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-area">
        <div v-show="value" class="table-container">
          <theLiveTable
            ref="child"
            :meetingInfo="meetingInfo"
            :resThemeData="resThemeData"
            @refreshList="refreshList"
          ></theLiveTable>
        </div>
        <div v-show="!value" class="card-list">
          <div class="white"></div>
          <div class="card-list-left" v-if="myThemenData.length > 0">
            <!-- <cardBoxNewVersion
            :themen="item"
            :total="resThemeData.length"
            :num="index + 1"
            :startDate="meetingInfo.startDate"
            :endDate="meetingInfo.endDate"
            :meetingName="meetingInfo.name"
          /> -->
            <el-carousel
              indicator-position="outside"
              :autoplay="false"
              trigger="click"
              height="23.75rem"
              :initial-index="myLiveIndex"
              ref="carouselMy"
            >
              <el-carousel-item
                v-for="(item, index) in myThemenData"
                :key="index"
                :name="index"
              >
                <div class="show-single-card">
                  <cardBoxNewVersion
                    :themen="item"
                    :meetingName="meetingInfo.name"
                    class="left-card"
                    :total="myThemenData.length"
                    :index="index + 1"
                  />
                  <!-- <cardBoxNewVersion
                  :themen="item"
                  :startDate="meetingInfo.startDate"
                  :endDate="meetingInfo.endDate"
                  :meetingName="meetingInfo.name"
                  class="left-card"
                  :total="
                    myThemenData.length +
                      (noMyThemenData.length > 0
                        ? noMyThemenData[noMyThemenData.length - 1].length !== 2
                          ? noMyThemenData.length * 2 - 1
                          : noMyThemenData.length * 2
                        : 0)
                  "
                /> -->
                  <div class="my-icon">
                    My
                    <div class="white-triggle"></div>
                    <div class="shadow-triggle"></div>
                  </div>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="card-list-line" v-if="myThemenData.length > 0"></div>
          <div
            class="card-list-container card-list-container-margin"
            v-if="myThemenData.length > 0"
          >
            <el-carousel
              indicator-position="outside"
              :autoplay="false"
              trigger="click"
              height="23.75rem"
              :initial-index="noMyLiveIndex"
              ref="carouselNoMy"
            >
              <el-carousel-item
                v-for="(item, index) in noMyThemenData"
                :key="index"
                :name="index"
              >
                <div class="show-double-card">
                  <cardBoxNewVersion
                    :themen="item[0]"
                    :total="total"
                    :meetingName="meetingInfo.name"
                    class="right-card"
                  />
                  <!-- <cardBoxNewVersion
                  :themen="item[0]"
                  :total="
                    myThemenData.length +
                      (noMyThemenData.length > 0
                        ? noMyThemenData[noMyThemenData.length - 1].length !== 2
                          ? noMyThemenData.length * 2 - 1
                          : noMyThemenData.length * 2
                        : 0)
                  "
                  :startDate="meetingInfo.startDate"
                  :endDate="meetingInfo.endDate"
                  :meetingName="meetingInfo.name"
                  class="right-card"
                /> -->
                  <div
                    v-if="Number(item.length) !== 2"
                    class="right-card-empty"
                  ></div>
                  <cardBoxNewVersion
                    v-else
                    :themen="item[1]"
                    :total="total"
                    :meetingName="meetingInfo.name"
                    class="right-card"
                  />
                  <!-- <cardBoxNewVersion
                  v-else
                  :themen="item[1]"
                  :total="
                    myThemenData.length +
                      (noMyThemenData.length > 0
                        ? noMyThemenData[noMyThemenData.length - 1].length !== 2
                          ? noMyThemenData.length * 2 - 1
                          : noMyThemenData.length * 2
                        : 0)
                  "
                  :startDate="meetingInfo.startDate"
                  :endDate="meetingInfo.endDate"
                  :meetingName="meetingInfo.name"
                  class="right-card"
                /> -->
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="card-list-container card-list-container-no" v-else>
            <el-carousel
              indicator-position="outside"
              :autoplay="false"
              trigger="click"
              height="23.75rem"
              :initial-index="noMyLiveIndex"
              ref="carouselNoMy"
            >
              <el-carousel-item
                v-for="(item, index) in noMyThemenData"
                :key="index"
                :name="index"
              >
                <div class="show-double-card">
                  <cardBoxNewVersion
                    :themen="item[0]"
                    :total="noMyTotal"
                    :meetingName="meetingInfo.name"
                    class="right-card"
                  />
                  <div v-if="!item[1]" class="right-card-empty"></div>
                  <cardBoxNewVersion
                    v-else
                    :themen="item[1]"
                    :total="noMyTotal"
                    :meetingName="meetingInfo.name"
                    class="right-card"
                  />
                  <div v-if="!item[2]" class="right-card-empty"></div>
                  <cardBoxNewVersion
                    v-else
                    :themen="item[2]"
                    :total="noMyTotal"
                    :meetingName="meetingInfo.name"
                    class="right-card"
                  />
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="white"></div>
        </div>
      </div>
      <div class="bootom notice">
        {{ $t('MT_HUIYIZHIBOMEIWUMIAOSHUAXIN') }}
      </div>
    </div>
    <div v-else class="no-live">{{ $t('MT_ZANWUZHIBOHUIYI') }}</div>
    <my-topics
      ref="childTopic"
      :meetingInfo="meetingInfo"
      :meetingId="meetingInfo.id"
      @getMyTopics="getMyTopics"
      :curMeetingId="curMeetingId"
    ></my-topics>
    <dataDownload :meetingTypeId="meetingTypeId"></dataDownload>
  </div>
</template>

<script>
import cardBoxNewVersion from './components/cardBoxNewVersion.vue'
import theLiveTable from './components/theLiveTable.vue'
import { findThemenById } from '@/api/meeting/details'
import { getMettingType } from '@/api/meeting/type'
import { iMessage } from 'rise'
import dayjs from 'dayjs'
// import myTopics from "../../nearMeeting/components/myTopics/index.vue";
import myTopics from './components/mytopic.vue'
import dataDownload from './components/dataDownload.vue'
import positionMark from '@/assets/images/position-mark.svg'
export default {
  components: {
    cardBoxNewVersion,
    theLiveTable,
    myTopics,
    dataDownload
    // swiper,
  },
  data() {
    return {
      meetingId: this.$route.query.meetingInfoId,
      positionMark,
      curMeetingId: '',
      fresh: false,
      myLiveIndex: 0,
      noMyLiveIndex: 0,
      currentUserId: '',
      value: false,
      // switchStatus: "列表",
      meetingInfo: {},
      typeObject: {},
      resThemeData: [],
      // oldIndex: 0,
      // curIndex: 0,
      isLiving: false,
      // refresh: false,
      myThemenData: [],
      noMyThemenData: [],
      meetingTypeId: this.$route.query.id,
      total: 0,
      begin: '',
      end: '',
      noMyTotal: 0
    }
  },
  // watch: {
  //   myThemenData: {
  //     handler(v) {
  //       console.log("哈哈哈哈啊哈哈哈",v);
  //     },
  //     immediate: true,
  //     deep: true,
  //   },
  // },
  mounted() {
    this.currentUserId = Number(sessionStorage.getItem('userId'))
    this.getMeetingTypeObject()
    // this.refresh = false;
    this.getTableData()
  },
  methods: {
    handleTurnMode() {
      this.value = !this.value
    },
    setActiveItem(name) {
      console.log(name)
    },
    //取俩个数组的前6后6
    // assignArr(beforeArr, afterArr, isMy) {
    //   let arr = [];
    //   if (isMy) {
    //     if (beforeArr.length <= 6) {
    //       arr = [...beforeArr, ...afterArr].slice(0, 12);
    //     }
    //     if (beforeArr.length > 6 && afterArr.length >= 6) {
    //       let before = [];
    //       let after = [];
    //       before = beforeArr.slice(-6);
    //       after = afterArr.slice(0, 6);
    //       arr = [...before, ...after];
    //     }
    //     if (beforeArr.length > 6 && afterArr.length < 6) {
    //       arr = [...beforeArr, ...afterArr].slice(-12);
    //     }
    //   } else {
    //     if (beforeArr.length <= 5) {
    //       arr = [...beforeArr, ...afterArr].slice(0, 12);
    //     }
    //     if (beforeArr.length > 5 && afterArr.length >= 7) {
    //       let before = [];
    //       let after = [];
    //       before = beforeArr.slice(-5);
    //       after = afterArr.slice(0, 7);
    //       arr = [...before, ...after];
    //     }
    //     if (beforeArr.length > 5 && afterArr.length < 7) {
    //       arr = [...beforeArr, ...afterArr].slice(-12);
    //     }
    //   }
    //   return arr;
    // },
    //新版本
    assignArr(beforeArr, afterArr) {
      let arr = []
      if (beforeArr.length <= 1) {
        arr = [...beforeArr, ...afterArr].slice(0, 6)
      }
      if (beforeArr.length > 1 && afterArr.length >= 5) {
        let before = []
        let after = []
        before = beforeArr.slice(-1)
        after = afterArr.slice(0, 5)
        arr = [...before, ...after]
      }
      if (beforeArr.length > 1 && afterArr.length < 5) {
        arr = [...beforeArr, ...afterArr].slice(-6)
      }
      return arr
    },
    // 一维数组转二维 数组
    arrTrans(num, arr) {
      const newArr = []
      while (arr.length > 0) {
        newArr.push(arr.splice(0, num))
      }
      return newArr
    },
    // 点击直接选择某项卡片
    refreshList(bol, obj) {
      this.$refs.childTopic
        .queryMeeting()
        .then(() => {
          iMessage.success(bol ? '取消成功' : '关注成功')
          this.$refs.childTopic.query().then(() => {
            obj.following = false
          })
        })
        .catch(() => {
          obj.following = false
          iMessage.err(bol ? '取消成功' : '关注成功')
        })
    },
    getMyTopics(themens) {
      this.generateTime()
      this.resThemeData = [...themens]
      if (this.resThemeData.length > 0) {
        this.meetingId = this.resThemeData[0].meetingId
      }
      if (Number(this.meetingId) === -1) {
        const liveItem = this.isHaveLiveTheme()

        if (liveItem) {
          // this.$route.push({
          //   path: "/meeting/live",
          //   query: {
          //     id: this.meetingTypeId,
          //     meetingInfoId: liveItem.meetingId,
          //   },
          // });
          this.queryMeetingInfoById(liveItem.meetingId)
          this.curMeetingId = liveItem.meetingId
        }
      } else {
        const liveItem = this.isHaveLiveTheme()
        if (!liveItem) {
          // this.$route.push({f
          //   path: "/meeting/live",
          //   query: {
          //     id: this.meetingTypeId,
          //     meetingInfoId: -1,
          //   },
          // });
          this.curMeetingId = -1
          this.queryMeetingInfoById(-1)
        } else {
          this.queryMeetingInfoById(liveItem.meetingId)
        }
      }
      // let curIndex = this.getCurrentLiveIndex();
      // let refDom = this.$refs.swiperRef;
      // if (this.resThemeData.length > 2) {
      //   this.translateX(refDom, curIndex);
      // }
      // this.curIndex = curIndex;
    },
    handlePreClick() {
      if (this.curIndex > 1) {
        this.curIndex--
      }
      if (this.resThemeData.length > 2) {
        this.translateX(this.$refs.swiperRef, this.curIndex)
      }
    },
    handleNextClick() {
      if (this.curIndex < this.resThemeData.length - 2) {
        this.curIndex++
      }
      if (this.resThemeData.length > 2) {
        this.translateX(this.$refs.swiperRef, this.curIndex)
      }
    },
    // getCurrentLiveIndex() {
    //   let liveIndex = -10;
    //   this.resThemeData.forEach((item, index) => {
    //     if (item.state === "02") {
    //       liveIndex = index;
    //     }
    //   });
    //   if (liveIndex === 0) {
    //     liveIndex = 1;
    //   }
    //   if (liveIndex === this.resThemeData.length - 1) {
    //     liveIndex = this.resThemeData.length - 2;
    //   }
    //   this.isLiving = true;
    //   if (liveIndex === -10) {
    //     liveIndex = 1;
    //     this.isLiving = false;
    //   }
    //   return liveIndex;
    // },

    //判断当前 是否 有直播的议题
    isHaveLiveTheme() {
      return this.resThemeData.find((item) => {
        return item.state === '02'
      })
    },
    //判断一个议题是否与我有关
    isThemeBelongMy(liveItem) {
      return (
        Number(liveItem.createBy) === this.currentUserId ||
        liveItem.follow ||
        this.isTheyHaveMy(liveItem)
      )
    },
    isTheyHaveMy(item) {
      const presenterId = item.presenterId ? item.presenterId.split(',') : []
      const supporterId = item.supporterId ? item.supporterId.split(',') : []
      const currentUserIdStr = this.currentUserId.toString()
      if (
        presenterId.includes(currentUserIdStr) ||
        supporterId.includes(currentUserIdStr)
      ) {
        return true
      }
      return false
    },
    generateTime() {
      const startDate = this.meetingInfo.startDate
      const startTime = this.meetingInfo.startTime
      const endDate = this.meetingInfo.endDate
      const endTime = this.meetingInfo.endTime
      this.begin = dayjs(new Date(`${startDate} ${startTime}`)).format(
        'YYYY/MM/DD HH:mm:ss'
      )
      this.end = dayjs(new Date(`${endDate} ${endTime}`)).format('HH:mm:ss')
    },
    getMeetingTypeObject() {
      let param = {
        pageSize: 1000,
        pageNum: 1
      }
      getMettingType(param).then((res) => {
        this.meetingTypeList = res.data
        this.setTypeObj(res.data)
        // this.$emit("setTypeObj", res.data);
      })
    },
    setTypeObj(e) {
      let typeObj = {}
      e.forEach((item) => {
        typeObj[item.id] = item.name
      })
      this.typeObject = typeObj
    },
    getTableData() {
      this.queryMeetingInfoById(this.meetingId)
    },
    async queryMeetingInfoById(id) {
      if (Number(id) === -1) {
        this.isLiving = false
        return
      }
      const data = {
        id
      }
      const _this = this
      const res = await findThemenById(data)
      _this.meetingInfo = res
      return res
    }
    //移动
    // translateX(refDom, curIndex) {
    //   if (refDom) {
    //     refDom.style.transform = `translateX(${(1 - curIndex) * 35}rem)`;
    //   }
    // },
  },
  watch: {
    isLiving: {
      handler() {
        if (this.meetingId == -1) {
          this.isLiving = false
        }
        this.meetingInfo = {}
        const liveItem = this.isHaveLiveTheme()
        if (liveItem) {
          this.queryMeetingInfoById(liveItem.meetingId).then(() => {
            this.generateTime()
          })
        }
      },
      immediate: true
    },
    // value(val) {
    //   if (val) {
    //     this.switchStatus = "卡片";
    //     return;
    //   }
    //   this.switchStatus = "列表";
    // },
    // resThemeData: {
    //   handler(resData) {
    //     this.fresh = !this.fresh;
    //     let liveItem = this.isHaveLiveTheme();
    //     let bolMy = true;
    //     let bolNoMy = true;
    //     let whereArr;
    //     let myArr = [];
    //     let noMyArr = [];
    //     let beforeSix = [];
    //     let afterSix = [];
    //     if (liveItem) {
    //       this.isLiving = true;
    //     } else {
    //       this.isLiving = false;
    //       return;
    //     }
    //     if (
    //       Number(liveItem.createBy) === this.currentUserId ||
    //       liveItem.follow ||
    //       this.isTheyHaveMy(liveItem)
    //     ) {
    //       whereArr = "my";
    //     }
    //     resData.forEach((item, index) => {
    //       let bol =
    //         Number(item.createBy) === this.currentUserId ||
    //         item.follow ||
    //         this.isTheyHaveMy(item);
    //       if (bol) {
    //         if (item.state === "02") {
    //           bolMy = false;
    //         }
    //         myArr.push({ ...item, itemNo: index + 1, isMy: true });
    //       } else {
    //         if (item.state === "02") {
    //           bolNoMy = false;
    //         }
    //         if (
    //           (whereArr === "my" && bolMy) ||
    //           (whereArr !== "my" && bolNoMy)
    //         ) {
    //           beforeSix.push({ ...item, itemNo: index + 1, isMy: false });
    //         }
    //         if (
    //           (whereArr === "my" && !bolMy) ||
    //           (whereArr !== "my" && !bolNoMy)
    //         ) {
    //           afterSix.push({ ...item, itemNo: index + 1, isMy: false });
    //         }
    //       }
    //     });
    //     this.myThemenData = myArr;
    //     noMyArr = this.assignArr(beforeSix, afterSix, whereArr === "my");
    //     const newTypeNoMyArr = this.arrTrans(2, [...noMyArr]);
    //     this.noMyThemenData = newTypeNoMyArr;
    //   },
    // },
    resThemeData: {
      handler(resData) {
        this.total = resData ? resData.length : 0
        this.fresh = !this.fresh
        let liveItem = this.isHaveLiveTheme()
        let bolMy = true
        let bolNoMy = true
        // let whereArr;
        let numType = 2
        let myArr = []
        let noMyArr = []
        let beforeSix = []
        let afterSix = []
        if (liveItem) {
          this.isLiving = true
        } else {
          this.isLiving = false

          return
        }
        // if (
        //   Number(liveItem.createBy) === this.currentUserId ||
        //   liveItem.follow ||
        //   this.isTheyHaveMy(liveItem)
        // ) {
        //   whereArr = "my"; //直播的那个议题是与我相关的
        // }
        resData.forEach((item, index) => {
          let bol =
            Number(item.createBy) === this.currentUserId ||
            item.follow ||
            this.isTheyHaveMy(item)
          if (bol) {
            if (item.state === '02') {
              bolMy = false //狙击直播的那个议题
            }
            myArr.push({ ...item, itemNo: index + 1, isMy: bol })
          } else {
            if (item.state === '02') {
              bolNoMy = false //狙击直播的那个议题
            }
          }
          if (bolMy && bolNoMy) {
            beforeSix.push({ ...item, itemNo: index + 1, isMy: bol })
          }
          if (!bolMy || !bolNoMy) {
            afterSix.push({ ...item, itemNo: index + 1, isMy: bol })
          }
        })
        this.myThemenData = myArr
        noMyArr = this.assignArr(beforeSix, afterSix)
        if (this.myThemenData.length === 0) {
          numType = 3
          // noMyArr = [...resData];
          this.noMyTotal = this.total
        }
        const newTypeNoMyArr = this.arrTrans(numType, [...noMyArr])
        this.noMyThemenData = newTypeNoMyArr
      },
      immediate: true
    },
    myThemenData: {
      handler(myData) {
        let bol = true
        let liveIndex = 0
        for (let index = 0; index <= myData.length - 1; index++) {
          if (myData[index].state === '01' && bol) {
            liveIndex = index
            bol = false
            continue
          }
          if (myData[index].state === '02') {
            liveIndex = index
            break
          }
          liveIndex = myData.length - 1
        }
        this.myLiveIndex = liveIndex
      },
      deep: true,
      immediate: true
    },
    noMyThemenData: {
      handler(myData) {
        let liveIndex = 0
        aaa: for (let index = 0; index <= myData.length - 1; index++) {
          for (
            let innerIndex = 0;
            innerIndex <= myData[index].length - 1;
            innerIndex++
          ) {
            if (
              myData[index][innerIndex].state === '02' ||
              myData[index][innerIndex].state === '01'
            ) {
              liveIndex = index
              break aaa
            }
          }

          liveIndex = myData.length - 1
        }
        this.noMyLiveIndex = liveIndex
      }
      // deep: true,
      // immediate: true,
    },
    fresh: {
      handler() {
        this.$refs.carouselMy &&
          this.$refs.carouselMy.setActiveItem(this.myLiveIndex)
        this.$refs.carouselNoMy &&
          this.$refs.carouselNoMy.setActiveItem(this.noMyLiveIndex)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .routerpage {
  overflow-y: auto;
}

.table-container {
  background-color: #fff;
  width: 1740px;
  padding: 0 40px 30px 40px;
}
.notice {
  height: 12px !important;
  line-height: 12px !important;
  margin-top: 8px;
}
.no-live {
  width: 1740px;
  height: 105px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0px 0px 20px rgba(27, 29, 33, 0.08);
  line-height: 105px;
  font-size: 16px;
  font-weight: 400;
  color: #999999;
  text-align: center;
}
.swiper {
  display: flex;
  justify-content: flex-start;
  transition: 0.5s;
  position: relative;
  .slide {
    width: 560px;
    /* height: 427px; */
    flex-shrink: 0;
    flex-grow: 0 !important;
    z-index: 1;
    transition: 0.5s;
    margin-left: 20px;
  }
}

.my-themen {
  height: 97px;
  line-height: 97px;
  font-size: 20px;
  color: #000;
}
.turn-button {
  width: 24px;
  height: 24px;
  position: absolute;
  right: 0;
  top: 0;
  transform: translate(-20px, 20px);
  cursor: pointer;
  .img-box {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
/* ::v-deep .switch-block {
  position: absolute;
  right: 33px;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
  font-size: 16px;
  .el-switch__core {
    width: 100px !important;
    height: 36px;
    border-radius: 36px;
  }
  .el-switch__label {
    position: absolute;
    transform: translateX(35px);
    z-index: 1;
    color: #fff;
    font-size: 16px;
  }
  .el-switch__core::after {
    width: 30px;
    height: 30px;
    z-index: 10;
    transform: translateY(1px);
  }
} */
::v-deep .is-checked {
  .el-switch__core::after {
    transform: translate(-13px, 1px);
  }
  .el-switch__label {
    position: absolute;
    transform: translateX(20px);
    z-index: 1;
    color: #fff;
    font-size: 16px;
  }
}
.card {
  width: 1740px;
  overflow: hidden;
  .box-title-content {
    padding: 40px;
    background-color: #fff;
  }
  .box-title {
    position: relative;
    width: 100%;
    height: 140px;
    /* margin-bottom: 40px; */
    .box-title-really {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      .up {
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 40px;
        .meeting {
          height: 35px;
          font-size: 16px;
          /* font-family: Arial; */
          /* font-weight: bold; */
          /* color: #5f6f8f; */
          color: #000;
          line-height: 35px;
          white-space: nowrap;
          text-align: center;
          opacity: 1;
        }
        .common {
          margin-right: 20px;
          padding: 0 20px;
          color: #1763f7;
          font-size: 16px;
          /* width: 150px; */
          height: 35px;
          line-height: 35px;
          text-align: center;
          background-color: #fff;
          box-shadow: 0 0 0.5rem 0 rgb(124 124 124 / 16%);
          border-radius: 5px;
        }
      }
      .bottom {
        color: #000;
        height: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        /* font-family: Arial; */
        font-weight: 400;
        line-height: 23px;
        color: #5f6f8f;
        opacity: 1;
        margin-top: 25px;
        .address {
          margin-left: 40px;
          display: flex;
          align-items: center;
          font-size: 16px;
          color: #000;
          .img-box {
            position: relative;
            width: 20px;
            height: 20px;
            .img {
              position: absolute;
              width: 100%;
              height: 100%;
              object-fit: contain;
            }
          }
        }
        .time {
          display: flex;
          align-items: center;
          margin-left: 14px;
          font-size: 16px;
          color: #000;
          .img-box {
            position: relative;
            width: 20px;
            height: 20px;
            .img {
              position: absolute;
              width: 100%;
              height: 100%;
              object-fit: contain;
            }
          }
        }
        .location {
          margin-left: 10px;
        }
      }
    }
    .header-bg {
      position: absolute;
      background-color: rgba(22, 96, 241, 0.09);
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  .card-list {
    position: relative;
    display: flex;
    /* .white-box-shadow {
      background-color: rgb(248, 249, 250);
      height: 380px;
      width: 10px;
    } */
    .white {
      background-color: #fff;
      height: 380px;
      width: 40px;
    }
    .card-list-left {
      z-index: 10;
      width: 564px;
      margin-right: 16px;
      .show-single-card {
        position: relative;
        padding-right: 4px;
        .my-icon {
          z-index: 100;
          top: 6px;
          right: -4px;
          position: absolute;
          background-color: #cedeff;
          width: 60px;
          height: 28px;
          color: #2d539bff;
          font-size: 16px;
          text-align: center;
          line-height: 28px;
          /* font-family: Arial; */
          font-weight: bold;
        }
        .white-triggle {
          position: absolute;
          left: -10px;
          top: 0;
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-top: 14px solid #cedeff;
          border-bottom: 14px solid #cedeff;
        }
        .shadow-triggle {
          position: absolute;
          left: 52px;
          width: 0;
          height: 0;
          border-top: 4px solid rgba(109, 134, 185, 1);
          border-right: 4px solid transparent;
        }
      }
    }

    .card-list-line {
      width: 0;
      height: 374px;
      border: 1px solid #d0d4d9;
      margin-top: 3px;
      background-color: #d0d4d9;
    }
    .card-list-container {
      z-index: 10;
      position: relative;
      /* padding-bottom: 40px; */
      overflow: hidden;
      width: 1160px;
      /* height: 420px; */
      /* margin-left: 20px; */
      .show-double-card {
        display: flex;
        .right-card:nth-child(1) {
          flex: 1;
        }
        .right-card:nth-child(2) {
          flex: 1;
          margin-left: 20px;
        }
        .right-card:nth-child(3) {
          flex: 1;
          margin-left: 20px;
        }
        .right-card-empty {
          margin-left: 20px;
          /* width: 560px; */
          flex: 1;
        }
      }
    }
    .card-list-container-no {
      width: 100%;
    }
    .card-list-container-margin {
      margin-left: 20px;
    }
  }
  .bootom {
    height: 75px;
    text-align: right;
    color: #999;
    font-size: 12px;
    line-height: 75px;
  }
}
::v-deep .el-carousel__indicators--outside {
  height: 60px;
  line-height: 60px;
}
::v-deep .el-carousel__indicators--outside {
  height: 26px;
  line-height: 42px;
}
::v-deep .el-carousel--horizontal {
  overflow: hidden;
}
::v-deep .el-carousel__indicator--horizontal {
  .el-carousel__button {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #cad9f8;
  }
}
::v-deep .is-active {
  .el-carousel__button {
    height: 10px;
    border-radius: 5px;
    width: 40px;
    background-color: #1660f1;
  }
}
::v-deep .el-carousel__arrow {
  width: 24px;
  height: 24px;
  border-radius: 12px;
  border: 1px solid #8f8f90;
  background-color: #fff;
  box-shadow: 0px 0px 20px rgba(27, 29, 33, 0.08);
}
::v-deep .el-carousel__arrow:nth-of-type(1) {
  left: 0;
}
::v-deep .el-carousel__arrow:nth-of-type(2) {
  right: 4px;
}
::v-deep .el-carousel__arrow--left {
  color: #8f8f90;
}
::v-deep .el-carousel__arrow--right {
  color: #8f8f90;
}
</style>
