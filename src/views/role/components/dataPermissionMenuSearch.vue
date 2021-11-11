<template>
  <div class="data-permission-menu-search-bar">
    <icon symbol name="iconsousudingbu" />
    <el-autocomplete
      class="inline-input"
      clearable
      v-model="searchStr"
      :fetch-suggestions="querySearch"
      :placeholder="$t('search')"
      :trigger-on-focus="false"
      @select="handleSelect"
    ></el-autocomplete>
  </div>
</template>

<script>
import { Icon } from 'rise'
export default {
  name: 'dataPermissionMenuSearch',
  components: { Icon },
  props: {
    datasource: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      searchStr: '',
      options: []
    }
  },
  watch: {
    datasource(val) {
      this.options = this.generateDataList(val)
    }
  },
  created() {
    this.options = this.generateDataList(this.datasource)
  },
  methods: {
    generateDataList(data, res) {
      res = res || []
      if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          const item = data[i]
          const row = { value: item.name }
          for (const key in item) {
            if (Object.hasOwnProperty.call(item, key)) {
              const element = item[key]
              if (key !== 'menuList') {
                row[key] = element
              }
            }
          }
          res.push(row)
          if (item.menuList) {
            this.generateDataList(item.menuList, res)
          }
        }
      }
      return res
    },
    handleSelect(val) {
      this.$emit('handle-search', val)
    },
    querySearch(queryString, cb) {
      console.log('options', this.options)
      const result = this.options.filter(e =>
        e.name.toLowerCase().includes(queryString.toLowerCase())
      )
      cb(result)
    }
  }
}
</script>

<style lang="scss" scoped>
.data-permission-menu-search-bar {
  width: 100%;
  height: 50px;
  background: $color-background;
  display: flex;
  align-items: center;
  padding: 0px 30px;
  ::v-deep input,
  .el-input__inner {
    border: none;
    background: none;
    outline: none;
    flex-grow: 1;
    padding-left: 10px;
  }
  ::v-deep .el-autocomplete {
    width: 100%;
  }
  margin-bottom: 20px;
  border-radius: 10px;
}
</style>
