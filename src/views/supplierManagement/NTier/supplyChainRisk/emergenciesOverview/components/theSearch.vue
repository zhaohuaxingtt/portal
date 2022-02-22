<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-21 10:18:28
 * @LastEditors: Please set LastEditors
 * @Descripttion: your project
-->
<template>
  <i-search @reset="handleSearchReset"
            @sure="handleInit"
            :icon="true">
    <el-form>
      <el-form-item :label="language('SHIJIANLEIXING','事件类型')">
        <iInput :placeholder="$t('LK_QINGSHURU')"
                v-model="form.eventName"></iInput>
      </el-form-item>
      <el-form-item :label="language('QUYU','区域')">
        <el-cascader v-model="form.area"
                     :placeholder="language('QUYU','区域')"
                     :options="formGoup.areaList"
                     :props="{multiple:true}"
                     :clearable="true"
                     collapse-tags
                     filterable></el-cascader>
      </el-form-item>
      <el-form-item :label="language('SHIJIANQIZHI','时间起止')">
        <iDatePicker v-model="form.date"
                     @change="handleSubmitTime"
                     value-format="yyyy-MM-dd"
                     :picker-options="pickerOptions"
                     type="daterange"
                     range-separator="-"
                     start-placeholder="开始日期"
                     end-placeholder="结束日期"
                     :placeholder="$t('LK_QINGSHURU')"></iDatePicker>
      </el-form-item>
      <el-form-item :label="language('CHUANGJIANFANGSHI','创建方式')">
        <iSelect :placeholder="$t('LK_QINGSHURU')"
                 v-model="form.createType">
          <el-option v-for="(item,index) in formGoup.createTypeList"
                     :key="index"
                     :value="item"
                     :label="item">
          </el-option>
        </iSelect>
      </el-form-item>
    </el-form>
  </i-search>
</template>

<script>
import { iSearch, iInput, iDatePicker, iSelect } from 'rise'
import { getCity } from "@/api/supplierManagement/supplyChainOverall/index.js";
export default {
  components: {
    iSearch,
    iInput,
    iDatePicker,
    iSelect
  },
  data () {
    return {
      pickerOptions: {
        disabledDate (time) {
          return time > new Date();
        }
      },
      form: {
        date: [],
        area: [],
        countryList: [],
        provinceList: [],
        // 
        eventName: '',
        occurrencePlace: [],
        occurrenceStartTime: '',
        occurrenceEndTime: '',
        createType: ''
      },
      formGoup: {
        areaList: [],
        createTypeList: ['自动创建', '手动创建']
      },
    }
  },
  created () {
    this.getCityInfo()
  },
  methods: {
    async getCityInfo () {
      const res = await getCity()
      this.formGoup.areaList = res
    },
    handleSubmitTime (e) {
      this.form.occurrenceStartTime = e[0]
      this.form.occurrenceEndTime = e[1]
    },
    handleSearchReset () {
      this.form = {
        date: [],
        area: [],
        countryList: [],
        provinceList: [],
        // 
        eventName: '',
        occurrencePlace: [],
        occurrenceStartTime: '',
        occurrenceEndTime: '',
        createType: ''
      }
      this.handleInit()
    },
    handleInit () {
      this.form.countryList = []
      this.form.provinceList = []
      this.form.occurrencePlace = []
      this.form.occurrenceCityList = []
      this.form.area.forEach(item => {
        item.forEach((val, index) => {
          switch (index) {
            case 0:
              this.form.countryList.push(val)
              break;
            case 1:
              this.form.provinceList.push(val)
              break;
            case 2:
              this.form.occurrencePlace.push(val)
              this.form.occurrenceCityList.push(val)
              break;
            default:
              break;
          }
        })
      })
      this.form.countryList = _.sortedUniq(this.form.countryList)
      this.form.provinceList = _.sortedUniq(this.form.provinceList)
      this.form.occurrencePlace = _.sortedUniq(this.form.occurrencePlace)
      this.form.occurrenceCityList = _.sortedUniq(this.form.occurrenceCityList)
      this.$parent.$children[1].handleInit(this.form)
    },
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-cascader__tags {
  justify-content: space-between;
  flex-wrap: nowrap;
  span {
    width: 50%;
  }
}
</style>
