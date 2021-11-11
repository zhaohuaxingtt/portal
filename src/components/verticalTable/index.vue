<template>
  <div class="vertical-table">
    <div class="header" :style="styleName">
      <div class="cell" v-for="(column, index) of columns" :key="index">
        <div class="cell-content">
          <div class="label">
            {{ headerLabel(column) }}
          </div>
          <div class="placeholder">
            <span v-show="!editable">
              {{ headerLabel(column) }}
            </span>
            <span v-if="!column.customRender">xxx</span>
            <item-cell
              v-else
              :scope="{ row: {} }"
              :column="column"
              :custom-render="column.customRender"
              :extra-data="extraData"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="body" :style="styleBody">
      <div class="col" v-for="(item, index) of data" :key="index">
        <div
          v-for="(column, i) of columns"
          :key="i"
          :class="'cell ' + cellAlign(column)"
        >
          <div class="cell-content">
            <span v-if="!column.customRender">{{ item[column.prop] }}</span>
            <item-cell
              v-else
              :scope="{ row: item, $index: index }"
              :column="column"
              :custom-render="column.customRender"
              :extra-data="extraData"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { iSelect, iInput, Icon } from 'rise'
import ItemCell from './cell'
export default {
  name: 'verticalTable',
  // eslint-disable-next-line vue/no-unused-components
  components: { ItemCell, iSelect, iInput, Icon },
  props: {
    data: {
      type: Array,
      default: function() {
        return []
      }
    },
    columns: {
      type: Array,
      default: function() {
        return []
      }
    },
    extraData: {
      type: Object
    },
    nameWidth: {
      type: [String, Number],
      default: 120
    }
  },
  computed: {
    styleName() {
      return {
        width: this.nameWidth + 'px'
      }
    },
    styleBody() {
      return {
        width: `calc(100% - ${this.nameWidth}px)`
      }
    },
    editable() {
      return this.extraData && this.extraData.editable
    }
  },
  methods: {
    cellAlign({ align }) {
      if (!align) {
        return 'center'
      }
      return align
    },
    headerLabel(column) {
      if (column.i18n) {
        return this.$t(column.i18n)
      }
      if (column.label) {
        return this.$t(column.label)
      }
      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
.vertical-table {
  display: flex;
  align-items: stretch;
  .header {
    background-color: rgba(22, 99, 246, 0.17);
    font-weight: 600;
    .cell {
      position: relative;
    }
    .placeholder {
      opacity: 0;
    }
    .label {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      text-align: center;
      justify-content: center;
      display: flex;
      align-items: center;
      min-height: 1em;
    }
  }
  .body {
    display: flex;
    overflow-x: auto;
    .cell {
      width: 140px;
    }
    .col {
      .cell:nth-of-type(odd) {
        background-color: rgba(22, 99, 246, 0.07);
      }
    }
  }
  .col {
    display: flex;
    flex-direction: column;
  }
  .cell {
    padding: 10px 20px;
    display: flex;
    align-items: center;
    &.center {
      justify-content: center;
    }
    &.left {
      justify-content: flex-start;
    }
    .cell-content {
      min-height: 30px;
    }
  }
}
</style>
