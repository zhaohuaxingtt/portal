<template>
  <iDialog :title="language('新增标签')" style="margin-top:20vh" :visible.sync="show" v-if="show" width="30%" @close='closeDiologBtn' append-to-body>
    <el-form label-position="left" :model="newLabelForm" :rules="newLabeRules" ref="newLabelForm" label-width="100px" class="validate-required-form">
      <iFormItem :label="language('标签内容')" prop='lableName'>
        <iInput v-model="newLabelForm.lableName" :placeholder="language('请输入')"></iInput>
      </iFormItem>
      <iFormItem :label="language('问题模块')" prop='moduleId'>
        <iSelect v-model="newLabelForm.moduleId" filterable :placeholder="language('请选择')">
          <el-option v-for="item in moduleList" :key="item.id" :label="`${item.parentName?item.parentName + '-':''}${item.menuName?item.menuName:''}`" :value="item.id"></el-option>
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
import { newLabel } from "@/api/assistant"

export default {
  name: 'dispatchDialog',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    type:{
      type: String,
      default: ''
    },
    moduleList:{
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      visible: false,
      newLabelForm: {
        lableName:'',
        moduleId:''
      },
      newLabeRules: {
        lableName:{required:'true',message:"请输入标签内容",trigger:'blur'},
        moduleId:{required:'true',message:"请选择内容模块",trigger:'change'},
      },
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
      this.$refs.newLabelForm.validate(async (valid) => {
        if (valid) {
            this.newLabelForm.source = this.type
            await newLabel(this.newLabelForm)
          this.$emit('refresh')
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
