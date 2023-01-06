<!--
 * @Author: YoHo
 * @Date: 2021-06-21 10:50:37
 * @LastEditTime: 2023-01-04 17:42:05
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: 
-->
<template>
  <el-select
    :popper-class="popperClass"
    v-model="value"
    @visible-change="visibleChange"
    @change="changeValue"
    multiple
    collapse-tags
    filterable
    :filter-method="filterData"
  >
    <el-option
      v-for="item in options"
      :value="item[propValue]"
      :key="item[propValue]"
      :label="item[propLabel]"
    ></el-option>
  </el-select>
</template>

<script>
import { chunk, debounce } from "lodash";
export default {
  props:{
    data:{
      type:Array,
      default:()=>[]
    },
    propLabel:String,
    propValue:String,
    popperClass:String,
  },
  watch:{
    data(val){
      this.init()
    }
  },
  data() {
    return {
      initData: [], // 接口返回的原始数据
      options: [], // 下拉框展示数据
      dataAll: [], // 通过筛选条件的数据
      value: "",
      pageSize: "20", // 每次下拉到底后新增数据量
      page: 0, // 初始显示第一页数据
    };
  },
  created() {
    this.init();
  },
  computed: {
    // 对筛选数据进行分页
    pageData() {
      return chunk(this.dataAll, this.pageSize);
    },
  },
  methods: {
    // changeValue
    changeValue(val){
      this.$emit('update:value',val)
    },
    load() {
      // 如果新一页还有数据的话，拼接当前数据和新一页数据
      if (this.pageData[this.page])
        this.options = [...this.options, ...this.pageData[this.page]];
    },
    // 数据筛选，筛选后查询第一页的数据
    filterData(input) {
      this.dataAll = this.initData.filter(
        (item) => item[this.propLabel].toLowerCase().indexOf(input.toLowerCase()) > -1
      );
      this.$nextTick(() => {
        this.options = [];
        this.page = 0;
        this.load();
      });
    },
    // 打开下拉框，添加
    visibleChange(boolean) {
      if (boolean) {
        let stop = false; // 鼠标滚动过快会同时触发两个方法
        const menu = document.querySelector(
          `.${this.popperClass} .el-select-dropdown__wrap`
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
      }else{
        this.filterData('')
      }
    },
    // 数据初始化
    init() {
        let initData = JSON.parse(JSON.stringify(this.data));
        // let arr = new Array(50000);
        // for (let i = 0; i < arr.length; i++) {
        //   initData.push({
        //     code: i,
        //     label: "label" + i,
        //     value: i,
        //   });
        // }
        this.initData = initData;
        this.$nextTick(() => {
          this.filterData("");
        });
    },
  },
};
</script>

<style lang="scss" scope>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background: #eee;
  justify-content: center;
  .login-card {
    width: 1200px;
  }
  :deep .el-card {
    border-radius: 10px;
    overflow: hidden;
    .el-card__body {
      padding: 0;
    }
  }
  .login-title {
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 15px;
  }
  .form-btn {
    display: flex;
    justify-content: space-between;
    .autologin {
      display: inline-block;
      width: 80px;
    }
  }
  .form-login {
    text-align: center;
  }
  .image {
    display: block;
  }
  .flex {
    height: 100%;
    padding: 20px;
    display: flex;
    flex-flow: column;
    align-content: flex-end;
    justify-content: center;
  }
}
</style>