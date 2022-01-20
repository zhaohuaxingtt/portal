<template>
  <iCard>
    <div class="margin-bottom20 clearFloat">
      <div class="floatright">
        <div v-if="!editStatus">
          <!--批量编辑-->
          <iButton
            @click="bulkEdit"
            v-if="
              isAuth(whiteBtnList, 'ACHIEVEMENT_DETAIL_PAGE_BATCHEDIT') &&
              !isForward
            "
          >
            {{ $t('LK_PLBJ') }}
          </iButton>
          <!--编辑-->
          <iButton
            @click="edit"
            v-if="
              isAuth(whiteBtnList, 'ACHIEVEMENT_DETAIL_PAGE_EDIT') && !isForward
            "
          >
            {{ language('编辑') }}
          </iButton>
          <!--转派-->
          <iButton
            @click="taskTransfer"
            v-if="
              isAuth(whiteBtnList, 'ACHIEVEMENT_DETAIL_PAGE_REASSIGNMENT') &&
              !isForward
            "
          >
            {{ language('转派') }}
          </iButton>
          <!--确认-->
          <iButton
            @click="confirm"
            v-if="
              isAuth(whiteBtnList, 'ACHIEVEMENT_DETAIL_PAGE_CONFIRM') &&
              !isForward
            "
          >
            {{ language('确认') }}
          </iButton>
          <!--导出-->
          <iButton
            @click="download"
            v-if="isAuth(whiteBtnList, 'ACHIEVEMENT_DETAIL_PAGE_EXPORT')"
          >
            {{ language('导出') }}
          </iButton>
        </div>
        <div v-else>
          <!--退出编辑-->
          <iButton @click="exitEdit">{{ language('取消') }}</iButton>
          <!--保存-->
          <iButton @click="save">{{ language('保存') }}</iButton>
        </div>
      </div>
    </div>
    <tableList
      class="basetable"
      :header="true"
      :state="state"
      :monthTitle="monthTitle"
      label="全年产量"
      :tableData="tableListData"
      :tableTitle="tableTitle"
      :tableLoading="tableLoading"
      :openPageGetRowData="true"
      :inputProps="inputProps"
      :selectProps="selectProps"
      :customSelectValueKey="'supplierName'"
      :selectPropsOptionsObject="selectPropsOptionsObject"
      @handleSelectionChange="handleSelectionChange"
      :tempSupplierSelectList="tempSupplierSelectList"
      @setPartType="setPartType"
    >
    </tableList>
    <div class="company">货币：人民币 | 单位：元</div>
    <iPagination
      v-update
      @size-change="handleSizeChange($event, getTableList)"
      @current-change="handleCurrentChange($event, getTableList)"
      background
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :current-page="page.currPage"
      :total="page.totalCount"
    >
    </iPagination>

    <bulkEditDialog
      v-model="bulkEditDialog"
      v-if="bulkEditDialog"
      :bulkEditData="bulkEditData"
      @handleSubmit="bulkEditCB"
    >
    </bulkEditDialog>

    <taskTransferDialog
      :listId="listId"
      :isForward="isForward"
      v-if="taskTransferDialog"
      v-model="taskTransferDialog"
      @handleSubmit="taskTransferCB"
    >
    </taskTransferDialog>
  </iCard>
</template>

<script>
import { iCard, iButton, iPagination, iMessage } from 'rise'
import tableList from '../../components/table'
import { pageMixins } from '@/utils/pageMixins'
import resultMessageMixin from '@/mixins/resultMessageMixin'
import { tableTitle, monthTitle, getRequest } from './data'
import bulkEditDialog from './bulkEditDialog'
import taskTransferDialog from './taskTransferDialog'
import { toThousands, delcommafy, unique } from '@/utils'
import isAuth from '@/utils/isAuth'
import {
  querySeriesbaseDetail, // 明细list
  updateSeriesbaseDetail, // 单个编辑 批量
  getSupplier, // 获取供应商select数据
  affirmSeriesbaseDetail, // 发起确认
  exportSeriesbaseDetail, // 导出功能
  moldViewExport,
  updatepartType
} from '@/api/achievement'

export default {
  mixins: [pageMixins, resultMessageMixin],
  components: {
    iCard,
    iButton,
    tableList,
    iPagination,
    bulkEditDialog,
    taskTransferDialog,
    iMessage
  },
  data() {
    return {
      tableListData: [],
      tableTitle,
      monthTitle,
      tableLoading: false,
      selectTableData: [],
      bulkEditDialog: false,
      bulkEditData: {},
      taskTransferDialog: false,
      editStatus: false,
      show: false,
      inputProps: [],
      selectProps: [],
      supplierSelectList: [],
      tempSupplierSelectList: [],
      partType: [
        { code: 'P', name: 'P' },
        { code: 'L', name: 'L' },
        { code: 'S', name: 'S' },
        { code: 'A', name: 'A' }
      ],
      selectPropsOptionsObject: {
        supplierName: [],
        partType: []
      },
      baseId: '',
      listId: [],
      isForward: false,
      selectData: JSON.parse(localStorage.getItem('allSelectObject')),
      isAuth,
      whiteBtnList: this.$store.state.permission.whiteBtnList
    }
  },
  props: ['formData', 'title'],
  created() {
    let obj = getRequest()
    if (obj.status == 99) {
      this.isForward = true
    }
    this.baseId = obj.id
    this.getSupplierList()
  },
  computed: {
    state() {
      return this.$store.state.permission.userInfo.roleList.some(
        (item) => item.code == 'BZZL' || item.fullNameZh == '部长助理'
      )
    }
  },
  methods: {
    // 设置零件type
    setPartType(val) {
      updatepartType({ id: val.id, type: val.partType }).then((res) => {
        if (res.result) {
          if (res.data) {
            this.tableListData[val.index].confirmPrice = toThousands(
              res.data.price
            )
            this.tableListData[val.index].priceSource = res.data.source
          } else {
            this.tableListData[val.index].confirmPrice = ''
            this.tableListData[val.index].priceSource = ''
            this.tableListData[val.index].confirmPrice1 = '-100'
            this.tableListData[val.index].priceSource1 = '?'
          }
          this.$set(this.tableListData[val.index], 'changeType', true)
        }
      })
    },
    // 获取供应商
    getSupplierList() {
      getSupplier({ supplierName: '' }).then((res) => {
        if (res.result) {
          this.tempSupplierSelectList = res.data
          this.tempSupplierSelectList = this.tempSupplierSelectList.filter(
            (item) => {
              return item.supplierId && item.nameZh && item.sapCode
            }
          )
          this.tempSupplierSelectList = unique(
            this.tempSupplierSelectList,
            'sapCode'
          )
          this.tempSupplierSelectList.map((item) => {
            this.$set(item, 'code', item.sapCode)
            this.$set(item, 'name', item.nameZh)
            this.$set(item, 'supplierName', item.sapCode + '-' + item.nameZh)
          })
          this.tempSupplierSelectList.sort((a, b) => {
            if (a.code && b.code) {
              return a.code - b.code
            }
          })
          this.supplierSelectList = this.tempSupplierSelectList.splice(0, 20)
          this.$nextTick(() => {
            this.$set(
              this.selectPropsOptionsObject,
              'supplierName',
              this.supplierSelectList
            )
          })
        }
      })
    },
    // 点击搜索组件按钮callback
    handleSearch(data) {
      this.page.currPage = 1
      this.getTableList()
    },
    handleSelectionChange(val) {
      this.listId = []
      this.selectTableData = val
      if (this.selectTableData.length) {
        this.selectTableData.forEach((item) => {
          this.listId.push(item.id)
        })
      }
    },
    async getTableList() {
      this.tableLoading = true
      const searchItem = this.$parent.$children.filter((item) => {
        return item.$attrs.name === 'theSearch'
      })
      let searchForm = JSON.parse(JSON.stringify(searchItem[0].form))
      searchForm.baseId = this.baseId
      searchForm.isConfirm =
        searchForm.isConfirm === '0'
          ? false
          : searchForm.isConfirm === '1'
          ? true
          : searchForm.isConfirm === ''
          ? ''
          : ''
      try {
        const req = {
          currentPage: this.page.currPage,
          pageSize: this.page.pageSize,
          baseId: this.baseId,
          ...searchForm
        }
        const res = await querySeriesbaseDetail(req)
        if (res.result) {
          this.tableListData = res.data.records
          this.tableListData.map((item) => {
            if (!item.partType) {
              item.partType = 'P'
            }
            item.priceConfirm = item.priceConfirm
              ? toThousands(item.priceConfirm)
              : ''
            item.procAmount = item.procAmount
              ? toThousands(item.procAmount)
              : ''
            item.carconfigSixcodeVolumn = item.carconfigSixcodeVolumn
              ? toThousands(item.carconfigSixcodeVolumn)
              : ''
            item.janCarvolumn = item.janCarvolumn
              ? toThousands(item.janCarvolumn)
              : ''
            item.febCarvolumn = item.febCarvolumn
              ? toThousands(item.febCarvolumn)
              : ''
            item.marCarvolumn = item.marCarvolumn
              ? toThousands(item.marCarvolumn)
              : ''
            item.aprCarvolumn = item.aprCarvolumn
              ? toThousands(item.aprCarvolumn)
              : ''
            item.mayCarvolumn = item.mayCarvolumn
              ? toThousands(item.mayCarvolumn)
              : ''
            item.junCarvolumn = item.junCarvolumn
              ? toThousands(item.junCarvolumn)
              : ''
            item.julCarvolumn = item.julCarvolumn
              ? toThousands(item.julCarvolumn)
              : ''
            item.augCarvolumn = item.augCarvolumn
              ? toThousands(item.augCarvolumn)
              : ''
            item.sepCarvolumn = item.sepCarvolumn
              ? toThousands(item.sepCarvolumn)
              : ''
            item.octCarvolumn = item.octCarvolumn
              ? toThousands(item.octCarvolumn)
              : ''
            item.novCarvolumn = item.novCarvolumn
              ? toThousands(item.novCarvolumn)
              : ''
            item.decCarvolumn = item.decCarvolumn
              ? toThousands(item.decCarvolumn)
              : ''
            item.price = item.price ? toThousands(item.price) : ''
            if (item.priceSource == '?') {
              item.priceSource = ''
            }
            if (Number(item.confirmPrice) == '-100') {
              item.confirmPrice = ''
            } else {
              item.confirmPrice = toThousands(item.confirmPrice)
            }
            this.$set(item, 'originPrice', item.priceConfirm)
            if (item.csGroup && item.csGroupdesc) {
              this.$set(
                item,
                'csGroupName',
                item.csGroup + '-' + item.csGroupdesc
              )
            } else {
              this.$set(item, 'csGroupName', item.csGroupdesc)
            }
            this.$set(item, '_supplierName', item.supplierName)
            this.$set(item, '_supplierNameZh', item.supplierNameZh)
            this.$set(
              item,
              'supplierName',
              item.supplierCode + '-' + item.supplierName
            )
            if (item.isConfirm == 0) {
              this.$set(item, '_isConfirm', '待确认')
            } else {
              this.$set(item, '_isConfirm', '已确认')
            }
            if(this.selectData&&this.selectData.purchaseFactoryVo) {
              this.selectData.purchaseFactoryVo.map((items) => {
                if (item.factoryCode == items.procureFactory) {
                  // 采购工厂
                  this.$set(item, 'factoryName', items.factoryName)
                }
              })
            }
          })
          this.page.currPage = res.data.current
          this.page.pageSize = res.data.size
          this.page.totalCount = res.data.total || 0
        } else {
          this.resultMessage(res)
          this.tableListData = []
        }
        this.tableLoading = false
      } catch(e) {
        this.tableListData = []
        this.tableLoading = false
        console.log(e,'错误信息')
      }
    },
    // 编辑
    edit() {
      this.editStatus = true
      this.inputProps = ['priceConfirm']
      this.selectProps = ['supplierName', 'partType']
      this.selectPropsOptionsObject.partType = this.partType
      this.$nextTick(() => {
        this.$set(
          this.selectPropsOptionsObject,
          'supplierName',
          this.supplierSelectList
        )
      })
    },
    // 批量编辑
    bulkEdit() {
      if (this.selectTableData && this.selectTableData.length == 1) {
        let obj
        this.selectTableData.forEach((item) => {
          obj = {
            partNum: item.partNum,
            confirmPrice: item.priceConfirm,
            confirmQuantity: item.confirmQuantity,
            factoryCode: item.factoryCode,
            supplierId: item.supplierId,
            cggcName: item.factoryCode + '-' + item.factoryName,
            gysName: item.supplierName,
            isConfirm: item.isConfirm
          }
        })
        this.bulkEditData = obj
        this.bulkEditDialog = true
      } else {
        return iMessage.error(
          `${
            this.$i18n.locale === 'zh'
              ? '请选择一条数据'
              : 'please select row data'
          }`
        )
      }
    },
    // 批量编辑回调
    bulkEditCB(val) {
      this.bulkEditDialog = false
      this.getTableList()
    },
    // 转派
    taskTransfer() {
      if (this.listId.length) {
        this.taskTransferDialog = true
      } else {
        return iMessage.error(
          `${this.$i18n.locale === 'zh' ? '请选择数据' : 'please select data'}`
        )
      }
    },
    // 转派回调
    taskTransferCB() {
      this.taskTransferDialog = false
      this.listId = []
      this.getTableList()
    },
    // 退出编辑
    exitEdit() {
      this.editStatus = false
      this.inputProps = []
      this.selectProps = []
      this.selectPropsOptionsObject = []
      let status = this.tableListData.some((item) => {
        return item.editStatus == true
      })
      if (status) this.getTableList()
    },
    // 保存
    save() {
      let data = []
      let list = this.tableListData.filter((item) => {
        return item.editStatus == true
      })
      if (!list.length) {
        return iMessage.error(
          `${this.$i18n.locale === 'zh' ? '请编辑数据' : 'please edit data'}`
        )
      }
      let state = list.some((item) => {
        if (item.priceConfirm.indexOf('.') == -1) return true
        let str = item.priceConfirm.substring(
          item.priceConfirm.indexOf('.') + 1
        )
        return str.length > 2 ? false : true
      })
      if (!state) {
        return iMessage.error(
          `${
            this.$i18n.locale === 'zh'
              ? '价格最多两位小数，请重新编辑'
              : 'The price can be up to two decimal places. Please edit again'
          }`
        )
      }
      list.forEach((item) => {
        let obj = {
          id: item.id,
          supplierId: item.supplierId,
          supplierCode: item.supplierCode,
          supplierName: item.inputVal ? item.supplierName : item._supplierName,
          supplierNameZh: item.inputVal
            ? item.supplierNameZh
            : item._supplierNameZh,
          priceConfirm: delcommafy(item.priceConfirm),
          partType: item.partType,
          partNum: item.partNum,
          originPrice: delcommafy(item.originPrice),
          isConfirm: item.isConfirm == false ? '0' : '1'
        }
        if (item.changeType) {
          ;(obj.confirmPrice = item.confirmPrice
            ? delcommafy(item.confirmPrice)
            : item.confirmPrice1), // 参考价格
            (obj.priceSource = item.priceSource || item.priceSource1) // 参考价格来源
        }
        data.push(obj)
      })
      if (data.length) {
        this.tableLoading = true
        updateSeriesbaseDetail(data)
          .then((res) => {
            if (res.result) {
              this.tableLoading = false
              this.getTableList()
              iMessage.success(
                `${this.$i18n.locale === 'zh' ? res.desZh : res.desEn}`
              )
            }
          })
          .catch(() => {
            this.tableLoading = false
            //                        iMessage.error(this.language('操作失败'))
          })
      }
    },
    // 确认
    confirm() {
      let obj = {
        seriesbaseDetailId: [],
        yearId: this.baseId
      }
      let idList = []
      if (this.selectTableData && this.selectTableData.length >= 1) {
        this.selectTableData.forEach((item) => {
          obj.seriesbaseDetailId.push(item.id)
        })
        this.tableLoading = true
        affirmSeriesbaseDetail(obj)
          .then((res) => {
            if (res.result) {
              this.tableLoading = false
              this.$emit('getHaedData')
              iMessage.success(
                `${this.$i18n.locale === 'zh' ? res.desZh : res.desEn}`
              )
            }
          })
          .catch((err) => {
            this.tableLoading = false
            //                        iMessage.error(`${ this.$i18n.locale === 'zh' ? err.desZh : err.desEn }`)
          })
      } else {
        this.$alert(
          '请注意！此操作将确认全部数据，且确认后将无法修改，是否继续?',
          '提示',
          {
            confirmButtonText: '确定',
            callback: (action) => {
              if (action == 'confirm') {
                this.tableLoading = true
                let obj = {
                  seriesbaseDetailId: [],
                  yearId: this.baseId
                }
                affirmSeriesbaseDetail(obj)
                  .then((res) => {
                    if (res.result) {
                      this.$emit('getHaedData')
                      this.tableLoading = false
                    }
                  })
                  .catch((err) => {
                    this.tableLoading = false
                    //                                    iMessage.error(`${ this.$i18n.locale === 'zh' ? err.desZh : err.desEn }`)
                  })
              }
            }
          }
        )
      }
    },
    // 导出
    download() {
      this.formData.baseId = this.baseId
      this.formData.currentPage = 1
      this.formData.downName = this.title
      exportSeriesbaseDetail(this.formData)
        .then((res) => {
          if(res.result) {
            let remark = res.data.remark
            iMessage.success(remark)
          }
        }).catch((err) => {
        })
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-form-item {
  margin-top: 0;
  margin-bottom: 0;
}

.company {
  text-align: right;
  color: #999;
  padding-top: 10px;
}
</style>
