<template>
  <el-card class="module-card">
    <div slot="header" class="card-header flex-between-center-center">
      <span class="title" @click="handleClickTitle(card)">
        {{ newTitle }}
      </span>
      <div class="more">待审批 | 已申请</div>
    </div>
    <div class="module-content">
      <Approve :data="card" ref="parent" />
    </div>
  </el-card>
</template>

<script>
import Approve from '../Approve/index.vue'
import { mapState } from 'vuex'
export default {
  components: {
    Approve
  },
  props: {
    card: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    ...mapState({
      id: (id) => id.permission.userInfo.id
    }),
    lang() {
      return this.$i18n.locale
    },
    newTitle() {
      return this.$t('HOME_CARD.' + this.card.permissionKey)
    }
  },
  methods: {
    handleClickTitle(card) {
      if (card.component === 'Approve') {
        window.open(process.env.VUE_APP_HOST + '/portal/#/bpm/approval/center')
      } else if (card.component === 'Task') {
        window.open(process.env.VUE_APP_HOST + '/portal/#/task/center')
      } else if (card.component === 'Sourcing') {
        window.location.href = this.$refs.parent.url.uri
      } else if (card.component === 'News') {
        window.location.href = `/portal/news/#/news/news?id=${this.id}`
      } else if (card.component === 'Schedule') {
        window.location.href = '/portal/#/meeting/hall'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.operations {
  > div {
    line-height: 40px;
    height: 40px;
    text-align: center;
  }
}
.module-card {
  border-radius: 20px;
  position: relative;
  // min-height: 635px;
  .title {
    font-size: 20px;
    color: #222222;
    font-weight: bold;
    cursor: pointer;
  }

  .card-header {
    position: relative;
    z-index: 10;
  }
  .module-card-btn {
    color: #4d4d4d;
  }
}
.more {
  position: relative;
  margin-right: 10px;

  &:hover .more-content {
    display: block;
  }
  .el-dropdown-link {
    cursor: pointer;
  }
  .more-content {
    // display: none;
    width: 80px;
    position: absolute;
    // top: 25px;
    right: -20px;
    z-index: 900;
    border: 1px solid #4b5c7d;
    background-color: #fff;
    border-radius: 8px;
    transition: all 0.3s ease-in;
    .arrow {
      // content:"";
      position: absolute;
      // top: -17%;
      right: 24px;
      width: 8px;
      height: 8px;
      border-left: 1px solid #4b5c7d;
      border-top: 1px solid #4b5c7d;
      z-index: 901;
      background-color: #fff;
      transform: rotate(45deg);
    }
    .more-item {
      position: relative;
      z-index: 902;
      padding: 5px 10px;
      cursor: pointer;
      text-align: center;
      font-size: 12px;
      color: #4b5c7d;
      // border-radius: 8px;
      background-color: #fff;
      &:hover {
        color: #1660f1;
        background-color: #f1f5ff;
      }
      &.all {
        border-radius: 8px !important;
      }
      &.bottom {
        border-radius: 0 0 8px 8px !important;
      }
    }
    .more-item:first-child {
      border-radius: 8px 8px 0 0;
    }
    .more-item:last-child {
      border-radius: 0 0 8px 8px;
    }
  }
}
</style>
<style scope lang="scss">
.module-card {
  margin-bottom: 20px;
  .el-dropdown {
    z-index: 999;
  }
  .el-card__header {
    height: 50px;
    border-bottom: none;
  }
  .el-card__body {
    //height: 550px;
    height: calc(100vh - 420px);
  }
  .card-dropdown {
    margin: 0 !important;
    padding: 0 !important;
    border: 1px solid #4b5c7d !important;
    .el-dropdown-menu__item {
      padding-top: 5px;
      padding-bottom: 5px;
    }
    .popper__arrow::after {
      border-bottom-color: #4b5c7d !important;
    }
  }
  .module-content {
    height: 100%;
  }
}
</style>
