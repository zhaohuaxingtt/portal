<template>
  <iCard
    :title="$t('申请备注')"
    header-control
    collapse
    class="margin-bottom20"
  >
    <el-form label-position="left" label-width="100px">
      <el-row :gutter="20">
        <el-col :span="12">
          <iFormItem :label="$t('审批备注')" v-if="form.remark">
            <iInput v-model="form.remark" type="textarea" :rows="1" disabled />
          </iFormItem>
          <iFormItem :label="$t('审批事项')">
            <iInput
              v-model="form.itemEvent"
              type="textarea"
              :rows="textareaRows"
              disabled
            />
          </iFormItem>
        </el-col>
        <el-col :span="12">
          <iFormItem :label="$t('附件')">
            <div class="attach-area">
              <attachmentList :data="form.procAttachments || []" icon />
            </div>
          </iFormItem>
        </el-col>
      </el-row>
    </el-form>
  </iCard>
</template>

<script>
import attachmentList from './attachmentList'
import { iCard, iInput, iFormItem } from 'rise'
export default {
  name: 'baseFrom',
  components: { iCard, iInput, iFormItem, attachmentList },
  props: {
    form: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {
    textareaRows() {
      if (this.form.remark) {
        return 3
      }
      return 6
    }
  }
}
</script>

<style lang="scss" scoped>
.attach-area {
  position: relative;
  background-color: #f5f7fa;
  border: solid 1px #e4e7ed;
  min-height: 146px;
  box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
  border-radius: 5px;
}
</style>
