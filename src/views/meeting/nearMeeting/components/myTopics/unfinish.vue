<template>
  <div class="my-topics-box">
    <!-- <iSearch @reset="handleSearchReset" @sure="searchTableList" :icon="true">
      <el-form>
        <el-row>
          <el-form-item :label="'Present Items'">
            <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form.presentItem">
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
            label='Time'
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
    <div class="margin-bottom20 clearFloat">
      <div class="floatright">
        <iButton @click="handleMore">{{ 'MORE' }}</iButton>
      </div>
    </div>
    <iTableML tooltip-effect="light" :data="tableData">
      <el-table-column width="16" align="center" label=""></el-table-column>
      <el-table-column
        prop="follow"
        align="left"
        label="No."
        width="40"
        min-width="40"
      >
        <template slot-scope="scope">
          <div class="img-word">
            <div>
              {{ scope.$index + 1 }}
            </div>
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
      <el-table-column width="15" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="count"
        align="center"
        label="Count"
        width="50"
        min-width="50"
      ></el-table-column>
      <el-table-column width="15" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="topic"
        align="center"
        label="Topic"
        min-width="220"
      >
        <template slot-scope="scope">
          <span class="open-link-text" @click="lookOrEdit(scope.row)">{{
            scope.row.topic
          }}</span>
        </template>
      </el-table-column>
      <el-table-column width="16" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="meetingName"
        min-width="120"
        align="center"
        label="Meeting"
        width="120"
      >
        <template slot-scope="scope">
          <span
            class="open-link-text"
            @click="checkDetail(scope.row.meetingId)"
            >{{ scope.row.meetingName }}</span
          >
        </template>
      </el-table-column>

      <el-table-column width="15" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="duration"
        align="center"
        min-width="70"
        label="Duration"
        width="70"
      ></el-table-column>
      <el-table-column width="16" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="time"
        align="center"
        min-width="190"
        width="190"
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
      <el-table-column width="15" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="presenter"
        align="center"
        min-width="150"
        label="Presenter"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.presenter }}</span>
          <span v-if="scope.row.presenter && scope.row.presenterNosys">/</span>
          <span>{{ scope.row.presenterNosys }}</span>
        </template>
      </el-table-column>
      <el-table-column width="15" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="presenterDept"
        align="center"
        min-width="110"
        width="110"
        label="Presenter Dept."
      >
        <template slot-scope="scope">
          <span>{{ scope.row.presenterDept }}</span>
          <span v-if="scope.row.presenterDept && scope.row.presenterDeptNosys"
            >/</span
          >
          <span>{{ scope.row.presenterDeptNosys }}</span>
        </template>
      </el-table-column>
      <el-table-column width="15" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="supporter"
        align="center"
        min-width="160"
        label="Supporter"
        width="160"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.supporter }}</span>
          <span v-if="scope.row.supporter && scope.row.supporterNosys">/</span>
          <span>{{ scope.row.supporterNosys }}</span>
        </template>
      </el-table-column>
      <el-table-column width="15" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="supporterDept"
        align="center"
        min-width="120"
        label="Supporter Dept."
        width="120"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.supporterDept }}</span>
          <span v-if="scope.row.supporterDept && scope.row.supporterDeptNosys"
            >/</span
          >
          <span>{{ scope.row.supporterDeptNosys }}</span>
        </template>
      </el-table-column>
      <el-table-column width="16" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        min-width="70"
        width="70"
        label="Status"
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
      <el-table-column width="16" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="remark"
        align="center"
        min-width="130"
        width="130"
        label="Remark"
      ></el-table-column>
      <el-table-column width="16" align="center" label=""></el-table-column>
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
    <detailDialog
      :openDialog="openDetail"
      v-if="openDetail"
      :id="id"
      @closeDialog="closeDetail"
    />
    <addTopic
      @closeDialog="closeDialog"
      v-if="openAddTopic"
      :openAddTopic="openAddTopic"
      :editOrAdd="editOrAdd"
      :lookThemenObj="lookThemenObj"
    >
    </addTopic>
  </div>
</template>

<script>
import { iPagination, iButton } from 'rise'
// import iSearch from "@/components/iSearch/index.vue";
// import iDateRangePicker from "@/components/iDateRangePicker/index.vue";
import iTableML from '@/components/iTableML'
import { findMyThemens } from '@/api/meeting/myMeeting'
import detailDialog from './detailDialog.vue'
import addTopic from '@/views/meeting/live/components/addTopic.vue'
export default {
  components: {
    // iInput,
    // iSelect,
    // iDateRangePicker,
    // iSearch,
    iButton,
    iPagination,
    iTableML,
    detailDialog,
    addTopic
  },
  data() {
    return {
      editOrAdd: '',
      openAddTopic: false,
      meetingTypeId: '',
      tableLoading: false,
      openDetail: false,
      id: '',
      form: {
        presentItem: '03'
      },
      lookThemenObj: {},
      meetingInfo: {},
      tableData: [],
      dataAll: [],
      page: {
        pageSize: 10,
        pageNum: 1
      },
      total: 1,
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
        '01': 'MT_CAOGAO',
        '02': 'MT_KAIFANG',
        '03': 'MT_SUODING',
        '04': 'MT_KAISHI',
        '05': 'MT_JIESHU',
        '06': 'MT_GUANBI'
      }
    }
  },
  mounted() {
    this.meetingTypeId = this.$route.query.id
    this.query()
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
    // searchTableList(e) {
    //   this.query();
    // },
    // changeStart(e) {
    //   this.form.startDateBegin = e;
    // },
    // changeEnd(e) {
    //   this.form.startDateEnd = e;
    // },
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

    // 查看更多
    handleMore() {
      this.$router.push({
        path: '/meeting/near-meeting/more-themens',
        query: {
          meetingTypeId: this.meetingTypeId
        }
      })
    },

    // 查看详情
    checkDetail(e) {
      // this.id = e;
      // this.openDetail = true;
      this.$router.push({
        path: '/meeting/near-meeting/detail',
        query: {
          id: e
        }
      })
    },

    // 关闭详情弹窗
    closeDetail() {
      this.openDetail = false
    },
    // 获取数据
    query() {
      let param = {
        // ...this.form,
        // presentItem: "03",
        presentItem: '04',
        pageNum: 1,
        pageSize: 9999,
        meetingTypeId: this.meetingTypeId
      }
      findMyThemens(param).then((res) => {
        let data =
          res.data &&
          res.data.filter((item) => {
            return item.state == '01' || item.state == '02'
          })
        this.dataAll = data
        this.tableData = data.slice(0, 1 * this.page.pageSize)
        this.total = data.length
      })
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
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .cell {
  padding: 0 !important;
}
.img-word {
  display: flex;
  /* justify-content: center; */
  div:first-child {
    width: 20px;
    /* text-align: center; */
    /* margin-right: 5px; */
  }
}

/*.my-topics-box {
  ::v-deep .circle:before {
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
    background: #FCC687;
  }
  ::v-deep .open:before {
    background: #09BDFE;
  }
  ::v-deep .lock:before {
    background: #F286A0;
  }
  ::v-deep .begin:before {
    background: #1CBDB4;
  }
  ::v-deep .end:before {
    background: #8E9EAB;
  }
  ::v-deep .close:before {
    background: #887BF2;
  }
  ::v-deep .el-pagination {
    margin-top: 30px !important;
    margin-bottom: 1px;
  } 
}*/

::v-deep .card .cardBody {
  padding: 0;

  .iSearch-content {
    justify-content: space-between;
  }
}
</style>
