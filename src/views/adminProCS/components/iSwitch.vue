<template>
	<el-switch
		v-model="currVal"
		:active-text="activeText" 
		:inactive-text="inactiveText"
		@change="handlePublishChange"
	></el-switch>
</template>

<script>
export default {
	name: 'iSwitch',
	props: {
		currVal: {
			type: Boolean,
			default: false
		},
		currItem: {
			type: Object,
			default: () => {}
		},
		activeText: {
			type: String,
			default: '上架'
		},
		inactiveText: {
			type: String,
			default: '下架'
		}
	},
	methods: {
		handlePublishChange(e) {
			console.log(this.currItem, '1234',e)
			this.$emit("input",e)
		}
	}
}
</script>