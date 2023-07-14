<!-- MTZ定点分页页面 -->
<template>
  <theSearchTable v-if="$route.meta.showFooter"></theSearchTable>
  <router-view v-else />
</template>

<script>
import theSearchTable from './components/theSearchTable'
export default {
  name: '',
  components: {
    theSearchTable
  },
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>