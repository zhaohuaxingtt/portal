<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-09-13 16:13:07
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <iPage>
    <pageHeader class="margin-bottom20">
      {{form.supplierName+ language('GONGYINGSHANGFANKUIBIAO','供应商反馈表') }}
      <iButton :disabled="form.feedbackResult==='已反馈'" @click="handleSubmit" slot="actions">{{language('TIJIAO','提交')}}</iButton>
    </pageHeader>
    <iCard>
      <el-row :gutter="30">
        <el-form ref="ruleForm" :model="form" :rules="rules" label-width="40%" label-position="left">
          <el-col :span="7">
            <el-form-item :label="language('SHIFOUXUYAOTIANXIEBAOJINGXING','是否需要填写报警信')">
              <iSelect @change="handleIsWarningLetter" :placeholder="$t('APPROVAL.PLEASE_CHOOSE')" v-model="form.isWarningLetter">
                <el-option v-for="(item, index) in formGroup.isWarningLetter" :key="index" :value="item.code" :label="item.label">
                </el-option>
              </iSelect>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item prop="impactStartDate" :label="language('YINGXIANGKAISHISHIJIAN','影响开始时间')">
              <iDatePicker :picker-options="pickerStartAuditYear" v-model="form.impactStartDate" type="date" :range-separator="$t('SUPPLIER_ZHI')" :placeholder="language('QINGXUANZHE','请选择')" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item :label="language('YINGXIANGJIESHUSHIJIAN','影响结束时间')">
              <iDatePicker :picker-options="pickerEndAuditYear" v-model="form.impactEndDate" type="date" :range-separator="$t('SUPPLIER_ZHI')" :placeholder="language('QINGXUANZHE','请选择')" clearable />
            </el-form-item>
          </el-col>
        </el-form>
        <el-col :span="24">
          <div class="el-form-item__label">
            {{language('YINGXIANGXIANGQING','影响详情')}}
          </div>
          <iInput class="margin-top10" :placeholder="language('QINGSHURUYINGXIANGXIANGQING','请输入影响详情…')" v-model="form.impactDetail" :rows="25" type="textarea"></iInput>
        </el-col>
      </el-row>
    </iCard>
  </iPage>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { iPage, iButton, iCard, iDatePicker, iSelect, iInput, iMessageBox } from "rise";
import pageHeader from '@/components/pageHeader'
import { saveFeedbackInfo, getImpactFeedback } from "@/api/supplierManagement/supplyChainRisk/index.js";
import resultMessageMixin from "@/mixins/resultMessageMixin.js";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { iPage, pageHeader, iButton, iCard, iDatePicker, iSelect, iInput },
  mixins: [resultMessageMixin],
  data() {
    // 这里存放数据
    return {
      rules: {
        impactStartDate: [
          { required: false, message: '请选择影响开始时间', trigger: ['blur', 'change'] },
        ],
      },
      pickerStartAuditYear: {
        disabledDate: time => {
          if (this.form.impactEndDate) {
            return time > new Date(this.form.impactEndDate)
          }
        }
      },
      pickerEndAuditYear: {
        disabledDate: time => {
          return time < new Date(this.form.impactStartDate)
        }
      },
      form: {
        supplierName: '',
        isWarningLetter: '',
        impactDetail: "",
        impactStartDate: '',
        impactEndDate: ''
      },
      formGroup: {
        isWarningLetter: [
          {
            code: true,
            label: '是'
          },
          {
            code: false,
            label: '否'
          }
        ]
      }
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    handleIsWarningLetter(data) {
      this.rules.impactStartDate[0].required = data
    },
    handleSubmit() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          iMessageBox(
            this.language('QUERENTIJIAO', '确认提交') + this.form.supplierName + this.language('GONGYINGSHANGFANKUIBIAO', '供应商反馈表') + '?', // 暂时处理
            this.$t('LK_WENXINTISHI'),
            { confirmButtonText: this.$t('LK_QUEDING'), cancelButtonText: this.$t('LK_QUXIAO') }
          ).then(async () => {
            let pms = {
              id: this.$route.query.id,
              isWarningLetter: this.form.isWarningLetter,
              impactDetail: this.form.impactDetail,
              impactStartDate: this.form.impactStartDate.slice(0, 10),
              impactEndDate: this.form.impactEndDate.slice(0, 10)
            }
            if (this.form.isWarningLetter) {
              // 进入报警信页面
              this.$router.push({ path: '/supplier/NTier/alarmLetter/alarmLetterView', query: { flag: 'add', ...pms } })
            } else {
              const res = await saveFeedbackInfo(pms)
              this.resultMessage(res)
            }
          })

        }
      })
    },
    async init() {
      const res = await getImpactFeedback(this.$route.query.id)
      this.form = res.data
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.init()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
::v-deep .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>
