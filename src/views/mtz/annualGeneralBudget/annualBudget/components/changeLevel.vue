<!--
 * @Author: youyuan
 * @Date: 2021-09-01 11:01:03
 * @LastEditTime: 2021-11-01 16:16:51
 * @LastEditors: Please set LastEditors
 * @Description: 更改用量版本
 * @FilePath: \重庆软维科技\front-portal\src\views\mtz\annualGeneralBudgetLeader\annualBudget\components\changeLevel.vue
-->
<template>
  <div>
    <iDialog :title="language('GENGGAIYONGLIANGBANBEN', '更改用量版本')"
             :visible.sync="value"
             width="20%"
             @close='closeDiolog'>
      <el-form :inline="true"
               :model="form"
               label-position="top"
               class="demo-form-inline">
        <el-form-item style="width: 100%; margin-right:40px;"
                      :label="language('QINGXUANZEBANBEN', '请选择版本')">
          <!-- <iSelect v-model="selectValue"
                   :placeholder="language('QINGXUANZE','请选择')"
                   @change="handleChangeDemand">
            <el-option v-for="item in demandList"
                       :key="item.keyId"
                       :value="item.keyId"
                       :label="item.source + ' - ' + item.versionNo"></el-option>
          </iSelect> -->
          <custom-select 
          v-model="selectValue"
          :user-options="demandList"
          @change="handleChangeDemand"
          :placeholder="language('QINGXUANZE', '请选择')"
          display-member="keyId"
          value-member="keyId"
          value-key="keyId"/>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <iButton @click="handleSubmit">确 定</iButton>
      </div>
    </iDialog>
  </div>
</template>

<script>
import { iDialog, iSelect, iButton, iMessage } from 'rise'
import { fetchDemand } from '@/api/mtz/annualGeneralBudget/annualBudget.js'
export default {
  components: {
    iDialog,
    iSelect,
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
        demandVersion: "",
        demandType: ""
      },
      demandList: [],
      selectValue: ""
    }
  },
  created () {
    this.getDemandData()
  },
  methods: {
    // 关闭弹窗
    closeDiolog () {
      this.$emit('closeDiolog')
    },
    // 确定
    handleSubmit () {
      this.$emit('handleSubmitChangeLevel', this.form)
    },
    // 获取用量版本
    getDemandData () {
      fetchDemand({}).then(res => {
        if (res && res.code == 200) {
          this.demandList = res.data
        } else iMessage.error(res.desZh)
      })
    },
    // 改变用量版本
    handleChangeDemand (val) {
      this.demandList.forEach(item => {
        if (item.keyId == val) {
          this.$set(this.form, 'demandType', item.source);
          this.$set(this.form, 'demandVersion', item.versionNo);
        }
      })
      console.log(this.form)
    }
  }
}
</script>

<style lang='scss' scoped>
::v-deep .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100% !important;
}
</style>
