<template>
  <iDialog
    :visible.sync="dialogVisible"
    title="发布"
    width="35%"
    modal-append-to-body
    append-to-body
    @closed="onClose"
  >
    <el-form
      label-position="left"
      label-width="100px"
      :rules="rules"
      :model="form"
      ref="ruleForm"
      v-loading="loading"
    >
      <iFormItem :label="$t('用户范围')">
        <iSelect v-model="form.scope">
          <el-option
            v-for="item in publishScopeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </iSelect>
      </iFormItem>
      <iFormItem
        :label="$t('选择用户')"
        prop="userList"
        v-if="form.scope === 999"
      >
        <userSelector v-model="form.userList" @change="userListChange" />
      </iFormItem>
      <iFormItem :label="$t('开始时间')" prop="startTime">
        <iDatePicker
          v-model="form.startTime"
          type="datetime"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          style="width:100%"
          :disabled="!startTimeEditable"
        />
      </iFormItem>
      <iFormItem :label="$t('结束时间')" prop="endTime">
        <iDatePicker
          v-model="form.endTime"
          type="datetime"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          style="width:100%"
          :disabled="!endTimeEditable"
        />
      </iFormItem>
      <iFormItem :label="$t('地址')" prop="address">
        <iInput v-model="form.address" :disabled="!addressEditable" />
      </iFormItem>
      <el-divider />
      <iFormItem :label="$t('发布时间')">
        <div class="flex flex-center">
          <iSelect
            v-model="sendTrigger"
            style="width: 160px;margin-right: 10px"
            @change="sendTriggerChange"
          >
            <el-option value="1" label="立即发布" />
            <el-option value="2" label="定时发布" />
          </iSelect>
          <iDatePicker
            v-if="sendTrigger === '2'"
            v-model="form.publishTime"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width:100%"
          />
        </div>
      </iFormItem>
    </el-form>
    <div slot="footer" class="flex flex-end-center margin-bottom20">
      <iButton :loading="loading" @click="send">{{ $t('发布') }}</iButton>
      <iButton @click="onClose">
        {{ $t('退出') }}
      </iButton>
    </div>
  </iDialog>
</template>

<script>
import { savePublishMsg } from '@/api/msgMgmt/msgPublish'
import { PUBLISH_SCOPE_OPTIONS } from './data'
import userSelector from '@/components/userSelector'
import {
  iDialog,
  iButton,
  iFormItem,
  iInput,
  iSelect,
  iDatePicker,
  iMessage
} from 'rise'
import { PARAMETER_OPTIONS } from '@/views/InformationMgmt/template/components/data'
import { arrayToMap } from '@/utils'
export default {
  name: 'publishDetail',
  components: {
    iDialog,
    iButton,
    iFormItem,
    iInput,
    iSelect,
    iDatePicker,
    userSelector
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    templateInfo: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {
    addressEditable() {
      return (
        this.templateInfo?.richContent?.indexOf(this.parameterMap.地址) > -1 ||
        false
      )
    },
    startTimeEditable() {
      return (
        this.templateInfo?.richContent?.indexOf(this.parameterMap.开始时间) >
          -1 || false
      )
    },
    endTimeEditable() {
      return (
        this.templateInfo?.richContent?.indexOf(this.parameterMap.结束时间) >
          -1 || false
      )
    }
  },
  data() {
    const validateUserList = (rule, value, callback) => {
      if (value.length === 0 && this.form.scope === 999) {
        callback(new Error('请选择用户'))
      } else {
        callback()
      }
    }
    const validateAddress = (rule, value, callback) => {
      if (value === '' && this.addressEditable) {
        callback(new Error('请填写地址'))
      } else {
        callback()
      }
    }
    const validateStartTime = (rule, value, callback) => {
      if (value === '' && this.startTimeEditable) {
        callback(new Error('请填写开始时间'))
      } else {
        callback()
      }
    }
    const validateEndTime = (rule, value, callback) => {
      if (value === '' && this.endTimeEditable) {
        callback(new Error('请填写结束时间'))
      } else {
        callback()
      }
    }
    return {
      sendTrigger: '1',
      dialogVisible: false,
      publishScopeOptions: PUBLISH_SCOPE_OPTIONS,
      form: {
        scope: 1,
        address: '',
        publishTime: '',
        startTime: '',
        endTime: '',
        userList: []
      },
      rules: {
        userList: [{ validator: validateUserList, trigger: 'change' }],
        address: [{ validator: validateAddress, trigger: 'blur' }],
        startTime: [{ validator: validateStartTime, trigger: 'blur' }],
        endTime: [{ validator: validateEndTime, trigger: 'blur' }]
      },
      loading: false,
      parameterMap: arrayToMap(PARAMETER_OPTIONS, 'label', 'value')
    }
  },
  created() {
    this.dialogVisible = this.visible
  },
  watch: {
    visible(val) {
      this.dialogVisible = val
    }
  },
  methods: {
    sendTriggerChange(val) {
      if (val === '1') {
        this.form.publishTime = ''
      }
    },
    send() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let userIds = []
          if (this.form.scope === 999) {
            userIds = this.form.userList.map(e => e.id + '')
          }
          const data = {
            channel: this.templateInfo.channel,
            code: this.templateInfo.code,
            name: this.templateInfo.name,
            pubdate: this.form.publishTime,
            richContent: this.templateInfo.richContent,
            scope: this.form.scope,
            title: this.templateInfo.title,
            type: this.templateInfo.type,
            createBy: this.$store.state.permission.userInfo.id,
            startTime: this.form.startTime,
            endTime: this.form.endTime,
            url: this.form.address
          }
          if (userIds.length > 0) {
            data.userIds = userIds
          }
          // console.log('data', data)
          this.sendServer(data)
        } else {
          console.log('validate false')
        }
      })
    },
    sendServer(data) {
      this.loading = true
      savePublishMsg(data)
        .then(res => {
          if (res.result) {
            iMessage.success(res.desZh || '消息发布成功')
            this.$emit('update:visible', false)
            setTimeout(() => {
              window.close()
            }, 3000)
          } else {
            iMessage.error(res.desZh || '发布失败')
          }
        })
        .catch(err => {
          console.log(err)
          iMessage.error(err.desZh || '发布失败')
        })
        .finally(() => (this.loading = false))
    },
    onClose() {
      this.$emit('update:visible', false)
    },
    userListChange(val) {
      this.form.userList = val
    }
  }
}
</script>

<style lang="scss" scoped></style>
