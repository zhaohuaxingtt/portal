<!--
 * @author: shujie
 * @createTime: 2021-5-24 19:50:30
 * @Description:生成会议纪要
 -->
<template>
  <iDialog :title="$t('SPR_FRM_DEP_SCHYJY')"
           :visible.sync="value"
           width="880px"
           @close='clearDiolog'>
    <div class='flex-align-center'>
      <!-- 会议日期 -->
      <div class="metting">
        <span>{{$t('SPR_FRM_DEP_HYRQ')}}</span>
        <iDatePicker value-format="yyyy-MM-dd"
                     v-model='creatMeeting.meetingDate'
                     :picker-options="endTimePickerOptions"></iDatePicker>
      </div>
      <!-- 会议地点 -->
      <div class="metting">
        <span>{{$t('LK_HUIYIDIDIAN')}}</span>
        <iInput v-model='creatMeeting.meetingPlace'
                :placeholder="$t('LK_QINGSHURU')"></iInput>
      </div>
      <!-- 撰写人 -->
      <div class="metting">
        <span>{{$t('SPR_FRM_DEP_ZXR')}}</span>
        <iInput v-model='creatMeeting.writer'
                :placeholder="$t('LK_QINGSHURU')"></iInput>
      </div>
      <!-- 部门 -->
      <div class="metting">
        <span>{{$t('SPR_FRM_DEP_BM')}}</span>
        <iInput v-model='creatMeeting.dept'
                :placeholder="$t('LK_QINGSHURU')"></iInput>
      </div>
    </div>
    <!-- 主题 -->
    <div class="metting mettingPerson">
      <span>{{$t('SPR_FRM_DEP_ZT')}}</span>
      <iInput type="textarea"
              :placeholder="$t('LK_QINGSHURU')"
              v-model='creatMeeting.meetingTopic'></iInput>
    </div>
    <!-- 出席人员 -->
    <div class="metting mettingPerson">
      <span>{{$t('SPR_FRM_DEP_CXRY')}}</span>
      <iInput type="textarea"
              :placeholder="$t('SPR_FRM_DEP_CXRYPLACE')"
              v-model='creatMeeting.attendants'></iInput>
    </div>
    <!-- 抄送 -->
    <div class="metting mettingPerson">
      <span>{{$t('SPR_FRM_DEP_CC')}}</span>
      <iInput type="textarea"
              :placeholder="$t('SPR_FRM_DEP_CXRYPLACE')"
              v-model='creatMeeting.cc'></iInput>
    </div>
    <span slot="footer"
          class="dialog-footer">
      <iButton @click="meetingExport">{{$t('SPR_FRM_DEP_SCBXZ')}}</iButton>
      <iButton @click="clearDiolog">{{$t('LK_QUXIAO')}}</iButton>
    </span>
  </iDialog>
</template>
<script>
import { iInput, iButton, iMessage, iDialog, iDatePicker } from 'rise';
import { meetingExport } from '@/api/frmRating/depthRating/interView';
export default {
  components: { iInput, iButton, iDialog, iDatePicker },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    id: { type: String }
  },
  data () {
    return {
      creatMeeting: {
        meetingDate: "",
        attendants: "",
        meetingPlace: "",
        deepCommentSupplierId: "",
        writer: "",
        meetingTopic: "",
        cc: "",
        dept: ""
      },
      endTimePickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now();
        },
      },

    }
  },
  methods: {
    clearDiolog () {
      this.$emit('input', false);
      this.backmark = ''
    },
    // 生成会议纪要
    meetingExport () {
      const loading = this.$loading({
        lock: true,
      });
      this.creatMeeting.deepCommentSupplierId = this.id
      meetingExport(this.creatMeeting).then(res => {
        this.clearDiolog()
        loading.close()
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.tip {
  font-size: 14px;
  color: $color-black;
}

.metting {
  display: flex;
  flex-direction: column;
  margin-right: 52px;

  > span {
    margin-bottom: 6px;
    font-size: 14px;
    font-weight: bold;
  }
}

.mettingPerson {
  margin-top: 20px;
  margin-right: 0;
  margin-bottom: 40px;
}
</style>
