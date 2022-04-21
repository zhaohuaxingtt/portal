<template>
	<iCard :title="$t('GUDONG_JITUANYUGUANLIANGONGSIBUCHONGSHUOMING')" class="margin-top20" tabCard>
		<template slot="header-control">
			<iButton  v-if="$route.query.subSupplierType!=='GP'" v-permission="SUPPLIER_COMPANY_RELATEDCOMPANY_REMARK_SAVE" @click="saveAdditionalInfo">{{$t('LK_BAOCUN')}}</iButton>
			<iButton  v-if="$route.query.subSupplierType=='GP'" v-permission="SUPPLIER_COMPANY_RELATEDCOMPANY_REMARK_SAVE_GP" @click="saveAdditionalInfo">{{$t('LK_BAOCUN')}}</iButton>
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
					additionalType:'group',
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
					additionalType:'group',
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
