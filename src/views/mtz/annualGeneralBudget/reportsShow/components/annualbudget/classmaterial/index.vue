<template>
  <div
    class="page-content"
    v-permission.auto='MTZ_REPORT_DISPLAY_ANNUAL_BUDGET_MEDIUM_CLASS_OF_MATERIALS_PAGE|年度预算材料中类页面'
  >
  <!-- <div
    class="page-content"
    v-permission='MTZ_REPORT_ANNUAL_BUDGET_MEDIUM_CLASS_OF_MATERIALS'
  > -->
    <iCard id="powerBiReport"></iCard>
  </div>
</template>

<script>
import {  iCard} from 'rise'
import { statement } from '@/api/mtz/annualGeneralBudget/reportShow'
import * as pbi from 'powerbi-client'
export default {
  components: {
    iCard,
  },
  data() {
    return {
      selectOptions: [],
      searchParams: '',
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
          table: 'Dim_Year',
          column: ' Year '
        },
        operator: 'In',
        values: [2021],
        filterType: pbi.models.FilterType.BasicFilter
      },
      values: []
    }
  },
  computed: {
    ...Vuex.mapState({
      userInfo: (state) => state.permission.userInfo
    })
  },
  created() {
    this.filter.values = [new Date().getFullYear()]
    this.getSelectOptions()
    this.powerBiUrl()
  },
  methods: {
    exportReport() {
      this.report.print()
    },
    search() {
      this.powerBiUrl()
    },
    reset() {
      this.searchParams = ''
    },
    // 获取下拉列表
    getSelectOptions() {},
    // 获取财报iframeurl
    powerBiUrl() {
      let params = {
        workspaceId: '876776a9-f959-442e-a011-b4bade0dd862',
        reportId: '90f82db8-cc99-42a6-914a-3180e82585cc',
        datasets: ['c2e4ff2e-50ba-4686-a042-0416ab276d06'],
        username: this.userInfo.id,
        roles: ['role'] // 固定参数，报表端自己判断角色权限
      }
      statement(params).then((res) => {
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
          // pageName: 'ReportSectionae991d05cd104ed2c639',
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
        report.on('loaded', async function () {
          const pages = await report.getPages()
          var page = pages.filter(function (page) {
            return page.isActive
          })[0]
          const visuals = await page.getVisuals()
          visuals.filter(function (visual) {
            //设置默认条件
            if (visual.title == 'data_year' && page.isActive == true) {
              visual.setSlicerState({
                filters: [this.filter]
              })
            }
          })
        })
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
.page-content {
  height: calc(100vh - 240px);
  width: 100%;
  .search-box {
    display: flex;
    justify-content: space-between;
    margin-right: 20px;
  }
  .button-box {
    display: inline-flex;
  }
  .show-me {
    margin-top: 5px;
    margin-right: 20px;
  }
}

#powerBiReport {
  width: 100%;
  height: 100%;
  ::v-deep iframe {
    border: 0px !important;
    overflow: auto;
  }
}
</style>
