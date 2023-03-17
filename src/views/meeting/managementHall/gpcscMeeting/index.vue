<!--
 * @Author: HS  gpcsc会议
 * @FilePath: \front-portal\src\views\meeting\managementHall\gpcscMeeting\index.vue
-->
<template>
  <iPage>
    <div>
      <!-- 文字内容 -->
      <div class="header">
        <div class="row">
          <div class="meeting-type">
            <div  class="name">会议名称</div>
            <div
              class="name-content"
              :title="meetingInfo.name"
            >
              {{ meetingInfo.name }}
            </div>
            <iButton
              v-permission="GPMEETINGALLBUTTON" 
              class="button"
              @click="currentButtonList.methodName"
              disabled
            >{{ $t(currentButtonList.title) }}</iButton>
          </div>
          <div class="button-list">
            <iButton
              v-permission="GPMEETINGALLBUTTON" 
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
              {{ $t(item.title) }}</iButton>
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
      <!-- 列表 -->
      <iCard>
        <!-- <iButton
          @click="handleClickColumn"
          class="display-column"
          :disabled="showUpdateTopicButtonList"
          >列隐藏/显示</iButton
        > -->
        <actionButtons
        v-permission="GPMEETINGALLBUTTON" 
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
          @newAddTopic="newAddTopic"
          @sendAgenda="sendAgenda"
          @batchAdjustment="batchAdjustment"
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
            ref="hiddenColumnTable"
          >
            <!-- <el-table-column align="center" width="30"></el-table-column> -->
            <el-table-column
              type="selection"
              align="center"
              min-width="40"
            ></el-table-column>
            <!-- <el-table-column align="center" width="10"></el-table-column> -->
            <el-table-column
              align="center"
              label="#"
              width="23"
            >
              <template slot-scope="scope">
                <span style="span-index">{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <!-- 标记 -->
            <el-table-column
              align="center"
              label="标记"
              min-width="50"
            >
              <template slot-scope="scope">
                <icon
                   v-if="scope.row.sign=='S'||scope.row.sign=='F'"
                  symbol
                  :name="scope.row.sign=='S' ? 'iconicon-baofeichuzhi' : scope.row.sign=='F' ?'iconicon-fenduandingdian':''"
                ></icon>
                <span v-if="scope.row.sign=='手工'" class="font-bj">手</span>
              </template>
            </el-table-column>
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
                <span
                  class="open-link-text look-themen-click"
                  @click="handleCSC(scope.row)"
                >{{scope.row.topic}}</span>
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
                <!-- <span v-if="scope.row.conclusion=='01'||  scope.row.conclusion=='11' ? '':'' "  
                @click="handleResult(scope.row)">{{ resultObj[scope.row.conclusion] }}</span> -->
                <!-- <span>{{ resultObj[scope.row.conclusion] }}</span> -->
                <span
                  v-if="scope.row.conclusion=='01'||  scope.row.conclusion=='11'"
                  style="color:blue"
                  @click="handleResultObj(scope.row)"
                >{{resultObj[scope.row.conclusion]}}</span>
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
            
          </iTableML>
          <div id="table-drag">
            <!-- 原meeting代码删除 就是实现议题调整 -->
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
              <!-- <el-table-column align="center" width="30"></el-table-column> -->
              <el-table-column
                type="selection"
                align="center"
                min-width="40"
              ></el-table-column>
              <!-- <el-table-column align="center" width="10"></el-table-column> -->
              <el-table-column
                align="center"
                label="#"
                width="23"
              >
                <template slot-scope="scope">
                  <span style="span-index">{{ scope.$index + 1 }}</span>
                </template>
              </el-table-column>
              <!-- 标记 -->
              <el-table-column
                align="center"
                label="标记"
                min-width="50"
              >
                <template slot-scope="scope">
                  <icon
                    symbol
                    :name="scope.row.sign=='S' ? 'iconicon-baofeichuzhi' : scope.row.sign=='F' ?'iconicon-fenduandingdian':''"
                  ></icon>
                </template>
              </el-table-column>
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
                  <span class="open-link-text">{{scope.row.topic}}</span>
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
                  <!-- <span @click="handleResult(scope.row)">{{ resultObj[scope.row.conclusion] }}</span> -->
                  <span
                    v-if="scope.row.conclusion=='01'||  scope.row.conclusion=='11'"
                    style="color:blue"
                    @click="handleResultObj(scope.row)"
                  >{{resultObj[scope.row.conclusion]}}</span>
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
              <!-- CSC编号 -->
              
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
    <!-- 新增议题 -->
    <!-- <addTopic
      @closeDialog="closeDialog"
      :dialogStatusManageObj="dialogStatusManageObj"
      v-if="dialogStatusManageObj.openAddTopicDialog"
      @flushTable="flushTable"
      :meetingInfo="meetingInfo"
      :editOrAdd="editOrAdd"
      :selectedTableData="selectedTableData"
      :lookThemenObj="lookThemenObj"
    /> -->
    <!-- 新增议题gp -->
    <newAddTopic
      @closeDialog="closeDialog"
      :dialogStatusManageObj="dialogStatusManageObj"
      v-if="dialogStatusManageObj.openAddTopicNewDialog"
      @flushTable="flushTable"
      :meetingInfo="meetingInfo"
      :editOrAdd="editOrAdd"
      :selectedTableData="selectedTableData"
      :lookThemenObj="lookThemenObj"
    >
    </newAddTopic>
    <!-- <addTopicNew
      @closeDialog="closeDialog"
      :dialogStatusManageObj="dialogStatusManageObj"
      v-if="dialogStatusManageObj.openAddTopicNewDialog"
      @flushTable="flushTable"
      :meetingInfo="meetingInfo"
      :editOrAdd="editOrAdd"
      :selectedTableData="selectedTableData"
      :lookThemenObj="lookThemenObj"
    /> -->
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
    <!-- 结束议题  -->
    <protectConclusion
      v-if="dialogStatusManageObj.openProtectConclusion"
      :open="dialogStatusManageObj.openProtectConclusion"
      @close="dialogStatusManageObj.openProtectConclusion = false"
      @flushTable="flushTable"
      @closeDialog="closeDialog"
      :selectedTableData="selectedTableData"
      :meetingInfo="meetingInfo"
      :isOther="isOther"
      :beforeResult="beforeResult"
      :autoOpenProtectConclusionObj="autoOpenProtectConclusionObj"
    />
    <!-- 结束议题  二次修改 -->
    <newprotectConclusion
      v-if="dialogStatusManageObj.opennewprotectConclusion"
      :open="dialogStatusManageObj.opennewprotectConclusion"
      @close="dialogStatusManageObj.opennewprotectConclusion = false"
      @flushTable="flushTable"
      @closeDialog="closeDialog"
      :selectedTableData="newSelectedTableData"
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
    <importErrorDialog
      v-if="openError"
      :openError="openError"
      :errorList="errorList"
      @handleCloseError="handleCloseError"
    />
    <!-- 发送大会议程 -->
    <iDialog
      v-if="sendAgendaDialog"
      :title="language('发送大会议程', '发送大会议程')"
      :visible.sync="sendAgendaDialog"
      width="80%"
      :append-to-body="true"
    >
      <sendAgenda
        v-if="sendAgendaDialog"
        @close="sendAgendaDialog = false"
        style="padding-bottom: 20px"
        @flushTable="flushTable"
        :rowId="rowId"
      ></sendAgenda>
    </iDialog>
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
        @flushTable="flushTable"
      ></batchAdjustment>
    </iDialog>
    <!-- CSC改期 -->
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
    <!-- 列表维护结论 -->
    <editprotectConclusion
      v-if="dialogStatusManageObj.editprotectConclusion"
      :open="dialogStatusManageObj.editprotectConclusion"
      @close="dialogStatusManageObj.editprotectConclusion = false"
      @flushTable="flushTable"
      @closeDialog="closeDialog"
      :selectedTableData="selectedTableData"
      :meetingInfo="meetingInfo"
      :isOther="isOther"
      :beforeResult="beforeResult"
      :autoOpenProtectConclusionObj="autoOpenProtectConclusionObj"
      :conclusionStatus="conclusionStatus"
      :editprotectConclusionDialogRow='editprotectConclusionDialogRow'
    />
  </iPage>
</template>
<script>
import newprotectConclusion from './component/newprotectConclusion.vue'
import editprotectConclusion from './component/editprotectConclusion.vue'
import updateDateNEW from './component/updateDateNEW'
import batchAdjustment from './component/batchAdjustment'
import sendAgenda from './component/sendAgenda'
import newAddTopic from './component/newAddTopic.vue'
import { iPage, iCard, iButton, iMessage, iDialog, icon } from 'rise'
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
import importErrorDialog from './component/importErrorDialog.vue'

import {
  // findThemenById,
  endThemen,
  startThemen,
  // recallThemen,
  passThemenRecall,
  rejectThemenRecall,
  deleteThemen,
  resortThemen,
  spiltThemen
} from '@/api/meeting/details'
import { findThemenById, endCscThemen } from '@/api/meeting/gpMeeting'
import Sortable from 'sortablejs'
import dayjs from '@/utils/dayjs.js'
import { getMettingType } from '@/api/meeting/type' //resortThemen
// import updateMeetingDialog from '../home/components/updateMeetingDialog.vue'
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
// import newSummaryDialogNew from '@/views/meeting/home/components/newSummaryDialogNew.vue'
import newSummaryDialogNew from './component/newSummaryDialogNew.vue'
import treeVue from '@/views/params/tree.vue'

export default {
  mixins: [pageMixins],
  components: {
    newprotectConclusion,
    editprotectConclusion,
    updateDateNEW,
    batchAdjustment,//批量调整
    sendAgenda,//发送大会议程
    newAddTopic,//新增议题gp
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
    addTopicNew,
    importErrorDialog,
    iDialog,
    icon
  },
  data() {
    return {
      newprotectConclusion: false,
      editprotectConclusionDialog: false,
      updateDateNEWDialog: false,
      resultObj: {
        '01': '待定',
        '08': '通过',
        '09': '预备会议通过',
        '10': '不通过',
        '11': 'Last Call',
        '12': '分段定点'
      },
      openError: false,
      errorList: [],
      autoOpenProtectConclusionObj: '',
      isSingle: false,
      // closeLoading: false,
      curState: '',
      processUrlGpPortal: process.env.VUE_APP_POINT_GP_PORTAL,
      processUrl: process.env.VUE_APP_POINT,
      processUrlPortal: process.env.VUE_APP_POINT_PORTAL,
      buttonList,
      receiverId: '',
      selectedTableData: [],
      newSelectedTableData: [],
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
        newprotectConclusion: false,
        editprotectConclusion: false,
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
      beforeResult: '',
      sendAgendaDialog: false,//发送大会议程
      batchAdjustmentDialog: false,//批量调整
      conclusionStatus: null
    }
  },
  watch: {
    isAdmin: {
      handler() { },
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
    sessionStorage.setItem('msgInfo',true)
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
  destroyed(){
    // sessionStorage.removeItem('msgInfo')
  },
  methods: {
    handleResultObj(row) {
      this.newSelectedTableData = row
      console.log(row);
      console.log(this.newSelectedTableData);
      this.openDialog('opennewprotectConclusion')

    },
    //批量调整
    batchAdjustment() {
      this.batchAdjustmentDialog = true
      // const meetingId = this.$route.query.id
    },
    //发送大会议程
    sendAgenda() {
      console.log(this.meetingInfo); 
      console.log(this.meetingInfo.themens); //全部会议
      console.log(this.selectedTableData);
      // if (this.selectedTableData.length < 1) {
      //   iMessage.success('请选择一条数据')
      // } else if (this.selectedTableData.length > 1) {
      //   iMessage.success('只能选择一条数据')
      // } else if (this.selectedTableData[0].state == '03' && this.selectedTableData[0].conclusion == '09') {
      //   // 判断议题结论为预备会通过和议题状态为已结束
      //   // 是预备会才会有弹窗   加字段判断isGpPreCSC  发送大会议程 按钮应该隐藏
      //   if (this.meetingInfo.isGpPreCSC == true) {
      //     this.sendAgendaDialog = true
      //     this.rowId = this.selectedTableData[0].id
      //   } else {
      //     iMessage.error('不是预备会，不能发送大会议程！')
      //   }
      // } else {
      //   iMessage.success('请确认议题为结束状态且结论为预备会通过')
      // }
      //6月27  修改为一次发送全部议题 
      // state == '03' conclusion == '09'
      if (this.meetingInfo.isGpPreCSC == true) {
        let dataList=[]
     
          this.meetingInfo.themens.map(x=>{
            if(x.state=='03' &&  x.conclusion== '09'){
              if(!x.isSendbm){
                dataList.push(x)
              }
            }
          })
          let dataRowId =[]
          dataList.forEach(z=>{
            dataRowId.push(z.id)
          })
          if (dataRowId.length == 0) {
            iMessage.error('没有预备会通过状态的议题，不能发送大会')
          }else{
            this.sendAgendaDialog = true
            // this.rowId = this.selectedTableData[0].id  //单个id
            this.rowId=dataRowId
          }
      } else {
        iMessage.error('不是预备会，不能发送大会议程！')
      }
    },
    handleClickColumn() {
      this.$refs['hiddenColumnTable'].handleOpenColumn()
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
      this.receiverId = this.meetingInfo?.receiverId
      this.openDialog('openNewSummaryDialogNew')
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
          time: `${Number(item.plusDayStartTime) > 0
              ? startTime + ' +' + Number(item.plusDayStartTime)
              : startTime
            }~${Number(item.plusDayEndTime) > 0
              ? endTime + ' +' + Number(item.plusDayEndTime)
              : endTime
            }`
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
                { title: '撤回', methodName: 'recall', disabled: true },
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
                { title: '撤回', methodName: 'recall', disabled: true },
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
    //数据请求
    queryMeetingInfoById(id) {
      const data = {
        id
      }
      const _this = this
      findThemenById(data).then((res) => {
        // mock数据
        // res.themens[0].sign='F'
        // console.log(res);
        // console.log(res.themens);
        // console.log(res.themens[0].sign);
        // return
        this.meetingType = res.state
        _this.meetingInfo = res
        // console.log(res);
        _this.goState(res.state, res.isCSC, res.isPreCSC)
        _this.resThemeData = [...res.themens]
        _this.handlePage(res.themens)
        _this.generateTime()
        // 发送大会议程按钮p判断  isGpPreCSC
        // console.log(res.isGpPreCSC);
        // if (res.isGpPreCSC == true) {
        //   // 显示
        //   this.handleButtonDisabled(['sendAgenda'], true)//发送大会议程
        // }else{
        //   //隐藏
        //   this.handleButtonDisabled(['sendAgenda'], true)//发送大会议程

        // }

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
      resortThemen(formData).then((data) => {
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
    //结束议题按钮
    overTopic() {
      // isBreak  true就是休息
      console.log(this.selectedTableData[0].isBreak);
      if (this.selectedTableData[0].isBreak) {
        const params = {
          // conclusion:this.ruleForm.taskCsc,//任务
          meetingId: this.$route.query.id,//会议id
          // result:this.ruleForm.conclusion.conclusionCsc,//结论
          themenId: this.selectedTableData[0].id//议题id
        }
        endCscThemen(params).then((res) => {
          if (res.code) {
            iMessage.success('结束议题成功！')
            this.flushTable()
          } else {
            iMessage.success('结束会议失败！')
          }
        })

      } else {
        this.openDialog('openProtectConclusion')
      }
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
      // alert("updateDate");
      if (this.selectedTableData[0] && this.selectedTableData[0].isBreak) {
        iMessage.warn('休息议题不能进行改期')
        return
      }
      // this.openDialog('openUpdateDateDialog')
      this.rowId = this.selectedTableData[0].id
      this.updateDateNEWDialog = true
    },
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
      // if (this.meetingInfo.isPreCSC || this.meetingInfo.isCSC) {
      //   this.openDialog('openAddTopicNewDialog')
      // } else {
      //   this.openDialog('openAddTopicDialog')
      // }
      this.openDialog('openAddTopicNewDialog')//议题

    },
    //新增议题
    addTopic() {
      this.editOrAdd = 'add'
      // if (this.meetingInfo.isPreCSC || this.meetingInfo.isCSC) {
      //   this.openDialog('openAddTopicNewDialog')//手工议题
      // } else {
      //   this.openDialog('openAddTopicDialog')//议题
      // }
    },
    //新增gp议题
    newAddTopic() {
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
        .catch(() => { })
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
        // path:
        //   this.meetingInfo.isPreCSC || this.meetingInfo.isCSC
        //     ? '/meeting/meetingShow' //新页面
        //     : '/meeting/meeting-show', //旧页面
        path: '/meeting/GPCSCMeetingShow',
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
        bol = true
      } else if (curObj.state === '02') {
        bol = treeVue
      } else {
        if (curObj.isBreak) {
          bol = false
        } else {
          if (curObj.type === 'MANUAL') {
            bol = false
          }
          if (curObj.type === 'FS+MTZ') {
          }
          if (!curObj.type) {
            bol = false
          }
        }
      }
      return bol
    },
    // 表格选中值集
    handleSelectionChange(val) {
      console.log(val)
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
          this.handleButtonDisabled(['sendAgenda'], false)//发送大会议程
          this.handleButtonDisabled(handleDisabledButtonName, true)

          this.handleStartTopicButtonDisabled(['startTopic'], true)
          this.handleButtonDisabled(['protectResult'], true)
          this.handleButtonDisabled(['overTopic'], false)
        } else {
          this.handleButtonDisabled(['sendAgenda'], true)
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
        this.handleButtonDisabled(['sendAgenda'], false)//发送大会议程
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
    },
    //点击纪要  维护结论
    handleResult(row) {
      console.log(row.conclusion);
      // 待定和Last Call可以改结论
      if (row.conclusion == '01' || row.conclusion == '11') {
        this.openDialog('editprotectConclusion')
        this.conclusionStatus = row.conclusion
        this.editprotectConclusionDialogRow = row
      } else {
        iMessage.success('该议题不支持修改结论')
      }
    },
    //跳转到gp  CSC展示 id myCscDetails  手工议题 current=1  别的current =3
    // window.open(`${process.env.VUE_APP_HOST}/gpbidding/#/supplierBidHall?supplierId=${row.supplierId}`)
    handleCSC(row) {
      console.log(row);
      if (row.isBreak) {
        iMessage.error('该议题为休息')
      } else if (row.type == 'MANUAL') {
        iMessage.error('该议题为临时议题')
      } else {
        window.open(
          `/portal/#/meeting/previewCSC?project=GP&documentType=${row.documentType}&fixedPointApplyId=${row.fixedPointApplyId}&id=${this.$route.query.id}`,
          '_blank'
        )
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.iDialogdiv {
  font-size: 18px;
  font-weight: 700;
}
.iDialogdivspan {
  font-weight: 400;
  margin-left: 20px;
  color: #b5b5b6;
}
.display-column {
  transform: translateY(90px);
}
/* .table-container {
  max-height: 514px;
  overflow-y: auto;
} */
::v-deep th.is-sortable {
  transform: translateY(2px);
}
::v-deep .caret-wrapper {
  width: initial !important;
}
.inline {
  display: inline !important;
}
.span-index {
  width: 15px;
  // text-align: center;
  justify-content: center;
}
::v-deep .cell {
  padding: 0 !important;
  width: 100% !important;
  min-width: initial !important;
  span {
    /* display: block; */
    width: 100%;
    text-align: right;
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
.font-bj{
  font-weight: bold;
  color:#1763f7 ;
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
  .open-link-text{
    color: #fff;
  }
}
</style>
