<template>
  <iPage>
    <headerNav>
      <iLoger
        ref="log"
        :credentials="true"
        isPage
        :isUser="true"
        class="margin-left25"
      />
    </headerNav>
    <router-view></router-view>
  </iPage>
</template>

<script>
import { iPage } from 'rise'
import iLoger from 'rise/web/components/iLoger'
import headerNav from './headerNav'
export default {
  components: {
    iPage,
    iLoger,
    headerNav
  }
}
</script>

<style lang="scss" scoped>
</style>