<template>
  <div class="task-container">
    <div v-for="item in moduleData" :key="item.taskType" class="task-card">
      <div class="left">
        <div class="name single-ellipsis">{{ item.taskTypeName }}</div>
        <div class="abs single-ellipsis">{{ item.taskName }}</div>
      </div>
      <div class="right">
        <div class="overdue" @click="handleToOverdue(item)">
          <div :class="item.overdue ? 'exceed' : ''">
            {{ getOverdueQty(item.taskType) | overNum }}
            <span v-if="getOverdueQty(item.taskType) > 99">+</span>
          </div>
          <div class="numName flex-align-center">
            <!-- <icon symbol class="icon" name="iconOverdue" /> -->
            <div>{{ $t('HOME_CARD.OVERDUE') }}</div>
          </div>
        </div>
        <div class="line">/</div>
        <div class="progress" @click="handleToProgress(item)">
          <div>
            {{ getTodayQty(item.taskType) | overNum }}
            <span v-if="getTodayQty(item.taskType) > 99">+</span>
          </div>
          <div class="numName flex-align-center">
            <!-- <icon symbol class="icon" name="icona-InProgress" /> -->
            <div>{{ $t('HOME_CARD.IN_PROGRESS') }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Icon } from 'rise'
import { getDutyStatistics } from '@/api/duty'
export default {
  // components: { Icon },
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      userInfo: (state) => state.permission.userInfo
    })
  },
  filters: {
    overNum: function (value) {
      return value > 99 ? 99 : value || 0
    }
  },
  data() {
    return {
      valueNumbers: {},
      moduleData: [],
      urls: {}
    }
  },
  watch: {
    data(val) {
      console.log('watch data', val)
      this.initModuleData()
    }
  },
  created() {
    this.queryAllData()
    this.initModuleData()
  },
  methods: {
    handleTaskCenter() {
      window.open(process.env.VUE_APP_HOST + '/portal/#/task/center', '_blank')
    },
    handleToOverdue(item) {
      // 接口的坑，url不同步
      if (this.urls[item.taskType] && this.urls[item.taskType].todayLink) {
        // window.open(this.urls[item.taskType].todayLink)
        window.open(this.urls[item.taskType].overdueLink)
      } else {
        // window.open(item.todayLink, '_blank')
        window.open(item.overdueLink, '_blank')
      }
    },
    handleToProgress(item) {
      // 接口的坑，url不同步
      if (
        this.urls[item.taskType] &&
        (this.urls[item.taskType].overdueLink ||
          this.urls[item.taskType].todayLink)
      ) {
        const { todayLink, overdueLink } = this.urls[item.taskType]
        // window.open(overdueLink || todayLink, '_blank')
        window.open( todayLink || overdueLink, '_blank')
      } else {
        // window.open(item.overdueLink || item.todayLink, '_blank')
        window.open(item.todayLink|| item.overdueLink , '_blank')
      }
    },
    async queryAllData() {
      const params = `userId=${this.userInfo.id}&userTye=2`
      const result = await getDutyStatistics(params)

      if (result) {
        result.forEach((task) => {
          task.taskCenterDtoList.forEach((e) => {
            this.valueNumbers[e.taskType] = e
            this.urls[e.taskType] = {
              todayLink: e.todayLink,
              overdueLink: e.overdueLink
            }
          })
        })
        this.initModuleData()
      }
    },
    initModuleData() {
      const data = JSON.parse(this.data.moduleData)
      if (data.length <= 5) {
        this.moduleData = data
      }
      this.moduleData = data.slice(0, 5)
    },
    getOverdueQty(taskType) {
      if (this.valueNumbers[taskType]) {
        return this.valueNumbers[taskType].overdueQty || 0
      }
      return 0
    },
    getTodayQty(taskType) {
      if (this.valueNumbers[taskType]) {
        return this.valueNumbers[taskType].todayQty || 0
      }
      return 0
    }
  }
}
</script>

<style lang="scss" scoped>
.single-ellipsis {
  word-wrap: break-word;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 120px;
}
.single-ellipsis:hover {
  white-space: normal;
  overflow: auto;
}
.task-card {
  border-radius: 10px;
  height: 97px;
  box-sizing: border-box;
  background: #f8f9fa;
  padding: 17px 20px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > .left {
    text-align: center;
    color: #333;
    opacity: 0.65;
    > .name {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 5px;
      text-align: left;
    }
    > .abs {
      font-size: 12px;
      text-align: left;
    }
  }
  > .right {
    display: flex;
    cursor: pointer;
    .line {
      font-size: 24px;
    }
    // .numName {
    //   position: relative;
    //   > img {
    //     width: 15px;
    //     margin-right: 5px;
    //   }
    //   > .icon {
    //     font-size: 16px;
    //     margin-right: 5px;
    //   }
    //   .numName-text {
    //     line-height: 12px;
    //     opacity: 0.86;
    //   }
    // }
    // .overdue {
    //   .numName {
    //     margin-right: 10px;
    //   }
    // }
    // .progress {
    //   .numName {
    //     margin-right: 10px;
    //   }
    // }

    .overdue,
    .progress {
      > div {
        text-align: center;
        color: #28303e;
        position: relative;
        > span {
          font-size: 12px;
          position: absolute;
        }
        &:first-child {
          font-size: 20px;
          font-weight: bold;
          min-height: 30px;
          &.exceed {
            color: #e33232;

            // font-size: 24px;
          }
        }
        // &:last-child {
        //   min-height: 30px;
        //   line-height: 30px;
        // }
      }
    }
  }
}
</style>
