<template>
  <div class="main-content">
        <div class="left" @click="checkStyle(0)" :class="{'check':popupStyle == 0}">
            <div class="left-dialog-content">
                <div class="picture">
                </div>
                <div class="left-text">
                    <h2 class="left-text-title">xxxx</h2>
                    <div class="left-text-content">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</div>
                    <span class="left-btn">xx</span>
                </div>
                <div class="checkIcon" v-if="popupStyle == 0">
                    <img src="../../../assets/images/icon/checked.png" alt="" />
                </div>
            </div>
            <div class="describe">
                {{language('居左（白）')}}
            </div>
        </div>
        <div class="center" @click="checkStyle(1)" :class="{'check':popupStyle == 1}">
            <div class="center-dialog-content">
                <div class="center-picture">

                </div>
                <div class="center-text">
                    <h2 class="center-text-title">xxxxxxxx</h2>
                    <div class="center-text-content">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</div>
                    <span class="center-btn">xxx</span>
                </div>
                <div class="checkIcon" v-if="popupStyle == 1">
                    <img src="../../../assets/images/icon/checked.png" alt="" />
                </div>
            </div>
            <div class="describe" >
                {{language('居中')}}
            </div>
        </div>
        <div class="right" @click="checkStyle(2)" :class="{'check':popupStyle == 2}">
            <div class="right-dialog-content">
                <div class="picture">

                </div>
                <div class="right-text">
                    <h2 class="right-text-title">xxxxxxxx</h2>
                    <div class="right-text-content">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</div>
                    <span class="right-btn">xxx</span>
                </div>
                <div class='checkIcon' v-if="popupStyle == 2">
                    <img src="../../../assets/images/icon/checked.png" alt="" />
                </div>
            </div>
            <div class="describe">
                {{language('居左（黑）')}}
            </div>
        </div>
  </div>
</template>

<script>
export default {
    name:'checkPopupStyle',
    props:{
        popupStyle:{
            type:String,
            default:''
        }
    },
    methods:{
        checkStyle(index){
            this.popupStyle = index
            this.$emit('update:popupStyle',this.popupStyle)
        }
    }
}
</script>

<style lang="scss" scoped>
.main-content{
    height: 100%;
    display: flex;
    justify-content: flex-start;
}
.center,
.right,
.left{
    width: 200px;
    margin-right: 20px;
    padding: 4px;
    border: 1px dashed #D0D4D9;
    border-radius: 8px;
    .describe{
       color: #999999;
       text-align: center;
       font-size: 20px;
    }
}
.left{
    .left-dialog-content{
        border-radius: 6px;
        position: relative;
        height: 122px;
        background-color: #F1F5FF;
        display: flex;
        justify-content: space-around;
        .picture{
            width: 100px;
            height: 110px;
            margin: 6px 8px;
            background-color: #FFFFFF;
            border-radius: 8px;
        }
        .left-text{
            width: 100px;
            .left-text-title{
                font-size: 16px;
            }
            .left-text-content{
                font-size:12px ;
                line-height: 12px;
                word-wrap: break-word;
            }
            .left-btn{
                margin-top: 20px;
                display: inline-block;
                background: #1663F7;
                width: 34px;
                text-align: center;
                border-radius: 10px;
                line-height: 6px;
                height: 12px;//#1663F7
            }
        }
        .checkIcon{
            width: 0;
            >img{
                position: absolute;
                top: -18px;
                left: 184px;
                width: 22px;
                height: 22px;
            }
        } 
    }
}
.center{
    .center-dialog-content{
        border-radius: 6px;
        margin: none;
        position: relative;
        background-color: #F1F5FF;
        display: flex;
        flex-direction:column;
        height: 122px;
        width: 190px;
        .center-picture{
            width:178px;
            height: 40px;
            margin:  6px ;
            background-color: #FFFFFF;
            border-radius: 8px;
        }
        .center-text{
            width:100% ;
            word-wrap: break-word;
            .center-text-title{
                line-height: 20px;
                font-size: 16px;
            }
            .center-text-content{
                font-size:12px ;
                line-height: 12px;
            }
            .center-btn{
                width: 37px;
                margin: 0 auto;
                display: inline-block;
                text-align: center;
                background: #1663F7;
                height: 12px;
                border-radius: 10px;
                line-height: 6px;
            }
        }
        .checkIcon{
            width: 0;
            >img{
                position: absolute;
                top: -18px;
                left: 184px;
                width: 22px;
                height: 22px;
            }
        } 
    }
}
.right{
    .right-dialog-content{
        position: relative;
        height: 122px;
        background-color: #000000;
        border-radius: 6px;
        display: flex;
        justify-content: space-around;
        .picture{
            width: 80px;
            height: 110px;
            margin: 6px 8px;
            background-color: #272727;
            border-radius: 8px;
        }
        .right-text{
            width: 100px;
            .right-text-title{
                font-size: 16px;
                color: #D0D4D9;
            }
            .right-text-content{
                font-size:12px ;
                line-height: 12px;
                color: #B4B4B4;
                word-wrap: break-word;
            }
            .right-btn{
                margin-top: 20px;
                display: inline-block;
                background: #1663F7;
                width: 34px;
                text-align: center;
                border-radius: 10px;
                line-height: 6px;
                height: 12px;//#1663F7
            }
        }
        .checkIcon{
            width: 0;
            >img{
                position: absolute;
                top: -18px;
                left: 184px;
                width: 22px;
                height: 22px;
            }
        } 
    }
}
.check{
    border: 1px dashed #1663F7;
}
</style>