<template>
  <iDialog
    :title="$t('新建模板')"
    :visible.sync="dialogVisible"
    width="40%"
    @close="onClose"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="validateForm"
      class="validate-required-form"
    >
      <iFormItem :label="$t('发布渠道')" prop="channel">
        <iSelect v-model="form.channel">
          <el-option
            v-for="item in templateChannels"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          />
        </iSelect>
      </iFormItem>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <iButton type="default" :loading="loading" size="small" @click="add">
        {{ $t('创建') }}
      </iButton>
      <iButton type="default" :loading="loading" size="small" @click="onClose">
        {{ $t('取消') }}
      </iButton>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iFormItem, iSelect, iButton } from 'rise'
import { TEMPLATE_CHANNELS } from './data'
export default {
  name: 'addDialog',
  components: { iDialog, iFormItem, iSelect, iButton },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: { channel: '' },
      dialogVisible: false,
      rules: {
        channel: [
          { required: true, trigger: 'blur', message: '请选择发布渠道' }
        ]
      },
      templateChannels: TEMPLATE_CHANNELS
    }
  },
  watch: {
    visible(val) {
      this.dialogVisible = val
    }
  },
  created() {
    this.dialogVisible = this.visible
  },
  methods: {
    add() {
      this.$refs.validateForm.validate(valid => {
        if (valid) {
          // openUrl(`/infoTemplate/template/create?channel=${this.form.channel}`)
          window.open(
            `/portal/#/infoTemplate/template/create?channel=${this.form.channel}`
          )
          this.$emit('update:visible', false)
        }
      })
    },
    onClose() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped></style>
