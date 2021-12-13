<template>
  <div>
    <iPage>
      <iDialog @close="backEdit" :title="iDialogTitle" width="90%">
        <el-form
          ref="form"
          :model="form"
          label-width="120px"
          label-position="left"
          class="Form"
        >
          <el-row :gutter="24">
            <el-col :span="6">
              <el-form-item :label="tableItemTitle.chName">
                <el-input
                  v-model="formData.chName"
                  :disabled="isEdit"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="tableItemTitle.enName">
                <el-input
                  v-model="formData.enName"
                  :disabled="isEdit"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="tableItemTitle.userGroup">
                <el-input
                  v-model="formData.userGroup"
                  :disabled="isEdit"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="tableItemTitle.DAP">
                <el-input v-model="formData.DAP" :disabled="isEdit"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="6">
              <el-form-item :label="tableItemTitle.funcType">
                <el-input
                  v-model="formData.funcType"
                  :disabled="isEdit"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="tableItemTitle.funcInstruction">
                <el-input
                  v-model="formData.funcInstruction"
                  :disabled="isEdit"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item v-if="isEdit">
                <iButton @click="editChange">{{ iButtons.edit }}</iButton>
              </el-form-item>
              <el-form-item v-else>
                <iButton @click="sure">{{ iButtons.sure }}</iButton>
                <iButton @click="reset">{{ iButtons.reset }}</iButton>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </iDialog>
    </iPage>
  </div>
</template>

<script>
import { iDialog, iButton, iPage } from 'rise'

export default {
  components: {
    iDialog,
    iButton,
    iPage
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    itemMessage: {
      type: Array
    }
  },
  methods: {
    backEdit() {
      this.isEdit = true
      this.$emit('visible')
      this.isVisible = false
    },
    editChange() {
      this.isEdit = false
    },
    reset() {
      this.formData.chName = ''
      this.formData.enName = ''
      this.formData.userGroup = ''
      this.formData.DAP = ''
      this.formData.funcType = ''
      this.formData.funcInstruction = ''
    },
    sure() {
      this.isVisible = false
      this.$emit('backItem', this.formData)
    }
  },
  created() {
    this.formData = this.propsItem
  },
  watch: {
    itemMessage: {
      handler(val) {
        this.propsItem = val
      },
      deep: true
    },
    propsItem: {
      handler(val) {
        this.formData = val
      }
    }
  },
  data() {
    return {
      iDialogTitle: 'Infomess应用',
      isEdit: true,
      propsItem: '',
      formData: {
        chName: '',
        enName: '',
        userGroup: '',
        DAP: '',
        funcType: '',
        funcInstruction: ''
      },
      tableItemTitle: {
        chName: this.language('中文名称'),
        enName: this.language('英文名称'),
        userGroup: this.language('门户用户组'),
        DAP: this.language('安全中心LADP属性'),
        funcType: this.language('功能类型'),
        funcInstruction: this.language('系统功能说明')
      },
      iButtons: {
        edit: this.language('编辑'),
        sure: this.language('确认'),
        reset: this.language('重置')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog {
  height: 60%;
}
</style>
