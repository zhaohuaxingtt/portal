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
    <el-row class="row-el">
      <iButton @click="handleMore">{{ 'MORE' }}</iButton>
    </el-row>
    <iTableML tooltip-effect="light" :data="tableData">
      <el-table-column prop="follow" align="center" label="NO." width="50">
        <template scope="scope">
          <div class="img-word">
            <div>
              {{ scope.$index + 1 }}
            </div>
            <div>
              <img
                v-if="scope.row.follow"
                src="~@/assets/images/empty-star.svg"
              />
              <img
                v-if="!scope.row.follow"
                src="~@/assets/images/add-follow-red.svg"
              />
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="count" align="center" label="Count" width="70">
        <template scope="scope">
          <span>{{ scope.row.count }}</span>
          <span v-if="scope.row.isBreak">/</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="topic"
        align="center"
        label="Topic"
        width="220"
      >
        <template scope="scope">
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
        <!-- <template scope="scope">
          <span class="open-link-text" @click="checkDetail(scope.row.id)">{{
            scope.row.meetingName
          }}</span>
        </template> -->
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" label="Status">
        <template scope="scope">
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
            >{{ statusObj[scope.row.meetingStatus] }}</span
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
        <template scope="scope">
          <span v-if="scope.row.startTime">{{
            scope.row.startTime && scope.row.startTime.substring(0, 5)
          }}</span>
          <span v-if="scope.row.startTime && scope.row.endTime">~</span>
          <span v-if="scope.row.endTime">{{
            scope.row.endTime && scope.row.endTime.substring(0, 5)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="presenter"
        align="center"
        label="Presenter"
      >
        <template scope="scope">
          <!-- <span>{{ scope.row.presenter }}</span>
          <span>/</span>
          <span>{{ scope.row.presenterNosys }}</span> -->
          <span v-if="scope.row.presenter && scope.row.presenterNosys"
            >{{ scope.row.presenter }}/{{ scope.row.presenterNosys }}</span
          >
          <span v-else
            >{{ scope.row.presenter }}{{ scope.row.presenterNosys }}</span
          >
          <span v-if="scope.row.isBreak">/</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="presenterDept"
        align="center"
        label="Presenter Dept."
      >
        <template scope="scope">
          <!-- <span>{{ scope.row.presenterDept }}</span>
          <span>/</span>
          <span>{{ scope.row.presenterDeptNosys }}</span> -->
          <span v-if="scope.row.presenterDept && scope.row.presenterDeptNosys"
            >{{ scope.row.presenterDept }}/{{
              scope.row.presenterDeptNosys
            }}</span
          >
          <span v-else
            >{{ scope.row.presenterDept
            }}{{ scope.row.presenterDeptNosys }}</span
          >
          <span v-if="scope.row.isBreak">/</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="supporter"
        align="center"
        label="Supporter"
      >
        <template scope="scope">
          <!-- <span>{{ scope.row.supporter }}</span>
          <span>/</span>
          <span>{{ scope.row.supporterNosys }}</span> -->
          <span v-if="scope.row.supporter && scope.row.supporterNosys"
            >{{ scope.row.supporter }}/{{ scope.row.supporterNosys }}</span
          >
          <span v-else
            >{{ scope.row.supporter }}{{ scope.row.supporterNosys }}</span
          >
          <span v-if="scope.row.isBreak">/</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="supporterDept"
        align="center"
        label="Supporter Dept."
      >
        <template scope="scope">
          <!-- <span>{{ scope.row.supporterDept }}</span>
          <span>/</span>
          <span>{{ scope.row.supporterDeptNosys }}</span> -->
          <span v-if="scope.row.supporterDept && scope.row.supporterDeptNosys"
            >{{ scope.row.supporterDept }}/{{
              scope.row.supporterDeptNosys
            }}</span
          >
          <span v-else
            >{{ scope.row.supporterDept
            }}{{ scope.row.supporterDeptNosys }}</span
          >
          <span v-if="scope.row.isBreak">/</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="remark"
        align="center"
        label="Remark"
      >
        <template scope="scope">
          <span>{{ scope.row.remark }}</span>
          <span v-if="scope.row.isBreak">/</span>
        </template>
      </el-table-column>
    </iTableML>
    <iPagination
      v-update
      @size-change="handleSizeChange($event, query)"
      @current-change="handleCurrentChange($event, query)"
      background
      :current-page="page.pageNum"
      :page-size="page.pageSize"
      layout="prev, pager, next, jumper"
      prev-text="上一页"
      next-text="下一页"
      :total="total"
    />
    <!-- <detailDialog :openDialog="openDetail" v-if="openDetail" :id="id" /> -->
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
import { iPagination } from 'rise'
import { iInput, iSelect, iButton } from 'rise'
import iSearch from '@/components/iSearch/index.vue'
import iDateRangePicker from '@/components/iDateRangePicker/index.vue'
import iTableML from '@/components/iTableML'
import addTopic from './addTopic.vue'
// import { getMyMettingList, findMyThemens } from "@/api/meeting/myMeeting";
// import detailDialog from "./detailDialog.vue";

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
        this.dataAll = [...newV].filter(item => {
          return !item.isBreak
        })
        this.tableData = this.dataAll.slice(0, 1 * this.page.pageSize)
        this.total = this.dataAll.length
      },
      immediate: true
    },
    meetingInfo: {
      handler(v) {
        this.dataAll = [...this.finishedData]
        this.tableData = this.dataAll.slice(0, 1 * this.page.pageSize)
        this.total = this.dataAll.length
      },
      immediate: true
    }
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
    searchTableList(e) {
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
  justify-content: center;
  div:first-child {
    width: 30px;
    text-align: center;
    margin-right: 9.42px;
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
