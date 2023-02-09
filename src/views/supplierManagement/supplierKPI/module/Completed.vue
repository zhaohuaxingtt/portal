<template>
  <div class="page">
    <img :src="pc" >
    <p>您已成功提交打分任务！</p>
    <span>温馨提示：</span>
    <span>
      于2023.01.2323:59:59之前您都可以对打分结果进行修改、重新提交。截止时间过后则不可再进行修改。
    </span>
  </div>
</template>

<script>
import pc from '@/assets/images/Completed.png'
import { iCard } from 'rise'
export default {
  components: {
    iCard
  },
  props: {
    col: {}
  },
  data(){
    return {
        pc
    }
  }
}
</script>
<style lang="scss" scoped>
.page {
  padding: 80px;
  width: 40%;
  margin-left: 30%;
  text-align: center;
  p {
    font-size: 18px;
    font-weight: 600;
    margin: 20px 0;
  }
  span {
    text-align: left;
    margin: 10px 0;
    font-size: 16px;
    display: block;
  }
  img{
    width: 200px;
    display: inline-block;
    height: 200px;
  }
}
</style>
