<template>
  <div class="process-horizontal">
    <template v-for="(item, index) of panorama">
      <div
        v-if="index !== 0 && index < panorama.length"
        :key="index"
        class="divider"
        :class="{ active: isDividerActive(item) }"
      ></div>
      <div class="node" :key="index">
        <div class="title" v-if="item.nodeName === '审批结束'">
          {{ item.nodeName }}
        </div>
        <div class="title" v-if="item.nodeName !== '审批结束'">
          {{ item.status }}
        </div>
        <div class="title-placeholder">已提交</div>
        <div class="node-icon">
          <icon symbol size="30" :name="getIcon(item)" />
        </div>
        <div class="placeholder" v-if="isMultiApprovalUser(item)">
          <ul>
            <li v-for="(approvalUser, i) of approvalUsers(item)" :key="i"></li>
          </ul>
        </div>
        <div
          class="content"
          :class="{
            list: isMultiApprovalUser(item),
            acitve: isActiveItem(item),
            normal: !isMultiApprovalUser(item),
            'active-border': isContentUserListActive(item)
          }"
        >
          <ul v-if="isMultiApprovalUser(item)">
            <li
              v-for="(approvalUser, i) of approvalUsers(item)"
              :key="i"
              :class="{ active: isUserActive(approvalUser) }"
            >
              <span class="name" v-if="approvalUser">
                {{
                  approvalUser.approvedUser
                    ? getUserName(approvalUser.approvedUser)
                    : getUserName(approvalUser)
                }}
              </span>
            </li>
          </ul>
          <div v-else class="single-user">
            <span
              v-for="(approvalUser, i) of approvalUsers(item)"
              :key="i"
              class="single-user-name"
            >
              {{
                approvalUser.approvedUser
                  ? getUserName(approvalUser.approvedUser)
                  : getUserName(approvalUser)
              }}
            </span>
            <span
              v-for="(approvalUser, i) of approvalUsers(item)"
              :key="i"
              class="single-user-placeholder"
            >
              三个字
            </span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { Icon } from 'rise'
export default {
  name: 'ProcessHorizontal',
  props: {
    panorama: {
      type: Array,
      default: function() {
        return []
      }
    },
    stateCode: {
      type: Number
    }
  },
  components: {
    Icon
  },
  computed: {
    isEnd() {
      return this.stateCode !== 3 && this.stateCode !== 4
    }
  },
  methods: {
    getUserName(user) {
      const res = []
      if (!user) {
        return ''
      }
      if (user.deptFullCode) {
        res.push(user.deptFullCode)
      }
      if (this.$i18n.locale === 'en') {
        res.push(user.nameEn || user.nameZh)
      } else {
        res.push(user.nameZh || user.nameEn)
      }
      return res.join(' ')
    },
    getIcon(item) {
      if (this.isEnd) {
        return 'iconshenpiliu-yishenpi'
      }
      if (['已提交', '已审批'].includes(item.status)) {
        return 'iconshenpiliu-yishenpi'
      }
      if (item.status === '审批中') {
        return 'iconshenpiliu-shenpizhong'
      }
      return 'iconshenpiliu-daishenpi'
    },
    isActiveItem(item) {
      return ['已提交', '已审批'].includes(item.status)
    },
    isDividerActive(item) {
      return ['已提交', '已审批'].includes(item.status)
    },
    isMultiApprovalUser(item) {
      const users = this.approvalUsers(item)
      return users && users.length > 1
    },
    isContentUserListActive(item) {
      const users = this.approvalUsers(item)
      return users.length > 0 && users[0].approvalStatus
    },
    approvalUsers(item) {
      const users = []
      if (item.approvalUserList) {
        for (let i = 0; i < item.approvalUserList.length; i++) {
          const element = item.approvalUserList[i]
          const status =
            item.nodeTye === 'MultiInst' ? false : item.status === '已审批'
          users.push({ ...element, approvalStatus: status })
        }
      }
      if (item.taskNodeList) {
        for (let i = 0; i < item.taskNodeList.length; i++) {
          const element = item.taskNodeList[i]
          if (element.approvedUser) {
            const status =
              item.nodeTye === 'MultiInst'
                ? element.endTime !== null
                : item.status === '已审批'
            users.push({
              ...element.approvedUser,
              approvalStatus: status
            })
          }
        }
      }
      return users
    },
    isUserActive(user) {
      return user.approvalStatus
      /* if (!user.taskStatus) {
        return false
      }
      return ['同意'].includes(user.taskStatus) */
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
    width: 160px;
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
      min-height: 16px;
      position: absolute;
      top: 0px;
      left: 50%;
      transform: translateX(-50%);
      white-space: nowrap;
    }
    .title-placeholder {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 20px;
      text-align: center;
      min-height: 16px;
      color: #fff;
      opacity: 0;
    }
    .node-icon {
      width: 100%;
      height: 20px;
      margin: 20px 0px;

      border-radius: 50%;
      font-size: 20px;
      text-align: center;
      display: flex;
      justify-content: center;
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
      &.list.active-border {
        &::before {
          background-color: $color-blue;
        }
      }
      &.list {
        position: absolute;
        top: 80px;
        left: 26px;
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

      .single-user {
        position: relative;
        .single-user-placeholder {
          color: #fff;
        }
        .single-user-name {
          position: absolute;
          bottom: 0px;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
