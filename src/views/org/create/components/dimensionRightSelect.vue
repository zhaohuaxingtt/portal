<template>
  <!-- <iSelect
    :placeholder="language('请选择')"
    multiple
    v-model="row.rightSelect"
    filterable
    style="width: 100%"
  >
    <el-option-group>
      <div class="option-all">
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
      </div>
      <el-option
        v-for="item in options"
        :key="item.valueId"
        :label="item.value"
        :value="item.valueId"
      >
      </el-option>
    </el-option-group>
  </iSelect> -->

  <iSelectAll
    v-model="row.rightSelect"
    :options="options"
    valueKey="valueId"
    labelKey="value"
  />
</template>

<script>
import iSelectAll from '@/components/iSelectAll'
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
    iSelectAll
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
      console.log(val)
      if (val) {
        this.row.rightSelect = this.options.map((e) => e.valueId)
      } else {
        this.row.rightSelect = ''
      }
      event.stopPropagation()
    }
  }
}
</script>

<style lang="scss" scoped></style>
