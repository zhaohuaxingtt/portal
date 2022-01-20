<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-23 20:52:20
 * @LastEditors: caopeng
 * @Descripttion: your project
-->
<template>
  <div class="content">
    <!-- <div class="btn">
      <iButton>{{language('CHONGZHISUOYOU','重置所有')}}</iButton>
      <iButton>{{language('CHAKANXIANGQING','查看详情')}}</iButton>
    </div>
    <iTabsList v-model="tabVal"
               @tab-click="handleTabClick"
               type="card"
               slot="components"
               class='margin-top20 iTabsList'>
      <el-tab-pane :name="1"
                   :label="language('SANJIANGUOJIHUAFENXI','散件国际化分析')"> </el-tab-pane>
      <el-tab-pane :name="2"
                   :label="language('SANJIANGONGYINGJIZHONGDUFENXI','散件供应集中度分析')"> </el-tab-pane>
    </iTabsList> -->
    <iCard id="powerBi"></iCard>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { iTabsList, iButton } from 'rise'
import { getLoosePartsPbi } from '@/api/supplierManagement/supplyChainAnalysis'
import * as pbi from 'powerbi-client'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { iTabsList, iButton },
  data() {
    // 这里存放数据
    return {
      tabVal: 1,
      filter: {
        $schema: 'http://powerbi.com/product/schema#basic',
        target: {
          table: 'Fact_01_Supplier_SPI',
          column: 'supplier_id'
        },
        operator: 'In',
        values: [],
        filterType: null,
        requireSingleSelection: true
      },
      config: {},
      configApiData: {},
         powerbi: pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory),
      reportContainer:{}
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    getLoosePartsPbi().then((res) => {
      this.configApiData = { ...res.data }
      this.init()
    })
  },
  methods: {
    // 初始化配置
    init() {
      this.permissions = pbi.models.Permissions.All
      this.config = {
        type: 'report',
        tokenType: pbi.models.TokenType.Embed,
        embedUrl: this.configApiData.embedUrl,
        accessToken: this.configApiData.accessToken,
        workspaceid: '876776a9-f959-442e-a011-b4bade0dd862',
        reportid: '437fd85e-323d-48b6-aedd-de8d63ce6f37',
        pageName: 'ReportSection680575c9e561c8d8bd83',
        settings: {
          panes: {
            filters: {
              visible: false
            },
            pageNavigation: {
              visible: false
            }
          }
        }
      }
      this.reportContainer = document.getElementById('powerBi')
      this.powerbi = new pbi.service.Service(
        pbi.factories.hpmFactory,
        pbi.factories.wpmpFactory,
        pbi.factories.routerFactory
      )
      this.renderBi()
    },
       renderBi() {
      var report = this.powerbi.embed(this.reportContainer, this.config)

      // Report.off removes a given event handler if it exists.
      report.off('loaded')

      // Report.on will add an event handler which prints to Log window.
    //   const name = this.supplierId
      const newfilter = window._.cloneDeep(this.filter)
    //   newfilter.values = [name]
    //   this.values = [name]
      console.log(newfilter)
      report.on('loaded', () => {
        // console.log("Loaded");
        // if(name==""){
        // 	newfilter.values=[]
        //     report.updateFilters(pbi.models.FiltersOperations.Add, [newfilter]);
        // }
        report.setFilters([newfilter])
      })

      // Report.off removes a given event handler if it exists.
      report.off('rendered')

      // Report.on will add an event handler which prints to Log window.
      report.on('rendered', function() {
        console.log('Rendered')
      })
      // report.off("filtersApplied")

      report.on('filtersApplied', function() {
        console.log('filtersApplied')
      })

      report.on('error', function(event) {
        console.log(event.detail)
        report.off('error')
      })

      report.off('saved')
      report.on('saved', function(event) {
        console.log(event.detail)
        if (event.detail.saveAs) {
          console.log(
            'In order to interact with the new report, create a new token and load the new report'
          )
        }
      })
      this.report = report
      document.getElementsByTagName('iframe')[0].style.border = 'none'
    },
  },

  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
#powerBi {
  margin-top: 20px;
  width: 100%;
  padding: 0 40px;
  height: calc(100vh - 294px);
  overflow-y: auto;
}
// .content {
//   position: relative;
//   .btn {
//     position: absolute;
//     top: 0.4rem;
//     right: 0;
//   }
// }
</style>
