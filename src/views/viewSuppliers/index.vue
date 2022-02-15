<!--
 * @Author: your name
 * @Date: 2022-02-07 10:34:39
 * @LastEditTime: 2022-02-14 17:18:52
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-portal\src\views\viewSuppliers\index.vue
-->
<template>
  <div class="viewSuppliers">
    <supplierViewTab class="margin-bottom20"
                     v-if="flag"
                     @handleClick="handleTabClick"
                     :current="current" />
    <log-button class="logButton" />
    <supplier360-page v-if="current === 1" />
  </div>
</template>

<script>
import supplierViewTab from '../../components/supplierViewTab'
import logButton from '@/components/logButton'
import supplier360Page from '../supplier360'

export default {
  components: {
    supplierViewTab,
    supplier360Page,
    logButton
  },
  data () {
    return {
      tab: 'supplier360',
      current: 1,
      flag: true
    }
  },
  methods: {
    handleTabClick (index) {
      this.current = index
    }
  },
  mounted () {
    console.log(this.$route)
    if (this.$route.path === '/view-suppliers') {
      this.flag = false
    }

  }
}
</script>

<style scoped lang="scss">
.viewSuppliers {
  position: relative;
  padding: 30px 40px 30px 40px;
  height: 100%;

  .logButton {
    position: absolute;
    top: 30px;
    right: 40px;
  }
}
</style>
