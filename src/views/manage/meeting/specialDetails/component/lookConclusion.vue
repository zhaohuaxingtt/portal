<template>
  <iDialog
    title="查看结论"
    :visible.sync="open"
    width="54.875rem"
    height="28.75rem"
    :close-on-click-modal="false"
    @close="close"
  >
    <div class="content">
      <div class="conclusion-box">
        <span class="conclusion-title"><span>结论:</span></span>
        <div class="conclusion-content">
          {{ themenConclusion[selectedTableData[0].conclusionCsc] }}
        </div>
      </div>
      <div
        class="conclusion-box conclusion-special"
        v-if="
          selectedTableData[0].conclusionCsc === '05' ||
            selectedTableData[0].conclusionCsc === '06'
        "
      >
        <span class="conclusion-title"><span>会议:</span></span>
        <div class="conclusion-content">
          {{ selectedTableData[0].toDoMeetingName }}
        </div>
      </div>
      <div
        class="conclusion-box conclusion-special"
        v-if="selectedTableData[0].conclusionCsc === '02'"
      >
        <span class="conclusion-title" style="white-space:nowrap"
          ><span>是否冻结:</span></span
        >
        <div class="conclusion-content">
          {{ selectedTableData[0].isFrozenRs ? "是" : "否" }}
        </div>
      </div>
      <div class="conclusion-box">
        <span class="conclusion-title">任务:</span>
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
    margin-bottom: 40px;
    width: 100%;
    .conclusion-title {
      white-space: nowrap;
      display: block;
      height: 100%;
      /* width: 96px; */
      font-size: 16px;
      font-weight: 400;
      margin-right: 4px;
    }
    .conclusion-content {
      width: 100%;
      font-size: 14px;
      font-weight: 400;
      transform: translateY(2px);
    }
  }
  .conclusion-special {
    margin-bottom: 30px;
  }
}
</style>
