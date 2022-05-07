<template>
	<el-switch
        :disabled="!disabledActive"
		v-model="currVal"
		active-text="Y" 
		:inactive-text="language(inactiveText)"
		@change="handlePublishChange"
	></el-switch>
</template>

<script>
import {setSwitch} from '@/store/module/approval.js'
export default {
	name: 'iSwitch',
	props: {
        disabledActive:{
          type: Boolean,
        },
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
			// this.$emit("input",e)
			this.$store.dispatch("setSwitch",{id:this.currItem.id,bool:e,coordinate:this.currItem.uniqueId,isParentNodeActive:this.currItem.isParentNodeActive})
		}
	}
}
</script>