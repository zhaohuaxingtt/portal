<template>
  <div>
    <bottomItem label="Phone:" :text="userInfo.phone || userInfo.mobile" />
    <bottomItem label="Email:" :text="userInfo.email" />
    <bottomItem label="Role:" :text="role" />
    <bottomItem
      ref="office"
      label="Office:"
      :text="user.officeLocal"
      editable
    />
    <bottomItem
      ref="mobile"
      label="Mobile Phone:"
      text="15422309960"
      editable
    />
    <bottomItem ref="wechat" label="Wechat :" text="0809_zhangsan" editable />
  </div>
</template>

<script>
import bottomItem from './bottomItem'
export default {
  name: 'bottom',
  components: { bottomItem },
  computed: {
    userInfo() {
      return this.$store.state.permission.userInfo || {}
    },
    role() {
      if (this.userInfo && this.userInfo.roleList) {
        return this.userInfo.roleList.map((e) => e.fullNameZh).join(',')
      }
      return ''
    }
  },
  methods: {
    setEdit() {
      this.$refs.office.handleSetEdit(false)
      this.$refs.mobile.handleSetEdit(false)
      this.$refs.wechat.handleSetEdit(false)
    }
  }
}
</script>

<style lang="scss" scoped></style>
