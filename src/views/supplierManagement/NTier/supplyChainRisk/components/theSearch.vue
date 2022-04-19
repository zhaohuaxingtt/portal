<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-02 20:01:05
 * @LastEditors: Please set LastEditors
 * @Descripttion: your project
-->
<template>
  <div class='flex-between-center-center'>
    <el-row style="width:80%" type="flex" align='bottom' :gutter="15">
      <el-col :span="6">
        <iInput :placeholder="language('GONGYINGSHANGBIANHAO','供应商编号')" v-model="form.sapCodes[0]"></iInput>
        <!-- <iSelectCustom :placeholder="language('GONGYINGSHANGBIANHAO','供应商编号')" :data="formGoup.provinceList" label="cityNameCn" value="cityId" v-model="form.province" :multiple="true" :popoverClass="'popover-class'" /> -->
      </el-col>
      <!-- 材料组 -->
      <el-col :span="6">
        <iInput :placeholder="language('GONGYINGSHANGMINGCHENGQUANCHENG','供应商名称（全称）')" v-model="form.supplierNameList[0]"></iInput>
        <!-- <iSelectCustom :placeholder="language('GONGYINGSHANGMINGCHENGQUANCHENG','供应商名称（全称）')" :data="formGoup.materialGroupList" label="categoryName" value="categoryCode" v-model="form.categoryCode" :multiple="true" :popoverClass="'popover-class'" /> -->
      </el-col>
      <el-col v-if="eventDetail.createType===language('ZIDONGCHUANGJIAN','自动创建')" :span="6">
        <iSelect :placeholder="language('SOUYINGXIANGCHENGDU','受影响程度')" v-model="form.impactLevelList[0]">
          <el-option v-for="(item,index) in formGoup.impactLevelList" :key="index" :label="item.name" :value="item.code">
          </el-option>
        </iSelect>
      </el-col>
      <el-col :span="6">
        <iSelect collapse-tags multiple :placeholder="language('FANKUIZHUANGTAI1','反馈状态')" v-model="form.feedbackStatusList">
          <el-option v-for="(item,index) in formGoup.statusList" :key="index" :label="item.label" :value="item.value">
            <icon v-if="item.value==='黄'" name="iconbaojiapingfengenzong-jiedian-huang" symbol></icon>
            <icon v-if="item.value==='红'" name="iconbaojiapingfengenzong-jiedian-hong" symbol></icon>
            <icon v-if="item.value==='绿'" name="iconbaojiapingfengenzong-jiedian-lv" symbol></icon>
            <icon v-if="item.value==='灰'" name="iconbaojiapingfengenzong-jiedian-hui" symbol></icon>
            {{item.label}}
          </el-option>
        </iSelect>
      </el-col>
    </el-row>
    <div>
      <iButton @click="getMapList">{{language('QUEDING','确定')}}</iButton>
      <iButton @click="handleSearchReset">{{language('CHONGZHI','重置')}}</iButton>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { getCityInfo } from "@/api/supplierManagement/supplyChainOverall/index.js";
import { iSelect, iInput, iButton, iSelectCustom, icon } from 'rise'
import { dictByCode } from "./data";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { iSelect, iInput, iButton, iSelectCustom, icon },
  props: {
    eventDetail: { type: Object, default: {} }
  },
  data() {
    // 这里存放数据
    return {
      form: {
        supplierNameList: [],
        sapCodes: [],
        feedbackStatusList: [],
        impactLevelList: [],
      },
      formGoup: {
        materialGroupList: [],
        provinceList: [],
        statusList: [
          {
            value: this.language('HUANG', '黄'),
            label: '未收到反馈',
          },
          {
            value: this.language('HONG', '红'),
            label: '有供应风险',
          },
          {
            value: this.language('LV', '绿'),
            label: '无供应风险',
          },
          {
            value: this.language('HUISE', '灰'),
            label: '未发送反馈表',
          },
        ],
        impactLevelList: []
      },
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
  },
  // 方法集合
  methods: {
    handleFormMultiChange() { },
    handleMultiSearch() { },
    getMapList() {
      this.$parent.getTableList(this.form)
    },
    // 获取材料组数据||地区数据
    async dictByCode() {
      const res = await dictByCode('NTIER_AFFECTED_DEGREE')
      this.formGoup.impactLevelList = res
      const res1 = await getCityInfo()
      this.formGoup.provinceList = res1.data
    },
    // 返回
    handleBack() {
      this.$router.go(-1)
    },
    // 重置
    handleSearchReset() {
      this.form = {
        supplierNameList: [],
        sapCodes: [],
        feedbackStatusList: [],
        impactLevelList: [],
      }
      this.getMapList()
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.dictByCode()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
  },
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
::v-deep .custom-select-input > input {
  height: 2.1875rem;
  box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
  border-color: transparent;
}
</style>
