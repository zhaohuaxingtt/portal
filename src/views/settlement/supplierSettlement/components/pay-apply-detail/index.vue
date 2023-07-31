<template>
  <iPage>
    <template>
      <detailTop right lev="2" :pageMenu="detailPage" show :query="$route.query" :partInfo="infosData" isShowIlog credentials:true>
        <span slot="left" class="floatleft font20 font-weight"> {{ language('ZHIFUSHENQINGHAO', '支付申请号') }}: {{ $route.query.code }} </span>
      </detailTop>
    </template>
    <pay-apply-info />
  </iPage>
</template>
<script>
import { iPage } from 'rise';
import detailTop from '../pay-apply-detail/components/topComponents';
import { detailPage } from './components/data';
import PayApplyInfo from './components/pay-info';
export default {
  components: { iPage, detailTop, PayApplyInfo },
  data() {
    return {
      detailPage: detailPage,
      showMenu: true,
      showDiolog: {
        show: false
      }
    };
  }
};
</script>
<style lang="scss" scoped>
.topComponents {
  position: relative;
  height: 40px;
}
</style>
