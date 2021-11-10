<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-10-15 14:31:52
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <i-dialog :visible.sync="value" :title="language('GERENYINGSIZHENCE','个人隐私政策')" width="40%" @close="clearDiolog">
    <span>{{language('HUANYINGSHIYONGSHANGQIDAZONGCAIGOUXITONG_QINGZIXIYUEDUBINGQUEREN','欢迎使用上汽大众采购系统，请仔细阅读并确认')}}</span>《
    <span @click="handlePolicy" class="cursor openLinkText">{{language('GERENYINGSIZHENGCE','个人隐私政策')}}</span>》
    <div slot="footer" class="dialog-footer">
      <iButton @click="handleConsent">{{language('TONGYI','同意')}}</iButton>
      <iButton @click="clearDiolog">{{language('QUXIAO','取消')}}</iButton>
    </div>
  </i-dialog>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
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

    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    handleConsent() {
      this.clearDiolog()
      this.$parent.$parent.addDialogFlag = 0
      this.$parent.$parent.addTableItem()
    },
    clearDiolog() {
      this.$emit("input", false);
    },
    handlePolicy() {
      this.clearDiolog()
      this.$parent.$parent.handlepersonalPrivacyPolicy()
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
<style lang='scss' scoped>
// @import url(); 引入公共css类
::v-deep .el-dialog__footer {
  text-align: center;
}
.openLinkText{
  color: #1763f7;
}
</style>
