<template>
  <layoutCommon :menus="menus" />
</template>

<script>
import layoutCommon from '@/layout/common'
export default {
  components: { layoutCommon },
  data() {
    return {
      menus: [
        {
          value: 1,
          name: '模板管理',
          message: 0,
          url: '/msgTemplate',
          activePath: '/msgTemplate',
          key: '消息模板'
        },
        {
          value: 1,
          name: '发布历史',
          message: 0,
          url: '/publish/history',
          activePath: '/publish',
          key: '发布历史'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
