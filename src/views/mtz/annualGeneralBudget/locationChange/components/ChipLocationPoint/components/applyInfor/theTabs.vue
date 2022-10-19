<!--
 维护MTZ原材料规则表格
-->
<template>
  <iCard class="margin-top20">
    <template v-slot:header>
      <span>
        {{ language('维护芯片补差规则', '维护芯片补差规则') }}
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
          v-if="!editType && (appStatus == '草稿' || appStatus == '未通过')"
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
          v-if="!editType && (appStatus == '草稿' || appStatus == '未通过')"
          >{{ language('XIAZAIMUBAN', '下载模板') }}</iButton
        >
        <iButton
          @click="cancel"
          v-if="editType && (appStatus == '草稿' || appStatus == '未通过')"
          >{{ language('QUXIAO', '取消') }}</iButton
        >
        <iButton
          @click="add"
          v-if="!editType && (appStatus == '草稿' || appStatus == '未通过')"
          >{{ language('XINZENG', '新增') }}</iButton
        >
        <iButton
          @click="edit"
          v-if="!editType && (appStatus == '草稿' || appStatus == '未通过')"
          >{{ language('BIANJI', '编辑') }}</iButton
        >
        <iButton
          @click="continueBtn"
          v-if="!editType && (appStatus == '草稿' || appStatus == '未通过')"
          >{{ language('YANYONG', '沿用') }}</iButton
        >
        <iButton
          @click="delecte"
          v-if="!editType && (appStatus == '草稿' || appStatus == '未通过')"
          >{{ language('SHANCHU', '删除') }}</iButton
        >
        <iButton
          @click="save"
          v-if="editType && (appStatus == '草稿' || appStatus == '未通过')"
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
      <el-table
        :data="tableData"
        ref="moviesTable"
        border
        v-loading="loading"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          :selectable="selectionType"
          fixed
          width="60"
          align="center"
        >
        </el-table-column>
        <el-table-column label="#" fixed type="index" width="60" align="center">
        </el-table-column>
        <el-table-column
          prop="ruleNo"
          align="center"
          show-overflow-tooltip
          width="100"
          :label="language('GUIZEBIANHAO', '规则编号')"
        >
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.' + 'ruleNo'"
              :rules="formRules.ruleNo ? formRules.ruleNo : ''"
            >
              <!-- <iInput v-model="scope.row.ruleNo" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
              <span>{{ scope.row.ruleNo }}</span>
            </el-form-item>
          </template>
        </el-table-column>

        <el-table-column
          prop="formalFlag"
          align="center"
          show-overflow-tooltip
          width="120"
          :label="language('补差方式', '补差方式')"
        >
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.' + 'method'"
              :rules="formRules.method ? formRules.method : ''"
            >
              <!-- <iInput v-model="scope.row.ruleNo" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
              <span>{{
                scope.row.method == '0' ? '变价单补差' : '一次性补差'
              }}</span>
            </el-form-item>
          </template>
        </el-table-column>

        <el-table-column
          prop="sapCode"
          align="center"
          :label="language('GONGYINGSHANGBIANHAO', '供应商编号')"
          show-overflow-tooltip
          width="100"
        >
        </el-table-column>

        <el-table-column
          prop="supplierName"
          align="center"
          :label="language('供应商名称', '供应商名称')"
          show-overflow-tooltip
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="materialGroup"
          align="center"
          :label="language('材料组', '材料组')"
          show-overflow-tooltip
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="materialName"
          align="center"
          width="120"
          :label="language('原材料描述', '原材料描述')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="partNum"
          align="center"
          width="120"
          :label="language('LINGJIANHAO', '零件号')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="partName"
          align="center"
          width="120"
          :label="language('LINGJIANMINGCHENG', '零件名称')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="amount"
          align="center"
          width="150"
          :label="language('补差金额', '补差金额')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="currency"
          align="center"
          width="60"
          :label="language('HUOBI', '货币')"
        >
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.' + 'currency'"
              :rules="formRules.currency ? formRules.currency : ''"
            >
              <el-select
                v-model="scope.row.currency"
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
              </el-select>
              <span v-else>{{ scope.row.currency }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="exchangeRate"
          align="center"
          width="90"
          :label="language('HUILV', '汇率')"
        >
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.' + 'exchangeRate'"
              :rules="formRules.exchangeRate ? formRules.exchangeRate : ''"
            >
              <iInput
                type="number"
                v-model="scope.row.exchangeRate"
                v-if="editId.indexOf(scope.row.id) !== -1"
              ></iInput>
              <span v-else>{{ scope.row.exchangeRate }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="startDate"
          align="center"
          width="110"
          :label="language('YOUXIAOQIQI', '有效期起')"
        >
          <template slot-scope="scope">
            <span>{{ getDay(scope.row.startDate) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="endDate"
          align="center"
          width="110"
          :label="language('YOUXIAOQIZHI', '有效期止')"
        >
          <template slot-scope="scope">
            <span>{{ getDay(scope.row.endDate) }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <iDialog
      :title="language('沿用芯片补差规则', '沿用芯片补差规则')"
      :visible.sync="mtzAddShow"
      v-if="mtzAddShow"
      :selectList="selectList"
      width="90%"
      @close="closeDiolog"
    >
      <continueBox @addDialogData="addDialogDataList"></continueBox>
    </iDialog>

    <iDialog
      :title="language('新增芯片补差规则', '新增芯片补差规则')"
      :visible.sync="addDialog"
      v-if="addDialog"
      width="70%"
      @close="saveGzDialog"
    >
      <addGZ
        :resetType="resetType"
        @close="saveGzClose"
        @addDialogGZ="addDialogGZList"
      >
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
import continueBox from './continueBox'
import addGZ from './addGZ'
import { deepClone, isNumber } from './util'
import { formRulesGZ } from './data'
import {
  cartypePaged, //车型
  currencyDict
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/firstDetails'
import {
  fetchRemoteMtzMaterial //查询MTZ材料组
} from '@/api/mtz/annualGeneralBudget/annualBudgetEdit'
import {
  updateApp,
  deleteAppDetail
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/chipLocation/details'

export default {
  name: 'Search',
  componentName: 'theTabs',
  components: {
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
  props: [
    'appStatus',
    'flowType',
    'relationType',
    'chipDetailList',
    'baseData'
  ],
  //   mixins: [pageMixins],
  data() {
    return {
      tcCurrence: [],
      formRules: formRulesGZ,
      // dataObject: [],
      // supplierList: [],
      newDataList: [], //传过来的列表数据
      editType: false,
      // tableData: [],
      editId: '',
      selectList: [],
      loading: false,
      listData: {},
      selectData: {},

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
      materialGroup: [],
      // materialCode: [],
      mtzAddShow: false,
      addDialog: false,

      dialogEditType: false, //判断是否是沿用过来的数据
      carline: [], //车型
      resetNum: false
    }
  },
  watch: {
    chipDetailList(val) {
      console.log('val=>', val)
      this.tableData = val
    }
  },
  computed: {
    tableData() {
      return this.chipDetailList
    }
  },
  created() {
    cartypePaged({
      current: 1,
      size: 99999
    }).then((res) => {
      this.carline = res.data
    })
    currencyDict().then((res) => {
      this.tcCurrence = res.data
    })
  },
  methods: {
    getDay(date) {
      return date ? date.split(' ')[0] : date
    },
    sourceChange(e, val) {
      this.$set(e, 'source', val)
    },
    add() {
      //新增
      if (this.type !== 'SIGN') {
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
      this.$emit('init')
      this.saveGzDialog()
    },
    edit() {
      //编辑
      if (this.selectList.length > 0) {
        this.editType = true
        var changeArrayList = []
        this.selectList.forEach((item) => {
          changeArrayList.push(item.id)
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
      //保存
      // if (this.dialogEditType) {
      //   //新增
      //   this.newDataList.forEach((item) => {
      //     item.carline = item.carlineList.toString()
      //     // item.startDate = item.startDate + " 00:00:00";
      //     // item.endDate = item.endDate + " 00:00:00";
      //     // item.compensationPeriod = "A";
      //   })
      //   this.$refs['contractForm'].validate(async (valid) => {
      //     if (valid) {
      //       iMessageBox(
      //         this.language(
      //           'GZFSBHXGLJJTBGGSFJX',
      //           '规则发生变化，相关零件将同步更改，是否继续？'
      //         ),
      //         this.language('LK_WENXINTISHI', '温馨提示'),
      //         {
      //           confirmButtonText: this.language('QUEREN', '确认'),
      //           cancelButtonText: this.language('QUXIAO', '取消')
      //         }
      //       )
      //         .then((res) => {
      //           addBatchAppRule({
      //             mtzAppId:
      //               this.$route.query.mtzAppId ||
      //               JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId,
      //             mtzAppNomiAppRuleList: this.newDataList
      //           }).then((res) => {
      //             if (res.code == 200) {
      //               iMessage.success(this.language(res.desEn, res.desZh))
      //               this.editId = ''
      //               this.editType = false
      //               // this.page.currPage = 1;
      //               // this.page.pageSize = 10;
      //             } else {
      //               iMessage.error(this.language(res.desEn, res.desZh))
      //               // this.newDataList.forEach(item=>{
      //               //     item.startDate = item.startDate.split(" ")[0];
      //               //     item.endDate = item.endDate.split(" ")[0];
      //               // })
      //             }
      //           })
      //         })
      //         .catch((res) => {
      //           // this.newDataList.forEach(item=>{
      //           //     item.startDate = item.startDate.split(" ")[0];
      //           //     item.endDate = item.endDate.split(" ")[0];
      //           // })
      //         })
      //       this.$refs['contractForm'].clearValidate()
      //     } else {
      //       iMessage.error(
      //         this.language('QINGBUQUANYANZHENGBITIANXIANG', '请补全验证必填项')
      //       )
      //       return false
      //     }
      //   })
      // } else {
      //编辑
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
            const chipTTO = {
              chipDetailList: this.tableData,
              chipAppBase: this.baseData.chipAppBase
            }
            updateApp(chipTTO).then((res) => {
              if (res.code == 200) {
                this.editId = ''
                this.editType = false
                this.$emit('init')
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
      // }
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
          if (this.dialogEditType) {
            this.editId.forEach((e) => {
              this.tableData.splice(0, 1)
            })
            this.dialogEditType = false
          } else {
            this.getTableList()
          }
        })
        .then((res) => {
          this.editId = ''
          this.$refs['contractForm'].clearValidate()
        })
        .catch((res) => {})
    },
    jijiaCompute(arr, val) {
      if (
        isNumber(arr.platinumPrice) &&
        isNumber(arr.platinumDosage) &&
        isNumber(arr.palladiumPrice) &&
        isNumber(arr.palladiumDosage) &&
        isNumber(arr.rhodiumPrice) &&
        isNumber(arr.rhodiumDosage)
      ) {
        console.log('计算出基价值')
        arr.price = '99.9'
      } else {
        iMessage.error('请填写完')
      }
    },
    continueBtn() {
      //沿用
      this.mtzAddShow = true
    },
    addDialogDataList(val) {
      //沿用
      val.forEach((item) => {
        // item.source = item.sourceType;
        this.$set(item, 'source', item.sourceType)
        // if(item.preciousMetalDosageUnit == ""){
        //   this.$set(item,"preciousMetalDosageUnit","OZ")
        // }
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
      this.editType = true
      var changeArrayList = []
      this.$refs.moviesTable.clearSelection()
      this.newDataList.forEach((item) => {
        changeArrayList.push(item.id)
        this.$refs.moviesTable.toggleRowSelection(item, true)
      })
      this.editId = changeArrayList
      this.dialogEditType = true
    },
    delecte() {
      //删除
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
          deleteAppDetail(numList).then((res) => {
            if (res.code == 200 && res.result) {
              this.$emit('init')
              console.log(res)
            } else {
              iMessage.error(res.desZh)
            }
          })
        })
        .catch((res) => {})
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
      if (str.compensationRatio < 0) {
        str.compensationRatio = ''
        iMessage.error(
          this.language('BUCHAXISHUBUNENGWEIFUSHU', '补差系数不能为负数')
        )
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.formStyle ::v-deep .el-form-item {
  margin-top: 0;
  margin-bottom: 0;
}
::v-deep .el-select__tags {
  max-width: 100% !important;
}
::v-deep .el-table .el-table__row .el-input {
  width: 100% !important;
}
</style>
<style lang="scss">
.el-table__fixed-body-wrapper,
.el-table__fixed-header-wrapper {
  background: #fff;
}
</style>
