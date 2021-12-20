<template>
  <i-card class="margin-bottom20">
    <el-form label-width="100px" label-position="left" label-suffix=":">
      <el-row :gutter="50">
        <el-col :span="6">
          <iFormItem :label="language('申请号')">
            <iInput v-model="form.businessId" disabled />
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="language('审批名称')">
            <iInput v-model="form.itemName" disabled />
          </iFormItem>
        </el-col>
        <el-col :span="12">
          <iFormItem :label="language('审批事项')">
            <iInput v-model="form.itemEvent" disabled />
          </iFormItem>
        </el-col>
      </el-row>

      <iFormItem :label="language('审批信息')">
        <iInput
          v-model="form.itemContent"
          disabled
          type="textarea"
          :rows="10"
        />
      </iFormItem>
      <iFormItem
        :label="language('附件')"
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
      default: function () {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
