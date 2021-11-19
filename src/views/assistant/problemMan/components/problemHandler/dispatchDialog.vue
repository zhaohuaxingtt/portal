<template>
  <iDialog title="转派" style="margin-top:20vh" :visible.sync="show" v-if="show" width="30%" @close='closeDiologBtn' append-to-body>
    <div class="flex flex-row justify-between">
      <div style="width:80px;">管理员</div>
      <iSelect v-model="query.type" filterable placeholder="请输入">
        <el-option v-for="item in options" :key="item.code" :label="item.value" :value="item.code"></el-option>
      </iSelect>
    </div>
    <div class="reset_style">
      <iButton @click="save">{{language('确认')}}</iButton>
      <iButton @click="close">{{language('取消')}}</iButton>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iButton,iSelect } from 'rise'
export default {
  name: 'dispatchDialog',
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
    iSelect,
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
