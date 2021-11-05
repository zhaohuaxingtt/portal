<template>
  <div class="search">
    <el-form
      label-position="left"
      :label-width="labelWidth"
      :model="formData"
      :rules="rules"
      ref="formData"
    >
      <el-row :gutter="20">
        <el-col :span="16">
          <iFormItem :label="$t('发布对象')">
            <iInput :value="formData.scope" class="createInput " disabled />
          </iFormItem>
        </el-col>
        <el-col :span="8">
          <iFormItem :label="$t('发布人')">
            <iInput
              v-model="formData.creator"
              class="createInput "
              disabled
            ></iInput>
          </iFormItem>
        </el-col>
        <el-col :span="8">
          <iFormItem :label="$t('消息编号')">
            <iInput
              v-model="formData.code"
              class="createInput "
              disabled
            ></iInput>
          </iFormItem>
        </el-col>
        <el-col :span="8">
          <iFormItem :label="$t('消息名称')">
            <iInput
              v-model="formData.name"
              class="createInput "
              disabled
            ></iInput>
          </iFormItem>
        </el-col>
        <el-col :span="8">
          <iFormItem :label="$t('消息标题')" v-if="channel === '2'">
            <iInput
              v-model="formData.title"
              class="createInput "
              disabled
            ></iInput>
          </iFormItem>
        </el-col>
        <el-col :span="8" v-if="channel === '16'">
          <iFormItem :label="$t('消息类型')">
            <iSelect v-model="formData.type" disabled class="titleSelect">
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
          <iFormItem :label="$t('发布时间')">
            <iInput v-model="formData.pubdate" disabled />
          </iFormItem>
        </el-col>
        <el-col :span="24">
          <iFormItem :label="$t('消息内容')">
            <div class="content" v-html="formData.richContent"></div>
          </iFormItem>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { iSelect, iInput, iMessage, iFormItem } from 'rise'
import { fetchPublishById } from '@/api/msgMgmt/msgPublish'
import {
  PARAMETER_OPTIONS,
  TEMPLATE_CHANNEL_MAP,
  TEMPLATE_TYPES
} from '@/views/InformationMgmt/template/components/data'
import { PUBLISH_SCOPE_OPTIONS } from './data'
import { arrayToMap } from '@/utils'
export default {
  name: 'createInfo',
  components: { iSelect, iInput, iFormItem },
  props: {
    editable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      releaseChannelOption: '',
      formData: {
        channel: '',
        code: '',
        name: '',
        title: '',
        type: '',
        richContent: '',
        parameter: '',
        scope: ''
      },
      ispublish: false,
      code: '',
      templateTypes: TEMPLATE_TYPES,
      paramOptions: PARAMETER_OPTIONS
    }
  },
  computed: {
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
  created() {
    this.query()
  },
  methods: {
    query() {
      if (this.id) {
        fetchPublishById({ id: this.id })
          .then(res => {
            const { result, data } = res
            if (result) {
              this.formData = data

              if (data.scope !== '' && data.scope !== null) {
                if (data.scope === 999) {
                  this.formData.scope = data.userNames
                } else {
                  const publissScopeMap = arrayToMap(
                    PUBLISH_SCOPE_OPTIONS,
                    'value',
                    'label'
                  )
                  this.formData.scope = publissScopeMap[data.scope]
                }
              }
              this.$emit('query-success', this.formData)
            }
          })
          .catch(err => {
            console.log('查询数据出错', err)
            iMessage.error('查询数据出错')
          })
      }
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
