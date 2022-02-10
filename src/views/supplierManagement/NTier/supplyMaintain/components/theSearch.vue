<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-10-08 09:57:42
 * @LastEditors: Please set LastEditors
 * @Descripttion: your project
-->
<template>
  <iSearch @sure="getTableList"
           @reset="handleSearchReset"
           :resetKey="PARTSPROCURE_RESET"
           :searchKey="PARTSPROCURE_CONFIRM"
           class="margin-bottom20 box"
           style="margin-top: 20px"
           v-loading="loading">
    <el-form inline>
      <el-form-item :label="language('DIQU', '地区')">
        <el-cascader @change="queryByParamsWithAuth"
                     v-model="form.areaArray"
                     :placeholder="language('QINGXUANZHE', '请选择')"
                     :options="formGroup.areaList"
                     :props="{ multiple: true }"
                     :clearable="true"
                     collapse-tags></el-cascader>
      </el-form-item>
      <el-form-item :label="language('GONGYINGSHANGMINGCHEN', '供应商名称')">
        <iSelect filterable
                 :placeholder="language('请选择')"
                 v-model="form.supplierId">
          <el-option v-for="(item, index) in formGroup.supplierNameList"
                     :key="index"
                     :value="item.id"
                     :label="item.supplierNameCn">
          </el-option>
        </iSelect>
      </el-form-item>
      <el-form-item :label="language('ZONGCHENLINGJIAN', '总成零件')">
        <iSelect filterable
                 :placeholder="language('请选择')"
                 v-model="form.partNum"
                 @change="hanldeChange">
          <el-option v-for="(item, index) in formGroup.partNumList"
                     :key="index"
                     :value="item.partNum"
                     :label="item.partName + '/' + item.partNum">
          </el-option>
        </iSelect>
      </el-form-item>
    </el-form>
  </iSearch>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { iSelect, iSearch, iMessage } from 'rise'
import { getCity } from '@/api/supplierManagement/supplyChainOverall/index.js'
import {
  queryByParamsDropDownWithAuth,
  queryPart
} from '@/api/supplierManagement/supplyMaintain/index.js'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    iSelect,
    iSearch
  },
  data () {
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
      loading: false
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async getSelect () {
      const res = await getCity()
      this.formGroup.areaList = res
    },
    async queryByParamsDropDownWithAuth (val) {
      const res = await queryByParamsDropDownWithAuth({ areaArray: val })
      this.formGroup.supplierNameList = res.data
    },
    async queryPart () {
      const res = await queryPart({})
      if (res?.code === "200") {
        this.loading = false
        this.formGroup.partNumList = res.data
        if (localStorage.getItem('partNum')) {
          this.form.partNum = localStorage.getItem('partNum')
        } else {
          this.form.partNum = this.formGroup.partNumList[0].partNum
        }
      }
    },
    async getTableList () {
      if (!this.form.supplierId && !this.form.partNum) {
        iMessage.error(
          this.language(
            'QINGXUANZEGONGYINSHANGMINGCHENGHUOZHEZONGCHENGLINGJIAN',
            '请选择供应商名称或者总成零件'
          )
        )
        return
      }
      await this.$parent.$refs.view.getCardChain(this.form)
    },
    handleSearchReset () {
      this.form = {
        areaArray: [],
        supplierId: '',
        partNum: ''
      }
      this.getTableList()
    },
    closeDiolog () {
      this.isDilog = false
      this.formModel = {}
    },
    hanldeChange (val) {
      localStorage.setItem('partNum', val)
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  async created () {
    this.loading = true
    await this.queryPart()
    this.getTableList()
    this.getSelect()
    this.queryByParamsDropDownWithAuth([])
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () { }
}
</script>
<style lang="scss" scoped>
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
