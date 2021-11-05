<!--
 * @Author: youyuan
 * @Date: 2021-09-30 10:43:35
 * @LastEditTime: 2021-10-17 11:21:35
 * @LastEditors: Please set LastEditors
 * @Description: 下载模板
 * @FilePath: \重庆软维科技\front-portal\src\views\mtz\dataBase\marketPriceEnquiry\components\downloadDialog.vue
-->
<template>
  <div>
    <iDialog  :key="key" :visible.sync="value" :title="language('XIAZAIMUBAN', '下载模板')" width="35%" @close="handleClose">
      <div class="custom-select-wrapper">
        <el-form label-position="top"
                 ref="downTemplate"
                 :rules="rules"
                 :model="downTemplate">
          <el-row :gutter="30">
            <el-col :span="12">
              <el-form-item :label="language('CAILIAOZHONGLEI','材料中类')"
                            class="SearchOption"
                            prop="materialNos">
                <iSelect :placeholder="language('QINGXUANZE','请选择')"
                         v-model="downTemplate.materialNos"
                         multiple
                         collapse-tags
                         @change="changeMaterial">
                  <el-option v-for="(item,index) in getMtzCategoryDorpDown"
                             :key="index"
                             :label="item.code + ' - ' + item.message"
                             :value="item.code"></el-option>
                </iSelect>
                <!-- <iSelectCustom
                            v-model="downTemplate.materialNos"
                            :data="getMtzCategoryDorpDown"
                            label="message"
                            value="code"
                            multiple
                            :popoverClass="'popover-class'" 
                            :inputClass="'input-class'"
                          /> -->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="language('YUANCAILIAOPAIHAO','原材料牌号')"
                            class="SearchOption"
                            prop="materialCodes">
                <iSelect :placeholder="language('QINGXUANZE','请选择')"
                         v-model="downTemplate.materialCodes"
                         filterable
                         multiple
                         collapse-tags>
                  <el-option v-for="item in rawMaterialDropdown"
                             :key="item.id"
                             :label="item.code + ' - ' + item.message"
                             :value="item.code" />
                </iSelect>

              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="language('JIAGELEIXING','价格类型')"
                            class="SearchOption"
                            prop="marketTypes">
                <iSelect :placeholder="language('QINGXUANZE','请选择')"
                         v-model="downTemplate.marketTypes"
                         multiple
                         collapse-tags>
                  <el-option v-for="(x,index) in getMtzMarketTypeListDopDown"
                             :key="index"
                             :label="x.message"
                             :value="x.code"></el-option>
                </iSelect>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="language('SHENGXIAOQUJIAN','生效区间')"
                            class="SearchOption"
                            prop="daterange">
                <iDatePicker v-model="downTemplate.daterange"
                             type="monthrange"
                             @change="handleTime"
                             value-format="yyyy-MM"
                             range-separator="-" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="dialogOk">
          <iButton @click="handleDownloadTemplate">确认</iButton>
        </div>
      </div>
    </iDialog>
  </div>
</template>

<script>
import { iDialog, iSelect, iDatePicker, iButton } from 'rise'
import { getMtzMarketTypeList, getMtzCategory, rawMaterialList } from '@/api/mtz/database/marketPriceEnquiry'
export default {
  components: {
    iDialog,
    iSelect,
    iDatePicker,
    iButton,
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
  },
  data () {
    // const validateDateRange = (rule, value, callback) => {
    //   if(value && value.length == 0) {
    //     callback(new Error('生效区间不能为空'));
    //   } else {
    //     callback();
    //   }
    // }
    return {
      downTemplate:{
        materialNos: [],
        marketTypes: [],
        daterange: []
      },
      getMtzMarketTypeListDopDown:[],
      getMtzCategoryDorpDown:[],
      rawMaterialDropdown:[],
      rules: {
        materialNos: [
          { required: true, message: '材料中类不能为空', trigger: 'change' }
        ],
        marketTypes: [
          { required: true, message: '价格类型不能为空', trigger: 'change' }
        ],
        daterange: [
          { required: true, message: '生效区间不能为空', trigger: 'change' },
          // { validator: validateDateRange, trigger: 'change' }
        ]
      }
    }
  },
  created () {
    this.getMtzMarketTypeList()
    this.getMtzCategory()
    // this.rawMaterialList()
  },
  methods: {
    getMtzCategory () {
      getMtzCategory().then(res => {
        this.getMtzCategoryDorpDown = res.data
      })
    },
    rawMaterialList () {
      rawMaterialList({
        materialCategoryList: this.downTemplate.materialNos
      }).then(res => {
        this.rawMaterialDropdown = res.data
      })
    },
    getMtzMarketTypeList () {
      getMtzMarketTypeList().then(res => {
        if (res.result) {
          this.getMtzMarketTypeListDopDown = res.data
        }
      })
    },
    handleDownloadTemplate () {
      this.$refs['downTemplate'].validate((valid) => {
        if (valid) {
          this.downTemplate['periodStart'] = this.downTemplate.daterange[0]
          this.downTemplate['periodEnd'] = this.downTemplate.daterange[1]
          this.$emit('handleDownloadTemplate', this.downTemplate)
        } else return false
      })
    },
    handleClose () {
      this.$emit('handleClose')
    },
    changeMaterial (val) {
      if (val.length == 0) {
        this.rawMaterialDropdown = []
        return
      }
      this.rawMaterialList()
    }
  }
}
</script>

<style lang='scss' scoped>
// .custom-select-wrapper {
//   padding-top: 30px;
//   text-align: center;
//   display: flex;
//   justify-content: space-between;
// }
// v-deep .el-input__inner {
//   height: 36px;
// }
// .popover-class {
//   width: 500px;
//   height: 200px;
// }
// .input-class {
//   height: 36px;
// }
.dialogOk {
  display: flex;
  justify-content: flex-end;
  padding-bottom: 20px;
}
</style>
