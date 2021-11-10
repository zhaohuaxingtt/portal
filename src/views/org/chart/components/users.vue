<template>
  <iCard>
    <div class="organzation-users center" v-show="leaderUsers.length > 0">
      <user-item v-for="item in leaderUsers" :user="item" :key="item.id" />
    </div>
    <div class="organzation-users" v-show="staffUsers.length > 0">
      <user-item v-for="item in staffUsers" :user="item" :key="item.id" />
    </div>
    <div style="text-align: center;" v-show="orgUsers.length === 0">
      {{ $t('LK_ZANWUSHUJU') }}
    </div>
  </iCard>
</template>

<script>
import UserItem from './userItem.vue'
import { iCard } from 'rise'
export default {
  name: 'organzationUsers',
  components: {
    UserItem,
    iCard
  },
  props: {
    users: {
      type: Array,
      default: function() {
        return []
      }
    },
    isSearch: {
      type: Boolean,
      default: false
    },
    searchItem: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {
    orgUsers() {
      if (!this.isSearch) {
        return this.users
      }
      if (this.searchItem.type === 'USER') {
        return this.users.filter(e => e.nameZh === this.searchItem.nameZh)
      }
      if (this.searchItem.type === 'POSITION') {
        return this.users.filter(e => e.positionZh === this.searchItem.nameZh)
      }
      return this.users
    },
    leaderUsers() {
      return this.orgUsers.filter(e => e.isDeptLead)
    },
    staffUsers() {
      return this.orgUsers.filter(e => !e.isDeptLead)
    }
  }
}
</script>

<style lang="scss" scoped>
.organzation-users {
  display: flex;
  flex-wrap: wrap;
  margin: 0px;

  &.center {
    justify-content: center;
  }
}
</style>
