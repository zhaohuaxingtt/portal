<template>
  <div class="organization margin-right20">
    <searchBox :query="query" type="org" />
    <!-- <i-search @sure="sure" @reset="reset" class="margin-bottom20" :icon="true">
      <el-form row="1" :model="queryParams" ref="queryForm">
        <el-form-item :label="'组织机构编码'">
          <i-input
            v-model="queryParams.fullCode"
            placeholder="请输入组织机构编码"
          >
        </el-form-item>
        <el-form-item :label="'组织机构名称'">
          <i-input :placeholder="'请输入组织机构名称'" v-model="queryParams.nameZh" />
        </el-form-item>
      </el-form>
    </i-search> -->
    <orgTable />
  </div>
</template>

<script>
import searchBox from './search.vue'
import orgTable from './orgTable.vue'
import { iSearch } from 'rise'
export default {
  components: { searchBox, orgTable, iSearch },
  computed: {
    query() {
      return this.$store.state.position.org.query
    },
    queryParams() {
      return this.$store.state.position.org.queryParams
    }
  },
  methods: {
    sure() {},
    reset() {}
  }
}
</script>
