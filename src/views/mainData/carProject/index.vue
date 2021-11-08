<template>
  <div class="page-car-project">
    <filterPanel class="margin-bottom20" @search="getFilterFormData" />
    <carProjectList class="table" :filterForm="filterForm" />
  </div>
</template>

<script>
import { filterPanel, carProjectList } from './components'
export default {
  name: 'carProject',
  methods: {
    getFilterFormData(data) {

      console.log("Data ===",data)
      this.filterForm = {...data}
    }
  },
  data() {
    return {
      filterForm: {}
    }
  },
  components: { filterPanel, carProjectList }
}
</script>

<style lang="scss" scoped>
.page-car-project {
  display: flex;
  height: 100%;
  flex-direction: column;
  .table {
    flex-grow: 1;
  }
}
</style>
