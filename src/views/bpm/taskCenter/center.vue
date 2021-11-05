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
      <!-- <div v-for="(item, index) in activeData" :key="index">
        <div class="category-name">
          {{ item.typeValue }}
        </div>
        <div class="category-content">
          <overview
            v-for="(subItem, i) in item.wfCategoryList"
            :key="i"
            :data="subItem"
            :category-name="item.typeValue"
            @open="openListPage(data)"
          />
        </div>
      </div> -->
      <div v-for="(item, index) in activeData" :key="index">
        <div class="category-name">
          {{
            item.taskCenterDtoList.length
              ? item.taskCenterDtoList[0]['taskName']
              : ''
          }}
        </div>
        <div class="category-content">
          <overview
            v-for="(subItem, i) in item.taskCenterDtoList"
            :key="i"
            :data="subItem"
            :category-name="subItem['taskName']"
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
import { getDutyStatistics } from '@/api/duty'
import { openUrl } from '@/utils/index'
// import func from 'vue-editor-bridge'
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
    userID: function() {
      return this.$store.state.permission.userInfo.id
    },
    userType: function() {
      return this.$store.state.permission.userInfo.userType
      //2是供应商 1是员工
    },
    activeData() {
      if (this.activeIndex === -1) {
        return this.data
      }
      return [this.data[this.activeIndex]]
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
      // this.$router.push({
      //   name: 'TaskList',
      //   params: { category: data.category }
      // })
      openUrl(link)
    },
    async getOverview() {
      this.loading = true
      // let params = Object.assign(
      //   {
      //     userID: this.userID
      //   },
      //   // this.formData
      // )
      // userType:1 供应商 :2 员工
      this.userType == 1 ? (this.userTypeRe = 2) : (this.userTypeRe = 1)
      let params = `userId=${this.userID}&userTye=${this.userTypeRe}`
      const data = await getDutyStatistics(params).finally(
        () => (this.loading = false)
      )
      console.log('data', data)
      this.data = data
      const titles = []
      data.forEach(item => {
        item.taskCenterDtoList.forEach(e => {
          if (!titles.includes(e.taskName)) {
            titles.push({ typeValue: e.taskName })
          }
        })
      })
      this.titles = titles
    },
    search() {
      let index = this.titles.findIndex(
        item => item.typeValue === this.formData.category
      )
      if (index !== -1) {
        this.activeIndex = index
      }
    },
    inputChange(val) {
      console.log('inputChange', val)
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
