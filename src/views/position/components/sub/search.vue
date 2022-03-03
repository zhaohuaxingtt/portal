<template>
  <i-search @sure="sure" @reset="reset" class="margin-bottom20">
    <el-form row="1" :model="query" ref="queryForm">
      <el-form-item :label="language('材料组')">
        <i-input :placeholder="language('请输入材料组')" v-model="query.categoryName" />
      </el-form-item>
      <el-form-item :label="language('人员名称')">
        <i-input :placeholder="language('请输入人员名称')" v-model="query.userNameZh" />
      </el-form-item>
      <el-form-item :label="language('岗位名称')">
        <i-input :placeholder="language('请输入岗位名称')" v-model="query.fullNameZh" />
      </el-form-item>
    </el-form>
  </i-search>
</template>

<script>
import { iInput, iSearch } from 'rise'
export default {
  components: { iInput, iSearch },
  props: {
    positionId: {
      type: String
    },
    deptId: {
      type: String
    }
  },
  computed: {
    query() {
      return this.$store.state.subPosition.query
    }
  },
  methods: {
    sure() {
      this.$store.commit('SET_SUB_QUERY', this.query)
      this.$store.dispatch('GetSubPosition', {
        positionId: this.positionId,
        deptId: this.deptId
      })
    },
    reset() {
      this.$store.commit('RESET_SUB_QUERY', this.query)
      this.$store.dispatch('GetSubPosition', {
        positionId: this.positionId,
        deptId: this.deptId
      })
    }
  }
}
</script>
