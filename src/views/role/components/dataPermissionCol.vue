<!--
 * @Author: your name
 * @Date: 2021-08-10 14:34:00
 * @LastEditTime: 2021-08-12 11:05:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\role\components\dataPermissionCol.vue
-->
<template>
  <el-form
    ref="searchForm"
    class="search-form"
    label-position="left"
    label-width="180px"
    label-suffix=":"
    size="mini"
  >
    <iFormItem :label="$t('设置以下属性不可见')">
      <iSelect v-model="form.unCols" multiple :disabled="!editable">
        <el-option
          v-for="item in data"
          :key="item.name"
          :label="item.description"
          :value="item.name"
        />
      </iSelect>
    </iFormItem>
  </el-form>
</template>

<script>
import { iFormItem, iSelect } from 'rise'
export default {
  name: 'dataPermissionCol',
  components: { iFormItem, iSelect },
  props: {
    editable: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    form: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.search-form {
  ::v-deep .el-input.is-disabled .el-input__inner {
    border: none;
    background: $color-background;
    box-shadow: none;
    color: #4b4b4c;
  }
}
/* .tag {
  height: 30px;
  background: $color-background;
  border-radius: 15px;
  padding: 0px 15px;
  line-height: 30px;
  margin-right: 10px;
  color: #4b4b4c;
  display: inline-block;
  font-size: 14px;
} */
</style>
