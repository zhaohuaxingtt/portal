<template>
  <iCard>
		<div>
			<el-form>
				<el-row :gutter="20">
					<el-col :span="8">
						<iFormItem>
							<iInput v-model="keyword" clearable placeholder="请输入" />
						</iFormItem>
					</el-col>
					<el-col :span="16" :push="12">
						<iFormItem>
							<iButton @click="handleConfirm">{{ language('确定') }}</iButton>
							<iButton @click="handleReset">{{ language('重置') }}</iButton>
						</iFormItem>
					</el-col>
				</el-row>
			</el-form>
		</div>
	</iCard>
</template>

<script>
	import { iCard, iInput, iButton } from 'rise'
export default {

	data () {
		return {
			keyword: ''
		}
	},
	components: {
		iCard,
		iInput,
		iButton
	},
	methods: {
		handleConfirm() {
			this.$emit('handleConfirm', {keyword:this.keyword})
		},
		handleReset() {
			this.keyword = ''
			this.$emit('handleReset', {keyword:this.keyword})
		},
		addGlossary() {
			this.$emit('addGlossary')
		}
	}
}
</script>