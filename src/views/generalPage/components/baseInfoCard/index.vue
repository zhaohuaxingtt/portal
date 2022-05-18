<!--
* @author:shujie
* @Date: 2021-4-13 16:57:20
* @Description: 基础信息
 -->
<template>
  <div class="home">
    <iCard tabCard
           collapse
           :title="$t('LK_JICHUXINXI')">
      <template slot="header-control">
        <iButton @click="onJump360" v-if="$route.path=='/view-suppliers'">{{ $t('FANHUI') }}</iButton>
        <iButton @click="onJump360" v-else>{{ $t('FANHUIGONGYINSHANG360') }}</iButton>
      </template>
      <iFormGroup row="3">
        <iFormItem v-for="(item,index) in baseInfoTitle"
                   :key="index"
                   v-permission="item.permission">
          <iLabel :label="$t(item.name) "
                  :required="item.required"
                  :icons="item.icons"
                  :tip="$t(item.tip)"
                  slot="label"></iLabel>
          <iText v-if="item.key=='svwTempCode' || item.key=='svwCode'">{{baseMsg[infoVo][item.key]}}</iText>
          <iInput v-else-if="item.key=='vmCode' && !item.disabled"
                  v-model="baseMsg[infoVo][item.key]"></iInput>
          <iText v-else-if="item.key=='supplierType'">{{ baseMsg.supplierDTO[item.key]=='GP'?'一般供应商':baseMsg.supplierDTO[item.key]=='PP'?'生产供应商':baseMsg.supplierDTO[item.key]=='PD'?'共用供应商':'' }}</iText>
          <iText v-else>{{ baseMsg.supplierDTO[item.key] }}</iText>
        </iFormItem>
      </iFormGroup>
    </iCard>
  </div>
</template>

<script>
import { iCard, iButton, iFormGroup, iFormItem, iText, iLabel, iInput } from "rise";
import { baseInfoTitle,baseInfoTitleGP } from "./data"
import { cloneDeep } from "lodash"
import { generalPageMixins } from '@/views/generalPage/commonFunMixins';
export default {
  mixins: [generalPageMixins],
  components: {
    iCard, iButton, iFormGroup, iFormItem, iLabel, iText, iInput
  },
  data () {
    return {
      baseInfoTitle:[]
    }
  },
  computed: {
    baseMsg () {
      console.log(this.$store.state.baseInfo.baseMsg)
      return this.$store.state.baseInfo.baseMsg
    },
  },
  created(){
    if(this.$route.query.subSupplierType == "PP"){
      this.baseInfoTitle = cloneDeep(baseInfoTitle)
    }else if(this.$route.query.subSupplierType == "GP"){
      this.baseInfoTitle = cloneDeep(baseInfoTitleGP)
    }else{
      this.baseInfoTitle = cloneDeep(baseInfoTitle)
    }

    console.log(this.$store.state.baseInfo);
  },
  methods: {
    changeTitle () {
      this.baseInfoTitle.forEach(item => {
        if (item.key == 'vmCode') {
          item.disabled = false
        }
      });
    },
    onJump360 () {
      if(this.$router.path!=="/supplier/view-suppliers"){
        this.$router.go(-1)
        return;
      }else{
        if(this.baseMsg.supplierDTO.supplierType == "GP"){
          this.$router.push({
            path: "/supplier/supplierListGP/detailsGP",
            query: {
              supplierType: this.baseMsg.supplierDTO.supplierType,
              subSupplierId: this.$route.query.supplierId,
              isShowAll: true
            }
          })
        }else{
          this.$router.push({
            path: "/supplier/supplierList/details",
            query: {
              supplierType: this.baseMsg.supplierDTO.supplierType,
              subSupplierId: this.$route.query.subSupplierId,
              isShowAll: true
            }
          })
        }
      }
    }
  },
  mounted () {
    console.log(this.baseMsg, "baseMsg")
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
