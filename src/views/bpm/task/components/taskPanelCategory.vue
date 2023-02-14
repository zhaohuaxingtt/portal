<template>
  <div class="approval" v-loading="loading">
    <taskTypePanelCategory
      :data="activeData"
      @toggle-active="toggleActive"
      :active-index.sync="activeIndex"
      :typeName='typeName'
      numVisible
    />
  </div>
</template>

<script>
  import taskTypePanelCategory from './taskTypePanelCategory'
  import {
    queryApprovalOverview,
    queryAekoTodoCount
  } from '@/api/approval/statistics'
  // import { queryAekoTodoCount } from '@/api/approval/statistics'
  export default {
    name: 'taskPanelCategory',
    components: { taskTypePanelCategory },
    props: {
      typeName: {
        type: String,
        default: null
      }
    },
    data() {
      return {
        data: [],
        activeIndex: 0,
        loading: false
      }
    },
    computed: {
      activeData() {
        console.log("this.typeName", this.typeName)
        if(this.typeName) {
          const data = _.cloneDeep(this.data)
          const findDataByTypeName = data.find(item => {
            return item.typeName === this.typeName
          })
          console.log("this.typeName activeData1", this.typeName, findDataByTypeName)
          if(findDataByTypeName) {
            return findDataByTypeName.wfCategoryList
          } else {
            return []
          }
        } else {
          console.log("this.typeName activeData2", this.typeName)
          return []
        }
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
