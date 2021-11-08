<template>
  <iPage>
    <iCard>
      <step />
    </iCard>
  </iPage>
</template>

<script>
import { iPage, iCard } from 'rise'
import Step from './components/step'
export default {
  components: { iPage, iCard, Step },
}
</script>

<style lang="scss" scoped></style>
