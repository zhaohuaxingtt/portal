<template>
  <div class="card">
    <div
      class="flex justify-between items-center tlt"
      :class="{ color: color }"
    >
      <span v-text="title"></span>
      <slot name="head-right"></slot>
    </div>
    <div class="card-content">
      <template v-if="slots['content']">
        <slot name="content"></slot>
      </template>
      <template v-else>
        <p
          class="flex card-content-item ellipsis"
          :class="{ color: color, active: active == l.id }"
          :title="l[nameKey]"
          v-for="l in list"
          :key="l.id"
          @click="
            active = l.id
            $emit('row-click', l)
          "
        >
          <span class="flex-1 ellipsis mr20">{{ l[nameKey] }}</span>
          <slot name="item-right" :data="l"></slot>
        </p>
        <p class="no-data" v-if="list.length == 0">
          {{ language('暂无数据') }}
        </p>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      //标题
      type: String,
      default: 'title'
    },
    list: {
      type: Array,
      default: () => []
    },
    nameKey: {
      //名称的字段key
      type: String,
      default: 'name'
    },
    color: {
      //是否显示标题和行背景色
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      active: ''
    }
  },
  computed: {
    slots() {
      return this.$slots
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../comon';
.card {
  min-height: 300px;
  display: flex;
  margin-bottom: 20px;
  flex-direction: column;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0px 0px 6px rgba(27, 29, 33, 0.2);
  border-radius: 10px;
  .card-content {
    flex: 1;

    .card-content-item {
      padding: 15px 25px;
      color: #777;
      cursor: pointer;
      transition: all 0.2s ease;
      &:hover {
        background-color: rgb(226, 234, 254) !important;
        color: #67C23A;
      }
      &.active {
        background-color: rgb(226, 234, 254) !important;
        color: #67C23A;
      }

      &.color:nth-child(odd) {
        background-color: #f7faff;
      }
      &.color:nth-child(even) {
        background-color: #fff;
      }
    }
  }
  .tlt {
    padding: 15px 25px;
    font-size: 18px;
    font-weight: bold;
    border-bottom: 1px solid #bbc4d6;

    &.color {
      background-color: #e8effe;
      border: none;
    }
  }
}
</style>
