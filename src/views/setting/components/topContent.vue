<template>
  <div>
    <topContentItem
      v-for="item in contentData"
      :key="item.title"
      :data="item.data"
      :title="item.title"
    />
  </div>
</template>

<script>
import topContentItem from './topContentItem'
export default {
  name: 'topContent',
  components: { topContentItem },
  props: {
    activeIndex: {
      type: Number,
      default: -1
    },
    data: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  computed: {
    contentData() {
      if (this.activeIndex === -1) {
        return this.data
      }
      return [this.data[this.activeIndex]]
    }
  }
}
</script>

<style lang="scss" scoped></style>
