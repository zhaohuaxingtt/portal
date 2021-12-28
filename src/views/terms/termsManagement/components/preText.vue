<template>
  <iPage>
    <div v-html="this.$route.query.termsText"></div>
  </iPage>
</template>

<script>
import { iPage } from "rise";

export default {
  components: {
    iPage,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
</style>