<template>
  <div class="viewSuppliers">
    <supplierViewTab class="margin-bottom20" @handleClick="handleTabClick" :current="current"/>
    <log-button class="logButton"/>
    <supplier360-page v-if="current === 1"/>
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
  data() {
    return {
      tab: 'supplier360',
      current: 1
    }
  },
  methods:{
    handleTabClick(index) {
      this.current = index
    }
  }
}
</script>

<style scoped lang="scss">
.viewSuppliers {
  position: relative;
  padding: 30px 40px 30px 40px;
  height: 100%;

  .logButton{
    position: absolute;
    top: 30px;
    right: 40px;
  }
}
</style>
