<!--
 * @Author: 舒杰
 * @Date: 2021-04-27 21:49:43
 * @LastEditTime: 2022-01-27 16:53:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\generalPage\baseInfo\components\supplyStatus.vue
-->
<template>
  <iCard tabCard
         collapse
         :title="$t('GONGHUOZHUANGTAI')"
         class="margin-top20">
    <iFormGroup row="3">
      <!-- 是否在供 -->
      <iFormItem v-permission="SUPPLIER_BASEINFO_SUPPLIERSTATUS_ISSUPPLY" v-if="$route.query.subSupplierType!=='GP'">
        <iLabel :label="$t('SHIFOUZAIGONG')"
                slot="label"></iLabel>
        <iText>{{dicName('TURE_FALSE',supplierData[infoVo].isSupply)}}</iText>
      </iFormItem>
      <iFormItem v-permission="SUPPLIER_BASEINFO_SUPPLIERSTATUS_ISSUPPLY_GP" v-if="$route.query.subSupplierType=='GP'">
        <iLabel :label="$t('SHIFOUZAIGONG')"
                slot="label"></iLabel>
        <iText>{{dicName('TURE_FALSE',supplierData[infoVo].isSupply)}}</iText>
      </iFormItem>

      <!-- 供应商身份 -->
      <iFormItem v-permission="SUPPLIER_BASEINFO_SUPPLIERSTATUS_SUPPLIERSTATUS_GP" v-if="$route.query.subSupplierType=='GP'">
        <iLabel :label="$t('GYSSF')"
                slot="label"></iLabel>
        <iText>{{supplierData[infoVo].formalStatus}}</iText>
      </iFormItem>
      <iFormItem v-permission="SUPPLIER_BASEINFO_SUPPLIERSTATUS_SUPPLIERSTATUS" v-if="$route.query.subSupplierType!=='GP'">
        <iLabel :label="$t('GYSSF')"
                slot="label"></iLabel>
        <iText v-if='supplierData.supplierDTO.supplierType=="PP"'>{{supplierData[infoVo].formalStatus|formalStatus(that)}}</iText>
        <iText v-if='supplierData.supplierDTO.supplierType=="PD"'>{{language('ZHENGSHI', '正式')}}</iText>
      </iFormItem>
      <!-- 是否业内工厂 -->
      <iFormItem v-permission="SUPPLIER_BASEINFO_SUPPLIERSTATUS_ISFACTORY" v-if="$route.query.subSupplierType!=='GP'">
        <iLabel :label="$t('SHIFOUYELEIGONGCHANG')"
                slot="label"></iLabel>
        <iSelect v-model="supplierData.ppSupplierDTO.isFactory">
          <el-option :value="item.code=='1'?1:0"
                     :label="item.name"
                     v-for="(item, index) in fromGroup.TURE_FALSE"
                     :key="index"></el-option>
        </iSelect>
      </iFormItem>
      <!-- 是否隶属华域 -->
      <iFormItem v-permission="SUPPLIER_BASEINFO_SUPPLIERSTATUS_ISSUBJECTIONCHINA" v-if="$route.query.subSupplierType!=='GP'">
        <iLabel :label="$t('SHIFOULISHUHUOYU')"
                slot="label"></iLabel>
        <iSelect v-model="supplierData.ppSupplierDTO.isSubjectionchina">
          <el-option :value="item.code=='1'?1:0"
                     :label="item.name"
                     v-for="(item, index) in fromGroup.TURE_FALSE"
                     :key="index"></el-option>
        </iSelect>
      </iFormItem>
      <!-- 供货类型 -->
      <iFormItem v-permission="SUPPLIER_BASEINFO_SUPPLIERSTATUS_SUPPLYPROPERTIES" v-if="$route.query.subSupplierType!=='GP'">
        <iLabel :label="$t('GONGHUOLEIXING')"
                slot="label"></iLabel>
        <!-- <iText>{{dicName('TURE_FALSE',supplierData.ppSupplierDTO.supplyType)}}</iText> -->
        <iText>{{supplierData.ppSupplierDTO.supplyType}}</iText>
      </iFormItem>
      <!-- 是否共用供应商 -->
      <iFormItem v-permission="SUPPLIER_BASEINFO_SUPPLIERSTATUS_ISSHAREDSUPPLIER" v-if="$route.query.subSupplierType!=='GP'">
        <iLabel :label="$t('SHIFOUGONGONGGONGYINGSHANG')"
                slot="label"></iLabel>
        <iText>{{dicName('TURE_FALSE',supplierData[infoVo].isShareSupplier)}}</iText>
      </iFormItem>
      <iFormItem v-permission="SUPPLIER_BASEINFO_SUPPLIERSTATUS_ISSHAREDSUPPLIER_GP" v-if="$route.query.subSupplierType=='GP'">
        <iLabel :label="$t('SHIFOUGONGONGGONGYINGSHANG')"
                slot="label"></iLabel>
        <iText>{{dicName('TURE_FALSE',supplierData[infoVo].isShareSupplier)}}</iText>
      </iFormItem>
      <!-- 供货零件类型 -->
      <iFormItem v-permission="SUPPLIER_BASEINFO_SUPPLIERSTATUS_SUPPLYTYPE" v-if="$route.query.subSupplierType!=='GP'">
        <iLabel :label="$t('GONGHUOLINGJIANLEIXING')"
                slot="label"></iLabel>
        <iText>{{supplierData.ppSupplierDTO.supplyPartForm}}</iText>
      </iFormItem>
      <!-- 相关专业科室 -->
      <iFormItem v-model="supplierData.ppSupplierDTO.relevantDept" v-if="$route.query.subSupplierType!=='GP'">
        <iLabel :label="$t('XIANGGUANZHUANYEKESHI')"
                slot="label"></iLabel>
        <iText>{{supplierData.ppSupplierDTO.relevantDept}}</iText>
      </iFormItem>
      <!-- 定点行协议 -->
      <iFormItem v-if="$route.query.subSupplierType!=='GP'">
        <iLabel :label="$t('SUPPLIER_DDXXX')"
                slot="label"></iLabel>
        <iSelect v-model="supplierData.ppSupplierDTO.isSign">
          <el-option :value="item.code"
                     :label="item.code==='1'?'已签署':'未签署'"
                     v-for="(item, index) in fromGroup.TURE_FALSE"
                     :key="index"></el-option>
        </iSelect>
      </iFormItem>
    </iFormGroup>
  </iCard>
</template>

<script>
import { iCard, iFormGroup, iFormItem, iLabel, iSelect, iText } from "rise";
import { generalPageMixins } from '@/views/generalPage/commonFunMixins';
export default {
  mixins: [generalPageMixins],
  components: { iCard, iFormGroup, iFormItem, iLabel, iSelect, iText },
  props: {
    supplierData: {
      type: Object,
      default: () => { }
    },
    fromGroup: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      that: this,
      infoVo:"",
    }
  },
  filters: {
    formalStatus (val, that) {
      if (val === '1') {
        return that.language('ZHENGSHI', '正式')
      } else if (val === '0') {
        return that.language('LINSHI', '临时')
      } else {
        return that.language('CHUXUCHI', '储蓄池')
      }
    }
  },
  methods: {
    // 字典值回显
    dicName (key, value) {
      let name = ""
      if (this.fromGroup[key]) {
        this.fromGroup[key].filter(item => {
          if(value){
            if (item.code == value.toString()) {
              name = item.name
            }
          }
        })
        return name
      }
    }
  },
  created(){
    if(this.$route.query.subSupplierType == "GP"){
      this.infoVo = "gpSupplierDTO"
    }else if(this.$route.query.subSupplierType == "PP"){
      this.infoVo = "ppSupplierDTO"
    }
  },
  mounted () {
    console.log(this.supplierData, "data")
    // console.log(this.supplierData[infoVo])
  }
}
</script>

<style lang="scss" scoped>
</style>
