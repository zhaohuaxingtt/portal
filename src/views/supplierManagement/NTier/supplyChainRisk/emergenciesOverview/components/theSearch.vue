<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-21 10:18:28
 * @LastEditors: YoHo && 917955345@qq.com
 * @Descripttion: your project
-->
<template>
  <i-search @reset="handleSearchReset"
            @sure="handleInit"
            :icon="true">
    <el-form>
      <el-form-item :label="language('SHIJIANLEIXING','事件类型')">
        <iSelect :placeholder="$t('LK_QINGSHURU')"
                 v-model="form.eventName">
          <el-option v-for="(item,index) in eventType"
                         :key="index"
                         :label="$getLabel(item.name,item.nameEn)"
                         :value="item.name"></el-option>
        </iSelect>
        <!-- <iInput :placeholder="$t('LK_QINGSHURU')"
                v-model="form.eventName"></iInput> -->
      </el-form-item>
      <el-form-item :label="language('QUYU','区域')">
        <el-cascader v-model="form.area" :filter-method="filterZR"
                     :placeholder="language('QUYU','区域')"
                     :options="formGroup.areaList"
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
                    :start-placeholder="language('开始日期')"
                    :end-placeholder="language('结束日期')"
                     :placeholder="$t('LK_QINGSHURU')"></iDatePicker>
      </el-form-item>
      <el-form-item :label="language('CHUANGJIANFANGSHI','创建方式')">
        <iSelect :placeholder="$t('LK_QINGSHURU')"
                 v-model="form.createType">
          <el-option v-for="(item,index) in formGroup.createTypeList"
                     :key="index"
                     :value="item.value"
                     :label="$getLabel(item.labelZ,item.labelE)">
          </el-option>
        </iSelect>
      </el-form-item>
    </el-form>
  </i-search>
</template>

<script>
import { iSearch, iInput, iDatePicker, iSelect } from 'rise'
import { getCity,getCityInfo } from "@/api/supplierManagement/supplyChainOverall/index.js";

export default {
  components: {
    iSearch,
    iInput,
    iDatePicker,
    iSelect
  },
  props:{
    eventType: {
      type: Object,
      default:()=>({})
    }
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
      formGroup: {
        areaList: [],
        createTypeList: []
      },
    }
  },
  created () {
    this.getData()
    this.formGroup.createTypeList = [
      {
        value:"自动创建",
        labelZ:'自动创建',
        labelE:'Automatic creation',
      },{
        value:"手动创建",
        labelZ:'手动创建',
        labelE:'Create Manually',
      }
    ]
  },
  methods: {
    filterZR(vnode,val){
      if(vnode.text.toLowerCase().indexOf(val.toLowerCase()) > -1){
        return vnode.text;
      }
    },
    getData(){
      this.getCityInfo().then(res=>{
        this.formGroup.areaList = _.cloneDeep(res);
      })
    },
    getCityInfo () {
      var that = this;

      var zhRule = /^[\u4e00-\u9fa5]+$/i;//中文
      var enRule = /^[a-zA-Z]+$/;//英文
      return new Promise((resolve, reject) => {
        getCityInfo().then(res=>{
          if(res?.result){
            let areaList = []
            // 筛选国家
            res.data.map((item) => {
              if (item.locationType === 'Nation') {
                if(that.$i18n.locale === "zh"){
                  if(zhRule.test(item.cityNameCn)){
                    areaList.push({
                      value: item.cityNameCn,
                      label: item.cityNameCn,
                      cityId: item.cityId,
                      children: []
                    })
                  }
                }else{
                  if(enRule.test(item.cityNameEn)){
                    areaList.push({
                      value: item.cityNameCn,
                      label: item.cityNameEn,
                      cityId: item.cityId,
                      children: []
                    })
                  }
                }
              }
            })
            // 筛选省
            res.data.forEach((item) => {
              areaList.forEach((val, index) => {
                if (
                  item.locationType === 'Province' &&
                  item.parentCityId === val.cityId
                ) {
                  if(that.$i18n.locale === "zh"){
                    if(zhRule.test(item.cityNameCn)){
                      areaList[index].children.push({
                        value: item.cityNameCn,
                        label: item.cityNameCn,
                        cityId: item.cityId,
                        parentCityId: item.parentCityId,
                        children: []
                      })
                    }
                  }else{
                    if(enRule.test(item.cityNameEn)){
                      areaList[index].children.push({
                        value: item.cityNameCn,
                        label: item.cityNameEn,
                        cityId: item.cityId,
                        parentCityId: item.parentCityId,
                        children: []
                      })
                    }
                  }
                }
              })
            })
            // 筛选市
            res.data.forEach((item) => {
              areaList.forEach((val, j) => {
                val.children.forEach((i, index) => {
                  if (item.locationType === 'City' && item.parentCityId === i.cityId) {
                    if(that.$i18n.locale === "zh"){
                      if(zhRule.test(item.cityNameCn)){
                        areaList[j].children[index].children.push({
                          value: item.cityNameCn,
                          label: item.cityNameCn,
                          cityId: item.cityId,
                          parentCityId: item.parentCityId
                        })
                      }
                    }else{
                      if(enRule.test(item.cityNameEn)){
                        areaList[j].children[index].children.push({
                          value: item.cityNameCn,
                          label: item.cityNameEn,
                          cityId: item.cityId,
                          parentCityId: item.parentCityId
                        })
                      }
                    }
                  }
                })
              })
            })
            // 删除空数组
            areaList.map((item) => {
              if (item.children.length) {
                item.children.map((val) => {
                  if (item.children.length === 0) {
                    delete val.children
                  }
                })
              } else {
                delete item.children
              }
            })
            areaList.map((item) => {
              return item.children && item.children
            })
            resolve(areaList)
          }
        }).catch(res=>{
          reject();
        })
      })
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
