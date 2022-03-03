<template>
	<iDialog
		:title="language('添加流程')"
		:visible.sync="show" 
		width="500px" 
		@close='closeDialogBtn' 
		append-to-body
	>
		<ProcessForm ref="form" type="add" @refresh="refresh" @close="closeDialogBtn"></ProcessForm>
	</iDialog>
</template>

<script>
import { iDialog } from 'rise';
import ProcessForm from './components/processForm.vue';

export default {
	components: {
		iDialog,
		ProcessForm
	},
	props: {
		show: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		closeDialogBtn () {
			this.$emit('update:show', false)
		},
		refresh(){
			this.$emit('refresh')
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../comon.scss';
.typeForm {
	padding-bottom: 20px;
}


::v-deep .el-loading-mask{
	z-index: 2000;
}
</style>