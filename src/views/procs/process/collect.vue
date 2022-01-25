<template>
    <div>
       <LayHeader title="流程管理"></LayHeader>

        <div class="flex mt20">
            <div class="card-l mr20">
                <div class="item">1、34324234</div>
                <div class="item">1、34324234</div>
                <div class="item">1、34324234</div>
            </div>
            <iCard class="card-r flex-1">
                <div class="tlt marb15">测试问题内容</div>
                <div class="marb15">1、测试问题回答</div>
                <div class="marb15">具体问题回答如下：</div>
                <div class="r-content marb15">
                    <p>1、xxxxxxxxxxxxxxxxxxxx</p>
                    <p>1、xxxxxxxxxxxxxxxxxxxx</p>
                    <p>1、xxxxxxxxxxxxxxxxxxxx</p>
                </div>
                <span class="operat marb15" style="display: inline-block;"><i class="el-icon-edit"></i> 提问</span>
                <div class="flex justify-between items-center">
                    <div>
                        <span class="operat mr20"><i class="el-icon-share"></i> 分享</span>
                        <span class="operat"><i class="el-icon-star-on"></i> 收藏</span>
                    </div>
                    <iButton>返回</iButton>
                </div>
            </iCard>
        </div>
    </div>
</template>

<script>
    import LayHeader from "./../components/LayHeader.vue";
    import {iCard, iButton} from 'rise';
    
    export default {
        components:{
            LayHeader,
            iCard,
            iButton
        }
    }
</script>

<style lang="scss" scoped>
@import "./../comon";

.card-l{
    height: 100%;
    width: 450px;
    background: #FFFFFF;
    box-shadow: 0px 0px 6px rgba(27, 29, 33, 0.2);
    border-radius: 10px;

    .item{
        padding: 15px 25px;
        border-bottom: 1px solid #BBC4D6;
        cursor: pointer;
        &:hover{
            color:#1660F1;
        }
    }
}
.marb15{
    margin-bottom: 15px;
}
.card-r{
    .tlt{
        font-weight: bold;
        font-size: 18px;
        color: #1660F1;
    }
    .r-content{
        padding: 10px 20px;
        background-color: #F7FAFF;
    }

    .operat{
        color: #666;
        font-size: 16px;
        cursor: pointer;
    }
}
</style>