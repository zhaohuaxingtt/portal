<template>
  <i-search @reset="handleSearchReset" @sure="getTableList" :icon="true">
    <template v-if="$route.query.subSupplierType == 'GP'">
      <el-form>
        <el-form-item :label="$t('SUPPLIER_BIANGENGZIDUAN')" v-permission="SUPPLIER_CHANGEHISTORY_ALTERFIELD_GP">
          <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form.fieldCode">
            <el-option value="" :label="$t('all')"></el-option>
            <el-option :value="item.fieldCode" :label="item.fieldName" v-for="item of fieldList"
                      :key="item.fieldCode"></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="$t('SUPPLIER_BIANGENGNEIRONG')" v-permission="SUPPLIER_CHANGEHISTORY_ALTERCONTENT_GP">
          <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.value"></iInput>
        </el-form-item>
      </el-form>
    </template>
    <template v-else>
      <el-form>
        <el-form-item :label="$t('SUPPLIER_BIANGENGZIDUAN')" v-permission="SUPPLIER_CHANGEHISTORY_ALTERFIELD">
          <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form.fieldCode">
            <el-option value="" :label="$t('all')"></el-option>
            <el-option :value="item.fieldCode" :label="item.fieldName" v-for="item of fieldList"
                      :key="item.fieldCode"></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="$t('SUPPLIER_BIANGENGNEIRONG')" v-permission="SUPPLIER_CHANGEHISTORY_ALTERCONTENT">
          <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.value"></iInput>
        </el-form-item>
        <!--      <el-form-item label="SVW号">
                <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.c"></iInput>
              </el-form-item>
              <el-form-item label="临时号">
                <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.d"></iInput>
              </el-form-item>-->
      </el-form>
    </template>
  </i-search>
</template>

<script>
import {iSearch, iInput, iSelect} from 'rise'
import {getSupplierEditFieldList} from "../../../../api/supplier360/systemModificationHistory";

export default {
  components: {
    iSearch,
    iInput,
    iSelect
  },
  data() {
    return {
      form: {
        fieldCode: '',
        value: ''
      },
      fieldList: []
    }
  },
  created() {
    this.getSupplierEditFieldList()
  },
  methods: {
    handleSearchReset() {
      this.form = {}
      this.getTableList()
    },
    getTableList() {
      this.$emit('getTableList', this.form)
    },
    async getSupplierEditFieldList() {
      const res = await getSupplierEditFieldList()
      this.fieldList = res.data
    }
  }
}
</script>

<style scoped>

</style>