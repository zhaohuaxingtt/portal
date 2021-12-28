<template>
  <div class="area-cascader">
    <el-cascader
      :key="elementKey"
      id="areaCascader"
      v-model="areaCodes"
      :props="areaProps"
      separator="-"
      filterable
      ref="areaCascader"
      :disabled="disabled"
      @change="handleChange"
    />
  </div>
</template>

<script>
import { getCityInfo } from '@/api/dictionary'
export default {
  name: 'areaSelect',
  props: {
    countryCode: {
      type: String,
      default: ''
    },
    provinceCode: {
      type: String,
      default: ''
    },
    cityCode: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    elementKey() {
      if (this.areaCodes.length > 0) {
        return this.areaCodes[0]
      }
      return 'default'
    }
  },
  watch: {
    countryCode() {
      this.setAreaCodes()
    },
    provinceCode() {
      if (this.countryCode === 'CN') {
        this.setAreaCodes()
      }
    },
    cityCode() {
      if (this.countryCode === 'CN') {
        this.setAreaCodes()
      }
    }
  },
  created() {
    if (this.countryCode) {
      this.setAreaCodes()
    }
  },
  data() {
    return {
      areaProps: {
        lazy: true,
        value: 'val',
        label: 'cityNameCn',
        lazyLoad(node, resolve) {
          const params = {
            parentCityId: -1
          }
          if (node.data) {
            params.parentCityId = node.data.cityId
          }

          getCityInfo(params)
            .then((res) => {
              const data = res?.data || []
              const valueData = data.map((e) => {
                return {
                  ...e,
                  leaf:
                    e.parentCityId === '-1' && e.sapLocationCode !== 'CN'
                      ? true
                      : node.level === 2,
                  val: node.level === 2 ? e.cityId : e.sapLocationCode
                }
              })

              resolve(valueData)
            })
            .catch(() => {
              resolve(null)
            })
        }
      },
      areaCodes: []
    }
  },
  methods: {
    setAreaCodes() {
      if (this.countryCode === 'CN') {
        this.areaCodes = [this.countryCode, this.provinceCode, this.cityCode]
      } else {
        this.areaCodes = [this.countryCode]
      }
    },
    handleChange(val) {
      console.log('handleChange', val)
      // 国外的
      if (val && val.length === 1 && val[0] !== 'CN') {
        this.$emit('update:countryCode', val[0])
        this.$emit('update:provinceCode', '')
        this.$emit('update:cityCode', '')
        setTimeout(() => {
          if (this.$refs.areaCascader) {
            const text = this.$refs.areaCascader.inputValue
            if (text) {
              this.$emit('change', val, text.split('-'))
            }
          }
        }, 500)
      } else if (val && val.length === 3) {
        // 中国
        this.$emit('update:countryCode', val[0])
        this.$emit('update:provinceCode', val[1])
        this.$emit('update:cityCode', val[2])
        setTimeout(() => {
          if (this.$refs.areaCascader) {
            const text = this.$refs.areaCascader.inputValue
            if (text) {
              this.$emit('change', val, text.split('-'))
            }
          }
        }, 500)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
