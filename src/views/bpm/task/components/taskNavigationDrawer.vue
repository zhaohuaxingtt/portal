<template>
  <div class="mail">
    <i-drawer
      class="messageDrawer1"
      :visible.sync="visible"
      wrapper-closable
      modal
    >
      <iCard class="todo-task-list-info-card" v-loading="loading">
        <div class="todo-task-list-info-div">
          <div class="todo-task-list-title">{{ $t('APPROVAL_TODO_LIST') }}</div>
          <div class="todo-task-list-info-list" v-infinite-scroll="handleLoadMore" infinite-scroll-distance="20">
            <div class="todo-task-list-info" v-for="(item, index) in todoTaskList">
              <div class="todo-task-list-info-title" @click="gotoDetailPage(item)">
<!--                {{ item.itemName + '-' + (isFinished ? item.itemContent : item.itemEvent) }}-->
                {{ item.itemName + '-' + item.itemEvent }}
              </div>
              <div class="todo-task-list-info-content">
                <span>{{ item.businessId }}</span>
                <span>{{ item.applyUserName }}</span>
              </div>
            </div>
            <p class="no-more-text" v-if="noMore">{{ $t("MAIL.NOMORE") }}</p>
          </div>
        </div>
      </iCard>
    </i-drawer>
  </div>
</template>

<script>
  import { iDrawer } from 'rise'
  import { queryUndoApprovals, queryFinishedApprovals } from '@/api/approval/myApproval'
  import { queryApplications } from '@/api/approval/myApplication'
  import { QUERY_DRAWER_TYPES } from '@/constants'

  export default {
    name: "taskNavigationDrawer",
    components: { iDrawer },
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      queryType: {
        type: Number,
        default: QUERY_DRAWER_TYPES.APPLY_TODO
      },
      isFinished: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      disabled () {
        return this.loading || this.noMore
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
    created() {
      this.getTodoTaskList()
    },
    data() {
      return {
        show: false,
        loading: false,
        todoTaskList: [],
        pageInfo: {
          pageNum: 1,
          pageSize: 20,
          total: 0,
        },
        noMore: false,
        QUERY_DRAWER_TYPES
      }
    },
    methods: {
      handleFinishCurrentTask(instanceId) {
        if(this.todoTaskList?.length >= 2) {
          return this.gotoNextTask(instanceId)
        } else {
          this.$message.info(`已经是最后一条`)
          return false
        }
      },
      handleLoopTask(instanceId, goPreTask) {
        if(this.todoTaskList?.length >= 2) {
          let curIndex = -1
          this.todoTaskList.find((item,index) => {
            if(item.instanceId === instanceId) {
              curIndex = index
            }
          })
          // 找到当前finish了的Index
          if(goPreTask) {
            if((curIndex - 1) < 0 ) {
              this.$nextTick(() => {
                this.gotoDetailPage(this.todoTaskList[this.todoTaskList.length - 1])
              })
            } else {
              this.$nextTick(() => {
                this.gotoDetailPage(this.todoTaskList[curIndex - 1])
              })
            }
          } else {
            if((curIndex + 1) >= this.todoTaskList.length) {
              this.$nextTick(() => {
                this.gotoDetailPage(this.todoTaskList[0])
              })
            } else {
              this.$nextTick(() => {
                this.gotoDetailPage(this.todoTaskList[curIndex + 1])
              })
            }
          }
          return true
        } else {
          this.$message.info(`已经是最后一条`)
          return false
        }
      },
      gotoPreTask(instanceId) {
        if(this.todoTaskList?.length > 0) {
          let curIndex = -1
          this.todoTaskList.find((item,index) => {
            if(item.instanceId === instanceId) {
              curIndex = index
            }
          })
          curIndex -= 1
          if(curIndex >= 0) {
            this.$nextTick(() => {
              this.gotoDetailPage(this.todoTaskList[curIndex])
            })
	    return true
          } else {
            return this.handleLoopTask(instanceId, true)
          }
        } else {
          this.$message.info(`已经是最后一条`)
          return false
        }
      },
      gotoNextTask(instanceId) {
        if(this.todoTaskList?.length > 0) {
          let curIndex = -1
          this.todoTaskList.find((item,index) => {
            if(item.instanceId === instanceId) {
              curIndex = index
            }
          })
          curIndex += 1
          if(curIndex < this.todoTaskList.length) {
            this.$nextTick(() => {
              this.gotoDetailPage(this.todoTaskList[curIndex])
            })
            return true
          } else {
            return this.handleLoopTask(instanceId, false)
          }
        } else {
          this.$message.info(`已经是最后一条`)
          return false
        }
      },
      getQueryTodoListFunc() {
        if(this.queryType === QUERY_DRAWER_TYPES.APPLY_TODO) {
          return queryUndoApprovals
        } else if(this.queryType === QUERY_DRAWER_TYPES.APPLY_FINISH) {
          return queryFinishedApprovals
        } else {
          return queryApplications
        }
      },
      genQueryListParams() {
        const params = {
          pageNum: this.pageInfo.pageNum,
          pageSize: this.pageInfo.pageSize
        }
        return params
      },
      genQueryListData() {
        if(this.$route.params.queryData) {
          return JSON.parse(decodeURIComponent(this.$route.params.queryData))
        }
        if(this.queryType === QUERY_DRAWER_TYPES.APPLY_TODO) {
          return {
            "taskType": 0,
            "userID": this.$store.state.permission.userInfo.id,
            "reApprove": false,
            "isAeko": false
          }
        } else {
          return {
            applyUserId: this.$store.state.permission.userInfo.id,
            isFinished: this.isFinished
          }
        }
      },
      //打开详情页
      gotoDetailPage(item) {
        this.$emit("showMoreTaskNeedClose")
        this.$nextTick(() => {
          let queryDataStr = ''
          if(this.$route.params.queryData) {
            queryDataStr = decodeURIComponent(this.$route.params.queryData)
          }
          if(this.queryType === QUERY_DRAWER_TYPES.APPLY_TODO || this.queryType === QUERY_DRAWER_TYPES.APPLY_FINISH) {
            if (this.isFinished) {
              window.location.href = `/portal/#/bpm/finishList/detail/${item.instanceId}/${item.taskId}/${this.isFinished ? 'yes' : 'no'}/${queryDataStr}`
            } else {
              window.location.href = `/portal/#/bpm/todoList/detail/${item.instanceId}/${item.taskId}/${this.isFinished ? 'yes' : 'no'}/${queryDataStr}`
            }
          } else {
            // http://localhost:8080/portal/#/bpm/myApply/detail/2423548/no
            window.location.href = `/portal/#/bpm/myApply/detail/${item.instanceId}/${this.isFinished ? 'yes' : 'no'}/${queryDataStr}`
          }
          // this.showDialog = true
        })
      },
      handleLoadMore() {
        if(this.noMore) {
          return
        }
        this.pageInfo.pageNum += 1
        this.getTodoTaskList()
      },
      getTodoTaskList() {
        const queryTodoListFunc = this.getQueryTodoListFunc()
        this.loading = true
        queryTodoListFunc(this.genQueryListParams(), this.genQueryListData()).then((res) => {
          // this.loading = false
          const { current, size, total, records } = res.data
          this.pageInfo.pageNum = current
          this.pageInfo.pageSize = size
          this.pageInfo.total = total
          if(this.todoTaskList?.length >= 0) {
            this.todoTaskList = this.todoTaskList.concat(records)
          } else {
            this.todoTaskList = records
          }
          if(this.todoTaskList.length >= total) {
            this.noMore = true
          }
          if(!this.isFinished) {
            this.$emit("totalTaskNum", total)
          }
        }).catch(error => {
          console.log("getTodoTaskList...", error)
        }).finally(() => {
          this.loading = false
        })
      },
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
    z-index: 101 !important;
  }
  ::-webkit-scrollbar {
    //width: 4px !important;
  }
  .todo-task-list-info-card {
    //z-index: 99999 !important;
    //height: 840px;
    //width: 340px;
    //position: absolute;
    //top: 61px;
    //right: 20px;
  }
  .todo-task-list-info-div {
    //width: 340px;
    padding: 10px;
    background: rgb(255, 255, 255) !important;
    //z-index: 99999 !important;
    .todo-task-list-title {
      background: rgb(255, 255, 255) !important;
      text-align: left;
      height: 28px;
      line-height: 28px;
      margin-bottom: 15px;
      z-index: 99999 !important;
      width: 100%;
      font-size: 16px;
      font-weight: 500;
    }
    .todo-task-list-info-list {
      background: rgb(255, 255, 255) !important;
      //z-index: 99999 !important;
      padding: 5px;
      .todo-task-list-info {
        background: rgb(255, 255, 255) !important;
        .todo-task-list-info-title {
          font-size: 14px;
          margin-bottom: 10px;
        }
        .todo-task-list-info-title:hover {
          color: #1660f1;
          text-decoration: underline;
          cursor: pointer;
        }
        .todo-task-list-info-content {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: rgb(142, 142, 142);
        }
        .todo-task-list-info-content:hover {
        }
        padding-bottom: 10px;
        border-bottom: 1px solid rgb(142, 142, 142);
        margin-bottom: 10px;
      }
      max-height: calc(100vh - 140px);
      overflow-y: scroll;
    }
    .no-more-text {
      text-align: center;
      height: 30px;
      line-height: 30px;
    }
  }
</style>
