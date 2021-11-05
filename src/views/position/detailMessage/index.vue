<template>
<iPage class="template">
    <div class="main">
        <div class="title">
            <div class="titleNa">{{title}}</div>
            <div>
                <iButton>编辑</iButton>
            </div>
        </div>
        <div class="content">
            <iCard title="基本信息" collapse='true' class="basicMe">
                <div  class="basicMeList">
                    <div class="MessageAlo" v-for='item in basicMe' :key="item.id">
                        <span class="basicNa" style="line-height: 25px;">{{item.name}}</span>
                        <span class="basicCon"><iText>{{item.text}}</iText></span>
                    </div>
                </div>  
                <div class="desAndTag">
                    <div class="MessageLast" v-for='(item,index) in MessageLast' :key="item.id">
                        <span class="basicNa" style="line-height: 25px;">{{item.name}}</span>
                        <span class="basicContent"><iText :class="'text'+(index +1)">{{item.text}}</iText></span>
                    </div>
                </div>  
                <div class="dbasicTa">
                    <iTableCustom
                        :data="basicData"
                        :columns="basicTable"
                        :extra-data="tableExtraData"
                    >
                    </iTableCustom>
                </div>
            </iCard>
            <iCard title="角色信息" collapse='true' class="basicMe">
                <div  class="roleMe">
                    <iTableCustom 
                        :data="roleData" 
                        :columns="tableSetting"
                        >
                    </iTableCustom  >
                </div>
            </iCard>
            <iCard title="岗位用户" collapse='true' class="basicMe">
                <div  class="customer">
                    <iTableCustom
                        :data="custmerData" 
                        :columns="custmerTable"
                        >
                    </iTableCustom>
                </div>
            </iCard> 
        </div>
    </div> 
</iPage>
    
</template>

<script>
import {iCard , iButton , iText , iPage} from 'rise'
import iTableCustom from "@/components/iTableCustom";
import { tableSetting , custmerTable , basicTable} from "./data.js";
import { pageMixins } from "@/utils/pageMixins";


export default {
    components:{
        iCard ,
        // iDialog ,
        iButton ,
        iText ,
        // iPagination , 
        iTableCustom ,
        // tableSetting ,
        // custmerTable ,
        // basicTable,
        iPage
        },
    mixins: [pageMixins],
    data(){
        return{
            //控制弹窗
            dialogTableVisible:false,
            title:'车灯采购经理',
            //基本信息第一行信息
            basicMe:[{
                name:'岗位编码',
                text:'CSX-1101'
            },{
                name:'岗位名称（中）',
                text:'PZ2'
            },{
                name:'岗位名称（英）',
                text:''
            },{
                name:'是否组织领导',
                text:''
            }],
            //基本信息第二行信息
            MessageLast:[
                {
                    name:'岗位描述',
                    text:'岗位描述岗位描述岗位描述岗位描述'
                },
                 {
                    name:'岗位标签',
                    text:' 采购 ； 财务'
                }
            ],
            //角色信息数据
            tableSetting,
            roleData:[{
                roleNumber:'1',
                roleId:'1001675',
                roleCode:'MQS科室定点流转审批人',
                roleName:'MQS科室定点流转审批人',
                roleDescribe:'MQS科室定点流转审批人'
            },{
                roleNumber:'2',
                roleId:'1001676',
                roleCode:'MQM科室会外流转定点审批的角色',
                roleName:'MQM科室会外流转定点审批的角色',
                roleDescribe:'MQM科室会外流转定点审批的角色'
            },{
                roleNumber:'3',
                roleId:'1001677',
                roleCode:'MQE科室会外流转定点审批的角色',
                roleName:'MQE科室会外流转定点审批的角色',
                roleDescribe:'MQE科室会外流转定点审批的角色',
            },{
                roleNumber:'4',
                roleId:'1001678',
                roleCode:'TPA科室会外流转定点审批的角色',
                roleName:'TPA科室会外流转定点审批的角色',
                roleDescribe:'TPA科室会外流转定点审批的角色'
            }],
            //用户信息数据
            custmerTable,
            custmerData:[
                {
                    codeNum:'1',
                    cusNum:'1001675',
                    cusName:'周红',
                    department:'TLLC',
                    smartPhone:'13707180012',
                    phoneNumber:'021-61341109',
                },{
                    codeNum:'2',
                    cusNum:'1001676',
                    cusName:'朱炜',
                    department:'CSI',
                    smartPhone:'13707180012',
                    phoneNumber:'021-61341109',
                },{
                    codeNum:'3',
                    cusNum:'1001677',
                    cusName:'王嘉来',
                    department:'CSI',
                    smartPhone:'13707180012',
                    phoneNumber:'021-61341109',
                },{
                    codeNum:'4',
                    cusNum:'1001678',
                    cusName:'董云波',
                    department:'TLS',
                    smartPhone:'13707180012',
                    phoneNumber:'021-61341109',
                }
            ],
            //基本信息
            basicTable,
            basicData:[
                {
                    basicNum:'1',
                    dimension:'车型',
                    basicCon:['车型1' , '车型3']
                },
                {
                    basicNum:'2',
                    dimension:'品牌',
                    basicCon:['品牌1' , '品牌3']
                },
                {
                    basicNum:'3',
                    dimension:'材料组',
                    basicCon:['材料组1 ', '材料组3']
                },
                {
                    basicNum:'4',
                    dimension:'',
                    basicCon:[]
                },

            ],
            tableExtraData: {
                车型: [
                    {
                        value: '选项1111111111',
                        label: '车型1'
                    }, {
                        value: '选项2',
                        label: '车型2'
                    }, {
                        value: '选项3',
                        label: '车型3'
                    }
                ],
                品牌: [
                    {
                        value: '选项1',
                        label: '品牌1'
                    }, {
                        value: '选项2',
                        label: '品牌2'
                    }, {
                        value: '选项3',
                        label: '品牌3'
                    }
                ],
                材料组: [
                    {
                        value: '选项1',
                        label: '材料组1'
                    }, {
                        value: '选项2',
                        label: '材料组2'
                    }, {
                        value: '选项3',
                        label: '材料组3'
                    }
                ]
            }
        }
    },
}
</script>

<style lang="scss" scoped>

.main{
    width: 100%;
    height: 100%;
    margin:0 auto;
   .title{
       display: flex;
       justify-content: space-between;
       .titleNa{
           font-size: 20px;
           font-weight: bold;
       }
   }
   .content{
    height: 100%;
    overflow: auto;
       margin-top: 2vh;

        .basicMe{
         margin-bottom: 2vh;
       .basicMeList{
           display: flex;
           justify-content: space-between;
           .MessageAlo{
                width: 22%;
                display: flex;
                justify-content: space-between;
                .basicNa{
                    display: block;
                    color: #4B4B4C;
                }
                .basicCon{
                    width: 65%;
                }
           }
       }
       .desAndTag{
           margin-top: 3vh;
                display: flex;
                justify-content: space-between;
            .MessageLast{
                width: 48%;
                display: flex;
                justify-content: space-between;
                .basicContent{
                    text-align: center;
                    width:84%;
                    .text{                     
                        color: #41434A;
                        &2{
                            padding-left: 15px; 
                            text-align: left;
                        }
                        
                    }
                }
            }
       }
       .dbasicTa{
           margin-top: 3vh;
       }
   }
   }

}

</style>