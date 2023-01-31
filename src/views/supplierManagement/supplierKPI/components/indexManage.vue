<template>
  <div class="box">
    <iCard :title="$t('指标库')">
    </iCard>
  </div>
</template>

<script>
import { iButton, iPage, iCard, iInput, iSelect } from 'rise'

export default {
  props: {
    name: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {}
  },
  mounted() {},
  watch: {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.box {
  width: 400px;
}
</style>
