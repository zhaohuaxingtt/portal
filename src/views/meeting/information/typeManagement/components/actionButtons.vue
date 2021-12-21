<template>
  <div class="operation-btn">
    <iButton @click="$emit('add')">{{ $t("MT_TIANJIAZILIAOLEIXING") }}</iButton>
  </div>
</template>

<script>
import { iButton } from "rise";
export default {
  name: "activonButton",
  components: { iButton },
  props: {
    /* selectedRow: {
      type: Array,
      default: function () {
        return [];
      },
    }, */
  },
};
</script>

<style lang="scss" scoped>
.operation-btn {
  float: right;
  display: flex;
  margin-top: 22px;
  margin-bottom: 22px;
  text-align: right;
}
</style>