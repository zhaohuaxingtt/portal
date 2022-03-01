<template>
  <iDialog
    :visible.sync="dialogVisible"
    title="供应商通讯录"
    width="50%"
    @closed="close"
  >
    <el-form
      label-position="left"
      label-width="130px"
      :model="rules"
      :rules="rules"
      ref="ruleForm"
      class="validate-required-form"
      v-loading="loading"
    >
      <iFormItem :label="language('联系人姓名')" prop="nameZh">
        <iInput v-model="detail.nameZh" :placeholder="language('请输入')" />
      </iFormItem>
      <iFormItem :label="language('联系人类型')" prop="contactType">
        <iSelect
          v-model="detail.contactType"
          :placeholder="language('请选择')"
          filterable
        >
          <el-option
            v-for="item in dicts.SUPPLIER_CODE_TYPE"
            :key="item.id"
            :value="item.name"
            :label="item.name"
          />
        </iSelect>
      </iFormItem>
      <iFormItem :label="language('部门')" prop="dept">
        <iInput v-model="detail.dept" :placeholder="language('请输入')" />
      </iFormItem>
      <iFormItem :label="language('职位')" prop="designation">
        <iInput
          v-model="detail.designation"
          :placeholder="language('请输入')"
        />
      </iFormItem>
      <iFormItem :label="language('邮箱')" prop="email">
        <iInput v-model="detail.email" :placeholder="language('请输入')" />
      </iFormItem>
      <iFormItem :label="language('联系电话')" prop="phoneH">
        <iInput v-model="detail.phoneH" :placeholder="language('请输入')" />
      </iFormItem>
      <iFormItem :label="language('备注')" prop="remark">
        <iInput v-model="detail.remark" :placeholder="language('请输入')" />
      </iFormItem>
    </el-form>
    <div slot="footer">
      <iButton :loading="loading" @click="handleSave">{{
        language('保存')
      }}</iButton>
      <iButton @click="close">{{ language('取消') }}</iButton>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iFormItem, iInput, iSelect, iMessage } from 'rise'
import { updateSupplierContact } from '@/api/mainDataSupplier/list/contacts'
export default {
  name: 'theDetailSupplierContactsModify',
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
    },
    supplierId: {
      type: String,
      default: ''
    },
    dicts: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  created() {
    this.dialogVisible = this.visible
  },
  watch: {
    visible(val) {
      console.log('watch', val)
      this.dialogVisible = val
    }
  },
  data() {
    return {
      dialogVisible: false,
      rules: {
        nameZh: [
          {
            required: true,
            message: '联系人姓名必填',
            trigger: 'blur'
          }
        ]
      },
      loading: false
    }
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
    },
    handleSave() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.save()
        }
      })
    },
    save() {
      const params = {
        supplierId: this.supplierId,
        contactId: this.detail.id
      }
      const data = {
        dept: this.detail.dept,
        designation: this.detail.designation,
        email: this.detail.email,
        nameZh: this.detail.nameZh,
        phoneH: this.detail.phoneH,
        remark: this.detail.remark,
        contactType: this.detail.contactType,
        telephone: this.detail.telephone
      }
      if (
        Object.prototype.toString.call(this.detail.contactType) ===
        '[object Array]'
      ) {
        data.contactType = this.detail.contactType.join(',')
      }
      this.loading = true
      updateSupplierContact(params, data)
        .then((res) => {
          if (res.result) {
            iMessage.success(res.dscZh || '保存成功')
            this.$emit('save-success', { id: this.detail.id, ...data })
            this.dialogVisible = false
          } else {
            iMessage.error(res.dscZh || '保存失败')
          }
        })
        .catch((err) => {
          iMessage.error(err.dscZh || '保存失败')
        })
        .finally(() => (this.loading = false))
    }
  }
}
</script>

<style lang="scss" scoped></style>
