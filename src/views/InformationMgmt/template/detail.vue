<template>
  <iPage class="template">
    <iCard>
      <div class="flex flex-between-center-center margin-bottom20">
        <div class="title">{{ channelStr }}</div>
        <div class="floatright createBtn">
          <iButton @click="save('createTemp')">{{ $t('保存') }}</iButton>
          <iButton @click="resetForm">{{ $t('重置') }}</iButton>
        </div>
      </div>

      <div class="search">
        <el-form
          label-position="left"
          :label-width="labelWidth"
          :model="createTemp"
          :rules="rules"
          ref="createTemp"
        >
          <el-row :gutter="20">
            <el-col :span="8">
              <iFormItem :label="$t('模板编号')">
                <iInput
                  v-model="createTemp.code"
                  class="createInput"
                  disabled
                />
              </iFormItem>
            </el-col>
            <el-col :span="16">
              <iFormItem
                v-if="channel === '16'"
                :label="$t('模板类型')"
                prop="type"
              >
                <iSelect v-model="createTemp.type" class="titleSelect">
                  <el-option
                    v-for="item in templateTypes"
                    :key="item.value"
                    :value="item.value"
                    :label="item.label"
                  />
                </iSelect>
              </iFormItem>
              <iFormItem
                v-if="channel === '2'"
                :label="$t('邮件标题')"
                prop="title"
              >
                <iInput v-model="createTemp.title" />
              </iFormItem>
            </el-col>
            <el-col :span="24">
              <iFormItem :label="$t('模板名称')" prop="name">
                <iInput v-model="createTemp.name" />
              </iFormItem>
            </el-col>
            <el-col :span="24">
              <iFormItem :label="$t('模板内容')" prop="richContent">
                <iEditor
                  ref="iEditor"
                  v-model="createTemp.richContent"
                  :toolbar="editToolbar"
                />
              </iFormItem>
            </el-col>
            <el-col :span="8">
              <iFormItem>
                <div class="insert-parameter flex">
                  <iSelect v-model="parameter" class="parameterSelect">
                    <el-option
                      v-for="item in parameterOptions"
                      :key="item.value"
                      :value="item.value"
                      :label="item.label"
                    />
                  </iSelect>
                  <iButton @click="insertText">{{ $t('插入参数') }}</iButton>
                </div>
              </iFormItem>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </iCard>
  </iPage>
</template>

<script>
import {
  iPage,
  iSelect,
  iInput,
  iCard,
  iButton,
  iMessage,
  iFormItem
} from 'rise'
import { saveTemplate, fetchTemplateById } from '@/api/msgMgmt/msgTemplate'
import {
  PARAMETER_OPTIONS,
  TEMPLATE_CHANNEL_MAP,
  TOOLBAR,
  TEMPLATE_TYPES
} from './components/data'
import iEditor from '@/components/iEditor'
import { reloadOpener } from '@/utils'
export default {
  name: 'createInfo',
  components: { iPage, iSelect, iInput, iEditor, iCard, iButton, iFormItem },
  data() {
    const checkTitle = (rule, value, callback) => {
      if (value === '' && this.channel === '2') {
        callback(new Error('模板标题不能为空'))
      } else {
        callback()
      }
    }
    const checkType = (rule, value, callback) => {
      if (value === '' && this.channel === '16') {
        callback(new Error('请选择模板类型'))
      } else {
        callback()
      }
    }
    const checkContent = (rule, value, callback) => {
      let regp = RegExp(/<img|<iframe/g)
      if (value === '') {
        callback(new Error('模板内容不能为空'))
        return false
      } else if (
        regp.test(this.createTemp.richContent) &&
        this.channel === '16'
      ) {
        callback(new Error('发布渠道多选为站内信不能上传图片或音频'))
        return false
      } else {
        callback()
      }
    }
    return {
      parameterOptions: PARAMETER_OPTIONS,
      parameter: '',
      createTemp: {
        channel: '',
        code: '',
        name: '',
        title: '',
        type: '',
        richContent: ''
      },
      rules: {
        title: [{ validator: checkTitle, trigger: 'blur' }],
        richContent: [{ validator: checkContent, trigger: 'blur' }],
        type: [{ validator: checkType, trigger: 'blur' }],
        name: [
          { required: true, message: '模板名称不能为空', trigger: 'blur' }
        ],
        code: [{ required: true, message: '模板编号不能为空', trigger: 'blur' }]
      },
      code: '',
      originalData: {},
      templateTypes: TEMPLATE_TYPES
    }
  },
  computed: {
    editToolbar() {
      if (this.channel) {
        return TOOLBAR[this.channel]
      }
      return []
    },
    channel() {
      return this.$route.query.channel.toString()
    },
    channelStr() {
      if (this.channel) {
        return TEMPLATE_CHANNEL_MAP[this.channel]
      }
      return ''
    },
    id() {
      return this.$route.query.id
    },
    labelWidth() {
      return this.$i18n.locale === 'zh' ? '80px' : '120px'
    }
  },
  watch: {
    channel(val) {
      console.log('watch channel', val)
    }
  },
  created() {
    this.query()
  },
  methods: {
    query() {
      if (this.id) {
        fetchTemplateById({ id: this.id })
          .then((res) => {
            const { result, data } = res
            if (result) {
              this.createTemp = data
              const { code } = data
              if (data.type.length > 0) {
                data.type = parseInt(data.type)
              }
              this.code = code
              this.originalData = _.cloneDeep(this.createTemp)
            }
          })
          .catch((err) => {
            console.log('查询数据出错', err)
            iMessage.error('查询数据出错')
          })
      } else {
        this.originalData = _.cloneDeep(this.createTemp)
      }
    },
    insertText() {
      this.$refs.iEditor.insertHTML(this.parameter)
    },
    save(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const channel = this.id ? this.createTemp.channel : this.channel
          let data = {
            ...this.createTemp,
            channel
          }
          if (this.$route.query.id) {
            data.id = this.$route.query.id
          }
          if (this.channel === '16') {
            let regp = RegExp(/<img|<iframe/g)
            if (regp.test(this.createTemp.content)) {
              iMessage.error('发布渠道多选为站内信不能上传图片或音频')
              return false
            }
          }
          saveTemplate(data)
            .then((val) => {
              if (val.code == 200) {
                iMessage.success('保存成功')

                setTimeout(() => {
                  window.close()
                }, 3000)
                reloadOpener()
              } else {
                iMessage.error('保存失败')
              }
            })
            .catch((err) => {
              console.log('err', err)
              iMessage.error('保存失败')
            })
        }
      })
    },
    resetForm() {
      this.createTemp = _.cloneDeep(this.originalData)
    },
    getChannel(arr, total) {
      const useableArr = arr.filter((e) => e <= total) // 筛选一下
      let totalValue = total
      const len = useableArr.length - 1
      const res = []
      for (let i = len; i >= 0; i--) {
        const element = useableArr[i]
        const remainder = totalValue - element
        const nextValue = i === 0 ? 0 : useableArr[i - 1]
        if (
          remainder >= nextValue ||
          len === i ||
          remainder === 0 ||
          useableArr.indexOf(remainder) > -1
        ) {
          res.push(element)
          totalValue = remainder
        }
      }
      return res
    },
    handleRichContentChange(val) {
      this.createTemp.richContent = val
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 20px;
  font-weight: bold;
}
.createBtn {
  margin-left: 20px;
  text-align: right;
}
.parameterSelect {
  margin-right: 10px;
}
.search {
  width: 80%;
}
</style>
