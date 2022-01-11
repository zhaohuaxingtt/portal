<template>
  <iCard class="my-topics-box">
    <div class="iSearch-content">
      <div class="serch" :style="`margin-right:${stypeWidth}px;`">
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
      </div>
      <div class="operation" v-if="!hiddenRight">
        <slot name="button">
          <iButton @click="query('search')" :v-permission="searchKey">{{
            $t('MT_SOUSUO')
          }}</iButton>
          <iButton @click="goBack" :v-permission="resetKey">{{
            $t('MT_FANHUI')
          }}</iButton>
        </slot>
      </div>
    </div>
    <p class="line"></p>
    <iTableML tooltip-effect="light" :data="tableData">
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
      <el-table-column prop="follow" align="left" label="No." width="50">
        <template slot-scope="scope">
          <div class="img-word">
            <div>
              {{ scope.$index + 1 }}
            </div>
            <div>
              <img
                v-if="isTheyHaveMyOrCreatedByMyself(scope.row)"
                src="@/assets/images/add-follow-red.svg"
              />
              <img
                v-if="
                  !isTheyHaveMyOrCreatedByMyself(scope.row) && scope.row.follow
                "
                src="@/assets/images/empty-star.svg"
                @click="handleUnfollow(scope.row, following)"
                class="follow"
              />
              <img
                v-if="
                  !isTheyHaveMyOrCreatedByMyself(scope.row) && !scope.row.follow
                "
                src="@/assets/images/solid-star.svg"
                @click="handleFollow(scope.row, following)"
                class="follow"
              />
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="count"
        min-width="70"
        align="center"
        label="Count"
        width="70"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="topic"
        min-width="130"
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
        min-width="147"
        align="center"
        label="Meeting"
      >
        <template slot-scope="scope">
          <!-- <span class="open-link-text" @click="checkDetail(scope.row.meetingId)">{{scope.row.meetingName}}</span> -->
          <span>{{ scope.row.meetingName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        min-width="90"
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
      <el-table-column
        show-overflow-tooltip
        prop="duration"
        align="center"
        min-width="90"
        label="Duration"
        width="90"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="time"
        align="center"
        min-width="200"
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
        min-width="188"
        label="Presenter"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.presenter }}</span>
          <span v-if="scope.row.presenter && scope.row.presenterNosys">/</span>
          <span>{{ scope.row.presenterNosys }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="presenterDept"
        align="center"
        min-width="170"
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
      <el-table-column
        show-overflow-tooltip
        prop="supporter"
        align="center"
        min-width="200"
        label="Supporter"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.supporter }}</span>
          <span v-if="scope.row.supporter && scope.row.supporterNosys">/</span>
          <span>{{ scope.row.supporterNosys }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="supporterDept"
        align="center"
        min-width="161"
        label="Supporter Dept."
      >
        <template slot-scope="scope">
          <span>{{ scope.row.supporterDept }}</span>
          <span v-if="scope.row.supporterDept && scope.row.supporterDeptNosys"
            >/</span
          >
          <span>{{ scope.row.supporterDeptNosys }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="remark"
        align="center"
        min-width="104"
        label="Remark"
      ></el-table-column>
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
      v-if="openAddTopic"
      :openAddTopic="openAddTopic"
      :meetingInfo="meetingInfo"
      :editOrAdd="editOrAdd"
      @closeDialog="closeDialog"
      :lookThemenObj="lookThemenObj"
    >
    </addTopic>
  </iCard>
</template>

<script>
import { iCard, iPagination, iMessage } from 'rise'
import { iInput, iSelect, iButton } from 'rise'
import iDateRangePicker from '@/components/iDateRangePicker/index.vue'
import iTableML from '@/components/iTableML'
import { findMyThemens } from '@/api/meeting/myMeeting'
// import detailDialog from "./detailDialog.vue";
import detailDialog from '../components/myTopics/detailDialog.vue'
import addTopic from '../../live/components/addTopic.vue'
import { follow, unfollow } from '@/api/meeting/myMeeting'
export default {
  components: {
    iCard,
    iInput,
    iSelect,
    iButton,
    iDateRangePicker,
    // iSearch,
    iPagination,
    iTableML,
    detailDialog,
    addTopic
  },
  data() {
    return {
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
        presentItem: '02'
      },
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
    this.currentUserId = Number(sessionStorage.getItem('userId'))
    this.meetingTypeId = this.$route.query.meetingTypeId
    this.query()
  },
  watch: {
    tableData: {
      handler(tableD) {
        console.log('tableD', tableD)
      }
    }
  },
  methods: {
    // 取消关注
    handleUnfollow(e) {
      if (e.state === '03') {
        iMessage.warn('MT_YIJIESHUDEYITIBUKEYIQUXIAOGUANZHU')
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
              iMessage.success('MT_QUXIAOGUANZHUCHENGGONG')
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
        iMessage.warn('MT_YIJIESHUDEYITIBUKEYITIANJIAGUANZHU')
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
              iMessage.success('MT_GUANZHUCHENGGONG')
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
      this.lookThemenObj = { ...row }
      this.editOrAdd = 'look'
      this.openAddTopic = true
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
        meetingTypeId: this.meetingTypeId
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
        margin-right: 50px;
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
      margin-top: 22px;
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
