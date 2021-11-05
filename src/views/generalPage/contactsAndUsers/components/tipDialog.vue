<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-10-15 14:31:52
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <i-dialog :visible.sync="value" :title="language('TISHI','提示')" width="40%" @close="clearDiolog">
    <span>{{language('WBZAQXRGYHLZHZGZGWDDXYDGYSGLYLJSCYHZHRY','为保证安全性，如用户离职或者工作岗位调动，相应的供应商管理员应立即删除此用户帐户。如因未及时删除帐户而造成的相应损失，必须由对应供应商承担。')}}</span>
    <div slot="footer" class="dialog-footer">
      <iButton @click="clearDiolog">{{language('QUERENG','确认')}}</iButton>
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
    clearDiolog() {
      this.$emit("input", false);
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
</style>
