<template>
  <iPage>
    <settingHeader :active.sync="tabActive" />
    <div class="setting-container" v-if="moduleReady" v-loading="loading">
      <transition name="el-fade-in-linear">
        <task v-show="tabActive === 'task'" :card-data="cardTaskData" />
      </transition>
      <transition name="el-fade-in-linear">
        <iAgree v-show="tabActive === 'iAgree'" :card-data="cardiAgreeData" />
      </transition>
      <transition name="el-fade-in-linear">
        <favourite v-show="tabActive === 'favourites'" />
      </transition>
    </div>
  </iPage>
</template>

<script>
import { iPage, iMessage } from 'rise'
import { getModuleList } from '@/api/home'
import { settingHeader, task, iAgree, favourite } from './components'
export default {
  name: 'setting',
  components: { iPage, settingHeader, task, iAgree, favourite },
  data() {
    return {
      tabActive: 'task',
      moduleData: [],
      moduleReady: false,
      cardTaskData: {},
      cardiAgreeData: {},
      loading: false
    }
  },
  created() {
    this.queryModelData()
    if (this.$route.query.module) {
      this.tabActive = this.$route.query.module
    }
  },
  methods: {
    queryModelData() {
      this.loading = true
      getModuleList({})
        .then((res) => {
          if (res.code === '200' && res.data) {
            this.moduleData = res.data
            this.cardTaskData =
              res.data.find((e) => e.permissionKey === 'HOME_MODULE_TASK') || {}
            this.cardiAgreeData =
              res.data.find((e) => e.permissionKey === 'HOME_MODULE_APPROVE') ||
              {}

            this.moduleReady = true
          } else {
            iMessage.error(res.desZh || '获取模块信息失败')
          }
        })
        .catch((err) => {
          iMessage.error(err.desZh || '获取模块信息失败')
        })
        .finally(() => (this.loading = false))
    }
  }
}
</script>

<style lang="scss" scoped>
.setting-container {
  min-height: 600px;
}
</style>
