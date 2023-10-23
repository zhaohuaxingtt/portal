<template>
  <div class="org-user-item">
    <div class="item-header">
      <div class="avatar">
        <icon
          v-if="!user.avatar"
          symbol
          name="iconmorentouxiang"
          class="default-avatar"
        />
        <img :src="avatar" />
      </div>
      <div class="user-info">
        <div class="name">
          <span class="name-zh">{{ user.nameZh }}</span>
          <span class="name-en">{{ user.nameEn }}</span>
        </div>
        <div class="position">
          {{ user.orgFullCode }} {{ user.isDeptLead ? '部门经理' : '采购员' }}
          {{ user.userNum }}
        </div>
      </div>
      <div class="logo">
        <icon
          v-if="!deptLogo"
          symbol
          name="iconshangqidazhong"
          class="default-logo"
        />
        <img v-else :src="deptLogo" class="dept-logo" />
      </div>
    </div>
    <div class="contact">
      <div class="contact-item">
        <span class="item-icon">
          <icon symbol name="icondizhi" class="icon" />
        </span>
        <span class="text">
          <!-- IMB B1A R 401 -->
          {{ user.location }}
        </span>
      </div>
      <div class="contact-item">
        <span class="item-icon">
          <icon symbol name="icondianhua" class="icon" />
        </span>
        <span class="text" :title="phoneNumber">
          <!-- 52081 61926 -->
          {{ phoneNumber }}
        </span>
      </div>
      <div class="contact-item">
        <span class="item-icon">
          <icon symbol name="iconyouxiang" class="icon" />
        </span>
        <span class="text"> {{ user.email }}</span>
      </div>
      <div class="contact-item">
        <span class="item-icon">
          <icon symbol name="iconweixin" class="icon" />
        </span>
        <span class="text">
          {{ user.wechat }}
        </span>
      </div>
      <div class="contact-item">
        <span class="item-icon">
          <icon symbol name="icongangwei" class="icon" />
        </span>
        <span class="text">
          <!-- 负责材料组信息组信息负责材料组信息组信息负责材料组信息组信息负责材料组信息组信息 -->
          {{ user.categoryNameZh }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from 'rise'
export default {
  name: 'organzationUserItem',
  props: {
    user: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  computed: {
    deptLogo() {
      if (this.user.deptLogo) {
        return this.user.deptLogo.path
      }
      return null
    },
    avatar() {
      return this.user?.profile?.path || ''
    },
    phoneNumber() {
      const res = []
      if (this.user.phone) {
        res.push(this.user.phone)
      }
      if (this.user.mobile) {
        res.push(this.user.mobile)
      }
      return res.join(',')
    }
  },
  components: { Icon }
}
</script>

<style lang="scss" scoped>
.org-user-item {
  width: calc(25% - 20px);
  height: 200px;
  background: #ffffff;
  border: 2px solid #67C23A;
  box-shadow: 0px 6px 8px rgba(45, 97, 213, 0.18);
  margin: 0px 10px 20px 10px;
  box-sizing: border-box;
  .item-header {
    display: flex;
    justify-content: space-between;
    margin: 19px 14px 0px 16px;
    padding: 0px 9px 13px 12px;
    align-items: center;
    border-bottom: 1px solid #dee3ed;
    box-sizing: border-box;
    .avatar {
      width: 60px;
      height: 60px;
      border-radius: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      .default-avatar {
        font-size: 45px;
      }
      img {
        max-width: 100%;
      }
    }
    .logo {
      width: 44px;
      height: 44px;
      border-radius: 22px;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      .default-logo {
        font-size: 36px;
      }
      .dept-logo {
        max-width: 44px;
        max-height: 44px;
      }
    }
    .user-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: hidden;
      max-width: calc(100% - 120px);
      .name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        min-width: 0;
        max-width: 100%;
      }
      .name-zh {
        color: #67C23A;
        font-size: 20px;
        font-weight: 800;
        line-height: 28px;
        margin-right: 10px;
      }
      .name-en {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        line-height: 21px;
        color: #0d2451;
      }
      .desc {
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        color: rgba(0, 0, 0, 0.7);
      }
    }
  }

  .contact {
    padding: 15px 16px 17px 16px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .contact-item {
      display: flex;
      align-items: center;
      line-height: 26px;
      box-sizing: border-box;
      .item-icon {
        font-size: 18px;
        margin-right: 5px;
      }
      min-width: 0;
      .text {
        line-height: 1.1em;
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .contact-item:nth-child(odd) {
      width: 60%;
    }
    .contact-item:nth-child(even) {
      width: 40%;
      padding-left: 10px;
    }
    .contact-item:last-child {
      width: 100%;
    }
  }
}
</style>
