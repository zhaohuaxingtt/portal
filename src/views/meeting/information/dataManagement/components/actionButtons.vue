<template>
  <div class="operation-btn">
    <iButton @click="$emit('add')">{{ $t("添加资料") }}</iButton>
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
  margin-bottom: 22px;
  text-align: right;
}
</style>