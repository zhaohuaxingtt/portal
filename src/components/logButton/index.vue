<template>
  <div class="log-box">
    <div @click="toLogPage" class="log-box">
      <icon symbol name="iconrizhiwuzi" class="log-icon"/>
      <span class="log-word">{{ $t('LK_RIZHI') }}</span>
    </div>
    <div @click="toSql" v-show="sqlShow">
      <icon symbol name="icondatabaseweixuanzhong" class="log-icon margin-left10"></icon>
    </div>
  </div>
</template>

<script>
import {icon} from 'rise'

export default {
  components: {
    icon
  },
  props:{
    sqlShow:{
      type:Boolean,
      default:()=>false
    }
  },
  methods: {
    toLogPage() {
      this.$emit('toLogPage')
    },
    toSql(){
      this.$emit('toSql')
    }
  }
}
</script>

<style scoped lang="scss">
.log-box {
  display: flex;
  align-items: center;
  margin-left: 10px;
  cursor: pointer;

  .log-icon {
    font-size: 20px;
  }

  .log-word {
    color: $color-blue;
  }
}
</style>
