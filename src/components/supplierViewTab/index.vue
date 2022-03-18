<template>
  <div class="box">
    <div class="item" v-for="(item,index) of list" :key="item.title" @click="handleClick(index + 1)">
      <div class="text" :class="{'textActive': current === index + 1}">{{ item.key ? $t(item.key) : item.title }}</div>
      <div class="line" v-if="current === index + 1"/>
    </div>
    <iButton class="btn" @click="goback">{{$t('LK_FANHUI')}}</iButton>
  </div>
</template>

<script>
import { iButton } from "rise"
export default {
  components:{iButton},
  props: {
    current: {type: Number, default: 1},
    list: {
      type: Array,
      default: () => {
        return [
          {title: '供应商360', key: 'SUPPLIER_GOYINGSHANG360'},
          // {title: '供应商绩效', key: 'SUPPLIER_GONGYINGSHANGJIXIAO'}
        ]
      }
    }
  },
  methods: {
    goback(){
      this.$router.go(-1)
    },
    handleClick(index) {
      this.$emit('handleClick', index)
    }
  }
}
</script>

<style scoped lang="scss">
.btn{
  margin-right:80px;
  margin-bottom:10px;
}
.box {
  width: 100%;
  padding-bottom: 1px;
  border-bottom: 1px solid #E3E3E3;;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .item {
    margin-right: 50px;
    cursor: pointer;

    .text {
      font-size: 20px;
      line-height: 23px;
      color: #727272;
    }

    .textActive {
      font-weight: bold;
      color: #000000;
    }

    .line {
      margin-top: 10px;
      width: 60%;
      height: 3px;
      background: #1763F7;
      border-radius: 2px;
    }
  }
}
::v-deep .tab {
  height:100%;
  ::v-deep .el-tabs__header {
    /*  position: absolute;
      top: 20px;
      transform: translate(0, 5px);
      z-index: 1;*/

    .el-tabs__nav-wrap::after {
      background: transparent;
    }

    .el-tabs__active-bar {
      width: 85% !important;
      height: 3px;
      background: $color-blue;
      border-radius: 2px;
    }

    .el-tabs__item {
      font-size: 18px;
      color: #000000;
      opacity: 0.42;
      height: 35px;
      line-height: 35px;

      & + & {
        padding: 0 25px;
      }
    }

    .is-active {
      opacity: 1;
      font-weight: bold;
    }
  }
}
</style>
