<template>
  <i-dialog
    title="表头设置"
    :visible.sync="isShow"
    width="30%"
    class="table-header-modal"
    :before-close="handleBeforeClose"
  >
    <div class="header-wrapper" ref="header-wrapper">
      <div
        class="flex-align-center header-col drop-item"
        v-for="(item, index) in dataSource"
        :key="index"
        :id="item.prop"
        :data-id="item.i18n ? language(item.i18n) : item.label"
        :class="{ draggable: !item.type }"
      >
        <div><icon symbol class="icon" name="iconshunxubiaoqian" /></div>
        <el-switch
          v-model="item.isHidden"
          active-color="#CDD4E2"
          inactive-color="#1660F1"
        />
        <div>{{ item.i18n ? language(item.i18n) : item.label }}</div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <i-button @click="handleSave">保存</i-button>
      <i-button @click="handleReset">重置</i-button>
      <i-button @click="handleCancel">退出</i-button>
    </span>
  </i-dialog>
</template>

<script>
import Sortable from 'sortablejs'
import { iButton, iDialog, icon } from 'rise'
export default {
  components: {
    iButton,
    iDialog,
    icon
  },
  props: {
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    show: [Boolean]
  },
  data() {
    return {
      dataSource: [],
      originalData: []
    }
  },
  computed: {
    isShow: {
      get() {
        return this.show
      },
      set(val) {
        this.$emit('update:show', val)
      }
    }
  },
  created() {
    this.handleOpened()
  },
  methods: {
    handleBeforeClose(done) {
      this.handleReset()
      done()
    },
    handleSave() {
      const elements = document.querySelectorAll('.drop-item')
      const newData = []
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i]
        console.log(element.getAttribute('data-id'))
        const item = this.dataSource.find((e) => {
          const itemName = e.i18n ? this.language(e.i18n) : e.label
          return itemName === element.getAttribute('data-id')
        })
        newData.push(item)
      }
      console.log('nwe', newData)
      this.isShow = false
      this.$emit('callback', newData)
    },
    handleCancel() {
      this.handleReset()
      this.isShow = false
    },
    handleReset() {
      this.dataSource = _.cloneDeep(this.originalData)
    },
    handleOpened() {
      const dataSource = _.cloneDeep(this.data)
      dataSource.forEach((e) => {
        if (!e.hasOwnProperty('isHidden')) {
          e.isHidden = false
        }
      })
      this.dataSource = _.cloneDeep(dataSource)
      this.originalData = _.cloneDeep(dataSource)
      this.newData = _.cloneDeep(dataSource)
      this.$nextTick(() => {
        const el = document.getElementsByClassName('header-wrapper')[0]
        new Sortable(el, {
          animation: 250,
          draggable: '.draggable'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.table-header-modal {
  .header-wrapper {
    .header-col {
      background: #f9fafe;
      padding: 10px 10px;
      margin-bottom: 20px;

      > div {
        &:first-child {
          margin-right: 20px;
        }
        &:last-child {
          margin-left: 20px;
        }
      }
    }
    .drop-item.draggable {
      cursor: move;
    }
  }
}
</style>
<style lang="scss">
.table-header-modal {
  .el-dialog__body {
    max-height: 465px;
    overflow-y: scroll;
    overflow-x: auto;
  }
}
</style>
