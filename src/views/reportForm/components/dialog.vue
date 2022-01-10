<template>
    <iDialog
      title="dialog"
      :visible.sync="show"
      class="i-dialog"
      @close="handleClose"
      append-to-body
      ref="udialog"
      :close-on-click-modal="false"
      @open="open"
      v-zoom="{value:true,maxW:1000,minW:400}"
    >
        <div class="i-content">
            dsad
        </div>
    </iDialog>
</template>

<script>
    import {iDialog} from 'rise';
    import drag from './drag.js';
    export default {
        components:{
            iDialog
        },
        props:{
            show:{
                default:true
            }
        },
        directives: drag,
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
                h1:300,
                dialogEl:null
            }
        },
        methods: {
            handleClose(){
                this.$emit("update:show",false)
            },
            open(){
                // this.originWidth = 500
                // this.originHeight = 300
                this.$nextTick(() => {
                    this.dialogEl = this.$refs.udialog
                    console.log( this.dialogEl);
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
.i-dialog{
    ::v-deep .el-dialog{
        position: relative;
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