<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-02 09:56:38
 * @LastEditors: YoHo && 917955345@qq.com
 * @Descripttion: your project
-->
<template>
  <div id="allContainer"
       class="content">
    <div id="allContainer">
      <theSearch ref="theSearch"
              @getMapList="getMapList"
              class="search"
              :category-code="categoryCode"
              @handleSave="handleSave" />
      <theCard :area="area"
            :object="object"
            :tableLoading="tableLoading"
            class="card-right" />
      <chartMap ref="chartMap"
              :object="object" />
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import chartMap from "./components/map.vue";
import theSearch from "./components/theSearch.vue";
import theCard from "./components/theCard.vue";
import { getNTierMap, nTierSave } from "@/api/supplierManagement/supplyChainOverall/index.js";
import { iButton } from "rise";
import { downloadPdfMixins } from '@/utils/pdf';
import resultMessageMixin from '@/mixins/resultMessageMixin';

export default {
  // import引入的组件需要注入到对象中才能使用
  components: { chartMap, theSearch, theCard, iButton },
  mixins: [downloadPdfMixins, resultMessageMixin],
  data () {
    // 这里存放数据
    return {
      saveButtonLoading: false,
      object: {},
      tableLoading:false,
      area: '',
      categoryCode: ""
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async getMapList (par) {
      this.tableLoading = true
      console.time('this.object====>')
      const pms = {
        ...par
      }
      this.area = pms.area
      const res = await getNTierMap(pms)
      this.object = res.data
      this.tableLoading = false
      console.timeEnd('this.object====>')
      console.log('this.object====>',this.object);
    },
    async handleSave (params, id) {
      this.$refs.theSearch.saveButtonLoading = true;
      const resFile = await this.getDownloadFileAndExportPdf({
        domId: 'allContainer',
        watermark: this.$store.state.permission.userInfo.deptDTO.nameEn + '-' + this.$store.state.permission.userInfo.userNum + '-' + this.$store.state.permission.userInfo.nameZh + "^" + window.moment().format('YYYY-MM-DD HH:mm:ss'),
        pdfName: this.language('PINLEIGUANLIZHUSHOU', '品类管理助手') + '-' + this.language('NJIGONGYINGLIANGUANLI', 'N级供应链管理') + '-' + window.sessionStorage.getItem('categoryName') + '-' + window.moment().format('YYYY-MM-DD') + '|',
      });
      const req = {
        id: id,
        queryCondition: {
          ...params,
        },
        reportFileName: resFile.downloadName,
        categoryCode: this.$store.state.rfq.categoryCode,
        reportUrl: resFile.downloadUrl,
      };
      const res = await nTierSave(req)
      this.resultMessage(res, () => {
        this.$refs.theSearch.saveButtonLoading = false;
      });
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.categoryCode = this.$route.query.categoryCode
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
  padding: 10px;
}
.card-right {
  width: 40%;
  position: absolute;
  z-index: 2;
  right: 0;
  top: 0;
  padding: 10px 20px 0 0;
}
</style>
