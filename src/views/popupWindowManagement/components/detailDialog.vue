<template>
  <iDialog
    :visible.sync="show"
    :title="papgeTitle"
    @close="closeDialog"
    :show-close='false'
    :width="dialogWidth"
    :class="{'black-style':detail.popupStyle == '2'}"
  >
      <div  :class="{'center-style':detail.popupStyle == '1','main':detail.popupStyle == '0','right-style':detail.popupStyle == '2',} ">
          <div class="left">
              <img v-if="detail.picUrl" :src="detail.picUrl" alt="" class="left-image" />
              <img v-else src="../../../assets/images/popupPic.png" alt="" class="left-image" />
          </div>
          <div class="right">
              <div class="right-content">
                <div class="right-title" :class="{'link-text':detail.linkUrl}" @click="toNewPage">
                  <!-- <h2 > -->
                      {{detail.title}}
                <!-- </h2> -->
                </div>
                <div class="content" :class="{'text-left':detail.wordAlign == 0,'text-center':detail.wordAlign==1,'text-right':detail.wordAlign == 2}">
                    <el-input type="textarea" v-model="detail.content" disabled></el-input>
                </div>
                <div class="publishTime"><i class="el-icon-time"><span class="publishTime-content">{{detail.publishTime}}</span></i></div>
                <iButton @click="closeDialog" class="btn">{{language('确认')}}</iButton>
              </div>
          </div>
      </div>
  </iDialog>
</template>

<script>
import {iDialog,iButton} from 'rise'
export default {
    name:'detailDialog',
    components:{iDialog,iButton},
    props:{
        detail:{
            type:Object,
            default:function(){
                return {
                    title:'',
                    content:'',
                    picUrl:'',
                    linkUrl:'',
                    publishTime:'',
                    popupStyle:'',
                    wordAlign:'0'
                }
            }
        },
        show:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return{
            dialogWidth: 400*(16/9)+'px'
        }
    },
    methods:{
        toNewPage(){
            if(this.detail.linkUrl){
                window.open(this.detail.linkUrl)
            }
        },
        closeDialog(){
            this.$emit('update:show',false)
        }
    }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__body{
    padding: 0 50px !important;
}

::v-deep .el-dialog__header{
    position: relative;
}
.black-style{
    ::v-deep .el-dialog__header{
        background-color: #151316;
        border-radius: 10px 0 0 0 ;
    }
    ::v-deep .el-dialog__body{
        background-color: #151316;
        border-radius:  0 0 0 10px;
    }
}
.main{
    display: flex;
    height:440px;
    width: 100%;
    justify-content:space-between;
    .left{
        width: 48%;
        height: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
        .left-image{
            width: 100%;
            height: 100%;
            border-radius: 10px;
        }
    }
    .right{
        position: relative;
        // display: flex;
        // flex-direction: column;
        width: 48%;
        height: 100%;
        margin-left: 52%;
        top: -40px;
        .right-content{
            display: flex;
            flex-direction: column;
            .right-title{
            font-size: 20px;
            font-weight: bold;
            width: 106%;
            }
            .content{
                // position: absolute;
                // top: 70px;
                margin-top: 20px;
                width: 106%;
                line-height: 24px;
                height: 280px;
                overflow: auto;
                ::v-deep .el-textarea__inner{
                    padding: 0;
                }
            }
            .publishTime{
                // position: absolute;
                display: inline-block;
                // bottom: 60px;
                color: #67C23A;
                margin:20px 0;
                .publishTime-content{
                    color: #666666;
                    margin-left: 20px;
                    font-size: 16px;
                }
            }
            .btn{
                width: 100px;
                // position: absolute;
                // bottom: 0px;
            }
        }
        
    }
}
.center-style{
    display: flex;
    flex-direction: column;
    align-items:center;
    height: 440px;
    .left{
        width:100%;
        position: absolute;
        height: 38%;
        top: 0;
        left: 0;
        .left-image{
            width: 100%;
            height: 100%;
            border-radius: 10px 10px 0 0 ;
        }
    }
    .right{
        margin-top:140px ;
        text-align: center;
        height: 62%;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 104%;
        .right-content{
            width: 100%;
            .right-title{
                font-size: 20px;
                font-weight: bold;
                text-align: center;
                width: 100%;
                margin-bottom: 20px;
            }
            .content,
            .publishTime,
            .btn
            {
                margin-bottom: 20px;
            }
            .content{
                line-height: 24px;
                height: 140px;
                width: 100%;
                overflow: auto;
                ::v-deep .el-textarea__inner{
                    padding: 0;
                } 
            }
            .publishTime{
                // width: 250px;
                padding: 5px;
                color: #67C23A;
                // border: solid rgb(229, 229, 229) 1px;
                .publishTime-content{
                    margin-left: 20px;
                    color: #1B1D21;
                }
            }
        }
        
    }
}
.right-style{
    display: flex;
    height: 440px;
    width: 100%;
    background: #151316;
    justify-content:space-between;
    .left{
        width: 48%;
        height: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
        .left-image{
            width: 100%;
            height: 100%;
            border-radius: 10px;
        }
    }
    .right{
        position: relative;
        // display: flex;
        // flex-direction: column;
        width: 48%;
        top: -40px;
        height: 100%;
        margin-left: 52%;
        .right-content{
            display: flex;
            flex-direction: column;
            .right-title{
                font-size: 20px;
                font-weight: bold;
                width: 106%;
                color: #FFFFFF;
            }
            // .content,
            // .btn{
            //     // position: absolute;
            //     // bottom: 0px;
            // }
            .publishTime{
                margin:20px 0;
                // position: absolute;
                display: inline-block;
                // bottom: 60px;
                color: #67C23A;
                .publishTime-content{
                    color: #FFFFFF;
                    margin-left: 20px;
                    font-size: 16px;
                }
            }
            .content{
                // position: absolute;
                margin-top: 20px;
                // top: 70px;
                width: 106%;
                color: #888888;
                line-height: 24px;
                height: 280px;
                overflow: auto;
                ::v-deep .el-textarea__inner{
                    padding: 0;
                }
            }
            .btn{
                width:100px;
            }
        }
        
    }
}

.link-text{
    text-decoration: underline;
    cursor: pointer;
}

.text-left{
    height: 100%;
    ::v-deep .el-textarea{
        height: 100%;
        .el-textarea__inner{
            text-align: left;
            border: none;
            background:transparent;
            height: 100%;
            // width: 400px;
            resize: none;
            &:focus-visible{
                outline-color: #D0D4D9;
                border: 1px solid #D0D4D9;
            }
        }
    }

}
.text-center{
    height: 100%;
    ::v-deep .el-textarea{
        height: 100%;
        width: 100%;
        .el-textarea__inner{
            text-align: center;
            margin: 0;
            width: 100%;
            border: none;
            background:transparent;
            height: 100%;
            resize: none;
            &:focus-visible{
                outline-color: #D0D4D9;
                border: 1px solid #D0D4D9;
            }
        }
    }   
    

}
.text-right{
    ::v-deep .el-textarea{
        height: 100%;
        .el-textarea__inner{
            text-align: right;
            // width: 400px;
            border: none;
            background:transparent;
            height: 100%;
            resize: none;
                &:focus-visible{
                outline-color: #D0D4D9;
                border: 1px solid #D0D4D9;
            }
        }
    }
    
}
</style>
