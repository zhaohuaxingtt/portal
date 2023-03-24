<template>
    <div>
        <iPage>
            <div class="tabs">
                <div :class="isShowTabs?'current':''" @click="isShowTabs=true">市场价图</div>
                <div :class="!isShowTabs?'current':''" @click="isShowTabs=false">市场价表</div>
            </div>
            
            <MarketPriceImg v-if="isShowTabs"/>
            <MarketPriceTable v-if="!isShowTabs"/>
        </iPage>
    </div>
</template>

<script>
import MarketPriceImg from './components/marketPriceImg'
import MarketPriceTable from './components/marketPriceTable'
export default {
    components:{
        MarketPriceImg,
        MarketPriceTable
    },
    data(){
        return {
            isShowTabs:true
        }
    },
    created(){
        if(this.$route.query.materialCode){
            this.isShowTabs=false
        }
    }
}
</script>

<style lang="scss" scoped>
    .tabs{
        width: 208px;
        height: 35px;
        background: #F5F6F7;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.08);
        opacity: 1;
        border-radius: 10px;
        display: flex;
        justify-content: space-between;
        line-height: 35px;
        margin: 30px 0 20px 0;
        div:first-child{
            width: 104px;
            height: 35px;
            text-align: center;
            cursor: pointer;
            border-radius: 10px 0 0 10px;
        }
        div:last-child{
            width: 104px;
            height: 35px;
            text-align: center;
            cursor: pointer;
            border-radius:0 10px 10px 0;
        }
        .current{
            background: #fff;
            color: #1660F1;
            font-weight: bold;
        }
    }
</style>