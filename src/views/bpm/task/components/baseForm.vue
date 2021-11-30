<template>
  <iCard
    :title="language('审批备注与附件')"
    header-control
    collapse
    class="margin-bottom20"
  >
    <el-form label-position="left" label-width="100px">
      <el-row :gutter="20">
        <el-col :span="12">
          <iFormItem :label="language('审批备注')" v-if="form.remark">
            <iInput
              :value="form.remark || '无'"
              type="textarea"
              :rows="5"
              disabled
            />
          </iFormItem>
          <!-- <iFormItem :label="language('审批事项')">
            <iInput
              v-model="form.itemEvent"
              type="textarea"
              :rows="textareaRows"
              disabled
            />
          </iFormItem> -->
        </el-col>
        <el-col :span="12">
          <iFormItem :label="language('附件')">
            <iInput
              :value="'无'"
              type="textarea"
              :rows="5"
              disabled
              v-if="!form.procAttachments || form.procAttachments.length === 0"
            />
            <div v-else class="attach-area">
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
      default: function () {
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
  min-height: 126px;
  box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
  border-radius: 5px;
}
.no-attach {
  padding: 5px 12px;
}
</style>
