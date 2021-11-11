<!--
 * @Author: your name
 * @Date: 2021-08-19 10:58:38
 * @LastEditTime: 2021-08-19 15:03:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\search\components\resultPanel.vue
-->
<template>
  <div class="result-panel">
    <!-- <div class="category-name" v-if="!searchForm.category">
      {{ type }}
    </div> -->
    <resultItem v-for="(item, index) in list" :key="index" :item="item" />
  </div>
</template>

<script>
import resultItem from './resultItem.vue'
export default {
  name: 'resultPanel',
  components: { resultItem },
  inject: ['searchForm'],
  props: {
    type: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: function() {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.result-panel {
  margin-bottom: 20px;
}
.category-name {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
