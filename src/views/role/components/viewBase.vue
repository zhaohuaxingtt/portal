<template>
  <iCard class="view-base">
    <el-form
      ref="searchForm"
      class="search-form"
      label-position="left"
      label-width="100px"
      label-suffix=":"
    >
      <el-row :gutter="50">
        <el-col :span="8">
          <iFormItem :label="$t('角色ID')" style="width: 100%">
            <iInput placeholder="" v-model="form.id" disabled />
          </iFormItem>
        </el-col>
        <el-col :span="8">
          <iFormItem :label="language('角色代码')">
            <iInput placeholder="" v-model="form.code" :disabled="!editable" />
          </iFormItem>
        </el-col>
        <el-col :span="8">
          <iFormItem :label="language('角色名称')">
            <iInput
              placeholder=""
              v-model="form.fullNameZh"
              :disabled="!editable"
            />
          </iFormItem>
        </el-col>
        <el-col :span="16">
          <iFormItem :label="language('描述')">
            <iInput
              placeholder=""
              v-model="form.description"
              :disabled="!editable"
            />
          </iFormItem>
        </el-col>
        <el-col :span="8">
          <iFormItem :label="language('角色状态')">
            <iInput
              placeholder=""
              :value="form.status ? '有效' : '无效'"
              :disabled="!editable"
            />
          </iFormItem>
        </el-col>
      </el-row>
    </el-form>
  </iCard>
</template>

<script>
import { iCard, iInput, iFormItem } from 'rise'
export default {
  name: 'viewBase',
  components: { iCard, iInput, iFormItem },
  props: {
    editable: {
      type: Boolean,
      default: false
    },
    form: {
      id: '',
      code: '',
      fullNameZh: '',
      description: '',
      status: '',
      tagDTOList: []
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.view-base {
  min-height: calc(100vh - 170px);
}
.search-form {
  ::v-deep .el-input.is-disabled .el-input__inner {
    border: none;
    background: $color-background;
    box-shadow: none;
    color: #4b4b4c;
  }
}
.tag {
  height: 30px;
  background: $color-background;
  border-radius: 15px;
  padding: 0px 15px;
  line-height: 30px;
  margin-right: 10px;
  color: #4b4b4c;
  display: inline-block;
  font-size: 14px;
}
</style>
