<template>
  <div class="draw">
    <div v-for="(item, index) in data.hotAreas" :key="index">
      <div
        class="drag-box"
        :style="{
          width: item.width + 'px',
          height: item.height + 'px',
          top: item.yco + 'px',
          left: item.xco + 'px',
          display: 'block',
          borderRadius: '50%'
        }"
        @click="click(item)"
      ></div>
    </div>
    <img class="draw-img" :src="fileFmt(data.filePath)" alt="" />
  </div>
</template>

<script>
import mixin from './../mixins'
export default {
  mixins: [mixin],
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    click(item) {
      this.$emit('change', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.draw {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
}
.drag-box {
  position: absolute;
  background-color: rgba(235, 59, 90, 0.5);
  cursor: pointer;
  /* &:hover{
        box-shadow: 0 0 10px rgba($color: red, $alpha: .5);
    } */
}
</style>
