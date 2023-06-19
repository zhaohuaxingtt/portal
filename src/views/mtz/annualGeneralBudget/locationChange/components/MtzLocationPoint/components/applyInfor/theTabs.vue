<!--
 维护MTZ原材料规则表格
-->
<template>
  <iCard class="margin-top20">
    <template v-slot:header>
      <span class="font18_b">
        {{ language('WHMTZYCLGZ', '维护MTZ原材料规则') }}
      </span>
      <div>
        <iButton
          @click="cancel"
          v-if="editType && isEditNew"
          >{{ language('QUXIAO', '取消') }}</iButton
        >
        <iButton
          @click="add"
          v-permission="PORTAL_MTZ_POINT_INFOR_ADD"
          v-if="!editType && isEditNew"
          >{{ language('XINZENG', '新增') }}</iButton
        >
        <iButton
          @click="edit"
          v-permission="PORTAL_MTZ_POINT_INFOR_BIANJI"
          v-if="!editType && isEditNew"
          >{{ language('BIANJI', '编辑') }}</iButton
        >
        <iButton
          @click="continueBtn"
          v-permission="PORTAL_MTZ_POINT_INFOR_GZ_YANYONG"
          v-if="!editType && isEditNew"
          >{{ language('YANYONG', '沿用') }}</iButton
        >
        <iButton
          @click="upRuleBtn"
          v-permission="PORTAL_MTZ_POINT_INFOR_GZ_YANYONG"
          v-if="!editType && isEditNew"
          >{{ language('升版', '升版') }}</iButton
        >
        <iButton
          @click="delecte"
          v-permission="PORTAL_MTZ_POINT_INFOR_DEL"
          v-if="!editType && isEditNew"
          >{{ language('SHANCHU', '删除') }}</iButton
        >
        <iButton
          @click="save"
          v-if="editType && isEditNew"
          >{{ language('BAOCUN', '保存') }}</iButton
        >
      </div>
    </template>
    <div class="centerBox">
      <p>补差金额=零件结算数量 <iTooltip :txtInfo="tipList[0]" :num="'1'"></iTooltip>
        *[原材料市场价<iTooltip :txtInfo="tipList[1]" :num="'2'"></iTooltip> -原材料基价<iTooltip :txtInfo="tipList[2]" :num="'3'">
        </iTooltip> *(1+阈值<iTooltip :txtInfo="tipList[3]" :num="'4'"></iTooltip>*阈值系数<iTooltip :txtInfo="tipList[4]" :num="'5'"></iTooltip> )]*原材料用量
        <iTooltip :txtInfo="tipList[5]" :num="'6'"></iTooltip> *补差%<iTooltip :txtInfo="tipList[6]" :num="'7'"></iTooltip>
      </p>
      <p class="enStyle"><span>MTZ Payment= Settle Accounts Quantity*[Effective Price-Base Price(1+Threshold*Coefficient)]*Raw Material Weight* Compensation%</span><span>When: effective price > base price *(1+threshold)</span></p>
    </div>
    <el-form :rules="formRules" :model="{ tableData }" ref="contractForm" class="formStyle">
      <!-- <div class="btn">
        <el-button type="primary" size="mini" circle @click="isTitle = !isTitle">{{ isTitle ? '-' : '+' }}</el-button>
      </div> -->
      <el-table :data="tableData" ref="moviesTable" border v-loading="loading" @selection-change="handleSelectionChange">
        <el-table-column type="selection" :selectable="selectionType" fixed width="40" align="center">
        </el-table-column>
        <el-table-column label="#" fixed type="index" width="40" align="center">
        </el-table-column>
        <el-table-column prop="ruleNo" align="center"  width="100" :label="language('GUIZEBIANHAO', '规则编号')">
          <template slot-scope="scope">
            <el-form-item :prop="'tableData.' + scope.$index + '.' + 'ruleNo'"
              :rules="formRules.ruleNo ? formRules.ruleNo : ''">
              <!-- <iInput v-model="scope.row.ruleNo" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
              <span>{{ scope.row.ruleNo }}<i v-if="scope.row.formalFlag!='Y'" style="color:#1763f7" class="el-icon-edit-outline"></i></span>
            </el-form-item>
          </template>
        </el-table-column>
        <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
        <!-- <el-table-column prop="method" align="center"  :label="language('补差方式')">
          <template slot-scope="scope">
            <el-form-item :prop="'tableData.' + scope.$index + '.' + 'method'"
              :rules="formRules.method ? formRules.method : ''">
              <el-select v-model="scope.row.method" clearable :placeholder="language('QINGSHURU', '请输入')"
                v-if="editId.indexOf(scope.row.id) !== -1">
                <el-option v-for="item in methodList" :key="item.code" :label="item.name" :value="item.code">
                </el-option>
              </el-select>
              <span v-else> {{ scope.row.method=='1'?'一次性补差':scope.row.method=='2'?'变价单补差':'' }}</span>
            </el-form-item>
          </template>
        </el-table-column> -->
        <el-table-column width="140" prop="sapCode" align="center" 
          :label="language('LK_GONGYINGSHANG', '供应商')">
          <template slot-scope="scope">
          <el-form-item  :prop="'tableData.' + scope.$index + '.' + 'sapCode'"
            :rules="formRules.sapCode ? formRules.sapCode : ''">
            <!-- <el-select v-model="scope.row.supplierId"
                            clearable
                            filterable
                            :placeholder="language('QINGSHURU', '请输入')"
                            @change="supplierBH(scope,$event)"
                            v-if="editId.indexOf(scope.row.id)!==-1"
                            >
                            <el-option
                                v-for="item in supplierList"
                                :key="item.code"
                                :label="item.codeMessage"
                                    :value="item.code">
                                </el-option>
                            </el-select> -->
              <span>{{ scope.row.sapCode }}-{{ scope.row.supplierName }}</span>
            </el-form-item>
          </template>
        </el-table-column>

        <el-table-column width="140" prop="materialCode" align="center" 
          :label="language('YUANCAILIAO', '原材料')">
          <template slot-scope="scope">
          <el-form-item :prop="'tableData.' + scope.$index + '.' + 'materialCode'"
            :rules="formRules.materialCode ? formRules.materialCode : ''">
            <!-- <el-select v-model="scope.row.materialCode"
                            clearable
                            filterable
                            :placeholder="language('QINGSHURU', '请输入')"
                            v-if="editId.indexOf(scope.row.id)!==-1"
                            @change="MaterialGrade(scope,$event)"
                            >
                            <el-option
                                v-for="item in materialCode"
                                :key="item.code"
                                :label="item.codeMessage"
                                    :value="item.code">
                                </el-option>
                            </el-select> -->
                            <span class='link' @click="openPageMarket(scope.row)">{{ scope.row.materialCode }}-{{ scope.row.materialName }}</span>
            </el-form-item>
          </template>
        </el-table-column>

        <el-table-column prop="formalFlag" align="center"  :label="language('SHIFOUWEIXINGUIZE', '是否为新规则')">
          <template slot-scope="scope">
            <el-form-item :prop="'tableData.' + scope.$index + '.' + 'formalFlag'"
              :rules="formRules.formalFlag ? formRules.formalFlag : ''">
              <!-- <iInput v-model="scope.row.ruleNo" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
              <span>{{ scope.row.formalFlag == 'Y' ? '否' : '是' }}</span>
            </el-form-item>
          </template>
        </el-table-column>

        <el-table-column prop="startDate" align="center"  :label="language('YOUXIAOQIQI', '有效期起')">
          <template slot-scope="scope">
            <el-form-item :prop="'tableData.' + scope.$index + '.' + 'startDate'"
              :rules="formRules.startDate ? formRules.startDate : ''">
              <iDatePicker :picker-options="pickerOptionsStar" v-model="scope.row.startDate"
                @focus="chaneDate($event, scope.row)" style="width:180px!important;" type="date" value-format="yyyy-MM-dd"
                format="yyyy-MM-dd" v-if="editId.indexOf(scope.row.id) !== -1">
              </iDatePicker>
              <span v-else>{{ scope.row.startDate }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="endDate" align="center"  :label="language('YOUXIAOQIZHI', '有效期止')">
          <template slot-scope="scope">
            <el-form-item :prop="'tableData.' + scope.$index + '.' + 'endDate'"
              :rules="formRules.endDate ? formRules.endDate : ''">
              <iDatePicker :picker-options="pickerOptionsEnd" v-model="scope.row.endDate"
                @focus="chaneDate($event, scope.row)" style="width:180px!important;" type="date" value-format="yyyy-MM-dd"
                format="yyyy-MM-dd" v-if="editId.indexOf(scope.row.id) !== -1">
              </iDatePicker>
              <span v-else>{{ scope.row.endDate }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
        <el-table-column prop="partBalanceCountType" align="center"  :label="language('结算数据来源', '结算数据来源')">
          <template slot="header" slot-scope="scope">
            <span>{{ language('结算数据来源', '结算数据来源') }}<iTooltip :txtInfo="tipList[0]" :num="'1'"></iTooltip></span>
          </template>
          <template slot-scope="scope">
            <el-form-item :prop="'tableData.' + scope.$index + '.' + 'partBalanceCountType'"
              :rules="formRules.partBalanceCountType ? formRules.partBalanceCountType : ''">
              <span>{{ scope.row.partBalanceCountType=='SYSTEM'?'系统预读':scope.row.partBalanceCountType=='HANDWORK'?'手工上传':'' }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="source" align="center"  :label="language('SHICHANGJIALAIYUAN', '市场价来源')">
          <template slot="header" slot-scope="scope">
            <span>{{ language('SHICHANGJIALAIYUAN', '市场价来源') }}<iTooltip :txtInfo="tipList[1]" :num="'2'"></iTooltip></span>
          </template>
          <template slot-scope="scope">
          <el-form-item :prop="'tableData.' + scope.$index + '.' + 'source'"
            :rules="formRules.source ? formRules.source : ''">
            <!-- <el-select v-model="scope.row.tcCurrence"
                         clearable
                         :placeholder="language('QINGSHURU', '请输入')"
                         v-if="editId.indexOf(scope.row.id)!==-1">
                <el-option v-for="item in tcCurrence"
                           :key="item.code"
                           :label="item.code"
                               :value="item.code">
                    </el-option>
              </el-select> -->

            <i-select
                v-model="scope.row.source"
                clearable
                @change="sourceChange(scope.row, $event)"
                :placeholder="language('QINGSHURU', '请输入')"
                v-if="editId.indexOf(scope.row.id) !== -1&&!editTypeNo"
              >
                <el-option
                  v-for="item in getMtzMarketSourceList"
                  :key="item.code"
                  :label="item.code"
                  :value="item.code"
                    >
                    </el-option>
                  </i-select>

              <span v-else>{{ scope.row.source }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="avgPeriod" align="center"  :label="language('均值计算周期', '均值计算周期')">
          <template slot="header" slot-scope="scope">
            <span>{{ language('均值计算周期', '均值计算周期') }}<iTooltip :type="'icon'" :txtInfo="tipList[7]" :num="'1'"></iTooltip>
              </span>
          </template>
          <template slot-scope="scope">
            <el-form-item :prop="'tableData.' + scope.$index + '.' + 'avgPeriod'"
              :rules="formRules.avgPeriod ? formRules.avgPeriod : ''">
              <el-select v-model="scope.row.avgPeriod" clearable :placeholder="language('QINGSHURU', '请输入')"
                v-if="editId.indexOf(scope.row.id) !== -1">
                <el-option v-for="item in avgPeriodList" :key="item.code" :label="item.name" :value="item.code">
                </el-option>
              </el-select>
              <span v-else>{{ scope.row.avgPeriod||scope.row.avgPeriod=='0'?avgPeriodList.find(val=>val.code==scope.row.avgPeriod).name:'' }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="offsetMonth" align="center"  :label="language('均值偏移量', '均值偏移量')">
          <template slot="header" slot-scope="scope">
            <span>{{ language('均值偏移量', '均值偏移量') }}<iTooltip :type="'icon'" :txtInfo="tipList[8]" :num="'1'"></iTooltip>
              </span>
          </template>
          <template slot-scope="scope">
            <el-form-item :prop="'tableData.' + scope.$index + '.' + 'offsetMonth'"
              :rules="formRules.offsetMonth ? formRules.offsetMonth : ''">
              <el-select v-model="scope.row.offsetMonth" clearable :placeholder="language('QINGSHURU', '请输入')"
                v-if="editId.indexOf(scope.row.id) !== -1">
                <el-option v-for="item in offsetList" :key="item.code" :label="item.name" :value="item.code">
                </el-option>
              </el-select>
              <span v-else>{{ scope.row.offsetMonth||scope.row.offsetMonth=='0'?offsetList.find(val=>val.code==scope.row.offsetMonth).name:'' }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="price" align="center" width="60" :label="language('JIJIA', '基价')">
          <template slot="header" slot-scope="scope">
            <span>{{ language('JIJIA', '基价') }}<iTooltip :txtInfo="tipList[2]" :num="'3'"></iTooltip></span>
          </template>
          <template slot-scope="scope">
            <el-form-item :prop="'tableData.' + scope.$index + '.' + 'price'"
            :rules="formRules.price ? formRules.price : ''">
            <!-- :disabled='scope.row.metalType && editId.indexOf(scope.row.id)!==-1' -->
            <!-- <iInput type="number"
                                v-model="scope.row.price"
                                v-if="editId.indexOf(scope.row.id) !== -1"
                            ></iInput> -->
              <span>{{ scope.row.price }}</span>
            </el-form-item>
          </template>
        </el-table-column>

        <el-table-column prop="tcCurrence" align="center" width="60" :label="language('HUOBI', '货币')">
          <template slot-scope="scope">
          <el-form-item :prop="'tableData.' + scope.$index + '.' + 'tcCurrence'"
            :rules="formRules.tcCurrence ? formRules.tcCurrence : ''">
            <!-- <el-select
                v-model="scope.row.tcCurrence"
                clearable
                :placeholder="language('QINGSHURU', '请输入')"
                v-if="editId.indexOf(scope.row.id) !== -1"
              >
                <el-option
                  v-for="item in tcCurrence"
                  :key="item.code"
                  :label="item.code"
                  :value="item.code"
                    >
                    </el-option>
                  </el-select> -->
              <span>{{ scope.row.tcCurrence }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="tcExchangeRate" align="center" width="60" :label="language('HUILV', '汇率')">
          <!-- <template slot="header" slot-scope="scope">
            <span>{{ language('HUILV', '汇率') }}<iTooltip :txtInfo="tipList[2]" :num="'3'"></iTooltip></span>
          </template> -->
          <template slot-scope="scope">
            <el-form-item :prop="'tableData.' + scope.$index + '.' + 'tcExchangeRate'"
              :rules="formRules.tcExchangeRate ? formRules.tcExchangeRate : ''">
              <iInput type="number" v-model="scope.row.tcExchangeRate" v-if="editId.indexOf(scope.row.id) !== -1">
              </iInput>
              <span v-else>{{ scope.row.tcExchangeRate }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="priceMeasureUnit" align="center" 
          :label="language('JIJIAJILIANGDANWEI', '基价计量单位')">
          <template slot-scope="scope">
            <el-form-item :prop="'tableData.' + scope.$index + '.' + 'priceMeasureUnit'" :rules="
              formRules.priceMeasureUnit ? formRules.priceMeasureUnit : ''
            ">
            <el-select v-model="scope.row.priceMeasureUnit"
                            clearable
                            :placeholder="language('QINGSHURU', '请输入')"
                            v-if="editId.indexOf(scope.row.id)!==-1&&!editTypeNo"
                            >
                            <el-option
                                v-for="item in priceMeasureUnit"
                                :key="item.code"
                                :label="item.message"
                                    :value="item.code">
                            </el-option>
                        </el-select>
            <!-- <iInput
                                v-model="scope.row.priceMeasureUnit"
                                v-if="editId.indexOf(scope.row.id)!==-1"
                            ></iInput> -->
              <span v-else>{{ scope.row.priceMeasureUnit }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="threshold" align="center" width="60" :label="language('YUZHI', '阈值')" >
          <template slot="header" slot-scope="scope">
            <span>{{ language('YUZHI', '阈值') }}<iTooltip :txtInfo="tipList[3]" :num="'4'"></iTooltip></span>
          </template>
          <template slot-scope="scope">
            <el-form-item :prop="'tableData.' + scope.$index + '.' + 'threshold'"
              :rules="formRules.threshold ? formRules.threshold : ''">
              <el-tooltip effect="light" v-if="editId.indexOf(scope.row.id) !== -1" placement="bottom">
                <div slot="content">
                  <p>
                    {{
                      language(
                        'ZUIDUOSHURUXIAOSHUDIANHOUSIWEI',
                        '最多输入小数点后4位'
                      )
                    }}
                  </p>
                </div>
                <iInput type="number" step="0.0001" v-model="scope.row.threshold"></iInput>
              </el-tooltip>
              <span v-else>{{ scope.row.threshold }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="thresholdCompensationLogic" align="center" 
          :label="language('YUZHIXISHU', '阈值系数')">
          <template slot="header" slot-scope="scope">
            <span>{{ language('YUZHIXISHU', '阈值系数') }}<iTooltip :txtInfo="tipList[4]" :num="'5'"></iTooltip></span>
          </template>
          <template slot-scope="scope">
            <el-form-item :prop="
              'tableData.' + scope.$index + '.' + 'thresholdCompensationLogic'
            " :rules="
  formRules.thresholdCompensationLogic
    ? formRules.thresholdCompensationLogic
    : ''
">
              <el-select v-model="scope.row.thresholdCompensationLogic" clearable
                :placeholder="language('QINGSHURU', '请输入')" v-if="editId.indexOf(scope.row.id) !== -1">
                <el-option v-for="item in thresholdCompensationLogic" :key="item.code" :label="item.message"
                  :value="item.code">
                </el-option>
              </el-select>
              <span v-else>{{
                scope.row.thresholdCompensationLogic == 'A'
                ? '全额补差'
                : scope.row.thresholdCompensationLogic == 'B'
                  ? '超额补差'
                  : ''
              }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="compensationRatio" align="center"  :label="language('BUCHABAIFENBI', '补差%')">
          <template slot="header" slot-scope="scope">
            <span>{{ language('BUCHABAIFENBI', '补差%') }}<iTooltip :txtInfo="tipList[6]" :num="'7'"></iTooltip></span>
          </template>
          <template slot-scope="scope">
            <el-form-item :prop="'tableData.' + scope.$index + '.' + 'compensationRatio'" :rules="
              formRules.compensationRatio ? formRules.compensationRatio : ''
            ">
              <iInput type="number" @blur="ratioRules(scope)" v-model="scope.row.compensationRatio"
                v-if="editId.indexOf(scope.row.id) !== -1"></iInput>
              <span v-else>{{ scope.row.compensationRatio?scope.row.compensationRatio+'%':'' }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="compensationPeriod" align="center"  :label="language('BUCHAZHOUQI', '补差周期')">
          <template slot-scope="scope">
            <el-form-item :prop="'tableData.' + scope.$index + '.' + 'compensationPeriod'" :rules="
              formRules.compensationPeriod ? formRules.compensationPeriod : ''
            ">
            <el-select
                v-model="scope.row.compensationPeriod"
                clearable
                :placeholder="language('QINGSHURU', '请输入')"
                v-if="editId.indexOf(scope.row.id) !== -1&&!editTypeNo"
              >
                <el-option
                  v-for="item in compensationPeriod"
                  :key="item.code"
                  :label="item.message"
                  :value="item.code"
                    >
                    </el-option>
                  </el-select>
              <span v-else>{{
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
            </el-form-item>
            
          </template>
        </el-table-column>
        <el-table-column prop="ruleVersion" align="center" width="60" :label="language('版本')">
            <template slot-scope="scope">
              <el-form-item :prop="'tableData.' + scope.$index + '.' + 'ruleVersion'"
                :rules="formRules.ruleVersion ? formRules.ruleVersion : ''">
                <span>{{ scope.row.ruleVersion }}</span>
              </el-form-item>
            </template>
          </el-table-column>
        <!-- ----------------------------------------------------------------------------------------------------------------------- -->
      <template v-if="tableData.some((val)=>{if(val.materialCode.slice(1,6)=='01006') {return true}})">

        <!-- <el-table-column prop="effectFlag" align="center" :label="language('SHIFOUSHENGXIAO', '是否生效')" width="100">
              <template slot-scope="scope">
            <el-form-item :prop="'tableData.' + scope.$index + '.' + 'effectFlag'"
              :rules="formRules.effectFlag ? formRules.effectFlag : ''"> -->
        <!-- <el-select
                v-model="scope.row.effectFlag"
                clearable
                :placeholder="language('QINGSHURU', '请输入')"
                v-if="editId.indexOf(scope.row.id) !== -1"
              >
                <el-option
                  v-for="item in effectFlag"
                  :key="item.code"
                  :label="item.message"
                  :value="item.code"
                    >
                  </el-option>
                </el-select> -->
        <!-- <span>{{
                  scope.row.effectFlag == 1
                  ? '是'
                  : scope.row.effectFlag == 0
                    ? '否'
                    : ''
                }}</span>
                </el-form-item>
              </template>
          </el-table-column> -->

        <!-- <el-table-column prop="materialGroup" align="center" :label="language('MTZCAILIAOZU', 'MTZ-材料组')" width="150">
            <template slot-scope="scope">
              <el-form-item :prop="'tableData.' + scope.$index + '.' + 'materialGroup'"
                :rules="formRules.materialGroup ? formRules.materialGroup : ''">
                <el-select v-model="scope.row.materialGroup" clearable :placeholder="language('QINGSHURU', '请输入')"
                  v-if="editId.indexOf(scope.row.id) !== -1">
                  <el-option v-for="item in materialGroup" :key="item.materialGroupCode" :label="item.materialGroupNameZh"
                    :value="item.materialGroupCode">
                  </el-option>
                </el-select>
                <span v-else>{{ scope.row.materialGroupName }}</span>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="carline" align="center" :label="language('CHEXING', '车型')" width="300">
            <template slot-scope="scope">
              <el-form-item :prop="'tableData.' + scope.$index + '.' + 'carline'"
                :rules="formRules.carline ? formRules.carline : ''" style="width: 180px !important">
                <i-select v-model="scope.row.carlineList" style="width: 180px !important" clearable filterable multiple
                  collapse-tags :placeholder="language('QINGSHURU', '请输入')" v-if="editId.indexOf(scope.row.id) !== -1">
                  <el-option v-for="item in carline" :key="item.modelNameZh" :label="item.modelNameZh"
                    :value="item.modelNameZh">
                  </el-option>
                </i-select>
                <span v-else>{{ scope.row.carline }}</span>
                </el-form-item>
            </template>
          </el-table-column> -->
        <!-- <el-table-column prop="materialName" align="center" width="150" :label="language('YUANCAILIAO', '原材料')">
            <template slot-scope="scope">
                <span>{{ scope.row.materialName }}</span>
              </template>
            </el-table-column> -->
          <el-table-column prop="platinumPrice" align="center" width="120">
            <template slot="header">
              <div>
                <span>{{ language('BOJIJIA', '铂基价') }}</span>
                <el-tooltip effect="light" placement="top">
                  <div slot="content">
                    <p>M01006002-Pt</p>
                    <!-- <p>{{language('xxxxxxxx','xxxxxxxx')}}</p> -->
                  </div>
                  <i class="el-icon-warning-outline margin-left10" style="color: blue"></i>
                </el-tooltip>
              </div>
            </template>
            <template slot-scope="scope">
              <el-form-item :prop="'tableData.' + scope.$index + '.' + 'platinumPrice'"
                :rules="formRules.platinumPrice ? formRules.platinumPrice : ''">
                <iInput type="number" v-model="scope.row.platinumPrice" v-if="editId.indexOf(scope.row.id) !== -1"
                  @change="jijiaCompute(scope.row, $event)"></iInput>
                <span v-else>{{ scope.row.platinumPrice }}</span>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="platinumDosage" align="center" width="130">
            <template slot="header">
              <div>
                <span>{{ language('BOYONGLIANG', '铂用量') }}</span>
                <el-tooltip effect="light" placement="top">
                  <div slot="content">
                    <p>M01006002-Pt</p>
                  </div>
                  <i class="el-icon-warning-outline margin-left10" style="color: blue"></i>
                </el-tooltip>
              </div>
            </template>
            <template slot-scope="scope">
              <el-form-item :prop="'tableData.' + scope.$index + '.' + 'platinumDosage'"
                :rules="formRules.platinumDosage ? formRules.platinumDosage : ''">
                <iInput type="number" v-model="scope.row.platinumDosage" v-if="editId.indexOf(scope.row.id) !== -1"
                  @change="jijiaCompute(scope.row, $event)"></iInput>
                <span v-else>{{ scope.row.platinumDosage }}</span>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="palladiumPrice" align="center" width="120">
            <template slot="header">
              <div>
                <span>{{ language('BAJIJIA', '钯基价') }}</span>
                <el-tooltip effect="light" placement="top">
                  <div slot="content">
                    <p>M01006001-Pd</p>
                  </div>
                  <i class="el-icon-warning-outline margin-left10" style="color: blue"></i>
                </el-tooltip>
              </div>
            </template>
            <template slot-scope="scope">
              <el-form-item :prop="'tableData.' + scope.$index + '.' + 'palladiumPrice'"
                :rules="formRules.palladiumPrice ? formRules.palladiumPrice : ''">
                <iInput type="number" v-model="scope.row.palladiumPrice" v-if="editId.indexOf(scope.row.id) !== -1"
                  @change="jijiaCompute(scope.row, $event)"></iInput>
                <span v-else>{{ scope.row.palladiumPrice }}</span>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="palladiumDosage" align="center" width="130">
            <template slot="header">
              <div>
                <span>{{ language('BAYONGLIANG', '钯用量') }}</span>
                <el-tooltip effect="light" placement="top">
                  <div slot="content">
                    <p>M01006001-Pd</p>
                  </div>
                  <i class="el-icon-warning-outline margin-left10" style="color: blue"></i>
                </el-tooltip>
              </div>
            </template>
            <template slot-scope="scope">
              <el-form-item :prop="'tableData.' + scope.$index + '.' + 'palladiumDosage'" :rules="
                formRules.palladiumDosage ? formRules.palladiumDosage : ''
              ">
                <iInput type="number" v-model="scope.row.palladiumDosage" v-if="editId.indexOf(scope.row.id) !== -1"
                  @change="jijiaCompute(scope.row, $event)"></iInput>
                <span v-else>{{ scope.row.palladiumDosage }}</span>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="rhodiumPrice" align="center" width="120">
            <template slot="header">
              <div>
                <span>{{ language('LAOJIJIA', '铑基价') }}</span>
                <el-tooltip effect="light" placement="top">
                  <div slot="content">
                    <p>M01006003-Rh</p>
                  </div>
                  <i class="el-icon-warning-outline margin-left10" style="color: blue"></i>
                </el-tooltip>
              </div>
            </template>
            <template slot-scope="scope">
              <el-form-item :prop="'tableData.' + scope.$index + '.' + 'rhodiumPrice'"
                :rules="formRules.rhodiumPrice ? formRules.rhodiumPrice : ''">
                <iInput type="number" v-model="scope.row.rhodiumPrice" v-if="editId.indexOf(scope.row.id) !== -1"
                  @change="jijiaCompute(scope.row, $event)"></iInput>
                <span v-else>{{ scope.row.rhodiumPrice }}</span>
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column prop="rhodiumDosage" align="center" width="130">
            <template slot="header">
              <div>
                <span>{{ language('LAOYONGLIANG', '铑用量') }}</span>
                <el-tooltip effect="light" placement="top">
                  <div slot="content">
                    <p>M01006003-Rh</p>
                  </div>
                  <i class="el-icon-warning-outline margin-left10" style="color: blue"></i>
                </el-tooltip>
              </div>
            </template>
            <template slot-scope="scope">
              <el-form-item :prop="'tableData.' + scope.$index + '.' + 'rhodiumDosage'"
                :rules="formRules.rhodiumDosage ? formRules.rhodiumDosage : ''">
                <iInput type="number" v-model="scope.row.rhodiumDosage" v-if="editId.indexOf(scope.row.id) !== -1"
                  @change="jijiaCompute(scope.row, $event)"></iInput>
                <span v-else>{{ scope.row.rhodiumDosage }}</span>
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column prop="preciousMetalDosageUnit" align="center" width="150" :label="
            language('GUIJINSHUYONGLIANGJIJIADANWEI', '贵金属用量&基价单位')
          ">
            <template slot-scope="scope">
              <el-form-item :prop="
                'tableData.' + scope.$index + '.' + 'preciousMetalDosageUnit'
              " :rules="
  formRules.preciousMetalDosageUnit
    ? formRules.preciousMetalDosageUnit
    : ''
">
                <iInput v-model="scope.row.preciousMetalDosageUnit" v-if="editId.indexOf(scope.row.id) !== -1"></iInput>
                <span v-else>{{ scope.row.preciousMetalDosageUnit }}</span>
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column prop="substrateExw" align="center" width="120" :label="
            $t('载体费用')
          ">
            <template slot-scope="scope">
              <el-form-item :prop="
                'tableData.' + scope.$index + '.' + 'substrateExw'
              " :rules="
  formRules.substrateExw
    ? formRules.substrateExw
    : ''
">
                <iInput v-model="scope.row.substrateExw" v-if="editId.indexOf(scope.row.id) !== -1"></iInput>
                <span v-else>{{ scope.row.substrateExw }}</span>
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column prop="substrateImpDuty" align="center" width="120" :label="
            $t('载体税率(%)')
          ">
            <template slot-scope="scope">
              <el-form-item :prop="
                'tableData.' + scope.$index + '.' + 'substrateImpDuty'
              " :rules="
  formRules.substrateImpDuty
    ? formRules.substrateImpDuty
    : ''
">
                <iInput v-model="scope.row.substrateImpDuty" v-if="editId.indexOf(scope.row.id) !== -1"></iInput>
                <span v-else>{{ scope.row.substrateImpDuty }}</span>
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column prop="substrateHandling" align="center" width="120" :label="
            $t('载体管理费率(%)')
          ">
            <template slot-scope="scope">
              <el-form-item :prop="
                'tableData.' + scope.$index + '.' + 'substrateHandling'
              " :rules="
  formRules.substrateHandling
    ? formRules.substrateHandling
    : ''
">
                <iInput v-model="scope.row.substrateHandling" v-if="editId.indexOf(scope.row.id) !== -1"></iInput>
                <span v-else>{{ scope.row.substrateHandling }}</span>
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column prop="pgmHandling" align="center" width="120" :label="
            $t('贵金属管理费率(%)')
          ">
            <template slot-scope="scope">
              <el-form-item :prop="
                'tableData.' + scope.$index + '.' + 'pgmHandling'
              " :rules="
  formRules.pgmHandling
    ? formRules.pgmHandling
    : ''
">
                <iInput v-model="scope.row.pgmHandling" v-if="editId.indexOf(scope.row.id) !== -1"></iInput>
                <span v-else>{{ scope.row.pgmHandling }}</span>
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column prop="manufacture" align="center" width="120" :label="
            $t('制造费用')
          ">
            <template slot-scope="scope">
              <el-form-item :prop="
                'tableData.' + scope.$index + '.' + 'manufacture'
              " :rules="
  formRules.manufacture
    ? formRules.manufacture
    : ''
">
                <iInput v-model="scope.row.manufacture" v-if="editId.indexOf(scope.row.id) !== -1"></iInput>
                <span v-else>{{ scope.row.manufacture }}</span>
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column prop="transport" align="center" width="120" :label="
            $t('运输费用')
          ">
            <template slot-scope="scope">
              <el-form-item :prop="
                'tableData.' + scope.$index + '.' + 'transport'
              " :rules="
  formRules.transport
    ? formRules.transport
    : ''
">
                <iInput v-model="scope.row.transport" v-if="editId.indexOf(scope.row.id) !== -1"></iInput>
                <span v-else>{{ scope.row.transport }}</span>
              </el-form-item>
            </template>
          </el-table-column>

        </template>

    </el-table>
  </el-form>
  <!-- <iPagination @size-change="handleSizeChange($event, getTableList)"
                   @current-change="handleCurrentChange($event, getTableList)"
                   :page-sizes="page.pageSizes"
                   :page-size="page.pageSize"
                   :current-page="page.currPage"
                       :total="page.totalCount"
                       :layout="page.layout">
          </iPagination> -->

    <iDialog :title="language('SHUJUYANYONG', '数据沿用')" :visible.sync="mtzAddShow" v-if="mtzAddShow" width="90%"
      @close="closeDiolog">
      <continueBox :mtzAddShowNum="mtzAddShowNum" @addDialogData="addDialogDataList"></continueBox>
    </iDialog>

    <iDialog :title="language('XINZENGMTZYUANCAILIAOGUIZE', '新增MTZ原材料规则')" :visible.sync="addDialog" v-if="addDialog"
      width="70%" @close="saveGzDialog">
      <!-- :dataObject="dataObject" -->
      <addGZ :avgPeriodList="avgPeriodList" :offsetList="offsetList" :resetType="resetType" @close="saveGzClose" @addDialogGZ="addDialogGZList">
      </addGZ>
    </iDialog>
  </iCard>
</template>

<script>
import {
  iCard,
  iButton,
  iPagination,
  icon,
  iMessage,
  iMessageBox,
  iInput,
  iDatePicker,
  iDialog,
  iSelect
} from 'rise'
import iTooltip from "./iTooltip";

// import { pageMixins } from "@/utils/pageMixins"
import continueBox from './continueBox'
import addGZ from './addGZ'
import { deepClone, isNumber } from './util'
import { formRulesGZ, tipList,partBalanceCountTypeList,methodList } from './data'
import store from '@/store'
// import {
//   getMtzSupplierList,//获取原材料牌号
// } from '@/api/mtz/annualGeneralBudget/mtzReplenishmentOverview';

import {
  pageAppRule, //维护MTZ原材料规则-分页查询
  addBatchAppRule, //维护MTZ原材料规则-批量新增
  upAppRule,
  deleteAppRule, //列表删除,
  modifyAppRule,
  // checkPreciousMetal,
  getMtzMarketSourceList,
  getFirstRuleByNos
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/details'
import {
  cartypePaged, //车型
  currencyDict
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/firstDetails'
// import { getRawMaterialNos } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/supplementary/details';
import {
  fetchRemoteMtzMaterial //查询MTZ材料组
} from '@/api/mtz/annualGeneralBudget/annualBudgetEdit'

export default {
  name: 'Search',
  componentName: 'theTabs',
  components: {
    iTooltip,
    iCard,
    iButton,
    iPagination,
    iInput,
    iDatePicker,
    continueBox,
    iDialog,
    iSelect,
    addGZ
  },
  watch: {},
  props: {
    appStatus:{type: String},
    flowType:{type: String},
    relationType:{type: String},
    avgPeriodList: { type: Array, default: () => [] },
    offsetList: { type: Array, default: () => [] },
  },
  //   mixins: [pageMixins],
  data() {
    return {
      methodList,
      partBalanceCountTypeList,
      tipList,
      isTitle: false,
      tcCurrence: [],
      formRules: formRulesGZ,
      // dataObject: [],
      // supplierList: [],
      newDataList: [], //传过来的列表数据
      editType: false,
      tableData: [],
      editId: '',
      selectList: [],
      loading: false,
      listData: {},
      selectData: {},
      editTypeNo : false,
      effectFlag: [
        {
          code: 0,
          message: '否'
        },
        {
          code: 1,
          message: '是'
        }
      ],
      compensationPeriod: [
        { code: 'A', message: '年度' },
        { code: 'H', message: '半年度' },
        { code: 'Q', message: '季度' },
        { code: 'M', message: '月度' }
      ],
      thresholdCompensationLogic: [
        {
          code: 'A',
          message: '全额补差'
        },
        {
          code: 'B',
          message: '超额补差'
        }
      ],
      priceMeasureUnit: [
        //基价计量单位
        {
          code: '0',
          message: 'KG'
        }
      ],
      getMtzMarketSourceList: [], //市场价来源
      materialGroup: [],
      // materialCode: [],
      mtzAddShow: false,
      addDialog: false,

      dialogEditType: false, //判断是否是沿用过来的数据
      carline: [], //车型
      resetNum: false,
      startDate: '',
      endDate: '',
      mtzAddShowNum: '0',
      pickerOptionsStar: {
        disabledDate: time => {
          let starDateVal = this.startDate;
          if (starDateVal) {
            return time.getTime() < new Date(starDateVal).getTime() - 86400000;
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          let endDateVal = this.endDate;
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime();
          }
        }
      }
    }
  },
  computed: {
    mtzObject() {
      return this.$store.state.location.mtzObject
    },
    isEditNew: function () {
      const appStatusArr=['草稿','已提交','未通过','通过','复核未通过','M退回']
      return (this.appStatus == '草稿' || this.appStatus == '未通过')||(((this.flowType=='SIGN'||this.flowType=='FILING')&&this.appStatus=='已提交')||(appStatusArr.indexOf(this.appStatus)>0&&this.flowType=="MEETING"))
    },
  },

  watch: {
    mtzObject(newVlue, oldValue) {
      // console.log(newVlue)
      this.init()
    }
  },
  created() {
    console.log('M01006004-PGM'.slice(1,7))

    console.log('M01006004-PGM'.slice(1,7)=='01006')
    this.init()
    // getMtzSupplierList({}).then(res => {
    //   this.supplierList = res.data;
    // })
    // getRawMaterialNos({}).then(res => {
    //   this.materialCode = res.data;
    // })
    cartypePaged({
      current: 1,
      size: 99999
    }).then((res) => {
      this.carline = res.data
    })
    currencyDict().then((res) => {
      this.tcCurrence = res.data
    })
    getMtzMarketSourceList({}).then((res) => {
      this.getMtzMarketSourceList = res.data
    })
  },
  methods: {
    init() {
      this.getTableList()
      this.getMtzCailiao()
    },
    sourceChange(e, val) {
      this.$set(e, 'source', val)
    },
    chaneDate(val, row) {
      console.log(val)
      console.log(row)
      getFirstRuleByNos([row.ruleNo]).then(res => {
        const { startDate, endDate } = res.data[row.ruleNo]
        console.log(res.data[row.ruleNo])
        this.startDate = startDate
        this.endDate = endDate

      })
    },
    add() {
      //新增
      if (this.flowType !== 'SIGN') {
        this.addDialog = true
        // var list = [];
        // this.tableData.forEach(e => {
        //   list.push({
        //     supplierId: e.supplierId || "",
        //     materialCode: e.materialCode || "",
        //     price: e.price || "",
        //     startDate: e.startDate || "",
        //     endDate: e.endDate || ""
        //   })
        // })
        // this.dataObject = list;
      } else {
        iMessageBox(
          this.language(
            'XZMTZYCLGZSSQDLXBNWLZJXTJHCZSQDLXBQXYGLDLJDDSQDSFQRTJ',
            '新增MTZ原材料规则时，申请单类型不能为流转，继续添加会重置申请单类型，并取消已关联的零件定点申请单，是否确认添加？'
          ),
          this.language('LK_WENXINTISHI', '温馨提示'),
          {
            confirmButtonText: this.language('QUEREN', '确认'),
            cancelButtonText: this.language('QUXIAO', '取消')
          }
        ).then((res) => {
          // iMessage.success(this.language("KAIFAZHONG","开发中"))
          this.addDialog = true
          // var list = [];
          // this.tableData.forEach(e => {
          //   list.push({
          //     supplierId: e.supplierId || "",
          //     materialCode: e.materialCode || "",
          //     price: e.price || "",
          //     startDate: e.startDate || "",
          //     endDate: e.endDate || "",
          //   })
          // })
          // this.dataObject = list;
          this.resetNum = true //流转
        })
      }
    },
    addDialogGZList() {
      //mtz申请单类型或已关联申请单类型为流转备案/新增原材料规则
      // console.log(this.resetNum);
      if (this.resetNum) {
        //流转
        this.$emit('handleReset', '')
        this.$parent.$refs.theDataTabs.removePartMasterData()
        this.resetNum = false
        setTimeout(() => {
          this.$parent.$refs.theDataTabs.pageAppRequest()
          if (!this.$parent.$refs.theDataTabs.editType) {
            this.$parent.$refs.theDataTabs.getTableList()
          }
        }, 500)
      } else {
        //上会、备案
        setTimeout(() => {
          this.$parent.$refs.theDataTabs.pageAppRequest()
          if (!this.$parent.$refs.theDataTabs.editType) {
            this.$parent.$refs.theDataTabs.getTableList()
          }
        }, 500)
      }
      this.saveGzDialog()
      this.getTableList()
    },
    edit() {
      //编辑
      if (this.selectList.length > 0) {
        this.oldData = JSON.parse(JSON.stringify(this.tableData))
        this.editTypeNo = true
        this.editType = true
        var changeArrayList = []
        this.selectList.forEach((item) => {
          if(item.formalFlag!='Y'){
            changeArrayList.push(item.id)
          }
          // checkPreciousMetal({code:item.materialCode}).then(res=>{
          //     this.$set(item,"metalType",res.data)
          // })
        })
        this.editId = changeArrayList
        this.dialogEditType = false
      } else {
        iMessage.error('请选择需要修改数据！')
      }
    },

    save() {
      let newDataList = JSON.parse(JSON.stringify(this.newDataList))
      let selectList = JSON.parse(JSON.stringify(this.selectList))
      //保存
      if (this.dialogEditType) {
        //新增
        newDataList.forEach((item) => {
          item.carline = item.carlineList.toString()
          // item.startDate = item.startDate + " 00:00:00";
          // item.endDate = item.endDate + " 00:00:00";
          // item.compensationPeriod = "A";
        })
        this.$refs['contractForm'].validate(async (valid) => {
          if (valid) {
            iMessageBox(
              this.language(
                'GZFSBHXGLJJTBGGSFJX',
                '规则发生变化，相关零件将同步更改，是否继续？'
              ),
              this.language('LK_WENXINTISHI', '温馨提示'),
              {
                confirmButtonText: this.language('QUEREN', '确认'),
                cancelButtonText: this.language('QUXIAO', '取消')
              }
            )
              .then((res) => {
                if (this.mtzAddShowNum == '1') {
                  newDataList.forEach(val => {
                    val.mtzAppId = this.$route.query.mtzAppId||
                      JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId
                      val.compensationRatio = val.compensationRatio / 100
                  })
                  upAppRule(newDataList).then((res) => {
                    if (res.code == 200) {
                      iMessage.success(this.language(res.desEn, res.desZh))
                      this.editId = ''
                      this.editType = false
                      this.editTypeNo = false
                      setTimeout(() => {
                        this.$parent.$refs.theDataTabs.pageAppRequest()
                        if (!this.$parent.$refs.theDataTabs.editType) {
                          this.$parent.$refs.theDataTabs.getTableList()
                        }
                      }, 500)

                      this.getTableList()
                    } else {
                      iMessage.error(this.language(res.desEn, res.desZh))
                    }
                  })
                } else {
                  addBatchAppRule({
                    mtzAppId:
                      this.$route.query.mtzAppId ||
                      JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId,
                    mtzAppNomiAppRuleList: newDataList.map(val=>{
                      val.compensationRatio = val.compensationRatio / 100
                      return val
                    })
                  }).then((res) => {
                    if (res.code == 200) {
                      iMessage.success(this.language(res.desEn, res.desZh))
                      this.editId = ''
                      this.editTypeNo = false
                      this.editType = false
                      // this.page.currPage = 1;
                      // this.page.pageSize = 10;
                      setTimeout(() => {
                        this.$parent.$refs.theDataTabs.pageAppRequest()
                        if (!this.$parent.$refs.theDataTabs.editType) {
                          this.$parent.$refs.theDataTabs.getTableList()
                        }
                      }, 500)

                      this.getTableList()
                    } else {
                      iMessage.error(this.language(res.desEn, res.desZh))
                      // this.newDataList.forEach(item=>{
                      //     item.startDate = item.startDate.split(" ")[0];
                      //     item.endDate = item.endDate.split(" ")[0];
                      // })
                    }
                  })
                }

              })
              .catch((res) => {
                // this.newDataList.forEach(item=>{
                //     item.startDate = item.startDate.split(" ")[0];
                //     item.endDate = item.endDate.split(" ")[0];
                // })
              })
            this.$refs['contractForm'].clearValidate()
          } else {
            iMessage.error(
              this.language('QINGBUQUANYANZHENGBITIANXIANG', '请补全验证必填项')
            )
            return false
          }
        })
      } else {
        //编辑
        selectList.forEach((item) => {
          item.carline = item.carlineList.toString()
        })
        this.$refs['contractForm'].validate(async (valid) => {
          if (valid) {
            iMessageBox(
              this.language(
                'GZFSBHXGLJJTBGGSFJX',
                '规则发生变化，相关零件将同步更改，是否继续？'
              ),
              this.language('LK_WENXINTISHI', '温馨提示'),
              {
                confirmButtonText: this.language('QUEREN', '确认'),
                cancelButtonText: this.language('QUXIAO', '取消')
              }
            ).then((res) => {
              modifyAppRule({
                mtzAppId:
                  this.$route.query.mtzAppId ||
                  JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId,
                mtzAppNomiAppRuleList: selectList.map(val=>{
                  val.compensationRatio = val.compensationRatio / 100
                  return val
                })
                
              }).then((res) => {
                if (res.code == 200) {
                  this.editId = ''
                  this.editType = false
                  this.editTypeNo = false
                  setTimeout(() => {
                    this.$parent.$refs.theDataTabs.pageAppRequest()
                    if (!this.$parent.$refs.theDataTabs.editType) {
                      this.$parent.$refs.theDataTabs.getTableList()
                    }
                  }, 500)

                  this.getTableList()
                } else {
                  iMessage.error(res.message)
                }
              })
            })
            this.$refs['contractForm'].clearValidate()
          } else {
            iMessage.error(
              this.language('QINGBUQUANYANZHENGBITIANXIANG', '请补全验证必填项')
            )
            return false
          }
        })
      }
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
    cancel() {
      //取消
      var that = this
      iMessageBox(
        this.language('SHIFOUQUXIAOBIANJI', '是否取消编辑？'),
        this.language('LK_WENXINTISHI', '温馨提示'),
        {
          confirmButtonText: this.language('QUEREN', '确认'),
          cancelButtonText: this.language('QUXIAO', '取消')
        }
      )
        .then((res) => {
          this.editType = false
          this.editTypeNo = false
          if (this.dialogEditType) {
            this.tableData = JSON.parse(JSON.stringify(this.oldData))
            // this.editId.forEach((e) => {
            //   this.tableData.splice(0, 1)
            // })
            this.dialogEditType = false
          } else {
            this.getTableList()
          }
        })
        .then((res) => {
          this.editId = ''
          this.$refs['contractForm'].clearValidate()
        })
        .catch((res) => { })
    },
    jijiaCompute(arr, val) {
      // if (
      //   isNumber(arr.platinumPrice) &&
      //   isNumber(arr.platinumDosage) &&
      //   isNumber(arr.palladiumPrice) &&
      //   isNumber(arr.palladiumDosage) &&
      //   isNumber(arr.rhodiumPrice) &&
      //   isNumber(arr.rhodiumDosage)
      // ) {
      //   console.log('计算出基价值')
      //   arr.price = '99.9'
      // } else {
      //   iMessage.error('请填写完')
      // }
    },
    continueBtn() {
      this.oldData = JSON.parse(JSON.stringify(this.tableData))
      //沿用
      this.mtzAddShowNum = '0'
      this.mtzAddShow = true
    },
    upRuleBtn() {
      this.oldData = JSON.parse(JSON.stringify(this.tableData))
      this.mtzAddShowNum = '1'
      this.mtzAddShow = true
    },
    addDialogDataList(val) {
      //沿用
      console.log(val)
      val.forEach((item) => {
        item.compensationRatio = item.compensationRatio * 100
        // item.source = item.sourceType;
        this.$set(item, 'source', item.sourceType)
        // if(item.preciousMetalDosageUnit == ""){
        //   this.$set(item,"preciousMetalDosageUnit","OZ")
        // }
        item.ruleId = item.id
        item.formalFlag = 'Y'
        delete item.sourceType
        delete item.id
        if (item.carline == null) {
          item.carlineList = []
          item.carline = ''
        } else {
          item.carlineList = item.carline.split(',')
        }
        // checkPreciousMetal({code:item.materialCode}).then(res=>{
        // })
      })
      this.newDataList = val
      this.closeDiolog()
      this.tableData.unshift(...this.newDataList)
      console.log(this.tableData)
      this.editType = true
      var changeArrayList = []
      this.$refs.moviesTable.clearSelection()
      this.newDataList.forEach((item) => {
        changeArrayList.push(item.id)
        this.$refs.moviesTable.toggleRowSelection(item, true)
      })
      if (this.mtzAddShowNum == '1') {
        this.editId = changeArrayList
      }
      this.dialogEditType = true
    },
    delecte() {
      //删除
      if (!this.selectList.length) return iMessage.warn('请选择需要删除的数据')
      // console.log(this.$parent.$refs)
      iMessageBox(
        this.language('SHIFOUSHANCHU', '是否删除？'),
        this.language('LK_WENXINTISHI', '温馨提示'),
        {
          confirmButtonText: this.language('QUEREN', '确认'),
          cancelButtonText: this.language('QUXIAO', '取消')
        }
      )
        .then((res) => {
          var numList = []
          this.selectList.forEach((e) => {
            numList.push(e.id)
          })
          deleteAppRule({
            idList: numList
          }).then((res) => {
            if (res.code == 200 && res.result) {
              iMessage.success(res.desZh)
              setTimeout(() => {
                this.$parent.$refs.theDataTabs.pageAppRequest()
                if (!this.$parent.$refs.theDataTabs.editType) {
                  this.$parent.$refs.theDataTabs.getTableList()
                }
              }, 500)

              this.getTableList()
            } else {
              iMessage.error(res.desZh)
            }
          })
        })
        .catch((res) => { })
    },
    saveClose() {
      this.closeDiolog()
    },
    closeDiolog() {
      this.mtzAddShow = false
    },

    saveGzDialog() {
      this.addDialog = false
    },
    saveGzClose() {
      this.saveGzDialog()
    },
    selectionType(row) {
      if (this.editType == true) {
        return false
      } else {
        return true
      }
    },
    //获取列表
    getTableList() {
      this.loading = true
      pageAppRule({
        pageNo: 1,
        pageSize: 99999,
        mtzAppId:
          this.$route.query.mtzAppId ||
          JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId,
        sortType: 'DESC',
        sortColumn: 'id'
      }).then((res) => {
        this.tableData = res.data.map(item=>{
          item.compensationRatio = item.compensationRatio * 100
          return item
        })
        var num = 0
        res.data.forEach((e) => {
          // if (!e.formalFlag) {
          if (e.formalFlag == 'N') {
            num++
          }
        })
        this.$emit('isNomiNumber', num)
        this.loading = false
        if (res.total < 1) {
          store.commit('submitDataNumber', 0)
        } else {
          store.commit('submitDataNumber', 1)
        }
      })
    },
    getMtzCailiao() {
      fetchRemoteMtzMaterial({}).then((res) => {
        this.materialGroup = res.data
      })
    },
    handleSelectionChange(val) {
      console.log(val)
      this.selectList = val
    },
    // supplierBH (arr, value) {
    //   var str = arr.row;
    //   if (value == "") {
    //     str.supplierName = "";
    //     str.supplierId = "";
    //   }
    //   try {
    //     this.supplierList.forEach(e => {
    //       if (e.code == value) {
    //         str.supplierName = e.message;
    //         str.supplierId = value;
    //         throw new Error("EndIterative");
    //       }
    //     });
    //   } catch (e) {
    //     if (e.message != "EndIterative") throw e;
    //   }
    // },
    // supplierNC (arr, value) {
    //   var str = arr.row;
    //   if (value == "") {
    //     str.supplierName = "";
    //     str.supplierId = "";
    //   }
    //   try {
    //     this.supplierList.forEach(e => {
    //       if (e.message == value) {
    //         str.supplierName = value;
    //         str.supplierId = e.code;
    //         throw new Error("EndIterative");
    //       }
    //     });
    //   } catch (e) {
    //     if (e.message != "EndIterative") throw e;
    //   }
    // },
    // MaterialGrade(arr,value){
    //     var str = arr.row;
    //     checkPreciousMetal({code:value}).then(res=>{
    //         str.metalType = res.data;
    //     })
    //     try{
    //         this.materialCode.forEach(e => {
    //             if(e.code == value){
    //                 str.materialName = e.message;
    //                 throw new Error("EndIterative");
    //             }
    //         });
    //     }catch(e){
    //         if(e.message != "EndIterative") throw e;
    //     }
    // },
    ratioRules(arr) {
      var str = arr.row
      if (str.compensationRatio < 0 || str.compensationRatio > 100) {
        iMessage.error('百分比只能大于等于0且小于等于100')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.link {
  color: #1763f7;
  cursor: pointer;
}
::v-deep.el-button--default{
  font-size: 20px!important;
}
::v-deep.el-table .cell {
  line-height: 0;
  padding: 0px 4px;
  font-size: 18px;
}

.formStyle ::v-deep.el-form-item__content {
  line-height: normal !important;
  font-size: 18px;
}
.formStyle ::v-deep.el-table th {
  position:relative;
}
.formStyle ::v-deep.el-table th > .cell{
  height:100%;
  position:static;
  .numIcon{
    position:absolute;
    bottom:0px;
    left:calc(50% - 10px);
  }
  .logIcon{
    position:absolute;
    bottom:0px;
    left:calc(50% - 10px);
  }
}

::v-deep.el-table th>.cell {
  white-space: normal;
  padding: 0px 4px;
  line-height: normal;
}

.formStyle ::v-deep .el-form-item {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}

.formStyle {
  position: relative;

}

.btn {
  position: absolute;
  right: -10px;
  top: 20px;
  z-index: 100;
}

::v-deep .el-select__tags {
  max-width: 100% !important;
}

::v-deep .el-table .el-table__row .el-input {
  width: 100% !important;
}

::v-deep.el-button--mini.is-circle {
  padding: 3px 4px;
}
</style>
<style lang="scss">
.el-table__fixed-body-wrapper,
.el-table__fixed-header-wrapper {
  background: #fff;
}

::v-deep.el-table .cell {}

.font18_b {
  font-size: 18px;
  font-weight: bold;
}
.centerBox {
  margin: 20px 0;
  p{
    font-size: 18px;
  }
  .enStyle{
    display:flex;
    justify-content:space-between;
  }
}
</style>
