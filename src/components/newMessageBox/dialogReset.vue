<template>
    <iDialog :title="title"
                style="margin-top:23vh"
                :visible.sync="closeValue"
                v-if="closeValue"
                width="22%"
                @close='closeDiologBtn'
                append-to-body>
        <span style="display:block">{{Tips}}</span>
        <div class="reset_style">
            <iButton @click="close">{{cancelButtonText}}</iButton>
            <iButton @click="save">{{confirmButtonText}}</iButton>
        </div>
    </iDialog>
</template>

<script>
import { iDialog,iButton } from "rise";
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
        }
    },
    created(){

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