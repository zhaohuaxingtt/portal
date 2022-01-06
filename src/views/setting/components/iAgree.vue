<template>
  <div class="task">
    <topHeader :data="categories" @toggle-active="toggleActive" />

    <iCard>
      <div class="content" v-loading="loading">
        <div class="action flex-end-center">
          <iButton>重置</iButton>
          <iButton>保存</iButton>
        </div>
        <topContent :data="data" :activeIndex="activeIndex" />
      </div>
    </iCard>
  </div>
</template>

<script>
import topHeader from './topHeader'
import topContent from './topContent'
import { iCard, iMessage, iButton } from 'rise'
import { getApprovalList } from '@/api/home'

export default {
  name: 'settingTask',
  components: { topHeader, topContent, iCard, iButton },
  created() {
    this.query()
  },
  computed: {
    userInfo() {
      return this.$store.state.permission.userInfo
    }
  },
  data() {
    return {
      loading: false,
      data: [],
      categories: [],
      activeIndex: -1
    }
  },
  methods: {
    query() {
      this.loading = true
      this.categories = []
      this.data = []
      getApprovalList({ userID: this.userInfo.id })
        .then((res) => {
          const { data } = res
          if (data) {
            console.log('task data', data)
            data.forEach((e) => {
              this.categories.push({
                typeValue: e.typeValue
              })

              if (e.wfCategoryList && e.wfCategoryList.length) {
                const dataItem = {
                  title: e.typeValue,
                  data: []
                }
                e.wfCategoryList.forEach((task) => {
                  dataItem.data.push({
                    value: task.subType,
                    label: task.value,
                    checked: false
                  })
                })
                this.data.push(dataItem)
              }
            })
          }
        })
        .catch((err) => {
          iMessage.error(err.desZh || '获取任务信息失败')
        })
        .finally(() => (this.loading = false))
    },
    toggleActive(val) {
      this.activeIndex = val
    }
  }
}
</script>

<style lang="scss" scoped>
.action {
  margin-bottom: 30px;
}
.content {
  min-height: 500px;
}
</style>
