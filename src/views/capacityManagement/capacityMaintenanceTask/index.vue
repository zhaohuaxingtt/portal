<template>
  <div>
    <iSearch>
      <iFormGroup row="1" :model="form">
        <iFormItem v-for="item in searchForm" :key="item.prop" :label="language(item.key, item.label)">
          <i-input v-if="item.type=='input'" v-model="form[item.prop]"></i-input>
          <i-select v-if="item.type=='select'" v-model="form[item.prop]">
            <el-option v-if="item.showAll" :label="language('All','全部')" value=""></el-option>
            <el-option :key="index" v-for="(child,index) in selectOptions[item.optionName] || []" :label="$i18n.locale == 'zh' ? child.name : child.nameEn" :value="item.value"></el-option>
          </i-select>
        </iFormItem>
      </iFormGroup>
    </iSearch>
    <el-row class="margin-top20" :gutter="40">
      <el-col :span="9">
        <el-table></el-table>
      </el-col>
      <el-col :span="15">
        <el-table></el-table>
      </el-col>
    </el-row>
    capacityMaintenanceTask
  </div>
</template>

<script>
import { iSearch, iCard, iInput, iSelect, iFormGroup, iFormItem } from "rise";
import { searchForm } from "./data";
  export default {
    components:{
      iSearch, iCard, iInput, iSelect, iFormGroup, iFormItem
    },
    data() {
      return {
        searchForm,
        form:{},
        selectOptions:{}
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>