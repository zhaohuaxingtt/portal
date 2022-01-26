<!--
 * @Author: YoHo
 * @Date: 2022-01-17 09:49:53
 * @LastEditTime: 2022-01-25 20:59:32
 * @LastEditors: YoHo
 * @Description: 
-->
<template>
  <iCard class="page-preview" v-loading="pageLoading">
    <iframe v-if="src" :src='src' width="100%" height="100%" class="preview-iframe"/>
  </iCard>
</template>

<script>
import { iCard } from "rise";
export default {
  components: {
    iCard
  },

  props: {
    src: {
      type: String,
      default: ''
    }
  },

  data(){
    return {
      pageLoading: true,
    }
  },

  methods: {
    loading(){
      this.pageLoading = false;
    }
  }
}
</script>

<style lang='scss' scoped>
.page-preview{
  height: 100%;

  ::v-deep div{
    height: 100% !important;
  }

  .preview-iframe {
    height: 100%;
    border: 0;
  }
}

</style>