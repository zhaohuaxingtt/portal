<!--
 * @author: shujie
 * @createTime: 2021-5-25 15:30:50
 * @Description:财报分析
 -->
<template>
	<iPage>
		<div class="flex-between-center margin-bottom20" id="pdf">
			<span class="title">{{$t('SPR_FRM_DEP_FINANA')}}</span>
			<div class="flex-align-center">
				<!-- 维护呈现对象 -->
				<iButton @click='openVisible' v-permission="PORTAL_SUPPLIER_NAV_GAILAN_WEIHUCHENGXIANDUIXIANG">{{$t('SPR_FRM_DEP_CXWHDX')}}</iButton>
				<!-- 加入行业均值 -->
				<iButton @click='openIndustry' v-permission="PORTAL_SUPPLIER_NAV_GAILAN_JIARUHANGYEJUNZHI">{{$t('SPR_FRM_DEP_JRHYJZ')}}</iButton>
				<!-- 维护行业均值 -->
				<iButton @click='onJumpIndustryAverage' v-permission="PORTAL_SUPPLIER_NAV_GAILAN_WEIHUHANGYEJUNZHI">{{$t('SPR_FRM_DEP_WHHYJZ')}}</iButton>
                  <iButton slot="header-control"
    
               @click="$router.push({path:'/supplier/frmrating/supplieroverview'})">{{$t('LK_FANHUI')}}</iButton>
			</div>
		</div>
		<iCard id='powerBi'>
			<!-- <iframe :src='url.embedUrl' scrolling="auto" frameborder="0" width="100%" height="500px"></iframe> -->
		</iCard>
		<!-- 维护呈现对象 -->
		<changeItem v-model="visible" :option="1" :selectData='supplierNameData' :tip="$t('SPR_FRM_DEP_OBJPLACE')" multiple :title="$t('SPR_FRM_DEP_CXWHDX')" @sure="sureChangeItems"></changeItem>
		<!-- 加入行业均值 -->
		<changeItem v-model="industry" :option="2" :selectData='averageNameData' :tip="$t('SPR_FRM_DEP_AVGPLACE')" :title="$t('SPR_FRM_DEP_JRHYJZ')" @sure="sureIndustryChangeItems">
		</changeItem>
	</iPage>
</template>

<script>
	import {iPage,iCard,iButton} from 'rise';
	import changeItem from './changeItem';
	import {powerBiUrl} from "@/api/frmRating/depthRating/financialAnalysis";
	import * as pbi from 'powerbi-client';
	export default {
		components: {iPage,iCard,iButton,changeItem},
		data() {
			return {
				visible: false,
				industry: false,
				url: {
					accessToken: "", //验证token
					embedUrl: "", //报告信息内嵌地址
					tokenExpiry: ""//token过期时间
				},
				supplierNameData:[],//供应商名称
				averageNameData:[],//行业均值
				report:null,
				name:"",
				filter : {
						$schema: "http://powerbi.com/product/schema#basic",
						target: {
							table: "app_supplier_fin_analysis_sum_nt_daily",
							column: "subject_name"
						},
						operator: "In",
						values: [],//[this.name],// values
						filterType: null,
						requireSingleSelection: true
					},
				values:[],
				reportContainer:null
			}
		},
		mounted() {
			this.filter={...this.filter,filterType:pbi.models.FilterType.BasicFilter},
			this.powerBiUrl()
		},
		created () {
			if (this.$route.query.name) {
				this.name = this.$route.query.name;
			}
			// this.config.pageName=this.$i18n.locale=='zh'?'ReportSectione9fe87a027d2550c28a9':'ReportSection616eb7861df2ef50a3cd'
		},
		watch:{
			'$i18n.locale':{
				handler(newValue){
				this.config.pageName=newValue=='zh'?'ReportSectione9fe87a027d2550c28a9':'ReportSection616eb7861df2ef50a3cd'
				this.renderBi()
			}}
		},
		methods: {
			// 打开呈现对象弹窗
			openVisible() {
				this.visible = true
			},
			// 打开行业均值弹窗
			openIndustry() {
				this.industry = true
			},
			// 呈现对象确认
			sureChangeItems(data) {
				this.visible = false
				this.values= [...this.values,...data.map((v)=>v.nameZh)]
				let newfilter = window._.cloneDeep(this.filter);
				newfilter.values=this.values
				this.report.setFilters([newfilter])
				// this.report.updateFilters(pbi.models.FiltersOperations.Add, [filter]);
			},
			// 加入行业均值
			sureIndustryChangeItems(data) {
				this.industry = false
				console.log(data);
				this.values= [...this.values,data.industryName]
				let newfilter = window._.cloneDeep(this.filter);

				newfilter.values=this.values
				console.log(newfilter);
				
				this.report.setFilters([newfilter])
			},
			
			//维护行业均值
			onJumpIndustryAverage() {
				this.$router.push('/supplier/frmrating/depthRating/industryAverage')
			},
			// 获取财报iframeurl
			powerBiUrl() {
					powerBiUrl().then(res => {
					if (res.data) {
						this.url = res.data
						this.init()
						this.renderBi()
					}
				})
			},
			// 初始化配置
			init(){
				// this.permissions = pbi.models.Permissions.All
				this.config = {
					type: 'report',
					tokenType: pbi.models.TokenType.Embed,
					accessToken: this.url.accessToken,
					embedUrl: this.url.embedUrl,
					pageName:"ReportSectione9fe87a027d2550c28a9",// 中文ReportSectione9fe87a027d2550c28a9 英文 ReportSection616eb7861df2ef50a3cd
					// id: 'f6bfd646-b718-44dc-a378-b73e6b528204',
					// visualName: '47eb6c0240defd498d4b',
					// permissions: permissions,
					settings: {
						panes: {
							filters: {
								visible: false
							},
							pageNavigation: {
								visible: false
							}
						}
					}
				};
				this.reportContainer = document.getElementById('powerBi');
				this.powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
			},
			// 初始化页面
			renderBi() {
				var report = this.powerbi.embed(this.reportContainer, this.config);

				// Report.off removes a given event handler if it exists.
				report.off("loaded");

				// Report.on will add an event handler which prints to Log window.
				const name = this.name
				const newfilter = window._.cloneDeep(this.filter);
				newfilter.values=[name]
				this.values=[name]
				console.log(newfilter);
				report.on("loaded", ()=> {
					console.log("Loaded");
					// if(name==""){
						// newfilter.values=[]
					// report.updateFilters(pbi.models.FiltersOperations.Add, [newfilter]);
					// }
					report.setFilters([newfilter])
				});

				// Report.off removes a given event handler if it exists.
				report.off("rendered");

				// Report.on will add an event handler which prints to Log window.
				report.on("rendered", function() {
					console.log("Rendered");
				});
				// report.off("filtersApplied")
				
				report.on("filtersApplied", function() {
					console.log("filtersApplied");
				});

				report.on("error", function(event) {
					console.log(event.detail);
					report.off("error");
				});

				report.off("saved");
				report.on("saved", function(event) {
					console.log(event.detail);
					if (event.detail.saveAs) {
						console.log(
							'In order to interact with the new report, create a new token and load the new report'
							);
					}
				});
				this.report=report
			}
		}
	}
</script>

<style lang="scss" scoped>
	.title {
		font-weight: bold;
		font-size: 20px;
		color: $color-black;
		margin-bottom: 20px;
	}

	#powerBi {
		width: 100%;
		height: calc(100vh - 190px);
	}
</style>
