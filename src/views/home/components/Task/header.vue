<template>
  <div class="flex-between-center-center ekl-header">
    <div class="tab-tabs">
      <div style="width: 100%">
        <div class="task-value-div">
          <div>
            <span class="task-value" :class="{'overdue-task-value': overDueQtyStr}">{{ overDueQtyStr | overNum }}</span>
            <span class="task-value-title">{{ $t('HOME_CARD.OVERDUE_TEXT') }}</span>
          </div>
          <div class="task-value-divide-line">/</div>
          <div class='tab-title'>
            <span class="task-value">{{ todoDueQtyStr | overNum }}</span>
            <span class="task-value-title">{{ $t('HOME_CARD.IN_PROGRESS_TEXT') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'taskHeader',
    props: {
      taskQty: {
        type: Object,
        default: () => {
          return {
            overdueQty: 0,
            todoQty: 0
          }
        }
      }
    },
    computed: {
      overDueQtyStr() {
        return this.taskQty && this.taskQty.overdueQty ? this.taskQty.overdueQty : 0
      },
      todoDueQtyStr() {
        return this.taskQty && this.taskQty.todayQty ? this.taskQty.todayQty : 0
      }
    },
    data() {
      return {
        activeName: 0,
        tabList: [
          { name: this.$t('HOME_CARD.OVERDUE_TEXT'), id: 0 },
          { name: this.$t('HOME_CARD.IN_PROGRESS_TEXT'), id: 1 },
        ]
      }
    },
    created() {
      this.setActiveName()
    },
    watch: {
      eklTabList() {
        this.setActiveName()
      }
    },
    methods: {
      setActiveName() {
        this.activeName = this.$t('APPROVAL.APPROVAL_TODO')
      },
      handleClick(item) {
        this.$emit('tab-click', item === 1)
      }
    },
    
    filters: {
      overNum: function(value) {
        return value > 99 ? '99+' : value || 0
      }
  },
  }
</script>

<style lang="scss" scoped>
.ekl-header {
  //flex-grow: 1;
  margin-right: 10px;
  //align-items: center;
  max-width: calc(100% - 60px);

  .tab-tabs {
    width: 100%;
    // overflow-x: auto;
    // overflow-y: hidden;
    .task-value-div {
      display: flex;
      justify-content: space-between;
      > div {
        display: flex;
        flex-direction: column;
        .task-value {
          color: rgb(255, 255, 255);
          font-weight: bold;
          font-size: 16px;
          text-align: center;
          &.overdue-task-value {
            color: rgb(235, 103, 105)
          }
        }
        .task-value-title {
          color: rgb(255, 255, 255);
          font-weight: normal;
          font-size: 16px;
          text-align: center;
        }
      }
      .task-value-divide-line {
        color: rgb(255, 255, 255);
        padding-left: 5px;
        padding-right: 5px;
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
}
</style>
