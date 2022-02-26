<!--
 * @Author: youyuan
 * @Date: 2021-09-15 16:40:44
 * @LastEditTime: 2022-02-24 10:47:54
 * @LastEditors: Please set LastEditors
 * @Description: add
 * @FilePath: \重庆软维科技\front-portal\src\views\mtz\annualBudgetEdit\otherOverview\components\addDialog.vue
-->
<template>
  <div>
    <iDialog :title="language('XINZENG','新增')"
             :visible.sync="value"
             width="50%"
             @close='closeDiolog'>
      <el-form :inline="true"
               ref="addOther"
               :model="form"
               :rules="rules"
               label-position="top"
               class="demo-form-inline">
        <el-row>
          <el-col :span="8">
            <el-form-item :label="language('CAIGOUYUAN', '采购员')">
              <iSelect :value="form.linieName"
                       :placeholder="language('QINGXUANZE','请选择')"
                       :remote-method="(query) => remoteGetLinieList(query)"
                       :loading="linieLoading"
                       @change="changeLinie($event)"
                       filterable
                       remote
                       value-key="linieId">
                <el-option :value="{linieId: null, linieName: null, departId: null, departName: null}"
                           :label="language('KONG', '空')"></el-option>
                <el-option v-for="(item, index) in linieList"
                           :key="index"
                           :value="{linieId: item.linieId, linieName: item.linieName, departId: item.departId, departName: item.departName, departNameEn: item.departNameEn}"
                           :label="item.linieName"></el-option>
              </iSelect>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="language('CAILIAOZHONGLEI', '材料中类')"
                          prop="materialMinorName">
              <iSelect :value="form.materialMinorName"
                       filterable
                       remote
                       :placeholder="language('QINGXUANZE','请选择')"
                       :remote-method="remoteGetMaterialMinorList"
                       :loading="materialLoading"
                       @focus="() => remoteGetMaterialMinorList(null)"
                       @change="changeMaterial($event)">
                <el-option v-for="(item, index) in materialList"
                           :key="index"
                           :value="item.materialCategoryCode"
                           :label="item.materialNameZh"></el-option>
              </iSelect>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="language('YUSUANJINE', '预算金额')"
                          prop="budget">
              <iInput v-float.expression="2"
                      v-model="form.budget"
                      :placeholder="language('QINGSHURU','请输入')"></iInput>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="language('MTZCAILIAOZU', 'MTZ材料组')"
                          prop="mtzCategoryName">
              <iSelect :value="form.mtzCategoryName"
                       filterable
                       remote
                       :placeholder="language('QINGXUANZE','请选择')"
                       :remote-method="remoteGetMtzCategory"
                       :loading="mtzCategoryLoading"
                       @change="changeMtzMaterial">
                <el-option v-for="(item, index) in mtzCategoryList"
                           :key="index"
                           :value="item.materialGroupCode"
                           :label="item.materialGroupNameZh"></el-option>
              </iSelect>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="language('KESHI', '科室')"
                          prop="sectionName">
              <!-- <iSelect v-if="form.linieId && form.linieName"
                       :value="form.sectionName"
                       @change="changeDept($event, form)">
                <el-option :value="form.sectionCode"
                           :label="form.sectionName"></el-option>
              </iSelect> -->
               <!-- v-else -->
              <iSelect
                       :value="form.sectionName"
                       filterable
                       remote
                       :placeholder="language('QINGXUANZE','请选择')"
                       :remote-method="remoteGetSection"
                       :loading="sectionLoading"
                       @focus="() => remoteGetSection(null)"
                       @change="changeDept">
                <el-option v-for="(item, index) in sectionList"
                           :key="index"
                           :value="item.departId"
                           :label="item.departNameEn"></el-option>
              </iSelect>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="language('PINGPAI', '品牌')"
                          prop="brandCode">
              <iSelect :value="form.brandCode"
                       filterable
                       remote
                       :placeholder="language('QINGXUANZE','请选择')"
                       :remote-method="remoteGetBrand"
                       :loading="brandLoading"
                       @focus="() => remoteGetBrand(null)"
                       @change="changeBrand">
                <el-option v-for="(item, index) in brandList"
                           :key="index"
                           :value="item.brandCode"
                           :label="item.brandName"></el-option>
              </iSelect>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="language('BEIZHU', '备注')">
              <iInput class="remarkIpt"
                      type="textarea"
                      v-model="form.mark"
                      :placeholder="language('QINGSHURU','请输入')"></iInput>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <iButton @click="handleSubmit">确 定</iButton>
      </div>
    </iDialog>
  </div>
</template>

<script>
import { iDialog, iButton, iSelect, iInput, iMessage } from 'rise'
import { fetchRemoteBrand, fetchRemoteMaterialMedium, fetchRemoteMtzMaterial, fetchRemoteUser, fetchRemoteDept, getDeptSection,queryDeptSectionNew } from '@/api/mtz/annualGeneralBudget/annualBudgetEdit'
import { debounce } from '@/views/mtz/debounce.js'
import { getDeptData } from '@/api/kpiChart/index'
export default {
  components: {
    iDialog,
    iButton,
    iSelect,
    iInput
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      form: {
        budget: 0
      },
      linieLoading: false,
      linieList: [],
      materialLoading: false,
      materialList: [],
      mtzCategoryLoading: false,
      mtzCategoryList: [],
      sectionLoading: false,
      sectionList: [],
      brandLoading: false,
      brandList: [],
      rules: {
        materialMinorName: [
          { required: true, message: '材料中类不能为空', trigger: 'change' }
        ],
        budget: [
          { required: true, message: '预算金额不能为空', trigger: 'change' },
        ],
        mtzCategoryName: [
          { required: true, message: 'MTZ材料组不能为空', trigger: 'change' },
        ],
        sectionName: [
          { required: true, message: '科室不能为空', trigger: 'change' },
        ],
        brandCode: [
          { required: true, message: '品牌不能为空', trigger: 'change' },
        ],
      }
    }
  },
  created () {

  },
  methods: {
    // 关闭弹窗 
    closeDiolog () {
      this.$emit('handleCloseDialog')
    },
    // 远程搜索采购员数据
    remoteGetLinieList (query) {
      this.linieLoading = true
      const params = {
        departId: this.form.sectionCode || '',
        keyWord: query
      }
      debounce(fetchRemoteUser(params).then(res => {
        this.linieLoading = false
        this.linieList = res.data
      }))
    },
    // 改变选中采购员数据
    changeLinie ({ linieId, linieName, departId, departName, departNameEn }) {
      this.form = {
        ...this.form,
        linieId,
        linieName,
      };
      if (linieId) {
        getDeptSection(linieId).then(res => {
          if (!res.result) {
            this.sectionList = [];
            this.form.sectionCode = "";
            this.form.sectionName = "";
            return false
          }
          if (res.data.length > 0) {
            this.sectionList = res.data;
            this.form.sectionCode = res.data[0].departId;
            this.form.sectionName = res.data[0].departNameEn
          } else {
            this.sectionList = [];
            this.form.sectionCode = "";
            this.form.sectionName = "";
          }
        })
      }else{
        this.sectionList = [];
        
        this.form.sectionCode = "";
        this.form.sectionName = "";
      }
    },
    // 远程搜索材料中类数据
    remoteGetMaterialMinorList (query) {
      this.materialLoading = true
      debounce(fetchRemoteMaterialMedium({ keyWord: query }).then(res => {
        this.materialLoading = false
        if (res && res.code == 200) {
          this.materialList = res.data
        } else iMessage.error(res.desZh)
      }))
    },
    // 选中材料中类改变
    changeMaterial (e) {
      const target = this.materialList.find(item => item.materialCategoryCode == e)
      this.form = {
        ...this.form,
        materialMinorCode: target.materialCategoryCode,
        materialMinorName: target.materialNameZh
      }
    },
    // 远程搜索MTZ材料组数据
    remoteGetMtzCategory (query) {
      this.mtzCategoryLoading = true
      debounce(fetchRemoteMtzMaterial({ keyWord: query }).then(res => {
        this.mtzCategoryLoading = false
        if (res && res.code == 200) {
          this.mtzCategoryList = res.data
        } else iMessage.error(res.desZh)
      }))
    },
    // 选中MTZ材料中类改变
    changeMtzMaterial (e) {
      const target = this.mtzCategoryList.find(item => item.materialGroupCode == e)
      this.form = {
        ...this.form,
        mtzCategoryCode: target.materialGroupCode,
        mtzCategoryName: target.materialGroupNameZh
      }
    },
    // 远程搜索科室数据
    remoteGetSection (query) {
      if(this.form.linieName && this.form.sectionCode && this.form.sectionName){
        return false;
      }
      this.sectionLoading = true
      debounce(queryDeptSectionNew({
        keyWord: query,
        keyWords:query,
      }).then(res => {
        this.sectionLoading = false
        if (res && res.code == 200) {
          this.sectionList = res.data
        } else iMessage.error(res.desZh)
      }))
    },
    // 选中科室改变
    changeDept (e) {
      const target = this.sectionList.find(item => item.departId == e)
      this.form = {
        ...this.form,
        sectionCode: target.departId,
        sectionName: target.departNameEn
      }

      // if(){

      // }
    },
    // 远程搜索品牌数据
    remoteGetBrand (query) {
      debounce(fetchRemoteBrand({ keyWord: query }).then(res => {
        this.brandLoading = true
        if (res && res.code == 200) {
          this.brandLoading = false
          this.brandList = res.data
        } else iMessage.error(res.desZh)
      }))
    },
    // 改变品牌
    changeBrand (e) {
      const target = this.brandList.find(item => item.brandCode == e)
      this.form = {
        ...this.form,
        brandCode: target.brandCode,
        brandName: target.brandName
      }
    },
    // 点击确定提交
    handleSubmit () {
      this.$refs['addOther'].validate((valid) => {
        if (valid) {
          this.$emit('handleSubmitAdd', this.form)
        } else return false
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.el-form--inline .el-form-item {
  width: 80% !important;
}
v-deep .el-form--inline.el-form--label-top .el-form-item__content {
  width: 100%;
}
.remarkIpt {
  width: 116%;
}
</style>
