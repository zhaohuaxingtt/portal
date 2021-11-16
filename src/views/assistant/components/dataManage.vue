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
		<div class="mt15 line"></div>
		<div class="title">{{ moudleName }}</div>
		<div class="line"></div>
		<div class="editor-box"></div>
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
			searchKey: "",
			moudleName: '主数据管理'
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
				font-weight: bold;
				color: #1660F1;
				margin-left: 3%;
			}
			
		}
		.mt10 {
			margin-top: 10px;
		}
		.line {
			width: 100%;
			height: 0px;
			border: 1px dotted rgba(112, 112, 112, 0.14901960784313725);
			opacity: 1;
		}
		.title {
			margin: 18px 0px 22px 0px;
			font-size: 20px;
			font-weight: bold;
			color: #000000;
		}
		.editor-box {
			width: 100%;
			height: calc(100% - 120px);
			border: 1px solid red;
			overflow-y: auto;
		}
	}
</style>