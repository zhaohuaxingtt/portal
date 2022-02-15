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
                        <div class="file" v-for="(item,index1) in l.list" :key="item.id">
                            <div class="bell" v-if="item.isNew"></div>
                            <span class="title-text" @click="openFun(item, index, index1)">{{`${item.source.substring(item.source.lastIndexOf('.')+1).toUpperCase() || 'PNG'} ${item.title}-${item.publishDate}`}}</span>
                            <div>
                                <iButton size="mini" @click="share(item,index,index1)">
                                    分享
                                </iButton>
                                <iButton size="mini" @click="handLoad(item,index,index1)">下载</iButton>
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
    import {queryReportContentList, updateIsNew, downLoadFileName } from '@/api/reportForm';
    const fileType = {
        'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'xls': 'application/vnd.ms-excel',
        'doc': 'application/msword',
        'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'pdf': 'application/pdf',
        'ppt': 'application/vnd.ms-powerpoint',
        'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'png': 'image/png',
        'gif': 'image/gif',
        'jpeg': 'image/jpeg',
        'jpg': 'image/jpeg',
    }
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
                            let data = res?.data || []
                            if (data.length > 0) {
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
            share(item,i1,i2) {
                let subject = `我与你分享了一条 ${this.title} 《${item.title}》`
                let body = `我与你分享了一条 ${this.title} 《${item.title}》 %0a%0d ${item.cover}`
                let href = `mailto:?subject=${subject}&body=${body}`
                this.createAnchorLink(href)
                this.updateIsNew(item.id, i1, i2)
            },
            createAnchorLink(href) {
                const a = document.createElement('a')
                a.href = href
                document.body.appendChild(a)
                a.click()
                a.remove()
            },
            async handLoad(row,i1,i2) {
                // const a = document.createElement('a')
                // a.download = row.title
                // a.href = `${row.cover}&isDown=true`
                // a.click()
                // a.remove()
                let id = row.cover.split("=")[1] + ''
                let type = row.source.substring(row.source.lastIndexOf('.')+1).toLowerCase() || 'png'
                let params = {
                    fileIds: [id],
                    fileName: row.title
                }
                let formData = new FormData()
                Object.keys(params).forEach(item => {
                    formData.append(item, params[item])
                })
                await downLoadFileName(formData).then(res => {
                    if (res) {
                        const a = document.createElement('a')
                        a.download = row.title
                        a.href = window.URL.createObjectURL(new Blob([res], { type: fileType[type]}))
                        a.click()
                        a.remove()
                    }
                })
                this.updateIsNew(row.id,i1,i2)
            },
            handleIconClick() {
                this.params.current = 1
                this.query()
            },
            openFun(item, i1, i2) {
                window.open(item.cover)
                this.updateIsNew(item.id, i1, i2)
            },
            // 取消最新 new
            async updateIsNew(id,i1,i2){
                await updateIsNew(id)
                this.$set(this.dataList[i1].list[i2], "isNew", false)
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