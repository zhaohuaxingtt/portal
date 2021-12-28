<template>
  <!--转派-->
  <iDialog
    :title="$t('批量排序')"
    :visible.sync="openSortDialog"
    width="55rem"
    @close="clearDiolog"
    :close-on-click-modal="false"
  >
    <draggable
      class="dragArea list-group"
      v-bind="dragOptions"
      @change="handleContentDrag"
      @update="dragEnd"
      @start="handleStart"
      handle=".info-row"
      :list="list"
    >
      <transition-group>
        <ul class="content" v-for="(item, index) of list" :key="index">
          <li class="info-row">
            <div class="left">{{ item }}</div>
          </li>
        </ul>
      </transition-group>
    </draggable>
    <ul class="button-list">
      <iButton @click="handleReset" class="btn-c">重置</iButton>
      <iButton @click="handleCancel" class="btn-c">取消</iButton>
      <iButton @click="handleConfirm" class="btn-c">确定</iButton>
    </ul>
  </iDialog>
</template>
<script>
import { iDialog, iButton } from 'rise'
import draggable from 'vuedraggable'
export default {
  components: {
    iDialog,
    iButton,
    draggable
  },
  data() {
    return {
      list: ['a', 'b', 'c']
    }
  },
  props: {
    openSortDialog: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 400,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    }
  },
  methods: {
    handleConfirm() {
      console.log('确定')
    },
    handleCancel() {
      this.clearDiolog()
    },
    handleReset() {
      console.log('重置')
    },
    clearDiolog() {
      this.$emit('closeDialog')
    },
    handleContentDrag(data) {
      console.log('handleContentDrag', data)
    },
    dragEnd(data) {
      console.log('dragEnd', data)
    },
    handleStart(data) {
      console.log('handleStart', data)
    }
  }
}
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  .info-row {
    margin-top: 20px;
    height: 35px;
    background-color: #ccc;
    line-height: 35px;
    text-align: center;
  }
}
.button-list {
  display: flex;
  height: 80px;
  justify-content: center;
  align-items: center;
  .btn-c {
    flex-grow: 0;
    flex-shrink: 1;
    height: 35px;
    width: 50px;
  }
}
</style>
