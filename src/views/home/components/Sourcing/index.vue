<template>
  <div id="powerBiSoucing" ></div>
</template>

<script>
import * as pbi from 'powerbi-client'
import { powerBiService } from '@/api/home'

export default {
  data() {
    return {
      visible: false,
      industry: false,
      url: {
        accessToken: '', //验证token
        embedUrl: '', //报告信息内嵌地址
        tokenExpiry: '' //token过期时间
      },
      report: null,
      filter: {
        $schema: 'http://powerbi.com/product/schema#basic',
        target: {
          table: 'app_supplier_fin_analysis_sum_nt_daily',
          column: 'subject_name'
        },
        operator: 'In',
        values: [], //[this.name],// values
        requireSingleSelection: true,
        filterType: pbi.models.FilterType.BasicFilter
      },
      values: []
    }
  },
  created() {
    this.powerBiUrl()
  },
  methods: {
    // 获取财报iframeurl
    async powerBiUrl() {
      const result = await powerBiService()
      if (result.code === '200' && result.data) {
        this.url = result.data
        this.renderBi()
      }
    },
    renderBi() {
      try {
        var config = {
          type: 'report',
          tokenType: pbi.models.TokenType.Embed,
          accessToken: this.url.accessToken,
          embedUrl: this.url.embedUrl,
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
        let powerbi = new pbi.service.Service(
          pbi.factories.hpmFactory,
          pbi.factories.wpmpFactory,
          pbi.factories.routerFactory
        )
        var reportContainer = document.getElementById('powerBiSoucing')
        var report = powerbi.embed(reportContainer, config)
        // document
        //   .getElementById('powerBiSoucing')
        //   .querySelector('iframe').style.border = 'none'
          document
          .getElementById('powerBiSoucing')
          .getElementsByTagName('iframe')[0].style.border = 'none'
        // Report.off removes a given event handler if it exists.
        report.off('loaded')
        this.report = report
      } catch (e) {
        console.log(e)
      }
    },
  }
}
</script>

<style lang="scss" scoped>
#powerBiSoucing {
  height: 530px;
}
</style>
