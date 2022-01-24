<template>
    <iDialog
        title="操作手册"
        :visible.sync="show" 
        width="600px" 
        @close='close' 
        @open="open"
        append-to-body
    >
        <div class="content">
           <div class="flex content-item">
               <span>操作手册封面：</span>
               <iUpload 
                    v-model="form.operatorImage" 
                    accept="image/*" 
                    tipTxt="文件大小最大限制10MB!" 
                    :maxSize="10" 
                    :limit="1"
                    isCustHttp
                    :uploadHandle="uploadHandle($event,'operatorImage')"
                    ></iUpload>
           </div>
           <div class="flex content-item">
               <span>操作手册：</span>
               <iUpload v-model="form.operatorFile"
                    btnTxt="选择文件" 
                    tipTxt="文件大小最大限制10MB!" 
                    :maxSize="10" 
                    :limit="1"
                    isCustHttp
                    :uploadHandle="uploadHandle($event,'operatorFile')"
                    ></iUpload>
           </div>
        </div>
        <div class="flex felx-row mt20 pb20 justify-end ">
            <iButton @click="close">{{ language('取消') }}</iButton>
        </div>
    </iDialog>
</template>

<script>
import {iDialog,iButton} from 'rise';
import iUpload from '../../../components/iUpload.vue';
import {uploadPageFile} from '@/api/adminProCS';
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
        },
        info:{
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            form:{
                operatorImage:[],
                operatorFile:[],
            }
        }
    },
    methods: {
        uploadHandle(file,type){
            return new Promise(async (res, rej) => {
                try {
                    let data = new FormData()
                    data.append(type,file)
                    let r = await uploadPageFile(this.info.id,data)
                    res({
                        name: r.originalFileName,
                        url: r.url,
                        id: r.id
                    })
                } catch(err) {
                    rej(err)
                }
            })
        },
        open(){
            let files = this.info.attachMents.map(e => {
                return {
                    fileName: e.originalFileName,
                    fileUrl:e.url
                }
            })
            this.form.operatorImage = files?.[0] || []
            this.form.operatorFile = files?.[1] || []
        },
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
</style>