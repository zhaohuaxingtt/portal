<template>
    <iPage>
        <headerNav/>
        <!-- 报表统计 -->
        <iCard class="overviewChartWrapper margin-top20 iframe-powerbi">
            <div id='powerBi'></div>
        </iCard>
    </iPage>
</template>
  
<script>
import { iPage } from "rise"
import headerNav from "../components/headerNav"

import { iCard } from 'rise'
import * as pbi from "powerbi-client";
import {
    getReportBobOverview
} from "@/api/supplierManagement/yuqingjiance"
export default {
    components:{
        headerNav,
        iPage,
        iCard
    },
    data(){
        return{
            formData: {
                cleintId: '66e3fa4b-152e-4bfb-8a9d-18b820459df1',
                tenantId: '8716a3b9-b827-484b-92ad-ed90aaf4d707',
                clientSecret: '6cpyeTY~dAmL-Uub2X8Om30Mm2EUk-d.TS',
                workspaceId:process.env.NODE_ENV === "production"?"c272ae69-a6b4-4407-bd0e-f67953de36ce":"876776a9-f959-442e-a011-b4bade0dd862",
                reportId: process.env.NODE_ENV === "production"?"89e38306-153c-4a10-94c8-999a9630b3a5":"844be0fb-34be-47ff-b102-42295930471d",
            },
            config: {
                type: "",
                tokenType: "",
                accessToken: "",
                embedUrl: "",
                pageName: "",
                settings: {
                panes: {
                    filters: {
                        visible: false,
                    },
                    pageNavigation: {
                        visible: false,
                    },
                    },
                },
            },
            url: {
                accessToken: "", //验证token
                embedUrl: "", //报告信息内嵌地址
                tokenExpiry: "", //token过期时间
            },
            reportContainer:null,
            report:null,//pbi容器
            filterParameter:{},//pbi请求刷新参数
        }
    },
    mounted() {
        this.getUrl();
    },
    methods:{
        getUrl(){
            getReportBobOverview({
                ...this.formData
            }).then(res=>{
                this.url = res.data
                this.init()
            })
        },
        init(){
            this.renderBi();
        },
        renderBi(){
            let powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
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
            };
            var reportContainer = document.getElementById('powerBi');
            this.report = powerbi.embed(reportContainer, config);
        },
    }
}
</script>

<style lang="scss" scoped>
.overviewChartWrapper {
  .chartTitle {
    font-size: 18px;
    font-weight: bold;
  }
  ::v-deep .cardBody {
    // height: 360px;
    display: flex;
    & > div {
      width: 50%;
    }
  }
}
.iframe-powerbi{
    // height: 100%;
    overflow: auto;
    #powerBi {
    width: 100%;
    height: 1000px;
    // margin-top: 20px;
    //   height: calc(100vh - 380px);
    ::v-deep > iframe{
        border:none;
        // height: 100px;
        
        }
    }
}
</style>