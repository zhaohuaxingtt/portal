<template>
  <iDialog title="问题归档" style="margin-top:20vh" :visible.sync="show" v-if="show" width="50%" @close='closeDiologBtn' append-to-body>
    <div class="flex flex-row justify-between">
      问题归档
    </div>
    <div class="reset_style">
      <iButton @click="save">{{language('确认')}}</iButton>
      <iButton @click="close">{{language('取消')}}</iButton>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iButton } from 'rise'
export default {
  name: 'finishedDialog',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      visible: false,
      query: {
        type:'',
      },
      options: [],
    }
  },
  methods: {
    closeDiologBtn () {
      this.$emit('update:show', false)
    },
    close () {
      this.closeDiologBtn();
    },
    save () {
      this.closeDiologBtn();
    }
  },
  components: {
    iDialog, 
    iButton,
  }
}
</script>

<style lang="scss" scoped>
@import '../../../comon.scss';
.reset_style {
  margin-top: 50px;
  padding-bottom: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
