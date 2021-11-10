<!--
 * @Author: caopeng
 * @Date: 2021-010-11 
-->
<template>
    <iPage>
      <div class="headerTitle">
        <div class="supplierTableTittle">
          {{ tableData.supplierName }}
        </div>
      </div>
      <iCard class="tableList" style="margin-top:20px">
        <div class="top" v-if="personType == 1 && !isSubmitted">
          <div class="searchOptions">
            <div class="btnBox">
              <iButton @click="handleReast">{{
                language('CHONGZHI', '重置')
              }}</iButton>
              <iButton @click="handleSave">{{
                language('TIJIAO', '提交')
              }}</iButton>
            </div>
          </div>
        </div>
        <div class="table-box">
          <tableList
            :tableData="tableData.list"
            :tableTitle="TakeNoteTableTitle"
            :tableLoading="loading"
            :index="true"
            :input-props="inputProps"
            :selection="false"
          >
            <template #completion="scope">
              <span
                >{{ scope.row.overdueNumber }}/{{ scope.row.totalNumber }}</span
              >
            </template>
            <template #categoryNumberName="scope">
              <el-tooltip
                :content="scope.row.tipsSupplier"
                placement="top"
                effect="light"
              >
                <span>{{ scope.row.categoryNumberName }}</span>
              </el-tooltip>
            </template>
            <template #explanation="scope">
              <div v-if="personType == 1 && !isSubmitted">
                <iInput
                  clearable
                  v-model="scope.row.explanation"
                  :placeholder="language('QINGSHURU', '请输入')"
                  maxlength="200"
                ></iInput>
              </div>
              <div v-if="personType == 2 || isSubmitted">
                {{ scope.row.explanation }}
              </div>
            </template>
            <template #target="scope">
              <div v-if="personType == 1 && !isSubmitted">
                <iInput
                  clearable
                  maxlength="200"
                  v-model="scope.row.target"
                  :placeholder="language('QINGSHURU', '请输入')"
                ></iInput>
              </div>
              <div v-if="personType == 2 || isSubmitted">
                {{ scope.row.target }}
              </div>
            </template>
            <template #actionPlan="scope">
              <div v-if="personType == 1 && !isSubmitted">
                <iInput
                  clearable
                  maxlength="200"
                  v-model="scope.row.actionPlan"
                  :placeholder="language('QINGSHURU', '请输入')"
                ></iInput>
              </div>
              <div v-if="personType == 2 || isSubmitted">
                {{ scope.row.actionPlan }}
              </div>
            </template>
          </tableList>
        </div>
      </iCard>
    </iPage>
</template>

<script>
import { iPage, iCard, iMessage, iInput, iButton, iMessageBox } from 'rise'
import { TakeNoteTableTitle, TakeNoteTableTitleNull } from './data'
import tableList from '@/components/commonTable'
import { spiDetailQuery, spiDetailSave } from '@/api/kpiChart/spi.js'
export default {
  components: {
    iPage,
    iCard,
    iInput,
    tableList,
    iButton
  },
  data() {
    return {
      reportData: null,
      loading: true,
      supplierId: '',
      tableData: [],
      TakeNoteTableTitle: TakeNoteTableTitle,
      columns: [],
      reasonData: [],
      visible: true,
      personType: 2,
      isSubmitted: true
    }
  },
  created() {
    this.fetchReportDetail()
  },
  computed: {
    checkShowReason() {
      return function(row) {
        let flag = true
        let temp = null
        this.columns.map(item => {
          const data = eval(window._.cloneDeep(row[item.name]))
          if (!data || (temp && temp >= data)) {
            flag = false
          }
          temp = data
        })
        return flag
      }
    }
  },
  methods: {
    //查询
    fetchReportDetail() {
      this.loading = true
      const params = {
        id: this.$route.query.id
      }
      spiDetailQuery(params).then(res => {
        this.personType = this.$route.query.personType
        console.log(this.personType)
        this.loading = false
        if (res && res.code == 200) {
          this.tableData =
           {
           list: [
              {
                actionPlan:
                  'arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组arr将所有检查内容push进数组varr将所有检查内容push进数组',
                explanation: '',
                target: ''
              },
              { actionPlan: '', explanation: '', target: '' }
            ]
          }
          // arr将所有检查内容push进数组
          let arr = []
          this.tableData.list.forEach(val => {
            arr.push(val.actionPlan)
            arr.push(val.explanation)
            arr.push(val.target)
          })
          let isNull = arr.some(val => {
            if (val != null) {
              return true
            }
          })
          if (isNull) {
            this.isSubmitted = true
          } else this.isSubmitted = false
          if (
            (this.personType == 2 || this.personType == undefined) &&
            !isNull
          ) {
            //更换表头
            this.TakeNoteTableTitle = TakeNoteTableTitleNull
          } else {
            this.TakeNoteTableTitle = TakeNoteTableTitle
          }
        } else iMessage.error(res.desZh)
      })
    },

    //重置
    handleReast() {
      iMessageBox(
        this.language('SHIFOUQINGKONGNEIRONG?', '是否清空该⻚全部输⼊内容？'),
        this.language('CHONGZHI', '重置'),
        {
          confirmButtonText: this.language('SHI', '是'),
          cancelButtonText: this.language('FOU', '否')
        }
      ).then(async () => {
        this.tableData.list.forEach(e => {
          e.actionPlan = ''
          e.explanation = ''
          e.target = ''
        })
      })
    },
    //保存
    handleSave() {
      iMessageBox(
        this.language('SHIFOUQUERENTIJIAO?', '是否确认提交？'),
        this.language('TIJIAO', '提交'),
        {
          confirmButtonText: this.language('QUEREN', '确认'),
          cancelButtonText: this.language('QUXIAO', '取消')
        }
      ).then(async () => {
        const params = {
          id: this.$route.query.id,
          list: this.tableData.list
        }
        this.tableData.list.forEach(val => {
          if (val.actionPlan == null) val.actionPlan = ''
          if (val.explanation == null) val.explanation = ''
          if (val.target == null) val.target = ''
        })
        console.log(params)
        spiDetailSave(params).then(() => {
          this.fetchReportDetail()
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-table .el-table__row .el-input {
  width: 100% !important;
  // padding: 6px 0 !important;
}
.imgkpi-head {
  display: flex;
  justify-content: space-between;
}
// ::v-deep .card{
//     overflow: auto;
//     height: 80%;
// }
.headerTitle {
  width: 100%;
  display: flex;
  margin-bottom: 20px;

  justify-content: space-between;
  align-items: center;
}

.closed {
  font-size: 24px;
  color: #a0bffc;
  cursor: pointer;
}
.top {
  display: flex;
  justify-content: space-between;
  .searchOptions {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
  }
  .rotate {
    transform: rotate(180deg);
    color: #a0bffc;
    margin-left: 10px;
    font-size: 16px;
  }
}
.supplierTableTittle {
  font-size: 20px;
  color: #000;
  font-weight: bold;
}
.table-box {
  margin-top: 20px;
  .rotate {
    color: #e30d0d;
    font-size: 16px;
  }
}
</style>
