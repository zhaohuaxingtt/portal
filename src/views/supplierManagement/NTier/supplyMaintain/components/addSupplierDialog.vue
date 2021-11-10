<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-10-08 19:29:09
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <iDialog :title="language('TIANJIASHANGYOUGONGYINGSHANG','添加上游供应商')" width="90%" :visible.sync="value" show-close @close="clearDiolog">
    <!-- 零件类型 -->
    <iFormGroup :rules="rules" ref="ruleForm" :model='partForm' row="4">
      <iFormItem prop="partType">
        <iLabel slot="label" :required="true" :label="language('LINGJIANLEIXING','零件类型')"></iLabel>
        <el-cascader separator="-" v-model="partForm.partType" :options="formGroup.partList"></el-cascader>
      </iFormItem>
      <iFormItem>
      </iFormItem>
      <iFormItem>
      </iFormItem>
      <iFormItem>
        <iButton @click="handleDelete">{{language('SHANGCHU','删除')}}</iButton>
        <iButton @click="handleAdd">{{language('XINZENG','新增')}}</iButton>
      </iFormItem>
    </iFormGroup>
    <table-list class="margin-top20" ref="commonTable" :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange" :index="true">
      <template #partName="scope">
        <div v-if="scope.row.isEdit">
          <iInput :placeholder="language('QINGSHURU','请输入')" v-model="scope.row.partName"></iInput>
        </div>
        <span v-else>{{scope.row.partName}}</span>
      </template>
      <template #partNum="scope">
        <div v-if="scope.row.isEdit">
          <iInput :placeholder="language('QINGSHURU','请输入')" v-model="scope.row.partNum"></iInput>
        </div>
        <span v-else>{{scope.row.partNum}}</span>
      </template>
    </table-list>
    <el-divider></el-divider>
    <el-row type="flex" :gutter="40">
      <el-col :span="4">
        <el-cascader v-model="form.areaArray" :placeholder="language('GUOJIA_SHENGFEN_DIQU','国家-省份-地区')" :options="areaList" :props="{multiple:true}" :clearable="true" collapse-tags></el-cascader>
      </el-col>
      <el-col :span="4">
        <iInput v-model="form.supplierName" :placeholder="language('GONGYINGSHANGMINGCHEN_SAPHAO','供应商名称/SAP号')"></iInput>
      </el-col>
      <el-col :span="4">
        <el-cascader :props="{multiple: true}" :placeholder="language('LINGJIANLEIXING','零件类型')" v-model="form.partTypeList" :options="formGroup.partList" clearable collapse-tags></el-cascader>
      </el-col>
      <el-col :span="12">
        <iButton @click="handleInitTable">{{language('CHAXUN','查询')}}</iButton>
        <iButton @click="reset">{{language('CHONGZHI','重置')}}</iButton>
      </el-col>
    </el-row>
    <el-table ref="multipleTable" v-loading="loading" tooltip-effect='light' @selection-change="handleSelectionChangeSupplier" height="400px" class="margin-top20" :data="tableData" stripe style="width: 100%">
      <el-table-column type='selection' width="50" align='center'>
      </el-table-column>
      <el-table-column type='index' width='50' align='center' label='#'>
      </el-table-column>
      <el-table-column width="100" :show-overflow-tooltip="true" align='center' prop="sapCode" :label="language('GONGYINGSHANGBIANHAO','供应商编号')"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" align='center' prop="supplierName" :label="language('GONGYINGSHANGMINGCHEN','供应商名称')"></el-table-column>
      <el-table-column align='center' prop="partType" :label="language('LINGJIANLEIXING','零件类型')">
        <template slot-scope="scope">
          <el-popover :disabled="scope.row.partType.length<2" width="427px" trigger="hover" placement="top">
            <div v-for="(item,i) in scope.row.partType" :key="i">
              <div>{{item.parentType}}-{{item.partType}}</div>
            </div>
            <div v-if="scope.row.partType.length" slot="reference">{{scope.row.partType.length&&scope.row.partType[0].parentType}}-{{scope.row.partType.length&&scope.row.partType[0].partType}}</div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" align='center' prop="factoryName" :label="language('GONGCHANGMINGCHENG','工厂名称')"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" align='center' prop="address" :label="language('QUYU','区域')">
        <template slot-scope="scope">
          <div v-if="scope.row.factoryAddress.country||scope.row.factoryAddress.province||scope.row.factoryAddress.city">
            <span>{{scope.row.factoryAddress.country}}</span>
            <span v-if="scope.row.factoryAddress.province">-{{scope.row.factoryAddress.province}}</span>
            <span v-if="scope.row.factoryAddress.city">-{{scope.row.factoryAddress.city}}</span>
          </div>
          <div v-else>
            <span>{{scope.row.address.country}}</span>
            <span v-if="scope.row.address.province">-{{scope.row.address.province}}</span>
            <span v-if="scope.row.address.city">-{{scope.row.address.city}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" align='center' prop="address" :label="language('XIANGXIDIZHI','详细地址')">
        <template slot-scope="scope">
          <div>
            {{scope.row.address.address}}
          </div>
        </template>
      </el-table-column>
    </el-table>
    <iPagination class="margin-bottom20" v-update @size-change="handleSizeChange($event, queryUpDown)" @current-change="handleCurrentChange($event, queryUpDown)" background :page-sizes="page.pageSizes" :page-size="page.pageSize" :layout="page.layout" :current-page="page.currPage" :total="page.totalCount" />
    <span slot="footer" class="dialog-footer">
      <iButton @click="creatSupplier">{{language('CHUANGJIANXINGONGYINGSHANG','创建新供应商')}}</iButton>
      <iButton @click="addNodeToDag()">{{language('QUERENTIANJIA','确认添加')}}</iButton>
    </span>
  </iDialog>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { iDialog, iButton, iInput, iLabel, iFormGroup, iFormItem, icon, iSelect, iMessage, iPagination } from 'rise'
import { dictByCode, partTableTitle } from './data.js'
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'
import { queryUpDown, add } from "@/api/supplierManagement/supplyMaintain/index.js";
import resultMessageMixin from "@/mixins/resultMessageMixin.js";
import tableList from '@/components/commonTable'
import { pageMixins } from "@/utils/pageMixins";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { iDialog, iButton, iInput, iLabel, iFormGroup, iFormItem, icon, iSelect, tableList, iPagination },
  mixins: [generalPageMixins, resultMessageMixin, pageMixins],
  props: {
    value: { type: Boolean },
    node: { type: Object, default: {} },
    areaList: { type: Array, default: [] }
  },
  data() {
    // 这里存放数据
    return {
      rules: {
        partType: [
          { required: true, message: '请选择零件类型', trigger: ['change', 'blur'] },
        ],
      },
      form: {
        supplierName: '',
        partTypeList: [],
        areaArray: [],
      },
      partForm: {
        partType: [],
      },
      formGroup: {
        partList: [],
      },
      tableListData: [],
      tableLoading: false,
      tableTitle: partTableTitle,
      selectTableData: [],
      // 
      tableData: [],
      selectTable: [],
      loading: false,
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    value: {
      handler(val) {
        if (val) {
          this.handleInitTable()
          this.dictByCode()
        }
      }
    },
  },
  // 方法集合
  methods: {
    toggleRowSelection(supplierId = '1453559849223733248') {
      this.$nextTick(async () => {
        await this.handleInitTable()
        this.tableData.some((item) => {
          if (item.supplierId === supplierId) {
            this.$refs.multipleTable.toggleRowSelection(item, true);
            return true
          }
        })
      })
    },
    async handleInitTable() {
      this.page.currPage = 1
      this.page.pageSize = 10
      await this.queryUpDown()
    },
    handleSelectionChangeSupplier(val) {
      this.selectTable = val
    },
    addNodeToDag() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          if (this.selectTable.length === 0) {
            iMessage.warn(this.language('QINGXUANZHEYITIAOSHUJU', '请选择一条数据'))
          } else if (this.selectTable.length > 1) {
            iMessage.warn(this.language('ZHINENGXUANZHEYITIAOSHUJU', '只能选择一条数据'))
          } else {
            const pms = {
              parentId: this.node.id,
              partList: this.tableListData,
              partType: this.partForm.partType[1],
              sapCode: this.selectTable[0].sapCode,
              supplierId: this.selectTable[0].supplierId,
              factoryId: this.selectTable[0].factoryId,
            }
            const res = await add(pms)
            this.resultMessage(res, () => {
              this.clearDiolog()
              this.$parent.$parent.$parent.$children[0].getTableList()
            })
          }
        }
      })
    },
    reset() {
      this.form = {
        supplierName: '',
        partTypeList: [],
        areaArray: [],
      }
      this.handleInitTable()
    },
    async queryUpDown() {
      const pms = {
        ...this.form,
        chainId: this.node.id,
        supplyId: this.node.supplyId,
        isUp: true,
        partTypes: [],
        sapCode: this.form.supplierName,
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
      }
      pms.partTypeList.forEach(item => {
        pms.partTypes.push(item[1])
      })
      this.loading = true
      const res = await queryUpDown(pms)
      this.tableData = res.data.list
      this.page.totalCount = res.data.total
      this.page.pageSize = res.data.size
      this.page.currPage = res.data.current
      this.loading = false
    },
    handleSelectionChange(val) {
      this.selectTableData = val
    },
    // 新增
    handleAdd() {
        if(this.partForm.partType==''){
             iMessage.warn(this.language('QINGXUANZELINGJIANLEIXING', '请选择零件类型'))
             return false
        }
      this.tableListData.push({ partName: '', partNum: "", isEdit: true, time: new Date().getTime() })
    },
    // 删除
    async handleDelete() {
      if (this.selectTableData.length === 0) {
        iMessage.warn(this.language('QINGXUANZHEYITIAOSHUJU', '请选择一条数据'))
      } else {
        let ids = [], times = []
        this.selectTableData.map(item => {
          if (item.id) {
            ids.push(item.id)
          }
          if (item.time) {
            times.push(item.time)
          }
        })
        if (times.length !== 0) {
          this.tableListData = this.tableListData.filter(item => {
            return !times.includes(item.time)
          })
        }
        if (ids.length !== 0) {
          const req = {
            [idName]: ids,
          }
          const res = await fun(req)
          this.resultMessage(res, () => {
            this.tableListData = this.tableListData.filter(item => {
              return !ids.includes(item.id)
            })
          })
        }
      }
    },
    creatSupplier() {
      this.clearDiolog()
      this.$emit('creatSupplier')
    },
    clearDiolog() {
      this.form = {
        supplierName: '',
        partTypeList: [],
        areaArray: [],
      }
      this.partForm = {
        partType: [],
      }
      this.tableListData = []
      this.$emit("input", false);
    },
    async dictByCode() {
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
  created() {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

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
.title {
  font-weight: bold;
  font-size: 1rem;
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
::v-deep .row4 .el-form-item__label {
  width: 7.5rem;
}
</style>
