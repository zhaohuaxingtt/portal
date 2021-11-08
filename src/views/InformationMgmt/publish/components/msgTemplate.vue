<template>
  <div class="search">
    <el-form
      label-position="left"
      :label-width="labelWidth"
      :model="createTemp"
      :rules="rules"
      ref="createTemp"
    >
      <el-row :gutter="20">
        <el-col :span="16">
          <iFormItem :label="$t('发布渠道')">
            <iInput :value="channelStr" class="createInput " disabled />
          </iFormItem>
        </el-col>
        <el-col :span="8">
          <iFormItem :label="$t('模板编号')">
            <iInput
              v-model="createTemp.code"
              class="createInput "
              disabled
            ></iInput>
          </iFormItem>
        </el-col>
        <el-col :span="16">
          <iFormItem :label="$t('模板名称')">
            <iInput v-model="createTemp.name" disabled />
          </iFormItem>
        </el-col>
        <el-col :span="8" v-if="channel === '2'">
          <iFormItem :label="$t('邮件标题')" prop="title">
            <iInput v-model="createTemp.title" :disabled="!editable" />
          </iFormItem>
        </el-col>
        <el-col :span="8" v-if="channel === '16'">
          <iFormItem :label="$t('模板类型')">
            <iSelect v-model="createTemp.type" disabled class="titleSelect">
              <el-option
                v-for="item in templateTypes"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              />
            </iSelect>
          </iFormItem>
        </el-col>
        <el-col :span="24">
          <iFormItem :label="$t('模板内容')" prop="richContent">
            <iEditor
              ref="iEditor"
              v-model="createTemp.richContent"
              :toolbar="editToolbar"
              v-if="editable"
            />
            <div v-else class="content" v-html="createTemp.richContent"></div>
          </iFormItem>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { iSelect, iInput, iMessage, iFormItem } from 'rise'
import iEditor from '@/components/iEditor'
import { fetchTemplateById } from '@/api/msgMgmt/msgTemplate'
import {
  PARAMETER_OPTIONS,
  TEMPLATE_CHANNEL_MAP,
  TEMPLATE_TYPES,
  TOOLBAR
} from '@/views/InformationMgmt/template/components/data'
export default {
  name: 'createInfo',
  components: { iSelect, iInput, iEditor, iFormItem },
  props: {
    editable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    var checkTitle = (rule, value, callback) => {
      if (value === '' && this.createTemp.channel.indexOf('2') > -1) {
        callback(new Error('模板标题不能为空'))
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
      createTemp: {
        channel: '',
        code: '',
        name: '',
        title: '',
        type: '',
        richContent: ''
      },
      parameter: '',
      rules: {
        title: [{ validator: checkTitle, trigger: 'blur' }],
        richContent: [{ validator: checkContent, trigger: 'blur' }]
      },
      ispublish: false,
      templateTypes: TEMPLATE_TYPES,
      paramOptions: PARAMETER_OPTIONS
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
      return TEMPLATE_CHANNEL_MAP[this.channel]
    },
    id() {
      return this.$route.query.id
    },
    labelWidth() {
      return this.$i18n.locale === 'zh' ? '80px' : '120px'
    }
  },
  mounted() {
    this.query()
  },
  methods: {
    query() {
      if (this.$route.query.id) {
        fetchTemplateById({ id: this.$route.query.id })
          .then(res => {
            const { result, data } = res
            if (result) {
              if (data.type.length > 0) {
                data.type = parseInt(data.type)
              }
              this.createTemp = data

              this.$emit('change', this.createTemp)
              this.$emit('query-success', this.createTemp)
            }
          })
          .catch(err => {
            console.log('查询数据出错', err)
            iMessage.error('查询数据出错')
          })
      }
    },
    insertText() {
      this.$refs.iEditor.insertHTML(this.parameter)
    },
    getChannel(arr, total) {
      const useableArr = arr.filter(e => e <= total) // 筛选一下
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
.search {
  width: 80%;
}
.content {
  min-height: 200px;
  background: $color-background;
  padding: 16px;
  border-radius: 5px;
  overflow: hidden;
}
.parameterSelect {
  margin-right: 10px;
}
</style>
