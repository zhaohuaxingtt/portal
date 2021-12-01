<template>
    <iSearch @reset="handleSearchReset" @sure="getTableList" :icon="false">
        <el-form>
            <!--第一行-->
            <el-row class="margin-bottom10">
                <!--零件号-->
                <el-form-item :label="$t('EKL_YJGL_LJHAO')">
                    <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.partNum"></iInput>
                </el-form-item>
                <!--零件名称-->
                <el-form-item :label="$t('EKL_PFJ_LJMC')">
                    <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.partName"></iInput>
                </el-form-item>
                <!--材料组-->
                <el-form-item :label="$t('EKL_PFJ_CLZ')">
                    <iSelect multiple filterable :placeholder="$t('LK_QINGXUANZE')" v-model="form.spMaterialGroup">
                        <!--<el-option value="" :label="$t('all')"></el-option>-->
                        <el-option
                                :value="item"
                                :label="item"
                                v-for="item,index in allSelectObject.categoryLinieVoList"
                                :key="index"></el-option>
                    </iSelect>
                </el-form-item>
                <!--品牌-->
                <el-form-item :label="$t('EKL_PFJ_PP')">
                    <iSelect multiple filterable :placeholder="$t('LK_QINGXUANZE')" v-model="form.partBrand">
                        <!--<el-option value="" :label="$t('all')"></el-option>-->
                        <el-option
                                :value="item"
                                :label="$i18n.locale === 'zh'  ? item : item"
                                v-for="item,index in allSelectObject.partBrand"
                                :key="index"></el-option>
                    </iSelect>
                </el-form-item>
                <!--属性-->
                <el-form-item :label="$t('EKL_PFJ_SX')">
                    <iSelect multiple filterable :placeholder="$t('LK_QINGXUANZE')" v-model="form.partProperty">
                        <!--<el-option value="" :label="$t('all')"></el-option>-->
                        <el-option
                                :value="item.key"
                                :label="$i18n.locale === 'zh'  ? item.value : item.enValue"
                                v-for="item,index in allSelectObject.allStatus"
                                :key="index"></el-option>
                    </iSelect>
                </el-form-item>


            </el-row>


            <!--二行-->
            <el-row>
                <!--科室-->
                <el-form-item :label="$t('EKL_KESHI')">
                    <iSelect multiple filterable :placeholder="$t('LK_QINGXUANZE')" v-model="form.dptKeCode">
                        <!--<el-option value="" :label="$t('all')"></el-option>-->
                        <el-option
                                :value="item.fullCode"
                                :label="item.fullCode"
                                v-for="item,index in allSelectObject.deptDTO"
                                :key="item.id"></el-option>
                    </iSelect>
                </el-form-item>

                <!--采购员-->
                <el-form-item :label="$t('EKL_YJGL_CGY')">
                    <iSelect multiple filterable :placeholder="$t('LK_QINGXUANZE')" v-model="form.linieId">
                        <!--<el-option value="" :label="$t('all')"></el-option>-->
                        <el-option
                                :value="item.id"
                                :label="$i18n.locale === 'zh'  ? item.nameZh : item.nameEn"
                                v-for="item,index in allSelectObject.keyLinieval"
                                :key="item.id"></el-option>
                    </iSelect>
                </el-form-item>
                <!--供应商-->
                <el-form-item :label="$t('EKL_YJGL_GYS')">
                    <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.supplierCode"></iInput>
                </el-form-item>
                <!--备注-->
                <el-form-item :label="$t('EKL_PFJ_BZ')">
                    <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.memo"></iInput>
                </el-form-item>

            </el-row>
        </el-form>
    </iSearch>
</template>

<script>
  import {iSearch, iInput, iSelect, icon, iDatePicker} from 'rise';
  import {getRequest} from './data'
  import {querySpareAllDropdown} from '@/api/achievement';

  export default {
    components: {
      iSearch,
      iInput,
      iSelect,
      icon,
      iDatePicker,
    },
    data() {
      return {
        form: {
          partNum: '',    // 零件号
          partName: '',    // 零件名称
          spMaterialGroup: [],    // 材料组
          partBrand: [],   // 品牌
          partProperty: [],// 属性
          dptKeCode: [],   // 科室 dptKeCode
          linieId: [],    // 采购员
          supplierCode: '',// 供应商
          memo: '',         // 备注
        },
        allSelectObject: {
          allStatus: [], // 属性
          categoryLinieVoList: [], // 材料组
          deptDTO: [],     // 科室
          keyLinieval: [], // 采购员
          partBrand: [],        // 品牌
        },
      };
    },
    created() {
      let obj = getRequest()
      this.getSelectData(obj.id)
    },
    watch: {
      form: {
        handler: function (newval, oldVal) {
          this.$emit('getForm', this.form)
        },
        deep: true   // 深度监听，监听到更深层级值的变化
      },
    },
    methods: {
      // 批量件搜索条件
      getSelectData(id) {
        querySpareAllDropdown({spBasedetailId: id, spTrack: true}).then(res => {
          if (res.result) {
            let data = res.data
            data = this.removeEmptyField(data)
            data.categoryLinieVoList = data.categoryLinieVoList.filter(item => item)
            this.allSelectObject = data
            let {allStatus, brand} = data
            let $allStatus = []
            for (let i in allStatus) {
              let o = {'key': i, 'value': allStatus[i], enValue: i == 1 ? 'spare' : 'enclosure'};
              $allStatus.push(o);
            }
            this.allSelectObject.allStatus = $allStatus
            this.allSelectObject.partBrand = brand
            localStorage.setItem('allSelectObject', JSON.stringify(this.allSelectObject))
          }
        })
      },
      // 字母排序
      sortArr(nameArr) {
        nameArr.sort((a1, b1) => {
          let a = a1.substring(0, 1).toLowerCase();
          let b = b1.substring(0, 1).toLowerCase();
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        })
        return nameArr
      },
      // 去除空对象
      removeEmptyField(obj) {
        var newObj = {}
        if (typeof obj === 'string') {
          obj = JSON.parse(obj)
        }
        if (obj instanceof Array) {
          newObj = []
        }
        if (obj instanceof Object) {
          for (var attr in obj) {
            // 属性值不为'',null,undefined才加入新对象里面(去掉'',null,undefined)
            if (obj.hasOwnProperty(attr) && obj[attr] !== '' && obj[attr] !== null && obj[attr] !== undefined) {
              if (obj[attr] instanceof Object) {
                // 空数组或空对象不加入新对象(去掉[],{})
                if (JSON.stringify(obj[attr]) === '{}' || JSON.stringify(obj[attr]) === '[]') {
                  continue
                }
                // 属性值为对象,则递归执行去除方法
                obj[attr] = obj[attr]
                newObj[attr] = this.removeEmptyField(obj[attr])
              } else if (
                typeof obj[attr] === 'string' &&
                ((obj[attr].indexOf('{') > -1 && obj[attr].indexOf('}') > -1) ||
                  (obj[attr].indexOf('[') > -1 && obj[attr].indexOf(']') > -1))
              ) {
                // 属性值为JSON时
                try {
                  var attrObj = JSON.parse(obj[attr])
                  if (attrObj instanceof Object) {
                    newObj[attr] = this.removeEmptyField(attrObj)
                  }
                } catch (e) {
                  newObj[attr] = obj[attr]
                }
              } else {
                newObj[attr] = obj[attr]
              }
            }
          }
        }
        return newObj
      },
      handleSearchReset() {
        this.form = {
          partNum: '',    // 零件号
          partName: '',    // 零件名称
          spMaterialGroup: [],    // 材料组
          partBrand: [],   // 品牌
          partProperty: [],// 属性
          dptKeCode: [],   // 科室
          linieId: [],    // 采购员
          supplierCode: '',// 供应商
          memo: '',         // 备注
        }
        this.getTableList();
      },
      getTableList() {
        const form = this.form;
        this.$emit('getTableList', form);
      },
    },
  };
</script>

<style scoped lang="scss">
    ::v-deep .cardBody {
        /*padding: 20px 40px !important;*/
    }
</style>
