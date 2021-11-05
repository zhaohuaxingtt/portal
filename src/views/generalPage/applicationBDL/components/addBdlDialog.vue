<template>
  <i-dialog
      :title="title+'BDL'"
      :visible.sync="value"
      width="90%"
      @close="clearDiolog"
  >
    <div class="changeContent">
      <add-bdl-search @getTableList="getTableList"/>
      <add-bdl-table @handleSelection='handleSelection'  ref="addBdlTable"/>
    </div>
  </i-dialog>
</template>

<script>
import {iDialog} from 'rise'
import addBdlSearch from './addBdlSearch'
import addBdlTable from './addBdlTable'
export default {
  components: {
    iDialog,
    addBdlSearch,
    addBdlTable
  },
  props: {
    title: { type: String, default: "添加BDL"},
    value: { type: Boolean }
  },
  
  methods: {
    getTableList(form){
      this.$refs.addBdlTable.getTableList(form)
    },
    clearDiolog() {
      this.$emit("input", false);
    },
    handleSelection(e){
      this.$emit('handleSelection',e)
      this.clearDiolog()
    }
  }
}
</script>

<style scoped lang="scss">
.changeContent {
  padding: 0px 10px 20px 10px;
}
</style>