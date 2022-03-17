<template>
  <div
    :model="ruleForm"
    ref="ruleForm"
    :hideRequiredAsterisk="true"
    class="form-box"
    :style="{
      height: isParap
        ? '4.375rem'
        : bodyHeight.length > 0
        ? '6.5625rem'
        : '38.5rem'
    }"
    @dragover="$event.preventDefault()"
    @drop="handleonDrop"
  >
    <img
      :src="surveyMouse"
      style="width: 1rem; margin-right: 0.5rem"
      v-show="!isParap"
    />
    {{ isParap ? '' : $t('QN_DIANJITIXINGHUO') }}
    <img :src="surveyOption" style="width: 1rem; margin: 0 0.5rem" />
    {{ $t('QN_BATIXINGSHURUCIQUYU') }}
  </div>
</template>

<script>
import surveyMouse from '@/assets/images/survey/survey-mouse.svg'
import surveyOption from '@/assets/images/survey/survey-option.svg'
import { iMessage } from 'rise'
export default {
  // name: "Basic",
  components: {},
  props: ['bodyHeight', 'isParap'],
  data() {
    return {
      surveyMouse,
      surveyOption
    }
  },
  methods: {
    handleonDrop(e) {
      if (this.isParap && Number(e.dataTransfer.getData('type')) === 9) {
        iMessage.warn(this.$t('QN_DUANLUOTIBUKEYIZAITIANJIADUANLUOTI'))
        return
      }
      this.$emit('drop', e)
    }
  }
}
</script>
<style scoped lang="scss">
.form-box {
  border: 2px #ddd solid;
  border-radius: 10px;
  padding: 25px;
  margin-bottom: 20px;
  height: 9.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
