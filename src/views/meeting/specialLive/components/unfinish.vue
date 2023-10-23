<template>
  <div class="my-topics-box">
    <!-- <iSearch @reset="handleSearchReset" @sure="searchTableList" :icon="true">
      <el-form>
        <el-row>
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
          <iDateRangePicker
            :startDateProps="form.startDateBegin"
            :endDateProps="form.startDateEnd"
            @change-start="changeStart"
            @change-end="changeEnd"
            ref="iDateRangePicker"
            label="Time"
          />
          <el-form-item label="Topic">
            <iInput
              :placeholder="$t('LK_QINGSHURU')"
              v-model="form.topic"
            ></iInput>
          </el-form-item>
        </el-row>
      </el-form>
    </iSearch> -->
    <!-- <el-row class="divider">
      <el-divider class="divider-line"></el-divider>
    </el-row> -->
    <el-row class="row-el">
      <!-- <iButton class="add-topic" @click="handleAddTopic">{{$t('添加议题')}}</iButton> -->
      <iButton
        class="revort-topic"
        :disabled="disabledButton"
        @click="handleRevokeTopic"
        >{{ $t('MT_CHEHUIYITI') }}</iButton
      >
      <iButton @click="handleMore">{{ 'MORE' }}</iButton>
    </el-row>
    <iTableML
      tooltip-effect="light"
      :data="tableData"
      @selectionChange="selectionChange"
    >
      <el-table-column align="center" width="25"></el-table-column>
      <el-table-column
        type="selection"
        align="center"
        min-width="20"
      ></el-table-column>
      <el-table-column prop="follow" align="left" label="#" width="50">
        <template slot-scope="scope">
          <div class="img-word">
            <span>
              {{ scope.row.rowNo }}
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
        :min-width="setColumnWidth(tableData)"
      >
        <!-- min-width="223" -->
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
      <!-- <el-table-column align="center" width="30"></el-table-column> -->
      <!-- <el-table-column
        show-overflow-tooltip
        align="center"
        label="BEN(CN)"
        min-width="58"
        prop="benCn"
      >
      </el-table-column> -->
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
          {{ scope.row.state ? $t(stateObj[scope.row.state]) : '' }}
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
          <span>{{ $t(themenConclusion[scope.row.conclusionCsc]) }}</span>
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
      :prev-text="$t('MT_SHANGYIYE')"
      :next-text="$t('MT_XIAYIYE')"
      :total="total"
    />
    <!-- <detailDialog
      :openDialog='openDetail'
      v-if="openDetail"
      :id='id'
    /> -->
    <addTopicNew
      v-if="openAddTopic"
      :openAddTopic="openAddTopic"
      :meetingInfo="meetingInfo"
      :editOrAdd="editOrAdd"
      @closeDialog="closeDialog"
      :topicInfo="lookThemenObj"
      :isGetInfoById="true"
    >
    </addTopicNew>
  </div>
</template>

<script>
import { iPagination } from 'rise'
import { iButton, iMessage } from 'rise'
import iTableML from '@/components/iTableML'
import addTopicNew from '@/views/meeting/show/components/topicLookDialog.vue'
import { recallThemen } from '@/api/meeting/details'
import { stateObj, themenConclusion } from './data'
import { getUserIdListTree } from '@/api/usercenter'

export default {
  components: {
    // iInput,
    // iSelect,
    // iDateRangePicker,
    // iSearch,
    iPagination,
    iTableML,
    iButton,
    addTopicNew
    // detailDialog,
  },
  data() {
    return {
      isSelf: false,
      processUrl: process.env.VUE_APP_POINT,
      processUrlPortal: process.env.VUE_APP_POINT_PORTAL,
      processUrlGpPortal:process.env.VUE_APP_POINT_GP_PORTAL,
      themenConclusion,
      stateObj,
      editOrAdd: 'add',
      openAddTopic: false,
      disabledButton: true,
      tableLoading: false,
      openDetail: false,
      selectedData: [],
      id: '',
      form: {
        presentItem: '01'
      },
      tableData: [],
      dataAll: [],
      page: {
        pageSize: 10,
        pageNum: 1
      },
      total: 1,
      presentList: [
        {
          value: '01',
          label: '全部'
        },
        {
          value: '02',
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
  props: {
    meetingInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    unFinishedData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  watch: {
    unFinishedData: {
      handler(newV) {
        this.dataAll = [...newV].filter((item) => {
          return !item.isBreak
        })
        this.tableData = this.dataAll.slice(0, 1 * this.page.pageSize)
        this.total = this.dataAll.length
        this.page.pageNum = 1
      },
      immediate: true,
      deep: true
    }
    // meetingInfo: {
    //   handler() {
    //     this.dataAll = [...this.unFinishedData]
    //     this.tableData = this.dataAll.slice(0, 1 * this.page.pageSize)
    //     this.total = this.dataAll.length
    //   },
    //   immediate: true
    // }
  },
  methods: {
    // 02 开放  03 锁定
    //检索一个 数组是否包含03
    findLockStatus(list) {
      return list.some((item) => {
        return item.meetingStatus === '03'
      })
    },
    // objectSpanMethod({ row, column, rowIndex, columnIndex }) {
    //   if (columnIndex === 0) {
    //     if (rowIndex % 2 === 0) {
    //       return {
    //         rowspan: 2,
    //         colspan: 1,
    //       };
    //     } else {
    //       return {
    //         rowspan: 0,
    //         colspan: 0,
    //       };
    //     }
    //   }
    // },
    async queryRelateUserList(currentUserId) {
      const requestData = {
        userId: currentUserId,
        isAgent: true
      }
      return await getUserIdListTree(requestData)
    },
    async lookOrEdit(row) {
      const getUserId = JSON.parse(sessionStorage.getItem('userInfo')).id
      const currentUserId = getUserId ? getUserId.toString() : ''
      const presenterId = row.presenterId ? row.presenterId.toString() : ''
      const supporterId = row.supporterId ? row.supporterId.toString() : ''
      this.isSelf =
        currentUserId === presenterId || currentUserId === supporterId
      if (row.source === '04') {
        if (!this.isSelf) {
          const res = await this.queryRelateUserList(getUserId)
          const list = res.data.map((item) => item.toString())
          if (!(list.includes(presenterId) || list.includes(supporterId))) {
            iMessage.warn(this.$t('MT_WUCHAKANQUANXIAN'))
            return
          }
        }
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
        }else if (row.type === 'CSF') {
          window.open(
            `${this.processUrlGpPortal}/myCscDetails/${row.fixedPointApplyId}?current=3`,
            '_blank'
          )
        } else {
          window.open(
            `${this.processUrl}/designate/decisiondata/title?desinateId=${row.fixedPointApplyId}&isPreview=1`,
            '_blank'
          )
        }
      } else {
        this.lookThemenObj = row
        if (row.follow || row.meetingStatus !== '02') {
          this.editOrAdd = 'look'
          // this.editOrAdd = "edit";
          this.openAddTopic = true
          return
        }
        this.editOrAdd = 'edit'
        this.openAddTopic = true
      }
    },
    flushTable(info) {
      if (info === 'onlyClose') {
        this.closeDialog()
      }
      let timer = setTimeout(() => {
        this.$emit('findMyThemensByCondition', this.form)
        clearTimeout(timer)
      }, 0)
    },
    handleAddTopic() {
      this.editOrAdd = 'add'
      this.openAddTopic = true
    },
    handleRevokeTopic() {
      const bol = this.findLockStatus(this.selectedData)
      const warn = bol
        ? this.$t(
            'MT_QINGQUERENSHIFOUFASONGYITICHEHUISHENQINGZHIHUIYIGUANLIYUAN'
          )
        : this.$t('MT_SHIFOUCHEHUIGAIYITI')
      if (
        this.selectedData[0].meetingStatus === '02' ||
        this.selectedData[0].meetingStatus === '03'
      ) {
        this.$confirm(warn, this.$t('MT_TISHI'), {
          confirmButtonText: this.$t('MT_SHI'),
          cancelButtonText: this.$t('MT_FOU'),
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
                iMessage.success(
                  this.$t('MT_YIFASONGCHEHUISHENQINGGEIGUANLIYUAN')
                )
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
        iMessage.warn(
          this.$t('MT_ZHIYOUKAIFANGHESUODINGZHUANGTAICAIKEYICHEHUI')
        )
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
    closeDialog() {
      this.openAddTopic = false
    },
    //follow为true表示关注的，false为 自己提交的
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
    searchTableList() {
      this.$emit('findMyThemensByCondition', this.form)
    },
    changeStart(e) {
      this.form.startDateBegin = e
    },
    changeEnd(e) {
      this.form.startDateEnd = e
    },
    handleSearchReset() {
      this.form = {
        presentItem: '01'
      }
      this.page.pageNum = 1
      setTimeout(() => {
        this.$refs.iDateRangePicker.initDate()
      }, 4)
      this.query()
    },
    query() {
      // let param = {
      //   ...this.form,
      //   pageNum: 1,
      //   pageSize: 9999,
      // };
      // findMyThemens(param).then((res) => {
      //   let data =
      //     res.data &&
      //     res.data.filter((item) => {
      //       return item.state == "01" || item.state == "02";
      //     });
      //   this.dataAll = data;
      //   this.tableData = data.slice(0, 1 * this.page.pageSize);
      //   this.total = data.length;
      // });
      this.$emit('findMyThemens')
    },
    //选择页数
    handleCurrentChange(curPage) {
      this.page.pageNum = curPage
      this.currentChangePage(this.dataAll, this.page.pageNum)
    },
    // 分页方法
    currentChangePage(data, pageNum) {
      let from = (pageNum - 1) * this.page.pageSize
      let to = pageNum * this.page.pageSize
      this.tableData = data.slice(from, to)
    },

    // 查看详情
    checkDetail(e) {
      this.id = e
      this.openDetail = true
    },
    // 查看更多
    handleMore() {
      this.$router.push({
        path: '/meeting/live/special-more-themens'
      })
    },
    //表格列字符限制
    setColumnWidth(data) {
      if (!data || data.length === 0) {
        return
      }
      let index = 0
      let maxStr = ''
      for (let i = 0; i < data.length; i++) {
        if (data[i].topic === null) {
          return
        }
        const nowline = data[i].topic + ''
        const maxline = data[index].topic + ''
        if (nowline.length > maxline.length) {
          index = i
        }
      }
      maxStr = data[index].topic
      let columnWidth = 0
      for (let char of maxStr) {
        if (char >= 'A' && char <= 'Z') {
          columnWidth += 8
        } else if (char >= 'a' && char <= 'z') {
          columnWidth += 6
        } else if (char >= '\u4e00' && char <= '\u9fa5') {
          columnWidth += 13
        } else {
          columnWidth += 7
        }
      }
      if (columnWidth < 223) {
        // 设置最小宽度
        columnWidth = 223
      }
      if (columnWidth > 306) {
        columnWidth = 306
      }
      return columnWidth + 'px'
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-table-column--selection {
  position: relative;
  .el-tooltip {
    position: absolute;
    width: 20px !important;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -62%);
  }
}
::v-deep .el-table_1_column_2 {
  position: relative;
  .table-index {
    position: absolute;
    width: 100%;
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
  }
}

::v-deep .cell {
  padding: 0 !important;
}
.img-word {
  display: flex;
  /* justify-content: center; */
  span:first-child {
    display: block;
    width: 20px;
    /* text-align: center; */
    margin-right: 5px;
  }
}
::v-deep .divider {
  display: flex;
  /* height: 60px; */
  background-color: #fff;
}
::v-deep .open-link-text {
  cursor: pointer;
}
.row-el {
  width: 100%;
  height: 35px;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 24px;
  .add-topic {
    margin-right: 20px;
  }
}
/* .my-topics-box { */
/* ::v-deep .circle:before {
    content: "";
    display: inline-block;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    position: relative;
    top: 2px;
    margin-right: 10px;
  }

  ::v-deep .draft:before {
    background: #fcc687;
  }
  ::v-deep .open:before {
    background: #09bdfe;
  }
  ::v-deep .lock:before {
    background: #f286a0;
  }
  ::v-deep .begin:before {
    background: #1cbdb4;
  }
  ::v-deep .end:before {
    background: #8e9eab;
  }
  ::v-deep .close:before {
    background: #887bf2;
  }
  ::v-deep .el-pagination {
    margin-top: 30px !important;
    margin-bottom: 1px;
  } */
/* } */
::v-deep .unuse-row {
  color: #acb8cf;
}
::v-deep .active-row {
  background: #67C23A !important;
  color: #fff;
}
::v-deep .el-table--enable-row-hover .el-table__body .active-row:hover > td {
  background: #67C23A;
  color: #fff;
}
::v-deep .el-table__body tr.active-row > td {
  background: #67C23A;
  color: #fff;
}
::v-deep .card .cardBody {
  padding: 0;
  .iSearch-content {
    justify-content: space-between;
    .operation {
      align-self: auto !important;
    }
  }
}
</style>
