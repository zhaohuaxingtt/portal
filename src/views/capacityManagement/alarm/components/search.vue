<template>
  <iSearch
    :icon="icon"
    class="margin-bottom20"
    @sure="sure"
    @reset="reset"
    :resetKey="CHAXUN"
    :searchKey="REST"
  >
    <el-form ref="form" :model="searchParams">
      <el-form-item
        v-for="(item, index) in searchList"
        :key="index"
        :label="item.key ? language(item.key, item.label) : item.label"
      >
        <iSelect
          clearable
          :multiple="item.multiple"
          collapse-tags
          v-update
          v-if="item.type === 'select'"
          v-model="searchParams[item.prop]"
          :placeholder="language('QINGXUANZE', '请选择')"
        >
          <el-option
            v-if="!item.multiple"
            value=""
            :label="language('ALL', '全部')"
          ></el-option>
          <el-option
            v-for="item_ in selectOptions[item.optionName] || []"
            :key="item_.value"
            :label="item_.label"
            :value="item_.value"
          >
          </el-option>
        </iSelect>
        <iDatePicker
          v-else-if="item.type === 'date'"
          type="daterange"
          v-model="searchParams[item.prop]"
          :placeholder="language('QINGXUANZE', '请选择')"
        ></iDatePicker>
        <iInput
          clearable
          v-else
          v-model="searchParams[item.prop]"
          :placeholder="language('QINGSHURU', '请输入')"
        ></iInput>
      </el-form-item>
    </el-form>
  </iSearch>
</template>

<script>
import { iSearch, iInput, iDatePicker, iSelect } from 'rise'
export default {
  components: {
    iSearch,
    iInput,
    iSelect,
    iDatePicker
  },
  props: {
    searchList: { type: Array, default: () => [] },
    selectOptions: { type: Array, default: () => ({}) },
    icon: { type: Boolean, default: true }
  },
  data() {
    return {
      searchParams: {}
    }
  },
  created() {
    this.searchList.map((item) => {
      if (item.multiple) {
        this.$set(this.searchParams, [item.prop], item.default || [])
      } else {
        this.$set(this.searchParams, [item.prop], item.default || '')
      }
    })
  },
  methods: {
    sure() {
      this.$emit('sure', this.searchParams)
    },
    reset() {
      // this.$refs.form.resetFields()
      this.searchList.map((item) => {
        if (item.multiple) {
          this.$set(this.searchParams, [item.prop], [])
        } else {
          this.$set(this.searchParams, [item.prop], '')
        }
      })
      this.$emit('reset', this.searchParams)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>