<template>
  <iPage>
      <pageHeader>
        {{language('色标件-批量修改')}}
        <div slot="actions">
          <iButton>{{language('确认')}}</iButton>
          <iButton>{{language('取消')}}</iButton>
        </div>
      </pageHeader>
      <colorPartsBasic style="margin-top:20px"/>
      <colorPartsUnit style="margin-top:20px"/>
      <colorPartsList style="margin-top:20px"/>
      
  </iPage>
</template>

<script>
import {iPage,iButton} from 'rise'
import pageHeader from '@/components/pageHeader'
import {colorPartsBasic,colorPartsUnit,colorPartsList}  from './components/index.js'
export default {
  components:{
    iPage,
    colorPartsBasic,
    colorPartsUnit,
    colorPartsList,
    pageHeader,
    iButton
  }

}
</script>

<style>

</style>