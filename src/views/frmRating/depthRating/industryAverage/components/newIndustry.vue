<!--
 * @author: shujie
 * @createTime: 2021-5-25 14:20:26
 * @Description:新建行业
 -->
<template>
	<!--新建行业-->
	<iDialog :title="$t('SPR_FRM_DEP_XJHY')" :visible.sync="value" width="90%" @close="clearDiolog">
		<div class="content">
			<!-- 行业名称 -->
			<div class="flex-between-center margin-bottom20">
				<div class="flex-align-center">
					<span class="nowIndustry">{{ $t("SPR_FRM_DEP_HYMC") }}</span>
					<iInput v-model="typeName"></iInput>
				</div>
				<iButton @click="save">{{ $t("LK_BAOCUN") }}</iButton>
			</div>
			<el-table ref="dataTable" :data="fieldList" :selection="false" :tableTitle="newTableTitle"
				:tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange">
				<el-table-column :prop="item.props" :label="$t(item.key)" align="center"
					v-for="(item, index) in newTableTitle" :key="index">
					<el-table-column :prop="val.props" :label="val.name" align="center" v-for="(val, i) in item.sub"
						:key="i">
						<template slot-scope="scope">
							<iInput v-float v-model="scope.row[val.props]" @change="updateData(scope, item, val, $event)">
							</iInput>
						</template>
					</el-table-column>
				</el-table-column>
			</el-table>
		</div>
	</iDialog>
</template>

<script>
	import {
		iDialog,
		iButton,
		iInput,
		iMessage
	} from "rise";
	import {
		tableTitle,
		fieldList
	} from "./data";
	import {
		postAddIndustryType,
		postAddAverageData,
	} from "@/api/frmRating/depthRating/industryAverage.js";
	export default {
		components: {
			iDialog,
			iButton,
			iInput,
		},
		props: {
			value: {
				type: Boolean,
			},
			types:{
				type:Array,
				default:()=>[]
			}
		},
		data() {
			return {
				tableListData: [],
				tableLoading: false,
				typeName: "",
				typeId: "",
				dataList: [],
				fieldList: window._.cloneDeep(fieldList),
			};
		},
		methods: {
			clearDiolog() {
				this.fieldList=window._.cloneDeep(fieldList);
				this.typeName = "";
				this.dataList = [];
				this.$emit("input", -1);
			},
			updateData(all, total, sub, value) {
				const metric = all.row.props;
				const type = window._.find(
					this.dataList,
					(item) => item.averageType === total.props && item.year === sub.name
				);
				if (type) {
					this.dataList = this.dataList.map((item) => {
						if (item.year === sub.name && item.averageType === total.props) {
							item[metric] = value;
						}
						return item;
					});
				} else {
					const item = {};
					item[metric] = value;
					item.averageType = total.props;
					item.year = sub.name;
					this.dataList.push(item);
				}
			},
			save() {
				if (this.typeName !== "") {
					let result=this.types.some((item)=>item.industryName==this.typeName)
					if (result) {
						iMessage.warn(this.$t('SPR_FRM_DEP_INPUTERROR'))
						return
					}
					postAddIndustryType({
							averageIndustryName: this.typeName,
						})
						.then((result) => {
							if (
								result.data !== null &&
								result.data.industryName === this.typeName
							) {
								this.typeId = result.data.id;
								this.saveData();
							} else {
								this.$message.error(result.desZh);
							}
						})
						.catch((err) => {});
				} else {
					this.$message.warning(this.$t('SPR_FRM_DEP_INPUTERROR'));
				}
			},
			saveData() {
				postAddAverageData({
						averageIndustryTypeId: this.typeId,
						dataList: this.dataList,
					})
					.then((result) => {
						if (result.code == 200) {
							this.typeName = "";
							this.dataList = [];
							this.$emit("input", this.typeId);
						} else {
							this.$message.error(result.desZh);
						}
					})
					.catch((err) => {});
			},
		},
		computed: {
			newTableTitle() {
				const nowYear = Number(window.moment().year());

				return tableTitle.map((item) => {
					if (item.name !== "") {
						const sub = [];
						for (let i = 5; i > 0; i--) {
							sub.push({
								name: nowYear - i,
								props: item.name + (nowYear - i),
							});
						}
						item.sub = sub;
					}
					return item;
				});
			},
		},
	};
</script>

<style scoped lang="scss">
	.content {
		padding-bottom: 20px;
	}

	.nowIndustry {
		width: 124px;
		margin-right: 30px;
	}
</style>
