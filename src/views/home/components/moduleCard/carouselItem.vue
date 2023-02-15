<template>
  <div class="module-card">
    <span
        class="title"
        @click="handleClickTitle(card)"
        v-if="!['EKL', 'EKLAffix'].includes(card.component)"
      >
        {{ newTitle }}
        <!-- {{ language(`${card.permissionKey}`) }} -->
        <!-- {{ $t('HOME_CARD.' + card.permissionKey) }} -->
      </span>

      <eklHeader v-if="card.component === 'EKL'" @tab-click="handleEklClick" />
      <eklAffixHeader
        v-if="card.component === 'EKLAffix'"
        @tab-click="handleEklAffixClick"
      />
    <div class="module-content">
      <component
        :is="card.component"
        :data="card"
        ref="parent"
        :eklTabItem="eklTabItem"
        :eklAffixTabItem="eklAffixTabItem"
      ></component>
    </div>
    <moreDialog
      :show.sync="showDialog"
      :title="modalTitle"
      :type="card.component"
      :data="card"
    />
  </div>
</template>

<script>
import Schedule from '../Schedule/index.vue'
import Task from '../Task/index.vue'
import Approve from '../Approve/index.vue'
import News from '../News/index.vue'
import moreDialog from '../moreDialog/index.vue'
import Volume from '../Volume/index.vue'
import Sourcing from '../Sourcing/index.vue'
import Sponser from '../Sponser/index.vue'
import Delivery from '../Delivery/index.vue'
import EKL from '../EKL/index.vue'
import eklHeader from '../EKL/header'
import EKLAffix from '../EKLAffix/index.vue'
import eklAffixHeader from '../EKLAffix/header'

// import { updateModules } from '@/api/home'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      showDialog: false,
      modalTitle: '',
      show: false,
      eklTabItem: null,
      eklAffixTabItem: null
    }
  },
  components: {
    Schedule,
    Task,
    Approve,
    News,
    moreDialog,
    Volume,
    Sourcing,
    Sponser,
    Delivery,
    EKL,
    EKLAffix,
    eklHeader,
    eklAffixHeader
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
  mounted() {
    document.body.addEventListener('click', () => {
      this.show = false
    })
  },
  methods: {
    handleMore() {
      if (this.card.permissionKey === 'HOME_MODULE_APPROVE') {
        this.$router.push({ path: '/setting', query: { module: 'iAgree' } })
      }
      if (this.card.permissionKey === 'HOME_MODULE_TASK') {
        this.$router.push({ path: '/setting', query: { module: 'task' } })
      }
    },
    handleEklClick(item) {
      this.eklTabItem = item
    },
    handleEklAffixClick(item) {
      this.eklAffixTabItem = item
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
  position: relative;
  // min-height: 635px;
  .title {
    font-size: 16px;
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
  .el-dropdown {
    z-index: 999;
  }
  .el-card__header {
    height: 65px;
    border-bottom: none;
  }
  .el-card__body {
    height: 500px;
    border-bottom: none;
  }
  .el-card__body {
    height: 570px;
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
    overflow: auto;
  }
  .module-content::-webkit-scrollbar {
    width: calc(1.25rem / 2);
  }
}
</style>
