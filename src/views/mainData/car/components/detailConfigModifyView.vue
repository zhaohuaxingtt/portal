<template>
  <el-table :data="data" v-loading="loading">
    <el-table-column
      type="index"
      header-align="center"
      align="center"
      :label="language('序号')"
    />
    <el-table-column
      :label="language('配置ID')"
      prop="id"
      header-align="center"
      align="center"
    />
    <el-table-column
      :label="language('车型编号')"
      prop="cartypeCode"
      header-align="center"
      align="center"
    />
    <el-table-column
      :label="language('发动机类型')"
      prop="engineType"
      header-align="center"
      align="center"
      show-overflow-tooltip
    >
      <template slot-scope="scope">
        {{ scope.row.engineType }}
      </template>
    </el-table-column>
    <el-table-column
      :label="language('变速箱型号')"
      prop="gearboxName"
      header-align="center"
      align="center"
      show-overflow-tooltip
    >
      <template slot-scope="scope">
        {{ scope.row.gearboxName }}
      </template>
    </el-table-column>
    <el-table-column
      :label="language('电池容量')"
      prop="batteryCapacity"
      header-align="center"
      align="center"
      show-overflow-tooltip
    >
      <template slot-scope="scope">
        {{ scope.row.batteryCapacity }}
      </template>
    </el-table-column>
    <el-table-column
      :label="language('其它配置')"
      prop="otherConf"
      header-align="center"
      align="center"
    />
    <el-table-column
      :label="language('车型等级')"
      prop="cartypeLevel"
      header-align="center"
      align="center"
    >
      <el-table-column
        v-for="field in cartypeLevels"
        :label="field"
        :key="field"
        :prop="field"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          {{
            scope.row.cartypeLevel === field
              ? scope.row.cartypeLevelPercentRate
              : ''
          }}
        </template>
      </el-table-column>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'detailConfigModifyView',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    cartypeLevels: {
      type: Array,
      default: function () {
        return []
      }
    },
    extraData: {
      type: Object,
      default: function () {
        return {
          engineSelectMap: {},
          boxSelectMap: {},
          batterySelectMap: {}
        }
      }
    }
  },
  methods: {
    removeRow(index) {
      this.$emit('remove', index)
    }
  }
}
</script>

<style lang="scss" scoped></style>
