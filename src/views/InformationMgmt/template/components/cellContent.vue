<template>
  <span v-html="text"></span>
</template>

<script>
export default {
  name: 'cellContent',
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  computed: {
    text() {
      if (this.content) {
        return this.content.replace(/<[^>]+>/g, '')
      }
      return this.content
    }
  }
}
</script>

<style lang="scss" scoped></style>
