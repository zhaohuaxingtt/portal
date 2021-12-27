<template>
  <!--转派-->
  <iDialog
    :title="$t('MT_YITIXINXI')"
    :visible.sync="openAddTopic"
    width="55rem"
    @close="clearDiolog"
    :close-on-click-modal="false"
  >
    <ul class="content-top">
      <li class="info-row">
        <div class="left">{{topicInfo.topic}}</div>
        <div class="right">
          {{ start }}~{{ end
          }}<span style="margin-left:5px">{{ $t(status[topicInfo.state]) }}</span>
        </div>
        
      </li>
      <!-- 议题寻源号 -->
      <li class="info-row">
        <div class="left">Sourcing No.</div>
        <div class="right">{{ topicInfo.sourcingNo }}</div>
      </li>

      <!-- 零件号 -->
      <li class="info-row">
        <div class="left">TNR</div>
        <div class="right">{{ topicInfo.tnr }}</div>
      </li>

      <!-- 零件中文名 -->
      <li class="info-row">
        <div class="left">BEN (CN)</div>
        <div class="right">{{ topicInfo.benCn }}</div>
      </li>

      <!-- 零件德文名 -->
      <li class="info-row">
        <div class="left">BEN (DE)</div>
        <div class="right">{{ topicInfo.benDe }}</div>
      </li>

      <!-- 车型 -->
      <li class="info-row">
        <div class="left">Carline</div>
        <div class="right">
          {{ topicInfo.carline }}
        </div>
      </li>

      <!-- 支持者 -->
      <li class="info-row">
        <div class="left">
          Sourcing Buyer
        </div>
        <div class="right">
          {{ topicInfo.supporter }}
        </div>
      </li>

      <!-- 演讲人 -->
      <li class="info-row">
        <div class="left">Linie Buyer</div>
        <div class="right">
          {{ topicInfo.presenter }}
        </div>
      </li>
      
      <!-- EP -->
      <li class="info-row">
        <div class="left">EP</div>
        <div class="right">
          {{ topicInfo.ep }}
        </div>
      </li>

      <!-- 零件号 -->
      <li class="info-row">
        <div class="left">Part Type</div>
        <div class="right">
          {{ topicInfo.tnr }}
        </div>
      </li>

      <!-- 状态 -->
      <li class="info-row">
        <div class="left">Status</div>
        <div class="right">
          <span >{{ (topicInfo.cscCount || 0) +'/' + (topicInfo.preCount || 0)}}</span>
        </div>
      </li>
    </ul>
    <div class="form-item-att">Attachment</div>
    <div class="foot">
      <div class="bottom">
        <div
          class="down"
          @click="handleDownLoad(item)"
          v-for="(item, index) of topicInfo.attachments"
          :key="index"
        >
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
        this.topicInfo.supporter,
        this.topicInfo.supporterDept
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
  mounted(){
    console.log(this.topicInfo)
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
      console.log(198,e)
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
::v-deep .el-dialog{
  margin-top: 12vh !important;
}
.form-item-att{
  margin-top: 1.5rem;
  font-weight: 400;
  line-height: 17px;
  color: #000000;
}
.hidden-span {
  cursor: pointer;
}
.content-top {
  .info-row {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 17px;
    font-size: 16px;
    font-family: Arial;
    font-weight: 400;
    line-height: 17px;
    color: #000000;
    border-bottom: 1px solid #ddd;
    padding-bottom: 1.5rem;
    .left {
      width: 250px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: left;
    }
    .right {
      text-align: left;
      font-weight: 600;
      font-size: 1rem;
    }
  }
  .info-row + .info-row {
    margin-top: 1.5rem;
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
