<template>
  <!--打分-->
  <iDialog :title="title"
           :visible.sync="value"
           width="90%"
           @close="clearDiolog"
           :close-on-click-modal="false">
    <div class="content">
      <div class="margin-bottom20 clearFloat">
        <div class="floatright">
          <!--提交-->
          <iButton v-if="showSubmitButton"
                   @click="handleSubmit('submit')"
                   :loading="submitLoading">{{ $t('LK_TIJIAO') }}
          </iButton>
          <!--暂存-->
          <iButton v-if="showTemporaryStorageButton"
                   @click="handleSubmit('tempStore')"
                   :loading="temporaryStorageLoading">{{ $t('SUPPLIER_ZANCUN') }}
          </iButton>
          <!--沿用-->
          <iButton v-if="showFollowButton"
                   @click="handleFollow"
                   :loading="followButtonLoading">{{ $t('SPR_FRM_CBPJ_YY') }}
          </iButton>
        </div>
      </div>

      <!-- <tableList :tableData="tableListData"
                 :tableTitle="tableTitle"
                 customSelectValueKey="name"
                 :tableLoading="tableLoading"
                 :index="true"
                 :selectProps="selectProps"
                 :selectPropsOptionsObject="selectPropsOptionsObject"
                 @handleSelectionChange="handleSelectionChange"
                 :selection="selection"
                 ref="commonTable">

      </tableList> -->
      <el-table @selection-change="handleSelectionChange"
                :data="tableListData">
        <el-table-column v-if="!isView"
                         type="selection"
                         width="55"> </el-table-column>
        <el-table-column type="index"
                         width="50"
                         align="center"
                         label="#"></el-table-column>
        <el-table-column align="center"
                         prop="nameZh"
                         label="供应商名称"
                         width="120">
        </el-table-column>
        <el-table-column align="center"
                         prop="dept"
                         label="负责科股"
                         width="120">
        </el-table-column>
        <template v-for="(item, index) in tableTitleData">
          <el-table-column align="center"
                           :key="item.itemCode"
                           :prop="item.itemCode"
                           :label="item.itemNameZh"
                           width="150">
            <template slot-scope="scope">
              <iSelect @change="changeSelect"
                       v-model="scope.row.itemList[index]"
                       :placeholder="language('请选择')"
                       value-key="itemScore">
                <!-- cloneList[scope.$index].itemList -->
                <el-option v-for="item in selectData"
                           :key="item.itemScore"
                           :label="item.itemScore"
                           :value="item">
                </el-option>
              </iSelect>
            </template>
          </el-table-column>
        </template>
        <el-table-column align="center"
                         prop="updateDate"
                         label="最近更新时间"
                         width="150">
        </el-table-column>
        <el-table-column align="center"
                         prop="updateByName"
                         label="最近更新人"
                         width="150">
        </el-table-column>
      </el-table>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iMessage, iSelect } from 'rise'
import tableList from '@/components/commonTable'
import { scroingTitle } from './data'
import {
  getQualitativeScoreDialogList,
  saveQualitativeScore,
  followQualitativeScore,
  getScoreViewList,
  getQualitativeMappingList
} from '../../../../../api/frmRating/preliminaryRating/qualitativeScoringPage'
import { getDictByCode } from '@/api/dictionary'
import resultMessageMixin from '@/mixins/resultMessageMixin'

export default {
  mixins: [resultMessageMixin],
  components: {
    iDialog,
    iButton,
    tableList,
    iSelect
  },
  props: {
    title: { type: String, default: '' },
    value: { type: Boolean },
    isView: { type: Boolean, default: true },
    showFollowButton: { type: Boolean, default: true },
    showTemporaryStorageButton: { type: Boolean, default: true },
    showSubmitButton: { type: Boolean, default: true },
    selectProps: {
      type: Array,
      default: () => {
        return []
      }
    },
    outerSelectTableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    action: { type: String, default: '' },
    selection: { type: Boolean, default: true }
  },
  data() {
    return {
      tableListData: [],
      selectDictResultVo: [],
      tableTitle: scroingTitle,
      tableLoading: false,
      selectPropsOptionsObject: {},
      selectTableData: [],
      submitLoading: false,
      temporaryStorageLoading: false,
      followButtonLoading: false,
      qualiativeTable: [],
      cloneList: [],
      selectData: [],
      itemCodeArr: [],
      infoData: []
    }
  },

  created() {
    this.selectProps = ['isAudit', 'isMergeReport']
  },
  methods: {
    async getTableTitle() {},
    clearDiolog() {
      this.$emit('input', false)
    },
    handleSelectionChange(val) {
      this.selectTableData = val
    },
    async getEditTableList() {
      this.tableLoading = true
      this.tableListData = []
      try {
        let req = {}
        const initialIds = this.infoData.map((item) => {
          return item.id
        })

        req = {
          initialIds
        }
        // const res = await getQualitativeScoreDialogList(req)
        const res = await getScoreViewList(req)
        console.log(res)
        if (res.result) {
          this.tableListData = res.data
          this.tableListData.forEach((res) => {
            if (res.itemList) {
              if (res.itemList == null || res.itemList == '') {
                res.itemList = []
              }
            } else {
              res.itemList = []
            }
          })
        }
        this.cloneList = _.cloneDeep(this.tableListData)
        console.log(this.cloneList,323323132)
        this.tableLoading = false
      } catch {
        this.tableListData = []
        this.tableLoading = false
      }
    },
    async getScoreSelectList() {
      this.selectData = []
      const res = await getDictByCode('QUALITATIVE_GRADE_ITEM_SCORE')
      const list = res.data[0].subDictResultVo
      this.selectDictResultVo = res.data[0].subDictResultVo
      this.selectDictResultVo.forEach((res) => {
        var item = {
          id: '',
          itemScore: res.name,
          parentId: res.parentId,
          versionNum: 0,
          itemCode: '',
          itemId: ''
        }
        this.selectData.push(item)
      })
      console.log(this.selectData)
      this.selectPropsOptionsObject = {
        policyImpact: list,
        industryDemandStatus: list,
        managementStandardDegree: list,
        projectManagementSkill: list,
        industryReputation: list,
        mainCustomerStrength: list,
        mainCustomerStableCooperation: list,
        mainSupplierStrength: list,
        mainSupplierStableCooperation: list,
        contractCompliance: list
      }
    },
    //保留初始id
    changeSelect(val) {
      this.tableListData.forEach((v) => {
        if (v.itemList.length == this.tableTitleData.length) {
          console.log(val)
        }
      })
    },
    async handleSubmit(step) {
      if (this.selectTableData.length === 0) {
        return iMessage.warn(this.$t('LK_NINDANGQIANHAIWEIXUANZE'))
      }
      let valid = 0
      //   const requiredPropsArray = this.tableTitle.filter((item) => {
      //     return item.required
      //   })
      //   const requiredProps = requiredPropsArray.map((item) => {
      //     return item.props
      //   })
      //   let positionIndex = ''
      //     this.selectTableData.some((item) => {
      //       requiredProps.some((itemProps) => {
      //         if (!item[itemProps]) {
      //           valid = false
      //           positionIndex = item.index
      //           return true
      //         }
      //       })
      //     })
      this.selectTableData.forEach((arr) => {
        if (arr.itemList.length < this.tableTitleData.length) {
          valid++;
        }
        arr.itemList.forEach((r) => {
          r.versionNum = 0
        })
        arr.itemList = arr.itemList.map((item, i) => {
          console.log(item,1111111111)
          console.log(this.tableTitleData[i],222222222)
          if(this.tableTitleData[i]){
            return {
              ...item,
              parentId: arr.id,
              itemId: this.tableTitleData[i].id,
              itemCode: this.tableTitleData[i].itemCode
            }
          }else{
            return {
              ...item,
              parentId: arr.id,
            }
          }
        })
        
        //返回数据若所有下拉框有回填数据，itemList的每个id不能为空，要为返回的id，第一次提交itemList的id为空
        this.cloneList.forEach((res) => {
          if (res.id == arr.id) {
            if (res.itemList.length == this.tableTitleData.length) {
              arr.itemList.forEach((j, index) => {
                if (j.itemCode == res.itemList[index].itemCode) {
                  j.id = res.itemList[index].id
                }
              })
            }
          }
        })
      })
      if (step === 'tempStore') {
        valid = 0
      }
      console.log(this.selectTableData)
      if (valid == 0) {
        try {
          this.handleSubmitOrTemporaryStorageButtonLoading(step, true)
          const req = {
            step,
            list: this.selectTableData
          }
          const res = await saveQualitativeScore(req)
          this.resultMessage(res, () => {
            this.$emit('handleSubmitCallback')
            this.getTableList()
            this.$nextTick(()=>{
                if(step==='submit'){
                     this.value=false
                }
            })
          })
          this.handleSubmitOrTemporaryStorageButtonLoading(step, false)
        } catch {
          this.handleSubmitOrTemporaryStorageButtonLoading(step, false)
        }
      } else {
        iMessage.warn(
          //   '#' + (positionIndex + 1) + ':' + this.$t('SPR_FRM_CBPJ_QWCDF')
          // this.$t('SPR_FRM_CBPJ_QWCDF')
          this.language('QINGWANCHENGSUOYOUXUANZE', '请完成所有选择！')
        )
        return false
      }
    },

    handleSubmitOrTemporaryStorageButtonLoading(step, boolean) {
      if (step === 'submit') {
        this.submitLoading = boolean
      } else if (step === 'tempStore') {
        this.temporaryStorageLoading = boolean
      }
    },
    async handleFollow() {
      if (this.selectTableData.length === 0) {
        return iMessage.warn(this.$t('LK_NINDANGQIANHAIWEIXUANZE'))
      }
      // var vaild = 0;
      // this.selectTableData.forEach(arr=>{
      //   if (arr.itemList.length < this.tableTitleData.length) {
      //     vaild++;
      //   }
      // })
      // if(vaild == 0){
        try {
          this.followButtonLoading = true
          const initialIds = this.selectTableData.map((item) => {
            return item.initialId
          })
          const req = { initialIds }
          const res = await followQualitativeScore(req)
          this.resultMessage(res, () => {
            this.$emit('handleSubmitCallback')
            this.getTableList()
          })
          this.followButtonLoading = false
        } catch {
          this.followButtonLoading = false
        }
      // }else{
      //   iMessage.warn(
      //     //   '#' + (positionIndex + 1) + ':' + this.$t('SPR_FRM_CBPJ_QWCDF')
      //     // this.$t('SPR_FRM_CBPJ_QWCDF')
      //     this.language('QINGWANCHENGSUOYOUXUANZE', '请完成所有选择！')
      //   )
      //   return false
      // }
    },
    async getViewTableList() {
      this.tableLoading = true
      this.tableListData = []
      try {
        const initialIds = this.infoData.map((item) => {
          return item.id
        })
        console.log(this.outerSelectTableData)
        console.log(this.infoData)
        const req = {
          initialIds
        }
        const titleData = await getQualitativeMappingList()
        this.tableTitleData = titleData.data

        // const res = await getQualitativeScoreDialogList(req)
        const res = await getScoreViewList(req)
        if (res.result) {
          this.tableListData = res.data
          this.tableListData.forEach((res) => {
            if (res.itemList) {
              if (res.itemList == null || res.itemList == '') {
                res.itemList = []
              }
            } else {
              res.itemList = []
            }
          })
          this.cloneList = _.cloneDeep(this.tableListData)

          console.log(this.cloneList)
          // this.qualiativeTable = []

          // this.tableListData.forEach((data) => {
          //   var item = {
          //     "nameZh": data.nameZh,
          //     "dept": data.dept,
          //     "updateDate": data.updateDate,
          //     "updateByName": data.updateByName
          //   }
          //   this.tableTitleData.forEach((title) => {
          //     item[title.itemCode] = "";
          //     data.itemList.forEach((score) => {
          //       if (score.itemCode == title.itemCode) {
          //         item[title.itemCode] = score.itemScore
          //       }
          //     })
          //   })
          //   this.qualiativeTable.push(item);
          // })
        }
        this.tableLoading = false
      } catch {
        this.tableListData = []
        this.tableLoading = false
      }
    },
    getTableList() {
      // console.log(this.action)
      if (this.action === 'view') {
        this.getViewTableList()
      } else {
        this.getEditTableList()
      }
    }
  },
  watch: {
    value(val) {
      if (val) {
        this.infoData = this.outerSelectTableData
        this.getScoreSelectList()
        this.getViewTableList()
        console.log(this.infoData)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.content {
  padding-bottom: 20px;
}
</style>
