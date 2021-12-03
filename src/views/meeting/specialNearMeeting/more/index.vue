<template>
  <iCard class="my-topics-box">
    <div class="iSearch-content">
      <div class="serch" :style="`margin-right:${stypeWidth}px;`">
        <el-form>
          <el-row>
            <el-form-item :label="'Meeting'">
              <iSelect
                :placeholder="$t('LK_QINGXUANZE')"
                v-model="form.meetingTypeId"
              >
                <el-option
                  :value="item.id"
                  :label="item.name"
                  v-for="item of meetingTypeList"
                  :key="item.id"
                ></el-option>
              </iSelect>
            </el-form-item>
            <el-form-item :label="'Present Items'">
              <iSelect
                :placeholder="$t('LK_QINGXUANZE')"
                v-model="form.presentItem"
              >
                <el-option
                  :value="item.value"
                  :label="item.label"
                  v-for="item of presentList"
                  :key="item.value"
                ></el-option>
              </iSelect>
            </el-form-item>
            <el-form-item :label="'Commodity'">
              <iSelect
                :placeholder="$t('LK_QINGXUANZE')"
                v-model="form.commodity"
              >
                <el-option
                  :value="item.label"
                  :label="item.label"
                  v-for="item of commodityList"
                  :key="item.label"
                ></el-option>
              </iSelect>
            </el-form-item>
            <el-form-item :label="'Result'">
              <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form.result">
                <el-option
                  :value="item.conclusionCsc"
                  :label="item.conclusionName"
                  v-for="item of resultList"
                  :key="item.conclusionCsc"
                ></el-option>
              </iSelect>
            </el-form-item>
            <iDateRangePicker
              :startDateProps="form.startDateBegin"
              :endDateProps="form.startDateEnd"
              @change-start="changeStart"
              @change-end="changeEnd"
              ref="iDateRangePicker"
              :label="$t('会议日期')"
            />
          </el-row>
        </el-form>
      </div>
      <div class="operation" v-if="!hiddenRight">
        <slot name="button">
          <iButton @click="query('search')" :v-permission="searchKey">{{
            $t('搜索')
          }}</iButton>
          <iButton @click="goBack" :v-permission="resetKey">{{
            $t('返回')
          }}</iButton>
        </slot>
      </div>
    </div>
    <p class="line"></p>
    <div class="button-area">
      <iButton @click="handleReCallThemen" :disabled="disabledButton">{{
        $t('撤回议题')
      }}</iButton>
    </div>
    <iTableML
      tooltip-effect="light"
      :data="tableData"
      @selectionChange="selectionChange"
    >
      <!-- <el-table-column
        type="index"
        min-width="48"
        align="center"
        label="NO."
        width="50"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="follow"
        min-width="128"
        align="center"
        label="Follow/Create"
      >
        <template scope="scope">
          <img
            v-if="scope.row.follow"
            src="@/assets/images/empty-star.svg"
          />
          <img
            v-if="!scope.row.follow"
            src="@/assets/images/add-follow-red.svg"
          />
        </template>
      </el-table-column> -->
      <el-table-column align="center" width="25"></el-table-column>
      <el-table-column
        type="selection"
        align="center"
        min-width="20"
      ></el-table-column>
      <el-table-column prop="follow" align="left" label="#" width="50">
        <template slot-scope="scope">
          <div class="img-word">
            <span style="text-align: left">
              {{ scope.$index + 1 }}
            </span>
            <div>
              <img
                v-if="scope.row.follow"
                src="@/assets/images/empty-star.svg"
              />
              <img
                v-if="!scope.row.follow"
                src="@/assets/images/add-follow-red.svg"
              />
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" width="20"></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="topic"
        align="center"
        label="Present Items"
        min-width="223"
      >
        <template slot-scope="scope">
          <span class="open-link-text" @click="lookOrEdit(scope.row)">{{
            scope.row.topic
          }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="30"></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="meetingName"
        align="center"
        label="Meeting"
        min-width="404"
      >
      </el-table-column>
      <el-table-column align="center" width="30"></el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        label="Part No."
        min-width="164"
        prop="tnr"
      >
      </el-table-column>
      <el-table-column align="center" width="30"></el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        label="BEN(DE)"
        min-width="58"
        prop="benDe"
      >
      </el-table-column>
      <el-table-column align="center" width="30"></el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        label="Carline"
        min-width="60"
        prop="carline"
      >
      </el-table-column>
      <el-table-column align="center" width="30"></el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        label="Sourcing"
        min-width="61"
        prop="supporter"
      >
      </el-table-column>
      <el-table-column align="center" width="30"></el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        label="Linie"
        min-width="45"
        prop="presenter"
      >
      </el-table-column>
      <el-table-column align="center" width="30"></el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        label="Commodity"
        min-width="80"
        prop="presenterDept"
      >
      </el-table-column>
      <el-table-column align="center" width="30"></el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        label="State"
        min-width="45"
      >
        <template slot-scope="scope">
          {{ stateObj[scope.row.state] }}
        </template>
      </el-table-column>
      <el-table-column align="center" width="30"></el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        label="Result"
        min-width="45"
      >
        <template slot-scope="scope">
          <span>{{ themenConclusion[scope.row.conclusionCsc] }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="30"></el-table-column>
    </iTableML>
    <iPagination
      v-update
      @size-change="handleSizeChange($event, query)"
      @current-change="handleCurrentChange($event, query)"
      background
      :current-page="page.pageNum"
      :page-size="page.pageSize"
      layout="prev, pager, next, jumper"
      :prev-text="$t('上一页')"
      :next-text="$t('下一页')"
      :total="total"
    />
    <detailDialog
      :openDialog="openDetail"
      v-if="openDetail"
      :id="id"
      @closeDialog="closeDetail"
    />
    <addTopicNew
      v-if="openAddTopic"
      :openAddTopic="openAddTopic"
      :meetingInfo="meetingInfo"
      :editOrAdd="editOrAdd"
      @closeDialog="closeDialog"
      :lookThemenObj="lookThemenObj"
    >
    </addTopicNew>
  </iCard>
</template>

<script>
import { iCard, iPagination, iMessage } from 'rise'
import { iSelect, iButton } from 'rise'
import iDateRangePicker from '@/components/iDateRangePicker/index.vue'
import iTableML from '@/components/iTableML'
import { findMyThemens } from '@/api/meeting/myMeeting'
// import detailDialog from "./detailDialog.vue";
import detailDialog from '../components/myTopics/detailDialog.vue'
import addTopicNew from '../../specialLive/components/addTopicNew.vue'
import { follow, unfollow } from '@/api/meeting/myMeeting'
import { stateObj, themenConclusion } from './data'
import { recallThemen } from '@/api/meeting/details'
import { getMettingType } from '@/api/meeting/type'
export default {
  components: {
    iCard,
    iSelect,
    iButton,
    iDateRangePicker,
    // iSearch,
    iPagination,
    iTableML,
    detailDialog,
    addTopicNew
  },
  data() {
    return {
      meetingTypeList: [],
      processUrl: process.env.VUE_APP_POINT,
      processUrlPortal: process.env.VUE_APP_POINT_PORTA,
      disabledButton: true,
      stateObj,
      themenConclusion,
      following: false,
      currentPage: 1,
      lookThemenObj: {},
      editOrAdd: '',
      openAddTopic: false,
      meetingTypeId: '',
      tableLoading: false,
      openDetail: false,
      id: '',
      form: {
        presentItem: '02',
        meetingTypeId: '',
        commodity: '',
        result: '',
        time: ''
      },
      meetingInfo: {},
      tableData: [],
      dataAll: [],
      page: {
        pageSize: 10,
        pageNum: 1
      },
      total: 1,
      meetingList: [
        {
          label: 'Pre CSC'
        },
        {
          label: 'CSC'
        }
      ],
      commodityList: [
        {
          label: 'CSE'
        },
        {
          label: 'CSM'
        },
        {
          label: 'CSE'
        },
        {
          label: 'CSI'
        },
        {
          label: 'CSX'
        },
        {
          label: 'CSP'
        }
      ],
      resultList: [
        {
          conclusionCsc: '01',
          conclusionName: '待定'
        },
        {
          conclusionCsc: '02',
          conclusionName: '定点'
        },
        {
          conclusionCsc: '03',
          conclusionName: '发LOI'
        },
        {
          conclusionCsc: '04',
          conclusionName: '转TER/TOP-TER'
        },
        {
          conclusionCsc: '05',
          conclusionName: '下次Pre CSC'
        },
        {
          conclusionCsc: '06',
          conclusionName: '转CSC'
        },
        {
          conclusionCsc: '07',
          conclusionName: '关闭'
        }
      ],
      presentList: [
        {
          value: '02',
          label: '全部'
        },
        {
          value: '01',
          label: '我的'
        }
      ],
      statusObj: {
        '01': '草稿',
        '02': '开放',
        '03': '锁定',
        '04': '开始',
        '05': '结束',
        '06': '关闭'
      }
    }
  },
  mounted() {
    this.currentUserId = Number(sessionStorage.getItem('userId'))
    // this.meetingTypeId = this.$route.query.meetingTypeId
    this.query()
    this.getAllSelectList()
  },
  watch: {
    tableData: {
      handler(tableD) {
        console.log('tableD', tableD)
      }
    }
  },
  methods: {
    getAllSelectList() {
      let param = {
        pageSize: 1000,
        pageNum: 1
      }
      getMettingType(param).then((res) => {
        this.meetingTypeList = res.data.filter((item) => {
          return item.category === '02'
        })
      })
    },
    selectionChange(val) {
      this.selectedData = val
      let bol =
        val.length === 0
          ? false
          : val.every((item) => {
              // console.log(typeof item.follow)
              return (
                (item.meetingStatus === '03' || item.meetingStatus === '02') &&
                !item.follow &&
                item.state !== '04'
              )
            })
      if ((val && val.length === 1 && bol) || bol) {
        this.disabledButton = false
      } else {
        this.disabledButton = true
      }
    },
    // 02 开放  03 锁定
    //检索一个 数组是否包含03
    findLockStatus(list) {
      return list.some((item) => {
        return item.meetingStatus === '03'
      })
    },
    handleRevokeTopic() {
      const bol = this.findLockStatus(this.selectedData)
      const warn = bol
        ? '请确认是否发送议题撤回申请至会议管理员?'
        : '是否确认撤回该议题?'
      if (
        this.selectedData[0].meetingStatus === '02' ||
        this.selectedData[0].meetingStatus === '03'
      ) {
        this.$confirm(warn, '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          let promiseArr = []
          this.selectedData.forEach((item) => {
            const params = {
              meetingId: item.meetingId,
              themenId: item.id
            }
            const p = new Promise((resolve, reject) => {
              recallThemen(params)
                .then((res) => {
                  resolve(res)
                })
                .catch((err) => {
                  reject(err)
                })
            })
            promiseArr.push(p)
          })
          Promise.all(promiseArr)
            .then((res) => {
              const message = res[0].code === 200 ? res[0].message : ''
              if (bol) {
                iMessage.success('已发送会议撤回申请给管理员。')
              } else {
                iMessage.success(message)
              }
              this.flushTable()
              // res.forEach((it) => {
              //   if (it.code === 200) {
              //     iMessage.success(it.message);
              //   }
              //   this.flushTable();
              // });
            })
            .catch((err) => {
              iMessage.error(err && err[0] && err[0].message)
              // err.forEach((it) => {
              //   iMessage.error(it.message);
              // });
            })
          // const params = {
          //   meetingId: this.meetingInfo.id,
          //   themenId: this.selectedData[0].id,
          // };
          // recallThemen(params)
          //   .then((res) => {
          //     if (res.code === 200) {
          //       iMessage.success(res.message);
          //     } else {
          //       iMessage.error(res.message);
          //     }
          //   })
          //   .catch((err) => {
          //     console.log(err);
          //   });
        })
      } else {
        iMessage.warn('只有开放和锁定状态才可以撤回!')
      }
      // this.$confirm("请确认是否要撤回该议题?", "提示", {
      //   confirmButtonText: "是",
      //   cancelButtonText: "否",
      //   type: "warning",
      // }).then(() => {
      //   if (
      //     this.selectedData[0].meetingStatus === "02" ||
      //     this.selectedData[0].meetingStatus === "03"
      //   ) {
      //     const params = {
      //       meetingId: this.meetingInfo.id,
      //       themenId: this.selectedData[0].id,
      //     };
      //     recallThemen(params)
      //       .then((res) => {
      //         if (res.code === 200) {
      //           iMessage.success(res.message);
      //         } else {
      //           iMessage.error(res.message);
      //         }
      //       })
      //       .catch((err) => {
      //         console.log(err);
      //       });
      //   } else {
      //     iMessage.warn("只有开放和锁定状态才可以撤回!");
      //   }
      // });
    },
    // 取消关注
    handleUnfollow(e) {
      if (e.state === '03') {
        iMessage.warn('已经结束的议题不可以取消关注!')
        return
      }
      if (!this.following) {
        this.following = true
        let param = {
          meetingId: e.meetingId,
          themenId: e.id
        }
        // this.$confirm("是否取消关注该议题?", "提示", {
        //   confirmButtonText: "是",
        //   cancelButtonText: "否",
        //   type: "warning",
        // }).then(() => {
        unfollow(param)
          .then((res) => {
            if (res.code === 200) {
              iMessage.success('取消关注成功!')
            }
            this.query().then(() => {
              this.following = false
            })
          })
          .catch(() => {
            // iMessage.success('取消关注失败!')
            this.following = false
          })
      }
      // });
    },
    // 添加关注
    handleFollow(e, bol) {
      if (e.state === '03') {
        iMessage.warn('已经结束的议题不可以添加关注!')
        return
      }
      this.following = true
      if (!bol) {
        let param = {
          meetingId: e.meetingId,
          themenId: e.id
        }
        // this.$confirm("是否确定关注该议题?", "提示", {
        //   confirmButtonText: "是",
        //   cancelButtonText: "否",
        //   type: "warning",
        // }).then(() => {
        follow(param)
          .then((res) => {
            if (res.code === 200) {
              iMessage.success('关注成功')
            }
            this.query().then(() => {
              this.following = false
            })
          })
          .catch(() => {
            // iMessage.error('关注失败')
            this.following = false
          })
      }
      // });
    },
    isTheyHaveMyOrCreatedByMyself(item) {
      if (Number(item.createBy) === this.currentUserId) {
        return true
      }
      const presenterId = item.presenterId ? item.presenterId.split(',') : []
      const supporterId = item.supporterId ? item.supporterId.split(',') : []
      const currentUserIdStr = this.currentUserId.toString()
      if (
        presenterId.includes(currentUserIdStr) ||
        supporterId.includes(currentUserIdStr)
      ) {
        return true
      }
      return false
    },
    closeDialog() {
      this.openAddTopic = false
    },
    lookOrEdit(row) {
      if (row.source === '04') {
        // window.open(
        //     `${this.processUrl}/designate/decisiondata/mtz?desinateId=${row.fixedPointApplyId}&isPreview=1`,
        //     "_blank"
        // );
        if (row.type === 'FS+MTZ') {
          window.open(
            `${this.processUrl}/designate/decisiondata/mtz?desinateId=${row.fixedPointApplyId}&isPreview=1`,
            '_blank'
          )
        } else if (row.type === 'MTZ') {
          window.open(
            `${this.processUrlPortal}/mtz/annualGeneralBudget/locationChange/MtzLocationPoint/overflow/decisionMaterial?currentStep=3&mtzAppId=${row.fixedPointApplyId}`,
            '_blank'
          )
        } else {
          window.open(
            `${this.processUrl}/designate/decisiondata/title?desinateId=${row.fixedPointApplyId}&isPreview=1`,
            '_blank'
          )
        }
      } else {
        this.lookThemenObj = { ...row }
        this.editOrAdd = 'look'
        this.openAddTopic = true
      }
    },
    // searchTableList(e) {
    //   this.query();
    // },
    changeStart(e) {
      this.form.startDateBegin = e
    },
    changeEnd(e) {
      this.form.startDateEnd = e
    },

    // handleSearchReset() {
    //   this.form = {
    //     presentItem: '02'
    //   };
    //   this.page.pageNum = 1;
    //   setTimeout(() => {
    //     this.$refs.iDateRangePicker.initDate();
    //   }, 4);
    //   this.query();
    // },
    goBack() {
      this.$router.go(-1)
    },

    // 查看详情
    // checkDetail(e) {
    //   this.id = e;
    //   this.openDetail = true;
    // },

    // 关闭详情弹窗
    closeDetail() {
      this.openDetail = false
    },
    // 获取数据
    async query(e) {
      if (e === 'search') {
        this.currentPage = 1
      }
      let param = {
        ...this.form,
        pageNum: 1,
        pageSize: 9999,
        category: '02'
        // meetingTypeId: this.meetingTypeId
      }
      const res = await findMyThemens(param)
      let data = res.data
      this.dataAll = data
      this.tableData = data.slice(0, 1 * this.page.pageSize)
      this.total = data.length
      this.handleCurrentChange(this.currentPage)
    },
    //选择页数
    handleCurrentChange(curPage) {
      this.currentPage = curPage
      this.page.pageNum = curPage
      this.currentChangePage(this.dataAll, this.page.pageNum)
    },
    // 分页方法
    currentChangePage(data, pageNum) {
      let from = (pageNum - 1) * this.page.pageSize
      let to = pageNum * this.page.pageSize
      this.tableData = data.slice(from, to)
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-row {
  margin-bottom: 0;
}
::v-deep .cell {
  padding: 0 !important;
  width: 100% !important;
  min-width: initial !important;
  span {
    display: block;
    width: 100%;
    text-align: center;
  }
  .el-checkbox {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-checkbox__input {
      width: 14px;
    }
  }
}
.button-area {
  height: 50px;
  .el-button {
    float: right;
  }
}
.follow {
  cursor: pointer;
}
.img-word {
  display: flex;
  /* justify-content: center; */
  div:first-child {
    width: 20px;
    flex-grow: 1;
    flex-shrink: 0;
    /* text-align: center; */
    /* margin-right: 9.42px; */
  }
  div:first-child + div {
    display: flex;
    justify-content: center;
    align-items: center;
    /* margin-left: 5px; */
  }
}
.my-topics-box {
  width: 100%;
  .iSearch-content {
    width: 100%;
    justify-content: space-between;
  }
  .iSearch-content {
    transition: max-height 0.5s;
    max-height: 500px;
    overflow: hidden;
    display: flex;

    .serch {
      height: auto;
      overflow: hidden;

      ::v-deep .el-form-item {
        margin-bottom: 2px;
        width: 220px;
        float: left;
        margin-right: 20px;
        padding-left: 2px;
        padding-top: 5px;
        padding-bottom: 5px;

        .el-form-item__label {
          font-size: 14px;
          color: $color-black;
          font-weight: 400;
          line-height: 14px;
          margin-bottom: 8px;
        }

        .el-form-item__content {
          line-height: inherit;
        }
      }
    }

    ::v-deep .operation {
      transition: 0.5s;
      /* margin-top: 22px; */
      transform: translateY(-5px);
      width: 230px;
      position: relative;
      text-align: right;
      flex-shrink: 0;
      align-self: flex-end;
      padding-bottom: 6px;
      .icon {
        position: absolute;
        top: -20px;
        right: 0px;
      }
      button {
        margin-top: 5px;
      }
    }
  }

  .line {
    background: #d8d8d8;
    height: 1px;
    margin: 40px 0 30px;
  }

  .el-icon-arrow-up {
    transition: all 0.5s;
    height: 15px;
    position: relative;
    top: 8px;
  }

  .rotate {
    transform: rotate(180deg);
    color: $color-blue;
  }

  .icon {
    font-size: 20px;
    color: #d3d3db;

    &:hover {
      color: $color-blue;
    }
  }
}

/* ::v-deep .card .cardBody {
  padding: 0;

  .iSearch-content {
    justify-content: space-between;
  }
} */
::v-deep .el-table {
  /* width: 1651px; */
  width: 100%;
}
</style>
