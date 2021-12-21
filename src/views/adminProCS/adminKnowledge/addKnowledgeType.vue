<template>
	<iDialog
		:title="dialogTitle"
		style="margin-top:10vh"
		:visible.sync="typeShow" 
		v-if="typeShow"
		width="60%" 
		@close='closeDialogBtn' 
		append-to-body
	>
		<el-form 
			label-position="left" 
			:model="newTypeForm" 
			:rules="newTypeRules" 
			label-width="100px" 
			class="typeForm"
		>
			<iFormItem :label="language('知识类型')" prop='name'>
				<iInput v-model="newTypeForm.name" placeholder="请输入类型名称"></iInput>
			</iFormItem>
			<iFormItem :label="language('英文名')" prop='enName'>
				<iInput v-model="newTypeForm.enName" placeholder="请输入知识英文名称"></iInput>
			</iFormItem>
			<iFormItem :label="language('封面图片')" prop='coverPhoto'>
				<div class="right-content"></div>
			</iFormItem>
		</el-form>
	</iDialog>
</template>

<script>
import { iDialog, iFormItem, iInput } from 'rise'
import ImgCutter from 'vue-img-cutter'
export default {
	name: 'addKnowledgeType',
	components: {
		iDialog,
		iFormItem,
		iInput,
		ImgCutter
	},
	props: {
		operateType: {
			type: String,
      default: 'add'
		},
		typeShow: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			visible: false,
			newTypeForm: {
				name: '',
				enName: '',
				coverPhoto: ''
			},
			newTypeRules: {
				name: { required:'true',message:"请输入类型名称",trigger:'blur' },
				enName: { required:'true',message:"请输入知识英文名称",trigger:'blur' },
				coverPhoto: { required:'true',message:"请上传封面图片",trigger:'blur' }
			},
		}
	},
	methods: {
		closeDialogBtn () {
      this.$emit('update:typeShow', false)
    },
		close () {
      this.closeDialogBtn();
    },
	},
	computed: {
		dialogTitle() {
			return this.operateType === 'add' ? '新增知识类型' : '修改知识类型'
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../comon.scss';
.typeForm {
	padding-bottom: 20px;
}
.right-content {
	
}
</style>