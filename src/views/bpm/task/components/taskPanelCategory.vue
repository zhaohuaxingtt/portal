<template>
  <div class="approval" v-loading="loading">
<!--    <taskTypePanelCategory-->
<!--      ref="taskTypePanelCategory"-->
<!--      :data="activeData"-->
<!--      @toggle-active="toggleActive"-->
<!--      @new-type-name="handleNewTypeName"-->
<!--      @item-type-list-change="onItemTypeListChange"-->
<!--      :active-index.sync="activeIndex"-->
<!--      :typeName="subTypeName"-->
<!--      :hasAll="hasAll"-->
<!--      :numVisible="numVisible"-->
<!--    />-->

    <div class="panel-category">
      <div class="list">
        <iSelect
          :placeholder="language('请选择')"
          v-model="selectSubTypeName"
          class="item-type-select"
          :multiple="false"
          collapse-tags
          filterable
          @change="onItemTypeListClick"
        >
          <el-option
            v-for="(item, index) in dOptions"
            :key="index"
            :value="item.value"
            :label="item.label"
          >
          </el-option>
        </iSelect>
        <div
          v-if="hasAll"
          class="item"
          :key="-1"
          :class="{ active: -1 == activeIndex }"
          @click="onToggleActiveClick(-1)"
        >
          {{ language('QUANBU', '全部') }}
        </div>
        <div
          class="item"
          v-for="(item, index) in activeData"
          :key="index"
          :class="{ active: index === activeIndex }"
          @click="onToggleActiveClick(index)"
        >
          {{ item.value }}
          <span
            v-if="numVisible && item.todoNum"
            class="badge"
            :class="{ large: item.todoNum > 99 }"
          >
          {{ item.todoNum > 99 ? '99+' : item.todoNum }}
        </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    queryApprovalOverview,
    queryAekoTodoCount,
    queryApplyOverview
  } from '@/api/approval/statistics'
  import { BPM_APPROVAL_TYPE_OPTIONS } from '@/constants'
  import { iSelect } from 'rise'

  // import { queryAekoTodoCount } from '@/api/approval/statistics'
  export default {
    name: 'taskPanelCategory',
    components: { iSelect },
    props: {
      /**
       * 这个用来记录对应selectSubTypeName，目前还没有其他用处
       */
      typeName: {
        type: String,
        default: null
      },
      /**
       * subTypeName
       * 对应的是queryApprovalOverview和queryApplyOverview获取的内容
       * categoryList
       * 下面的typeName，也是用这个来过滤出activeData
       */
      subTypeName: {
        type: String,
        default: null
      },
      /**
       * 当前active的Tag
       */
      activeIndex: {
        type: Number,
        default: -1
      },
      /**
       * 是否是我的申请
       */
      myApplication: {
        type: Boolean,
        default: false
      },
      /**
       * 是否有全部，默认都是true
       */
      hasAll: {
        type: Boolean,
        default: true
      },
      /**
       * 是否是已完成
       */
      isFinished: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        data: [], // queryApprovalOverview和queryApplyOverview获取的内容, 下面有wfCategoryList 再下一级有 categoryList
        loading: false,
        oriSubTypeName: null, // 是home跳转过来的时候带的那个modelTemplate, 对应的是categoryList
        dOptions: BPM_APPROVAL_TYPE_OPTIONS,
        selectSubTypeName: null, // 下拉框的value，BPM_APPROVAL_TYPE_OPTIONS下面的value像 -1，0，1，2
        activeData: []
      }
    },
    computed: {
      /**
       * 是否显示待办的数字
       * @returns {boolean}
       */
      numVisible() {
        return !this.isFinished
      }
    },
    watch: {
      '$i18n.locale'(val){
        this.getOverview()
      }
    },
    created() {
      this.oriSubTypeName = this.subTypeName
      this.getOverview()
    },
    methods: {
      /**
       *
       * @param typeName 用来找下拉框的
       * @param foundSubTypeName foundSubTypeName来找对应的index的
       */
      setTypeName(typeName, foundSubTypeName) {
        const foundByTypeName = this.dOptions.find(item => {
          return item.typeName === typeName
        })
        let foundIndex = -1
        this.activeData.forEach((item, index) => {
          if(item.categoryList.indexOf(foundSubTypeName) > -1) {
            foundIndex = index
          }
        })
        if(foundByTypeName) {
          this.selectSubTypeName = foundByTypeName.value
          this.onItemTypeListChange(foundByTypeName.value, false)
          this.toggleActive(foundIndex, true)
        } else {
          if(typeName === null) {
            this.selectSubTypeName = '-1'
            this.onItemTypeListChange(-1, false)
            this.toggleActive('-1', true)
          }
        }
      },
      onToggleActiveClick(index) {
        this.activeIndex = index
        this.$emit('toggle-active-click', index, this.activeData)
      },
      onItemTypeListClick(newValue) {
        this.$emit('item-type-list-Click', newValue, this.activeData)
      },
      onItemTypeListChange(newValue, update = true) {
        this.$emit('item-type-list-change', newValue, update)
      },
      // handleNewTypeName(newValue) {
      //   this.$emit('new-type-name', newValue)
      // },
      toggleActive(index, update = true) {
        this.activeIndex = index
        this.$emit('toggle-active', index, this.activeData, update)
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
      async getOverview(onlyUpdateActiveData = false) {
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
        this.updateActiveData(onlyUpdateActiveData)
        this.$emit('set-num', totalNum)
        this.getAekoTodoCount()
      },
      updateActiveDataByTypeName(typeName) {
        let activeData = []
        let findDataByTypeName = null
        if(typeName) {
          const data = _.cloneDeep(this.data)
          findDataByTypeName = data.find(e => {
            return e.typeName === typeName
          })
        }
        if(findDataByTypeName) {
          this.activeData = findDataByTypeName.wfCategoryList
        } else {
          this.activeData = activeData
        }
        return this.activeData
      },
      /**
       * 这个是那一堆tag过滤之后的值，根据this.subTypeName
       * 返回的wfCategoryList
       */
      updateActiveData(onlyUpdateActiveData = false) {
        let activeData = []
        let foundBySubTypeName = null
        let findDataByTypeName = null
        if(this.subTypeName) {
          const data = _.cloneDeep(this.data)
          findDataByTypeName = data.find(e => {
            e.wfCategoryList.forEach((wf) => {
              if(wf.categoryList && wf.categoryList.indexOf(this.subTypeName) > -1) {
                foundBySubTypeName = e
              }
            })
            return foundBySubTypeName
          })
          if(findDataByTypeName) {
            activeData = findDataByTypeName.wfCategoryList
          }
        }
        this.activeData = activeData
        if(!onlyUpdateActiveData) {
          // debugger
          this.$nextTick(() => {
            if(findDataByTypeName) {
              this.setTypeName(findDataByTypeName.typeName, this.oriSubTypeName)
            } else {
              this.setTypeName(this.subTypeName, this.oriSubTypeName)
            }
          })
        }
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
  .panel-category {
    display: flex;
    flex-wrap: wrap;
    font-size: 16px;
    margin: 10px 0px;

    .all {
      margin-right: 30px;
    }
    .list {
      display: flex;
      flex-wrap: wrap;
      .item {
        margin: 10px 30px 10px 0px;
        padding-left: 20px;
        color: #909091;
        position: relative;
        cursor: pointer;
        position: relative;
        &::before {
          position: absolute;
          left: 0;
          top: 0;
          content: '';
          display: block;
          width: 19px;
          height: 100%;
          background: transparent;
          background-size: contain;
        }
        &.active {
          color: #1763f7;
          font-weight: bold;
          &::before {
            background: url(~@/assets/images/tab-active-left.png) left center
            no-repeat;
            background-size: contain;
          }
        }
        .badge {
          min-width: 20px;
          height: 20px;
          line-height: 20px;
          background: #e30d0d;
          border-radius: 50%;
          color: #fff;
          text-align: center;
          font-size: 12px;
          display: block;
          position: absolute;
          top: -10px;
          right: -20px;
          display: block;
          &.large {
            padding: 0px 5px;
            border-radius: 10px;
            right: -30px;
          }
        }
      }
      .divider {
        width: 5px;
        height: 17px;
        /* background: #1763f7; */
        opacity: 1;
        border-radius: 10px;
        margin: 11px 10px 0px -10px;
      }
    }
    .item-type-select {
      width: 200px !important;
      max-width: 200px !important;
      margin-right: 20px;
    }
  }
</style>
