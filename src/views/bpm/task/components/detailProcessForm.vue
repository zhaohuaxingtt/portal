<!--
 * @Author: your name
 * @Date: 2021-11-09 15:26:22
 * @LastEditTime: 2021-11-22 12:41:46
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-portal\src\views\bpm\task\components\detailProcessForm.vue
-->
<template>
  <div v-if="url && formHeight !== '0px'"
       class="margin-bottom20">
    <iframe :src="url"
            id="flowForm"
            frameborder="no"
            border="0"
            marginwidth="0"
            marginheight="0"
            scrolling="no"
            :style="{ height: formHeight }"
            allowtransparency="yes" />

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
    url () {
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
  //   min-height: 500px;
}
</style>
