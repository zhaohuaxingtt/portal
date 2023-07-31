<template>
  <div class="topcomponents">
		<slot name="left"></slot>
		<div class="right-content">
			<slot name="items">
				<iNavMvp class="navMap" :query='query' lang  routerPage :lev='lev' :list="pageMenu" :right='right'></iNavMvp>
			</slot>
			<div class="right-cc">
				<iLoger v-if="isShowIlog" isPage :isUser="true" class="margin-left25 margin-right5" v-bind="config" />
				<span v-else class="riz">
					<icon symbol class="rizhi" name="icondatabaseweixuanzhong" color='#CAD9F8'></icon>
				</span>
			</div>
		</div>
  </div>
</template>
<script>
import { iNavMvp, icon } from 'rise'
import iLoger from 'rise/web/components/iLoger'
export default {
	components: { iNavMvp, icon, iLoger },
	props: {
		right:Boolean,
    lev:{type:Number,default:1},
		pageMenu:{type:Array,default:()=>[]},
    query:{type:Object,default:()=>{}},
		partInfo:{type:Object,default:()=>{}},
		config:{ // 日志配置
      type:Object,
      default:()=>{},
    },
		isShowIlog:{ // 是否展示日志组件
      type:Boolean,
      default:false,
    }
	}
}
</script>
<style lang="scss" scoped>
.topcomponents{
    position: relative;
    height: 40px;
    display: flex;
    align-items: center;
    .right-content{
      flex: 1;
      width: 100%;
      align-items: center;
      display: inline-flex;
      .navMap{
        flex: 1;
        width: 100%;
      }
      .right-cc{
        display: flex;
        align-items: center;
        .riz{
          font-size: 16px;
          color: $color-blue;
          font-weight: bold;
          margin-right: 30px;
          cursor: pointer;
          .rizhi{
            font-size: 20px;
            margin-right: 5px;
          }
        }
        .package{
          cursor: pointer;
          font-size: 28px;
        }
      }
    }
  }
</style>