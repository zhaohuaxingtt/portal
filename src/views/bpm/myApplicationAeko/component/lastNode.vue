<template>
  <iCard
    :title="$t('补充材料')"
    header-control
    collapse
    class="margin-bottom20"
  >
    <el-form label-position="left" label-width="100px">
      <el-row :gutter="20">
        <el-col :span="6">
          <iFormItem :label="$t('审批人')">
            <iInput v-model="nodeItem.assigneeName" disabled />
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="$t('处理时间')">
            <iInput v-model="opDate" disabled />
          </iFormItem>
        </el-col>
        <el-col :span="24">
          <iFormItem :label="$t('审批意见')">
            <iInput
              v-model="nodeItem.comment"
              disabled
              type="textarea"
              :rows="textareaRows"
            />
          </iFormItem>
        </el-col>
      </el-row>
    </el-form>
  </iCard>
</template>

<script>
import { iCard, iInput, iFormItem } from 'rise'
export default {
  name: 'lastNode',
  components: { iCard, iInput, iFormItem },
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
      return 1
    },
    nodeItem() {
      const his = this.form.historicVOList
      if (his && his.length > 1) {
        return his[his.length - 1]
      }
      return {}
    },
    opDate() {
      if (this.nodeItem.startTime) {
        // eslint-disable-next-line no-undef
        return moment(this.nodeItem.startTime).format('YYYY-MM-DD')
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
    top: 10px;
  }
}
</style>
