
<template>
  <iCard :title="$t('SPR_FRM_XGYSPJ_FXXH')">
    <div class="height cursor" @click="handleAnalysis">
      <icon class="resultsAnalysis" name="iconfengxianxinhao" symbol ></icon>
    </div>
  </iCard>
</template>

<script>
import { iCard, icon } from 'rise';
import img from '@/assets/images/financial.svg'
export default {
  components: { iCard, icon },
  methods: {
    handleAnalysis() {
      this.$emit('show',true)
    }
  },
}
</script>

<style>

</style>