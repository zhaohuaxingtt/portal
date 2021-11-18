<!--
 * @version: 1.0
 * @Author: caopeng
-->
<template>
  <div>
    <iDialog
      @close="closeDiolog()"
      :visible.sync="value"
      v-if="value"
      top="2%"
      width="85%"
    >
      <el-tabs
        class="tabsHeader"
        type="card"
        style="margin-left: 20px"
        v-model="tabVal"
        @tab-click="changeTab"
      >
        <el-tab-pane
          name="1"
          :label="
            language(
              'SHISHICRATINGGONGYINGSHANGQINGDAN',
              '实时C-Rating供应商清单'
            )
          "
        >
        </el-tab-pane>
        <el-tab-pane
          name="2"
          :label="
            language(
              'CRATINGGONGYINGSHANGXUNJIADINGDIANQINGKUANG',
              'C-Rating供应商询价定点情况'
            )
          "
        >
        </el-tab-pane>
      </el-tabs>
      <div class="header">
        <el-form inline label-position="top">
          <el-form-item :label="language('SAPHAO', 'SAP号')">
            <iSelect
              collapse-tags
              filterable
              multiple
              :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
              v-model.trim="form.sapCode"
            >
              <el-option
                v-for="item in sapList"
                :key="item.kvalue"
                :label="item.vvalue"
                :value="item.kvalue"
              >
              </el-option>
            </iSelect>
          </el-form-item>
          <el-form-item
            :label="language('GONGYINGSHANGMINGCHENG', '供应商名称')"
          >
            <iSelect
              collapse-tags
              filterable
              multiple
              :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
              v-model.trim="form.supplierName"
            >
              <el-option
                v-for="item in supplierList"
                :key="item.kvalue"
                :label="item.vvalue"
                :value="item.kvalue"
              >
              </el-option>
            </iSelect>
          </el-form-item>
          <el-form-item :label="language('XIANGGUANKESHI', '相关科室')">
            <iSelect
              collapse-tags
              filterable
              multiple
              @change="deptChange"
              :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
              v-model.trim="form.deptId"
            >
              <el-option
                v-for="item in deptList"
                :key="item.id"
                :label="item.deptNum"
                :value="item.id"
              >
              </el-option>
            </iSelect>
          </el-form-item>
          <el-form-item :label="language('FUZECAIGOUYUAN', '负责采购员')">
            <iSelect
              collapse-tags
              filterable
              multiple
              :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
              v-model.trim="form.userId"
            >
              <el-option
                v-for="item in userList"
                :key="item.id"
                :label="item.nameZh"
                :value="item.id"
              >
              </el-option>
            </iSelect>
          </el-form-item>
          <el-form-item
            v-if="tabVal == 2"
            :label="language('SHIFOUCRATING', '是否C-Rating')"
          >
            <iSelect
              :placeholder="language('QINGXUANZE', '请选择')"
              v-model.trim="form.iscRating"
            >
              <el-option
                v-for="item in iscRatingList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </iSelect>
          </el-form-item>
          <el-form-item
            :label="language('JIARUCRATINGYUANYIN', '加入C-Rating原因')"
          >
            <iSelect
              collapse-tags
              filterable
              multiple
              :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
              v-model.trim="form.ratingSource"
            >
              <el-option
                v-for="item in cratingLsit"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </iSelect>
          </el-form-item>
          <el-form-item
            v-if="tabVal == 2"
            :label="language('YICHUCRATINGYUANYIN', '移出C-Rating原因')"
          >
            <iSelect
              collapse-tags
              filterable
              multiple
              :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
              v-model.trim="form.cancelReason"
            >
              <el-option
                v-for="item in cratingLsit"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </iSelect>
          </el-form-item>
          <el-form-item
            v-if="tabVal == 2"
            :label="language('GONGYINGSHANGZHUANGTAI', '供应商状态')"
          >
            <iSelect
              :placeholder="language('QINGXUANZE', '请选择')"
              v-model.trim="form.rfqStatus"
              multiple
            >
              <el-option
                v-for="item in supplierStatus"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </iSelect>
          </el-form-item>
          <el-form-item
            v-if="tabVal == 2"
            :label="language('LINGJIANXINXI', '零件信息')"
          >
            <iSelect
              collapse-tags
              filterable
              multiple
              :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
              v-model.trim="form.partNum"
            >
              <el-option
                v-for="item in partList"
                :key="item.kvalue"
                :label="item.vvalue"
                :value="item.kvalue"
              >
              </el-option>
            </iSelect>
          </el-form-item>
          <el-form-item v-if="tabVal == 2" :label="language('RFQHAO', 'RFQ号')">
            <iSelect
              collapse-tags
              filterable
              multiple
              :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
              v-model.trim="form.rfq"
            >
              <el-option
                v-for="item in resRfqList"
                :key="item.kvalue"
                :label="item.vvalue"
                :value="item.kvalue"
              >
              </el-option>
            </iSelect>
          </el-form-item>
          <el-form-item
            v-if="tabVal == 2"
            :label="language('XIANGMUBIANHAO', '项目编号')"
          >
            <iSelect
              collapse-tags
              filterable
              multiple
              :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
              v-model.trim="form.motorProject"
            >
              <el-option
                v-for="item in projectList"
                :key="item.kvalue"
                :label="item.vvalue"
                :value="item.kvalue"
              >
              </el-option>
            </iSelect>
          </el-form-item>
          <el-form-item
            v-if="tabVal == 2"
            :label="language('BAOJIACHEXING', '报价车型')"
          >
            <iSelect
              collapse-tags
              multiple
              filterable
              :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
              v-model.trim="form.motorType"
            >
              <el-option
                v-for="item in motorList"
                :key="item.kvalue"
                :label="item.vvalue"
                :value="item.kvalue"
              >
              </el-option>
            </iSelect>
          </el-form-item>
        </el-form>
        <div class="btnStyle">
          <iButton @click="sure">{{ language('CHAXUN', '查询') }}</iButton>
          <iButton @click="clickReset">{{
            language('CHONGZHI', '重置')
          }}</iButton>
        </div>
      </div>
      <div class="tableBox">
        <div class="sectionTitle">
          <span class="ptext">
            {{ language('XIANGQINGLIEBIAO', '详情列表') }}
          </span>
          <iButton v-if="tabVal == 1" @click="handleSaveBtn">{{
            language('YICHUCRATING', '移出C-Rating')
          }}</iButton>
        </div>
        <table-list
          v-if="tabVal == 1"
          style="margin-top: 20px"
          :tableData="tableListData"
          @handleSelectionChange="handleSelectionChange"
          :tableTitle="tableTitleMonitor"
          :tableLoading="tableLoading"
          :index="true"
        >
          <template #ratingSource="scope">
            <span
              v-if="
                scope.row.ratingSource != '100' &&
                  scope.row.ratingSource != null
              "
              >{{
                cratingLsit.find(res => {
                  return res.code == scope.row.ratingSource
                }).name
              }}</span
            >
            <span v-if="scope.row.ratingSource == '100'"
              >深入评级-
              <icon class="early" symbol name="iconcaiwuyujing-hongdeng"></icon>
            </span>
          </template>
        </table-list>
        <table-list
          v-if="tabVal == 2"
          style="margin-top: 20px"
          :tableData="tableListData"
          :tableTitle="tableTitleMonitorRecord"
          :tableLoading="tableLoading"
          :index="true"
          :selection="false"
        >
          <template #rfqStatus="scope">
            <!-- <span>{{  supplierStatus.find((res) => {
                return res.code == scope.row.rfqStatus
              }).name}}</span> -->
            <span v-if="scope.row.rfqStatus == 0">{{
              language('WEIBAOJIA', '未报价')
            }}</span>
            <span v-if="scope.row.rfqStatus == 1">{{
              language('XUNJIAZHONG', '询价中')
            }}</span>
          </template>
          <template #ratingSource="scope">
            <span
              v-if="
                scope.row.ratingSource != '100' &&
                  scope.row.ratingSource != null
              "
              >{{
                cratingLsit.find(res => {
                  return res.code == scope.row.ratingSource
                }).name
              }}</span
            >
            <span v-if="scope.row.ratingSource == '100'"
              >深入评级-
              <icon class="early" symbol name="iconcaiwuyujing-hongdeng"></icon>
            </span>
          </template>
        </table-list>
      </div>
      <div style="height: 30px"></div>
    </iDialog>
    <iDialog
      destroy-on-close
      @close="closeDiologDetail()"
      :visible.sync="visibleDetal"
      top="2%"
      width="85%"
    >
      <div class="section-box">
        <div>
          <span
            >{{ language('YICHUYUANYIN', '移出原因') }}
            <span style="color: red">*</span></span
          >
        </div>
        <iButton @click="handleSave">{{ language('QUEREN', '确认') }}</iButton>
      </div>
      <iInput
        style="margin-top: 20px"
        :placeholder="language('QINGSHURU', '请输入…')"
        type="textarea"
        v-model="takeStepsContent"
        maxlength="200"
        show-word-limit
      ></iInput>
      <div style="height: 30px"></div>
    </iDialog>
  </div>
</template>

<script>
import { icon, iDialog, iSelect, iButton, iInput, iMessage } from 'rise'
import tableList from '@/components/commonTable'
import { tableTitleMonitor, tableTitleMonitorRecord, dictByCode } from './data'
import { getDeptDropDownList } from '@/api/authorityMgmt/index'
import {
  currentList,
  sapDropDown,
  historyList,
  cancel
} from '@/api/frmRating/supplierOverview/index'
export default {
  components: {
    iSelect,
    iButton,
    iDialog,
    tableList,
    iInput,
    icon
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    supplierId: {
      type: String
    },
    sapCode: {
      type: String
    }
  },
  data() {
    return {
      tabVal: '1',
      visibleDetal: false,
      info: {},
      visible: false,
      tableListData: [],
      tableTitleMonitor: tableTitleMonitor,
      tableTitleMonitorRecord: tableTitleMonitorRecord,
      form: {
        sapCode: [],
        supplierName: [],
        iscRating: '',
        supplierId: [],
        rfqStatus: [],
        userId: []
      },
      cratingLsit: [{ name: '' }],
      tableLoading: true,
      sapList: [],
      takeStepsContent: '',
      deptList: [],
      userList: [],
      supplierList: [],
      selectData: [],
      iscRatingList: [
        { code: '', name: this.language('QUANBU', '全部') },
        { code: 1, name: this.language('SHI', '是') },
        { code: 0, name: this.language('FOU', '否') }
      ],
      supplierStatus: [
        { code: '', name: this.language('QUANBU', '全部') },
        { code: 0, name: this.language('WEIBAOJIA', '未报价') },
        { code: 1, name: this.language('XUNJIAZHONG', '询价中') }
      ]
    }
  },
  watch: {
    // supplierId(val) {
    //   this.form.supplierName[0] = val
    // },
    // sapCode(val) {
    //   this.form.sapCode[0] = val
    // }
  },
  created() {
    this.tabVal = '1'
    this.getInit()
  },
  methods: {
    handleDialog() {
      this.visible = true
      this.getInit()
    },
    //获取科室
    getDeptList() {
      const req = {
        level: 'K2'
      }
      getDeptDropDownList(req).then(res => {
        this.deptList = res.data
      })
    },
    //选择相关科室
    deptChange(v) {
      console.log(v)
      var arr = []
      if (v.length >= 1) {
        v.forEach(v => {
          let users = []
          users = this.deptList.find(i => {
            return i.id == v
          }).userDTOList
          arr.push(...users)
        })
      }
      this.userList = arr
      var arr2 = []
      if (this.form.userId.length > 0) {
        this.userList.forEach(v => {
          this.form.userId.forEach(i => {
            if (v.id == i) {
           arr2.push(i)
              console.log(i)
            }
          })
        })
      }
      this.form.userId = arr2
    },
    getTaleList() {
      this.tableLoading = true
      if (this.form.sapCode.length > 0 || this.form.supplierName.length > 0) {
        this.form.supplierId = this.form.sapCode.concat(this.form.supplierName)
      }
      const req = {
        ...this.form
      }

      req.sapCode = undefined
      req.supplierName = undefined
      if (this.tabVal == '1') {
        currentList(req).then(res => {
          this.tableLoading = false
          this.tableListData = res.data
        })
      } else {
        historyList(req).then(res => {
          this.tableLoading = false
          this.tableListData = res.data
        })
      }
    },
    async getInit() {
      const res = await dictByCode('C_RATING')
      this.cratingLsit = res
      this.getTaleList()
      this.getDeptList()
      const res2 = await sapDropDown({ type: 'sap' })
      const res3 = await sapDropDown({ type: 'supplier' })
      //   const res4 = await dictByCode('RFQ_STATE')
      const resPart = await sapDropDown({ type: 'part' })
      const resRfq = await sapDropDown({ type: 'rfq' })
      const resProject = await sapDropDown({ type: 'project' })
      const resMotor = await sapDropDown({ type: 'motor' })

      if (this.sapCode && this.supplierId) {
        this.form.sapCode[0] = this.sapCode || ''
        this.form.supplierName[0] = this.supplierId || ''
      }
      this.partList = resPart.data
      this.resRfqList = resRfq.data
      this.projectList = resProject.data
      this.motorList = resMotor.data
      this.sapList = res2.data
      this.supplierList = res3.data
      //   this.supplierStatus = res4
    },
    handleSelectionChange(val) {
      this.selectData = val
    },
    handleSaveBtn() {
      if (this.selectData.length == 0) {
        iMessage.warn(this.$t('SUPPLIER_ZHISHAOXUANZHEYITIAOJILU'))
        return false
      }
      this.visibleDetal = true
    },
    //移除
    handleSave() {
      if (this.takeStepsContent == '') {
        iMessage.warn(this.language('QINGSHURUYICHUYUANYINS', '请输入移出原因'))
        return false
      }
      let req = {
        ids: this.selectData.map(res => {
          return res.recordId
        }),
        reason: this.takeStepsContent
      }
      cancel(req).then(res => {
        if (res && res.code == 200) {
          iMessage.success(res.desZh)
          this.visibleDetal = false
          this.getTaleList()
        } else iMessage.error(res.desZh)
      })
    },

    sure() {
      this.getTaleList()
    },

    clickReset() {
      this.userList = []
      this.form = {
        supplierId: [],
        deptId: [],
        userId: [],
        iscRating: '',
        ratingSource: [],
        cancelReason: [],
        rfqStatus: [],
        partNum: [],
        rfq: [],
        motorProject: [],
        motorType: [],
        sapCode: [],
        supplierName: []
      }
      this.getTaleList()
    },
    changeTab() {
      this.userList = []
      this.form = {
        ...this.form,
        deptId: [],
        userId: [],
        iscRating: '',
        ratingSource: [],
        cancelReason: [],
        rfqStatus: [],
        partNum: [],
        rfq: [],
        motorProject: [],
        motorType: []
      }
      this.getTaleList()
    },
    closeDiolog() {
      this.$emit('closeDiolog')
    },
    closeDiologDetail() {
      this.takeStepsContent = ''
      this.visibleDetal = false
    }
  }
}
</script>

<style lang="scss" scoped>
.tableBox {
  max-height: 500px;
  overflow-y: auto;
}
.early {
  display: inline-block;
  font-size: 20px;
}
.center1 {
  display: flex;
  justify-content: center;
  align-items: center;
}
.chartStyle {
  width: 100%;
  height: 320px;
}
::v-deep .el-textarea {
  height: 580px;
}
::v-deep .el-textarea .el-textarea__inner {
  height: 100%;
}
.section-box {
  display: flex;
  justify-content: space-between;
  padding: 30px 0;
  span {
    font-size: 20px;
    font-family: Arial;
    font-weight: bold;
  }
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #e3e3e3;
  .btnStyle {
    display: flex;
    justify-content: flex-end;
    width: 30%;
  }
  ::v-deep.el-form-item {
    margin: 0 20px;
  }
  ::v-deep.el-select {
    width: 220px;
  }
  ::v-deep.el-select__tags-text {
    display: inline-block;
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  //   ::v-deep.el-select  ::v-deep.el-tag__close.el-icon-close {
  //     top: -7px;
  //   }
}
.sectionTitle {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tabsHeader {
  margin-left: 0 !important;
  ::v-deep .el-tabs__item.is-active {
    font-weight: bold;
    background: #ffffff;
    opacity: 1;
  }
  ::v-deep .el-tabs__item {
    border: none;
    font-weight: 500;
    background: #f5f6f7;
    border-radius: 0px 10px 10px 0px;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.08);
    font-size: 16px;
    width: 250px;
    height: 35px;
    line-height: 35px;
  }
  ::v-deep .el-tabs__nav {
    border: none !important;
  }
  ::v-deep .el-tabs__nav {
    background: transparent;
    border: none;
    padding: 10px 0;
  }
  ::v-deep .el-tabs__item:focus.is-active.is-focus:not(:active) {
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  ::v-deep .el-tabs__header {
    border: none;
  }
  ::v-deep .el-tabs__item:first-child {
    border-radius: 10px 0px 0px 10px;
  }
}
v::v-deep .el-tabs__nav-wrap::after {
  height: 0 !important;
}
v::v-deep .el-tabs__nav-wrap:hover {
  font-weight: bold;
}
</style>
