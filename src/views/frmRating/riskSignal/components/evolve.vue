<!--
 * @Author: zbin
 * @Date: 2021-05-21 11:00:01
 * @Descripttion: your project
-->
<template>
  <iCard :title="$t('SPR_FRM_FXXH_JZ')+':'" tabCard>
    <iInput :disabled='disabled' v-model="remark" type="textarea" rows="4"></iInput>
  </iCard>
</template>

<script>
import { iCard, iInput } from 'rise'

export default {
  components: {
    iCard,
    iInput,
  },
  props: {
    tableListData: {
      type: Array, default: () => {
        return []
      }
    },
    disabled: { type: Boolean, default: false }
  },
  watch: {
    tableListData(data) {
      this.remark = data.progress
    }
  },
  data() {
    return {
      remark: '',
    }
  },
  methods: {
    evolveBack() {
      return this.remark
    }
  }
}
</script>

<style scoped>
</style>