<template>
  <iCard
    v-if="isShow"
    :title="language('补充材料')"
    header-control
    collapse
    class="margin-bottom20"
  >
    <el-form label-position="left" label-width="100px">
      <el-row :gutter="20">
        <el-col :span="12">
          <iFormItem :label="language('审批意见')">
            <iInput v-model="nodeItem.comment" disabled />
          </iFormItem>
        </el-col>
        <el-col :span="12">
          <iFormItem :label="language('处理时间')">
            <iInput v-model="opDate" disabled />
          </iFormItem>
        </el-col>
        <el-col :span="12">
          <iFormItem :label="language('补充原因')">
            <iInput
              v-model="nodeItem.reason"
              disabled
              type="textarea"
              :rows="textareaRows"
            />
          </iFormItem>
        </el-col>
        <el-col :span="12">
          <iFormItem :label="language('附件')">
            <div class="attach-area">
              <div class="attach-area-list">
                <attachmentList :data="nodeItem.taskAttachments || []" icon />
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
      default: function () {
        return {}
      }
    }
  },
  computed: {
    isShow() {
      return (
        (this.form.stateCode === 3 || this.form.stateCode === 4) &&
        this.form.addMaterialsNote
      )
    },
    textareaRows() {
      const nodeItemLength = this.nodeItem.taskAttachments
        ? this.nodeItem.taskAttachments.length
        : 0
      if (nodeItemLength !== 0) {
        return nodeItemLength <= 2 ? 5 : nodeItemLength
      }
      return 5
    },
    nodeItem() {
      return this.form.addMaterialsNote || {}
    },
    opDate() {
      if (this.nodeItem.dealDate) {
        // eslint-disable-next-line no-undef
        return moment(this.nodeItem.dealDate).format('YYYY-MM-DD')
      }
      return ''
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
    top: 0;
    z-index: 9;
  }
}
</style>
