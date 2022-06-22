<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-10-08 09:57:42
 * @LastEditors: Please set LastEditors
 * @Descripttion: your project
-->
<template>
  <iSearch
    @sure="getTableList"
    @reset="handleSearchReset"
    :resetKey="PARTSPROCURE_RESET"
    :searchKey="PARTSPROCURE_CONFIRM"
    class="margin-bottom20 box"
    style="margin-top: 20px"
  >
    <el-form inline>
      <el-form-item :label="language('DIQU', '地区')">
        <el-cascader
          @change="queryByParamsWithAuth"
          v-model="form.areaArray"
          :placeholder="language('QINGXUANZHE', '请选择')"
          :options="formGroup.areaList"
          :props="{ multiple: true }"
          :clearable="true"
          collapse-tags
        ></el-cascader>
      </el-form-item>
      <el-form-item :label="language('GONGYINGSHANGMINGCHEN', '供应商名称')">
        <iSelect
          filterable
          :placeholder="language('请选择')"
          v-model="form.supplierId"
          @change="handleSupplierChange"
        >
          <el-option
            v-for="(item, index) in formGroup.supplierNameList"
            :key="index"
            :value="item.id"
            :label="item.supplierNameCn"
          >
          </el-option>
        </iSelect>
      </el-form-item>
      <el-form-item :label="language('ZONGCHENLINGJIAN', '总成零件')">
        <iSelect
          v-el-select-loadmore="loadmore"
          :placeholder="language('请选择')"
          :remote-method="remoteMethod"
          filterable
          remote
          reserve-keyword
          v-model="form.partNum"
          :loading="loading"
          @change="hanldeChange"
        >
          <el-option
            v-for="(item, index) in partsOptions"
            :key="index"
            :value="item.partNum"
            :label="item.partName + '/' + item.partNum"
          >
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
      loading: false,
      pageForm: {
        supplierId: '',
        pageNo: 1
      },
      partsOptionsMap: {},
      partsQuery: ''
    }
  },
  // 监听属性 类似于data概念
  computed: {
    partsOptions() {
      const supplierId = this.form.supplierId
      console.log('supplierId', supplierId)
      if (supplierId) {
        const pageNo = this.pageForm.pageNo
        let source = this.partsOptionsMap[supplierId] || []
        if (this.partsQuery) {
          source = source.filter((e) => {
            const partNum = e.partNum || ''
            // const partName = e.partName || ''
            return partNum.toLowerCase().includes(this.partsQuery.toLowerCase())
          })
        }
        return source.slice(0, pageNo * 10)
      }
      return []
    }
  },
  // 监控data中的数据变化
  watch: {},
  directives: {
    'el-select-loadmore': {
      bind(el, binding) {
        // 获取element-ui定义好的scroll盒子
        const SELECTWRAP_DOM = el.querySelector(
          '.el-select-dropdown .el-select-dropdown__wrap'
        )
        SELECTWRAP_DOM.addEventListener('scroll', function () {
          /**
           * scrollHeight 获取元素内容高度(只读)
           * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
           * clientHeight 读取元素的可见高度(只读)
           * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
           * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
           */
          const condition =
            this.scrollHeight - this.scrollTop <= this.clientHeight
          if (condition) {
            binding.value()
          }
        })
      }
    }
  },
  // 方法集合
  methods: {
    async getSelect() {
      const res = await getCity()
      this.formGroup.areaList = res
    },
    async queryByParamsDropDownWithAuth(val) {
      const res = await queryByParamsDropDownWithAuth({ areaArray: val })
      this.formGroup.supplierNameList = res.data
      this.form.supplierId = res.data[0]?.id
      this.pageForm.supplierId = res.data[0]?.id
    },
    async queryPart() {
      const supplierId = this.form.supplierId
      if (!this.partsOptionsMap[supplierId]) {
        this.loading = true
        const res = await queryPart(this.pageForm).finally(
          () => (this.loading = false)
        )
        if (res?.code == '200') {
          const data = res?.data || []
          this.form.partNum = data[0]?.partNum
          Vue.set(this.partsOptionsMap, supplierId, data)
          this.getTableList()
        }
        console.log('this.partsOptionsMap', this.partsOptionsMap)
      } else {
        const source = this.partsOptionsMap[supplierId] || []
        this.form.partNum = source[0]?.partNum
        this.getTableList()
      }
    },
    async getTableList() {
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
    handleSearchReset() {
      this.form = {
        areaArray: [],
        supplierId: '',
        partNum: ''
      }
      this.getTableList()
    },
    closeDiolog() {
      this.isDilog = false
      this.formModel = {}
    },
    handleSupplierChange(val) {
      this.pageForm.supplierId = val
      this.queryPart()
    },
    hanldeChange(val) {
      this.partsQuery = ''
      this.getTableList()
    },
    loadmore() {
      this.pageForm.pageNo++
    },
    remoteMethod(query) {
      this.partsQuery = query
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  async created() {
    await this.queryByParamsDropDownWithAuth([])
    await this.queryPart(this.pageForm)
    this.getTableList()
    this.getSelect()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
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
