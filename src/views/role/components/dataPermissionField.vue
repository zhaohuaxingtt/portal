<template>
  <i-table-custom
    :data="[]"
    :columns="columns"
    row-key="id"
    @handle-selection-change="handleSelectionChange"
  />
</template>

<script>
import iTableCustom from '@/components/iTableCustom'
export default {
  name: 'dataPermissionField',
  components: { iTableCustom },
  props: {
    data: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  computed: {
    columns() {
      return this.data.map((e) => {
        return {
          label: e.description
        }
      })
    }
  },
  data() {
    return {
      searchStr: '',
      selectedRow: []
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.selectedRow = val
    }
  }
}
</script>

<style lang="scss" scoped></style>
