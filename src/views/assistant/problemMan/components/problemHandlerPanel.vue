<template>
  <div class="flex flex-row content">
    <div class="left-content">左侧</div>
    <div class="right-content ml20">右侧</div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: Number,
      default: 1,
    }
  },
  mounted() {
    console.log(this.type,'???');
  }
}
</script>

<style lang="scss" scoped>
@import '../../comon.scss';
.content {
  width: 100%;
  height: 94%;
  .left-content{
    width: 28%;
    min-height: 100%;
    background: #FFFFFF;
    box-shadow: 0px 0px 10px rgba(27, 29, 33, 0.08);
    opacity: 1;
    border-radius: 5px;
    padding: 15px 20px 0px 20px;
    overflow-y: auto;
  }
  .right-content{
    width: 100%;
    height: 100%;
    background: #FFFFFF;
    box-shadow: 0px 0px 10px rgba(27, 29, 33, 0.08);
    opacity: 1;
    border-radius: 5px;
    padding: 30px 40px 20px 40px;
  }
}
</style>
