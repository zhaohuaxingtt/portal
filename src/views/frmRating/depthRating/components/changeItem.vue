<!--
 * @Author: 舒杰
 * @Date: 2021-05-27 13:57:04
 * @LastEditTime: 2022-02-09 17:23:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal-new\src\views\frmRating\depthRating\components\changeItem.vue
-->
<!--
 * @author: shujie
 * @createTime: 2021-5-20 17:32:55
 * @Description:报告分发
 -->
<template>
  <iDialog :title="$t(title)"
           :visible.sync="value"
           width="400px"
           @close='clearDiolog'
           top="40vh">
    <p class="tip margin-bottom10">{{tip}}</p>
    <!-- <iSelect v-model='inquiryBuyer'
             :multiple='multiple'
             :filterable='true'>
      <el-option v-for="(items,index) in inquiryBuyerList"
                 :key='index'
                 :value='items.id'
                 :label="items.nameZh" />
    </iSelect> -->
    <custom-select v-model="inquiryBuyer"
                   :user-options="inquiryBuyerList"
                   multiple
                   style="width:100%"
                   clearable
                   :placeholder="language('QINGXUANZE', '请选择')"
                   display-member="nameZh"
                   value-member="id"
                   value-key="id">
    </custom-select>
    <span slot="footer"
          class="dialog-footer">
      <iButton @click="clearDiolog">{{language('QUXIAO','取消')}}</iButton>
      <!-- <iButton @click="$emit('input',false)">{{$t('SPR_FRM_DEP_ALLCANCEL')}}</iButton> -->
      <iButton :loading='repeatClick'
               @click="sureChangeItems">{{language('FASONG','发送')}}</iButton>
    </span>
  </iDialog>
</template>
<script>
import {
  iSelect,
  iButton,
  iMessage,
  iDialog
} from 'rise';
import { reportIssueUser } from '@/api/frmRating/depthRating';
export default {
  components: {
    iSelect,
    iButton,
    iDialog
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    value: {
      type: Boolean
    },
    repeatClick: Boolean,
    tip: {
      type: String
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      inquiryBuyer: [],
      inquiryBuyerList: []
    }
  },
  created () {
  },
  methods: {
    clearDiolog () {
      this.inquiryBuyer = []
      this.$emit('input', false)
    },
    sureChangeItems () {
      if (!this.inquiryBuyer) return iMessage.warn(this.$t('LK_NINDANGQIANHAIWEIXUANZEXUNJIACAIGOUYUAN'))
      this.$emit('sure', this.inquiryBuyer)
    },
    reportIssueUser (depSupplierId) {
      console.log(depSupplierId)
      reportIssueUser({ depSupplierId }).then(res => {
        if (res.data) {
          this.inquiryBuyerList = res.data.userList
          let defaultList = []
          if (res.data.defaultList) {
            res.data.defaultList.map(item => {
              defaultList.push(item.id)
            })
            this.inquiryBuyer = defaultList
            // let flag = defaultList.every(item => {
            //   return item === depSupplierId
            // })
            this.$emit('flag', true)
          } else {
            // let flag = defaultList.every(item => {
            //   return item === depSupplierId
            // })
            // this.$emit('flag', flag)
          }
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.tip {
  font-size: 14px;
  color: $color-black;
}
.el-select {
  height: auto;
}
</style>
