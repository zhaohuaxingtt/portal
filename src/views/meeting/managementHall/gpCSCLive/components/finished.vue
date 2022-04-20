<!-- 已完成 -->
<template>
  <div class="my-topics-box">
    <el-row class="row-el">
      <iButton @click="handleMore">{{ 'MORE' }}</iButton>
    </el-row>
<!-- --------------cf的列表----------------------------  -->
    <!-- <iTableML tooltip-effect="light" :data="tableData">
      <el-table-column prop="follow" align="left" label="No." width="50">
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
      <el-table-column prop="count" align="center" label="Count" width="70">
        <template slot-scope="scope">
          <span>{{ scope.row.count }}</span>
          <span v-if="scope.row.isBreak">-</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="topic"
        align="center"
        label="Topic"
        width="220"
      >
        <template slot-scope="scope">
          <span class="open-link-text" @click="lookOrEdit(scope.row)">{{
            scope.row.topic
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="meetingName"
        align="center"
        label="Meeting"
      >
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" label="Status">
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
      <el-table-column
        show-overflow-tooltip
        prop="duration"
        align="center"
        label="Duration"
        width="90"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="time"
        align="center"
        label="Time"
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
      <el-table-column
        show-overflow-tooltip
        prop="presenter"
        align="center"
        label="Presenter"
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
      <el-table-column
        show-overflow-tooltip
        prop="presenterDept"
        align="center"
        label="Presenter Dept."
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
      <el-table-column
        show-overflow-tooltip
        prop="supporter"
        align="center"
        label="Supporter"
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
      <el-table-column
        show-overflow-tooltip
        prop="supporterDept"
        align="center"
        label="Supporter Dept."
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
      <el-table-column
        show-overflow-tooltip
        prop="remark"
        align="center"
        label="Remark"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
          <span v-if="scope.row.isBreak">-</span>
        </template>
      </el-table-column>
    </iTableML> -->
<!-- --------------cf的列表----------------------------  -->

<!-- --------------gp列表----------------------------  -->
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
            <el-table-column align="center" label="#" width="50" >
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
              min-width="150"
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
              min-width="100"
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
              min-width="100"
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
              <template slot-scope="scope">
                <span>{{scope.row.time}}</span>
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
<!-- --------------gp列表----------------------------  -->
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
      v-if="openAddTopic"
      :openAddTopic="openAddTopic"
      :meetingInfo="meetingInfo"
      :editOrAdd="editOrAdd"
      @closeDialog="closeDialog"
      :lookThemenObj="lookThemenObj"
    >
    </addTopic>
  </div>
</template>

<script>
import { iPagination, iButton } from 'rise'
import iTableML from '@/components/iTableML'
import addTopic from './addTopic.vue'
export default {
  components: {
    // iInput,
    // iSelect,
    // iDateRangePicker,
    // iSearch,
    iButton,
    iPagination,
    iTableML,
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
      meetingTypeId: '',
      openAddTopic: false,
      tableLoading: false,
      openDetail: false,
      lookThemenObj: {},
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
    finishedData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  mounted() {
    this.meetingTypeId = this.$route.query.id
  },
  watch: {
    finishedData: {
      handler(newV) {
        this.dataAll = [...newV].filter((item) => {
          return !item.isBreak
        })
        this.tableData = this.dataAll.slice(0, 1 * this.page.pageSize)
        this.total = this.dataAll.length
      },
      immediate: true
    },
    // meetingInfo: {
    //   handler() {
    //     this.dataAll = [...this.finishedData]
    //     this.tableData = this.dataAll.slice(0, 1 * this.page.pageSize)
    //     this.total = this.dataAll.length
    //   },
    //   immediate: true
    // }
  },
  methods: {
    closeDialog() {
      this.openAddTopic = false
    },
    lookOrEdit(row) {
      this.lookThemenObj = { ...row }
      this.editOrAdd = 'look'
      this.openAddTopic = true
    },
    searchTableList() {
      // this.query();
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
      //       return item.state == "03";
      //     });
      //   this.dataAll = data;
      //   this.tableData = data.slice(0, 1 * this.page.pageSize);
      //   this.total = data.length;
      // });
      this.$emit('findMyThemens')
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
      this.$router.push({
        path: '/meeting/live/more-themens',
        query: {
          meetingTypeId: this.meetingTypeId
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
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
::v-deep .open-link-text {
  cursor: pointer;
}
.my-topics-box {
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
  }
}
</style>
