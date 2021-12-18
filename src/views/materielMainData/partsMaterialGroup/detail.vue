<template>
  <iPage>
    <pageHeader class="margin-bottom20" v-if='!this.$route.query.id'>
        {{language('新增材料组')}}
    </pageHeader>
    <pageHeader class="margin-bottom20" v-else>
      {{code}} {{language(nameZh)}} &nbsp;
    </pageHeader>
    <detail-base @saveSuccess="isvisible" @code-nameZh='iniPageHeader' :readOnly='readOnly'></detail-base>
    <technology-group v-if="saveId!=''" :savecaId='saveId' :readOnly='readOnly'></technology-group>
    <cbd-preset v-if="saveId!=''" :savecaId='saveId' :readOnly='readOnly'></cbd-preset>
  </iPage>
</template>
<script>
import {iPage} from 'rise'
import pageHeader from '@/components/pageHeader'
import DetailBase from './components/detailBase.vue'
import TechnologyGroup from './components/technologyGroup.vue'
import cbdPreset from './components/cbdPreset.vue'
// import {partMaterialDetail} from '@/api/materiel/partsMaterialGroup'
export default {
  name:'detail',
  components: {iPage,pageHeader,DetailBase, TechnologyGroup, cbdPreset},
  data() {
    return {
      saveId:'',
      code:' ',
      nameZh:' ',
      readOnly:false,
    }
  },
  created(){
    if(this.$route.query.id) {
      this.saveId = this.$route.query.id
    }
    if(this.$route.query.readOnly){
      this.readOnly = true
    }
  },
  
  methods: {
    isvisible(data) {
      this.saveId = data
    },
    iniPageHeader(categoryCode,categoryNameZh){
      // console.log(categoryCode,'categoryCode',categoryNameZh,'categoryNameZh');
      this.code = categoryCode
      this.nameZh = categoryNameZh
    }
  },
}
</script>
<style lang="scss" scoped>

</style>