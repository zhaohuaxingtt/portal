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
          @change="queryByParamsWithAuth" :filter-method="filterZR"
          v-model="form.areaArray"
          :placeholder="language('QINGXUANZHE', '请选择')"
          :options="formGroup.areaList"
          :props="{ multiple: true }"
          :clearable="true"
          collapse-tags
          filterable
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
            :label="$getLabel(item.supplierNameCn,item.supplierNameEn)"
          >
          </el-option>
        </iSelect>
      </el-form-item>
      <el-form-item :label="language('ZONGCHENLINGJIAN', '总成零件')">
        <iSelect
          style="width:250px"
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
import { getCity,getCityInfo } from '@/api/supplierManagement/supplyChainOverall/index.js'
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
        source.forEach(res=>{
          if(!res.partName){
            res.partName = "";
          }
        })
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
    getCityInfo () {
      var that = this;

      var zhRule = /^[\u4e00-\u9fa5]+$/i;//中文
      var enRule = /^[a-zA-Z]+$/;//英文
      return new Promise((resolve, reject) => {
        console.log(that.$i18n.locale);
        getCityInfo().then(res=>{
          if(res?.result){
            let areaList = []
            // 筛选国家
            res.data.map((item) => {
              if (item.locationType === 'Nation') {
                if(that.$i18n.locale === "zh"){
                  if(zhRule.test(item.cityNameCn)){
                    areaList.push({
                      value: item.cityNameCn,
                      label: item.cityNameCn,
                      cityId: item.cityId,
                      children: []
                    })
                  }
                }else{
                  if(enRule.test(item.cityNameEn)){
                    areaList.push({
                      value: item.cityNameCn,
                      label: item.cityNameEn,
                      cityId: item.cityId,
                      children: []
                    })
                  }
                }
              }
            })
            // 筛选省
            res.data.forEach((item) => {
              areaList.forEach((val, index) => {
                if (
                  item.locationType === 'Province' &&
                  item.parentCityId === val.cityId
                ) {
                  if(that.$i18n.locale === "zh"){
                    if(zhRule.test(item.cityNameCn)){
                      areaList[index].children.push({
                        value: item.cityNameCn,
                        label: item.cityNameCn,
                        cityId: item.cityId,
                        parentCityId: item.parentCityId,
                        children: []
                      })
                    }
                  }else{
                    if(enRule.test(item.cityNameEn)){
                      areaList[index].children.push({
                        value: item.cityNameCn,
                        label: item.cityNameEn,
                        cityId: item.cityId,
                        parentCityId: item.parentCityId,
                        children: []
                      })
                    }
                  }
                }
              })
            })
            // 筛选市
            res.data.forEach((item) => {
              areaList.forEach((val, j) => {
                val.children.forEach((i, index) => {
                  if (item.locationType === 'City' && item.parentCityId === i.cityId) {
                    if(that.$i18n.locale === "zh"){
                      if(zhRule.test(item.cityNameCn)){
                        areaList[j].children[index].children.push({
                          value: item.cityNameCn,
                          label: item.cityNameCn,
                          cityId: item.cityId,
                          parentCityId: item.parentCityId
                        })
                      }
                    }else{
                      if(enRule.test(item.cityNameEn)){
                        areaList[j].children[index].children.push({
                          value: item.cityNameCn,
                          label: item.cityNameEn,
                          cityId: item.cityId,
                          parentCityId: item.parentCityId
                        })
                      }
                    }
                  }
                })
              })
            })
            // 删除空数组
            console.log(areaList)
            areaList.map((item) => {
              if (item.children.length) {
                item.children.map((val) => {
                  if (item.children.length === 0) {
                    delete val.children
                  }
                })
              } else {
                delete item.children
              }
            })
            areaList.map((item) => {
              return item.children && item.children
            })
            console.log(areaList)
            resolve(areaList)
          }
        }).catch(res=>{
          reject();
        })
      })
    },
    async getData(){
      // const res = await this.getCityInfo()
      this.getCityInfo().then(res=>{
        this.formGroup.areaList = _.cloneDeep(res);
        console.log(this.form)
      })
      // console.log(res);
      // this.formGroup.areaList = res
      // console.log(this.form)
    },
    filterZR(vnode,val){
      if(vnode.text.toLowerCase().indexOf(val.toLowerCase()) > -1){
        return vnode.text;
      }
    },
    // async getSelect() {
    //   const res = await getCity()
    //   this.formGroup.areaList = res
    // },
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
        console.log('this.partsOptionsMap',1, this.partsOptionsMap)
      } else {
        const source = this.partsOptionsMap[supplierId] || []
        this.form.partNum = source[0]?.partNum
        this.getTableList()
        console.log('this.partsOptionsMap',2, this.partsOptionsMap)
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
    this.getData()
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
