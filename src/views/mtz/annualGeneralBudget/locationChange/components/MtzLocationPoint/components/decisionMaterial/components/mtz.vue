<!--
 * @Author: youyuan
 * @Date: 2021-10-28 16:45:22
 * @LastEditTime: 2023-02-23 11:35:25
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: mtz
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationPoint\components\decisionMaterial\components\mtz.vue
-->
<template>
  <div style="padding-bottom: 30px; position: relative">
    <div class="download_btn">
      <iButton v-if="!RsObject" @click="downPdf">{{
        language('DAOCHUPDF', '导出PDF')
      }}</iButton>
    </div>
    <!-- RsObject?mtz决策资料:导出 -->
    <div ref="qrCodeDiv" id="qrCodeDiv" @click="rulesClick()" style="position: relative">
      <!-- 水印 class="content_dialog" -->
      <div class="" v-if="
        !RsObject &&
        (formData.appStatus == '流转完成' || formData.appStatus == '定点')
      "></div>
      <iCard class="upload_hr" ref="tabsBoxTitle" id="tabsBoxTitle">
        <!-- <iCard :class="!RsObject?'upload_hr':''"> -->
        <div slot="header" class="headBox">
          <p class="headTitle">{{ title }}</p>
          <span class="buttonBox" style="margin-top: -10px" v-if="!editMode">
            <iButton v-if="
              RsObject &&
              formData.flowTypeName == '流转' &&
              !(
                formData.appStatus == '流转完成' ||
                formData.appStatus == '定点' ||
                formData.appStatus == '未通过'
              )
            " :loading="exportLoading" @click="handleToSignPreview">{{
  language('DAOCHUHUIWAILIUZHUANDAN', '导出会外流转单')
}}</iButton>
          </span>
          <!-- <div class="tabs_box_right"> -->
          <div class="tabs_box_right">
            <template v-if="meetingType">
              <div class="big_text">
                <span class="samll_val">{{ formData.mtzAppId }}-{{ formData.appName }}</span>
              </div>
              <div class="small_text">
                <!-- <span>{{language("SHENQINGRIQI","申请日期")}}：</span> -->
                <span>Application date：</span>
                <span class="samll_val">{{ formData.createDate }}</span>
              </div>
              <div class="small_text">
                <!-- <span>{{language("KESHI","科室")}}：</span> -->
                <span>Commodity：</span>
                <span class="samll_val">{{ formData.linieDeptName }}</span>
              </div>
              <div>
                <!-- <span>{{language("CAIGOUYUAN","采购员")}}：</span> -->
                <span>Buyer：</span>
                <span class="samll_val">{{ formData.linieNameEn }}</span>
              </div>
            </template>
          </div>
        </div>
        <div ref="ruleTableTitle">
          <el-divider class="hr_divider" />
          <div v-if="RsObject" class="centerBox">
            <p>补差金额=零件结算数量 <iTooltip :txtInfo="tipList[0]" :num="'1'"></iTooltip>
              *[原材料市场价<iTooltip :txtInfo="tipList[1]" :num="'2'"></iTooltip> -原材料基价<iTooltip :txtInfo="tipList[2]"
                :num="'3'">
              </iTooltip> *(1+阈值<iTooltip :txtInfo="tipList[3]" :num="'4'"></iTooltip> )]*原材料用量
              <iTooltip :txtInfo="tipList[4]" :num="'5'"></iTooltip> *补差系数<iTooltip :txtInfo="tipList[5]" :num="'6'">
              </iTooltip>
            </p>
            <p>MTZ Payment=Settle accounts Quantity*[Effective Price-Base Price(1+threshold)]*Raw Material Weight*Ratio
            </p>
          </div>
   

          <p class="tableTitle font20_b" v-if="RsObject">
            {{ language('GUIZEQINGDAN', '规则清单') }}-Regulation
          </p>
          <p class="tableTitle font20_b" v-if="!RsObject && ruleTableListData.length > 0">
            {{ language('GUIZEQINGDAN', '规则清单') }}-Regulation
          </p>
        </div>
        <!-- highlight-current-row -->
        <div class="margin-top20 formStyle">
          <div v-if="RsObject" class="btn ">
            <span type="primary" size="mini" circle @click="isruleTitle1 = !isruleTitle1">{{ isruleTitle1 ? '-' : '+'
            }}</span>
          </div>
          <tableList :tagNum="'1'" ref="moviesTable" :tableData="ruleTableListData"
            :tableTitle="isruleTitle1 ? ruleTableTitle1_all : ruleTableTitle1_1"
            @handleClickRow="handleCurrentChangeTable" :tableLoading="loadingRule"
            :header-row-class-name="'ruleTableHeader'" :index="true" :rowClassName="'table-row'" v-if="RsObject"
            :selection="false" border>
            <template slot-scope="scope" slot="compensationPeriod">
              <span>{{
                scope.row.compensationPeriod == 'A'
                ? '年度'
                : scope.row.compensationPeriod == 'H'
                  ? '半年度'
                  : scope.row.compensationPeriod == 'Q'
                    ? '季度'
                    : scope.row.compensationPeriod == 'M'
                      ? '月度'
                      : ''
              }}</span>
            </template>
            <template slot-scope="scope" slot="thresholdCompensationLogic">
              <span>{{
                scope.row.thresholdCompensationLogic == 'A'
                ? '全额补差'
                : scope.row.thresholdCompensationLogic == 'B'
                  ? '超额补差'
                  : ''
              }}</span>
            </template>
            <template slot-scope="scope" slot="sapCode">
              <span>{{ scope.row.sapCode }}</span><br />
              <iText>{{ scope.row.supplierName }}</iText>
            </template>
            <template slot-scope="scope" slot="materialCode">
              <span class='link' @click="openPageMarket(scope.row)">{{ scope.row.materialCode }}</span><br />
              <span class='link' @click="openPageMarket(scope.row)">{{ scope.row.materialName }}</span>
            </template>
            <template slot-scope="scope" slot="formalFlag">
              <span>{{ scope.row.formalFlag == 'Y' ? '否' : '是' }}</span>
            </template>
            <template slot-scope="scope" slot="method">
              <span>{{ scope.row.method == '1' ? '一次性补差' : scope.row.method == '2' ? '变价单补差' : '' }}</span>
            </template>
            <template slot-scope="scope" slot="partBalanceCountType">
              <span>{{
                scope.row.partBalanceCountType == 'SYSTEM' ? '系统预读' : scope.row.partBalanceCountType == 'HANDWORK' ? '手工上传' : ''
              }}</span>
            </template>
            <template slot-scope="scope" slot="avgPeriod">
              <span>{{ scope.row.avgPeriod ? avgPeriodList.find(val => val.code == scope.row.avgPeriod).name : '' }}</span>
            </template>
            <template slot-scope="scope" slot="offsetMonth">
              <span>{{ scope.row.offsetMonth ? offsetList.find(val => val.code == scope.row.offsetMonth).name : '' }}</span>
            </template>

          </tableList>
          <!-- 导出规则表格 -->
          <tableList ref="moviesTable" :tableData="ruleTableListData"
            :tableTitle="isruleTitle1 ? ruleTableTitle1_all : ruleTableTitle1_1" :tableLoading="loadingRule"
            v-if="!RsObject && ruleTableListData.length > 0" :index="true" :rowClassName="'table-row'"
            :header-row-class-name="'ruleTableHeader'" :selection="false" border>
            <template slot-scope="scope" slot="sapCode">
              <span>{{ scope.row.sapCode }}</span><br />
              <span>{{ scope.row.supplierName }}</span>
            </template>
            <template slot-scope="scope" slot="compensationPeriod">
              <span>{{
                scope.row.compensationPeriod == 'A'
                ? '年度'
                : scope.row.compensationPeriod == 'H'
                  ? '半年度'
                  : scope.row.compensationPeriod == 'Q'
                    ? '季度'
                    : scope.row.compensationPeriod == 'M'
                      ? '月度'
                      : ''
              }}</span>
            </template>
            <template slot-scope="scope" slot="materialCode">
              <span class='link' @click="openPageMarket(scope.row)">{{ scope.row.materialCode }}</span><br />
              <span class='link' @click="openPageMarket(scope.row)">{{ scope.row.materialName }}</span>
            </template>
            <template slot-scope="scope" slot="formalFlag">
              <span>{{ scope.row.formalFlag == 'Y' ? '否' : '是' }}</span>
            </template>
            <template slot-scope="scope" slot="method">
              <span>{{ scope.row.method == '1' ? '一次性补差' : scope.row.method == '2' ? '变价单补差' : '' }}</span>
            </template>
            <template slot-scope="scope" slot="partBalanceCountType">
              <span>{{
                scope.row.partBalanceCountType == 'SYSTEM' ? '系统预读' : scope.row.partBalanceCountType == 'HANDWORK' ? '手工上传' : ''
              }}</span>
            </template>
            <template slot-scope="scope" slot="avgPeriod">
              <span>{{ scope.row.avgPeriod ? avgPeriodList.find(val => val.code == scope.row.avgPeriod).name : '' }}</span>
            </template>
            <template slot-scope="scope" slot="offsetMonth">
              <span>{{ scope.row.offsetMonth ? offsetList.find(val => val.code == scope.row.offsetMonth).name : '' }}</span>
            </template>

          </tableList>
          <tableList class="margin-top20 " ref="moviesTable1" :tableData="ruleTableListData"
            :tableTitle="ruleTableTitle1_2" :tableLoading="loadingRule" v-if="!RsObject && ruleTableListData.length > 0&& partTableListData.some((val)=>{if(val.platinumPrice) return true})"
            :index="true" :rowClassName="'table-row'" :header-row-class-name="'ruleTableHeader'" :selection="false"
            border>
          </tableList>
        </div>

        <div ref="partTableTitle">
          <el-divider v-if="RsObject" />
          <el-divider class="margin-top20" v-if="!RsObject && partTableListData.length > 0" />
          <p class="tableTitle font20_b" v-if="RsObject">
            {{ language('LJQD', '零件清单') }}-Part List
          </p>
          <p class="tableTitle font20_b" v-if="!RsObject && partTableListData.length > 0">
            {{ language('LJQD', '零件清单') }}-Part List
          </p>
        </div>
        <div class="margin-top20 formStyle">
          <div v-if="RsObject" class="btn ">
            <span type="primary" size="mini" circle @click="isruleTitle2 = !isruleTitle2">{{ isruleTitle2 ? '-' : '+'
            }}</span>
          </div>
          <tableList :tagNum="'1'" class=" over_flow_y_ture" ref="partTable" :tableData="partTableListData"
            :tableTitle="isruleTitle2 ? partTableTitle1_all : partTableTitle1_1" :tableLoading="loadingPart"
            v-if="RsObject" :index="true" :rowClassName="'part-table-row'" :header-row-class-name="'partTableHeader'"
            :selection="false" border>
            <template slot-scope="scope" slot="compensationPeriod">
              <span>{{
                scope.row.compensationPeriod == 'A'
                ? '年度'
                : scope.row.compensationPeriod == 'H'
                  ? '半年度'
                  : scope.row.compensationPeriod == 'Q'
                    ? '季度'
                    : scope.row.compensationPeriod == 'M'
                      ? '月度'
                      : ''
              }}</span>
            </template>
            <!-- <template slot-scope="scope"
                            slot="thresholdCompensationLogic">
                    <span>{{scope.row.thresholdCompensationLogic == "A"?"全额补差":scope.row.thresholdCompensationLogic == "B"?"超额补差":""}}</span>
                  </template> -->
            <template slot-scope="scope" slot="sapCode">
              <span>{{ scope.row.sapCode }}</span><br />
              <iText>{{ scope.row.supplierName }}</iText>
            </template>
            <template slot-scope="scope" slot="materialCode">
              <span class='link' @click="openPageMarket(scope.row)">{{ scope.row.materialCode }}</span><br />
              <span class='link' @click="openPageMarket(scope.row)">{{ scope.row.materialName }}</span>
            </template>
            <template slot-scope="scope" slot="materialDoseSource">
              <span>{{
                scope.row.materialDoseSource ? materialDoseSourceList.find(val => val.code == scope.row.materialDoseSource).name : ''
              }}</span>
            </template>
            <template slot-scope="scope" slot="method">
              <span>{{ scope.row.method == '1' ? '一次性补差' : scope.row.method == '2' ? '变价单补差' : '' }}</span>
            </template>
            <template slot-scope="scope" slot="avgPeriod">
              <span>{{ scope.row.avgPeriod ? avgPeriodList.find(val => val.code == scope.row.avgPeriod).name : '' }}</span>
            </template>
            <template slot-scope="scope" slot="offsetMonth">
              <span>{{ scope.row.offsetMonth ? offsetList.find(val => val.code == scope.row.offsetMonth).name : '' }}</span>
            </template>
          </tableList>
          <!-- 导出零件表格 -->
          <tableList border ref="partTable" :tableData="partTableListData" :tableTitle="partTableTitle1_1"
            :tableLoading="loadingPart" v-if="!RsObject && partTableListData.length > 0" :index="true"
            :rowClassName="'part-table-row'" :header-row-class-name="'partTableHeader'" :selection="false">
            <template slot-scope="scope" slot="sapCode">
              <span>{{ scope.row.sapCode }}</span><br />
              <span>{{ scope.row.supplierName }}</span>
            </template>
            <template slot-scope="scope" slot="compensationPeriod">
              <span>{{
                scope.row.compensationPeriod == 'A'
                ? '年度'
                : scope.row.compensationPeriod == 'H'
                  ? '半年度'
                  : scope.row.compensationPeriod == 'Q'
                    ? '季度'
                    : scope.row.compensationPeriod == 'M'
                      ? '月度'
                      : ''
              }}</span>
            </template>
            <template slot-scope="scope" slot="materialCode">
              <span class='link' @click="openPageMarket(scope.row)">{{ scope.row.materialCode }}</span><br />
              <span class='link' @click="openPageMarket(scope.row)">{{ scope.row.materialName }}</span>
            </template>
            <template slot-scope="scope" slot="materialDoseSource">
              <span>{{
                scope.row.materialDoseSource ? materialDoseSourceList.find(val => val.code == scope.row.materialDoseSource).name : ''
              }}</span>
            </template>
            <template slot-scope="scope" slot="method">
              <span>{{ scope.row.method == '1' ? '一次性补差' : scope.row.method == '2' ? '变价单补差' : '' }}</span>
            </template>
            <template slot-scope="scope" slot="avgPeriod">
              <span>{{ scope.row.avgPeriod ? avgPeriodList.find(val => val.code == scope.row.avgPeriod).name : '' }}</span>
            </template>
            <template slot-scope="scope" slot="offsetMonth">
              <span>{{ scope.row.offsetMonth ? offsetList.find(val => val.code == scope.row.offsetMonth).name : '' }}</span>
            </template>
          </tableList>
          <tableList border class="margin-top20 " ref="partTable" :tableData="partTableListData"
            :tableTitle="partTableTitle1_2" :tableLoading="loadingPart" v-if="!RsObject && partTableListData.length > 0"
            :index="true" :rowClassName="'part-table-row'" :header-row-class-name="'partTableHeader'" :selection="false">
            <template slot-scope="scope" slot="materialDoseSource">
              <span>{{
                scope.row.materialDoseSource ? materialDoseSourceList.find(val => val.code == scope.row.materialDoseSource).name : ''
              }}</span>
            </template>
            <template slot-scope="scope" slot="method">
              <span>{{ scope.row.method == '1' ? '一次性补差' : scope.row.method == '2' ? '变价单补差' : '' }}</span>
            </template>
            <template slot-scope="scope" slot="avgPeriod">
              <span>{{ scope.row.avgPeriod ? avgPeriodList.find(val => val.code == scope.row.avgPeriod).name : '' }}</span>
            </template>
            <template slot-scope="scope" slot="offsetMonth">
              <span>{{ scope.row.offsetMonth ? offsetList.find(val => val.code == scope.row.offsetMonth).name : '' }}</span>
            </template>
          </tableList>
          <tableList border class="margin-top20 " ref="partTable" :tableData="partTableListData" :tableTitle="partTableTitle1_3"
              :tableLoading="loadingPart" v-if="!RsObject && partTableListData.length > 0 && partTableListData.some((val)=>{if(val.platinumPrice) return true})" :index="true"
              :selection="false">
            </tableList>
        </div>

        <div class="padding-bottom30" ref="padding"></div>
      </iCard>
      <iCard class="margin-top20">
        <div slot="header" class="headBox">
          <p class="headTitle">{{ language('BEIZHU', '备注') }}-Remarks</p>
          <span class="buttonBox">
            <iButton
              v-if="
                RsObject &&
                isEditNew &&
                meetingNumber == 0
              "
              @click="handleClickSave($event)"
              v-permission="PORTAL_MTZ_POINT_JUECEDATA_BAOCUN"
              >{{ language('BAOCUN', '保存') }}</iButton
            >
          </span>
        </div>
        <iInput
          v-model="formData.linieMeetingMemo"
          :disabled="
            !(
              isEditNew &&
              RsObject &&
              meetingNumber == 0
            )
          "
          class="margin-top10"
          :rows="8"
          type="textarea"
        />
      </iCard>
      <iCard v-if="isMeeting && applayDateData.length > 0" class="margin-top20">
        <p>
          {{ language('SHENQINGRIQI', '申请日期') }}:{{
            moment(new Date()).format('YYYY-MM-DD')
          }}
        </p>
        <div :class="RsObject ? 'applayDateBox' : 'applayDateBox1'">
          <div class="applayDateContent" v-for="(item, index) in applayDateData" :key="index">
            <img class="margin-left5 applayDateIcon" :src="
              item.taskStatus === '同意'
                ? require('@/assets/images/icon/yes.png')
                : require('@/assets/images/icon/no.png')
            " :fit="fit" />
            <div class="applayDateContentItem first_one">
              <span>部门：</span>
              <span class="applayDateDeptTitle">{{ item.deptFullCode }}</span>
            </div>
            <div class="applayDateContentItem">
              <span>审批人：</span>
              <span>{{ item.nameZh }}</span>
            </div>
            <div class="applayDateContentItem">
              <span>日期：</span>
              <span>{{ item.endTime }}</span>
            </div>
          </div>
        </div>
      </iCard>
      <!-- 隐藏显示：用于获取相应元素高度 -->
      <div style="overflow: hidden; height: 0">
        <div>
          <iCard ref="remark-card" class="margin-top20 computed">
            <div slot="header" ref="remark-title" class="headBox">
              <p class="headTitle">{{ language('BEIZHU', '备注') }}-Remarks</p>
              <span class="buttonBox">
                <iButton v-if="
                  RsObject &&
                  (formData.appStatus == '草稿' ||
                    formData.appStatus == '未通过') &&
                  meetingNumber == 0
                " @click="handleClickSave($event)" v-permission="PORTAL_MTZ_POINT_JUECEDATA_BAOCUN">{{
  language('BAOCUN', '保存') }}</iButton>
              </span>
            </div>
            <div class="beizhu-value" ref="remark">
              <p class="remarkItem" v-for="(item, index) in getRemarkAll" :key="index">
                {{ item }}<br />
              </p>
            </div>
          </iCard>
          <iCard ref="applayDateData" v-if="isMeeting && applayDateData.length > 0" class="margin-top20">
            <div slot="header" class="headBox">
              <p class="headTitle">
                {{ language('SHENQINGRIQI', '申请日期') }}:{{
                  moment(new Date()).format('YYYY-MM-DD')
                }}
              </p>
            </div>
            <div :class="RsObject ? 'applayDateBox' : 'applayDateBox1'">
              <div class="applayDateContent" v-for="(item, index) in applayDateData" :key="index">
                <img class="margin-left5 applayDateIcon" :src="
                  item.taskStatus === '同意'
                    ? require('@/assets/images/icon/yes.png')
                    : require('@/assets/images/icon/no.png')
                " :fit="fit" />
                <div class="applayDateContentItem first_one">
                  <span>部门：</span>
                  <span class="applayDateDeptTitle">{{
                    item.deptFullCode
                  }}</span>
                </div>
                <div class="applayDateContentItem">
                  <span>审批人：</span>
                  <span>{{ item.nameZh }}</span>
                </div>
                <div class="applayDateContentItem">
                  <span>日期：</span>
                  <span>{{ item.endTime }}</span>
                </div>
              </div>
            </div>
          </iCard>
        </div>
        <div class="page-logo" ref="pageNum">
          <div>
            <p class="pageNum"></p>
          </div>
          <div>
            <p>{{ userName }}</p>
            <p>{{ new Date().getTime() | dateFilter('YYYY-MM-DD') }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- pdf导出页面分页 -->
    <div id="pdfPage-box" ref="pdfPage-box" class="pdfPage-box">
      <template v-for="(tableData, index) in ruleTableList">
        <div :key="index" class="page-item">
          <!-- class="content_dialog" -->
          <div v-if="
            !RsObject &&
            (formData.appStatus == '流转完成' || formData.appStatus == '定点')
          "></div>
         
          <iCard class="upload_hr"  :style="{ height: pdfItemHeight + 'px' }">
            <div slot="header" class="headBox">
              <p class="headTitle">{{ title }}</p>
              <!-- <div class="tabs_box_right"> -->
              <div class="tabs_box_right" v-if="meetingType">
                <div class="big_text">
                  <span class="samll_val">{{ formData.mtzAppId }}-{{ formData.appName }}</span>
                </div>
                <div class="small_text">
                  <!-- <span>{{language("SHENQINGRIQI","申请日期")}}：</span> -->
                  <span>Application date：</span>
                  <span class="samll_val">{{ formData.createDate }}</span>
                </div>
                <div class="small_text">
                  <!-- <span>{{language("KESHI","科室")}}：</span> -->
                  <span>Commodity：</span>
                  <span class="samll_val">{{ formData.linieDeptName }}</span>
                </div>
                <div>
                  <!-- <span>{{language("CAIGOUYUAN","采购员")}}：</span> -->
                  <span>Buyer：</span>
                  <span class="samll_val">{{ formData.linieNameEn }}</span>
                </div>
              </div>
            </div>
            <el-divider class="hr_divider" />

            <div class="centerBox">
              <p>补差金额=零件结算数量 
                *[原材料市场价 -原材料基价*(1+阈值 )]*原材料用量
                 *补差系数
              </p>
              <p>MTZ Payment=Settle accounts Quantity*[Effective Price-Base Price(1+threshold)]*Raw Material Weight*Ratio
              </p>
            </div>

            <p class="tableTitle font20_b" v-if="RsObject">
              {{ language('GUIZEQINGDAN', '规则清单') }}-Regulation
            </p>
            <p class="tableTitle font20_b" v-if="!RsObject && ruleTableListData.length > 0">
              {{ language('GUIZEQINGDAN', '规则清单') }}-Regulation
            </p>
            <!-- highlight-current-row -->
            <tableList class="margin-top20" :tableData="tableData" :tableTitle="ruleTableTitle1_1"
              @handleClickRow="handleCurrentChangeTable" :tableLoading="loadingRule" :index="true" v-if="RsObject"
              :selection="false" border>
              <template slot-scope="scope" slot="compensationPeriod">
                <span>{{
                  scope.row.compensationPeriod == 'A'
                  ? '年度'
                  : scope.row.compensationPeriod == 'H'
                    ? '半年度'
                    : scope.row.compensationPeriod == 'Q'
                      ? '季度'
                      : scope.row.compensationPeriod == 'M'
                        ? '月度'
                        : ''
                }}</span>
              </template>
              <template slot-scope="scope" slot="thresholdCompensationLogic">
                <span>{{
                  scope.row.thresholdCompensationLogic == 'A'
                  ? '全额补差'
                  : scope.row.thresholdCompensationLogic == 'B'
                    ? '超额补差'
                    : ''
                }}</span>
              </template>
              <template slot-scope="scope" slot="sapCode">
                <span>{{ scope.row.sapCode }}</span><br />
                <span>{{ scope.row.supplierName }}</span>
              </template>
              <template slot-scope="scope" slot="materialCode">
                <span>{{ scope.row.materialCode }}</span><br />
                <span>{{ scope.row.materialName }}</span>
              </template>
              <template slot-scope="scope" slot="formalFlag">
                <span>{{ scope.row.formalFlag == 'Y' ? '否' : '是' }}</span>
              </template>
              <template slot-scope="scope" slot="method">
                <span>{{ scope.row.method == '1' ? '一次性补差' : scope.row.method == '2' ? '变价单补差' : '' }}</span>
              </template>
              <template slot-scope="scope" slot="partBalanceCountType">
                <span>{{
                  scope.row.partBalanceCountType == 'SYSTEM' ? '系统预读' : scope.row.partBalanceCountType == 'HANDWORK' ? '手工上传' : ''
                }}</span>
              </template>
              <template slot-scope="scope" slot="avgPeriod">
                <span>{{ scope.row.avgPeriod ? avgPeriodList.find(val => val.code == scope.row.avgPeriod).name : '' }}</span>
              </template>
              <template slot-scope="scope" slot="offsetMonth">
                <span>{{ scope.row.offsetMonth ? offsetList.find(val => val.code == scope.row.offsetMonth).name : '' }}</span>
              </template>
            </tableList>
            <!-- 导出规则表格 -->
            <tableList class="margin-top20" :tableData="tableData" :tableTitle="ruleTableTitle1_1"
              :tableLoading="loadingRule" v-if="!RsObject && tableData.length > 0" :index="true" :selection="false"
              border>
            
              <template slot-scope="scope" slot="compensationPeriod">
                <span>{{
                  scope.row.compensationPeriod == 'A'
                  ? '年度'
                  : scope.row.compensationPeriod == 'H'
                    ? '半年度'
                    : scope.row.compensationPeriod == 'Q'
                      ? '季度'
                      : scope.row.compensationPeriod == 'M'
                        ? '月度'
                        : ''
                }}</span>
              </template>
              <template slot-scope="scope" slot="materialCode">
                <span>{{ scope.row.materialCode }}</span><br />
                <span>{{ scope.row.materialName }}</span>
              </template>
              <template slot-scope="scope" slot="sapCode">
                <span>{{ scope.row.sapCode }}</span><br />
                <span>{{ scope.row.supplierName }}</span>
              </template>
              <template slot-scope="scope" slot="formalFlag">
                <span>{{ scope.row.formalFlag == 'Y' ? '否' : '是' }}</span>
              </template>
              <template slot-scope="scope" slot="method">
                <span>{{ scope.row.method == '1' ? '一次性补差' : scope.row.method == '2' ? '变价单补差' : '' }}</span>
              </template>
              <template slot-scope="scope" slot="partBalanceCountType">
                <span>{{
                  scope.row.partBalanceCountType == 'SYSTEM' ? '系统预读' : scope.row.partBalanceCountType == 'HANDWORK' ? '手工上传' : ''
                }}</span>
              </template>
              <template slot-scope="scope" slot="avgPeriod">
                <span>{{ scope.row.avgPeriod ? avgPeriodList.find(val => val.code == scope.row.avgPeriod).name : '' }}</span>
              </template>
              <template slot-scope="scope" slot="offsetMonth">
                <span>{{ scope.row.offsetMonth ? offsetList.find(val => val.code == scope.row.offsetMonth).name : '' }}</span>
              </template>
            </tableList>
            <tableList class="margin-top20" :tableData="tableData" :tableTitle="ruleTableTitle1_2"
              :tableLoading="loadingRule" v-if="!RsObject && tableData.length > 0" :index="true" :selection="false"
              border>
            </tableList>
          </iCard>
          <div class="page-logo">
            <div>
              <p class="pageNum"></p>
            </div>
            <div>
              <p>{{ userName }}</p>
              <p>{{ new Date().getTime() | dateFilter('YYYY-MM-DD') }}</p>
            </div>
          </div>
        </div>
      </template>
      <template v-for="(tableData, index) in partTableList">
        <div :key="index" class="page-item">
          <!-- class="content_dialog" -->
          <div v-if="
            !RsObject &&
            (formData.appStatus == '流转完成' || formData.appStatus == '定点')
          "></div>
          
          <iCard class="upload_hr" :style="{ height: pdfItemHeight + 'px' }">
            <div slot="header" class="headBox">
              <p class="headTitle">{{ title }}</p>

              <!-- <div class="tabs_box_right"> -->
              <div class="tabs_box_right" v-if="meetingType">
                <div class="big_text">
                  <span class="samll_val">{{ formData.mtzAppId }}-{{ formData.appName }}</span>
                </div>
                <div class="small_text">
                  <!-- <span>{{language("SHENQINGRIQI","申请日期")}}：</span> -->
                  <span>Application date：</span>
                  <span class="samll_val">{{ formData.createDate }}</span>
                </div>
                <div class="small_text">
                  <!-- <span>{{language("KESHI","科室")}}：</span> -->
                  <span>Commodity：</span>
                  <span class="samll_val">{{ formData.linieDeptName }}</span>
                </div>
                <div>
                  <!-- <span>{{language("CAIGOUYUAN","采购员")}}：</span> -->
                  <span>Buyer：</span>
                  <span class="samll_val">{{ formData.linieNameEn }}</span>
                </div>
              </div>
            </div>
            <el-divider class="hr_divider" />
            <div class="centerBox">
              <p>补差金额=零件结算数量 
                *[原材料市场价 -原材料基价*(1+阈值 )]*原材料用量
                 *补差系数
              </p>
              <p>MTZ Payment=Settle accounts Quantity*[Effective Price-Base Price(1+threshold)]*Raw Material Weight*Ratio
              </p>
            </div>

            <p class="tableTitle font20_b" v-if="RsObject">
              {{ language('LJQD', '零件清单') }}-Part List
            </p>
            <p class="tableTitle font20_b" v-if="!RsObject && partTableListData.length > 0">
              {{ language('LJQD', '零件清单') }}-Part List
            </p>
            <tableList
              class="margin-top20 over_flow_y_ture"
              :tableData="tableData"
              :tableTitle="partTableTitle1_1"
              :tableLoading="loadingPart"
              v-if="RsObject"
              :index="true"
              :selection="false"
              border
            >
              <template slot-scope="scope" slot="method">
                <span>{{
                  scope.row.method == '1' ? '一次性补差' : scope.row.method == '2' ? '变价单补差' : ''
                }}</span>
              </template>
              <template slot-scope="scope" slot="compensationPeriod">
                <span>{{
                  scope.row.compensationPeriod == 'A'
                  ? '年度'
                  : scope.row.compensationPeriod == 'H'
                    ? '半年度'
                    : scope.row.compensationPeriod == 'Q'
                      ? '季度'
                      : scope.row.compensationPeriod == 'M'
                        ? '月度'
                        : ''
                }}</span>
              </template>
              <!-- <template slot-scope="scope"
                                slot="thresholdCompensationLogic">
                        <span>{{scope.row.thresholdCompensationLogic == "A"?"全额补差":scope.row.thresholdCompensationLogic == "B"?"超额补差":""}}</span>
                      </template> -->
              <template slot-scope="scope" slot="sapCode">
                <span>{{ scope.row.sapCode }}</span><br />
                <span>{{ scope.row.supplierName }}</span>
              </template>
                <template slot-scope="scope" slot="materialDoseSource">
                  <span>{{
                    scope.row.materialDoseSource ? materialDoseSourceList.find(val => val.code == scope.row.materialDoseSource).name : ''
                  }}</span>
                </template>
                <template slot-scope="scope" slot="method">
                  <span>{{ scope.row.method == '1' ? '一次性补差' : scope.row.method == '2' ? '变价单补差' : '' }}</span>
                </template>
                <template slot-scope="scope" slot="avgPeriod">
                  <span>{{ scope.row.avgPeriod ? avgPeriodList.find(val => val.code == scope.row.avgPeriod).name : '' }}</span>
                </template>
                <template slot-scope="scope" slot="offsetMonth">
                  <span>{{ scope.row.offsetMonth ? offsetList.find(val => val.code == scope.row.offsetMonth).name : '' }}</span>
                </template>
            </tableList>
            <!-- 导出零件表格 -->
            <tableList border class="margin-top20" :tableData="tableData" :tableTitle="partTableTitle1_1"
              :tableLoading="loadingPart" v-if="!RsObject && partTableListData.length > 0" :index="true"
              :selection="false">
              <template slot-scope="scope" slot="method">
                <span>{{
                  scope.row.method == '2' ? '变价单补差' : '一次性补差'
                }}</span>
              </template>
          
              <template slot-scope="scope" slot="compensationPeriod">
                <span>{{
                  scope.row.compensationPeriod == 'A'
                  ? '年度'
                  : scope.row.compensationPeriod == 'H'
                    ? '半年度'
                    : scope.row.compensationPeriod == 'Q'
                      ? '季度'
                      : scope.row.compensationPeriod == 'M'
                        ? '月度'
                        : ''
                }}</span>

              </template>
              <template slot-scope="scope" slot="sapCode">
                <span>{{ scope.row.sapCode }}</span><br />
                <span>{{ scope.row.supplierName }}</span>
              </template>
              <template slot-scope="scope" slot="materialDoseSource">
                <span>{{
                  scope.row.materialDoseSource ? materialDoseSourceList.find(val => val.code == scope.row.materialDoseSource).name : ''
                }}</span>
              </template>

              <template slot-scope="scope" slot="method">
                <span>{{ scope.row.method == '1' ? '一次性补差' : scope.row.method == '2' ? '变价单补差' : '' }}</span>
              </template>
              <template slot-scope="scope" slot="avgPeriod">
                <span>{{ scope.row.avgPeriod ? avgPeriodList.find(val => val.code == scope.row.avgPeriod).name : '' }}</span>
              </template>
              <template slot-scope="scope" slot="offsetMonth">
                <span>{{ scope.row.offsetMonth ? offsetList.find(val => val.code == scope.row.offsetMonth).name : '' }}</span>
              </template>
            </tableList>
            <tableList border class="margin-top20 " :tableData="tableData" :tableTitle="partTableTitle1_2"
              :tableLoading="loadingPart" v-if="!RsObject && partTableListData.length > 0" :index="true"
              :selection="false">
              <template slot-scope="scope" slot="materialDoseSource">
              <span>{{
                scope.row.materialDoseSource ? materialDoseSourceList.find(val => val.code == scope.row.materialDoseSource).name : ''
              }}</span>
            </template>
            <template slot-scope="scope" slot="method">
              <span>{{ scope.row.method == '1' ? '一次性补差' : scope.row.method == '2' ? '变价单补差' : '' }}</span>
            </template>
            <template slot-scope="scope" slot="avgPeriod">
              <span>{{ scope.row.avgPeriod ? avgPeriodList.find(val => val.code == scope.row.avgPeriod).name : '' }}</span>
            </template>
            <template slot-scope="scope" slot="offsetMonth">
              <span>{{ scope.row.offsetMonth ? offsetList.find(val => val.code == scope.row.offsetMonth).name : '' }}</span>
            </template>
            </tableList>
            <tableList border class="margin-top20 " :tableData="tableData" :tableTitle="partTableTitle1_3"
              :tableLoading="loadingPart" v-if="!RsObject && partTableListData.length > 0 && partTableListData.some((val)=>{if(val.platinumPrice) return true})" :index="true"
              :selection="false">
            </tableList>
          </iCard>
          <div class="page-logo">
            <div>
              <p class="pageNum"></p>
            </div>
            <div>
              <p>{{ userName }}</p>
              <p>{{ new Date().getTime() | dateFilter('YYYY-MM-DD') }}</p>
            </div>
          </div>
        </div>
      </template>
      <template v-for="(remark, index) in remarkList">
        <div :key="index" class="page-item remarkCard">
          <!-- class="content_dialog" -->
          <div v-if="
            !RsObject &&
            (formData.appStatus == '流转完成' || formData.appStatus == '定点')
          "></div>
          <div :style="{ height: remarkPageHeight + 'px', background: '#fff' }">
            <iCard>
              <div slot="header" class="headBox">
                <p class="headTitle">
                  {{ language('BEIZHU', '备注') }}-Remarks
                </p>
                <span class="buttonBox">
                  <iButton v-if="
                    RsObject &&
                    (formData.appStatus == '草稿' ||
                      formData.appStatus == '未通过') &&
                    meetingNumber == 0
                  " @click="handleClickSave($event)" v-permission="PORTAL_MTZ_POINT_JUECEDATA_BAOCUN">{{
  language('BAOCUN', '保存') }}</iButton>
                </span>
              </div>
              <div class="beizhu-value">
                <p class="remarkItem" v-for="(item, i) in remark" :key="i">
                  {{ item }}<br />
                </p>
              </div>
            </iCard>
            <iCard v-if="
              isMeeting &&
              applayDateData.length > 0 &&
              !appPage &&
              index == remarkList.length - 1
            " class="margin-top20">
              <div slot="header" class="headBox">
                <p class="headTitle">
                  {{ language('SHENQINGRIQI', '申请日期') }}:{{
                    moment(new Date()).format('YYYY-MM-DD')
                  }}
                </p>
              </div>
              <div :class="RsObject ? 'applayDateBox' : 'applayDateBox1'">
                <div class="applayDateContent" v-for="(item, index) in applayDateData" :key="index">
                  <img class="margin-left5 applayDateIcon" :src="
                    item.taskStatus === '同意'
                      ? require('@/assets/images/icon/yes.png')
                      : require('@/assets/images/icon/no.png')
                  " :fit="fit" />
                  <div class="applayDateContentItem first_one">
                    <span>部门：</span>
                    <span class="applayDateDeptTitle">{{
                      item.deptFullCode
                    }}</span>
                  </div>
                  <div class="applayDateContentItem">
                    <span>审批人：</span>
                    <span>{{ item.nameZh }}</span>
                  </div>
                  <div class="applayDateContentItem">
                    <span>日期：</span>
                    <span>{{ item.endTime }}</span>
                  </div>
                </div>
              </div>
            </iCard>
          </div>
          <div class="page-logo">
            <div>
              <p class="pageNum"></p>
            </div>
            <div>
              <p>{{ userName }}</p>
              <p>{{ new Date().getTime() | dateFilter('YYYY-MM-DD') }}</p>
            </div>
          </div>
        </div>
      </template>
      <div v-if="appPage" class="page-item remarkCard">
        <!-- class="content_dialog" -->
        <div v-if="
          !RsObject &&
          (formData.appStatus == '流转完成' || formData.appStatus == '定点')
        "></div>
        <div :style="{ height: remarkPageHeight + 'px', background: '#fff' }">
          <iCard v-if="isMeeting && applayDateData.length > 0" class="margin-top20">
            <div slot="header" class="headBox">
              <p class="headTitle">
                {{ language('SHENQINGRIQI', '申请日期') }}:{{
                  moment(new Date()).format('YYYY-MM-DD')
                }}
              </p>
            </div>
            <div :class="RsObject ? 'applayDateBox' : 'applayDateBox1'">
              <div class="applayDateContent" v-for="(item, index) in applayDateData" :key="index">
                <img class="margin-left5 applayDateIcon" :src="
                  item.taskStatus === '同意'
                    ? require('@/assets/images/icon/yes.png')
                    : require('@/assets/images/icon/no.png')
                " :fit="fit" />
                <div class="applayDateContentItem first_one">
                  <span>部门：</span>
                  <span class="applayDateDeptTitle">{{
                    item.deptFullCode
                  }}</span>
                </div>
                <div class="applayDateContentItem">
                  <span>审批人：</span>
                  <span>{{ item.nameZh }}</span>
                </div>
                <div class="applayDateContentItem">
                  <span>日期：</span>
                  <span>{{ item.endTime }}</span>
                </div>
              </div>
            </div>
          </iCard>
        </div>
        <div class="page-logo">
          <div>
            <p class="pageNum"></p>
          </div>
          <div>
            <p>{{ userName }}</p>
            <p>{{ new Date().getTime() | dateFilter('YYYY-MM-DD') }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- loading -->
    <div class="percentage-box" id="pdfHide" v-if="loading">
      <el-progress :percentage="percentage" type="circle" color="#1660f1" :show-text="false"
        stroke-width="15"></el-progress>
      <div class="percentage-text">
        {{ percentageText }}{{ point }}{{ percentage }}
      </div>
    </div>
    <!-- 截图区域 -->
    <div class="pdf-containr">
      <div ref="pdf-containr" class="page-item"></div>
    </div>
    <signExport v-if="
      RsObject &&
      formData.flowTypeName == '流转' &&
      !(
        formData.appStatus == '流转完成' ||
        formData.appStatus == '定点' ||
        formData.appStatus == '未通过'
      )
    " :formData="formData" :applayDateData="applayDateDataAll" :ruleTableListData="ruleTableListData"
      :partTableListData="partTableListData" @changeStatus="changeStatus" ref="signExport"
      style="overflow: hidden; height: 0" />
  </div>
</template>

<script>
import { iText,iCard, icon, iInput, iButton, iMessage, iPagination } from 'rise'
import { formList, avgPeriodList, offsetList, materialDoseSourceList } from './data'
import signExport from './signExport.vue'
import tableList from './commonTable/index.vue'
import { partTableTitle1_3,ruleTableTitle1_1, ruleTableTitle1_all, partTableTitle1_1, partTableTitle1_all, ruleTableTitle1_2, partTableTitle1_2 } from './data'
import iTooltip from "../../applyInfor/iTooltip";
import { tipList } from '../../applyInfor/data'
import {
  getAppFormInfo,
  pageAppRule,
  pagePartMasterData,
  fetchSaveCs1Remark,
  approvalList
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/details'
import { pageApprove } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/approve'
import { pageMixins } from '@/utils/pageMixins'
import { downloadPDF , dataURLtoFile, transverseDownloadPDF } from '@/utils/pdf'
import JsPDF from 'jspdf'
import html2canvas from 'html2canvas'
export default {
  mixins: [pageMixins],
  components: {
    iText,
    iTooltip,
    iCard,
    icon,
    iInput,
    iButton,
    iPagination,
    tableList,
    signExport
  },
  props: {
    RsType: { type: Boolean },
    flowType:{type:String},
    appStatus:{type:String},
    meetingStatus:{type:String},
  },
  inject: ['pageTitle'],
  data() {
    return {
      avgPeriodList,
      offsetList,
      materialDoseSourceList,
      isruleTitle2: false,
      isruleTitle1: false,
      tipList,
      formData: {},
      formList,
      partTableTitle1_3,
      partTableTitle1_2,
      ruleTableTitle1_2,
      partTableTitle1_all,
      ruleTableTitle1_all,
      ruleTableTitle1_1,
      partTableTitle1_1,
      ruleTableListData: [],
      partTableListData: [],
      loadingRule: false,
      loadingPart: false,
      applayDateData: [],
      applayDateDataAll: [],
      RsObject: true,
      moment: window.moment,
      meetingNumber: Number(this.$route.query.meeting) || 0,
      meetingType: false,
      clickRulesNumber: 0,
      loading: false,
      ruleTableList: [],
      partTableList: [],
      appPage: false,
      percentage: '0',
      pageHeight: 0,
      pdfItemHeight: 0,
      remarkPageHeight: 0,
      percentageText: '下载中，请稍后',
      remarkList: [[]],
      exportLoading: true
    }
  },
  watch: {
    mtzObject(newVlue, oldValue) {
      this.getAppFormInfo()
    },
    getRemarkAll(val) {
      if (val.length)
        this.$nextTick(() => {
          this.computedRemark()
        })
    }
  },
  created() {
    if (this.RsType) {
      this.RsObject = false
    }
    console.log(this.RsType)

    this.initApplayDateData()
    this.getAppFormInfo()
    this.getPageAppRule()
    this.getPagePartMasterData()
    this.getApprove()
    this.$nextTick(() => {
      console.log('dom渲染完成')
      // 可以使用回调函数的写法
      // 这个函数中DOM必定渲染完成
      this.exportLoading = false
    })
  },
  computed: {
    mtzObject() {
      return this.$store.state.location.mtzObject
    },
    isEditNew: function () {
      const appStatusArr=['草稿','已提交','未通过','通过','复核未通过','M退回']
      return (this.appStatus == '草稿' || this.appStatus == '未通过')||(((this.flowType=='SIGN'||this.flowType=='FILING')&&this.appStatus=='已提交')||(appStatusArr.indexOf(this.appStatus)>0&&this.flowType=="MEETING"))
    },
    title() {
      let res = ''
      switch (this.formData.flowType) {
        case 'MEETING':
          // 上会
          res = 'CSC 定点推荐 - MTZ  CSC Nomination Recommendation - MTZ'
          break
        case 'SIGN':
          // 流转
          res = '流转定点推荐 - MTZ Nomination Recommendation - MTZ'
          break
        case 'FILING':
          // 备案
          res = '备案定点推荐 - MTZ Nomination Recommendation - MTZ'
          break
        default:
          break
      }
      return res
    },
    isMeeting() {
      return (
        this.formData.flowType == 'MEETING' || this.formData.flowType == 'SIGN'
      )
    },

    getRemarkAll() {
      return this.formData.linieMeetingMemo?.split('\n') || [''] // 默认添加一个'',否者无数据时不显示
    },
    username() {
      return this.$store.state.permission.userInfo.userName
    }
  },
  filters: {
    // 日期格式化
    dateFilter(val, format = 'YYYY-MM-DD HH:mm:ss', sourceFormat) {
      return typeof val === 'string' || typeof val === 'number'
        ? window.moment(val, sourceFormat).format(format)
        : val
    }
  },
  methods: {
    // 获取审批节点
    getApprove() {
      let params = {
        isDeptLead: true,
        mtzAppId: this.mtzObject.mtzAppId || this.$route.query.mtzAppId,
        pageNo: 1,
        pageSize: 999
      }
      pageApprove(params).then(res => {
        if (res?.code === '200') {
          this.applayDateDataAll = res.data || []
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    // 计算备注高度
    computedRemark() {
      // 考虑边框问题 test（28）.pdf
      let remarkCardHeight = this.$refs['remark-card']?.$el.offsetHeight
      let remarkContentHeight = this.$refs['remark']?.offsetHeight
      let applayDateData = this.$refs['applayDateData']?.$el.offsetHeight || 0
      let otherHeight = remarkCardHeight - remarkContentHeight
      let pageNumHeight = this.$refs.pageNum.offsetHeight // 页码高度
      // let remarkTitleHeight = this.$refs.remarkTitle.offsetHeight
      let list = this.$refs.remark.getElementsByClassName('remarkItem')
      let pageWidth = this.$refs.qrCodeDiv?.clientWidth || 0
      let pageHeight = (pageWidth / 841.89) * 595.28
      this.remarkPageHeight = pageHeight - pageNumHeight
      let arr = []
      let remarkList = []
      let sumHeight = 0
      list.forEach((item, i) => {
        sumHeight += item.offsetHeight
        if (sumHeight < pageHeight - otherHeight - pageNumHeight) {
          arr.push(this.getRemarkAll[i])
        } else {
          remarkList.push(JSON.parse(JSON.stringify(arr)))
          arr = [this.getRemarkAll[i]]
          sumHeight = item.offsetHeight
        }
      })
      if (arr.length) {
        remarkList.push(JSON.parse(JSON.stringify(arr)))
      }
      if (applayDateData) {
        if (
          pageHeight - sumHeight - otherHeight - pageNumHeight >
          applayDateData
        ) {
          this.appPage = false
        } else {
          this.appPage = true
        }
      }
      this.remarkList = remarkList
    },
    handleCurrentChangeTable(e) {
      this.clickRulesNumber = 1
      this.loadingPart = true
      this.exportLoading = true

      var list = {
        mtzAppId: this.mtzObject.mtzAppId || this.$route.query.mtzAppId,
        pageNo: 1,
        pageSize: 99999,
        ruleNo: e.ruleNo
      }
      pagePartMasterData(list).then((res) => {
        if (res && res.code == 200) {
          this.partTableListData = res.data
          this.clickRulesNumber = 0
          this.loadingPart = false
          this.exportLoading = false
        } else iMessage.error(res.desZh)
      })
    },
    rulesClick() {
      if (!this.RsObject) return false
      if (this.clickRulesNumber == 0) {
        this.loadingPart = true
        this.exportLoading = true

        var list = {
          mtzAppId: this.mtzObject.mtzAppId || this.$route.query.mtzAppId,
          pageNo: 1,
          pageSize: 99999
        }
        pagePartMasterData(list).then((res) => {
          if (res && res.code == 200) {
            this.partTableListData = res.data
            this.loadingPart = false
            this.exportLoading = false

          } else iMessage.error(res.desZh)
        })
      }
    },
    downPdf() {
      this.percentage = '0'
      var name = ''
      if (this.title == '') {
        name = 'RS导出'
      } else if (this.pageTitle.title) {
        name = this.pageTitle.title
      } else {
        name = this.title
      }
      this.handleExportPdf(name)
      return
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      // transverseDownloadPDF
      // downloadPDF
      transverseDownloadPDF({
        idEle: 'qrCodeDiv',
        pdfName: name,
        exportPdf: true,
        // waterMark: true,
        title: ['#tabsBoxTitle .cardHeader'], //顶部页眉dom节点
        callback: async (pdf, pdfName) => {
          console.log(pdf)
          try {
            loading.close()
            const filename = pdfName.replaceAll(/\./g, '_') + '.pdf'
            const pdfFile = pdf.output('datauristring')
            const blob = dataURLtoFile(pdfFile, filename)
          } catch {
            iMessage.error(this.language('SHENGCHENGSHIBAI', '生成失败'))
          }
        }
      })
    },
    initApplayDateData() {
      approvalList({
        mtzAppId: this.mtzObject.mtzAppId || this.$route.query.mtzAppId
      }).then((res) => {
        if (res?.code === '200') {
          let data = res.data
          this.applayDateData = data
          this.$nextTick(() => {
            this.computedRemark()
          })
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    // 获取申请单信息
    getAppFormInfo() {
      getAppFormInfo({
        mtzAppId: this.mtzObject.mtzAppId || this.$route.query.mtzAppId
      }).then((res) => {
        if (res && res.code == 200) {
          this.formData = res.data
          if (
            this.formData.flowType == 'SIGN' &&
            !(
              this.formData.appStatus == '流转完成' ||
              this.formData.appStatus == '定点' ||
              this.formData.appStatus == '未通过'
            )
          ) {
            if (this.meetingNumber == 0) {
              if (this.RsObject) {
                this.meetingType = false
              } else {
                this.meetingType = true
              }
            } else {
              this.meetingType = true
            }
          } else {
            this.meetingType = true
          }
        } else iMessage.error(res.desZh)
      })
    },
    // 获取规则清单表格数据
    getPageAppRule() {
      var list = {}

      list = {
        mtzAppId: this.mtzObject.mtzAppId || this.$route.query.mtzAppId,
        pageNo: 1,
        pageSize: 99999
      }
      // }
      pageAppRule(list)
        .then((res) => {
          if (res && res.code == 200) {
            this.ruleTableListData = res.data
          } else iMessage.error(res.desZh)
        })
        .finally(() => {
          this.$nextTick(() => {
            this.computedRuleTableHeight()
          })
        })
    },

    // 获取零件清单表格数据
    getPagePartMasterData() {
      var list = {}

      list = {
        mtzAppId: this.mtzObject.mtzAppId || this.$route.query.mtzAppId,
        pageNo: 1,
        pageSize: 99999
      }
      // }
      pagePartMasterData(list)
        .then((res) => {
          if (res && res.code == 200) {
            this.partTableListData = res.data
          } else iMessage.error(res.desZh)
        })
        .finally(() => {
          this.$nextTick(() => {
            this.computedPartTableHeight()
          })
        })
    },
    openPageMarket(row){
      console.log(row)
      let routeUrl = this.$router.resolve({
        path: '/mtz/dataBase/marketPriceEnquiry',
        query: {
          materialCode: row.materialCode,
        },
      })
      window.open(routeUrl.href, '_blank')
    },
    computedPartTableHeight() {
      let rowList =
        this.$refs['partTable']?.$el.getElementsByClassName('part-table-row') ||
        []
      let partTableHeader =
        this.$refs['partTable']?.$el.getElementsByClassName(
          'partTableHeader'
        )[0].offsetHeight || 0
      let cardTitle =
        this.$refs.tabsBoxTitle.$el.getElementsByClassName('cardHeader')[0]
          .clientHeight
      let partTableTitle = this.$refs.ruleTableTitle.offsetHeight // 此处故意使用ruleTableTitle
      let pageWidth = this.$refs.qrCodeDiv?.clientWidth || 0
      this.pageHeight = (pageWidth / 841.89) * 595.28
      let sumHeight = 0
      let arr = []
      let tableList = []
      let pageNumHeight = this.$refs.pageNum.offsetHeight // 页码高度
      this.pdfItemHeight = this.pageHeight - pageNumHeight
      rowList.forEach((item, i) => {
        sumHeight += item.clientHeight*2
        if (
          sumHeight >
          this.pageHeight -
          cardTitle -
          partTableTitle -
          partTableHeader -
          pageNumHeight
        ) {
          tableList.push(arr)
          sumHeight = item.clientHeight*2
          arr = [this.partTableListData[i]]
        } else {
          arr.push(this.partTableListData[i])
        }
      })
      if (arr.length) tableList.push(arr)
      this.partTableList = tableList
    },
    computedRuleTableHeight() {
      let rowList =
        [...this.$refs['moviesTable']?.$el.getElementsByClassName('table-row') || []
      ]
        console.log(rowList)
      
      let pageWidth = this.$refs.tabsBoxTitle?.$el.clientWidth || 0
      let cardTitle =
        this.$refs.tabsBoxTitle.$el.getElementsByClassName('cardHeader')[0]
          .clientHeight
      let ruleTableTitle = this.$refs.ruleTableTitle.offsetHeight
      this.pageHeight = (pageWidth / 841.89) * 595.28
      let ruleTableHeader =
        this.$refs['moviesTable']?.$el.getElementsByClassName(
          'ruleTableHeader'
        )[0].offsetHeight || 0
        console.log(ruleTableHeader)
      let pageNumHeight = this.$refs.pageNum.offsetHeight // 页码高度
      let sumHeight = 0
      let arr = []
      let tableList = []
      let rowHeight=0
      this.pdfItemHeight = this.pageHeight - pageNumHeight
      console.log(      this.pageHeight -
          ruleTableTitle -
          cardTitle -
          ruleTableHeader -
          pageNumHeight)
      rowList.forEach((item, i) => {
        rowHeight=item.clientHeight*2
        console.log(rowHeight)
        sumHeight += rowHeight

        // ruleTableHeader 表头高度
        if (
          sumHeight >
          this.pageHeight -
          ruleTableTitle -
          cardTitle -
          ruleTableHeader -
          pageNumHeight
        ) {
          tableList.push(arr)
          sumHeight = item.clientHeight*2
          arr = [this.ruleTableListData[i]]
        } else {
          arr.push(this.ruleTableListData[i])
        }
      })
      if (arr.length) tableList.push(arr)
      this.ruleTableList = tableList
      console.log( this.ruleTableList)
    },
    // 点击保存
    handleClickSave(el) {
      el.cancelBubble = true
      let params = {}
      params = {
        mtzAppId: this.mtzObject.mtzAppId || this.$route.query.mtzAppId,
        linieMeetingMemo: this.formData.linieMeetingMemo
          ? this.formData.linieMeetingMemo
          : ''
      }
      fetchSaveCs1Remark(params).then((res) => {
        if (res && res.code == 200) {
          this.getAppFormInfo()
          iMessage.success(res.desZh)
        } else iMessage.error(res.desZh)
      })
    },
    changeStatus(val) {
      // this.exportLoading = val
    },
    // 导出会外流转单
    handleToSignPreview() {
      this.$refs.signExport.downPdf()
      // const { href } = this.$router.resolve({
      //   path: '/mtz/annualGeneralBudget/locationChange/MtzLocationPoint/signPreview',
      //   query: {
      //     mtzAppId: this.mtzObject.mtzAppId || this.$route.query.mtzAppId
      //   }
      // })
      // window.open(href, '_blank')
    },
    // 导出pdf
    handleExportPdf(name) {
      this.loading = true
      // setTimeout(async () => {
      //   this.$nextTick(async () => {
      //     downloadPDF({
      //     idEle: "pdfPage-box",
      //     pdfName: name,
      //     exportPdf: true,
      //     waterMark: true,
      //     callback: async (pdf, pdfName) => {
      //       try {
      //         loading.close()
      //         const filename = pdfName.replaceAll(/\./g, '_') + ".pdf";
      //         const pdfFile = pdf.output("datauristring");
      //         const blob = dataURLtoFile(pdfFile, filename);
      //         this.loading = false
      //       } catch {
      //         this.loading = false
      //         // iMessage.error(this.language('SHENGCHENGSHIBAI', '生成失败'));
      //       }
      //     },
      //   });
      //   })
      // }, 200)
      console.time('截图')
      this.fileList = []
      let elList = this.$refs['pdfPage-box'].getElementsByClassName('page-item')
      this.elList = elList
      if (!elList.length) {
        iMessage.warn('请稍等')
        this.$emit('changeStatus', 'exportLoading', false)
        return
      }
      this.pageLength = elList.length
      this.showPage = false
      setTimeout(async () => {
        this.$nextTick(async () => {
          console.log('start')
          this.pdf = new JsPDF('l', 'pt', 'a4', true) //l横向打印，p纵向打印 true=>开启压缩
          for (let i = 0; i < this.pageLength; i++) {
            const el = elList[i]
            await this.getPdfImage({
              dom: el,
              j: i
            })
          }
          this.pdf.save(name)
          console.timeEnd('截图')
          this.loading = false
        })
      }, 200)
    },

    // 截取页面,存入pdf
    async getPdfImage({ dom, j }) {
      let scale = 2
      const el = this.$refs['pdf-containr']
      console.time(`img${j}`)
      // canvas 不能通过innerHTML渲染
      dom.getElementsByClassName('pageNum')[0].innerHTML = `page ${j + 1} of ${this.pageLength
        }`
      el.innerHTML = dom.innerHTML
      await html2canvas(el, {
        allowTaint: true,
        dpi: 96, //分辨率
        scale: scale, //设置缩放
        useCORS: true, //允许canvas画布内 可以跨域请求外部链接图片, 允许跨域请求。,
        // bgcolor: "#ffffff", //应该这样写
        // logging: false, //打印日志用的 可以不加默认为false
        porxy: '',
        ignoreElements: (el) => {
          if (
            el.id == 'pdfHide' ||
            el.id == 'qrCodeDiv' ||
            el.id == 'pdfPage-box'
          ) {
            return true
          }
          return false
        }
      })
        .then((canvas) => {
          this.change(j)
          var contentWidth = canvas.width //
          var contentHeight = canvas.height //
          var imgWidth = 841.89
          var imgHeight = (841.89 / contentWidth) * contentHeight
          let pageData = canvas.toDataURL('image/jpeg', 1) //压缩倍率
          if (j != 0) this.pdf.addPage()
          this.pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
          console.timeEnd(`img${j}`)
        })
        .catch((error) => {
          console.log(error)
        })
    },

    change(j) {
      this.percentage = parseInt(((j + 1) / this.pageLength) * 100)
    }
  }
}
</script>

<style lang="scss" scoped>
.titleHeader{
  display: flex;
  flex-wrap: wrap;
 
}
.itext{
  background:transparent!important;
}

::v-deep.el-form .el-table .cell  {
  // font-size: 18px!important;
 
 
}
::v-deep.el-table td div {
  line-height: normal !important;
  // font-size: 18px!important;
}
::v-deep.el-form .el-table .cell span{
  line-height: normal !important;
  // font-size: 18px!important;

}
.font18{
  font-size: 18px;
}
.font20_b{
  font-size: 20px;
  font-weight: bold;
}
.font18_b{
  font-size: 18px;
  font-weight: bold;
}
::v-deep.el-button--default{
  font-size: 20px!important;
}
.centerBox {
  margin: 20px 0;

  p {
    font-size: 18px;
  }
}

#tabsBoxTitle,
.computed {
  ::v-deep .cardBody {
    padding-bottom: 0;
  }
}

$tabsInforHeight: 35px;

::v-deep .cardHeader {
  padding: 1.875rem 1.5625rem 0 2.4rem !important;
}

::v-deep.el-button--mini.is-circle {
  padding: 3px 4px;
}

.tableTitle {
  font-weight: bold;
  font-family: Arial;
  color: #000000;
  opacity: 1;
  font-size: 20px;
}

.table_right {
  display: inline-block;
  font-family: Arial;
  color: #000000;
  font-size: 18px;
  width: 100%;
  text-align: end;
}

.headBox {
  position: relative;
  justify-content: space-between;
  width: 100%;
  display: flex;

  .headTitle {
    display: inline-block;
    font-weight: bold;
    font-family: Arial;
    color: #000000;
    opacity: 1;
  }

  .buttonBox {
    position: absolute;
    right: 13px;
  }
}

.applayDateBox1 {
  display: flex;
  align-items: center;
  flex-flow: wrap;
  margin-top: 20px;
}

.applayDateBox {
  overflow-x: scroll;
  margin: 20px 0;
  padding-bottom: 20px;
  white-space: nowrap;
}

.applayDateIcon {
  width: 33px;
  height: 33px;
  margin-top: 10px;
}

.applayDateContentItem {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  padding: 0 20px;
  font-size: 16px;

  .applayDateDeptTitle {
    font-weight: bold;
  }
}

.first_one {
  margin-top: 30px !important;
}

.applayDateContent {
  display: inline-block;
  background-color: #cdd4e2;
  height: 178px;
  width: 16%;
  margin: 10px 0.3% 0;
  border-radius: 15px;
  text-align: center;
}

.formStyle {
  position: relative;

}

.btn{
  display:inline-block;
    text-align:center;
    line-height:20px;
    width:20px;
    height:20px;
    font-size:14px;
    background-color:#1763f7;
    color:white;
    border-radius:50%;
    position: absolute;
    right: -10px;
    top: 10px;
    z-index: 100;
  }

.tabsBoxInfor {
  margin-bottom: 10px;
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;

  .inforDiv {
    width: 29%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0;
    margin-bottom: 20px;

    span {
      font-size: 15px;
    }

    .inforText {
      font-size: 14px;
      padding: 10px 10px;
      width: 68%;
      min-height: $tabsInforHeight;
      height: auto;
      background: #f8f8fa;
      text-align: center;
    }
  }
}

.download_btn {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
  padding-bottom: 20px;
}

.content_dialog {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('~@/assets/images/icon/pass.png');
  z-index: 100000;
  opacity: 0.07;
}

::v-deep .el-form {
  .el-table {
    .cell {
      padding: 0 !important;

      span {
        margin-right: 0px !important;
      }
    }
  }
}

.over_flow_y_ture {
  ::v-deep .el-table__body-wrapper {
    max-height: 300px;
    overflow-y: auto;
  }
}

.infor_futitle {
  padding: 0.5rem 0;
  font-size: 15px !important;
  line-height: 25px;

  .big_font {
    font-weight: bold;
  }

  .big_small {
    padding-left: 15px;
  }
}

.hr_divider {
  margin: 0 1.5rem 0 0;
}

.tabs_box_right {
  height: 40px;

  .samll_title {
    width: 80px;
  }

  div {
    display: flex;
    align-items: flex-start;
    margin-right: 20px;
  }

  span {
    display: inline-block;
    font-size: 15px !important;
  }

  .small_text {
    float: left;
  }
}

.upload_hr {
  ::v-deep .cardBody {
    padding-top: 0px !important;
  }
}

::v-deep .el-form-item__content {
  line-height: 0px !important;
}

.pdf-containr {
  width: 100%;
  height: 0;
  overflow: hidden;
  position: absolute;

  ::v-deep .cardBody {
    padding-top: 0px !important;
  }
}

.pdfPage-box {
  position: absolute;
  width: 100%;
  height: 0px;
  overflow: hidden;

  ::v-deep .card {
    .cardBody {
      padding: 0 40px;
    }
  }
}

.page-item {
  width: 100%;
  position: relative;
}

.percentage-box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 99999;
  background: rgba(255, 255, 255, 0.8);
}

.percentage-text {
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #1660f1;
}

.page-logo {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
  border-top: 1px solid #666;
}

.padding-bottom30 {
  padding-bottom: 30px;
}

.remarkCard {
  ::v-deep .card {
    box-shadow: none;
  }
}</style>
