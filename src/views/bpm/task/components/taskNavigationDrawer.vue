<template>
  <div class="mail">
    <i-drawer
      class="messageDrawer1"
      :visible.sync="visible"
      v-loading="loading"
      wrapper-closable
      modal
    >
      <todoTaskListInfo />
    </i-drawer>
  </div>
</template>

<script>
  import { iDrawer } from 'rise'
  import todoTaskListInfo from './todoTaskListInfo'

  export default {
    name: "taskNavigationDrawer",
    components: { iDrawer, todoTaskListInfo },
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      visible(val) {
      }
    },
    mounted() {
    },
    beforeDestroy() {
    },
    data() {
      return {
        show: false,
        loading: false,
      }
    },
    methods: {
      close(val) {
        this.show = val
      },
      handleListCallback() {}
    }
  }
</script>

<style lang="scss">
  .messageDrawer1 {
    margin-top: 60px;
    .el-tabs__active-bar {
      width: 50% !important;
    }
    .el-tabs__item {
      font-weight: bold;
      height: 50px;
      line-height: 50px;
      i {
        font-weight: bold;
      }
      &:nth-child(2) {
        padding-right: 0;
      }
      &:last-child {
        padding-left: 0;
      }
    }
  }
</style>
