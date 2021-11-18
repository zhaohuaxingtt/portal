<template>
  <iDialog title="转派" style="margin-top:20vh" :visible.sync="show" v-if="show" width="22%" @close='closeDiologBtn' append-to-body>
    <div>内容区域</div>
    <div class="reset_style">
      <iButton @click="close">{{language('确认')}}</iButton>
      <iButton @click="save">{{language('取消')}}</iButton>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iButton } from 'rise'
export default {
  name: 'notifyDialog',
  components: { iDialog, iButton },
  props: {
    detail: {
      type: Object,
      default: function () {
        return {
          title: '',
          content: '',
          picUrl: '',
          linkUrl: ''
        }
      }
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    closeDiologBtn () {
      this.show = false;
    },
    close () {
      this.closeDiologBtn();
      this.callback('cancel')
    },
    save () {
      this.closeDiologBtn();
      this.callback('confirm')
    }
  }
}
</script>

<style lang="scss" scoped>
.reset_style {
  margin-top: 50px;
  padding-bottom: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
