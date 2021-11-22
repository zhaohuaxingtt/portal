
<!-- 维护MTZ零件主数据表格 -->
<template>
    <iCard class="margin-top20">
      <template v-slot:header>
        <span>
          {{language('WHMTZLLZSJ','维护MTZ零件主数据')}}
        </span>
        <div>
          <iButton @click="cancel" v-if="editType && appStatus == '草稿' || appStatus == '未通过'">{{ language('QUXIAO', '取消') }}</iButton>
          <iButton @click="rfqClick" v-if="!editType && appStatus == '草稿' || appStatus == '未通过'">{{ language('YYRFQZLJ', '引用RFQ中零件') }}</iButton>
          <iButton @click="locationClick" v-if="!editType && appStatus == '草稿' || appStatus == '未通过'">{{ language('YYDDSQDLJ', '引用定点申请单零件') }}</iButton>
          <iButton @click="historyClick" v-if="!editType && appStatus == '草稿' || appStatus == '未通过'">{{ language('ZJLSMTZLJZSJ', '增加历史MTZ零件主数据') }}</iButton>
          <iButton @click="add" v-if="!editType && appStatus == '草稿' || appStatus == '未通过'">{{ language('XINZENG', '新增') }}</iButton>
          <iButton @click="edit" v-if="!editType && appStatus == '草稿' || appStatus == '未通过'">{{ language('BIANJI', '编辑') }}</iButton>
          <iButton @click="delecte" v-if="!editType && appStatus == '草稿' || appStatus == '未通过'">{{ language('SHANCHU', '删除') }}</iButton>
          <iButton @click="save" v-if="editType && appStatus == '草稿' || appStatus == '未通过'">{{ language('BAOCUN', '保存') }}</iButton>
        </div>
      </template>
      <el-form :rules="formRules" :model="{tableData}" ref="contractForm"  class="formStyle">
        <el-table :data="tableData"
                    ref="moviesTable"
                    v-loading="loading"
                    @selection-change="handleSelectionChange">
            <el-table-column type="selection"
                            :selectable="selectionType"
                            fixed
                            width="60">
            </el-table-column>
            <el-table-column label="#"
                            type="index"
                            width="60">
            </el-table-column>
            <el-table-column prop="assemblyPartnum"
                            align="center"
                            show-overflow-tooltip
                            width="150"
                            :label="language('LINGJIANHAO','零件号')">
                <template slot-scope="scope">
                    <el-form-item
                        :prop="'tableData.' + scope.$index + '.' + 'assemblyPartnum'"
                        :rules="formRules.assemblyPartnum ? formRules.assemblyPartnum : ''"
                    >
                        <!-- <iInput v-model="scope.row.assemblyPartnum" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
                        <span>{{scope.row.assemblyPartnum}}</span>
                    </el-form-item>
                </template>
            </el-table-column>
            <el-table-column prop="partName"
                            align="center"
                            show-overflow-tooltip
                            width="150"
                            :label="language('LINGJIANMINGCHENG','零件名称')">
                <template slot-scope="scope">
                    <span>{{scope.row.partName}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="ruleNo"
                            align="center"
                            :label="language('GUIZEBIANHAO','规则编号')"
                            show-overflow-tooltip
                            width="150">
                <template slot-scope="scope">
                    <el-form-item
                        :prop="'tableData.' + scope.$index + '.' + 'ruleNo'"
                        :rules="formRules.ruleNo ? formRules.ruleNo : ''"
                    >
                        <el-select v-model="scope.row.ruleNo"
                                clearable
                                :placeholder="language('QINGSHURU', '请输入')"
                                v-if="editId.indexOf(scope.row.id)!==-1"
                                @change="choiseGZ(scope,$event)"
                                >
                            <el-option
                                v-for="item in ruleNo"
                                :key="item.id"
                                :label="item.ruleNo"
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <span v-else>{{scope.row.ruleNo}}</span>
                    </el-form-item>
                </template>
            </el-table-column>
            <el-table-column prop="supplierId"
                            align="center"
                            :label="language('GONGYINGSHANGBIANHAOMINGCHENG','供应商编号/名称')"
                            show-overflow-tooltip
                            width="150">
                            <!-- supplierName供应商名称 -->
                <template slot-scope="scope">
                    <el-form-item
                        :prop="'tableData.' + scope.$index + '.' + 'supplierId'"
                        :rules="formRules.supplierId ? formRules.supplierId : ''"
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
                        <span>{{scope.row.supplierId}}/{{scope.row.supplierName}}</span>
                    </el-form-item>
                </template>
            </el-table-column>
            <el-table-column prop="partUnit"
                            align="center"
                            width="150"
                            :label="language('LINGJIANSHULIANGDANWEI','零件数量单位')"
                            show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-form-item
                        :prop="'tableData.' + scope.$index + '.' + 'partUnit'"
                        :rules="formRules.partUnit ? formRules.partUnit : ''"
                    >
                        <iInput v-model="scope.row.partUnit" v-if="editId.indexOf(scope.row.id)!==-1"></iInput>
                        <span v-else>{{scope.row.partUnit}}</span>
                    </el-form-item>
                </template>
            </el-table-column>
            <el-table-column prop="priceUnit"
                            align="center"
                            :label="language('MEI','每')"
                            show-overflow-tooltip
                            width="150">
                <template slot-scope="scope">
                    <el-form-item
                        :prop="'tableData.' + scope.$index + '.' + 'priceUnit'"
                        :rules="formRules.priceUnit ? formRules.priceUnit : ''"
                    >
                        <iInput v-model="scope.row.priceUnit" v-if="editId.indexOf(scope.row.id)!==-1"></iInput>
                        <span v-else>{{scope.row.priceUnit}}</span>
                    </el-form-item>
                </template>
            </el-table-column>
            <el-table-column prop="dosage"
                            align="center"
                            width="150"
                            :label="language('YONGLIANG','用量')"
                            show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-form-item
                        :prop="'tableData.' + scope.$index + '.' + 'dosage'"
                        :rules="formRules.dosage ? formRules.dosage : ''"
                    >
                        <iInput v-model="scope.row.dosage" v-if="editId.indexOf(scope.row.id)!==-1"></iInput>
                        <span v-else>{{scope.row.dosage}}</span>
                    </el-form-item>
                </template>
            </el-table-column>
            <el-table-column prop="dosageMeasureUnit"
                            align="center"
                            width="150"
                            :label="language('YONGLIANGJILIANGDANEWI','用量计量单位')"
                            show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-form-item
                        :prop="'tableData.' + scope.$index + '.' + 'dosageMeasureUnit'"
                        :rules="formRules.dosageMeasureUnit ? formRules.dosageMeasureUnit : ''"
                    >
                        <iInput v-model="scope.row.dosageMeasureUnit" v-if="editId.indexOf(scope.row.id)!==-1"></iInput>
                        <span v-else>{{scope.row.dosageMeasureUnit}}</span>
                    </el-form-item>
                </template>
            </el-table-column>
            <el-table-column prop="startDate"
                            align="center"
                            width="200"
                            :label="language('YOUXIAOQIQI','有效期起')"
                            show-overflow-tooltip>
                <template slot-scope="scope">
                    <!-- <iDatePicker v-model="scope.row.startDate"
                                style="width: 180px!important;"
                                :disabled="true"
                                type="datetime"
                                v-if="editId.indexOf(scope.row.id)!==-1"
                                >
                    </iDatePicker> -->
                    <span>{{scope.row.startDate}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="endDate"
                            align="center"
                            width="200"
                            :label="language('YOUXIAOQIZHI','有效期止')"
                            show-overflow-tooltip>
                <template slot-scope="scope">
                    <!-- <iDatePicker v-model="scope.row.endDate"
                                style="width: 180px!important;"
                                :disabled="true"
                                type="datetime"
                                v-if="editId.indexOf(scope.row.id)!==-1"
                                >
                    </iDatePicker> -->
                    <span>{{scope.row.endDate}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="mark"
                            align="center"
                            width="200"
                            :label="language('BEIZHU','备注')"
                            show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-form-item
                        :prop="'tableData.' + scope.$index + '.' + 'mark'"
                        :rules="formRules.mark ? formRules.mark : ''"
                    >
                        <iInput v-model="scope.row.mark" v-if="editId.indexOf(scope.row.id)!==-1"></iInput>
                        <span v-else>{{scope.row.mark}}</span>
                    </el-form-item>
                </template>
            </el-table-column>
            <el-table-column prop="materialCode"
                            align="center"
                            width="150"
                            :label="language('YUANCAILIAOPAIHAO','原材料牌号')"
                            show-overflow-tooltip>
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
                    <span>{{scope.row.materialCode}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="materialName"
                            align="center"
                            width="150"
                            :label="language('YUANCAILIAO','原材料')"
                            show-overflow-tooltip>
                <template slot-scope="scope">
                    <span>{{scope.row.materialName}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="price"
                            align="center"
                            width="150"
                            :label="language('JIJIA','基价')"
                            show-overflow-tooltip>
                <template slot-scope="scope">
                    <!-- <iInput :disabled="true" v-model="scope.row.price" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
                    <span>{{scope.row.price}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="priceMeasureUnit"
                            align="center"
                            width="150"
                            :label="language('JIJIAJILIANGDANWEI','基价计量单位')"
                            show-overflow-tooltip>
                <template slot-scope="scope">
                    <!-- <iInput v-model="scope.row.priceMeasureUnit" :disabled="true" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
                    <span>{{scope.row.priceMeasureUnit}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="platinumPrice"
                            align="center"
                            width="150"
                            show-overflow-tooltip>
                <template slot="header">
                    <div>
                        <span>{{language('BOJIJIA','铂基价')}}</span>
                        <el-tooltip effect="light"
                                    placement="top">
                            <div slot="content">
                                <p>M01006002-Pt</p>
                            </div>
                            <i class="el-icon-warning-outline margin-left10"
                            style="color:blue"></i>
                        </el-tooltip>
                    </div>
                </template>
                <template slot-scope="scope">
                    <!-- <iInput v-model="scope.row.platinumPrice" :disabled="true" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
                    <span>{{scope.row.platinumPrice}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="platinumDosage"
                            align="center"
                            width="150"
                            show-overflow-tooltip>
                <template slot="header">
                    <div>
                        <span>{{language('BOYONGLIANG','铂用量')}}</span>
                        <el-tooltip effect="light"
                                    placement="top">
                            <div slot="content">
                                <p>M01006002-Pt</p>
                            </div>
                            <i class="el-icon-warning-outline margin-left10"
                            style="color:blue"></i>
                        </el-tooltip>
                    </div>
                </template>
                <template slot-scope="scope">
                    <!-- <iInput v-model="scope.row.platinumDosage" :disabled="true" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
                    <span>{{scope.row.platinumDosage}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="palladiumPrice"
                            align="center"
                            width="150"
                            show-overflow-tooltip>
                <template slot="header">
                    <div>
                        <span>{{language('BAJIJIA','钯基价')}}</span>
                        <el-tooltip effect="light"
                                    placement="top">
                            <div slot="content">
                                <p>M01006001-Pd</p>
                            </div>
                            <i class="el-icon-warning-outline margin-left10"
                            style="color:blue"></i>
                        </el-tooltip>
                    </div>
                </template>
                <template slot-scope="scope">
                    <!-- <iInput v-model="scope.row.palladiumPrice" :disabled="true" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
                    <span>{{scope.row.palladiumPrice}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="palladiumDosage"
                            align="center"
                            width="150"
                            show-overflow-tooltip>
                <template slot="header">
                    <div>
                        <span>{{language('BAYONGLIANG','钯用量')}}</span>
                        <el-tooltip effect="light"
                                    placement="top">
                            <div slot="content">
                                <p>M01006001-Pd</p>
                            </div>
                            <i class="el-icon-warning-outline margin-left10"
                            style="color:blue"></i>
                        </el-tooltip>
                    </div>
                </template>
                <template slot-scope="scope">
                    <!-- <iInput v-model="scope.row.palladiumDosage" :disabled="true" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
                    <span>{{scope.row.palladiumDosage}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="rhodiumPrice"
                            align="center"
                            width="150"
                            show-overflow-tooltip>
                <template slot="header">
                    <div>
                        <span>{{language('LAOJIJIA','铑基价')}}</span>
                        <el-tooltip effect="light"
                                    placement="top">
                            <div slot="content">
                                <p>M01006003-Rh</p>
                            </div>
                            <i class="el-icon-warning-outline margin-left10"
                            style="color:blue"></i>
                        </el-tooltip>
                    </div>
                </template>
                <template slot-scope="scope">
                    <!-- <iInput v-model="scope.row.rhodiumPrice" :disabled="true" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
                    <span>{{scope.row.rhodiumPrice}}</span>
                </template>
            </el-table-column>

            <el-table-column prop="rhodiumDosage"
                            align="center"
                            width="150"
                            show-overflow-tooltip>
                <template slot="header">
                    <div>
                        <span>{{language('LAOYONGLIANG','铑用量')}}</span>
                        <el-tooltip effect="light"
                                    placement="top">
                            <div slot="content">
                                <p>M01006003-Rh</p>
                            </div>
                            <i class="el-icon-warning-outline margin-left10"
                            style="color:blue"></i>
                        </el-tooltip>
                    </div>
                </template>
                <template slot-scope="scope">
                    <!-- <iInput v-model="scope.row.rhodiumDosage" :disabled="true" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
                    <span>{{scope.row.rhodiumDosage}}</span>
                </template>
            </el-table-column>

            <el-table-column prop="tcCurrence"
                            align="center"
                            width="150"
                            :label="language('HUOBI','货币')"
                            show-overflow-tooltip>
                <template slot-scope="scope">
                    <!-- <iInput v-model="scope.row.tcCurrence" :disabled="true" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
                    <span>{{scope.row.tcCurrence}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="tcExchangeRate"
                            align="center"
                            width="150"
                            :label="language('HUILV','汇率')"
                            show-overflow-tooltip>
                <template slot-scope="scope">
                    <!-- <iInput v-model="scope.row.tcExchangeRate" :disabled="true" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
                    <span>{{scope.row.tcExchangeRate}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="priceSource"
                            align="center"
                            width="150"
                            :label="language('SHICHANGJIALAIYUAN','市场价来源')"
                            show-overflow-tooltip>
                <template slot-scope="scope">
                    <!-- <iInput v-model="scope.row.priceSource" :disabled="true" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
                    <span>{{scope.row.priceSource}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="compensationRatio"
                            align="center"
                            width="150"
                            :label="language('BUCHAXISHU','补差系数')"
                            show-overflow-tooltip>
                <template slot-scope="scope">
                    <!-- <iInput v-model="scope.row.compensationRatio" :disabled="true" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
                    <span>{{scope.row.compensationRatio}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="compensationPeriod"
                            align="center"
                            width="150"
                            :label="language('BUCHAZHOUQI','补差周期')"
                            show-overflow-tooltip>
                <template slot-scope="scope">
                    <!-- <iInput v-model="scope.row.compensationPeriod" :disabled="true" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
                    <span>{{scope.row.compensationPeriod == "A"?"年度":scope.row.compensationPeriod == "H"?"半年度":scope.row.compensationPeriod == "Q"?"季度":scope.row.compensationPeriod == "M"?"月度":""}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="threshold"
                            align="center"
                            width="150"
                            :label="language('YUZHI','阈值')"
                            show-overflow-tooltip>
                <template slot-scope="scope">
                    <!-- <iInput v-model="scope.row.threshold" :disabled="true" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
                    <span>{{scope.row.threshold}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="thresholdCompensationLogic"
                            align="center"
                            width="150"
                            :label="language('YUZHIBUCHALUOJI','阈值补差逻辑')"
                            show-overflow-tooltip>
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
                    <span>{{scope.row.thresholdCompensationLogic == "A"?"全额补差":scope.row.thresholdCompensationLogic == "B"?"超额补差":""}}</span>
                </template>
            </el-table-column>
        </el-table>
      </el-form>
      <iPagination @size-change="handleSizeChange($event, getTableList)"
                   @current-change="handleCurrentChange($event, getTableList)"
                   :page-sizes="page.pageSizes"
                   :page-size="page.pageSize"
                   :current-page="page.currPage"
                   :total="page.totalCount"
                   :layout="page.layout">
      </iPagination>

        <iDialog
            :title="language('YINYONGRFQZHONGLINGJIAN', '引用RFQ中零件')"
            :visible.sync="rfqShowType"
            v-if="rfqShowType"
            width="85%"
            @close='closeDiolog'
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
            <addData @close="saveGzClose"></addData>
        </iDialog>

        <iDialog
            :title="language('YINGYONGDINGDIANSHENQINGDANLINGJIAN', '引用定点申请单零件')"
            :visible.sync="quoteDialog"
            v-if="quoteDialog"
            width="90%"
            @close="quoteType"
            >
            <quoteData @close="quoteClose" @quoteDialog="quoteDialogList"></quoteData>
        </iDialog>

        <iDialog
            :title="language('LSMTZLJZSJ', '历史MTZ零件主数据')"
            :visible.sync="historyType"
            v-if="historyType"
            width="90%"
            @close="historyCls"
            >
            <historyBox @close="historyClose" @historyDialog="historyDialogList"></historyBox>
        </iDialog>

    </iCard>
</template>

<script>
import { iCard, iButton, iPagination, iMessage,iInput,iDatePicker,iDialog,iMessageBox } from 'rise'
import { pageMixins } from "@/utils/pageMixins"
import rfqDialog from "./rfqDialog";
import quoteData from "./quoteData";
import addData from "./addData";
import historyBox from "./historyBox";
import { getRawMaterialNos } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/supplementary/details';
import {
  pagePartMasterData,//维护MTZ零件主数据-分页查询
  addBatchPartMasterData,//维护MTZ零件主数据-新增多条
  modifyPartMasterData,//维护MTZ零件主数据-编辑多条
  deletePartMasterData,//维护MTZ零件主数据-删除
  listPartNumSupplierIdData,
  pageAppRule
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/details';
import {
  getMtzSupplierList,//获取原材料牌号
} from '@/api/mtz/annualGeneralBudget/mtzReplenishmentOverview';

import { deepClone } from "./util"
import { formRulesLJ } from "./data";

export default {
  name: "Search",
  componentName: "theTable",
  props:["appStatus"],
  components: {
    iCard,
    iButton,
    iPagination,
    iInput,
    iDatePicker,
    rfqDialog,
    iDialog,
    addData,
    quoteData,
    historyBox
  },
  watch: {
  },
  mixins: [pageMixins],
  data () {
    return {
        formRules:formRulesLJ,
        supplierList:[],//供应商编号
        ruleNo:[],//规则编号
        tableData: [],
        newDataList:[],
        editId:"",
        selectList:[],
        loading: false,
        materialCode:[],
        thresholdCompensationLogic:[
            {
                code:"A",
                message:"全额补差"
            },{
                code:"B",
                message:"超额补差"
            }
        ],
        rfqShowType:false,
        editType:false,
        addDialog:false,
        quoteDialog:false,
        historyType:false,
        dialogEditType:false,
    }
  },
  computed:{
      mtzObject(){
        return this.$store.state.location.mtzObject;
      },

  },
  watch: {
    mtzObject(newVlue,oldValue){
      // console.log(newVlue)
      this.init()
    },
  },
  created(){
    this.pageAppRequest();
    getMtzSupplierList({}).then(res=>{
        this.supplierList = res.data;
    })
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
        if(this.$route.query.supplierId == undefined){
            this.getTableList()
        }else{
            this.getTableDown();
        }

        getRawMaterialNos({}).then(res=>{
            this.materialCode = res.data;
        })
    },
    pageAppRequest(){
        pageAppRule({
            pageNo: 1,
            pageSize: 99999,
            mtzAppId: this.$route.query.mtzAppId || JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId,
        }).then(res=>{
            this.ruleNo = res.data;
        })
    },
    selectionType(row){
        if(this.editType == true){
            return false;
        }else{
            return true;
        }
    },
    add(){//新增
        this.addDialog = true;
    },
    edit(){//编辑
        if(this.selectList.length>0){
            this.pageAppRequest();
            this.editType = true;
            var changeArrayList = [];
            this.selectList.forEach(item => {
                changeArrayList.push(item.id);
            })
            this.editId = changeArrayList;
            this.dialogEditType = false;
        }else{
            iMessage.error("请选择需要修改数据！")
        }
    },
    choiseGZ(arr,val){
        var noList = deepClone(this.ruleNo);
        try{
            noList.forEach(e => {
                if(e.id == val){
                    e.id = arr.row.id;
                    delete e.mark;
                    arr.row.sapCode = e.supplierId.toString() || e.sapCode.toString();
                    arr.row.priceSource = e.source || e.priceSource;
                    arr.row = (Object.assign(arr.row,e));
                    throw new Error("EndIterative");
                }
            });
        }catch(e){
            if(e.message != "EndIterative") throw e;
        }
    },
    save(){//保存
        if(this.dialogEditType){//新增
            this.newDataList.forEach(e => {
                e.carlineList = null;
            })
            this.$refs['contractForm'].validate(async valid => {
                if (valid) {
                    iMessageBox(this.language('SHIFOUBAOCUN','是否保存？'),this.language('LK_WENXINTISHI','温馨提示'),{
                        confirmButtonText: this.language('QUEREN', '确认'),
                        cancelButtonText: this.language('QUXIAO', '取消')
                    }).then(res=>{
                        addBatchPartMasterData({
                            mtzAppId:this.$route.query.mtzAppId || JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId,
                            mtzAppNomiPartMasterDataList:this.newDataList
                        }).then(res=>{
                            if(res.code == 200){
                                iMessage.success(this.language(res.desEn,res.desZh))
                                this.editId = "";
                                this.editType = false;
                                this.page.currPage = 1;
                                this.page.pageSize = 10;
                                this.dialogEditType = false;
                                this.getTableList();
                            }else{
                                iMessage.error(this.language(res.desEn,res.desZh))
                            }
                        })
                    }).catch(res=>{
                       
                    })
                    this.$refs['contractForm'].clearValidate();
                }else{
                    iMessage.error(this.language("QINGBUQUANBITIANXIANG","请补全必填项"))
                    return false
                }
            })
        }else{//编辑
            this.selectList.forEach(e => {
                e.carlineList = null;
            })
            this.$refs['contractForm'].validate(async valid => {
                if (valid) {
                    console.log(111111);
                    iMessageBox(this.language('SHIFOUBAOCUN','是否保存？'),this.language('LK_WENXINTISHI','温馨提示'),{
                        confirmButtonText: this.language('QUEREN', '确认'),
                        cancelButtonText: this.language('QUXIAO', '取消')
                    }).then(res=>{
                        modifyPartMasterData({
                            mtzAppId:this.$route.query.mtzAppId || JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId,
                            mtzAppNomiPartMasterDataList:this.selectList
                        }).then(res=>{
                            if(res.code == 200){
                                iMessage.success(this.language(res.desEn,res.desZh))
                                this.editId = "";
                                this.editType = false;
                                this.getTableList();
                            }else{
                                iMessage.error(this.language(res.desEn,res.desZh))
                            }
                        })
                    })
                    this.$refs['contractForm'].clearValidate();
                }else{
                    iMessage.error(this.language("QINGBUQUANBITIANXIANG","请补全必填项"))
                    return false
                }
            })
        }
    },
    cancel(){//取消
        iMessageBox(this.language('SHIFOUQUXIAOBIANJI','是否取消编辑？'),this.language('LK_WENXINTISHI','温馨提示'),{
            confirmButtonText: this.language('QUEREN', '确认'),
            cancelButtonText: this.language('QUXIAO', '取消')
        }).then(res=>{
            this.editType = false;
            if(this.dialogEditType){
                this.editId.forEach(e=>{
                    this.tableData.splice(0,1);
                })
                this.dialogEditType = false;
            }else{
                this.getTableList();
            }
        }).then(res=>{
            this.editId = ""; 
        }).catch(res=>{
            
        })
    },
    rfqClick(){//引用RFQ中零件
        this.rfqShowType = true;
    },
    delecte(){//删除
        iMessageBox(this.language('SHIFOUSHANCHU','是否删除？'),this.language('LK_WENXINTISHI','温馨提示'),{
            confirmButtonText: this.language('QUEREN', '确认'),
            cancelButtonText: this.language('QUXIAO', '取消')
        }).then(res=>{
            var numList = [];
            this.selectList.forEach(e=>{
                numList.push(e.id)
            })
            deletePartMasterData({
                idList:numList
            }).then(res=>{
                if(res.code == 200 && res.result){
                    iMessage.success(res.desZh)
                    this.getTableList();
                }else{
                    iMessage.error(res.desZh)
                }
            })
        }).catch(res=>{
            
        })
    },
    locationClick(){
        // iMessageBox(this.language('CCZJSCNYWHDSYLJZSJBGJDDSQDZDYMTZSXDLJDYDGYSJCGYSSYXGGZTJZMTZYCLGZLB','此操作将删除您已维护的所有零件主数据，并根据定点申请单中带有MTZ属性的零件对应的供应商将此供应商所有相关规则添加至MTZ原材料规则列表，是否继续？'),this.language('LK_WENXINTISHI','温馨提示'),{
        //     confirmButtonText: this.language('QUEREN', '确认'),
        //     cancelButtonText: this.language('QUXIAO', '取消')
        // }).then(res=>{
            this.quoteDialog = true;
        // }).catch(res=>{
            
        // })
    },
    historyClick(){
        this.historyType = true;
    },
    saveClose(){
        this.closeDiolog();
    },
    closeDiolog(){
        this.rfqShowType = false;
    },
    historyClose(){
        this.historyCls();
    },
    historyCls(){
        this.historyType = false;
    },
    //获取列表
    getTableList () {
        this.loading = true
        pagePartMasterData({
            pageNo: this.page.currPage,
            pageSize: this.page.pageSize,
            mtzAppId:this.$route.query.mtzAppId || JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId,
        }).then(res=>{
            this.tableData = res.data;
            this.page.currPage = res.pageNum
            this.page.pageSize = res.pageSize
            this.page.totalCount = res.total
            this.loading = false;
        })
    },
    getTableDown(){
        this.loading = true;
        pagePartMasterData({
            pageNo: this.page.currPage,
            pageSize: this.page.pageSize,
            mtzAppId:this.$route.query.mtzAppId || JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId,
        }).then(res=>{
            if(res.data === null) return false;
            if(res.data.length<1){
                listPartNumSupplierIdData({
                    partNumStr:this.$route.query.item,
                    supplierIdStr:this.$route.query.supplierId,
                }).then(res=>{
                    this.loading = false;
                    this.tableData = res.data;
                    this.newDataList = res.data;
                    this.editType = true;

                    var changeArrayList = [];
                    this.$refs.moviesTable.clearSelection();
                    res.data.forEach(item => {
                        changeArrayList.push(item.id);
                        this.$refs.moviesTable.toggleRowSelection(item, true);
                    })
                    this.editId = changeArrayList;
                    this.dialogEditType = true;
                })
            }else{
                this.tableData = res.data;
                this.page.currPage = res.pageNum
                this.page.pageSize = res.pageSize
                this.page.totalCount = res.total
                this.loading = false;
            }
        })
        
    },
    handleSelectionChange(val){
        this.selectList = val;
    },
    saveGzDialog(){
        this.addDialog=false;
    },
    saveGzClose(val){//隐藏维护MTZ零件主数据新增弹窗
        this.saveGzDialog();
        if(val == "fresh"){
            this.getTableList();
        }
    },
    quoteType(){
        this.quoteDialog = false;
    },
    quoteClose(){
        this.quoteType();
    },
    addRfqData(val){
        // this.newDataList = deepClone(val);
        this.closeDiolog();
        var list = [];
        val.forEach((item,index) => {
            if(list[index] == undefined){
                list[index] = {};
                list[index].assemblyPartnum = item.partNum;
                list[index].id = "";
                list[index].partName = item.partNameZh;
                list[index].partUnit = item.unit;
            }
        })
        this.newDataList = list;
        this.tableData.unshift(...list);
        this.editType = true;
        var changeArrayList = [];
        this.$refs.moviesTable.clearSelection();
        list.forEach(item => {
            changeArrayList.push(item.id);
            this.$refs.moviesTable.toggleRowSelection(item, true);
        })
        this.editId = changeArrayList;
        this.dialogEditType = true;
        this.pageAppRequest();
    },
    quoteDialogList(val){
        // this.newDataList = deepClone(val);
        this.quoteType();
        var list = [];
        val.forEach((item,index) => {
            if(list[index] == undefined){
                list[index] = {};
                list[index].assemblyPartnum = item.partNum;
                list[index].id = "";
                list[index].supplierName = item.supplierName;
                list[index].sapCode = item.sapNum;
                list[index].partName = item.partNameCn;
                list[index].partUnit = item.unit;
            }
        })
        this.newDataList = list;
        this.tableData.unshift(...list);
        this.editType = true;
        var changeArrayList = [];
        this.$refs.moviesTable.clearSelection();
        list.forEach(item => {
            changeArrayList.push(item.id);
            this.$refs.moviesTable.toggleRowSelection(item, true);
        })
        this.editId = changeArrayList;
        this.dialogEditType = true;
        this.pageAppRequest();
    },
    historyDialogList(val){
        // this.newDataList = deepClone(val);
        this.historyCls();
        var list = [];
        val.forEach((item,index) => {
            if(list[index] == undefined){
                list[index] = {};
                list[index].assemblyPartnum = item.assemblyPartnum;
                list[index].id = "";
                list[index].supplierName = item.assemblySupplierName;
                list[index].sapCode = item.assemblySupplierSap;
                list[index].ruleNo = item.ruleNo;
                list[index].materialCode = item.materialCode;
                list[index].materialName = item.material;
                list[index].priceUnit = item.priceUnit;
                list[index].partName = item.assemblyPartName;
                list[index].partUnit = item.countUnit;
            }
        })
        // console.log(list);
        this.newDataList = list;
        this.tableData.unshift(...list);
        this.editType = true;
        var changeArrayList = [];
        this.$refs.moviesTable.clearSelection();
        list.forEach(item => {
            changeArrayList.push(item.id);
            this.$refs.moviesTable.toggleRowSelection(item, true);
        })
        this.editId = changeArrayList;
        this.dialogEditType = true;
        this.pageAppRequest();
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-table .el-table__row .el-input{
    width:100%!important;
}
::v-deep .el-select__tags{
    max-width:100%!important;
}
.formStyle ::v-deep .el-form-item {
  margin-top: 0;
  margin-bottom: 0;
}
</style>
