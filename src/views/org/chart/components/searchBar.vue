<template>
  <div class="search">
    <el-autocomplete
      class="search-autocomplete"
      v-model="searchText"
      :fetch-suggestions="querySearch"
      placeholder="组织/岗位/人员"
      :trigger-on-focus="false"
      style="width: 100%"
      clearable
      @select="handleSelect"
      @clear="handleClear"
    >
      <template slot="prefix">
        <icon symbol name="iconsousudingbu" />
      </template>
    </el-autocomplete>
  </div>
</template>

<script>
import { Icon } from 'rise'
export default {
  components: { Icon },
  props: {
    sources: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      searchText: ''
    }
  },
  watch: {
    searchText(val) {
      if (val.length === 0) {
        this.$emit('on-clear')
      }
    }
  },
  methods: {
    querySearch(queryString, cb) {
      const result = this.sources.filter(e => {
        return e.nameZh.toLowerCase().indexOf(queryString.toLowerCase()) > -1
      })
      cb(result)
    },
    handleSelect(item) {
      this.$emit('on-search', item)
    },
    handleClear() {
      this.$emit('on-clear')
    }
  }
}
</script>
<style lang="scss" scoped>
.search {
  position: relative;
  // margin-left: 20px;
  // margin-right: 20px;
  background-color: white;
  box-shadow: 0px 4px 10px rgba(129, 155, 181, 0.16);
  border-radius: 10px;
  height: 70px;
  padding: 0px 20px;
  margin-bottom: 20px;
  //使用Flex布局方式
  -webkit-display: flex; //Webkit内核的浏览器，必须加上-webkit前缀。
  display: flex; //任何一个容器都可以指定为Flex布局
  -webkit-align-items: center; //align-items属性定义项目在交叉轴上如何对齐。
  align-items: center; //align-items属性定义项目在交叉轴上如何对齐。
  -webkit-justify-content: center; //justify-content属性定义了项目在主轴上的对齐方式。
  justify-content: center; //justify-content属性定义了项目在主轴上的对齐方式。
  .inputposition {
    border: none;
    outline: none;
  }
}
.search-autocomplete {
  ::v-deep.el-input {
    .el-input__inner {
      border: none;
      outline: none;
    }
    .el-input__prefix {
      display: flex;
      align-items: center;
    }
  }
}
</style>
