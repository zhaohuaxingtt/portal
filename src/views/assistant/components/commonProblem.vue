<template>
	<div class="leftContent" v-loading="loading">
		<slot name="top"></slot>
		<div class="list">
			<div class="listTitle" v-text="title"></div>
			<div 
				class="listContent"
				ref="loadList"
				v-infinite-scroll="load"
				infinite-scroll-distance="20"
				infinite-scroll-disabled="disabled"
				>
				<div v-for="(menu, index) in moudleList" :key="index" class="itemMenu flex flex-row items-center justify-start cursor" :class="[currentMoudleId === menu[idKey] ? 'findBgc' : '','item_'+menu[idKey]]" @click="select(menu,index)">
					<div class="idx">{{ index + 1 }}</div>
					<i v-if="showIcon" class="icon" :class="[rank[index] ? rank[index] : '']"></i>
					<div class="flex-1">{{ menu[nameKey] }}</div>
					<div class="block"></div>
				</div> 
				<div v-if="!loading && moudleList.length == 0" class="no-data">暂无数据</div>
				<p v-if="loading" class="no-data" style="margin: 10px 0;">加载中...</p>
				<div v-if="moudleList.length != 0 && noMore && !loading" class="no-data" style="margin: 10px 0;">没有更多了</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CommonProbelm',
	props: {
		moudleList: {
			type: Array,
			default: () => []
		},
		currentMoudleId: {
			type: Number,
			default: 0
		},
		title:{
			type:String,
			default:"常见问题"
		},
		showIcon: {
			type: Boolean,
			default: false
		},
		loading: {
			type: Boolean,
			default: false
		},
		nameKey:{
			type:String,
			default:"menuName"
		},
		idKey:{
			type:String,
			default:"id"
		},
		loadmore:{
			type:Boolean,
			default: false
		},
		noMore:{
			type:Boolean,
			default: false
		}
	},
	data() {
		return {
			rank:{
				0:"first",
				1:"second",
				2:"third"
			}
		}
	},
	watch:{
		currentMoudleId(n){
			document.querySelector(".item_"+n).scrollIntoViewIfNeeded()
		}
	},
	computed:{
		disabled () {
			return this.loading || this.noMore
		}
	},
	mounted() {

	},
	methods: {
		select(menu){
			// this.$emit("update:currentMoudleId", menu[this.idKey])
			this.$emit("change", menu)
		},
		load(){
			if(!this.loadmore) return
			this.$emit("onLoad")
		}
	},
}
</script>

<style lang="scss" scoped>
@import "../comon.scss";
	.leftContent {
		width: 28%;
		min-width: 260px;
		display: flex;
		flex-direction: column;
		min-height: 100%;
		background: #FFFFFF;
		box-shadow: 0px 0px 10px rgba(27, 29, 33, 0.08);
		opacity: 1;
		border-radius: 5px;
		padding: 20px 20px;
		overflow: hidden;
		.list {
			height: 100%;
			display: flex;
			flex-direction: column;
			overflow: hidden;
			.listTitle {
				height: 50px;
				background-color: rgba(22, 96, 241, 0.1);
				border-radius: 5px 5px 0px 0px;
				color: #000000;
				font-size: 14px;
				text-align: center;
				line-height: 50px;
				font-weight: bold;
				margin-top: 20px;
			}
			.listContent {
				flex: 1;
				overflow: auto;
				.itemMenu {
					width: 100%;
					// min-height: 30px;
					padding: 5px 10px;
					padding-left: 30px;
					font-size: 400;
					cursor: pointer;
					transition: all .1s ease;
					.idx {
						width: 60px;
					}
					
				}
				.itemMenu:nth-child(even){
					background: #F7FAFF;
					color: #000000;
				}
				.itemMenu:nth-child(odd){
					background: #FFFFFF;
					color: #000000;
				}
			}
		}
	}
	.icon {
		margin-right: 20px;
		width: 28px;
		height: 28px;
		background-size: contain;
		background-repeat: no-repeat;
		&.first{
			background-image: url('~@/assets/images/icon/first.png');
		}
		&.second{
			background-image: url('~@/assets/images/icon/second.png');
		}
		&.third{
			background-image: url('~@/assets/images/icon/third.png');
		}
	}
	.no-data{
		text-align: center;
		margin-top: 100px;
		font-size: 12px;
		color: #999;
	}
	.block {
		height: 50px;
		width: 1px;
		margin-left: auto;
	}

	.findBgc {
		background: #1660F1 !important;
		color: #FFFFFF !important;
	}
</style>