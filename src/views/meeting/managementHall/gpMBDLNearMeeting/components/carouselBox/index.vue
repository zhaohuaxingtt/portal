<template>
  <div class="card">
    <div class="box-title">
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
    <div v-if="value">
      <theSearch
        @searchTableList="handleSearch"
        @handleSearchReset="handleSearchReset"
        @setTypeObj="setTypeObj"
        :form="form"
      />
      <theLiveTable
        :data="dataTable"
        :total="data.length"
        :pageSize="pageSize"
        :pageNum="pageNum"
        @handleCurrentChange="handleCurrentChange"
      />
    </div>
    <div v-else>
      <div v-if="data && data.length > 0" class="card-list-container">
        <!-- <div class="right-icon" @click="handlePreClick">&lt;</div>
        <div class="left-icon" @click="handleNextClick">&gt;</div>
        <div class="swiper" ref="swiperRef">
          <div class="slide" v-for="(item, index) of data" :key="index">
            <cardBox :themen="item" :total="data.length" :num="index + 1" />
          </div>
        </div> -->
        <el-carousel
          indicator-position="outside"
          :autoplay="false"
          trigger="click"
          height="25rem"
          ref="carouselNoMy"
          :initial-index="initIndex"
        >
          <el-carousel-item
            v-for="(item, index) of newTypeData"
            :key="index"
            :name="index"
          >
            <div class="show-double-card">
              <cardBoxNewVersion
                :themen="item[0]"
                :total="data.length"
                :num="index + 1"
                class="right-card"
              />

              <cardBoxNewVersion
                v-if="item.length >= 2"
                :themen="item[1]"
                :total="data.length"
                :num="index + 1"
                class="right-card"
              />
              <div v-else class="empty"></div>
              <cardBoxNewVersion
                v-if="item.length === 3"
                :themen="item[2]"
                :total="data.length"
                :num="index + 1"
                class="right-card"
              />
              <div v-else class="empty"></div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <p v-else class="no-data">{{$t('MT_ZANWUHUIYI')}}</p>
    </div>
  </div>
</template>

<script>
import cardBoxNewVersion from "./cardBoxNewVersion.vue";
import theLiveTable from "./theLiveTable.vue";
import theSearch from "./theSearch.vue";
import { findMyMeetings } from "@/api/meeting/myMeeting";
import { datestring } from "@/utils/utils.js";

export default {
  components: {
    cardBoxNewVersion,
    // iButton,
    theLiveTable,
    theSearch,
  },
  data() {
    return {
      meetingTypeId: "",
      initIndex: 0,
      newTypeData: [[]],
      value: false,
      switchStatus: "列表",
      data: [],
      dataTable: [],
      typeObj: {},
      form: {
        startDateBegin: datestring(
          new Date(new Date().valueOf()) - 24 * 60 * 60 * 1000 * 13
        ),
        startDateEnd: datestring(
          Number(new Date(new Date().valueOf())) + 24 * 60 * 60 * 1000 * 6
        ),
      },
      pageSize: 10,
      pageNum: 1,
      curIndex: 1,
    };
  },
  mounted() {
    this.meetingTypeId = this.$route.query.id;
    this.query();
  },
  methods: {
    handleTurnMode() {
      this.value = !this.value;
    },
    //初始化定位
    // handleInitPosition() {

    // },
    // 一维数组转二维 数组
    arrTrans(num, arr) {
      const newArr = [];
      while (arr.length > 0) {
        newArr.push(arr.splice(0, num));
      }
      return newArr;
    },
    // 获取详细信息
    query() {
      let param = {
        // ...this.form,
        name: this.form.name,
        meetingTypeId: this.meetingTypeId,
        startDateBegin: this.form.startDateBegin,
        startDateEnd: this.form.startDateEnd,
        states: this.form.states
          ? [this.form.states]
          : ["02", "03", "04", "05", "06"],
        receiver: this.form.receiverId,
        pageNum: 1,
        pageSize: 999,
      };
      findMyMeetings(param).then((res) => {
        this.data = res.data;
        this.dataTable = res.data.slice(
          (this.pageNum - 1) * this.pageSize,
          this.pageNum * this.pageSize
        );
        this.initMoveCard();
      });
    },

    // 搜索
    handleSearch() {
      this.pageNum = 1;
      this.query();
    },

    // 重置
    handleSearchReset() {
      this.form = {
        startDateBegin: datestring(
          new Date(new Date().valueOf()) - 24 * 60 * 60 * 1000 * 13
        ),
        startDateEnd: datestring(
          Number(new Date(new Date().valueOf())) + 24 * 60 * 60 * 1000 * 6
        ),
      };
      this.pageNum = 1;
      this.query();
    },

    // 页码切换
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum;
      this.currentChangePage(this.data, this.pageNum);
    },
    // 分页方法
    currentChangePage(data, pageNum) {
      let from = (pageNum - 1) * this.pageSize;
      let to = pageNum * this.pageSize;
      this.dataTable = data.slice(from, to);
    },
    // 点击上一个轮播图
    handlePreClick() {
      if (this.data.length > 3) {
        if (this.curIndex > 1) {
          this.curIndex--;
        }
        this.translateX(this.$refs.swiperRef, this.curIndex);
      }
    },
    // 点击下一个轮播图
    handleNextClick() {
      if (this.data.length > 3) {
        if (this.curIndex < this.data.length - 2) {
          this.curIndex++;
        }
        this.translateX(this.$refs.swiperRef, this.curIndex);
      }
    },
    //移动
    // translateX(refDom, curIndex) {
    //   console.log('curIndex', curIndex);
    //   if (refDom && curIndex < 2 && curIndex != this.data.length - 1) {
    //     refDom.style.transform = `translateX(${(0 - curIndex) * 35.625}rem)`;
    //   } else if (refDom && curIndex == this.data.length - 1) {
    //     refDom.style.transform = `translateX(${(1 - curIndex) * 35.625}rem)`;
    //   }
    // },
    //移动
    translateX(refDom, curIndex) {
      if (
        refDom &&
        (curIndex == 1 || (curIndex == 2 && this.data.length == 3))
      ) {
        // 初始化展示
        refDom.style.transform = `translateX(0)`;
      } else if (refDom && curIndex > 1 && curIndex != this.data.length - 1) {
        refDom.style.transform = `translateX(${(1 - curIndex) * 35.625}rem)`;
      }
    },
    // 初始化移动至高亮项
    initMoveCard() {
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].state == "04") {
          if (i >= this.data.length - 2) {
            this.curIndex = this.data.length - 2;
          } else if (i == 0) {
            this.curIndex = 1;
          } else {
            this.curIndex = i;
          }
          setTimeout(() => {
            this.translateX(this.$refs.swiperRef, i);
          }, 4);
          return;
        }
      }
    },
  },
  watch: {
    value(val) {
      if (val) {
        this.switchStatus = "卡片";
        return;
      }
      this.switchStatus = "列表";
      this.curIndex = 1;
      this.initMoveCard();
    },
    data: {
      handler(val) {
        let curIdnex = 0;
        let bol = true;
        let live = false;
        this.newTypeData = this.arrTrans(3, [...val]);
        aaa: for (let index = 0; index <= this.newTypeData.length; index++) {
          if (this.newTypeData[index]) {
            for (let i = 0; i < this.newTypeData[index].length; i++) {
              if (
                bol &&
                (this.newTypeData[index][i].state === "01" ||
                  this.newTypeData[index][i].state === "02" ||
                  this.newTypeData[index][i].state === "03")
              ) {
                curIdnex = index;
                bol = false;
              }
              if (this.newTypeData[index][i].state === "04") {
                live = true;
                curIdnex = index;
                break aaa;
              }
            }
          }
        }
        if (bol && !live) {
          curIdnex = this.newTypeData.length - 1;
        }
        this.initIndex = curIdnex;
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
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
::v-deep .switch-block {
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
}
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
  /* padding: 40px 40px 0; */
  /* background-color: #fff; */
  /* width: 100%; */
  width: 1740px;
  .card-list-container {
    position: relative;
    /* padding-bottom: 40px; */
    overflow: hidden;
    width: 1740px;
    /* height: 420px; */
    /* margin-left: 20px; */
    .show-double-card {
      display: flex;
      justify-content: space-between;
      .right-card {
        margin-left: 21px;
      }
      .right-card:nth-child(1) {
        margin-left: 0;
      }
      .empty {
        flex-shrink: 0;
        flex-grow: 1;
        width: 566px;
        margin-left: 20px;
      }
    }
    /* position: relative;
    background-color: #fff;
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 30px;
    padding-bottom: 40px;
    overflow: hidden;

    .swiper {
      display: flex;
      justify-content: start;
      transition: 0.5s;
      position: relative;
      .slide {
        width: 520px;
        height: 427px;
        flex-shrink: 0;
        flex-grow: 0 !important;
        z-index: 1;
        transition: 0.5s;
      }
      .slide + .slide {
        margin-left: 50px;
      }
    }
    .left-icon,
    .right-icon {
      display: none;
    }
    &:hover {
      .left-icon {
        display: block;
        width: 50px;
        height: 50px;
        position: absolute;
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        text-align: center;
        line-height: 50px;
        border-radius: 50%;
        cursor: pointer;
        z-index: 102;
        top: 200px;
        right: 10px;
      }
      .right-icon {
        display: block;
        width: 50px;
        height: 50px;
        position: absolute;
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        text-align: center;
        line-height: 50px;
        border-radius: 50%;
        cursor: pointer;
        z-index: 102;
        top: 200px;
        left: 10px;
      }
    } */
  }

  ::v-deep .card {
    border-radius: 0 0 6px 6px;
  }
}

.box-title {
  position: relative;
  /* background-color: #fff; */
  padding: 40px 40px 0;
  border-radius: 6px 6px 0 0;
  height: 70px;
  .switch-block {
    position: absolute;
    z-index: 1;
    right: 20px;
    top: 40px;
  }
}

::v-deep .el-carousel__indicators--outside {
  height: 60px;
  line-height: 60px;
}

.no-data {
  height: 105px;
  /* padding-bottom: 36px; */
  font-size: 16px;
  font-weight: 400;
  color: #999999;
  background: #fff;
  text-align: center;
  line-height: 105px;
}
::v-deep .el-carousel__indicators--outside {
  height: 60px;
  line-height: 60px;
}
::v-deep .el-carousel__indicators--outside {
  height: 42px;
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
    background-color: #67C23A;
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
  right: 0;
}
::v-deep .el-carousel__arrow--left {
  color: #8f8f90;
}
::v-deep .el-carousel__arrow--right {
  color: #8f8f90;
}
</style>
