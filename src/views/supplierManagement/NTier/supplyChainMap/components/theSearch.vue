<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-02 20:01:05
 * @LastEditors: YoHo && 917955345@qq.com
 * @Descripttion: your project
-->
<template>
  <div class="title">
    <div
      v-if="$route.path !== '/supplier/NTier/NTierMap'"
      class="flex-between-center-center"
    >
      <div class="text margin-bottom20">
        {{ language('GYLGL', 'N级供应链管理') }}
      </div>
      <div>
        <iButton
          :loading="saveButtonLoading"
          v-permission="CATEGORY_ASSISTANT_WBGYSCFX_GONGYINGLIANGAILAN_SAVE"
          @click="$emit('handleSave')"
          >{{ language('BAOCUN', '保存') }}</iButton
        >
        <iButton @click="handleBack">{{ language('FANHUI', '返回') }}</iButton>
      </div>
    </div>
    <el-row type="flex" justify="space-between">
      <el-col :span="4">
        <mySelect
          :data="formGoup.carModelList"
          @change="handleCarType"
          propLabel="carTypeName"
          propValue="carTypeCode"
          popperClass="carModelList"
        />
      </el-col>
      <!-- 材料组 -->
      <el-col :span="3">
        <mySelect
          :data="formGoup.categoryList"
          @change="handleCategory"
          propLabel="categoryName"
          propValue="categoryCode"
          popperClass="categoryList"
        />
      </el-col>
      <el-col :span="3">
        <mySelect
          :data="formGoup.supplierList"
          @change="handleSupplier"
          :searchValue="form.supplierIdList"
          propLabel="supplierNameCn"
          propValue="supplierId"
          popperClass="supplierList"
        />
      </el-col>
      <el-col :span="3">
        <mySelect
          :data="formGoup.partList"
          @change="handlePart"
          :searchValue="form.partNumList"
          propLabel="partNameCn"
          propLabelEn="partNameDe"
          subLabel="partNum"
          propValue="partNum"
          popperClass="partList"
        />
      </el-col>
      <el-col :span="4">
        <el-cascader
          v-model="form.area"
          :filter-method="filterZR"
          :placeholder="language('QUYU', '区域')"
          :options="formGoup.areaList"
          :props="{ multiple: true }"
          :clearable="true"
          popper-class="area-select"
          collapse-tags
          filterable
        ></el-cascader>
      </el-col>
      <el-col :span="5" style="text-align: right">
        <iButton @click="getMapList">{{ language('QUEDING', '确定') }}</iButton>
        <iButton @click="handleSearchReset">{{
          language('CHONGZHI', '重置')
        }}</iButton>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import {
  listSelectCarModel,
  listSelectCategory,
  listSelectPart,
  listSelectSupplier
} from '@/api/supplierManagement/supplyChainOverall/index.js'
import { iInput, iButton, iSelectCustom } from 'rise'
import { iSelect } from '@/components/iSelect'
import mySelect from './mySelect'
import { getCityInfo } from '@/api/supplierManagement/supplyChainOverall/index.js'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: { iSelect, iInput, iButton, iSelectCustom, mySelect },
  props: {
    categoryCode: {
      type: String,
      default: ''
    }
  },
  data() {
    // 这里存放数据
    return {
      saveButtonLoading: false,
      formSelect: {
        carTypeCodeList: [],
        categoryCodeList: [],
        partNumList: [],
        supplierIdList: []
      },
      form: {
        carTypeCodeList: [],
        categoryCodeList: [],
        partNumList: [],
        supplierIdList: [],
        // 国家
        area: [],
        countryList: [],
        provinceList: [],
        cityList: []
      },
      formGoup: {
        carModelList: [],
        categoryList: [],
        partList: [],
        supplierList: [],
        areaList: []
      },
      formGoupCopy: {
        carModelList: [],
        categoryList: [],
        partList: [],
        supplierList: []
      },
      disabled: false,
    }
  },
  // 监控data中的数据变化
  watch: {
    categoryCode: {
      async handler(val) {
        if (val) {
          await this.getSelectList()
          this.disabled = true
          let arr = val.split(',')
          this.formGoup.categoryList.forEach((item) => {
            if (arr.indexOf(item.categoryCode) > -1) {
              this.form.categoryCodeList.push(item)
            }
          })
        } else {
          this.disabled = false
        }
      },
      immediate: true
    }
  },
  // 方法集合
  methods: {
    // 返回
    handleBack() {
      this.$router.go(-1)
    },
    handleCarTypeSearch(val) {
      this.formGoup.carModelList = this.formGoupCopy.carModelList.filter(
        (item) => {
          return item.carTypeName.toLowerCase().indexOf(val.toLowerCase()) > -1
        }
      )
    },
    handleCategorySearch(val) {
      this.formGoup.categoryList = this.formGoupCopy.categoryList.filter(
        (item) => {
          return item.categoryName.toLowerCase().indexOf(val.toLowerCase()) > -1
        }
      )
    },
    handleSupplierSearch(val) {
      this.formGoup.supplierList = this.formGoupCopy.supplierList.filter(
        (item) => {
          return (
            item.supplierNameCn.toLowerCase().indexOf(val.toLowerCase()) > -1
          )
        }
      )
    },
    handlePartSearch(val) {
      this.formGoup.partList = this.formGoupCopy.partList.filter((item) => {
        return item.partNameCn.toLowerCase().indexOf(val.toLowerCase()) > -1
      })
    },
    getMapList() {
      this.form.countryList = []
      this.form.provinceList = []
      this.form.cityList = []
      this.form.area.forEach((item) => {
        item.forEach((val, index) => {
          switch (index) {
            case 0:
              this.form.countryList.push(val)
              break
            case 1:
              this.form.provinceList.push(val)
              break
            case 2:
              this.form.cityList.push(val)
              break
            default:
              break
          }
        })
      })
      this.form.countryList = _.sortedUniq(this.form.countryList)
      this.form.provinceList = _.sortedUniq(this.form.provinceList)
      this.form.cityList = _.sortedUniq(this.form.cityList)
      this.$emit('getMapList', this.form)
    },
    filterZR(vnode, val) {
      if (vnode.text.toLowerCase().indexOf(val.toLowerCase()) > -1) {
        return vnode.text
      }
    },
    getCityInfo() {
      var that = this
      var zhRule = /^[\u4e00-\u9fa5]+$/i //中文
      var enRule = /^[a-zA-Z]+$/ //英文
      getCityInfo().then((res) => {
        if (window.Worker) {
          const myWorker = new Worker('./worker.js')
          myWorker.postMessage(res)
          myWorker.onmessage = function (result) {
            that.formGoup.areaList = _.cloneDeep(result.data)
          }
        } else {
          if (res?.result) {
            let areaList = []
            // 筛选国家
            res.data.map((item) => {
              if (item.locationType === 'Nation') {
                if (that.$i18n.locale === 'zh') {
                  if (zhRule.test(item.cityNameCn)) {
                    areaList.push({
                      value: item.cityNameCn,
                      label: item.cityNameCn,
                      cityId: item.cityId,
                      children: []
                    })
                  }
                } else {
                  if (enRule.test(item.cityNameEn)) {
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
                  if (that.$i18n.locale === 'zh') {
                    if (zhRule.test(item.cityNameCn)) {
                      areaList[index].children.push({
                        value: item.cityNameCn,
                        label: item.cityNameCn,
                        cityId: item.cityId,
                        parentCityId: item.parentCityId,
                        children: []
                      })
                    }
                  } else {
                    if (enRule.test(item.cityNameEn)) {
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
                  if (
                    item.locationType === 'City' &&
                    item.parentCityId === i.cityId
                  ) {
                    if (that.$i18n.locale === 'zh') {
                      if (zhRule.test(item.cityNameCn)) {
                        areaList[j].children[index].children.push({
                          value: item.cityNameCn,
                          label: item.cityNameCn,
                          cityId: item.cityId,
                          parentCityId: item.parentCityId
                        })
                      }
                    } else {
                      if (enRule.test(item.cityNameEn)) {
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
            this.formGoup.areaList = _.cloneDeep(areaList)
          }
        }
      })
    },
    // 重置
    handleSearchReset() {
      // this.formSelect = {
      //   carTypeCodeList: [],
      //   categoryCodeList: [],
      //   partNumList: [],
      //   supplierIdList: [],
      // }
      this.form = {
        carTypeCodeList: [],
        categoryCodeList: [],
        partNumList: [],
        supplierIdList: [],
        // 国家
        area: [],
        countryList: [],
        provinceList: [],
        cityList: []
      }
      this.getSelectList()
      this.getMapList()
    },
    
    handleCarType(val) {
      this.form.carTypeCodeList = val
      this.getSelectList('carTypeCodeList')
    },
    handleCategory(val) {
      this.form.categoryCodeList = val
      this.getSelectList('categoryCodeList')
    },
    handleSupplier(val) {
      this.form.supplierIdList = val
      this.getSelectList('supplierIdList')
    },
    handlePart(val) {
      this.form.partNumList = val
      this.getSelectList('partNumList')
    },
    async getSelectList(flag) {
      switch (flag) {
        case 'carTypeCodeList':
          this.listSelectCategory()
          this.listSelectSupplier()
          this.listSelectPart()
          break
        case 'categoryCodeList':
          this.listSelectCarModel()
          this.listSelectSupplier()
          this.listSelectPart()
          break
        case 'supplierIdList':
          this.listSelectCarModel()
          this.listSelectCategory()
          this.listSelectPart()
          break
        case 'partNumList':
          this.listSelectCarModel()
          this.listSelectCategory()
          this.listSelectSupplier()
          break

        default:
          this.listSelectCarModel()
          this.listSelectCategory()
          this.listSelectSupplier()
          this.listSelectPart()
          break
      }
    },
    listSelectCarModel() {
      listSelectCarModel(this.form).then((res) => {
        if (res?.code == '200') {
          this.$set(this.formGoup, 'carModelList', res.data || [])
          this.$set(this.formGoupCopy, 'carModelList', res.data || [])
        }
      })
    },
    listSelectCategory() {
      listSelectCategory(this.form).then((res) => {
        if (res?.code == '200') {
          this.$set(this.formGoup, 'categoryList', res.data || [])
          this.$set(this.formGoupCopy, 'categoryList', res.data || [])
        }
      })
    },
    listSelectSupplier() {
      listSelectSupplier(this.form).then((res) => {
        if (res?.code == '200') {
          this.$set(this.formGoup, 'supplierList', res.data || [])
          this.$set(this.formGoupCopy, 'supplierList', res.data || [])
        }
      })
    },
    listSelectPart() {
      listSelectPart(this.form).then((res) => {
        if (res?.code == '200') {
          this.$set(this.formGoup, 'partList', res.data || [])
          this.$set(this.formGoupCopy, 'partList', res.data || [])
        }
      })
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  async created() {
    this.getSelectList()
    this.getMapList()
    this.getCityInfo()
  }
}
</script>
<style lang='scss'  >
.area-select {
  .el-cascader-menu__wrap {
    height: 360px;
  }
  .el-cascader-panel {
    height: 360px !important;
  }
}
// @import url(); 引入公共css类
.title {
  .text {
    font-size: 22px;
    font-weight: Bold;
  }
}
::v-deep .custom-select-input > input {
  height: 2.1875rem;
  box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
  border-color: transparent;
}
::v-deep .el-input__inner {
  height: 2.1875rem;
  box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
  border-color: transparent;
}
::v-deep .el-cascader__tags {
  justify-content: space-between;
  flex-wrap: nowrap;
  span {
    width: 50%;
  }
}
::v-deep .el-col-5 {
  display: flex;
  justify-content: flex-end;
}
</style>
