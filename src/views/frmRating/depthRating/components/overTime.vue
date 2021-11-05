<!--
 * @author: shujie
 * @createTime: 2021-6-2 09:56:46
 * @Description:预计完成时间
 -->
 <template>
	<iDialog :title="$t(title)" :visible.sync="value" width="400px" @close='clearDiolog' top="40vh">
		<p class="tip margin-bottom10">{{tip}}</p>
		<iDatePicker value-format='yyyy-MM' type='month' v-model='inquiryBuyer'></iDatePicker>
		<span slot="footer" class="dialog-footer">
			<iButton @click="$emit('input',false)">{{$t('LK_QUXIAO')}}</iButton>
			<iButton @click="sureChangeItems">{{$t('LK_QUEREN')}}</iButton>
		</span>
	</iDialog>
</template>
<script>
	import {
		iDatePicker,
		iButton,
		iMessage,
		iDialog
	} from 'rise';
	import {reportIssueUser} from '@/api/frmRating/depthRating';
	export default {
		components: {
			iDatePicker,
			iButton,
			iDialog
		},
		props: {
			title: {
				type: String,
				default: ''
			},
			value: {
				type: Boolean
			},
			tip: {
				type: String
			}
		},
		data() {
			return {
				inquiryBuyer:"",
			}
		},
		methods: {
			clearDiolog() {
				this.inquiryBuyer = ""
				this.$emit('input', false)
			},
			sureChangeItems() {
				if (!this.inquiryBuyer) return iMessage.warn(this.$t('LK_NINDANGQIANHAIWEIXUANZEXUNJIACAIGOUYUAN'))
				this.$emit('sure', this.inquiryBuyer)
			},
		}
	}
</script>
<style lang='scss' scoped>
	.tip {
		font-size: 14px;
		color: $color-black;
	}
</style>
