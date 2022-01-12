<template>
    <div>
        <pageHeader class="title">
			{{language(title)}}
		</pageHeader>
		<el-image class="banner" src="http://cnsvwshvm1416.csvw.com/upload/2018/07/02/NewsMeta_1352250_Cover.jpg" lazy fit="fill"></el-image>
    </div>
</template>

<script>
    import pageHeader from '@/components/pageHeader'
    export default {
        components:{
            pageHeader
        },
        props:{
            title:{
                type: String,
                default: ""
            }
        }
    }
</script>

<style lang="scss" scoped>
.moveR-enter-active,  .moveR-leave-active {
    transition: all 0.2s ease-in;
    transform: translateX(0);
}
.moveR-enter,  .moveR-leave {
    transform: translateX(100%);
}
.moveR-leave-to{
    transform: translateX(100%);
}
.banner{
    width: 100%;
    height: 300px;
    border-radius: 8px;
}
</style>