<template>
  <div class="flex flex-row content">
    <div class="left-content">
      <el-row :gutter="20">
        <el-col span="14">
          <iInput placeholder="搜索.." />
        </el-col>
        <el-col span="10">
          <iSelect v-model="query.type" filterable placeholder="问题模块">
            <el-option v-for="item in options" :key="item.code" :label="item.value" :value="item.code"></el-option>
          </iSelect>
        </el-col>
      </el-row>
      <el-row class="mt20 mb20" :gutter="10">
        <el-col span="16">
          <ul class="flex flex-row justify-between category-list">
            <li v-for="item of catgoryList" :key="item.value" :class="{
                active: currentCategoryItem === item.value
              }" @click="changeCategoryItem(item)">
              {{ item.label }}
            </li>
          </ul>
        </el-col>
        <el-col span="8">
          <el-switch v-model="value1" active-text="仅看自己"> </el-switch>
        </el-col>
      </el-row>
      <el-card class="card mb20 cursor" v-for="item of categoryCardList" :key="item.id" @click.native="cardSelectHandler(item)" :shadow="cardSelectItem.id === item.id ? 'always':'never'">
        <div class="flex flex-row justify-between">
          <div class="title">{{ item.title }}</div>
          <div class="status">
            <template v-if="item.status === 'unreply'"><span style="color: #e30d0d; font-weight: bold">未处理</span></template>
            <template v-else-if="item.status === 'reply'">已处理</template>
            <template v-else-if="item.status === 'finished'">已完成</template>
          </div>
        </div>
        <div class="flex flex-row justify-between mt20 mb20 gray-color">
          <div>提问人:{{ item.name1 }}</div>
          <div>管理员:{{ item.name2 }}</div>
        </div>
        <div class="flex flex-row justify-between items-center gray-color">
          <div class="label">{{ item.label }}</div>
          <div>{{ item.time }}</div>
        </div>
      </el-card>
    </div>
    <div class="right-content ml20">
      <div class="flex flex-row justify-end">
        <template v-if="cardSelectItem.status === 'unreply'">
          <i-button>{{ language('答复') }}</i-button>
          <i-button>{{ language('指派') }}</i-button>
        </template>
        <template v-else-if="cardSelectItem.status === 'finished'">
          <i-button>{{ language('关闭问题') }}</i-button>
          <i-button>{{ language('归档') }}</i-button>
        </template>
      </div>
      <div class="flex flex-row justify-between border mt20 mb20"></div>
      <div class="content-title mb20">{{ language('消息') }}</div>
      <div class="content flex flex-row">
        <div class="name">张三</div>
        <div class="content-text">
          <p>
            一个材料组可关联多个工艺组，如果该工艺组为Heavy iTem，则引用此工艺组
            的材料组为Heavy Item
          </p>
          <p>2021-10-28 16:20:12</p>
        </div>
      </div>
      <div class="mt20 mb20">
        附件:
        <a href="javscript:void(0);" @click.prevent="downFileHandle" style="color: #2369f1"><i class="el-icon-link"></i>点击下载</a>
      </div>
    </div>
  </div>
</template>

<script>
import { iInput, iSelect, iButton } from 'rise'
export default {
  props: {
    type: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      options: [],
      query: {
        type: ''
      },
      value1: '',
      currentCategoryItem: 'unreply',
      cardSelectItem: {},
      catgoryList: [
        {
          label: '未处理',
          value: 'unreply'
        },
        {
          label: '已处理',
          value: 'reply'
        },
        {
          label: '已完成',
          value: 'finished'
        },
        {
          label: '全部',
          value: 'all'
        }
      ],
      categoryCardList: [
        {
          id: 0,
          status: 'unreply',
          title: '如何配置',
          name1: '张三',
          name2: '李四',
          label: '主数据管理',
          time: '2021-10-28 10:20:20'
        },
        {
          id: 2,
          status: 'finished',
          title: '如何配置',
          name1: '张三',
          name2: '李四',
          label: '主数据管理',
          time: '2021-10-28 10:20:20'
        }
      ]
    }
  },
  mounted () {
    console.log(this.type, '???')
    this.cardSelectHandler(this.categoryCardList[0])
  },
  methods: {
    changeCategoryItem (item) {
      this.currentCategoryItem = item.value
    },
    cardSelectHandler (item) {
      this.cardSelectItem = item
    },
    downFileHandle () {
      console.log('点击下载')
    }
  },
  components: {
    iInput,
    iSelect,
    iButton
  }
}
</script>

<style lang="scss" scoped>
@import '../../comon.scss';
.content {
  width: 100%;
  height: 94%;
  .left-content {
    width: 35%;
    min-height: 100%;
    background: #ffffff;
    box-shadow: 0px 0px 10px rgba(27, 29, 33, 0.08);
    opacity: 1;
    border-radius: 5px;
    padding: 15px 20px 0px 20px;
    overflow-y: auto;
    ::v-deep .el-switch__core {
      width: 40px !important;
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
        background: #1763f7;
        border-radius: 5px;
      }
      li {
        cursor: pointer;
      }
      .active {
        color: #1763f7;
      }
    }
    .card {
      .gray-color {
        color: #666666;
      }
      .label {
        background: #ededed;
        border-radius: 10px;
        color: #4b5c7d;
        padding: 5px 10px;
      }
    }
  }
  .right-content {
    width: 100%;
    height: 100%;
    background: #ffffff;
    box-shadow: 0px 0px 10px rgba(27, 29, 33, 0.08);
    opacity: 1;
    border-radius: 5px;
    padding: 30px 40px 20px 40px;
    .border {
      border-bottom: 1px solid #707070;
      border-top: 1px solid #707070;
      box-sizing: border-box;
      padding-bottom: 20px;
    }
    .content-title {
      font-weight: bold;
      color: #000000;
      opacity: 1;
      font-size: 18px;
      margin-bottom: 40px;
    }
    .content {
      border: 1px solid #f2f2f2;
      width: 100%;
      height: auto;
      padding: 30px;
      box-sizing: border-box;
      .name {
        width: 50px;
      }
      .content-text {
        background: #f8f8fa;
        margin-left: 30px;
        width: 700px;
        padding: 10px 30px 30px;
        box-sizing: border-box;
        &:nth-child(1) {
          color: #000;
        }
        &:nth-child(2) {
          color: #888888;
        }
      }
    }
  }
}
</style>
