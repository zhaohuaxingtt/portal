<template>
  <iPage class="template">
    <pageHeader class="margin-bottom20">
      {{ formData.name || '模板查看' }}
    </pageHeader>
    <iCard>
      <msgTemplate @query-success="querySuccess" />
    </iCard>
  </iPage>
</template>

<script>
import { iPage, iCard } from 'rise'
import { msgTemplate } from './components'
import pageHeader from '@/components/pageHeader'
export default {
  name: 'createInfo',
  components: { iPage, iCard, msgTemplate, pageHeader },
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
