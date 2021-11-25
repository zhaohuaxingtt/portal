<template>
  <div class="main">
    <h1 class="title">{{ title }}</h1>
    <el-row gutter="41">
      <applicationListItem
        v-for="item in applications"
        :key="item.name"
        :item="item"
      />
    </el-row>
  </div>
</template>

<script>
import applicationListItem from './applicationListItem'
export default {
  name: 'applicationList',
  components: { applicationListItem },
  props: {
    applications: {
      type: Array,
      default: function () {
        return []
      }
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  margin-bottom: 30px;
}

.title {
  margin-bottom: 10px;
}
</style>
