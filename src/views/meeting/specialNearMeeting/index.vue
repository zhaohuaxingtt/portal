<!--
 * @Author: yuszhou
 * @Date: 2021-02-19 15:12:20
 * @LastEditTime: 2021-02-19 18:01:14
 * @LastEditors: Please set LastEditors
 * @Description: 首页
 * @FilePath: \rise\src\views\home\index.vue
-->
<template>
  <div>
    <carouselBox />
    <myTopics />
    <dataDownload/>
  </div>
</template>

<script>
import carouselBox from './components/carouselBox/index.vue'
import myTopics from './components/myTopics/index.vue'
import dataDownload from '../specialLive/components/dataDownload.vue'

export default {
  components: {
    carouselBox,
    myTopics,
    dataDownload
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
::v-deep .routerpage {
  overflow-y: auto;
}

.tab-list-box {
  display: flex;
  justify-content: start;

  ::v-deep .lev1 .name::after {
    transition: 0s;
  }
}
</style>
