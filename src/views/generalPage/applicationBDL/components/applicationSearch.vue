<template>
  <div>
    <div class="font18 font-weight margin-bottom10">附件材料组不需要选择Linie科室和Linie</div>
    <el-form>
      <el-form-item label="VW LINIE科室">
        <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form.a">
        </iSelect>
      </el-form-item>
      <el-form-item label="VW LINIE采购员">
        <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.b"></iInput>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { iInput, iSelect} from 'rise'

export default {
  components: {
    iInput,
    iSelect
  },
  data() {
    return {
      form: {
        a: '',
        b: ''
      }
    }
  },
  methods: {
    handleSearchReset() {
      this.form = {}
      this.getTableList()
    },
    getTableList() {
      this.$emit('getTableList', this.form)
    }
  }
}
</script>

<style scoped>

</style>