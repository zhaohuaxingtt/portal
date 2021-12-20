<template>
  <iDialog
    :title="editOrAdd === 'add' ? $t('MT_TIANJIAZILIAOLEIXING') : $t('MT_XIUGAIZILIAOLEIXING')"
    :visible.sync="openDialog"
    width="24rem"
    :close-on-click-modal="false"
    @close="close"
  >
    <iEditForm>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        :hideRequiredAsterisk="true"
      >
        <iFormItem label="资料类型名称" prop="name">
          <iLabel :label="$t('MT_ZILIAOLEIXINGMINGCHENG')" slot="label" required></iLabel>
          <div class="form-row">
            <iInput v-model="ruleForm.name"></iInput>
          </div>
        </iFormItem>

        <iFormItem label="所属会议" prop="meetingTypes">
          <iLabel :label="$t('MT_SUOSHUHUIYI')" slot="label" required></iLabel>
          <iSelect
            class="autoSearch"
            v-model="ruleForm.meetingTypes"
            multiple
            collapse-tags
            :placeholder="$t('MT_QINGXUANZEHUIYILEIXNG')"
          >
            <el-option
              v-for="item in meetingType"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </iSelect>
        </iFormItem>

        <div class="button-list">
          <el-form-item>
            <iButton @click="close" plain class="cancel">{{
              $t('MT_QUXIAO')
            }}</iButton>
            <iButton @click="handleSubmit('ruleForm')" plain>{{
              $t('MT_BAOCUN')
            }}</iButton>
          </el-form-item>
        </div>
      </el-form>
    </iEditForm>
  </iDialog>
</template>

<script>
import { iDialog, iInput, iFormItem, iLabel, iButton, iSelect } from 'rise'
import iEditForm from '@/components/iEditForm'
import uploadIcon from '@/assets/images/upload-icon.svg'
import { saveDocumentType, updateDocumentType } from '@/api/meeting/information'
import { baseRules } from './data'
export default {
  components: {
    iDialog,
    iFormItem,
    iInput,
    iLabel,
    iButton,
    iEditForm,
    iSelect
  },
  props: {
    loading: { type: Boolean, default: false },
    openDialog: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    editOrAdd: {
      type: String,
      default: () => {
        return 'add'
      }
    },
    clickScope: {
      type: Array,
      default: () => {
        return []
      }
    },
    meetingTypeAll: {
      type: Array,
      default: () => {
        return []
      }
    },
    meetingType: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      uploadIcon,
      rules: baseRules,
      ruleForm: {
        name: '',
        meetingTypes: ''
      }
    }
  },
  mounted() {
    if (this.editOrAdd === 'edit') {
      // console.log("this.clickScope", this.clickScope);
      this.ruleForm = { ...this.clickScope }
      this.ruleForm.meetingTypes = this.clickScope.meetingTypes.map(
        (item) => item.name
      )
    }
  },
  methods: {
    close() {
      this.$emit('closeDialog', false)
    },
    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let formData = { ...this.ruleForm }
          let nowMeetingType = []
          nowMeetingType = this.meetingTypeAll.filter((item) => {
            return this.ruleForm.meetingTypes.some((i) => i == item.name)
          })
          formData.meetingTypes = nowMeetingType
          if (this.editOrAdd === 'edit') {
            updateDocumentType(formData)
              .then((data) => {
                if (data) {
                  this.close()
                  this.$message.success('保存成功！')
                  this.$emit('flushTable')
                }
              })
              .catch((err) => {
                console.log(err)
              })
          } else {
            saveDocumentType(formData)
              .then((data) => {
                if (data) {
                  this.close()
                  this.$message.success('创建成功！')
                  this.$emit('flushTable')
                } else {
                  // this.$message.error(data.message);
                  this.$emit('flushTable')
                }
              })
              .catch((err) => {
                // this.$message.error("创建失败！");
                console.log(err)
                this.ruleForm.meetingTypes = []
              })
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.button-list {
  display: flex;
  height: 60px;
  justify-content: flex-end;
  align-items: center;
  .el-form-item {
    margin-bottom: 15px;
    .el-button {
      height: 35px;
      width: 100px;
    }
    .cancel {
      margin-left: 20px;
    }
  }
}
::v-deep .el-select__tags-text {
  display: inline-block;
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
::v-deep .iSelect {
  width: 18.75rem;
}
::v-deep .el-select .el-tag__close.el-icon-close {
  top: -7px;
}
/* ::v-deep .is-required {
  .flex-align-center {
    position: relative;
    .start {
      position: absolute;
      display: block;
      width: 10px;
      height: 10px;
      background: #e30d0d;
      border-radius: 5px;
      left: -20px;
      overflow: hidden;
    }
  }
} */
</style>
