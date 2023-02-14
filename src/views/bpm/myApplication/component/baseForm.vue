<template>
  <iCard
    :title="language('申请备注')"
    header-control
    collapse
    class="margin-bottom20"
  >
    <el-form label-position="left" label-width="100px">
      <el-row :gutter="20">
        <el-col id="APPROVAL_INSTRUCTIONS" :span="12">
          <iFormItem :label="language('审批备注')">
            <div class="text-area">
              {{ form.remark }}
            </div>
          </iFormItem>
          <iFormItem :label="language('审批事项')">
            <div class="text-area">
              {{ form.itemEvent }}
            </div>
          </iFormItem>
        </el-col>
        <el-col id="APPROVAL_ATTACHMENTS" :span="12">
          <iFormItem :label="language('附件')">
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
import attachmentList from '@/views/bpm/task/components/attachmentList'
import { iCard, iFormItem } from 'rise'
export default {
  name: 'baseFrom',
  components: { iCard, iFormItem, attachmentList },
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
      if (this.form.procAttachments) {
        return this.form.procAttachments.length
      }
      return 6
    }
  }
}
</script>

<style lang="scss" scoped>
.text-area {
  position: relative;
  background-color: #f5f7fa;
  border: solid 1px #e4e7ed;
  min-height: 60px;
  box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
  border-radius: 5px;
  padding: 10px;
  line-height: 1.5em;
}
.attach-area {
  position: relative;
  background-color: #f5f7fa;
  border: solid 1px #e4e7ed;
  min-height: 146px;
  box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
  border-radius: 5px;
  padding: 10px;
  line-height: 1.5em;
}
</style>
