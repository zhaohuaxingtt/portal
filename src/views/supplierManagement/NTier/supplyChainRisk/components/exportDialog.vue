<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-24 19:37:41
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <iDialog :modal="false" :title="language('DAOCHUQUANBU','导出全部')" @close="clearDiolog" :visible.sync="value" width="40%">
    <el-form :model="form" ref="rulesForm" :rules="rules">
      <el-form-item prop="isExportPartNum" :label="language('SFDCGHLJHXQ','是否导出供货零件号详情')">
        <iSelect v-model="form.isExportPartNum">
          <el-option v-for="(item,index) in formGroup.isPartList" :key="index" :label="item.label" :value="item.value"></el-option>
        </iSelect>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <iButton @click="handleConfirm">{{language('QUEREN','确认')}}</iButton>
    </div>
  </iDialog>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { iDialog, iButton, iSelect } from "rise";
import { exportCurrent } from "@/api/supplierManagement/supplyChainRisk/index.js";

export default {
  // import引入的组件需要注入到对象中才能使用
  components: { iDialog, iButton, iSelect },
  props: {
    value: { type: Boolean },
  },
  data() {
    // 这里存放数据
    return {
      rules: {
        isExportPartNum: [
          { required: true, message: '请选择是否导出供货零件号详情', trigger: ['blur', 'change'] },
        ]
      },
      form: {
        isExportPartNum: ''
      },
      formGroup: {
        isPartList: [
          {
            label: '是',
            value: true
          }, {
            label: "否",
            value: false
          }
        ]
      }
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    clearDiolog() {
      this.$emit('input', false);
    },
    handleConfirm() {
      this.$refs.rulesForm.validate(async (valid) => {
        if (valid) {
          const pms = {
            eventId: this.$route.query.id,
            ...this.form
          }
          await exportCurrent(pms)
          this.clearDiolog()
        }
      })
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
</style>
