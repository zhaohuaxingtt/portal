<!--
* @author:zbin
* @Date: 2021-4-13 16:57:20
* @Description: 基础信息
 -->
<template>
  <div class="home">
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{$t('SUPPLIER_XINGONGYINGSHANGPINGJI')}}</span>
      <div class="floatright">
        <i-button>{{ $t('LK_ZHUANPAI') }}</i-button>
      </div>
    </div>
    <iCard tabCard
           collapse
           :title="$t('SUPPLIER_GONGYINGSHANGXINXI')">
      <template slot="header-control">
        <iButton @click="onJump360">{{ $t('SPR_FRM_XGYSPJ_CKGYSXX') }}</iButton>
      </template>
      <iFormGroup row="3">
        <iFormItem v-for="(item,index) in supplierMessageTitle"
                   :key="index">
          <iLabel :label="$t(item.name) "
                  :required="item.required"
                  :icons="item.icons"
                  :tip="$t(item.tip)"
                  slot="label"
                  v-permission="item.permission"></iLabel>
          <iText v-permission="item.permission">{{ baseMsg[item.key] }}</iText>
        </iFormItem>
      </iFormGroup>
    </iCard>
  </div>
</template>

<script>
import { iCard, iButton, iFormGroup, iFormItem, iText, iLabel } from "rise";
import { supplierMessageTitle } from "./data"

export default {
  components: {
    iCard, iButton, iFormGroup, iFormItem, iLabel, iText
  },
  data () {
    return {
      supplierMessageTitle,
    }
  },
  computed: {
    baseMsg () {
      return this.$store.state.baseInfo.baseMsg
    }
  },
  methods: {
    onJump360 () {

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
