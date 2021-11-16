<template>
  <div class="main-content">
        <div class="left check">
            <div class="left-dialog-content">
                <div class="picture">
                </div>
                <div class="left-text">
                    <h2 class="left-text-title">xxxx</h2>
                    <div class="left-text-content">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</div>
                    <span class="left-btn">xx</span>
                </div>
            </div>
            <div class="describe">
                {{language('居左（白）')}}
            </div>
        </div>
         <!-- 。<div class="center">
            <div class="center-dialog-content">
                <div class="center-picture">

                </div>
                <div class="center-text">
                    <h2 class="center-text-title">xxxxxxxx</h2>
                    <div class="center-text-content">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</div>
                    <span class="center-btn">xxx</span>
                </div>
            </div>
            <div class="describe">
                {{language('居中')}}
            </div>
        </div>
        <div class="right">
            <div class="right-dialog-content">
                <div class="picture">

                </div>
                <div class="right-text">
                    <h2 class="right-text-title">xxxxxxxx</h2>
                    <div class="right-text-content">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</div>
                    <span class="right-btn">xxx</span>
                </div>
            </div>
            <div class="describe">
                {{language('居左（黑）')}}
            </div>
        </div> -->
  </div>
</template>

<script>
export default {
    name:'popupStyle'
}
</script>

<style lang="scss" scoped>
.main-content{
    height: 100%;
}
.left{
    width: 200px;
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
        height: 122px;
        background-color: #F1F5FF;
        display: flex;
        justify-content: space-around;
        .picture{
            width: 80px;
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
                height: 12px;
            }
        }
    }
}
.check{
    border: 1px dashed #1663F7;
}
</style>