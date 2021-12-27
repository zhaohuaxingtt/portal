<template>
  <div>
   <div class='headerNav-sub'>
      <iTabsList type='card' v-model='tab' @tab-click='handleTabClick'>
        <el-tab-pane lazy v-for='(item,index) in subNavList' :key='index' :label='language(item.key, item.name)'
                     :name='item.code'
        ></el-tab-pane>
      </iTabsList>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { iTabsList } from 'rise'
import { subNavList } from '@/views/mtz/annualGeneralBudget/reportsShow/config/config'

export default {
  name: 'index',
  components: {
    iTabsList
  },
  created() {
    if (this.$route.name == 'materialGroup') {
      this.tab = '1'
    }
    if (this.$route.name == 'classMaterial') {
      this.tab = '2'
    }

    if (this.$route.name == 'department') {
      this.tab = '3'
    }
    if (this.$route.name == 'brand') {
      this.tab = '4'
    }
    if (this.$route.name == 'model') {
      this.tab = '5'
    }
  },
  data() {
    return {
      tab: '1',
      subNavList
    }
  },
  methods: {
    handleTabClick(tab) {
        let item = subNavList.find(item => item.code == tab.name)
        if (item != null) {
          this.$router.replace({
            path: item.path
          })
        }

    }
  }

}
</script>

<style scoped>

</style>