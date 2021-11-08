<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-21 10:18:28
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <div>
    <supplierMessage class="margin-bottom20"/>
    <supplierAddMaterialsTable/>
  </div>
</template>

<script>
import supplierAddMaterialsTable from "./components/supplierAddMaterialsTable";
import {tabRouterList} from '../data';
import supplierMessage from './newSupplierRating1/components/supplierMessage'

export default {
  components: {
    supplierAddMaterialsTable,
    supplierMessage
  },
  data() {
    return {
      tabRouterList,
    };
  },
  methods: {
    getTableList(otherParams) {

    },
  },
};
</script>

<style scoped>

</style>
