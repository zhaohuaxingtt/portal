<template>
    <div class="page-content">
      <iCard id="powerBiReport"> </iCard>
    </div>
  </template>
  
  <script>
  import {
    getPerformanceKpiPbi 
} from '@/api/supplierManagement/supplierIndexManage/index'
  import { iPage, iCard } from 'rise'
//   import {powerBiUrl,averageName,supplierName} from "@/api/ws2/investmentAdmin/payBlock";
  import * as pbi from 'powerbi-client'
  export default {
    components: {
      iCard
    },
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
      powerBiUrl() {
        var data = {}
        if (process.env.NODE_ENV === 'production') {
          data = {
            reportId: 'cf5a4037-623c-43ab-8bd3-d6757729f97a',
            workspaceId: 'c272ae69-a6b4-4407-bd0e-f67953de36ce'
          }
          console.log('生产环境')
        } else {
          data = {
            reportId: 'abf04029-d9fc-40f5-8ec1-e5bf68cfc26a',
            workspaceId: '876776a9-f959-442e-a011-b4bade0dd862'
          }
          console.log('测试环境')
        }
        getPerformanceKpiPbi (data).then((res) => {
          if (res.data) {
            this.url = res.data
            this.renderBi()
          }
        })
      },
      renderBi() {
        try {
          var permissions = pbi.models.Permissions.All
  
          var config = {
            type: 'report',
            tokenType: pbi.models.TokenType.Embed,
            accessToken: this.url.accessToken,
            embedUrl: this.url.embedUrl,
            // id: 'f6bfd646-b718-44dc-a378-b73e6b528204',
            /*pageName: 'ReportSectioneb8c865100f8508cc533',
                          visualName: '47eb6c0240defd498d4b',
                          permissions: permissions,*/
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
          var reportContainer = document.getElementById('powerBiReport')
          var report = powerbi.embed(reportContainer, config)
          // Report.off removes a given event handler if it exists.
          report.off('loaded')
  
          this.report = report
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .title {
    font-weight: bold;
    font-size: 20px;
    color: $color-black;
    margin-bottom: 20px;
  }
  
  #powerBiReport {
    width: 100%;
    height: calc(100vh - 190px);
    iframe {
      border: 0px !important;
    }
  }
  </style>
  <style>
  iframe {
    border: 0px !important;
  }
  </style>
  