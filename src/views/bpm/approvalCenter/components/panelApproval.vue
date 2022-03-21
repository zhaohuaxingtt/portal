<template>
  <div class="approval" v-loading="loading">
    <panelCategory
      :data="data"
      @toggle-active="toggleActive"
      :active-index.sync="activeIndex"
      numVisible
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
          type="APPROVAL"
          :typeName="item.typeName"
          @open="openListPage"
          @set-aeko-num="handleSetAekoNum"
        />
      </div>
    </div>

    <div style="text-align: center" v-show="activeData.length === 0">
      {{ $t('LK_ZANWUSHUJU', '暂无数据') }}
    </div>
  </div>
</template>

<script>
import OverviewPanel from './OverviewPanel.vue'
import panelCategory from '@/components/common/panelCategory'
import { queryApprovalOverview } from '@/api/approval/statistics'
export default {
  name: 'panelApproval',
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
        return this.data
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
      const { data } = await queryApprovalOverview({
        userID: this.$store.state.permission.userInfo.id
      }).finally(() => (this.loading = false))
      this.data = data
      let totalNum = 0
      data.forEach((e) => {
        e.wfCategoryList.forEach((wf) => {
          if (e.typeName !== 'aeko') {
            totalNum += wf.todoNum
          }
        })
      })
      this.$emit('set-num', totalNum)
    },
    handleSetAekoNum(val) {
      const data = this.data
      let totalNum = 0
      data.forEach((e) => {
        e.wfCategoryList.forEach((wf) => {
          if (e.typeName === 'aeko') {
            totalNum += val
          } else {
            totalNum += wf.todoNum
          }
        })
      })
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
