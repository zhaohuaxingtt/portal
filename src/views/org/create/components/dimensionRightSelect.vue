<template>
  <iSelect
    :placeholder="language('请选择')"
    multiple
    v-model="row.rightSelect"
    filterable
    style="width: 100%"
  >
    <!-- <el-option value="">
      <el-Button
        size="mini"
        plain
        @click.native="(event) => checkAll(true, event)"
      >
        全选
      </el-Button>
      <el-Button
        size="mini"
        plain
        @click.native="(event) => checkAll(false, event)"
      >
        全不选
      </el-Button>
    </el-option> -->
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
      default: function () {
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
    checkAll(val, event) {
      console.log(val, event)
      if (val) {
        this.row.rightSelect = this.options.map((e) => e.valueId)
      } else {
        this.row.rightSelect = []
      }
      event.stopPropagation()
    }
  }
}
</script>

<style lang="scss" scoped></style>
