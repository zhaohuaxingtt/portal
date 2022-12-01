<template>
  <div class="approval" v-loading="loading">
    <panelCategory
      :data="data"
      @toggle-active="toggleActive"
      :active-index.sync="activeIndex"
      numVisible
      :fileter="true"
    />

    <div v-for="(item, index) in activeData" :key="index">
      <div class="category-name">
        {{ item.typeValue }}
      </div>
      <div class="category-content">
        <overview-panel
          v-for="(subItem, i) in item.wfCategoryList"
          :key="i"
          :data="subItem"
          :category-name="item.typeValue"
          @open="openListPage"
        />
      </div>
    </div>
    <div
      style="text-align: center"
      class="margin-top30"
      v-show="activeData.length === 0"
    >
      {{ language('无进行中的审批项') }}
    </div>
  </div>
</template>

<script>
import OverviewPanel from './OverviewPanel.vue'
import panelCategory from '@/components/common/panelCategory'
import { queryApplyOverview } from '@/api/approval/statistics'
export default {
  name: 'panelApplication',
  components: { OverviewPanel, panelCategory },
  data() {
    return {
      data: [],
      activeIndex: -1,
      loading: false
    }
  },
  computed: {
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
      }

      return [this.data[this.activeIndex]]
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
      console.log('item', item)
      /* this.$router.push({
        name: 'bpmMyAppy',
        query: {
          modelTemplate: JSON.stringify(item.categoryList)
        }
      }) */
      if (item.cardUrl) {
        window.open(item.cardUrl)
      } else if (item.subType === 'aeko_approval') {
        this.$router.push({
          name: 'bpmMyAppyAeko'
        })
      } else {
        this.$router.push({
          name: 'bpmMyAppy',
          query: {
            modelTemplate: JSON.stringify(item.categoryList)
          }
        })
      }
    },
    async getOverview() {
      this.loading = true
      const { data = [] } = await queryApplyOverview({
        userID: this.$store.state.permission.userInfo.id
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
  min-height: 180px;
}
.category-name {
  color: #0d2451;
  font-size: 20px;
  margin-bottom: 22px;
  font-weight: bold;
}
.approval {
  min-height: 600px;
}
</style>
