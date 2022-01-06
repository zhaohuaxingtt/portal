<template>
  <div class="top-content-item">
    <div class="title">{{ title }}</div>
    <div class="content">
      <el-checkbox
        v-for="item in data"
        :key="item.value"
        v-model="item.checked"
        class="checkbox"
      >
        {{ item.label }}
      </el-checkbox>
    </div>
  </div>
</template>

<script>
export default {
  name: 'topContentItem',
  props: {
    title: {
      type: String
    },
    data: {
      type: Array,
      default: function () {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.top-content-item {
  margin-bottom: 30px;
  .checkbox {
    margin-bottom: 10px;
  }
}
.title {
  font-size: 18px;
  font-weight: bold;
  padding: 30px 0px 20px 0px;
  border-top: solid 1px rgba(112, 112, 112, 0.15);
}
</style>
