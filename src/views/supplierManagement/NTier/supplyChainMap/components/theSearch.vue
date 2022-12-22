<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-02 20:01:05
 * @LastEditors: Please set LastEditors
 * @Descripttion: your project
-->
<template>
  <div class='title'>
    <div v-if="$route.path!=='/supplier/NTier/NTierMap'"
         class="flex-between-center-center">
      <div class="text margin-bottom20">{{ language('GYLGL','N级供应链管理')}}</div>
      <div>
        <!-- v-if="$route.path!=='/NTierMap'" -->
        <iButton :loading="saveButtonLoading" v-permission="CATEGORY_ASSISTANT_WBGYSCFX_GONGYINGLIANGAILAN_SAVE"
                 @click="$emit('handleSave')">{{language('BAOCUN','保存')}}</iButton>
        <iButton @click="handleBack">{{language('FANHUI','返回')}}</iButton>
      </div>
    </div>
    <el-row type="flex"
            justify="space-between">
      <el-col :span="3">
        <iSelectCustom :search-method="handleCarTypeSearch"
                       @change="handleCarType"
                       ref="iSelectCustom"
                       :placeholder="language('CHEXING','车型')"
                       :data="formGoup.carModelList"
                       label="carTypeName"
                       value="carTypeCode"
                       v-model="formSelect.carTypeCodeList"
                       :multiple="true"
                       :popoverClass="'dropDown '" />
      </el-col>
      <!-- 材料组 -->
      <el-col :span="3">
        <iSelectCustom :multiple-limit="30"
                       :search-method="handleCategorySearch"
                       :placeholder="language('CAILIAOZU','材料组')"
                       @change="handleCategory"
                       :disabled="disabled"
                       :data="formGoup.categoryList"
                       :label="$getLabel('categoryName','categoryNameDe')"
                       value="categoryCode"
                       v-model="formSelect.categoryCodeList"
                       :multiple="true"
                       :popoverClass="'popover-class'" />
      </el-col>
      <el-col :span="3">
        <iSelectCustom :search-method="handleSupplierSearch"
                       :placeholder="language('GONGYINGSHANG','供应商')"
                       @change="handleSupplier"
                       :data="formGoup.supplierList"
                       :label="$getLabel('supplierNameCn','supplierNameEn')"
                       value="supplierId"
                       v-model="formSelect.supplierIdList "
                       :multiple="true"
                       :popoverClass="'popover-class'" />
      </el-col>
      <el-col :span="3">
        <iSelectCustom :search-method="handlePartSearch"
                       :placeholder="language('LINGJIAN','零件')"
                       @change="handlePart"
                       :data="formGoup.partList"
                       :label="$getLabel('partNameCn','partNameDe')"
                       value="partNum"
                       v-model="formSelect.partNumList "
                       :multiple="true"
                       :popoverClass="'popover-class'" />
      </el-col>
      <el-col :span="4">
        <el-cascader v-model="form.area" :filter-method="filterZR"
                     :placeholder="language('QUYU','区域')"
                     :options="formGoup.areaList"
                     :props="{multiple:true}"
                     :clearable="true"
                     popper-class="area-select"
                     collapse-tags
                     filterable></el-cascader>
      </el-col>
      <el-col :span="5" style="text-align:right">
        <iButton @click="getMapList">{{language('QUEDING','确定')}}</iButton>
        <iButton @click="handleSearchReset">{{language('CHONGZHI','重置')}}</iButton>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { listSelectCarModel, listSelectCategory, listSelectPart, listSelectSupplier } from "@/api/supplierManagement/supplyChainOverall/index.js";
import { iSelect, iInput, iButton, iSelectCustom } from 'rise'
import { getCity,getCityInfo } from "@/api/supplierManagement/supplyChainOverall/index.js";

export default {
  // import引入的组件需要注入到对象中才能使用
  components: { iSelect, iInput, iButton, iSelectCustom },
  props: {
    categoryCode: {
      type: String,
      default: ""
    }
  },
  data () {
    // 这里存放数据
    return {
      saveButtonLoading: false,
      formSelect: {
        carTypeCodeList: [],
        categoryCodeList: [],
        partNumList: [],
        supplierIdList: [],
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
        cityList: [],
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
        supplierList: [],
      },
      disabled: false
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    categoryCode: {
      async handler (val) {
        if (val) {
          await this.getSelectList()
          this.disabled = true
          let arr = val.split(",")
          this.formGoup.categoryList.forEach(item => {
            if (arr.indexOf(item.categoryCode) > -1) {
              this.formSelect.categoryCodeList.push(item)
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
    handleBack () {
      this.$router.go(-1)
    },
    handleCarTypeSearch (val) {
      this.formGoup.carModelList = this.formGoupCopy.carModelList.filter(item => {
        return item.carTypeName.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    },
    handleCategorySearch (val) {
      this.formGoup.categoryList = this.formGoupCopy.categoryList.filter(item => {
        return item.categoryName.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    },
    handleSupplierSearch (val) {
      this.formGoup.supplierList = this.formGoupCopy.supplierList.filter(item => {
        return item.supplierNameCn.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    },
    handlePartSearch (val) {
      console.log(val);
      this.formGoup.partList = this.formGoupCopy.partList.filter(item => {
        return item.partNameCn.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    },
    async handleCarType () {
      this.form.carTypeCodeList = []
      this.formSelect.carTypeCodeList.forEach(item => {
        this.form.carTypeCodeList.push(item.carTypeCode)
      })
      this.getSelectList('carTypeCodeList')
    },
    handleCategory () {
      this.form.categoryCodeList = []
      this.formSelect.categoryCodeList.forEach(item => {
        this.form.categoryCodeList.push(item.categoryCode)
      })
      this.getSelectList('categoryCodeList')
    },
    handleSupplier () {
      this.form.supplierIdList = []
      this.formSelect.supplierIdList.forEach(item => {
        this.form.supplierIdList.push(item.supplierId)
      })
      this.getSelectList('supplierIdList')
    },
    handlePart () {
      this.form.partNumList = []
      this.formSelect.partNumList.forEach(item => {
        this.form.partNumList.push(item.partNum)
      })
      this.getSelectList('partNumList')
    },
    getMapList () {
      this.form.countryList = []
      this.form.provinceList = []
      this.form.cityList = []
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
              this.form.cityList.push(val)
              break;
            default:
              break;
          }
        })
      })
      this.form.countryList = _.sortedUniq(this.form.countryList)
      this.form.provinceList = _.sortedUniq(this.form.provinceList)
      this.form.cityList = _.sortedUniq(this.form.cityList)
      this.$emit('getMapList', this.form)
    },
    // 
    // async getCityInfo () {
    //   const res = await getCity()
    //   this.formGoup.areaList = res
    // },
    filterZR(vnode,val){
      if(vnode.text.toLowerCase().indexOf(val.toLowerCase()) > -1){
        return vnode.text;
      }
    },
    getData(){
      this.getCityInfo().then(res=>{
        // console.log(res);
        this.formGoup.areaList = _.cloneDeep(res);
        console.log(this.form)
      })
    },
    getCityInfo () {
      var that = this;

      var zhRule = /^[\u4e00-\u9fa5]+$/i;//中文
      var enRule = /^[a-zA-Z]+$/;//英文
      return new Promise((resolve, reject) => {
        console.log(that.$i18n.locale);
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
            console.log(areaList)
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
            console.log(areaList)
            resolve(areaList)
          }
        }).catch(res=>{
          reject();
        })
      })
    },
    // 重置
    handleSearchReset () {

      this.formSelect = {
        carTypeCodeList: [],
        categoryCodeList: [],
        partNumList: [],
        supplierIdList: [],
      }
      this.form = {
        carTypeCodeList: [],
        categoryCodeList: [],
        partNumList: [],
        supplierIdList: [],
        // 国家
        area: [],
        countryList: [],
        provinceList: [],
        cityList: [],
      }
      this.getMapList()
    },
    async getSelectList (flag) {
      try {
        let res1, res2, res3, res4
        switch (flag) {
          case 'carTypeCodeList':
            res2 = await listSelectCategory(this.form)
            this.formGoup.categoryList = res2.data
            this.formGoupCopy.categoryList = res2.data
            res3 = await listSelectSupplier(this.form)
            this.formGoup.supplierList = res3.data
            this.formGoupCopy.supplierList = res3.data
            var list4 = [];
            listSelectPart(this.form).then(res4=>{
              res4.data.forEach(e=>{
                e.partNameCn = e.partNameCn + "-" + e.partNum
                e.partNameDe = e.partNameDe + "-" + e.partNum
              })
              list4 = res4.data
              console.log(list4)
            }).then(red=>{
              this.formGoup.partList = list4
              this.formGoupCopy.partList = list4
            })
            break;
          case 'categoryCodeList':
            res1 = await listSelectCarModel(this.form)
            this.formGoup.carModelList = res1.data
            this.formGoupCopy.carModelList = res1.data
            res3 = await listSelectSupplier(this.form)
            this.formGoup.supplierList = res3.data
            this.formGoupCopy.supplierList = res3.data
            var list4 = [];
            listSelectPart(this.form).then(res4=>{
              res4.data.forEach(e=>{
                e.partNameCn = e.partNameCn + "-" + e.partNum
                e.partNameDe = e.partNameDe + "-" + e.partNum
              })
              list4 = res4.data
              console.log(list4)
            }).then(red=>{
              this.formGoup.partList = list4
              this.formGoupCopy.partList = list4
            })
            break;
          case 'supplierIdList':
            res1 = await listSelectCarModel(this.form)
            this.formGoup.carModelList = res1.data
            this.formGoupCopy.carModelList = res1.data
            res2 = await listSelectCategory(this.form)
            this.formGoup.categoryList = res2.data
            this.formGoupCopy.categoryList = res2.data
            var list4 = [];
            listSelectPart(this.form).then(res4=>{
              res4.data.forEach(e=>{
                e.partNameCn = e.partNameCn + "-" + e.partNum
                e.partNameDe = e.partNameDe + "-" + e.partNum
              })
              list4 = res4.data
              console.log(list4)
            }).then(red=>{
              this.formGoup.partList = list4
              this.formGoupCopy.partList = list4
            })
            break;
          case 'partNumList':
            res1 = await listSelectCarModel(this.form)
            this.formGoup.carModelList = res1.data
            this.formGoupCopy.carModelList = res1.data
            res2 = await listSelectCategory(this.form)
            this.formGoup.categoryList = res2.data
            this.formGoupCopy.categoryList = res2.data
            res3 = await listSelectSupplier(this.form)
            this.formGoup.supplierList = res3.data
            this.formGoupCopy.supplierList = res3.data
            break;

          default:
            res1 = await listSelectCarModel(this.form)
            this.formGoup.carModelList = res1.data
            this.formGoupCopy.carModelList = res1.data
            res2 = await listSelectCategory(this.form)
            this.formGoup.categoryList = res2.data
            this.formGoupCopy.categoryList = res2.data
            res3 = await listSelectSupplier(this.form)
            this.formGoup.supplierList = res3.data
            this.formGoupCopy.supplierList = res3.data

            var list4 = [];
            listSelectPart(this.form).then(res4=>{
              res4.data.forEach(e=>{
                e.partNameCn = e.partNameCn + "-" + e.partNum
                e.partNameDe = e.partNameDe + "-" + e.partNum
              })
              list4 = res4.data
              console.log(list4)
            }).then(red=>{
              this.formGoup.partList = list4
              this.formGoupCopy.partList = list4
            })
            // res4 = await listSelectPart(this.form)
            // console.log(res4)
            break;
        }
      } catch (error) {
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  async created () {
    await this.getSelectList()
    this.getMapList()
    this.getData()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    document.getElementsByClassName('list-container')[0].style.height = '17rem'
    document.getElementsByClassName('list-container')[1].style.height = '17rem'
    document.getElementsByClassName('list-container')[2].style.height = '17rem'
    document.getElementsByClassName('list-container')[3].style.height = '17rem'
  },
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
