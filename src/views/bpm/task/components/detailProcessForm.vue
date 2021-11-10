<template>
  <div v-if="url && formHeight !== '0px'" class="margin-bottom20">
    <iframe
      :src="url"
      id="flowForm"
      frameborder="no"
      border="0"
      marginwidth="0"
      marginheight="0"
      scrolling="no"
      allowtransparency="yes"
      :style="{ height: formHeight }"
    />
  </div>
</template>

<script>
export default {
  name: 'flowForm',
  props: {
    flowFormUrl: {
      type: String
    },
    formHeight: {
      type: String
    }
  },
  computed: {
    url() {
      if (!this.flowFormUrl) {
        return ''
      }
      if (this.flowFormUrl && this.flowFormUrl.indexOf('http') > -1) {
        return this.flowFormUrl
      }
      return 'http://' + this.flowFormUrl
    }
  }
}
</script>

<style lang="scss" scoped>
#flowForm {
  width: 100%;
  min-height: 500px;
}
</style>
