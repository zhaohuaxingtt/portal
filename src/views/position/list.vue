<template>
  <iPage>
    <!-- <div class="position-menus flex-between-center-center">
      <div class="menus2 flex-align-center">
        <div
          v-for="(item, index) in menus2"
          :key="index"
          :class="{ active: !item.url }"
          @click="handleRedirect(item)"
        >
          <div>{{ item.name }}</div>
        </div>
      </div>
      <div class="menus3 flex-align-center">
        <div
          v-for="(item, index) in menus3"
          :key="index"
          @click="handleRedirect(item)"
        >
          <div
            :class="{ active: !item.url }"
            v-if="
              item.url !== '/position/sub' ||
                (item.url === '/position/sub' && userInfo.deptDTO)
            "
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </div> -->
    <div class="position-page list flex">
      <organizationList />
      <positionList :showBtns='showBtns'/>
    </div>
  </iPage>
</template>

<script>
import { organizationList, positionList } from './components'
import { iPage } from 'rise'
export default {
  components: { organizationList, positionList, iPage },
  computed: {
    userInfo() {
      return this.$store.state.permission.userInfo
    }
  },
  mounted() {},
  beforeRouteEnter(to,from,next){
    next((vm)=>{
      to.fullPath.includes('cf-position') ? vm.showBtns = false : vm.showBtns = true
      console.log(vm.showBtns,'-----')
    })
  },
  beforeRouteLeave(to, from, next) {
    // console.log('to', to)
    // console.log('from', from)
    this.$store.commit('SET_LIST', { type: 'pos', list: [] })
    next()
  },
  data() {
    // const _self = this
    return {
      showBtns:false,
      menus2: [
        { name: '组织管理', url: '/org/list' },
        { name: '岗位管理', url: '' }
      ],
      menus3: [
        { name: '岗位', url: '' },
        {
          name: '下属岗位',
          url: `/position/sub`
        },
        { name: '轮岗申请', url: '/position/transfer' },
        { name: '岗位代理', url: '/position/agent' }
      ]
    }
  },
  methods: {
    handleRedirect(item) {
      console.log('sss');
      const queryObj = {
        deptId: this.userInfo.deptDTO?.id
      }
      this.$router.push({
        path: item.url,
        query: item.url.indexOf('sub') !== -1 ? queryObj : ''
      })
    }
  }
}
</script>
