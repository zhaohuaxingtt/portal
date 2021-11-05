<!--
 * @Author: youyuan
 * @Date: 2021-09-01 10:18:46
 * @LastEditTime: 2021-10-11 18:58:02
 * @LastEditors: Please set LastEditors
 * @Description: 通知linie
 * @FilePath: \重庆软维科技\front-portal\src\views\mtz\annualGeneralBudgetLeader\annualBudget\components\linie.vue
-->
<template>
  <div>
    <iDialog :title="language('TONGZHILINIEQUEREN', '通知Linie确认')" :visible.sync="value" width="20%" @close='closeDiolog'>
      <el-form :inline="true" :model="form" label-position="top" class="demo-form-inline">
        <el-form-item style="width: 100%;" :label="language('QUERENSHIJIAN', '确认时间')">
          <iDatePicker  v-model="form['date']" type="date" valueFormat="yyyy-MM-dd" :picker-options="pickerOptions"></iDatePicker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <iButton @click="handleSubmit">确 定</iButton>
      </div>
    </iDialog>
  </div>
</template>

<script>
import { iDialog, iDatePicker, iButton, iMessage } from 'rise'
export default {
  components: {
    iDialog,
    iDatePicker,
    iButton
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      form: {date: null},
      pickerOptions: {
        disabledDate(date) {
          return date < (new Date() - 24*60*60*1000)
        }
      }
    }
  },
  created() {

  },
  methods: {
    // 关闭弹窗
    closeDiolog() {
      this.$emit('closeDiolog')
    },
    // 确定
    handleSubmit() {
      if(!this.form.date) return iMessage.error(this.language('QINGXUANZEQUERENSHIJIAN', '请选择确认时间'))
      this.$emit('handleSubmitLinie', this.form)
    }
  }
}
</script>

<style lang='scss' scoped>
::v-deep .el-date-editor.el-input, .el-date-editor.el-input__inner {
     width: 100%!important;; 
}
 
</style>