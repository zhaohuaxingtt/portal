<template>
    <iDialog
        title="操作视频"
        :visible.sync="show" 
        width="600px" 
        @close='close' 
        append-to-body
    >
        <div class="content">
           <div class="flex content-item">
               <span>操作视频：</span>
               <iUpload v-model="form.operatorImage" btnTxt="选择视频" tipTxt="文件大小最大限制10MB!" :maxSize="10" :limit="1"></iUpload>
           </div>
           <video class="video" controls src="http://cnsvwshvm1416.csvw.com/upload/2018/07/30/Attachment_56604_path.mp4?t=0.33881052792501865"></video>
        </div>
        <div class="flex felx-row mt20 pb20 justify-end ">
            <iButton @click="close">{{ language('取消') }}</iButton>
        </div>
    </iDialog>
</template>

<script>
import {iDialog,iButton} from 'rise';
import iUpload from '../../../components/iUpload.vue';
export default {
    components: {
        iDialog,
        iButton,
        iUpload
    },
    props:{
        show:{
            type:Boolean,
            default:false
        }
    },
    data() {
        return {
            form:{
                operatorImage:[],
                operatorFile:"",
            }
        }
    },
    methods: {
        close(){
            this.$emit("update:show",false)
        }
    },
}
</script>

<style lang="scss" scoped>
@import "./../../../comon";
.content-item{
    margin-bottom: 20px;
    span{
        width: 200px;
        text-align: right;
    }
}
.video{
    width: 80%;
    display: block;
    margin: 0 auto 40px;
}
</style>