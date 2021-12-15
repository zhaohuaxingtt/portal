<template>
    <div>
        <el-upload
            action
            :accept="accept.map(type => `.${type}`).join(',')"
            :before-upload="beforeAvatarUpload"
            :show-file-list="false"
            :http-request="httpUpload"
            :disabled="disabled || (files.length >= limit)"
            v-if="!disabled"
            >
            <slot></slot>
        </el-upload>
        <template v-if="showFile">    
            <FileList v-for="(f,i) in files" :key="i" :disabled="disabled" @click="view(f)" :file="f" @del="removeFile(i)"></FileList>
        </template>

        <imgViews ref="img" :list="imgList"></imgViews>
    </div>
</template>

<script>
    import {uploadFile,getFileId} from "@/api/assistant/uploadFile"
    import FileList from "./fileList.vue"
    import imgViews from "./imgViews.vue"
    export default {
        components:{
            FileList,
            imgViews
        },
        props:{
            value:{},
            disabled:{
                type:Boolean,
                default: false
            },
            accept:{
                type: Array,
                default: function() {
                    return [
                    'mpg',
                    'mp4',
                    'rmvb',
                    'rm',
                    'mpeg',
                    'avi',
                    'wmv',
                    'mov',
                    'flv',
                    'jpg',
                    'jpeg',
                    'gif',
                    'png',
                    'bmp',
                    'mp3',
                    'wma',
                    'wav',
                    'txt',
                    'doc',
                    'docx',
                    'xls',
                    'xlsx',
                    'ppt',
                    'pptx',
                    'swf',
                    'pdf',
                    'tiff',
                    'tif',
                    'ai',
                    'psd',
                    'fla',
                    'wmp',
                    'zip',
                    'rar',
                    'tar',
                    'gz',
                    'z',
                    'iso',
                    'cab',
                    'jar',
                    'ceb',
                    'wps',
                    'ttf'
                    ]
                }
            },
            // 文件大小 M
            maxSize:{
                type: Number,
                default:10
            },
            // 尺寸 w,h
            px:{
                default:() => {}
            },
            limit:{
                type:[Number,String],
                default:5
            },
            showFile:{
                type:Boolean,
                default: true
            }
        },
        data() {
            return {
                dialogVisible:false,
                fileUrl:"",
                imgFmt:['jpg','jpeg','gif','png']
            }
        },
        computed:{
            files(){
                return this.value || []
            },
            imgList(){
                let arr = []
                let l = this.files
                l.forEach(e => {
                    let fmt = e.fileName.split(".")[e.fileName.split(".").length - 1]
                    if(this.imgFmt.includes(fmt)){
                        arr.push(e.fileUrl)
                    }
                })
                return arr
            }
        },
        methods: {
            async httpUpload(res){
                let formData = new FormData();
                formData.append("file",res.file);
                let file = await uploadFile(formData);
                this.$message.success("上传成功")
                let val = this.files;
                val.push({
                    fileName:file.name,
                    fileUrl: file.path
                });
                this.$emit("input",val);
                this.$emit("onSuccess",file);
            },
            beforeAvatarUpload(file){
                const isLtSize = file.size / 1024 / 1024 < this.maxSize;
                if (!isLtSize) {
                    this.$message.error(`上传文件大小不能超过 ${this.maxSize}MB!`);
                }
                return isLtSize;
            },
            removeFile(index){
                 this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let val = this.files;
                    val.splice(index,1);
                    this.$emit("input",val);
                })
            },
            view(file){
                if (!this.disabled) return
                const fileExtension = file.fileName.substring(file.fileName.lastIndexOf('.') + 1);
                if (this.imgFmt.includes(fileExtension)) {
                    this.$refs.img.show(file.fileUrl)
                }else{
                    let a = document.createElement('a')
                    a.href = `${file.fileUrl}&isDown=true`
                    a.download = file.fileName
                    a.click()
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
@import "./../comon.scss";

.file-dialog{
    ::v-deep .el-dialog{
        min-height: 120px;
    }
}
.img-style {
	width: 100%;
    padding: 10px;
}
</style>