<!--
 * @Author: your name
 * @Date: 2021-10-27 19:27:35
 * @LastEditTime: 2021-11-16 11:38:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationChange\MTZapplicationForm\components\formInformation.vue
-->
<template>
  <div>
    <div class="header flex">
      <div>
        <span class="title">{{language('SHENQINGDAN','MTZ申请单')}}-{{formInline.mtzAppId}}-</span>
        <span class="title">{{formInline.appName}}-{{linieName}}-{{linieDeptNum}}</span>
      </div>
      <div>
        <iButton v-if="!isView"
                 @click="save(2)">{{language('TIJIAO','提交')}}</iButton>
      </div>
    </div>
    <iCard>
      <template slot="header">
        <span style="font-weight:bold">{{language('SHENGQINGDANXINXI','申请单信息')}}</span>
        <iButton v-if="!isView"
                 @click="save(1)">{{language('BAOCUN','保存')}}</iButton>
      </template>
      <div class="informationForm">
        <el-form :inline="true"
                 ref="baseInfoForm"
                 :model="formInline"
                 :rules="rules"
                 class="demo-form-inline"
                 label-position="left">
          <div class="baseInformation">
            <el-form-item label="申请单名"
                          class="formItem"
                          prop="appName">
              <el-input :disabled="isView"
                        v-model="formInline.appName"></el-input>
            </el-form-item>
            <el-form-item label="申请单Id"
                          class="formItem">
              <el-input v-model="formInline.mtzAppId"
                        :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="申请单类型"
                          class="formItem">
              <el-input :disabled="true"
                        v-model="formInline.appType"></el-input>
            </el-form-item>
            <el-form-item label="申请状态"
                          class="formItem">
              <el-input :disabled="true"
                        v-model="formInline.appStatus"></el-input>
            </el-form-item>
          </div>
          <div class="remarks">
            <el-form-item label="备注"
                          class="formItem">
              <el-input type="textarea"
                        :placeholder="language('QINGSHURU','请输入')"
                        v-model="formInline.remark"
                        :disabled="isView"
                        rows="3"
                        maxlength="300"
                        show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="审批备注"
                          class="formItem">
              <el-input type="textarea"
                        :disabled="isView"
                        :placeholder="language('QINGSHURU','请输入')"
                        v-model="formInline.approveRemarks"
                        rows="3"
                        maxlength="300"
                        show-word-limit></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </iCard>
  </div>
</template>

<script>
import { iCard, iButton, iMessage } from 'rise'
import { saveGenericAppChange, genericAppChangeDetail } from '@/api/mtz/annualGeneralBudget/mtzChange.js'

export default {
  data () {
    return {
      formInline: {
        mtzAppId: "",
        appName: "",
        appStatus: "",
        appType: "",
        remark: "",
        approveRemarks: "",
      },
      rules: {
        appName: [
          { required: true, message: '请输入申请单名', trigger: 'blur' },
        ],
      },
      linieName: "",
      linieDeptNum: "",
      isView: false
    }
  },
  components: {
    iCard,
    iButton
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.isView = JSON.parse(this.$route.query.isView)
      this.formInline.mtzAppId = this.$route.query.mtzAppId
      this.getGenericAppChangeDetail()
    },
    getGenericAppChangeDetail () {
      genericAppChangeDetail({
        mtzAppId: this.formInline.mtzAppId
      }).then(res => {
        if (res.code === '200') {
          this.formInline.appName = res.data.appName
          this.formInline.appStatus = res.data.appStatus
          this.formInline.appType = res.data.appType
          this.formInline.remark = res.data.remark
          this.formInline.approveRemarks = res.data.approveRemarks
          this.linieName = res.data.linieName
          this.linieDeptNum = res.data.linieDeptNum
        }
      })
    },
    save (type) {
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
          saveGenericAppChange(params).then(res => {
            if (res && res.code === '200') {
              iMessage.success(res.desZh)
              this.getGenericAppChangeDetail()
            } else {
              iMessage.error(res.desZh)
            }
          })
        } else {
          return false;
        }
      });

    }
  }
}
</script>

<style lang="scss" scoped>
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
.remarks {
  display: flex;
  flex-direction: column;
}
::v-deep .el-form-item__content {
  width: 100%;
}
</style>