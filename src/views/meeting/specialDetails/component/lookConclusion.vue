<template>
  <iDialog
    :title="$t('MT_CHAKANJIELUN')"
    :visible.sync="open"
    width="54.875rem"
    height="28.75rem"
    :close-on-click-modal="false"
    @close="close"
  >
    <div class="content">
      <div class="conclusion-box">
        <span class="conclusion-title"><span>{{$t('MT_JIELUN')}}:</span></span>
        <div class="conclusion-content">
          {{ $t(themenConclusion[selectedTableData[0].conclusionCsc]) }}
        </div>
      </div>
      <div
        class="conclusion-box conclusion-special"
        v-if="
          selectedTableData[0].conclusionCsc === '05' ||
            selectedTableData[0].conclusionCsc === '06'
        "
      >
        <span class="conclusion-title"><span>{{$t('MT_HUIYI')}}:</span></span>
        <div class="conclusion-content">
          {{ selectedTableData[0].toDoMeetingName }}
        </div>
      </div>
      <div
        class="conclusion-box conclusion-special"
        v-if="selectedTableData[0].conclusionCsc === '02'"
      >
        <span
          class="conclusion-title"
          style="white-space:nowrap"
        ><span>{{$t('MT_SHIFOUDONGJIE')}}:</span></span>
        <div class="conclusion-content">
          {{ selectedTableData[0].isFixedFrozenRs ? $t('MT_SHI') : $t('MT_FOU') }}
        </div>
      </div>
      <div class="conclusion-box">
        <span class="conclusion-title">{{$t('MT_RENWU')}}:</span>
        <div class="conclusion-content">
          {{ selectedTableData[0].conclusion }}
        </div>
      </div>
    </div>
  </iDialog>
</template>
<script>
import { iDialog } from "rise";
import { themenConclusion } from "./data";
export default {
  components: {
    iDialog,
  },
  props: {
    selectedTableData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    open: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    meetingInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      themenConclusion,
    };
  },
  methods: {
    close() {
      this.$emit("closeDialog", false);
      this.$emit("flushTable");
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  width: 100%;
  height: 375.33px;
  .conclusion-box {
    display: flex;
    align-items: center;
    margin-bottom: 40px;
    width: 100%;
    height: 20px;
    line-height: 20px;
    .conclusion-title {
      height: 100%;
      white-space: nowrap;
      display: block;
      /* height: 100%; */
      /* width: 96px; */
      font-size: 16px;
      font-weight: 400;
      margin-right: 4px;
    }
    .conclusion-content {
      height: 100%;
      width: 100%;
      font-size: 14px;
      font-weight: 400;
      min-width: 20px;
    }
  }
  .conclusion-special {
    margin-bottom: 30px;
  }
}
</style>
