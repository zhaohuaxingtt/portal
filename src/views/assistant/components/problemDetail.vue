<template>
  <div class='detail-content'>
		<div class="ask-btn">
			<iButton>{{ language('我要提问') }}</iButton>
		</div>
		<div class="detail-title flex flex-column items-start">
			<div class="moudle-name">主数据管理</div>
			<div class="flex flex-wrap label-box">
				<div v-for="(item, idx) in labelList" :key="idx" class="item-label" :class="labelIdx===idx ? 'activeIdx' : 'idx'" @click="handleLabel(item, idx)">
					{{ item.label }}
				</div>
			</div>
		</div>

		<div class="list-content" v-show="currentFlag === 'listPage'">
			<div class="flex flex-row label-title items-center">
				<div class="blue-box"></div>
				<div class="label-text">{{ labelText }}</div>
			</div>
			<div class="flex flex-column problem-box">
				<div v-for="(item, idx) in problemList" :key="idx" class="item-problem flex flex-row items-center" @click="handleProbelm(item, idx)">
					<div class="blue-box"></div>
					<div class="problem-text">{{ `【热门】${item.problem}` }}</div>
				</div>
			</div>
		</div>

		<div class="detail" v-show="currentFlag === 'detailPage'">
			<div class="flex flex-row detail-box items-center">
				<div class="black-box"></div>
				<div class="detail-text">{{ problemText }}</div>
			</div>
			<div class="des-box">
				<div class="des-title">{{ problemText }}</div>
				<div class="des-detail">{{ desDetail }}</div>
			</div>
			<AttachmentDownload />
			<div class="tip">{{ text }}</div>
		</div>

	</div>
</template>

<script>
import AttachmentDownload from '../components/attachmentDownload'
import {
	iButton
} from 'rise'
export default {
  name: 'ProblemDetail',
	components: {
		iButton,
		AttachmentDownload
	},
	data() {
		return {
			labelList: [
				{label: '全部', key: '-1'},
				{label: "车型", key: '0'},
				{label: "零件信息", key: '1'},
				{label: "MTZ材料", key: '2'},
				{label: "供应商主数据", key: '3'}
			],
			problemList: [
				{problem: '常用计量单位和基础计量单位的转换关系是什么？', key: '-1'},
				{problem: '保存时，提示未填写BMG怎么办？', key: '0'},
				{problem: '零件材料组如何与工艺组的关联关系是什么？', key: '1'}
			],
			labelIdx: 0,
			labelText: '全部',
			currentFlag: 'listPage',
			problemText: '',
			desDetail: '供应商一共分成三类：一般，生产，共用 一般：',
			text: '此回答是否解决了您的问题?'
		}
	},
	methods: {
		handleLabel(item, idx) {
			console.log(item, "item")
			this.labelIdx = idx
			this.labelText = item.label
		},
		handleProbelm(item, idx) {
			console.log(item, idx, "item")
			this.currentFlag = 'detailPage'
			this.problemText = item.problem
		}
	}
}
</script>

<style lang="scss" scoped>
@import "../comon.scss";
	.detail-content {
		padding: 30px 40px 20px 40px;
		.ask-btn {
			float: right;
		}
		.detail-title {
			margin-top: 60px;
			width: 100%;
			padding-bottom: 30px;
			border-top: 1px dotted rgba(112, 112, 112, 0.14901960784313725);;
			border-bottom: 1px dotted rgba(112, 112, 112, 0.14901960784313725);;
			.moudle-name {
				margin-top: 24px;
				font-size: 20px;
				font-weight: bold;
				line-height: 26px;
				color: #000000;
			}
			.label-box {
				margin-top: 32px;
				.item-label {
					height: 20px;
					line-height: 20px;
					margin-right: 30px;
					margin-bottom: 10px;
					cursor: pointer;
				}
				.activeIdx {
					color: #1763F7;
					font-weight: bold;
					font-size: 18px;
				}
				.idx {
					color: #909091;
					font-size: 14px;
				}
			}
		}
		.list-content {
			margin-top: 40px;
			.label-title {
				.label-text {
					margin-left: 16px;
					font-size: 18px;
					color: #1660F1;
					text-decoration: underline;
				}
			}
			.problem-box {
					margin-top: 30px;
					.item-problem {
						margin-bottom: 30px;
						.problem-text {
							margin-left: 16px;
							font-size: 18px;
							font-weight: bold;
							color: #222222;
							cursor: pointer;
						}
					}
				}
		}
		.detail {
			margin-top: 40px;
			.detail-box {
				.detail-text {
					margin-left: 16px;
					font-size: 18px;
					color: #000000;
					font-weight: bold;
				}
			}
			.des-box {
				margin-top: 30px;
				margin-bottom: 20px;
				width: 100%;
				padding: 20px;
				border: 1px solid #F2F2F2;
				opacity: 1;
				border-radius: 2px;
				.des-title {
					font-size: 18px;
					color: #000000;
				}
				.des-detail {
					margin-top: 20px;
					color: #666666;
					font-size: 14px;
					padding-bottom: 30px;
				}
			}
			.tip {
				margin-top: 30px;
				width: 100%;
				height: 40px;
				font-size: 20px;
				line-height: 40px;
				text-align: center;
				color: #666666;
			}
		}
	}
	.blue-box {
		width: 8px;
		height: 8px;
		background: #1763F7;
		opacity: 1;
		border-radius: 50%;
	}
	.black-box {
		width: 8px;
		height: 8px;
		background: #000000;
		opacity: 1;
		border-radius: 50%;
	}
</style>