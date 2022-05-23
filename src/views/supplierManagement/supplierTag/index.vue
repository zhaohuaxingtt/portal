<!--
 * @Author: caopeng
 * @Date: 2021-010-13 
-->
<template>
  <iPage>
    <!-- <iDialog width="80%" title="测试" :visible.sync="dialogVisible"></iDialog> -->
    <span class="boxTitle">
      {{ language('GONGYINGSHANGBIAOQIANGUANLI', '供应商标签管理') }}</span
    >
    <iSearch @reset="clickReset" @sure="sure" :icon="true">
      <el-form inline label-position="top">
        <el-form-item :label="language('BIAOQIANMINGCHENG', '标签名称')">
          <iSelect
            multiple
            collapse-tags
            filterable
            :placeholder="language('请选择')"
            v-model="form.tagNameList"
          >
            <el-option
              v-for="item in tagdropDownList"
              :key="item.code"
              :label="item.message"
              :value="item.code"
            >
            </el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('BIAOQIANLEIXING', '标签类型')">
          <iSelect :placeholder="language('请选择')" v-model="form.tagType">
            <el-option
              v-for="item in tagTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </iSelect>
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard style="margin-top: 20px">
      <!-- <div class="supplier-table-tittle">重点追踪供应商名单</div> -->
      <div class="table-title">
        <div>
          <span class="ptext">
            {{ language('XIANGQINGLIEBIAO', '详情列表') }}
          </span>
        </div>
        <div>
          <iButton @click="handleAdd()">{{
            language('XINZENG', '新增')
          }}</iButton>
          <iButton @click="handleDelect">{{
            language('SHANCHU', '删除')
          }}</iButton>
        </div>
      </div>

      <el-table
        :data="tabledata"
        v-loading="tableLoading"
        @selection-change="handleSelectionChange"
        style="margin-top: 30px"
        :tableTitle="setTagCloum"
      >
        <el-table-column
          type="selection"
          width="50"
          align="center"
          :selectable="selectable"
        ></el-table-column>
        <el-table-column
          key="BIAOQIANMINGCHENG"
          width="150"
          align="center"
          prop="tagName"
          label="标签名称"
        >
        </el-table-column>
        <el-table-column
          key="BIAOQIANLEIXING"
          width="150"
          align="center"
          prop="tagTypeVale"
          label="标签类型"
        >
        </el-table-column>
        <el-table-column
          key="XITONGPANDUANBIAOZHUN"
          width=""
          align="center"
          prop="tagDesc"
          label="系统判断标准"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.tagTypeVale == '手工维护'">无</span>
            <span v-else>{{ scope.row.tagDesc }}</span>
          </template>
        </el-table-column>
        <el-table-column
          width="150"
          align="center"
          prop="isShow"
          :label="language('XIANSHIYINCNAG', '显示/隐藏')"
        >
          <template slot="header">
            <el-popover width="280" :content="text">
              <div slot="reference">
                <span>{{ language('XIANSHIYINCNAG', '显示/隐藏') }}</span>
                <icon class="icon" symbol name="iconxinxitishi"></icon>
              </div>
            </el-popover>
          </template>
          <template slot-scope="scope">
            <div class="isShowBtnStyle" @click="handleIs(scope.row)">
              <icon
                class="icon"
                symbol
                :name="scope.row.isShow == 1 ? 'iconxianshi' : 'iconyincang'"
              ></icon>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <iPagination
        style="margin-top: 20px"
        v-update
        @size-change="handleSizeChange($event, getTableData)"
        @current-change="handleCurrentChange($event, getTableData)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.totalCount"
      />
      <iDialog
        @close="closeDiolog()"
        :title="language('XINZENG', '新增')"
        :visible.sync="isAdd"
        v-if="isAdd"
        width="30%"
      >
        <el-form label-position="top">
          <el-form-item :label="language('BIAOQIANMINGCHENG', '标签名称')">
            <iInput
              v-model="tagName"
              :placeholder="language('QINGSHURU', '请输入')"
            ></iInput>
          </el-form-item>
        </el-form>
        <div class="bottom">
          <i-button @click="handleBtn()">{{
            language('QUEDING', '确定')
          }}</i-button>
        </div>
      </iDialog>
    </iCard>
  </iPage>
</template>

<script>
import { pageMixins } from '@/utils/pageMixins'
import {
  iSearch,
  iButton,
  iCard,
  iSelect,
  iPagination,
  iMessage,
  iInput,
  iMessageBox,
  icon,
  iDialog,
  iPage
} from 'rise'
import { Cloum } from './components/data'
import {
  getTagPage,
  delBatchDel,
  showOrHide,
  tagAdd,
  getTagList,
  dropDownTagName
} from '@/api/supplierManagement/supplierTag/index'
export default {
  mixins: [pageMixins],
  components: {
    iButton,
    iSearch,
    iCard,
    iSelect,
    iPagination,
    iInput,
    icon,
    iDialog,
    iPage
  },
  data() {
    return {
      text: '显示：显示的供应商标签会在界面中展示; 隐藏：隐藏的供应商标签不会在界面中展示。',
      tagName: '',
      isAdd: false,
      selectTableData: [],
      supplierListLoading: true,
      form: {},
      Cloum: Cloum,
      tabledata: [],
      tableLoading: true,
      tagList: [],
      tagdropDownList: [],
      tagTypeList: [
        { label: this.language('QUANBU', '全部'), value: '' },
        { label: this.language('XITONGPANDING', '系统判定'), value: 1 },
        { label: this.language('SHOUGONG', '手工'), value: 2 }
      ]
    }
  },
  created() {
    this.getTagListdropDown()
    this.getTableData()
  },
  methods: {
    //获取标签列表
    getTagListdropDown() {
      var list = {};
      if(this.$route.query.supplierType=="GP"){
        list = {
          type:2
        }
      }
      dropDownTagName(list).then((res) => {
        if (res && res.code == 200) {
          this.tagdropDownList = res.data
        }
      })
    },
    getTagListObj() {
      let params = {}
      getTagList(params).then((res) => {
        if (res && res.code == 200) {
          this.tagList = res.data
        }
      })
    },
    handleSelectionChange(val) {
      this.selectTableData = val
    },
    //获取列表接口
    getTableData() {
      this.tableLoading = true
      const params = {
        pageNo: this.page.currPage,
        type:this.$route.query.supplierType=="GP"?2:"",
        pageSize: this.page.pageSize,
        ...this.form
      }
      getTagPage(params).then((res) => {
        this.tableLoading = false
        if (res && res.code == 200) {
          this.tabledata = res.data
          this.page.totalCount = res.total
        } else iMessage.error(res.desZh)
      })
    },
    handleDelect() {
      if (this.selectTableData.length == 0) {
        iMessage.warn(this.$t('SUPPLIER_ZHISHAOXUANZHEYITIAOJILU'))
        return false
      }
      iMessageBox(
        this.language(
          'QUERENSHANCHUGAIBIAOQIANDESUOYOUGONGYINGSHANGPEIZHI?',
          '确认删除该标签的所有供应商配置？'
        ),
        this.language('SHANCHU', '删除'),
        {
          confirmButtonText: this.language('SHI', '是'),
          cancelButtonText: this.language('FOU', '否')
        }
      ).then(async () => {
        const req = {
          ids: this.selectTableData.map((x) => {
            return x.tagId
          })
        }
        console.log(this.selectTableData)
        delBatchDel(req).then((res) => {
          if (res && res.code == 200) {
            iMessage.success(res.desZh)
            this.getTableData()
          } else iMessage.error(res.desZh)
        })
      })
    },
    handleAdd() {
      this.tagName = ''
      this.isAdd = true
      this.getTagListObj()
    },
    //保存
    handleBtn() {
      if (this.tagName == '') {
        iMessage.warn(
          this.language('QINGSHURUBIAOQIANMINGCHENG', '请输入标签名称')
        )
        return false
      }
      const req = {
        tagName: this.tagName,
        type:this.$route.query.supplierType=="GP"?2:"",
      }
      tagAdd(req).then((res) => {
        if (res && res.code == 200) {
          iMessage.success(res.desZh)
          this.isAdd = false
          this.getTableData()
        } else iMessage.error(res.desZh)
      })
    },
    handleIs(row) {
      const req = {
        id: row.tagId,
        isShow: row.isShow == 1 ? 2 : 1
      }
      showOrHide(req).then((res) => {
        if (res && res.code == 200) {
          iMessage.success(res.desZh)
          this.getTableData()
        } else iMessage.error(res.desZh)
      })
    },
    // 点击重置
    clickReset() {
      this.form = {}
      this.getTableData()
    },
    sure() {
      this.page.currPage = 1
      this.page.pageSize = 10
      this.getTableData()
    },
    closeDiolog() {
      this.isAdd = false
    },
    selectable(val) {
      if (val.tagTypeVale == '手工维护') {
        return true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// ::v-deep .el-tooltip__popper {
// width: 100px!important;  //宽度可根据自己需要进行设置
//   }

.boxTitle {
  font-size: 20px;
  font-family: Arial;
  font-weight: bold;
  color: #000000;
  padding: 20px;
  display: inline-block;
}
.isShowBtnStyle {
  cursor: pointer;
}
.bottom {
  padding-bottom: 20px;
}
.imgkpi-head {
  display: flex;
  justify-content: space-between;
}
.tab {
  width: 240px;
  display: flex;
  justify-content: flex-start;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.08);
  margin-bottom: 20px;

  div {
    width: 120px;
    height: 35px;
    color: #000;
    text-align: center;
    line-height: 35px;
    cursor: pointer;
    font-weight: bold;
  }
  .radius-left {
    border-radius: 10px 0 0 10px;
  }
  .radius-right {
    border-radius: 0 10px 10px 0;
  }
  .current {
    background-color: #fff !important;
    color: #1660f1 !important;
  }
}
.supplier-table-tittle {
  font-size: 18px;
  color: #000;
  font-weight: bold;
  margin-bottom: 20px;
}
.table-title {
  display: flex;
  margin-top: 10px;
  align-items: center;
  justify-content: space-between;
  .ptext {
    font-size: 18px;
    font-family: Arial;
    font-weight: bold;
    color: #000000;
  }
  .spanText {
    font-size: 14px;
    font-family: Arial;
    font-weight: 400;
    color: #e30b0d;
    opacity: 1;
  }
}

::v-deep.navBox {
  .logButton .icon + span {
    vertical-align: top;
  }
  position: relative;
  // border-bottom: 1px solid #E3E3E3;
  margin-bottom: 20px;
  div {
    font-size: 20px;
  }
  .el-tabs__nav-wrap::after {
    width: 0;
  }
  .el-tabs__item {
    line-height: 24px;
  }
  .el-tabs__item.is-active {
    font-weight: Bold;
  }
  .leftNav {
    float: left;
  }
  .rightNav {
    float: right;
    margin-right: 110px;
    .el-tabs__active-bar {
      background-color: transparent !important;
    }
  }

  .logButton {
    position: absolute;
    top: 5px;
    right: 0;
  }
}
::v-deep.atooltip {
  background: #fff !important;
}

.clearfix:after {
  content: '020';
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

.clearfix {
  /* 触发 hasLayout */
  zoom: 1;
}
</style>
