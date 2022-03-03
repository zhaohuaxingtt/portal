<template>
  <iPage>
    <pageHeader>{{ $t('LK_RENWUZHONGXIN') }}</pageHeader>
    <div v-loading="loading">
      <panelCategory
        :data="titles"
        @toggle-active="toggleActive"
        :active-index.sync="activeIndex"
      />
      <iSearch class="margin-bottom20" @sure="search" @reset="reset" icon>
        <el-form @submit.native.prevent>
          <iFormItem :label="$t('LK_CHANGJIANGMINGCHNEG')">
            <iInput
              :placeholder="$t('LK_QINGSHURU')"
              @keyup.enter.native="search"
              @input="inputChange"
              v-model.trim="formData.category"
            />
          </iFormItem>
        </el-form>
      </iSearch>
      <div v-for="(value, name) in activeData" :key="name">
        <div class="category-name">
          {{ name }}
        </div>

        <div class="category-content" v-if="value">
          <overview
            v-for="(subItem, i) in value"
            :key="i"
            :data="subItem"
            :category-name="name"
            @open="openListPage(subItem.todayLink)"
          />
        </div>
      </div>
    </div>
  </iPage>
</template>

<script>
import pageHeader from '@/components/pageHeader'
import overview from './components/overview'
import { iPage, iSearch, iFormItem, iInput } from 'rise'
import panelCategory from '@/components/common/panelCategory'
import { fetchTaskCenter } from '@/api/duty'
import { openUrl } from '@/utils/index'
export default {
  components: {
    pageHeader,
    iPage,
    iSearch,
    iFormItem,
    iInput,
    panelCategory,
    overview
  },
  data() {
    return {
      loading: false,
      formData: {
        category: ''
      },
      activeIndex: -1,
      data: [],
      titles: [],
      userTypeRe: this.userType
    }
  },
  computed: {
    userId: function () {
      return this.$store.state.permission.userInfo.id
    },
    userType: function () {
      return this.$store.state.permission.userInfo.userType
      //2是供应商 1是员工
    },
    activeData() {
      if (this.activeIndex === -1) {
        return this.data
      }
      const activeKey = this.titles[this.activeIndex].typeValue
      const res = {}
      res[activeKey] = this.data[activeKey]
      return res
    }
  },
  created() {
    this.activeData = this.data
    this.getOverview()
  },
  methods: {
    toggleActive(index) {
      console.log(typeof index)
      this.activeIndex = index
    },
    openListPage(link) {
      openUrl(link)
    },
    async getOverview() {
      this.loading = true
      const res = await fetchTaskCenter({
        userId: this.userId,
        userTye: this.userType == 1 ? 2 : 1
      }).finally(() => (this.loading = false))
      const data = res || {}
      const titles = Object.keys(data)

      this.data = data
      this.titles = titles.map((e) => {
        return { typeValue: e }
      })
    },
    search() {
      // 搜snaro
      let index = this.titles.findIndex(
        (item) => item.typeValue === this.formData.category
      )
      if (index !== -1) {
        this.activeIndex = index
      } else {
        // 搜taskName
        let categoryName = ''
        for (const key in this.data) {
          if (Object.hasOwnProperty.call(this.data, key)) {
            const element = this.data[key]
            if (element.some((e) => e.taskName === this.formData.category)) {
              categoryName = key
            }
          }
        }
        const i = this.titles.findIndex(
          (item) => item.typeValue === categoryName
        )

        if (i !== -1) {
          this.activeIndex = i
        }
      }
    },
    inputChange(val) {
      if (val.length === 0) {
        this.activeIndex = -1
      }
    },
    reset() {
      this.formData = {
        category: ''
      }
      this.toggleActive(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.category-name {
  color: #0d2451;
  font-size: 20px;
  margin-bottom: 22px;
  font-weight: bold;
}
.category-content {
  display: flex;
  flex-wrap: wrap;
}
</style>
