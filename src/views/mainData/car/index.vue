<template>
  <div class="page-car-project">
    <filterPanel class="margin-bottom20" @search="search" />
    <carList class="table" :filter-form="filterForm" />
  </div>
</template>

<script>
import { filterPanel, carList } from './components'
import { DEFAULT_SEARCH_FORM_DATA } from './components/data'
export default {
  name: 'mainDataCar',
  components: { filterPanel, carList },
  data() {
    return {
      filterForm: { ...DEFAULT_SEARCH_FORM_DATA }
    }
  },
  methods: {
    search(val) {
      this.filterForm = { ...val }
    }
  }
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
