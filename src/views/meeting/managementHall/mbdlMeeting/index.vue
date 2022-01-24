<!--
 * @Author: HS   MBDL会议
 * @FilePath: \front-portal\src\views\meeting\managementHall\mbdlMeeting\index.vue
-->
<template>
  <iPage>
    <div>
      <!-- 文字内容 -->
      <div class="header">
        <div class="row">
          <div class="meeting-type">
            <div class="name">{{ $t('会议名称') }}</div>
            <div class="name-content" :title="meetingInfo.name">
              {{ meetingInfo.name }}
            </div>
            <iButton
              class="button"
              @click="currentButtonList.methodName"
              disabled
              >{{ $t(currentButtonList.title) }}
            </iButton>
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
              {{ $t(item.title) }}
            </iButton>
          </div>
        </div>
        <div class="row">
          <div class="list">
            <div class="show">
              <div class="title">{{ $t('会议类型') }}</div>
              <div class="content">
                {{ typeObject[meetingInfo.meetingTypeId] }}
              </div>
            </div>
            <div class="show">
              <div class="title">{{ $t('会议地点') }}</div>
              <div
                class="content content-address"
                :title="meetingInfo.meetingPlace"
              >
                {{ meetingInfo.meetingPlace }}
              </div>
            </div>
            <div class="show">
              <div class="title">{{ $t('会议时间') }}</div>
              <div class="content">
                {{
                  `${begin}${
                    end
                      ? end.includes(':')
                        ? Number(
                            meetingInfo.themens[meetingInfo.themens.length - 1]
                              .plusDayEndTime
                          ) > 0
                          ? end +
                            ` +${Number(
                              meetingInfo.themens[
                                meetingInfo.themens.length - 1
                              ].plusDayEndTime
                            )}`
                          : end
                        : handleEndTime(meetingInfo)
                      : handleEndTime(meetingInfo)
                  }`
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <iCard>
        <!-- 全部按钮 -->
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
           @batchAdjustment="batchAdjustment"
           @newAddTopic="newAddTopic"
        />

        <!-- <i-table-custom
          :loading="tableLoading"
          :data="tableData"
          :columns="tableColumns"
          @go-detail="handleGoDetail"
          @handle-selection-change="handleSelectionChange"
          v-if="!showUpdateTopicButtonList"
        /> -->
        <!-- 列表 -->
        <!-- <iTableML
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
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            label="No."
            width="50"
          >
            <template slot-scope="scope">
              <span class="open-link-text">{{ scope.row.itemNo }}</span>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            label="Count"
            width="70"
          >
            <template slot-scope="scope">
              <span class="open-link-text">{{ scope.row.count }}</span>
              <span v-if="scope.row.isBreak">-</span>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            label="Topic"
            width="220"
          >
            <template slot-scope="scope">
              <span
                class="open-link-text look-themen-click"
                @click="lookThemen(scope.row)"
                >{{ scope.row.topic }}</span
              >
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            label="Duration"
            width="90"
          >
            <template slot-scope="scope">
              <div
                class="open-link-text open-clink-back-text"
                @click="recallTheThemen(scope.row)"
                v-if="meetingInfo.state === '03' && scope.row.state === '04'"
              >
                <div class="open-text-text-choice"></div>
              </div>
              <span class="open-link-text" v-else>{{
                scope.row.duration
              }}</span>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="Time">
            <template slot-scope="scope">
              <span class="open-link-text">{{ scope.row.time }}</span>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            label="Presenter"
          >
            <template slot-scope="scope">
              <span
                class="open-link-text"
                v-if="scope.row.presenter && scope.row.presenterNosys"
                >{{ scope.row.presenter }}/{{ scope.row.presenterNosys }}</span
              >
              <span class="open-link-text" v-else
                >{{ scope.row.presenter }}{{ scope.row.presenterNosys }}</span
              >
              <span v-if="scope.row.isBreak">-</span>
            </template>
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            align="center"
            label="Presenter Dept."
          >
            <template slot-scope="scope">
              <span
                class="open-link-text"
                v-if="scope.row.presenterDept && scope.row.presenterDeptNosys"
                >{{ scope.row.presenterDept }}/{{
                  scope.row.presenterDeptNosys
                }}</span
              >
              <span class="open-link-text" v-else
                >{{ scope.row.presenterDept
                }}{{ scope.row.presenterDeptNosys }}</span
              >
              <span v-if="scope.row.isBreak">-</span>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            label="Supporter"
          >
            <template slot-scope="scope">
              <span
                class="open-link-text"
                v-if="scope.row.supporter && scope.row.supporterNosys"
                >{{ scope.row.supporter }}/{{ scope.row.supporterNosys }}</span
              >
              <span class="open-link-text" v-else
                >{{ scope.row.supporter }}{{ scope.row.supporterNosys }}</span
              >
              <span v-if="scope.row.isBreak">-</span>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            label="Supporter Dept."
          >
            <template slot-scope="scope">
              <span
                class="open-link-text"
                v-if="scope.row.supporterDept && scope.row.supporterDeptNosys"
                >{{ scope.row.supporterDept }}/{{
                  scope.row.supporterDeptNosys
                }}</span
              >
              <span class="open-link-text" v-else
                >{{ scope.row.supporterDept
                }}{{ scope.row.supporterDeptNosys }}</span
              >
              <span v-if="scope.row.isBreak">-</span>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="Remark">
            <template slot-scope="scope">
              <span class="open-link-text">{{ scope.row.remark }}</span>
              <span v-if="scope.row.isBreak">-</span>
            </template>
          </el-table-column>
        </iTableML> -->
        <!-- 我的 -->
        <iTableML
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
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            label="#"
            width="50"
          >
            <template slot-scope="scope">
              <span class="open-link-text">{{ scope.row.itemNo }}</span>
            </template>
          </el-table-column>
          <!-- MBDL名称    gpName  改 topic-->
          <el-table-column show-overflow-tooltip align="center" label="MBDL名称" width="120" >
            <template slot-scope="scope">
              <span class="open-link-text look-themen-click" @click="handleMBDl(scope.row)">{{ scope.row.topic }}</span>
            </template>
          </el-table-column>
          <!-- 英文名称  mbdlNameEn -->
           <el-table-column show-overflow-tooltip align="center" label="英文名称" width="120" >
             <template slot-scope="scope">
              <span class="open-link-text">{{ scope.row.mbdlNameEn }}</span>
            </template>
          </el-table-column>
          <!-- 采购分类  materialGroupName -->
           <el-table-column show-overflow-tooltip align="center" label="采购分类" width="120" >
             <template slot-scope="scope">
              <span class="open-link-text">{{ scope.row.materialGroupName }}</span>
            </template>
          </el-table-column>
          <!-- 有效期起   validFrom-->
           <el-table-column show-overflow-tooltip align="center" label="有效期起" width="120" >
             <template slot-scope="scope">
              <span class="open-link-text">{{ scope.row.validFrom }}</span>
            </template>
          </el-table-column>
           <el-table-column show-overflow-tooltip align="center" label="有效期止" width="120" >
             <template slot-scope="scope">
              <span class="open-link-text">{{ scope.row.validTo }}</span>
            </template>
          </el-table-column>
          <!-- 主要申请部门  applyDept 改 supporterDept-->
           <el-table-column show-overflow-tooltip align="center" label="主要申请部门" width="120" >
             <template slot-scope="scope">
              <span class="open-link-text">{{ scope.row.supporterDept }}</span>
             </template>
          </el-table-column>
          <!-- 股别  presenterDept -->
           <el-table-column show-overflow-tooltip align="center" label="股别" width="120" >
             <template slot-scope="scope">
              <span class="open-link-text">{{ scope.row.presenterDept }}</span>
             </template>
          </el-table-column>
          <!-- 提交人   supporter 改 presenter-->
           <el-table-column show-overflow-tooltip align="center" label="提交人" width="120" >
             <template slot-scope="scope">
              <span class="open-link-text">{{ scope.row.presenter }}</span>
             </template>
          </el-table-column>
           <el-table-column show-overflow-tooltip align="center" label="时间" width="120" >
             <template slot-scope="scope">
              <span class="open-link-text">{{ scope.row.time }}</span>
            </template>
          </el-table-column>
           <el-table-column show-overflow-tooltip align="center" label="状态" width="110" >
             <template slot-scope="scope">
              <span class="open-link-text">{{ statusObj[scope.row.state] }}</span>
            </template>
          </el-table-column>
          <!-- 会议结论/纪要  conclusion-->
           <el-table-column show-overflow-tooltip align="center" label="会议结论/纪要" width="120" >
             <template slot-scope="scope">
              <span class="open-link-text" @click="handleResult(scope.row)">{{ resultObj[scope.row.conclusion] }}</span>
             </template>
          </el-table-column>
         
        </iTableML>
        <!-- 只要把 他的id="table-drag" 代码删除就实现议题调整 -->
        <div id="table-drag">
          <!-- 我的 -->
        <iTableML
           tooltip-effect="light"
            @selectionChange="handleSelectionChange"
            :loading="tableLoading"
            :data="tableData"
            @go-detail="handleGoDetail"
            v-if="showUpdateTopicButtonList"
            :rowClassName="tableRowClassName"
        >
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            label="#"
            width="50"
          >
            <template slot-scope="scope">
              <span class="open-link-text">{{ scope.row.itemNo }}</span>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="MBDL名称" width="120" >
            <template slot-scope="scope">
              <span class="open-link-text">{{scope.row.topic}}</span>
            </template>
          </el-table-column>
           <el-table-column show-overflow-tooltip align="center" label="英文名称" width="120" >
             <template slot-scope="scope">
              <span class="open-link-text">{{ scope.row.mbdlNameEn }}</span>
            </template>
          </el-table-column>
           <el-table-column show-overflow-tooltip align="center" label="采购分类" width="120" >
             <template slot-scope="scope">
              <span class="open-link-text">{{ scope.row.materialGroupName }}</span>
            </template>
          </el-table-column>
           <el-table-column show-overflow-tooltip align="center" label="有效期起" width="120" >
             <template slot-scope="scope">
              <span class="open-link-text">{{ scope.row.validFrom }}</span>
            </template>
          </el-table-column>
           <el-table-column show-overflow-tooltip align="center" label="有效期止" width="120" >
             <template slot-scope="scope">
              <span class="open-link-text">{{ scope.row.validTo }}</span>
            </template>
          </el-table-column>
           <el-table-column show-overflow-tooltip align="center" label="主要申请部门" width="120" >
              <template slot-scope="scope">
              <span class="open-link-text">{{ scope.row.supporterDept }}</span>
             </template>
          </el-table-column>
           <el-table-column show-overflow-tooltip align="center" label="股别" width="120" >
             <template slot-scope="scope">
              <span class="open-link-text">{{ scope.row.presenterDept }}</span>
             </template>
          </el-table-column>
           <el-table-column show-overflow-tooltip align="center" label="提交人" width="120" >
             <template slot-scope="scope">
              <span class="open-link-text">{{ scope.row.presenter }}</span>
             </template>
          </el-table-column>
           <el-table-column show-overflow-tooltip align="center" label="时间" width="120" >
             <template slot-scope="scope">
              <span class="open-link-text">{{ scope.row.time }}</span>
            </template>
          </el-table-column>
           <el-table-column show-overflow-tooltip align="center" label="状态" width="110" >
             <template slot-scope="scope">
              <span class="open-link-text">{{ statusObj[scope.row.state] }}</span>
            </template>
          </el-table-column>
          <!-- 会议结论/纪要   conclusion-->
           <el-table-column show-overflow-tooltip align="center" label="会议结论/纪要" width="120" >
            <template slot-scope="scope">
              <span class="open-link-text">{{ scope.row.conclusion }}</span>
             </template>
          </el-table-column>
         
        </iTableML>
        </div>
        <!-- 分页 -->
        <iPagination
          v-update
          @size-change="handleSizeChange($event, query)"
          @current-change="handleCurrentChange($event, query)"
          background
          :current-page="page.currPage"
          :page-sizes="page.pages"
          :page-size="page.pageSize"
          layout="prev, pager, next"
          :prev-text="$t('上一页')"
          :next-text="$t('下一页')"
          :total="page.totalCount"
        />
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
    <!-- 新增议题gp -->
    <newAddTopic
    @closeDialog="closeDialog"
      :dialogStatusManageObj="dialogStatusManageObj"
      v-if="dialogStatusManageObj.openAddTopicNewDialog"
      @flushTable="flushTable"
      :meetingInfo="meetingInfo"
      :editOrAdd="editOrAdd"
      :selectedTableData="selectedTableData"
      :lookThemenObj="lookThemenObj">
      </newAddTopic>
    <newProtectInfo
      @closeDialog="closeDialog"
      :dialogStatusManageObj="dialogStatusManageObj"
      v-if="dialogStatusManageObj.openProtectInfoDialog"
      @flushTable="flushTable"
      :selectedTableData="selectedTableData"
      :meetingInfo="meetingInfo"
    />
    <!-- <confirmDelete
      @closeDialog="closeDialog"
      :dialogStatusManageObj="dialogStatusManageObj"
      @flushTable="flushTable"
      :selectedTableData="selectedTableData"
    ></confirmDelete> -->
    <confirmSplit
      @closeDialog="closeDialog"
      :dialogStatusManageObj="dialogStatusManageObj"
      @flushTable="flushTable"
      :meetingInfo="meetingInfo"
      :selectedTableData="selectedTableData"
    ></confirmSplit>
    <!-- 会议改期 -->
    <updateDate
      @closeDialog="closeDialog"
      :dialogStatusManageObj="dialogStatusManageObj"
      @flushTable="flushTable"
      :typeObject="typeObject"
      :meetingInfo="meetingInfo"
      :selectedTableData="selectedTableData"
      v-if="dialogStatusManageObj.openUpdateDateDialog"
    ></updateDate>
    <!-- <importThemen
      @closeDialog="closeDialog"
      :dialogStatusManageObj="dialogStatusManageObj"
      @flushTable="flushTable"
      :meetingInfo="meetingInfo"
      v-if="dialogStatusManageObj.openImportTopicDialog"
    ></importThemen> -->
    <!-- <importThemens
      title="导入议题"
      :maxSize="10"
      :fileNum="1"
      :open="dialogStatusManageObj.openImportTopicDialog"
      :id="$route.query.id"
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
      @handleCancel="handleCancelTopics"
      @handleOK="handleOKTopics"
    >
      <div class="title-down-demo" @click="downDemo">
        <img :src="enclosure" alt="" srcset="" />
        <span>下载模版</span>
      </div>
    </importThemens> -->
    <updateFile
      :title="$t('导入议题')"
      :maxSize="10"
      :fileNum="1"
      :open="dialogStatusManageObj.openImportTopicDialog"
      :id="$route.query.id"
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
      @handleCancel="handleCancelTopics"
      @handleOK="handleOKImportTopic"
      v-if="dialogStatusManageObj.openImportTopicDialog"
      :disabledImportThemenButton="disabledImportThemenButton"
      @getUplodFiles="getUplodFiles"
    >
      <div class="title-down-demo" @click="downDemo">
        <img :src="enclosure" alt="" srcset="" />
        <span>{{ $t('下载模版') }}</span>
      </div>
    </updateFile>
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
    <importErrorDialog
      v-if="openError"
      :openError="openError"
      :errorList="errorList"
      @handleCloseError="handleCloseError"
    />
    <!-- 批量调整 -->
    <iDialog
      v-if="batchAdjustmentDialog"
      :title="language('批量排序', '批量排序')"
      :visible.sync="batchAdjustmentDialog"
      width="30%"
      :append-to-body="true"
    >
    <template #title>
      <div>
        <span class="iDialogdiv">批量排序</span>
        <span class="iDialogdivspan"> 上下拖拽即可调整顺序 </span>
      </div>
    </template>
      <batchAdjustment
        v-if="batchAdjustmentDialog"
        @close="batchAdjustmentDialog = false"
        style="padding-bottom: 20px"
        @flushTable='flushTable'
      ></batchAdjustment>
    </iDialog>
    <!-- 结束议题 -->
    <iDialog
      v-if="protectConclusionDialog"
      :title="language('结束议题', '结束议题')"
      :visible.sync="protectConclusionDialog"
      width="30%"
      :append-to-body="true"
    >
      <protectConclusion
        v-if="protectConclusionDialog"
        @close="protectConclusionDialog = false"
        style="padding-bottom: 20px"
        @flushTable='flushTable'
        :selectThemenId='selectThemenId'
      ></protectConclusion>
    </iDialog>
    <!-- 列表维护结论 -->
    <iDialog
      v-if="editprotectConclusionDialog"
      :title="language('结束议题', '结束议题')"
      :visible.sync="editprotectConclusionDialog"
      width="30%"
      :append-to-body="true"
    >
      <editprotectConclusion
        v-if="editprotectConclusionDialog"
        @close="editprotectConclusionDialog = false"
        style="padding-bottom: 20px"
        @flushTable='flushTable'
        :editprotectConclusionDialogRow='editprotectConclusionDialogRow'
      ></editprotectConclusion>
    </iDialog>
    <!-- MBDL改期 -->
    <iDialog
      v-if="updateDateNEWDialog"
      :title="language('改期会议列表', '改期会议列表')"
      :visible.sync="updateDateNEWDialog"
      width="90%"
      :append-to-body="true"
      >
      <updateDateNEW
        v-if="updateDateNEWDialog"
        @close="updateDateNEWDialog = false"
        style="padding-bottom: 20px"
        @flushTable='flushTable'
        :updateDateNEWDialogRow='updateDateNEWDialogRow'
        :rowId="rowId"
      ></updateDateNEW>
    
    </iDialog>
  </iPage>
</template>
<script>
import updateDateNEW from './component/updateDateNEW.vue'
import editprotectConclusion from './component/editprotectConclusion.vue'
import newAddTopic from './component/newAddTopic.vue'
import protectConclusion from './component/protectConclusion.vue'
import batchAdjustment from './component/batchAdjustment'
import { iButton, iCard, iMessage, iPage, iPagination , iDialog} from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import { buttonList } from './component/data'
// import iTableCustom from "@/components/iTableCustom";
import actionButtons from './component/actionButtons.vue'
import addRest from './component/addRest.vue'
import addTopic from './component/addTopic.vue'
import newProtectInfo from './component/newProtectInfo.vue'
// import confirmDelete from "./component/confirmDelete.vue";
import updateDate from './component/updateDate.vue'
// import importThemen from "./component/importThemen.vue";
// import confirmSplit from "./component/confirmSplit.vue";
// import importThemens from "../home/components/importThemens.vue";
import updateFile from '@/components/updateFile'
import importErrorDialog from './component/importErrorDialog.vue'
import iTableML from '@/components/iTableML'
import {
  deleteThemen,
  endThemen,
  // findThemenById,
  passThemenRecall,
  rejectThemenRecall,
  resortThemen,
  spiltThemen,
  startThemen
} from '@/api/meeting/details'
import { findThemenById } from '@/api/meeting/gpMeeting'
import Sortable from 'sortablejs'
import dayjs from '@/utils/dayjs.js'
import { getMettingType } from '@/api/meeting/type' //resortThemen
import updateMeetingDialog from '../../home/components/updateMeetingDialog.vue'
import newSummaryDialog from './component/newSummaryDialog.vue'
import {
  batchRecallMeeting,
  changeStateMeeting,
  importThemen
} from '@/api/meeting/home'
import closeMeetiongDialog from './component/closeMeetiongDialog.vue'
import { download } from '@/utils/downloadUtil'
import enclosure from '@/assets/images/enclosure.svg'

export default {
  mixins: [pageMixins],
  components: {
    updateDateNEW,//改期
    editprotectConclusion,//维护结论
    newAddTopic,//新增议题gp
    protectConclusion,//结束议题
    batchAdjustment,//批量调整
    iDialog,
    iPage,
    iCard,
    iPagination,
    // iTableCustom,
    actionButtons,
    iButton,
    addRest,
    addTopic,
    newProtectInfo,
    // confirmDelete,
    updateDate,
    // confirmSplit,
    // importThemen,
    // importThemens,
    updateMeetingDialog,
    newSummaryDialog,
    closeMeetiongDialog,
    updateFile,
    iTableML,
    importErrorDialog
  },
  data() {
    return {
      updateDateNEWDialog:false,//改期
      editprotectConclusionDialog:false,//维护议题结论
      selectThemenId:'',//当前议题行id
      protectConclusionDialog:false,//结束议题
      statusObj: {
        '01': '未进行',
        '02': '进行中',
        '03': '已结束'
      },
      resultObj:{
        '01': '待定',
        '02': '通过',
        '03': '预备会议通过',
        '04': '不通过',
        '05': 'Last Call',
        '06': '分段定点'
      },
      curEndTime: '',
      openError: false,
      errorList: [],
      isSingle: false,
      curState: '',
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
        //修改对话框
        openAddTopicNewDialog: false,
        openUpdate: false,
        openNewSummaryDialog: false,
        openCloseMeetiongDialog: false
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
        'deleteTop',
        'updateDate',
        'split'
        // "startTopic",
        // "overTopic",
      ],
      lookThemenObj: {},
      display: 'none',
      changedArr: '',
      batchAdjustmentDialog:false,//批量调整
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
  computed: {},
  mounted() {
    // this.isAdmin = localStorage.getItem("isMA") === "false" ? false : true;
    this.getMeetingTypeObject()
    this.getTableData()
  },
  methods: {
    //批量调整
    batchAdjustment(){
      this.batchAdjustmentDialog=true
      // const meetingId = this.$route.query.id
      
    },
    handleEndTime(row) {
      let startTimeDate = new Date(`${row.startDate} ${row.startTime}`)
      let endTime =
        new Date(`${row.startDate} ${row.startTime}`).getTime() +
        3600 * 8 * 1000
      let endTimeDate = new Date(endTime)
      let str = dayjs(endTime).format('HH:mm')

      let startHour = startTimeDate.getHours()
      let endHour = endTimeDate.getHours()
      if (endHour < startHour) {
        return '~' + str + ' +1'
      }
      return '~' + str
    },
    getUplodFiles(nameList) {
      this.nameList = nameList
    },
    // 下载模版
    downDemo() {
      download({
        url: '/rise-meeting/meetingService/downloadThemenImportTemplate',
        filename: '议题模版',
        // type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel',
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
      this.openDialog('openNewSummaryDialog')
    },
    lookMeetingMinutes() {
      this.editNewSummary = false
      this.openDialog('openNewSummaryDialog')
    },
    lookThemen(themen) {
      if (!themen.isBreak) {
        this.editOrAdd = 'look'
        this.lookThemenObj = themen
        this.openDialog('openAddTopicDialog')
      } else {
        this.editOrAdd = 'look'
        this.lookThemenObj = themen
        this.openDialog('openAddRestDialog')
      }
    },
    // 导入议题保存
    handleOKTopics() {
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
          // if (res.id) {
          //   iMessage.success('导入议题成功')
          //   this.openTopics = false
          //   this.disabledImportThemenButton = false
          //   // this.refreshTable();
          //   this.flushTable()
          //   this.closeDialog()
          //   this.nameList = []
          // }
          if (res.length == 0) {
            iMessage.success('导入议题成功')
            this.openTopics = false
            this.disabledImportThemenButton = false
            // this.refreshTable()
            this.flushTable()
            this.closeDialog()
            this.nameList = []
          } else if (res.length != 0) {
            // this.openTopics = false
            this.disabledImportThemenButton = false
            this.openError = true
            this.errorList = res
            this.flushTable()
          }
        })
        .catch(() => {
          this.disabledImportThemenButton = false
          this.nameList = []
        })
      this.flushTable()
    },
    // 上传议题错误提示框关闭
    handleCloseError() {
      this.openError = false
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
            //从下往上
            //拖拽对象的最终位置是 newIndex
            //在起始位和最终位之间的所有对象索引+1
            //从上往下
            //拖拽对象的最终位置是 newIndex
            //在起始位和最终位之间的所有对象索引-1
            // const startIndex = newIndex < oldIndex ? newIndex : oldIndex;
            // const endIndex = newIndex > oldIndex ? newIndex : oldIndex;
            let targetIndex = newIndex
            let sourceIndex = oldIndex
            _this.handleDragDataTransform(targetIndex, sourceIndex)
            //时间间隔储藏
            // const durationList = _this.tableData.map((item, index) => {
            //   if (index === startIndex) {
            //     return _this.tableData[endIndex].duration;
            //   }
            //   if (index === endIndex) {
            //     return _this.tableData[startIndex].duration;
            //   }
            //   return item.duration;
            // });
            // let beginTime = _this.tableData[0].dateTimeNumber;
            // const timeList = [];
            // //时间计算并储藏
            // for (let index = 0; index < _this.tableData.length; index++) {
            //   let time = `${dayjs(beginTime).format("HH:mm")}~${dayjs(
            //     beginTime + durationList[index] * 60 * 1000
            //   ).format("HH:mm")}`;
            //   beginTime =
            //     beginTime + durationList[index] * 60 * 1000 + 60 * 1000;
            //   timeList.push(time);
            // }
            //生成排序后时间
            // _this.tableData = _this.tableData.map((item, index) => {
            //   if (index >= startIndex && index <= endIndex) {
            //     return {
            //       ...item,
            //       time: timeList[index],
            //       duration: durationList[index],
            //     };
            //   }
            //   return item;
            // });
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
      //从下往上targetItemNo<sourceItemNo
      //拖拽对象的最终位置是 newIndex
      //在起始位和最终位之间的所有对象索引+1
      //从上往下targetItemNo>sourceItemNo
      //拖拽对象的最终位置是 newIndex
      //在起始位和最终位之间的所有对象索引-1
      //之前的数据数量
      // const preSize = this.page.pageSize * (this.page.currPage - 1);
      // const targetItemNo = preSize + targetIndex;
      // const sourceItemNo = preSize + sourceIndex;

      // const start = targetItemNo > sourceItemNo ? sourceItemNo : targetItemNo;
      // const end = targetItemNo > sourceItemNo ? targetItemNo : sourceItemNo;
      // //从下往上 为true 从上往下为false
      // const isUp = start === targetItemNo;
      // console.log("sourceItemNo", sourceItemNo);
      // console.log("targetItemNo", targetItemNo);

      // console.log(
      //   "before:",
      //   this.resThemeData.map((i) => i.itemNo)
      // );
      // this.resThemeData = this.resThemeData.map((item, index) => {
      //   const seqNo = index + 1;
      //   if (seqNo === sourceItemNo)
      //     return {
      //       ...item,
      //       itemNo: targetItemNo,
      //       themenId: item.id,
      //     };
      //   if (seqNo === targetItemNo)
      //     return {
      //       ...item,
      //       itemNo: isUp ? item.itemNo + 1 : item.itemNo - 1,
      //       themenId: item.id,
      //     };
      //   if (seqNo > start && seqNo < end)
      //     return {
      //       ...item,
      //       itemNo: isUp ? item.itemNo + 1 : item.itemNo - 1,
      //       themenId: item.id,
      //     };
      //   return {
      //     ...item,
      //     itemNo: item.itemNo,
      //     themenId: item.id,
      //   };
      // });
      // console.log(
      //   "after:",
      //   this.resThemeData.map((i) => i.itemNo)
      // );
    },
    getTableData() {
      const meetingId = this.$route.query.id
      this.queryMeetingInfoById(meetingId)
    },
    handlePage(data = []) {
      // let startTime = new Date(
      //   `${this.meetingInfo.startDate} ${this.meetingInfo.startTime}`
      // ).getTime();
      // let endTime;
      this.page.totalCount = data.length
      this.page.pageSize = 10
      this.tableData = data.filter((item, index) => {
        return index < 10
      })
      this.tableData = this.tableData.map((item) => {
        // startTime = endTime ? endTime + 60 * 1000 : startTime;
        // endTime = startTime + item.duration * 60 * 1000;
        const startTime = dayjs(`2020-6-30 ${item.startTime}`).format('HH:mm')
        const endTime = dayjs(`2020-6-30 ${item.endTime}`).format('HH:mm')
        return {
          ...item,
          time: `${
            Number(item.plusDayStartTime) > 0
              ? startTime + ' +' + Number(item.plusDayStartTime)
              : startTime
          }~${
            Number(item.plusDayEndTime) > 0
              ? endTime + ' +' + Number(item.plusDayEndTime)
              : endTime
          }`
        }
      })
    },
    goState(state) {
      this.curState = state
      switch (state) {
        //草稿
        case '01':
          // this.currentButtonList = buttonList[5];
          // this.currentButtonList = buttonList[1];
          break
        //开放
        case '02':
          this.currentButtonList = buttonList[0]
          this.tableButtonList = this.currentButtonList.tableButtonList
          break
        //锁定
        case '03':
          this.currentButtonList = buttonList[1]
          this.tableButtonList = this.currentButtonList.tableButtonList
          break
        //开始
        case '04':
          this.currentButtonList = buttonList[2]
          this.tableButtonList = this.currentButtonList.tableButtonList
          break
        // 结束
        case '05':
          this.currentButtonList = buttonList[3]
          this.tableButtonList = this.currentButtonList.tableButtonList
          break
        // 关闭
        case '06':
          this.currentButtonList = buttonList[4]
          this.tableButtonList = this.currentButtonList.tableButtonList
          break
        default:
          // this.currentButtonList = buttonList[0];
          break
      }
    },
    //数据请求
    queryMeetingInfoById(id) {
      const data = {
        id
        // 这里的id就是 this.$route.query.id
      }
      const _this = this
      findThemenById(data).then((res) => {
          console.log(res,'1111');
          _this.meetingInfo = res
          //拿到状态state
          _this.goState(res.state)
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
        // if (index < (_this.page.currPage - 1) * _this.page.pageSize) {
        //   totalDuration = totalDuration + item.duration + 1;
        // }
        if (
          index >= (_this.page.currPage - 1) * _this.page.pageSize &&
          index < _this.page.currPage * _this.page.pageSize
        ) {
          return true
        }
        return false
      })
      //每一页的开始时间
      // const everyPageStartTime =
      //   new Date(
      //     `${_this.that.$data.meetingInfo.startDate} ${_this.that.$data.meetingInfo.startTime}`
      //   ).getTime() +
      //   totalDuration * 60 * 1000;
      // let startTime = everyPageStartTime;
      // let endTime;
      //根据开始时间生成每一页的time
      // _this.tableData = _this.tableData.map((item) => {
      //   startTime = endTime ? endTime + 60 * 1000 : startTime;
      //   endTime = startTime + item.duration * 60 * 1000;
      //   return {
      //     ...item,
      //     time: `${dayjs(startTime).format("HH:mm")}~${dayjs(endTime).format(
      //       "HH:mm"
      //     )}`,
      //   };
      // });
      //发送

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
      // alert("overUpdateTopic");
      //调整完成 需要更新状态
      // this.$confirm("是否保存调整结果?", "提示", {
      //   confirmButtonText: "是",
      //   cancelButtonText: "否",
      //   type: "warning",
      // }).then(() => {
      if (this.changedArr) {
        this.handleUpdateThemen()
      }
      this.tableObject.destroy()
      this.showUpdateTopicButtonList = false
      // });
    },
    //取消调整
    cancelUpdateTopic() {
      //取消调整需要恢复原状态
      // this.$confirm("是否取消调整？", "提示", {
      //   confirmButtonText: "是",
      //   cancelButtonText: "否",
      //   type: "warning",
      // }).then(() => {
      this.changedArr = ''
      this.tableObject.destroy()
      this.showUpdateTopicButtonList = false
      // });
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
      // console.log(this.shouldhanldeUpdateData);
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
      // if (this.meetingInfo.attachments.length <= 0) {
      //   // this.$confirm("是否生成会议纪要", "提示", {
      //   //   confirmButtonText: "是",
      //   //   cancelButtonText: "否",
      //   //   type: "warning",
      //   // })
      //   //   .then(() => {
      //   //     this.generateMeetingMinutes();
      //   //   })
      //   //   .catch((err) => {
      //   //     iMessage.warn("尚未生成会议纪要,现在不能关闭会议!");
      //   //   });
      //   iMessage.error("尚未生成会议纪要,现在不能关闭会议!");
      // } else {
      //   this.$confirm("请确认是否需要关闭会议?", "提示", {
      //     confirmButtonText: "是",
      //     cancelButtonText: "否",
      //     type: "warning",
      //   }).then(() => {
      //     //在这里判断是不是已经生成会议纪要了
      //     this.openDialog("openCloseMeetiongDialog");
      //   });
      // }

      // if (this.meetingInfo.attachments.length <= 0) {
      //   this.$confirm('尚未生成会议纪要，前往生成会议纪要？', '提示', {
      //     confirmButtonText: '前往',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     //在这里判断是不是已经生成会议纪要了
      //     // this.openDialog("openCloseMeetiongDialog");
      //     this.generateMeetingMinutes()
      //   })
      // } else {
      //   this.$confirm('请确认是否需要关闭会议?', '提示', {
      //     confirmButtonText: '是',
      //     cancelButtonText: '否',
      //     type: 'warning'
      //   }).then(() => {
      //     //在这里判断是不是已经生成会议纪要了
      //     this.openDialog('openCloseMeetiongDialog')
      //   })
      // }
      this.$confirm("是否生成会议纪要", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning",
      })
        .then(() => {
          this.$confirm("请确认是否需要关闭会议?", "提示", {
            confirmButtonText: "是",
            cancelButtonText: "否",
            type: "warning",
          }).then(() => {
            //在这里判断是不是已经生成会议纪要了
            if (this.meetingInfo.attachments.length > 0) {
              console.log(this.meetingInfo.attachments);
              // this.openDialog("openCloseMeetiongDialog");
              // 关闭会议
              // this.handleCloseCancelTopics()
                this.$nextTick(()=>{
                   this.$refs['closeDialog'].handleSubmit()
                })
                // console.log(this.$refs.closeDialog);
            } else {
              iMessage.warn("尚未生成会议纪要,现在不能关闭会议!");
            }
          });
        })
        .catch((err) => {
          iMessage.error("尚未生成会议纪要,现在不能关闭会议!");
        });
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
      // if (m === "over") {
      //   if (!this.resThemeData || this.resThemeData.length === 0) {
      //     return false;
      //   }
      // }

      return this.resThemeData.every((item) => {
        return item.state === '03'
      })
    },
    startTopic() {
      // alert("startTopic");
      // console.log(this.haveThemenIsStarting());
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
      // this.$confirm("请确认是否需要开始该议题？", "提示", {
      //   confirmButtonText: "是",
      //   cancelButtonText: "否",
      //   type: "warning",
      // }).then(() => {
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
          iMessage.error('开始议题失败！')
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
    // 结束议题
    overTopic() {
      // isBreak  true就是休息
      if(this.selectedTableData[0].isBreak){
        console.log("休息");
        const params = {
          meetingId:this.$route.query.id,//会议id
          themenId:this.selectedTableData[0].id//议题id
        }
        console.log(params);
        endThemen(params).then((res) => {
          if (res.code) {
            iMessage.success('结束议题成功！')
            this.flushTable()
          }else{
            iMessage.success('结束会议失败！')
          }
        })
      }else{
        console.log(this.selectedTableData[0].isBreak);
        this.protectConclusionDialog=true
        this.selectThemenId=this.selectedTableData[0].id
      }
      // this.selectedTableData
      console.log('结束议题');
      return
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
        // this.$confirm("确认？会议进行时间过短，请确认是否需要结束？", "提示", {
        //   cancelButtonText: "暂不结束",
        //   confirmButtonText: "是",
        //   type: "warning",
        // }).then(() => {
        endThemen(param).then(() => {
            iMessage.success('结束议题成功！')
            // this.refreshTable();
            this.flushTable()//刷新表格
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
            this.flushTable()//刷新表格
          })
          .catch(() => {
            // iMessage.error("结束会议失败！");
          })
      }
    },
    split() {
      // alert("split");
      // this.openDialog("openSplitDialog");
      const data = {
        meetingId: this.meetingInfo.id,
        themenId: this.selectedTableData[0].id
      }
      // this.$confirm("确认拆分该议题吗?", "提示", {
      //   confirmButtonText: "确认",
      //   cancelButtonText: "取消",
      //   type: "warning",
      // }).then(() => {
      spiltThemen(data)
        .then(() => {
          iMessage.success('拆分成功')
          this.flushTable()
        })
        .catch(() => {
          iMessage.error('拆分失败')
          this.flushTable()
        })
      // });
    },
    start() {
      // alert("start");
      // 开始
      // this.$confirm("请确认是否需要开始会议？", "提示", {
      //   confirmButtonText: "是",
      //   cancelButtonText: "否",
      //   type: "warning",
      // }).then(() => {
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
    recall() {
      let ids = []
      ids.push(this.$route.query.id)
      this.$confirm('是否撤回该会议 ？', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      }).then(() => {
        batchRecallMeeting({ ids }).then((res) => {
          if (res.code == 200) {
            this.$message.success('撤回成功!')
            this.$router.go(-1)
          }
        })
      })
    },
    updateDate() {
      console.log(this.selectedTableData);//当前行数据
      // alert("updateDate");
      if (this.selectedTableData[0] && this.selectedTableData[0].isBreak) {
        iMessage.warn('休息议题不能进行改期')
        return
      }
      
      // this.openDialog('openUpdateDateDialog')
      this.rowId=this.selectedTableData[0].id
      this.updateDateNEWDialog=true
    },
    deleteTop() {
      console.log(this.selectedTableData[0]);
      // isBreak
      if (this.selectedTableData[0].isBreak == false && this.selectedTableData[0].type == 'GP') {
        iMessage.warn('改议题不能删除')
        return
      }
      if (
        this.selectedTableData[0] &&
        this.selectedTableData[0].state !== '01' &&
        this.selectedTableData[0].state !== '04'
      ) {
        iMessage.warn('只能删除未进行的议题')
        return
      }
      if (
        this.selectedTableData[0] &&
        this.selectedTableData[0].state === '04'
      ) {
        iMessage.warn('不能删除撤回中的议题')
        return
      }
      const data = {
        meetingId: this.meetingInfo.id,
        id: this.selectedTableData[0].id
      }
      this.$confirm('确认删除该议题吗?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteThemen(data).then((res) => {
          if (res.code === 200) {
            iMessage.success('删除成功')
          }
          this.flushTable()
        })
        // .catch(() => {
        //   iMessage.error('删除失败')
        //   this.flushTable()
        // })
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
    //修改议题
    editTopic() {
      
      if (this.selectedTableData[0].state === '03') {
        iMessage.warn('已结束的议题不能进行修改议题')
        return
      }
      this.editOrAdd = 'edit'
      if (this.selectedTableData[0].isBreak) {
        console.log('休息');
        this.openDialog('openAddRestDialog')
        return
      }
      // this.openDialog('openAddTopicDialog')
      console.log('临时议题');
      this.openDialog('openAddTopicNewDialog')//议题
    },
    importTopic() {
      this.openDialog('openImportTopicDialog')
    },
    //新增议题
    addTopic() {
      this.editOrAdd = 'add'
      this.openDialog('openAddTopicDialog')
    },
    //新增gp议题
    newAddTopic(){
      this.editOrAdd = 'add'
      this.openDialog('openAddTopicNewDialog')//议题
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
      // alert("open");
      // console.log(this.meetingInfo);
      // 开放
      // this.$confirm("请确认是否需要开放会议？", "提示", {
      //   confirmButtonText: "是",
      //   cancelButtonText: "否",
      //   type: "warning",
      // }).then(() => {
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
      // alert("结束");
      // 结束
      // let dateCurrent = new Date().valueOf();
      // let dateEnd = new Date(
      //     this.meetingInfo.endDate + " " + this.meetingInfo.endTime
      // ).valueOf();
      // this.$confirm(
      //   dateEnd < dateCurrent
      //     ? "会议进行时间过短，请确认是否需要结束？"
      //     : "请确认是否需要结束会议？",
      //   "提示",
      //   {
      //     confirmButtonText: "是",
      //     cancelButtonText: "暂不结束",
      //     type: "warning",
      //   }
      // ).then(() => {
      let param = {
        id: this.meetingInfo.id,
        state: '05'
      }
      changeStateMeeting(param)
        .then((res) => {
          if (res.code === 200) {
            iMessage.success('结束会议成功！')
            this.flushTable()
            this.getMeetingTypeObject()
          }
        })
        .catch(() => {
          // iMessage.error("结束会议失败！");
        })
      // });
    },
    sameScreen() {
      // alert("同屏");
      // 同屏
      let routeUrl = this.$router.resolve({
        path: '/meeting/same-screen',
        query: {
          id: this.meetingInfo.id
        }
      })
      window.open(routeUrl.href, '_blank')
    },
    //展示跳转
    displayShow() {
      // alert("展示");
      // 展示
      // this.$router.push({
      //   path: "/meeting/meeting-show",
      //   query: {
      //     id: this.meetingInfo.id,
      //   },
      // });
      // let routeUrl = this.$router.resolve({
      //   // path: this.meetingInfo.meetingTypeName == 'Pre CSC' || this.meetingInfo.meetingTypeName == 'CSC'
      //   path:
      //     this.meetingInfo.isPreCSC || this.meetingInfo.isCSC
      //       ? '/meeting/meetingShow' //新页面
      //       : '/meeting/meeting-show', //旧页面
      //   query: {
      //     id: this.meetingInfo.id
      //   }
      // })
      // /meeting/mbdlMeetingShow
      
      let routeUrl = this.$router.resolve({
        path:'/meeting/mbdlMeetingShow',
        query: {
          id: this.meetingInfo.id
        } 
      })
      window.open(routeUrl.href, '_blank')
    },
    lock() {
      // alert("lock");
      // console.log(this.meetingInfo);
      // this.currentButtonList = buttonList[1];
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
            iMessage.error('锁定会议失败！')
          })
      })
    },
    deblock() {
      // alert("deblock");
      // this.currentButtonList = buttonList[0];
      // 解锁
      // this.$confirm("请确认是否需要解锁会议？", "提示", {
      //   confirmButtonText: "是",
      //   cancelButtonText: "否",
      //   type: "warning",
      // }).then(() => {
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
          iMessage.error('解锁会议失败！')
        })
      // });
    },
    edit() {
      // alert("edit");
      // this.currentButtonList = buttonList[2];
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

    // 表格选中值集  当前行数据
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
      //当前行
      this.selectedTableData = val
      const handleDisabledButtonName = this.handleDisabledButtonName
      if (val.length === 1) {
        if (val[0].state === '03') {
          this.handleButtonDisabled(handleDisabledButtonName, true)
          this.handleStartTopicButtonDisabled(['startTopic'], true)
          this.handleButtonDisabled(['overTopic'], true)
        } else if (val[0].state === '02') {
          this.handleButtonDisabled(handleDisabledButtonName, true)
          this.handleStartTopicButtonDisabled(['startTopic'], true)
          this.handleButtonDisabled(['overTopic'], false)
          this.handleButtonDisabled(['editTopic'], false)
        } else {
          this.handleButtonDisabled(handleDisabledButtonName, false)
          this.handleStartTopicButtonDisabled(['startTopic'], false)
          this.handleButtonDisabled(['overTopic'], true)
        }
      } else {
        this.handleButtonDisabled(handleDisabledButtonName, true)
        this.handleStartTopicButtonDisabled(['startTopic'], true)
        this.handleButtonDisabled(['overTopic'], true)
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
    },
    //点击纪要  维护结论
    handleResult(row){
      console.log(row.result);
      if (this.selectedTableData[0].conclusion == '01') {
        this.editprotectConclusionDialog=true
        this.editprotectConclusionDialogRow=row
        console.log(this.editprotectConclusionDialogRow);
        
      }
    },
    //跳转到gp  mbdl详情 id mbdlDetails
    // window.open(`${process.env.VUE_APP_HOST}/gpbidding/#/supplierBidHall?supplierId=${row.supplierId}`)
    handleMBDl(row){ 
      console.log(row);
      if (row.isBreak) {
        iMessage.error('改议题为休息')
      }else if(row.type == 'MANUAL'){
        iMessage.error('改议题为临时议题')
      }else{
        window.open(`${process.env.VUE_APP_HOST}/gpurchase/#/mbdlDetails?id=${row.fixedPointApplyId}`)
      }
    } 
  }
}
</script>
<style lang="scss" scoped>
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
      background-image: url('../../../../assets/images/reback.png');
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
    background-image: url('../../../../assets/images/reback.png');
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
