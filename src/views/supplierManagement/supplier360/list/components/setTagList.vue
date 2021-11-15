<!--
 * @Author: caopeng
 * @Date: 2021-11-5
-->
<template>
  <i-dialog :visible.sync="value"
            width="90%"
            top="2%"
            @close="clearDiolog"
            :title="rowList.nameZh">

    <div class="box">
      <div class="header">
        <el-form inline
                 label-position="top">
          <el-form-item :label="language('BIAOQIANMINGCHENG', '标签名称')">
            <iSelect :placeholder="$t('APPROVAL.PLEASE_CHOOSE')"
                     v-model="form.tagNameList">
              <el-option v-for="item in tagdropDownList"
                         :key="item.code"
                         :label="item.message"
                         :value="item.code">
              </el-option>
            </iSelect>
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
        <el-table :data="tabledata"
                  v-loading="tableLoading"
                  @selection-change="handleSelectionChange"
                  style="margin-top:30px"
                  :tableTitle="setTagCloum">
          <el-table-column type="selection"
                           width="50"
                           align="center"
                           :selectable="selectable"></el-table-column>
          <el-table-column key="BIAOQIANMINGCHENG"
                           width="150"
                           align="center"
                           prop="tagName"
                           label="标签名称"> </el-table-column>
          <el-table-column key="BIAOQIANLEIXING"
                           width="150"
                           align="center"
                           prop="tagTypeVale"
                           label="标签类型"> </el-table-column>
          <el-table-column key="XITONGPANDUANBIAOZHUN"
                           width=""
                           align="center"
                           prop="tagDesc"
                           label="系统判断标准"> <template slot-scope="scope">
              <span v-if="scope.row.tagTypeVale=='手工维护'">无</span>
            </template> </el-table-column>
          <el-table-column width="150"
                           align="center"
                           prop="isShow"
                           :label="
          language('XIANSHIYINCNAG', '显示/隐藏')
        ">
            <template slot="header">
              <span>{{ language('XIANSHIYINCNAG', '显示/隐藏')}}</span>

              <el-popover width="280"
                          :content="text">
                <div slot="reference">
                  <span>{{ language('XIANSHIYINCNAG', '显示/隐藏')}}</span>
                  <icon class="icon"
                        symbol
                        name="iconxinxitishi"></icon>
                </div>

              </el-popover>
            </template>
            <template slot-scope="scope">

              <div class="isShowBtnStyle"
                   @click="handleIs(scope.row)">

                <icon class="icon"
                      symbol
                      :name="scope.row.isShow == 1 ? 'iconxianshi' : 'iconyincang'"></icon>

              </div>
            </template>
          </el-table-column>
        </el-table>
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
import { iDialog, iButton, iSelect, iMessage, iPagination, icon } from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import { setTagCloum } from './data'
import {
  supplierTagPage,
  supplierTagListSave,
  showOrHide,
  dropDownTagName
} from '@/api/supplierManagement/supplierTag/index'
export default {
  mixins: [pageMixins],
  components: {
    iDialog,
    iButton,
    iSelect,
    iPagination,
    icon
  },
  props: {
    value: { type: Boolean },
    rowList: { type: Object }
  },
  data() {
    return {
      text: '显示：显示的供应商标签会在界面中展示;<br/> 隐藏：隐藏的供应商标签不会在界面中展示。',
      tabledata: [],
      setTagCloum: setTagCloum,
      tableLoading: false,
      selectArr: [],
      form: {},
      tagdropDownList: [],
      tagTypeList: [
        { label: this.language('XITONGPANDING', '系统判定'), value: 1 },
        { label: this.language('SHOUGONG', '手工'), value: 2 }
      ]
    }
  },
  watch: {},
  created() {
    this.getTagListdropDown()
    this.getList()
  },
  methods: {
    //获取标签列表
    getTagListdropDown() {
      dropDownTagName({}).then((res) => {
        if (res && res.code == 200) {
          this.tagdropDownList = res.data
        }
      })
    },
    getList() {
      this.tableLoading = true
      const req = {
        supplierId: this.rowList.subSupplierId,
        ...this.form,
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize
      }
      supplierTagPage(req).then((res) => {
        if (res && res.code == 200) {
          this.tableLoading = false
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
          this.$emit('closeDiolog', 1)
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
          this.getList()
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
    },
    selectable(val) {
      if (val.isBinding != 1 && val.tagTypeVale == '手工维护') {
        return true
      }
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