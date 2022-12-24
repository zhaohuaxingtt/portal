<template>
  <iPage>
    <div>
      <div class="header">
        <div class="row">
          <div class="meeting-type">
            <div class="name">{{ $t('MT_HUIYIMINGCHENG') }}</div>
            <div class="name-content" :title="meetingInfo.name">
              {{ meetingInfo.name }}
            </div>
            <iButton
              class="button"
              @click="currentButtonList.methodName"
              disabled
              >{{ $t(currentButtonList.i18n) }}</iButton
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
              {{ $t(item.i18n) }}</iButton
            >
          </div>
        </div>
        <div class="row">
          <div class="list">
            <div class="show">
              <div class="title">{{ $t('MT_HUIYILEIXING') }}</div>
              <div class="content">
                {{ typeObject[meetingInfo.meetingTypeId] }}
              </div>
            </div>
            <div class="show">
              <div class="title">{{ $t('MT_HUIYIDIDIAN') }}</div>
              <div
                class="content content-address"
                :title="meetingInfo.meetingPlace"
              >
                {{ meetingInfo.meetingPlace }}
              </div>
            </div>
            <div class="show">
              <div class="title">{{ $t('MT_HUIYISHIJIAN') }}</div>
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
        <iButton
          @click="handleClickColumn"
          class="display-column"
          :disabled="showUpdateTopicButtonList"
          >{{ $t('MT_LIEYINCANGHUOXIANSHI') }}</iButton
        >
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
          @sortBatch="sortBatch"
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
            :isSingle="true"
            ref="hiddenColumnTable"
          >
            <!-- <el-table-column align="center" width="30"></el-table-column> -->
            <el-table-column
              type="selection"
              align="center"
              min-width="40"
            ></el-table-column>
            <!-- <el-table-column align="center" width="10"></el-table-column> -->
            <el-table-column align="center" label="#" width="23">
              <template slot-scope="scope">
                <span style="span-index">{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column align="center" width="4"></el-table-column> -->
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="Time"
              min-width="136"
              prop="time"
              sortable
            >
              <template slot-scope="scope">
                <span class="open-link-text">{{ scope.row.time }}</span>
              </template>
            </el-table-column>
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
              :width="setColumnWidth(tableData, 198)"
            >
              <template slot-scope="scope">
                <span
                  class="open-link-text look-themen-click inline"
                  @click="lookThemen(scope.row)"
                  ><span
                    :title="$t('MT_DINGDIANRSDANWEIDONGJIE')"
                    v-if="!scope.row.isFixedFrozenRs"
                  >
                    <img
                      src="@/assets/images/icon/warning.svg"
                      class="img-icon"
                    />
                  </span>
                  {{ scope.row.topic }}</span
                >
              </template>
            </el-table-column>
            <!-- <el-table-column align="center" width="15"></el-table-column> -->
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="Type"
              min-width="75"
              prop="type"
            >
              <template slot-scope="scope">
                {{
                  scope.row.isBreak
                    ? '-'
                    : scope.row.type === 'MANUAL'
                    ? $t('MT_SHOUGONGYITI')
                    : scope.row.type
                }}
              </template>
            </el-table-column>
            <!-- <el-table-column align="center" width="15"></el-table-column> -->
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="State"
              min-width="75"
            >
              <template slot-scope="scope">
                {{ $t(stateObj[scope.row.state]) }}
              </template>
            </el-table-column>
            <!-- <el-table-column align="center" width="15"></el-table-column> -->
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="Result"
              min-width="59"
            >
              <template slot-scope="scope">
                <span>{{
                  scope.row.isBreak
                    ? '-'
                    : $t(themenConclusion[scope.row.conclusionCsc])
                }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column align="center" width="15"></el-table-column> -->
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="EP"
              min-width="65"
              prop="ep"
              sortable
            >
              <template slot-scope="scope">
                <span>{{ scope.row.isBreak ? '-' : scope.row.ep }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column align="center" width="16"></el-table-column> -->
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="Sourcing"
              min-width="115"
              prop="supporter"
              sortable
            >
              <template slot-scope="scope">
                <span>{{ scope.row.isBreak ? '-' : scope.row.supporter }}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="Sourcing Team"
              min-width="115"
              prop="supporter"
            >
              <template slot-scope="scope">
                <span>{{
                  scope.row.isBreak ? '-' : scope.row.sourcingSectionCode
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="Linie"
              min-width="82"
              prop="presenter"
              sortable
            >
              <template slot-scope="scope">
                <span>{{ scope.row.isBreak ? '-' : scope.row.presenter }}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="Linie Team"
              min-width="82"
              prop="presenter"
            >
              <template slot-scope="scope">
                <span>{{
                  scope.row.isBreak ? '-' : scope.row.linieSectionCode
                }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column align="center" width="14"></el-table-column> -->
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="Commodity"
              min-width="90"
              prop="presenterDept"
            >
              <template slot-scope="scope">
                <span>{{
                  scope.row.isBreak ? '-' : scope.row.presenterDept
                }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column align="center" width="20"></el-table-column> -->
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="Duration"
              min-width="86"
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
            <!-- <el-table-column align="center" width="30"></el-table-column> -->
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="Sourcing No."
              min-width="119"
              prop="sourcingNo"
              label-class-name="can-hideen"
            >
              <template slot-scope="scope">
                <span>{{
                  scope.row.isBreak ? '-' : scope.row.sourcingNo
                }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column align="center" width="30"></el-table-column> -->
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="TNR"
              min-width="60"
              prop="tnr"
              label-class-name="can-hideen"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.isBreak ? '-' : scope.row.tnr }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column align="center" width="30"></el-table-column> -->
            <!-- <el-table-column
              show-overflow-tooltip
              align="center"
              label="BEN(CN)"
              width="89"
              prop="benCn"
              label-class-name="can-hideen"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.isBreak ? '-' : scope.row.benCn }}</span>
              </template>
            </el-table-column> -->
            <!-- <el-table-column align="center" width="30"></el-table-column> -->
            <!-- <el-table-column
              show-overflow-tooltip
              align="center"
              label="BEN(DE)"
              width="88"
              prop="benDe"
              label-class-name="can-hideen"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.isBreak ? '-' : scope.row.benDe }}</span>
              </template>
            </el-table-column> -->
            <!-- <el-table-column align="center" width="30"></el-table-column> -->
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="Status"
              min-width="74"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.isBreak">-</span>
                <span v-else
                  >{{ scope.row.cscCount ? scope.row.cscCount : 0 }}/{{
                    scope.row.preCount ? scope.row.preCount : 0
                  }}</span
                >
              </template>
            </el-table-column>
            <!-- <el-table-column align="center" width="30"></el-table-column> -->
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="Carline"
              min-width="62"
              prop="carline"
              label-class-name="can-hideen"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.isBreak ? '-' : scope.row.carline }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column align="center" width="26.5"></el-table-column> -->
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="Part Type"
              min-width="110"
              prop="partType"
              label-class-name="can-hideen"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.isBreak">-</span>
                <span class="open-link-text" v-else>{{
                  scope.row.partType
                }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column align="center" width="30"></el-table-column> -->
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
              <!-- <el-table-column align="center" width="30"></el-table-column> -->
              <el-table-column
                type="selection"
                align="center"
                min-width="40"
              ></el-table-column>
              <!-- <el-table-column align="center" width="10"></el-table-column> -->
              <el-table-column align="center" label="#" width="23">
                <template slot-scope="scope">
                  <span style="span-index">{{ scope.$index + 1 }}</span>
                </template>
              </el-table-column>
              <!-- <el-table-column align="center" width="4"></el-table-column> -->
              <el-table-column
                show-overflow-tooltip
                align="center"
                label="Time"
                min-width="136"
                prop="time"
              >
                <template slot-scope="scope">
                  <span class="open-link-text">{{ scope.row.time }}</span>
                </template>
              </el-table-column>
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
                :width="setColumnWidth(tableData, 198)"
              >
                <template slot-scope="scope">
                  <span
                    class="open-link-text look-themen-click inline"
                    @click="lookThemen(scope.row)"
                  >
                    <span
                      :title="$t('MT_DINGDIANRSDANWEIDONGJIE')"
                      v-if="!scope.row.isFixedFrozenRs"
                    >
                      <img
                        src="@/assets/images/icon/warning.svg"
                        class="img-icon"
                      />
                    </span>
                    {{ scope.row.topic }}</span
                  >
                </template>
              </el-table-column>
              <!-- <el-table-column align="center" width="15"></el-table-column> -->
              <el-table-column
                show-overflow-tooltip
                align="center"
                label="Type"
                min-width="75"
                prop="type"
              >
                <template slot-scope="scope">
                  {{
                    scope.row.isBreak
                      ? '-'
                      : scope.row.type === 'MANUAL'
                      ? $t('MT_SHOUGONGYITI')
                      : scope.row.type
                  }}
                </template>
              </el-table-column>
              <!-- <el-table-column align="center" width="15"></el-table-column> -->
              <el-table-column
                show-overflow-tooltip
                align="center"
                label="State"
                min-width="75"
              >
                <template slot-scope="scope">
                  {{ $t(stateObj[scope.row.state]) }}
                </template>
              </el-table-column>
              <!-- <el-table-column align="center" width="15"></el-table-column> -->
              <el-table-column
                show-overflow-tooltip
                align="center"
                label="Result"
                min-width="59"
              >
                <template slot-scope="scope">
                  <span>{{
                    scope.row.isBreak
                      ? '-'
                      : themenConclusion[scope.row.conclusionCsc]
                  }}</span>
                </template>
              </el-table-column>
              <!-- <el-table-column align="center" width="15"></el-table-column> -->
              <el-table-column
                show-overflow-tooltip
                align="center"
                label="EP"
                min-width="65"
                prop="ep"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.isBreak ? '-' : scope.row.ep }}</span>
                </template>
              </el-table-column>
              <!-- <el-table-column align="center" width="16"></el-table-column> -->
              <el-table-column
                show-overflow-tooltip
                align="center"
                label="Sourcing"
                min-width="115"
                prop="supporter"
              >
                <template slot-scope="scope">
                  <span>{{
                    scope.row.isBreak ? '-' : scope.row.supporter
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                label="Sourcing Team"
                min-width="115"
                prop="supporter"
              >
                <template slot-scope="scope">
                  <span>{{
                    scope.row.isBreak ? '-' : scope.row.sourcingSectionCode
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                label="Linie"
                min-width="82"
                prop="presenter"
              >
                <template slot-scope="scope">
                  <span>{{
                    scope.row.isBreak ? '-' : scope.row.presenter
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                label="Linie Team"
                min-width="82"
                prop="presenter"
              >
                <template slot-scope="scope">
                  <span>{{
                    scope.row.isBreak ? '-' : scope.row.linieSectionCode
                  }}</span>
                </template>
              </el-table-column>
              <!-- <el-table-column align="center" width="14"></el-table-column> -->
              <el-table-column
                show-overflow-tooltip
                align="center"
                label="Commodity"
                min-width="90"
                prop="presenterDept"
              >
                <template slot-scope="scope">
                  <span>{{
                    scope.row.isBreak ? '-' : scope.row.presenterDept
                  }}</span>
                </template>
              </el-table-column>
              <!-- <el-table-column align="center" width="20"></el-table-column> -->
              <el-table-column
                show-overflow-tooltip
                align="center"
                label="Duration"
                min-width="86"
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
              <!-- <el-table-column align="center" width="30"></el-table-column> -->
              <el-table-column
                show-overflow-tooltip
                align="center"
                label="Sourcing No."
                min-width="119"
                prop="sourcingNo"
                label-class-name="can-hideen"
              >
                <template slot-scope="scope">
                  <span>{{
                    scope.row.isBreak ? '-' : scope.row.sourcingNo
                  }}</span>
                </template>
              </el-table-column>
              <!-- <el-table-column align="center" width="30"></el-table-column> -->
              <el-table-column
                show-overflow-tooltip
                align="center"
                label="TNR"
                min-width="60"
                prop="tnr"
                label-class-name="can-hideen"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.isBreak ? '-' : scope.row.tnr }}</span>
                </template>
              </el-table-column>
              <!-- <el-table-column align="center" width="30"></el-table-column> -->
              <!-- <el-table-column
                show-overflow-tooltip
                align="center"
                label="BEN(CN)"
                width="89"
                prop="benCn"
                label-class-name="can-hideen"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.isBreak ? '-' : scope.row.benCn }}</span>
                </template>
              </el-table-column> -->
              <!-- <el-table-column align="center" width="30"></el-table-column> -->
              <!-- <el-table-column
                show-overflow-tooltip
                align="center"
                label="BEN(DE)"
                width="88"
                prop="benDe"
                label-class-name="can-hideen"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.isBreak ? '-' : scope.row.benDe }}</span>
                </template>
              </el-table-column> -->
              <!-- <el-table-column align="center" width="30"></el-table-column> -->
              <el-table-column
                show-overflow-tooltip
                align="center"
                label="Status"
                min-width="74"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.isBreak">-</span>
                  <span v-else
                    >{{ scope.row.cscCount ? scope.row.cscCount : 0 }}/{{
                      scope.row.preCount ? scope.row.preCount : 0
                    }}</span
                  >
                </template>
              </el-table-column>
              <!-- <el-table-column align="center" width="30"></el-table-column> -->
              <el-table-column
                show-overflow-tooltip
                align="center"
                label="Carline"
                min-width="62"
                prop="carline"
                label-class-name="can-hideen"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.isBreak ? '-' : scope.row.carline }}</span>
                </template>
              </el-table-column>
              <!-- <el-table-column align="center" width="26.5"></el-table-column> -->
              <el-table-column
                show-overflow-tooltip
                align="center"
                label="Part Type"
                min-width="110"
                prop="partType"
                label-class-name="can-hideen"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.isBreak">-</span>
                  <span class="open-link-text" v-else>{{
                    scope.row.partType
                  }}</span>
                </template>
              </el-table-column>
              <!-- <el-table-column align="center" width="30"></el-table-column> -->
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
    <importErrorDialog
      v-if="openError"
      :openError="openError"
      :errorList="errorList"
      @handleCloseError="handleCloseError"
    />
    <sortDialog
      v-if="openSortDialog"
      @closeDialog="handleCloseSortDialog"
      :openSortDialog="openSortDialog"
      :meetingInfo="meetingInfo"
    ></sortDialog>
    <freezeWarn
      :warnTableData="warnTableData"
      @closeDialog="closeFreeWarnDialog"
      :openFreezeDialog="openFreezeDialog"
      @stillYesCloseDialog="stillYesCloseDialog"
    ></freezeWarn>
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
import importErrorDialog from './component/importErrorDialog.vue'
import sortDialog from './component/sortDialog.vue'

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
import {
  batchRecallMeeting,
  changeStateMeeting,
  importThemen
} from '@/api/meeting/home'
import closeMeetiongDialog from './component/closeMeetiongDialog.vue'
// import { download } from '@/utils/downloadUtil'
import { downloadStaticFile } from '@/utils/downloadStaticFileUtil'
import enclosure from '@/assets/images/enclosure.svg'
import newSummaryDialogNew from '@/views/meeting/home/components/newSummaryDialogNew.vue'
import freezeWarn from './component/freezeWarn.vue'

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
    addTopicNew,
    importErrorDialog,
    sortDialog,
    freezeWarn
  },
  data() {
    return {
      openFreezeDialog: false,
      warnTableData: [],
      openSortDialog: false,
      riseIcon: process.env.VUE_APP_EMAIL_ICON,
      openError: false,
      errorList: [],
      autoOpenProtectConclusionObj: '',
      curState: '',
      processUrl: process.env.VUE_APP_POINT,
      processUrlPortal: process.env.VUE_APP_POINT_PORTAL,
      processUrlGpPortal:process.env.VUE_APP_POINT_GP_PORTAL,
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
  methods: {
    stillYesCloseDialog() {
      this.close('still')
    },
    closeFreeWarnDialog() {
      this.openFreezeDialog = false
    },
    handleAlert(data) {
      this.warnTableData = [...data]
      this.openFreezeDialog = true
    },
    sortBatch() {
      this.handleSortDialog()
    },
    handleCloseSortDialog(str) {
      this.openSortDialog = false
      if (str === 'reset') {
        this.$nextTick(() => {
          this.handleSortDialog()
        })
      }
      if (str === 'save') {
        this.getMeetingTypeObject()
        this.getTableData()
      }
    },
    handleSortDialog() {
      this.openSortDialog = true
    },
    createAnchorLink(href) {
      // console.log('href', href)
      const a = document.createElement('a')
      a.href = href
      document.body.appendChild(a)
      a.click()
      a.remove()
    },
    handleSendEmail(list) {
      const subject = this.meetingInfo.name
      const send = list ? list.join(';') : ''
      // let minuteSrc = 'aaa'
      const attachments = this.meetingInfo.attachments.find((item) => {
        return item.source === '02'
      })
      const fileIds = attachments ? attachments.attachmentId : ''
      const fileApi = process.env.VUE_APP_FILEAPI.substring(1)
      const minuteSrc = `http%3A%2F%2F${process.env.VUE_APP_EMAIL_BASE_IP}%2F${fileApi}%2Ffileud%2FgetFileByFileId%3FisDown%3Dtrue%26fileId%3D${fileIds}`
      // const minuteSrc =
      //   process.env.VUE_APP_EMAIL_BASE_IP +
      //   process.env.VUE_APP_FILEAPI +
      //   '/fileud/getFileByFileId?isDown=true%26fileId=' +
      //   fileIds
      // let body = `<br/> Dear all, <br/> <br/> <br/> Please click to find minutes of  ${subject} in  RiSE. <br/> <a href='${minuteSrc}'>Go to check the meeting minutes.</a> <br/> <br/> Best Regards! / Mit freundlichen Grüßen! <br/> <br/> <br/> CSCMeeting <br/> <br/> <a href="mailto: CSCMeeting@csvw.com">mailto: CSCMeeting@csvw.com</a> <br/> <img src='${this.riseIcon}'/>`
      //let body = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head><body> <br/> Dear all, <br/> <br/> <br/> Please click to find minutes of  ${subject} in  RiSE. <br/> <a href='${minuteSrc}'>Go to check the meeting minutes.</a> <br/> <br/> Best Regards! / Mit freundlichen Grüßen! <br/> <br/> <br/> CSCMeeting <br/> <br/> <a href="mailto: CSCMeeting@csvw.com">mailto: CSCMeeting@csvw.com</a> <br/> <img src='${this.riseIcon}'/></body></html>`
      let body = `Dear%20all%2C%0D%0A%0D%0APlease%20find%20minutes%20of%20${subject}%20in%20RiSE%20below.%0D%0A${minuteSrc}%0D%0A%0D%0ABest%20Regards!%20%2F%20Mit%20freundlichen%20Gr%C3%BC%C3%9Fen!%0D%0A%0D%0ACSC%20Meeting`
      let href = `mailto:${send}?subject=${subject}&body=${body}`
      this.createAnchorLink(href)
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
      downloadStaticFile({
        url: '/rise-meeting/meetingService/downloadThemenImportTemplate',
        filename: this.$t('MT_YITIMUBAN'),
        // type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel',
        callback: (e) => {
          if (e) {
            iMessage.success(this.$t('MT_XIAZAIMUBANCHENGGONG'))
          } else {
            iMessage.error(this.$t('MT_XIAZAIMUBANSHIBAI'))
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
      this.$confirm(
        this.$t('MT_SHIFOUTONGYICHEHUIGAIYITI'),
        this.$t('MT_TISHI'),
        {
          confirmButtonText: this.$t('MT_TONGYI'),
          cancelButtonText: this.$t('MT_JUJUE'),
          distinguishCancelAndClose: true,
          type: 'warning'
        }
      )
        .then(() => {
          passThemenRecall(params)
            .then((res) => {
              if (res.code === 200) {
                this.flushTable()
                // iMessage.success(res.message);
                iMessage.success(this.$t('MT_SHENPITONGGUO'))
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
                  iMessage.success(this.$t('MT_JUJUECHENGGONG'))
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
          if (themen.type === 'FS+MTZ') {
            window.open(
              `${this.processUrl}/desinatepreview/mtz?route=force&desinateId=${themen.fixedPointApplyId}&isPreview=1`,
              '_blank'
            )
          } else if (themen.type === 'MTZ') {
            window.open(
              `${this.processUrlPortal}/mtz/annualGeneralBudget/locationChange/MtzLocationPoint/overflow/decisionMaterial?meeting=1&currentStep=3&mtzAppId=${themen.fixedPointApplyId}`,
              '_blank'
            )
          }else if (themen.type === 'CSF') {
          window.open(
            `${this.processUrlGpPortal}/myCscDetails/${themen.fixedPointApplyId}?current=3`,
            '_blank'
          )
        } else if (themen.type === 'CHIP') {
          window.open(
            `${this.processUrlPortal}/mtz/annualGeneralBudget/locationChange/ChipLocationPoint/overflow/decisionMaterial?meeting=1&appId=${themen.fixedPointApplyId}`,
            '_blank'
          )
        } else {
            window.open(
              `${this.processUrl}/desinatepreview/title?route=force&desinateId=${themen.fixedPointApplyId}&isPreview=1`,
              '_blank'
            )
          }
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

    handleOKTopics(info, list) {
      if (info === 'close') {
        iMessage.success(list.message);
        this.handleSendEmail(list.data);
      }
      this.closeDialog()
      this.flushTable()
    },
    // 导入议题保存
    handleOKImportTopic(a, b) {
      if (this.nameList.length <= 0) {
        iMessage.warn(this.$t('MT_QINGDAORUYITIHOUBAOCUN'))
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
            iMessage.success(this.$t('MT_DAORUYITICHENGGONG'))
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
          iMessage.warn(
            this.$t('MT_YIJIESHUHUOJINXINGZHONGDEYITIBUKEYIBEITIAOZHENG')
          )
        },
        onMove(evt) {
          const classStr = evt.related.getAttribute('class')
          if (classStr.includes('dragable-row')) {
            if (!_this.timer) {
              _this.timer = true
              iMessage.warn(
                this.$t(
                  'MT_BUKEYIBAYITITUOZHUAIDAOYIJIESHUHUOZHEJINXINGZHONGDEYITIZHIQIAN'
                )
              )
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
    async getTableData() {
      const meetingId = this.$route.query.id
      return await this.queryMeetingInfoById(meetingId)
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
                {
                  title: '撤回',
                  methodName: 'recall',
                  disabled: true,
                  i18n: 'MT_CHEHUI'
                },
                { title: '锁定', methodName: 'lock', i18n: 'MT_SUODING' },
                { title: '开始', methodName: 'start', i18n: 'MT_KAISHI' },
                { title: '修改', methodName: 'edit', i18n: 'MT_XIUGAI' },
                { title: '返回', methodName: 'back', i18n: 'MT_FANHUI' }
              ],
              '锁定'
            )
          }
          if (isPreCSC) {
            this.currentButtonList.rightButtonList = this.fillterStr(
              [
                {
                  title: '撤回',
                  methodName: 'recall',
                  disabled: true,
                  i18n: 'MT_CHEHUI'
                },
                { title: '锁定', methodName: 'lock', i18n: 'MT_SUODING' },
                { title: '开始', methodName: 'start', i18n: 'MT_KAISHI' },
                { title: '修改', methodName: 'edit', i18n: 'MT_XIUGAI' },
                { title: '返回', methodName: 'back', i18n: 'MT_FANHUI' }
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
    async queryMeetingInfoById(id) {
      const data = {
        id
      }
      const _this = this
      const res = await findThemenById(data)
      this.meetingType = res.state
      _this.meetingInfo = res
      // console.log(res);
      _this.goState(res.state, res.isCSC, res.isPreCSC)
      _this.resThemeData = [...res.themens]
      _this.handlePage(res.themens)
      _this.generateTime()
      return res
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
            iMessage.success(this.$t('MT_BAOCUNCHENGGONG'))
          } else {
            iMessage.error(this.$t('MT_BAOCUNSHIBAI'))
          }
          this.changedArr = ''
          this.flushTable()
        })
        .catch((err) => {
          this.changedArr = ''
          console.log('err', err)
        })
    },
    close(str) {
      if (str !== 'still') {
        const warnData = this.resThemeData.filter((item) => {
          return !item.isFixedFrozenRs
        })
        if (warnData.length > 0) {
          this.handleAlert(warnData)
          return
        }
      }
      if (this.meetingInfo.attachments.length <= 0) {
        this.$confirm(
          this.$t(
            'MT_SHANGWEISHENGCHENGHUIYIJIYAO_QIANWANGSHENGCHENGHUIYIJIYAO'
          ),
          this.$t('MT_TISHI'),
          {
            confirmButtonText: this.$t('MT_QIANWANG'),
            cancelButtonText: this.$t('MT_QUXIAO'),
            type: 'warning'
          }
        ).then(() => {
          //在这里判断是不是已经生成会议纪要了
          // this.openDialog('openCloseMeetiongDialog')
          this.generateMeetingMinutes()
        })
      } else {
        this.$confirm(
          this.$t('MT_QINGQUERENSHIFOUXUYAOGUANBIHUIYI'),
          this.$t('MT_TISHI'),
          {
            confirmButtonText: this.$t('MT_SHI'),
            cancelButtonText: this.$t('MT_FOU'),
            type: 'warning'
          }
        ).then(() => {
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
        iMessage.warn(this.$t('MT_YIYOUJINXINGZHONGDEYITI'))
        return
      }
      if (
        this.selectedTableData &&
        this.selectedTableData.length >= 1 &&
        this.haveThemenNotStart().itemNo !== this.selectedTableData[0].itemNo
      ) {
        iMessage.warn(this.$t('MT_QINGANYITISHUNXUKAISHIYITI'))
        return
      }
      if (this.isThemenOverAll()) {
        iMessage.warn(this.$t('MT_GAIYITILIEBIAOYIQUANBUJIESHU'))
        return
      }
      const param = {
        meetingId: this.meetingInfo.id,
        themenId: this.haveThemenNotStart().id
      }
      startThemen(param)
        .then(() => {
          iMessage.success(this.$t('MT_KAISHIYITICHENGGONG'))
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
        iMessage.warn(this.$t('MT_GAIYITIWEIJINXINGZHONG_BUNENGJIESHUCAOZUO'))
        return
      }
      const bol = this.isOverTime(choiceThemen)
      if (bol) {
        endThemen(param)
          .then((info) => {
            if (info.code === 200) {
              iMessage.success(this.$t('MT_JIESHUYITICHENGGONG'))
              this.flushTable().then((res) => {
                if (!choiceThemen.isBreak) {
                  let obj = res.themens.find((item) => {
                    return item.id === choiceThemen.id
                  })
                  this.autoOpenProtectConclusionObj = obj
                  this.openDialog('openProtectConclusion')
                }
              })
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
            iMessage.success(this.$t('MT_JIESHUYITICHENGGONG'))
            // this.refreshTable();
            this.flushTable()
          })
          .catch(() => {
            // iMessage.error("结束会议失败！");
          })
      }
    },
    split() {
      this.$confirm(this.$t('MT_QUERENCHAIFENGAIYITIME'), this.$t('MT_TISHI'), {
        confirmButtonText: this.$t('MT_QUEREN'),
        cancelButtonText: this.$t('MT_QUXIAO'),
        type: 'warning'
      }).then(() => {
        const data = {
          meetingId: this.meetingInfo.id,
          themenId: this.selectedTableData[0].id
        }
        spiltThemen(data)
          .then(() => {
            iMessage.success(this.$t('MT_CHAIFENCHENGGONG'))
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
            iMessage.success(this.$t('MT_KAISHIYITICHENGGONG'))
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
      this.$confirm(this.$t('MT_SHIFOUCHEHUIGAIHUIYI'), this.$t('MT_TISHI'), {
        confirmButtonText: this.$t('MT_SHI'),
        cancelButtonText: this.$t('MT_FOU'),
        type: 'warning'
      }).then(() => {
        batchRecallMeeting({ ids }).then((res) => {
          if (res.code == 200) {
            this.$message.success(this.$t('MT_CHEHUICHENGGONG'))
            this.$router.go(-1)
          }
        })
      })
    },
    updateDate() {
      // alert("updateDate");
      if (this.selectedTableData[0] && this.selectedTableData[0].isBreak) {
        iMessage.warn(this.$t('MT_XIUXIYITIBUNENGJINXINGHAIQI'))
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
      this.$confirm(this.$t('MT_QUERENSHANCHUGAIYITIMA'), this.$t('MT_TISHI'), {
        confirmButtonText: this.$t('MT_QUEREN'),
        cancelButtonText: this.$t('MT_QUXIAO'),
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
            iMessage.success(this.$t('MT_SHANCHUCHENGGONG'))
            this.flushTable()
          })
          .catch(() => {
            iMessage.error(this.$t('MT_SHANCHUSHIBAI'))
          })
      })
    },
    protectInfo() {
      if (
        this.selectedTableData[0]
          ? this.selectedTableData[0].state === '02'
          : ''
      ) {
        iMessage.warn(
          this.$t('MT_JINXINGZHONGDEYITIBUNENGJINXINGHUIYIZILIAOWEIHU')
        )
        return
      }
      if (
        this.selectedTableData[0]
          ? this.selectedTableData[0].state === '03'
          : ''
      ) {
        iMessage.warn(
          this.$t('MT_YIWANCHENGDEYITIBUNENGJINXINGHUIYIZILIAOWEIHU')
        )
        return
      }
      if (this.selectedTableData[0] ? this.selectedTableData[0].isBreak : '') {
        iMessage.warn(this.$t('MT_XIUXIYITIBUKEWEIHUZILIAO'))
        return
      }
      this.openDialog('openProtectInfoDialog')
    },
    editTopic() {
      if (this.selectedTableData[0].state === '03') {
        iMessage.warn(this.$t('MT_YIJIESHUDEDYITIBUNENGJINXINGXIUGAIYITI'))
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
          iMessage.success(this.$t('MT_KAIFANGHUIYICHENGGONG'))
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
            iMessage.success(this.$t('MT_JIESHUHUIYICHENGGONG'))
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
      this.$confirm(
        this.$t('MT_QINGQUERENSHIFOUXUYAOSUODINGHUIYI'),
        this.$t('MT_TISHI'),
        {
          confirmButtonText: this.$t('MT_SHI'),
          cancelButtonText: this.$t('MT_FOU'),
          type: 'warning'
        }
      ).then(() => {
        let param = {
          id: this.meetingInfo.id,
          state: '03'
        }
        changeStateMeeting(param)
          .then(() => {
            iMessage.success(this.$t('MT_SUODINGHUIYICHENGGONG'))
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
          iMessage.success(this.$t('MT_JIESUOHUIYICHENGGONG'))
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
    async flushTable() {
      this.page.currPage = 1
      return await this.getTableData()
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
      this.goState(
        this.meetingInfo.state,
        this.meetingInfo.isCSC,
        this.meetingInfo.isPreCSC
      )
      val = [val[val.length - 1]]
      // if (this.curState === '05') {
      //   val = [val[val.length - 1]]
      //   this.currentRow = val[0]

      //   this.isSingle = true
      // } else {
      //   this.isSingle = false
      // }
      if (!val[0]) {
        return
      }
      this.currentRow = val[0]
      this.selectedTableData = val
      let handleDisabledButtonName = this.handleDisabledButtonName
      if (val.length === 1) {
        if (this.haveThemenIsStarting()) {
          this.handleButtonDisabled(['overTopic'], false)
        }
        if (val[0].state === '03') {
          this.handleButtonDisabled(['overTopic'], true)
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
              // this.handleButtonDisabled(
              //   ['bePending', 'nextPreCSC', 'closeResult', 'translateCSC'],
              //   false
              // )
              this.handleButtonDisabled(
                [
                  'bePending',
                  'fixedPoint',
                  'nextPreCSC',
                  'senLol',
                  'translateTer',
                  'closeResult'
                  // 'translateCSC'
                  // "lookResult",
                ],
                false
              )
            }
            if (
              // this.meetingInfo.meetingTypeName === 'Pre CSC' &&
              this.meetingInfo.isPreCSC &&
              // !this.meetingInfo.isPreCSC &&
              val[0].type === 'MANUAL'
            ) {
              // this.handleButtonDisabled(
              //   ['bePending', 'nextPreCSC', 'closeResult', 'translateCSC'],
              //   false
              // )
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
            if (val[0].type === 'MTZ') {
              this.handleButtonDisabled(['freezeRsBill'], true)
            }
          }
        } else if (val[0].state === '02') {
          this.handleButtonDisabled(handleDisabledButtonName, true)
          this.handleStartTopicButtonDisabled(['startTopic'], true)
          this.handleButtonDisabled(['protectResult'], true)
          this.handleButtonDisabled(['overTopic'], false)
        } else {
          this.handleButtonDisabled(['overTopic'], true)
          // console.log("")
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
    },
    //表格列字符限制
    setColumnWidth(data, min) {
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
      if (columnWidth < min) {
        // 设置最小宽度
        columnWidth = min
      }
      if (columnWidth > 306) {
        columnWidth = 306
      }
      return columnWidth + 'px'
    }
  }
}
</script>
<style lang="scss" scoped>
.img-icon {
  width: 12px;
  height: 12px;
  img {
    transform: translateY(0.5px);
  }
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
  text-align: center;
  justify-content: center;
}
::v-deep .cell {
  padding: 0 !important;
  width: 100% !important;
  min-width: initial !important;
  span {
    /* display: block; */
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
