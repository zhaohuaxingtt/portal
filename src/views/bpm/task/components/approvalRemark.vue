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
          <iFormItem :label="$t('审批备注')">
            <iInput
              v-model="form.reason"
              disabled
              type="textarea"
              :rows="textareaRows"
            />
          </iFormItem>
        </el-col>
        <el-col :span="12">
          <iFormItem :label="$t('附件')">
            <div class="attach-area">
              <div class="attach-area-list">
                <attachmentList :data="form.procAttachments || []" icon />
              </div>
              <iInput disabled type="textarea" :rows="textareaRows"> </iInput>
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
  name: 'lastNode',
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
      if (this.form.procAttachments) {
        return this.form.procAttachments.length
      }
      return 5
    }
  }
}
</script>

<style lang="scss" scoped>
.attach-area {
  position: relative;
  .attach-area-list {
    position: absolute;
    left: 10px;
    top: 10px;
  }
}
</style>
