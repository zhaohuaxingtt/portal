<template>
  <div class="btn-box flex-end-center margin-bottom30">
    <iButton
      :disabled="
        (item.value === 'add' && selectedList.length) ||
          (item.value === 'del' && !selectedList.length) ||
          (item.value === 'edit' && selectedList.length !== 1)
      "
      @click="handleOperate(item.value)"
      v-for="item in operations"
      :key="item.value"
    >
      {{ item.label }}
    </iButton>
  </div>
</template>

<script>
let nono = 1233232343434
import { iButton } from 'rise'
export default {
  components: { iButton },
  props: {
    operations: {
      type: Array
    }
  },
  computed: {
    selectedList() {
      return this.$store.state.infoTemplate.listSelected
    }
  },
  methods: {
    handleOperate(operation) {
      switch (operation) {
        case 'del':
          this.del()
          break
        case 'add':
          this.$router.push({
            path: '/info/infoTemplate/add'
          })
          break
        case 'edit':
          this.$router.push({
            path: '/info/infoTemplate/edit',
            query: {
              id: this.$store.state.infoTemplate.listSelected[0]?.id
            }
          })
          break
        case 'export':
          this.exportTemplate()
          break
      }
    },
    //导出
    exportTemplate() {},
    //删除
    del() {}
  }
}
</script>
