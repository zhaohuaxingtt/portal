<template>
  <iSearch @sure="sure" @reset="reset">
    <el-form ref="searchForm">
      <el-row :gutter="24">
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
          <iFormItem :label="language(formTitles.carTypeProName)">
            <iSelect
              :placeholder="language(formTitles.inputPlaceholder)"
              v-model="formData.carTypeProName"
              remote
              filterable
              :remote-method="querySearchCarTypeNameAsync"
            >
              <el-option
                v-for="item in carTypeNames"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </iSelect>
          </iFormItem>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
          <iFormItem :label="language(formTitles.carTypeProType)">
            <!-- <iInput v-model="formData.carTypeProType" /> -->
            <iSelect
              :placeholder="language(formTitles.inputPlaceholder)"
              v-model="formData.carTypeId"
              remote
              filterable
              :remote-method="querySearchCarTypeAsync"
            >
              <el-option
                v-for="item in carTypes"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </iSelect> </iFormItem
        ></el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
          <iFormItem :label="language(formTitles.publishStatus)">
            <iSelect
              v-model="formData.publishStatus"
              filterable
              :placeholder="language('请选择')"
            >
              <el-option
                v-for="item in releaseStatusOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </iSelect>
          </iFormItem>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
          <iFormItem :label="language(formTitles.isValid)">
            <iSelect
              v-model="formData.isValid"
              filterable
              :placeholder="language('请选择')"
            >
              <el-option
                v-for="item in validSelecOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </iSelect>
          </iFormItem>
        </el-col>
      </el-row>
    </el-form>
  </iSearch>
</template>

<script>
import { iSearch, iFormItem, iSelect } from 'rise'
import {
  carProjectStatusList,
  carProjectNameList,
  carProjectcarTypeList
} from '@/api/mainData/carProject'
export default {
  name: 'filterPanel',
  components: { iSearch, iFormItem, iSelect },
  data() {
    return {
      formData: {
        carTypeProName: '',
        carTypeId: '',
        publishStatus: '',
        isValid: ''
      },
      formTitles: {
        carTypeProName: '车型项目中文名称',
        carTypeProType: '车型',
        publishStatus: '发布状态',
        isValid: '是否有效',
        inputPlaceholder: '请输入'
      },
      carTypes: [],
      carTypeNames: [],
      validSelecOptions: [
        {
          value: true,
          label: '是'
        },
        {
          value: false,
          label: '否'
        }
      ],
      releaseStatusOptions: []
    }
  },
  methods: {
    querySearchCarTypeAsync(keyword) {
      let param = { param: keyword }
      carProjectcarTypeList(param).then((val) => {
        if (val.code == 200) {
          this.carTypes = val.data
        }
      })
    },
    querySearchCarTypeNameAsync(keyword) {
      let param = { param: keyword }
      carProjectNameList(param).then((val) => {
        if (val.code == 200) {
          this.carTypeNames = val.data
        }
      })
    },
    getReleaseStatusList() {
      let param = {}
      carProjectStatusList(param).then((val) => {
        if (val.code == 200) {
          this.releaseStatusOptions = val.data.cartype_pro_public_state
        }
      })
    },
    sure() {
      this.$emit('search', this.formData)
    },
    reset() {
      this.formData = {
        nameZh: '',
        carType: '',
        publishStatus: '',
        status: ''
      }
      this.$emit('search', this.formData)
    }
  },
  created() {
    this.getReleaseStatusList()
  }
}
</script>

<style lang="scss" scoped></style>
