<!--
 * @Author: your name
 * @Date: 2021-10-27 19:27:35
 * @LastEditTime: 2022-12-24 12:06:48
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\ChipLocationChange\ChipApplicationForm\components\formInformation.vue
-->
<template>
  <div>
    <div class="header flex">
      <div>
        <span class="title">
          {{ language('芯片补差申请单', '芯片补差申请单') }}-{{
            formInline.appNo
          }}-{{ appName }}-{{ formInline.linieName }}-
          <span class="dTitle">{{ formInline.depteCode }}</span>
        </span>
      </div>
      <div>
        <iButton
          v-if="canEdit"
          @click="submit"
          v-permission="PORTAL_CHIP_CHANGE_DETAIL_TIJIAO"
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
          v-if="canEdit"
          @click="save(1)"
          v-permission="PORTAL_CHIP_CHANGE_DETAIL_BAOCUN"
          >{{ language('BAOCUN', '保存') }}</iButton
        >
      </template>
      <div class="informationForm">
        <el-form
          ref="baseInfoForm"
          class="baseInfoForm"
          :model="formInline"
          label-position="left"
          label-width="80px"
          :rules="rules"
        >
          <iFormItem
            :label="$t('MTZSHENQINGDANMING')"
            class="formItem"
            prop="appName"
          >
            <el-input
              :disabled="!canEdit ? true : false"
              v-model="formInline.appName"
            ></el-input>
          </iFormItem>
          <iFormItem :label="$t('申请单号')" class="formItem">
            <iText>{{ formInline.appNo }}</iText>
          </iFormItem>
          <iFormItem
            :label="$t('SHENQINGDANLEIXING')"
            class="formItem"
            label-width="100px"
          >
            <iText>{{ getAppType(formInline.appType) }}</iText>
          </iFormItem>
          <iFormItem :label="$t('SHENQINGZHUANGTAI')" class="formItem">
            <iText>{{ getStatus(formInline.status) }}</iText>
          </iFormItem>
          <iFormItem :label="$t('补差类型')" class="formItem">
            <iText>{{ getMakeType(formInline.makeType) }}</iText>
          </iFormItem>
        </el-form>
        <el-form
          class="baseInfoForm"
          :model="formInline"
          label-position="left"
          label-width="80px"
        >
          <el-row class="form-row">
            <el-col>
              <iFormItem :label="$t('备注')" :class="['row_line']">
                <el-input
                  type="textarea"
                  :placeholder="language('QINGSHURU', '请输入')"
                  v-model="formInline.remark"
                  :disabled="!canEdit"
                  :rows="4"
                  maxlength="300"
                  show-word-limit
                ></el-input> </iFormItem
            ></el-col>
            <el-col>
              <iFormItem :label="$t('审批备注')" :class="['row_line']" row="24">
                <el-input
                  type="textarea"
                  :disabled="!canEdit"
                  :rows="4"
                  :placeholder="language('QINGSHURU', '请输入')"
                  v-model="formInline.approveReason"
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
import { iCard, iButton, iMessage, iFormGroup, iFormItem, iText } from 'rise'
import { submit, save } from '@/api/mtz/annualGeneralBudget/chipChange.js'

export default {
  data() {
    return {
      appName: '',
      formInline: {
        appNo: '',
        appName: '',
        status: '',
        type: '',
        remark: '',
        approveReason: '',
        disabled: false,
        makeType: ''
      },
      disabled: false,
      rules: {
        appName: [
          { required: true, message: '请输入申请单名', trigger: 'blur' }
        ]
      },
      makeTypeList: [
        {
          code: '1',
          message: '芯片补差'
        },
        {
          code: '2',
          message: 'MTZ补差'
        }
      ],
      appTypeList: [
        {
          code: '1',
          message: 'mtz变更'
        },
        {
          code: '2',
          message: '芯片补差变更'
        }
      ]
    }
  },
  components: {
    iCard,
    iButton,
    iFormItem,
    iFormGroup,
    iText
  },
  props: {
    baseDetail: {
      type: Object,
      default: () => {
        return {}
      }
    },
    statusList: {
      type: Array,
      default: () => []
    },
    formData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    canEdit: {
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
        this.$set(this, 'formInline', val)
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    this.appName = this.formData.appName || ''
  },
  methods: {
    // 申请状态
    getStatus(status) {
      return this.statusList.find((item) => item.code == status)?.message
    },
    // 申请单类型
    getAppType(status) {
      return this.appTypeList.find((item) => item.code == status)?.message
    },
    // 补差类型
    getMakeType(status) {
      return this.makeTypeList.find((item) => item.code == status)?.message
    },
    async submit() {
      let flag = await this.check()
      if (flag) {
        let params = {
          chipAttachmentBaseList: this.baseDetail.chipAttachmentBaseList,
          chipChangeBase: {
            ...this.formInline
          },
          detailList: this.baseDetail.detailList
        }
        save(params).then((res) => {
          if (res?.code == '200') {
            submit({ changeId: this.$route.query.changeId }).then((res) => {
              if (res?.code == '200') {
                iMessage.success('提交成功')
                this.$emit('getDetail')
              } else {
                iMessage.error(res.desZh)
              }
            })
          } else {
            iMessage.error(res.desZh)
          }
        })
      }
    },
    check() {
      return new Promise((r, j) => {
        this.$refs['baseInfoForm'].validate(async (valid) => {
          if (valid) {
            r(true)
          } else {
            j(false)
          }
        })
      })
    },
    async save() {
      let check = await this.check()
      if (check) {
        let params = {
          chipAttachmentBaseList: this.baseDetail.chipAttachmentBaseList,
          chipChangeBase: {
            ...this.formInline
          },
          detailList: this.baseDetail.detailList
        }
        save(params).then((res) => {
          if (res?.code === '200') {
            iMessage.success(res.desZh)
            return true
          } else {
            iMessage.error(res.desZh)
          }
        })
      }
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
  display: inline-flex;
  width: 18%;
  ::v-deep .el-form-item__content {
    flex: 1;
  }
}
.form-row {
  width: 100%;
}
.row_line {
  display: inline-flex;
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
::v-deep .el-form-item__content {
  width: 100%;
  margin-left: 10px !important;
}
.dTitle {
  font-size: 16px;
}
</style>