
<!--
 维护MTZ原材料规则表格
-->
<template>
    <iCard class="margin-top20">
      <template v-slot:header>
        <span>
          {{language('WHMTZYCLGZ','维护MTZ原材料规则')}}
        </span>
        <div>
          <iButton @click="cancel" v-if="editType && appStatus == '草稿' || appStatus == '未通过'">{{ language('QUXIAO', '取消') }}</iButton>
          <iButton @click="add" v-if="!editType && appStatus == '草稿' || appStatus == '未通过'">{{ language('XINZENG', '新增') }}</iButton>
          <iButton @click="edit" v-if="!editType && appStatus == '草稿' || appStatus == '未通过'">{{ language('BIANJI', '编辑') }}</iButton>
          <iButton @click="continueBtn" v-if="!editType && appStatus == '草稿' || appStatus == '未通过'">{{ language('YANYONG', '沿用') }}</iButton>
          <iButton @click="delecte" v-if="!editType && appStatus == '草稿' || appStatus == '未通过'">{{ language('SHANCHU', '删除') }}</iButton>
          <iButton @click="save" v-if="editType && appStatus == '草稿' || appStatus == '未通过'">{{ language('BAOCUN', '保存') }}</iButton>
        </div>
      </template>
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
        <el-table-column prop="ruleNo"
                         align="center"
                         show-overflow-tooltip
                         width="150"
                         :label="language('GUIZEBIANHAO','规则编号')">
            <!-- <template slot-scope="scope">
                <iInput v-model="scope.row.ruleNo" v-if="editId.indexOf(scope.row.id)!==-1"></iInput>
                <span v-else>{{scope.row.ruleNo}}</span>
            </template> -->
        </el-table-column>

        <el-table-column prop="effectFlag"
                         align="center"
                         :label="language('SHIFOUSHENGXIAO','是否生效')"
                         show-overflow-tooltip
                         width="150">
            <template slot-scope="scope">
                <el-select v-model="scope.row.effectFlag"
                         clearable
                         :placeholder="language('QINGSHURU', '请输入')"
                         v-if="editId.indexOf(scope.row.id)!==-1"
                        >
                    <el-option
                        v-for="item in effectFlag"
                        :key="item.code"
                        :label="item.message"
                        :value="item.code">
                    </el-option>
                </el-select>
                <span v-else>{{scope.row.effectFlag==1?"是":scope.row.effectFlag==0?"否":""}}</span>
            </template>
        </el-table-column>
        
        <el-table-column prop="materialGroup"
                         align="center"
                         :label="language('MTZCAILIAOZU','MTZ-材料组')"
                         show-overflow-tooltip
                         width="150">
            <template slot-scope="scope">
                <el-select v-model="scope.row.materialGroup"
                         clearable
                         :placeholder="language('QINGSHURU', '请输入')"
                         v-if="editId.indexOf(scope.row.id)!==-1"
                        >
                    <el-option
                        v-for="item in materialGroup"
                        :key="item.materialGroupCode"
                        :label="item.materialGroupNameZh"
                        :value="item.materialGroupCode">
                    </el-option>
                </el-select>
                <span v-else>{{scope.row.materialGroup}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="carline"
                         align="center"
                         :label="language('CHEXING','车型')"
                         show-overflow-tooltip
                         width="150">
            <template slot-scope="scope">
                <iInput v-model="scope.row.carline" v-if="editId.indexOf(scope.row.id)!==-1"></iInput>
                <span v-else>{{scope.row.carline}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="supplierId"
                         align="center"
                         width="150"
                         :label="language('GONGYINGSHANGBIANHAO','供应商编号')"
                         show-overflow-tooltip>
             <template slot-scope="scope">
                 <el-select v-model="scope.row.supplierId"
                         clearable
                         filterable
                         :placeholder="language('QINGSHURU', '请输入')"
                         @change="supplierBH(scope,$event)"
                         v-if="editId.indexOf(scope.row.id)!==-1"
                        >
                    <el-option
                        v-for="item in supplierList"
                        :key="item.code"
                        :label="item.code"
                        :value="item.code">
                    </el-option>
                </el-select>
                <span v-else>{{scope.row.supplierId}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="supplierName"
                         align="center"
                         width="150"
                         :label="language('GONGYINGSHANGMINGCHENG','供应商名称')"
                         show-overflow-tooltip>
             <template slot-scope="scope">
                <el-select v-model="scope.row.supplierName"
                         clearable
                         filterable
                         :placeholder="language('QINGSHURU', '请输入')"
                         @change="supplierNC(scope,$event)"
                         v-if="editId.indexOf(scope.row.id)!==-1"
                        >
                    <el-option
                        v-for="item in supplierList"
                        :key="item.message"
                        :label="item.message"
                        :value="item.message">
                    </el-option>
                </el-select>
                <span v-else>{{scope.row.supplierName}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="materialCode"
                         align="center"
                         width="150"
                         :label="language('YUANCAILIAOPAIHAO','原材料牌号')"
                         show-overflow-tooltip>
            <template slot-scope="scope">
                <el-select v-model="scope.row.materialCode"
                         clearable
                         :placeholder="language('QINGSHURU', '请输入')"
                         v-if="editId.indexOf(scope.row.id)!==-1"
                         @change="MaterialGrade(scope,$event)"
                        >
                    <el-option
                        v-for="item in materialCode"
                        :key="item.code"
                        :label="item.message"
                        :value="item.code">
                    </el-option>
                </el-select>
                <span v-else>{{scope.row.materialCode}}</span>
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
                <iInput type="number" v-model="scope.row.price" v-if="editId.indexOf(scope.row.id)!==-1"></iInput>
                <span v-else>{{scope.row.price}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="priceMeasureUnit"
                         align="center"
                         width="150"
                         :label="language('JIJIAJILIANGDANWEI','基价计量单位')"
                         show-overflow-tooltip>
            <template slot-scope="scope">
                <iInput v-model="scope.row.priceMeasureUnit" v-if="editId.indexOf(scope.row.id)!==-1"></iInput>
                <span v-else>{{scope.row.priceMeasureUnit}}</span>
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
                            <p>{{language('xxxxxxxx','xxxxxxxx')}}</p>
                        </div>
                        <i class="el-icon-warning-outline margin-left10"
                        style="color:blue"></i>
                    </el-tooltip>
                </div>
            </template>
            <template slot-scope="scope">
                <iInput type="number" v-model="scope.row.platinumPrice" v-if="editId.indexOf(scope.row.id)!==-1"></iInput>
                <span v-else>{{scope.row.platinumPrice}}</span>
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
                            <p>{{language('xxxxxxxx','xxxxxxxx')}}</p>
                        </div>
                        <i class="el-icon-warning-outline margin-left10"
                        style="color:blue"></i>
                    </el-tooltip>
                </div>
            </template>
            <template slot-scope="scope">
                <iInput type="number" v-model="scope.row.platinumDosage" v-if="editId.indexOf(scope.row.id)!==-1"></iInput>
                <span v-else>{{scope.row.platinumDosage}}</span>
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
                            <p>{{language('xxxxxxxx','xxxxxxxx')}}</p>
                        </div>
                        <i class="el-icon-warning-outline margin-left10"
                        style="color:blue"></i>
                    </el-tooltip>
                </div>
            </template>
            <template slot-scope="scope">
                <iInput type="number" v-model="scope.row.palladiumPrice" v-if="editId.indexOf(scope.row.id)!==-1"></iInput>
                <span v-else>{{scope.row.palladiumPrice}}</span>
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
                            <p>{{language('xxxxxxxx','xxxxxxxx')}}</p>
                        </div>
                        <i class="el-icon-warning-outline margin-left10"
                        style="color:blue"></i>
                    </el-tooltip>
                </div>
            </template>
            <template slot-scope="scope">
                <iInput type="number" v-model="scope.row.palladiumDosage" v-if="editId.indexOf(scope.row.id)!==-1"></iInput>
                <span v-else>{{scope.row.palladiumDosage}}</span>
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
                            <p>{{language('xxxxxxxx','xxxxxxxx')}}</p>
                        </div>
                        <i class="el-icon-warning-outline margin-left10"
                        style="color:blue"></i>
                    </el-tooltip>
                </div>
            </template>
            <template slot-scope="scope">
                <iInput type="number" v-model="scope.row.rhodiumPrice" v-if="editId.indexOf(scope.row.id)!==-1"></iInput>
                <span v-else>{{scope.row.rhodiumPrice}}</span>
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
                            <p>{{language('xxxxxxxx','xxxxxxxx')}}</p>
                        </div>
                        <i class="el-icon-warning-outline margin-left10"
                        style="color:blue"></i>
                    </el-tooltip>
                </div>
            </template>
            <template slot-scope="scope">
                <iInput type="number" v-model="scope.row.rhodiumDosage" v-if="editId.indexOf(scope.row.id)!==-1"></iInput>
                <span v-else>{{scope.row.rhodiumDosage}}</span>
            </template>
        </el-table-column>

        <el-table-column prop="tcCurrence"
                         align="center"
                         width="150"
                         :label="language('HUOBI','货币')"
                         show-overflow-tooltip>
            <template slot-scope="scope">
                <iInput v-model="scope.row.tcCurrence" v-if="editId.indexOf(scope.row.id)!==-1"></iInput>
                <span v-else>{{scope.row.tcCurrence}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="tcExchangeRate"
                         align="center"
                         width="150"
                         :label="language('HUILV','汇率')"
                         show-overflow-tooltip>
            <template slot-scope="scope">
                <iInput type="number" v-model="scope.row.tcExchangeRate" v-if="editId.indexOf(scope.row.id)!==-1"></iInput>
                <span v-else>{{scope.row.tcExchangeRate}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="source"
                         align="center"
                         width="150"
                         :label="language('SHICHANGJIALAIYUAN','市场价来源')"
                         show-overflow-tooltip>
            <template slot-scope="scope">
                <iInput v-model="scope.row.source" v-if="editId.indexOf(scope.row.id)!==-1"></iInput>
                <span v-else>{{scope.row.source}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="compensationRatio"
                         align="center"
                         width="150"
                         :label="language('BUCHAXISHU','补差系数')"
                         show-overflow-tooltip>
            <template slot-scope="scope">
                <iInput type="number" @blur="ratioRules(scope)" v-model="scope.row.compensationRatio" v-if="editId.indexOf(scope.row.id)!==-1"></iInput>
                <span v-else>{{scope.row.compensationRatio}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="compensationPeriod"
                         align="center"
                         width="150"
                         :label="language('BUCHAZHOUQI','补差周期')"
                         show-overflow-tooltip>
            <template slot-scope="scope">
                <el-select v-model="scope.row.compensationPeriod"
                         clearable
                         :placeholder="language('QINGSHURU', '请输入')"
                         v-if="editId.indexOf(scope.row.id)!==-1"
                        >
                    <el-option
                        v-for="item in compensationPeriod"
                        :key="item.code"
                        :label="item.message"
                        :value="item.code">
                    </el-option>
                </el-select>
                <span v-else>{{scope.row.compensationPeriod == "A"?"年度":scope.row.compensationPeriod == "H"?"半年度":scope.row.compensationPeriod == "Q"?"季度":scope.row.compensationPeriod == "M"?"月度":""}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="threshold"
                         align="center"
                         width="150"
                         :label="language('YUZHI','阈值')"
                         show-overflow-tooltip>
            <template slot-scope="scope">
                <iInput v-model="scope.row.threshold" v-if="editId.indexOf(scope.row.id)!==-1"></iInput>
                <span v-else>{{scope.row.threshold}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="thresholdCompensationLogic"
                         align="center"
                         width="150"
                         :label="language('YUZHIBUCHALUOJI','阈值补差逻辑')"
                         show-overflow-tooltip>
            <template slot-scope="scope">
                <el-select v-model="scope.row.thresholdCompensationLogic"
                         clearable
                         :placeholder="language('QINGSHURU', '请输入')"
                         v-if="editId.indexOf(scope.row.id)!==-1"
                        >
                    <el-option
                        v-for="item in thresholdCompensationLogic"
                        :key="item.code"
                        :label="item.message"
                        :value="item.code">
                    </el-option>
                </el-select>
                <span v-else>{{scope.row.thresholdCompensationLogic}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="startDate"
                         align="center"
                         width="180"
                         :label="language('YOUXIAOQIQI','有效期起')"
                         show-overflow-tooltip>
            <template slot-scope="scope">
                <iDatePicker v-model="scope.row.startDate"
                            type="datetime"
                            v-if="editId.indexOf(scope.row.id)!==-1"
                            >
                </iDatePicker>
                <span v-else>{{scope.row.startDate}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="endDate"
                         align="center"
                         width="180"
                         :label="language('YOUXIAOQIZHI','有效期止')"
                         show-overflow-tooltip>
            <template slot-scope="scope">
                <iDatePicker v-model="scope.row.endDate"
                            type="datetime"
                            v-if="editId.indexOf(scope.row.id)!==-1"
                            >
                </iDatePicker>
                <span v-else>{{scope.row.endDate}}</span>
            </template>
        </el-table-column>
      </el-table>
      <iPagination @size-change="handleSizeChange($event, getTableList)"
                   @current-change="handleCurrentChange($event, getTableList)"
                   :page-sizes="page.pageSizes"
                   :page-size="page.pageSize"
                   :current-page="page.currPage"
                   :total="page.totalCount"
                   :layout="page.layout">
      </iPagination>

    <iDialog
      :title="language('SHUJUYANYONG', '数据沿用')"
      :visible.sync="mtzAddShow"
      v-if="mtzAddShow"
      width="90%"
      @close='closeDiolog'
        >
        <continueBox @addDialogData="addDialogDataList"></continueBox>
    </iDialog>

    <iDialog
        :title="language('XINZENGMTZYUANCAILIAOGUIZE', '新增MTZ原材料规则')"
        :visible.sync="addDialog"
        v-if="addDialog"
        width="70%"
        @close="saveGzDialog"
        >
        <addGZ @close="saveGzClose" @addDialogGZ="addDialogGZList"></addGZ>
    </iDialog>

    </iCard>
</template>

<script>
import { iCard, iButton, iPagination, icon, iMessage,iMessageBox,iInput,iDatePicker,iDialog } from 'rise'
import { pageMixins } from "@/utils/pageMixins"
import continueBox from "./continueBox";
import addGZ from "./addGZ";
import { deepClone } from "./util";
import store from "@/store";
import {
  getMtzSupplierList,//获取原材料牌号
} from '@/api/mtz/annualGeneralBudget/mtzReplenishmentOverview';
import {
  pageAppRule,//维护MTZ原材料规则-分页查询
  updateAppRule,
  addBatchAppRule,//维护MTZ原材料规则-批量新增
  deleteAppRule,//列表删除,
  modifyAppRule
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/details';
import { getRawMaterialNos } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/supplementary/details';
import {
  fetchRemoteMtzMaterial,//查询MTZ材料组
} from '@/api/mtz/annualGeneralBudget/annualBudgetEdit';

export default {
  name: "Search",
  componentName: "theTable",
  components: {
    iCard,
    iButton,
    iPagination,
    iInput,
    iDatePicker,
    continueBox,
    iDialog,
    addGZ
  },
  watch: {
  },
  props:["appStatus"],
  mixins: [pageMixins],
  data () {
    return {
        supplierList:[],
        newDataList:[],//传过来的列表数据
        editType:false,
        tableData: [],
        editId:"",
        selectList:[],
        loading: false,
        listData:{},
        selectData:{},

        effectFlag:[
            {
                code:0,
                message:"否"
            },{
                code:1,
                message:"是"
            }
        ],
        compensationPeriod:[
            { code: 'A', message: '年度' },
            { code: 'H', message: '半年度' },
            { code: 'Q', message: '季度' },
            { code: 'M', message: '月度' },
        ],
        thresholdCompensationLogic:[
            {
                code:"A",
                message:"全额补差"
            },{
                code:"B",
                message:"超额补差"
            }
        ],
        materialGroup:[],
        materialCode:[],
        mtzAddShow:false,
        addDialog:false,

        dialogEditType:false,//判断是否是沿用过来的数据
    }
  },
  computed:{
      mtzObject(){
        return this.$store.state.location.mtzObject;
      }
  },
  watch: {
    mtzObject(newVlue,oldValue){
      // console.log(newVlue)
      this.init()
    }
  },
  created () {
    this.init()
    getMtzSupplierList({}).then(res=>{
        this.supplierList = res.data;
    })
    getRawMaterialNos({}).then(res=>{
        this.materialCode = res.data;
    })
  },
  methods: {
    init () {
        this.getTableList();
        this.getMtzCailiao();
    },
    add(){//新增
        this.addDialog = true;
    },
    edit(){//编辑
        if(this.selectList.length>0){
            this.editType = true;
            var changeArrayList = [];
            this.selectList.forEach(item => {
                changeArrayList.push(item.id);
            })
            this.editId = changeArrayList;
        }else{
            iMessage.error("请选择需要修改数据！")
        }
    },
    save(){//保存
        iMessageBox(this.language('SHIFOUBAOCUN','是否保存？'),this.language('LK_WENXINTISHI','温馨提示'),{
            confirmButtonText: this.language('QUEREN', '确认'),
            cancelButtonText: this.language('QUXIAO', '取消')
        }).then(res=>{
            if(this.dialogEditType){//新增
                addBatchAppRule({
                    mtzAppId:this.$route.query.mtzAppId || JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId,
                    mtzAppNomiAppRuleList:this.newDataList
                }).then(res=>{
                    if(res.code == 200){
                        iMessage.success(this.language(res.desEn,res.desZh))
                        this.editId = "";
                        this.editType = false;
                        this.page.currPage = 1;
                        this.page.pageSize = 10;
                        this.getTableList();
                    }else{
                        iMessage.error(res.message)
                    }
                })
            }else{//编辑
                modifyAppRule({
                    mtzAppId:this.$route.query.mtzAppId || JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId,
                    mtzAppNomiAppRuleList:this.selectList
                }).then(res=>{
                    if(res.code == 200){
                        this.editId = "";
                        this.editType = false;
                        this.getTableList();
                    }else{
                        iMessage.error(res.message)
                    }
                })
            }
        }).catch(res=>{
            
        })
    },
    cancel(){//取消
        var that = this;
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
    continueBtn(){//沿用
        this.mtzAddShow = true;
    },
    addDialogDataList(val){
        this.newDataList = deepClone(val);
        this.newDataList.forEach(item =>{
            delete item.id;
        })
        this.closeDiolog();
        this.tableData.unshift(...this.newDataList);
        this.editType = true;
        var changeArrayList = [];
        this.$refs.moviesTable.clearSelection();
        this.newDataList.forEach(item => {
            changeArrayList.push(item.id);
            this.$refs.moviesTable.toggleRowSelection(item, true);
        })
        this.editId = changeArrayList;
        this.dialogEditType = true;
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
            deleteAppRule({
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
    saveClose(){
        this.closeDiolog();
    },
    closeDiolog(){
        this.mtzAddShow = false;
    },
    addDialogGZList(){
        this.saveGzDialog();
        this.page.currPage = 1;
        this.page.pageSize = 10;
        this.getTableList();
    },
    saveGzDialog(){
        this.addDialog=false;
    },
    saveGzClose(){
        this.saveGzDialog();
    },
    selectionType(row){
        if(this.editType == true){
            return false;
        }else{
            return true;
        }
    },
    //获取列表
    getTableList () {
        this.loading = true
        pageAppRule({
            pageNo: this.page.currPage,
            pageSize: this.page.pageSize,
            mtzAppId: this.$route.query.mtzAppId || JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId,
            sortType:"DESC",
            sortColumn:"id"
        }).then(res=>{
            this.tableData = res.data;
            this.page.currPage = res.pageNum
            this.page.pageSize = res.pageSize
            this.page.totalCount = res.total
            this.loading = false;
            if(res.total < 1){
                store.commit("submitDataNumber",0);
                console.log(0)
            }else{
                store.commit("submitDataNumber",1);
                console.log(1)
            }
        })
    },
    getMtzCailiao(){
        fetchRemoteMtzMaterial({}).then(res=>{
            this.materialGroup = res.data;
        })
    },
    handleSelectionChange(val){
        this.selectList = val;
    },
    supplierBH(arr,value){
        var str = arr.row;
        if(value == ""){
            str.supplierName = "";
            str.supplierId = "";
        }
        try{
            this.supplierList.forEach(e => {
                if(e.code == value){
                    str.supplierName = e.message;
                    str.supplierId = value;
                    throw new Error("EndIterative");
                }
            });
        }catch(e){
            if(e.message != "EndIterative") throw e;
        }
    },
    supplierNC(arr,value){
        var str = arr.row;
        if(value == ""){
            str.supplierName = "";
            str.supplierId = "";
        }
        try{
            this.supplierList.forEach(e => {
                if(e.message == value){
                    str.supplierName = value;
                    str.supplierId = e.code;
                    throw new Error("EndIterative");
                }
            });
        }catch(e){
            if(e.message != "EndIterative") throw e;
        }
    },
    MaterialGrade(arr,value){
        var str = arr.row;
        try{
            this.materialCode.forEach(e => {
                if(e.code == value){
                    str.materialName = e.message;
                    throw new Error("EndIterative");
                }
            });
        }catch(e){
            if(e.message != "EndIterative") throw e;
        }
    },
    ratioRules(arr){
        var str = arr.row;
        if(str.compensationRatio<0){
            str.compensationRatio = "";
            iMessage.error(this.language("BUCHAXISHUBUNENGWEIFUSHU","补差系数不能为负数"))
        }
    },
  }
}
</script>

<style lang="scss" scoped>
</style>
