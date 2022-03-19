<template>
    <div>
        <pageHeader class="title">
			{{language(title)}}
		</pageHeader>
		<img class="banner" src="@/assets/images/procs-banner.png" lazy fit="fill" />
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