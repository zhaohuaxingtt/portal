<template>
  <div class="approval" v-loading="loading">
    <panelCategory
      :data="data"
      @toggle-active="toggleActive"
      :active-index.sync="activeIndex"
      numVisible
    />
  </div>
</template>

<script>
  import panelCategory from './panelCategory'
  import {
    queryApprovalOverview,
    queryAekoTodoCount
  } from '@/api/approval/statistics'
  // import { queryAekoTodoCount } from '@/api/approval/statistics'
  export default {
    name: 'taskPanelCategory',
    components: { panelCategory },
    data() {
      return {
        data: [],
        activeIndex: 0,
        loading: false
      }
    },
    computed: {
      activeDataList() {
        if (this.activeIndex === -1) {
          const data = _.cloneDeep(this.data)
          // CRW-7138 在全部Tab下只显示有待办任务的卡片，点击后面的分类Tab会将此分类下的全部卡片显示，包含审批任务为0的卡片
          const hasValueData = data.filter((e) => {
            const wfList = e?.wfCategoryList?.filter((wf) => {
              return wf.todoNum
            })
            if (wfList.length) {
              wfList.forEach(item => {
                item['typeValue'] = e.typeValue
              })
              e.wfCategoryList = wfList
              return true
            }
            return false
          })
          const activeDataList = []
          if(hasValueData && hasValueData.length > 0) {
            hasValueData.forEach(item => {
              if(item.wfCategoryList && item.wfCategoryList.length > 0) {
                activeDataList.push(...item.wfCategoryList)
              }
            })
          }
          return activeDataList
        } else {
          // console.log('activeDataList...', this.data[this.activeIndex])
          return [this.data[this.activeIndex]]
        }
      },
      activeData() {
        if (this.activeIndex === -1) {
          const data = _.cloneDeep(this.data)
          // CRW-7138 在全部Tab下只显示有待办任务的卡片，点击后面的分类Tab会将此分类下的全部卡片显示，包含审批任务为0的卡片
          const hasValueData = data.filter((e) => {
            const wfList = e?.wfCategoryList?.filter((wf) => {
              return wf.todoNum
            })
            if (wfList.length) {
              e.wfCategoryList = wfList
              return true
            }
            return false
          })
          return hasValueData
          // return this.data
        }

        return [this.data[this.activeIndex]]
      }
    },
    watch:{
      '$i18n.locale'(val){
        this.getOverview()
      }
    },
    created() {
      this.getOverview()
    },
    methods: {
      toggleActive(index) {
        this.activeIndex = index
      },
      openListPage(item) {
        if (item.cardUrl) {
          window.open(item.cardUrl)
        } else {
          this.$router.push({
            name: 'bpmTodoList',
            query: {
              modelTemplate: JSON.stringify(item.categoryList)
            }
          })
        }
      },
      async getOverview() {
        this.loading = true
        const { data = [] } = await queryApprovalOverview({
          userID: this.$store.state.permission.userInfo.id,
          language: this.$i18n.locale == 'zh' ? 'CN' : 'EN'
        }).finally(() => (this.loading = false))

        let totalNum = 0
        data.forEach((e) => {
          let totalTodoNum = 0
          e.wfCategoryList.forEach((wf) => {
            totalTodoNum += wf.todoNum || 0
            totalNum += wf.todoNum || 0
          })
          e.totalTodoNum = totalTodoNum
        })
        this.data = data
        this.$emit('set-num', totalNum)
        this.getAekoTodoCount()
      },
      handleSetAekoNum(val) {
        const data = this.data
        let totalNum = 0
        data.forEach((e) => {
          let totalTodoNum = 0
          e.wfCategoryList.forEach((wf) => {
            if (e.typeName === 'aeko') {
              wf.todoNum = val
              totalNum += val
              totalTodoNum += val || 0
            } else {
              totalNum += wf.todoNum
              totalTodoNum += wf.todoNum || 0
            }
          })
          e.totalTodoNum = totalTodoNum
        })
        this.$emit('set-num', totalNum)
      },
      getAekoTodoCount() {
        queryAekoTodoCount({}).then((res) => {
          if (res.result) {
            this.handleSetAekoNum(res.total || 0)
            /* this.aekoTodoCount = res.total || 0
            this.$emit('set-aeko-num', this.aekoTodoCount) */
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .category {
    margin-bottom: 29px;
  }
  .category-content {
    display: flex;
    flex-wrap: wrap;
    //min-height: 180px;
  }
  .category-name {
    color: #0d2451;
    font-size: 20px;
    margin-bottom: 22px;
    font-weight: bold;
  }
  .approval {
    //min-height: 600px;
    .panel-category {
      margin-top: 0;
      margin-bottom: 0;
    }
  }
</style>
