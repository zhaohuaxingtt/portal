<template>
    <div>
        <LayHeader title="流程管理"></LayHeader>
        <div class="flex justify-between items-center mt20">
            <div class="title">标题 <i class="cursor el-icon-download"></i></div>
            <div class="expert">
                <div class="flex">
                    <span>流程专家: </span>
                    <span class="name">郭艺钧</span>
                </div>
                <div>版本：ProCS-CSF-001,1.01 最后更新 2018/07/25</div>
            </div>
        </div>
        <div class="subtitle">
            <div class="tlt">标题1</div>
            <div>分页</div>
        </div>
        <div class="mt20 flex">
            <div class="flex-1 mr20">
                <div class="card-l">
                    <div class="content">
                        • CSF： 
                        送样采购员（CSFF）：磁铁 项目启动会并编写启动会会议纪要，负责发放零件批量模具数模（TM）、图纸（TZ）及技术标准等用于试制的资料，负责协调各方确定送样具体时间节点及送样细节，负责跟踪送样情况； 
                        项目采购员（CSFM）：负责在新项目推进过程中代表CS与公司其他部门进行沟通协调，负责从PF至SOP+3月跟踪整个项目的开展； 
                        • CSE/I/M/P/X(Commodity)： 
                        专业采购员(Linie)：负责预批量及批量订单的制作，负责协调解决零件的涉及商务问题和产能问题； 
                        • EP/EN/ER： 
                        FOP：负责确认并解释零件批量模具数模（TM）、图纸（TZ）及技术标准等用于样件试制的资料以及试制过程中的相关技术问题，负责审核材料代用单； 
                        试验工程师：负责BMG零件的收样和认可，编制OTS认可报告及FE54：包括负责明确OTS样品送样要求，负责审核OTS自检试验清单/二次分供方清单，负责道路试验及台架试验，负责德国大众试验所需样品的送交；负责对工程鉴定样品（OTS样品）送样状态的完整性确认，负责OTS样品试验过程的状态跟踪及问题协调； 
                        • MQ： 
                        主管工程师：负责EM样品的收样和认可，编制EMPB：包括负责明确EM样品送样要求，负责EM送样评审，负责样品生产过程的质量评定及问题整改措施的制定。其中，MQS负责ZP7零件，MQM负责ZP5零件，MQE负责ZP2零件； 
                        试验工程师：MQL负责确认EM自检试验清单，审核二次分供方清单，材料代用单，负责首批样品的材料检验；MQM负责首批样品的尺寸检验；MQS/MQM负责首批样品的性能试验； 
                        • TL： 
                        计划员：TLRR同事，负责制定VFF/PVS/OS预批量和SOP起步生产计划，发布VFF/PVS/OS预批量和SOP起步生产需求，拉动预批量零件到首批样件仓库； 
                        • TM： 
                        规划员：TMKS同事，负责ZP5零件模具方案审核和模具进度跟踪；
                    </div>
                    <div class="card-bottom flex justify-between items-center">
                        <span>100</span>
                        <span>分页</span>
                    </div>
                </div>

            </div>
            <div class="side">
               <UiCard title="ProD文档" :list="list" @row-click="side($event, 'prod')">
                   <div slot="item-right">
                       2022-1-1
                   </div>
               </UiCard>
               <UiCard title="流程图" class="process-img" :list="list" @row-click="side($event, 'img')">
                   <div slot="content" class="draw">
                       <img style="width:100%" src="http://cnsvwshvm1416.csvw.com/upload/2021/12/16/FlowChart_150/%E4%B8%BB%E6%B5%81%E7%A8%8B%E5%9B%BE.png" alt="">
                   </div>
                </UiCard>
               <UiCard title="系统操作" class="process-img" :list="list" @row-click="side($event, 'img')">
                   <div slot="head-right" class="video-btn cursor">
                       <i class="el-icon-video-play"></i>
                       视频
                   </div>
                   <template slot="content">
                        <div class="draw">
                            <img style="width:100%" src="http://cnsvwshvm1416.csvw.com/upload/2021/12/16/FlowChart_150/%E4%B8%BB%E6%B5%81%E7%A8%8B%E5%9B%BE.png" alt="">
                        </div>
                        <div class="file-tlt">流程附件</div>
                        <div class="flex row cursor">
                            <span>name</span>
                            <span>ProCS-CS...   2018/08/17</span>
                        </div>
                   </template>
                </UiCard>
            </div>
        </div>
    </div>
</template>

<script>
    import LayHeader from "./../components/LayHeader.vue";
    import UiCard from "./../components/UiCard.vue";
    import {iCard, iButton} from 'rise';

    export default {
        components:{
            LayHeader,
            iCard,
            UiCard
        },
        data() {
            return {
                list:[
                    {name:'TFW生产运营绩效评价管理办法',id:1},
                    {name:'TFW生产运营绩效评价管理办法',id:1},
                    {name:'TFW生产运营绩效评价管理办法',id:1}
                ]
            }
        },
        methods: {
            side(){
                
            }
        },
    }
</script>

<style lang="scss" scoped>
@import "./../comon";

$line-color: #BBC4D6;
.title{
    font-size: 24px;
    font-weight: bold;
}
.expert{
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    .name{
        margin-right: 10px;
        color: #666;
        cursor: pointer;
        &:hover{
            color: #1660F1;
        }
    }
}

.subtitle{
    margin-top: 10px;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid $line-color;
    border-bottom: 1px solid $line-color;
    .tlt{
        font-size: 18px;
        color: #1660F1;
        font-weight: bold
    }
}

.process-img{
    height: auto !important;
    .draw{
        padding: 10px 20px;
    }

    .file-tlt{
        padding: 10px 20px;
        border-bottom: 1px solid $line-color;
    }

    .row{
        padding: 20px;
        justify-content: space-between;
        align-items: center;
    }
}
.video-btn{
    color: #1660F1;
    i{
        font-size: 20px;
    }
}
.card-l{
    background: #FFFFFF;
    box-shadow: 0px 0px 20px rgba(27, 29, 33, 0.08);
    border-radius: 10px;
    .content{
        padding: 20px;
    }

    .card-bottom{
        padding: 20px;
        border-top: 1px solid $line-color;
    }
}
.side{
    width: 450px;
}
</style>