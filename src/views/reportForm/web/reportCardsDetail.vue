<template>
    <iPage>
        <pageHeader class="title">{{title}}</pageHeader>
        <iCard class="report" v-loading="loading">
            <div class="report-box">
                <div class="flex">
                    <span>搜索</span>
                    <iInput v-model="keyword" class="search" @keydown.enter.native="handleIconClick" clearable>
                        <i
                            class="el-icon-search el-input__icon"
                            slot="suffix"
                            @click="handleIconClick">
                        </i>
                    </iInput>
                    <iButton @click="$router.back()">返回</iButton>
                </div>
                <div class="detail">
                    <div class="detail-item" v-for="(l,index) in dataList" :key="index">
                        <h3 class="title" v-text="l.categoryName"></h3>
                        <div class="file" v-for="(item) in l.list" :key="item.id">
                            <span class="title-text" @click="openFun(item)">{{`${item.source.substring(item.source.lastIndexOf('.')+1).toUpperCase() || 'PNG'} ${item.title}-${item.publishDate}`}}</span>
                            <div>
                                <iButton size="mini" @click="share(item)">
                                    分享
                                </iButton>
                                <iButton size="mini" @click="handLoad(item)">下载</iButton>
                            </div>
                        </div>
                        <iPagination
                            v-update
                            @current-change="queryPage($event, l.categoryId, idx)"
                            background
                            :current-page="params.current"
                            :page-size="params.size"
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
    import {queryReportContentList} from '@/api/reportForm';
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
                dataList: [],
                params:{
                    size: 10,
                    current: 1
                },
                mailto: '',
                keyword: '',
                show:false,
                loading:false,
                title: '',
                categoryIds: []
            }
        },
        created(){
            let queryObj = this.$route.query
            this.title = queryObj.name || ''
            this.categoryIds = queryObj.categoryIds || []
            if (this.categoryIds) {
                this.query()
            }
            
        },
        methods: {
            query(){
                if (this.keyword) {
                    this.params.title = this.keyword
                }
                try {
                    this.loading = true
                    let dataList = []
                    this.categoryIds.map(async (cate, index)=> {
                        this.params.categoryId = cate
                        let res = await queryReportContentList(this.params)
                        if (res?.code === '200') {
                            let data = res?.data
                            if (data) {
                                dataList.push({
                                    categoryName: data[0]?.categoryName,
                                    total: res.total,
                                    page: res.pageNum,
                                    list: data,
                                    categoryId: this.categoryIds[index]
                                })
                            }
                        }
                    })
                    this.dataList = dataList
                } finally {
                    this.loading = false
                }
            },
            async queryPage(page, id, index) {
                this.params.current = page
                this.params.categoryId = id
                await queryReportContentList(this.params).then(res => {
                    if (res?.code === '200') {
                        let data = res?.data
                        let demoArr = []
                        demoArr.push({
                            categoryName: data[0]?.categoryName,
                            total: res.total,
                            page: res.pageNum,
                            list: data,
                            categoryId: this.categoryIds[index]
                        })
                        this.dataList[index] = demoArr
                    }
                })
            },
            share(item) {
                let subject = `我与你分享了一条 ${this.title} 《${item.title}》`
                let body = `我与你分享了一条 ${this.title} 《${item.title}》 %0a%0d ${item.cover}`
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
            handLoad(row) {
                console.log(row, '12345')
                const a = document.createElement('a')
                a.download = row.title
                a.href = `${row.cover}&isDown=true`
                a.click()
                a.remove()
            },
            handleIconClick() {
                this.params.current = 1
                this.query()
            },
            openFun(item) {
                window.open(item.cover)
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
.title-text {
    cursor: pointer;
}
</style>