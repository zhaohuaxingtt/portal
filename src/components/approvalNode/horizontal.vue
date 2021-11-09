<template>
  <div class="approval-process" :class="{ root: isRoot }">
    <div class="approval-process-content">
      <div class="node" v-for="(item, index) in data" :key="index">
        <div
          class="node-content"
          :style="{ height: approveContentHeight + 'px' }"
        >
          <div class="title">
            {{ item.title }}
          </div>
          <div
            class="node-icon"
            :data-level="level"
            :data-index="index"
            :data-group="item.children ? `group-${level}-${index}` : ''"
            :data-end="index === data.length - 1 ? 1 : 0"
            :data-status="item.status"
          >
            <icon symbol size="30" :name="item.icon" />
          </div>
          <div
            class="approval-user"
            :class="{
              multiple: item.approvers.length > 1,
              single: item.approvers.length === 1
            }"
            :style="{ height: approverUserHeight + 'px' }"
          >
            <span v-if="item.approvers.length === 1">
              {{ item.approvers[0].deptFullCode }}
              {{ item.approvers[0].nameZh }}
            </span>
            <ul v-else>
              <li
                v-for="(approver, i) in item.approvers"
                :key="i"
                :class="{ active: approver.taskStatus === '同意' }"
              >
                <span>{{ approver.deptFullCode }} {{ approver.nameZh }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="children" v-if="item.children">
          <approvalNodeHorizontal
            v-for="(child, i) in item.children"
            :key="i"
            :data="child"
            :isRoot="false"
            :level="level + 1"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from 'rise'
export default {
  name: 'approvalNodeHorizontal',
  components: { Icon },
  props: {
    isRoot: {
      type: Boolean,
      default: true
    },
    level: {
      type: Number,
      default: 1
    },
    data: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  computed: {
    approverUserHeight() {
      let itemAllUsers = []
      this.data.forEach(e => {
        if (e.approvers && e.approvers.length > itemAllUsers.length) {
          itemAllUsers = e.approvers
        }
      })
      return itemAllUsers.length * 28 + 20
    },
    approveContentHeight() {
      return this.approverUserHeight + 50
    }
  }
}
</script>

<style lang="scss" scoped>
.approval-process {
  align-items: center;
  font-size: 12px;

  display: flex;

  .root {
    overflow-x: auto;
    overflow-y: visible;
    position: relative;
  }
  .approval-process {
    overflow: hidden;
  }
  .approval-process-content {
    display: flex;
    .node {
      display: flex;
      align-items: center;
      margin: 20px 0px;

      .node-content {
        box-sizing: content-box;
        text-align: center;
        min-width: 240px;
        .approval-user {
          height: 50px;
          &.single {
            padding-top: 10px;
          }
          &.multiple {
            /* position: absolute;
            left: 50%; */
            transform: translateX(50%);
            margin-left: -10px;
          }
          &.multiple ul {
            list-style: none;
            margin: 0;
            padding: 0;
            position: relative;
            margin-top: 7px;
          }

          &.multiple ul::before {
            content: '';
            height: 10px;
            border-left: solid 1px #ddd;
            display: block;
            position: absolute;
            left: 5px;
            top: -5px;
          }

          &.multiple ul li {
            margin: 0;
            padding: 0;
            text-align: left;
            white-space: nowrap;
            padding: 10px 0px;
            line-height: 12px;
            position: relative;
            display: flex;
            align-items: center;
          }

          &.multiple ul li::before {
            content: '';
            display: block;
            width: 16px;
            height: 16px;
            border: solid 1px #ddd;
            border-radius: 16px;
            box-sizing: border-box;
            float: left;
            margin: 0px 10px 0px -3px;
            background: #fff;
          }

          &.multiple ul li::after {
            content: '';
            display: block;
            height: 20px;
            border-left: dashed 1px #ddd;
            display: block;
            position: absolute;
            left: 5px;
            top: -10px;
          }
          &.multiple ul li.active {
            &::before {
              background: $color-blue;
              border-color: $color-blue;
            }
            &::after {
              border-left: solid 1px $color-blue;
            }
          }
        }
        .title {
          margin-bottom: 20px;
          font-size: 16px;
          font-weight: bold;
        }
        .node-icon {
          margin-bottom: 5px;
          display: flex;
          justify-content: center;
          flex-direction: column;
          font-size: 24px;
          align-items: center;
          position: relative;
          z-index: 2;
        }
      }
      .children {
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>
