<!--
 * @Author: your name
 * @Date: 2021-11-09 15:26:24
 * @LastEditTime: 2021-12-03 11:06:50
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-portal\src\views\generalPage\applicationBDL\components\addBdlDialog.vue
-->
<template>
  <i-dialog :title="isMBDL"
            :visible.sync="value"
            width="90%"
            @close="clearDiolog">
    <div class="changeContent">
      <add-bdl-search @getTableList="getTableList" />
      <add-bdl-table @handleSelection='handleSelection'
                     ref="addBdlTable" />
    </div>
  </i-dialog>
</template>

<script>
import { iDialog } from 'rise'
import addBdlSearch from './addBdlSearch'
import addBdlTable from './addBdlTable'
export default {
  components: {
    iDialog,
    addBdlSearch,
    addBdlTable
  },
  props: {
    title: { type: String, default: "添加BDL" },
    value: { type: Boolean }
  },
  created () {
    console.log(this.$route.query.mbdl)
  },
  computed: {
    isMBDL () {
      return this.$route.query.mbdl ? this.title + 'MBDL' : this.title + 'BDL'
    }
  },
  methods: {
    getTableList (form) {
      this.$refs.addBdlTable.getTableList(form, true)
    },
    clearDiolog () {
      this.$emit("input", false);
    },
    handleSelection (e) {
      this.$emit('handleSelection', e)
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