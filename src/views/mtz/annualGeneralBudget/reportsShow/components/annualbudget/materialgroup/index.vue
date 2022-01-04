<template>
  <div
    class="page-content"
    v-permission.auto="ZHUANGTAIGENZONGBAOBIAO | 状态跟踪报表"
  >
    <!-- <iSearch :icon="true">
      <div class="search-box">
        <el-form>
          <el-form-item label="科室">
            <iSelect v-model="searchParams" :placeholder="language('QINGXUANZE', '请选择')">
              <el-option
                v-for="item in selectOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </iSelect>
          </el-form-item>
        </el-form>
      </div>
      <template slot="button">
        <div class="button-box">
          <show-me class="show-me"></show-me>
          <iButton @click="search">{{ '确认' }}</iButton>
          <iButton @click="reset">{{ '重置' }}</iButton>
        </div>
      </template>
    </iSearch> -->
    <div id="powerBiReport"></div>
  </div>
</template>

<script>
import { iPage, iCard, iSearch, iSelect, iButton } from 'rise'
import { statement } from '@/api/mtz/annualGeneralBudget/reportShow'
import * as pbi from 'powerbi-client'
export default {
  components: {
    iPage,
    iCard,
    iSearch,
    iSelect,
    iButton
  },
  data() {
    return {
      selectOptions: [],
      searchParams: '',
      year: null,
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
        values: [],
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
      console.log(this.report)
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
        reportId: '2a830470-3ae3-4778-85d8-118f3db9ef35',
        datasets: ['01141c8d-7886-4eb6-8d86-0ea2fa68e1ea'],
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
