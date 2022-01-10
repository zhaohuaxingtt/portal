<template>
    <iDialog
      title="dialog"
      :visible.sync="show"
      :width="w"
      class="i-dialog"
      @close="handleClose"
      append-to-body
      :close-on-click-modal="false"
      @open="open"
      v-zoom="{value:true,maxw:1000,minw:600,ratio:0.6}"
    >
        <div :style="{height:h}" class="i-content">
            dsad
        </div>
        <!-- <i class="rank el-icon-rank" @mousedown.stop="start"></i> -->
        <slot slot="footer" class="dialog-footer">
         <div class='mouse'>
          <!-- 通过此模块拖拽缩放 -->
        </div>
        </slot>
        
    </iDialog>
</template>

<script>
    import {iDialog} from 'rise';
    import drap from './drap.js';
    var w1 = 500
    var h1 = 300
    export default {
        components:{
            iDialog
        },
        props:{
            show:{
                default:true
            }
        },
        directives: drap,
        data() {
            return {
                startX:0,
                startY:0,
                point:false,
                x:0,
                y:0,
                originWidth:500,
                originHeight:300,
                w1:500,
                h1:300
            }
        },
        methods: {
            handleClose(){
                this.$emit("update:show",false)
            },
            open(){
                this.originWidth = 500
                this.originHeight = 300
            },
            start(e){
                window.isPoint = true
                this.startX = e.clientX
                this.startY = e.clientY
                let self = this
                window.addEventListener("mousedown", (e) => {
                    if(window.isPoint){
                        console.log(self.startX,self.startY);
                    }
                })
                window.addEventListener("mousemove", (e) => {
                    if(window.isPoint){
                        self.x = e.clientX - self.startX
                        self.y = e.clientY - self.startY
                    }
                })
                window.addEventListener("mouseup", (e) => {
                    if(window.isPoint){
                        self.x = e.clientX - self.startX
                        self.y = e.clientY - self.startY
                        w1 = parseInt(self.w)
                        h1 = parseInt(self.h)
                        window.isPoint = false
                        // localStorage.setItem("w1",w1)
                        // localStorage.setItem("h1",h1)
                    }
                })
            },
        },
        computed:{
            w(){
                console.log(w1);
                let w = w1 == this.originWidth ? this.originWidth + this.x : w1 + this.x
                if(w < 400){
                    return "400px"
                }else if(w >= 1100){
                    return "1100px"
                }else{
                    return w + "px"
                }
            },
            h(){
                let h = h1 == this.originHeight ? this.originHeight + this.y : h1 + this.y
                if(h < 200){
                    return "200px"
                }else if(h > 600){
                    return "600px"
                }else{
                    return h + "px"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.i-dialog{
    ::v-deep .el-dialog{
        position: relative;
        margin: 0 auto !important;

    }

    .rank{
        position: absolute;
        right: 0;
        bottom: 0;
        cursor: nwse-resize;
    }
}
.mouse {
  background: grey;
  position: absolute;
  right: 0;
  bottom: 0;
  cursor: se-resize;
  width: 10px;
  height: 10px;
}
</style>