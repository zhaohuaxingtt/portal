<template>
  <i-selector-dialog
  :title="'供应商s选择'"
  :show.sync="dialogVisible"
  @change="closeVisible"
  >

  </i-selector-dialog>
</template>
<script>
import ISelectorDialog from '@/components/iSelector/iSelectorDialog.vue'
export default {
  components: {ISelectorDialog},  
  props: {
    dialogVisible: {
      type: Boolean,
      default:false
    }
  },
  methods:{
    closeVisible() {
       this.$emit('changeVisible', false)
    }
  }
}
</script>
<style>
</style>