<template>
  <iCard class="margin-top20">
    <div class="margin-bottom20 clearFloat">
      <div class="floatright">
        <iButton @click="handleRecall" :disabled="!isCanRecall">{{
          $t('MT_CHEHUI')
        }}</iButton>
        <iButton @click="handleOpen" :disabled="!isCanOpen">{{
          $t('MT_KAIFANG')
        }}</iButton>
        <!--批量创建-->
        <iButton @click="handleAddMultiple">{{
          $t('MT_PILIANGCHUANGJIAN')
        }}</iButton>
        <!--创建-->
        <iButton @click="handleAddSingle">{{ $t('MT_CHUANGJIAN') }}</iButton>
        <!--删除-->
        <iButton @click="handleDelete" :disabled="selectedRow.length === 0">{{
          $t('MT_SHANCHU')
        }}</iButton>
      </div>
    </div>
    <iTableML
      tooltip-effect="light"
      :data="tableListData"
      @selectionChange="handleChoose"
      :height="'36rem'"
    >
      <el-table-column width="20" align="center" label=""></el-table-column>
      <el-table-column
        type="selection"
        align="center"
        width="20"
        min-width="20"
      ></el-table-column>
      <el-table-column width="48" align="center" label=""></el-table-column>
      <el-table-column
        type="index"
        width="40"
        min-width="40"
        align="center"
        label="#"
      ></el-table-column>
      <el-table-column width="54" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        min-width="220"
        :label="$t('MT_HUIYIMINGCHENG')"
      >
        <template slot-scope="scope">
          <span
            :class="scope.row.state === '01' ? '' : 'open-link-text'"
            @click="goDetail(scope.row, scope.row.state)"
            >{{ scope.row.name }}</span
          >
        </template>
      </el-table-column>
      <el-table-column width="54" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        width="80"
        min-width="80"
        :label="$t('MT_HUIYILEIXING')"
      >
        <template slot-scope="scope">
          <!-- <span>{{ typeObject[scope.row.meetingTypeId] }}</span> -->
          <span>{{ scope.row.meetingTypeName }}</span>
        </template>
      </el-table-column>
      <el-table-column width="54" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        width="70"
        min-width="70"
        :label="$t('MT_HUIYIZHUANGTAI')"
      >
        <template slot-scope="scope">
          <span
            :class="[
              {
                draft: scope.row.state == '01',
                open: scope.row.state == '02',
                lock: scope.row.state == '03',
                begin: scope.row.state == '04',
                end: scope.row.state == '05',
                close: scope.row.state == '06'
              },
              'circle'
            ]"
            >{{ $t(statusObj[scope.row.state]) }}</span
          >
        </template>
      </el-table-column>
      <el-table-column width="54" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        width="150"
        min-width="150"
        :label="$t('MT_HUIYIDIDIAN')"
        prop="meetingPlace"
      ></el-table-column>
      <el-table-column width="44" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        width="220"
        min-width="220"
        :label="$t('MT_HUIYISHIJIAN')"
      >
        <template slot-scope="scope">
          <span>
            {{
              scope.row.startDate + ' ' + scope.row.startTime.substring(0, 5)
            }}
            <span v-if="scope.row.endTime">{{
              '~' + scope.row.endTime.substring(0, 5)
            }}</span>
            <span v-else>~{{ handleEndTime(scope.row) }}</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column width="44" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        width="60"
        min-width="60"
        :label="$t('MT_FUJIAN')"
      >
        <template slot-scope="scope">
          <span class="attachments-box">
            <el-popover placement="right" trigger="click">
              <div class="enclosure-popover">
                <p class="title">{{ $t('MT_FUJIAN') }}</p>
                <ul>
                  <li
                    v-for="item in scope.row.attachments"
                    :key="item.attachmentId"
                    class="open-link-text enclosure-item"
                    @click="downloadEnclosure(item, scope.row)"
                  >
                    <img :src="enclosure" alt="" srcset="" />
                    <span style="color: #1763f7">{{
                      item.attachmentName
                    }}</span>
                  </li>
                </ul>
              </div>
              <div slot="reference" class="enclosure">
                <img :src="enclosure" alt="" />
                <span class="open-link-text attachments-num">{{
                  scope.row.attachments.length
                }}</span>
              </div>
            </el-popover>
          </span>
        </template>
      </el-table-column>
      <el-table-column width="34" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        width="260"
        min-width="260"
        :label="$t('MT_CAOZUO2')"
      >
        <template slot-scope="scope">
          <!-- <div
            class="meeting-home-action-box"
            v-show="
              scope.row.meetingTypeName !== 'CSC' &&
              scope.row.meetingTypeName !== 'Pre CSC'
            "
          > -->
          <div class="operate-box">
            <div
              class="meeting-home-action-box"
              v-if="!scope.row.isCSC && !scope.row.isPreCSC"
            >
              <p
                v-if="scope.row.state == '03'"
                @click="actionObj('begin')(scope.row.id)"
              >
                <!-- <img class="begin-vedio" :src="beginVedio" alt="" srcset="" /> -->
                <span>{{ $t('MT_KAISHI') }}</span>
                <span class="line">|</span>
              </p>
              <p
                v-if="scope.row.state == '02'"
                @click="actionObj('lock')(scope.row.id)"
              >
                <!-- <img class="lock" :src="openLock" alt="" srcset="" /> -->
                <span> {{ $t('MT_SUODING') }} </span>
                <span class="line">|</span>
              </p>
              <p
                v-if="scope.row.state == '03'"
                @click="actionObj('openLock')(scope.row.id)"
              >
                <!-- <img class="open-lock" :src="openLock" alt="" srcset="" /> -->
                <span>{{ $t('MT_JIESUO') }}</span>
                <span class="line">|</span>
              </p>
              <p
                v-if="
                  scope.row.state == '01' ||
                  scope.row.state == '02' ||
                  scope.row.state == '03'
                "
                @click="actionObj('change')(scope.row.id)"
              >
                <!-- <img class="change" :src="change" alt="" srcset="" /> -->
                <span> {{ $t('MT_XIUGAI') }} </span>
                <span class="line">|</span>
                <!-- <span v-if="scope.row.state == '02' || scope.row.state == '01'">
                |</span
              > -->
              </p>
              <p
                v-if="scope.row.state == '01'"
                @click="actionObj('open')(scope.row.id)"
              >
                <!-- <img class="open-lock" :src="openLock" alt="" srcset="" /> -->
                <span> {{ $t('MT_KAIFANG') }}</span>
                <span class="line">|</span>
              </p>
              <p
                v-if="scope.row.state == '02' || scope.row.state == '03'"
                @click="actionObj('uploadA')(scope.row.id)"
              >
                <!-- <img class="upload" :src="upload" alt="" srcset="" /> -->
                <span> {{ $t('LK_SHANGCHUAN') }}Agenda</span>
                <span class="line">|</span>
                <!-- <span v-if="scope.row.state == '03'"> |</span> -->
              </p>
              <p
                v-if="
                  (scope.row.state == '02' || scope.row.state == '03') &&
                  !isGenerating
                "
                @click="actionObj('newA')(scope.row.id)"
              >
                <!-- <img class="new-agenda" :src="newAgenda" alt="" srcset="" /> -->
                <span> {{ $t('MT_SHENGCHENG') }}Agenda</span>
                <span class="line">|</span>
                <!-- <span v-if="scope.row.state == '02'">|</span> -->
              </p>
              <p
                v-if="
                  (scope.row.state == '02' || scope.row.state == '03') &&
                  isGenerating
                "
              >
                <!-- <img class="new-agenda" :src="newAgenda" alt="" srcset="" /> -->
                <span> {{ $t('MT_SHENGCHENG') }}Agenda</span>
                <span class="line">|</span>
                <!-- <span v-if="scope.row.state == '02'">|</span> -->
              </p>
              <!-- 导出议题  gp会议不需要导出议题按钮  如有影响到通用会议 请联系gp -->
              <template
                v-if="
                  scope.row.isGpCSC == true || scope.row.isMBDL == true
                    ? (showP = false)
                    : (showP = true)
                "
              >
                <p
                  v-if="scope.row.state == '02'"
                  @click="actionObj('importFile')(scope.row.id)"
                >
                  <!-- <img class="import-file" :src="importFile" alt="" srcset="" /> -->
                  <span> {{ $t('MT_DAORUYITI') }}</span>
                  <span class="line">|</span>
                </p>
              </template>
              <p
                v-if="scope.row.state == '04'"
                @click="actionObj('endVedio')(scope.row)"
              >
                <!-- <img class="end-vedio" :src="endVedio" alt="" srcset="" /> -->
                <span> {{ $t('MT_JIESHU') }}</span>
                <span class="line">|</span>
              </p>
              <p
                v-if="scope.row.state == '04'"
                @click="actionObj('doubleScreen')(scope.row)"
              >
                <!-- <img class="double-screen" :src="doubleScreen" alt="" srcset="" /> -->
                <span> {{ $t('MT_TONGPING') }}</span>
                <span class="line">|</span>
              </p>
              <p
                v-if="scope.row.state == '04'"
                @click="actionObj('screen')(scope.row)"
              >
                <!-- <img class="screen" :src="screen" alt="" srcset="" /> -->
                <span>{{ $t('MT_ZHANSHI') }}</span>
                <span class="line">|</span>
              </p>
              <p
                v-if="scope.row.state == '05'"
                @click="actionObj('closeVedio')(scope.row)"
              >
                <!-- <img class="close-vedio" :src="closeVedio" alt="" srcset="" /> -->
                <span>{{ $t('MT_GUANBI') }}</span>
                <span class="line">|</span>
              </p>
              <p
                v-if="scope.row.state == '05'"
                @click="actionObj('newFile')(scope.row)"
              >
                <!-- <img class="new-file" :src="newFile" alt="" srcset="" /> -->
                <!-- 生成会议纪要 按钮-->
                <span>{{ $t('MT_SHENGCHENGHUIYIJIYAO') }}</span>
                <span class="line">|</span>
              </p>
              <p
                v-if="scope.row.state == '05' || scope.row.state == '06'"
                @click="actionObj('uploadFile')(scope.row.id)"
              >
                <!-- <img class="upload-file" :src="uploadFile" alt="" srcset="" /> -->
                <span>{{ $t('MT_SHANGCHUANHUIYIJIYAO') }}</span>
                <span class="line">|</span>
              </p>
            </div>
            <!-- <div
            class="meeting-home-action-box"
            v-show="scope.row.meetingTypeName === 'Pre CSC'"
          > -->
            <div class="meeting-home-action-box" v-if="scope.row.isPreCSC">
              <p
                v-if="scope.row.state == '03'"
                @click="actionObj('begin')(scope.row.id)"
              >
                <!-- <img class="begin-vedio" :src="beginVedio" alt="" srcset="" /> -->
                <span>{{ $t('MT_KAISHI') }}</span>
                <span class="line">|</span>
              </p>
              <p
                v-if="scope.row.state == '02'"
                @click="actionObj('lock')(scope.row.id)"
              >
                <!-- <img class="lock" :src="openLock" alt="" srcset="" /> -->
                <span>{{ $t('MT_SUODING') }}</span>
                <span class="line">|</span>
              </p>
              <p
                v-if="scope.row.state == '03'"
                @click="actionObj('openLock')(scope.row.id)"
              >
                <!-- <img class="open-lock" :src="openLock" alt="" srcset="" /> -->
                <span>{{ $t('MT_JIESUO') }}</span>
                <span class="line">|</span>
              </p>
              <p
                v-if="
                  scope.row.state == '01' ||
                  scope.row.state == '02' ||
                  scope.row.state == '03'
                "
                @click="actionObj('change')(scope.row.id)"
              >
                <!-- <img class="change" :src="change" alt="" srcset="" /> -->
                <span>{{ $t('MT_XIUGAI') }}</span>
                <span class="line">|</span>
                <!-- <span v-if="scope.row.state == '02' || scope.row.state == '01'">
                |</span
              > -->
              </p>
              <p
                v-if="scope.row.state == '01'"
                @click="actionObj('open')(scope.row.id)"
              >
                <!-- <img class="open-lock" :src="openLock" alt="" srcset="" /> -->
                <span>{{ $t('MT_KAIFANG') }}</span>
                <span class="line">|</span>
              </p>
              <p
                v-if="
                  (scope.row.state == '02' || scope.row.state == '03') &&
                  !isGenerating
                "
                @click="actionObj('newA')(scope.row.id)"
              >
                <!-- <img class="new-agenda" :src="newAgenda" alt="" srcset="" /> -->
                <span> {{ language('生成Agenda') }}</span>
                <span class="line">|</span>
                <!-- <span v-if="scope.row.state == '02'">|</span> -->
              </p>
              <p
                v-if="
                  (scope.row.state == '02' || scope.row.state == '03') &&
                  isGenerating
                "
              >
                <!-- <img class="new-agenda" :src="newAgenda" alt="" srcset="" /> -->
                <span> {{ language('生成Agenda') }}</span>
                <span class="line">|</span>
                <!-- <span v-if="scope.row.state == '02'">|</span> -->
              </p>
              <p
                v-if="scope.row.state == '04'"
                @click="actionObj('endVedio')(scope.row)"
              >
                <!-- <img class="end-vedio" :src="endVedio" alt="" srcset="" /> -->
                <span> {{ $t('MT_JIESHU') }}</span>
                <span class="line">|</span>
              </p>
              <p
                v-if="scope.row.state == '04'"
                @click="actionObj('doubleScreen')(scope.row)"
              >
                <!-- <img class="double-screen" :src="doubleScreen" alt="" srcset="" /> -->
                <span>{{ $t('MT_TONGPING') }}</span>
                <span class="line">|</span>
              </p>
              <p
                v-if="scope.row.state == '04'"
                @click="actionObj('screen')(scope.row)"
              >
                <!-- <img class="screen" :src="screen" alt="" srcset="" /> -->
                <span>{{ $t('MT_ZHANSHI') }}</span>
                <span class="line">|</span>
              </p>
              <p
                v-if="scope.row.state == '05'"
                @click="actionObj('closeVedio')(scope.row)"
              >
                <!-- <img class="close-vedio" :src="closeVedio" alt="" srcset="" /> -->
                <span>{{ $t('MT_GUANBI') }}</span>
                <span class="line">|</span>
              </p>
              <p
                v-if="scope.row.state == '05' || scope.row.state == '06'"
                @click="actionObj('newFile')(scope.row)"
              >
                <!-- <img class="new-file" :src="newFile" alt="" srcset="" /> -->
                <span>{{ $t('MT_SHENGCHENGHUIYIJIYAO') }}</span>
                <span class="line">|</span>
              </p>
              <p
                v-if="scope.row.state == '05' || scope.row.state == '06'"
                @click="actionObj('uploadFile')(scope.row.id)"
              >
                <!-- <img class="upload-file" :src="uploadFile" alt="" srcset="" /> -->
                <span>{{ $t('MT_SHANGCHUANHUIYIJIYAO') }}</span>
                <span class="line">|</span>
              </p>
            </div>
            <!-- <div
            class="meeting-home-action-box"
            v-show="scope.row.meetingTypeName === 'CSC'"
          > -->
            <div class="meeting-home-action-box" v-if="scope.row.isCSC">
              <p
                v-if="scope.row.state == '02'"
                @click="actionObj('begin')(scope.row.id)"
              >
                <!-- <img class="begin-vedio" :src="beginVedio" alt="" srcset="" /> -->
                <span>{{ $t('MT_KAISHI') }}</span>
                <span class="line">|</span>
              </p>
              <p
                v-if="scope.row.state == '03'"
                @click="actionObj('openLock')(scope.row.id)"
              >
                <!-- <img class="open-lock" :src="openLock" alt="" srcset="" /> -->
                <span>{{ $t('MT_JIESUO') }}</span>
                <span class="line">|</span>
              </p>
              <p
                v-if="scope.row.state == '01' || scope.row.state == '02'"
                @click="actionObj('change')(scope.row.id)"
              >
                <!-- <img class="change" :src="change" alt="" srcset="" /> -->
                <span>{{ $t('MT_XIUGAI') }}</span>
                <span class="line">|</span>
                <!-- <span v-if="scope.row.state == '02' || scope.row.state == '01'">
                |</span
              > -->
              </p>
              <p
                v-if="scope.row.state == '01'"
                @click="actionObj('open')(scope.row.id)"
              >
                <!-- <img class="open-lock" :src="openLock" alt="" srcset="" /> -->
                <span>{{ $t('MT_KAIFANG') }}</span>
                <span class="line">|</span>
              </p>
              <p
                v-if="scope.row.state == '02' && !isGenerating"
                @click="actionObj('newA')(scope.row.id)"
              >
                <!-- <img class="new-agenda" :src="newAgenda" alt="" srcset="" /> -->
                <span>{{ language('生成Agenda') }}</span>
                <span class="line">|</span>
                <!-- <span v-if="scope.row.state == '02'">|</span> -->
              </p>
              <p v-if="scope.row.state == '02' && isGenerating">
                <!-- <img class="new-agenda" :src="newAgenda" alt="" srcset="" /> -->
                <span>{{ language('生成Agenda') }}</span>
                <span class="line">|</span>
                <!-- <span v-if="scope.row.state == '02'">|</span> -->
              </p>
              <p
                v-if="scope.row.state == '04'"
                @click="actionObj('endVedio')(scope.row)"
              >
                <!-- <img class="end-vedio" :src="endVedio" alt="" srcset="" /> -->
                <span>{{ $t('MT_JIESHU') }}</span>
                <span class="line">|</span>
              </p>
              <p
                v-if="scope.row.state == '04'"
                @click="actionObj('doubleScreen')(scope.row)"
              >
                <!-- <img class="double-screen" :src="doubleScreen" alt="" srcset="" /> -->
                <span>{{ $t('MT_TONGPING') }}</span>
                <span class="line">|</span>
              </p>
              <p
                v-if="scope.row.state == '04'"
                @click="actionObj('screen')(scope.row)"
              >
                <!-- <img class="screen" :src="screen" alt="" srcset="" /> -->
                <span> {{ $t('MT_ZHANSHI') }}</span>
                <span class="line">|</span>
              </p>
              <p
                v-if="scope.row.state == '05'"
                @click="actionObj('closeVedio')(scope.row)"
              >
                <!-- <img class="close-vedio" :src="closeVedio" alt="" srcset="" /> -->
                <span> {{ $t('MT_GUANBI') }}</span>
                <span class="line">|</span>
              </p>
              <p
                v-if="scope.row.state == '05' || scope.row.state == '06'"
                @click="actionObj('newFile')(scope.row)"
              >
                <!-- <img class="new-file" :src="newFile" alt="" srcset="" /> -->
                <span> {{ $t('MT_SHENGCHENGHUIYIJIYAO') }}</span>
                <span class="line">|</span>
              </p>
              <p
                v-if="scope.row.state == '05' || scope.row.state == '06'"
                @click="actionObj('uploadFile')(scope.row.id)"
              >
                <!-- <img class="upload-file" :src="uploadFile" alt="" srcset="" /> -->
                <span>{{ $t('MT_SHANGCHUANHUIYIJIYAO') }}</span>
                <span class="line">|</span>
              </p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="34" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        :label="$t('MT_ZHOUCI_')"
        width="80"
        min-width="80"
        prop="weekOfYear"
      >
        <template slot-scope="scope">
          <span>CW{{ scope.row.weekOfYear }}/{{ handleWeeks() }}</span>
        </template>
      </el-table-column>
      <el-table-column width="20" align="center" label=""></el-table-column>
    </iTableML>
    <iPagination
      v-update
      @current-change="handleCurrentChange($event)"
      @size-change="handleSizeChange($event)"
      background
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :prev-text="$t('MT_SHANGYIYE')"
      :next-text="$t('MT_XIAYIYE')"
      :layout="page.layout"
      :current-page="page.currPage"
      :total="page.total"
    />
    <addMeetingSingleDialog
      v-if="openAddSingle"
      :openAddSingle="openAddSingle"
      :attendeeList="attendeeList"
      :receiverList="receiverList"
      :meetingTypeList="meetingTypeList"
      @handleSubmit="handleAddSingleSubmit"
      @closeDialog="handleCloseAddSingle"
      @refreshTable="refreshTable"
    />
    <addMeetingMultipleDialo
      v-if="openAddMultiple"
      :openAddMultiple="openAddMultiple"
      :attendeeList="attendeeList"
      :receiverList="receiverList"
      :meetingTypeList="meetingTypeList"
      @closeDialog="handleCloseAddMultiple"
      @refreshTable="refreshTable"
    />
    <updateMeetingDialog
      v-if="openUpdate"
      :openUpdate="openUpdate"
      :id="id"
      :typeObject="typeObject"
      @handleSubmit="handleUpdateSubmit"
      @closeDialog="handleCloseOpenUpdate"
      @refreshTable="refreshTable"
    />
    <!-- 关闭触发审批流 -->
    <closeMeetingDialog
      v-if="openCloseMeeting"
      :openCloseMeeting="openCloseMeeting"
      :row="editRow"
      :id="id"
      @handleOK="handleCloseOK"
      @handleClose="handleCloseCloseMeeting"
    />
    <closeMeetingDialogSpecial
      v-show="false"
      :openCloseMeeting="openCloseMeeting"
      :row="editRow"
      :id="id"
      @handleOK="handleCloseOK"
      @handleClose="handleCloseCloseMeeting"
      ref="closeDialog"
    />

    <!-- 上传Agenda -->
    <updateFile
      :title="$t('MT_SHANGCHUAN') + 'Agenda'"
      :warnText="$t('MT_QINGSHANGCHUANFUJIAN')"
      :maxSize="10"
      :fileNum="1"
      :open="openAgenda"
      v-if="openAgenda"
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,application/pdf"
      @handleCancel="handleCancelAgenda"
      @handleOK="handleOKAgenda"
    />
    <!-- 导入议题 -->
    <updateFile
      :title="$t('MT_DAORUYITI')"
      :maxSize="10"
      :fileNum="1"
      :open="openTopics"
      v-if="openTopics"
      :id="id"
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
      @handleCancel="handleCancelTopics"
      @handleOK="handleOKTopics"
      @getUplodFiles="getUplodFiles"
    >
      <div class="title-down-demo" @click="downDemo">
        <img :src="enclosure" alt="" srcset="" />
        <span>{{ $t('MT_XIAZAIMUBAN') }}</span>
      </div>
    </updateFile>
    <!-- 上传会议纪要 -->
    <updateFile
      :title="$t('MT_SHANGCHUANHUIYIJIYAO')"
      :warnText="$t('MT_QINGSHANGCHUANFUJIAN') + '!'"
      :descText="$t('MT_WENJIANDAXIAOXIANZHIORZHIZHICHIPDFWENJIAN')"
      :maxSize="10"
      :fileNum="1"
      :open="openSummary"
      v-if="openSummary"
      @handleCancel="handleCancelSummary"
      @handleOK="handleOKSummary"
    />
    <importErrorDialog
      v-if="openError"
      :openError="openError"
      :errorList="errorList"
      @handleCloseError="handleCloseError"
    />
    <!-- 生成会议纪要 -->
    <newSummaryDialog
      v-if="openNewSummary"
      :open="openNewSummary"
      :id="id"
      @handleOK="handleNewSummaryOK"
      @handleCancel="handleNewSummaryCancel"
      @refreshTable="refreshTable"
      :rowE="rowE"
    />
    <newSummaryDialogNew
      v-if="openNewSummaryNew"
      :open="openNewSummaryNew"
      :id="id"
      :receiverId="receiverId"
      @handleCancel="handleNewSummaryNewCancel"
      @handleOK="handleNewSummaryNewOK"
      @refreshTable="flushTable"
    ></newSummaryDialogNew>
    <freezeWarn
      :warnTableData="warnTableData"
      @closeDialog="closeFreeWarnDialog"
      :openFreezeDialog="openFreezeDialog"
      @stillYesCloseDialog="stillYesCloseDialog"
    ></freezeWarn>
    <!-- <iButton @click="handleTestSendEmail">发送测试邮件</iButton> -->
  </iCard>
</template>

<script>
import { iCard, iButton, iPagination, iMessage } from 'rise'
import iTableML from '@/components/iTableML'
import updateFile from '@/components/updateFile'
// import importThemens from "./importThemens.vue";
import { statusObj } from './data'
import {
  batchChangeState,
  batchRecallMeeting,
  deleteMeeting,
  changeStateMeeting,
  generateAgenda,
  uploadAttachment,
  importThemen
} from '@/api/meeting/home'
import resultMessageMixin from '@/mixins/resultMessageMixin'
import { download } from '@/utils/downloadUtil'
import { downloadStaticFile } from '@/utils/downloadStaticFileUtil'
import enclosure from '@/assets/images/enclosure.svg'
import beginVedio from '@/assets/images/meeting-home/beginVedio.svg'
import closeVedio from '@/assets/images/meeting-home/close-vedio.svg'
import change from '@/assets/images/meeting-home/change.svg'
import doubleScreen from '@/assets/images/meeting-home/doubleScreen.svg'
import endVedio from '@/assets/images/meeting-home/endVedio.svg'
import importFile from '@/assets/images/meeting-home/import.svg'
import newAgenda from '@/assets/images/meeting-home/newAgenda.svg'
import newFile from '@/assets/images/meeting-home/newFile.svg'
import openLock from '@/assets/images/meeting-home/openLock.svg'
import lock from '@/assets/images/meeting-home/lock.svg'
import screen from '@/assets/images/meeting-home/screen.svg'
import uploadFile from '@/assets/images/meeting-home/uploadFile.svg'
import upload from '@/assets/images/meeting-home/upload.svg'
import addMeetingSingleDialog from './addMeetingSingleDialog.vue'
import addMeetingMultipleDialo from './addMeetingMultipleDialo.vue'
import closeMeetingDialogSpecial from './closeMeetingDialogSpecial.vue'
import closeMeetingDialog from './closeMeetingDialog.vue'
import updateMeetingDialog from './updateMeetingDialog.vue'
import importErrorDialog from './importErrorDialog.vue'
// import newSummaryDialog from "./newSummaryDialog.vue";
import newSummaryDialog from './newSummaryDialog.vue'
// import { MOCK_FILE_URL } from '@/constants'
// import { debounce } from '@/utils/utils.js'
import newSummaryDialogNew from './newSummaryDialogNew.vue'
import freezeWarn from '@/views/meeting/specialDetails/component/freezeWarn.vue'
import dayjs from 'dayjs'
import { findThemenById } from '@/api/meeting/details'
import {
  exportMeetingAgenda,
  exportCscMeetingAgenda
} from '@/api/meeting/gpMeeting'
import { exportExcel } from '@/utils/gpfiledowLoad'
import { downloadAll } from '@/utils/downloadAll'
export default {
  components: {
    iCard,
    iButton,
    iTableML,
    iPagination,
    updateFile,
    // importThemens,
    addMeetingSingleDialog,
    addMeetingMultipleDialo,
    closeMeetingDialog,
    updateMeetingDialog,
    newSummaryDialog,
    newSummaryDialogNew,
    closeMeetingDialogSpecial,
    importErrorDialog,
    freezeWarn
  },
  mixins: [resultMessageMixin],
  props: {
     form: {
      type: Object,
      default: () => {
        return {}
      }
    },
    tableListData: {
      type: Array,
      default: () => {
        return []
      }
    },
    meetingTypeList: {
      type: Array,
      default: () => {
        return []
      }
    },
    attendeeList: {
      type: Array,
      default: () => {
        return []
      }
    },
    receiverList: {
      type: Array,
      default: () => {
        return []
      }
    },
    typeObject: {
      type: Object,
      default: () => {
        return {}
      }
    },
    page: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      rowE:[],//gp需要的参数
      showP: false,
      currentCloseRow: {},
      openFreezeDialog: false,
      warnTableData: [],
      riseIcon: process.env.VUE_APP_EMAIL_ICON,
      isGenerating: false,
      isCanRecall: false,
      isCanOpen: false,
      nameList: [],
      beginVedio,
      closeVedio,
      change,
      doubleScreen,
      endVedio,
      importFile,
      newAgenda,
      newFile,
      openLock,
      lock,
      screen,
      uploadFile,
      upload,
      statusObj,
      enclosure,
      selectTableData: [],
      tableLoading: false,
      assignDialog: false,
      returnDialog: false,
      transferDialog: false,
      qualitativeScoringDialog: false,
      reScoringDialog: false,
      viewDialog: false,
      assignQualitativeScoreList: [],
      transferQualitativeScoreList: [],
      assignQualitativeScoreLoading: false,
      transferQualitativeScoreLoading: false,
      selectedRow: [],
      id: '',
      editRow: {},
      openAddSingle: false,
      openAddMultiple: false,
      openCloseMeeting: false,
      openUpdate: false,
      openAgenda: false,
      openTopics: false,
      openSummary: false,
      openNewSummary: false,
      openNewSummaryNew: false,
      openError: false,
      timeout: null,
      receiverId: '',
      errorList: []
    }
  },
  watch: {
    selectedRow: {
      handler(rows) {
        this.isCanRecall = false
        this.isCanOpen = false
        if (rows.length > 0) {
          this.isCanRecall = rows.every((item) => {
            return item.state === '02'
          })
        }
        if (rows.length > 0) {
          this.isCanOpen = rows.every((item) => {
            return item.state === '01'
          })
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted(){
  
  },
  methods: {
    handleWeeks() {
      const currentFistYearDay = `${dayjs().year()}-01-01`
      const isLeap = dayjs(currentFistYearDay).isLeapYear() // true
      const totalDay = isLeap ? 366 : 365
      const weekNum2 = new Date(currentFistYearDay).getDay()
      const shouldDel = weekNum2 === 1 ? 0 : 7 - weekNum2 + 1
      const weekNum = Math.ceil((totalDay - shouldDel) / 7)
      return weekNum
    },
    async queryThemensByMeetingId(id) {
      const data = {
        id
      }
      const res = await findThemenById(data)
      const themens = res.themens
      return themens
    },
    // handleTestSendEmail(row, list) {
    //   const subject = row ? row.name : '哈哈哈'
    //   const send = list ? list.join(';') : ''
    //   // let minuteSrc = 'aaa'
    //   // const attachments = row.attachments
    //   //   ? row.attachments.find((item) => {
    //   //       return item.source === '02'
    //   //     })VUE_APP_EMAIL_BASE_IP
    //   //   : []
    //   //const fileIds = attachments ? attachments.attachmentId : '1485603415003676674'
    //   const fileApi = process.env.VUE_APP_FILEAPI.substring(1)
    //   console.log('fileApi', fileApi)
    //   const minuteSrc = `http%3A%2F%2F${process.env.VUE_APP_EMAIL_BASE_IP}%2F${fileApi}%2Ffileud%2FgetFileByFileId%3FisDown%3Dtrue%26fileId%3D1485603415003676674`
    //   // process.env.VUE_APP_EMAIL_BASE_IP +
    //   // process.env.VUE_APP_FILEAPI +
    //   // '/fileud/getFileByFileId?isDown=true%26fileId=' +
    //   // '1485603415003676674'
    //   const src = process.env.VUE_APP_EMAIL_ICON
    //   console.log('src', src, process.env, minuteSrc)
    //   //let body = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head><body> <br/> Dear all, <br/> <br/> <br/> Please click to find minutes of  ${subject} in  RiSE. <br/> <a href='${minuteSrc}'>Go to check the meeting minutes.</a> <br/> <br/> Best Regards! / Mit freundlichen Grüßen! <br/> <br/> <br/> CSCMeeting <br/> <br/> <a href="mailto: CSCMeeting@csvw.com">mailto: CSCMeeting@csvw.com</a> <br/> <img src='${this.riseIcon}'/></body></html>`
    //   let body = `Dear%20all%2C%0D%0A%0D%0APlease%20find%20minutes%20of%20${subject}%20in%20RiSE%20below.%0D%0A${minuteSrc}%0D%0A%0D%0ABest%20Regards!%20%2F%20Mit%20freundlichen%20Gr%C3%BC%C3%9Fen!%0D%0A%0D%0ACSC%20Meeting`
    //   let href = `mailto:${send}?subject=${subject}&body=${body}`
    //   this.createAnchorLink(href)
    // },
    stillYesCloseDialog() {
      this.closeVedio(this.currentCloseRow, 'still')
    },
    closeFreeWarnDialog() {
      this.openFreezeDialog = false
    },
    handleAlert(data) {
      this.warnTableData = [...data]
      this.openFreezeDialog = true
    },
    handleEndTime(row) {
      // let startTime =  new Date(`${row.startDate} ${row.startTime}`).getTime()
      let startTimeDate = new Date(`${row.startDate} ${row.startTime}`)
      let endTime =
        new Date(`${row.startDate} ${row.startTime}`).getTime() +
        3600 * 8 * 1000
      let endTimeDate = new Date(endTime)
      let str = dayjs(endTime).format('HH:mm')
      let startHour = startTimeDate.getHours()
      let endHour = endTimeDate.getHours()
      if (endHour < startHour) {
        return str + ' +1'
      }
      return str
    },
    getUplodFiles(nameList) {
      this.nameList = nameList
    },
    handleAddSingle() {
      this.openAddSingle = true
    },
    handleCloseAddSingle() {
      this.openAddSingle = false
    },
    handleAddMultiple() {
      this.openAddMultiple = true
    },
    handleUpdateSubmit() {
      this.openUpdate = true
    },
    createAnchorLink(href) {
      // console.log('href', href)
      const a = document.createElement('a')
      a.href = href
      document.body.appendChild(a)
      a.click()
      a.remove()
    },
    handleSendEmail(list, row) {
      const subject = row.name
      const send = list ? list.join(';') : ''
      // let minuteSrc = 'aaa'
      const attachments = row.attachments.find((item) => {
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
      // let body = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head><body> <br/> Dear all, <br/> <br/> <br/> Please click to find minutes of  ${subject} in  RiSE. <br/> <a href='${minuteSrc}'>Go to check the meeting minutes.</a> <br/> <br/> Best Regards! / Mit freundlichen Grüßen! <br/> <br/> <br/> CSCMeeting <br/> <br/> <a href="mailto: CSCMeeting@csvw.com">mailto: CSCMeeting@csvw.com</a> <br/> <img src='${this.riseIcon}'/></body></html>`
      //let body = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head><body> <br/> Dear all, <br/> <br/> <br/> Please click to find minutes of  ${subject} in  RiSE. <br/> <a href='${minuteSrc}'>Go to check the meeting minutes.</a> <br/> <br/> Best Regards! / Mit freundlichen Grüßen! <br/> <br/> <br/> CSCMeeting <br/> <br/> <a href="mailto: CSCMeeting@csvw.com">mailto: CSCMeeting@csvw.com</a> <br/> <img src='${this.riseIcon}'/></body></html>`
      let body = `Dear%20all%2C%0D%0A%0D%0APlease%20find%20minutes%20of%20${subject}%20in%20RiSE%20below.%0D%0A${minuteSrc}%0D%0A%0D%0ABest%20Regards!%20%2F%20Mit%20freundlichen%20Gr%C3%BC%C3%9Fen!%0D%0A%0D%0ACSC%20Meeting`
      let href = `mailto:${send}?subject=${subject}&body=${body}`
      this.createAnchorLink(href)
    },
    // 确认提交审批流
    handleCloseOK(info, list, row) {
      if (info === 'close') {
        iMessage.success(this.$t('MT_GUANBICHENGGONG'))
        if (list) {
          this.handleSendEmail(list, row)
        }
      }
      this.openCloseMeeting = false
      this.refreshTable()
    },
    handleCloseAddMultiple() {
      this.openAddMultiple = false
    },
    handleCloseOpenUpdate() {
      this.openUpdate = false
    },
    // 取消确认审批流
    handleCloseCloseMeeting() {
      this.openCloseMeeting = false
    },
    // 上传Agenda保存
    handleOKAgenda(a, e) {
      let param = {
        id: this.id,
        attachment: {
          attachmentId: e[0].id,
          attachmentName: e[0].name,
          attachmentUrl: e[0].url,
          source: '01'
        }
      }
      uploadAttachment(param).then((res) => {
        if (res.id) {
          iMessage.success('MT_BAOCUNCHENGGONG')
          this.openAgenda = false
          this.refreshTable()
        }
      })
    },
    // 导入议题保存
    handleOKTopics(a, b) {
      if (this.nameList.length <= 0) {
        iMessage.warn(this.$t('MT_QINGDAORUYITIHOUBAOCUN'))
        return
      }
      let param = {
        id: this.id,
        attachment: {
          attachmentId: b[0].id,
          attachmentName: b[0].name,
          attachmentUrl: b[0].url,
          source: '05'
        }
      }
      importThemen(param)
        .then((res) => {
          if (res.length == 0) {
            iMessage.success(this.$t('MT_DAORUYITICHENGGONG'))
            this.openTopics = false
            this.refreshTable()
            this.nameList = []
          } else if (res.length != 0) {
            // this.openTopics = false
            this.openError = true
            this.errorList = res
          }
        })
        .catch(() => {
          this.nameList = []
        })
      this.refreshTable()
    },
    // 上传会议纪要确认
    handleOKSummary(a, e) {
      let param = {
        id: this.id,
        attachment: {
          attachmentId: e[0].id,
          attachmentName: e[0].name,
          attachmentUrl: e[0].url,
          source: '02'
        }
      }
      uploadAttachment(param).then((res) => {
        if (res.id) {
          iMessage.success(this.$t('MT_BAOCUNCHENGGONG'))
          this.openSummary = false
          this.refreshTable()
        }
      })
    },
    // 生成会议纪要确认
    handleNewSummaryOK() {
      this.openNewSummary = false
      this.refreshTable()
    },
    // 生成会议纪要确认---新
    handleNewSummaryNewOK() {
      this.openNewSummaryNew = false
      this.refreshTable()
    },
    handleCancelAgenda() {
      this.openAgenda = false
    },
    // 导入议题取消
    handleCancelTopics() {
      this.openTopics = false
    },
    // 上传会议纪要取消
    handleCancelSummary() {
      this.openSummary = false
    },
    // 上传议题错误提示框关闭
    handleCloseError() {
      this.openError = false
      this.handleCancelTopics()
    },
    // 生成会议纪要取消
    handleNewSummaryCancel() {
      this.openNewSummary = false
    },
    // 生成会议纪要取消----新
    handleNewSummaryNewCancel() {
      this.openNewSummaryNew = false
    },
    refreshTable() {
      this.$emit('getTableList')
    },
    handleDelete() {
      let listUnuse = []
      let draft = false
      this.selectedRow.forEach((item) => {
        listUnuse.push(item.id)
        if (item.state !== '01') {
          draft = true
        }
      })
      if (draft) {
        return this.$message.error(
          this.$t('MT_ZHINENGSHANCHUCAOGAOZHUANGTAIDEHUIYI')
        )
      }
      this.$confirm(this.$t('MT_SHIFOUSHANCHUGAIHUIYI'), this.$t('MT_TISHI'), {
        confirmButtonText: this.$t('MT_SHI'),
        cancelButtonText: this.$t('MT_FOU'),
        type: 'warning'
      }).then(() => {
        deleteMeeting({ ids: listUnuse })
          .then((res) => {
            if (res.code == 200) {
              this.$message.success(this.$t('MT_SHANCHUCHENGGONG'))
              this.$emit('getTableList')
            }
          })
          .catch(() => {
            this.$message.error(this.$t('MT_SHANCHUSHIBAI'))
          })
      })
    },
    // 批量撤回
    handleRecall() {
      let idArr = this.selectedRow.map((item) => {
        return item.id
      })
      this.$confirm(this.$t('MT_SHIFOUCHEHUIGAIHUIYI'), this.$t('MT_TISHI'), {
        confirmButtonText: this.$t('MT_SHI'),
        cancelButtonText: this.$t('MT_FOU'),
        type: 'warning'
      }).then(() => {
        batchRecallMeeting({ ids: idArr }).then((res) => {
          if (res.code == 200) {
            this.$message.success(this.$t('MT_CHEHUICHENGGONG'))
            this.$emit('getTableList')
          }
        })
      })
    },
    // 批量开放
    handleOpen() {
      this.$confirm(this.$t('MT_SHIFOUKAIFANGGAIHUIYI'), this.$t('MT_TISHI'), {
        confirmButtonText: this.$t('MT_SHI'),
        cancelButtonText: this.$t('MT_FOU'),
        type: 'warning'
      }).then(() => {
        let changeState = this.selectedRow.map((item) => {
          return { id: item.id, state: '02' }
        })
        batchChangeState(changeState).then((res) => {
          if (res.code == 200) {
            this.$message.success(this.$t('MT_HUIYIYICHENGGONGKAIFANG'))
            this.$emit('getTableList')
          }
        })
      })
    },
    handleChoose(e) {
      this.selectedRow = e
    },
    handleCurrentChange(e) {
      this.$emit('handleChangePage', e)
    },
    handleSizeChange(event) {
      this.page.currPage = 1
      this.$emit('handleSizePage', event)
    },
    setTimeRange(a, b, c) {
      return (
        <span>
          {c +
            ' ' +
            a?.substring(0, a?.length - 3) +
            '~' +
            b?.substring(0, b?.length - 3)}
        </span>
      )
    },
    // 下载附件
    // downloadEnclosure(e) {
    //   download({
    //     fileIds: e.attachmentId,
    //     // url: MOCK_FILE_URL + e.attachmentId,
    //     filename: e.attachmentName,
    //     callback: (e) => {
    //       if (!e) {
    //         iMessage.error(this.$t('MT_XIAZAISHIBAI'))
    //       }
    //     }
    //   })
    // },
    //下载附件
    downloadEnclosure(e, row) {
      const typeMap = {
        doc: 'application/msword',
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        rtf: 'application/rtf',
        xls: 'application/vnd.ms-excelapplication/x-excel',
        xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ppt: 'application/vnd.ms-powerpoint',
        pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        pps: 'application/vnd.ms-powerpoint',
        ppsx: 'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
        pdf: 'application/pdf',
        swf: 'application/x-shockwave-flash',
        dll: 'application/x-msdownload',
        exe: 'application/octet-stream',
        msi: 'application/octet-stream',
        chm: 'application/octet-stream',
        cab: 'application/octet-stream',
        ocx: 'application/octet-stream',
        rar: 'application/octet-stream',
        tar: 'application/x-tar',
        tgz: 'application/x-compressed',
        zip: 'application/x-zip-compressed',
        wav: 'audio/wav',
        wma: 'audio/x-ms-wma',
        wmv: 'video/x-ms-wmv',
        mp3: '.mp2.mpe.mpeg.mpgaudio/mpeg',
        rm: 'application/vnd.rn-realmedia',
        mid: '.midi.rmiaudio/mid',
        bmp: 'image/bmp',
        gif: 'image/gif',
        png: 'image/png',
        tif: 'image/tiff',
        tiff: 'image/tiff',
        jpe: 'image/jpeg',
        jpeg: 'image/jpeg',
        jpg: 'image/jpeg',
        txt: 'text/plain',
        xml: 'text/xml',
        html: 'text/html'
      }
      const arr = e.attachmentName ? e.attachmentName.split('.') : []
      const suffix = arr[arr.length - 1]
      const filename = row.name
        ? row.name.split('/').join(' ') + '.' + suffix
        : ' ' + '.' + suffix

      downloadAll({
        url:
          process.env.VUE_APP_FILEAPI +
          '/fileud/udDown?isDown=true&fileIds=' +
          e.attachmentId,
        filename,
        callback: null,
        type: typeMap[suffix.toLowerCase()]
      })
      // download({
      //   // url: MOCK_FILE_URL + e.attachmentId,
      //   fileIds: e.attachmentId,
      //   filename,
      //   // filename: e.attachmentName,
      //   callback: (e) => {
      //     if (!e) {
      //       iMessage.error(this.$t('MT_XIAZAISHIBAI'))
      //     }
      //   }
      // })
    },
    // 下载模版
    downDemo() {
      downloadStaticFile({
        noFileUd: true,
        url: '/meetingApi/meetingService/downloadThemenImportTemplate',
        filename: this.$t('MT_YITIMUBAN'),
        // type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel',
        // type: 'application/vnd.ms-excel',
        callback: (e) => {
          if (e) {
            iMessage.success(this.$t('MT_XIAZAIMUBANCHENGGONG'))
          } else {
            iMessage.error(this.$t('MT_XIAZAIMUBANSHIBAI'))
          }
        }
      })
      // downloadThemenImportTemplate().then((res)=>{
      //   console.log('res',res)
      // })
    },
    actionObj(e) {
      console.log(e);
      const funcMap = {
        begin: (e) => {
          // 开始
          // this.$confirm("请确认是否需要开始会议？", "提示", {
          //   confirmButtonText: "是",
          //   cancelButtonText: "否",
          //   type: "warning",
          // }).then(() => {
          let param = {
            id: e,
            state: '04'
          }
          changeStateMeeting(param).then((res) => {
            if (res.code == 200) {
              iMessage.success(this.$t('MT_KAISHIHUIYICHENGGONG'))
            }
            this.refreshTable()
          })
          // });
        },
        lock: (e) => {
          // 锁定
          // this.$confirm("请确认是否需要锁定会议？", "提示", {
          //   confirmButtonText: "是",
          //   cancelButtonText: "否",
          //   type: "warning",
          // }).then(() => {
          let param = {
            id: e,
            state: '03'
          }
          changeStateMeeting(param).then((res) => {
            if (res.code === 200) {
              iMessage.success(this.$t('MT_SUODINGHUIYICHENGGONG'))
            }
            this.refreshTable()
          })
          // .catch(() => {
          //   iMessage.error('锁定会议失败！')
          // })
          // });
        },
        openLock: (e) => {
          // 解锁
          // this.$confirm("请确认是否需要解锁会议？", "提示", {
          //   confirmButtonText: "是",
          //   cancelButtonText: "否",
          //   type: "warning",
          // }).then(() => {
          let param = {
            id: e,
            state: '02'
          }
          changeStateMeeting(param).then((res) => {
            if (res.code === 200) {
              iMessage.success(this.$t('MT_JIESUOHUIYICHENGGONG'))
            }

            this.refreshTable()
          })
          // .catch(() => {
          //   iMessage.error('解锁会议失败！')
          // })
          // });
        },
        change: (e) => {
          // 修改
          this.id = e.toString()
          this.openUpdate = true
        },
        open: (e) => {
          // 开放
          // this.$confirm("请确认是否需要开放会议？", "提示", {
          //   confirmButtonText: "是",
          //   cancelButtonText: "否",
          //   type: "warning",
          // }).then(() => {
          let param = {
            id: e,
            state: '02'
          }
          changeStateMeeting(param).then((res) => {
            if (res.code === 200) {
              iMessage.success(this.$t('MT_KAIFANGHUIYICHENGGONG'))
            }
            this.refreshTable()
          })
          // });
        },
        uploadA: (e) => {
          // 上传Agenda
          this.openAgenda = true
          this.id = e
        },
        newA: (e) => {
          // this.isGenerating = true
          // 生成Agenda
          // generateAgenda({ id: e }).then((res) => {
          //   iMessage.success("生成Agenda成功");
          //   this.refreshTable();
          // });
          // if (this.timeout) {
          //   clearTimeout(this.timeout)
          // }
          // this.timeout = setTimeout(() => {

          // }, 500)

          // generateAgenda({ id: e }).then((res) => {
          //     if (res.code === 200) {
          //       iMessage.success(this.$t('MT_SHENGCHENGAGENDACHENGGONG'))
          //     }
          //     this.isGenerating = false
          //     this.refreshTable()
          //   })
          //   .catch(() => {
          //     this.isGenerating = false
          //   })
          //gp会议  生成Agenda  exportCscMeetingAgenda  exportMeetingAgenda
          if (
            this.selectedRow[0].isGpCSC == true ||
            this.selectedRow[0].isMBDL == true
          ) {
            if (this.selectedRow[0].isMBDL == true) {
              console.log('isMBDL生成Agenda')
              exportMeetingAgenda({ id: e }).then((res) => {
                exportExcel(res)
              })
            } else {
              console.log('isGpCSC生成Agenda')
              exportCscMeetingAgenda({ id: e }).then((res) => {
                exportExcel(res)
              })
            }
          } else {
            // console.log('原来生成Agenda');
            this.isGenerating = true
            generateAgenda({ id: e })
              .then((res) => {
                if (res.code === 200) {
                  iMessage.success(this.$t('MT_SHENGCHENGAGENDACHENGGONG'))
                }
                this.isGenerating = false
                this.refreshTable()
              })
              .catch(() => {
                this.isGenerating = false
              })
          }
        },
        importFile: (e) => {
          // 导入议题
          this.openTopics = true
          this.id = e
        },
        endVedio: (e) => {
          // 结束
          // let dateCurrent = new Date().valueOf()
          // let dateEnd = new Date(e.endDate + ' ' + e.endTime).valueOf()
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
            id: e.id,
            state: '05'
          }
          changeStateMeeting(param)
            .then((res) => {
              if (res.code == 200) {
                iMessage.success(this.$t('MT_JIESHUHUIYICHENGGONG'))
              }
              this.refreshTable()
            })
            .catch(() => {
              // iMessage.error("结束会议失败！");
            })
          // });
        },
        doubleScreen: (e) => {
          // 同屏
          // if (e.meetingTypeName === 'Pre CSC' || e.meetingTypeName === 'CSC') {
          if (e.isPreCSC || e.isCSC) {
            let routeUrl = this.$router.resolve({
              path: '/meeting/meeting-same-screen',
              query: {
                id: e.id
              }
            })
            window.open(routeUrl.href, '_blank')
          } else {
            let routeUrl = this.$router.resolve({
              path: '/meeting/same-screen',
              query: {
                id: e.id
              }
            })
            window.open(routeUrl.href, '_blank')
          }
        },
        screen: (e) => {
          // 展示
          // this.$router.push({
          //   path: "/meeting/meeting-show",
          //   query: {
          //     id: e,
          //   },
          // });
          let routeUrl = this.$router.resolve({
            path:
              // e.meetingTypeName == 'Pre CSC' || e.meetingTypeName == 'CSC'
              e.isPreCSC || e.isCSC
                ? '/meeting/meetingShow' //新页面
                : '/meeting/meeting-show', //旧页面
            query: {
              id: e.id
            }
          })
          window.open(routeUrl.href, '_blank')
        },
        closeVedio: async (e, str) => {
          this.currentCloseRow = { ...e }
          if ((e.isPreCSC || e.isCSC) && str !== 'still') {
            const themens = await this.queryThemensByMeetingId(
              this.currentCloseRow.id
            )
            const warnData = themens.filter((item) => {
              return !item.isFixedFrozenRs
            })
            if (warnData.length > 0) {
              this.handleAlert(warnData)
              return
            }
          }
          // 关闭
          let attachments = e.attachments.filter((item) => {
            return item.source == '02'
          })
          // if (attachments && attachments.length > 0) {
          //   this.$confirm("请确认是否需要关闭会议？", "提示", {
          //     confirmButtonText: "是",
          //     cancelButtonText: "否",
          //     type: "warning",
          //   }).then(() => {
          //     this.openCloseMeeting = true;
          //     this.id = e.id;
          //     this.editRow.approvalProcessId = e.approvalProcessId;
          //     this.editRow.isTriggerApproval = e.isTriggerApproval.toString();
          //     // let param = {
          //     //   id: e.id,
          //     //   state: '06'
          //     // }
          //     // changeStateMeeting(param).then(() => {
          //     //   iMessage.success("关闭会议成功！");
          //     //   this.refreshTable();
          //     // }).catch(() => {
          //     //   iMessage.error("关闭会议失败！");
          //     // })
          //   });
          // } else {
          //   iMessage.error("尚未生成会议纪要，现在不能关闭会议。");
          // }
          if (attachments && attachments.length <= 0) {
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
              // this.openCloseMeeting = true
              // this.id = e.id
              // this.editRow.approvalProcessId = e.approvalProcessId
              // this.editRow.isTriggerApproval = e.isTriggerApproval.toString()
              this.actionObj('newFile')(e)
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
              if (e.isPreCSC || e.isCSC) {
                this.$refs['closeDialog'].handleSubmit(e.id, 'isSpecial', e)
              } else {
                this.openCloseMeeting = true
              }
              this.id = e.id
              this.editRow.approvalProcessId = e.approvalProcessId
              this.editRow.isTriggerApproval = e.isTriggerApproval.toString()
            })
          }
        },
        newFile: (e) => {
          // 生成会议纪要
          this.id = e.id
          // if (e.meetingTypeName === 'Pre CSC' || e.meetingTypeName === 'CSC') {
          if (e.isPreCSC || e.isCSC) {
            this.receiverId = e?.receiverId
            this.openNewSummaryNew = true 
          } else {
            this.rowE=e
            console.log(e,this.rowE);
            this.openNewSummary = true
          }
        },
        uploadFile: (e) => {
          // 上传会议纪要
          this.openSummary = true
          this.id = e
        }
      }
      return funcMap[e]
    },
    // 跳转详情页
    goDetail(e, b) {
      if (b == '01') {
        return
      }
      // if (
      //   e.meetingTypeName === 'CSC' ||
      //   e.meetingTypeName === 'Pre CSC' ||
      //   e.meetingTypeName === 'PRECSC'
      // ) {
      // --------------------------------------------//
      // 原meeting代码先注释
      // if (e.isCSC || e.isPreCSC) {
      //   this.$router.push({
      //     path: '/meeting/specialDetails',
      //     query: {
      //       id: e.id
      //       // type: e.meetingTypeName
      //     }
      //   })
      // } else {
      //   this.$router.push({
      //     path: '/meeting/details',
      //     query: {
      //       id: e.id
      //     }
      //   })
      // }
      // --------------------------------------------//
      // gpMBDL会议  /meeting/managementHall/mbdlMeeting
      //gpCSC会议   /meeting/managementHall/gpcscMeeting
      // 因为目前没有正确数据  假数据跳转 meetingNameSuffix  sprint17开发中  测试中会调整该代码
     sessionStorage.setItem('search',JSON.stringify(this.form))
     if (e.isCSC || e.isPreCSC) {
        this.$router.push({
          path: '/meeting/specialDetails',
          query: {
            id: e.id
            // type: e.meetingTypeName
          }
        })
      } else if (e.isGpCSC) {
        this.$router.push({
          path: '/meeting/managementHall/gpcscMeeting',
          query: {
            id: e.id
          }
        })
      } else if (e.isMBDL) {
        this.$router.push({
          path: '/meeting/managementHall/mbdlMeeting',
          query: {
            id: e.id
          }
        })
      } else {
        this.$router.push({
          path: '/meeting/details',
          query: {
            id: e.id
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.generating {
  color: #000;
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
::v-deep .el-form-item {
  margin-top: 0;
  margin-bottom: 0;
}

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
} */

::v-deep .attachments-box {
  display: flex;
  justify-content: center;

  .attachments-icon {
    width: 20px;
    height: 20px;
  }

  .attachments-num {
    line-height: 20px;
  }
}
::v-deep .meeting-home-action-box {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  color: #1763f7;
  .line {
    color: #000;
    display: inline-block;
    margin: 0 4px;
  }
  p {
    display: flex;
    cursor: pointer;

    img {
      margin-left: 4px;
      margin-right: 2px;
    }

    .begin-vedio {
      width: 20px;
      height: 20px;
    }
    .open-lock {
      width: 20px;
      height: 20px;
    }
    .lock {
      width: 20px;
      height: 20px;
    }
    .change {
      width: 20px;
      height: 20px;
    }
    .upload {
      width: 20px;
      height: 20px;
    }
    .new-agenda {
      width: 20px;
      height: 20px;
    }
    .import-file {
      width: 20px;
      height: 20px;
    }
    .end-vedio {
      width: 20px;
      height: 20px;
    }
    .double-screen {
      width: 20px;
      height: 20px;
    }
    .screen {
      width: 20px;
      height: 20px;
    }
    .close-vedio {
      width: 20px;
      height: 20px;
    }
    .new-file {
      width: 20px;
      height: 20px;
    }
    .upload-file {
      width: 20px;
      height: 20px;
    }
  }
  p:last-child {
    .line {
      display: none;
    }
  }
}
.enclosure {
  display: flex;
  cursor: pointer;
  img {
    margin-right: 4px;
  }
}

.enclosure-popover {
  .title {
    font-size: 14px;
    color: #000000;
    letter-spacing: 0;
    font-weight: 700;
  }

  .enclosure-item {
    margin-top: 10px;
    display: flex;
    cursor: pointer;
    img {
      margin-right: 10px;
    }
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
</style>
