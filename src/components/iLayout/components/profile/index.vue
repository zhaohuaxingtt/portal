<template>
  <iDialog
    :visible.sync="isShow"
    @close="onClose"
    width="800px"
    min-height="400px"
    append-to-body
  >
    <div v-loading="loading">
      <profileHeader :loading.sync="loading" />
      <middle />
      <bottom ref="bottom" :loading.sync="loading" />
    </div>
    <div slot="footer">
      <iButton @click="isShow = false">确定</iButton>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iMessage } from 'rise'
import { profileHeader, middle, bottom } from './components'
import { updateUserInfo } from '../../api'
export default {
  name: 'UserProfile',
  components: { iDialog, profileHeader, middle, bottom, iButton },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  provide() {
    return {
      updateUser: this.handleUpdate
    }
  },
  data() {
    return {
      isShow: false,
      loading: false
    }
  },
  computed: {
    userInfo() {
      return this.$store.state?.permission?.userInfo || {}
    }
  },
  watch: {
    visible(val) {
      this.isShow = val
    }
  },
  created() {
    this.isShow = this.visible
  },
  methods: {
    onClose() {
      this.$refs.bottom.setReadonly()
      this.$emit('update:visible', false)
    },
    handleUpdate(data) {
      if (data) {
        const requestData = Object.assign(this.userInfo, data)
        this.loading = true
        updateUserInfo(requestData)
          .then((res) => {
            if (res.result) {
              const keys = Object.keys(data)
              this.userInfo[keys[0]] = data[keys[0]]
              window.sessionStorage.setItem(
                'userInfo',
                JSON.stringify(this.userInfo)
              )
              this.$$store.commit('SET_USER_INFO', this.userInfo)
              this.$refs.bottom.setReadonly()
              iMessage.success(res.desZh || '更新成功')
            } else {
              iMessage.error(res.desZh || '更新失败')
            }
          })
          .catch((err) => {
            iMessage.error(err.desZh || '更新失败')
          })
          .finally(() => (this.loading = false))
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
