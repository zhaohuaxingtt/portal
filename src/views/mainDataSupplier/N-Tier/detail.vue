<template>
    <iPage>
        <pageHeader class="margin-bottom20">{{pageTitle}}</pageHeader>
        <basicN-Tier class="margin-bottom20"></basicN-Tier>
        <detailList />
    </iPage>
</template>

<script>
import {iPage,} from 'rise'
import basicNTier from './components/basicN-Tier'
import detailList from  './components/detailList'
import pageHeader from '@/components/pageHeader'
export default {
    name:'detail',
    components:{basicNTier,iPage,pageHeader,detailList},
    data(){
        return {
            pageTitle:'基本信息'
        }
    }
}
</script>

<style>

</style>