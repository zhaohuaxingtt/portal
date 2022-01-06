<template>
  <div>
    <bottomItem label="Phone:" text="021 89912" />
    <bottomItem label="Email:" text="zhang.san@csvw.com" />
    <bottomItem label="Role:" text="车型主数据管理员；专业采购员" />
    <bottomItem ref="office" label="Office:" text="IMB2.301" editable />
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
