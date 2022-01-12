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
import { getDutyStatistics } from '@/api/duty'

export default {
  name: 'task',
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
      const params = `userId=${this.userInfo.id}&userTye=2`
      this.loading = true
      this.categories = []
      this.data = []
      getDutyStatistics(params)
        .then((res) => {
          const data = res || []
          console.log('task data', data)
          data.forEach((e) => {
            if (e.taskCenterDtoList && e.taskCenterDtoList.length) {
              this.categories.push({
                typeValue: e.taskCenterDtoList[0].taskName
              })
              const dataItem = {
                title: e.taskCenterDtoList[0].taskName,
                data: []
              }
              e.taskCenterDtoList.forEach((task) => {
                dataItem.data.push({
                  ...task,
                  value: task.taskType,
                  label: task.taskTypeName,
                  checked: false
                })
              })
              this.data.push(dataItem)
            }
          })
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
