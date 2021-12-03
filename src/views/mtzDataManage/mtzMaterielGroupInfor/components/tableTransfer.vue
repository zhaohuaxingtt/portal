<template>
  <div class="the-detail-parts margin-top20">
    <iCard collapse :title="title" v-loading="saveLoading">
      <div class="header flex flex-between-center" slot="header-control">
        <div class="search flex flex-start-center">
          <iInput
            v-model="filterValue"
            class="s-input"
            :placeholder="placeholder"
            clearable
          />
          <iButton @click="search">{{ language('查询') }}</iButton>
        </div>
        <div>
          <iButton v-show="!editable" @click="edit">
            {{ language('编辑') }}
          </iButton>
          <iButton v-show="editable" @click="saveRight">
            {{ language('保存') }}
          </iButton>
          <iButton v-show="editable" @click="cancel">
            {{ language('取消') }}
          </iButton>
        </div>
      </div>
      <div class="the-detail-parts-content" v-show="editable">
        <div class="parts-table">
          <div class="t">
            <span>{{ subLeftTitle }}</span>
            <div class="mark">
              表示已关联
            </div>
          </div>
          <iTableCustom
            :loading="leftLoading"
            :data="leftData"
            :columns="tableColumns"
            :rowClassName="getLeftRowClassName"
            @to-detail="toDetail"
            height="370px"
            @handle-selection-change="handleLeftSelectionChange"
          />
          <iPagination
            v-update
            @size-change="handleSizeChange($event, queryLeft)"
            @current-change="handleCurrentChange($event, queryLeft)"
            background
            :current-page="page.currPage"
            :page-sizes="page.pageSizes"
            :page-size="page.pageSize"
            layout="prev, pager, next"
            :total="page.totalCount"
          />
        </div>
        <div class="transfer">
          <div class="btn-transfer btn-to-right" @click="tansferToRight">
            <span class="el-icon-arrow-right"></span>
          </div>
          <div class="btn-transfer btn-to-left" @click="transferToLeft">
            <span class="el-icon-arrow-left"></span>
          </div>
        </div>
        <div class="parts-table">
          <div class="t">{{ subRightTitle }}</div>
          <iTableCustom
            :loading="rightLoading"
            :data="rightData"
            :columns="tableColumns"
            @to-detail="toDetail"
            height="370px"
            @handle-selection-change="handleRightSelectionChange"
          />
        </div>
      </div>
      <div class="the-detail-parts-content" v-show="!editable">
        <div class="parts-table full">
          <div class="t">{{ subRightTitle }}</div>
          <iTableCustom
            :loading="rightLoading"
            :data="viewRightData"
            :columns="tableColumns"
            @to-detail="toDetail"
            height="370px"
            @handle-selection-change="handleRightSelectionChange"
          />
        </div>
      </div>
    </iCard>

    <iPagination
      v-show="!editable"
      v-update
      @size-change="handleSizeChangeDiy"
      @current-change="handleCurrentChangeDiy"
      background
      :current-page="currPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :layout="'sizes, prev, pager, next, jumper'"
      :total="viewTotalCount"
    />
  </div>
</template>

<script>
import iTableCustom from '@/components/iTableCustom'
import { iMessage, iCard, iInput, iButton, iPagination } from 'rise'
import { openUrl } from '@/utils'
import { pageMixins } from '@/utils/pageMixins'
export default {
  name: 'tableTransfer',
  components: { iTableCustom, iCard, iInput, iButton, iPagination },
  mixins: [pageMixins],
  props: {
    title: { type: String },
    tableColumns: {
      type: Array,
      require: true
    },
    placeholder: { type: String },
    subLeftTitle: { type: String },
    subRightTitle: { type: String },
    leftNullSelectTips: { type: String },
    rightNullSelectTips: { type: String },
    queryLeftFun: { type: Function },
    queryRightFun: { type: Function },
    saveRightFun: { type: Function },
    keyName: { type: String, default: 'id' },
    rightDataFilterKeys: {
      type: Array,
      default: function() {
        return []
      }
    },
    otherRelationFun: { type: Function },
    leftDisabledProp: { type: String }
  },
  computed: {
    selectedLeftIds() {
      return this.selectedLeftData.map(e => e[this.keyName])
    },
    selectedRightIds() {
      return this.selectedRightData.map(e => e[this.keyName])
    },
    rightIds() {
      return this.rightData.map(e => e[this.keyName])
    },
    leftDisabledIds() {
      if (this.leftDisabledProp) {
        return this.leftData
          .filter(e => e[this.leftDisabledProp])
          .map(e => e[this.keyName])
      }
      return []
    }
  },
  data() {
    return {
      filterValue: '',
      editable: false,
      leftData: [],
      rightData: [],
      leftLoading: false,
      rightLoading: false,
      selectedLeftData: [],
      selectedRightData: [],
      saveLoading: false,
      currPage: 1,
      pageSize: 10,
      viewTotalCount: 0,
      viewRightData: []
    }
  },
  created() {
    this.queryRight()
    this.queryLeft()
    // this.queryRightViewData()
  },
  methods: {
    edit() {
      this.editable = true
      this.filterValue = ''
      this.queryLeft()
    },
    tansferToRight() {
      if (this.selectedLeftData.length === 0) {
        iMessage.error(this.leftNullSelectTips)
        return
      }
      const data = _.cloneDeep(this.selectedLeftData)
      this.rightData.unshift(...data)
      this.leftData = this.leftData.map(e => {
        if (this.rightIds.includes(e[this.keyName])) {
          e.disabled = true
        }
        return e
      })
    },
    transferToLeft() {
      if (this.selectedRightData.length === 0) {
        iMessage.error(this.rightNullSelectTips)
        return
      }
      this.rightData = this.rightData.filter(
        e => !this.selectedRightIds.includes(e[this.keyName])
      )
      this.leftData = this.leftData.map(e => {
        if (this.rightIds.includes(e[this.keyName])) {
          e.disabled = true
        }
        return e
      })
    },
    handleLeftSelectionChange(val) {
      this.selectedLeftData = val
    },
    handleRightSelectionChange(val) {
      this.selectedRightData = val
    },
    getLeftRowClassName({ row }) {
      if (
        this.rightIds.includes(row[this.keyName]) ||
        this.leftDisabledIds.includes(row[this.keyName])
      ) {
        return 'disabled'
      }
      return ''
    },
    search() {
      this.page.currPage = 1
      this.page.pageSize = 10
      this.editable ? this.queryLeft() : this.searchViewRightData()
    },
    queryLeft() {
      this.leftLoading = true
      this.queryLeftFun({
        keyWord: this.filterValue,
        current: this.page.currPage,
        size: this.page.pageSize
      })
        .then(res => {
          if (res.result) {
            this.leftData = res.data || []
            this.page.totalCount = res.total
            this.page.pageSize = res.pageSize
          }
        })
        .finally(() => {
          this.leftLoading = false
        })
    },
    queryRight() {
      this.rightLoading = true
      const result = this.queryRightFun('')
      if (result) {
        result
          .then(res => {
            if (res.result) {
              this.rightData = res.data || []
              this.queryViewRightData()
            }
          })
          .finally(() => {
            this.rightLoading = false
          })
      } else {
        this.rightLoading = false
      }
    },
    saveRight() {
      this.saveLoading = true
      this.saveRightFun(this.rightData)
        .then(res => {
          if (res.result) {
            iMessage.success(res.desZh || '保存成功')
            this.editable = false
          } else {
            iMessage.error(res.desZh || '保存失败')
          }
        })
        .catch(err => {
          iMessage.error(err.desZh || '保存失败')
        })
        .finally(() => {
          this.saveLoading = false
          this.filterValue = ''
          this.queryRight()
        })
    },
    cancel() {
      this.editable = false
      this.filterValue = ''
      this.queryRight()
    },
    toDetail(val) {
      openUrl(`/materielData/material-group/detail?id=${val.id}`)
    },

    // 浏览搜索
    handleSizeChangeDiy(val) {
      this.pageSize = val
      this.queryViewRightData()
    },
    handleCurrentChangeDiy(val) {
      this.currPage = val
      this.queryViewRightData()
    },
    searchViewRightData() {
      this.currPage = 1
      this.queryViewRightData()
    },
    queryViewRightData() {
      let lists = this.rightData
      if (this.filterValue.length) {
        const filterValue = this.filterValue.toLowerCase()
        const keys = this.rightDataFilterKeys
        lists = this.rightData.filter(e => {
          let res = false
          for (let i = 0; i < keys.length; i++) {
            if (e[keys[i]]) {
              const item = e[keys[i]].toLowerCase()
              if (item.includes(filterValue)) {
                res = true
              }
            }
          }
          return res
        })
      }
      const start = (this.currPage - 1) * this.pageSize
      const end = start + this.pageSize
      this.viewRightData = lists.slice(start, end)
      this.viewTotalCount = lists.length
    }
  }
}
</script>

<style lang="scss" scoped>
.the-detail-parts {
  ::v-deep .cardHeader .title {
    white-space: nowrap;
  }
  ::v-deep .cardHeader > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .control {
      width: calc(100% - 30px);
    }
  }
  .s-input {
    margin: 0px 20px 0px 50px;
    width: 400px;
    font-size: 12px;
    ::v-deep .el-input__inner {
      font-size: 12px;
    }
  }
}
.header {
  width: 100%;
  justify-content: space-between;
}
.the-detail-parts-content {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  height: 100%;
}
.parts-table {
  width: calc(50% - 40px);
  .t {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    .mark {
      font-size: 14px;
      color: #999;
      display: flex;
      align-items: center;
      font-weight: normal;
      &::before {
        content: '';
        display: block;
        width: 30px;
        height: 12px;
        background: #f0f0f0;
        border-radius: 3px;
        margin-right: 5px;
      }
    }
  }
  &.full {
    width: 100%;
  }
}
.transfer {
  margin: 0px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.btn-transfer {
  width: 30px;
  height: 30px;
  border: solid 1px #c7c6c6;
  border-radius: 15px;
  color: #c7c6c6;
  font-weight: bold;
  text-align: center;
  font-size: 22px;
  margin: 10px 0px;
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover {
    border: solid 1px $color-blue;
    color: $color-blue;
  }
}
</style>
