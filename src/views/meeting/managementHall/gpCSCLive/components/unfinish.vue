    <!-- 未完成 -->
<template>
  <div class="my-topics-box">
    <el-row class="row-el">
      <iButton class="add-topic" @click="handleAddTopic" :disabled="disabledAddTopic">{{ $t('MT_TIANJIAYITI') }}</iButton>
      <iButton class="revort-topic" :disabled="disabledButton"
        @click="handleRevokeTopic" >{{ $t('MT_CHEHUIYITI') }}</iButton>
      <iButton @click="handleMore">{{ 'MORE' }}</iButton>
    </el-row>
<!-- --------------cf的列表----------------------------  -->
    <!-- <iTableML
      tooltip-effect="light"
      :data="tableData"
      @selectionChange="selectionChange"
    >
      <el-table-column width="18" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        type="selection"
        align="center"
        width="20"
        min-width="20"
      ></el-table-column>
      <el-table-column width="18" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="follow"
        align="left"
        label="No."
        width="60"
        min-width="60"
      >
        <template slot-scope="scope">
          <div class="img-word">
            <span>
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
      <el-table-column width="18" align="center" label=""></el-table-column>
      <el-table-column
        prop="count"
        align="center"
        label="Count"
        width="50"
        min-width="50"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.count }}</span>
          <span v-if="scope.row.isBreak">-</span>
        </template>
      </el-table-column>
      <el-table-column width="18" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="topic"
        align="center"
        label="Topic"
        width="220"
        min-width="220"
      >
        <template slot-scope="scope">
          <span class="open-link-text" @click="lookOrEdit(scope.row)">{{
            scope.row.topic
          }}</span>
        </template>
      </el-table-column>
      <el-table-column width="18" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="meetingName"
        align="center"
        label="Meeting"
        min-width="120"
        width="120"
      >
      </el-table-column>
      <el-table-column width="18" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        label="Status"
        min-width="60"
        width="60"
      >
        <template slot-scope="scope">
          <span
            :class="[
              {
                draft: scope.row.meetingStatus == '01',
                open: scope.row.meetingStatus == '02',
                lock: scope.row.meetingStatus == '03',
                begin: scope.row.meetingStatus == '04',
                end: scope.row.meetingStatus == '05',
                close: scope.row.meetingStatus == '06'
              },
              'circle'
            ]"
            >{{ $t(statusObj[scope.row.meetingStatus]) }}</span
          >
        </template>
      </el-table-column>
      <el-table-column width="18" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="duration"
        align="center"
        label="Duration"
        width="70"
        min-width="70"
      ></el-table-column>
      <el-table-column width="8" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="time"
        align="center"
        label="Time"
        class="time-container"
        width="120"
        min-width="120"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.startTime">
            <span>{{
              Number(scope.row.plusDayStartTime) > 0
                ? scope.row.startTime.substring(0, 5) +
                  ' +' +
                  Number(scope.row.plusDayStartTime)
                : scope.row.startTime.substring(0, 5)
            }}</span
            ><span>~</span>
            <span v-if="scope.row.endTime">{{
              Number(scope.row.plusDayEndTime) > 0
                ? scope.row.endTime.substring(0, 5) +
                  ' +' +
                  Number(scope.row.plusDayEndTime)
                : scope.row.endTime.substring(0, 5)
            }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="8" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="presenter"
        align="center"
        label="Presenter"
        width="170"
        min-width="170"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.presenter && scope.row.presenterNosys"
            >{{ scope.row.presenter }}/{{ scope.row.presenterNosys }}</span
          >
          <span v-else
            >{{ scope.row.presenter }}{{ scope.row.presenterNosys }}</span
          >
          <span v-if="scope.row.isBreak">-</span>
        </template>
      </el-table-column>
      <el-table-column width="17" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="presenterDept"
        align="center"
        label="Presenter Dept."
        width="120"
        min-width="120"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.presenterDept && scope.row.presenterDeptNosys"
            >{{ scope.row.presenterDept }}/{{
              scope.row.presenterDeptNosys
            }}</span
          >
          <span v-else
            >{{ scope.row.presenterDept
            }}{{ scope.row.presenterDeptNosys }}</span
          >
          <span v-if="scope.row.isBreak">-</span>
        </template>
      </el-table-column>
      <el-table-column width="18" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="supporter"
        align="center"
        label="Supporter"
        width="160"
        min-width="160"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.supporter && scope.row.supporterNosys"
            >{{ scope.row.supporter }}/{{ scope.row.supporterNosys }}</span
          >
          <span v-else
            >{{ scope.row.supporter }}{{ scope.row.supporterNosys }}</span
          >
          <span v-if="scope.row.isBreak">-</span>
        </template>
      </el-table-column>
      <el-table-column width="17" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="supporterDept"
        align="center"
        label="Supporter Dept."
        width="130"
        min-width="130"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.supporterDept && scope.row.supporterDeptNosys"
            >{{ scope.row.supporterDept }}/{{
              scope.row.supporterDeptNosys
            }}</span
          >
          <span v-else
            >{{ scope.row.supporterDept
            }}{{ scope.row.supporterDeptNosys }}</span
          >
          <span v-if="scope.row.isBreak">-</span>
        </template>
      </el-table-column>
      <el-table-column width="18" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="remark"
        align="center"
        label="Remark"
        width="130"
        min-width="130"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
          <span v-if="scope.row.isBreak">-</span>
        </template>
      </el-table-column>
      <el-table-column width="18" align="center" label=""></el-table-column>
    </iTableML> -->
<!-- --------------cf的列表----------------------------- -->
<!-- --------------gp列表----------------------------- -->
            <!-- :height="'32.125rem'"
            tooltip-effect="light"
            @selectionChange="handleSelectionChange"
            :loading="tableLoading"
            :data="tableData"
            @go-detail="handleGoDetail"
            v-if="!showUpdateTopicButtonList"
            :rowClassName="tableRowClassName"
            :currentRow="currentRow"
            :isSingle="isSingle"
            ref="hiddenColumnTable" -->
    <iTableML
    tooltip-effect="light"
      :data="tableData"
      @selectionChange="selectionChange"
          >
            <!-- <el-table-column align="center" width="30"></el-table-column> -->
            <el-table-column
              type="selection"
              align="center"
              min-width="40"
            ></el-table-column>
            <!-- <el-table-column align="center" width="10"></el-table-column> -->
            <el-table-column align="center" label="#" width="23" >
              <template slot-scope="scope">
                <span style="span-index">{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <!-- 标记 -->
            <el-table-column align="center" label="标记" min-width="50">
              <template slot-scope="scope">
                <icon symbol :name="scope.row.sign=='S' ? 'iconicon-baofeichuzhi' : scope.row.sign=='F' ?'iconicon-fenduandingdian':''" ></icon>
              </template>
            </el-table-column>
            <!-- 股别 presenterDept  -->
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="股别"
              min-width="136"
              prop="股别"
              sortable
            >
            <template slot-scope="scope">
                <span>{{scope.row.presenterDept }}</span>
              </template>
            </el-table-column>
            <!-- 项目  gpName 改 topic-->
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="项目"
              min-width="198"
            >
              <template slot-scope="scope">
                <span class="open-link-text look-themen-click" @click="lookOrEdit(scope.row)">{{scope.row.topic}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column align="center" width="15"></el-table-column> -->
            <!-- 上会次数 cscCount-->
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="上会次数"
              min-width="75"
              prop="上会次数"
            >
              <template slot-scope="scope">
                <span>{{scope.row.cscCount}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column align="center" width="15"></el-table-column> -->
            <!-- 采购申请号 procurementNumber 改 sourcingNo  -->
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="采购申请号"
              min-width="75"
            >
              <template slot-scope="scope">
                {{ scope.row.sourcingNo }}
              </template>
            </el-table-column>
            <!-- 申请部门  applyDept 改 supporterDept  -->
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="申请部门"
              min-width="59"
            >
              <template slot-scope="scope">
                <span>{{scope.row.supporterDept }}</span>
              </template>
            </el-table-column>
            <!-- 申请人  requestorName  改 supporter  -->
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="申请人"
              min-width="65"
              prop="ep"
            >
              <template slot-scope="scope">
                <span>{{scope.row.supporter}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column align="center" width="16"></el-table-column> -->
            <!-- 采购员  purchaserName  改 presenter  -->
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="采购员"
              min-width="115"
              prop="采购员"
            >
              <template slot-scope="scope">
                <span>{{scope.row.presenter}}</span>
              </template>
            </el-table-column>
            <!-- 时间  time-->
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="时间"
              min-width="82"
            >
              <!-- <template slot-scope="scope">
                <span>{{scope.row.time}}</span>
              </template> -->
              <template slot-scope="scope">
              <div v-if="scope.row.startTime">
                <span>{{
                  Number(scope.row.plusDayStartTime) > 0
                    ? scope.row.startTime.substring(0, 5) +
                      ' +' +
                      Number(scope.row.plusDayStartTime)
                    : scope.row.startTime.substring(0, 5)
                }}</span
                ><span>~</span>
                <span v-if="scope.row.endTime">{{
                  Number(scope.row.plusDayEndTime) > 0
                    ? scope.row.endTime.substring(0, 5) +
                      ' +' +
                      Number(scope.row.plusDayEndTime)
                    : scope.row.endTime.substring(0, 5)
                }}</span>
              </div>
            </template>
            </el-table-column>
            <!-- <el-table-column align="center" width="14"></el-table-column> -->
            <!-- 状态  state-->
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="状态"
              min-width="90"
              prop="presenterDept"
            >
               <template slot-scope="scope">
                  {{ stateObj[scope.row.state] }}
                </template>
            </el-table-column>
            <!-- <el-table-column align="center" width="20"></el-table-column> -->
            <!-- 会议结论/纪要  conclusion-->
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="会议结论/纪要"
              min-width="86"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.conclusion=='01'||  scope.row.conclusion=='11'" style="color:blue" @click="handleResultObj(scope.row)">{{resultObj[scope.row.conclusion]}}</span>
                <span v-else>{{resultObj[scope.row.conclusion]}}</span>
              </template>
            </el-table-column>
            <!-- 是否推送大会 -->
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="是否推送大会"
              min-width="119"
              label-class-name="can-hideen"
            >
              <template slot-scope="scope">
                <span>{{scope.row.isSendBm == false ? '否' : scope.row.isSendBm == true ? '是' : ''}}</span>
              </template>
            </el-table-column>
            <!-- CSC汇报材料  cscStatus-->
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="CSC汇报材料"
              min-width="119"
              label-class-name="can-hideen"
            >
              <template slot-scope="scope">
                <span>{{scope.row.cscStatus}}</span>
              </template>
            </el-table-column>
            <!-- 是否冻结   conclusion   02 就是通过 冻结-->
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="是否冻结"
              width="89"
              label-class-name="can-hideen"
            >
              <template slot-scope="scope">
                <span>{{scope.row.conclusion == '02' ? '是' : '否' }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column align="center" width="30"></el-table-column> -->
            <!-- 属性  attribute-->
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="属性"
              width="88"
              prop="benDe"
              label-class-name="can-hideen"
            >
              <template slot-scope="scope">
                <span>{{scope.row.attribute}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column align="center" width="30"></el-table-column> -->
            <!-- CSC编号  cscCode-->
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="CSC编号"
              min-width="90"
            >
              <template slot-scope="scope">
                <span>{{scope.row.cscCode}}</span>
              </template>
            </el-table-column>
          </iTableML>

<!-- --------------gp列表----------------------------- -->

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
    <addTopic
      @closeDialog="closeDialog"
      v-if="openAddTopic"
      :openAddTopic="openAddTopic"
      @flushTable="flushTable"
      :meetingInfo="meetingInfo"
      :editOrAdd="editOrAdd"
      :selectedTableData="selectedTableData"
      :lookThemenObj="lookThemenObj"
    >
    </addTopic>
  </div>
</template>

<script>
import { iPagination } from 'rise'
// import { iInput, iSelect, iButton, iMessage } from "rise";
import { iButton, iMessage } from 'rise'
// import iSearch from "@/components/iSearch/index.vue";
// import iDateRangePicker from "@/components/iDateRangePicker/index.vue";
import iTableML from '@/components/iTableML'
// import { getMyMettingList, findMyThemens } from "@/api/meeting/myMeeting";
import addTopic from './addTopic.vue'
import { recallThemen } from '@/api/meeting/details'

export default {
  components: {
    // iInput,
    // iSelect,
    // iDateRangePicker,
    // iSearch,
    iPagination,
    iTableML,
    iButton,
    addTopic
    // detailDialog,
  },
  data() {
    return {
      resultObj:{
        '01': '待定',
        '08': '通过',
        '09': '预备会议通过',
        '10': '不通过',
        '11': 'Last Call',
        '12': '分段定点'
      },
       stateObj :{
        '01': '未进行',
        '02': '进行中',
        '03': '已结束',
        '04': '申请撤回'
      },
      disabledAddTopic:true,
      meetingTypeId: '',
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
        '01': 'MT_CAOGAO',
        '02': 'MT_KAIFANG',
        '03': 'MT_SUODING',
        '04': 'MT_KAISHI',
        '05': 'MT_JIESHU',
        '06': 'MT_GUANBI'
      }
    }
  },
  props: {
    // condition: {
    //   type: Object,
    //   default: () => {
    //     return {};
    //   },
    // },
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
        // this.unFinishedData = newV.filter((item) => {
        //   return !item.isBreak;
        // });
        this.dataAll = [...newV].filter((item) => {
          return !item.isBreak
        })
        this.tableData = this.dataAll.slice(0, 1 * this.page.pageSize)
        this.total = this.dataAll.length
        this.page.pageNum = 1
      },
      immediate: true
    },
    // meetingInfo: {
    //   handler() {
    //     console.log('11111111111111111111111')
    //     this.dataAll = [...this.unFinishedData]
    //     this.tableData = this.dataAll.slice(0, 1 * this.page.pageSize)
    //     this.total = this.dataAll.length
    //   },
    //   immediate: true,
    // }
  },
  mounted() {
    // console.log(this.unFinishedData[0].type)
    //后来gp说这个按钮是gp会议就禁用
    if (this.unFinishedData[0].type == 'GP') {
      this.disabledAddTopic=false
    }
    this.meetingTypeId = this.$route.query.id
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
    lookOrEdit(row) {
      this.lookThemenObj = row
      if (row.follow || row.meetingStatus !== '02') {
        this.editOrAdd = 'look'
        // this.editOrAdd = "edit";
        this.openAddTopic = true
        return
      }
      this.editOrAdd = 'edit'
      this.openAddTopic = true
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
      console.log(val);
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
            console.log(bol);
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
      this.$emit('findMyGpThemens')
    },
    //选择页数
    handleCurrentChange(curPage) {
      console.log('curPage', curPage)
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
      console.log(this.$route.query.id);
      this.$router.push({
        // path: '/meeting/live/more-themens',
        path: '/CSCmeeting/live/more-themens',
        query: {
          meetingTypeId: this.$route.query.id
        }
      })
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
  background: #1660f1 !important;
  color: #fff;
}
::v-deep .el-table--enable-row-hover .el-table__body .active-row:hover > td {
  background: #1660f1;
  color: #fff;
}
::v-deep .el-table__body tr.active-row > td {
  background: #1660f1;
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
