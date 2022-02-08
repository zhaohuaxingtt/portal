<template>
    <div>
       <LayHeader title="流程管理"></LayHeader>

        <div class="flex mt20">
            <div class="card-l mr20" v-loading="listLoading">
                <div v-for="(collect, index) in collectList" :key="index">
                    <div class="item" :class="collect.id === initId ? 'active' : ''" @click="collectDetail(collect)">{{ collect.name }}</div>
                </div>
            </div>
            <iCard class="card-r flex-1" v-loading="detailLoading">
                <div class="tlt marb15">{{ collectName }}</div>
                <div class="marb15" v-for="(answer, index1) in answerList" :key="answer.id">
                    <div class="marb15">{{`${index1 + 1}、${answer.name}`}}</div>
                    <div class="marb15 w-e-text" v-html="answer.richContent"></div>
                    <!-- <span class="operat marb15" style="display: inline-block;"><i class="el-icon-edit"></i> 提问</span> -->
                    <template class="marb15">
                        <div v-show="!answer.showInput" class="opearte mt20 cursor" @click="changeInput(index1,true)"><i class="el-icon-edit"></i> 提问</div>
                        <div v-if="answer.showInput" class="mt20">
                            <iInput v-model="feedBackAnswer" placeholder="请输入问题"></iInput>
                            <div class="mt10 flex justify-end">
                                <iButton @click="sureFeedBack">确定</iButton>
                                <iButton @click="changeInput(index1,false)">取消</iButton>
                            </div>
                        </div>
                    </template>
                </div>
                
                <div class="flex justify-between items-center mt20">
                    <div class="flex flex-row mt20" v-if="answerList.length > 0">
                        <div class="opearte mr20 cursor" @click="share"><i class="el-icon-share"></i>分享</div>
                        <div class="opearte cursor" @click="collect" v-if="isCollect"><i style="color: red;font-size: 14px;" class="el-icon-star-on"></i>已收藏</div>
                        <div class="opearte cursor" @click="collect" v-else><i class="el-icon-star-off"></i>收藏</div>
                    </div>
                    <iButton @click="goBack">返回</iButton>
                </div>
            </iCard>
        </div>
    </div>
</template>

<script>
    import LayHeader from "./../components/LayHeader.vue";
    import {iCard, iButton, iInput} from 'rise';
    import { queryMyCollect, getProcessFAQ, addAnswerFeedBack, unCollectFAQ, collectFAQ, queryProcessAllQA } from '@/api/procs';
    
    export default {
        components:{
            LayHeader,
            iCard,
            iButton,
            iInput
        },
        data() {
            return {
                collectList: [],
                collectName: null,
                isCollect: null,
                collectId: null,
                answerList: [],
                initId: null,
                showInput: false,
                feedBackAnswer: '',
                listLoading: false,
                detailLoading: false,
                processId: this.$route.query.processId
            }
        },
        created() {
            let query = this.$route.query || {}
            if (query.id) {
                this.initId = query.id
            }
            
            this.getCollectList()
        },
        methods: {
            async getCollectList() {
                let params = {
                    page: 0,
                    size: 5
                }
                try {
                    this.listLoading = true
                    let res = []
                    if(this.processId){
                        res = await queryProcessAllQA(this.processId)
                    }else{
                        res = await queryMyCollect(params)
                    }
                    if (res) {
                        this.collectList = res || []
                        if (res.length > 0) {
                            this.initId = this.initId ? this.initId : res[0].id
                            this.getCollectInfo(this.initId)
                        }
                    }    
                } finally {
                    this.listLoading = false
                }
            },
            changeInput(i1, v){
                this.answerList.forEach(e => {
                    e.showInput = false
                })
                this.$set(this.answerList[i1], "showInput", v)
                this.$forceUpdate()
            },
            async getCollectInfo(id) {
                this.detailLoading = true
                await getProcessFAQ(id).then(res => {
                    console.log(res, '23457')
                    this.collectName = res.name
                    this.isCollect = res.isCollect
                    this.collectId = res.id
                    this.answerList = res.answerList || []
                    this.answerList.forEach(el => {
                        el.showInput = false
                    });
                    this.detailLoading = false
                })
            },
            collectDetail(collect) {
                this.getCollectInfo(collect.id)
            },
            async sureFeedBack() {
                let formData = new FormData()
                formData.append('feedBackContent', this.feedBackAnswer)
                await addAnswerFeedBack(this.collectId, formData).then(res => {
                    if (res?.success) {
                        this.$message({type: 'success', message: '问题反馈成功'})
                    }
                })
            },
            async collect() {
                if (this.isCollect) {
                    //  取消收藏
                    await unCollectFAQ(this.collectId).then(res => {
                        if (res?.success) {
                            this.$message({type: 'success', message: '取消收藏该问题成功'})
                            this.isCollect = !this.isCollect
                        }
                    })
                } else {
                    // 收藏
                    await collectFAQ(this.collectId).then(res => {
                        if (res?.success) {
                            this.$message({type: 'success', message: '收藏该问题成功'})
                            this.isCollect = !this.isCollect
                        }
                    })
                }
            },
            share() {
                let subject = `我与你分享了一条 Question and Answer 《${this.collectName}》`
                let body = `${window.location.origin}/portal/#/cf-ProCS/collect?id=${this.collectId}`
                let href = `mailto:?subject=${subject}&body=${body}`
                this.createAnchorLink(href)
            },
            createAnchorLink(href) {
                const a = document.createElement('a')
                a.href = href
                document.body.appendChild(a)
                a.click()
                a.remove()
            },
            goBack() {
                this.$router.back()
            }
        }
    }
</script>

<style lang="scss" scoped>
@import "./../comon";

.card-l{
    height: 100%;
    width: 450px;
    background: #FFFFFF;
    box-shadow: 0px 0px 6px rgba(27, 29, 33, 0.2);
    border-radius: 10px;

    .item{
        padding: 15px 25px;
        border-bottom: 1px solid #BBC4D6;
        cursor: pointer;
        &:hover{
            color:#1660F1;
        }
    }
}
.marb15{
    margin-bottom: 15px;
}
.card-r{
    .tlt{
        font-weight: bold;
        font-size: 18px;
        color: #1660F1;
    }
    .r-content{
        padding: 10px 20px;
        background-color: #F7FAFF;
    }

    .operat{
        color: #666;
        font-size: 16px;
        cursor: pointer;
    }
}
.opearte{
    color: #666;
}
.active {
    color:#1660F1;
}
</style>