<template>
  <div class="contract-params-modal">
    <i-dialog
      :title="'新增'"
      :visible.sync="isShow"
      width="50%"
      @open="handleOpen"
      @close="handleClose"
    >
      <div class="form-wrapper">
        <iFormGroup
          :row="1"
          :model="contractForm"
          :rules="rules"
          ref="contractForm"
        >
          <iFormItem prop="code">
            <iLabel :label="'编码'" :required="true" slot="label"></iLabel>
            <i-input
              v-model="contractForm.code"
              type="text"
              placeholder="请输入编码"
              :disabled="disabled"
            />
          </iFormItem>
          <iFormItem prop="name">
            <iLabel :label="'中文名'" :required="true" slot="label"></iLabel>
            <i-input
              v-model="contractForm.name"
              type="text"
              placeholder="请输入中文名"
              :disabled="disabled"
            />
          </iFormItem>
          <iFormItem prop="nameEn">
            <iLabel :label="'英文名'" :required="true" slot="label"></iLabel>
            <i-input
              v-model="contractForm.nameEn"
              type="text"
              placeholder="请输入英文名"
              :disabled="disabled"
            />
          </iFormItem>
          <iFormItem prop="orderNum">
            <iLabel :label="'排序'" :required="true" slot="label"></iLabel>
            <i-input
              v-model="contractForm.orderNum"
              type="number"
              placeholder="请输入排序"
              :disabled="disabled"
            />
          </iFormItem>
          <iFormItem prop="describe">
            <iLabel :label="'描述'" :required="true" slot="label"></iLabel>
            <i-input
              v-model="contractForm.describe"
              type="text"
              placeholder="请输入描述"
              :disabled="disabled"
            />
          </iFormItem>
          <iFormItem prop="parent">
            <iLabel :label="'上级节点'" slot="label"></iLabel>
            <iText>{{ parent.name }}</iText>
          </iFormItem>
        </iFormGroup>
      </div>
      <span slot="footer" class="dialog-footer">
        <i-button @click="handleSave">保存</i-button>
        <i-button @click="handleReset">重置</i-button>
      </span>
    </i-dialog>
  </div>
</template>

<script>
import {
  iButton,
  iMessage,
  iInput,
  iFormGroup,
  iText,
  iFormItem,
  iDialog,
  iLabel
} from 'rise'
import { addDict } from '@/api/params'
export default {
  components: {
    iDialog,
    iButton,
    iMessage,
    iInput,
    iFormGroup,
    iText,
    iFormItem,
    iLabel
  },
  props: {
    show: {
      type: Boolean
    },
    parent: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      contractForm: {},
      rules: {
        code: [{ required: true, message: '请输入编码', trigger: 'blur' }],
        name: [{ required: true, message: '请输入中文名', trigger: 'blur' }],
        nameEn: [{ required: true, message: '请输入英文名', trigger: 'blur' }],
        orderNum: [{ required: true, message: '请输入排序', trigger: 'blur' }],
        describe: [{ required: true, message: '请输入描述', trigger: 'blur' }]
      }
    }
  },
  computed: {
    isShow: {
      get() {
        return this.show
      },
      set(val) {
        this.$emit('update:show', val)
      }
    },
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      userInfo: state => state.permission.userInfo
    })
  },
  methods: {
    handleSave() {
      this.$refs['contractForm'].validate(async valid => {
        if (valid) {
          this.contractForm.parentId = this.parent.id
          this.contractForm.level = parseInt(this.parent.level) + 1
          this.contractForm.createOrUpdBy = this.userInfo.id
          console.log(this.contractForm)
          const result = await addDict(this.contractForm)
          if (result.code === '200') {
            iMessage.success('新增参数成功')
            this.isShow = false
            this.$emit('callback')
          }
        } else {
          return false
        }
      })
    },
    handleReset() {
      this.contractForm = {}
    },
    handleClose() {
      this.contractForm = {}
      this.$refs['contractForm'].resetFields()
    },
    handleOpen() {
      console.log('sfsf', this.parent)
    }
  }
}
</script>

<style lang="scss" scoped></style>
