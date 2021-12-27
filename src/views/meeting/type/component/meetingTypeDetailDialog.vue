<template>
  <!--转派-->
  <iDialog
    title="Common Meeting"
    :visible.sync="openDialog"
    width="47.3rem"
    @close="clearDiolog"
    :close-on-click-modal="false"
  >
    <div class="metting-type-detail-box">
      <div class="left-msg">
        <div class="left-name">
          <div>
            <img :src="data.coverImage" alt="" class="cover-image" />
            <div class="left-descript-box">
              <p class="desc-title">{{$t('MT_HUIYIXINXIMIAOSHU')}}</p>
              <p class="desc">{{ data.meetingInfoDesc }}</p>
            </div>
          </div>
          <div class="meeting-name">
            <p>{{$t('MT_LEIXINGMINGCHENG')}}</p>
            <p>{{ data.name }}</p>
            <p>{{$t('MT_HUIYIMINGCHENGHOUZHUI')}}</p>
            <p>{{ data.meetingNameSuffix }}</p>
            <p>{{$t('MT_SUOSHUFENLEI')}}</p>
            <p>{{ categoryObj[data.category] }}</p>
            <p>{{$t('MT_HUIYIGUANLIYUAN')}}</p>
            <p>{{ data.userNames }}</p>
          </div>
        </div>
      </div>
      <div class="right-msg">
        <p>{{$t('MT_YITISHICHANG')}}</p>
        <p>
          <span>{{ data.duration }}</span
          >{{$t('MT_FENZHONG')}}
        </p>
        <div class="msg-box">
          <span>{{$t('MT_SHIFOUCHUFASHENPI')}}</span>
          <p>{{ data.isTriggerApproval ? $t('MT_SHI') : $t('MT_FOU') }}</p>
        </div>
        <p>{{$t('MT_SHENPILIUCHENG')}}</p>
        <p>{{ approvalProcessName }}</p>
      </div>
    </div>
  </iDialog>
</template>

<script>
import { iDialog } from "rise";
import { getMettingDetailType } from "@/api/meeting/type.js";
export default {
  components: {
    iDialog,
  },
  props: {
    openDialog: { type: Boolean, default: false },
    id: { type: Number, default: -1 },
    approvalProcess: { type: Array },
  },
  data() {
    return {
      data: {},
      approvalProcessName: "",
      categoryObj: {
        "01": "通用会议",
        "02": "生产采购CSC",
        "03": "一般采购CSG",
      },
    };
  },
  mounted() {
    let param = { id: this.id };
    getMettingDetailType(param)
      .then((res) => {
        this.data = res;
        this.approvalProcess.forEach((item) => {
          if (item.id == res.approvalProcessId) {
            this.approvalProcessName = item.name;
          }
        });
      })
      .catch((err) => {
        console.log("err", err);
      });
  },
  methods: {
    clearDiolog() {
      this.$emit("closeDialog", false);
    },
  },
};
</script>

<style scoped lang="scss">
.metting-type-detail-box {
  padding-bottom: 40px;
  display: flex;
  justify-content: space-between;

  .left-msg {
    width: 437px;
    border-right: 4px solid #d8d8d8;
    .left-name {
      display: flex;
      justify-content: space-between;
      .cover-image {
        display: block;
        width: 212px;
        height: 119px;
        margin-right: 28px;
        background: burlywood;
      }
      .meeting-name {
        flex: 1;
        font-size: 14px;
        p:nth-of-type(1) {
          color: #4b4b4c;
          line-height: 20px;
        }
        p:nth-of-type(2) {
          color: #000000;
          line-height: 35px;
          margin-bottom: 9px;
        }
        p:nth-of-type(3) {
          color: #4b4b4c;
          line-height: 20px;
        }
        p:nth-of-type(4) {
          color: #000000;
          line-height: 35px;
          margin-bottom: 9px;
        }
        p:nth-of-type(5) {
          color: #4b4b4c;
          line-height: 20px;
        }
        p:nth-of-type(6) {
          color: #000000;
          line-height: 35px;
          margin-bottom: 9px;
        }
        p:nth-of-type(7) {
          color: #4b4b4c;
          line-height: 20px;
        }
        p:nth-of-type(8) {
          color: #000000;
          line-height: 35px;
        }
      }
      .left-descript-box {
        margin-top: 20px;
        width: 212px;
        .desc-title {
          line-height: 20px;
          color: #4b4b4c;
          margin-bottom: 10px;
        }
        .desc {
          width: 212px;
          font-size: 12px;
          color: #000000;
          line-height: 16px;
        }
      }
    }
  }

  .right-msg {
    flex: 1;
    margin: 20px auto;
    width: 116px;
    font-size: 14px;
    text-align: center;
    color: #000000;

    p:nth-of-type(1) {
      font-size: 14px;
      line-height: 16px;
    }
    p:nth-of-type(2) {
      > span {
        font-size: 48px;
        color: #1660f1;
      }
    }

    p:nth-of-type(4) {
      color: #1660f1;
    }
    .msg-box {
      display: flex;
      align-items: center;
      height: 35px;
      justify-content: center;
      margin: 17px auto 20px;
      span {
        width: 105px;
        text-align: center;
      }
      p {
        width: 44px;
        line-height: 35px;

        background: #ffffff;
        box-shadow: 0 0 8px 0 rgba(124, 124, 124, 0.16);
        border-radius: 5px;
        font-size: 14px;
        color: #2f2f2f;
      }
    }
  }
}
</style>
