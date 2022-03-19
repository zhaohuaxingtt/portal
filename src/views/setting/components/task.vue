<template>
  <div class="task">
    <topHeader
      :data="categories"
      :active="activeIndex"
      @toggle-active="toggleActive"
    />

    <iCard>
      <div class="content" v-loading="loading">
        <div class="action flex-end-center">
          <iButton @click="handleReset">{{ language('重置') }}</iButton>
          <iButton @click="handleSave">{{ language('保存') }}</iButton>
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
import { getFullDutyStatistics } from '@/api/duty'
import { updateModules } from '@/api/home'
export default {
  name: 'task',
  components: { topHeader, topContent, iCard, iButton },
  props: {
    cardData: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
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
      activeIndex: -1,
      staticsticData: []
    }
  },
  methods: {
    query() {
      const params = `userId=${this.userInfo.id}&userTye=2&fullDose=true`
      this.loading = true
      this.categories = []
      this.data = []

      getFullDutyStatistics(params)
        .then((res) => {
          this.staticsticData = res || []
          this.setData()
        })
        .catch((err) => {
          iMessage.error(err.desZh || '获取任务信息失败')
        })
        .finally(() => (this.loading = false))
    },
    setData() {
      const moduleData = JSON.parse(this.cardData?.moduleData || '[]')
      const data = []
      const categories = []
      this.staticsticData.forEach((e) => {
        if (e.taskCenterDtoList && e.taskCenterDtoList.length) {
          categories.push({
            typeValue: e.taskCenterDtoList[0].taskName
          })
          const dataItem = {
            title: e.taskCenterDtoList[0].taskName,
            data: []
          }
          e.taskCenterDtoList.forEach((task) => {
            dataItem.data.push({
              ...task,
              uniqueId: task.taskType + '-' + task.taskTypeName,
              label: task.taskTypeName,
              checked:
                moduleData.find(
                  (md) =>
                    md.taskType === task.taskType &&
                    md.taskTypeName === task.taskTypeName
                ) !== undefined
            })
          })
          data.push(dataItem)
        }
      })
      this.categories = categories
      this.data = data
    },
    toggleActive(val) {
      this.activeIndex = val
    },
    handleSave() {
      const requestData = { ...this.cardData }
      const moduleData = []
      this.data.forEach((e) => {
        e.data.forEach((item) => {
          if (item.checked) {
            moduleData.push(item)
          }
        })
      })
      requestData.moduleData = JSON.stringify(moduleData)
      console.log('requestData', requestData)
      this.loading = true
      updateModules(requestData)
        .then((res) => {
          if (res.result) {
            iMessage.success(res.desZh || '保存成功')
          } else {
            iMessage.error(res.desZh || '保存失败')
          }
        })
        .catch((err) => {
          iMessage.error(err.desZh || '保存失败')
        })
        .finally(() => {
          this.loading = false
        })
    },
    handleReset() {
      this.activeIndex = -1
      this.data.forEach((item) => {
        if (item.data) {
          item.data.forEach((dataItem) => {
            dataItem.checked = false
          })
        }
      })
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
