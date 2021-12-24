<template>
<i-card>
   <div class='left'>
     <span>left</span>
   </div>
   <div class='right'>

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

  .left{
    flex: 50% 0 0;
    background: #00a378;
    &:after{
      content: '1222';
      width: 1px;
      color: red;
      height: 100%;
    }
  }
  .right {
    flex: 50% 0 0;
    background: #0EBADD;
  };

}

</style>