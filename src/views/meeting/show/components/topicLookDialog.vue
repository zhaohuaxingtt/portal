<template>
  <!--转派-->
  <iDialog
    :title="$t('MT_YITIXINXI')"
    :visible.sync="openAddTopic"
    width="55rem"
    @close="clearDiolog"
    :close-on-click-modal="false"
  >
    <ul class="content-top">
      <li class="info-row">
        <div class="left">{{ topicInfo.topic }}</div>
        <div class="right">
          {{ start }}~{{ end
          }}<span style="margin-left: 5px">{{
            $t(status[topicInfo.state])
          }}</span>
        </div>
      </li>
      <!-- 议题寻源号 -->
      <li class="info-row">
        <div class="left">Sourcing No.</div>
        <div class="right">{{ topicInfo.sourcingNo }}</div>
      </li>

      <!-- 零件号 -->
      <li class="info-row">
        <div class="left">TNR</div>
        <div class="right">{{ topicInfo.tnr }}</div>
      </li>

      <!-- 零件中文名 -->
      <li class="info-row">
        <div class="left">BEN (CN)</div>
        <div class="right">{{ topicInfo.benCn }}</div>
      </li>

      <!-- 零件德文名 -->
      <li class="info-row">
        <div class="left">BEN (DE)</div>
        <div class="right">{{ topicInfo.benDe }}</div>
      </li>

      <!-- 车型 -->
      <li class="info-row">
        <div class="left">Carline</div>
        <div class="right">
          {{ topicInfo.carline }}
        </div>
      </li>

      <!-- 支持者 -->
      <li class="info-row">
        <div class="left">Sourcing Buyer</div>
        <div class="right">
          {{ isMeetingShow ? topicInfo.supporterEn : topicInfo.supporter }}
        </div>
      </li>

      <!-- 演讲人 -->
      <li class="info-row">
        <div class="left">Linie Buyer</div>
        <div class="right">
          {{ isMeetingShow ? topicInfo.presenterEn : topicInfo.presenter }}
        </div>
      </li>

      <!-- EP -->
      <li class="info-row">
        <div class="left">EP</div>
        <div class="right">
          {{ topicInfo.ep }}
        </div>
      </li>

      <!-- 零件号 -->
      <li class="info-row">
        <div class="left">Part Type</div>
        <div class="right">
          {{ topicInfo.partType }}
        </div>
      </li>

      <!-- 状态 -->
      <li class="info-row">
        <div class="left">Status</div>
        <div class="right">
          <span>{{
            (topicInfo.cscCount || 0) + '/' + (topicInfo.preCount || 0)
          }}</span>
        </div>
      </li>
    </ul>
    <div class="form-item-att">Attachment</div>
    <div class="foot">
      <div class="bottom" v-if="showAttachments">
        <div
          class="down"
          @click="handleDownLoad(item)"
          v-for="(item, index) of topicInfo.attachments"
          :key="index"
        >
          <span class="down-load">{{ item.attachmentName }}</span>
        </div>
      </div>
      <!-- <div v-else class="bottom">{{ showAttachmentsText }}</div> -->
      <div v-else class="bottom"></div>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iMessage } from 'rise'
import dayjs from 'dayjs'
import enclosure from '@/assets/images/enclosure.svg'
import { download } from '@/utils/downloadUtil'
import { findTheThemenById } from '@/api/meeting/details'
import { getUsers } from '@/api/usercenter/receiver.js'
// import { getSapApplicationList } from '@/api/meeting/details.js'
import { getUserIdListTree } from '@/api/usercenter'

export default {
  components: {
    iDialog
  },
  props: {
    openAddTopic: { type: Boolean, default: false },
    topicInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    isGetInfoById: {
      type: Boolean,
      default: false
    },
    isOnly: {
      type: Boolean,
      default: false
    },
    isMeetingShow: {
      type: Boolean,
      default: false
    },
    isSelf: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showAttachments: false,
      showAttachmentsText: '',
      topicInfoCopy: {},
      enclosure: enclosure,
      status: {
        '01': 'MT_WEIJINXING',
        '02': 'MT_JINXINGZHONG',
        '03': 'MT_YIJIESHU'
      },
      themenData: '',
      currentUserId: JSON.parse(sessionStorage.getItem('userInfo')).id
    }
  },
  computed: {
    start() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.topicInfo = this.themenData ? this.themenData : this.topicInfo
      return dayjs(new Date(`2021-9-23 ${this.topicInfo.startTime}`)).format(
        'HH:mm'
      )
    },
    end() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.topicInfo = this.themenData ? this.themenData : this.topicInfo
      return dayjs(new Date(`2021-9-23 ${this.topicInfo.endTime}`)).format(
        'HH:mm'
      )
    },
    compuSupporter() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.topicInfo = this.themenData ? this.themenData : this.topicInfo
      return this.compuShouldShow(
        this.topicInfo.supporter,
        this.topicInfo.supporterDept
      )
    },
    compuSupporDept() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.topicInfo = this.themenData ? this.themenData : this.topicInfo
      return this.compuShouldShow(
        this.topicInfo.supporterDept,
        this.topicInfo.supporterDeptNosys
      )
    },
    compuPresenter() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.topicInfo = this.themenData ? this.themenData : this.topicInfo
      return this.compuShouldShow(
        this.topicInfo.presenter,
        this.topicInfo.presenterNosys
      )
    },
    compuPresenterDept() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.topicInfo = this.themenData ? this.themenData : this.topicInfo
      return this.compuShouldShow(
        this.topicInfo.presenterDept,
        this.topicInfo.presenterDeptNosys
      )
    }
    // computedPrensterAndSupporter() {
    //   return {
    //     supporter: this.topicInfo.presenter,
    //     presenter: this.topicInfo.supporter
    //   }
    // }
  },
  // watch: {
  //   computedPrensterAndSupporter: {
  //     handler(info) {
  //       this.getUerNameById([info.presenter, info.supporter]).then((res) => {
  //         if (!res.data) {
  //           this.presenterName = ''
  //           this.supporterName = ''
  //           return
  //         }
  //         if (res.data.length === 1) {
  //           this.presenterName = res.data[0].nameZh
  //           this.supporterName = res.data[0].nameZh
  //           return
  //         }
  //         this.presenterName = res.data[0].nameZh
  //         this.supporterName = res.data[1].nameZh
  //       })
  //     },
  //     immediate: true,
  //     deep: true
  //   }
  // },
  created() {
    if (this.isOnly) {
      this.showAttachments = this.isOnly
    }
    if (this.isGetInfoById) {
      const p1 = new Promise((resolve, reject) => {
        const presenterName = this.topicInfo.presenter
        const supporterName = this.topicInfo.supporter
        findTheThemenById({
          themenId: this.topicInfo.id,
          meetingId: this.topicInfo.meetingId
        })
          .then((res) => {
            res.presenterId = res.presenter
            res.supporterId = res.supporter
            res.presenter = presenterName
            res.supporter = supporterName
            this.topicInfo = res
            this.themenData = res
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
      const p2 = new Promise(async (resolve, reject) => {
        resolve(
          await this.queryRelateUserList().catch((err) => {
            reject(err)
          })
        )
      })
      if (this.isSelf) {
        Promise.all([p1]).then(() => {
          this.showAttachments = true
        })
      } else {
        Promise.all([p1, p2]).then((resArr) => {
          const presnterId = resArr[0].presenterId
            ? resArr[0].presenterId.toString()
            : ''
          const supporterId = resArr[0].supporterId
            ? resArr[0].supporterId.toString()
            : ''
          const relateUserList = resArr[1].data.map((item) => {
            return item.toString()
          })
          this.showAttachments =
            relateUserList.includes(presnterId) ||
            relateUserList.includes(supporterId)
          this.showAttachmentsText = this.showAttachments
            ? ''
            : this.$t('MT_WUCHAKANQUANXIAN')
        })
      }
    }
  },
  methods: {
    async queryRelateUserList() {
      const requestData = {
        userId: this.currentUserId,
        isAgent: true
      }
      return await getUserIdListTree(requestData)
    },
    async getUerNameById(ids) {
      const res = await getUsers({ userIdList: [...ids] })
      return res
    },
    compuShouldShow(p, pNosys) {
      let s1 = p
      let s2 = pNosys ? (p ? ',' + pNosys : pNosys) : ''
      let s3 = s1 + s2
      const arrs = s3 ? s3.split(',') : []
      if (arrs.length > 3) {
        return {
          hiddenS: s3,
          showS: arrs.slice(0, 3).join(',')
        }
      }
      return {
        hiddenS: '',
        showS: s3
      }
    },
    clearDiolog() {
      this.$emit('closeDialog')
    },
    // 下载附件
    handleDownLoad(e) {
      if (e.attachmentUrl) {
        window.open(`${e.attachmentUrl}`, '_blank')
      } else {
        download({
          fileIds: e.attachmentId,
          // url: MOCK_FILE_URL + e.attachmentId,
          filename: e.attachmentName,
          callback: (e) => {
            if (!e) {
              iMessage.error(this.$t('MT_XIAZAISHIBAI'))
            }
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-dialog {
  margin-top: 12vh !important;
}
.form-item-att {
  margin-top: 1.5rem;
  font-weight: 400;
  line-height: 17px;
  color: #000000;
}
.hidden-span {
  cursor: pointer;
}
.content-top {
  .info-row {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 17px;
    font-size: 16px;
    font-family: Arial;
    font-weight: 400;
    line-height: 17px;
    color: #000000;
    border-bottom: 1px solid #ddd;
    padding-bottom: 1.5rem;
    .left {
      width: 250px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: left;
    }
    .right {
      text-align: left;
      font-weight: 600;
      font-size: 1rem;
    }
  }
  .info-row + .info-row {
    margin-top: 1.5rem;
  }
}
.line {
  margin: 0;
  padding: 0;
  margin-top: 21px;
}
.foot {
  height: 100px;
  .bottom {
    height: 68px;
    overflow-y: auto;
    .down {
      display: flex;
      height: 20px;
      margin-top: 14px;
      align-items: center;
      cursor: pointer;
      .down-load {
        color: #67C23A;
      }
      .img-box {
        margin-right: 5px;
        width: 20px;
        height: 20px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
