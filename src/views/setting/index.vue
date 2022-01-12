<template>
  <iPage>
    <settingHeader :active.sync="tabActive" />
    <div v-if="moduleReady">
      <transition name="el-fade-in-linear">
        <task v-show="tabActive === 'task'" :module-data="moduleTaskData" />
      </transition>
      <transition name="el-fade-in-linear">
        <iAgree
          v-show="tabActive === 'iAgree'"
          :module-data="moudleiAgreeData"
        />
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
      moduleTaskData: {},
      moudleiAgreeData: {}
    }
  },
  created() {
    this.queryModelData()
  },
  methods: {
    queryModelData() {
      getModuleList({})
        .then((res) => {
          if (res.code === '200' && res.data) {
            this.moduleData = res.data
            this.moduleTaskData =
              res.data.find((e) => e.permissionKey === 'HOME_MODULE_TASK') || {}
            this.moudleiAgreeData =
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
    }
  }
}
</script>

<style lang="scss" scoped></style>
