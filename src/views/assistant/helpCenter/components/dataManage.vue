<template>
	<div class="rightContent ml20" v-loading="loading">
		<div class="top-box">
			<iInput 
				class="input" 
				type="text" 
				placeholder="搜索..."
				@keyup.enter.native="search"
				@blur="search"
				v-model="searchKey"
			/>
			<img src="~@/assets/images/search.png" alt="" class="search-icon" @click="search" />
			<iButton class="ask-btn" @click="handleQuestion">{{ language('我要提问') }}</iButton>
		</div>
		<div class="mt15 line"></div>
		<div class="title">{{ currMoudleName ? language(`${currMoudleName}`) : '' }}</div>
		<div class="line"></div>
		<div v-show="false" ref="tempHtml" v-html="currModuleDetailData"></div>
		<div class="editor-box" v-html="content"></div>
	</div>
</template>

<script>
import { iInput, iButton } from 'rise';
export default {
	name: "DataManage",
	components: {
		iInput,
		iButton
	},
	props: {
		loading: {
			type: Boolean,
			default: false
		},
		currMoudleName: {
			type: String,
			default: ''
		},
		currModuleDetailData: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			searchKey: "",
			searchHead: 0,
			content:""
		}
	},
	watch:{
		currModuleDetailData(){
			this.content = this.changeColor()
		},
	},
	methods: {
		handleQuestion() {
			this.$emit('handleQuestion')
		},
		search() {
			this.content = this.changeColor()
			this.$nextTick(() => {
				document.querySelectorAll('.searchActive')[0] && document.querySelectorAll('.searchActive')[0].scrollIntoViewIfNeeded()
			})
		},
		changeColor() {
			if(this.searchKey){
				let temp = document.createElement('div')
				temp.innerHTML = this.currModuleDetailData
				let el = document.createElement('div')
				el.innerHTML = ""
				Array.from(temp.childNodes).forEach(e => {
					let innerText = e.innerText
					if(innerText.includes(this.searchKey)){
						e.innerHTML = innerText.replace(new RegExp(this.searchKey, 'g'),'<a id="seach" class="searchActive" style="color:red">' + this.searchKey + '</a>')
					}
					el.appendChild(e)
				})
				return el.innerHTML
			}else{
				return this.currModuleDetailData
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import "../../comon.scss";
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
			font-size: 16px;
			font-weight: bold;
			color: #000000;
		}
		.editor-box {
			width: 100%;
			height: calc(100% - 150px);
			// border: 1px solid red;
			overflow-y: auto;
			white-space: pre-line;
		}
	}
</style>