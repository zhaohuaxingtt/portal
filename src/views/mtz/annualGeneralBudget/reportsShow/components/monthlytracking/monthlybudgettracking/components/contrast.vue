<template>
<div>
    <el-tooltip :content="showPrice" effect="light" placement="top" :popper-class="[item.priceType == 1  ? 'risk' : 'chance' ]">
        <div class="contrast-content" v-if="item.price!= 0">
            <div :class='["contrast-img",item.priceType == 2 ? "green" : "red"]'></div>
            <div style="margin-left:4px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap">{{(Number(item.price)/1000000).toFixed(2)}}</div>
        </div>
        <div v-else class="contrast-content"></div>
    </el-tooltip>
    
    
</div>
    
</template>

<script>
export default {
    name:'tracking-contrast',
    props:{
        item:{
            type:Object,
            default:()=>{
                return {
                    price:'',
                    priceType:''
                }
            }
        }
    },
    computed:{
        showPrice(){
           // console.log(newVal,'---====');
            // let newVal = String(this.item.price *1000000) 
            const splitPrice = (this.item.price + '').split('.')
            let leftPrice = splitPrice[0]
            let rightPrice = splitPrice.length > 1 ? '.'+ splitPrice[1]  : ''
            const rgx = /(\d+)(\d{3})/
            while(rgx.test(leftPrice)){
              leftPrice =  leftPrice.replace(rgx, '$1' + ',' + '$2')
            }
            // const tempt = newVal.split('').reverse().join('').match(/(\d{1,3})/g)
            // return (this.item.priceType == 1  ? '-' :'') + tempt.join(',').split('').reverse().join('')
            return (this.item.priceType == 1  ? '-' :'') + leftPrice + rightPrice
        }
    }


}
</script>

<style lang="scss" scoped>
    .contrast-content{
        width: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        // overflow: hidden;
        .contrast-img{
            width: 14px;
            height: 14px;
            border-radius: 50%;
        }
        .green{
            background-color: rgb(33,213,155);
        }
        .red{
            background-color: rgb(221,41,42);
        }
    }

</style>
<style lang="scss" >
    .chance{
        background:  rgb(229,248,243);
        color:  rgb(33,213,155);
        border-color: rgb(33,213,155) !important;
        .popper__arrow{
            display: none;
        }
    }
    .risk{
        background:rgb(229,248,243) ;
        color: rgb(221,41,42);
        border-color:rgb(221,41,42) !important;
        .popper__arrow{
            display: none;
        }
    }
</style>