<template>
  <el-row class="card">
    <el-col :span="8" v-for="i in titleAndImg" :key="i.img">
      <el-card class="box" :body-style="{ padding: '0px' }">
        <img :src="i.img" class="image" />
        <div class="back">
          <div class="setting">
            <div class="type">{{ i.title }}</div>
            <iButton @click="more(i.type)">{{ language('MORE', 'MORE') }}</iButton>
          </div>
        </div>
        <div class="table-div" v-for="item in i.tableData" :key="item.id">
          <div :class="{
                  blue: item.readStatus === 0,
                  grey: item.readStatus === 1,
                }"
                :title="item.title" class="table-div-left" @click="handleGoDetail(item.id)">{{ item.title }}</div>
          <div class="table-div-right">
            <div class="table-div-right-div table-div-right-img">
            <img
              class="margin-right20"
              style="min-width: 30px"
              :src="item.isTop === 1 ? top : ''"
            />
            <el-popover placement="right" trigger="click">
              <div class="enclosure-popover">
                <span class="title">{{language('NEWS_FUJIAN', '附件')}}:</span>
                <ul>
                  <li
                    v-for="item in item.attachments"
                    :key="item.id"
                    class="open-link-text enclosure-item"
                    @click="
                      downloadEnclosure(
                        item.attachmentUrl,
                        item.attachmentTitle
                      )
                    "
                  >
                    <img :src="enclosure" alt="" srcset="" />
                    <span style="color: #1763f7">{{
                      item.attachmentTitle
                    }}</span>
                  </li>
                </ul>
              </div>
              <div slot="reference">
                <img
                  v-if="item.attachments.length || !item.attachments"
                  :src="enclosure"
                  alt=""
                  class="enclosureImg"
                />
              </div>
            </el-popover>
            </div>
            <div class="table-div-right-div" :title="item.publishDate">{{ item.publishDate }}</div>
            <div class="table-div-right-click">
              <span class="el-icon-view margin-right10"></span>
              <span  :title="item.clicks">{{item.clicks}}</span>
            </div>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { iButton } from "rise";
import enclosure from "@/assets/images/enclosure.svg";
import noticeOne from "@/assets/images/news/noticeOne.svg";
import noticeTwo from "@/assets/images/news/noticeTwo.svg";
import noticeThree from "@/assets/images/news/noticeThree.svg";
import top from "@/assets/images/news/top.svg";
import { getNoticeList } from "@/api/news/notice.js";
import { createAnchorLink } from "@/utils/downloadUtil";
import dayjs from "dayjs";

export default {
  components: {
    // iPage,
    iButton,
  },
  props: {},
  mounted() {
    this.query();
  },
  data() {
    return {
      noticeOne,
      noticeTwo,
      noticeThree,
      top,
      enclosure,
      tableData: [],
      titleAndImg: [
        {
          img: noticeOne,
          title: this.language("NEWS_CAIGOUGONGGAO","采购公告"),
          type: 4,
          tableData: [],
        },
        {
          img: noticeTwo,
          title: this.language("NEWS_WULIUGONGGAO","物流公告"),
          type: 5,
          tableData: [],
        },
        {
          img: noticeThree,
          title: this.language("NEWS_ZHIBAOGONGGAO","质保公告"),
          type: 6,
          tableData: [],
        },
      ],
    };
  },
  methods: {
    // 预览页-下载附件
    downloadEnclosure(url, name) {
      createAnchorLink(
        url, // 前端跨域问题，将api地址替换为反向代理地址
        name
      );
    },
    handleGoDetail(id) {
      this.$router.push({
        path: "/news/notice/previewNotice",
        query: {
          id: id,
        },
      });
    },
    // 查询
    query() {
      getNoticeList().then((res) => {
        res.map((i) => {
          this.titleAndImg.map((item) => {
            if (i.type === item.type) {
              item.tableData = i.notices;
            }
          });
        });
        this.titleAndImg = this.titleAndImg.map(item => {
          return {
            ...item,
            tableData:item.tableData.map(it => {
              return {
                ...it,
                publishDate: dayjs(it.publishDate).format("YYYY-MM-DD"),
              }
            })
          }
        })
      });
    },
    more(type) {
      console.log("type", type);
      this.$router.push({
        path: "/news/notice/noticeMore",
        query: {
          type: type,
        },
      });
      // let routeUrl = this.$router.resolve({
      //   path: "/news/notice/noticeMore",
      // });
      // window.open(routeUrl.href, "_blank");
    },
  },
};
</script>

<style lang="scss" scoped>
.blue {
  color:  #3367B0;
  font-weight: bold !important;
}
.grey {
  color: #707070;
}
.card > * {
  padding: 0 10px;
}
::v-deep .el-table--striped .el-table__body tr.el-table__row--striped td {
  background: #fff;
}
::v-deep .el-table__row > td {
  border-bottom: 1px dashed #e0e6ed;
}
::v-deep .el-table::before {
  height: 0px;
}
.box {
  border-radius: 10px;
  position: relative;
  .back {
    position: absolute;
    width: 100%;
    top: 0px;
    .setting {
      display: flex;
      justify-content: space-between;
      margin: 10px 30px;
      .type {
        font-size: 28px;
        font-family: Arial;
        font-weight: bold;
        line-height: 32px;
        color: #ffffff;
      }
    }
  }
  .table-div{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    height: 60px;
    border-bottom: 1px dashed #e0e6ed;
    color: #707070;
    font-size: 14px;
    .table-div-left{
      cursor: pointer;
      width: 40%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .table-div-right{
      flex: 1;
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: flex-end;
      .table-div-right-img{
        display: flex;
        width: 90px;
      }
      .table-div-right-div{
        padding: 0 10px;
      }
      .table-div-right-click{
        padding-left: 10px;
        width: 65px;
        overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      }
    }
  }
  .table-div:hover{
    background-color: #f5f7fa;
  }
  .image {
    width: 100%;
  }
}
.enclosure {
  display: flex;
  cursor: pointer;
  img {
    margin-right: 4px;
  }
}
.enclosure-popover {
  display: flex;
  justify-content: space-between;
  .title {
    font-size: 16px;
    font-family: Hiragino Sans GB;
    font-weight: normal;
    line-height: 27px;
    color: #001847;
  }
  .enclosure-item {
    // margin-top: 10px;
    cursor: pointer;
    font-size: 16px;
    font-family: Hiragino Sans GB;
    font-weight: normal;
    line-height: 27px;
    color: #67C23A;
    text-decoration: underline;
    img {
      margin-right: 10px;
      width: 20px;
      height: 20px;
    }
  }
}
.table-item {
  display: flex;
}
.enclosureImg {
  width: 14px;
  height: 14px;
}

::v-deep .el-table__row {
  height: 60px;
}
</style>
