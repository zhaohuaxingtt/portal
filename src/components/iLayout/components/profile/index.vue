<template>
  <iDialog
    :visible.sync="isShow"
    @close="onClose"
    width="800px"
    min-height="400px"
    append-to-body
  >
    <profileHeader />
    <middle />
    <bottom ref="bottom" />

    <div slot="footer">
      <iButton @click="isShow = false">确定</iButton>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iButton } from 'rise'
import { profileHeader, middle, bottom } from './components'
export default {
  name: 'UserProfile',
  components: { iDialog, profileHeader, middle, bottom, iButton },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isShow: false
    }
  },
  watch: {
    visible(val) {
      this.isShow = val
    }
  },
  created() {
    this.isShow = this.visible
    this.queryUserInfo()
  },
  methods: {
    onClose() {
      this.$refs.bottom.setEdit()
      this.$emit('update:visible', false)
    },
    queryUserInfo() {}
  }
}
</script>

<style lang="scss" scoped></style>
