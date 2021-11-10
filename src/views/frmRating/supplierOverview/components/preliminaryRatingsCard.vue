<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-27 14:47:25
 * @LastEditors: zbin
 * @Descripttion: 初步评级
-->
<template>
  <iCard :title="$t('SUPPLIER_CHUBUPINGJI')">
    <div @click="handleTo" class="height">
      <icon class="resultsAnalysis" name="iconcaibaofenxi" symbol></icon>
    </div>
  </iCard>
</template>

<script>
import { iCard, icon } from 'rise';

export default {
  components: { iCard, icon },
  methods: {
    handleTo() {
      this.$router.push({ path: '/supplier/frmrating/preliminaryrating/preliminaryrating' })
    }
  }
}
</script>

<style>
</style>