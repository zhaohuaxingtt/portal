<!--
 * @Author: your name
 * @Date: 2021-08-19 10:59:11
 * @LastEditTime: 2021-08-19 15:53:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\search\components\result.vue
-->
<template>
  <div class="search-result">
    <result-item 
      v-for="item in resultList"
      :key="item.url"
      :item='item'
    />
  </div>
</template>

<script>
import resultItem from './resultItem.vue'
export default {
  name: 'searchResult',
  components: { resultItem},
  props: {
    results: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  computed: {
    resultList() {
      return this.results
    }
  },
}
</script>

<style lang="scss" scoped>
.search-result {
  margin-top: 30px;
}
</style>
