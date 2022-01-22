<template>
  <iCard>
    <div v-loading="loading">
      <div class="action flex-end-center">
        <iButton @click="handleReset">重置</iButton>
        <iButton @click="handleSave">保存</iButton>
      </div>
      <h4 class="t">系统名称</h4>
      <div class="applications">
        <el-row>
          <el-col :span="6" v-for="item in applicaions" :key="item.id">
            <div class="application-item">
              <el-checkbox v-model="item.checked" class="checkbox">
                {{ locale === 'en' ? item.appNameEn : item.appNameCn }}
              </el-checkbox>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </iCard>
</template>

<script>
import { iCard, iButton, iMessage } from 'rise'
import { userApplicationList } from '@/api/applications'
import { saveFavoriteApplications } from '@/api/setting'
export default {
  name: 'favouriteOther',
  components: { iCard, iButton },
  props: {
    favorites: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  watch: {
    favorites() {
      this.getFavorites()
    }
  },
  data() {
    return {
      applicaions: [],
      loading: false,
      originApplications: [],
      appFavorites: []
    }
  },
  computed: {
    locale() {
      return this.$i18n.locale
    }
  },
  created() {
    this.getFavorites()
  },
  methods: {
    getFavorites() {
      this.appFavorites = this.favorites.filter((e) => e.objType === 2)
      console.log('appFavorites', this.appFavorites)
      console.log('favorites', this.favorites)
      this.queryUserApplications()
    },
    queryUserApplications() {
      const requestData = {
        systemType: 3,
        sortType: 2
      }
      this.loading = true
      this.applicaions = []
      userApplicationList(requestData)
        .then((res) => {
          if (res.code == 200) {
            const data = res.data || {}
            const applications = []
            for (const key in data) {
              if (Object.hasOwnProperty.call(data, key)) {
                const applicationItems = data[key] || []
                applicationItems.forEach((app) => {
                  const checked = this.appFavorites.find(
                    (e) => e.objId === app.id
                  )
                  applications.push({ ...app, checked: checked && true })
                })
              }
            }
            this.applicaions = applications
            this.originApplications = _.cloneDeep(applications)
          } else {
            iMessage.error(res.desZh || '获取应用信息失败')
          }
        })
        .catch((err) => {
          iMessage.error(err.desZh || '获取应用信息失败')
        })
        .finally(() => {
          this.loading = false
        })
    },
    handleSave() {
      const data = this.applicaions.filter((e) => e.checked)
      this.loading = true
      saveFavoriteApplications(data)
        .then((res) => {
          if (res && res.result) {
            this.originApplications = _.cloneDeep(data)
            iMessage.success(res.desZh || '收藏成功')
          } else {
            iMessage.success(res.desZh || '收藏失败')
          }
        })
        .catch((err) => {
          iMessage.success(err.desZh || '收藏失败')
        })
        .finally(() => {
          this.loading = false
        })
    },
    handleReset() {
      this.applicaions = _.cloneDeep(this.originApplications)
    }
  }
}
</script>

<style lang="scss" scoped>
.action {
  padding-bottom: 30px;
  border-bottom: solid 1px rgba(112, 112, 112, 0.15);
}
.t {
  font-size: 16px;
  margin: 30px 0px;
}
.applications {
  .application-item {
    margin-bottom: 10px;

    width: 90%;
    .checkbox {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      ::v-deep .el-checkbox__label {
        display: inline;
      }
    }
  }
}
</style>
