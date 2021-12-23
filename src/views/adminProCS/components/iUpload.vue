<template>
    <div v-loading="uploading">
        <div class="ui-upload-btn" @click="click">
            <div v-if="!isSlot">
                <iButton>{{btnTxt}}</iButton>
                <span class="tip" @click.stop=";" v-text="tipTxt"></span>
            </div>
            <slot></slot>
            <input class="ui-upload" ref="upload" :disabled="disabled" :accept="accept" :multiple="multiple" @change="change" type="file">
        </div>
        <template v-if="showFile">    
            <FileList v-for="(f,i) in files" :key="i" :disabled="disabled" @click="view(f)" :file="f" @del="removeFile(i)"></FileList>
        </template>

        <imgViews ref="img" :list="imgList"></imgViews>
    </div>
</template>

<script>
    import {iButton} from 'rise';
    import {uploadFile} from "@/api/assistant/uploadFile"
    import FileList from "./fileList.vue"
    import imgViews from "./imgViews.vue"
    export default {
        components:{
            FileList,
            imgViews,
            iButton
        },
        props:{
            value:{},
            disabled:{
                type:Boolean,
                default: false
            },
            multiple:{
                type:Boolean,
                default: true
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
                default:20
            },
            // 尺寸 w,h
            px:{
                default:() => {}
            },
            limit:{
                type: Number,
                default: 5
            },
            showFile:{
                type: Boolean,
                default: true
            },
            btnTxt:{
                type: String,
                default:"选择图片"
            },
            tipTxt:{
                type: String,
                default:""
            }
        },
        data() {
            return {
                dialogVisible:false,
                fileUrl:"",
                uploading: false,
                imgFmt:['jpg','jpeg','gif','png'],
                isSlot:false
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
        mounted() {
            this.isSlot = this.$slots.default
        },
        methods: {
            async httpUpload(file){
                return new Promise(async (resolve,reject) => {
                    try {
                        this.uploading = true
                        let formData = new FormData();
                        formData.append("file",file);
                        let res = await uploadFile(formData);
                        this.uploading = false
                        this.$message.success("上传成功")
                        resolve({
                            fileName:res.name,
                            fileUrl: res.path
                        })
                    } catch {
                        this.$message.error("上传失败")
                        reject()
                    }
                })
            },
            click(){
                this.$refs.upload.click()
            },
            async change(e){
                let files = e.target.files
                let fileList = []
                let num = this.files.length
                for (let i = 0; i < files.length; i++) {
                    num += 1
                    const isLtSize = files[i].size / 1024 / 1024 < this.maxSize;
                    if (!isLtSize) {
                        this.$message.error(`${files[i].name}上传文件大小不能超过 ${this.maxSize}MB!`);
                        continue
                    }
                    if(num > this.limit){
                        this.$message.warning(`限制上传${this.limit}个文件`)
                        break
                    }
                    let res = await this.httpUpload(files[i])
                    fileList.push(res)
                }
                let val = this.files;
                val.push(...fileList);
                this.$emit("input",val);
                this.$emit("onSuccess",fileList);
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
                // if (!this.disabled) return
                const fileExtension = file.fileName.substring(file.fileName.lastIndexOf('.') + 1);
                if (this.imgFmt.includes(fileExtension)) {
                    this.$refs.img.show(file.fileUrl)
                }else{
                    let a = document.createElement('a')
                    a.href = `${file.fileUrl}&isDown=true`
                    a.download = file.fileName
                    a.click()
                }
            },
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
.tip{
    margin-left: 20px;
	color: #999;
}
.ui-upload{
   display: none;
}
</style>