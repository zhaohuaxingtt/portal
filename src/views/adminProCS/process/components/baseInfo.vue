
<template>
    <div class="info">
        <div class="box">
            <span class="common">*</span>
            <div class="name-text">{{language('工程名称')}}</div>
        </div>
        <div class="margin-top10">
            <iInput v-model="name" clearable />
        </div>
        <div class="box margin-top20">
            <span class="common">*</span>
            <div class="name-text">{{language('流程图')}}</div>
        </div>
        <iUpload 
			v-model="fileList"
			maxSize= 10
			:limit="1"
            :uploadHandle="uploadHandle"
			:removeHandle="removeHandle"
			:isCustHttp="true"
		>
			<div class="margin-top10">
				<iButton class="margin-top10">Choose file</iButton>
				<div class="margin-top10">{{language('文件大小最大限制10MB!')}}</div>
			</div>
		</iUpload>
        <div class="margin-top40 btn">
            <iButton @click="save">{{language('保存')}}</iButton>
        </div>
    </div>
</template>

<script>
import { iInput, iButton } from 'rise'
import iUpload from '../../components/iUpload'
export default {
    name: 'baseInfo',
    components: {
        iInput,
        iUpload,
        iButton
    },
    props: {
        name: {
            type: String,
            default: ''
        },
        currId: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            fileList: []
        }
    },
    methods: {
        save() {
            if (!this.name || !this.uploadFileStream) return this.$message({type: 'warning', message: '请输入主流程项目信息'})
            if (this.currId) {
                this.$emit('updateFlowchartFun', this.name, this.uploadFileStream)
            } else {
                console.log('11')
                this.$emit('createFlowchart', this.name, this.uploadFileStream)
            }
        },
        removeHandle(file, idx) {
			this.fileList.splice(idx, 1)
		},
        uploadHandle(file){
			this.uploadFileStream = file
			return new Promise((resolve) => {
				resolve({
					name: file.name
				})
			})
		}
    }
}
</script>

<style lang="scss" scoped>
    .info {
        margin: 10px;
        padding: 10px;
        .box {
            display: flex;
            flex-direction: row;
            align-items: center;
        }
    }
    .common {
        color: red;
        font-size: 16px;
        margin-right: 6px;
    }
    .name-text {
        font-weight: 600;
        font-size: 20px;
    }
    .btn {
        text-align: right;
    }
</style>