<template>
  <div class="task-navigation-div">
    <div class="task-navigation-div-icon" @click="gotoPreTask">
      <div class="task-nav-icon el-icon-arrow-up"></div>
    </div>
    <div class="task-navigation-div-icon" @click="gotoNextTask">
      <div class="task-nav-icon el-icon-arrow-down"></div>
    </div>
    <div @click="clickShowMoreTask" class="task-navigation-div-icon message">
      <el-badge :value="totalTaskNum" :hidden="!totalTaskNum" :max="99">
        <icon symbol class="icon" name="iconxiaoxi" />
      </el-badge>
      <taskNavigationDrawer @showMoreTaskNeedClose="handleShowMoreTaskNeedClose" @totalTaskNum="updateTotalTaskNum" ref="taskNavigationDrawer" :visible="showMoreTask" :isFinished="isFinished" :queryType="queryType" />
    </div>
  </div>
</template>
<script>
  import taskNavigationDrawer from './taskNavigationDrawer'
  import { icon } from 'rise'
  import { QUERY_DRAWER_TYPES } from '@/constants'
  export default {
    name: "taskNavigation",
    components: { taskNavigationDrawer, icon },
    props: {
      queryType: {
        type: Number,
        default: QUERY_DRAWER_TYPES.APPLY_TODO
      },
      isFinished: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        showMoreTask: false,
        totalTaskNum: 0,
      }
    },
    methods: {
      gotoPreTask() {
        this.$nextTick(() => {
          this.showMoreTask = false
          this.$refs.taskNavigationDrawer.gotoPreTask(this.$route.params.instanceId)
        })
      },
      gotoNextTask() {
        this.$nextTick(() => {
          this.showMoreTask = false
          this.$refs.taskNavigationDrawer.gotoNextTask(this.$route.params.instanceId)
        })
      },
      clickShowMoreTask() {
        this.showMoreTask = !this.showMoreTask
      },
      updateTotalTaskNum(totalTaskNum) {
        this.totalTaskNum = totalTaskNum
      },
      handleShowMoreTaskNeedClose() {
        this.showMoreTask = false
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
  .task-navigation-div-icon {
    background-color: rgb(255, 255, 255);
    margin-left: 15px;
    padding: 5px;
  }
}
.task-nav-icon {
  color: rgb(17, 91, 221);
  font-weight: 900;
}
.task-nav-icon:hover {
  cursor: pointer;
}
.message {
  margin-left: 30px;
  cursor: pointer;
  .icon {
    line-height: 97px;
    font-size: 25px;
  }
}
.task-navigation-div {
  .icon {
    line-height: 97px;
    font-size: 25px;
  }
}
.message {
  ::v-deep .el-badge {
    .el-badge__content {
      background: #e30d0d;
      top: auto;
      bottom: -3px;
      min-width: 25px;
      height: 25px;
      padding: 0;
      font-size: 14px;
      text-align: center;
    }
  }
}
</style>
