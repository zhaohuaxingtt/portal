<template>
  <div v-loading="loading">
    <search @confirmSearch="confirmSearch" :moduleList="moduleList" />
    <searchTable ref='searchTable' :type='type' :moduleList="moduleList"/>
  </div>
</template>

<script>
import Search from './search';
import SearchTable from './searchTable';
import {queryModuleBySource} from "@/api/assistant"
import assistant_mixin from "./../../../mixins"

export default {
  name: 'problemStatementPanel',
  mixins: [assistant_mixin],
  props: {
    type: {
      type: Number,
      default: 1
    }
  }, 
  data () {
    return {
      loading: false,
      moduleList:[]
    }
  },
  created() {
    this.queryModuleBySource()
  },
  methods: {
    async queryModuleBySource(){
      try {
        this.loading = true
        let res = await queryModuleBySource(this.getUserType())
        this.moduleList = res.data
      } finally {
        this.loading = false
      }
    },
    confirmSearch(formData) {
      this.$refs.searchTable.search(formData)
    },
  },
  mounted() {
   
  },
  components: {
    Search,
    SearchTable,
  }
}
</script>

<style>

</style>