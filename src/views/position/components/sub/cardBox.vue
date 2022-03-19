<template>
  <div class="card-list" v-loading="loading">
    <position-card
      class="margin-bottom20"
      v-for="item in subPositionList"
      :key="item.id"
      :item="item"
      :deptId="deptId"
      :dimensionOptions="dimensionOptions"
      :permissionList="item.permissionList || []"
    ></position-card>
  </div>
</template>

<script>
import positionCard from './positionCard'
import { GetPositionPermissionList } from '@/api/position'
export default {
  components: { positionCard },
  props: {
    deptId: {
      type: Number
    }
  },
  computed: {
    subPositionList() {
      return this.$store.state.subPosition.subPositionList
    },
    loading() {
      return this.$store.state.subPosition.getSubPositionLoading
    },
    leftDimenstionOptions() {
      const options = [...this.dimensionOptions]
      const optionIds = options.map((e) => e.id)
      this.subPositionList.forEach((element) => {
        if (!options.find((e) => optionIds.includes(e.id))) {
          options.push(element)
        }
      })
      return options
    }
  },
  data() {
    return {
      dimensionOptions: []
    }
  },
  created() {
    this.queryDimensionOptions()
  },
  methods: {
    queryDimensionOptions() {
      GetPositionPermissionList({ deptId: this.deptId }).then((res) => {
        if (res.result) {
          const data = res.data || []
          const noRepetData = []
          data.forEach((e) => {
            const item = { ...e }
            const oldValueList = item.valueList || []
            const valueList = []
            oldValueList.forEach((ovl) => {
              if (
                valueList.filter((vl) => vl.valueId === ovl.valueId).length ===
                0
              ) {
                valueList.push({ ...ovl })
              }
            })
            item.valueList = valueList
            noRepetData.push(item)
          })
          this.dimensionOptions = noRepetData
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.card-list {
  min-height: 200px;
}
</style>
