<template>
  <iSelect
    :placeholder="$t('ORGANIZATION_MANAGERMENT.SELECT_PLACEHOLDER')"
    multiple
    v-model="row.rightSelect"
    @change="handleSelected"
    filterable
    style="width: 100%"
  >
    <el-option
      v-for="item in options"
      :key="item.valueId"
      :label="item.value"
      :value="item.valueId"
    >
    </el-option>
  </iSelect>
</template>

<script>
import { iSelect } from 'rise'
export default {
  props: {
    dimensionRightMenu: {
      type: Array,
      default: function() {
        return []
      }
    },
    upLevelSelectMenu: {
      type: String,
      default: ''
    },
    dimension: {
      type: String,
      default: ''
    },
    row: {
      type: Object,
      require: true
    }
  },
  components: {
    iSelect
  },
  computed: {
    options() {
      return this.row.optionsSelect
    }
  },
  data() {
    return {
      value: ''
    }
  },
  methods: {
    // rightSelectValues
    // handleSelected(value){
    //   this.row.rightSelectValues = this.row.optionsSelect.filter((val) =>{
    //     return value.indexOf(val) > 0;
    //   });
    // }
  }
}
</script>

<style lang="scss" scoped></style>
