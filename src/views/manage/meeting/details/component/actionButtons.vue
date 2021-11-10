<template>
  <div class="button-box">
    <div class="operation-btn">
      <iButton
        v-for="(item, index) of currentButtonList[0]"
        :key="index"
        @click="$emit(item.methodName)"
        v-show="!showUpdateTopicButtonList"
        :disabled="item.disabled"
        >{{ $t(item.title) }}</iButton
      >
      <iButton
        v-for="(item, index) of UpdateTopicButtonList"
        :key="index"
        @click="$emit(item.methodName)"
        v-show="showUpdateTopicButtonList"
        :disabled="item.disabled"
        >{{ $t(item.title) }}
      </iButton>
    </div>
    <div class="operation-btn">
      <iButton
        v-for="(item, index) of currentButtonList[1]"
        :key="index"
        @click="$emit(item.methodName)"
        :disabled="
          typeof item.triggerDisabled === 'undefined'
            ? item.disabled
            : item.triggerDisabled
        "
        v-show="!showUpdateTopicButtonList"
        >{{ $t(item.title) }}</iButton
      >
      <iButton
        v-for="(item, index) of currentButtonList[1]"
        :key="index"
        @click="$emit(item.methodName)"
        v-show="showUpdateTopicButtonList"
        :disabled="true"
        >{{ $t(item.title) }}</iButton
      >
    </div>
  </div>
</template>

<script>
import { iButton } from "rise";
export default {
  name: "activonButton",
  components: { iButton },
  props: {
    selectedRow: {
      type: Array,
      default: function() {
        return [];
      },
    },
    currentButtonList: {
      type: Array,
      default: function() {
        return [];
      },
    },
    showUpdateTopicButtonList: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      UpdateTopicButtonList: [
        { title: "调整完成", methodName: "overUpdateTopic" },
        { title: "取消调整", methodName: "cancelUpdateTopic" },
      ],
    };
  },

  watch: {
    currentButtonList: {
      handler(v) {
        // console.log(v);
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.button-box {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  .operation-btn {
    display: flex;
    margin-bottom: 20px;
    button {
      min-width: 132px;
      height: 35px;
      margin-left: 20px;
      font-size: 16px;
    }
  }
}
</style>
