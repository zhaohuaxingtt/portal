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

        <!--  <panelCategory
          :data="titlesEn"
          @toggle-active="toggleActiveEn"
          :active-index.sync="activeIndexEn"
          v-show="isEn"
        /> -->
      </div>
      <div class="content">
        <iCard>
          <applicationList
            v-for="(value, name, index) in applications"
            :key="index"
            :applications="value"
            :title="name"
          />

          <!-- <applicationList
            v-for="(value, name, index) in applicationsEn"
            :key="index"
            :applications="value"
            :title="name"
            v-show="isEn"
          /> -->
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
      return this.$i18n.locale === 'en'
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      isRead: true,
      detailID: '',
      originapplications: {},
      applications: {},
      titles: [],
      activeIndex: -1,
      // en
      titlesEn: [],
      activeIndexEn: -1,
      applicationsEn: [],
      originapplicationsEn: {}
    }
  },
  created() {
    const requestData = { systemType: 3 }
    userApplicationList(requestData).then((val) => {
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

        // this.getApplicationsEn(val.data || [])
      }
    })
  },
  methods: {
    getApplicationsEn(data) {
      console.log('data', data)
      const allApplicaions = []
      let titleEn = []
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          const element = data[key]
          if (element) {
            allApplicaions.push(...element)
          }
        }
      }
      console.log('allApplicaions', allApplicaions)

      const applicationsEn = {}
      allApplicaions.forEach((e) => {
        if (e && e.appNameEn && e.appNameEn.length > 1) {
          const key = e.appNameEn.substring(0, 1).toUpperCase()
          console.log('key', key)
          if (!titleEn.includes(key)) {
            titleEn.push(key)
          }
        }
      })

      titleEn = titleEn
        .sort((a, b) => {
          return a > b ? 1 : -1
        })
        .map((item) => {
          return {
            typeValue: item
          }
        })
      console.log('titleEn', titleEn)
      titleEn.forEach((e) => (applicationsEn[e.typeValue] = []))

      for (const key in applicationsEn) {
        if (Object.hasOwnProperty.call(applicationsEn, key)) {
          const element = applicationsEn[key]
          const apps = allApplicaions.filter(
            (e) => e.appNameEn.toUpperCase().indexOf(key) === 0
          )
          element.push(...apps)
        }
      }

      this.titlesEn = titleEn

      this.applicationsEn = applicationsEn

      this.originapplicationsEn = _.cloneDeep(applicationsEn)
    },
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
    },

    toggleActiveEn(index) {
      this.activeIndexEn = index
      let key = index > -1 ? this.titlesEn[index]['typeValue'] : ''
      this.filterDataEn(key)
    },
    filterDataEn(key) {
      this.applicationsEn =
        key.length == 0
          ? { ...this.originapplicationsEn }
          : { [key]: this.originapplicationsEn[key] }
    }
  }
}
</script>

<style lang="scss" scoped></style>
