<template>
  <div>
    <iSelect v-model="row.targetUnitId">
      <el-option
        v-for="item in selections"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      >
      </el-option>
    </iSelect>
  </div>
</template>

<script>
import { iSelect, iInput } from 'rise'
export default {
  components: { iSelect, iInput },
  props: {
    row: {
      type: Object,
      default: () => {
        return {}
      }
    },
    selections: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      selectItem: ''
    }
  }
}
</script>

<style>
</style>