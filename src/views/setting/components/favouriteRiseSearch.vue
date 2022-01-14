<template>
  <div class="favourite-rise-search">
    <div class="input-box">
      <label>{{ language('菜单名称') }}</label>
      <iInput v-model="menuName" />
    </div>
    <div class="actions">
      <iButton @click="search">搜索</iButton>
      <iButton @click="search">重置</iButton>
    </div>
  </div>
</template>

<script>
import { iInput, iButton } from 'rise'
export default {
  name: 'favouriteRiseSearch',
  components: { iInput, iButton },
  data() {
    return {
      menuName: ''
    }
  },
  methods: {
    search() {
      this.$emit('search', this.menuName)
    },
    reset() {
      this.menuName = ''
      this.search()
    }
  }
}
</script>

<style lang="scss" scoped>
.favourite-rise-search {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: solid 1px rgba(112, 112, 112, 0.15);
  padding-bottom: 30px;
}
.input-box {
  width: 170px;
  label {
    margin-bottom: 10px;
    display: block;
  }
}
</style>
