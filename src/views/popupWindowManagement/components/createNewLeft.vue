<template>
  <div>
      <el-form label-position="left" label-width="160px">
        <el-row :gutter="24">
          <el-col span="12">
            <iFormItem :label="language('弹窗标题')">
              <iInput ></iInput>
            </iFormItem>
          </el-col>
          <el-col span="12">
            <iFormItem :label="language('标题链接')">
              <iInput ></iInput>
            </iFormItem>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col span="12">
            <iFormItem :label="language('发布范围')">
              <iInput ></iInput>
            </iFormItem>
          </el-col>
          <el-col span="12">
            <iFormItem :label="language('历史查看有效期')">
              <iDatePicker class="effect-time"></iDatePicker>
            </iFormItem>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col span="24">
            <iFormItem :label="language('发布时间')">
              <iDatePicker class="release-time"></iDatePicker>
            </iFormItem>
          </el-col>
          
        </el-row>
        <el-row :gutter="24">
          <el-col>
            <iFormItem :label="language('弹窗说明')">
              <textarea class="popup-explain"></textarea>
            </iFormItem>
          </el-col>
          
        </el-row>
      </el-form>
  </div>
</template>

<script>
import {iFormItem,iDatePicker,iInput,iSelect} from 'rise'
export default {
    name:'newLeft',
    components:{iFormItem,iDatePicker,iInput,iSelect},
    data(){
      return{
      }
    }
}
</script>

<style lang="scss" scoped>
.popup-explain{
  width: 800px;
  height: 400px;
  resize: none;
}
.effect-time,
.release-time{
  width: 100%;
}
</style>