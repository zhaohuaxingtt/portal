<template>
  <div class="iAgree">
    <topHeader :data="categories" @toggle-active="toggleActive" />

    <iCard>
      <div class="content" v-loading="loading">
        <div class="action flex-end-center">
          <iButton @click="reset">{{ language('重置') }}</iButton>
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
import { getApprovalList } from '@/api/home'
import { updateModules } from '@/api/home'
export default {
  name: 'iAgree',
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
      this.loading = true
      this.categories = []
      this.data = []

      getApprovalList({ userID: this.userInfo.id })
        .then((res) => {
          this.staticsticData = res.data || []
          this.setData()
        })
        .catch((err) => {
          iMessage.error(err.desZh || '获取iAgree信息失败')
        })
        .finally(() => (this.loading = false))
    },
    setData() {
      const moduleData = JSON.parse(this.cardData?.moduleData || '[]')
      const data = []
      const categories = []
      this.staticsticData.forEach((e) => {
        categories.push({
          typeValue: e.typeValue
        })

        if (e.wfCategoryList && e.wfCategoryList.length) {
          const dataItem = {
            title: e.typeValue,
            data: []
          }
          e.wfCategoryList.forEach((wfCategory) => {
            dataItem.data.push({
              typeName: e.typeName,
              typeValue: e.typeValue,
              ...wfCategory,
              label: wfCategory.value,
              uniqueId: wfCategory.subType + wfCategory.value,
              checked:
                moduleData.find(
                  (md) =>
                    md.typeValue === e.typeValue &&
                    md.subType === wfCategory.subType
                ) !== undefined
            })
          })
          data.push(dataItem)
        }
      })
      this.data = data
      this.categories = categories
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
      console.log(moduleData)
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
    reset() {
      this.activeIndex = 0
      this.data = []
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
