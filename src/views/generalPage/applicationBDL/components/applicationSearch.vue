<!--
 * @Author: your name
 * @Date: 2021-11-09 15:26:24
 * @LastEditTime: 2021-12-03 11:06:42
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-portal\src\views\generalPage\applicationBDL\components\applicationSearch.vue
-->
<template>
  <div>
    <div class="font18 font-weight margin-bottom10">附件材料组不需要选择Linie科室和Linie</div>
    <el-form>
      <el-form-item label="VW LINIE科室">
        <iSelect :placeholder="$t('LK_QINGXUANZE')"
                 v-model="form.a">
        </iSelect>
      </el-form-item>
      <el-form-item label="VW LINIE采购员">
        <iInput :placeholder="$t('LK_QINGSHURU')"
                v-model="form.b"></iInput>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { iInput, iSelect } from 'rise'

export default {
  components: {
    iInput,
    iSelect
  },
  data () {
    return {
      form: {
        a: '',
        b: ''
      }
    }
  },
  methods: {
    handleSearchReset () {
      this.form = {}
      this.getTableList()
    },
    getTableList () {
      this.$emit('getTableList', this.form)
    }
  }
}
</script>

<style scoped>
</style>