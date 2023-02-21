<template>
  <div class="task-container-div" v-loading="loadingApproveData">
    <div class="no-data-text" v-if="!loadingApproveData && (!curModuleData || curModuleData.length === 0)">
      <span> {{ showPendingApproval ? $t("APPROVAL.NO_APPROVAL_TODO") : $t("APPROVAL.NO_MY_APPLICATION") }}  </span>
    </div>
    <div class="task-container" v-else>
      <template v-for="item in curModuleData">
        <div :key="item.value" class="task-card">
          <div class="top">
            <div class="name single-no-ellipsis">{{ item.value }}</div>
    <!--        <div class="abs single-ellipsis">{{ getAbs(item.typeName) }}</div>-->
          </div>
          <div class="bottom">
            <div v-if="!showPendingApproval" class="overdue" @click="handleToApply(item)">
              <div :class="item.overdue">
                {{ getLaunchNum(item.subType) | overNum }}
                <span v-if="getLaunchNum(item.subType) > 99"></span>
              </div>
              <div class="numName flex-align-center">
                <div>{{ $t('HOME_CARD.MY_APPLICATION') }}</div>
              </div>
            </div>
    <!--        <div v-if="showPendingApproval" class="line">/</div>-->
            <div v-if="showPendingApproval" class="approval" @click="handleToApproval(item)">
              <div>
                {{ getTodoNum(item.subType) | overNum }}
                <span v-if="getTodoNum(item.subType) > 99"></span>
              </div>
              <div class="numName flex-align-center">
                <div>{{ $t('HOME_CARD.MY_APPROVAL') }}</div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { Icon } from 'rise'
import { getApprovalList } from '@/api/home'

import { queryApplyOverview,queryApprovalOverview } from '@/api/approval/statistics'

export default {
  components: { Icon },
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    showPendingApproval: {  // true---显示待审批，false---显示我的申请
      type: Boolean,
      default: () => {
        return true
      }
    }
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      userInfo: state => state.permission.userInfo
    }),
    curModuleData: function() {
      if(this.showPendingApproval) {
        return this.todoModuleData
      } else {
        return this.launchModuleData
      }
    }
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
      todoModuleData: [], //待办的data，已经排序
      launchModuleData: [], //我的申请的data，已经排序
      absMap: {},
      dataList:[],
      dataListNow:[],
      dataObject:{
        title:"",
        name:"",
        applyNumber:"",//申请
        approvalNumber:"",//审批
      },
      loadingApproveData: false
    }
  },
  watch: {
    // data() {
    //   this.initModuleData()
    //   console.log("moduleData, approvalToDoNum watch...", this.moduleData)
    // }
  },
  async created() {
    await this.queryAllData()
    // this.initModuleData()
  },
  mounted(){
    // this.$nextTick(()=>{
    //   this.queryApplyOverview();
    // })
  },
  methods: {
    queryApplyOverview(){//我的申请
      queryApplyOverview({
        userID: this.$store.state.permission.userInfo.id
      }).then(res=>{
        if(res.data&&res.data.length>0){
          res.data.forEach(e=>{
            if(e.wfCategoryList&&e.wfCategoryList.length>0){
              e.wfCategoryList.forEach(item=>{
                this.dataList.push({
                  title:item.value,
                  name:e.typeValue,
                  applyNumber:item.todoNum,
                  subType:item.subType,
                  categoryList:item.categoryList,
                })
              })
            }
          })
        }
      }).then(res=>{
        this.queryApprovalOverview();
      })
    },
    queryApprovalOverview(){//我的审批
      queryApprovalOverview({
        userID: this.$store.state.permission.userInfo.id
      }).then(res=>{
        console.log(res);
        if(res.data&&res.data.length>0){
          res.data.forEach(e=>{
            if(e.wfCategoryList&&e.wfCategoryList.length>0){
              e.wfCategoryList.forEach(item=>{
                this.dataList.forEach(val=>{
                  if(val.title == item.value){
                    val.approvalNumber = item.todoNum
                    val.cardUrl = item.cardUrl
                  }
                })
              })
            }
          })
        }

        const list = this.dataList.filter(e=>!(e.applyNumber==0&&e.approvalNumber==0))
        this.dataListNow = list;
      })
    },
    initModuleData() {
      // const data = JSON.parse(this.data.moduleData)
      let approvalToDoNum = 0
      let moduleData = []
      if(this.data?.length > 0) {
        this.data.forEach(dataItem => {
          if(dataItem.wfCategoryList?.length>0){
            dataItem.wfCategoryList.forEach(wfCategoryListItem=>{
              let foundModuleDataItem = moduleData.find(moduleDataItem => {
                 return (moduleDataItem.value == wfCategoryListItem.value)
              })
              if(foundModuleDataItem) {
                foundModuleDataItem.launchNum += wfCategoryListItem.launchNum
                foundModuleDataItem.todoNum += wfCategoryListItem.todoNum
                foundModuleDataItem.overDueNum += wfCategoryListItem.overDueNum
                foundModuleDataItem.cardUrl = wfCategoryListItem.cardUrl
              } else {
                let newModuleDataItem = {
                  ...wfCategoryListItem
                }
                moduleData.push(newModuleDataItem)
              }
              approvalToDoNum += ( this.valueNumbers[wfCategoryListItem.subType] && this.valueNumbers[wfCategoryListItem.subType].todoNum || 0)
            })
          }
        })
      }
      this.$emit("approvalToDoNum", approvalToDoNum)
      const filteredModuleData = moduleData.filter(e=>!(e.launchNum==0 && e.todoNum==0))
      // console.log('data=>',data);
      // if (filteredModuleData.length <= 5) {
      this.moduleData = filteredModuleData
      if(this.moduleData && this.moduleData.length > 0) {
        this.todoModuleData = this.moduleData.filter(e => e.todoNum).sort((a, b) => {
          return b.todoNum - a.todoNum
        })
        this.launchModuleData = this.moduleData.filter(e => e.launchNum).sort((a, b) => {
          return b.launchNum - a.launchNum
        })
      }
        // console.log("moduleData, approvalToDoNum...", this.moduleData, approvalToDoNum)
      // } else {
      //   this.moduleData = filteredModuleData.slice(0, 5)
      // }
    },
    async queryAllData() {
      this.loadingApproveData = true
      try {
        const result = await getApprovalList({ userID: this.userInfo.id })
        // console.log('queryAllData getApprovalList result=>',result);
        const data = result?.data || []
        data.forEach(item => {
          this.absMap[item.typeName] = item.typeValue
          item.wfCategoryList.forEach(e => {
            this.valueNumbers[e.subType] = { ...e }
          })
        })
        this.data = data
        this.initModuleData()
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingApproveData = false
      }
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
.task-wrap{
  height:100%;
  overflow-y: auto;
}
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
.task-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .task-card {
    width: calc(50% - 5px);
    height: 120px;
    box-sizing: border-box;
    border-radius: 10px;
    background: #f8f9fa;
    padding: 17px 20px;
    margin-bottom: 12px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    //flex-wrap: wrap;
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
