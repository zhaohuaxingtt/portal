<template>
    <iDialog :title="title"
                style="margin-top:20vh"
                :visible.sync="closeValue"
                v-if="closeValue"
                :width="width==undefined?'22%':width"
                @close='closeDiologBtn'
                append-to-body>
        <span style="display:block">{{Tips}}</span>
        <div class="reset_style">
            <iButton @click="close" v-if="cancelButtonText !== undefined">{{cancelButtonText}}</iButton>
            <iButton @click="save" v-if="confirmButtonText !== undefined">{{confirmButtonText}}</iButton>
        </div>
    </iDialog>
</template>

<script>
import { iDialog,iButton } from "rise";
// import store from '@/store'
// import router from '@/router'

export default {
    name:"dialogReset",
    components:{
        iDialog,
        iButton
    },
    props:{
        // configParame:{ type: Object },
    },
    data(){
        return{
            closeValue:false,
            title:"",
            Tips:"",
            cancelButtonText:"",
            confirmButtonText:"",
            width:"",
        }
    },
    // computed:{
    //     router () {
    //         return router;
    //     },
    // },
    // watch:{
    //     router:{
    //         handler:function(val,oldVal){
    //             console.log(111111111)
    //             this.closeValue = false;
    //         },
    //         deep:true,
    //     }
    // },
    created(){
        // console.log(store)
        // console.log(router);
    },
    methods:{
        closeDiologBtn(){
            this.closeValue = false;
        },
        close(){
            this.closeDiologBtn();
            this.callback('cancel')
        },
        save(){
            this.closeDiologBtn();
            this.callback('confirm')
        }
    }
}
</script>

<style lang="scss" scoped>
.reset_style{
    margin-top: 50px;
    padding-bottom: 20px;
    display: flex;
    justify-content: flex-end;
}
</style>