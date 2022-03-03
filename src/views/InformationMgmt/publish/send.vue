<template>
  <iPage>
    <pageHeader>{{language('消息发布')}}</pageHeader>
    <iCard class="margin-top20">
      <div class="margin-bottom20">
        <msgTemplate editable @change="templateChange" ref="msgTemplate" />
      </div>

      <div class="flex flex-end-center">
        <iButton @click="next">{{language('下一步')}}</iButton>
        <iButton @click="cleseWindow">{{language('退出')}}</iButton>
      </div>
    </iCard>
    <msgSend :visible.sync="visible" :template-info="templateInfo" />
  </iPage>
</template>

<script>
import pageHeader from '@/components/pageHeader'
import { msgTemplate, msgSend } from './components'
import { iPage, iCard, iButton } from 'rise'
export default {
  name: 'publishDetail',
  components: {
    iPage,
    iCard,
    msgTemplate,
    iButton,
    msgSend,
    pageHeader
  },
  data() {
    return {
      visible: false,
      templateInfo: {}
    }
  },
  methods: {
    next() {
      this.$refs.msgTemplate.$refs.createTemp.validate(valid => {
        if (valid) {
          this.visible = true
        }
      })
    },
    templateChange(val) {
      this.templateInfo = val
    },
    cleseWindow() {
      window.close()
    }
  }
}
</script>

<style lang="scss" scoped></style>
