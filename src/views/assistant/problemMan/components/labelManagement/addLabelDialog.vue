<template>
  <iDialog title="新增标签" style="margin-top:20vh" :visible.sync="show" v-if="show" width="30%" @close='closeDiologBtn' append-to-body>
    <el-form label-position="left" :model="newLabelForm" :rules="newLabeRules" ref="newLabelForm">
      <iFormItem :label="$t('标签内容')">
        <iInput v-model="newLabelForm.code" placeholder="请输入"></iInput>
      </iFormItem>
      <iFormItem :label="$t('问题模块')">
        <iSelect v-model="newLabelForm.type" filterable placeholder="请选择">
          <el-option v-for="item in options" :key="item.code" :label="item.value" :value="item.code"></el-option>
        </iSelect>
      </iFormItem>
    </el-form>
    <div class="reset_style">
      <iButton @click="save">{{language('确认')}}</iButton>
      <iButton @click="close">{{language('取消')}}</iButton>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iSelect, iFormItem, iInput } from 'rise'
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
      options: [],
      newLabelForm: {},
      newLabeRules: {},
    }
  },
  methods: {
    closeDiologBtn () {
      this.show = false;
    },
    close () {
      this.closeDiologBtn();
    },
    save () {
      this.$refs.newLabelForm.validate((valid) => {
        if (valid) {
          this.closeDiologBtn();
        } else {
          console.log('validate false')
        }
      })
    }
  },
  components: {
    iDialog,
    iButton,
    iSelect,
    iFormItem,
    iInput,
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
