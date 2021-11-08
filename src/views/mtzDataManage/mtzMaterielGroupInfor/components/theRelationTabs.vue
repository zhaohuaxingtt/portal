<template>
  <div class="margin-top20">
    <div class="c-tabs">
      <div
        class="c-tabs-item"
        :class="{ active: actived === 'group' }"
        @click="actived = 'group'"
      >
        MTZ材料组&零件材料组
      </div>
      <div
        class="c-tabs-item"
        :class="{ active: actived === 'six' }"
        @click="actived = 'six'"
      >
        MTZ材料组&零件六位号
      </div>
    </div>
    <div class="margin-top20">
      <theRelationTabsTable
        v-show="actived === 'group'"
        :table-columns="groupColumns"
        :query-type="1"
        ref="groupTable"
      />
      <theRelationTabsTable
        v-show="actived === 'six'"
        :table-columns="sixNoColumns"
        :query-type="2"
        ref="sixTable"
      />
    </div>
  </div>
</template>

<script>
import theRelationTabsTable from './theRelationTabsTable'
import { RELATION_GROUP_COLUMNS, RELATION_SIX_NO_COLUMNS } from './data'
export default {
  name: 'theReleationTable',
  components: { theRelationTabsTable },
  data() {
    return {
      actived: 'group',
      groupColumns: RELATION_GROUP_COLUMNS,
      sixNoColumns: RELATION_SIX_NO_COLUMNS
    }
  },
  methods: {
    search(data) {
      this.$refs.groupTable.search({ ...data })
      this.$refs.sixTable.search({ ...data })
    }
  }
}
</script>

<style lang="scss" scoped>
.c-tabs {
  display: flex;
  border-radius: 10px;
  overflow-y: hidden;

  .c-tabs-item {
    padding: 0px 14px;
    line-height: 35px;
    background: #f5f6f7;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.08);
    cursor: pointer;
  }
  .c-tabs-item.active {
    background: #fff;
    font-weight: bold;
    color: $color-blue;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.08);
  }
}
</style>
