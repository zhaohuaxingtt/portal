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
  </div>
</template>

<script>
import carouselBox from './components/index.vue'

export default {
  components: {
    carouselBox,
  },
  data() {
    return {
    };
  },
  methods: {},
};
</script>
<style lang="scss" scoped>

.tab-list-box {
  display: flex;
  justify-content: start;

  ::v-deep .lev1 .name::after {
    transition: 0s;
  }
}
</style>
