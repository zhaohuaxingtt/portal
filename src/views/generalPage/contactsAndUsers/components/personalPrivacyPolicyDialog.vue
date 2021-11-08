<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-10-15 14:31:52
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <i-dialog :visible.sync="value" width="80%" @close="clearDiolog">
    <div class="content" v-html="detail"></div>
    <div slot="footer" class="dialog-footer"></div>
  </i-dialog>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { getCommitmentLetter } from "../../../../api/register/contactsAndUsers";
import { iDialog, iButton } from "rise";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { iDialog, iButton },
  props: {
    value: { type: Boolean }
  },
  data() {
    // 这里存放数据
    return {
      detail: ''
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    value: {
      async handler(val) {
        if (val) {
          const res = await getCommitmentLetter('个人隐私政策', this.$route.query.supplierType)
          this.detail = res.data.detail
        }
      }
    }
  },
  // 方法集合
  methods: {
    handleConsent() {
      this.clearDiolog()
      this.$parent.$parent.addTableItem()
    },
    clearDiolog() {
      this.$emit("input", false);
    },
    handlePolicy() {
      this.clearDiolog()
      console.log(this.$parent);
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
}
</script>
<style lang='scss'>
// @import url(); 引入公共css类
.content {
  .title {
    font-family: '微软雅黑', sans-serif;
    color: black;
    font-weight: 700;
  }
  .title-1 {
    font-size: 26.5px;
    font-weight: bold;
  }
  .underline {
    text-decoration: underline;
    color: #000;
    font-weight: bold;
  }
  .update {
    text-align: right;
    div {
      margin-top: 10px;
    }
  }
}
</style>
