<template>
  <iCard class="todo-task-list-info-card">
    <div class="todo-task-list-info-div">
      <div class="todo-task-list-title">{{ $t('APPROVAL_TODO_LIST') }}</div>
      <div class="todo-task-list-info-list">
        <div class="todo-task-list-info" v-for="(item, index) in todoTaskList">
          <div class="todo-task-list-info-title">
            {{ item.title }}
          </div>
          <div class="todo-task-list-info-content">
            <span>{{ item.no }}</span>
            <span>{{ item.createdBy }}</span>
          </div>
        </div>
      </div>
    </div>
  </iCard>
</template>
<script>
export default {
  name: "todoTaskListInfo",
  data() {
    return {
      todoTaskList: []
    }
  },
  created() {
    this.getTodoTaskList()
  },
  methods: {
    getTodoTaskList() {
      let todoTaskList = []
      for(let i = 0; i < 10; i++) {
        todoTaskList.push({
          title: '5JA83156-GSCHARNIWEVERSTAERK-前盖铰链加强板总成',
          no: '80001123' + i,
          createdBy: 'CSE-1 Zhang San'
        })
      }
      this.todoTaskList = todoTaskList
    }
  }
}
</script>
<style lang="scss" scoped>
  ::-webkit-scrollbar {
    width: 4px !important;
  }
  .todo-task-list-info-card {
    z-index: 99999 !important;
    height: 840px;
    width: 340px;
    position: absolute;
    top: 61px;
    right: 20px;
  }
.todo-task-list-info-div {
  width: 340px;
  padding: 10px;
  background: rgb(255, 255, 255) !important;
  z-index: 99999 !important;
  .todo-task-list-title {
    background: rgb(255, 255, 255) !important;
    text-align: left;
    height: 28px;
    line-height: 28px;
    margin-bottom: 15px;
    z-index: 99999 !important;
    width: 100%;
    font-size: 16px;
  }
  .todo-task-list-info-list {
    background: rgb(255, 255, 255) !important;
    z-index: 99999 !important;
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
    max-height: 500px;
    overflow-y: scroll;
  }
}
</style>
