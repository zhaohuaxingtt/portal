<!--
 * @Author: caopeng
 * @Date: 2021-11-5
-->
<template>
  <i-dialog :visible.sync="value"
            width="90%"
            top="2%"
            @close="clearDiolog"
            :title="''">

    <div class="box">
      <div class="header">
        <el-form inline
                 label-position="top">
          <el-form-item :label="language('BIAOQIANMINGCHENG', '标签名称')">
            <iInput v-model="form.tagName"
                    :placeholder="language('QINGSHURU', '请输入')"></iInput>
          </el-form-item>
          <el-form-item :label="language('BIAOQIANLEIXING', '标签类型')">
            <iSelect :placeholder="$t('APPROVAL.PLEASE_CHOOSE')"
                     v-model="form.tagType">
              <el-option v-for="item in tagTypeList"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </iSelect>
          </el-form-item>
        </el-form>
        <div>
          <iButton @click="sure">{{
          language('CHAXUN', '查询')
        }}</iButton>
          <iButton @click="clickReset">{{
          language('CHONGZHI', '重置')
        }}</iButton>
        </div>
      </div>
      <div class="section"
           style="margin-top:30px">
        <div class="sectionTitle">
          <span class="ptext">
            {{
              language(
                'XIANGQINGLIEBIAO',
                '详情列表'
              )
            }}
          </span>
          <iButton @click="clickBtn">{{
          language('BAOCUN', '保存')
        }}</iButton>
        </div>
        <tableList style="margin-top:30px"
                   :tableData="tabledata"
                   @handleSelectionChange="handleSelectionChange"
                   :tableTitle="setTagCloum"
                   :tableLoading="tableLoadingDel"
                   :index="true">
          <template #isShow="scope">
            <div class="isShowBtnStyle"
                 @click="handleIs(scope.row)">
              <icon class="icon"
                    symbol
                    :name="scope.row.isShow == 1 ? 'iconxianshi' : 'iconyincang'"></icon>
            </div>
          </template>
        </tableList>
        <iPagination style="margin-top:20px"
                     v-update
                     @size-change="handleSizeChange($event, getList)"
                     @current-change="handleCurrentChange($event, getList)"
                     background
                     :page-sizes="page.pageSizes"
                     :page-size="page.pageSize"
                     :layout="page.layout"
                     :current-page="page.currPage"
                     :total="page.totalCount" />
      </div>
    </div>
  </i-dialog>
</template>

<script>
import { iDialog, iButton, iSelect, iMessage, iInput, iPagination } from 'rise'
import tableList from '@/components/commonTable'
import { pageMixins } from '@/utils/pageMixins'
import { setTagCloum } from './data'
import {
  supplierTagPage,
  supplierTagListSave,
  showOrHide
} from '@/api/supplierManagement/supplierTag/index'
export default {
  mixins: [pageMixins],
  components: {
    iDialog,
    tableList,
    iButton,
    iSelect,
    iInput,
    iPagination
  },
  props: {
    value: { type: Boolean },
    rowList: { type: Object }
  },
  data() {
    return {
      tabledata: [],
      setTagCloum: setTagCloum,
      tableLoading: false,
      selectArr: [],
      form: {},
      tagTypeList: [
        { label: this.language('XITONGPANDING', '系统判定'), value: 1 },
        { label: this.language('SHOUGONG', '手工'), value: 2 }
      ]
    }
  },
  watch: {},
  created() {
    this.getList()
  },
  methods: {
    getList() {
      const req = {
        supplierId: this.rowList.subSupplierId,
        ...this.form,
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize
      }
      supplierTagPage(req).then((res) => {
        if (res && res.code == 200) {
          this.tabledata = res.data
          this.page.totalCount = res.total
        } else iMessage.error(res.desZh)
      })
    },
    clickBtn() {
      if (this.selectArr.length == 0) {
        iMessage.warn(this.$t('SUPPLIER_ZHISHAOXUANZHEYITIAOJILU'))
        return false
      }
      const req = {
        supplierId: this.rowList.subSupplierId,
        tagIdAll: this.tabledata.map((x) => {
          return x.tagId
        }),
        tagIdSelected: this.selectArr.map((x) => {
          return x.tagId
        })
      }
      supplierTagListSave(req).then((res) => {
        if (res && res.code == 200) {
          this.getList()
          iMessage.success(res.desZh)
        } else iMessage.error(res.desZh)
      })
    },
    handleIs(row) {
      const req = {
        id: row.tagId,
        isShow: row.isShow == 1 ? 0 : 1
      }
      showOrHide(req).then((res) => {
        if (res && res.code == 200) {
          iMessage.success(res.desZh)
          this.getTableData()
        } else iMessage.error(res.desZh)
      })
    },
    handleSelectionChange(val) {
      this.selectArr = val
    },

    clearDiolog() {
      this.$emit('closeDiolog')
    },

    sure() {
      this.page.currPage = 1
      this.page.pageSize = 10
      this.getList()
    },
    clickReset() {
      this.page.currPage = 1
      this.page.pageSize = 10
      this.form = {}
      this.getList()
    }
  }
}
</script>

<style scoped lang="scss">
.changeContent {
  padding: 0px 10px 20px 10px;
}
.box {
  padding-bottom: 20px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    border-bottom: 1px solid #e3e3e3;
  }
  .section {
    .sectionTitle {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .ptext {
    font-size: 18px;
    font-family: Arial;
    font-weight: bold;
    color: #000000;
  }
}
</style>