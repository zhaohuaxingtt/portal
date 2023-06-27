<!--
 * @Author: your name
 * @Date: 2022-02-07 10:34:39
 * @LastEditTime: 2022-04-15 16:56:03
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-portal\src\views\viewSuppliers\index.vue
-->
<template>
  <div class="viewSuppliers"
       v-loading="onLoading">
    <supplierViewTab class="margin-bottom20"
                     v-if="$route.query.type!=='LR'"
                     @handleClick="handleTabClick"
                     :current="current" />
    <titleTag class="margin-bottom20"
                     v-if="$route.query.type=='LR'"
                     @handleClick="handleTabClick"
                     :current="current">
    </titleTag>
    <iLoger
        credentials
        isPage
        isUser
        :config="{ menuId }"
        class="logButton"
      />
    <supplier360-page v-if="current === 1" />
  </div>
</template>

<script>
import supplierViewTab from '../../components/supplierViewTab'
import titleTag from './titleTag'
import logButton from '@/components/logButton'
import supplier360Page from '../supplier360'
import iUserLog from '@/components/iUserLog'
import iLoger from 'rise/web/components/iLoger'
export default {
  components: {
    supplierViewTab,
    titleTag,
    supplier360Page,
    logButton,
    iUserLog,
    iLoger
  },
  data () {
    return {
      tab: 'supplier360',
      current: 1,
      flag: true,
      showDialog: false,
      onLoading: false
    }
  },
  computed: {
    menuId(){
      if(this.$route.query.type=='DC'){
        return 'GP-CONTRACT-111'
      }else{
        return 'WS3203'
      }
    }
  },
  created(){
    console.log(this.$route.query.type)
  },
  methods: {
    handleTabClick (index) {
      this.current = index
    },
    toLog () {
      this.showDialog = true
    }
  },
  mounted () {
    console.log(this.$route)
    if (this.$route.path === '/view-suppliers') {
      this.flag = false
    }

  },
}
</script>

<style scoped lang="scss">
.viewSuppliers {
  position: relative;
  padding: 30px 40px 30px 40px;
  height: 100%;

  .logButton {
    position: absolute;
    top: 30px;
    right: 40px;
  }
}
</style>
