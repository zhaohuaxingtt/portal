<template>
  <!--转派-->
  <iDialog
    :title="$t('MT_PILIANGPAIXU')"
    :visible.sync="openSortDialog"
    width="28.75rem"
    @close="clearDiolog"
    :close-on-click-modal="false"
  >
    <div class="warn-content">{{$t('MT_SHANGXIATUOZHUAIKETIAOZHENGSHUNXU')}}</div>
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
        <ul class="content" v-for="(item, index) in list" :key="index">
          <li :class="index > 0 ? 'info-row info-row-top' : 'info-row'">
            <div class="icon">
              <div class="icon-line"></div>
            </div>
            <span class="text">{{ item.sectionCode }}</span>
          </li>
        </ul>
      </transition-group>
    </draggable>
    <ul class="button-list">
      <iButton @click="handleSave" class="btn-c">{{$t('MT_BAOCUN')}}</iButton>
      <iButton @click="handleReset" class="btn-c">{{$t('MT_CHONGZHI')}}</iButton>
      <iButton @click="handleCancel" class="btn-c">{{$t('MT_TUICHU')}}</iButton>
    </ul>
  </iDialog>
</template>
<script>
import { iDialog, iButton, iMessage } from 'rise'
import draggable from 'vuedraggable'
import { resortThemenBySection, findSectionById } from '@/api/meeting/details'
export default {
  components: {
    iDialog,
    iButton,
    draggable
  },
  data() {
    return {
      list: [],
      duplicateeeList: []
    }
  },
  props: {
    openSortDialog: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    meetingInfo: {
      type: Object,
      default: () => {
        return {}
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
  mounted() {
    this.query()
  },
  methods: {
    handleSave() {
      const linieTeams = this.duplicateeeList.map((item, index) => {
        return {
          ...item,
          sectionNo: index + 1
        }
      })
      const data = {
        linieTeams,
        meetingId: this.meetingInfo.id
      }
      resortThemenBySection(data).then((res) => {
        if (res.code === 200) {
          this.$emit('closeDialog',"save")
          iMessage.success(this.$t('MT_PAIXUWANCHENG'))
        }
      })
    },
    moveInArray(arr, from, to) {
      // 确保是有效数组
      if (Object.prototype.toString.call(arr) !== '[object Array]') {
        throw new Error('Please provide a valid array')
      }
      // 删除当前的位置
      var item = arr.splice(from, 1)
      // 确保还剩有元素移动
      if (!item.length) {
        throw new Error('There is no item in the array at index ' + from)
      }
      // 移动元素到指定位置
      arr.splice(to, 0, item[0])
      return arr
    },
    query() {
      findSectionById({ id: this.meetingInfo.id }).then((res) => {
        this.duplicateeeList = [...res.linieTeams]
        this.list = [...res.linieTeams]
      })
    },
    handleCancel() {
      this.clearDiolog()
    },
    handleReset() {
      this.$emit('closeDialog', 'reset')
    },
    clearDiolog() {
      this.$emit('closeDialog')
    },
    handleContentDrag(data) {
      this.duplicateeeList = this.moveInArray(
        this.duplicateeeList,
        data.moved.oldIndex,
        data.moved.newIndex
      )
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-dialog__body,
::v-deep .el-dialog {
  padding-right: 4.5px !important;
}
::-webkit-scrollbar {
  width: 12px;
  height: 88px;
}
::-webkit-scrollbar-thumb {
  background-color: #e2eafc;
}
::-webkit-scrollbar-track {
  background-color: transparent;
}
.warn-content {
  position: absolute;
  width: 140px;
  height: 20px;
  font-size: 14px !important;
  font-weight: 400;
  line-height: 15px;
  color: #999999;
  opacity: 1;
  transform: translate(5.875rem, -3rem);
  white-space: nowrap;
}
.list-group {
  max-height: 480px;
  overflow-y: auto;
}
.content {
  display: flex;
  flex-direction: column;
  .info-row {
    display: flex;
    align-items: center;
    width: 380px;
    height: 30px;
    background-color: #f9fafe;
    cursor: grab;
    .icon {
      display: flex;
      align-items: center;
      margin-left: 10px;
      margin-right: 20px;
      width: 20px;
      height: 6px;
      border-top: 1px solid #8f8f90;
      border-bottom: 1px solid #8f8f90;
      .icon-line {
        width: 100%;
        height: 2px;
        background-color: #ccc;
      }
    }
    .text {
      display: block;
      height: 20px;
      line-height: 20px;
      transform: translateY(-2px);
    }
  }
  .info-row-top {
    margin-top: 20px;
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
