<template>
  <div class="avatar">
    <ImgCutter
      :cutWidth="400"
      :cutHeight="400"
      rate="1:1"
      fileType="png"
      @cutDown="handleCutDown"
    >
      <icon
        v-if="!avatar"
        symbol
        name="iconmorentouxiang"
        class="default-avatar"
        slot="open"
      />
    </ImgCutter>
  </div>
</template>

<script>
import { Icon } from 'rise'
import ImgCutter from 'vue-img-cutter'
export default {
  name: 'profileHeaderAvatar',
  components: { Icon, ImgCutter },
  props: {
    avatar: {
      type: String
    }
  },
  methods: {
    handleCutDown(content) {}
  }
}
</script>

<style lang="scss" scoped>
.avatar {
  width: 84px;
  height: 84px;
  border-radius: 42px;
  margin-right: 40px;
}
.default-avatar {
  font-size: 84px;
}
</style>
