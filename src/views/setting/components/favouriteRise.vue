<template>
  <iCard>
    <favouriteRiseSearch />
    <h4 class="t">菜单列表</h4>
    <div class="content">
      <div class="content-panel menu">
        <favouriteRiseMenu />
      </div>
      <div class="content-panel has-menu">
        <favouriteRiseMenuHas />
      </div>
    </div>
  </iCard>
</template>

<script>
import { iCard } from 'rise'
import favouriteRiseSearch from './favouriteRiseSearch'
import favouriteRiseMenu from './favouriteRiseMenu'
import favouriteRiseMenuHas from './favouriteRiseMenuHas'
export default {
  name: 'favouriteRise',
  components: {
    iCard,
    favouriteRiseSearch,
    favouriteRiseMenu,
    favouriteRiseMenuHas
  }
}
</script>

<style lang="scss" scoped>
.t {
  font-size: 16px;
  margin: 30px 0px;
}
.content {
  display: flex;
  justify-content: space-between;
  .content-panel {
    border: 1px solid #eaeaea;
    padding: 20px;
    box-sizing: border-box;
    &.menu {
      width: calc(100% - 520px);
    }
    &.has-menu {
      width: 500px;
    }
  }
}
</style>
