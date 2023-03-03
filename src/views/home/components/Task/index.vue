<template>
  <div class="task-container-div" v-loading="taskLoading">
    <div class="no-data-text" v-if="!taskLoading && (!dataListNow || dataListNow.length === 0)">
      <span> {{ $t("HOME_CARD.NO_TASK_DATA") }}  </span>
    </div>
    <div class="task-container" v-else>
      <div v-for="item in dataListNow" :key="item.taskType + item.title" class="task-card">
      <div class="left task-type-name">
        <div class="name single-no-ellipsis">{{ item.name }}</div>
<!--        <div class="abs single-ellipsis">{{ item.name }}</div>-->
<!--        <div class="name single-ellipsis">{{ item.title }}</div>-->
<!--        <div class="abs single-ellipsis">{{ item.name }}</div>-->
      </div>
      <div class="right">
        <div class="overdue" @click="handleToOverdue(item)">
          <div :class="{ 'exceed': getOverdueQtyByItem(item) }">
            {{ getOverdueQtyByItem(item) | overNum }}
            <span v-if="getOverdueQtyByItem(item) > 99">+</span>
          </div>
          <div class="numName flex-align-center">
            <!-- <icon symbol class="icon" name="iconOverdue" /> -->
            <div>{{ $t('HOME_CARD.OVERDUE_TEXT') }}</div>
          </div>
        </div>
        <div class="line">/</div>
        <div class="progress" @click="handleToProgress(item)">
          <div>
            {{ getTodayQtyByItem(item) | overNum }}
            <span v-if="getTodayQtyByItem(item) > 99">+</span>
          </div>
          <div class="numName flex-align-center">
            <!-- <icon symbol class="icon" name="icona-InProgress" /> -->
            <div>{{ $t('HOME_CARD.IN_PROGRESS_TEXT') }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
<!--      <div class="right">-->
<!--        <div class="overdue" @click="handleToOverdue(item)">-->
<!--          <div :class="item.overdue ? 'exceed' : ''">-->
<!--            {{ getOverdueQty(item.taskType) | overNum }}-->
<!--            <span v-if="getOverdueQty(item.taskType) > 99">+</span>-->
<!--          </div>-->
<!--          <div class="numName flex-align-center">-->
<!--            &lt;!&ndash; <icon symbol class="icon" name="iconOverdue" /> &ndash;&gt;-->
<!--            <div>{{ $t('HOME_CARD.OVERDUE_TEXT') }}</div>-->
<!--      &lt;!&ndash; <div v-for="item in moduleData" :key="item.taskType" class="task-card">-->
<!--        <div class="left">-->
<!--          <div class="name single-ellipsis">{{ item.taskTypeName }}</div>-->
<!--          <div class="abs single-ellipsis">{{ item.taskName }}</div>-->
<!--        </div>-->
<!--        <div class="right">-->
<!--          <div class="overdue" @click="handleToOverdue(item)">-->
<!--            <div :class="item.overdue ? 'exceed' : ''">-->
<!--              {{ getOverdueQty(item.taskType) | overNum }}-->
<!--              <span v-if="getOverdueQty(item.taskType) > 99">+</span>-->
<!--            </div>-->
<!--            <div class="numName flex-align-center">-->
<!--              <div>{{ $t('HOME_CARD.OVERDUE') }}</div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="line">/</div>-->
<!--          <div class="progress" @click="handleToProgress(item)">-->
<!--            <div>-->
<!--              {{ getTodayQty(item.taskType) | overNum }}-->
<!--              <span v-if="getTodayQty(item.taskType) > 99">+</span>-->
<!--            </div>-->
<!--            <div class="numName flex-align-center">-->
<!--              <div>{{ $t('HOME_CARD.IN_PROGRESS') }}</div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div> &ndash;&gt;-->

<!--      <div v-for="item in dataListNow" :key="item.taskType" class="task-card">-->
<!--        <div class="left">-->
<!--          <div class="name single-ellipsis">{{ item.title }}</div>-->
<!--          <div class="abs single-ellipsis">{{ item.name }}</div>-->
<!--        </div>-->
<!--        <div class="right">-->
<!--          <div class="overdue" @click="handleToOverdue(item)">-->
<!--            <div :class="item.overdue ? 'exceed' : ''">-->
<!--              {{ getOverdueQty(item.overdueQty) }}-->
<!--              <span v-if="item.overdueQty > 99">+</span>-->
<!--            </div>-->
<!--            <div class="numName flex-align-center">-->
<!--              <div>{{ $t('HOME_CARD.OVERDUE') }}</div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="numName flex-align-center">-->
<!--            &lt;!&ndash; <icon symbol class="icon" name="icona-InProgress" /> &ndash;&gt;-->
<!--            <div>{{ $t('HOME_CARD.IN_PROGRESS_TEXT') }}</div>-->
<!--          </div>-->
<!--          <div class="line">/</div>-->
<!--          <div class="progress" @click="handleToProgress(item)">-->
<!--            <div>-->
<!--              {{ getTodayQty(item.todayQty) }}-->
<!--              <span v-if="item.todayQty > 99">+</span>-->
<!--            </div>-->
<!--            <div class="numName flex-align-center">-->
<!--              <div>{{ $t('HOME_CARD.IN_PROGRESS') }}</div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--      </div>-->
  </div>
</template>

<script>
// import { Icon } from 'rise'
import { getDutyStatistics } from '@/api/duty'
import { fetchTaskCenter } from '@/api/duty'
import { openUrl } from '@/utils/index'

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
    }),
    userId: function () {
      return this.$store.state.permission.userInfo.id
    },
    userType: function () {
      return this.$store.state.permission.userInfo.userType
      //2是供应商 1是员工
    },
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
      urls: {},
      dataList:[],
      dataListNow:[],
      taskLoading: false
    }
  },
  watch: {
    // data(val) {
    //   console.log('watch data', val)
    //   this.initModuleData()
    // }
  },
  created() {
    // this.queryAllData()
    // this.initModuleData()
    this.fetchTaskCenter()
  },
  mounted(){
    // this.$nextTick(()=>{
    //   this.fetchTaskCenter();
    // })
  },
  methods: {
    fetchTaskCenter(){
      this.taskLoading = true
      const taskQty = {
        overdueQty: 0,
        todayQty: 0
      }
      fetchTaskCenter({
        userId: this.userId,
        userTye: this.userType == 1 ? 2 : 1
      }).then(res=>{
        if(res){
          const keyList = Object.keys(res);
          // console.log(keyList)
          keyList.forEach(e => {
            this.valueNumbers[e] = {
              overdueQty: 0,
              todayQty: 0
            }
            if(res[e] && res[e].length>0){
              res[e].forEach(item => {
                this.dataList.push({
                  title: item.taskTypeName,
                  name: item.taskName,
                  overdueQty: item.overdueQty,
                  todayQty: item.todayQty,
                  taskType: item.taskType,
                  overdueLink: item.overdueLink,
                  todayLink: item.todayLink,
                })
                taskQty.overdueQty += item.overdueQty || 0
                taskQty.todayQty += item.todayQty || 0
                // this.valueNumbers[e].overdueQty += item.overdueQty || 0
                // this.valueNumbers[e].todayQty += item.todayQty || 0
              })
            }
          })

          // console.log(this.dataList)
          const list = this.dataList.filter(e=>!(e.overdueQty==0 && e.todayQty==0)).sort((a, b) => {
            return b.overdueQty - a.overdueQty
          })
          // console.log(list)
          this.dataListNow = list
        }
        // this.initModuleData()
      }).catch(error => {
        console.log("error", error)
      }).finally(() => {
        this.$emit("taskQty", taskQty)
        this.taskLoading = false
      })
    },
    handleTaskCenter() {
      window.open(process.env.VUE_APP_HOST + '/portal/#/task/center', '_blank')
    },
    handleToOverdue(item) {//overdueLink
      // 接口的坑，url不同步
      openUrl(item.overdueLink || item.todayLink)
      return;
      if (this.urls[item.taskType] && this.urls[item.taskType].todayLink) {
        // window.open(this.urls[item.taskType].todayLink)
        window.open(this.urls[item.taskType].overdueLink)
      } else {
        // window.open(item.todayLink, '_blank')
        window.open(item.overdueLink, '_blank')
      }
    },
    handleToProgress(item) {//todayLink
      // 接口的坑，url不同步
      openUrl(item.overdueLink || item.todayLink)
      return;
      if (
        this.urls[item.taskType] &&
        (this.urls[item.taskType].overdueLink ||
          this.urls[item.taskType].todayLink)
      ) {
        const { todayLink, overdueLink } = this.urls[item.taskType]
        // window.open(overdueLink || todayLink, '_blank')
        window.open(todayLink || overdueLink, '_blank')
      } else {
        // window.open(item.overdueLink || item.todayLink, '_blank')
        window.open(item.todayLink || item.overdueLink, '_blank')
      }
    },
    async queryAllData() {
      const params = `userId=${this.userInfo.id}&userTye=2`
      const result = await getDutyStatistics(params)

      if (result) {
        const taskQty = {
          overdueQty: 0,
          todoQty: 0
        }
        result.forEach((task) => {
          task?.taskCenterDtoList?.forEach((e) => {
            this.valueNumbers[e.taskType] = e
            this.urls[e.taskType] = {
              todayLink: e.todayLink,
              overdueLink: e.overdueLink
            }
            taskQty.overdueQty += (e.overdueQty || 0)
            taskQty.todoQty += (e.todayQty || 0)
          })
        })
        this.$emit("taskQty", taskQty)
        this.initModuleData()
      }
    },
    initModuleData() {
      // const data = JSON.parse(this.data.moduleData)
      // console.log('initModuleData watch data +++...', data, this.data.moduleData)
      // if (data.length <= 5) {
      // this.moduleData = data
      // }
      // this.moduleData = data.slice(0, 5)
    },
    getOverdueQtyByItem(item) {
      return item.overdueQty || 0
    },
    getOverdueQty(taskType) {
      if (this.valueNumbers[taskType]) {
        return this.valueNumbers[taskType].overdueQty || 0
      }
      return 0

      // if(Number(taskType)>99){
      //   return "99+"
      // }else{
      //   return taskType
      // }
    },
    getTodayQtyByItem(item) {
      return item.todayQty || 0
    },
    getTodayQty(taskType) {
      if (this.valueNumbers[taskType]) {
        return this.valueNumbers[taskType].todayQty || 0
      }
      return 0

      // if(Number(taskType)>99){
      //   return "99+"
      // }else{
      //   return taskType
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
.task-wrap{
  height:100%;
  overflow-y: auto;
}
.numName {
  > div {
    color: rgb(129, 129, 129);
  }
}
.task-container-div {
  height: 100%;
  .no-data-text {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    span {
      height: 30px;
      line-height: 30px;
    }
  }
}
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
.single-no-ellipsis {
  white-space: normal;
  overflow: auto;
}
.task-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .task-card {
    border-radius: 10px;
    height: 120px;
    box-sizing: border-box;
    background: #f8f9fa;
    padding: 17px 20px;
    margin-bottom: 12px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    //justify-content: space-between;
    //align-items: center;
    //flex-wrap: wrap;
    width: calc(50% - 5px);

    > .left {
      text-align: center;
      color: #333;
      opacity: 0.65;

      > .name {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 5px;
        text-align: center;
        width: 100%;
        color: rgb(0, 0, 0);
      }

      > .abs {
        font-size: 12px;
        text-align: left;
      }
    }

    > .left {
      text-align: center;
      color: #333;
      opacity: 0.65;

      > .name {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 5px;
        text-align: center;
        width: 100%;
      }

      > .abs {
        font-size: 12px;
        text-align: left;
      }
      &.task-type-name {
        width: 100%;
        text-align: center;
        .name {
          text-align: center;
        }
      }
    }

    > .right {
      display: flex;
      cursor: pointer;
      width: 100%;
      text-align: center;
      justify-content: center;
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
          width: 100%;
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
}
</style>
