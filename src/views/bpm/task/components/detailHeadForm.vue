<template>
  <i-card class="margin-bottom20">
    <el-form label-width="100px" label-position="left" label-suffix=":">
      <el-row :gutter="50">
        <el-col :span="6">
          <iFormItem :label="$t('APPROVAL.APPLICATION_NO')">
            <iInput v-model="form.businessId" disabled />
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="$t('APPROVAL.APPROVAL_NAME')">
            <iInput v-model="form.itemName" disabled />
          </iFormItem>
        </el-col>
        <el-col :span="12">
          <iFormItem :label="$t('APPROVAL.APPROVAL_ITEMS')">
            <iInput v-model="form.itemEvent" disabled />
          </iFormItem>
        </el-col>
      </el-row>

      <iFormItem :label="$t('APPROVAL.APPROVAL_CONTENT')">
        <iInput
          v-model="form.itemContent"
          disabled
          type="textarea"
          :rows="10"
        />
      </iFormItem>
      <iFormItem
        :label="$t('APPROVAL.ATTACH')"
        v-if="form.procAttachments && form.procAttachments.length > 0"
      >
        <attachmentList :data="form.procAttachments || []" icon />
      </iFormItem>
    </el-form>
  </i-card>
</template>

<script>
import attachmentList from './attachmentList'
import { iInput, iFormItem, iCard } from 'rise'
export default {
  components: { attachmentList, iInput, iFormItem, iCard },
  props: {
    form: {
      type: Object,
      default: function() {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
