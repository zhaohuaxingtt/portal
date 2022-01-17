<template>
  <i-table-custom
    row-key="id"
    :height="tableHeight"
    ref="functionMenu"
    :loading="queryFavouritedLoading"
    :data="tableData"
    :columns="tableColumns"
    :border="false"
    :extraData="extraData"
  />
</template>

<script>
import iTableCustom from '@/components/iTableCustom'
import { COLUMNS_FAVOURITE_MENU } from './data'
export default {
  name: 'favouriteRiseMenuHas',
  components: { iTableCustom },
  inject: ['queryFavouritedLoading'],
  props: {
    filterStr: {
      type: String,
      default: ''
    },
    favourites: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  computed: {
    tableHeight() {
      const bodyHeight = document.body.clientHeight
      if (bodyHeight) {
        return bodyHeight - 230 + 'px'
      }
      return '500px'
    },
    tableData() {
      if (this.filterStr) {
        return this.favourites.filter((e) =>
          e.objName.toLowerCase().includes(this.filterStr.toLowerCase())
        )
      }
      return this.favourites
    }
  },
  data() {
    return {
      tableColumns: COLUMNS_FAVOURITE_MENU,
      extraData: {
        handleFavorite: this.handleFavorite
      }
    }
  },
  methods: {
    handleFavorite(row) {
      this.$emit('save', row)
    }
  }
}
</script>

<style lang="scss" scoped></style>
