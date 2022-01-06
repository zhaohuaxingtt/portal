<template>
  <iPage>
    <settingHeader :active.sync="tabActive" />
    <transition name="el-fade-in-linear">
      <task v-if="tabActive === 'task'" />
      <iAgree v-if="tabActive === 'iAgree'" />
    </transition>
  </iPage>
</template>

<script>
import { iPage } from 'rise'
import { settingHeader, task, iAgree } from './components'
export default {
  name: 'setting',
  components: { iPage, settingHeader, task, iAgree },
  data() {
    return {
      tabActive: 'task'
    }
  }
}
</script>

<style lang="scss" scoped></style>
