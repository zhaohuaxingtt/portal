<!--
 * @Author: youyuan
 * @Date: 2021-08-31 17:20:16
 * @LastEditTime: 2021-11-03 11:47:00
 * @LastEditors: Please set LastEditors
 * @Description: 新增
 * @FilePath: \重庆软维科技\front-portal\src\views\mtz\annualGeneralBudgetLeader\annualBudget\components\add.vue
-->
<template>
  <div>
    <iDialog :title="language('ZHUANPAI', '转派')"
             :visible.sync="value"
             v-if="value"
             width="20%"
             @close='closeDiolog'>
      <el-form :inline="true"
               :model="form"
               label-position="top"
               class="demo-form-inline">
        <el-form-item style="margin-right:40px;width: 100%;"
                      :label="language('QINGXUANZECAIGOUYUAN', '请选择采购员')">
          <iSelect v-model="form.selData"
                   @change="handleChange"
                   filterable
                   value-key="code"
                   :placeholder="language('QINGXUANZE','请选择')">
            <el-option v-for="item in buyerList"
                       :key="item.code"
                       :value="item"
                       :label="item.message"></el-option>
          </iSelect>
          <!-- <iSelect 
          v-model="form" 
          @change="handleChange" 
          filterable 
          remote 
          :remote-method="remoteGetBuyer"
          :loading="buyerLoading"
          :placeholder="language('QINGXUANZE','请选择')" >
            <el-option v-for="(item, index) in buyerList" :key="index" :value="{linieId: item.code, linieName: item.message}" :label="item.message"></el-option>
          </iSelect> -->
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <iButton @click="closeDiolog">{{language('FANHUI', '返回')}}</iButton>
        <iButton @click="handleSubmit">{{language('QUEREN', '确认')}}</iButton>
      </div>
    </iDialog>
  </div>
</template>

<script>
import { iDialog, iSelect, iButton, iMessage } from 'rise'
import { fetchBuyerData } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzReplenishmentOverview/detail'
import { debounce } from '@/views/mtz/debounce.js'
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
      form: {},
      buyerLoading: false,
      buyerList: [],
    }
  },
  created () {
    this.getListData();
  },
  methods: {
    // 关闭弹窗
    closeDiolog () {
      this.$emit('handleReturnDetail')
      this.value = false;
    },
    // 确定
    handleSubmit () {
      if (this.form.selData) {
        this.$emit('handleSubmitAssign', this.form.selData)
      } else {
        iMessage.error("请选择采购员！")
      }
    },
    getListData () {
      fetchBuyerData({}).then(res => {
        // this.buyerLoading = false
        if (res && res.code == 200) {
          this.buyerList = res.data
          // console.log('buyerList', this.buyerList);
        } else iMessage.error(res.desZh)
      })
    },
    handleChange (val) {
      console.log(val)
    }
    // 远程搜索采购员数据
    // remoteGetBuyer(query) {
    //   this.buyerLoading = true
    //   debounce(fetchBuyerData({
    //     keyWord: query
    //   }).then(res => {
    //     this.buyerLoading = false
    //     if(res && res.code == 200) {
    //       this.buyerList = res.data
    //       console.log('buyerList', this.buyerList);
    //     } else iMessage.error(res.desZh)
    //   }))
    // },
  }
}
</script>

<style lang='scss' scoped>
</style>
