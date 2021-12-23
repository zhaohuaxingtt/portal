<template>
  <!--转派-->
  <iDialog
    title="TOPIC INFORMATION"
    :visible="openAddTopic"
    width="33.1875rem"
    @close="clearDiolog"
    :close-on-click-modal="false"
  >
    <ul class="content-top">
      <li class="info-row">
        <div class="left">Item No.</div>
        <div class="right">{{ topicInfo.itemNo }}</div>
      </li>
      <li class="info-row">
        <div class="left">count</div>
        <div class="right">{{ topicInfo.count }}</div>
      </li>
      <li class="info-row">
        <div class="left">{{ topicInfo.topic }}</div>
        <div class="right">
          {{ start }}~{{ end
          }}<span style="margin-left:4px">{{ $t(status[topicInfo.state]) }}</span>
        </div>
      </li>
      <li class="info-row">
        <div class="left">Presenter</div>
        <div class="right">
          <!-- {{ topicInfo.presenter
          }}{{
            topicInfo.presenterNosys
              ? topicInfo.presenter
                ? "," + topicInfo.presenterNosys
                : topicInfo.presenterNosys
              : ""
          }} -->
          <span>{{
            compuPresenter.showS && compuPresenter.showS !== "null"
              ? compuPresenter.showS
              : ""
          }}</span
          ><span
            v-if="compuPresenter.hiddenS"
            :title="compuPresenter.hiddenS"
            class="hidden-span"
            >...</span
          >
        </div>
      </li>
      <li class="info-row">
        <div class="left">Presenter Department</div>
        <div class="right">
          <!-- {{ topicInfo.presenterDept
          }}{{
            topicInfo.presenterDeptNosys
              ? topicInfo.presenterDept
                ? "," + topicInfo.presenterDeptNosys
                : topicInfo.presenterDeptNosys
              : ""
          }} -->
          <span>{{
            compuPresenterDept.showS && compuPresenterDept.showS !== "null"
              ? compuPresenterDept.showS
              : ""
          }}</span
          ><span
            v-if="compuPresenterDept.hiddenS"
            :title="compuPresenterDept.hiddenS"
            class="hidden-span"
            >...</span
          >
        </div>
      </li>
      <li class="info-row">
        <div class="left">Supporter</div>
        <div class="right">
          <!-- {{ topicInfo.supporter
          }}{{
            topicInfo.supporterNosys
              ? topicInfo.supporter
                ? "," + topicInfo.supporterNosys
                : topicInfo.supporterNosys
              : ""
          }} -->
          <span>{{
            compuSupporter.showS && compuSupporter.showS !== "null"
              ? compuSupporter.showS
              : ""
          }}</span
          ><span
            v-if="compuSupporter.hiddenS"
            :title="compuSupporter.hiddenS"
            class="hidden-span"
            >...</span
          >
        </div>
      </li>
      <li class="info-row">
        <div class="left">
          Supporter Department
        </div>
        <div class="right">
          <!-- {{ topicInfo.supporterDept
          }}{{
            topicInfo.supporterDeptNosys
              ? topicInfo.supporterDept
                ? "," + topicInfo.supporterDeptNosys
                : topicInfo.supporterDeptNosys
              : ""
          }} -->
          <span>{{
            compuSupporDept.showS && compuSupporDept.showS !== "null"
              ? compuSupporDept.showS
              : ""
          }}</span
          ><span
            v-if="compuSupporDept.hiddenS"
            :title="compuSupporDept.hiddenS"
            class="hidden-span"
            >...</span
          >
        </div>
      </li>
      <li class="info-row">
        <div class="left">Remark</div>
        <div class="right">
          {{ topicInfo.remark }}
        </div>
      </li>
    </ul>
    <el-divider class="line"></el-divider>
    <div class="foot">
      <div class="bottom">
        <div
          class="down"
          @click="handleDownLoad(item)"
          v-for="(item, index) of topicInfo.attachments"
          :key="index"
        >
          <div class="img-box">
            <img :src="enclosure" />
          </div>
          <span class="down-load">{{ item.attachmentName }}</span>
        </div>
      </div>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iMessage } from "rise";
import dayjs from "dayjs";
import enclosure from "@/assets/images/enclosure.svg";
import { download } from "@/utils/downloadUtil";
export default {
  components: {
    iDialog,
  },
  props: {
    openAddTopic: { type: Boolean, default: false },
    topicInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      enclosure: enclosure,
      status: {
        "01": "MT_WEIJINXING",
        "02": "MT_JINXINGZHONG",
        "03": "MT_YIJIESHU",
      },
    };
  },
  computed: {
    start() {
      return dayjs(new Date(`2021-9-23 ${this.topicInfo.startTime}`)).format(
        "HH:mm"
      );
    },
    end() {
      return dayjs(new Date(`2021-9-23 ${this.topicInfo.endTime}`)).format(
        "HH:mm"
      );
    },
    compuSupporter() {
      return this.compuShouldShow(
        this.topicInfo.supporter
        // this.topicInfo.supporterDept
      );
    },
    compuSupporDept() {
      return this.compuShouldShow(
        this.topicInfo.supporterDept,
        this.topicInfo.supporterDeptNosys
      );
    },
    compuPresenter() {
      return this.compuShouldShow(
        this.topicInfo.presenter,
        this.topicInfo.presenterNosys
      );
    },
    compuPresenterDept() {
      return this.compuShouldShow(
        this.topicInfo.presenterDept,
        this.topicInfo.presenterDeptNosys
      );
    },
  },
  methods: {
    compuShouldShow(p, pNosys) {
      let s1 = p;
      let s2 = pNosys ? (p ? "," + pNosys : pNosys) : "";
      let s3 = s1 + s2;
      const arrs = s3 ? s3.split(",") : [];
      if (arrs.length > 3) {
        return {
          hiddenS: s3,
          showS: arrs.slice(0, 3).join(","),
        };
      }
      return {
        hiddenS: "",
        showS: s3,
      };
    },
    clearDiolog() {
      this.$emit("closeDialog");
    },
    // 下载附件
    handleDownLoad(e) {
      download({
        fileIds: e.attachmentId,
        // url: MOCK_FILE_URL + e.attachmentId,
        filename: e.attachmentName,
        callback: (e) => {
          if (!e) {
            iMessage.error(this.$t("下载失败"));
          }
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.hidden-span {
  cursor: pointer;
}
.content-top {
  .info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 17px;
    font-size: 16px;
    font-family: Arial;
    font-weight: 400;
    line-height: 17px;
    color: #000000;
    .left {
      width: 250px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: left;
    }
    .right {
      text-align: left;
    }
  }
  .info-row + .info-row {
    margin-top: 40px;
  }
}
.line {
  margin: 0;
  padding: 0;
  margin-top: 21px;
}
.foot {
  height: 100px;
  .bottom {
    height: 68px;
    overflow-y: auto;
    .down {
      display: flex;
      height: 20px;
      margin-top: 14px;
      align-items: center;
      cursor: pointer;
      .down-load {
        color: #1660f1;
      }
      .img-box {
        margin-right: 5px;
        width: 20px;
        height: 20px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
