<template>
	<el-table ref="multipleTable" fit tooltip-effect="light" :border="border" :height="height" :data="tableData" v-loading="tableLoading" @selection-change="handleSelectionChange" empty-text="暂无数据" @select="handleSelect" @select-all="handleSelectAll" :cell-style="borderLeft">
		<!-- <el-table-column type="selection" width="50" align="center"></el-table-column> -->
		<template v-for="(items, index) in tableTitle">currPayNum
			<!-- 可编辑列 -->
			<el-table-column :key="index" :align="center" :show-overflow-tooltip="items.tooltip" v-if="items.props == 'currPayNum'" :prop="items.props" :label="$t(items.key)" :width="items.width">
				<template slot="header">
					<span class="el-form-itemnext">{{ language('BENCIZHIFUSHULIANG','本次支付数量') }}</span>
				</template>
				<template slot-scope="scope">
					<iInput v-model="scope.row['currPayNum']" />
				</template>
			</el-table-column>
			<!-- 正常列 -->
			<el-table-column :key="index" :align="center" v-else :show-overflow-tooltip="items.tooltip" :width="items.width" :label="$t(items.key)" :prop="items.props">
			</el-table-column>
		</template>
	</el-table>
</template>
<script>
import { iInput } from "rise";
export default {
	// components:{ iInput },
	props:{
		tableTitle: { type: Array },
		isEdit: { type: Boolean, default: false },
		tableData: { type: Array },
		border: { type: Boolean, default: false },
		height: { type: Number || String }
	},
	inject:['vm'],
	components: { iInput },
	methods: {

	}
}
</script>
<style lang="scss" scoped>
.el-form-itemnext {
  &:after {
    text-align: center;
    content: '*';
    padding-left: 0.5rem;
    color: $color-delete;
    // margin-right: 0.25rem;
    display: inline-block;
    vertical-align: middle;
  }
}
</style>