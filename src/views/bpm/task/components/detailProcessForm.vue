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
      :style="{ height: frameHeight }"
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
  },
  data() {
    return {
      frameHeight: '300px'
    }
  },
  created() {
    this.frameHeight = this.formHeight
    window.addEventListener('message', (e) => {
      if (e && e.data) {
        try {
          const data = e.data
          if (data.value && data.key === 'setFormHeight') {
            this.frameHeight = data.value
          }
        } catch (error) {
          console.log('error', error)
        }
      }
    })
  },
  destroyed() {
    window.removeEventListener('message')
  }
}
</script>

<style lang="scss" scoped>
#flowForm {
  width: 100%;
  //   min-height: 500px;
}
</style>
