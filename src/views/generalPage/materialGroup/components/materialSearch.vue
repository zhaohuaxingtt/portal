<template>
  <i-search @reset="handleSearchReset" @sure="getTableList" :icon="true">
    <el-form>
      <el-form-item :label="$t('SUPPLIER_KESHI')">
        <iSelect v-permission="SUPPLIER_MATERIALGROUP_DEPT" :placeholder="$t('LK_QINGXUANZE')" v-model="form.linieGroup">
          <el-option :value='item.nameZh' :label="item.nameZh" v-for="(item,index) in fromGroup.deptList" :key="index"></el-option>
        </iSelect>
      </el-form-item>
      <el-form-item :label="$t('SUPPLIER_CAILIAOZUMINGCHENG')">
        <iInput v-permission="SUPPLIER_MATERIALGROUP_STUFFGATEGORYCATEGORYNAME" :placeholder="$t('LK_QINGSHURU')" v-model="form.categoryName"></iInput>
      </el-form-item>
      <el-form-item :label="$t('SUPPLIER_CAILIAOZUBIANHAO')">
        <iInput v-permission="SUPPLIER_MATERIALGROUP_STUFFGATEGORYCATEGORYCODE" :placeholder="$t('LK_QINGSHURU')" v-model="form.categoryCode"></iInput>
      </el-form-item>
      <el-form-item :label="$t('SUPPLIER_SHOUKONGZHUANGTAI')">
        <iSelect v-permission="SUPPLIER_MATERIALGROUP_CONTROLLEDSTATE" :placeholder="$t('LK_QINGSHURU')" v-model="form.controlledState">
          <el-option :value='item.name' :label="item.name" v-for="(item,index) in fromGroup.controlListData" :key="index"></el-option>
        </iSelect>
      </el-form-item>
    </el-form>
  </i-search>
</template>

<script>
import { iSearch, iInput, iSelect } from 'rise'
import { getDictByCode } from "../../../../api/dictionary/index";
import { getDeptList } from "../../../../api/supplier360/material";


export default {
  components: {
    iSearch,
    iInput,
    iSelect
  },
  data() {
    return {
      form: {
        linieGroup: '',
        categoryName: '',
        categoryCode: '',
        controlledState: ''
      },
      fromGroup: {
        controlListData: [],
        deptList: []
      }
    }
  },
  created() {
    this.getControl()
  },
  methods: {
    async getControl() {
      const dept = await getDeptList()
      this.fromGroup.deptList = dept.data
      const res = await getDictByCode('STU_CONTROLLED_STATE')
      this.fromGroup.controlListData = res.data[0].subDictResultVo
      this.fromGroup.controlListData.map((item) => {
        if (item.name === '可询价不可报价') {
          return item.controlledState = 1
        } else if (item.name === '可询价不可定点') {
          return item.controlledState = 2
        }
      })
    },
    handleSearchReset() {
      this.form = {
        linieGroup: '',
        categoryName: '',
        categoryCode: '',
        controlledState: ''
      },
        this.getTableList()
    },
    getTableList() {
      this.$emit('getTableList', this.form)
    }
  }
}
</script>

<style scoped>
</style>