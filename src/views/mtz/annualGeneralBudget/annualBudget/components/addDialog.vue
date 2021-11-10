<!--
 * @Author: youyuan
 * @Date: 2021-08-31 17:20:16
 * @LastEditTime: 2021-11-01 15:03:10
 * @LastEditors: Please set LastEditors
 * @Description: 新增
 * @FilePath: \重庆软维科技\front-portal\src\views\mtz\annualGeneralBudgetLeader\annualBudget\components\add.vue
-->
<template>
  <div>
    <iDialog :title="language('JISUANNIANDUYUSUANCHUSHIBANBEN', '计算年度预算初始版本')" :visible.sync="value" width="30%" @close='closeDiolog'>
      <el-form :inline="true" :model="form" label-position="top" class="demo-form-inline">
        <el-form-item :label="language('YUSUANNIANFEN', '预算年份')">
          <iDatePicker v-model="form['forecastTime']" valueFormat="yyyy" type="year" @change="changeYear"></iDatePicker>
        </el-form-item>
        <el-form-item style="margin-right:40px;" :label="language('YONGLIANGBANBEN', '用量版本')">
          <!-- <iSelect v-model="level" :placeholder="language('QINGXUANZE','请选择')">
            <el-option v-for="(item, index) in demandList" :key="item.keyId" :value="item.keyId"  :label="item.keyId"></el-option>
          </iSelect> -->
          <custom-select 
          v-model="level"
          :user-options="demandList"
          :placeholder="language('QINGXUANZE', '请选择')"
          display-member="keyId"
          value-member="keyId"
          value-key="keyId"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <iButton @click="handleSubmit">确 定</iButton>
      </div>
    </iDialog>
  </div>
</template>

<script>
import { iDialog, iSelect, iDatePicker, iButton, iMessage } from 'rise'
import { fetchDemand } from '@/api/mtz/annualGeneralBudget/annualBudget.js'
export default {
  components: {
    iDialog,
    iSelect,
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
      form: {
        demandType: null,
        demandVersion: null,
        forecastTime: null
      },
      level: null,
      demandList: []
    }
  },
  computed: {
  },
  created() {
    this.getDemandData()
  },
  methods: {
    // 关闭弹窗
    closeDiolog() {
      this.$emit('closeDiolog')
    },
    // 确定
    handleSubmit() {
      const obj = this.demandList.find(item => item.keyId == this.level)
      this.form.demandType = obj.source
      this.form.demandVersion = obj.versionNo
      for(let key in this.form) {
        if(!this.form[key]) {
          return iMessage.error(this.language('QTXYLBBJYSNF', '请填写用量版本及预算年份'))
        }
      }
      this.$emit('handleSubmitAdd', this.form)
    },
    // 获取用量版本
    getDemandData() {
      fetchDemand({}).then(res => {
        if(res && res.code == 200) {
          this.demandList = res.data
        } else iMessage.error(res.desZh)
      })
    },
    // 选中年份改变
    changeYear() {
      if(this.form.forecastTime && this.form.forecastTime <= new Date().getFullYear()) {
        iMessage.warn(this.language('QINGXUANZEYIHOUNIANFEN', '请选择当前年份之后的年份数据'))
      }
    },
    // 改变用量版本
    handleChangeDemand({demandType, demandVersion}) {
      this.$set(this.form , 'demandType', demandType)
      this.$set(this.form , 'demandVersion', demandVersion)
    }
  }
}
</script>

<style lang='scss' scoped>

 
</style>
