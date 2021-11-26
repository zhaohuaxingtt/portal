<template>
  <iPage>
    <div>
      <div class="header">
        <div class="row">
          <div class="meeting-type">
            <div class="name">会议名称</div>
            <div class="name-content" :title="meetingInfo.name">
              {{ meetingInfo.name }}
            </div>
            <iButton
              class="button"
              @click="currentButtonList.methodName"
              disabled
              >{{ $t(currentButtonList.title) }}</iButton
            >
          </div>
          <div class="button-list">
            <iButton
              class="button"
              v-for="(item, index) of currentButtonList.rightButtonList"
              :key="index"
              @click="
                () => {
                  handleClick(item.methodName)
                }
              "
              :disabled="item.disabled == true && tableData.length !== 0"
            >
              {{ $t(item.title) }}</iButton
            >
          </div>
        </div>
        <div class="row">
          <div class="list">
            <div class="show">
              <div class="title">会议类型</div>
              <div class="content">
                {{ typeObject[meetingInfo.meetingTypeId] }}
              </div>
            </div>
            <div class="show">
              <div class="title">会议地点</div>
              <div
                class="content content-address"
                :title="meetingInfo.meetingPlace"
              >
                {{ meetingInfo.meetingPlace }}
              </div>
            </div>
            <div class="show">
              <div class="title">会议时间</div>
              <div class="content">
                {{ `${begin}${end.includes(':') ? end : ''}` }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <iCard>
        <actionButtons
          :currentButtonList="tableButtonList"
          :showUpdateTopicButtonList="showUpdateTopicButtonList"
          @addRest="addRest"
          @addTopic="addTopic"
          @updateTopic="updateTopic"
          @importTopic="importTopic"
          @editTopic="editTopic"
          @protectInfo="protectInfo"
          @deleteTop="deleteTop"
          @updateDate="updateDate"
          @overUpdateTopic="overUpdateTopic"
          @cancelUpdateTopic="cancelUpdateTopic"
          @start="start"
          @split="split"
          @overTopic="overTopic"
          @startTopic="startTopic"
          @close="close"
          @deleteTopAll="deleteTopAll"
          @protectResult="protectResult"
          @lookResult="lookResult"
          @bePending="bePending"
          @fixedPoint="fixedPoint"
          @translateCSC="translateCSC"
          @nextPreCSC="nextPreCSC"
          @senLol="senLol"
          @translateTer="translateTer"
          @freezeRsBill="freezeRsBill"
          @closeResult="closeResult"
        />
        <div class="table-container">
          <iTableML
            :height="'32.125rem'"
            tooltip-effect="light"
            @selectionChange="handleSelectionChange"
            :loading="tableLoading"
            :data="tableData"
            @go-detail="handleGoDetail"
            v-if="!showUpdateTopicButtonList"
            :rowClassName="tableRowClassName"
            :currentRow="currentRow"
            :isSingle="isSingle"
          >
            <el-table-column align="center" width="30"></el-table-column>
            <el-table-column
              type="selection"
              align="center"
              min-width="20"
              width="20"
            ></el-table-column>
            <el-table-column align="center" width="10"></el-table-column>
            <el-table-column align="center" label="#" width="16">
              <template slot-scope="scope">
                <span style="span-index">{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="24"></el-table-column>
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="Time"
              min-width="84"
            >
              <template slot-scope="scope">
                <span class="open-link-text">{{
                  scope.row.time.split('~').join('-')
                }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="30"></el-table-column>
            <!-- <el-table-column
              show-overflow-tooltip
              align="center"
              label="Present Items"
              min-width="191"
            >
              <template slot-scope="scope">
                <span
                  class="open-link-text look-themen-click"
                  @click="lookThemen(scope.row)"
                  >{{ scope.row.topic }}</span
                >
              </template>
            </el-table-column> -->
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="Present Items"
              min-width="191"
            >
              <template slot-scope="scope">
                <span
                  class="open-link-text look-themen-click inline"
                  @click="lookThemen(scope.row)"
                  >{{ scope.row.topic }}</span
                >
              </template>
            </el-table-column>
            <el-table-column align="center" width="30"></el-table-column>
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="Type"
              min-width="75"
              prop="type"
            >
              <template slot-scope="scope">
                {{
                  scope.row.type === 'MANUAL' ? '手工议题' : scope.row.type
                }}
              </template>
            </el-table-column>
            <el-table-column align="center" width="30"></el-table-column>
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="State"
              min-width="60"
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
              min-width="44"
            >
              <template slot-scope="scope">
                <span>{{ themenConclusion[scope.row.conclusionCsc] }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="30"></el-table-column>
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="EP"
              min-width="19"
              prop="ep"
            >
            </el-table-column>
            <el-table-column align="center" width="31"></el-table-column>
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="Sourcing"
              min-width="61"
              prop="supporter"
            >
            </el-table-column>
            <el-table-column align="center" width="24"></el-table-column>
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="Linie"
              min-width="48"
              prop="presenter"
            >
            </el-table-column>
            <el-table-column align="center" width="24"></el-table-column>
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="Commodity"
              min-width="79"
              prop="presenterDept"
            >
            </el-table-column>
            <el-table-column align="center" width="30"></el-table-column>
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="Duration"
              min-width="61"
              prop="duration"
            >
              <template slot-scope="scope">
                <div
                  class="open-link-text open-clink-back-text"
                  @click="recallTheThemen(scope.row)"
                  v-if="scope.row.state === '04'"
                >
                  <div class="open-text-text-choice"></div>
                </div>
                <span class="open-link-text" v-else>{{
                  scope.row.duration
                }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="30"></el-table-column>
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="Sourcing No."
              min-width="89"
              prop="sourcingNo"
            >
            </el-table-column>
            <el-table-column align="center" width="30"></el-table-column>
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="TNR"
              min-width="30"
              prop="tnr"
            >
            </el-table-column>
            <el-table-column align="center" width="30"></el-table-column>
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="BEN(CN)"
              width="59"
              prop="benCn"
            >
            </el-table-column>
            <el-table-column align="center" width="30"></el-table-column>
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="BEN(DE)"
              width="58"
              prop="benDe"
            >
            </el-table-column>
            <el-table-column align="center" width="30"></el-table-column>
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="Status"
              min-width="44"
            >
              <template slot-scope="scope">
                <span
                  >{{ scope.row.cscCount ? scope.row.cscCount : 0 }}/{{
                    scope.row.preCount ? scope.row.preCount : 0
                  }}</span
                >
              </template>
            </el-table-column>
            <el-table-column align="center" width="30"></el-table-column>
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="Carline"
              min-width="49"
              prop="carline"
            >
            </el-table-column>
            <el-table-column align="center" width="30"></el-table-column>
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="Part Type"
              min-width="66"
              prop="partType"
            >
              <template slot-scope="scope">
                <span class="open-link-text">{{ scope.row.remark }}</span>
                <span v-if="scope.row.isBreak">/</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="26.5"></el-table-column>
          </iTableML>
          <div id="table-drag">
            <iTableML
              :height="'32.125rem'"
              tooltip-effect="light"
              @selectionChange="handleSelectionChange"
              :loading="tableLoading"
              :data="tableData"
              @go-detail="handleGoDetail"
              v-if="showUpdateTopicButtonList"
              :rowClassName="tableRowClassName"
            >
              <el-table-column align="center" width="30"></el-table-column>
              <el-table-column
                type="selection"
                align="center"
                min-width="20"
                width="20"
              ></el-table-column>
              <el-table-column align="center" width="10"></el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                label="#"
                width="20"
              >
                <template slot-scope="scope">
                  <span style="span-index">{{ scope.$index + 1 }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" width="24"></el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                label="Time"
                min-width="84"
              >
                <template slot-scope="scope">
                  <span class="open-link-text">{{
                    scope.row.time.split('~').join('-')
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" width="30"></el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                label="Present Items"
                min-width="191"
              >
                <template slot-scope="scope">
                  <span
                    class="open-link-text look-themen-click inline"
                    @click="lookThemen(scope.row)"
                    >{{ scope.row.topic }}</span
                  >
                </template>
              </el-table-column>
              <el-table-column align="center" width="30"></el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                label="Type"
                min-width="33"
                prop="type"
              >
                <template slot-scope="scope">
                  {{
                    scope.row.type === 'MANUAL' ? '手工议题' : scope.row.type
                  }}
                </template>
              </el-table-column>
              <el-table-column align="center" width="30"></el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                label="State"
                min-width="42"
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
                min-width="44"
              >
                <template slot-scope="scope">
                  <span>{{ themenConclusion[scope.row.conclusionCsc] }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" width="30"></el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                label="EP"
                min-width="19"
                prop="ep"
              >
              </el-table-column>
              <el-table-column align="center" width="31"></el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                label="Sourcing"
                min-width="61"
                prop="supporter"
              >
              </el-table-column>
              <el-table-column align="center" width="24"></el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                label="Linie"
                min-width="48"
                prop="presenter"
              >
              </el-table-column>
              <el-table-column align="center" width="24"></el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                label="Commodity"
                min-width="79"
                prop="presenterDept"
              >
              </el-table-column>
              <el-table-column align="center" width="30"></el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                label="Duration"
                min-width="61"
                prop="duration"
              >
              </el-table-column>
              <el-table-column align="center" width="30"></el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                label="Sourcing No."
                min-width="89"
                prop="sourcingNo"
              >
              </el-table-column>
              <el-table-column align="center" width="30"></el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                label="TNR"
                min-width="30"
                prop="tnr"
              >
              </el-table-column>
              <el-table-column align="center" width="30"></el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                label="BEN(CN)"
                width="59"
                prop="benCn"
              >
              </el-table-column>
              <el-table-column align="center" width="30"></el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                label="BEN(DE)"
                width="58"
                prop="benDe"
              >
              </el-table-column>
              <el-table-column align="center" width="30"></el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                label="Status"
                min-width="44"
              >
                <template slot-scope="scope">
                  <span
                    >{{ scope.row.cscCount ? scope.row.cscCount : 0 }}/{{
                      scope.row.preCount ? scope.row.preCount : 0
                    }}</span
                  >
                </template>
              </el-table-column>
              <el-table-column align="center" width="30"></el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                label="Carline"
                min-width="49"
                prop="carline"
              >
              </el-table-column>
              <el-table-column align="center" width="30"></el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                label="Part Type"
                min-width="66"
                prop="partType"
              >
                <template slot-scope="scope">
                  <span class="open-link-text">{{ scope.row.remark }}</span>
                  <span v-if="scope.row.isBreak">/</span>
                </template>
              </el-table-column>
              <el-table-column align="center" width="26.5"></el-table-column>
            </iTableML>
          </div>
        </div>
        <!-- <iPagination
          v-update
          @size-change="handleSizeChange($event, query)"
          @current-change="handleCurrentChange($event, query)"
          background
          :current-page="page.currPage"
          :page-sizes="page.pages"
          :page-size="page.pageSize"
          layout="prev, pager, next"
          prev-text="上一页"
          next-text="下一页"
          :total="page.totalCount"
        /> -->
      </iCard>
    </div>

    <addRest
      @closeDialog="closeDialog"
      :dialogStatusManageObj="dialogStatusManageObj"
      v-if="dialogStatusManageObj.openAddRestDialog"
      :meetingInfo="meetingInfo"
      @flushTable="flushTable"
      :typeObject="typeObject"
      :selectedTableData="selectedTableData"
      :editOrAdd="editOrAdd"
      :lookThemenObj="lookThemenObj"
    />
    <addTopic
      @closeDialog="closeDialog"
      :dialogStatusManageObj="dialogStatusManageObj"
      v-if="dialogStatusManageObj.openAddTopicDialog"
      @flushTable="flushTable"
      :meetingInfo="meetingInfo"
      :editOrAdd="editOrAdd"
      :selectedTableData="selectedTableData"
      :lookThemenObj="lookThemenObj"
    />
    <addTopicNew
      @closeDialog="closeDialog"
      :dialogStatusManageObj="dialogStatusManageObj"
      v-if="dialogStatusManageObj.openAddTopicNewDialog"
      @flushTable="flushTable"
      :meetingInfo="meetingInfo"
      :editOrAdd="editOrAdd"
      :selectedTableData="selectedTableData"
      :lookThemenObj="lookThemenObj"
    />
    <newProtectInfo
      @closeDialog="closeDialog"
      :dialogStatusManageObj="dialogStatusManageObj"
      v-if="dialogStatusManageObj.openProtectInfoDialog"
      @flushTable="flushTable"
      :selectedTableData="selectedTableData"
      :meetingInfo="meetingInfo"
    />
    <confirmSplit
      @closeDialog="closeDialog"
      :dialogStatusManageObj="dialogStatusManageObj"
      @flushTable="flushTable"
      :meetingInfo="meetingInfo"
      :selectedTableData="selectedTableData"
    ></confirmSplit>
    <updateDate
      @closeDialog="closeDialog"
      :dialogStatusManageObj="dialogStatusManageObj"
      @flushTable="flushTable"
      :typeObject="typeObject"
      :meetingInfo="meetingInfo"
      :selectedTableData="selectedTableData"
      v-if="dialogStatusManageObj.openUpdateDateDialog"
    ></updateDate>
    <updateMeetingDialog
      v-if="dialogStatusManageObj.openUpdate"
      :openUpdate="dialogStatusManageObj.openUpdate"
      :id="$route.query.id"
      :typeObject="typeObject"
      @handleSubmit="handleUpdateSubmit"
      @closeDialog="closeDialog"
      @refreshTable="flushTable"
    />
    <newSummaryDialog
      v-if="dialogStatusManageObj.openNewSummaryDialog"
      :open="dialogStatusManageObj.openNewSummaryDialog"
      :id="$route.query.id"
      @handleCancel="handleCancelTopics"
      @handleOK="handleOKTopics"
      @refreshTable="flushTable"
      :edit="editNewSummary"
    ></newSummaryDialog>
    <newSummaryDialogNew
      v-if="dialogStatusManageObj.openNewSummaryDialogNew"
      :open="dialogStatusManageObj.openNewSummaryDialogNew"
      :id="$route.query.id"
      :receiverId="receiverId"
      @handleCancel="handleCancelTopics"
      @handleOK="handleOKTopics"
      @refreshTable="flushTable"
      :edit="editNewSummary"
    ></newSummaryDialogNew>
    <!-- 关闭触发审批流 -->
    <closeMeetiongDialog
      v-show="dialogStatusManageObj.openCloseMeetiongDialog"
      :openCloseMeeting="dialogStatusManageObj.openCloseMeetiongDialog"
      :row="meetingInfo"
      :id="$route.query.id"
      @handleOK="handleOKTopics"
      @handleClose="handleCloseCancelTopics"
      ref="closeDialog"
    />
    <protectConclusion
      v-if="dialogStatusManageObj.openProtectConclusion"
      :open="dialogStatusManageObj.openProtectConclusion"
      @flushTable="flushTable"
      @closeDialog="closeDialog"
      :selectedTableData="selectedTableData"
      :meetingInfo="meetingInfo"
      :isOther="isOther"
      :beforeResult="beforeResult"
      :autoOpenProtectConclusionObj="autoOpenProtectConclusionObj"
    />
    <lookConclusion
      v-if="dialogStatusManageObj.openLookConclusion"
      :open="dialogStatusManageObj.openLookConclusion"
      @flushTable="flushTable"
      @closeDialog="closeDialog"
      :selectedTableData="selectedTableData"
      :meetingInfo="meetingInfo"
    />
    <topicLookDialog
      v-if="dialogStatusManageObj.openTopicLookDialog"
      :openAddTopic="dialogStatusManageObj.openTopicLookDialog"
      @closeDialog="closeDialog"
      :topicInfo="topicInfo"
    />
  </iPage>
</template>
<script>
import { iPage, iCard, iButton, iMessage } from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import { buttonList, stateObj, themenConclusion } from './component/data'
import actionButtons from './component/actionButtons.vue'
import addRest from './component/addRest.vue'
import addTopic from './component/addTopic.vue'
import topicLookDialog from './component/topicLookDialog.vue'
import newProtectInfo from './component/newProtectInfo.vue'
import updateDate from './component/updateDate.vue'
import iTableML from '@/components/iTableML'
import protectConclusion from './component/protectConclusion.vue'
import addTopicNew from './component/addTopicNew.vue'
import lookConclusion from './component/lookConclusion.vue'

import {
  findThemenById,
  endThemen,
  startThemen,
  // recallThemen,
  passThemenRecall,
  rejectThemenRecall,
  deleteThemen,
  resortThemen,
  spiltThemen
} from '@/api/meeting/details'
import Sortable from 'sortablejs'
import dayjs from '@/utils/dayjs.js'
import { getMettingType } from '@/api/meeting/type' //resortThemen
import updateMeetingDialog from '../home/components/updateMeetingDialog.vue'
import newSummaryDialog from './component/newSummaryDialog.vue'
import { batchRecallMeeting, changeStateMeeting, importThemen } from '@/api/meeting/home'
import closeMeetiongDialog from './component/closeMeetiongDialog.vue'
import { download } from '@/utils/downloadUtil'
import enclosure from '@/assets/images/enclosure.svg'
import newSummaryDialogNew from '@/views/meeting/home/components/newSummaryDialogNew.vue'

export default {
  mixins: [pageMixins],
  components: {
    iPage,
    iCard,
    // iPagination,
    // iTableCustom,
    actionButtons,
    iButton,
    addRest,
    addTopic,
    newProtectInfo,
    updateDate,
    updateMeetingDialog,
    newSummaryDialog,
    closeMeetiongDialog,
    protectConclusion,
    topicLookDialog,
    lookConclusion,
    iTableML,
    newSummaryDialogNew,
    addTopicNew
  },
  data() {
    return {
      autoOpenProtectConclusionObj: '',
      isSingle: false,
      // closeLoading: false,
      curState: '',
      processUrl: process.env.VUE_APP_POINT,
      buttonList,
      receiverId: '',
      selectedTableData: [],
      isOther: false,
      themenConclusion,
      stateObj,
      meetingType: '',
      type: '',
      currentRow: {},
      nameList: [],
      disabledImportThemenButton: false,
      // isAdmin: false,
      timer: false,
      enclosure,
      //生成和查看会议纪要
      editNewSummary: false,
      //弹窗状态管理对象
      dialogStatusManageObj: {
        openAddRestDialog: false,
        openAddTopicDialog: false,
        openProtectInfoDialog: false,
        openDeleteTopDialog: false,
        openUpdateDateDialog: false,
        openSplitDialog: false,
        openImportTopicDialog: false,
        openProtectConclusion: false,
        openLookConclusion: false,
        //修改对话框
        openUpdate: false,
        openNewSummaryDialog: false,
        openCloseMeetiongDialog: false,
        openNewSummaryDialogNew: false,
        openAddTopicNewDialog: false,
        // topicLookDialog:false,
        openTopicLookDialog: false
      },
      //外部引入的弹窗
      currentButtonList: [],
      tableButtonList: [],
      showUpdateTopicButtonList: false,
      meetingInfo: {},
      tableData: [],
      resThemeData: [],
      editOrAdd: 'add',
      cancelOrAdjust: false,
      typeObject: {},
      shouldhanldeUpdateData: [],
      openTopics: false,
      handleDisabledButtonName: [
        'editTopic',
        'protectInfo',
        'deleteTopAll',
        'updateDate',
        'split'
        // "startTopic",
        // "overTopic",
      ],
      lookThemenObj: {},
      display: 'none',
      changedArr: '',
      topicInfo: {},
      openAddTopic: false,
      beforeResult: ''
    }
  },
  watch: {
    isAdmin: {
      handler() {},
      immediate: true
    },
    resThemeData: {
      handler(data) {
        const row = data.find((item) => item.state === '02')
        this.currentRow = { ...row }
      }
    }
  },
  mounted() {
    // this.type = this.$route.query.type
    // this.isAdmin = localStorage.getItem("isMA") === "false" ? false : true;
    this.getMeetingTypeObject()
    this.getTableData()
  },
  // created() {
  //   console.log(
  //     "this.type",
  //     this.type,
  //     this.type === "CSC",
  //     this.type === "Pre CSC"
  //   );
  //   if (this.type === "CSC") {
  //     this.currentButtonList.rightButtonList = this.fillterStr(
  //       this.currentButtonList.rightButtonList,
  //       "锁定"
  //     );
  //   }
  //   if (this.type === "Pre CSC") {
  //     this.currentButtonList.rightButtonList = this.fillterStr(
  //       this.currentButtonList.rightButtonList,
  //       "开始"
  //     );
  //   }
  // },
  methods: {
    //待定
    bePending() {
      this.isOther = true
      this.selectedTableData = this.selectedTableData.map((item, index) => {
        if (index === 0) {
          return {
            ...item,
            conclusionCsc: '01',
            toDoMeetingName: '',
            toDoMeeting: '',
            isFrozenRs: false
          }
        }
        return item
      })
      this.openDialog('openProtectConclusion')
    },
    //定点
    fixedPoint() {
      this.isOther = true
      this.beforeResult = this.selectedTableData[0].conclusionCsc
      this.selectedTableData = this.selectedTableData.map((item, index) => {
        if (index === 0) {
          return {
            ...item,
            conclusionCsc: '02',
            toDoMeetingName: '',
            toDoMeeting: ''
          }
        }
        return item
      })
      this.openDialog('openProtectConclusion')
    },
    //转CSC
    translateCSC() {
      this.isOther = true
      this.selectedTableData = this.selectedTableData.map((item, index) => {
        if (index === 0) {
          return {
            ...item,
            conclusionCsc: '06',
            isFrozenRs: false
          }
        }
        return item
      })
      this.openDialog('openProtectConclusion')
    },
    //下次Pre CSC
    nextPreCSC() {
      this.isOther = true
      this.selectedTableData = this.selectedTableData.map((item, index) => {
        if (index === 0) {
          return {
            ...item,
            conclusionCsc: '05',
            isFrozenRs: false
          }
        }
        return item
      })
      this.openDialog('openProtectConclusion')
    },
    //发Lol
    senLol() {
      this.isOther = true
      this.selectedTableData = this.selectedTableData.map((item, index) => {
        if (index === 0) {
          return {
            ...item,
            conclusionCsc: '03',
            toDoMeetingName: '',
            toDoMeeting: '',
            isFrozenRs: false
          }
        }
        return item
      })
      this.openDialog('openProtectConclusion')
    },
    //转TER/TOP-TER
    translateTer() {
      this.isOther = true
      this.selectedTableData = this.selectedTableData.map((item, index) => {
        if (index === 0) {
          return {
            ...item,
            conclusionCsc: '04',
            toDoMeetingName: '',
            toDoMeeting: '',
            isFrozenRs: false
          }
        }
        return item
      })
      this.openDialog('openProtectConclusion')
    },
    //冻结RS单
    freezeRsBill() {
      this.isOther = true
      this.selectedTableData = this.selectedTableData.map((item, index) => {
        if (index === 0) {
          return {
            ...item,
            isFrozenRs: true,
            toDoMeetingName: '',
            toDoMeeting: ''
          }
        }
        return item
      })
      this.openDialog('openProtectConclusion')
    },
    //关闭
    closeResult() {
      this.isOther = true
      this.selectedTableData = this.selectedTableData.map((item, index) => {
        if (index === 0) {
          return {
            ...item,
            conclusionCsc: '07',
            isFrozenRs: false,
            toDoMeetingName: '',
            toDoMeeting: ''
          }
        }
        return item
      })
      this.openDialog('openProtectConclusion')
    },

    //查看结论
    lookResult() {
      this.openDialog('openLookConclusion')
    },
    // 维护结论
    protectResult() {
      this.isOther = false
      this.openDialog('openProtectConclusion')
    },
    getUplodFiles(nameList) {
      this.nameList = nameList
    },
    // 下载模版
    downDemo() {
      download({
        url: '/rise-meeting/meetingService/downloadThemenImportTemplate',
        filename: '议题模版',
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel',
        callback: (e) => {
          if (e) {
            iMessage.success('下载模版成功')
          } else {
            iMessage.error('下载模版成功')
          }
        },
        noFileUd: true
      })
      // downloadThemenImportTemplate().then((res)=>{
      //   console.log('res',res)
      // })
    },
    recallTheThemen(themen) {
      const params = {
        meetingId: this.meetingInfo.id,
        themenId: themen.id
      }
      this.$confirm('是否同意撤回该议题？', '提示', {
        confirmButtonText: '同意',
        cancelButtonText: '拒绝',
        distinguishCancelAndClose: true,
        type: 'warning'
      })
        .then(() => {
          passThemenRecall(params)
            .then((res) => {
              if (res.code === 200) {
                this.flushTable()
                // iMessage.success(res.message);
                iMessage.success('审批通过')
                return
              }
              iMessage.error(res.message)
              this.flushTable()
              return
            })
            .catch((err) => {
              this.flushTable()
              iMessage.error('同意失败,原因: ' + err)
            })
        })
        .catch((err) => {
          if (err === 'cancel') {
            rejectThemenRecall(params)
              .then((res) => {
                if (res.code === 200) {
                  this.flushTable()
                  iMessage.success('拒绝成功!')
                  // iMessage.success(res.message);
                  return
                }
                iMessage.error(res.message)
                this.flushTable()
                return
              })
              .catch((err) => {
                this.flushTable()
                iMessage.error('拒绝失败,原因: ' + err)
              })
          } else {
            return
          }
        })
    },
    generateMeetingMinutes() {
      this.editNewSummary = true
      this.receiverId = this.meetingInfo?.receiverId
      this.openDialog('openNewSummaryDialogNew')
    },
    lookMeetingMinutes() {
      this.editNewSummary = false
      this.openDialog('openNewSummaryDialog')
    },
    lookThemen(themen) {
      if (themen.type == 'MANUAL') {
        this.topicInfo = themen
        this.openAddTopic = true
        this.openDialog('openTopicLookDialog')
      } else if (!themen.isBreak) {
        this.editOrAdd = 'look'
        this.lookThemenObj = themen
        if (themen.source === '04') {
          window.open(
            `${this.processUrl}/designate/decisiondata/mtz?desinateId=${themen.fixedPointApplyId}&isPreview=1`,
            '_blank'
          )
        } else {
          this.openDialog('openAddTopicNewDialog')
        }
      } else {
        this.editOrAdd = 'look'
        this.lookThemenObj = themen
        this.openDialog('openAddRestDialog')
      }
    },
    closeDialogTopic() {
      this.openAddTopic = false
    },
    // 导入议题保存
    handleOKTopics(info) {
      if (info === 'close') {
        iMessage.success('关闭成功')
      }
      this.closeDialog()
      this.flushTable()
    },
    // 导入议题保存
    handleOKImportTopic(a, b) {
      if (this.nameList.length <= 0) {
        iMessage.warn('请导入议题后再保存')
        return
      }
      this.disabledImportThemenButton = true
      let param = {
        id: this.meetingInfo.id,
        attachment: {
          attachmentId: b[0].id,
          attachmentName: b[0].name,
          attachmentUrl: b[0].url,
          source: '05'
        }
      }
      importThemen(param)
        .then((res) => {
          if (res.id) {
            iMessage.success('导入议题成功')
            this.openTopics = false
            this.disabledImportThemenButton = false
            // this.refreshTable();
            this.flushTable()
            this.closeDialog()
            this.nameList = []
          }
        })
        .catch(() => {
          this.disabledImportThemenButton = false
          this.nameList = []
        })
      this.flushTable()
    },
    // 导入议题取消
    handleCancelTopics() {
      this.closeDialog()
    },
    handleCloseCancelTopics() {
      this.closeDialog()
      this.getMeetingTypeObject()
      this.getTableData()
    },
    handleUpdateSubmit() {
      this.flushTable()
    },
    generateTime() {
      const startDate = this.meetingInfo.startDate
      const startTime = this.meetingInfo.startTime
      const endDate = this.meetingInfo.endDate
      const endTime = this.meetingInfo.endTime
      this.begin = dayjs(new Date(`${startDate} ${startTime}`)).format(
        'YYYY/MM/DD HH:mm'
      )
      this.end = `~${dayjs(new Date(`${endDate} ${endTime}`)).format('HH:mm')}`
    },
    setTypeObj(e) {
      let typeObj = {}
      e.forEach((item) => {
        typeObj[item.id] = item.name
      })
      this.typeObject = typeObj
    },
    getMeetingTypeObject() {
      let param = {
        pageSize: 1000,
        pageNum: 1
      }
      getMettingType(param).then((res) => {
        this.meetingTypeList = res.data
        this.setTypeObj(res.data)
        // this.$emit("setTypeObj", res.data);
      })
    },

    //行拖拽
    rowDrop() {
      const tbody = document.querySelector('.el-table__body-wrapper tbody')
      const _this = this
      this.tableObject = new Sortable(tbody, {
        filter: '.dragable-row',
        onFilter() {
          iMessage.warn('已结束或进行中的议题不可以被调整!')
        },
        onMove(evt) {
          const classStr = evt.related.getAttribute('class')
          if (classStr.includes('dragable-row')) {
            if (!_this.timer) {
              _this.timer = true
              iMessage.warn('不可以把议题拖拽到已结束或者进行中的议题之前!')
              let timers = setTimeout(() => {
                _this.timer = null
                clearTimeout(timers)
              }, 3000)
            }

            return false
          }
        },
        onEnd({ newIndex, oldIndex }) {
          _this.$nextTick(() => {
            let targetIndex = newIndex
            let sourceIndex = oldIndex
            _this.handleDragDataTransform(targetIndex, sourceIndex)
          })
        }
      })
    },
    moveInArray(arr, from, to) {
      // 确保是有效数组
      if (Object.prototype.toString.call(arr) !== '[object Array]') {
        throw new Error('Please provide a valid array')
      }

      // 删除当前的位置
      var item = arr.splice(from, 1)

      // 确保还剩有元素移动
      if (!item.length) {
        throw new Error('There is no item in the array at index ' + from)
      }

      // 移动元素到指定位置
      arr.splice(to, 0, item[0])
      return arr
    },
    //处理数组数据互换
    handleDragDataTransform(targetIndex, sourceIndex) {
      this.changedArr = this.changedArr
        ? this.changedArr
        : [...this.resThemeData]
      this.moveInArray(this.changedArr, sourceIndex, targetIndex)
    },
    getTableData() {
      const meetingId = this.$route.query.id
      this.queryMeetingInfoById(meetingId)
    },
    handlePage(data = []) {
      // this.page.totalCount = data.length;
      // this.page.pageSize = 10;
      // this.tableData = data.filter((item, index) => {
      //   return index < 10;
      // });
      this.tableData = data
      this.tableData = this.tableData.map((item) => {
        const startTime = dayjs(`2020-6-30 ${item.startTime}`).format('HH:mm')
        const endTime = dayjs(`2020-6-30 ${item.endTime}`).format('HH:mm')
        return {
          ...item,
          time: `${startTime}~${endTime}`
        }
      })
    },
    fillterStr(arr, str) {
      return arr.filter((item) => {
        return item.title !== str
      })
    },
    goState(state, isCSC, isPreCSC) {
      this.curState = state
      switch (state) {
        //草稿
        case '01':
          break
        //开放
        case '02':
          this.currentButtonList = this.buttonList[0]
          // this.type = this.$route.query.type
          // console.log(
          //   'this.type',
          //   this.type,
          //   this.type === 'CSC',
          //   this.type === 'Pre CSC'
          // )
          if (isCSC) {
            this.currentButtonList.rightButtonList = this.fillterStr(
              [
                { title: "撤回", methodName: "recall", disabled: true},
                { title: '锁定', methodName: 'lock' },
                { title: '开始', methodName: 'start' },
                { title: '修改', methodName: 'edit' },
                { title: '返回', methodName: 'back' }
              ],
              '锁定'
            )
          }
          if (isPreCSC) {
            this.currentButtonList.rightButtonList = this.fillterStr(
              [
                { title: "撤回", methodName: "recall", disabled: true},
                { title: '锁定', methodName: 'lock' },
                { title: '开始', methodName: 'start' },
                { title: '修改', methodName: 'edit' },
                { title: '返回', methodName: 'back' }
              ],
              '开始'
            )
          }
          this.tableButtonList = this.currentButtonList.tableButtonList
          break
        //锁定
        case '03':
          this.currentButtonList = this.buttonList[1]
          this.tableButtonList = this.currentButtonList.tableButtonList
          break
        //开始
        case '04':
          this.currentButtonList = this.buttonList[2]
          this.tableButtonList = this.currentButtonList.tableButtonList
          break
        // 结束
        case '05':
          this.currentButtonList = this.buttonList[3]
          this.tableButtonList = this.currentButtonList.tableButtonList
          break
        // 关闭
        case '06':
          this.currentButtonList = this.buttonList[4]
          this.tableButtonList = this.currentButtonList.tableButtonList
          break
        default:
          break
      }
    },
    queryMeetingInfoById(id) {
      const data = {
        id
      }
      const _this = this
      findThemenById(data)
        .then((res) => {
          this.meetingType = res.state
          _this.meetingInfo = res
          // console.log(res);
          _this.goState(res.state, res.isCSC, res.isPreCSC)
          _this.resThemeData = [...res.themens]
          _this.handlePage(res.themens)
          _this.generateTime()
        })
        .catch((err) => {
          // console.log("this.meetingInfo", this.meetingInfo);
          console.log(err)
        })
    },
    query() {
      const _this = this
      return {
        that: _this,
        tableData: _this.tableData,
        resThemeData: _this.resThemeData,
        page: _this.page
      }
    },
    handleSizeChange: (a, b) => {
      console.log(a, b)
    },
    //选择页数
    handleCurrentChange: (curPage, query) => {
      //总时长duartion
      // let totalDuration = 0;
      const _this = query()
      //分页并累加总时长
      _this.page.currPage = curPage
      _this.tableData = _this.resThemeData.filter((item, index) => {
        if (
          index >= (_this.page.currPage - 1) * _this.page.pageSize &&
          index < _this.page.currPage * _this.page.pageSize
        ) {
          return true
        }
        return false
      })

      _this.that.$data.tableData = _this.tableData.map((item) => {
        const startTime = dayjs(`2020-6-30 ${item.startTime}`).format('HH:mm')
        const endTime = dayjs(`2020-6-30 ${item.endTime}`).format('HH:mm')
        return {
          ...item,
          time: `${startTime}~${endTime}`
        }
      })
    },

    //对话弹窗 初始化
    initDialog() {
      const dialogObj = this.dialogStatusManageObj
      for (let o in dialogObj) {
        dialogObj[o] = false
      }
      this.dialogStatusManageObj = dialogObj
    },
    closeDialog() {
      this.autoOpenProtectConclusionObj = ''
      this.initDialog()
    },
    openDialog(val) {
      this.dialogStatusManageObj[val] = true
    },
    handleClick(name) {
      this[name]()
    },
    //开启调整
    updateTopic() {
      this.showUpdateTopicButtonList = true
      this.$nextTick(() => {
        this.rowDrop()
      })
    },
    //调整完成
    overUpdateTopic() {
      if (this.changedArr) {
        this.handleUpdateThemen()
      }
      this.tableObject.destroy()
      this.showUpdateTopicButtonList = false
      // });
    },
    //取消调整
    cancelUpdateTopic() {
      this.changedArr = ''
      this.tableObject.destroy()
      this.showUpdateTopicButtonList = false
    },
    //调整完成更新会议议题
    handleUpdateThemen() {
      this.shouldhanldeUpdateData = this.changedArr
        .map((item, index) => {
          return {
            // ...item,
            itemNo: index + 1,
            themenId: item.id,
            state: item.state
          }
        })
        .filter((item) => {
          return item.state === '01' || item.state === '04'
        })
        .map((item) => {
          return {
            itemNo: item.itemNo,
            themenId: item.themenId
          }
        })
      const formData = {
        meetingId: this.meetingInfo.id,
        resortThemens: this.shouldhanldeUpdateData
      }
      resortThemen(formData)
        .then((data) => {
          if (data) {
            iMessage.success('保存成功')
          } else {
            iMessage.error('保存失败')
          }
          this.changedArr = ''
          this.flushTable()
        })
        .catch((err) => {
          this.changedArr = ''
          console.log('err', err)
        })
    },
    close() {
      if (this.meetingInfo.attachments.length <= 0) {
        this.$confirm('尚未生成会议纪要，前往生成会议纪要？', '提示', {
          confirmButtonText: '前往',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //在这里判断是不是已经生成会议纪要了
          // this.openDialog('openCloseMeetiongDialog')
          this.generateMeetingMinutes()
        })
      } else {
        this.$confirm('请确认是否需要关闭会议?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          //在这里判断是不是已经生成会议纪要了
          // this.openDialog('openCloseMeetiongDialog')
          this.$nextTick(() => {
            this.$refs['closeDialog'].handleSubmit()
          })
        })
      }
    },
    //查看议题里面是否有进行中的议题
    haveThemenIsStarting() {
      return this.resThemeData.find((item) => {
        return item.state === '02'
      })
    },
    //查询议题里的未进行的议题
    haveThemenNotStart() {
      return this.resThemeData.find((item) => {
        return item.state === '01'
      })
    },
    // 判断议题是否已经全部完成
    isThemenOverAll() {
      return this.resThemeData.every((item) => {
        return item.state === '03'
      })
    },
    startTopic() {
      if (this.haveThemenIsStarting()) {
        iMessage.warn('已有进行中的议题！')
        return
      }
      if (
        this.selectedTableData &&
        this.selectedTableData.length >= 1 &&
        this.haveThemenNotStart().itemNo !== this.selectedTableData[0].itemNo
      ) {
        iMessage.warn('请按议题顺序开始议题！')
        return
      }
      if (this.isThemenOverAll()) {
        iMessage.warn('该议题列表已全部结束！')
        return
      }
      const param = {
        meetingId: this.meetingInfo.id,
        themenId: this.haveThemenNotStart().id
      }
      startThemen(param)
        .then(() => {
          iMessage.success('开始议题成功！')
          // this.refreshTable();
          this.flushTable()
        })
        .catch(() => {
          // iMessage.error('开始议题失败！')
        })
      // });
    },
    //判断进行中是否超时
    isOverTime(choiceThemen) {
      //true 没有超时，false 超时
      return (
        new Date(`2021-7-1 ${choiceThemen.startTime}`).getTime() +
          choiceThemen.duration * 60 * 1000 >
        new Date(`2021-7-1 ${dayjs(new Date()).format('HH:mm:ss')}`).getTime()
      )
    },
    overTopic() {
      // alert("overTopic");
      let choiceThemen = this.selectedTableData && this.selectedTableData[0]
      choiceThemen = choiceThemen ? choiceThemen : this.haveThemenIsStarting()
      const param = {
        meetingId: this.meetingInfo.id,
        themenId: choiceThemen && choiceThemen.id
      }
      if (choiceThemen && choiceThemen.state !== '02') {
        iMessage.warn('该议题未进行中，不能结束操作！')
        return
      }
      const bol = this.isOverTime(choiceThemen)
      if (bol) {
        endThemen(param)
          .then(() => {
            iMessage.success('结束议题成功!')
            if (!choiceThemen.isBreak) {
              this.autoOpenProtectConclusionObj = choiceThemen
            }
            this.flushTable()
            if (!choiceThemen.isBreak) {
              this.openDialog('openProtectConclusion')
            }
          })
          .catch(() => {
            // iMessage.error("结束会议失败！");
          })
        // });
        return
      } else {
        endThemen(param)
          .then(() => {
            iMessage.success('结束议题成功！')
            // this.refreshTable();
            this.flushTable()
          })
          .catch(() => {
            // iMessage.error("结束会议失败！");
          })
      }
    },
    split() {
      this.$confirm('确认拆分该议题么?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          meetingId: this.meetingInfo.id,
          themenId: this.selectedTableData[0].id
        }
        spiltThemen(data)
          .then(() => {
            iMessage.success('拆分成功!')
            this.flushTable()
          })
          .catch((err) => {
            iMessage.error('拆分失败:' + err)
            this.flushTable()
          })
      })
    },
    start() {
      let param = {
        id: this.meetingInfo.id,
        state: '04'
      }
      changeStateMeeting(param)
        .then((res) => {
          if (res) {
            iMessage.success('开始议题成功！')
            this.flushTable()
          }
        })
        .catch(() => {
          // iMessage.error(err);
        })
      // });
    },
    recall(){
      let ids = []
      ids.push(this.$route.query.id)
      this.$confirm('是否撤回该会议 ？', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      }).then(() => {
        batchRecallMeeting( {ids} ).then((res) => {
          if (res.code == 200) {
            this.$message.success('撤回成功!')
            this.$router.go(-1)
          }
        })
      })
    },
    updateDate() {
      // alert("updateDate");
      if (this.selectedTableData[0] && this.selectedTableData[0].isBreak) {
        iMessage.warn('休息议题不能进行改期')
        return
      }
      this.openDialog('openUpdateDateDialog')
    },
    // deleteTop() {
    //   if (
    //     this.selectedTableData[0] &&
    //     this.selectedTableData[0].state !== "01" &&
    //     this.selectedTableData[0].state !== "04"
    //   ) {
    //     iMessage.warn("只能删除未进行的议题");
    //     return;
    //   }
    //   if (
    //     this.selectedTableData[0] &&
    //     this.selectedTableData[0].state === "04"
    //   ) {
    //     iMessage.warn("不能删除撤回中的议题");
    //     return;
    //   }
    //   const data = {
    //     meetingId: this.meetingInfo.id,
    //     id: this.selectedTableData[0].id,
    //   };
    //   this.$confirm("确认删除该议题吗?", "提示", {
    //     confirmButtonText: "确认",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   }).then(() => {
    //     deleteThemen(data)
    //       .then(() => {
    //         iMessage.success("删除成功");
    //         this.flushTable();
    //       })
    //       .catch((err) => {
    //         iMessage.error("删除失败");
    //         this.flushTable();
    //       });
    //   });
    // },
    //批量删除
    deleteTopAll() {
      this.$confirm('确认删除该议题么?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let pArr = []
        this.selectedTableData.forEach((item) => {
          let p = new Promise((resolve, reject) => {
            let data = {
              meetingId: this.meetingInfo.id,
              id: item.id
            }
            deleteThemen(data)
              .then(() => {
                resolve(data)
              })
              .catch((err) => {
                reject(err)
              })
          })
          pArr.push(p)
        })
        Promise.all(pArr)
          .then(() => {
            iMessage.success('删除成功!')
            this.flushTable()
          })
          .catch(() => {
            iMessage.error('删除失败!')
          })
      })
    },
    protectInfo() {
      if (
        this.selectedTableData[0]
          ? this.selectedTableData[0].state === '02'
          : ''
      ) {
        iMessage.warn('进行中的议题不能进行会议资料维护')
        return
      }
      if (
        this.selectedTableData[0]
          ? this.selectedTableData[0].state === '03'
          : ''
      ) {
        iMessage.warn('已完成的议题不能进行会议资料维护')
        return
      }
      if (this.selectedTableData[0] ? this.selectedTableData[0].isBreak : '') {
        iMessage.warn('休息议题不可维护资料')
        return
      }
      this.openDialog('openProtectInfoDialog')
    },
    editTopic() {
      if (this.selectedTableData[0].state === '03') {
        iMessage.warn('已结束的议题不能进行修改议题')
        return
      }
      this.editOrAdd = 'edit'
      if (this.selectedTableData[0].isBreak) {
        this.openDialog('openAddRestDialog')
        return
      }
      // if (
      //   this.meetingInfo.meetingTypeName === 'Pre CSC' ||
      //   this.meetingInfo.meetingTypeName === 'CSC'
      // ) {
      if (this.meetingInfo.isPreCSC || this.meetingInfo.isCSC) {
        this.openDialog('openAddTopicNewDialog')
      } else {
        this.openDialog('openAddTopicDialog')
      }
    },
    //新增议题
    addTopic() {
      this.editOrAdd = 'add'
      // if (
      //   this.meetingInfo.meetingTypeName === 'Pre CSC' ||
      //   this.meetingInfo.meetingTypeName === 'CSC'
      // ) {

      if (this.meetingInfo.isPreCSC || this.meetingInfo.isCSC) {
        this.openDialog('openAddTopicNewDialog')
      } else {
        this.openDialog('openAddTopicDialog')
      }
    },

    addRest() {
      this.editOrAdd = 'add'
      this.openDialog('openAddRestDialog')
    },
    back() {
      //返回到会议列表页
      // this.$router.push("/meeting/home");
      this.$router.go(-1)
    },
    open() {
      let param = {
        id: this.meetingInfo.id,
        state: '02'
      }
      changeStateMeeting(param).then((res) => {
        if (res.code === 200) {
          iMessage.success('开放会议成功！')
        }
        // this.refreshTable();
        this.flushTable()
        this.getMeetingTypeObject()
      })
      // });
    },
    endMeeting() {
      // 结束
      // let dateCurrent = new Date().valueOf()
      // let dateEnd = new Date(
      //   this.meetingInfo.endDate + ' ' + this.meetingInfo.endTime
      // ).valueOf()
      let param = {
        id: this.meetingInfo.id,
        state: '05'
      }
      changeStateMeeting(param)
        .then((res) => {
          if (res.code == 200) {
            iMessage.success('结束会议成功！')
            this.flushTable()
            this.getMeetingTypeObject()
          }
        })
        .catch(() => {})
      // });
    },
    sameScreen() {
      // 同屏
      // if (
      //   this.meetingInfo.meetingTypeName === 'Pre CSC' ||
      //   this.meetingInfo.meetingTypeName === 'CSC'
      // ) {
      if (this.meetingInfo.isPreCSC || this.meetingInfo.isCSC) {
        let routeUrl = this.$router.resolve({
          path: '/meeting/meeting-same-screen',
          query: {
            id: this.meetingInfo.id
          }
        })
        window.open(routeUrl.href, '_blank')
      } else {
        let routeUrl = this.$router.resolve({
          path: '/meeting/same-screen',
          query: {
            id: this.meetingInfo.id
          }
        })
        window.open(routeUrl.href, '_blank')
      }
    },
    displayShow() {
      let routeUrl = this.$router.resolve({
        // path:
        //   this.meetingInfo.meetingTypeName == 'Pre CSC' ||
        //   this.meetingInfo.meetingTypeName == 'CSC'
        path:
          this.meetingInfo.isPreCSC || this.meetingInfo.isCSC
            ? '/meeting/meetingShow' //新页面
            : '/meeting/meeting-show', //旧页面
        query: {
          id: this.meetingInfo.id
        }
      })
      window.open(routeUrl.href, '_blank')
    },
    lock() {
      // 锁定
      this.$confirm('请确认是否需要锁定会议？', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      }).then(() => {
        let param = {
          id: this.meetingInfo.id,
          state: '03'
        }
        changeStateMeeting(param)
          .then(() => {
            iMessage.success('锁定会议成功！')
            // this.refreshTable();
            this.getMeetingTypeObject()
            this.flushTable()
          })
          .catch(() => {
            // iMessage.error('锁定会议失败！')
          })
      })
    },
    deblock() {
      let param = {
        id: this.meetingInfo.id,
        state: '02'
      }
      changeStateMeeting(param)
        .then(() => {
          iMessage.success('解锁会议成功！')
          this.getMeetingTypeObject()
          this.flushTable()
        })
        .catch(() => {
          // iMessage.error('解锁会议失败！')
        })
      // });
    },
    edit() {
      this.openDialog('openUpdate')
    },
    //刷新表格
    flushTable() {
      this.page.currPage = 1
      this.getTableData()
    },
    closeDetailDialog(bol) {
      this.openDetailDialog = bol
    },
    search(val) {
      this.form = { ...val }
      this.query()
    },
    //按钮失效功能
    handleButtonDisabled(buttonNameList, bol) {
      this.currentButtonList = {
        ...this.currentButtonList,
        tableButtonList: this.currentButtonList.tableButtonList.map((item) => {
          return item.map((item) => {
            if (buttonNameList.includes(item.methodName)) {
              return {
                ...item,
                disabled: bol
              }
            }
            return item
          })
        })
      }
    },
    //开始议题按钮失效功能
    handleStartTopicButtonDisabled(buttonNameList, bol) {
      this.currentButtonList = {
        ...this.currentButtonList,
        tableButtonList: this.currentButtonList.tableButtonList.map((item) => {
          return item.map((item) => {
            if (buttonNameList.includes(item.methodName)) {
              return {
                ...item,
                triggerDisabled: bol
              }
            }
            return item
          })
        })
      }
    },
    handleDeleteOrNot(curObj) {
      let bol = true
      if (curObj.state === '03') {
        // //全部置灰
        // if (curObj.type === "MANUAL" || curObj.type === "FS+MTZ") {
        //   this.handleButtonDisabled(["protectResult"], false);
        //   if (curObj.taskCsc) {
        //     this.handleButtonDisabled(["lookResult"], false);
        //   }
        // }
        // if (curObj.type === "FS+MTZ") {
        //   this.handleButtonDisabled(
        //     [
        //       "bePending",
        //       "fixedPoint",
        //       "translateCSC",
        //       "nextPreCSC",
        //       "senLol",
        //       "translateTer",
        //       "freezeRsBill",
        //       "closeResult",
        //       "lookResult",
        //     ],
        //     false
        //   );
        // }
        bol = true
      } else if (curObj.state === '02') {
        bol = true
        // this.handleButtonDisabled(this.handleDisabledButtonName, true);
        // this.handleStartTopicButtonDisabled(["startTopic"], true);
        // this.handleButtonDisabled(["overTopic"], false);
        // this.handleButtonDisabled(["editTopic"], false);
        //
      } else {
        // this.handleButtonDisabled(handleDisabledButtonName, false);
        // this.handleStartTopicButtonDisabled(["startTopic"], false);
        // this.handleButtonDisabled(["overTopic"], true);
        if (curObj.isBreak) {
          // this.handleButtonDisabled(["deleteTopAll"], false);
          // if (this.meetingType === "03" || this.meetingType === "04") {
          //   this.handleButtonDisabled(["editTopic"], false);
          // }
          // this.handleStartTopicButtonDisabled(["startTopic"], false);
          bol = false
        } else {
          if (curObj.type === 'MANUAL') {
            bol = false
          }
          if (curObj.type === 'FS+MTZ') {
            // this.handleButtonDisabled(["updateDate", "split"], false);
          } else {
            // this.handleButtonDisabled(["updateDate"], false);
          }
          // this.handleStartTopicButtonDisabled(["startTopic"], false);
          if (!curObj.type) {
            // this.handleButtonDisabled(["deleteTopAll"], false);
            bol = false
          }
        }
      }
      return bol
    },
    // // 表格选中值集
    // handleSelectionChange(val) {
    //   this.selectedTableData = val;
    //   const handleDisabledButtonName = this.handleDisabledButtonName;
    //   if (val.length === 1) {
    //     if (val[0].state === "03") {
    //       //全部置灰
    //       if (val[0].type === "MANUAL" || val[0].type === "FS+MTZ") {
    //         this.handleButtonDisabled(["protectResult"], false);
    //         if (val[0].conclusionCsc) {
    //           this.handleButtonDisabled(["lookResult"], false);
    //         }
    //       }
    //       if (val[0].type === "FS+MTZ") {
    //         this.handleButtonDisabled(
    //           [
    //             "bePending",
    //             "fixedPoint",
    //             "translateCSC",
    //             "nextPreCSC",
    //             "senLol",
    //             "translateTer",
    //             "freezeRsBill",
    //             "closeResult",
    //             "lookResult",
    //           ],
    //           false
    //         );
    //       }
    //       if (!val[0].isBreak) {
    //         this.handleButtonDisabled(["protectResult"], false);
    //       }
    //     } else if (val[0].state === "02") {
    //       this.handleButtonDisabled(handleDisabledButtonName, true);
    //       this.handleStartTopicButtonDisabled(["startTopic"], true);
    //       this.handleButtonDisabled(["overTopic"], false);
    //       // this.handleButtonDisabled(["editTopic"], false);
    //       //
    //     } else {
    //       // this.handleButtonDisabled(handleDisabledButtonName, false);
    //       // this.handleStartTopicButtonDisabled(["startTopic"], false);
    //       // this.handleButtonDisabled(["overTopic"], true);
    //       if (val[0].isBreak) {
    //         this.handleButtonDisabled(["deleteTopAll"], false);
    //         if (this.meetingType === "03" || this.meetingType === "04") {
    //           this.handleButtonDisabled(["editTopic"], false);
    //         }
    //         this.handleStartTopicButtonDisabled(["startTopic"], false);
    //       } else {
    //         if (val[0].type === "MANUAL") {
    //           this.handleButtonDisabled(handleDisabledButtonName, false);
    //           this.handleStartTopicButtonDisabled(["startTopic"], false);
    //           this.handleButtonDisabled(["split"], true);
    //         }
    //         if (val[0].type === "FS+MTZ") {
    //           this.handleButtonDisabled(["updateDate", "split"], false);
    //         } else {
    //           this.handleButtonDisabled(["updateDate"], false);
    //         }
    //         this.handleStartTopicButtonDisabled(["startTopic"], false);
    //         if (!val[0].type) {
    //           this.handleButtonDisabled(["deleteTopAll"], false);
    //         }
    //       }
    //     }
    //   } else {
    //     this.handleButtonDisabled(handleDisabledButtonName, true);
    //     this.handleStartTopicButtonDisabled(["startTopic"], true);
    //     this.handleButtonDisabled(["overTopic"], true);
    //     if (val.length > 1) {
    //       let bol = val.every((item) => {
    //         // return item.state === "01" && val[0].type !== "FS+MTZ";
    //         return !this.handleDeleteOrNot(item);
    //       });
    //       if (bol) {
    //         this.handleButtonDisabled(["deleteTopAll"], false);
    //       }
    //     }
    //   }
    //   this.tableButtonList = this.currentButtonList.tableButtonList;
    // },
    // 表格选中值集
    handleSelectionChange(val) {
      if (this.curState === '05') {
        val = [val[val.length - 1]]
        this.currentRow = val[0]

        this.isSingle = true
      } else {
        this.isSingle = false
      }
      if (!val[0]) {
        return
      }
      this.selectedTableData = val
      const handleDisabledButtonName = this.handleDisabledButtonName
      if (val.length === 1) {
        if (this.haveThemenIsStarting()) {
          this.handleButtonDisabled(['overTopic'], false)
        }
        if (val[0].state === '03') {
          if (!val[0].isBreak) {
            this.handleButtonDisabled(['protectResult'], false)
            // if (!val[0].conclusionCsc || val[0].conclusionCsc === '01') {
            //   this.handleButtonDisabled(['protectResult'], false)
            // }
            if (val[0].conclusionCsc) {
              this.handleButtonDisabled(['lookResult'], false)
            } else {
              if (val[0].type !== 'MANUAL') {
                if (val[0].conclusionCsc === '02') {
                  this.handleButtonDisabled(['freezeRsBill'], false)
                }
              }
            }
            if (
              // this.meetingInfo.meetingTypeName === 'CSC' &&
              this.meetingInfo.isCSC &&
              // !this.meetingInfo.isCSC &&
              val[0].type !== 'MANUAL'
            ) {
              this.handleButtonDisabled(
                [
                  'bePending',
                  'fixedPoint',
                  'nextPreCSC',
                  'senLol',
                  'translateTer',
                  'closeResult',
                  'translateCSC'
                  // "lookResult",
                ],
                false
              )
              if (val[0].conclusionCsc) {
                this.handleButtonDisabled(['lookResult'], false)
              }
              if (val[0].conclusionCsc === '02') {
                this.handleButtonDisabled(['freezeRsBill'], false)
              }
            }
            if (
              // this.meetingInfo.meetingTypeName === 'CSC' &&
              this.meetingInfo.isCSC &&
              // !this.meetingInfo.isCSC &&
              val[0].type === 'MANUAL'
            ) {
              this.handleButtonDisabled(
                ['bePending', 'nextPreCSC', 'closeResult', 'translateCSC'],
                false
              )
            }
            if (
              // this.meetingInfo.meetingTypeName === 'Pre CSC' &&
              this.meetingInfo.isPreCSC &&
              // !this.meetingInfo.isPreCSC &&
              val[0].type === 'MANUAL'
            ) {
              this.handleButtonDisabled(
                ['bePending', 'nextPreCSC', 'closeResult', 'translateCSC'],
                false
              )
            }
            if (
              // this.meetingInfo.meetingTypeName === 'Pre CSC' &&
              this.meetingInfo.isPreCSC &&
              // !this.meetingInfo.isPreCSC &&
              val[0].type !== 'MANUAL'
            ) {
              this.handleButtonDisabled(
                [
                  'bePending',
                  'fixedPoint',
                  'nextPreCSC',
                  'senLol',
                  'translateTer',
                  'closeResult',
                  'translateCSC'
                  // "lookResult",
                ],
                false
              )
              if (val[0].conclusionCsc) {
                this.handleButtonDisabled(['lookResult'], false)
              }
              if (val[0].conclusionCsc === '02') {
                this.handleButtonDisabled(['freezeRsBill'], false)
              }
            }
            if (val[0].fixedPointApplyType == 20) {
              this.handleButtonDisabled(['senLol', 'translateTer'], true)
            }
          }
        } else if (val[0].state === '02') {
          this.handleButtonDisabled(handleDisabledButtonName, true)
          this.handleStartTopicButtonDisabled(['startTopic'], true)
          this.handleButtonDisabled(['protectResult'], true)
          this.handleButtonDisabled(['overTopic'], false)
        } else {
          if (val[0].isBreak) {
            this.handleButtonDisabled(['deleteTopAll'], false)
            if (
              this.meetingType === '02' ||
              this.meetingType === '03' ||
              this.meetingType === '04'
            ) {
              this.handleButtonDisabled(['editTopic'], false)
            }
            this.handleStartTopicButtonDisabled(['startTopic'], false)
          } else {
            if (val[0].type === 'MANUAL') {
              this.handleButtonDisabled(handleDisabledButtonName, false)
              this.handleStartTopicButtonDisabled(['startTopic'], false)
              this.handleButtonDisabled(['split'], true)
            }
            if (val[0].type === 'FS+MTZ') {
              this.handleButtonDisabled(['updateDate', 'split'], false)
            }
            if (val[0].source === '04' && val[0].type !== 'FS+MTZ') {
              this.handleButtonDisabled(['updateDate'], false)
            }
            this.handleStartTopicButtonDisabled(['startTopic'], false)
            if (!val[0].type) {
              this.handleButtonDisabled(['deleteTopAll'], false)
            }
          }
        }
      } else {
        this.handleButtonDisabled(
          [
            'bePending',
            'fixedPoint',
            'translateCSC',
            'nextPreCSC',
            'senLol',
            'translateTer',
            'freezeRsBill',
            'closeResult',
            'lookResult',
            'protectResult'
          ],
          true
        )
        this.handleButtonDisabled(handleDisabledButtonName, true)
        this.handleStartTopicButtonDisabled(['startTopic'], true)
        this.handleButtonDisabled(['overTopic'], true)
        if (val.length > 1) {
          let bol = val.every((item) => {
            // return item.state === "01" && val[0].type !== "FS+MTZ";
            return !this.handleDeleteOrNot(item)
          })
          if (bol) {
            this.handleButtonDisabled(['deleteTopAll'], false)
          }
        }
      }
      this.tableButtonList = this.currentButtonList.tableButtonList
    },
    handleGoDetail(e) {
      this.id = e.id
      this.openDetailDialog = true
    },
    // 行高亮
    tableRowClassName(row) {
      if (row.row.state === '03') {
        return 'unuse-row dragable-row'
      } else if (row.row.state === '02') {
        return 'active-row dragable-row'
      }
      return 'narmal-row'
    }
  }
}
</script>
<style lang="scss" scoped>
/* .table-container {
  max-height: 514px;
  overflow-y: auto;
} */
.inline {
  display: inline !important;
}
.span-index {
  width: 15px;
  text-align: center;
  justify-content: center;
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
::v-deep .open-clink-back-text {
  cursor: pointer;
  .open-clink-back {
    display: block;
  }
  .open-text-text {
    display: none;
  }
  &:hover {
    display: flex;
    justify-content: center;
    align-items: center;
    .open-clink-back {
      display: none;
    }
    .open-text-text {
      display: block;
      width: 20px;
      height: 17.9px;
      background-image: url('../../../assets/images/reback.png');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      text-align: center;
    }
  }
}
::v-deep .open-clink-back-text {
  display: flex;
  justify-content: center;
  align-items: center;
  .open-text-text-choice {
    display: block;
    width: 20px;
    height: 17.9px;
    background-image: url('../../../assets/images/reback.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    text-align: center;
  }
}
::v-deep .open-link-text-black {
  color: #000 !important;
}
::v-deep .open-link-text-grey {
  color: #ccc !important;
}
::v-deep .open-link-text-blue {
  color: #1763f7 !important;
}
::v-deep .open-link-text {
  /* cursor: pointer; */
  color: #000;
}
::v-deep .look-themen-click {
  cursor: pointer;
  color: #1763f7;
}
.header {
  width: 100%;
  margin-bottom: 31px;
  .row {
    position: relative;
    width: 100%;
    display: flex;
    /* justify-content: space-between; */
    justify-content: flex-start;
    align-items: center;
    .meeting-type {
      display: flex;
      font-size: 20px;
      line-height: 35px;
      .name {
        color: #727272;

        margin-right: 20px;
      }
      .name-content {
        max-width: 500px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #000;
        margin-right: 10px;
      }
      .button {
        text-align: center;
        line-height: 35px;
        width: 70px;
        height: 35px;
        border-radius: 4px;
        background: #ffffff;
        box-shadow: 0px 0px 3px rgba(0, 38, 98, 0.15);
        color: #1660f1;
        font-size: 14px;
        font-weight: 400;
        padding: 0;
      }
    }
    .button-list {
      position: absolute;
      right: 0;
      .button {
        margin-left: 20px;
      }
    }
    .list {
      display: flex;
      .show {
        display: flex;
        align-items: center;
        height: 28px;
        font-size: 16px;
        .title {
          color: #727272;
          white-space: nowrap;
        }
        .content {
          margin-left: 20px;
          color: #000;
          margin-right: 40px;
          white-space: nowrap;
        }
        .content-address {
          max-width: 220px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          cursor: pointer;
        }
      }
    }
  }
  .row:last-child {
    margin-top: 7px;
  }
}
.title-down-demo {
  display: flex;
  font-size: 16px;
  color: #1763f7;
  letter-spacing: 0;
  cursor: pointer;
  img {
    margin-right: 7px;
  }
}
::v-deep .unuse-row {
  .cell {
    .open-link-text {
      color: #acb8cf !important;
    }
  }
}
::v-deep .active-row {
  background-color: #1660f1 !important;
  .cell {
    .open-link-text {
      color: #fff !important;
    }
  }
}

::v-deep .el-table--enable-row-hover .el-table__body .active-row:hover > td {
  background: #1660f1;
  color: #fff;
}
::v-deep .el-table__body tr.active-row > td {
  background: #1660f1;
  color: #fff;
}
</style>
