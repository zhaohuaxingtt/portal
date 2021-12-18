<template>
  <iDialog :visible.sync="dialogVisible"
           :title="language('供应商用户')"
           width="50%"
           @closed="close">
    <el-form label-position="left"
             label-width="130px"
             :model="rules"
             :rules="rules"
             ref="ruleForm"
             class="validate-required-form">
      <iFormItem :label="language('用户登录名')"
                 prop="userName">
        <iInput v-model="detail.userName"
                disabled />
      </iFormItem>
      <iFormItem :label="language('是否为主用户')"
                 prop="isMainContact">
        <iSelect v-model="detail.isMainContact"
                 disabled>
          <el-option :value="true"
                     label="是" />
          <el-option :value="false"
                     label="否" />
        </iSelect>
      </iFormItem>
      <iFormItem :label="language('联系人姓名')"
                 prop="nameZh">
        <iInput v-model="detail.nameZh"
                :placeholder="language('请输入')" />
      </iFormItem>
      <iFormItem :label="language('部门')"
                 prop="dept">
        <iInput v-model="detail.dept"
                :placeholder="language('请输入')" />
      </iFormItem>
      <iFormItem :label="language('职位')"
                 prop="position">
        <iInput v-model="detail.position"
                :placeholder="language('请输入')" />
      </iFormItem>
      <iFormItem :label="language('区号')"
                 prop="telephoneAreaCode">
        <iInput v-model="detail.telephoneAreaCode"
                :placeholder="language('请输入')" />
      </iFormItem>
      <iFormItem :label="language('联系电话')"
                 prop="telephoneM">
        <iInput v-model="detail.telephoneM"
                :placeholder="language('请输入')" />
      </iFormItem>
      <iFormItem :label="language('电子邮件')"
                 prop="email">
        <iInput v-model="detail.email"
                :placeholder="language('请输入')" />
      </iFormItem>

      <iFormItem :label="language('是否有效')"
                 prop="status">
        <iSelect v-model="detail.status"
                 disabled>
          <el-option :value="1"
                     label="正常" />
          <el-option :value="2"
                     label="受控" />
        </iSelect>
      </iFormItem>
      <iFormItem :label="language('是否超期')"
                 prop="isValid">
        <iSelect v-model="detail.isExpired"
                 disabled>
          <el-option :value="true"
                     label="是" />
          <el-option :value="false"
                     label="否" />
        </iSelect>
      </iFormItem>
      <iFormItem :label="language('超期时间')"
                 prop="expireDate">
        <iInput v-model="detail.expireDate"
                disabled />
      </iFormItem>
      <iFormItem :label="language('最后登录时间')"
                 prop="lastLoginDate">
        <iInput v-model="detail.lastLoginDate"
                disabled />
      </iFormItem>
    </el-form>
    <div slot="footer">
      <iButton :loading="saveLoading"
               @click="handleSave">
        {{ language('保存') }}
      </iButton>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iFormItem, iInput, iSelect, iMessage } from 'rise'
import {
  saveSupplierUser,
  updateSupplierUser
} from '@/api/mainDataSupplier/list/user'
export default {
  name: 'theDetailSupplierUserModify',
  components: { iDialog, iButton, iFormItem, iInput, iSelect },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    detail: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  created () {
    this.dialogVisible = this.visible
  },
  watch: {
    visible (val) {
      console.log('watch', val)
      this.dialogVisible = val
    }
  },
  data () {
    return {
      dialogVisible: false,
      rules: {
        nameZh: [
          {
            required: true,
            message: '联系人姓名不能为空',
            trigger: 'blur'
          }
        ],
        opcsCompanyNameZh: [
          {
            required: true,
            message: '供应商中文名不能为空',
            trigger: 'blur'
          }
        ],
        telephoneM: [
          {
            required: true,
            message: '联系电话不能为空',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: '电子邮件不能为空',
            trigger: 'blur'
          }
        ]
      },
      saveLoading: false
    }
  },
  methods: {
    close () {
      this.$emit('update:visible', false)
    },
    handleSave () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.save()
        }
      })
    },
    save () {
      this.saveLoading = true
      const result = this.detail.id
        ? updateSupplierUser([this.detail])
        : saveSupplierUser([this.detail])
      result
        .then((res) => {
          if (res.result) {
            iMessage.success(res.desZh || '保存成功')
            this.$emit('save-success')
            this.close()
          } else {
            iMessage.error(res.desZh || '保存失败')
          }
        })
        .catch((err) => {
          iMessage.error(err.desZh || '保存失败')
        })
        .finally(() => (this.saveLoading = false))
    }
  }
}
</script>

<style lang="scss" scoped></style>
