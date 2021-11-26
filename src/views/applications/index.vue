<template>
  <iPage class="" v-loading="loading">
    <div class="main">
      <pageHeader> {{ language('应用中心') }} </pageHeader>
      <div class="header">
        <panelCategory
          :data="titles"
          @toggle-active="toggleActive"
          :active-index.sync="activeIndex"
        />
      </div>
      <div class="content">
        <iCard>
          <applicationList
            v-for="(value, name, index) in applications"
            :key="index"
            :applications="value"
            :title="name"
          />
        </iCard>
      </div>
    </div>
  </iPage>
</template>

<script>
import panelCategory from '@/components/common/panelCategory'
import applicationList from './components/applicationList.vue'
import pageHeader from '@/components/pageHeader'
import { iCard, iPage } from 'rise'
import { userApplicationList } from '@/api/applications'
export default {
  components: {
    panelCategory,
    iCard,
    iPage,
    applicationList,
    pageHeader
  },
  data() {
    return {
      dialogFormVisible: false,
      isRead: true,
      detailID: '',
      originapplications: {},
      applications: {},
      titles: [],
      activeIndex: -1
    }
  },
  created() {
    let param = {}
    let type = this.$store.state.permission.userInfo.userType // 1供应商 2员工
    if (type == '2') {
      param = { userId: this.$store.state.permission.userInfo.id }
    }
    userApplicationList(param).then((val) => {
      if (val.code == 200) {
        this.originapplications = val.data
        this.titles = Object.keys(this.originapplications)
          .sort((a, b) => {
            return a > b ? 1 : -1
          })
          .map((item) => {
            return {
              typeValue: item
            }
          })
        this.filterData('')
      }
    })
  },
  methods: {
    toggleActive(index) {
      this.activeIndex = index
      let key = index > -1 ? this.titles[index]['typeValue'] : ''
      this.filterData(key)
    },
    filterData(key) {
      this.applications =
        key.length == 0
          ? { ...this.originapplications }
          : { [key]: this.originapplications[key] }
    }
  }
}
</script>

<style lang="scss" scoped></style>
