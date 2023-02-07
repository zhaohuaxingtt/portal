<template>
  <div class="task-container">
    <div v-for="item in moduleData" :key="item.id" class="task-card">
      <div class="top">
        <div class="name single-no-ellipsis">{{ item.value }}</div>
<!--        <div class="abs single-ellipsis">{{ getAbs(item.typeName) }}</div>-->
      </div>
      <div class="bottom">
        <div v-if="!showPendingApproval" class="overdue" @click="handleToApply(item)">
          <div :class="item.overdue">
            {{ getLaunchNum(item.subType) | overNum }}
            <span v-if="getLaunchNum(item.subType) > 99">+</span>
          </div>
          <div class="numName flex-align-center">
            <!-- <icon symbol class="icon" name="icona-MyApplication" /> -->
            <div>{{ $t('HOME_CARD.MY_APPLICATION') }}</div>
          </div>
        </div>
<!--        <div class="line">/</div>-->
        <div v-else class="approval" @click="handleToApproval(item)">
          <div>
            {{ getTodoNum(item.subType) | overNum }}
            <span v-if="getTodoNum(item.subType) > 99">+</span>
          </div>
          <div class="numName flex-align-center">
            <!-- <icon symbol class="icon" name="icona-MyApproval" /> -->
            <div>{{ $t('APPROVAL.APPROVAL_TODO') }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from 'rise'
import { getApprovalList } from '@/api/home'

export default {
  components: { Icon },
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    approveTabItem: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      userInfo: state => state.permission.userInfo
    })
  },
  filters: {
    overNum: function(value) {
      return value > 99 ? '99+' : value || 0
    }
  },
  data() {
    return {
      valueNumbers: {},
      moduleData: [],
      absMap: {},
      showPendingApproval: true, // true---显示待审批，false---显示我的申请
    }
  },
  watch: {
    data() {
      this.initModuleData()
    },
    approveTabItem(newValue) {
      this.showPendingApproval = newValue
    }
  },
  created() {
    this.queryAllData()
    this.initModuleData()
  },
  methods: {
    initModuleData() {
      const data = JSON.parse(this.data.moduleData)
      if (data.length <= 5) {
        this.moduleData = data
      }
      this.moduleData = data.slice(0, 5)
    },
    async queryAllData() {
      const result = await getApprovalList({ userID: this.userInfo.id })
      const data = result?.data || []
      data.forEach(item => {
        this.absMap[item.typeName] = item.typeValue
        item.wfCategoryList.forEach(e => {
          this.valueNumbers[e.subType] = { ...e }
        })
      })
      this.initModuleData()
    },
    getLaunchNum(subType) {
      if (this.valueNumbers[subType]) {
        return this.valueNumbers[subType].launchNum || 0
      }
      return 0
    },
    getTodoNum(subType) {
      if (this.valueNumbers[subType]) {
        return this.valueNumbers[subType].todoNum || 0
      }
      return 0
    },
    getAbs(typeName) {
      if (this.absMap[typeName]) {
        return this.absMap[typeName]
      }
      return ''
    },
    handleApproval() {
      window.open(process.env.VUE_APP_HOST + '/portal/#/bpm/approval/center')
    },
    openUrl(url, target) {
      if (url.indexOf('http') === -1) {
        url = process.env.VUE_APP_PUBLICPATH + url
      }
      target = target || '_blank'
      const a = document.createElement('a')
      a.setAttribute('href', url)
      a.setAttribute('style', 'display:none')
      a.setAttribute('target', target)
      document.body.appendChild(a)
      a.click()
      a.parentNode.removeChild(a)
    },
    handleToApply(item) {
      console.log('item', item)
      // this.$router.push({
      //   name: 'bpmMyAppy',
      //   query: {
      //     modelTemplate: JSON.stringify(item.categoryList)
      //   }
      // })
      let url = ''
      if (item.subType === 'aeko_approval') {
        url = window.location.origin + process.env.VUE_APP_PUBLICPATH + '/#/bpm/myAekoApply?modelTemplate=' + JSON.stringify(item.categoryList)
      } else {
        url = window.location.origin + process.env.VUE_APP_PUBLICPATH + '/#/bpm/myApply?modelTemplate=' + JSON.stringify(item.categoryList)
      }
      this.openUrl(url)
    },
    handleToApproval(item) {
      if (item.cardUrl) {
        window.open(item.cardUrl)
        return
      }
      const url =
        window.location.origin + process.env.VUE_APP_PUBLICPATH +
        '/portal/#/bpm/todoList?modelTemplate=' +
        JSON.stringify(item.categoryList)
      this.openUrl(url)
      // this.$router.push({
      //   name: 'bpmTodoList',
      //   query: {
      //     modelTemplate: JSON.stringify(item.categoryList)
      //   }
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
.numName {
  > img {
    width: 15px;
    margin-right: 5px;
  }
  > .icon {
    font-size: 16px;
  }
  .numName-text {
    font-size: 12px;
    line-height: 12px;
    opacity: 0.86;
  }
  color: rgb(129, 129, 129);
  > div {
    color: rgb(129, 129, 129);
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
    height: 97px;
    box-sizing: border-box;
    border-radius: 10px;
    background: #f8f9fa;
    padding: 17px 20px;
    margin-bottom: 12px;
    width: calc(50% - 5px);
    //display: flex;
    //align-items: center;
    > .top {
      text-align: center;
      color: #333;
      opacity: 0.65;
      > .name {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 5px;
        text-align: center;
        color: rgb(0, 0, 0);
      }
      > .abs {
        font-size: 12px;
        text-align: left;
        // color: #222;
      }
    }
    > .bottom {
      cursor: pointer;
      display: flex;
      justify-content: center;
      .line {
        font-size: 24px;
      }
      .overdue,
      .approval {
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
        }
      }
      .approval {
        > div {
          &:first-child {
            //color: #ffb500;
            color: rgb(0, 0, 0);
          }
        }
      }
    }
  }
}
</style>
