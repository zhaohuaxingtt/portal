<template>
<i-card>
   <div class='left'>
     <span>left</span>
   </div>
   <div class='right'>
     right
   </div>
</i-card>
</template>

<script>
import {iCard} from 'rise'

export default {
  name: 'index',
  components:{
    iCard,
  }
}
</script>

<style scoped lang='scss'>
::v-deep .cardBody{
  display: flex;
  flex-flow: row;
  height: calc(100vh - 240px) !important; // 父级没有定义高度
  .left{
    flex: 50% 0 0;
    overflow: auto;
  }
  .right {
    flex: 50% 0 0;
    overflow: auto;
    &::before{
      content: ' ';
      width: 2px;
      height: 100%;
      background: red;
      margin-right: 5px;
      display: inline-block;
      vertical-align: top;
    }
  };

}

</style>