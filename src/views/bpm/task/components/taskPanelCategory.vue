<template>
  <div class="approval" v-loading="loading">
    <taskTypePanelCategory
      ref="taskTypePanelCategory"
      :data="activeData"
      @toggle-active="toggleActive"
      @new-type-name="handleNewTypeName"
      @item-type-list-change="onItemTypeListChange"
      :active-index.sync="activeIndex"
      :typeName="subTypeName"
      :hasAll="hasAll"
      :numVisible="numVisible"
    />
  </div>
</template>

<script>
  import taskTypePanelCategory from './taskTypePanelCategory'
  import {
    queryApprovalOverview,
    queryAekoTodoCount,
    queryApplyOverview
  } from '@/api/approval/statistics'
  // import { queryAekoTodoCount } from '@/api/approval/statistics'
  export default {
    name: 'taskPanelCategory',
    components: { taskTypePanelCategory },
    props: {
      subTypeName: {
        type: String,
        default: null
      },
      activeIndex: {
        type: Number,
        default: -1
      },
      myApplication: {
        type: Boolean,
        default: false
      },
      hasAll: {
        type: Boolean,
        default: true
      },
      isFinished: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        data: [],
        loading: false,
        oriSubTypeName: null
      }
    },
    computed: {
      numVisible() {
        return !this.isFinished
      },
      activeData() {
        console.log("this.subTypeName 1111", this.subTypeName)
        if(this.subTypeName) {
          const data = _.cloneDeep(this.data)
          const findDataByTypeName = data.find(item => {
            return item.typeName === this.subTypeName
          })
          console.log("this.subTypeName for activeData1", this.subTypeName, findDataByTypeName)
          this.hasAll = true
          if(findDataByTypeName) {
            return findDataByTypeName.wfCategoryList
          } else {
            return []
          }
        } else {
          this.hasAll = true
          console.log("this.subTypeName for activeData2", this.subTypeName)
          return []
        }
      }
    },
    watch:{
      '$i18n.locale'(val){
        this.getOverview()
      },
      activeData(val) {
        let foundTypeName = null
        this.data.forEach((e) => {
          e.wfCategoryList.forEach((wf) => {
            // 根据typeName，找到下拉框的内容了
            console.log("this.subTypeName.....", this.subTypeName)
            if(wf.categoryList && wf.categoryList.indexOf(this.subTypeName) > -1) {
              foundTypeName = e
            }
          })
        })
        this.$nextTick(() => {
          if(foundTypeName) {
            this.$refs.taskTypePanelCategory.setTypeName(foundTypeName.typeName, this.oriSubTypeName)
          } else {
            this.$refs.taskTypePanelCategory.setTypeName(this.subTypeName, this.oriSubTypeName)
          }
        })
      }
    },
    created() {
      this.oriSubTypeName = this.subTypeName
      this.getOverview()
    },
    methods: {
      onItemTypeListChange(newValue, update = true) {
        this.$emit('item-type-list-change', newValue, update)
      },
      handleNewTypeName(newValue) {
        this.$emit('new-type-name', newValue)
      },
      toggleActive(index, update = true) {
        this.activeIndex = index
        this.$emit('toggle-active', index, this.activeData[index], update)
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
        let queryOverviewFunc = queryApprovalOverview
        if(this.myApplication) {
          queryOverviewFunc = queryApplyOverview
        }
        const { data = [] } = await queryOverviewFunc({
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
