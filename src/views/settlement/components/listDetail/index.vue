<!--
 * @Author: 舒杰
 * @Date: 2021-09-02 13:38:32
 * @LastEditTime: 2021-09-06 21:00:12
 * @LastEditors: 舒杰
 * @Description: 清单明细
 * @FilePath: \front-supplier\src\views\okm\components\listDetail\index.vue
-->
<template>
   <iDialog :title="title" :visible.sync="value" width="80%" @close='clearDiolog' top="30vh">
      <tableList
          class="padding-bottom30"
         :tableData="detailData"
         :tableTitle="tableTitle"
         :tableLoading="tableLoading"
			:selection="false">
      </tableList>
   </iDialog>
</template>

<script>
	import {iDialog} from 'rise';
	import tableList from '@/views/okm/components/tableList';
	import {tableTitle} from './data';
	import resultMessageMixin from '@/utils/resultMessageMixin';
	export default{
		mixins: [resultMessageMixin],
		components:{
		tableList,iDialog
		},
      props:{
         value:{type:Boolean},
         title:{type:String,default:"明细清单"},
         detailData:{type:Array,default:()=>[]},
      },
		data() {
			return {
				tableTitle,
				tableLoading:false,
			}
		},
		created() {
		},
		methods:{
			clearDiolog() {
				this.$emit("input", false);
			}
		}
	}
</script>

<style lang="scss">

</style>
