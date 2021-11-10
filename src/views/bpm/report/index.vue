<template>
    <div class="iframe-powerbi">
        <div id='powerBi'></div>   
    </div>
    
</template>

<script>
import {iCard} from 'rise'
import * as pbi from "powerbi-client";
import {getUrl} from '@/api/bpmReport/index'
export default {
    components:{iCard},
    data(){
        return{
            config: {
                type: "report",
                tokenType: pbi.models.TokenType.Embed,
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
            reportContainer:'',
        }
    },
    methods:{
        init(){
            this.config.embedUrl = this.url.embedUrl;
            this.config.accessToken = this.url.accessToken;
            this.reportContainer = document.getElementById("powerBi")
            this.powerbi = new pbi.service.Service(
                pbi.factories.hpmFactory,
                pbi.factories.wpmpFactory,
                pbi.factories.routerFactory
            );
            this.renderBi();
        },
        renderBi(){
            var report = this.powerbi.embed(this.reportContainer, this.config);
            // Report.off removes a given event handler if it exists.
            report.off("loaded");
            // report.off("rendered");
            // // Report.on will add an event handler which prints to Log window.
            // report.on("rendered", function() {
            //     console.log("Rendered");
            // });
            // // report.off("filtersApplied")
            // report.on("filtersApplied", function() {
            //     console.log("filtersApplied");
            // });
            // report.on("error", function(event) {
            //     report.off("error");
            // });
            // report.off("saved");
            // report.on("saved", function(event) {
            //     if (event.detail.saveAs) {
            //     console.log(
            //         "In order to interact with the new report, create a new token and load the new report"
            //     );
            //     }
            // });
        },
        getPowerBiUrl(){
            getUrl().then((res) =>{
                if(res.result){
                    this.url = res.data
                    this.init()
                } 
            })
        }
    },
    async mounted(){
        await this.getPowerBiUrl()
        
    },

}
</script>

<style lang="scss" scoped>
.iframe-powerbi{
    height: 100%;
    overflow: auto;
    #powerBi {
    width: 100%;
    height: 1300px;
    // margin-top: 20px;
    //   height: calc(100vh - 380px);
    ::v-deep > iframe{
        border:none;
        height: 100px;
        
        }
    }
}

</style>