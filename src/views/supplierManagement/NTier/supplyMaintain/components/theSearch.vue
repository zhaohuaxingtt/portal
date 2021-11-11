<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-10-08 09:57:42
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <iSearch class="margin-bottom20" style="margin-top: 20px" @sure="getTableList" @reset="handleSearchReset" :resetKey="PARTSPROCURE_RESET" :searchKey="PARTSPROCURE_CONFIRM">
    <el-form>
      <el-form-item :label="language('DIQU','地区')">
        <el-cascader @change="queryByParamsWithAuth" v-model="form.areaArray" :placeholder="language('QINGXUANZHE','请选择')" :options="formGroup.areaList" :props="{multiple:true}" :clearable="true" collapse-tags></el-cascader>
      </el-form-item>
      <el-form-item :label="language('GONGYINGSHANGMINGCHEN','供应商名称')">
        <iSelect filterable :placeholder="$t('APPROVAL.PLEASE_CHOOSE')" v-model="form.supplierId">
          <el-option v-for="(item, index) in formGroup.supplierNameList" :key="index" :value="item.id" :label="item.supplierNameCn">
          </el-option>
        </iSelect>
      </el-form-item>
      <el-form-item :label="language('ZONGCHENLINGJIAN','总成零件')">
        <iSelect filterable :placeholder="$t('APPROVAL.PLEASE_CHOOSE')" v-model="form.partNum">
          <el-option v-for="(item, index) in formGroup.partNumList" :key="index" :value="item.partNum" :label="item.partName+'/'+item.partNum">
          </el-option>
        </iSelect>
      </el-form-item>
    </el-form>
  </iSearch>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { iCard, iSelect, iSearch, iInput } from 'rise'
import { getCity } from "@/api/supplierManagement/supplyChainOverall/index.js";
import { queryByParamsWithAuth, queryPart } from "@/api/supplierManagement/supplyMaintain/index.js";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { iCard, iSelect, iSearch, iInput },
  data() {
    // 这里存放数据
    return {
      form: {
        areaArray: [],
        supplierId: '',
        partNum: ''
      },
      formGroup: {
        areaList: [],
        supplierNameList: [],
        partNumList: []
      },
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async getSelect() {
      const res = await getCity()
      this.formGroup.areaList = res
    },
    async queryByParamsWithAuth(val) {
      const res = await queryByParamsWithAuth({ areaArray: val })
      this.formGroup.supplierNameList = res.data
    },
    async queryPart() {
      const res = await queryPart({})
      this.formGroup.partNumList = res.data
    },
    async getTableList() {
      await this.$parent.$children[1].getCardChain(this.form)
    },
    handleSearchReset() {
      this.form = {
        areaArray: [],
        supplierId: '',
        partNum: ''
      }
      this.getTableList()
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getSelect()
    this.queryByParamsWithAuth([])
    this.queryPart()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
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
