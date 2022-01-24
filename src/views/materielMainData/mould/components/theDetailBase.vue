<template>
  <iCard :title="language('基础信息')" collapse>
    <div class="actions" slot="header-control">
      <iButton
        v-show="!editable"
        @click="editable = true"
        xxx-permission="'BUTTON_MATERIEL_DATA_MOULD_BASEINFO_MODIFY'"
      >
        {{ language('编辑') }}
      </iButton>
      <iButton
        v-show="editable"
        @click="save"
        xxx-permission="'BUTTON_MATERIEL_DATA_MOULD_BASEINFO_MODIFY|BUTTON_MATERIEL_DATA_MOULD_ADD'"
      >
        {{ language('保存') }}
      </iButton>
      <iButton v-show="editable" @click="cancel">
        {{ language('取消') }}
      </iButton>
    </div>
    <el-form
      label-position="left"
      label-width="130px"
      :model="form"
      :rules="rules"
      ref="ruleForm"
      class="validate-required-form"
    >
      <el-row :gutter="20">
        <el-col :span="8">
          <iFormItem :label="language('模具材料组编号')" prop="code">
            <iInput
              v-model="form.code"
              :placeholder="language('请输入')"
              :disabled="this.$route.query.id"
            />
          </iFormItem>
        </el-col>
        <el-col :span="8">
          <iFormItem :label="language('模具材料组名称(中)')" prop="nameZh">
            <iInput
              v-model="form.nameZh"
              :placeholder="language('请输入')"
              :disabled="!editable"
            />
          </iFormItem>
        </el-col>
        <el-col :span="8">
          <iFormItem :label="language('模具材料组名称(德)')" prop="nameDe">
            <iInput
              v-model="form.nameDe"
              :placeholder="language('请输入')"
              :disabled="!editable"
            />
          </iFormItem>
        </el-col>
      </el-row>
    </el-form>
  </iCard>
</template>

<script>
import { iCard, iInput, iFormItem, iButton, iMessage } from 'rise'
import { saveMould, queryMouldGroup } from '@/api/materiel/mould'
import { DETAIL_FORM } from './data'
export default {
  name: 'TheDetailBase',
  components: { iCard, iInput, iFormItem, iButton },
  data() {
    return {
      editable: false,
      form: { ...DETAIL_FORM },
      rules: {
        code: [
          {
            required: true,
            message: '模具材料组编号必填',
            trigger: 'blur'
          }
        ],
        nameZh: [
          {
            required: true,
            message: '模具材料组名称(中)必填',
            trigger: 'blur'
          }
        ],
        nameDe: [
          {
            required: true,
            message: '模具材料组名称(德)必填',
            trigger: 'blur'
          }
        ]
      },
      originalForm: { ...DETAIL_FORM }
    }
  },
  created() {
    if (!this.$route.query.id) {
      this.editable = true
    } else {
      this.queryMouldGroup()
    }
  },
  methods: {
    queryMouldGroup() {
      queryMouldGroup({ id: this.$route.query.id })
        .then((res) => {
          if (res.result) {
            this.form = res.data
            this.originalForm = _.cloneDeep(res.data)
          } else {
            iMessage.error(res.desZh || '获取数据失败')
          }
        })
        .catch((err) => {
          iMessage.error(err.desZh || '获取数据失败')
        })
    },
    save() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          saveMould(this.form)
            .then((res) => {
              if (res.result) {
                iMessage.success(res.desZh || '保存成功')
                const { id, code } = res.data
                this.$router.replace({ query: { id, code } })
              } else {
                iMessage.error(res.desZh || '保存失败')
              }
            })
            .catch((err) => {
              iMessage.error(err.desZh || '保存失败')
            })
            .finally(() => [(this.editable = false)])
        }
      })
    },
    cancel() {
      this.form = _.cloneDeep(this.originalForm)
      this.editable = false
    }
  }
}
</script>

<style lang="scss" scoped></style>
