<template>
  <i-table-custom
    row-key="id"
    :height="tableHeight"
    ref="functionMenu"
    :loading="tableLoading"
    :data="tableData"
    :columns="tableColumns"
    :border="false"
  />
</template>

<script>
import iTableCustom from '@/components/iTableCustom'
import { COLUMNS_FAVOURITE_MENU } from './data'
export default {
  name: 'favouriteRiseMenuHas',
  components: { iTableCustom },
  computed: {
    tableHeight() {
      const bodyHeight = document.body.clientHeight
      if (bodyHeight) {
        return bodyHeight - 230 + 'px'
      }
      return '500px'
    }
  },
  data() {
    return {
      tableData: [],
      tableColumns: COLUMNS_FAVOURITE_MENU,
      tableLoading: false
    }
  }
}
</script>

<style lang="scss" scoped></style>
