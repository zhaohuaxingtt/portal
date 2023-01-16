<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-06 12:45:45
 * @LastEditors: YoHo && 917955345@qq.com
 * @Descripttion: your project
-->
<template>
  <el-table
    v-el-table-loadmore="loadmore"
    :highlightCurrentRow="true"
    :data="loadTableData"
    v-loading="tableLoading"
    :height="height"
    :max-height="maxHeight"
    @current-change="handleCurrentChange"
  >
    <template v-for="item in tableTitle">
      <el-table-column
        v-if="item.props == 'partNum'"
        :key="item.props"
        :prop="item.props"
        :label="$t(item.key)"
        align="center"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.partNum }}</p>
          <p>{{ scope.row.partNameCn }}</p>
        </template>
      </el-table-column>
      <el-table-column
        v-else
        :key="item.props"
        :prop="item.props"
        :label="$t(item.key)"
        align="center"
      ></el-table-column>
    </template>
  </el-table>
</template>

<script>
import { chunk } from "lodash";
export default {
  props: {
    tableLoading: Boolean,
    tableTitle: Array,
    tableData: Array,
    height: [Number, String],
    maxHeight: [Number, String],
  },
  data() {
    // 这里存放数据
    return {
      loadTableData: [],
      pageSize: "20", // 每次下拉到底后新增数据量
      page: 0, // 初始显示第一页数据
    }
  },
  directives: {
    'el-table-loadmore': {
      bind(el, binding) {
        const SELECTWRAP_DOM = el.querySelector('.el-table__body-wrapper')
        SELECTWRAP_DOM.addEventListener('scroll', function () {
          // 加20提前触发数据加载,避免1px误差
          if (this.scrollHeight - this.scrollTop <= this.clientHeight + 20) {
            binding.value()
          }
        })
      }
    }
  },
  computed: {
    // 对筛选数据进行分页
    pageData() {
      return chunk(this.tableData, this.pageSize)
    }
  },
  // 监控data中的数据变化
  watch: {
    tableData: {
      handler(){
        this.init()
      },
      deep:true,
      immediate:true
    }
  },
  methods: {
    loadmore() {
      if (this.page < this.pageData.length) {
        this.page++
        this.$nextTick(() => {
          this.load()
        })
      }
    },
    load() {
      // 如果新一页还有数据的话，拼接当前数据和新一页数据
      if (this.pageData[this.page])
        this.loadTableData = [...this.loadTableData, ...this.pageData[this.page]]
    },
    init() {
      this.$nextTick(() => {
        this.loadTableData = []
        this.page = 0
        this.load()
      })
    },
    handleCurrentChange(row) {
      this.$emit('handleCurrentChange', row)
    }
  },
  mounted() {
    this.init()
  }
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
.title {
  font-size: 1.125rem;
  font-weight: bold;
}
::v-deep .el-table__body tr.current-row > td {
  background: #77cbff;
}
::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #77cbff;
}
</style>
