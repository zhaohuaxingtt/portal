<template>
  <div class="types" slot="actions">
    <iTabBadge>
      <iTabBadgeItem
        :badge="$store.state.approval.todoNum"
        :active="taskType === 0"
        :name="language('待审批')"
        @click="tabChange('/bpm/todoList')"
      />
      <iTabBadgeItem
        :active="taskType === 1"
        :name="language('已审批')"
        @click="tabChange('/bpm/finishList')"
      />
    </iTabBadge>
  </div>
</template>

<script>
import { iTabBadge, iTabBadgeItem } from '@/components/iTabBadge'

export default {
  name: 'headerActions',
  components: { iTabBadge, iTabBadgeItem },
  props: {
    todoTotal: {
      type: Number,
      default: 0
    },
    taskType: {
      type: Number,
      default: 0
    },
    searchForm: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  methods: {
    tabChange(path) {
      console.log('this.searchFrom', this.searchForm)
      console.log(this.$route.query);
      // CRW-8311
      // 【CF】审批人界面从[已审批]切换到[待审批]查不到待审批单据
      const query = {}
      if (this.taskType === 0) {//待审批
        query.todoQueryStr = encodeURIComponent(JSON.stringify(this.searchForm))
        if (this.$route.query.doneQueryStr) {
          query.doneQueryStr = this.$route.query.doneQueryStr
        }
        console.log(query);
      }
      if (this.taskType === 1) {//已审批
        try {
          const queryForm = JSON.parse(
            decodeURIComponent(this.$route.query.todoQueryStr)
          )
          console.log(queryForm);

          if (queryForm.categoryList) {
            let modelTemplate = ''
            const { categoryList } = queryForm
            if (categoryList) {
              if (_.isArray(categoryList)) {
                modelTemplate = JSON.stringify(categoryList)
              } else {
                modelTemplate = JSON.stringify([categoryList])
              }
            }
            query.modelTemplate = modelTemplate
          }
        } catch (error) {
          console.log(error)
        }

        query.doneQueryStr = encodeURIComponent(JSON.stringify(this.searchForm))
        if (this.$route.query.todoQueryStr) {
          query.todoQueryStr = this.$route.query.todoQueryStr
        }
        console.log(query)
      }
      // return;
      this.$router.push({
        path,
        query
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.types {
  font-size: 18px;
}

.divider {
  margin: 0px 30px;
}
</style>
