<template>
<div>
    <el-tooltip placement="bottom" :content="showPrice" effect="light" :popper-class="[item.priceType == 1  ? 'del' : 'add' ]" >
        <div :class='[item.priceType ==1 ? "minus" : "difference","basic"]' >
            {{(Number(item.price)/1000000).toFixed(2)}}
        </div>
    </el-tooltip>
</div>
  
</template>

<script>
export default {
    name:'differenceDisplay',
    props:{
        item:{
            type:Object,
            default:()=>{
                return{
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
    },
    data(){
        return{
            // showPrice:''
        }
    }
}
</script>

<style lang="scss" scoped>
.basic{
    width: 80px;
    height: 30px;
    border-radius: 6px;
    font-weight: bold;
    line-height: 30px;
    text-align: center;
}
.difference{
    background: rgb(255, 246, 236);
    color: rgb(255,176,77);
}
.minus{
    background:rgb(229,248,243) ;
    color: rgb(5, 187, 181);
}
</style>
<style lang="scss">
.add{
    background: rgb(255, 246, 236);
    color: rgb(255,176,77);
    border-color:rgb(255,176,77) !important;
    .popper__arrow{
        display: none;
    }
}
.del{
    background:rgb(229,248,243) ;
    color: rgb(5, 187, 181);
    border-color:rgb(5, 187, 181) !important;
    .popper__arrow{
        display: none;
    }
}

</style>