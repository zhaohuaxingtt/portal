<template>
  <iSearch @sure="sure" @reset="reset">
    <el-form ref="searchForm" class="search-form">
      <el-row>
        <el-col :span="8">
          <iFormItem :label="language('车型编号')">
            <carSelect v-model="formData.vwModelCode" valueKey="vwModelCode" />
          </iFormItem>
        </el-col>
        <el-col :span="8">
          <iFormItem :label="language('车型名称')">
            <carSelect v-model="formData.modelNameZh" valueKey="modelNameZh" />
          </iFormItem>
        </el-col>
        <el-col :span="8">
          <iFormItem :label="language('所属品牌')">
            <iSelect v-model="formData.brandCode" filterable>
              <el-option
                v-for="item in brandSelectOptions"
                :key="item.code"
                :value="item.code"
                :label="item.name"
              />
            </iSelect>
          </iFormItem>
        </el-col>
        <el-col :span="8">
          <iFormItem :label="language('平台属性')">
            <iSelect v-model="formData.carPlatformCode" filterable>
              <el-option
                v-for="item in platformCodeOptions"
                :key="item.code"
                :value="item.code"
                :label="item.name"
              />
            </iSelect>
          </iFormItem>
        </el-col>
        <el-col :span="8">
          <iFormItem :label="language('车型项目')">
            <iInput v-model="formData.carTypeProjectCode" />
          </iFormItem>
        </el-col>
        <el-col :span="8">
          <iFormItem :label="language('投产工厂')">
            <iSelect v-model="formData.productFactory" filterable>
              <el-option
                v-for="item in productFactoryOptions"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              />
            </iSelect>
          </iFormItem>
        </el-col>
        <el-col :span="8">
          <iFormItem :label="language('是否有效')">
            <iSelect v-model="formData.isValid" filterable>
              <el-option value="" :label="language('全部')" />
              <el-option :value="true" :label="language('是')" />
              <el-option :value="false" :label="language('否')" />
            </iSelect>
          </iFormItem>
        </el-col>
      </el-row>
    </el-form>
  </iSearch>
</template>

<script>
import { iSearch, iFormItem, iInput, iSelect } from 'rise'
import carSelect from './carSelect'
import { fetchSelectDicts, fetchProcureFactorySelectVo } from '@/api/baseInfo'
import { fetchBrandSelect } from '@/api/mainData/car'
import { DEFAULT_SEARCH_FORM_DATA } from './data'

export default {
  name: 'filterPanel',
  components: { iSearch, iFormItem, iInput, iSelect, carSelect },
  data() {
    return {
      formData: { ...DEFAULT_SEARCH_FORM_DATA },
      platformCodeOptions: [], // 平台属性
      productFactoryOptions: [], // 投产工厂
      brandSelectOptions: [] // 品牌
    }
  },
  created() {
    this.queryProcureFactorySelectVo()
    this.querySelectDicts()
    this.queryBrandSelect()
  },
  methods: {
    async querySelectDicts() {
      const req = ['CAR_PLATFORM_CODE', 'CAR_MODEL_TYPE_LEVEL', 'CAR_TYPE']
      const { data } = await fetchSelectDicts(req)
      const { CAR_PLATFORM_CODE } = data
      this.platformCodeOptions = CAR_PLATFORM_CODE
    },
    async queryBrandSelect() {
      const { data } = await fetchBrandSelect()
      this.brandSelectOptions = data
    },
    async queryProcureFactorySelectVo() {
      const { data } = await fetchProcureFactorySelectVo()
      this.productFactoryOptions = data
    },
    sure() {
      this.$emit('search', this.formData)
    },
    reset() {
      this.formData = { ...DEFAULT_SEARCH_FORM_DATA }
      this.$emit('search', this.formData)
    }
  }
}
</script>

<style lang="scss" scoped></style>
