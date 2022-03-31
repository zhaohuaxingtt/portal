<!--
* @author:shujie
* @Date: 2021-4-14 17:00:43
* @Description: FRM评级
 -->
<template>
	<div class="frm">
		<baseInfo ref="basic"></baseInfo>
		<iCard class="margin-top20">
			<iFormGroup row="3">
				<iFormItem v-for="(item, index) in frmTitle"
						:key="index"
						:label="item.language ? $t(item.language) : item.name"
						v-permission="item.permission"
						>
					<iText v-if="item.key !=='deepCommentResult'">{{dataList[item.key]}}</iText>
					<iText v-else>
						<icon
							v-if="dataList[item.key] == 'GREEN'"
							symbol
							name="iconlvdeng"
						></icon>
						<icon
							v-else-if="dataList[item.key] == 'YELLOW'"
							symbol
							name="iconhuangdeng"
						></icon>
						<icon
							v-else-if="dataList[item.key] == 'RED'"
							symbol
							name="iconhongdeng"
						></icon>
					</iText>
				</iFormItem>
			</iFormGroup>
		</iCard>
	</div>
</template>
<script>
import { iFormGroup, iFormItem, iText,iCard,iMessage,icon } from "rise";

import {frmTitle} from "./components/data.js";
import baseInfo from "../components/baseInfoCard";

import { getFrmRating } from "@/api/supplier360/frm"

export default{
	components:{
		iCard,baseInfo,iFormGroup,iFormItem,iText,icon
	},
	data() {
		return {
			frmTitle,
			dataList:{},
		}
	},
	created(){
		this.getList();
	},
	methods:{
		getList(){
			getFrmRating({
				supplierToken:this.$route.query.supplierToken
			}).then(res=>{
				if(res.result){
					this.dataList = res.data;
				}
			})
		},
	},
}
</script>

<style lang="scss" scoped>

</style>

