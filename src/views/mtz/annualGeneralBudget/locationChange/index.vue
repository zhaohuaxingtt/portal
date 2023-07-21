<!--
 * @Author: your name
 * @Date: 2021-10-07 15:05:40
 * @LastEditTime: 2022-12-24 13:00:38
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\index.vue
-->
<!-- 定点与变更 -->
<template>
  <router-view />
</template>

<script>
import { iButton, iTabsList } from 'rise'
import store from '@/store'

export default {
  components: {
    iButton,
    iTabsList
  },
  computed: {
    tabsValue() {
      return this.$store.state.location.locationNumber
    }
  },
  data() {
    return {
      number: 0
    }
  },
  created() {},
  beforeRouteEnter: (to, from, next) => {
    if (to.name == 'MtzLocationPoint') {
      store.commit('locationBtnChange', 1)
    } else if (to.name == 'MtzLocationChange') {
      store.commit('locationBtnChange', 2)
    } else if (to.name == 'ChipLocationPoint') {
      store.commit('locationBtnChange', 3)
    } else if (to.name == 'ChipLocationChange') {
      store.commit('locationBtnChange', 4)
    }
    next()
  },
  watch: {},
  methods: {
    tableChange(val) {
      console.log(this.number++)
      if (val.name !== this.tabsValue) {
        var path = ''
        if (val.name == 1) {
          path = 'MtzLocationPoint'
        } else if (val.name == 2) {
          path = 'MtzLocationChange'
        } else if (val.name == 3) {
          path = 'ChipLocationPoint'
        } else if (val.name == 4) {
          path = 'ChipLocationChange'
        }
        this.$router
          .push({ name: path })
          .then((res) => {
            store.commit('locationBtnChange', val.name)
          })
          .catch((err) => {
            console.log('输出报错', err)
          })
      }
    }
  },
  destroyed() {
    store.commit('locationBtnChange', 1)
  }
}
</script>

<style lang="scss" scoped>
</style>