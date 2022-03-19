<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-23 20:52:36
 * @LastEditors: Please set LastEditors
 * @Descripttion: your project
-->
<template>
  <div class="content">
    <theSearch :eventDetail="eventDetail"
               class="search"
               ref="search" />
    <chartMap :eventDetail="eventDetail"
              :tableListData="tableListData"
              ref="chartMap" />
    <emergency :eventDetail="eventDetail"
               ref="emergency"
               @handleLine="handleLine"
               :tableListData="tableListData"
               class="card-right" />
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import chartMap from "./components/map";
import { iMessage } from 'rise'
import theSearch from "./components/theSearch";
import emergency from "./components/emergency";
import { supplierListByEvent, queryEventDetail } from "@/api/supplierManagement/supplyChainRisk/index.js";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { chartMap, theSearch, emergency, iMessage },
  data () {
    // 这里存放数据
    return {
      tableLoading: false,
      tableListData: [],
      eventDetail: {}
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async getTableList (form) {
      try {
        const pms = {
          ...form,
          eventId: this.$route.query.id
        }
        const res = await supplierListByEvent(pms)
        if (res?.code === '200') {
          let datacopy = _.cloneDeep(res.data)
          datacopy.map((item, index) => {
            item.partNumList && item.partNumList.map((val, i) => {
              return val.number = index + 1 + (i + 1) / 10
            })
            return item.number = index + 1
          })
          this.tableListData = datacopy
        } else {
          iMessage.error(res.desZh)
        }
      } catch (error) {
        this.tableLoading = false
        this.tableListData = []
      }
    },
    // 通过id查询事件详情
    async queryEventDetail () {
      const res = await queryEventDetail(this.$route.query.id)
      this.eventDetail = res.data
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.getTableList()
    this.queryEventDetail()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
  },
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
.content {
  position: relative;
}
.search {
  position: absolute;
  z-index: 2;
  width: 60%;
  padding: 20px;
}
.card-right {
  width: 40%;
  position: absolute;
  z-index: 2;
  right: 0;
  top: 0;
  padding: 20px 20px 0 0;
}
</style>
