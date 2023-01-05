<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-06 12:45:45
 * @LastEditors: YoHo && 917955345@qq.com
 * @Descripttion: your project
-->
<template>
  <iCard>
    <div class="flex-hor">
      <div class="flex-ver">
        <div class="title margin-bottom20">
          {{language('LINGJIAN','零件')}}
        </div>
        <img :src="part" alt="" width="50px">
      </div>
      <div class="flex-ver" style="width: 87%;">
        <!-- <tableList class="part" :highlightCurrentRow="true" :height="200" style="width: 100%;" :tableData="tableData" :tableTitle="tableTitle" :selection='false' :index="false" @handleCurrentChange="handleCurrentChange">
          <template #partNum="scope">
            <span>{{scope.row.partNum}}</span>
            <span>{{scope.row.partNameCn}}</span>
          </template>
        </tableList> -->
        <el-table :data="tableData" v-loading="tableLoading" max-height="250" class="part" @current-change="handleCurrentChange">
          <template v-for="item in tableTitle">
            <el-table-column v-if="item.props=='partNum'" :key="item.props" :prop="item.props" :label="$t(item.key)" align="center">
              <template slot-scope="scope">
                <p>{{scope.row.partNum}}</p>
                <p>{{scope.row.partNameCn}}</p>
              </template>
            </el-table-column>
            <el-table-column v-else :key="item.props" :prop="item.props" :label="$t(item.key)" align="center"></el-table-column>
          </template>
        </el-table>
      </div>
    </div>
  </iCard>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { iCard, icon } from "rise";
import tableList from '@/components/commonTable';
import { partTableTitle } from "./data.js";
import part from "@/assets/images/supplyChainOverall/part.png";
import { chunk } from "lodash";

export default {
  // import引入的组件需要注入到对象中才能使用
  components: { iCard, icon, tableList },
  props: {
    object: {
      type: Object,
      default: {}
    }
  },
  data() {
    // 这里存放数据
    return {
      part: part,
      initData:[],
      tableListData: [],
      tableTitle: partTableTitle,
      tableLoading: false,
      tableData:[],
      dataAll:[],
      pageSize:'20',
      page:0

    }
  },
  // 监听属性 类似于data概念
  computed: {
    // 对筛选数据进行分页
    pageData() {
      return chunk(this.dataAll, this.pageSize);
    },
  },
  // 监控data中的数据变化
  watch: {
    object: {
      handler(data) {
        // this.tableListData = data.partList
        this.init()
      }
    }
  },
  // 方法集合
  methods: {
    handleCurrentChange(row) {
      row && this.$parent.$parent.$children[2].handleCurrentChange(row, 'part')
    },
    
    load() {
      // 如果新一页还有数据的话，拼接当前数据和新一页数据
      if (this.pageData[this.page])
        this.tableData = [...this.tableData, ...this.pageData[this.page]];
    },
    // 数据筛选，筛选后查询第一页的数据
    filterData() {
      this.dataAll = this.initData
      this.$nextTick(() => {
        this.tableData = [];
        this.page = 0;
        this.load();
      });
    },
    init(){
      
        let initData = JSON.parse(JSON.stringify(this.object.partList||[]));
        this.initData = initData;
        this.$nextTick(() => {
          this.filterData("");
        });
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // 挂载完成后添加滚动事件
        let stop = false; // 鼠标滚动过快会同时触发两个方法
        const menu = document.querySelector(
          `.part .el-table__body-wrapper`
        );
        menu.addEventListener("mousewheel", (e) => {
          if (e.wheelDeltaY < 0)
            if (
              menu.scrollTop + menu.clientHeight >
              menu.scrollHeight - menu.clientHeight / 2
            ) {
              // 向下滚动的话，触发新数据加载，向上不触发
              // 快要到底时就触发新的数据加载menu.clientHeight/2
              if (this.page < this.pageData.length) {
                stop = true;
                this.page++;
                this.$nextTick(() => {
                  this.load();
                  stop = false;
                });
              }
            }
        });
        menu.addEventListener("scroll", (e) => {
          if (menu.scrollTop + menu.clientHeight == menu.scrollHeight) {
            if (this.page < this.pageData.length && !stop) {
              this.page++;
              stop = true;
              this.$nextTick(() => {
                this.load();
                stop = false;
              });
            }
          }
        });
  },
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