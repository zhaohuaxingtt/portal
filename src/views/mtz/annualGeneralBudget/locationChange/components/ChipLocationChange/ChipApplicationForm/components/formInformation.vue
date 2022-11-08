<!--
 * @Author: your name
 * @Date: 2021-10-27 19:27:35
 * @LastEditTime: 2022-03-03 15:54:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationChange\MTZapplicationForm\components\formInformation.vue
-->
<template>
  <div>
    <div class="header flex">
      <div>
        <span class="title">
          {{ language('芯片补差申请单', '芯片补差申请单') }}-{{
            formInline.appNo
          }}-{{ formInline.appName }}-{{ linieName }}-
          <span class="dTitle">{{ linieDeptNumK2 }}</span>
        </span>
      </div>
      <div>
        <iButton
          v-if="!isView"
          @click="save(2)"
          :disabled="disabled"
          v-permission="PORTAL_MTZ_CHANGE_INFOR_TIJIAO"
          >{{ language('TIJIAO', '提交') }}</iButton
        >
      </div>
    </div>
    <iCard>
      <template slot="header">
        <span style="font-weight: bold">{{
          language('SHENGQINGDANXINXI', '申请单信息')
        }}</span>
        <iButton
          v-if="!isView"
          @click="save(1)"
          :disabled="disabled"
          v-permission="PORTAL_MTZ_CHANGE_INFOR_BAOCUN"
          >{{ language('BAOCUN', '保存') }}</iButton
        >
      </template>
      <div class="informationForm">
        <el-form
          inline
          ref="baseInfoForm"
          class="baseInfoForm"
          :model="formInline"
          :rules="rules"
        >
          <iFormItem label="申请单名" class="formItem" prop="appName">
            <el-input
              :disabled="isView ? true : disabled ? true : false"
              v-model="formInline.appName"
            ></el-input>
          </iFormItem>
          <iFormItem label="申请单Id" class="formItem">
            <el-input v-model="formInline.mtzAppId" :disabled="true"></el-input>
          </iFormItem>
          <iFormItem label="申请单类型" class="formItem">
            <el-input :disabled="true" v-model="formInline.appType"></el-input>
          </iFormItem>
          <iFormItem label="申请状态" class="formItem">
            <el-input
              :disabled="true"
              v-model="formInline.appStatus"
            ></el-input>
          </iFormItem>
          <iFormItem label="补差类型" class="formItem">
            <el-input :disabled="true" v-model="formInline.makeType"></el-input>
          </iFormItem>
        </el-form>
        <el-form
          inline
          ref="baseInfoForm"
          class="baseInfoForm"
          :model="formInline"
          :rules="rules"
        >
          <el-row>
            <el-col>
              <iFormItem label="备注" :class="['row_line1']">
                <el-input
                  type="textarea"
                  :placeholder="language('QINGSHURU', '请输入')"
                  v-model="formInline.remark"
                  :disabled="isView"
                  :rows="4"
                  maxlength="300"
                  show-word-limit
                ></el-input> </iFormItem
            ></el-col>
            <el-col>
              <iFormItem label="审批备注" :class="['row_line1']" row="24">
                <el-input
                  type="textarea"
                  :disabled="isView"
                  :rows="4"
                  :placeholder="language('QINGSHURU', '请输入')"
                  v-model="formInline.approveRemarks"
                  maxlength="300"
                  show-word-limit
                ></el-input> </iFormItem
            ></el-col>
          </el-row>
        </el-form>
      </div>
    </iCard>
  </div>
</template>

<script>
import { iCard, iButton, iMessage, iFormGroup, iFormItem } from 'rise'
import {
  saveGenericAppChange,
  genericAppChangeDetail
} from '@/api/mtz/annualGeneralBudget/mtzChange.js'

export default {
  data() {
    return {
      formInline: {
        mtzAppId: '',
        appName: '',
        appStatus: '',
        appType: '',
        remark: '',
        approveRemarks: '',
        disabled: false,
        makeType: ''
      },
      disabled: false,
      rules: {
        appName: [
          { required: true, message: '请输入申请单名', trigger: 'blur' }
        ]
      },
      linieName: '',
      linieDeptNum: '',
      linieDeptNumK2: ''
      // isView: false
    }
  },
  components: {
    iCard,
    iButton,
    iFormItem,
    iFormGroup
  },
  props: {
    formData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    isView: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    '$store.state.location.disabled': {
      handler(val) {
        this.disabled = JSON.parse(val)
      },
      deep: true,
      immediate: true
    },
    formData: {
      handler(val) {
        this.formInline.appName = val.appName
        this.formInline.mtzAppId = val.mtzAppId
        this.formInline.appStatus = val.appStatus
        this.formInline.appType = val.appType
        this.formInline.remark = val.remark
        this.formInline.approveRemarks = val.approveRemarks
        this.linieName = val.linieName
        this.linieDeptNum = val.linieDeptNum
        this.linieDeptNumK2 = val.linieDeptNumK2
      },
      immediate: true,
      deep: true
    }
  },
  created() {},
  methods: {
    save(type) {
      this.$refs['baseInfoForm'].validate((valid) => {
        if (valid) {
          let params = {
            appName: this.formInline.appName,
            approveRemarks: this.formInline.approveRemarks,
            isDeptLead: true,
            mtzAppId: this.formInline.mtzAppId,
            remark: this.formInline.remark,
            submitType: type
          }
          saveGenericAppChange(params).then((res) => {
            if (res && res.code === '200') {
              iMessage.success(res.desZh)
              // this.getGenericAppChangeDetail()
              if (type === 2) {
                this.$store.dispatch('setMtzChangeBtn', true)

                // let routeData = this.$router.resolve({
                //   path: '/mtz/annualGeneralBudget/locationChange/MtzLocationChange'
                // })
                // window.open(routeData.href)
              }
            } else {
              iMessage.error(res.desZh)
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.baseInfoForm {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.formItem {
  display: flex;
  width: 15%;
  ::v-deep .el-form-item__content {
    flex: 1;
  }
}
.row_line1 {
  width: 100%;
}
.header {
  justify-content: space-between;
  margin-bottom: 20px;
  .title {
    font-size: 20px;
    font-family: Arial;
    font-weight: bold;
    line-height: 23px;
  }
}
.baseInformation {
  display: flex;
  justify-content: space-between;
}
::v-deep .el-form-item__content {
  width: 100%;
  margin-left: 10px !important;
}
.dTitle {
  font-size: 16px;
}
</style>