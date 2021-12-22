<template>
    <iCard>
        <div class="flex justify-between margin-bottom20">
            <div class="flex">
                <iInput style="width:220px" :placeholder="language('请输入')" v-model="keyWord" />
                <iButton style="margin-left:10px">搜索</iButton>
            </div>
            <div>
                <iButton>添加页面</iButton>
                <iButton>子流程图</iButton>
                <iButton>流程目录</iButton>
            </div>
        </div>
        <ITable :tableSetting='tableSetting' :extraData="extraData"></ITable>
    </iCard>
</template>

<script>
import ITable from './../components/ITable';
import {iInput, iCard, iButton } from 'rise';
import {PROCESS_PAGE} from './tables';
export default {
    components:{
        ITable,
        iInput,
        iCard,
        iButton
    },
    data() {
        return {
            tableSetting:PROCESS_PAGE,
            keyWord:"",
            extraData:{
                update:this.operate,
            }
        }
    },
    methods: {
        /**
         * @param type 操作类型
         */
        operate(type,row){
            switch (type) {
                case "edit":    //修改
                    
                    break;
                case "manual":    //操作手册
                    
                    break;
                case "video":    //操作视频
                    
                    break;
                case "qs":    //常见问题
                    
                    break;
                case "attch":    //附件
                    
                    break;
                case "del":    //删除
                    
                    break;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "./../../comon";
</style>