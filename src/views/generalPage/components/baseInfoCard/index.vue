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
        <iButton @click="onJump360">{{ $t('FANHUIGONGYINSHANG360') }}</iButton>
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
          <iText v-else>{{ baseMsg.supplierDTO[item.key] }}</iText>
        </iFormItem>
      </iFormGroup>
    </iCard>
  </div>
</template>

<script>
import { iCard, iButton, iFormGroup, iFormItem, iText, iLabel, iInput } from "rise";
import { baseInfoTitle } from "./data"
import { cloneDeep } from "lodash"
import { generalPageMixins } from '@/views/generalPage/commonFunMixins';
export default {
  mixins: [generalPageMixins],
  components: {
    iCard, iButton, iFormGroup, iFormItem, iLabel, iText, iInput
  },
  data () {
    return {
      baseInfoTitle: cloneDeep(baseInfoTitle)
    }
  },
  computed: {
    baseMsg () {
      return this.$store.state.baseInfo.baseMsg
    }
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
      this.$router.go(-1)
      // this.$router.push({
      // 	path:"/supplier/supplierList"
      // })
    }
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
