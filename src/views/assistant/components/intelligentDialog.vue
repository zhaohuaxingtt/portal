<template>
	<iDialog
		:visible.sync="intelligentVisible"
		:title="intelligentTitle"
		@close="clearDialog"
		width="60%"
	>
		<div class="chat-box">
			<div v-for="(item, idx) in chatList" :key="idx">
				<div class="flex flex-row" :class="(idx+1) % 2 === 0 ? 'rightContent' : 'leftContent'">
					<div>
						<img src="~@/assets/images/inte-admin.png" alt="" class="icon">
					</div>	
					<div class="flex flex-column justify-end" :class="(idx+1) % 2 === 0 ? 'right-box' : 'left-box'">
						<div :class="(idx+1) % 2 === 0 ? 'rightText' : 'leftText'">{{ (idx+1) % 2 === 0 ? '自己' : '管理员'}}</div>
						<div></div>
					</div>
				</div>
			</div>
		</div>
	</iDialog>
</template>

<script>
import { iDialog } from 'rise'

export default {
	name:'intelligentDialog',
	components:{ iDialog },
	props: {
		intelligentVisible: {
      type: Boolean,
      default: false
    }
	},
	data() {
		return {
			intelligentTitle: '智能问答',
			chatList: [
				'1', '2'
			]
		}
	},
	methods: {
		clearDialog() {
			this.$emit('closeDialog', false)
		}
	}
}
</script>

<style lang="scss" scoped>
	@import "../comon.scss";
	.chat-box {
		padding: 40px;
		background: #F8F9FA;
	}
	.icon {
		width: 30px;
		height: 30px;
	}
	.item-box {
		padding: 14px;
	}
	.rightContent {
		display: flex;
		flex-direction: row-reverse;
	}
	.leftContent {
		justify-content: flex-start
	}
	.rightText {
		text-align: right;
	}
	.right-box {
		margin-right: 10px;
	}
	.left-box {
		margin-left: 10px;
	}
</style>