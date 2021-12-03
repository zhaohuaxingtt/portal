<template>
  <div class="process-node-vertical" v-loading="loading">
    <horizontalPanel
      v-if="nodeData && nodeData.length"
      :nodeData="nodeData"
      :isEnd="isEnd"
      :instanceId="instanceId"
    />
  </div>
</template>

<script>
import { horizontalPanel } from '@/components/approvalNode'
import { queryWorkflowDetail } from '@/api/approval/myApplication'
export default {
  name: 'processNodeVertical',
  components: { horizontalPanel },
  props: {
    instanceId: {
      type: String,
      required: true
    }
  },
  computed: {
    isEnd() {
      return this.stateCode !== 3 && this.stateCode !== 4
    }
  },
  watch: {
    instanceId() {
      this.nodeData = []
      this.getDetail()
    }
  },
  data() {
    return {
      nodeData: [],
      iconMap: {
        审批结束: 'iconshenpiliu-yishenpi',
        已提交: 'iconshenpiliu-yishenpi',
        审批中: 'iconshenpiliu-shenpizhong',
        待审批: 'iconshenpiliu-daishenpi',
        未审批: 'iconshenpiliu-daishenpi',
        已审批: 'iconshenpiliu-yishenpi'
      },
      stateCode: '',
      panorama: [],
      loading: false
    }
  },
  created() {
    this.getDetail()
  },

  methods: {
    getDetail() {
      this.loading = true

      if (this.instanceId) {
        const params = {
          processInstanceId: this.instanceId,
          currentUserId: this.$store.state.permission.userInfo.id
        }
        queryWorkflowDetail(params)
          .then((res) => {
            const { data } = res
            this.panorama = data.panorama || []
            this.stateCode = data.stateCode
            this.loading = false
            this.getData()
          })
          .catch(() => {
            this.loading = false
          })
      }
    },
    getData() {
      if (!this.panorama) {
        return []
      }
      const nodeData = []
      const len = this.panorama.length
      for (let i = 0; i < len; i++) {
        const panoromaItem = this.panorama[i]

        const item = this.getDatItem(panoromaItem)

        if (
          panoromaItem.nodeTye === 'Non_MultiInst' &&
          panoromaItem.executionId
        ) {
          const otherPanoromas = this.panorama.slice(i + 1, len)
          const isSameExecutionIdItems = otherPanoromas.filter(
            (e) =>
              e.nodeTye === 'Non_MultiInst' &&
              e.executionId === panoromaItem.executionId &&
              e.executionId
          )
          const isNoSameExecutionIdItems = otherPanoromas.filter(
            (e) =>
              e.nodeTye === 'Non_MultiInst' &&
              e.executionId !== panoromaItem.executionId &&
              e.executionId
          )
          // 代办有分支
          if (
            isSameExecutionIdItems.length > 0 &&
            isNoSameExecutionIdItems.length > 0
          ) {
            item.children = []
            const sameExcutionIdChildren = []
            const noSameExcutionIdChildren = []
            let prevType = 'same'
            otherPanoromas.forEach((oPanoroma) => {
              if (
                oPanoroma.nodeTye === 'Non_MultiInst' &&
                oPanoroma.executionId &&
                oPanoroma.executionId === panoromaItem.executionId
              ) {
                oPanoroma.isUsed = true
                sameExcutionIdChildren.push(this.getDatItem(oPanoroma))
                prevType = 'same'
              }
              if (
                oPanoroma.nodeTye === 'Non_MultiInst' &&
                !oPanoroma.executionId &&
                prevType === 'same'
              ) {
                oPanoroma.isUsed = true
                sameExcutionIdChildren.push(this.getDatItem(oPanoroma))
              }
              if (oPanoroma.nodeName === '审批结束') {
                oPanoroma.isUsed = true
                sameExcutionIdChildren.push(this.getDatItem(oPanoroma))
              }

              if (
                oPanoroma.nodeTye === 'Non_MultiInst' &&
                oPanoroma.executionId &&
                oPanoroma.executionId !== panoromaItem.executionId
              ) {
                oPanoroma.isUsed = true
                noSameExcutionIdChildren.push(this.getDatItem(oPanoroma))
                prevType = 'noSame'
              }
              if (
                oPanoroma.nodeTye === 'Non_MultiInst' &&
                !oPanoroma.executionId &&
                prevType === 'noSame'
              ) {
                oPanoroma.isUsed = true
                noSameExcutionIdChildren.push(this.getDatItem(oPanoroma))
              }
            })
            item.children.push(sameExcutionIdChildren)
            item.children.push(noSameExcutionIdChildren)
          }
        }
        if (!panoromaItem.isUsed) {
          nodeData.push(item)
        }

        panoromaItem.isUsed = true
      }
      this.nodeData = nodeData
    },
    getDatItem(panoromaItem) {
      const approvers = []
      if (panoromaItem.approvalUserList) {
        panoromaItem.approvalUserList.forEach((user) => {
          approvers.push({
            taskStatus: '',
            taskId: '',
            endTime: '',
            ...user
          })
        })
      }
      if (panoromaItem.taskNodeList) {
        panoromaItem.taskNodeList.forEach((task) => {
          approvers.push({
            taskStatus: task.taskStatus,
            taskId: task.taskId,
            endTime: task.endTime,
            ...task.approvedUser
          })
        })
      }
      if (panoromaItem.nodeName === '审批结束') {
        return {
          status: this.isEnd ? '审批结束' : '待审批',
          title: panoromaItem.nodeName,
          icon: this.iconMap[this.isEnd ? '审批结束' : '待审批'],
          approvers: approvers,
          ...panoromaItem
        }
      }
      return {
        status: panoromaItem.status,
        title: panoromaItem.status,
        icon: this.iconMap[panoromaItem.status],
        approvers: approvers,
        ...panoromaItem
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.process-node-vertical {
  max-width: 800px;
  max-height: 400px;
  overflow: auto;

  min-width: 200px;
  min-height: 100px;
}
</style>
