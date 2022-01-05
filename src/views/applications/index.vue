<template>
  <iPage>
    <div class="applications-container" v-loading="loading">
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
  computed: {
    isEn() {
      return this.locale === 'en'
    },
    locale() {
      return this.$i18n.locale
    }
  },
  watch: {
    locale() {
      this.getApplications()
    }
  },
  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      isRead: true,
      detailID: '',
      originapplications: {},
      applications: {},
      titles: [],
      activeIndex: -1,
      applicationCache: {}
    }
  },
  created() {
    this.getApplications()
  },
  methods: {
    getApplications() {
      this.activeIndex = -1
      if (this.applicationCache[this.locale]) {
        this.initData(this.applicationCache[this.locale])
      } else {
        const requestData = {
          systemType: 3,
          sortType: this.locale == 'zh' ? 1 : 2
        }
        this.loading = true
        userApplicationList(requestData)
          .then((val) => {
            if (val.code == 200) {
              this.applicationCache[this.locale] = _.cloneDeep(val.data)
              this.initData(val.data)
            }
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
    initData(data) {
      //  this.originapplications = _.cloneDeep(data)
      console.log(
        'this.originapplications',
        Object.keys(this.originapplications)
      )
      this.titles = Object.keys(data)
        .sort((a, b) => {
          return a > b ? 1 : -1
        })
        .map((item) => {
          return {
            typeValue: item
          }
        })
      const sortApplications = {}
      this.titles.forEach((e) => {
        sortApplications[e.typeValue] = data[e.typeValue]
      })
      this.originapplications = sortApplications
      this.filterData('')
    },
    toggleActive(index) {
      this.activeIndex = index
      let key = index > -1 ? this.titles[index]['typeValue'] : ''
      this.filterData(key)
    },
    filterData(key) {
      this.applications =
        key.length === 0
          ? { ...this.originapplications }
          : { [key]: this.originapplications[key] }
    }
  }
}
</script>

<style lang="scss" scoped>
.applications-container {
  min-height: 500px;
}
</style>
