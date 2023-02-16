<template>
  <el-card class="module-card" :class="getHeaderBgColorClass(card)">
    <!-- :class="
        !['EKL', 'EKLAffix'].includes(card.component)
          ? 'flex-between-center-center'
          : 'flex-end-center'
      " -->
    <div slot="header" class="card-header flex-between-center-center">
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
      <approveHeader v-if="card.component === 'Approve'" @tab-click="handleApproveHeaderClick" :todoCount="approvalToDoNum" />
      <taskHeader v-if="card.component === 'Task'" @tab-click="handleTaskHeaderClick" :taskQty="taskQty" />
      <meetingHeader v-if="card.component === 'Schedule'" @tab-click="handleMeetingHeaderClick" />
      <eklAffixHeader
        v-if="card.component === 'EKLAffix'"
        @tab-click="handleEklAffixClick"
      />
      <!-- 更多2 -->
<!--      <div class="more">-->
<!--        <span class="el-dropdown-link" @click.stop="show = !show">-->
<!--          <i class="el-icon-more"></i>-->
<!--        </span>-->
<!--        <div class="more-content" style="top: 17px" v-show="show">-->
<!--          <div-->
<!--            v-if="['Task', 'Approve'].includes(card.component)"-->
<!--            class="more-item"-->
<!--            @click="handleMore"-->
<!--          >-->
<!--            更多-->
<!--          </div>-->
<!--          <div-->
<!--            class="more-item"-->
<!--            :class="-->
<!--              ['Task', 'Approve'].includes(card.component) ? 'bottom' : 'all'-->
<!--            "-->
<!--            @click="handleDel"-->
<!--          >-->
<!--            删除-->
<!--          </div>-->
<!--          <i class="arrow" style="width: 8px; height: 8px; top: -4px"></i>-->
<!--        </div>-->
<!--      </div>-->
    </div>
    <div class="module-content">
      <component
        :is="card.component"
        :data="card"
        ref="parent"
        :eklTabItem="eklTabItem"
        :eklAffixTabItem="eklAffixTabItem"
        :showPendingApproval="showPendingApproval"
        :meetingTabItems="meetingTabItems"
        @approvalToDoNum="updateApprovalToDoNum"
        @taskQty="updateTaskQty"
      ></component>
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
import eklHeader from '../EKL/header'
import approveHeader from '../Approve/header'
import taskHeader from '../Task/header'
import meetingHeader from  '../Schedule/Header'
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
      showPendingApproval: true,
      eklAffixTabItem: null,
      meetingTabItems: null,
      approvalToDoNum: 0,
      taskQty: null
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
    approveHeader,
    taskHeader,
    meetingHeader,
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
      // if (this.$i18n.locale === 'zh') {
      //   return this.$t('HOME_CARD.' + this.card.permissionKey)
      // } else if (
      //   this.$i18n.locale === 'en' &&
      //   this.card.permissionKey === 'HOME_MODULE_PROVIDER_RATE'
      // ) {
      //   return this.card.permissionKey
      // } else {
      //   return this.$t('HOME_CARD.' + this.card.permissionKey)
      // }
      if(this.card.component === 'Task') {
        return this.$t('HOME_CARD.HOME_MODULE_I_TASK')
      } else if(this.card.component === 'Schedule') {
        return this.$t('HOME_CARD.HOME_MODULE_I_MEETING')
      }
      return this.$t('HOME_CARD.' + this.card.permissionKey)
    }
  },
  mounted() {
    document.body.addEventListener('click', () => {
      this.show = false
    })
  },
  methods: {
    getHeaderBgColorClass(card) {
      if (card.component === 'Approve') {
        return 'deep-blue-header'
      } else if(card.component === 'Task') {
        return 'blue-header'
      } else if(card.component === 'Schedule') {
        return 'deep-blue-header'
      } else {
        return 'blue-header'
      }
    },
    handleClickTitle(card) {
      console.log(card, '111111111')
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
    },
    handleMore() {
      /* this.modalTitle = `Select ${this.card.name}`
      this.showDialog = true */
      if (this.card.permissionKey === 'HOME_MODULE_APPROVE') {
        this.$router.push({ path: '/setting', query: { module: 'iAgree' } })
      }
      if (this.card.permissionKey === 'HOME_MODULE_TASK') {
        this.$router.push({ path: '/setting', query: { module: 'task' } })
      }
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
    },
    handleEklClick(item) {
      this.eklTabItem = item
    },
    updateApprovalToDoNum(todoCount) {
      this.approvalToDoNum = todoCount
    },
    updateTaskQty(taskQty) {
      this.taskQty = taskQty
    },
    handleApproveHeaderClick(item) {
      this.showPendingApproval = item
    },
    handleTaskHeaderClick() {

    },
    handleMeetingHeaderClick(meetingTabItems) {
      this.meetingTabItems = meetingTabItems
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
  .flex-between-center-center {
    align-items: center;
    height: 65px;
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
  &.deep-blue-header {
    .el-card__header {
      background-color: rgb(29, 51, 88);
      .title {
        color: rgb(255, 255, 255);
      }
    }
  }
  &.blue-header {
    .el-card__header {
      background-color: rgb(15, 66, 145);
      .title {
        color: rgb(255, 255, 255);
      }
    }
  }
  .el-dropdown {
    z-index: 999;
  }
  .el-card__header {
    height: 65px;
    border-bottom: none;
    padding-top: 0;
    padding-bottom: 0;
    //padding-top: 4px;
    //padding-bottom: 4px;
  }
  .el-card__body {
    height: 520px;
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
  .module-content::-webkit-scrollbar {
    width: calc(1.25rem / 2);
  }
}
</style>
