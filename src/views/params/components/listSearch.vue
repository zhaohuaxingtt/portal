<template>
  <div class="data-permission-menu-search-bar">
    <icon symbol name="iconsousudingbu" />
    <el-input
      class="inline-input"
      clearable
      @clear="handleClear"
      v-model="searchStr"
      :placeholder="$t('search')"
      @keyup.enter.native="handleEnter"
    ></el-input>
  </div>
</template>

<script>
import { Icon } from 'rise'
export default {
  name: 'contractSearch',
  components: { Icon },
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      searchStr: ''
    }
  },
  methods: {
    handleEnter(e) {
      const val = e.target.value
      this.$emit('handle-search', val)
    },
    handleClear() {
      this.$emit('handle-search', '')
    }
  }
}
</script>

<style lang="scss" scoped>
.data-permission-menu-search-bar {
  width: 100%;
  height: 50px;
  background: $color-background;
  display: flex;
  align-items: center;
  padding: 0px 30px;
  ::v-deep input,
  .el-input__inner {
    border: none;
    background: none;
    outline: none;
    flex-grow: 1;
    padding-left: 10px;
  }
  ::v-deep .el-autocomplete {
    width: 100%;
  }
  margin-bottom: 20px;
  border-radius: 10px;
}
</style>
