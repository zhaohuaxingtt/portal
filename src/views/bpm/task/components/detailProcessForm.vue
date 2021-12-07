<!--
 * @Author: your name
 * @Date: 2021-11-09 15:26:22
 * @LastEditTime: 2021-12-06 12:00:33
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-portal\src\views\bpm\task\components\detailProcessForm.vue
-->
<template>
  <div ref="iframe" v-if="url" class="margin-bottom20">
    <iframe
      :src="url"
      id="flowForm"
      frameborder="no"
      border="0"
      marginwidth="0"
      marginheight="0"
      scrolling="no"
      allowtransparency="yes"
      :style="{
        height: autoFrameHeight ? autoFrameHeight + 'px' : frameHeight
      }"
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
      frameHeight: '500px',
      autoFrameHeight: 0
    }
  },
  watch: {
    formHeight() {
      if (this.formHeight) {
        this.frameHeight = this.formHeight
      }
    }
  },
  created() {
    if (this.formHeight) {
      this.frameHeight = this.formHeight
    }

    window.addEventListener('message', this.setHeight)
  },
  destroyed() {
    window.removeEventListener('message', this.setHeight)
  },
  updated() {
    this.$nextTick(() => {
      if (
        this.$refs.iframe &&
        this.url &&
        this.url.indexOf(window.location.origin) > -1
      ) {
        window.requestAnimationFrame(() => this.initIframeDomObserver())
      }
    })
  },
  methods: {
    setHeight(e) {
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
    },
    initIframeDomObserver() {
      const iframe = document.querySelector('#flowForm')
      iframe.contentWindow.addEventListener('load', () => {
        const iframeAppDom = iframe.contentWindow.document.querySelector('#app') // sourcing vue根DOM
        if (iframeAppDom) {
          const appDomObserver = new MutationObserver(() => {
            const iframeAppContentDom =
              iframeAppDom.querySelector('#appRouterView') // sourcing vue根一级router-view
            this.autoFrameHeight = iframeAppContentDom
              ? iframeAppContentDom.clientHeight || 0
              : 0
          })
          appDomObserver.observe(iframeAppDom, {
            childList: true,
            attributes: true,
            subtree: true
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#flowForm {
  width: 100%;
  //   min-height: 500px;
}
</style>
