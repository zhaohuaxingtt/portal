<template>
  <div class="flex flex-row content">
    <div class="left-content">
      <el-row :gutter="20">
        <el-col span="14">
          <iInput placeholder="搜索.."/>
        </el-col>
        <el-col span="10">
          <iSelect
            v-model="query.type"
            filterable
            placeholder="问题模块"
          >
            <el-option
              v-for="item in options"
              :key="item.code"
              :label="item.value"
              :value="item.code"
            ></el-option>
          </iSelect>
        </el-col>
      </el-row>
      <el-row class="mt20 mb20" :gutter="10">
        <el-col span="16">
          <ul class="flex flex-row justify-between category-list">
            <li v-for="item of catgoryList" :key="item.value" :class="{
              active: currentCategoryItem === item.value,
            }" @click="changeCategoryItem(item)">{{item.label}}</li>
          </ul>
        </el-col>
        <el-col span="8">
          <el-switch
            v-model="value1"
            active-text="仅看自己">
          </el-switch>
        </el-col>
      </el-row>
      <el-card class="card mb20" v-for="item of categoryCardList" :key="item.id">
        <div class="flex flex-row justify-between">
          <div class="title">{{item.title}}</div>
          <div class="status">
            <template v-if="item.status === 0"><span style="color: #E30D0D;font-weight: bold;">未处理</span></template>
            <template v-else-if="item.status === 1">已处理</template>
          </div>
        </div>
        <div class="flex flex-row justify-between mt20 mb20 gray-color">
          <div>提问人:{{item.name1}}</div>
          <div>管理员:{{item.name2}}</div>
        </div>
        <div class="flex flex-row justify-between items-center gray-color">
          <div class="label">{{item.label}}</div>
          <div>{{item.time}}</div>
        </div>
      </el-card>
    </div>
    <div class="right-content ml20">右侧</div>
  </div>
</template>

<script>
import { iInput, iSelect } from 'rise';
export default {
  props: {
    type: {
      type: Number,
      default: 1,
    }
  },
  data() {
    return {
      options: [],
      query: {
        type: '',
      },
      value1: '',
      currentCategoryItem: 0,
      catgoryList: [
        {
          label: '未处理',
          value: 0,
        },
        {
          label: '已处理',
          value: 1,
        },
        {
          label: '已完成',
          value: 2,
        },
        {
          label: '全部',
          value: 3,
        },
      ],
      categoryCardList: [
        {
          id:0,
          status: 0,
          title: '如何配置',
          name1: '张三',
          name2: '李四',
          label: '主数据管理',
          time: '2021-10-28 10:20:20'
        },
        {
          id:2,
          status: 1,
          title: '如何配置',
          name1: '张三',
          name2: '李四',
          label: '主数据管理',
          time: '2021-10-28 10:20:20'
        }
      ],
    }
  },
  mounted() {
    console.log(this.type,'???');
  },
  methods: {
    changeCategoryItem(item) {
      this.currentCategoryItem = item.value;
    },
  },
  components: {
    iInput,
    iSelect
  }
}
</script>

<style lang="scss" scoped>
@import '../../comon.scss';
.content {
  width: 100%;
  height: 94%;
  .left-content{
    width: 35%;
    min-height: 100%;
    background: #FFFFFF;
    box-shadow: 0px 0px 10px rgba(27, 29, 33, 0.08);
    opacity: 1;
    border-radius: 5px;
    padding: 15px 20px 0px 20px;
    overflow-y: auto;
    ::v-deep .el-switch__core{
      width:40px!important;
    }
    .category-list {
      position: relative;
      padding-left: 10px;
      &::before {
        position: absolute;
        left: 0;
        bottom: 4px;
        content: '';
        display: block;
        width: 3px;
        height: 15px;
        background: #1763F7;
        border-radius: 5px;
      }
      li {
        cursor: pointer;
      }
      .active {
        color:#1763F7;
      }
    }
    .card {
      .gray-color {
        color:#666666;
      }
      .label{
        background:#EDEDED;
        border-radius: 10px;
        color:#4B5C7D;
        padding: 5px 10px;
      } 
    }
  }
  .right-content{
    width: 100%;
    height: 100%;
    background: #FFFFFF;
    box-shadow: 0px 0px 10px rgba(27, 29, 33, 0.08);
    opacity: 1;
    border-radius: 5px;
    padding: 30px 40px 20px 40px;
  }
}
</style>
