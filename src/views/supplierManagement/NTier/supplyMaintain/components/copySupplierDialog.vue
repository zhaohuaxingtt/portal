<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-10-08 19:29:09
 * @LastEditors: Please set LastEditors
 * @Descripttion: your project
-->
<template>
  <iDialog :title="language('FZGYLLQXZSGLDXYGYS','复制供应链路 - 请选择所关联的下游供应商')"
           width="90%"
           :visible.sync="value"
           show-close
           @close="clearDiolog">
    <el-row :gutter="40">
      <el-form>
        <el-col :span="4">
          <el-form-item :label="language('QUYU','区域')">
            <el-cascader v-model="form.areaArray"
                         :placeholder="language('GUOJIA_SHENGFEN_DIQU','国家-省份-地区')"
                         :options="areaList"
                         :props="{multiple:true}"
                         :clearable="true"
                         collapse-tags></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="language('GONGYINGSHANGMINGCHEN_SAPHAO','供应商名称/SAP号')">
            <!-- <iInput v-model="form.supplierName"
                    :placeholder="language('QINGSHURU','请输入')" /> -->
            <iSelect filterable
                     :placeholder="language('QINGXUANZEXIAYOUGONGYINGSHANG','请选择下游供应商')"
                     v-model="supplierName"
                     value-key="id">
              <el-option v-for="(item) in formGroup.supplierNameList"
                         :key="item.id"
                         :value="item"
                         :label="item.supplierNameCn">
              </el-option>
            </iSelect>

          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="language('LINGJIANLEIXING','零件类型')">
            <el-cascader filterable
                         :props="{multiple: true}"
                         :placeholder="language('QINGSHURU_XUANZE','请输入/选择')"
                         v-model="form.partTypeList"
                         :options="partList"
                         clearable
                         collapse-tags></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="language('LINGJIANHAO/MINGCHEN','零件号/名称')">
            <el-cascader filterable
                         :props="{multiple: true}"
                         :placeholder="language('QINGSHURU_XUANZE','请输入/选择')"
                         v-model="form.partNums"
                         :options="formGroup.partNumberList"
                         clearable
                         collapse-tags></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <br>
            <iButton @click="handleInitTable">{{language('CHAXUN','查询')}}</iButton>
            <iButton @click="reset">{{language('CHONGZHI','重置')}}</iButton>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-divider></el-divider>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{language('XIANGQINGLIEBIAO','详情列表')}}</span>
      <div class="floatright">
        <i-button @click="handleBack">{{language('FANHUI','返回')}}</i-button>
        <i-button @click="handleCopy">{{language('QUERENFUZHI','确认复制')}}</i-button>
      </div>
    </div>
    <el-table tooltip-effect='light'
              v-loading="tableLoading"
              @selection-change="handleSelectionChange"
              height="400px"
              class="margin-top20"
              :data="tableListData"
              stripe
              style="width: 100%">
      <el-table-column type='selection'
                       width="50"
                       align='center'>
      </el-table-column>
      <el-table-column type='index'
                       width='50'
                       align='center'
                       label='#'>
      </el-table-column>
      <el-table-column width="100"
                       :show-overflow-tooltip="true"
                       align='center'
                       prop="sapCode"
                       :label="language('GONGYINGSHANGBIANHAO','供应商编号')"></el-table-column>
      <el-table-column :show-overflow-tooltip="true"
                       align='center'
                       prop="supplierName"
                       :label="language('GONGYINGSHANGMINGCHEN','供应商名称')"></el-table-column>
      <el-table-column :show-overflow-tooltip="true"
                       align='center'
                       prop="partType"
                       :label="language('LINGJIANLEIXING','零件类型')">
        <template slot-scope="scope">
          <el-popover :disabled="scope.row.partType.length<2"
                      width="427px"
                      trigger="hover"
                      placement="top">
            <div v-for="(item,i) in scope.row.partType"
                 :key="i">
              <div>{{item.parentType}}-{{item.partType}}</div>
            </div>
            <div v-if="scope.row.partType.length"
                 slot="reference">{{scope.row.partType.length&&scope.row.partType[0].parentType}}-{{scope.row.partType.length&&scope.row.partType[0].partType}}</div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true"
                       align='center'
                       prop="part"
                       :label="language('LINGJIANHAO_MINGCHEN','零件号-名称')">
        <template slot-scope="scope">
          <el-popover :disabled="scope.row.part.length<2"
                      width="427px"
                      trigger="hover"
                      placement="top">
            <div v-for="(item,i) in scope.row.part"
                 :key="i">
              <div>{{item.partNum}}-{{item.partName}}</div>
            </div>
            <div v-if="scope.row.part.length"
                 slot="reference">{{scope.row.part.length&&scope.row.part[0].partNum}}-{{scope.row.part.length&&scope.row.part[0].partName}}</div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true"
                       align='center'
                       prop="address"
                       :label="language('QUYU','区域')">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.address.country}}</span>
            <span v-if="scope.row.address.province">-{{scope.row.address.province}}</span>
            <span v-if="scope.row.address.city">-{{scope.row.address.city}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true"
                       align='center'
                       prop="address"
                       :label="language('XIANGXIDIZHI','详细地址')">
        <template slot-scope="scope">
          <div>
            {{scope.row.address.address}}
          </div>
        </template>
      </el-table-column>
    </el-table>
    <iPagination v-update
                 @size-change="handleSizeChange($event, queryUpDown)"
                 @current-change="handleCurrentChange($event, queryUpDown)"
                 background
                 :page-sizes="page.pageSizes"
                 :page-size="page.pageSize"
                 :layout="page.layout"
                 :current-page="page.currPage"
                 :total="page.totalCount" />
    <span slot="footer"
          class="dialog-footer">
    </span>
  </iDialog>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { iDialog, iButton, iInput, icon, iPagination, iMessage, iSelect } from 'rise'
import { dictByCode } from './data.js'
import tableList from '@/components/commonTable'
import { tableTitle } from './data'
import { generalPageMixins } from "@/views/generalPage/commonFunMixins";
import { pageMixins } from "@/utils/pageMixins";
import { queryUpDown, queryPartNumber, copyNode, queryByParamsDropDownWithAuth } from "@/api/supplierManagement/supplyMaintain/index.js";
import resultMessageMixin from "@/mixins/resultMessageMixin.js";

export default {
  // import引入的组件需要注入到对象中才能使用
  components: { iDialog, iButton, iInput, icon, tableList, iPagination, iSelect },
  mixins: [generalPageMixins, pageMixins, resultMessageMixin],
  props: {
    value: { type: Boolean },
    node: { type: Object },
    areaList: { type: Array },
    partList: { type: Array },
    copyOption: { type: String, default: '' },
  },
  data () {
    // 这里存放数据
    return {
      tableListData: [],
      tableTitle,
      tableLoading: false,
      supplierNameList: [],
      selectTableData: [],
      supplierName: {},
      form: {
        partTypeList: [],
        areaArray: [],
        partNums: [],
      },
      formGroup: {
        partNumberList: [],
        supplierNameList: []
      }
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    value: {
      handler (val) {
        if (val) {
          this.dictByCode()
          this.queryPartNumber()
          // this.handleInitTable()
        }
      }
    },
    'form.areaArray': {
      handler (val) {

        this.queryByParamsDropDownWithAuth(val)
      },
      deep: true,
      immediate: true
    }
  },
  // 方法集合
  methods: {
    handleInitTable () {
      if (JSON.stringify(this.supplierName) === '{}') {
        iMessage.error(this.language('QINGXUANZEXIAYOUGONGYINGSHANG', '请选择下游供应商'))
        return
      }
      this.page.currPage = 1
      this.page.pageSize = 10
      this.queryUpDown()
    },
    handleSelectionChange (val) {
      this.selectTableData = val
    },
    async handleCopy () {
      if (this.selectTableData.length === 0) {
        iMessage.warn(this.language('QINGXUANZHEYITIAOSHUJU', '请选择一条数据'))
      } else if (this.selectTableData.length > 1) {
        iMessage.warn(this.language('ZHINENGXUANZHEYITIAOSHUJU', '只能选择一条数据'))
      } else {
        const pms = {
          copyType: this.copyOption,
          leftChainId: this.selectTableData[0].chainId,
          rightChainId: this.node.id,
        }
        const res = await copyNode(pms)
        this.resultMessage(res, async () => {
          this.$emit('copyData', this.supplierName)
          this.clearDiolog()
          await this.$parent.$parent.$parent.$children[0].getTableList()
          // pathname:nodeChain.vue
          this.$parent.$parent.$children[0].$children[0].handleScroll(res.data)
        })

      }
    },
    async queryByParamsDropDownWithAuth (val) {
      const res = await queryByParamsDropDownWithAuth({ areaArray: val })
      this.formGroup.supplierNameList = res.data
    },
    handleBack () {
      this.clearDiolog()
      this.$parent.$parent.showCopyDialog = true
    },
    async queryPartNumber () {
      const res = await queryPartNumber({})
      res.data.map(item => {
        item.label = item.partNum + '/' + item.partName
        return item.value = item.partNum
      })
      this.formGroup.partNumberList = res.data
    },
    async queryUpDown () {
      const pms = {
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        ...this.form,
        chainId: this.node.id,
        supplyId: this.node.supplyId,
        isUp: false,
        partTypes: [],
        partNums: this.form.partNums.flat(Infinity),
        supplierId: this.supplierName.id,
        sapCode: this.supplierName.sapCode,
      }
      pms.partTypeList.forEach(item => {
        pms.partTypes.push(item[1])
      })
      this.tableLoading = true
      const res = await queryUpDown(pms)
      this.tableListData = res.data.list
      this.page.totalCount = res.data.total
      this.page.pageSize = res.data.size
      this.page.currPage = res.data.current
      this.tableLoading = false
    },

    reset () {
      this.form = {
        partTypeList: [],
        areaArray: [],
        partNums: []
      }
      this.supplierName = {}
      this.tableListData = []
      this.page.totalCount = 0
      this.page.pageSize = 10
      this.page.currPage = 1
      // this.handleInitTable()
    },
    clearDiolog () {
      this.reset()
      this.$emit("input", false);
    },
    async dictByCode () {
      const res = await dictByCode('NTIER_CHAIN_PART_TYPE')
      res.map(item => {
        item.label = item.name
        item.value = item.code
        item.subDictResultVo && item.subDictResultVo.map(val => {
          val.label = val.name
          return val.value = val.code
        })
        return item.children = item.subDictResultVo
      })
      this.formGroup.partList = res
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
.el-col-5,
.el-col-12 {
  display: flex;
  justify-content: flex-end;
}
.el-col-4:nth-child(6) {
  .el-form-item {
    display: flex;
    justify-content: flex-end;
  }
}
::v-deep .el-cascader {
  width: 100%;
}
::v-deep .custom-select-input > input {
  height: 2.1875rem;
  box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
  border-color: transparent;
}
::v-deep .el-input__inner {
  height: 2.1875rem;
  box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
  border-color: transparent;
}
::v-deep .el-cascader__tags {
  justify-content: space-between;
  flex-wrap: nowrap;
  span {
    width: 50%;
  }
}
</style>
