<!--
 * @Author: YoHo
 * @Date: 2022-01-17 09:49:53
 * @LastEditTime: 2022-01-27 18:54:09
 * @LastEditors: YoHo
 * @Description: 附件预览
-->
<template>
  <iPage class="page-preview">
    <div class="margin-bottom10">
      <div class="pageTitle">{{title}}</div>
    </div>
    <div class="pdf-box">
      <pdf ref="pdf" :src='src'/>
    </div>
  </iPage>
</template>

<script>
import { iPage } from "rise";
import pdf from "./pdf";
export default {
  components: {
    iPage,
    pdf
  },
  data() {
    return {
      title: '',
      src:''
    }
  },
  created(){
    this.title = this.$route.query.title
    this.src = this.$route.query.src
  },
  mounted(){
    this.$refs.pdf.loading()
  }
}
</script>

<style lang='scss' scoped>
.page-preview{

  .pageTitle {
    font-size: 20px;
    font-weight: bold;
  }
  .pdf-box{
    height: calc(100% - 34px);
  }
}

</style>