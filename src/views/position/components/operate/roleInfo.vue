<template>
  <div class="role-info margin-bottom20">
    <iCard tabCard collapse title="角色信息">
      <rTable :type="type" />
    </iCard>
  </div>
</template>

<script>
import { iCard } from "rise";
import rTable from './rTable.vue'
export default {
  components: { rTable, iCard },
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