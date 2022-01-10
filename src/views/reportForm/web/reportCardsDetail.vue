<template>
    <iPage>
        <pageHeader class="title">报表</pageHeader>
        <iCard class="report">
            <div class="report-box">
                <div class="flex">
                    <span>搜索</span>
                    <iInput v-model="keyword" class="search" clearable>
                        <i
                            class="el-icon-search el-input__icon"
                            slot="suffix"
                            @click="handleIconClick">
                        </i>
                    </iInput>
                    <iButton @click="$router.back()">返回</iButton>
                </div>
                <div class="detail">
                    <div class="detail-item" v-for="l in list" :key="l.id">
                        <h3 class="title" v-text="l.title"></h3>
                        <div class="file" v-for="(item,idx) in l.list" :key="idx">
                            <span>{{item.name}}</span>
                            <div>
                                <iButton size="mini" @click="share(item)">
                                    分享
                                </iButton>
                                <iButton size="mini" @click="show = true">下载</iButton>
                            </div>
                        </div>
                        <iPagination
                            v-update
                            @current-change="query"
                            background
                            :current-page="l.page"
                            :page-size="10"
                            :page-sizes="[10]"
                            :total="l.total"
                            layout="sizes, prev, pager, next, jumper"
                            />
                    </div>
                </div>
            </div>
        </iCard>
        <Dialog :show.sync="show"></Dialog>
    </iPage>
</template>

<script>
    import pageHeader from '@/components/pageHeader'
    import { iPage, iInput, iCard, iButton, iPagination } from 'rise'
    import Dialog from './../components/dialog.vue';
    export default {
        components:{
            pageHeader,
            iPage,
            iInput,
            iCard,
            iButton,
            iPagination,
            Dialog
        },
        data() {
            return {
                pagination:{
                    totalCount:2,
                    currPage:1
                },
                list:[
                    {
                        total:10,
                        page:1,
                        title:"报告分类一",
                        list:[
                            {name:'PDF CW32 Special WOB-China-CSC minutes', url: 'www.baidu.com'}
                        ]
                    },
                    {
                        total:10,
                        page:1,
                        title:"报告分类二",
                        list:[
                            {name:'PDF CW32 Special WOB-China-CSC minutes', url: 'www.baidu.com'}
                        ]
                    },
                ],
                mailto: '',
                keyword: '',
                show:false
            }
        },
        methods: {
            query(v){
                console.log(v);
            },
            share(item) {
                console.log(item, '1234')
                let subject = `我与你分享了一条${item.name}`
                let body = `我与你分享了一条内容 ${item.name} %0a%0d ${item.url}`
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
            handleIconClick() {
                console.log(this.keyword, '12345')
            }
        },
    }
</script>

<style lang="scss" scoped>
.flex{
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;
}
.flex-1{
    flex: 1;
}

.report{
    // height: 100%;
    // overflow: hidden;
    // ::v-deep > div{
    //     height: 100%;
    // }
    // ::v-deep .cardBody{
    //     height: 100%;
    // }
}
.report-box{
    height: 100%;
    display: flex;
    flex-direction: column;
}
.search{
    flex: 1;
    margin: 0 10px;
}
.detail{
    flex:1;
    padding-right: 10px;
    // overflow-y: auto;

    .detail-item{
        padding: 30px 0;
        border-bottom: 1px solid #eee;
        &:last-child{
            border:none
        }
       .title{
           font-size: 18px;
       }
    }
    .file{
        position: relative;
        margin: 30px 0;
        padding-left: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: rgb(73, 119, 248);

        .bell{
            position: absolute;
            left: -20px;
            width: 30px;
            height: 30px;
            background: url("~@/assets/images/new.png") no-repeat;
            background-size: cover;
        }
    }
}
</style>