<template>
  <iPage class="template">
    <pageHeader class="margin-bottom20">
      {{ formData.name || '消息查看' }}
    </pageHeader>
    <iCard>
      <msgHistory @query-success="querySuccess" />
    </iCard>
  </iPage>
</template>

<script>
import { iPage, iCard } from 'rise'
import { msgHistory } from './components'
import pageHeader from '@/components/pageHeader'
export default {
  name: 'createInfo',
  components: { iPage, iCard, msgHistory, pageHeader },
  data() {
    return {
      formData: {}
    }
  },
  methods: {
    querySuccess(val) {
      this.formData = val
    }
  }
}
</script>

<style lang="scss" scoped></style>
