<!--仅看自己--->
<template>
  <div class='showMe'>
    <span>{{  language('LK_JINKANZIJI', '仅看自己') }}</span>
    <el-switch v-model='isOnlyMyself' @change='showOnlyMyselfData($event)'
               active-color='#1660F1' inactive-color='#cccccc'></el-switch>
  </div>
</template>

<script>
export default {
  name: 'ShowMeComponents',
  props: {
    isOnlyMyself: { type: Boolean, default: true }
  },
  methods: {
    showOnlyMyselfData(val) {
      this.$emit('showOnlyMyselfData', val)
    }
  }
}
</script>

<style scoped lang='scss'>
.showMe {
  display: flex;
  align-items: center;

  span {
    font-size: 20px;
    color: #000000;
    align-content: center;
  }

  .el-switch {
    margin-left: 10px;
  }
}
</style>