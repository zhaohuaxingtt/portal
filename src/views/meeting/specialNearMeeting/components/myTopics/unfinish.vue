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
        <iButton
          class="revort-topic"
          :disabled="disabledButton"
          @click="handleRevokeTopic"
          >{{ $t('撤回议题') }}</iButton
        >
        <iButton @click="handleMore">{{ 'MORE' }}</iButton>
      </div>
    </div>
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
      @closeDialog="closeDialog"
      v-if="openAddTopic"
      :openAddTopic="openAddTopic"
      :editOrAdd="editOrAdd"
      :topicInfo="lookThemenObj"
    >
    </addTopicNew>
  </div>
</template>

<script>
import { iPagination, iButton } from 'rise'
// import iSearch from "@/components/iSearch/index.vue";
// import iDateRangePicker from "@/components/iDateRangePicker/index.vue";
import iTableML from '@/components/iTableML'
import { findMyThemens } from '@/api/meeting/myMeeting'
import detailDialog from './detailDialog.vue'
import addTopicNew from '@/views/meeting/show/components/topicLookDialog.vue'
import { stateObj, themenConclusion } from '../carouselBox/data.js'
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
    addTopicNew
  },
  data() {
    return {
            processUrl: process.env.VUE_APP_POINT,
      processUrlPortal:process.env.VUE_APP_POINT_PORTA,
      disabledButton: true,
      selectedData: [],
      stateObj,
      themenConclusion,
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
    this.meetingTypeId = this.$route.query.id
    this.query()
  },
  methods: {
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
    closeDialog() {
      this.openAddTopic = false
    },
    lookOrEdit(row) {
      if (row.source === '04') {
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
        path: '/meeting/near-meeting/special-more-themens',
        // query: {
        //   meetingTypeId: this.meetingTypeId
        // }
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
        // meetingTypeId: this.meetingTypeId
        category: '02'
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
  span:first-child {
    display: block;
    width: 20px;
    /* text-align: center; */
    margin-right: 5px;
  }
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
  } */
}

::v-deep .card .cardBody {
  padding: 0;

  .iSearch-content {
    justify-content: space-between;
  }
}
</style>
