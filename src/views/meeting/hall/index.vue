<!--
 * @Author: HS 会议中心 http://localhost:8080/portal/#/meeting/hall
 * @FilePath: \front-portal\front-portal\src\views\meeting\hall\index.vue
-->
<template>
  <div style="flex: 1">
    <iPage>
      <div class="tab-list-box">
        <iNavMvp
          :list="tabRouterList"
          class="margin-bottom20"
          routerPage
          :lev="1"
          @change="
            (e) => {
              handleChange(e)
            }
          "
        />
        <div v-if="value !== 4"><newTheTable :value="value" /></div>
        <div v-if="value === 4 && menuType === 'admin'">
          <adminHall :value="value" />
        </div>
      </div>
    </iPage>
  </div>
</template>

<script>
import { iNavMvp, iPage } from 'rise'
import newTheTable from './components/newTheTable.vue'
import adminHall from './components/adminHall.vue'
// import { tabRouterList } from './components/data'
import { findFirstStartCSCMeeting } from '@/api/meeting/live'

export default {
  components: {
    iNavMvp,
    iPage,
    newTheTable,
    adminHall
  },
  created() {
    // console.log(this.$route);
    this.menuType = this.$route.query.menuType
  },
  data() {
    return {
      value: 1,
      tabRouterList: [
        {
          value: 1,
          name: '通用会议',
          url: '/meeting/hall',
          activePath: '/meeting/type',
          key: this.$t('MT_TONGYONGHUIYI'),
          permissionKey:"CF_MEETING_TONGYONGHUIYI",
        },
        {
          value: 2,
          name: '生产采购CSC',
          url: '/meeting/hall',
          key: this.$t('MT_SHENGCHANCAIGOUSCC'),
          permissionKey:"CF_MEETING_SCCGCSC",
        },
        {
          value: 3,
          name: '一般采购CSG',
          url: '/meeting/hall',
          key: this.$t('MT_YIBANCAIGOUCSG'),
          permissionKey:"CF_MEETING_YBCGCSG",
        },
        {
          value: 4,
          name: '管理大厅',
          url: '/meeting/hall',
          key: this.$t('MT_GUANLIDATING'),
          permissionKey:"CF_MEETING_HOME",
        }
      ],
      menuType: ''
    }
  },
  methods: {
    async query() {
      const res = await findFirstStartCSCMeeting()
      return res
    },
    handleChange(e) {
      // console.log(e);
      if (e.value === 2) {
        this.query().then((res) => {
          if (res && res.id) {
            this.$router.push({
              path: '/meeting/specialLive',
              query: {
                meetingInfoId: res.id ? res.id : -1
              }
            })
          } else {
            this.$router.push({
              path: '/meeting/special-near-meeting',
              query: {
                meetingInfoId: res.id ? res.id : -1
              }
            })
          }
        })
      } else {
        this.value = e.value
      }
    }
  }
  // props:{lev:{type:Number,default:0},routerPage:Boolean,center:{type:Boolean,default:!1},right:{type:Boolean,default:!1},list:{type:Array,default:function(){return[{value:1,name:"零件签收",message:0,url:"/sourcing/partsign",activePath:"/partsign",key:"LK_LINGJIANQIANSHOU"},{value:2,name:"采购项目建立",message:0,url:"/sourcing/partsprocure",activePath:"/partsprocure",key:"LK_CAIGOUXIANGMUJIANLI"},{value:3,name:"RFQ管理",message:0,url:"/sourcing/partsrfq",activePath:"/partsrfq",key:"LK_RFQGUANLI"}]}},query:{type:Object,default:function(){}},lang:{type:Boolean,default:!1}},data:function(){return{activeIndex:0}},created:function(){if(this.routerPage)for(var t,n=0;t=this.list[n++];)if(this.$route.path.indexOf(t.activePath)>-1){this.activeIndex=--n;break}},watch:{"$route.path":function(t){if(this.routerPage)for(var n,e=0;n=this.list[e++];)if(t.indexOf(n.activePath)>-1){this.activeIndex=--e;break}}},methods:{change:function(t){this.$emit("change",t),this.activeIndex=t.value-1,this.routerPage&&this.$router.push({path:t.url,query:this.query})},clickMessage:function(t,n){this.$emit("message",t),n.stopPropagation()}}},o=(e(131),e(4)),i=Object(o.a)(r,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"nav flex-align-center",class:[t.center&&"justify-center",t.right&&"justify-right",{lev1:1==t.lev,lev2:2==t.lev}]},t._l(t.list,(function(n,r){return e("div",{key:r,on:{click:function(e){return t.change(n,r)}}},[e("span",{staticClass:"name",class:r==t.activeIndex&&"active"},[t._v(t._s(t.lang?t.language(n.key,n.name):t.$t(n.key)))]),t._v(" "),n.message?e("el-badge",{staticClass:"badge",attrs:{max:99,value:n.message},nativeOn:{click:function(e){return t.clickMessage(n,e)}}}):t._e()],1)})),0)}),[],!1,null,"0508d8a3",null).exports;i.install=function(t){return t.component(i.name,i)};n.default=i}]).default}));
}
</script>
<style lang="scss" scoped>
.tab-list-box {
  ::v-deep .lev1 .name::after {
    transition: 0s;
  }
}
</style>
