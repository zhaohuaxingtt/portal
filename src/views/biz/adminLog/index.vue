<template>
	<iPage>
		<pageHeader class="margin-bottom20">系统管理员日志</pageHeader>
		<iSearch @sure="search" @reset="reset">
			<el-form :model="form" ref="form" class="search-form" :inline="true" size="normal">	
				<div class="form-item">
					<iLabel class="label" :label="language('模块菜单')" slot="label"></iLabel>
					<iSelect v-model="form.module" class="w-220" filterable clearable>
						<el-option
							v-for="item in typeOptions"
							:label="item.label"
							:value="item.value"
							:key="item.value"
						/>
					</iSelect>
				</div>
				<div class="form-item">
					<iLabel class="label" :label="language('操作类型')" slot="label"></iLabel>
					<iSelect v-model="form.type" class="w-220" filterable clearable>
						<el-option
							v-for="item in operationTypes"
							:label="item.value"
							:value="item.code"
							:key="item.code"
						/>
					</iSelect>
				</div>
				<div class="form-item">
					<iLabel class="label" :label="language('日志类别')" slot="label"></iLabel>
					<iSelect v-model="form.category" class="w-220" filterable clearable>
						<el-option
							v-for="item in logTypes"
							:label="item.value"
							:value="item.code"
							:key="item.code"
						/>
					</iSelect>
				</div>
				<div class="form-item">
					<iLabel class="label" :label="language('触发类型')" slot="label"></iLabel>
					<iSelect v-model="form.triggerType" class="w-220" filterable clearable>
						<el-option
							v-for="item in triggerTypes"
							:label="item.value"
							:value="item.code"
							:key="item.code"
						/>
					</iSelect>
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
                        @change="dateChange"
						clearable
					/>
				</div>
                <div class="form-item">
					<iLabel class="label" :label="language('对接外部系统')" slot="label"></iLabel>
					<iSelect v-model="form.interfaceSystem" class="w-220" filterable clearable>
						<el-option
							v-for="item in interfaceSystemList"
							:label="item.value"
							:value="item.code"
							:key="item.code"
						/>
					</iSelect>
				</div>
                <div class="form-item">
					<iLabel class="label" :label="language('业务编号')" slot="label"></iLabel>
					<iInput v-model="form.claEntity" class="w-220" :placeholder="language('请输入')" />
				</div>
				<div class="form-item">
					<iLabel class="label" :label="language('操作内容')" slot="label"></iLabel>
					<iInput v-model="form.content" class="w-220" :placeholder="$t('请输入')" />
				</div>
				<div class="form-item">
					<iLabel class="label" :label="language('岗位')" slot="label"></iLabel>
					<iInput v-model="form.userPosition" class="w-220" :placeholder="$t('请输入')" />
				</div>
				<div class="form-item">
					<iLabel class="label" :label="language('接口名称')" slot="label"></iLabel>
					<iInput v-model="form.interfaceName" class="w-220" :placeholder="$t('请输入')" />
				</div>
				<div class="form-item">
					<iLabel class="label" :label="language('用户')" slot="label"></iLabel>
					<iInput v-model="form.userRole" class="w-220" :placeholder="$t('请输入')" />
				</div>
				<div class="form-item">
					<iLabel class="label" :label="language('接口流水号')" slot="label"></iLabel>
					<iInput v-model="form.interfaceSerial" class="w-220" :placeholder="$t('请输入')" />
				</div>
				<!-- <div class="form-item">
					<iLabel class="label" :label="language('日志编号')" slot="label"></iLabel>
					<iInput v-model="form.no" class="w-220" :placeholder="$t('请输入')" />
				</div> -->
				<div class="form-item">
					<iLabel class="label" label="" slot="label"></iLabel>
                    <el-checkbox v-model="form.success" label="" :indeterminate="false" @change="statusChange">是否成功</el-checkbox>
				</div>
			</el-form>
		</iSearch>
		<iCard class="mar-t20">
			<div class="log-btns">
				<iButton>{{language('导出')}}</iButton>
			</div>
			<CommonTable ref="table" :extraData="extraData" :tableColumns="tableColumns" :params="form"></CommonTable>
		</iCard>
  </iPage>
</template>

<script>
import pageHeader from '@/components/pageHeader'
import { iPage,iSearch, iInput, iDatePicker, iSelect, iCard, iLabel, iButton} from 'rise'
import { OPERA_TYPES } from './../utils/constants';
import CommonTable from './../components/CommonTable.vue';
import tableColumns from './table';
import {listCategory,listOperation,listInterfaceSystem,listTriggerType} from '@/api/biz/log';
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
		iButton,
		CommonTable
	},
	data() {
		return {
			form:{},
			typeOptions:OPERA_TYPES,
			tableColumns,
            extraData:{
                detail:this.detail
            },
            date:"",
            logTypes:[],
            operationTypes:[],
            interfaceSystemList:[],
            triggerTypes:[]
		}
	},
    created(){
        this.restForm()
        this.$nextTick(() => {
            this.search()
        })
        this.init()
    },
	methods: {
        async init(){
            // 日志类别
            let logRes = await listCategory()
            this.logTypes = logRes.data || []
            // 操作类型
            let operRes = await listOperation()
            this.operationTypes = operRes.data || []
            // 对接外部系统
            let sysRes = await listInterfaceSystem()
            this.interfaceSystemList = sysRes.data || []
            // 触发类型
            let triRes = await listTriggerType()
            this.triggerTypes = triRes.data || []
        },
		restForm(){
			this.form = {
				module:"",
                type:"",
                category:"",
                triggerType:"",
                interfaceSystem:"",
                claEntity:"",
                content:"",
                userPosition:"",
                interfaceName:"",
                userRole:"",
                interfaceSerial:"",
                createDate_gt:"",
                createDate_le:"",
                success:false
			}	
		},
		reset() {
            this.restForm()
			this.search()
		},
		search() {
            this.$refs.table.query()
		},
		query(page){
			console.log(page);
            this.loading = true
            setTimeout(() => {
                this.loading = false
            }, 1000);
		},
        detail(v){
            console.log(v);
        },
        dateChange(date){
            this.form.createDate_gt = date ? date[0] : ""
            this.form.createDate_le = date ? date[1] : ""
        },
        statusChange(){
            this.search()
        }
	}
}
</script>

<style lang="scss" scoped>
@import "./../common.scss";
</style>
