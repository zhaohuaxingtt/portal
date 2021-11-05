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
    <resultPanel
      v-for="item in resultList"
      :key="item.type"
      :type="item.type"
      :list="item.list"
    />
  </div>
</template>

<script>
import resultPanel from './resultPanel'
export default {
  name: 'searchResult',
  components: { resultPanel },
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
      const allType = this.results.map(e => e.type)
      const typeList = [...new Set(allType)]
      const res = []
      typeList.forEach(type => {
        const list = this.results.filter(e => e.type === type)
        res.push({
          type,
          list
        })
      })
      return res
    }
  }
}
</script>

<style lang="scss" scoped>
.search-result {
  margin-top: 30px;
}
</style>
