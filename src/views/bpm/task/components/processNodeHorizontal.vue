<template>
  <horizontalPanel v-if="nodeData && nodeData.length" :nodeData="nodeData" />
</template>

<script>
import { horizontalPanel } from '@/components/approvalNode'
export default {
  name: 'processNodeHorizontal',
  components: { horizontalPanel },
  props: {
    panorama: {
      type: Array,
      default: function () {
        return []
      }
    },
    stateCode: {
      type: Number
    }
  },
  computed: {
    isEnd() {
      return this.stateCode !== 3 && this.stateCode !== 4
    }
  },
  watch: {
    panorama() {
      this.getData()
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
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
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
      /* if (panoromaItem.approvalUserList) {
        panoromaItem.approvalUserList.forEach((user) => {
          approvers.push({
            taskStatus: '',
            taskId: '',
            endTime: '',
            ...user,
            agentUsers: []
          })
        })
      } */
      if (panoromaItem.taskApprovesList) {
        panoromaItem.taskApprovesList.forEach((task) => {
          if (task.approvedUser) {
            const taskUser = {
              taskStatus: '',
              taskId: '',
              endTime: '',
              ...task.approvedUser
            }
            if (task.agentUsers) {
              taskUser.agentUsers = task.agentUsers
            }
            approvers.push(taskUser)
          }
        })
      }
      if (panoromaItem.taskNodeList) {
        panoromaItem.taskNodeList.forEach((task) => {
          if (task.taskApproves) {
            task.taskApproves.forEach((approve) => {
              const taskUser = {
                taskStatus: task.taskStatus,
                taskId: task.taskId,
                endTime: task.endTime,
                ...approve.approvedUser
              }
              if (approve.agentUsers) {
                taskUser.agentUsers = approve.agentUsers || []
              }
              approvers.push(taskUser)
            })
            /* approvers.push({
            taskStatus: task.taskStatus,
            taskId: task.taskId,
            endTime: task.endTime,
            ...task.approvedUser,
            agentUsers: task.agentUsers || []
          }) */
          }
        })
      }
      if (panoromaItem.nodeName === '审批结束') {
        return {
          ...panoromaItem,
          status: this.isEnd ? '审批结束' : '待审批',
          title: panoromaItem.nodeName,
          icon: this.iconMap[this.isEnd ? '审批结束' : '待审批'],
          approvers: approvers
        }
      }
      return {
        ...panoromaItem,
        status: panoromaItem.status,
        title: panoromaItem.status,
        icon: this.iconMap[panoromaItem.status],
        approvers: approvers
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
