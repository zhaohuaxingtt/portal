<!-- 维护MTZ零件主数据表格 -->
<template>
  <iCard class="margin-top20">
    <template v-slot:header>
      <span class="font18_b">
        {{ language('WHMTZLLZSJ', '维护MTZ零件主数据') }}
      </span>
      <div>
        <el-upload
          class="upload-demo"
          style="display: inline-block; margin-right: 10px"
          multiple
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="uploadSuccess"
          :on-progress="uploadProgress"
          :data="uploadData"
          :before-upload="beforeUpload"
          :on-exceed="handleExceed"
          :headers="{
            token: getToken()
          }"
          v-permission="PORTAL_MTZ_POINT_INFOR_DATA_SHANGCHUAN"
          v-if="!editType && isEditNew"
        >
          <el-tooltip
            :content="
              language('WENJIANDAXIAOBUCHAOGUO20MB', '文件大小不超过20MB')
            "
            placement="top"
            effect="light"
          >
            <iButton>{{ language('SHANGCHUANFUJIAN', '上传附件') }}</iButton>
          </el-tooltip>
        </el-upload>
        <iButton
          @click="download"
          v-permission="PORTAL_MTZ_POINT_INFOR_DATA_XIAZAIMUBAN"
          v-if="!editType && isEditNew"
          >{{ language('XIAZAIMUBAN', '下载模板') }}</iButton
        >
        <iButton
          @click="cancel"
          v-if="editType && isEditNew"
          >{{ language('QUXIAO', '取消') }}</iButton
        >
        <iButton
          @click="rfqClick"
          v-permission="PORTAL_MTZ_POINT_INFOR_DATA_YINYONGRFQ"
          v-if="!editType && isEditNew"
          >{{ language('YYRFQZLJ', '引用RFQ中零件') }}</iButton
        >
        <iButton
          @click="locationClick"
          v-permission="PORTAL_MTZ_POINT_INFOR_DATA_YYDDSQDLJ"
          v-if="!editType && isEditNew"
          >{{ language('YYDDSQDLJ', '引用定点申请单零件') }}</iButton
        >
        <iButton
          @click="historyClick"
          v-permission="PORTAL_MTZ_POINT_INFOR_DATA_ZJLSMTZLJZSJ"
          v-if="!editType && isEditNew"
          >{{ language('ZJLSMTZLJZSJ', '增加历史MTZ零件主数据') }}</iButton
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
    <el-form
      :rules="formRules"
      :model="{ tableData }"
      ref="contractForm"
      class="formStyle"
    >
    <!-- <div class="btn">
        <span type="primary" size="mini" circle @click="isTitle=!isTitle">{{isTitle?'-':'+'}}</span>
      </div> -->
      <el-table
        :data="tableData"
        ref="moviesTable"
        v-loading="loading"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          :selectable="selectionType"
          fixed
          width="40"
          align="center"
        >
        </el-table-column>
        <el-table-column label="#" fixed type="index" width="40" align="center">
        </el-table-column>
        <el-table-column
          prop="assemblyPartnum"
          align="center"
          
          width="120"
          :label="language('LINGJIANHAO', '零件号')"
        >
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.' + 'assemblyPartnum'"
              :rules="
                formRules.assemblyPartnum ? formRules.assemblyPartnum : ''
              "
            >
              <!-- <iInput v-model="scope.row.assemblyPartnum" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
              <span>{{ scope.row.assemblyPartnum }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="partName"
          align="center"
          
          :label="language('LINGJIANMINGCHENG', '零件名称')"
          width="90"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.partName }}</span>
          </template>
        </el-table-column>
    
        <el-table-column
          prop="partUnit"
          align="center"
          :label="language('LINGJIANSHULIANGDANWEI', '零件数量单位')"
          
        >
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.' + 'partUnit'"
              :rules="formRules.partUnit ? formRules.partUnit : ''"
            >
              <!-- <iInput v-model="scope.row.partUnit" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
              <span>{{ scope.row.partUnit }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="priceUnit"
          align="center"
          :label="language('MEI', '每')"
          
          width="50"
        >
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.' + 'priceUnit'"
              :rules="formRules.priceUnit ? formRules.priceUnit : ''"
            >
              <iInput
                v-model="scope.row.priceUnit"
                v-if="editId.indexOf(scope.row.id) !== -1"
              ></iInput>
              <span v-else>{{ scope.row.priceUnit }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="dosage"
          align="center"
          width="80"
          :label="language('YONGLIANG', '用量')"
          
        >
        <template slot="header" slot-scope="scope">
            <span>{{language('YONGLIANG', '用量')}}<iTooltip :txtInfo="tipList[5]" :num="'6'"></iTooltip></span>
          </template>
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.' + 'dosage'"
              :rules="formRules.dosage ? formRules.dosage : ''"
            >
              <iInput
                v-model="scope.row.dosage"
                v-if="editId.indexOf(scope.row.id) !== -1"
              ></iInput>
              <span v-else>{{ scope.row.dosage }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="dosageMeasureUnit"
          align="center"
          :label="language('YONGLIANGJILIANGDANEWI', '用量计量单位')"
          
        >
    
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.' + 'dosageMeasureUnit'"
              :rules="
                formRules.dosageMeasureUnit ? formRules.dosageMeasureUnit : ''
              "
            >
              <el-select
                v-model="scope.row.dosageMeasureUnit"
                clearable
                filterable
                :placeholder="language('QINGSHURU', '请输入')"
                v-if="
                  editId.indexOf(scope.row.id) !== -1 &&
                  scope.row.priceMeasureUnit !== 'PC'
                "
              >
                <el-option
                  v-for="item in dosageMeasureUnit"
                  :key="item.code"
                  :label="item.code"
                  :value="item.code"
                >
                </el-option>
              </el-select>
              <span v-else>{{ scope.row.dosageMeasureUnit }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="materialDoseSource"
          align="center"
          :label="language('原材料用量来源', '原材料用量来源')"
          :width="'140'"
        >
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.' + 'materialDoseSource'"
              :rules="formRules.materialDoseSource ? formRules.materialDoseSource : ''"
            >
            <el-select
                v-model="scope.row.materialDoseSource"
                clearable
                :placeholder="language('QINGSHURU', '请输入')"
                v-if="
                  editId.indexOf(scope.row.id) !== -1 &&
                  scope.row.priceMeasureUnit !== 'PC'
                "
              >
                <el-option
                  v-for="item in materialDoseSourceList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                >
                </el-option>
              </el-select>
              <span v-else>{{ scope.row.materialDoseSource?materialDoseSourceList.find(val=>val.code==scope.row.materialDoseSource).name:'' }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="startDate"
          align="center"
          :label="language('YOUXIAOQIQI', '有效期起')"
          
        >
          <template slot-scope="scope">
            <iDatePicker
            value-format="yyyy-MM-dd"
            @focus="chaneDate($event, scope.row)"
            :picker-options="pickerOptionsStar"
             v-model="scope.row.startDate"
                                style="width: 180px!important;"
                                type="datetime"
                                v-if="editId.indexOf(scope.row.id)!==-1"
                                >
                    </iDatePicker>
            <span v-else>{{ scope.row.startDate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="endDate"
          align="center"
          :label="language('YOUXIAOQIZHI', '有效期止')"
          
        >
          <template slot-scope="scope">
            <iDatePicker 
            value-format="yyyy-MM-dd"
            @focus="chaneDate($event, scope.row)"
            :picker-options="pickerOptionsEnd"
            v-model="scope.row.endDate"
                                style="width: 180px!important;"
                                type="datetime"
                                v-if="editId.indexOf(scope.row.id)!==-1"
                                >
                    </iDatePicker>
            <span v-else>{{ scope.row.endDate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="ruleNo"
          align="center"
          :label="language('GUIZEBIANHAO', '规则编号')"
          
          width="110"
        >
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.' + 'ruleNo'"
              :rules="formRules.ruleNo ? formRules.ruleNo : ''"
            >
              <el-tooltip
                effect="light"
                v-if="editId.indexOf(scope.row.id) !== -1"
                placement="right"
              >
                <div slot="content">
                  <p>
                    {{
                      language(
                        'GZBHBXCZYSMYCLGZBGZ',
                        '规则编号必须存在于上面原材料规则表格中'
                      )
                    }}
                  </p>
                </div>
                <el-select
                  v-model="scope.row.ruleNo"
                  clearable
                  :placeholder="language('QINGSHURU', '请输入')"
                  @change="choiseGZ(scope, $event)"
                >
                  <el-option
                    v-for="item in ruleNo"
                    :key="item.id"
                    :label="item.ruleNo"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-tooltip>
              <span v-else>{{ scope.row.ruleNo }}</span>
            </el-form-item>
          </template>
        </el-table-column>
   
        <!-- <el-table-column prop="method" align="center"  width="90" :label="language('补差方式')">
          <template slot-scope="scope">
            <el-form-item :prop="'tableData.' + scope.$index + '.' + 'method'"
              :rules="formRules.method ? formRules.method : ''">
              <span>{{ scope.row.method=='1'?'一次性补差':scope.row.method=='2'?'变价单补差':'' }}</span>
            </el-form-item>
          </template>
        </el-table-column> -->
        <!-- <el-table-column
          prop="method"
          align="center"
          :label="language('补差方式', '补差方式')"
          show-overflow-tooltip
          width="130"
        >
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.' + 'method'"
              :rules="formRules.method ? formRules.method : ''"
            >
                <el-select
                  v-model="scope.row.method"
                  v-if="editId.indexOf(scope.row.id) !== -1"
                  clearable
                  :placeholder="language('QINGSHURU', '请输入')"
                  @change="choiseGZ(scope, $event)"
                >
                  <el-option
                    v-for="item in methodList"
                    :key="item.code"
                    :label="item.message"
                    :value="item.code"
                  >
                  </el-option>
                </el-select>
              <span v-else>{{ scope.row.method == '1' ? language('一次性补差','一次性补差') : scope.row.method == '2' ? language('变价单补差','变价单补差') : '' }}</span>
            </el-form-item>
          </template>
        </el-table-column> -->
        <el-table-column
          prop="sapCode"
          align="center"
          :label="language('LK_GONGYINGSHANG', '供应商')"
          :width="isTitle?'140':'140'"
        >
          <!-- supplierName供应商名称 -->
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.' + 'sapCode'"
              :rules="formRules.sapCode ? formRules.sapCode : ''"
            >
              <!-- <el-select v-model="scope.row.supplierId"
                                clearable
                                filterable
                                :disabled="true"
                                v-if="editId.indexOf(scope.row.id)!==-1"
                                :placeholder="language('QINGSHURU', '请输入')"
                                >
                            <el-option
                                v-for="item in supplierList"
                                :key="item.code"
                                :label="item.codeMessage"
                                :value="item.code">
                            </el-option>
                        </el-select> -->
              <span>{{ scope.row.sapCode }}/{{ scope.row.supplierName }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="materialCode"
          align="center"
          :label="language('YUANCAILIAO', '原材料')"
          :width="isTitle?'140':'200'"

        >
          <template slot-scope="scope">
            <!-- <el-select v-model="scope.row.materialCode"
                            clearable
                            :disabled="true"
                            :placeholder="language('QINGSHURU', '请输入')"
                            v-if="editId.indexOf(scope.row.id)!==-1"
                            >
                        <el-option
                            v-for="item in materialCode"
                            :key="item.code"
                            :label="item.codeMessage"
                            :value="item.code">
                        </el-option>
                    </el-select> -->
            <span class='link' @click="openPageMarket(scope.row)">{{ scope.row.materialCode }}-{{ scope.row.materialName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          align="center"
          width="80"
          :label="language('JIJIA', '基价')"
          
        >
          <template slot-scope="scope">
            <!-- <iInput :disabled="true" v-model="scope.row.price" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
            <span>{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="tcCurrence"
          align="center"
          width="60"
          :label="language('HUOBI', '货币')"
          
        >
          <template slot-scope="scope">
            <!-- <iInput v-model="scope.row.tcCurrence" :disabled="true" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
            <span>{{ scope.row.tcCurrence }}</span>
          </template>
        </el-table-column>

<!-- ----------------------------------------------------------------------------------------------------------------------- -->

<!-- v-if="isTitle" -->
<template >
        <el-table-column
          prop="tcExchangeRate"
          align="center"
          width="120"
          :label="language('HUILV', '汇率')"
          
        >
          <template slot-scope="scope">
            <!-- <iInput v-model="scope.row.tcExchangeRate" :disabled="true" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
            <span>{{ scope.row.tcExchangeRate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="priceMeasureUnit"
          align="center"
          width="120"
          :label="language('JIJIAJILIANGDANWEI', '基价计量单位')"
          
        >
          <template slot-scope="scope">
            <!-- <iInput v-model="scope.row.priceMeasureUnit" :disabled="true" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
            <span>{{ scope.row.priceMeasureUnit }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="threshold"
          align="center"
          width="100"
          :label="language('YUZHI', '阈值')"
          
        >
          <template slot-scope="scope">
            <!-- <iInput v-model="scope.row.threshold" :disabled="true" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
            <span>{{ scope.row.threshold }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="thresholdCompensationLogic"
          align="center"
          width="130"
          :label="language('YUZHIXISHU', '阈值系数')"
          
        >
          <template slot-scope="scope">
            <!-- <el-select v-model="scope.row.thresholdCompensationLogic"
                            clearable
                            :placeholder="language('QINGSHURU', '请输入')"
                            :disabled="true"
                            v-if="editId.indexOf(scope.row.id)!==-1"
                            >
                        <el-option
                            v-for="item in thresholdCompensationLogic"
                            :key="item.code"
                            :label="item.message"
                            :value="item.code">
                        </el-option>
                    </el-select> -->
            <span>{{
              scope.row.thresholdCompensationLogic == 'A'
                ? '全额补差'
                : scope.row.thresholdCompensationLogic == 'B'
                ? '超额补差'
                : ''
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="compensationRatio"
          align="center"
          width="120"
          :label="language('BUCHABAIFENBI', '补差%')"
          
        >
          <template slot-scope="scope">
            <!-- <iInput v-model="scope.row.compensationRatio" :disabled="true" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
            <span>{{ scope.row.compensationRatio?scope.row.compensationRatio*100+'%':'' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="partBalanceCountType" align="center" width="90" :label="language('结算数据来源', '结算数据来源')">
          <template slot-scope="scope">
            <el-form-item :prop="'tableData.' + scope.$index + '.' + 'partBalanceCountType'"
              :rules="formRules.partBalanceCountType ? formRules.partBalanceCountType : ''">
              <span>{{ scope.row.partBalanceCountType=='SYSTEM'?'系统预读':scope.row.partBalanceCountType=='HANDWORK'?'手工上传':'' }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        
        <el-table-column
          prop="priceSource"
          align="center"
          width="200"
          :label="language('SHICHANGJIALAIYUAN', '市场价来源')"
          
        >
          <template slot-scope="scope">
            <!-- <iInput v-model="scope.row.priceSource" :disabled="true" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
            <span>{{ scope.row.priceSource }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="avgPeriod" align="center" width="80" :label="language('均值计算周期', '均值计算周期')">
     
          <template slot-scope="scope">
          <el-form-item :prop="'tableData.' + scope.$index + '.' + 'avgPeriod'"
            :rules="formRules.avgPeriod ? formRules.avgPeriod : ''">
          
                <span >{{ scope.row.avgPeriod||scope.row.avgPeriod=='0'?avgPeriodList.find(val=>val.code==scope.row.avgPeriod).name:'' }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="offsetMonth" align="center" width="80" :label="language('均值偏移量', '均值偏移量')">
 
          <template slot-scope="scope">
          <el-form-item :prop="'tableData.' + scope.$index + '.' + 'offsetMonth'"
            :rules="formRules.offsetMonth ? formRules.offsetMonth : ''">
        
                <span >{{ scope.row.offsetMonth||scope.row.offsetMonth=='0'?offsetList.find(val=>val.code==scope.row.offsetMonth).name:'' }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="compensationPeriod"
          align="center"
          width="120"
          :label="language('BUCHAZHOUQI', '补差周期')"
          
        >
          <template slot-scope="scope">
            <!-- <iInput v-model="scope.row.compensationPeriod" :disabled="true" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
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
        </el-table-column>
        <el-table-column
          prop="mark"
          align="center"
          width="200"
          :label="language('BEIZHU', '备注')"
          
        >
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.' + 'mark'"
              :rules="formRules.mark ? formRules.mark : ''"
            >
              <iInput
                v-model="scope.row.mark"
                v-if="editId.indexOf(scope.row.id) !== -1"
              ></iInput>
              <span v-else>{{ scope.row.mark }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="ruleVersion"
          align="center"
          
          width="80"
          :label="language('版本')"
        >
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.' + 'ruleVersion'"
              :rules="formRules.ruleVersion ? formRules.ruleVersion : ''"
            >
              <span>{{ scope.row.ruleVersion }}</span>
              </el-form-item>
            </template>
          </el-table-column>


        <el-table-column
          prop="platinumPrice"
          align="center"
          width="120"
          
        >
          <template slot="header">
            <div>
              <span>{{ language('BOJIJIA', '铂基价') }}</span>
              <el-tooltip effect="light" placement="top">
                <div slot="content">
                  <p>M01006002-Pt</p>
                </div>
                <i
                  class="el-icon-warning-outline margin-left10"
                  style="color: blue"
                ></i>
              </el-tooltip>
            </div>
          </template>
          <template slot-scope="scope">
            <!-- <iInput v-model="scope.row.platinumPrice" :disabled="true" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
            <span>{{ scope.row.platinumPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="platinumDosage"
          align="center"
          width="130"
          
        >
          <template slot="header">
            <div>
              <span>{{ language('BOYONGLIANG', '铂用量') }}</span>
              <el-tooltip effect="light" placement="top">
                <div slot="content">
                  <p>M01006002-Pt</p>
                </div>
                <i
                  class="el-icon-warning-outline margin-left10"
                  style="color: blue"
                ></i>
              </el-tooltip>
            </div>
          </template>
          <template slot-scope="scope">
            <!-- <iInput v-model="scope.row.platinumDosage" :disabled="true" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
            <span>{{ scope.row.platinumDosage }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="palladiumPrice"
          align="center"
          width="120"
          
        >
          <template slot="header">
            <div>
              <span>{{ language('BAJIJIA', '钯基价') }}</span>
              <el-tooltip effect="light" placement="top">
                <div slot="content">
                  <p>M01006001-Pd</p>
                </div>
                <i
                  class="el-icon-warning-outline margin-left10"
                  style="color: blue"
                ></i>
              </el-tooltip>
            </div>
          </template>
          <template slot-scope="scope">
            <!-- <iInput v-model="scope.row.palladiumPrice" :disabled="true" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
            <span>{{ scope.row.palladiumPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="palladiumDosage"
          align="center"
          width="130"
          
        >
          <template slot="header">
            <div>
              <span>{{ language('BAYONGLIANG', '钯用量') }}</span>
              <el-tooltip effect="light" placement="top">
                <div slot="content">
                  <p>M01006001-Pd</p>
                </div>
                <i
                  class="el-icon-warning-outline margin-left10"
                  style="color: blue"
                ></i>
              </el-tooltip>
            </div>
          </template>
          <template slot-scope="scope">
            <!-- <iInput v-model="scope.row.palladiumDosage" :disabled="true" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
            <span>{{ scope.row.palladiumDosage }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="rhodiumPrice"
          align="center"
          width="120"
          
        >
          <template slot="header">
            <div>
              <span>{{ language('LAOJIJIA', '铑基价') }}</span>
              <el-tooltip effect="light" placement="top">
                <div slot="content">
                  <p>M01006003-Rh</p>
                </div>
                <i
                  class="el-icon-warning-outline margin-left10"
                  style="color: blue"
                ></i>
              </el-tooltip>
            </div>
          </template>
          <template slot-scope="scope">
            <!-- <iInput v-model="scope.row.rhodiumPrice" :disabled="true" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
            <span>{{ scope.row.rhodiumPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="rhodiumDosage"
          align="center"
          width="130"
          
        >
          <template slot="header">
            <div>
              <span>{{ language('LAOYONGLIANG', '铑用量') }}</span>
              <el-tooltip effect="light" placement="top">
                <div slot="content">
                  <p>M01006003-Rh</p>
                </div>
                <i
                  class="el-icon-warning-outline margin-left10"
                  style="color: blue"
                ></i>
              </el-tooltip>
            </div>
          </template>
          <template slot-scope="scope">
            <!-- <iInput v-model="scope.row.rhodiumDosage" :disabled="true" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
            <span>{{ scope.row.rhodiumDosage }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="preciousMetalDosageUnit"
          align="center"
          width="200"
          :label="
            language('GUIJINSHUYONGLIANGJIJIADANWEI', '贵金属用量&基价单位')
          "
        >
          <template slot-scope="scope">
            <el-form-item
              :prop="
                'tableData.' + scope.$index + '.' + 'preciousMetalDosageUnit'
              "
              :rules="
                formRules.preciousMetalDosageUnit
                  ? formRules.preciousMetalDosageUnit
                  : ''
              "
            >
              <span>{{ scope.row.preciousMetalDosageUnit }}</span>
            </el-form-item>
          </template>
        </el-table-column>

        <el-table-column
          prop="substrateExw"
          align="center"
          width="150"
          :label="$t('载体费用')"
        >
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.' + 'substrateExw'"
              :rules="formRules.substrateExw ? formRules.substrateExw : ''"
            >
              <span>{{ scope.row.substrateExw }}</span>
            </el-form-item>
          </template>
        </el-table-column>

        <el-table-column
          prop="substrateImpDuty"
          align="center"
          width="150"
          :label="$t('载体税率(%)')"
        >
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.' + 'substrateImpDuty'"
              :rules="
                formRules.substrateImpDuty ? formRules.substrateImpDuty : ''
              "
            >
              <span>{{ scope.row.substrateImpDuty }}</span>
            </el-form-item>
          </template>
        </el-table-column>

        <el-table-column
          prop="substrateHandling"
          align="center"
          width="150"
          :label="$t('载体管理费率(%)')"
        >
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.' + 'substrateHandling'"
              :rules="
                formRules.substrateHandling ? formRules.substrateHandling : ''
              "
            >
              <span>{{ scope.row.substrateHandling }}</span>
            </el-form-item>
          </template>
        </el-table-column>

        <el-table-column
          prop="pgmHandling"
          align="center"
          width="150"
          :label="$t('贵金属管理费率(%)')"
        >
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.' + 'pgmHandling'"
              :rules="formRules.pgmHandling ? formRules.pgmHandling : ''"
            >
              <span>{{ scope.row.pgmHandling }}</span>
            </el-form-item>
          </template>
        </el-table-column>

        <el-table-column
          prop="manufacture"
          align="center"
          width="150"
          :label="$t('制造费用')"
        >
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.' + 'manufacture'"
              :rules="formRules.manufacture ? formRules.manufacture : ''"
            >
              <span>{{ scope.row.manufacture }}</span>
            </el-form-item>
          </template>
        </el-table-column>

        <el-table-column
          prop="transport"
          align="center"
          width="150"
          :label="$t('运输费用')"
        >
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.' + 'transport'"
              :rules="formRules.transport ? formRules.transport : ''"
            >
              <span>{{ scope.row.transport }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        </template>
      </el-table>
    </el-form>
    <iPagination
      @size-change="handleSizeChange($event, getTableList)"
      @current-change="handleCurrentChange($event, getTableList)"
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :current-page="page.currPage"
      :total="page.totalCount"
      :layout="page.layout"
    >
    </iPagination>

    <iDialog
      :title="language('YINYONGRFQZHONGLINGJIAN', '引用RFQ中零件')"
      :visible.sync="rfqShowType"
      v-if="rfqShowType"
      width="85%"
      @close="closeDiolog"
    >
      <rfqDialog @close="saveClose" @addRfq="addRfqData"></rfqDialog>
    </iDialog>

    <iDialog
      :title="language('XINZENGMTZLINGJIANZHUSHUJU', '新增MTZ零件主数据')"
      :visible.sync="addDialog"
      v-if="addDialog"
      width="70%"
      @close="saveGzDialog"
    >
      <addData @close="saveGzClose" :listData="listData"></addData>
    </iDialog>

    <iDialog
      :title="
        language('YINGYONGDINGDIANSHENQINGDANLINGJIAN', '引用定点申请单零件')
      "
      :visible.sync="quoteDialog"
      v-if="quoteDialog"
      width="90%"
      @close="quoteType"
    >
      <quoteData
        @quoteDialog="quoteDialogList"
        :applyNumber="applyNumber"
      ></quoteData>
    </iDialog>

    <iDialog
      :title="language('LSMTZLJZSJ', '历史MTZ零件主数据')"
      :visible.sync="historyType"
      v-if="historyType"
      width="90%"
      @close="historyCls"
    >
      <historyBox
        @close="historyClose"
        @historyDialog="historyDialogList"
      ></historyBox>
    </iDialog>

    <iDialog
      :title="language('SCFJYZBTG', '上传附件验证不通过')"
      class="title_color"
      :visible.sync="cancelNo"
      v-if="cancelNo"
      width="90%"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      @close="cancelClose"
    >
      <cancelReqestNo :errorList="errorList"></cancelReqestNo>
    </iDialog>
  </iCard>
</template>

<script>
import {
  iCard,
  iButton,
  iPagination,
  iMessage,
  iInput,
  iDatePicker,
  iDialog,
  iMessageBox
} from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import rfqDialog from './rfqDialog'
import quoteData from './quoteData'
import addData from './addData'
import cancelReqestNo from './cancelReqestNo'
import historyBox from './historyBox'
// import { getRawMaterialNos } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/supplementary/details';
import {
  pagePartMasterData, //维护MTZ零件主数据-分页查询
  addBatchPartMasterData, //维护MTZ零件主数据-新增多条
  modifyPartMasterData, //维护MTZ零件主数据-编辑多条
  deletePartMasterData, //维护MTZ零件主数据-删除
  listPartNumSupplierIdData,
  pageAppRule,
  removePartMasterData, //清空维护mtz零件主数据
  getDosageUnitList,
  downloadFile, //下载
  getFirstRuleByNos
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/details'
// import {
//   getMtzSupplierList,//获取原材料牌号
// } from '@/api/mtz/annualGeneralBudget/mtzReplenishmentOverview';
import iTooltip from "./iTooltip";
import { deepClone } from './util'
import { getToken } from '@/utils'
import { tipList,offsetList,avgPeriodList,materialDoseSourceList,methodList} from './data'
export default {
  name: 'Search',
  componentName: 'theDataTabs',
  props: ['appStatus', 'inforData', 'applyNumber','flowType','meetingStatus'],
  components: {
    iTooltip,
    iCard,
    iButton,
    iPagination,
    iInput,
    iDatePicker,
    rfqDialog,
    iDialog,
    addData,
    quoteData,
    cancelReqestNo,
    historyBox
  },
  watch: {},
  mixins: [pageMixins],
  data() {
    var validatePass = (rule, value, callback) => {
      //规则编号
      var number = 0
      this.ruleNo.forEach((e) => {
        if (e.ruleNo == value) {
          number++
        }
      })
      if (number == 0) {
        callback(
          new Error(this.language('', '当前MTZ申请单中规则编号不存在！'))
        )
      } else {
        callback()
      }
    }
    return {
      methodList,
      materialDoseSourceList,
      avgPeriodList,
      offsetList,
      tipList,
      isTitle:false,
      formRules: {
        assemblyPartnum: [
          { required: true, message: '请选择', trigger: 'blur' }
        ], //零件号
        ruleNo: [
          { required: true, message: '请选择', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ], //规则编号
        // sapCode: [{ required: true, message: '请选择', trigger: 'blur' }],//供应商编号
        priceUnit: [{ required: true, message: '请选择', trigger: 'blur' }], //每
        dosage: [{ required: true, message: '请选择', trigger: 'blur' }], //用量
        dosageMeasureUnit: [
          { required: true, message: '请选择', trigger: 'blur' }
        ] //用量计量单位
      },
      uploadUrl: process.env.VUE_APP_MTZ + '/web/mtz/mtzAppNomi/uploadData',
      uploadData: {},
      // supplierList:[],//供应商编号
      ruleNo: [], //规则编号
      tableData: [],
      dosageMeasureUnit: [],
      newDataList: [],
      editId: '',
      selectList: [],
      loading: false,
      // materialCode:[],
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
      rfqShowType: false,
      editType: false,
      addDialog: false,
      quoteDialog: false,
      historyType: false,
      dialogEditType: false,
      dataCloseAllRequest: false, //判断是否为选择维护mtz零件主数据
      listData: [],
      cancelNo: false,
      errorList: [],
      startDate:'',
      endDate:'',
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
    this.uploadData = {
      mtzAppId: this.inforData.mtzAppId,
      userId: JSON.parse(sessionStorage.getItem('userInfo')).id
    }
    this.pageAppRequest()
    // getMtzSupplierList({}).then(res => {
    //   this.supplierList = res.data;
    // })
    getDosageUnitList({}).then((res) => {
      this.dosageMeasureUnit = res.data
    })
  },
  mounted() {
    this.init()
  },
  methods: {
    getToken,
    init() {
      if (this.$route.query.item == undefined) {
        this.getTableList()
      } else {
        this.getTableDown()
      }
      // getRawMaterialNos({}).then(res => {
      //   this.materialCode = res.data;
      // })
    },
    chaneDate(val, row) {
      console.log(val)
      console.log(row)
      getFirstRuleByNos([row.ruleNo]).then(res => {
        const { startDate, endDate } = res.data[row.ruleNo]
        console.log(res.data[row.ruleNo])
        this.startDate = startDate
        this.endDate = endDate
        console.log(this.endDate)
      })
    },
    download() {
      iMessageBox(
        this.language('SHIFOUDAOCHUMUBAN', '是否导出模板？'),
        this.language('LK_WENXINTISHI', '温馨提示'),
        {
          confirmButtonText: this.language('QUEREN', '确认'),
          cancelButtonText: this.language('QUXIAO', '取消')
        }
      ).then((res) => {
        downloadFile({
          mtzAppId: this.inforData.mtzAppId
        }).then((res) => {
          let blob = new Blob([res], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
          })
          let objectUrl = URL.createObjectURL(blob)
          let link = document.createElement('a')
          link.href = objectUrl
          // let fname = "补差单汇总" + getNowFormatDate() + ".xlsx";
          let fname =
            'MTZ零件主数据-' +
            this.inforData.mtzAppId +
            '-' +
            this.inforData.appName +
            '.xlsx'
          link.setAttribute('download', fname)
          document.body.appendChild(link)
          link.click()
          link.parentNode.removeChild(link)
          iMessage.success('链接成功！')
        })
      })
    },
    cancelClose() {
      this.cancelNo = false
    },
    uploadSuccess(res, file) {
      if (res.code == 200 && res.result) {
        this.getTableList()
      } else {
        if (res.data == null) {
          iMessage.error(res.desZh)
        } else {
          this.errorList = res.data
          this.cancelNo = true
        }
      }
    },
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 20
      if (!isLt2M) {
        iMessage.error('上传文件大小不能超过 20MB!')
      }
      return isLt2M
    },
    handleExceed(files, fileList) {
      iMessage.warn(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      )
    },

    pageAppRequest() {
      pageAppRule({
        pageNo: 1,
        pageSize: 99999,
        mtzAppId: this.inforData.mtzAppId
      }).then((res) => {
        this.ruleNo = res.data
      })
    },
    selectionType(row) {
      if (this.editType == true) {
        return false
      } else {
        return true
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
    add() {
      //新增
      var arr = []
      this.tableData.forEach((e) => {
        arr.push(e.assemblyPartnum)
      })
      this.listData = arr
      this.addDialog = true
    },
    edit() {
      //编辑
      if (this.selectList.length > 0) {
        this.pageAppRequest()
        this.editType = true
        var changeArrayList = []
        this.selectList.forEach((item) => {
          changeArrayList.push(item.id)
        })
        this.editId = changeArrayList
        this.dialogEditType = false
      } else {
        iMessage.error('请选择需要修改数据！')
      }
    },
    choiseGZ(arr, val) {
      var noList = deepClone(this.ruleNo)
      try {
        noList.forEach((e) => {
          if (e.id == val) {
            e.id = arr.row.id
            delete e.mark
            arr.row.supplierId = e.supplierId.toString() || e.sapCode.toString()
            arr.row.priceSource = e.source || e.priceSource
            arr.row = Object.assign(arr.row, e)
            throw new Error('EndIterative')
          }
        })
      } catch (e) {
        if (e.message != 'EndIterative') throw e
      }
    },
    removePartMasterData() {
      //清空
      removePartMasterData({
        mtzAppId: this.inforData.mtzAppId
      }).then((res) => {
        this.getTableList()
      })
    },
    save() {
      //保存
      if (this.dialogEditType) {
        //新增
        this.newDataList.forEach((e) => {
          e.carlineList = null
        })
        this.$refs['contractForm'].validate(async (valid) => {
          if (valid) {
            iMessageBox(
              this.language('SHIFOUBAOCUN', '是否保存？'),
              this.language('LK_WENXINTISHI', '温馨提示'),
              {
                confirmButtonText: this.language('QUEREN', '确认'),
                cancelButtonText: this.language('QUXIAO', '取消')
              }
            )
              .then((res) => {
                if (this.dataCloseAllRequest) {
                  removePartMasterData({
                    mtzAppId: this.inforData.mtzAppId
                  }).then((res) => {
                    if (res.code == 200 && res.result) {
                      addBatchPartMasterData({
                        mtzAppId: this.inforData.mtzAppId,
                        mtzAppNomiPartMasterDataList: this.newDataList
                      }).then((res) => {
                        if (res.code == 200) {
                          iMessage.success(this.language(res.desEn, res.desZh))
                          this.editId = ''
                          this.editType = false
                          this.page.currPage = 1
                          this.page.pageSize = 10
                          this.dialogEditType = false
                          this.dataCloseAllRequest = false
                          this.getTableList()
                        } else {
                          iMessage.error(this.language(res.desEn, res.desZh))
                        }
                      })
                    } else {
                      iMessage.error(this.language(res.desEn, res.desZh))
                    }
                  })
                } else {
                  addBatchPartMasterData({
                    mtzAppId: this.inforData.mtzAppId,
                    mtzAppNomiPartMasterDataList: this.newDataList
                  }).then((res) => {
                    if (res.code == 200) {
                      iMessage.success(this.language(res.desEn, res.desZh))
                      this.editId = ''
                      this.editType = false
                      this.page.currPage = 1
                      this.page.pageSize = 10
                      this.dialogEditType = false
                      this.getTableList()
                    } else {
                      iMessage.error(this.language(res.desEn, res.desZh))
                    }
                  })
                }
              })
              .catch((res) => {})
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
        this.selectList.forEach((e) => {
          e.carlineList = null
        })
        this.$refs['contractForm'].validate(async (valid) => {
          if (valid) {
            iMessageBox(
              this.language('SHIFOUBAOCUN', '是否保存？'),
              this.language('LK_WENXINTISHI', '温馨提示'),
              {
                confirmButtonText: this.language('QUEREN', '确认'),
                cancelButtonText: this.language('QUXIAO', '取消')
              }
            ).then((res) => {
              modifyPartMasterData({
                mtzAppId: this.inforData.mtzAppId,
                mtzAppNomiPartMasterDataList: this.selectList
              }).then((res) => {
                if (res.code == 200) {
                  iMessage.success(this.language(res.desEn, res.desZh))
                  this.editId = ''
                  this.editType = false
                  this.getTableList()
                } else {
                  iMessage.error(this.language(res.desEn, res.desZh))
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
    cancel() {
      //取消
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
          if (this.dialogEditType) {
            this.editId.forEach((e) => {
              this.tableData.splice(0, 1)
            })
            this.dialogEditType = false
            this.getTableList()
          } else {
            this.getTableList()
          }
        })
        .then((res) => {
          this.editId = ''
          this.$refs['contractForm'].clearValidate()
          this.dataCloseAllRequest = false
        })
        .catch((res) => {})
    },
    rfqClick() {
      //引用RFQ中零件
      this.rfqShowType = true
    },
    delecte() {
      //删除
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
          deletePartMasterData({
            idList: numList
          }).then((res) => {
            if (res.code == 200 && res.result) {
              iMessage.success(res.desZh)
              this.getTableList()
            } else {
              iMessage.error(res.desZh)
            }
          })
        })
        .catch((res) => {})
    },
    locationClick() {
      if (this.applyNumber == '') {
        return iMessage.error(
          this.language(
            'YYDDSQDLJXXGLLJDDSQ',
            '引用定点申请单零件需先关联零件定点申请！'
          )
        )
      }
      iMessageBox(
        this.language(
          'CCZJSCNYWHDSYLJZSJSFJX',
          '此操作将删除您已维护的所有零件主数据，是否继续？'
        ),
        this.language('LK_WENXINTISHI', '温馨提示'),
        {
          confirmButtonText: this.language('QUEREN', '确认'),
          cancelButtonText: this.language('QUXIAO', '取消')
        }
      )
        .then((res) => {
          this.quoteDialog = true
        })
        .catch((res) => {})
    },
    historyClick() {
      this.historyType = true
    },
    saveClose() {
      this.closeDiolog()
    },
    closeDiolog() {
      this.rfqShowType = false
    },
    historyClose() {
      this.historyCls()
    },
    historyCls() {
      this.historyType = false
    },
    //获取列表
    getTableList() {
      this.loading = true
      pagePartMasterData({
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        mtzAppId: this.inforData.mtzAppId
      }).then((res) => {
        this.tableData = res.data
        this.page.currPage = res.pageNum
        this.page.pageSize = res.pageSize
        this.page.totalCount = res.total
        this.loading = false
      })
    },
    getTableDown() {
      this.loading = true
      pagePartMasterData({
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        mtzAppId: this.inforData.mtzAppId
      }).then((res) => {
        if (res.data === null) return false
        if (res.data.length < 1) {
          listPartNumSupplierIdData({
            partNumStr: this.$route.query.item
            // supplierIdStr: this.$route.query.supplierId,
          }).then((res) => {
            this.loading = false
            var dataListCopy = res.data
            dataListCopy.forEach((e) => {
              if (e.priceUnit == null) {
                this.$set(e, 'priceUnit', 1)
              }
              if (e.dosageMeasureUnit == null) {
                this.$set(e, 'dosageMeasureUnit', 'KG')
              }
            })
            this.tableData = dataListCopy
            this.newDataList = dataListCopy
            this.editType = true

            var changeArrayList = []
            this.$refs.moviesTable.clearSelection()
            res.data.forEach((item) => {
              changeArrayList.push(item.id)
              this.$refs.moviesTable.toggleRowSelection(item, true)
            })
            this.editId = changeArrayList
            this.dialogEditType = true
          })
        } else {
          this.tableData = res.data
          this.page.currPage = res.pageNum
          this.page.pageSize = res.pageSize
          this.page.totalCount = res.total
          this.loading = false
        }
      })
    },
    handleSelectionChange(val) {
      this.selectList = val
    },
    saveGzDialog() {
      this.addDialog = false
    },
    saveGzClose(val) {
      //隐藏维护MTZ零件主数据新增弹窗
      this.saveGzDialog()
      if (val == 'fresh') {
        this.getTableList()
      }
    },
    quoteType() {
      this.quoteDialog = false
    },
    quoteClose() {
      this.quoteType()
    },
    addRfqData(val) {
      // this.newDataList = deepClone(val);
      this.closeDiolog()
      var list = []
      val.forEach((item, index) => {
        if (list[index] == undefined) {
          list[index] = {}
          list[index].assemblyPartnum = item.partNum
          list[index].id = ''
          list[index].partName = item.partNameZh
          list[index].partUnit = item.unit
          list[index].priceUnit = 1 //每
          list[index].dosageMeasureUnit = 'KG'
        }
      })
      this.newDataList = list
      this.tableData.unshift(...list)
      this.editType = true
      var changeArrayList = []
      this.$refs.moviesTable.clearSelection()
      list.forEach((item) => {
        changeArrayList.push(item.id)
        this.$refs.moviesTable.toggleRowSelection(item, true)
      })
      this.editId = changeArrayList
      this.dialogEditType = true
      this.pageAppRequest()
    },
    quoteDialogList(val) {
      //引用定点申请单零件
      // this.newDataList = deepClone(val);

      this.tableData = []
      this.quoteType()
      var list = []
      val.forEach((item, index) => {
        if (list[index] == undefined) {
          list[index] = {}
          list[index].assemblyPartnum = item.partNum
          list[index].id = ''
          list[index].supplierName = item.supplierName
          list[index].supplierId = item.sapNum
          list[index].partName = item.partNameCn
          list[index].partUnit = item.unit
          list[index].priceUnit = 1 //每
          list[index].dosageMeasureUnit = 'KG'
        }
      })
      this.newDataList = list
      this.tableData.unshift(...list)
      this.editType = true
      var changeArrayList = []
      this.$refs.moviesTable.clearSelection()
      list.forEach((item) => {
        changeArrayList.push(item.id)
        this.$refs.moviesTable.toggleRowSelection(item, true)
      })
      this.editId = changeArrayList
      this.dialogEditType = true
      this.dataCloseAllRequest = true
      this.pageAppRequest()
    },
    historyDialogList(val) {
      // this.newDataList = deepClone(val);
      this.historyCls()
      var list = []
      val.forEach((item, index) => {
        if (list[index] == undefined) {
          list[index] = {}
          list[index].assemblyPartnum = item.assemblyPartnum
          list[index].id = ''
          list[index].supplierName = item.assemblySupplierName
          list[index].supplierId = item.supplierId?item.supplierId:''
          list[index].sapCode = item.assemblySupplierSap
          list[index].ruleNo = item.ruleNo
          list[index].materialCode = item.materialCode
          list[index].materialName = item.material
          list[index].priceUnit = item.priceUnit
          list[index].partName = item.assemblyPartName
          list[index].partUnit = item.countUnit
          list[index].dosageMeasureUnit = item.dosageMeasureUnit
          list[index].preciousMetalDosageUnit = item.preciousMetalDosageUnit
          list[index].rhodiumDosage = item.rhodiumDosage
          list[index].rhodiumPrice = item.rhodiumPrice
          list[index].palladiumDosage = item.palladiumDosage
          list[index].palladiumPrice = item.palladiumPrice
          list[index].platinumDosage = item.platinumDosage
          list[index].platinumPrice = item.platinumPrice
          list[index].thresholdCompensationLogic =
            item.thresholdCompensationLogic
          list[index].threshold = item.threshold
          list[index].compensationPeriod = item.compensationPeriod
          list[index].compensationRatio = item.compensationRatio
          list[index].priceSource = item.marketSource
          list[index].tcExchangeRate = item.tcExchangeRate
          list[index].tcCurrence = item.tcCurrence
          list[index].priceMeasureUnit = item.priceCountUnit
          list[index].price = item.price
          list[index].endDate = item.endDate
          list[index].startDate = item.startDate
          list[index].dosage = item.dosage
        }
      })
      console.log(list);
      this.newDataList = list
      this.tableData.unshift(...list)
      this.editType = true
      var changeArrayList = []
      this.$refs.moviesTable.clearSelection()
      list.forEach((item) => {
        changeArrayList.push(item.id)
        this.$refs.moviesTable.toggleRowSelection(item, true)
      })
      this.editId = changeArrayList
      this.dialogEditType = true
      this.pageAppRequest()
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep.el-button--default{
  font-size: 20px!important;
}

::v-deep.el-table .cell {
  // line-height: 0;
  // padding: 0px 4px;
  font-size: 18px;

}
.formStyle ::v-deep.el-form-item__content {
  line-height: normal !important;
  font-size: 18px;
}

.formStyle {
  position: relative;

}
::v-deep.el-button--mini.is-circle{
  padding: 3px 4px;
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

::v-deep.el-table th > .cell{
  white-space:normal;
  
}
::v-deep .el-table .el-table__row .el-input {
  width: 100% !important;
}
::v-deep .el-select__tags {
  max-width: 100% !important;
}

.formStyle ::v-deep .el-form-item {
  margin-top: 0;
  margin-bottom: 0;
}
.title_color {
  ::v-deep .el-dialog__title {
    color: red;
  }
}
.formStyle ::v-deep.el-form-item__content {
  line-height: normal !important;
}
.font18_b{
  font-size: 18px;
font-weight: bold;
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
</style>
<style lang="scss">
.el-table__fixed-body-wrapper,
.el-table__fixed-header-wrapper {
  background: #fff;
}
</style>
