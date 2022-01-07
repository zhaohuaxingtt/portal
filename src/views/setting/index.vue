<template>
  <iPage>
    <settingHeader :active.sync="tabActive" />
    <div v-if="moduleReady">
      <transition name="el-fade-in-linear">
        <task v-if="tabActive === 'task'" />
        <iAgree v-if="tabActive === 'iAgree'" />
        <favourite v-if="tabActive === 'favourites'" />
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
      moduleReady: false
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
