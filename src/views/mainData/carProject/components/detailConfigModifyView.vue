<template>
  <el-table :data="data" v-loading="loading">
    <!-- <el-table-column type="selection" header-align="center" align="center" /> -->
    <el-table-column type="index" header-align="center" align="center" />
    <!-- <el-table-column
      label="配置ID"
      prop="id"
      header-align="center"
      align="center"
    /> -->
    <el-table-column
      :label="language('发动机类型')"
      prop="engineId"
      header-align="center"
      align="center"
      show-overflow-tooltip
    >
      <template slot-scope="scope">
        {{
          scope.row.engineId
            ? extraData.engineSelectMap[scope.row.engineId]
            : ''
        }}
      </template>
    </el-table-column>
    <el-table-column
      :label="language('变速箱型号')"
      prop="gearboxId"
      header-align="center"
      align="center"
      show-overflow-tooltip
    >
      <template slot-scope="scope">
        {{
          scope.row.gearboxId ? extraData.boxSelectMap[scope.row.gearboxId] : ''
        }}
      </template>
    </el-table-column>
    <el-table-column
      :label="language('电池容量')"
      prop="batteryId"
      header-align="center"
      align="center"
      show-overflow-tooltip
    >
      <template slot-scope="scope">
        {{
          scope.row.batteryId
            ? extraData.batterySelectMap[scope.row.batteryId]
            : ''
        }}
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
        :label="language(field)"
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
    <!-- <el-table-column
      label="删除"
      prop="cartypeLevel"
      header-align="center"
      align="center"
    >
      <template slot-scope="scope">
        <span @click="removeRow(scope.$index)">
          <Icon symbol name="icondingdianshenqingyusheluoji-shanchu" />
        </span>
      </template>
    </el-table-column> -->
  </el-table>
</template>

<script>
import { Icon } from 'rise'
export default {
  name: 'detailConfigModifyView',
  components: { Icon },
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
