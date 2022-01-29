<template>
	<iPage>
		<pageHeader class="margin-bottom20">系统管理员日志</pageHeader>
		<iSearch @sure="search" @reset="reset">
			<el-form :model="form" ref="form" class="search-form" :inline="true" size="normal">	
				<div class="form-item">
					<iLabel class="label" :label="language('模块菜单')" slot="label"></iLabel>
					<iSelect v-model="form.menuId" class="w-220" filterable clearable>
						<el-option
							v-for="item in moduleMenu"
							:label="item.value"
							:value="item.code"
							:key="item.code"
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
					<iSelect v-model="form.category" class="w-220" filterable>
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
					<iSelect v-model="form.triggerType" :disabled="form.category != 2" class="w-220" filterable clearable>
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
					<el-date-picker
						v-model="date"
						:start-placeholder="language('开始日期')"
						:end-placeholder="language('结束日期')"
						type="daterange"
						range-separator="至"
						value-format="yyyy-MM-dd"
						class="p-date"
                        @change="dateChange"
						clearable
					/>
				</div>
                <div class="form-item">
					<iLabel class="label" :label="language('接口对应系统')" slot="label"></iLabel>
					<iSelect v-model="form.interfaceSystemCode" :disabled="form.category != 2" @change="sysChange" class="w-220" filterable clearable>
						<el-option
							v-for="item in interfaceSystemList"
							:label="item.value"
							:value="item.code"
							:key="item.code"
						/>
					</iSelect>
				</div>
                <div class="form-item">
					<iLabel class="label" :label="language('接口名称')" slot="label"></iLabel>
					<iSelect v-model="form.interfaceCode" :disabled="form.category != 2" class="w-220" filterable clearable>
						<el-option
							v-for="item in apiList"
							:label="item.value"
							:value="item.code"
							:key="item.code"
						/>
					</iSelect>
				</div>
                <div class="form-item">
					<iLabel class="label" :label="language('业务编号')" slot="label"></iLabel>
					<iInput v-model="form.bizId" class="w-220" :placeholder="language('请输入')" />
				</div>
				<div class="form-item">
					<iLabel class="label" :label="language('操作内容')" slot="label"></iLabel>
					<iInput v-model="form.content" class="w-220" :placeholder="language('请输入')" />
				</div>
				<div class="form-item">
					<iLabel class="label" :label="language('岗位')" slot="label"></iLabel>
					<iInput v-model="form.userPosition" class="w-220" :placeholder="language('请输入')" />
				</div>
				
				<div class="form-item">
					<iLabel class="label" :label="language('用户')" slot="label"></iLabel>
					<iInput v-model="form.creator" class="w-220" :placeholder="language('请输入')" />
				</div>
				<div class="form-item">
					<iLabel class="label" :label="language('接口流水号')" slot="label"></iLabel>
					<iInput v-model="form.interfaceSerial" class="w-220" :placeholder="language('请输入')" />
				</div>
				<div class="form-item">
					<iLabel class="label" :label="language('日志编号')" slot="label"></iLabel>
					<iInput v-model="form.id" class="w-220" :placeholder="language('请输入')" />
				</div>
				<div class="form-item">
					<iLabel class="label" label="" slot="label"></iLabel>
                    <el-checkbox v-model="form.success" style="margin-top:6px" label="" :indeterminate="false" @change="statusChange">是否成功</el-checkbox>
				</div>
			</el-form>
		</iSearch>
		<iCard class="mar-t20">
			<div class="log-btns">
                <button-download :download-method="exportExcel" />
			</div>
			<CommonTable ref="table" :extraData="extraData" :tableColumns="tableColumns" :params="form"></CommonTable>
		</iCard>

		<detail ref="detail" :show.sync="show" :params="params"></detail>
  </iPage>
</template>

<script>
import pageHeader from '@/components/pageHeader'
import { iPage,iSearch, iInput, iSelect, iCard, iLabel} from 'rise'
import CommonTable from './../components/CommonTable.vue';
import {TABLE} from './table';
import {listCategory,listOperation,listInterfaceSystem,listTriggerType,exportBizLog,listMenu,listInterface} from '@/api/biz/log';
import detail from './detail.vue';
import moment from 'moment';
export default {
	components: { 
		iPage,
		pageHeader,
		iSearch,
		iInput,
		iSelect,
		iCard,
		iLabel,
		CommonTable,
		detail
	},
	data() {
		return {
			form:{},
			tableColumns:TABLE,
            extraData:{
                msgDetail:this.msgDetail
            },
            date:"",
            logTypes:[],
            operationTypes:[],
            interfaceSystemList:[],
            triggerTypes:[],
            moduleMenu:[],
			apiList:[],
            show:false,
			params:{}
		}
	},
    created(){
        this.restForm()
        this.init()
        this.$nextTick(() => {
            this.search()
        })
    },
	watch:{
		"form.category"(n){
			if(n != 2){
				this.$set(this.form, "triggerType", "")
				this.$set(this.form, "interfaceSystemCode", "")
				this.$set(this.form, "interfaceCode", "")
			}
		}
	},
	methods: {
        async init(){
            // 日志类别
            let logRes = await listCategory()
            this.logTypes = logRes.data || []
            // 操作类型
            let operRes = await listOperation()
            this.operationTypes = operRes.data || []
            // 外部所属系统
            let sysRes = await listInterfaceSystem()
            this.interfaceSystemList = sysRes.data || []
            // 触发类型
            let triRes = await listTriggerType()
            this.triggerTypes = triRes.data || []
            // 模块菜单
            let menuRes = await listMenu()
            this.moduleMenu = menuRes.data || []
        },
		restForm(){
			return new Promise((resolve) => {
                this.form = {
                    menuId:"",
                    type:"",
                    category:"1",
                    triggerType:"",
                    interfaceSystemCode:"",
                    bizId:"",
                    content:"",
                    userPosition:"",
                    interfaceCode:"",
                    creator:"",
                    interfaceSerial:"",
                    startDate:"",
                    endDate:"",
                    success:true,
					id:""
                }	
				let end = moment().format('YYYY-MM-DD')
				let start = moment(new Date(end).getTime() - (90 * 24 * 3600 * 1000)).format("YYYY-MM-DD")
				this.date = [start, end]
				this.form.startDate = start
				this.form.endDate = end
                resolve()
            })
		},
		async reset() {
            await this.restForm()
			this.search(true)
		},
		search(t) {
            this.$refs.table.query(t)
		},
        exportExcel(){
            return exportBizLog({ extendFields: this.form })
        },
		// 查看详情
        msgDetail(row){
			if(!row.traceId) return this.$message.success("没有关联信息")
			this.params = {
				traceId:row.traceId,
				category:row.category
			}
			this.show = true
			this.$nextTick(() => {
				this.$refs.detail.query()
			})
        },
        dateChange(date){
            this.form.startDate = date ? date[0] : ""
            this.form.endDate = date ? date[1] : ""
        },
        statusChange(){
            this.search()
        },
		async sysChange(v){
			// 获取接口名称
			this.form.interfaceCode = ""
			let res = await listInterface(v)
			this.apiList = res.data
		}
	}
}
</script>

<style lang="scss" scoped>
@import "./../common.scss";
.p-date{
	width: 485px !important;
	height: 35px;
	border-color: transparent;
	box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%)
}
</style>
