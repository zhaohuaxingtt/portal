<template>
  <div class="margin-bottom20">
    <iSearch hidden-right>
      <el-form>
        <el-row :gutter="20">
          <el-col :span="4">
            <iFormItem :label="language('流程标题')" style="width: 100%">
              <iInput
                :placeholder="language('请输入')"
                v-model="form.modelName"
              />
            </iFormItem>
          </el-col>
          <el-col :span="8">
            <iFormItem :label="language('流程说明')" style="width: 100%">
              <iInput
                :placeholder="language('请输入')"
                v-model="form.description"
              />
            </iFormItem>
          </el-col>
          <el-col :span="4">
            <iFormItem :label="language('流程状态')" style="width: 100%">
              <iSelect :placeholder="language('请选择')" v-model="form.status">
                <el-option
                  v-for="(item, index) in templateFormStatus"
                  :key="index"
                  :value="item.value"
                  :label="item.label"
                />
              </iSelect>
            </iFormItem>
          </el-col>
          <!-- <el-col :span="8">
            <iFormItem
              :label="language('流程表单地址')"
              style="width:100%;"
            >
              <iInput
                :placeholder="language('请输入')"
                v-model="form.url"
              />
             <div @click="$emit('choose-form-url')">
              <iInput
                :placeholder="language('请选择')"
                v-model="form.url"
                suffix-icon="iconfont icontianjia"
                readonly
                @change="formChange"
              />
            </div>
            </iFormItem>
          </el-col> -->
        </el-row>
      </el-form>
    </iSearch>
  </div>
</template>

<script>
import { iInput, iSelect, iFormItem, iSearch } from 'rise'
import { templateFormStatus } from './data'
export default {
  name: 'baseForm',
  components: {
    iInput,
    iSelect,
    iFormItem,
    iSearch
  },
  props: {
    formInfo: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      form: {},
      templateFormStatus
    }
  },
  watch: {
    formInfo(val) {
      if (!_.isEqual(this.form, val)) {
        this.form = { ...val }
      }
    },
    form: {
      handler(newVal) {
        console.log('form handler', newVal)
        this.$emit('form-change', newVal)
      },
      deep: true //为true，表示深度监听，这时候就能监测到a值变化
    }
  },
  created() {
    this.form = { ...this.formInfo }
  }
}
</script>

<style lang="scss" scoped></style>
