<template>
  <div class="contract-params-modal">
    <i-dialog
      :title="language(title)"
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
            <iLabel :label="language('编码')" :required="true" slot="label"></iLabel>
            <i-input
              v-model="contractForm.code"
              type="text"
              :placeholder="language('请输入编码')"
              :disabled="contractForm.id || disabled"
            />
          </iFormItem>
          <iFormItem prop="name">
            <iLabel :label="language('中文名')" :required="true" slot="label"></iLabel>
            <i-input
              v-model="contractForm.name"
              type="text"
              :placeholder="language('请输入中文名')"
              :disabled="disabled"
            />
          </iFormItem>
          <iFormItem prop="nameEn">
            <iLabel :label="language('英文名')" :required="true" slot="label"></iLabel>
            <i-input
              v-model="contractForm.nameEn"
              type="text"
              :placeholder="language('请输入英文名')"
              :disabled="disabled"
            />
          </iFormItem>
          <iFormItem prop="orderNum">
            <iLabel :label="language('排序')" :required="true" slot="label"></iLabel>
            <i-input
              v-model="contractForm.orderNum"
              type="number"
              :max="9999999999"
              :placeholder="language('请输入排序')"
              :disabled="disabled"
              v-int
            />
          </iFormItem>
          <iFormItem prop="describe">
            <iLabel :label="language('描述')" :required="true" slot="label"></iLabel>
            <i-input
              v-model="contractForm.describe"
              type="text"
              :placeholder="language('请输入描述')"
              :disabled="disabled"
            />
          </iFormItem>
          <iFormItem prop="parent">
            <iLabel :label="language('上级节点')" slot="label"></iLabel>
            <iText>{{ parent.name }}</iText>
          </iFormItem>
        </iFormGroup>
      </div>
      <span slot="footer" class="dialog-footer" v-if="!disabled">
        <i-button @click="handleSave">{{language('保存')}}</i-button>
        <i-button @click="handleReset">{{language('重置')}}</i-button>
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
import { addDict, updateDict } from '@/api/params'
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
    disabled: {
      type: Boolean,
      default: false
    },
    title: { type: String },
    show: {
      type: Boolean
    },
    parent: {
      type: Object,
      default: () => {
        return {}
      }
    },
    data: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data() {
    const _self = this
    const checkOrderNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入排序'))
      }
      if (value > 9999999999) {
        return callback(new Error('至多输入十位数'))
      } else {
        callback()
      }
    }
    return {
      contractForm: _self.data,
      rules: {
        code: [{ required: true, message: '请输入编码', trigger: 'blur' }],
        name: [{ required: true, message: '请输入中文名', trigger: 'blur' }],
        nameEn: [{ required: true, message: '请输入英文名', trigger: 'blur' }],
        orderNum: [
          { required: true, message: '请输入排序', trigger: 'blur' },
          { validator: checkOrderNum, trigger: 'blur' }
        ],
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
      userInfo: (state) => state.permission.userInfo
    })
  },
  methods: {
    handleSave() {
      this.$refs['contractForm'].validate(async (valid) => {
        if (valid) {
          this.contractForm.parentId = this.parent.id || -1
          this.contractForm.level = this.parent.level
            ? parseInt(this.parent.level) + 1
            : 1
          this.contractForm.createOrUpdBy = this.userInfo.id
          const result = this.contractForm.id
            ? await updateDict(this.contractForm)
            : await addDict(this.contractForm)
          if (result.code === '200') {
            iMessage.success(
              // `${this.contractForm.id ? '更新' : '新增'}参数成功`
              '操作成功'
            )
            this.isShow = false
            this.parent.name
              ? this.$emit(
                  'callback',
                  this.contractForm.id
                    ? { type: 'update', data: result.data }
                    : { type: 'add', data: result.data }
                )
              : this.$emit('callback', { type: 'root', data: result.data })
          }
        } else {
          return false
        }
      })
    },
    handleReset() {
      this.contractForm = {}
      this.$emit('update:contractForm', {})
      this.$refs['contractForm'].resetFields()
    },
    handleClose() {
      this.contractForm = {}
      this.$refs['contractForm'].resetFields()
    },
    handleOpen() {
      this.contractForm = _.cloneDeep(this.data)
    }
  }
}
</script>

<style lang="scss" scoped></style>
