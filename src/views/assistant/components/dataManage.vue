<template>
	<div class="rightContent ml20">
		<div class="top-box">
			<iInput 
				class="input" 
				type="text" 
				placeholder="搜索..."
				@keyup.enter.native="search"
				v-model="searchKey"
			/>
			<img src="~@/assets/images/search.png" alt="" class="search-icon" />
			<div class="ask-btn">我要提问</div>
		</div>
	</div>
</template>

<script>
import { iInput } from 'rise';
export default {
	name: "DataManage",
	components: {
		iInput
	},
	data() {
		return {
			searchKey: ""
		}
	},
	methods: {
		search() {
			console.log(this.searchKey)
		}
	}
}
</script>

<style lang="scss" scoped>
@import "../comon.scss";
	.rightContent {
		width: 100%;
		height: 100%;
		background: #FFFFFF;
		box-shadow: 0px 0px 10px rgba(27, 29, 33, 0.08);
		opacity: 1;
		border-radius: 5px;
		padding: 30px 40px 20px 40px;
		.top-box {
			height: 50px;
			display: flex;
			position: relative;
			.input {
				width: 85%;
			}
			.search-icon {
				position: absolute;
				width: 20px;
				height: 20px;
				top: 8px;
				right: 17%;
			}
			.ask-btn {
				width: 10%;
				height: 36px;
				line-height: 36px;
				text-align: center;
				background: #EEF2FB;
				color: #1660F1;
				margin-left: 3%;
			}
			
		}
	}
</style>