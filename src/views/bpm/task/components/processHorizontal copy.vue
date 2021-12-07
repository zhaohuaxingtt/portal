<template>
  <div class="process-horizontal">
    <template v-for="(value, key) in finishedNodeMap">
      <div class="node" :key="key">
        <div class="title">{{ value.nodeStatus }}</div>
        <div class="node-icon">
          <icon symbol size="30" :name="getIcon(key)" />
        </div>
        <div class="placeholder" v-if="!isSingleApprover(value.assigneeList)">
          <ul>
            <li
              v-for="(item, index) of getMultipleApprovers(value.assigneeList)"
              :key="index"
            ></li>
          </ul>
        </div>
        <div
          class="content"
          :class="{
            list: !isSingleApprover(value.assigneeList),
            acitve: isAssigneeListActive(key, value.assigneeList),
            normal: !isSingleApprover(value.assigneeList)
          }"
        >
          <ul v-if="!isSingleApprover(value.assigneeList)">
            <li
              v-for="approvalUser in getMultipleApprovers(value.assigneeList)"
              :key="approvalUser.id"
            >
              <span class="name" v-if="approvalUser">
                {{
                  $i18n.locale === 'en'
                    ? approvalUser.nameEn
                    : approvalUser.nameZh
                }}
              </span>
            </li>
            <!-- <template
              v-for="(item, index) of value.assigneeList"
              :class="{ active: isAssigneeItemActive(key, item) }"
            >
              <div :key="index" v-if="item && item.approvalUsers.length > 0">
                <li
                  v-for="approvalUser in item.approvalUsers"
                  :key="approvalUser.id"
                >
                  <span class="name">
                    {{ approvalUser && approvalUser.userName }}
                  </span>
                   <span class="link">补充材料</span> 
                </li>
              </div>
            </template> -->
          </ul>
          <div v-else>
            <span
              v-for="approvalUser in getSingleApprovalUser(value.assigneeList)"
              :key="approvalUser.id"
            >
              {{ approvalUser && approvalUser.nameZh }}
            </span>
          </div>
        </div>
      </div>
      <div
        v-if="dividerVisible(key)"
        class="divider"
        :class="{ active: isDividerActive(key) }"
        :key="key"
      ></div>
    </template>
  </div>
</template>

<script>
import { Icon } from 'rise'
export default {
  name: 'ProcessHorizontal',
  props: {
    finishedNodeMap: {
      type: Object,
      default: function () {
        return {}
      }
    },
    currentNode: {
      type: Object,
      default: function () {
        return {
          taskDefinitionKey: 'start'
        }
      }
    }
  },
  components: {
    Icon
  },
  data() {
    return {
      nodeTextmap: {
        1: this.language('已提交'),
        2: this.language('待审批'),
        3: this.language('已审批'),
        4: this.language('审批中'),
        5: '执行过，可能还会执行',
        6: this.language('审批结束')
      }
    }
  },
  computed: {
    finishedNodeKeys() {
      return Object.keys(this.finishedNodeMap)
    },
    currentNodeIndex() {
      return this.finishedNodeKeys.indexOf(this.currentNode.taskDefinitionKey)
    }
  },
  methods: {
    getIcon(nodeKey) {
      const finishedNodeKeys = this.finishedNodeKeys
      const nodeIndex = finishedNodeKeys.indexOf(nodeKey)
      const currentNodeIndex = this.currentNodeIndex
      if (nodeIndex < currentNodeIndex) {
        return 'iconshenpiliu-yishenpi'
      }
      if (nodeIndex === currentNodeIndex) {
        return 'iconshenpiliu-shenpizhong'
      }
      return 'iconshenpiliu-daishenpi'
    },
    isAssigneeListActive(nodeKey, assigneeList) {
      if (!assigneeList) {
        return false
      }
      if (assigneeList.length < 2) {
        return false
      }
      const finishedNodeKeys = this.finishedNodeKeys
      const nodeIndex = finishedNodeKeys.indexOf(nodeKey)
      const currentNodeIndex = this.currentNodeIndex
      return nodeIndex <= currentNodeIndex
    },
    isAssigneeItemActive(nodeKey, assigneeItem) {
      const finishedNodeKeys = this.finishedNodeKeys
      const nodeIndex = finishedNodeKeys.indexOf(nodeKey)
      const currentNodeIndex = this.currentNodeIndex
      if (nodeIndex > currentNodeIndex) {
        return false
      }
      if (nodeIndex < currentNodeIndex) {
        return true
      }
      return assigneeItem.assigneeId === this.data.currentNode.assigneeId
    },
    dividerVisible(nodeKey) {
      const finishedNodeKeys = this.finishedNodeKeys
      const nodeIndex = finishedNodeKeys.indexOf(nodeKey)
      return nodeIndex !== finishedNodeKeys.length - 1
    },
    isDividerActive(nodeKey) {
      const finishedNodeKeys = this.finishedNodeKeys
      const nodeIndex = finishedNodeKeys.indexOf(nodeKey)
      const currentNodeIndex = this.currentNodeIndex
      return currentNodeIndex > nodeIndex
    },
    // 是否单个审批人
    isSingleApprover(assigneeList) {
      if (!assigneeList) {
        return true
      }
      if (assigneeList.length > 1) {
        return false
      }
      return assigneeList[0].approvalUsers.length <= 1
    },
    getSingleApprovalUser(assigneeList) {
      if (!assigneeList) {
        return ''
      }
      const approvers = []
      if (assigneeList.length > 0) {
        assigneeList.forEach((assignee) => {
          if (assignee.approvalUsers) {
            assignee.approvalUsers.forEach((approver) => {
              approvers.push(approver)
            })
          }
        })
      }
      return approvers
    },
    getMultipleApprovers(assigneeList) {
      if (!assigneeList) {
        return []
      }
      const approvers = []
      assigneeList.forEach((assignee) => {
        if (assignee.approvalUsers) {
          assignee.approvalUsers.forEach((approver) => {
            approvers.push(approver)
          })
        }
      })
      return approvers
    }
  }
}
</script>

<style lang="scss" scoped>
$primaryColor: #1660f1;
$borderColor: #cbcbcb;
.process-horizontal {
  display: flex;
  justify-content: flex-start;
  /* height: 200px; */
  .divider {
    width: 140px;
    height: 1px;
    border-bottom: dashed 2px $borderColor;
    margin-top: 50px;
    &.active {
      border-bottom: solid 1px $primaryColor;
    }
  }
  .node {
    position: relative;
    .title {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 20px;
      text-align: center;
    }
    .node-icon {
      width: 20px;
      height: 20px;
      margin: 20px;
      border-radius: 50%;
      font-size: 20px;
    }
    .placeholder {
      li {
        width: 10px;
        height: 21px;
      }
    }
    .content {
      &.normal {
        text-align: center;
      }
      &.list {
        position: absolute;
        top: 82px;
        left: 30px;
        font-size: 14px;
        &::before {
          content: '';
          display: block;
          width: 1px;
          height: 20px;
          background-color: $borderColor;
          border-radius: 50%;
          position: absolute;
          left: 0;
          top: -19px;
          z-index: 3;
        }

        .name {
          display: block;
          width: 70px;
          text-align: left;
        }
        .link {
          color: $primaryColor;
        }
        li {
          display: flex;
          position: relative;
          margin: 0px 0px 5px 0px;
          padding-left: 22px;
          font-size: 14px;
          white-space: nowrap;
          clear: both;
          &::before {
            content: '';
            display: block;
            width: 11px;
            height: 11px;
            border: solid 1px $borderColor;
            border-radius: 50%;
            background: #fff;
            position: absolute;
            left: -6px;
            top: 50%;
            transform: translateY(-50%);
            z-index: 2;
          }
          &::after {
            content: '';
            display: block;
            width: 1px;
            height: 100%;
            background-color: $borderColor;
            border-radius: 50%;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            z-index: 1;
          }
        }
        li.active {
          &::before {
            border: solid 1px $primaryColor;
            background: $primaryColor;
          }
          &::after {
            background-color: $primaryColor;
          }
        }
        li:last-child {
          &::after {
            height: 50%;
            top: 0;
            transform: translateY(0);
          }
        }
      }
      &.list.active {
        &::before {
          background-color: $primaryColor;
        }
      }
    }
  }
}
</style>
