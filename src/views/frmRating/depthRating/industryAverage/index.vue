<!--
 * @author: shujie
 * @createTime: 2021-5-25 15:30:43
 * @Description:维护行业均值
 -->
<template>
	<iPage>
		<div class="title">{{$t('SPR_FRM_DEP_WHHYJZ')}}</div>
		<iCard>
			<!-- 当前行业 -->
			<div class="flex-between-center margin-bottom20">
				<div class="flex-align-center">
					<span class="nowIndustry">{{$t('SPR_FRM_DEP_DQHY')}}</span>
					<iSelect v-model="selectedType" @change="getData">
						<el-option v-for="item in types" :key="item.id" :value="item.id" :label="item.industryName"></el-option>
					</iSelect>
				</div>
				<div class="flex-align-center">
					<!-- 新建行业 -->
					<iButton @click='openNewIndustry'>{{$t('SPR_FRM_DEP_XJHY')}}</iButton>
					<iButton @click="saveData">{{$t('LK_BAOCUN')}}</iButton>
					<iButton @click='del'>{{$t('delete')}}</iButton>
				</div>
			</div>
			<el-table :data="fieldList" :selection='false' :tableTitle="newTableTitle" :tableLoading="tableLoading" >
				<el-table-column :width='item.width' :prop="item.props" :label="$t(item.key)" align='center' v-for="(item,index) in newTableTitle" :key='index'>
					<el-table-column :prop="val.props" :label="val.name" align='center' v-for="(val,i) in item.sub" :key='i'>
						<template slot-scope="scope">
							<iInput v-float :value="getValue(scope,item,val,$event)" @input="updateData(scope,item,val,$event)"></iInput>
						</template>
					</el-table-column>
				</el-table-column>
			</el-table>
		</iCard>
		<!-- 新建行业 -->
		<newIndustry v-model='newIndustryShow' @input="handleAdd" :types="types"></newIndustry>
	</iPage>
</template>

<script>
	import {iPage,iCard,iSelect,iButton,iInput} from 'rise';
	import {tableTitle,fieldList} from './components/data';
	import newIndustry from './components/newIndustry';
	import {postAverageTypeList,postAverageData,postAddAverageData,postDelType} from '@/api/frmRating/depthRating/industryAverage.js'
	export default{
		components:{
			iPage,iCard,iSelect,iButton,iInput,newIndustry
		},
		data() {
			return {
				tableTitle,
				tableLoading: false,
				newIndustryShow:false,
				types:[],
				selectedType:'',
				orginData:[],
				fieldList:fieldList
			}
		},
		mounted(){
			this.getTypeList()
		},
		methods:{
			openNewIndustry(){
				this.newIndustryShow=true
			},
			handleAdd(e){
				this.newIndustryShow=false
				if(e!==-1){
					this.getTypeList()
					this.selectedType=e
					this.getData()
				}
			},
			getTypeList(){
				postAverageTypeList({}).then((result) => {
					this.types=result.data
				}).catch((err) => {
				});
			},
			getData(){
				if(this.selectedType!==''){
					postAverageData({
						averageIndustryTypeId:this.selectedType
					}).then((result) => {
						this.orginData=result.data
						this.orginData=[]
						result.data.forEach((item)=>{
							this.orginData=[...this.orginData,...item.averageList]
						})
					}).catch((err) => {
						
					});
				}else{
					this.$message.warning(this.$t('SPR_FRM_DEP_AVGERROR'))
				}
			},
			updateData(all,total,sub,value){
				const metric = all.row.props
				const type=window._.find(this.orginData,(item)=>item.averageType===total.props && item.year===sub.name)
				if(type){
					this.orginData=this.orginData.map((item)=>{
						if(item.year===sub.name&&item.averageType===total.props){
							item[metric]=value
						}
						return item
					})
				}else
				{
					const item = {}
					item[metric]=value
					item.averageType=total.props
					item.year=sub.name
					this.orginData.push(item)
				}
			},
			getValue(all,total,sub){
					const metric = all.row.props
					const type=window._.find(this.orginData,(item)=>item.averageType===total.props && item.year===sub.name)
					if(type){
						return type[metric]
					}else{
						return ''
					}
			},
			saveData(){
				postAddAverageData({
					averageIndustryTypeId: this.selectedType,
					dataList:this.orginData
				}).then((result) => {
						if(result.code==200){
							this.$message.success(result.desZh)
						}else{
							this.$message.error(result.desZh)
						}
					}).catch((err) => {
						
					});
			},
			// 删除行业均值
			del(){
				if (!this.selectedType) {
					this.$message.warning(this.$t('SPR_FRM_DEP_AVGERROR'))
					return
				}
				postDelType(this.selectedType).then(result=>{
					if(result.code==200){
							this.selectedType=""
							this.orginData=[]
							this.getTypeList()
							this.$message.success(result.desZh)
						}else{
							this.$message.error(result.desZh)
						}
				})
			}
		},
		computed:{
			newTableTitle() {
				const nowYear=Number(window.moment().year())

				return tableTitle.map((item)=>{
					if(item.name!==''){
						const sub=[]
						for(let i=5;i>0;i--){
							sub.push({
								name:nowYear-i,
								props:item.name+(nowYear-i),
							})
						}
						item.sub=sub
					}
					return item
				})
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
	.nowIndustry{
		width: 124px;
		margin-right: 30px;
	}
	::v-deep .el-table--border th{
		border-bottom:1px solid #FFFFFF ;
		border-right:1px solid #FFFFFF ;
	}
</style>
