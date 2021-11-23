<template>
  <el-card class="module-card">
    <div
      slot="header"
      :class="
        !['EKL','EKLAffix'].includes(card.component)
          ? 'flex-between-center-center'
          : 'flex-end-center'
      "
    >
      <span
        class="title"
        @click="handleClickTitle(card)"
        v-if="!['EKL','EKLAffix'].includes(card.component)"
      >
        {{ newTitle }}
        <!-- {{ language(`${card.permissionKey}`) }} -->
        <!-- {{ $t('HOME_CARD.' + card.permissionKey) }} -->
      </span>
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <i class="el-icon-more"></i>
        </span>
        <el-dropdown-menu slot="dropdown" class="card-dropdown">
          <el-dropdown-item
            @click.native="handleMore"
            v-if="card.component === 'Task' || card.component === 'Approve'"
          >
            更多
          </el-dropdown-item>
          <el-dropdown-item @click.native="handleDel">删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="module-content">
      <component :is="card.component" :data="card" ref="parent"></component>
    </div>
    <moreDialog
      :show.sync="showDialog"
      :title="modalTitle"
      :type="card.component"
      :data="card"
    />
  </el-card>
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
import EKLAffix from '../EKLAffix/index.vue'

// import { updateModules } from '@/api/home'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      showDialog: false,
      modalTitle: ''
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
    EKLAffix
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
      if (this.$i18n.locale === 'zh') {
        return this.$t('HOME_CARD.' + this.card.permissionKey)
      } else if (this.$i18n.locale === 'en' && this.card.permissionKey === "HOME_MODULE_PROVIDER_RATE") {
        return this.card.permissionKey
      } else {
        return this.$t('HOME_CARD.' + this.card.permissionKey)
      }
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
      }
    },
    handleMore() {
      this.modalTitle = `Select ${this.card.name}`
      this.showDialog = true
    },
    handleDel() {
      this.$confirm(`确认删除该卡片吗`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        /* this.card.value = true
        const result = await updateModules(this.card)
        if (result.code === '200' && result.data) {
          this.$store.dispatch('getModules')
        } */
        this.$emit('del', this.card)
      })
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
  .module-card-btn {
    color: #4d4d4d;
  }
}
</style>
<style lang="scss">
.module-card {
  margin-bottom: 20PX;
  .el-dropdown {
    z-index: 999;
  }
  .el-card__header {
    border-bottom: none;
  }
  .el-card__body {
    height: 570px;
  }
}
.card-dropdown{
  margin: 0 !important;
}
</style>
