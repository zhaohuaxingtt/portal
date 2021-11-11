<template>
	<iCard  v-permission="SUPPLIER_BAKN_TABLE_NOTES" :title="$t('SHOUXINYINHANGXINXIBUCONGSHUOMING')" class="margin-top20" tabCard>
		<template slot="header-control">
			<iButton @click="saveAdditionalInfo">{{$t('LK_BAOCUN')}}</iButton>
		</template>
		<iInput type="textarea" :autosize='{minRows:4}' v-model='notes'></iInput>
	</iCard>
</template>

<script>
	import {iCard,iInput,iButton,iMessage} from 'rise';
	import {saveAdditionalInfo, getAdditionalInfo} from '@/api/supplier360/supplierAdditional'
	export default{
		components:{
			iCard,iInput,iButton
		},
		data() {
			return {
				notes:""
			}
		},
		created(){
			this.getAdditionalInfo()
		},
		methods:{
			// 获取备注信息
			getAdditionalInfo(){
				let data={
					additionalType:'bank',
					detail:this.notes
				}
				getAdditionalInfo(data).then(res=>{
					if (res.data) {
						this.notes=res.data.detail
					}
				}).catch()
			},
			// 修改保存备注信息
			saveAdditionalInfo(){
				let data={
					additionalType:'bank',
					detail:this.notes
				}
				saveAdditionalInfo(data).then(res=>{
					if (res.data) {
						iMessage.success('保存成功')
					}
				}).catch(()=>{iMessage.error('保存成功')})
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
