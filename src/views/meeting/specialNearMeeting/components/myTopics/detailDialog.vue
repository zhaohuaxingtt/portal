<template>
  <!--转派-->
  <iDialog
    :title='meetingMsg.name'
    :visible.sync="openDialog"
    width="30rem"
    @close="clearDiolog"
    :close-on-click-modal="false"
  >
    <div class="meeting-info">
      <p class="meeting-desc">{{meetingMsg.meetingInfoDesc}}</p>
      <p class="meeting-line"></p>
      <p class="meeting-cover">
        <img :src="meetingMsg.coverImage" alt="" srcset="">
      </p>
      <ul class="documents-list">
        <li
          @click="downloadEnclosure(item)"
          v-for="(item, index) in documents"
          :key="item.id"
          :class="[
            { 
              bkg: index % 2 == 1, 
            },
            'document-item'
          ]"
          >{{item.name}}</li>
      </ul>
    </div>
    <div class="connection-info">
      <p class="info-title">{{$t('MT_LIANXIRENXINXI')}}</p>
      <ul>
        <li class="info-item">
          <span>{{$t('MT_BUMEN')}}</span>
          <span>{{contact.dept}}</span>
        </li>
        <li class="info-item">
          <span>{{$t('MT_GANGWEI')}}</span>
          <span>{{contact.office}}</span>
        </li>
        <li class="info-item">
          <span>{{$t('MT_DIANHUA')}}</span>
          <span>{{contact.phone}}</span>
        </li>
        <li class="info-item">
          <span>{{$t('MT_YOUXIANG')}}</span>
          <span>{{contact.email}}</span>
        </li>
      </ul>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iMessage } from "rise";
import { findMeetingInfo } from "@/api/meeting/myMeeting";
import { MOCK_FILE_URL } from '@/constants';
import { getFileByIds } from "@/api/file/filedownload";
import { download } from "@/utils/downloadUtil";

export default {
  components: {
    iDialog,
  },
  props: {
    openDialog: { type: Boolean, default: false },
    id: { type: Number || String, default: '' },
    approvalProcess: { type: Array },
  },
  data() {
    return {
      meetingMsg: {},
      documents: [],
      contact: {},
    };
  },
  mounted() {
    let param = { id: this.id };
    findMeetingInfo(param)
      .then((res) => {
        this.meetingMsg = res.meetingDocument.meetingType;
        this.documents = res.meetingDocument.documents;
        this.contact = res.contact ? res.contact : {};
      })
      .catch((err) => {
        console.log("err", err);
      });
  },
  methods: {
    clearDiolog() {
      this.$emit("closeDialog", false);
    },
    // 下载附件
    downloadEnclosure(e) {
      getFileByIds([e.attachmentId]).then((data) => {
        const { name } = data.data[0];
        download({
          url: MOCK_FILE_URL + e.attachmentId,
          filename: name,
          callback: (e) => {
            if (!e) {
              iMessage.error("下载失败");
            }
          },
        });
      });
    },
  },
};
</script>

<style scoped lang="scss">
.meeting-info {

  .meeting-desc{
    font-size: 16px;
    color: #000000;
    letter-spacing: 0;
  }
  .meeting-line {
    background: #DEE3ED;
    height: 1px;
    margin: 10px 0;
  }
  .meeting-cover {
    height: 244px;
    width: 400px;

    img {
      width: 100%;
      height: 100%;
      object-fit: scale-down;
    }
  }

  .documents-list {
    margin-bottom: 30px;

    .document-item {
      line-height: 50px;
      padding-left: 20px;
      font-size: 14px;
      color: #000000;
      letter-spacing: 0;
      cursor: pointer;
    }
    .bkg {
      background: rgba(22, 96, 241, 0.03);
    }
  }
}

.connection-info {
  padding-bottom: 40px;

  .info-title {
    font-weight: 700;
    font-size: 18px;
    color: #000000;
    letter-spacing: 0;
    margin-bottom: 10px;
  }

  .info-item {
    line-height: 34px;
    border-bottom: 1px solid #D8D8D8;
    font-size: 16px;
    color: #000000;
    letter-spacing: 0;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
  }
}

::v-deep .el-dialog__title {
  font-size: 36px !important;
  line-height: 36px !important;
  font-weight: 400 !important;
  color: #1660F1;
  letter-spacing: 0;
}
</style>
