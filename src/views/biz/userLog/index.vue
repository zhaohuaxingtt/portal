<template>
	<iPage>
		<pageHeader class="margin-bottom20">业务用户日志</pageHeader>
		<iSearch @sure="search" @reset="reset">
			<el-form :model="form" ref="form" class="search-form" :inline="true" size="normal">	
				<div class="form-item">
					<iLabel class="label" :label="language('操作类型')" slot="label"></iLabel>
					<iSelect v-model="form.type" class="w-220" filterable clearable>
						<el-option
							v-for="item in operationTypes"
							:label="item.label"
							:value="item.value"
							:key="item.value"
						/>
					</iSelect>
				</div>
				<div class="form-item">
					<iLabel class="label" :label="language('操作人')" slot="label"></iLabel>
					<iInput v-model="form.creator" class="w-220" :placeholder="language('请输入')" />
				</div>
				<div class="form-item">
					<iLabel class="label" :label="language('时间筛选')" slot="label"></iLabel>
					<iDatePicker
						v-model="date"
						:start-placeholder="language('开始日期')"
						:end-placeholder="language('结束日期')"
						type="daterange"
						format="yyyy-MM-dd"
						range-separator="至"
						value-format="yyyy-MM-dd"
						style="width:320px"
						clearable
						@change="dateChange"
					/>
				</div>
				<div class="form-item">
					<iLabel class="label" :label="language('业务编号')" slot="label"></iLabel>
					<iInput v-model="form.bizId" class="w-220" :placeholder="language('请输入')" />
				</div>
				<div class="form-item">
					<iLabel class="label" :label="language('操作内容')" slot="label"></iLabel>
					<iInput v-model="form.content_like" class="w-220" :placeholder="language('请输入')" />
				</div>
				<div class="form-item">
					<iLabel class="label" :label="language('日志编号')" slot="label"></iLabel>
					<iInput v-model="form.id" class="w-220" :placeholder="language('请输入')" />
				</div>
			</el-form>
		</iSearch>
		<iCard class="mar-t20">
			<div class="log-btns">
                <button-download :download-method="exportExcel" />
			</div>
			<CommonTable ref="table" :tableColumns="tableColumns" :extraData="extraData" :params="form"></CommonTable>
		</iCard>
  </iPage>
</template>

<script>
import pageHeader from '@/components/pageHeader'
import { iPage,iSearch, iInput, iDatePicker, iSelect,iCard, iLabel } from 'rise'
import CommonTable from './../components/CommonTable.vue';
import tableColumns from './table';
import {listOperation,exportBizLog} from '@/api/biz/log';

export default {
	components: { 
		iPage,
		pageHeader,
		iSearch,
		iInput,
		iDatePicker,
		iSelect,
		iCard,
		iLabel,
		CommonTable
	},
	data() {
		return {
			form:{},
			tableColumns,
			operationTypes:[],
			date:"",
			extraData:{
                msgDetail:this.msgDetail
            }
		}
	},
	created(){
        this.restForm()
		this.init()
        this.$nextTick(() => {
            this.search()
        })
    },
	methods: {
		async init(){
            // 操作类型
            let operRes = await listOperation()
            this.operationTypes = operRes.data || []
        },
		restForm(){
			return new Promise((resolve) => {
				this.form = {
					type:"",
					creator:"",
					bizId:"",
					content_like:"",
					createDate_gt:"",
					createDate_le:"",
					id:""
				}	
				this.date = ""
				resolve()
			})
		},
		exportExcel(){
            return exportBizLog({ extendFields: this.form })
        },
		async reset() {
            await this.restForm()
			this.search()
		},
		search() {
            this.$refs.table.query()
		},
		dateChange(date){
            this.form.createDate_gt = date ? date[0] : ""
            this.form.createDate_le = date ? date[1] : ""
        }
	}
}
</script>

<style lang="scss" scoped>
@import "./../common.scss";
</style>
