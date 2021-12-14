<template>
    <div class="views" v-if="showView" @click="showView = false">
        <i class="el-icon-close close" @click.stop="showView = false"></i>
        <i class="el-icon-arrow-left arrow prev" @click.stop="prev"></i>
        <div class="img-view">
            <img @click.stop=";" :style="{transform:`scale(${imgStyle.scale}) rotate(${imgStyle.rotate}deg)`}" :src="url" alt="">
        </div>
        <i class="el-icon-arrow-right arrow next" @click.stop="next"></i>
        <div class="actions" @click.stop=";">
            <i class="icon el-icon-zoom-in" @click.stop="zoom('plus')"></i>
            <i class="icon el-icon-zoom-out" @click.stop="zoom('small')"></i>
            <i class="icon el-icon-refresh-right" @click.stop="rotate('right')"></i>
            <i class="icon el-icon-refresh-left" @click.stop="rotate('left')"></i>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            list:{
                type: Array,
                default:() => []
            }
        },
        data() {
            return {
                url:"",
                showView:false,
                imgStyle:{
                    scale:1,
                    rotate:0
                }
            }
        },
        watch: {
            showView(n){
                if(!n){
                    this.imgStyle = {
                        scale:1,
                        rotate:0
                    }
                }
            }
        },
        mounted() {
            document.addEventListener('keydown', e => {
                if(e.key == "ArrowLeft"){
                    this.prev()
                }
                if(e.key == "ArrowRight"){
                    this.next()
                }
                if(e.key == "Escape"){
                    this.showView = false
                }
            })
            document.addEventListener('mouses', e => {
                console.log(e);
            })
        },
        methods: {
            show(url){
               this.url = url
               this.showView = true
               this.$nextTick(() => {

               })
            },
            prev(){
                let index = this.list.findIndex(e => e == this.url)
                if(index <= 0) {
                    this.url = this.list[this.list.length - 1]
                }else{
                    this.url = this.list[index - 1]
                }
            },
            next(){
                let index = this.list.findIndex(e => e == this.url)
                if(index >= this.list.length - 1) {
                    this.url = this.list[0]
                }else{
                    this.url = this.list[index + 1]
                }
            },
            rotate(type){
                if(type == 'left'){
                    // 左旋转
                    this.imgStyle.rotate -= 90
                }else{
                    // 右旋转
                    this.imgStyle.rotate += 90
                }
            },
            zoom(type){
                if(type == 'plus'){
                    // 放大
                    if(this.imgStyle.scale >= 3) return
                    this.imgStyle.scale += 0.5
                }else{
                    // 缩小
                    if(this.imgStyle.scale <= 0.5) return
                    this.imgStyle.scale -= 0.5
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.views{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba($color: #000000, $alpha: .5);
    z-index: 9999;
    .img-view{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            transition: all .3s ease;
            max-width: 80%;
            max-height: 100%;
        }
    }
    .close{
        position: absolute;
        top: 40px;
        right: 40px;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        color: #fff;
        background-color: rgba($color: #fff, $alpha: .3);
        border-radius: 50%;
        cursor: pointer;
    }
}
.arrow{
    position: absolute;
    top: 50%;
    width: 50px;
    height: 50px;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    opacity: .8;
    cursor: pointer;
    box-sizing: border-box;
    user-select: none;
    transform: translateY(-50%);
    font-size: 26px;
    color: #fff;
    background-color: rgba($color: #fff, $alpha: .3);;
    border-color: #fff;
    &.prev{
        left: 50px;
    }
    &.next{
        right: 50px;
        text-indent: 2px;
    }
}
.actions{
    position: absolute;
    left: 50%;
    bottom: 30px;
    // width: 282px;
    height: 44px;
    padding: 10px 30px;
    transform: translateX(-50%);
    background-color: rgba($color: #fff, $alpha: .3);;
    border-color: #fff;
    color: #fff;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: .8;
    box-sizing: content-box;
    cursor: pointer;
    user-select: none;
    z-index: 99;

    .icon{
        font-size: 34px;
        margin: 0 15px;
    }
}
</style>