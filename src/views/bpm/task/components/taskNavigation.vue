<template>
  <div class="task-navigation-div">
    <div @click="gotoPreTask" class="task-nav-icon el-icon-arrow-up"></div>
    <div @click="gotoNextTask" class="task-nav-icon el-icon-arrow-down"></div>
    <div @click="clickShowMoreTask" class="task-nav-icon el-icon-s-fold"></div>
    <todoTaskListInfo v-if='showMoreTask' />
  </div>
</template>
<script>
  import todoTaskListInfo from './todoTaskListInfo'
  export default {
    name: "taskNavigation",
    components: { todoTaskListInfo },
    data() {
      return {
        showMoreTask: false
      }
    },
    methods: {
      gotoPreTask() {

      },
      gotoNextTask() {

      },
      clickShowMoreTask() {
        this.showMoreTask = !this.showMoreTask
      }
    }
  }
</script>
<style lang="scss" scoped>
.task-navigation-div {
  height: 60px;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.task-nav-icon {
  color: rgb(17, 91, 221);
}
.task-nav-icon:hover {
  cursor: pointer;
}
</style>
