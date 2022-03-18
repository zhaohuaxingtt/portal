<template>
  <iDialog
    :title="$t('QN_WENJUANYULAN')"
    :visible.sync="preOpen"
    width="90rem"
    @close="closePreDialog"
    :close-on-click-modal="false"
    center
  >
    <div slot="title">
      <div v-if="choose == true" class="header-title">
        <div class="header-select-choose" @click="choosePC()">
          <img class="header-pc-icon" :src="pc" />
          <p class="header-name">{{ $t('QN_PCDUAN') }}</p>
          <div class="line"></div>
        </div>
        <div class="header-select" @click="chooseMobile()">
          <img class="header-mobile-icon" :src="mobile" />
          <p class="header-name">{{ $t('QN_SHOUJIDUAN') }}</p>
        </div>
      </div>
      <div v-else class="header-title">
        <div class="header-select" @click="choosePC()">
          <img class="header-pc-icon" :src="pc" />
          <p class="header-name">{{ $t('QN_PCDUAN') }}</p>
        </div>
        <div class="header-select-choose" @click="chooseMobile()">
          <img class="header-mobile-icon" :src="mobile" />
          <p class="header-name">{{ $t('QN_SHOUJIDUAN') }}</p>
          <div class="line"></div>
        </div>
      </div>
    </div>
    <div class="conatiner">
      <div class="button-list" v-show="choose">
        <iButton
          class="margin-right"
          @click="handleEdit"
          v-if="
            this.createPre == false &&
            this.previewData.state == 1 &&
            Number(previewData.createBy) === Number(currentUserId)
          "
          :diabled="
            Number(previewData.createBy) === Number(currentUserId) &&
            previewData.state != '2'
          "
          >{{ $t('QN_BIANJI') }}</iButton
        >
      </div>
      <div class="button-list" v-show="!choose">
        <iButton
          class="edit"
          @click="handleEdit"
          v-if="
            this.createPre == false &&
            this.previewData.state == 1 &&
            Number(previewData.createBy) === Number(currentUserId)
          "
          :diabled="
            Number(previewData.createBy) === Number(currentUserId) &&
            previewData.state != '2'
          "
          >{{ $t('QN_BIANJI') }}</iButton
        >
      </div>
      <prePC
        :createPre="createPre"
        :previewData="previewData"
        v-if="choose"
      ></prePC>
      <preMob v-else :previewData="previewData"></preMob>
    </div>
  </iDialog>
</template>
<script>
import { iDialog, iButton } from 'rise'
import prePC from './previewPC.vue'
import preMob from './previewMobile.vue'
import pc from '@/assets/images/survey/pc.svg'
import mobile from '@/assets/images/survey/mobile.svg'
import store from '@/store'
export default {
  components: {
    prePC,
    preMob,
    iDialog,
    iButton
    // iTabsList,
    // iSelect,
    // iFormItem,
    // iLabel,
    // iEditForm,
  },
  props: {
    preOpen: {
      type: Boolean,
      default: false
    },
    previewData: {
      type: Object,
      default() {
        return {}
      }
    },
    createPre: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      pc,
      mobile,
      currentUserId: '',
      choose: true,
      tableData: [],
      ruleForm: {
        userType: ''
      }
    }
  },
  mounted() {
    this.currentUserId = store.state.permission.userInfo.id
  },
  methods: {
    handleEdit() {
      this.$router.push({
        path: '/survey/create',
        query: {
          id: this.previewData.id
        }
      })
    },
    choosePC() {
      this.choose = true
    },
    chooseMobile() {
      this.choose = false
    },
    closePreDialog() {
      this.$emit('closePreDialog')
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-dialog__header {
  background-color: #f7f7f7;
  border-bottom: 1px solid rgba(22, 96, 241, 0.2);
}
.header-title {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: -3.125rem;
  height: 6.25rem;
  .header-select-choose {
    border: 1px solid rgba(22, 96, 241, 0.2);
    border-bottom: 0;
    background-color: #ffffff;
    border-radius: 8px 8px 0px 0px;
    width: 220px;
    .header-pc-icon {
      width: 40px;
      height: 32px;
    }
    .header-mobile-icon {
      width: 26px;
      height: 32px;
    }
    .header-name {
      font-size: 20px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #000000;
      line-height: 23px;
    }
    .line {
      width: 180px;
      height: 3px;
      background: #1660f1;
      margin: 0 auto;
    }
  }
  .header-select {
    border-radius: 8px 8px 0px 0px;
    width: 220px;
    .header-pc-icon {
      width: 40px;
      height: 32px;
    }
    .header-mobile-icon {
      width: 26px;
      height: 32px;
    }
    .header-name {
      font-size: 20px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #000000;
      line-height: 23px;
    }
  }
}
.conatiner {
  // height: 925px;
  font-family: PingFangSC-Semibold, PingFang SC;
  padding-bottom: 40px;
  .button-list {
    position: absolute;
    width: 100%;
    height: 35px;
    right: 40px;
    text-align: right;
    transform: translate(0px, -150px);
    .margin-right {
      width: 100px;
      margin-right: 30px;
    }
    .edit {
      width: 100px;
      margin-right: 30px;
      transform: translateY(60px);
    }
  }
}
</style>
