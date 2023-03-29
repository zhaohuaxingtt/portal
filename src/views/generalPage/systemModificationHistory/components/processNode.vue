<template>
    <iDialog  :title="'审批流'" :visible.sync="value" width="60%" @close="clearDiolog">
      <horizontalPanel
        :nodeData="nodeData"
        :isEnd="isEnd"
        :instanceId="instanceId"
        :key="instanceId"
        size="small"
        :line-spacing="30"
      />
    </iDialog>
  </template>
  
  <script>
    import {iDialog,iMessage} from 'rise'

  import { horizontalPanel } from '@/components/approvalNode'
  import { queryWorkflowDetail } from '@/api/approval/myApplication'
  export default {
    name: 'processNodeVertical',
    components: { horizontalPanel,iDialog },
    props: {
      value: { type: Boolean, default: false },
      instanceId: {
        type: String,
        required: true
      },
   
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
      this.nodeData = []
      this.getDetail()
    },
    methods: {
      getDetail() {
  
        if (this.instanceId) {
          const params = {
            processInstanceId: this.instanceId,
            currentUserId: this.$store.state.permission.userInfo.id
          }
          queryWorkflowDetail(params)
            .then((res) => {
              if(res.code==200){
                const { data } = res
                this.panorama = data.panorama || []
                this.stateCode = data.stateCode
                this.getData()
              }else{
                iMessage.error(
                  `${this.$i18n.locale === 'zh' ? res.desZh : res.desEn}`
                )
              }

            })
            .catch(() => {
            })
        }
      },
      getData() {
        if (!this.panorama) {
          return []
        }
        this.setItemChildBranchFlag()
  
        const nodeData = []
        const len = this.panorama.length
        for (let i = 0; i < len; i++) {
          const panoromaItem = this.panorama[i]
  
          const item = this.getDatItem(panoromaItem)
  
          // 检查一下有没有并行节点
          if (
            panoromaItem.branchFlag.indexOf('branch') === 0 &&
            panoromaItem.childBranchFlag &&
            panoromaItem.childBranchFlag.length > 1
          ) {
            item.children = []
            panoromaItem.childBranchFlag.forEach((flag) => {
              const filterItems = this.panorama.filter(
                (e) =>
                  e.branchFlag.indexOf(flag + '_') === 0 &&
                  e.branchFlag !== item.branchFlag
              )
              const itemChildren = []
              filterItems.forEach((filterItem) => {
                itemChildren.push(this.getDatItem(filterItem))
                filterItem.isUsed = true
              })
              item.children.push(itemChildren)
            })
          }
  
          if (!item.isUsed) {
            nodeData.push(item)
          }
  
          item.isUsed = true
        }
        this.nodeData = nodeData
      },
      getDatItem(panoromaItem) {
        const approvers = []
        if (panoromaItem.taskApprovesList) {
          panoromaItem.taskApprovesList.forEach((task) => {
            if (task.approvedUser) {
              const taskUser = {
                ...task.approvedUser,
                taskStatus: '',
                taskId: '',
                endTime: ''
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
                  ...approve.approvedUser,
                  taskStatus: task.taskStatus,
                  taskId: task.taskId,
                  endTime: task.endTime
                }
                if (approve.agentUsers) {
                  taskUser.agentUsers = approve.agentUsers || []
                }
                approvers.push(taskUser)
              })
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
      },
      setItemChildBranchFlag() {
        const len = this.panorama.length
        let defaultBranchFlag = ''
        for (let i = 0; i < len; i++) {
          const element = this.panorama[i]
          if (element.status === '已提交') {
            const otherNodes = this.panorama.filter((e) => e.status !== '已提交')
            const childs = []
            otherNodes.forEach((e) => {
              if (e.branchFlag) {
                const branch = this.getBranchFlag(e.branchFlag)
                if (!childs.includes(branch)) {
                  childs.push(branch)
                }
              }
            })
            element.childBranchFlag = childs
          }
          if (!defaultBranchFlag) {
            defaultBranchFlag = element.branchFlag
          }
          if (element.nodeName === '审批结束') {
            element.branchFlag = defaultBranchFlag + 'end'
          }
        }
      },
      getBranchFlag(flag) {
        if (!flag) {
          return ''
        }
        return flag.substring(0, flag.lastIndexOf('_'))
      },
      clearDiolog(){
        this.$emit('clearDiolog',false)
      }
    },
    beforeDestroy() {
      this.nodeData = []
      this.stateCode = ''
      this.panorama = []
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .process-node-vertical {
    overflow: auto;
  
    min-width: 200px;
    min-height: 200px;
  }
  </style>
  