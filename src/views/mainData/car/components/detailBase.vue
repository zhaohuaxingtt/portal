<template>
  <iCard
    :title="language('基本信息')"
    header-control
    collapse
    v-loading="baseSaveLoading"
  >
    <div
      class="flex-end-center margin-bottom20"
      v-permission="
        'BUTTON_MAIN_DATA_CAR_MODEL_BASEINFO_MODIFY|BUTTON_MAIN_DATA_CAR_MODEL_ADD'
      "
    >
      <iButton v-if="isEditPage && !editable" @click="edit">
        {{ language('编辑') }}
      </iButton>
      <iButton @click="save" v-show="editable">
        {{ language('确认') }}
      </iButton>
      <iButton @click="cancel" v-show="editable">
        {{ language('取消') }}
      </iButton>
    </div>
    <el-form
      :model="baseForm"
      :rules="rules"
      label-position="left"
      ref="ruleForm"
      label-width="120px"
      class="validate-required-form"
    >
      <el-row :gutter="30">
        <el-col :span="6">
          <iFormItem :label="language('TIPS中车型ID')">
            <iInput :value="tipsId" disabled />
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="language('车型编号')" prop="vwModelCode">
            <iInput
              v-model="baseForm.vwModelCode"
              :disabled="!editable"
              :placeholder="language('请输入')"
            />
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="language('车型名称')" prop="modelNameZh">
            <iInput
              v-model="baseForm.modelNameZh"
              :disabled="!editable"
              :placeholder="language('请输入')"
            />
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="language('车型类型')" prop="type">
            <iSelect
              v-model="baseForm.type"
              :disabled="!editable"
              filterable
              :placeholder="language('请选择')"
            >
              <el-option
                v-for="item in carTypeOptions"
                :key="item.code"
                :value="item.code"
                :label="item.name"
              />
            </iSelect>
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="language('PID')" prop="productCode">
            <iSelect
              v-model="baseForm.productCode"
              :disabled="!editable"
              filterable
              :placeholder="language('请选择')"
            >
              <el-option
                v-for="item in productFamilyOptions"
                :key="item.code"
                :value="item.code"
                :label="item.code"
              />
            </iSelect>
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="language('中文描述')">
            <iInput
              v-model="baseForm.description"
              :disabled="!editable"
              :placeholder="language('请输入')"
            />
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="language('平台属性')" prop="carPlatformCode">
            <iSelect
              v-model="baseForm.carPlatformCode"
              :disabled="!editable"
              filterable
              :placeholder="language('请选择')"
            >
              <el-option
                v-for="item in platformCodeOptions"
                :key="item.code"
                :value="item.code"
                :label="item.name"
              />
            </iSelect>
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="language('所属品牌')" prop="brandCode">
            <iSelect
              v-model="baseForm.brandCode"
              :disabled="!editable"
              filterable
              :placeholder="language('请选择')"
            >
              <el-option
                v-for="item in brandSelectOptions"
                :key="item.code"
                :value="item.code"
                :label="item.name"
              />
            </iSelect>
          </iFormItem>
        </el-col>
        <el-col :span="12">
          <iFormItem :label="language('投产工厂')">
            <iSelect
              v-model="baseForm.productFactory"
              filterable
              disabled
              multiple
              :placeholder="language('请选择')"
            >
              <el-option
                v-for="item in productFactoryOptions"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              />
            </iSelect>
          </iFormItem>
        </el-col>
        <el-col :span="6" v-if="baseForm.id">
          <iFormItem :label="language('计算车型')">
            <iSelect
              v-model="baseForm.calCartype"
              :disabled="!editable"
              filterable
              :placeholder="language('请选择')"
            >
              <el-option
                v-for="item in calCarTypeConfigOptions"
                :key="item.code"
                :value="item.code"
                :label="item.name"
              />
            </iSelect>
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="language('Sourcing类别')" prop="sourceType">
            <iSelect
              v-model="baseForm.sourceType"
              :disabled="!editable"
              filterable
              :placeholder="language('请选择')"
            >
              <el-option
                v-for="item in sourceTypeOptions"
                :key="item.code"
                :value="item.code"
                :label="item.name"
              />
            </iSelect>
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="language('车型级别')" prop="carTypeLevel">
            <iSelect
              v-model="baseForm.carTypeLevel"
              :disabled="!editable"
              filterable
              :placeholder="language('请选择')"
            >
              <el-option
                v-for="item in modelTypeLevelOptions"
                :key="item.code"
                :value="item.code"
                :label="item.name"
              />
            </iSelect>
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="language('是否有效')" prop="isValid">
            <iSelect
              v-model="baseForm.isValid"
              :disabled="!editable"
              filterable
              :placeholder="language('请选择')"
            >
              <el-option :value="true" :label="language('有效')" />
              <el-option :value="false" :label="language('无效')" />
            </iSelect>
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="language('是否允许从TIPS同步')">
            <iSelect
              v-model="baseForm.isModify"
              :disabled="!editable"
              filterable
              :placeholder="language('请选择')"
            >
              <el-option :value="true" :label="language('是')" />
              <el-option :value="false" :label="language('否')" />
            </iSelect>
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="language('EPL车型名称')">
            <iSelect
              v-model="baseForm.eplModelCode"
              :disabled="!editable"
              filterable
              :placeholder="language('请选择')"
            >
              <el-option
                v-for="item in EPLOptions"
                :key="item.id"
                :value="item.code"
                :label="item.name"
              />
            </iSelect>
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="language('BKM车型编号')">
            <iInput
              :value="baseForm.bkmModelCode"
              disabled
              :placeholder="language('请输入')"
            />
            <!-- <iSelect
              v-model="baseForm.bkmModelCode"
              :disabled="!editable"
              filterable
            >
              <el-option
                v-for="item in BKMOptions"
                :key="item.id"
                :value="item.code"
                :label="item.code"
              />
            </iSelect> -->
          </iFormItem>
        </el-col>
      </el-row>
    </el-form>
  </iCard>
</template>

<script>
import { iCard, iFormItem, iSelect, iInput, iButton, iMessage } from 'rise'
import {
  fetchBrandSelect,
  fetchCalCarTypeConfig,
  fetchProductfamilySelectData,
  saveCartype,
  updateCarType,
  queryCarModelMappingResource
} from '@/api/mainData/car'
import { fetchSelectDicts } from '@/api/baseInfo'
export default {
  name: 'carDetailBase',
  components: { iCard, iFormItem, iSelect, iInput, iButton },
  props: {
    productFactoryOptions: {
      type: Array,
      default: function () {
        return []
      }
    },
    baseForm: {
      type: Object,
      default: function () {
        return {
          aekoCartype: '',
          brandCode: '',
          calCartype: '',
          carPlatformCode: '',
          carTypeLevel: '',
          createBy: 0,
          description: '',
          isValid: true,
          modelNameZh: '',
          productCode: '',
          productFactory: '',
          productId: 0,
          sourceType: '',
          type: '',
          vwModelCode: '',
          isModify: false,
          eplModelCode: '',
          bkmModelCode: ''
        }
      }
    }
  },
  computed: {
    editable() {
      if (!this.isEditPage) {
        return true
      }
      return this.editstate
    },
    isEditPage() {
      return this.baseForm.id
    },
    tipsId() {
      if (this.baseForm?.resource === 2) {
        return this.baseForm.originId
      }
      return ''
    }
  },
  watch: {
    'baseForm.id'() {
      if (this.baseForm.id) {
        this.queryCalCarTypeConfig()
      }
    },
    baseForm() {
      this.orginalBaseForm = _.cloneDeep(this.baseForm)
    }
  },
  data() {
    return {
      editstate: false,
      rules: {
        vwModelCode: [
          {
            required: true,
            message: this.language('请输入车型编号'),
            trigger: 'blur'
          }
        ],
        modelNameZh: [
          {
            required: true,
            message: this.language('请输入车型名称'),
            trigger: 'blur'
          }
        ],
        productCode: [
          {
            required: true,
            message: this.language('请选择PID'),
            trigger: 'blur'
          }
        ],
        carPlatformCode: [
          {
            required: true,
            message: this.language('请选择平台属性'),
            trigger: 'blur'
          }
        ],
        brandCode: [
          {
            required: true,
            message: this.language('请选择所属品牌'),
            trigger: 'blur'
          }
        ],
        productFactory: [
          {
            required: true,
            message: this.language('请选择投产工厂'),
            trigger: 'blur'
          }
        ],
        sourceType: [
          {
            required: true,
            message: this.language('请选择Sourcing类别'),
            trigger: 'blur'
          }
        ],
        carTypeLevel: [
          {
            required: true,
            message: this.language('车型级别'),
            trigger: 'blur'
          }
        ],
        isValid: [{ required: true, trigger: 'blur' }],
        type: [
          {
            required: true,
            message: this.language('请选择车型类型'),
            trigger: 'blur'
          }
        ]
      },
      platformCodeOptions: [], // 平台属性
      modelTypeLevelOptions: [], // 车型级别
      carTypeOptions: [], // 车型类型
      brandSelectOptions: [], // 所属品牌
      calCarTypeConfigOptions: [],
      sourceTypeOptions: [],
      productFamilyOptions: [],
      orginalBaseForm: {},
      EPLOptions: [],
      BKMOptions: [],
      baseSaveLoading: false
    }
  },
  created() {
    this.orginalBaseForm = _.cloneDeep(this.baseForm)
    this.querySelectDicts()
    this.queryBrandSelect()
    if (this.baseForm.id) {
      this.queryCalCarTypeConfig()
    }
    this.fetchProductfamilySelectData()
    this.queryEPLOptions()
    this.queryBKMOptions()
  },
  methods: {
    async queryEPLOptions() {
      const { data } = await queryCarModelMappingResource({ type: 1 })
      this.EPLOptions = data
    },
    async queryBKMOptions() {
      const { data } = await queryCarModelMappingResource({ type: 2 })
      this.BKMOptions = data
    },
    async querySelectDicts() {
      const req = [
        'CAR_PLATFORM_CODE',
        'CAR_MODEL_TYPE_LEVEL',
        'CAR_TYPE',
        'SOURCE_TYPE'
      ]
      const { data } = await fetchSelectDicts(req)
      const { CAR_PLATFORM_CODE, CAR_MODEL_TYPE_LEVEL, CAR_TYPE, SOURCE_TYPE } =
        data
      this.platformCodeOptions = CAR_PLATFORM_CODE
      this.modelTypeLevelOptions = CAR_MODEL_TYPE_LEVEL
      this.carTypeOptions = CAR_TYPE
      this.sourceTypeOptions = SOURCE_TYPE
    },
    async queryBrandSelect() {
      const { data } = await fetchBrandSelect()
      this.brandSelectOptions = data
    },
    async queryCalCarTypeConfig() {
      const { data } = await fetchCalCarTypeConfig({
        cartypeId: this.baseForm.id
      })
      this.calCarTypeConfigOptions = data
    },
    async fetchProductfamilySelectData() {
      const { data } = await fetchProductfamilySelectData()
      this.productFamilyOptions = data
    },
    edit() {
      this.orginalBaseForm = _.cloneDeep(this.baseForm)
      this.editstate = true
    },
    cancel() {
      if (!this.isEditPage) {
        window.close()
      }
      if (_.isEqual(this.orginalBaseForm, this.baseForm)) {
        this.$emit('reset', this.orginalBaseForm)
        this.editstate = false
      } else {
        this.$confirm(
          this.language('页面内容有更新,是否保存?'),
          this.language('提示'),
          {
            confirmButtonText: this.language('确定'),
            cancelButtonText: this.language('取消'),
            type: 'warning'
          }
        )
          .then(() => {
            this.save()
          })
          .catch(() => {
            this.editstate = false
            this.$emit('reset', this.orginalBaseForm)
          })
      }
    },
    save() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.saveBaseForm()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async saveBaseForm() {
      const reqData = {
        ...this.baseForm,
        productFactory: this.baseForm.productFactory
          ? this.baseForm.productFactory.join(',')
          : ''
      }
      this.baseSaveLoading = true
      const isEdit = !!this.baseForm.id
      const res = isEdit
        ? await updateCarType(reqData).finally(
            () => (this.baseSaveLoading = false)
          )
        : await saveCartype(reqData).finally(
            () => (this.baseSaveLoading = false)
          )
      if (res.result) {
        iMessage.success(res.desZh || '保存成功')
      } else {
        iMessage.error(res.desZh || '保存失败')
      }
      if (res.data) {
        this.$emit('save-success', res.data)
        if (!isEdit) {
          this.$router.replace({ query: { id: res.data.id } })
        }
      }

      this.editstate = false
    }
  }
}
</script>

<style lang="scss" scoped></style>
