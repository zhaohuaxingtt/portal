
<!-- 维护MTZ零件主数据表格 -->
<template>
    <iCard class="margin-top20">
      <template v-slot:header>
        <span>
          {{language('WHMTZLLZSJ','维护MTZ零件主数据')}}
        </span>
        <div>
          <iButton @click="cancel" v-if="editType">{{ language('QUXIAO', '取消') }}</iButton>
          <iButton @click="rfqClick" v-if="!editType">{{ language('YYRFQZLJ', '引用RFQ中零件') }}</iButton>
          <iButton @click="locationClick" v-if="!editType">{{ language('YYDDSQDLJ', '引用定点申请单零件') }}</iButton>
          <iButton @click="historyClick" v-if="!editType">{{ language('ZJLSMTZLJZSJ', '增加历史MTZ零件主数据') }}</iButton>
          <iButton @click="add" v-if="!editType">{{ language('XINZENG', '新增') }}</iButton>
          <iButton @click="edit" v-if="!editType">{{ language('BIANJI', '编辑') }}</iButton>
          <iButton @click="delecte" v-if="!editType">{{ language('SHANCHU', '删除') }}</iButton>
          <iButton @click="save" v-if="editType">{{ language('BAOCUN', '保存') }}</iButton>
        </div>
      </template>
      <el-table :data="tableData"
                ref="moviesTable"
                v-loading="loading"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"
                        :selectable="selectionType"
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
                <iInput v-model="scope.row.assemblyPartnum" v-if="scope.row.id==editId"></iInput>
                <span v-else>{{scope.row.assemblyPartnum}}</span>
            </template>        
        </el-table-column>
        <el-table-column prop="sapCode"
                         align="center"
                         :label="language('GONGYINGSHANGBIANHAOMINGCHENG','供应商编号/名称')"
                         show-overflow-tooltip
                         width="150">
                         <!-- supplierName供应商名称 -->
            <template slot-scope="scope">
                <iInput v-model="scope.row.sapCode" v-if="scope.row.id==editId"></iInput>
                <span v-else>{{scope.row.sapCode}}/{{scope.row.supplierName}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="ruleNo"
                         align="center"
                         :label="language('GUIZEBIANHAO','规则编号')"
                         show-overflow-tooltip
                         width="150">
            <template slot-scope="scope">
                <iInput v-model="scope.row.ruleNo" v-if="scope.row.id==editId"></iInput>
                <span v-else>{{scope.row.ruleNo}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="priceUnit"
                         align="center"
                         :label="language('MEI','每')"
                         show-overflow-tooltip
                         width="150">
            <template slot-scope="scope">
                <iInput v-model="scope.row.priceUnit" v-if="scope.row.id==editId"></iInput>
                <span v-else>{{scope.row.priceUnit}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="partUnit"
                         align="center"
                         width="150"
                         :label="language('LINGJIANSHULIANGDANWEI','零件数量单位')"
                         show-overflow-tooltip>
             <template slot-scope="scope">
                <iInput v-model="scope.row.partUnit" v-if="scope.row.id==editId"></iInput>
                <span v-else>{{scope.row.partUnit}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="dosage"
                         align="center"
                         width="150"
                         :label="language('YONGLIANG','用量')"
                         show-overflow-tooltip>
             <template slot-scope="scope">
                <iInput v-model="scope.row.dosage" v-if="scope.row.id==editId"></iInput>
                <span v-else>{{scope.row.dosage}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="dosageMeasureUnit"
                         align="center"
                         width="150"
                         :label="language('YONGLIANGJILIANGDANEWI','用量计量单位')"
                         show-overflow-tooltip>
            <template slot-scope="scope">
                <iInput v-model="scope.row.dosageMeasureUnit" v-if="scope.row.id==editId"></iInput>
                <span v-else>{{scope.row.dosageMeasureUnit}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="startDate"
                         align="center"
                         width="150"
                         :label="language('YOUXIAOQIQI','有效期起')"
                         show-overflow-tooltip>
            <template slot-scope="scope">
                <iDatePicker v-model="scope.row.startDate"
                            type="datetime"
                            v-if="scope.row.id==editId"
                            >
                </iDatePicker>
                <span v-else>{{scope.row.startDate}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="endDate"
                         align="center"
                         width="150"
                         :label="language('YOUXIAOQIZHI','有效期止')"
                         show-overflow-tooltip>
            <template slot-scope="scope">
                <iDatePicker v-model="scope.row.endDate"
                            type="datetime"
                            v-if="scope.row.id==editId"
                            >
                </iDatePicker>
                <span v-else>{{scope.row.endDate}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="mark"
                         align="center"
                         width="200"
                         :label="language('BEIZHU','备注')"
                         show-overflow-tooltip>
            <template slot-scope="scope">
                <iInput v-model="scope.row.mark" v-if="scope.row.id==editId"></iInput>
                <span v-else>{{scope.row.mark}}</span>
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
                         v-if="scope.row.id==editId"
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
        </el-table-column>
        <el-table-column prop="price"
                         align="center"
                         width="150"
                         :label="language('JIJIA','基价')"
                         show-overflow-tooltip>
            <template slot-scope="scope">
                <iInput v-model="scope.row.price" v-if="scope.row.id==editId"></iInput>
                <span v-else>{{scope.row.price}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="priceMeasureUnit"
                         align="center"
                         width="150"
                         :label="language('JIJIAJILIANGDANWEI','基价计量单位')"
                         show-overflow-tooltip>
            <template slot-scope="scope">
                <iInput v-model="scope.row.priceMeasureUnit" v-if="scope.row.id==editId"></iInput>
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
                <iInput v-model="scope.row.platinumPrice" v-if="scope.row.id==editId"></iInput>
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
                <iInput v-model="scope.row.platinumDosage" v-if="scope.row.id==editId"></iInput>
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
                <iInput v-model="scope.row.palladiumPrice" v-if="scope.row.id==editId"></iInput>
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
                <iInput v-model="scope.row.palladiumDosage" v-if="scope.row.id==editId"></iInput>
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
                <iInput v-model="scope.row.rhodiumPrice" v-if="scope.row.id==editId"></iInput>
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
                <iInput v-model="scope.row.rhodiumDosage" v-if="scope.row.id==editId"></iInput>
                <span v-else>{{scope.row.rhodiumDosage}}</span>
            </template>
        </el-table-column>

        <el-table-column prop="tcCurrence"
                         align="center"
                         width="150"
                         :label="language('HUOBI','货币')"
                         show-overflow-tooltip>
            <template slot-scope="scope">
                <iInput v-model="scope.row.tcCurrence" v-if="scope.row.id==editId"></iInput>
                <span v-else>{{scope.row.tcCurrence}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="tcExchangeRate"
                         align="center"
                         width="150"
                         :label="language('HUILV','汇率')"
                         show-overflow-tooltip>
            <template slot-scope="scope">
                <iInput v-model="scope.row.tcExchangeRate" v-if="scope.row.id==editId"></iInput>
                <span v-else>{{scope.row.tcExchangeRate}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="priceSource"
                         align="center"
                         width="150"
                         :label="language('SHICHANGJIALAIYUAN','市场价来源')"
                         show-overflow-tooltip>
            <template slot-scope="scope">
                <iInput v-model="scope.row.priceSource" v-if="scope.row.id==editId"></iInput>
                <span v-else>{{scope.row.priceSource}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="compensationRatio"
                         align="center"
                         width="150"
                         :label="language('BUCHAXISHU','补差系数')"
                         show-overflow-tooltip>
            <template slot-scope="scope">
                <iInput v-model="scope.row.compensationRatio" v-if="scope.row.id==editId"></iInput>
                <span v-else>{{scope.row.compensationRatio}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="compensationPeriod"
                         align="center"
                         width="150"
                         :label="language('BUCHAZHOUQI','补差周期')"
                         show-overflow-tooltip>
            <template slot-scope="scope">
                <iInput v-model="scope.row.compensationPeriod" v-if="scope.row.id==editId"></iInput>
                <span v-else>{{scope.row.compensationPeriod}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="threshold"
                         align="center"
                         width="150"
                         :label="language('YUZHI','阈值')"
                         show-overflow-tooltip>
            <template slot-scope="scope">
                <iInput v-model="scope.row.threshold" v-if="scope.row.id==editId"></iInput>
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
                         v-if="scope.row.id==editId"
                        >
                    <el-option
                        v-for="item in thresholdCompensationLogic"
                        :key="item.code"
                        :label="item.message"
                        :value="item.code">
                    </el-option>
                </el-select>
                <span v-else>{{scope.row.thresholdCompensationLogic=='A'?"全额补差":"超额补差"}}</span>
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
        :title="language('YINYONGRFQZHONGSHIJIAN', '引用RFQ中事件')"
        :visible.sync="rfqShowType"
        v-if="rfqShowType"
        width="90%"
        @close='closeDiolog'
            >
            <rfqDialog @close="saveClose"></rfqDialog>
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
            <quoteData @close="quoteClose"></quoteData>
        </iDialog>

        <iDialog
            :title="language('LSMTZLJZSJ', '历史MTZ零件主数据')"
            :visible.sync="historyType"
            v-if="historyType"
            width="90%"
            @close="historyCls"
            >
            <historyBox @close="historyClose"></historyBox>
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
  modifyPartMasterData
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/details';

export default {
  name: "Search",
  componentName: "theTable",
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
        tableData: [],
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
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
        this.getTableList()

        getRawMaterialNos({}).then(res=>{
            this.materialCode = res.data;
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
        if(this.selectList.length==1){
            this.editId = this.selectList[0].id;
            this.editType = true;
        }else{
            iMessage.error("请选择且只能选择一条数据！")
        }
    },
    save(){//保存
        modifyPartMasterData({
            mtzAppId:this.$route.query.id,
            mtzAppNomiPartMasterDataList:[{
                ...this.selectList[0]
            }]
        }).then(res=>{
            if(res.code == 200){
                iMessage.success(res.desZh)
                this.editId = "";
                this.editType = false;
            }else{
                iMessage.error(res.message)
            }
        })
    },
    cancel(){//取消
        iMessageBox(this.language('SHIFOUQUXIAOBIANJI','是否取消编辑？'),this.language('LK_WENXINTISHI','温馨提示'),{
            confirmButtonText: this.language('QUEREN', '确认'),
            cancelButtonText: this.language('QUXIAO', '取消')
        }).then(res=>{
            this.editId = "";
            this.editType = false;
        }).catch(res=>{
            
        })
    },
    rfqClick(){//引用RFQ中零件
        this.rfqShowType = true;
    },
    delecte(){//删除

    },
    locationClick(){
        this.quoteDialog = true;
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
    //   this.loading = true
        pagePartMasterData({
            pageNo: this.page.currPage,
            pageSize: this.page.pageSize,
            mtzAppId:this.$route.query.id
        }).then(res=>{
            console.log(res);
            this.tableData = res.data;
            this.page.currPage = res.pageNum
            this.page.pageSize = res.pageSize
            this.page.totalCount = res.total
        })
    },
    handleSelectionChange(val){
        this.selectList = val;
    },
    saveGzDialog(){
        this.addDialog=false;
    },
    saveGzClose(){
        this.saveGzDialog();
    },
    quoteType(){
        this.quoteDialog = false;
    },
    quoteClose(){
        this.quoteType();
    },
  }
}
</script>

<style lang="scss" scoped>
</style>
