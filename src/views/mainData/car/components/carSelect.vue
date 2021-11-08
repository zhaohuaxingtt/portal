<!--
 * @Author: your name
 * @Date: 2021-08-10 14:33:59
 * @LastEditTime: 2021-08-13 09:45:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mainData\car\components\carSelect.vue
-->
<template>
  <div class="car-select">
    <iSelect
      v-model="dataValue"
      filterable
      remote
      reserve-keyword
      :placeholder="$t('输入关键词以搜索')"
      :remote-method="queryData"
      :loading="loading"
      :disabled="disabled"
      @change="handleChange"
    >
      <el-option
        v-for="item in options"
        :key="item.id"
        :label="item[valueKey]"
        :value="item[valueKey]"
      >
      </el-option>
    </iSelect>
  </div>
</template>

<script>
import { iSelect } from 'rise'
import { fetchCarList } from '@/api/mainData/car'
export default {
  name: 'carSelect',
  components: { iSelect },
  props: {
    value: {
      type: String,
      default: ''
    },
    valueKey: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dataValue: '',
      options: []
    }
  },
  created() {
    if (this.value !== this.dataValue) {
      this.dataValue = this.value
    }
  },
  watch: {
    value(val) {
      console.log('carSelect', val)
      if (this.dataValue !== val) {
        this.dataValue = val
      }
      if (val === '') {
        this.options = []
      }
    }
  },
  methods: {
    async queryData(queryString) {
      if (queryString) {
        this.loading = true
        const queryData = {
          current: 1,
          size: 20
        }
        queryData[this.valueKey] = queryString
        const { data } = await fetchCarList(queryData).finally(
          () => (this.loading = false)
        )
        this.options = data
      } else {
        this.options = []
      }
    },
    handleChange(val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="scss" scoped></style>
