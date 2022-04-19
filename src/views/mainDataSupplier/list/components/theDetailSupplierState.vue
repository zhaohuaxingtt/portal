<template>
  <iCard :title="language('供应商状态')" collapse>
    <!-- <div class="actions" slot="header-control">
      <iButton v-show="!editable" @click="editable = true">{{
        language('编辑')
      }}</iButton>
      <iButton v-show="editable" :loading="saveLoading" @click="handleSave">
        {{ language('保存') }}
      </iButton>
      <iButton v-show="editable" @click="cancel">{{
        language('取消')
      }}</iButton>
    </div> -->
    <el-form
      label-position="left"
      label-width="130px"
      :model="detail"
      ref="ruleForm"
      class="validate-required-form"
    >
      <el-row :gutter="20">
        <el-col :span="$route.query.supplierType !== 'GP'?6:8">
          <iFormItem :label="language('是否在供')" prop="materialGroupCode">
            <el-input :value="detail.isSupply ? '是' : '否'" disabled />
          </iFormItem>
        </el-col>
        <el-col :span="$route.query.supplierType !== 'GP'?6:8">
          <iFormItem :label="language('供应商身份')" prop="materialGroupNameZh" v-if="$route.query.supplierType=='GP'">
            <el-input :value="detail.formalStatus" disabled />
          </iFormItem>
          <iFormItem :label="language('供应商身份')" prop="materialGroupNameZh" v-if="$route.query.supplierType!=='GP'">
            <el-input :value="identification" disabled />
          </iFormItem>
        </el-col>
        <el-col :span="6" v-if="$route.query.supplierType !== 'GP'">
          <iFormItem
            :label="language('是否业内工厂')"
            prop="materialGroupNameEn"
          >
            <iSelect v-model="detail.isFactory" :disabled="!editable">
              <el-option
                v-for="item in boolIntegerOptions"
                :key="item.code"
                :value="item.code"
                :label="item.name"
              />
            </iSelect>
          </iFormItem>
        </el-col>
        <el-col :span="6" v-if="$route.query.supplierType !== 'GP'">
          <iFormItem :label="language('是否隶属华域 ')" prop="dept">
            <iSelect v-model="detail.isSubjectionchina" :disabled="!editable">
              <el-option
                v-for="item in boolIntegerOptions"
                :key="item.code"
                :value="item.code"
                :label="item.name"
              />
            </iSelect>
          </iFormItem>
        </el-col>
        <el-col :span="6" v-if="$route.query.supplierType !== 'GP'">
          <iFormItem :label="language('供货类型')" prop="rawMaterialCodes">
            <el-input :value="detail.supplyType" disabled />
          </iFormItem>
        </el-col>
        <el-col :span="$route.query.supplierType !== 'GP'?6:8">
          <iFormItem :label="language('是否共用供应商')">
            <el-input :value="detail.isShareSupplier ? '是' : '否'" disabled />
          </iFormItem>
        </el-col>
        <el-col :span="6" v-if="$route.query.supplierType !== 'GP'">
          <iFormItem :label="language('供货零件类型')">
            <el-input :value="detail.supplyPartForm" disabled />
          </iFormItem>
        </el-col>
        <el-col :span="6" v-if="$route.query.supplierType !== 'GP'">
          <iFormItem :label="language('相关专业科室')">
            <el-input :value="detail.relevantDept" disabled />
          </iFormItem>
        </el-col>
        <el-col :span="6" v-if="$route.query.supplierType !== 'GP'">
          <iFormItem :label="language('是否签署定点协议')">
            <iSelect
              v-model="detail.isSign"
              :placeholder="language('请选择')"
              :disabled="!editable"
              filterable
            >
              <el-option :value="1" label="已签署" />
              <el-option :value="0" label="未签署" />
            </iSelect>
          </iFormItem>
        </el-col>
      </el-row>
    </el-form>
  </iCard>
</template>

<script>
import { iCard, iFormItem, iButton, iMessage, iSelect } from 'rise'

import { updateSupplierState } from '@/api/mainDataSupplier/list/state.js'
export default {
  name: 'theDetailSupplierState',
  components: { iCard, iFormItem, iButton, iSelect },
  props: {
    detail: {
      type: Object,
      default: () => {
        return {
          addressInfoVo: {}
        }
      }
    },
    supplierType: {
      type: String,
      default: 'PD'
    },
    supplierId: {
      type: String,
      default: ''
    },
    dicts: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    boolIntegerOptions() {
      if (!this.dicts.TURE_FALSE) {
        return []
      }
      return this.dicts.TURE_FALSE.map((e) => {
        return { ...e, code: +e.code }
      })
    },
    identification() {
      if (this.detail.formalStatus == '0') {
        return '临时'
      }
      if (this.detail.formalStatus == '1') {
        return '正式'
      }
      return '储蓄池'
    }
  },
  data() {
    return {
      editable: false,
      saveLoading: false
    }
  },
  methods: {
    handleOrgChange(val, options) {
      console.log('orgChange', val, options)
    },
    handleSave() {
      this.save()
    },
    save() {
      this.saveLoading = true
      const data = {
        isFactory: this.detail.isFactory,
        isSign: this.detail.isSign,
        isSubjectionchina: this.detail.isSubjectionchina
      }
      const params = {
        supplierId: this.supplierId
      }
      updateSupplierState(params, data)
        .then((res) => {
          if (res.result) {
            this.editable = false
            iMessage.success(res.desZh || '保存成功')
          } else {
            iMessage.error(res.desZh || '保存失败')
          }
        })
        .catch((err) => {
          iMessage.error(err.desZh || '保存失败')
        })
        .finally(() => (this.saveLoading = false))
    },
    cancel() {
      // this.form = _.cloneDeep(this.originalForm)
      this.$emit('detail-supplier-state')
      this.editable = false
    }
  }
}
</script>

<style lang="scss" scoped></style>
