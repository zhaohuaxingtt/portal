<template>
  <div class="user-info margin-bottom20">
    <iCard tabCard collapse :title="language('岗位用户')">
      <uTable :type="type" />
    </iCard>
  </div>
</template>

<script>
import { iCard } from "rise";
import uTable from './uTable.vue'
export default {
  components: { uTable, iCard },
  props: {
    type: {
      type: String
    },
  },
  data() {
    return {
    };
  },
};
</script>