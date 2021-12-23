<template>
    <iCard>
        <div class="flex justify-between margin-bottom20">
            <div class="flex">
                <iInput style="width:220px" :placeholder="language('请输入')" v-model="keyWord" />
                <iButton style="margin-left:10px">搜索</iButton>
            </div>
            <div>
                <iButton @click="editDialog.show = true">添加页面</iButton>
                <iButton>子流程图</iButton>
                <iButton @click="processDialog.show = true">流程目录</iButton>
            </div>
        </div>
        <ITable :tableSetting='tableSetting' :extraData="extraData"></ITable>
        <!-- 新增和编辑 -->
        <Edit :show.sync="editDialog.show"></Edit>
        <!-- 操作手册 -->
        <Manual :show.sync="manualDialog.show"></Manual>
        <!-- 操作视频 -->
        <Video :show.sync="videoDialog.show"></Video>
        <!-- 常见问题 -->
        <Question :show.sync="qsDialog.show"></Question>
        <!-- 附件 -->
        <Attachment :show.sync="qsDialog.show"></Attachment>

        <!-- 流程目录 -->
        <ProcessDirectory :show.sync="processDialog.show"></ProcessDirectory>
    </iCard>
</template>

<script>
import ITable from '../../components/ITable';
import {iInput, iCard, iButton } from 'rise';
import {PROCESS_PAGE} from '../tables';
import Edit from './edit.vue';
import Manual from './manual.vue';
import Video from './video.vue';
import Question from './question.vue';
import Attachment from './attachment.vue';
import ProcessDirectory from './processDirectory.vue';
export default {
    components:{
        ITable,
        iInput,
        iCard,
        iButton,
        Edit,
        Manual,
        Video,
        Question,
        Attachment,
        ProcessDirectory
    },
    data() {
        return {
            tableSetting:PROCESS_PAGE,
            keyWord:"",
            extraData:{
                operate:this.operate,
            },
            editDialog:{
                show: false
            },
            manualDialog:{
                show: false
            },
            videoDialog:{
                show: false
            },
            qsDialog:{
                show: false
            },
            processDialog:{
                show:false
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
                    this.editDialog.show = true
                    break;
                case "manual":    //操作手册
                    this.manualDialog.show = true
                    break;
                case "video":    //操作视频
                    this.videoDialog.show = true
                    break;
                case "qs":    //常见问题
                    this.qsDialog.show = true
                    break;
                case "attch":    //附件
                    this.qsDialog.show = true
                    break;
                case "del":    //删除
                    this.$confirm('确定删除此页面吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    })
                    break;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "./../../../comon";
</style>